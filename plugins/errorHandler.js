'use strict'
const winston = require('../common/winston')


const errorHandler = function (server, options, next) {
  server.ext('onPreResponse', handleErrorAtPreResponse)
  next()
}

errorHandler.attributes = {
  name: 'errorHandler',
  version: '1.0.0'
}

const handleErrorAtPreResponse = function (request, reply) {
  const response = request.response
  if (!response.isBoom) {
    return reply.continue()
  }

  if (response.output && response.output.statusCode >= 500) {
    winston.error(response)
  }

  return reply.continue()
}

module.exports = {
  register: errorHandler
}
