'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.text('description', 'longtext').notNullable()
      table.string('date').notNullable()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema

