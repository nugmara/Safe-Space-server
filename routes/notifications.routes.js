const Notifications = require("../models/Notifications");
const User = require("../models/User.model");
const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");

// ! Tenemos que enviar la lista de notificaciones
// GET "/notifications"
router.get("/:userId",isAuthenticated ,async(req, res, next) => {
    const {userId} = req.payload._id
    console.log(userId, "hola")
    try {
        const response = await Notifications.find(userId)
        res.json(response)
    } catch(error){
        next(error)
    }
})

// POST => para crear una notificación
router.post("/:id", isAuthenticated ,async(req, res, next) => {
    try {
      const response = await Notifications.create({
        title: req.body.title,
        message: req.body.message,
        userId: req.payload._id
      }) 

      const notifications = await response.save()
      res.json(notifications)
    } catch (error) {
        console.log(error)
    }
})

// BORRAR una notificación
router.delete("/:idNotification", async(req, res, next) => {
    const {idNotification} = req.params
    try {
        await Notifications.findByIdAndDelete(idNotification)
        res.json("Todo borrado")
    } catch (error) {
        next(error)
    }
})


module.exports = router