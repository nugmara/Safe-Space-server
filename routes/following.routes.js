const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

// POST => para crear los followers del usuario
router.post("/:userId/follow", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id);
    const userToFollow = await User.findById(req.params.userId);
    if (!userToFollow) {
      return res.status(404).json({ errorMessage: "User does not exist" });
    }
    if (user.following.includes(userToFollow._id)) {
      return res
        .status(400)
        .json({ errorMessage: "Already following this user" });
    }
    await user.following.push(userToFollow._id).save();
    await userToFollow.following.push(user._id).save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
});
// POST => para crear los following
router.post("/:userId/followers", isAuthenticated, async(req, res, next) => {
    try {
        const user = await User.findById(req.payload._id)
    const follower = await User.findById(req.params.userId)
    if (!follower) {
        return res.status(404).json({ errorMessage: "User does not exist" });
      }
      if (user.following.includes(follower._id)) {
        return res
          .status(400)
          .json({ errorMessage: "Already following you" });
      }
      await user.following.push(follower._id).save();
      await follower.following.push(user._id).save();
  
      res.status(200).json({ message: "success added" });
        
    } catch (error) {
        next(error)
    }
    
})

module.exports = router;
