// build your `Project` model here
const db = require("../../data/dbConfig")

function find() {
    return db("projects")
}

function findById(project_id) {
    return db("projects")
        .where("project_id", project_id)
        .first
}

async function add(data) {
    const [project_id] = await db("projects").insert(data)
    return findById(project_id)
}

module.exports = {
    find,
    findById,
    add,
}