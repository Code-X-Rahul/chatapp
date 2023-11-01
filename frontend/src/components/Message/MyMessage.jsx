import React from "react";
import { useContact } from "../../context/contactContext";

const MyMessage = ({ content }) => {
  const { contacts, setContacts, message } = useContact();

  return (
    <>
      <p className="myMessage">{content}</p>
      <p className="myMessage">how you doing there in backend side</p>
    </>
  );
};

export default MyMessage;
