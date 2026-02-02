const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    name: {
      type: String,
      trim: true,
    },

    photoURL: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

  },
  
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("User", userSchema);
