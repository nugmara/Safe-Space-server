const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");

// GET "/api/post/:id" => para enviar la lista de los comentarios
router.get("/:id/comments", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Comment.find({ post: req.params.id }).select(
      "content author time"
    );
    res.json(response);
    console.log(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/post/:id" => para crear un nuevo comentario
router.post("/:id/comments", isAuthenticated, async (req, res, next) => {
  const { content } = req.body;
  try {
    const responsePost = await Post.findById(req.params.id);
    if (!responsePost) {
      return res.status(404).json({ errorMessage: "Post not found" });
    }
    const responseComments = await Comment.create({
      content: content,
      author: req.payload._id,
      post: responsePost._id,
    });
    res.json(responseComments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
