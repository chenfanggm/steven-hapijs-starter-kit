const util = require('util')
const PanErrorMeta = require('./panErrorMeta')
const errorI18n = require('./errorI18n')


const isPanErrorCode = (errorCode) => {
  return errorCode.indexOf('PAN_') === 0
}

const PanException = function (errorCode, message, payload) {
  this.name = this.constructor.name
  if (typeof errorCode === 'undefined') {
    this.errorCode = -1
  } else if (!isPanErrorCode(errorCode) && typeof message === 'undefined') {
    this.errorCode = -1
    this.message = errorCode
  } else if (!isPanErrorCode(errorCode) && typeof message === 'object') {
    this.errorCode = -1
    this.payload = message
    this.message = errorI18n.applyErrorTemplate(errorCode, this.payload)
  } else if (isPanErrorCode(errorCode) && typeof message === 'undefined') {
    this.errorCode = errorCode
    const errorMeta = PanErrorMeta[errorCode]
    this.statusCode = errorMeta && errorMeta.httpStatus || PanErrorMeta.default.httpStatus
    this.isInternal = errorMeta && !!errorMeta.isInternal
    this.message = errorMeta && errorMeta.message || errorI18n.getErrorMessage(errorCode)
  } else if (isPanErrorCode(errorCode) && typeof message === 'object') {
    this.errorCode = errorCode
    const errorMeta = PanErrorMeta[errorCode]
    this.statusCode = errorMeta && errorMeta.httpStatus || PanErrorMeta.default.httpStatus
    this.isInternal = errorMeta && !!errorMeta.isInternal
    this.payload = message
    this.message = errorMeta && errorMeta.message || errorI18n.getErrorMessage(errorCode, this.payload)
  } else {
    this.errorCode = errorCode || 0
    const errorMeta = PanErrorMeta[this.errorCode]
    this.message = message || errorMeta && errorMeta.message
    this.statusCode = errorMeta && errorMeta.httpStatus || PanErrorMeta.default.httpStatus
    this.isInternal = errorMeta && !!errorMeta.isInternal
    this.payload = payload
  }

  Error.captureStackTrace(this, this.constructor)
}

util.inherits(PanException, Error)

module.exports = PanException
