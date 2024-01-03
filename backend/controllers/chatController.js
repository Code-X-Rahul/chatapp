const User = require("../models/User");
const ChatMessage = require("../models/Message");
const Chat = require("../models/Chat");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { ChatEventEnum } = require("../constants");
const { emitSocketEvent } = require("../socket/index");
const mongoose = require("mongoose");
const CustomResponse = require("../response/custom-response");

const chatCommonAggregation = () => {
  return [
    {
      // lookup for the participants present
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "participants",
        as: "participants",
        pipeline: [
          {
            $project: {
              password: 0,
              role: 0,
              verificationToken: 0,
              verified: 0,
              passwordToken: 0,
              passwordTokenExpirationDate: 0,
            },
          },
        ],
      },
    },
    {
      // lookup for the group chats
      $lookup: {
        from: "chatmessages",
        foreignField: "_id",
        localField: "lastMessage",
        as: "lastMessage",
        pipeline: [
          {
            // get details of the sender
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "sender",
              as: "sender",
              pipeline: [
                {
                  $project: {
                    name: 1,
                    avatar: 1,
                    email: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              sender: { $first: "$sender" },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        lastMessage: { $first: "$lastMessage" },
      },
    },
  ];
};

const deleteCascadeChatMessages = async (chatId) => {
  // fetch the messages associated with the chat to remove
  const messages = await ChatMessage.find({
    chat: new mongoose.Types.ObjectId(chatId),
  });

  let attachments = [];

  // get the attachments present in the messages
  attachments = attachments.concat(
    ...messages.map((message) => {
      return message.attachments;
    })
  );

  attachments.forEach((attachment) => {
    // remove attachment files from the local storage
    removeLocalFile(attachment.localPath);
  });

  // delete all the messages
  await ChatMessage.deleteMany({
    chat: new mongoose.Types.ObjectId(chatId),
  });
};

const searchAvailableUsers = async (req, res) => {
  const users = await User.aggregate([
    {
      $match: {
        _id: {
          $ne: req.user._id, // avoid logged in user
        },
      },
    },
    {
      $project: {
        avatar: 1,
        name: 1,
        email: 1,
      },
    },
  ]);

  res
    .status(StatusCodes.OK)
    .json(CustomResponse(StatusCodes.OK, users, "Users Fetched Successfully!"));
};

const createOrGetAOneOnOneChat = async (req, res) => {
  const { receiverId } = req.params;

  // Check if it's a valid receiver
  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new CustomError.NotFoundError("Receiver does not exist");
  }

  // check if receiver is not the user who is requesting a chat
  if (receiver._id.toString() === req.user._id.toString()) {
    throw new CustomError.BadRequestError("You cannot chat with yourself");
  }

  const chat = await Chat.aggregate([
    {
      $match: {
        isGroupChat: false, // avoid group chats. This controller is responsible for one on one chats
        // Also, filter chats with participants having receiver and logged in user only
        $and: [
          {
            participants: { $elemMatch: { $eq: req.user._id } },
          },
          {
            participants: {
              $elemMatch: { $eq: new mongoose.Types.ObjectId(receiverId) },
            },
          },
        ],
      },
    },
    ...chatCommonAggregation(),
  ]);

  if (chat.length) {
    // if we find the chat that means user already has created a chat
    res
      .status(StatusCodes.OK)
      .json(CustomResponse(StatusCodes.OK, chat[0], "Chat Already Exists"));
  }

  // if not we need to create a new one on one chat
  const newChatInstance = await Chat.create({
    name: "One on one chat",
    participants: [req.user._id, new mongoose.Types.ObjectId(receiverId)], // add receiver and logged in user as participants
    admin: req.user._id,
  });

  // structure the chat as per the common aggregation to keep the consistency
  const createdChat = await Chat.aggregate([
    {
      $match: {
        _id: newChatInstance._id,
      },
    },
    ...chatCommonAggregation(),
  ]);

  const payload = createdChat[0]; // store the aggregation result

  if (!payload) {
    throw new CustomError("Internal server error");
  }

  // logic to emit socket event about the new chat added to the participants
  payload?.participants?.forEach((participant) => {
    if (participant._id.toString() === req.user._id.toString()) return; // don't emit the event for the logged in use as he is the one who is initiating the chat

    // emit event to other participants with new chat as a payload

    emitSocketEvent(
      req,
      participant._id?.toString(),
      ChatEventEnum.NEW_CHAT_EVENT,
      payload
    );
  });

  res
    .status(StatusCodes.CREATED)
    .json(
      CustomResponse(StatusCodes.CREATED, payload, "Chat Created Sucessfully!")
    );
};

const createAGroupChat = async (req, res) => {
  const { name, participants } = req.body;

  // Check if user is not sending himself as a participant. This will be done manually
  if (participants.includes(req.user._id.toString())) {
    throw new CustomError.BadRequestError(
      "Participants array should not contain the group creator"
    );
  }

  const members = [...new Set([...participants, req.user._id.toString()])]; // check for duplicates

  if (members.length < 3) {
    // check after removing the duplicate
    // We want group chat to have minimum 3 members including admin
    throw new CustomError.BadRequestError(
      "Seems like you have passed duplicate participants."
    );
  }

  // Create a group chat with provided members
  const groupChat = await Chat.create({
    name,
    isGroupChat: true,
    participants: members,
    admin: req.user._id,
  });

  // structure the chat
  const chat = await Chat.aggregate([
    {
      $match: {
        _id: groupChat._id,
      },
    },
    ...chatCommonAggregation(),
  ]);

  const payload = chat[0];

  if (!payload) {
    throw new CustomError("Internal server error");
  }

  // logic to emit socket event about the new group chat added to the participants
  payload?.participants?.forEach((participant) => {
    if (participant._id.toString() === req.user._id.toString()) return; // don't emit the event for the logged in use as he is the one who is initiating the chat
    // emit event to other participants with new chat as a payload
    emitSocketEvent(
      req,
      participant._id?.toString(),
      ChatEventEnum.NEW_CHAT_EVENT,
      payload
    );
  });

  res
    .status(StatusCodes.CREATED)
    .json(
      CustomResponse(StatusCodes.CREATED, payload, "Group Created Sucessfully!")
    );
};

const getGroupChatDetails = async (req, res) => {
  const { chatId } = req.params;
  const groupChat = await Chat.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(chatId),
        isGroupChat: true,
      },
    },
    ...chatCommonAggregation(),
  ]);

  const chat = groupChat[0];

  if (!chat) {
    throw new CustomError.NotFoundError("Group chat does not exist");
  }

  res
    .status(StatusCodes.OK)
    .json(
      CustomResponse(StatusCodes.OK, chat, "Group Details Fetched Sucessfully!")
    );
};

