'use strict'


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

  console.log('got error before response: ', response)

  return reply.continue()
}

module.exports = {
  register: errorHandler
}
