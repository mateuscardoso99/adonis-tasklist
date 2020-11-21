'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', async({ response }) => {
	return response.redirect('/login')
})

Route.group(() => {
	Route.get('/', 'RegisterController.create').as('register')
	Route.post('/', 'RegisterController.store').as('register.store').validator('Register')
}).prefix('register').middleware('guest')

Route.group(() => {
	Route.get('/', 'LoginController.create').as('login')
	Route.post('/', 'LoginController.store').as('login.store').validator('Login')
}).prefix('login').middleware('guest')

Route.group(() => {
	Route.get('/', 'TaskController.index').as('task.index')
	Route.get('/create', 'TaskController.create').as('task.create')
	Route.post('/', 'TaskController.store').as('task.store').validator('StoreTask')
	Route.get('/edit/:id', 'TaskController.edit').as('task.edit')
	Route.put('/update/:id', 'TaskController.update').as('task.update').validator('StoreTask')
	Route.delete('/:id', 'TaskController.destroy').as('task.delete')
	Route.post('/logout','LoginController.destroy').as('logout')
}).prefix('task').middleware('auth')
