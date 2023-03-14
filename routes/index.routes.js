const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const postRoutes = require ("./post.routes")
router.use("/post", postRoutes)

const commentsRoutes = require("./comments.routes")
router.use("/post", commentsRoutes)

const chatRoutes = require("./chat.routes")
router.use("/chats", chatRoutes)

const notificationsRoutes = require("./notifications.routes")
router.use("/notifications", notificationsRoutes)

const searchForUsers = require("./search.routes")
router.use("/search", searchForUsers)

module.exports = router;
