const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  getAllMessages,
  sendMessage,
} = require("../controllers/messageController.js");
const { upload } = require("../middleware/multer.js");
const { sendMessageValidator } = require("../validators/messageValidator.js");
const {
  mongoIdPathVariableValidator,
} = require("../validators/mongoValidators.js");

router.use(authenticateUser);

router
  .route("/:chatId")
  .get(mongoIdPathVariableValidator("chatId"), getAllMessages)
  .post(
    upload.fields([{ name: "attachments", maxCount: 5 }]),
    mongoIdPathVariableValidator("chatId"),
    sendMessageValidator(),
    sendMessage
  );

module.exports = router;
