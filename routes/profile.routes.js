const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const Post = require("../models/Post.model");

// GET => detalles del perfil
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const { _id } = req.payload
    const profileDetails = await User.findById(_id).select("username firstName lastName image email description followers totalFollowers")
    const postOfTheUser = await Post.find({ authorId: _id });
    // console.log(profileDetails, postOfTheUser)
    res.json({ profileDetails, postOfTheUser });
  } catch (error) {
    next(error);
  }
});
// GET => para recoger todos los datos del usuario que buscas
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params
    const profileDetails = await User.findById(id).select("username firstName lastName image email description followers totalFollowers")
    const postOfTheUser = await Post.find({ authorId: id });
    // console.log(profileDetails, postOfTheUser)
    res.json({ profileDetails, postOfTheUser });
  } catch (error) {
    next(error);
  }
});

// POST => para el formulario de edit de usuario
router.patch("/edit", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload
  const { firstName, lastName, description } = req.body;
  try {
   const response = await User.findByIdAndUpdate(_id, {
      firstName: firstName,
      lastName: lastName,
      description: description
    });
    // console.log(response)
    res.json("todo actualizado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
