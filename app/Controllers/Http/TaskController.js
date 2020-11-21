'use strict'

const Task = use('App/Models/Task')
const validator = use('Validator')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const tasks = await Task.query().where('user_id',auth.user.id).fetch()
    return view.render('task.index',{
      tasks: tasks.toJSON()
    })
  }

  /**
   * Render a form to be used for creating a new task.
   * GET tasks/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('task.add-task')
  }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, session }) {
    const { description, date } = request.all()

    await Task.create({
      description,
      date,
      user_id: auth.user.id
    })

    session.flash({successMessage: 'Tarefa adicionada com sucesso.'})
    return response.redirect('/task')
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing task.
   * GET tasks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view, auth }) {
    const task = await Task.findOrFail(params.id)
    if (auth.user.id !== task.user_id) {
      return 'Você não tem permissão para alterar essa tarefa'
    }
    return view.render('task.edit-task',{task})
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth, session }) {
    const task = await Task.findOrFail(params.id)
    if (auth.user.id !== task.user_id) {
      return 'Você não pode alterar essa tarefa.'
    }

    task.description = request.input('description')
    task.date = request.input('date')

    await task.save()

    session.flash({successMessage: 'Tarefa alterada com sucesso.'})
    return response.route('task.index')
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth, session }) {
    const task = await Task.findOrFail(params.id)
    if (auth.user.id !== task.user_id) {
      return 'Você não pode alterar essa tarefa.'
    }
    await task.delete()

    session.flash({successMessage: 'Tarefa removida com sucesso.'})
    return response.redirect('back')
  }
}

module.exports = TaskController
