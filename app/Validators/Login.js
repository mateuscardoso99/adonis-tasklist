'use strict'

class Login {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|min:4'
    }
  }

  get messages(){
  	return {
  		'email.required': 'E-mail é obrigatório',
  		'email.email': 'E-mail inválido',
  		'password.required': 'Senha é obrigatória',
  		'password.min': 'Senha inválida'
  	}
  }
}

module.exports = Login
