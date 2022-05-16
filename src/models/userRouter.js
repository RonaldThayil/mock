const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: [true, "FirstName is required"],
  },
  lastName: {
    type: String,
  },
  provider: {
    type: String,
    default: null,
  },
  providerUserId: {
    type: String,
    default: null,
  },
  profileImageUrl: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("UserDataCheck", userSchema);
