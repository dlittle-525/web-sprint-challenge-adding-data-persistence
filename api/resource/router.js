// build your `/api/resources` router here
const express = require("express")
const Resource = require("./model")
const router = express.Router()

router.get("/api/resources", async (res, req, next) => {
    try {
        const resources = await Resource.find()
        res.json(resources)
    } catch (err) {
        next(err)
    }
})

router.post("/api/resources", (res, req, next) => {
    if (!req.body.resource_name) {
        return res.status(400).json({
            message: "Resource name is requires",
        })
    }

    Resource.add(req.body)
        .then((resource) => {
            res.status(201).json(resource)
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router