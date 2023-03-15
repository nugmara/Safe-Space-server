const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

// Tenemos que renderizar a todos los usuarios para poder hacer un search
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.find();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
