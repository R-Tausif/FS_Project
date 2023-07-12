import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Skill from 'App/Models/Skill'
import SkillValidator from 'App/Validators/SkillValidator' // You need to create this validator

export default class SkillsController {
  
  //CREATE
  public async store({ request }: HttpContextContract) {
    const validatedData = await request.validate(SkillValidator)
    const skill = new Skill()
    skill.fill(validatedData)
    await skill.save()
    return skill
  }

  //READ ALL
  public async index({}: HttpContextContract) {
    const skills = await Skill.all()
    return skills
  }

  //READ ONE
  public async show({ params }: HttpContextContract) {
    const skill = await Skill.find(params.id)
    return skill
  }

  //UPDATE
  public async update({ params, request }: HttpContextContract) {
    const validatedData = await request.validate(SkillValidator)
    const skill = await Skill.findOrFail(params.id)
    skill.merge(validatedData)
    await skill.save()
    return skill
  }

  //DELETE
  public async destroy({ params }: HttpContextContract) {
    const skill = await Skill.findOrFail(params.id)
    await skill.delete()
    return { message: 'Skill deleted successfully' }
  }

}
