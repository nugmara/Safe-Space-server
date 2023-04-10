const isAuthenticated = require("../middlewares/auth.middlewares");
const {accessChat, fetchChats} = require("../controllers/chatControllers")

const router = require("express").Router();

router.post("/", isAuthenticated, accessChat)

router.get("/", isAuthenticated, fetchChats) 

  
module.exports = router;