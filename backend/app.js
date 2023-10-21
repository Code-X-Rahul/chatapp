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

io.on("connection", () => {
  console.log("connected");
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
