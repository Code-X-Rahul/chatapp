// backend/app.js

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

app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global`

const cookieParser = require("cookie-parser");
const cors = require("cors");

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//socket io
const { initializeSocketIO } = require("./socket/index.js");

app.set("trust proxy", 1);

var corsOptions = {
  origin: ["http://localhost:3000", "https://chatapp-frontend-rho.vercel.app/"],
  credentials: true,
};
// app.use(cors());
// app.use(express.static("public")); // configure static file to save images locally
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("Welcome to the chatapp backend");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);

initializeSocketIO(io);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
