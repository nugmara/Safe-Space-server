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

// // POST "/chats" para crear los chats
// router.post("/", async (req, res, next) => {
//   const { sender, receiver, message, status } = req.body;
//   const chats = new Chat({
//     sender,
//     receiver,
//     message,
//     status,
//   });
//   try {
//     const response = await chats.save();
//     res.status(201).json(response);
//   } catch (error) {
//     next(error);
//   }
// });

// // GET "/:id" para recoger los datos de un solo chat
// router.get("/:id", gettingANewChat, async (req, res, next) => {
//   try {
//     res.status(201).json(req.chat)
//   } catch (error) {
//     next(error);
//   }
// });

// // DELETE "/:id" => borrar un chat por su id
// router.delete("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     await Chat.findByIdAndDelete(id);
//     res.json("borrón y cuenta nueva");
//   } catch (error) {
//     next(error);
//   }
// });

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
    const response = await Chat.find({_id: {$ne: req.payload._id}}, "username").select("sender receiver message time").
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
