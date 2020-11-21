'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
   	return {
   		email: faker.email(),
    	password: await Hash.make('1234')
  	}
})

Factory.blueprint('App/Models/Task', (faker) => {
	return {
		description: faker.paragraph({sentences: 2}),
		date: faker.date()
	}	
})
