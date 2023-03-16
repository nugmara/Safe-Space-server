const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const { gettingANewChat } = require("../middlewares/chat.middlewares");
const Chat = require("../models/Chat.model");






module.exports = router;
