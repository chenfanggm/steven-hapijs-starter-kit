const PanError = require('./PanError')
const PanErrorConstants = require('./PanErrorConstants')


module.exports = {
  // 4xx errors
  badRequest(message, payload) {
    return new PanError(PanErrorConstants.FE_API.BAD_REQUEST, message, payload)
  },

  // 5xx errors
  badImplementation(message, payload) {
    return new PanError(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR, message, payload)
  },
}
