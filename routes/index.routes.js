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

const searchForUsers = require("./search.routes")
router.use("/search", searchForUsers)

const followUsers = require("./following.routes")
router.use("/follow", followUsers)

const profileRoutes = require("./profile.routes")
router.use("/profile", profileRoutes)


module.exports = router;
