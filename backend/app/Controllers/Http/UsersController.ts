import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class UsersController {

    // READ ALL users
    public async index({ }: HttpContextContract) {
        const users = await User.all();
        return users;
    }
    
    // CREATE
    public async store({request}: HttpContextContract) {
        const data = request.only(['email', 'password', 'firstName', 'lastName', 'address'])
        const user = await User.create(data)
        return user
    }
    
    // READ ONE
    public async show({params}: HttpContextContract) {
        const user = await User.find(params.id)
        return user
    }
    

    // UPDATE
    public async update({params, request}: HttpContextContract) {
        const data = request.only(['email', 'password', 'firstName', 'lastName', 'address'])
        const user = await User.findOrFail(params.id)
        user.merge(data)
        await user.save()
        return user
    }
    

    // DELETE
    public async destroy({params}: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        await user.delete()
        return {message: 'User deleted successfully'}  
    }
}
