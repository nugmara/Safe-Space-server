const isAuthenticated = require("../middlewares/auth.middlewares");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

const router = require("express").Router();

//GET "/api/post" => para enviar una lista de los Posts al home, aqui envíaremos todo el post
router.get("/", async (req, res, next) => {
  try {
    const response = await Post.find().select(
      "content authorId likes totalLikes time"
    ).populate("authorId", "username")
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/post" => para crear un nuevo post
router.post("/", isAuthenticated, async (req, res, next) => {
  const { content } = req.body;
  try {
    await Post.create({
      content: content,
      authorId: req.payload._id,
    });
    res.json("todo creado");
  } catch (error) {
    next(error);
  }
});

// GET "/api/post/:id" => enviar los detalles de un post
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Post.findById(id).select(
      "content authorId likes totalLikes time"
    ).populate("authorId", "username")
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/post/delete" => borrar un post por su id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.json("borrado");
  } catch (error) {
    next(error);
  }
});

// !
// Tenemos que definir una ruta para dar like a un post
router.post("/:id/like", async (req, res, next) => {
  console.log(req.body)
  const { id } = req.params;
  const { userId } = req.body;
  console.log(req.body)
  try {
  
    const response = await Post.findById(id);
    if (!response.likes.includes(userId)) {
      response.likes.push(userId);
      response.totalLikes += 1
      await response.save();
    } else {
      response.likes.pull(userId)
      response.totalLikes -= 1
      await response.save()
    }
    const authorOfThePost = response.authorId
    
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
