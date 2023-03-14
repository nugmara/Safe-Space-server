const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

// Tenemos que renderizar a todos los usuarios para poder hacer un search
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

// GET pero por el id
router.post("/", isAuthenticated,  async(req, res, next) => {
    let user = new RegExp("^"+req.body.query)
    try {
       const userFind = await User.find({username:{$regex:user}})
       res.json(userFind)
        
    } catch (error) {
        next(error)
    }
});

module.exports = router;
