const mongoose = require("mongoose");

const chat = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: String,
    status: {
      type: String,
      enum: ["online", "offline"],
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chat);

module.exports = Chat