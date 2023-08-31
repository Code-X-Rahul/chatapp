import express, { Request, Response } from "express";
const router = express.Router();

// const { isLoggedIn } = require("../middlewares/authMiddleware");

router.get("/", (req: Request, res: Response) => {
  res.render("index");
});

router.get("/login", function (req: Request, res: Response) {
  res.render("login");
});

router.get("/signup", function (req: Request, res: Response) {
  res.render("signup");
});

// router.get("/", isLoggedIn, (req: Request, res: Response) => {
//   res.render("index");
// });
module.exports = router;
