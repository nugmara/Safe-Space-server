const router = require("express").Router();
const Chat = require("../models/Chat.model");

// GET "/chats" => para recoger la lista de todos los chats
router.get("/", async (req, res, next) => {
  try {
    const response = await Chat.find().populate("sender receiver");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/chats" para crear los chats
router.post("/", async (req, res, next) => {
  const { sender, receiver, message, status } = req.body;
  const chats = new Chat({
    sender,
    receiver,
    message,
    status,
  });
  try {
    const response = await chats.save();
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/:id" para recoger los datos de un solo chat
router.get("/:id", async (req, res, next) => {
  const { id } = req.params; // el id del chat
  try {
    const response = await Chat.findById(id).populate("sender receiver");
    if (response === null) {
      return res.status(404).json({ errorMessage: "Chat not found" });
    }
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE "/:id" => borrar un chat por su id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Chat.findByIdAndDelete(id)
    res.json("borrón y cuenta nueva")
  } catch (error) {
    next(error);
  }
});



module.exports = router;
