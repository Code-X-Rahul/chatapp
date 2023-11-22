// backend/app.js

// import session from "express-session";
// import fs from "fs";
// import passport from "passport";
// import path from "path";
// import { initializeSocketIO } from "./socket/index.js";

require("dotenv").config();
require("express-async-errors");

//EXPRESS
const express = require("express");
const app = express();
const { createServer } = require("http");

//Socket IO
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://chatapp-frontend-rho.vercel.app/",
    ],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const cookieParser = require("cookie-parser");
const cors = require("cors");

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const User = require("./models/User");
const { authenticateUser } = require("./middleware/authentication");

app.set("trust proxy", 1);

var corsOptions = {
  origin: ["http://localhost:3000", "https://chatapp-frontend-rho.vercel.app/"],
  credentials: true,
};
// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("Welcome to the chatapp backend");
});

app.delete("/", async (req, res) => {
  const total = await User.deleteMany({});
  res.json(total);
});

app.get("/api/v1/getUsers", async (req, res) => {
  const success = await User.find({});
  res.json(success);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//chat setup

// io.use((socket, next) => {
//   // Use the cookie-parser middleware to parse cookies
//   cookieParser(process.env.JWT_SECRET)(socket.request, socket.request.res, (err) => {
//     if (err) {
//       return next(new Error("Cookie parsing failed"));
//     }
//     // Call the authenticateUser middleware function
//     authenticateUser(socket.request, socket.request.res, (err) => {
//       if (err) {
//         // If authentication fails, terminate the connection
//         return next(new Error("Authentication failed"));
//       }
//       // If authentication is successful, continue with the connection
//       next();
//     });
//   });
// });

// io.on("connection", (socket) => {
//   console.log("connected");
//   // console.log(socket?.user);

//   socket.on("disconnect", () => {
//     console.log(`${socket.id} disconnected`);
//   });

//   io.on("message", (msg) => {
//     console.log(msg);

//     // Broadcast the message to all connected clients
//     io.emit("message", msg);
//   });
// });

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData.userId);
    console.log(userData);
  });

  socket.on("join chat", (room) => {
    console.log("User Joined Room: " + room);
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

// Start the Express.js server
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    httpServer.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
