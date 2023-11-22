import React, { useEffect, useState } from "react";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import { useContact } from "../../context/contactContext";
import { useNavigate } from "react-router-dom";

const MessageForm = () => {
  const navigate = useNavigate();
  const { contacts, setContacts, messages, setMessages, handleMessage } =
    useContact();
  const [createMessage, setCreateMessage] = useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      sender: messages[0].name,
      reciever: "not",
      Content: createMessage,
    };

    const updateContact = contacts.map((contact) =>
      contact.id === messages[0].id
        ? { ...contact, chats: [...messages[0].chats, newMessage] }
        : contact
    );

    setContacts(updateContact);
    setCreateMessage("");
  };

  useEffect(() => {
    const fetchContacts = () => {
      if (messages.length !== 0) {
        const renderContact = contacts.filter(
          (contact) => contact.id == messages[0].id && contact
        );
        setMessages(renderContact);
      } else {
        setMessages([]);
      }
    };

    fetchContacts();
  }, [contacts]);

  return (
    <div className="chatContainer">
      {messages[0] ? (
        <>
          <div className="chatContainerTop">
            <div className="chatLeftContainer">
              <img className="chatimage" src={messages[0].image} alt="" />
            </div>
            <div className="chatMiddleContainer">
              <h1 className="chatName">{messages[0].name}</h1>
              <p className="chatStatus"></p>
            </div>
            <div className="chatRightContainer">
              <ion-icon
                className="chattool-img"
                name="search-outline"
              ></ion-icon>
              <ion-icon
                className="chattool-img"
                name="ellipsis-vertical"
              ></ion-icon>
            </div>
          </div>
          <div className="chatContainerMiddle">
            {messages.map((message) =>
              message.chats
                .slice()
                .reverse()
                .map((chat, index) =>
                  message.name.toLowerCase() == chat.sender.toLowerCase() ? (
                    <p className="myMessage" key={index}>
                      {" "}
                      {chat.Content}
                    </p>
                  ) : (
                    <p className="friendMessage" key={index}>
                      {chat.Content}
                    </p>
                  )
                )
            )}
          </div>
          <div className="chatContainerBottom">
            <form className="chatMiddleDiv" onSubmit={handleSendMessage}>
              <input
                id="messageInput"
                type="text"
                placeholder="Enter Your Message here."
                value={createMessage}
                onChange={(e) => setCreateMessage(e.target.value)}
              />
              <button className="chatRightDiv" disabled={!createMessage.trim()}>
                <ion-icon
                  style={{
                    color: createMessage ? "rgb(124, 255, 255)" : null,
                  }}
                  className="bottomtool-Img"
                  name="send-outline"
                ></ion-icon>
              </button>
            </form>
          </div>
        </>
      ) : (
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Create New Conversation
        </h1>
      )}
    </div>
  );
};

export default MessageForm;
