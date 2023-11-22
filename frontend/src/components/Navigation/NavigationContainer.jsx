import React, { useState } from "react";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

const NavigationContainer = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showFriend, setShowFriend] = useState(false);

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
          {/* <ion-icon
            className="sidebarImg"
            name="notifications-outline"
          ></ion-icon> */}
          <div className="addPlus-Div">
            <ion-icon
              className="sidebarImg addPlusBtn"
              name="add"
              onClick={() => setShowFriend(true)}
            />
            <Modal show={showFriend} closeModal={() => setShowFriend(false)}>
              <form className="searchFriendDiv">
                <input type="text" placeholder="User ID" />
                <div className="button-Div">
                  <button>Search</button>
                  <button>Cancel</button>
                </div>
              </form>
            </Modal>
          </div>

          {/* <ion-icon
            className="sidebarImg"
            name="ellipsis-horizontal"
          ></ion-icon> */}
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
          <ion-icon
            className="sidebarImg bottom-Setting"
            name="settings-outline"
            onClick={() => setShowSetting(true)}
          ></ion-icon>
          {/* <IoSettingsOutline /> */}

          <Modal show={showSetting} closeModal={() => setShowSetting(false)}>
            <div className="content-setting">
              <ul>
                <li>Settings</li>
              </ul>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default NavigationContainer;
