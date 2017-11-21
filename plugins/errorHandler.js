const _ = require('lodash')
const winston = require('../common/winston')
const PanException = require('../common/errors/PanException')
const PanErrorMeta = require('../common/errors/PanErrorMeta')
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

  } else if (response instanceof PanException) {

    response.output.payload = {}
    if (response.errorCode)
      response.output.payload.errorCode = response.errorCode
    if (response.message && !response.isInternal) {
      response.output.payload.message = applyErrorTemplate(response.message, response.payload)
    }
    if (response.payload)
      response.output.payload.payload = response.payload
    if (response.statusCode)
      response.output.statusCode = response.statusCode

  } else {
    response.output.payload = {}
    if (isPanErrorResponse(response)) {
      const errorCode = response.message
      response.output.payload.errorCode = errorCode
      if (!response.isDeveloperError) {
        const errorMeta = PanErrorMeta[errorCode]
        response.output.payload.message = applyErrorTemplate(errorMeta.message, response.data)
      }
    } else {
      response.output.payload.errorCode = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
    }

    if (response.data && Object.keys(response.data).length > 0)
      response.output.payload.payload = response.data
  }

  winston.error(response)
  return reply.continue()
}

const isPanErrorResponse = (response) => {
  return response.message && response.message.indexOf('PAN_') === 0
}


_.templateSettings.interpolate = /{{([\s\S]+?)}}/g
const applyErrorTemplate = (template, payload) => {
  if (payload) {
    return _.template(template)(payload)
  } else {
    return template
  }
}

module.exports = {
  register: errorHandler
}
