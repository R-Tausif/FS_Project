import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Educations extends BaseSchema {
  protected tableName = 'educations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('userID').notNullable()
      table.integer('portfolioId').notNullable()
      table.string('degree', 255).notNullable()
      table.dateTime('graduateDate').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
