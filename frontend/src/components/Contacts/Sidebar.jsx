import React, { useState, useRef } from "react";
import { useContact } from "../../context/contactContext";

const Sidebar = () => {
  const { contacts, setContacts, handleMessage } = useContact();
  // console.log(contacts);
  return (
    <div className="connectionContainer">
      <div id="connectionTop">
        <div id="inputContainer">
          <ion-icon id="searchImg" name="search"></ion-icon>
          <input id="searchBox" type="text" placeholder="Enter for search..." />
        </div>
      </div>
      <div id="connectionBottom">
        {contacts.map((contact) => (
          <div
            className="contactContainer"
            key={contact.id}
            value={contact.id}
            onClick={() => handleMessage(contact.id)}
          >
            <div className="contactLeft">
              <img
                className="contactImage"
                src={contact.image}
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">{contact.name}</h3>
              <p className="contactMessage">
                {contact.chats[contact.chats.length - 1].Content.slice(0, 45)}
                {contact.chats[contact.chats.length - 1].Content.length > 45
                  ? "..."
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
