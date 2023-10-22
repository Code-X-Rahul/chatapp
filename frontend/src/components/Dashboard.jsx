import React from "react";

const Dashboard = () => {
  return (
    <div className="home-Container">
      <div className="sidebar">
        <img
          id="profilePicture"
          src="image/profilesample.jpg"
          alt="Profile-Picture"
        />
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
          <div className="addContacts">
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
          </div>
        </div>

        <div className="bottomSidebar">
          <ion-icon className="sidebarImg" name="settings-outline"></ion-icon>
        </div>
      </div>
      <div className="connectionContainer">
        <div id="connectionTop">
          <div id="inputContainer">
            <ion-icon id="searchImg" name="search"></ion-icon>
            <input
              id="searchBox"
              type="text"
              placeholder="Enter for search..."
            />
          </div>
        </div>
        <div id="connectionBottom">
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/profilesample.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">Rahul Rajput</h3>
              <p className="contactMessage">Chatty Application initiated...</p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/Carl.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">John Karl Limjoco</h3>
              <p className="contactMessage">
                Hey Rahul i'm Currently Working on the frontend
              </p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/profilesample.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">Rahul Rajput</h3>
              <p className="contactMessage">
                Hey John. I'm Currently Working on a Backend side how are you
                doing there
              </p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/Carl.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">John Karl Limjoco</h3>
              <p className="contactMessage">
                Hey Rahul i'm Currently Working on the frontend
                sideasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas
              </p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/profilesample.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">Rahul Rajput</h3>
              <p className="contactMessage">
                Hey John. I'm Currently Working on a Backend side how are you
                doing there
              </p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/Carl.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">John Karl Limjoco</h3>
              <p className="contactMessage">
                Hey Rahul i'm Currently Working on the frontend
                sideasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas
              </p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/profilesample.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">Rahul Rajput</h3>
              <p className="contactMessage">
                Hey John. I'm Currently Working on a Backend side how are you
                doing there
              </p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/Carl.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">John Karl Limjoco</h3>
              <p className="contactMessage">
                Hey Rahul i'm Currently Working on the frontend
                sideasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas
              </p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/profilesample.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">Rahul Rajput</h3>
              <p className="contactMessage">
                Hey John. I'm Currently Working on a Backend side how are you
                doing there
              </p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/Carl.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">John Karl Limjoco</h3>
              <p className="contactMessage">
                Hey Rahul i'm Currently Working on the frontend
                sideasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas
              </p>
            </div>
          </div>
          <div className="contactContainer">
            <div className="contactLeft">
              <img
                className="contactImage"
                src="image/profilesample.jpg"
                alt="contact-Picture"
              />
            </div>
            <div className="contactRight">
              <h3 className="contactName">Rahul Rajput</h3>
              <p className="contactMessage">
                Hey John. I'm Currently Working on a Backend side how are you
                doing there
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="chatContainerTop">
          <div className="chatLeftContainer">
            <img className="chatimage" src="image/Carl.jpg" alt="" />
          </div>
          <div className="chatMiddleContainer">
            <h1 className="chatName">Rahul Rajput</h1>
            <p className="chatStatus">last seen today at 8:15 pm</p>
          </div>
          <div className="chatRightContainer">
            <ion-icon className="chattool-img" name="call-outline"></ion-icon>
            <ion-icon
              className="chattool-img"
              name="videocam-outline"
            ></ion-icon>
            <ion-icon className="chattool-img" name="search-outline"></ion-icon>
            <ion-icon
              className="chattool-img"
              name="ellipsis-vertical"
            ></ion-icon>
          </div>
        </div>
        <div className="chatContainerMiddle">
          <p className="myMessage">Hello Bro</p>
          <p className="myMessage">how you doing there in backend side</p>
          <p className="friendMessage">
            Hello bro. doing fine. almost done in backend side. how about you in
            frontend side
          </p>
          <p className="myMessage">
            so far so good bro. i'm almost done with the layout
          </p>
          <p className="friendMessage">
            oh. that's great how about the functionality
          </p>
          <p className="myMessage">
            i'll be starting to do the javascript once i'm done with the layout
          </p>
          <p className="friendMessage">
            okay bro. goodluck you can ask me for help if you needed
          </p>
          <p className="myMessage">
            alright thank you so much bro. goodluck also
          </p>
          <p className="friendMessage">okay bro bye</p>
          <p className="myMessage">Hello bro</p>
          <p className="myMessage">how you doing there in backend side</p>
          <p className="friendMessage">
            Hello bro. doing fine. almost done in backend side. how about you in
            frontend side
          </p>
          <p className="myMessage">
            so far so good bro. i'm almost done with the layout
          </p>
          <p className="friendMessage">
            oh. that's great how about the functionality
          </p>
          <p className="myMessage">
            i'll be starting to do the javascript once i'm done with the layout
          </p>
          <p className="friendMessage">
            okay bro. goodluck you can ask me for help if you needed
          </p>
          <p className="myMessage">
            alright thank you so much bro. goodluck also
          </p>
          <p className="friendMessage">okay bro bye</p>
          <p className="myMessage">Hello bro</p>
          <p className="myMessage">how you doing there in backend side</p>
          <p className="friendMessage">
            Hello bro. doing fine. almost done in backend side. how about you in
            frontend side
          </p>
          <p className="myMessage">
            so far so good bro. i'm almost done with the layout
          </p>
          <p className="friendMessage">
            oh. that's great how about the functionality
          </p>
          <p className="friendMessage">
            i'll be starting to do the javascript once i'm done with the layout
          </p>
          <p className="friendMessage">
            okay bro. goodluck you can ask me for help if you needed
          </p>
          <p className="myMessage">
            alright thank you so much bro. goodluck also
          </p>
          <p className="friendMessage">okay bro bye</p>
          <p className="myMessage">Hello bro</p>
          <p className="myMessage">how you doing there in backend side</p>
          <p className="friendMessage">
            Hello bro. doing fine. almost done in backend side. how about you in
            frontend side
          </p>
          <p className="myMessage">
            so far so good bro. i'm almost done with the layout
          </p>
          <p className="friendMessage">
            oh. that's great how about the functionality
          </p>
          <p className="friendMessage">
            i'll be starting to do the javascript once i'm done with the layout
          </p>
          <p className="friendMessage">
            okay bro. goodluck you can ask me for help if you needed
          </p>
          <p className="myMessage">
            alright thank you so much bro. goodluck also
          </p>
          <p className="friendMessage">okay bro bye</p>
        </div>
        <div className="chatContainerBottom">
          <div className="chatleftDiv">
            <ion-icon
              className="bottomtool-Img"
              name="happy-outline"
            ></ion-icon>
            <ion-icon className="bottomtool-Img" name="add-outline"></ion-icon>
          </div>
          <div className="chatMiddleDiv">
            <input
              id="messageInput"
              type="text"
              placeholder="Enter Your Message here."
            />
          </div>
          <div className="chatRightDiv">
            <ion-icon className="bottomtool-Img" name="mic"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
