const isAuthenticated = require("../middlewares/auth.middlewares");

const router = require("express").Router();

router.post ("/", isAuthenticated, (req, res, next) => {
    const {userId} = req.body;

    if(!userId) {
        console.log("userId not sent")
        return res.status(400)
    }

})

module.exports = router;