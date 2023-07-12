import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'
import Education from 'App/Models/Education'


export default class Portfolio extends BaseModel {
  @hasMany(() => Project,{
    localKey: 'id',
    foreignKey: "portfolioId"
  })
  public projects: HasMany<typeof Project>

  @hasMany(() => Education)
  public educations: HasMany<typeof Education>

  @column({ isPrimary: true })
  public id: number

  @column({columnName: "userId"})
  public userId: number

  @column({})
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
