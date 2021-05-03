// build your `/api/projects` router here
const express = require("express")
const Project = require("./model")
const router = express.Router()

router.get("/api/projects", async (req, res, next) => {
    try {
        const projects = await Project.find()
        res.json(projects)
    } catch (err) {
        next(err)
    }
})

router.post("/api/projects", (req, res, next) => {
    if (!req.body.project_name) {
        return res.status(400).json({
            message: "Project name is required",
        })
    }

    Project.add(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router