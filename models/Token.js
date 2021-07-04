const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  token: { type: String }
});

module.exports = Token = mongoose.model("Token", TokenSchema);