const renameGroupChat = async (req, res) => {
  const { chatId } = req.params;
  const { name } = req.body;

  // check for chat existence
  const groupChat = await Chat.findOne({
    _id: new mongoose.Types.ObjectId(chatId),
    isGroupChat: true,
  });

  if (!groupChat) {
    throw new CustomError.NotFoundError("Group chat does not exist");
  }

  // only admin can change the name
  if (groupChat.admin?.toString() !== req.user._id?.toString()) {
    throw new CustomError.BadRequestError("You are not an admin");
  }

  const updatedGroupChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $set: {
        name,
      },
    },
    { new: true }
  );

  const chat = await Chat.aggregate([
    {
      $match: {
        _id: updatedGroupChat._id,
      },
    },
    ...chatCommonAggregation(),
  ]);

  const payload = chat[0];

  if (!payload) {
    throw new CustomError("Internal server error");
  }

  // logic to emit socket event about the updated chat name to the participants
  payload?.participants?.forEach((participant) => {
    // emit event to all the participants with updated chat as a payload
    emitSocketEvent(
      req,
      participant._id?.toString(),
      ChatEventEnum.UPDATE_GROUP_NAME_EVENT,
      payload
    );
  });

  res
    .status(StatusCodes.OK)
    .json(
      CustomResponse(StatusCodes.OK, chat[0], "Group Renamed Sucessfully!")
    );
};

const deleteGroupChat = async (req, res) => {
  const { chatId } = req.params;

  // check for the group chat existence
  const groupChat = await Chat.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(chatId),
        isGroupChat: true,
      },
    },
    ...chatCommonAggregation(),
  ]);

  const chat = groupChat[0];

  if (!chat) {
    throw new CustomError.NotFoundError("Group chat does not exist");
  }

  // check if the user who is deleting is the group admin
  if (chat.admin?.toString() !== req.user._id?.toString()) {
    throw new CustomError.BadRequestError("Only admin can delete the group");
  }

  await Chat.findByIdAndDelete(chatId); // delete the chat

  await deleteCascadeChatMessages(chatId); // remove all messages and attachments associated with the chat

  // logic to emit socket event about the group chat deleted to the participants
  chat?.participants?.forEach((participant) => {
    if (participant._id.toString() === req.user._id.toString()) return; // don't emit the event for the logged in use as he is the one who is deleting
    // emit event to other participants with left chat as a payload
    emitSocketEvent(
      req,
      participant._id?.toString(),
      ChatEventEnum.LEAVE_CHAT_EVENT,
      chat
    );
  });

  res
    .status(StatusCodes.OK)
    .json(CustomResponse(StatusCodes.OK, {}, "Group Deleted Sucessfully!"));
};

const deleteOneOnOneChat = async (req, res) => {
  const { chatId } = req.params;
  console.log(chatId, "chatId");

  // check for chat existence
  const chat = await Chat.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(chatId),
      },
    },
    ...chatCommonAggregation(),
  ]);

  const payload = chat[0];

  if (!payload) {
    throw new CustomError.NotFoundError("Chat does not exist");
  }

  await Chat.findByIdAndDelete(chatId); // delete the chat even if user is not admin because it's a personal chat

  await deleteCascadeChatMessages(chatId); // delete all the messages and attachments associated with the chat

  const otherParticipant = payload?.participants?.find(
    (participant) => participant?._id.toString() !== req.user._id.toString() // get the other participant in chat for socket
  );

  // emit event to other participant with left chat as a payload
  emitSocketEvent(
    req,
    otherParticipant._id?.toString(),
    ChatEventEnum.LEAVE_CHAT_EVENT,
    payload
  );

  res
    .status(StatusCodes.OK)
    .json(CustomResponse(StatusCodes.OK, {}, "Chat Deleted Sucessfully!"));
};

