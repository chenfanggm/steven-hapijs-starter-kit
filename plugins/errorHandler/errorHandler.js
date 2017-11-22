const acceptLanguage = require('accept-language')
const winston = require('../../common/winston')
const PanException = require('./PanException')
const PanErrorConstants = require('./panErrorConstants')
const errorI18n = require('./errorI18n')


acceptLanguage.languages(['en', 'zh', 'de']);

const handleErrorAtPreResponse = (request, reply) => {
  const response = request.response

  if (!response.isBoom) {
    return reply.continue()

  } else if (response instanceof PanException) {
    response.output.payload = {}
    if (response.errorCode)
      response.output.payload.errorCode = response.errorCode
    if (response.message && !response.isInternal)
      response.output.payload.message = response.message
    if (response.payload)
      response.output.payload.payload = response.payload
    if (response.statusCode)
      response.output.statusCode = response.statusCode

  } else {
    response.output.payload = {}

    if (isPanErrorResponse(response)) {
      response.errorCode = response.message
      response.message = null
      response.output.payload.errorCode = response.errorCode
      if (response.message && !response.isDeveloperError) {
        response.output.payload.message = response.message
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

const detectLanguageAtPreRequest = (request, reply) => {
  const acceptLang = request.headers['Accept-Language']
  if (acceptLang) {
    const standAcceptLang = acceptLanguage.get(acceptLang)
    if (standAcceptLang) {
      errorI18n.setLang(standAcceptLang)
    }
  }
  return reply.continue()
}

const errorHandler = (server, options, next) => {
  server.ext('onRequest', detectLanguageAtPreRequest);
  server.ext('onPreResponse', handleErrorAtPreResponse)
  next()
}

errorHandler.attributes = {
  name: 'errorHandler',
  version: '1.0.0'
}

module.exports = {
  register: errorHandler
}
