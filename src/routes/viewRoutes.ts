import express from "express";
const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.render("../view/index.html");
});

router.get("/hello", (req: any, res: any) => {
  res.render("../view/personalChat.html");
});

export default router;
