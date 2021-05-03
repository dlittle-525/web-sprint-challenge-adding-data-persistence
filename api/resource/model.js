// build your `Resource` model here
const db = require("../../data/dbConfig")

function find() {
    return db("resources")
}

function findById(resource_id) {
    return db("resources")
    .where("resource_id", resource_id)
    .first()
}

async function add(data) {
    const [resource_id] = await db("resources").insert(data)
    return findById(resource_id)
}

module.exports = {
    find,
    findById,
    add,
}