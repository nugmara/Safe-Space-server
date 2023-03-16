const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

router.patch("/userProfile/:idUser/follow", isAuthenticated, async(req, res, next) => {
  const {idUser} = req.params
  const {_id} = req.payload
  try {
    await User.findByIdAndUpdate(idUser, {
      $push: {followers: _id},

    })
    res.status(200).json(idUser)
  } catch (error) {
    next(error)
  }
})

// unfollow
router.delete("/userProfile/:idUser/follow", isAuthenticated, async(req, res, next) => {
  const {idUser} = req.params
  const {_id} = req.payload
  try {
    await User.findByIdAndUpdate(idUser, {
      $pull: {followers: _id},

    })
    res.status(200).json(idUser)
  } catch (error) {
    next(error)
  }
})
module.exports = router;
