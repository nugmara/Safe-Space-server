const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

router.patch("/userProfile/:idUser/follow", isAuthenticated, async(req, res, next) => {
  const {idUser} = req.params._id
  const {_id} = req.payload
  try {
    await User.findByIdAndUpdate(_id, {
      $push: {followers: + 1},

    })
    res.status(200).json(idUser)
  } catch (error) {
    next(error)
  }
})
module.exports = router;
