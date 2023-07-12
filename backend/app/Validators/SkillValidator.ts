import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SkillValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    type: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    name: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    projectId: schema.number([rules.required()]), // assuming projectId is required
  })

  public messages = {}
}
