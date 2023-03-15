const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

router.post("/idUser", isAuthenticated, async(req, res, next) => {
  const {idUser} = req.params
  const {_id} = req.payload._id
  try {
    await User.findByIdAndUpdate(idUser, {
      $push: {followers: _id},
    })
    await User.findByIdAndUpdate(_id, {
      $push: {followers: idUser}
    })
    res.status(200).json({message: "followed"})
  } catch (error) {
    next(error)
  }
})
module.exports = router;
