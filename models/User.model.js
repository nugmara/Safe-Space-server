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
      default: "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678358203/safe-space-app/default-picture_lntg3k.png",
      enum: [
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357943/safe-space-app/Ice-Age-Avatars-1_yeuzft.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357943/safe-space-app/Ice-Age-Avatars-2_jamxw0.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357943/safe-space-app/Ice-Age-Avatars-3_zzrpeh.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357944/safe-space-app/Ice-Age-Avatars-4_nl5y36.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357943/safe-space-app/Ice-Age-Avatars-5_vclyp2.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357943/safe-space-app/The-Simpsons-Profile-Icons-1_s7ystt.webp",
    "https://res.cloudinary.com/dhtrxjdas/im,age/upload/v1678357944/safe-space-app/The-Simpsons-Profile-Icons-2_hxrvbu.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357944/safe-space-app/The-Simpsons-Profile-Icons-3_cybns0.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357944/safe-space-app/The-Simpsons-Profile-Icons-4_mdxaff.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357944/safe-space-app/The-Simpsons-Profile-Icons-5_audpk8.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357944/safe-space-app/The-Simpsons-Profile-Icons-6_xy9cga.webp",
    "https://res.cloudinary.com/dhtrxjdas/image/upload/v1678357944/safe-space-app/The-Simpsons-Profile-Icons-7_yfemuk.webp"
  ]
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
    followers: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
