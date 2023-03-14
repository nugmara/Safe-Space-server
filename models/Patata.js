const mongoose = require("mongoose");

const notifications = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  message: {
    type: String,
    // required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  isTheNotificationRead: {
    type: Boolean,
    default: false
  },
  time: {
    type: Date,
    default: Date.now,
  },
}, {
    timestamps: true
}
);

const Notifications = mongoose.model("Notificactions", notifications)

module.exports = Notifications
