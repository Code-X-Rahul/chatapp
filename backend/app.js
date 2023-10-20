// backend/app.js

require("dotenv").config();
require("express-async-errors");

//EXPRESS
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(
  cors({
    origin: [
      "https://chatapp-frontend-rho.vercel.app/",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start the Express.js server
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
