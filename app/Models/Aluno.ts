import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { SexoEnum } from 'Contracts/enums/SexoEnum'

export default class Aluno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public matricula: string

  @column()
  public nome: string

  @column()
  public sexo: SexoEnum

  @column()
  public idade: number

  @column()
  public cidade_natal: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
