import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { SexoEnum } from 'Contracts/enums/SexoEnum'

export const createSchema = schema.create({
  matricula: schema.string(
    {
      trim: true,
    },
    [
      rules.unique({ column: 'matricula', table: 'alunos' }),
      rules.minLength(10),
      rules.maxLength(10),
    ]
  ),
  nome: schema.string(
    {
      trim: true,
    },
    [rules.minLength(10), rules.maxLength(200)]
  ),
  sexo: schema.enum(Object.values(SexoEnum)),
  idade: schema.number(),
  cidade_natal: schema.string(
    {
      trim: true,
    },
    [rules.minLength(3), rules.maxLength(100)]
  ),
})

export const updateSchema = schema.create({
  matricula: schema.string.optional(
    {
      trim: true,
    },
    [
      rules.unique({ column: 'matricula', table: 'alunos' }),
      rules.minLength(10),
      rules.maxLength(10),
    ]
  ),
  nome: schema.string.optional(
    {
      trim: true,
    },
    [rules.minLength(10), rules.maxLength(200)]
  ),
  sexo: schema.enum.optional(Object.values(SexoEnum)),
  idade: schema.number.optional(),
  cidade_natal: schema.string.optional(
    {
      trim: true,
    },
    [rules.minLength(3), rules.maxLength(100)]
  ),
})
