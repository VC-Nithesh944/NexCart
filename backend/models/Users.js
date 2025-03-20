const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
  },
  username: String,
  email: String,
  avatar: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
