
exports.up = async function(knex) {
  await knex.schema.createTable("projects", (tbl) => {
      tbl.increments("project_id")
      tbl.text("project_name").notNull()
      tbl.text("project_description")
      tbl.boolean("project_completed").defaultTo(false)
  })

  await knex.schema.createTable("resources", (tbl) => {
      tbl.increments("resource_id")
      tbl.text("resource_name").notNull().unique()
      tbl.text("resource_description")
  })

  await knex.schema.createTable("tasks", (tbl) => {
      tbl.increments("task_id")
      tbl.text("task_description").notNull()
      tbl.text("task_notes")  
      tbl.boolean("task_completed").defaultTo(false)
      tbl
        .integer("project_id")
        .references("project_id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
  })
  await knex.schema.createTable("projects_resources", (tbl) => {
      tbl
        .integer("project_id")
        .notNull()
        .references("project_id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      tbl
        .integer("resource_id")
        .notNull()  
        .references("resource_id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      tbl.date("project_start").notNull().defaultTo(knex.raw("current_timestamp"))
      tbl.date("project_completion")
      tbl.primary(["project_id", "resource_id"])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("projects_resources")  
  await knex.schema.dropTableIfExists("tasks")
  await knex.schema.dropTableIfExists("resource")  
  await knex.schema.dropTableIfExists("projects")
};
