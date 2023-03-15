const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const Post = require("../models/Post.model");

// GET => detalles del perfil
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(id)
    const profileDetails = await User.findById(id).select("username firstName lastName image email description followers totalFollowers")
    console.log(profileDetails)
    const postOfTheUser = await Post.find({ authorId: id });
    res.json({ profileDetails, postOfTheUser });
  } catch (error) {
    next(error);
  }
});

// POST => para el formulario de edit de usuario
router.patch("/:id/edit", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, description } = req.body;
  try {
    const response = await User.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
      description: description
    });
    res.json("todo actualizado");
    console.log(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
