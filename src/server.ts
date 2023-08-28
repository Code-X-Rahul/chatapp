import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/view/index.html");
});
app.get("/hello", (req: any, res: any) => {
  res.sendFile(__dirname + "/view/personalChat.html");
});

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

server.listen(3000, () => {
  console.log("listening on *:3000");
});
