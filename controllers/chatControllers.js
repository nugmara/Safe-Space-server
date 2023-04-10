const Chat = require("../models/Chat.model")
const User = require("../models/User.model")

const accessChat =  async(req, res, next) => {
      const {userId} = req.body

      if(!userId) {
        console.log("UserId param not sent")
        return res.status(400)
      }

      let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch: {$eq: userId}}}
        ]
      }).populate("users", "-password").populate("latestMessage")

      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username image"
      })

      if(isChat.length > 0) {
        res.send(isChat[0])
      } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users","-password")
            res.status(200).send(FullChat)
        } catch (err) {
            next(err)
        }
      }
}

const fetchChats = async(req, res, next) => {
    try {
        Chat.find({users: {$elemMatch:{$er:req.user._id}}})
        .populate("users", "-password")
        .populate("latestMessage").sort({updatedAt: -1})
        .then(async (results) =>  {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "username image "
            })
            res.status(200).send(results)
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {accessChat, fetchChats}