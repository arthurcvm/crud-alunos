import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import { createSchema, updateSchema } from 'App/Validators/AlunoValidator'

export default class AlunosController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const alunos = await Aluno.query()
        .where((builder) => {
          if (request.qs().search) {
            builder
              .where('matricula', 'LIKE', `%${String(request.qs().search) || ''}%`)
              .orWhere('nome', 'LIKE', `%${String(request.qs().search) || ''}%`)
          }
        })
        .paginate(request.qs().page || 1, request.qs().per_page || 10)

      response.json(alunos)
    } catch (error) {
      console.error(error)

      response.status(500)
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validatedData = await request.validate({
        schema: createSchema,
      })

      response.status(201).json(await Aluno.create(validatedData))
    } catch (error) {
      console.error(error)

      response.status(400).json(error)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const aluno = await Aluno.findOrFail(id)
      response.json(aluno)
    } catch (error) {
      console.error(error)

      response.status(400).json(error)
    }
  }

  public async update({ params, response, request }: HttpContextContract) {
    const { id } = params

    try {
      const validatedData = await request.validate({
        schema: updateSchema,
      })

      const aluno = await Aluno.findOrFail(id)

      response.status(204).json(await aluno.merge(validatedData).save())
    } catch (error) {
      console.error(error)

      response.status(400).json(error)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const aluno = await Aluno.findOrFail(id)
      aluno.delete()
      response.status(204)
    } catch (error) {
      console.error(error)

      response.status(400).json(error)
    }
  }
}
