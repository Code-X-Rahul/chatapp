import express from "express";
const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.render("index");
});

router.get("/hello", (req: any, res: any) => {
  res.render("personalChat");
});

export default router;
