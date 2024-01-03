const mongoose = require("mongoose");
const { getLocalPath, getStaticFilePath } = require("../utils/helpers");
const ChatMessage = require("../models/Message");
const Chat = require("../models/Chat");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { ChatEventEnum } = require("../constants");
const { emitSocketEvent } = require("../socket/index");

/**
 * @description Utility function which returns the pipeline stages to structure the chat message schema with common lookups
 * @returns {mongoose.PipelineStage[]}
 */
const chatMessageCommonAggregation = () => {
  return [
    {
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
  ];
};

const getAllMessages = async (req, res) => {
  const { chatId } = req.params;

  const selectedChat = await Chat.findById(chatId);

  if (!selectedChat) {
    // throw new ApiError(404, "Chat does not exist");
    throw new CustomError.NotFoundError("Chat does not exist");
  }

  // Only send messages if the logged in user is a part of the chat he is requesting messages of
  if (!selectedChat.participants?.includes(req.user?._id)) {
    // throw new ApiError(400, "User is not a part of this chat");
    throw new CustomError.BadRequestError("User is not a part of this chat");
  }

  const messages = await ChatMessage.aggregate([
    {
      $match: {
        chat: new mongoose.Types.ObjectId(chatId),
      },
    },
    ...chatMessageCommonAggregation(),
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  res.status(200).json({
    data: messages,
    success: true,
    message: "Messages fetched successfully",
  });
};

const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;

  if (!content && !req.files?.attachments?.length) {
    // throw new ApiError(400, "Message content or attachment is required");
    throw new CustomError.BadRequestError(
      "Message content or attachment is required"
    );
  }

  const selectedChat = await Chat.findById(chatId);

  if (!selectedChat) {
    // throw new ApiError(404, "Chat does not exist");
    throw new CustomError.NotFoundError("Chat does not exist");
  }

  const messageFiles = [];

  if (req.files && req.files.attachments?.length > 0) {
    req.files.attachments?.map((attachment) => {
      messageFiles.push({
        url: getStaticFilePath(req, attachment.filename),
        localPath: getLocalPath(attachment.filename),
      });
    });
  }

  // Create a new message instance with appropriate metadata
  const message = await ChatMessage.create({
    sender: new mongoose.Types.ObjectId(req.user._id),
    content: content || "",
    chat: new mongoose.Types.ObjectId(chatId),
    attachments: messageFiles,
  });

  // update the chat's last message which could be utilized to show last message in the list item
  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $set: {
        lastMessage: message._id,
      },
    },
    { new: true }
  );

  // structure the message
  const messages = await ChatMessage.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(message._id),
      },
    },
    ...chatMessageCommonAggregation(),
  ]);

  // Store the aggregation result
  const receivedMessage = messages[0];

  if (!receivedMessage) {
    // throw new ApiError(500, "Internal server error");
    throw new CustomError.BadRequestError("Internal server error");
  }

  // logic to emit socket event about the new message created to the other participants
  chat.participants.forEach((participantObjectId) => {
    // here the chat is the raw instance of the chat in which participants is the array of object ids of users
    // avoid emitting event to the user who is sending the message
    if (participantObjectId.toString() === req.user._id.toString()) return;

    // emit the receive message event to the other participants with received message as the payload
    emitSocketEvent(
      req,
      participantObjectId.toString(),
      ChatEventEnum.MESSAGE_RECEIVED_EVENT,
      receivedMessage
    );
  });

  res.status(StatusCodes.CREATED).json({
    data: receivedMessage,
    success: true,
    message: "Message saved successfully",
  });
};

module.exports = { getAllMessages, sendMessage };
