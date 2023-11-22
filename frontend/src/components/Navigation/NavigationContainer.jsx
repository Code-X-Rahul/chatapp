import React, { useState } from "react";
import Modal from "../Modal";

const NavigationContainer = () => {
  const [show, setShow] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  return (
    <>
      <div className="sidebar">
        <img
          id="profilePicture"
          src="image/profilesample.jpg"
          alt="Profile-Picture"
          onClick={() => setShow(true)}
        />
        <Modal show={show} closeModal={() => setShow(false)}>
          <div className="content">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <span></span>
              <li onClick={() => navigate("/")}>Log out</li>
            </ul>
          </div>
        </Modal>
        <div className="middleSidebar">
          <ion-icon className="sidebarImg" name="people-outline"></ion-icon>
          <ion-icon
            className="sidebarImg"
            name="notifications-outline"
          ></ion-icon>
          <ion-icon className="sidebarImg addPlusBtn" name="add"></ion-icon>
          <ion-icon
            className="sidebarImg"
            name="ellipsis-horizontal"
          ></ion-icon>
          {/* <div className="addContacts">
            <input
              className="addContactName"
              type="text"
              name=""
              id=""
              placeholder="Contact Name"
            />
            <input
              className="addContactId"
              type="text"
              name=""
              id=""
              placeholder="Contact ID"
            />
            <div className="buttonDiv">
              <button className="addBtn">Add</button>
              <button className="addCancel">Cancel</button>
            </div>
          </div> */}
        </div>

        <div className="bottomSidebar">
          <ion-icon className="sidebarImg" name="settings-outline"></ion-icon>
        </div>
      </div>
    </>
  );
};

export default NavigationContainer;
