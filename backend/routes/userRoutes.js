const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/multer");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  updateUserAvatar,
} = require("../controllers/userController");

router
  .route("/")
  // .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
  .get(authenticateUser, getAllUsers);
  
  router
  .route("/avatar")
  .patch(authenticateUser, upload.single("avatar"), updateUserAvatar);
  
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);


module.exports = router;
