'use strict'
const joi = require('joi')

module.exports.greetingUser = {
  handler: function (request, reply) {
    const user = request.params.user ? encodeURIComponent(request.params.user) : 'stranger'
    return reply('Hello ' + user + '!')
  },
  validate: {
    params: {
      user: joi.string().min(3).max(10)
    }
  },
  description: 'Say hello!',
  notes: 'The user parameter defaults to \'stranger\' if unspecified',
  tags: ['api', 'greeting']
}
