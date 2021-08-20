import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { SexoEnum } from 'Contracts/enums/SexoEnum'

export default class Alunos extends BaseSchema {
  protected tableName = 'alunos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('matricula', 10).unique().index().notNullable()
      table.string('nome', 200).notNullable()
      table.enu('sexo', Object.values(SexoEnum)).notNullable()
      table.integer('idade').notNullable()
      table.string('cidade_natal', 100).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
