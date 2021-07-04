const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { generateResetToken, sendEmail } = require("../utils/Utils");

//REGISTER
const register = async (req, res) => {
  const { email, password, name, age } = req.body;

  try {
    //check if user already exists in database
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).send("User already exists!");

    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //create user
    const user = new User({ email, password: hashPassword, name, age });
    await user.save();
    res.send("User saved");
  } catch (err) {
    res.status(500).send(err);
  }
};

//LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if the user exists by email
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("Invalid credentials!");

    //check password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).send("Invalid password");

    //create access and refresh tokens
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    //save refresh token
    const rrToken = new Token({ token: refreshToken });
    await rrToken.save();

    return res.json({
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error(err);
  }
};

//FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ err: "User with email not found" });
    const resetToken = crypto.randomBytes(20).toString("hex");

    if (user.resetToken)
      return res.status(400).json({ err: "User already has a reset token" });

    user.resetToken = generateResetToken(resetToken);
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //expire in 10 min
    await user.save();

    const resetUrl = `http://localhost:3000/resetPassword/${user.resetToken}`;
    const message = `
    <h1>Hello, ${user.name}</h1>
    <h2>You have requested a password reset</h2>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message
      });
      res.status(200).json({ succes: true });
    } catch (err) {
      user.resetToken = null;
      user.resetPasswordExpire = null;
      await user.save();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
//RESET PASSWORD
const resetPassword = async (req, res) => {
  const { newPassword, resetPasswordToken } = req.body;

  try {
    const user = await User.findOne({
      resetToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ err: "Invalid Reset Token" });

    //hash new password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    //update user password and use the resetPassword
    user.password = hashPassword;
    user.resetToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    res.status(200).json({ succes: true, msg: "Password Reset Success!" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

//GENERATE ACCESS TOKEN
const generateAccessToken = async (req, res) => {
  try {
    //get refresh token from UI
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ msg: "Invalid refresh token!" });

    //get refresh token from db
    const rrToken = await Token.findOne({ token: refreshToken });

    if (!rrToken)
      return res.status(401).json({ msg: "Refresh token expired!" });

    //generate new acces token
    try {
      const data = jwt.verify(rrToken.token, process.env.REFRESH_TOKEN_SECRET);

      const accessToken = jwt.sign(
        { _id: data._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );

      return res.status(200).json({ accessToken });
    } catch (err) {
      return res.status(401).json({ msg: "Refresh Token Expired" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

//LOGOUT
const logOut = async (req, res) => {
  //delete the refresh token saved in database
  try {
    const { refreshToken } = req.body;
    await Token.findOneAndDelete({ token: refreshToken });
    return res.status(200).json({ msg: "User logged out!" });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

//DELETE USER
const deleteUser = (req, res) =>{
  try {
    const { userId } = req.body;
    await User.findOneAndDelete({ _id: userId });
    return res.status(200).json({ msg: "User deleted!" });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }

}

//GET USER
const getUser = (req, res) =>{
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }

}

//GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  generateAccessToken,
  logOut,
  deleteUser,
  getUser,
  getUsers
};
