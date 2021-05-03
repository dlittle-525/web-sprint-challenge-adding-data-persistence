// build your `Task` model here
const db = require("../../data/dbConfig")

function find() {
    return db("tasks")
}

function findById(task_id) {
    return db("tasks")
        .where("task_id", task_id)
        .first()
}

async function add(data) { 
    const [task_id] = await db("tasks").insert(data)
    return findById(task_id)
}

module.exports = {
    find,
    findById,
    add,
}