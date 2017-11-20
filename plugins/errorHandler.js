const winston = require('../common/winston')
const PanError = require('../common/errors/PanError')
const PanErrorCode = require('../common/errors/PanErrorCode')
const PanErrorConstants = require('../common/errors/PanErrorConstants')



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
      response.output.payload.message = response.code
    if (response.message && !response.isInternal)
      response.output.payload.desc = response.message
    if (response.payload)
      response.output.payload.payload = response.payload

    if (response.statusCode)
      response.output.statusCode = response.statusCode

  } else {
    response.output.payload = {}
    if (isPanErrorResponse(response)) {
      response.output.payload.message = response.message
      if (!response.isDeveloperError) {
        const errorMeta = PanErrorCode[response.message]
        response.output.payload.desc = errorMeta.MESSAGE
      }
    } else {
      response.output.payload.message = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
    }

    if (response.data)
      response.output.payload.payload = response.data
  }

  winston.error(response)
  return reply.continue()
}

const isPanErrorResponse = (response) => {
  return response.message && response.message.indexOf('PAN_') === 0
}

module.exports = {
  register: errorHandler
}
