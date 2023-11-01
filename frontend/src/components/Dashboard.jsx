import React from "react";
import MessageForm from "./Message/MessageForm";
import Sidebar from "./Contacts/Sidebar";
import NavigationContainer from "./Navigation/NavigationContainer";
import ContactProvider from "../context/contactContext";

const Dashboard = () => {
  return (
    <div className="home-Container">
      <NavigationContainer />
      <ContactProvider>
        <Sidebar />
        <MessageForm />
      </ContactProvider>
    </div>
  );
};

export default Dashboard;
