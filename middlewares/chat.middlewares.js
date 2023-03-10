const Chat = require("../models/Chat.model");

const gettingANewChat = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Chat.findById(id)
    if (!response) {
        return res.status(404).json({ errorMessage: "Chat not found" });
      }
      req.chat = response
      console.log(req.chat);
      next()
  } catch (error) {
    next(error);
  }
};
module.exports = {
    gettingANewChat
}
