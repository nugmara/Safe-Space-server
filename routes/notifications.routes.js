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
    if (!postResponse) {
      return res.status(400).json({ errorMessage: "Post not found" });
    }

    if (postResponse.authorId === req.payload._id) {
      const response = await Notifications.create({
        title: req.body.title,
        message: req.body.message,
        userId: req.payload._id,
        postId: req.params.id,
      })
      const notificationSave = response.save()
      res.json(notificationSave)
    } else {
        res.status(401).json({errorMessage: "nope"})
    }
    // console.log(response);
  } catch (error) {
    console.log(error);
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
