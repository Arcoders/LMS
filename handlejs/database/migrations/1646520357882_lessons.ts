import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Lessons extends BaseSchema {
  protected tableName = 'lessons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 100).notNullable()
      table.string('description', 255).nullable()
      table.text('body').nullable()
      table.string('video_url', 255).nullable()
      table.integer('category_id').unsigned().references('categories.id').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}