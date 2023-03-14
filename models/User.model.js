const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    image: {
      type: String,
      default: "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678358203/safe-space-app/default-picture_lntg3k.png"
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    description: String,
    follow: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalFollowers: {
      type: Number,
      default: 0
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
