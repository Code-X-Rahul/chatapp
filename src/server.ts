import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

import authRouter from "./routes/authRoutes";
import viewRouter from "./routes/viewRoutes";
import connectDb from "./db/db";

const app = express();
const server = http.createServer(app);

app.use("/", viewRouter);
app.use("/auth", authRouter);

// set the view engine to ejs
// app.set("view engine", "ejs");

app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/view/index.html");
});

app.get("/chat", (req: any, res: any) => {
  res.render(__dirname + "/view/personalChat.html");
});

const io = new Server(server);

io.on("connection", (socket: any) => {
  console.log("a user connected");

  const count = io.of("/").sockets.size;
  console.log(count);

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg: string) => {
    io.emit("chat message", msg);
  });
});

const personalChat = io.of("/personal-chat");

personalChat.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("personal message", (msg: string) => {
    personalChat.emit("personal message", msg);
  });
});

const connect = async () => {
  try {
    // await connectDb(process.env.MONGO_URI!);
    server.listen(3000, () => {
      console.log("listening on *:3000");
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
