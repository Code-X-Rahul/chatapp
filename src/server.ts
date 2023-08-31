import { NextFunction, Request, Response } from "express";
import connectDb from "./db/db";
require("dotenv").config();
const express = require("express");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const bodyParser = require("body-parser");

const User = require("./model/userModel");
const authRoutes = require("./routes/authRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/", viewRoutes);
app.use("/auth", authRoutes);


const connect = async () => {
  try {
    await connectDb(process.env.MONGO_URI!);
    app.listen(3000, () => {
      console.log("Server started on http://localhost:3000");
    });
  } catch (error) {}
};

connect();
