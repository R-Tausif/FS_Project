/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('register', 'Auth/SessionsController.register').as('register')
  Route.post('login', 'Auth/SessionsController.login').as('login')
}).prefix('auth')
  .as('auth')

Route.group(() => {
  Route.post('/educations', 'EducationsController.store')
  Route.get('/educations', 'EducationsController.index')
  Route.get('/educations/:id', 'EducationsController.show')
  Route.put('/educations/:id', 'EducationsController.update')
  Route.delete('/educations/:id', 'EducationsController.destroy')

  Route.post('/users', 'UsersController.store')
  Route.get('/users', 'UsersController.index')
  Route.get('/users/:id', 'UsersController.show')
  Route.put('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy')

  Route.post('/skills', 'SkillsController.store')
  Route.get('/skills', 'SkillsController.index')
  Route.get('/skills/:id', 'SkillsController.show')
  Route.put('/skills/:id', 'SkillsController.update')
  Route.delete('/skills/:id', 'SkillsController.destroy')

  Route.post('/projects', 'ProjectsController.store')
  Route.get('/projects', 'ProjectsController.index')
  Route.get('/projects/:id', 'ProjectsController.show')
  Route.put('/projects/:id', 'ProjectsController.update')
  Route.delete('/projects/:id', 'ProjectsController.destroy')


  // Route.post('/portfolios', 'PortfoliosController.store')
  // Route.get('/portfolios', 'PortfoliosController.index')
  // Route.get('/portfolios/:id', 'PortfoliosController.show')
  // Route.put('/portfolios/:id', 'PortfoliosController.update')
  // Route.delete('/portfolios/:id', 'PortfoliosController.destroy')

  Route.resource('portfolios', 'PortfoliosController').apiOnly()
}).middleware('auth')



