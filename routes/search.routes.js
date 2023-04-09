const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

// Tenemos que renderizar a todos los usuarios para poder hacer un search
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const {search} = req.query;
    const response = await User.find({username: {$regex: `^${search}`, $options: "i"}})
    res.json(response)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
