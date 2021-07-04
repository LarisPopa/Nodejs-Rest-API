const router = require("express").Router();
const userController = require("../controller/user");
const { auth } = require("../middlewares/auth");

router.get("/getUsers", auth, userController.getUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/generateAccessToken", userController.generateAccessToken);
router.post("/logOut", userController.logOut);
router.post("/delete", userController.deleteUser);
router.post("/get", userController.getUser);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword", userController.resetPassword);

module.exports = router;
