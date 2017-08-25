'use strict'
const Joi = require('joi')


module.exports.greetingUser = {
  handler: function (request, reply) {
    const user = request.params.user ? encodeURIComponent(request.params.user) : 'stranger'
    reply('Hello ' + user + '!')
  },
  validate: {
    params: {
      user: Joi.string().min(3).max(10)
    }
  },
  description: 'Say hello!',
  notes: 'The user parameter defaults to \'stranger\' if unspecified',
  tags: ['api', 'greeting']
}

module.exports.greetingMultiUser = {
  handler: function (request, reply) {
    const userParts = request.params.user.split('/')
    reply('Hello ' + encodeURIComponent(userParts[0]) + ' ' + encodeURIComponent(userParts[1]) + '!')
  }
}

module.exports.listUser = {
  handler: function (request, reply) {
    reply(request.query.limit)
  },
  validate: {
    query: {
      limit: Joi.number().integer().min(1).max(100).default(10)
    }
  }
}
