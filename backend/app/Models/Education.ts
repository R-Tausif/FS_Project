import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Education extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "userId" })
  public userId: number

  @column({columnName: "portfolioId"})
  public portfolioId: number

  @column()
  public degree: string

  @column.dateTime({columnName: "graduateDate"})
  public graduateDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
