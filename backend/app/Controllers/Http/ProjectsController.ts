import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Portfolio from 'App/Models/Portfolio'
import Project from 'App/Models/Project'
import User from 'App/Models/User'
import ProjectValidator from 'App/Validators/ProjectValidator'

export default class ProjectsController {

  //CREATE
  public async store({ request }: HttpContextContract) {
    const validatedData = await request.validate(ProjectValidator)

    // Create a new project with validated data
    const project = new Project()
    project.fill(validatedData)
    await project.save()

    return project
  }

  //READ ALL
  public async index({ auth }: HttpContextContract) {
    const userId = auth.user?.id
    const user = await User.findOrFail(userId) 
    const portfolios = await user.related('portfolios').query() 

    const projectIds = await Promise.all(portfolios.map(async (portfolio) => {
      const pids = await portfolio.related('projects').query().select('id')
      return pids.flatMap((p) => p.id)
    }))
    
    const projects = await Project.query().whereIn('id', projectIds)
    return projects || null
  }

  //READ ONE
  public async show({ params }: HttpContextContract) {
    const project = await Project.find(params.id)
    return project
  }

  //UPDATE
  public async update({ params, request }: HttpContextContract) {
    const projectId = params.id
    const data = await request.validate(ProjectValidator)
    
    const project = await Project.findOrFail(projectId)
    project.merge(data)
    await project.save()

    return project
  }

  //DELETE
  public async destroy({ params }: HttpContextContract) {
    const projectId = params.id
    const project = await Project.findOrFail(projectId)

    await project.delete()

    return { message: 'Project deleted successfully.' }
  }
}
