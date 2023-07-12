import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("projectName"),
      table.integer('portfolioId').unsigned().references("id").inTable("portfolios")
      table.string("projectSize"),
      table.string("projectDescription"),
      table.string("clientName"),
      table.dateTime("startDate"),
      table.dateTime("endDate"),
      table.string("teamSize"),
      table.string("role"),
      table.string("cloud"),
      table.string("contribution")


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
