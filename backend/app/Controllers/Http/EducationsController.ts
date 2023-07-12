import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Education from 'App/Models/Education'

export default class EducationsController {
  //CREATE
  public async store({ request }: HttpContextContract) {
    const data = request.only(['userId', 'portfolioId', 'degree', 'graduateDate'])
    const education = await Education.create(data)
    return education
  }

  //READ ALL
  public async index({}: HttpContextContract) {
    const educations = await Education.all()
    return educations
  }

  //READ ONE
  public async show({ params }: HttpContextContract) {
    const education = await Education.find(params.id)
    return education
  }

  //UPDATE
  public async update({ params, request }: HttpContextContract) {
    const data = request.only(['userId', 'portfolioId', 'degree', 'graduateDate'])
    const education = await Education.findOrFail(params.id)
    education.merge(data)
    await education.save()
    return education
  }

  //DELETE
  public async destroy({ params }: HttpContextContract) {
    const education = await Education.findOrFail(params.id)
    await education.delete()
    return { message: 'Education deleted successfully' }
  }
}


