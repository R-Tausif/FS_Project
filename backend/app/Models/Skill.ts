import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// port Project from './Project'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "type" })
  public type: string

  @column({columnName: "name" })
  public name: string

  @column({ columnName: "projectId" })
  public projectId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}