import React, { createContext, useContext, useState } from "react";

export const ContactContext = createContext();

export function useContact() {
  return useContext(ContactContext);
}

const ContactProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Karl",
      image: "image/Carl.jpg",
      chats: [
        {
          sender: "John Karl",
          reciever: "Rahul Rajput",
          Content: " Hey Rahul i'm Currently Working on the frontend",
        },
        {
          sender: "Rahul Rajput",
          reciever: "John Karl",
          Content: " Okay bro. keep up the good work.",
        },
        {
          sender: "Rahul Rajput",
          reciever: "John Karl",
          Content: "i'm currently working on my stuff bro",
        },
      ],
    },
    {
      id: 2,
      name: "Rahul Rajput",
      image: "image/profilesample.jpg",
      chats: [
        {
          sender: "Rahul Rajput",
          reciever: "",
          Content: "Hello baby how are you there",
        },
        {
          sender: "Rahul Rajput",
          reciever: "",
          Content: "are you done with your homework?",
        },
        {
          sender: "Jane Rahal",
          reciever: "",
          Content: "not yet.",
        },
      ],
    },
    {
      id: 3,
      name: "Jane Rahal",
      image: "image/profilesample.jpg",
      chats: [
        {
          sender: "",
          reciever: "",
          Content: "are you going to school today?",
        },
      ],
    },
    {
      id: 4,
      name: "Jerome Abino",
      image: "image/profilesample.jpg",
      chats: [
        {
          sender: "",
          reciever: "",
          Content: "How Are you my brother",
        },
      ],
    },
    {
      id: 5,
      name: "Kate Banal",
      image: "image/profilesample.jpg",
      chats: [
        {
          sender: "",
          reciever: "",
          Content: "Hello There?",
        },
      ],
    },
  ]);

  const handleMessage = (id) => {
    const messageList = contacts.filter(
      (contact) => contact.id === id && contact.chats
    );
    setMessages(messageList);
  };

  return (
    <ContactContext.Provider
      value={{ contacts, setContacts, handleMessage, messages, setMessages }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
