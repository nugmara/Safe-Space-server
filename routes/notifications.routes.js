const Notifications = require("../models/notifications");

const router = require("express").Router();

// ! Tenemos que enviar la lista de notificaciones
// GET "/notifications"
router.get("/:id/notifications", async(req, res, next) => {
    const {id} = req.params
    try {
        const response = await Notifications.find(id)
        res.json(response)
    } catch(error){
        next(error)
    }
})

// POST => para crear una notificación
router.post("/notifications", async(req, res, next) => {
    try {
      const response = await Notifications.create({
        title: req.body.title,
        message: req.body.message,
        userId: req.body.userId
      }) 
      const notifications = await response.save() 
      res.json(notifications)
    } catch (error) {
        console.log(error)
    }
})

// BORRAR una notificación
router.delete("/notification/:id", async(req, res, next) => {
    const {id} = req.params
    try {
        await Notifications.findByIdAndDelete(id)
        res.json("Todo borrado")
    } catch (error) {
        next(error)
    }
})


module.exports = router