import express, { Request, Response } from "express";
import passport from "passport";

const User = require("../model/userModel");

const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err: unknown, user: any) => {
      if (err) {
        console.error(err);
        return res.render("signup");
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  );
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signup",
  }),
  (req: Request, res: Response) => {}
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout(function () {
    res.redirect("/signup");
  });
});

module.exports = router;
