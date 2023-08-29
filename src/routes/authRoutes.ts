import express from "express";

const router = express.Router();

router.route("/login").post(()=>{
    console.log("hitted login route")
})

export default router;
