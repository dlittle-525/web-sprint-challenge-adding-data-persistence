// build your `/api/tasks` router here
const express = require("express")
const Task = require("./model")
const router = express.Router()

router.get("/api/tasks",  async (res, req, next) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        next(err)
    }
})

router.post("/api/tasks", (res, req, next) => {
    Task.add(req.body)
    .then((task) => {
        res.statusCode(201).json(task)
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router