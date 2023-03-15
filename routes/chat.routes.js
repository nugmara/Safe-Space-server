const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const { gettingANewChat } = require("../middlewares/chat.middlewares");
const Chat = require("../models/Chat.model");

// GET "/chats" => para recoger la lista de todos los chats
router.get("/", async (req, res, next) => {
  const {userId} = req.query
  try {
    const response = await Chat({
      $or: [
        {sender: userId, receiver: userId},
      ]
    }).populate("sender receiver")
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});


// ACTUALIZAR (PATCH) "/:id" => actualizar el chat 
router.patch("/:id", gettingANewChat, async(req, res, next) => {
    try {
       const updateTheChat = await req.chat.save()
       res.status(201).json(updateTheChat)
    } catch (error) {
        next(error)
    }
})

 //! VAMOS a hacerlo estilo comentario
 //GET "/chat/:id" ?> para enviar la lista de los comentarios
 router.get("/friends", isAuthenticated, async(req, res, next) => {
  try {
    const userId = req.payload._id
    const response = await Chat.find({$or: [{sender: userId}, {receiver: userId}]}, "username").select("sender receiver message time").
    populate("receiver", "sender")
    res.status(201).json(response)
  } catch (error) {
    console.log(error)
  }
 })

 // POST => para crear un chat
 router.post("/:id", isAuthenticated, async(req, res, next) => {
  try {
    const response = await Chat.create({
      sender: req.payload._id,
      receiver: req.body.receiver,
      message: req.body.message
    })
    console.log("receiver", req.body.receiver)
    console.log(response)
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
 })

module.exports = router;
