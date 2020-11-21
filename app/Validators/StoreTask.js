'use strict'

class StoreTask {
  get rules () {
    return {
      description: 'required|string',
      date: 'required|string'
    }
  }

  get sanitizationRules () {
    // sanitize data before validation
  }

  get messages () {
  	return {
  		'description.required': 'Descrição é obrigatória',
  		'date.required': 'Data é obrigatória'
  	}
  }
}

module.exports = StoreTask
