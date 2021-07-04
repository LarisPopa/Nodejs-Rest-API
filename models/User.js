const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String },
  password: { type: String },
  createDate: { type: Date, default: Date.now() },
  resetToken: { type: String },
  resetPasswordExpire: {
    type: Date
  }
});

module.exports = User = mongoose.model("User", UserSchema);