const leaveGroupChat = async (req, res) => {
  const { chatId } = req.params;

  // check if chat is a group
  const groupChat = await Chat.findOne({
    _id: new mongoose.Types.ObjectId(chatId),
    isGroupChat: true,
  });

  if (!groupChat) {
    throw new CustomError.NotFoundError("Group chat does not exist");
  }

  const existingParticipants = groupChat.participants;

  // check if the participant that is leaving the group, is part of the group
  if (!existingParticipants?.includes(req.user?._id)) {
    throw new CustomError.BadRequestError(
      "You are not a part of this group chat"
    );
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: {
        participants: req.user?._id, // leave the group
      },
    },
    { new: true }
  );

  const chat = await Chat.aggregate([
    {
      $match: {
        _id: updatedChat._id,
      },
    },
    ...chatCommonAggregation(),
  ]);

  const payload = chat[0];

  if (!payload) {
    throw new CustomError.BadRequestError("Internal server error");
  }

  res
    .status(StatusCodes.OK)
    .json(
      CustomResponse(StatusCodes.OK, payload, "Left a group successfully!")
    );
};

const addNewParticipantInGroupChat = async (req, res) => {
  const { chatId, participantId } = req.params;

  // check if chat is a group
  const groupChat = await Chat.findOne({
    _id: new mongoose.Types.ObjectId(chatId),
    isGroupChat: true,
  });

  if (!groupChat) {
    throw new CustomError.NotFoundError("Group chat does not exist");
  }

  // check if user who is adding is a group admin
  if (groupChat.admin?.toString() !== req.user._id?.toString()) {
    throw new CustomError.BadRequestError("You are not an admin");
  }

  const existingParticipants = groupChat.participants;

  // check if the participant that is being added in a part of the group
  if (existingParticipants?.includes(participantId)) {
    throw new CustomError.BadRequestError(
      "Participant already in a group chat"
    );
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: {
        participants: participantId, // add new participant id
      },
    },
    { new: true }
  );

  const chat = await Chat.aggregate([
    {
      $match: {
        _id: updatedChat._id,
      },
    },
    ...chatCommonAggregation(),
  ]);

  const payload = chat[0];

  if (!payload) {
    throw new CustomError.BadRequestError("Internal server error");
  }

  // emit new chat event to the added participant
  emitSocketEvent(req, participantId, ChatEventEnum.NEW_CHAT_EVENT, payload);

  res
    .status(StatusCodes.OK)
    .json(
      CustomResponse(StatusCodes.OK, payload, "Participant added successfully!")
    );
};

const removeParticipantFromGroupChat = async (req, res) => {
  const { chatId, participantId } = req.params;

  // check if chat is a group
  const groupChat = await Chat.findOne({
    _id: new mongoose.Types.ObjectId(chatId),
    isGroupChat: true,
  });

  if (!groupChat) {
    throw new CustomError.NotFoundError("Group chat does not exist");
  }

  // check if user who is deleting is a group admin
  if (groupChat.admin?.toString() !== req.user._id?.toString()) {
    throw new CustomError.BadRequestError("You are not an admin");
  }

  const existingParticipants = groupChat.participants;

  // check if the participant that is being removed in a part of the group
  if (!existingParticipants?.includes(participantId)) {
    throw new CustomError.BadRequestError(
      "Participant does not exist in the group chat"
    );
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: {
        participants: participantId, // remove participant id
      },
    },
    { new: true }
  );

  const chat = await Chat.aggregate([
    {
      $match: {
        _id: updatedChat._id,
      },
    },
    ...chatCommonAggregation(),
  ]);

  const payload = chat[0];

  if (!payload) {
    throw new CustomError.BadRequestError("Internal server error");
  }

  // emit leave chat event to the removed participant
  emitSocketEvent(req, participantId, ChatEventEnum.LEAVE_CHAT_EVENT, payload);

  res
    .status(StatusCodes.OK)
    .json(
      CustomResponse(
        StatusCodes.OK,
        payload,
        "Participant removed successfully!"
      )
    );
};

const getAllChats = async (req, res) => {
  const chats = await Chat.aggregate([
    {
      $match: {
        participants: {
          $elemMatch: { $eq: new mongoose.Types.ObjectId(req.user._id) },
        }, // get all chats that have logged in user as a participant
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
    ...chatCommonAggregation(),
  ]);

  res
    .status(StatusCodes.OK)
    .json(
      CustomResponse(StatusCodes.OK, chats, "User chats fetched successfully!")
    );
};

module.exports = {
  addNewParticipantInGroupChat,
  createAGroupChat,
  createOrGetAOneOnOneChat,
  deleteGroupChat,
  deleteOneOnOneChat,
  getAllChats,
  getGroupChatDetails,
  leaveGroupChat,
  removeParticipantFromGroupChat,
  renameGroupChat,
  searchAvailableUsers,
};
