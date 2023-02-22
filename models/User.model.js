const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  name: String,
  phone: Number,
  password: String,
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
