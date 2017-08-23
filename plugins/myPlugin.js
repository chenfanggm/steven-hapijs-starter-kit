'use strict'
const Joi = require('joi')


module.exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/objects/{id}',
    handler: function(request, reply) {
      reply('GET received for object with ID of ' + request.params.id)
    },
    config: {
      validate: {
        params: {
          id: Joi.number().integer()
        }
      }
    }
  })

  next()
}

module.exports.register.attributes = {
  name: 'myPlugin',
  version: '1.0.0'
}