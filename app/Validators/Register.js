'use strict'

class Register {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required|confirmed|min:4'
    }
  }

  get messages(){
  	return {
	  	'email.required': 'Email é obrigatório',
	  	'email.email': 'Email inválido',
      'email.unique': 'Email inválido',
	  	'password.required': 'Senha é obrigatória',
	  	'password.min': 'Senha inválida',
	  	'password.confirmed': 'Confirme a senha'
  	}
  }
}

module.exports = Register
