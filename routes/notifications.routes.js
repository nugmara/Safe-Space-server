const Notifications = require("../models/Patata");
const User = require("../models/User.model");
const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const Post = require("../models/Post.model");

// ! Tenemos que enviar la lista de notificaciones
// GET "/notifications"
router.get("/:userId", isAuthenticated, async (req, res, next) => {
  const  userId  = req.payload._id
  console.log(userId, "hola");
  try {
    const response = await Notifications.find({userId});
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST => para crear una notificación
router.post("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const postResponse = await Post.findById(req.params.id);
    // console.log(req.payload._id, "who")
    if (!postResponse) {
      return res.status(400).json({ errorMessage: "Post not found" });
    }

    if (postResponse.authorId.toString() === req.payload._id) {
      // console.log("creating a notification...")
      const response = await Notifications.create({
        title: req.body.title,
        message: req.body.message,
        userId: req.payload._id,
        postId: req.params.id,
      })
      // console.log("Creating another notiginaciotn", response)
      console.log(postResponse)
      res.json(response)
    } else {
        res.status(401).json({errorMessage: "nope"})
    }
    // console.log(response);
  } catch (error) {
    next(error);
  }
});

// BORRAR una notificación
router.delete("/:idNotification", async (req, res, next) => {
  const { idNotification } = req.params;
  try {
    await Notifications.findByIdAndDelete(idNotification);
    res.json("Todo borrado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
