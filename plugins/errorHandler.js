const winston = require('../common/winston')
const PanError = require('../common/errors/PanError')


const errorHandler = (server, options, next) => {
  server.ext('onPreResponse', handleErrorAtPreResponse)
  next()
}

errorHandler.attributes = {
  name: 'errorHandler',
  version: '1.0.0'
}

const handleErrorAtPreResponse = (request, reply) => {
  const response = request.response
  if (!response.isBoom) {
    return reply.continue()
  } else if (response instanceof PanError) {
    response.output.payload = {}
    if (response.code)
      response.output.payload.code = response.code
    if (response.message && !response.isInternal)
      response.output.payload.message = response.message
    if (response.payload)
      response.output.payload.payload = response.payload

    if (response.statusCode)
      response.output.statusCode = response.statusCode

    winston.error(response)
  } else if (response.output && response.output.statusCode >= 500){
    winston.error(response)
  }

  return reply.continue()
}

module.exports = {
  register: errorHandler
}
