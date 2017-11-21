const util = require('util')
const PanErrorMeta = require('./PanErrorMeta')


const PanException = function (errorCode, message, payload) {
  this.name = this.constructor.name

  if (typeof errorCode === 'undefined') {
    this.errorCode = -1
  } else if (errorCode.indexOf('PAN_') !== 0 && typeof message === 'undefined') {
    this.errorCode = -1
    this.message = errorCode
  } else if (errorCode.indexOf('PAN_') !== 0 && typeof message === 'object') {
    this.errorCode = -1
    this.message = errorCode
    this.payload = message
  } else if (errorCode.indexOf('PAN_') === 0 && typeof message === 'undefined') {
    this.errorCode = errorCode
    const errorMeta = PanErrorMeta[errorCode]
    this.message = errorMeta.message
    this.statusCode = errorMeta.httpStatus
    this.isInternal = !!errorMeta.isInternal
  } else if (errorCode.indexOf('PAN_') === 0 && typeof message === 'object') {
    this.errorCode = errorCode
    const errorMeta = PanErrorMeta[errorCode]
    this.message = errorMeta.message
    this.statusCode = errorMeta.httpStatus
    this.isInternal = !!errorMeta.isInternal
    this.payload = message
  } else {
    this.errorCode = errorCode || 0
    const errorMeta = PanErrorMeta[this.errorCode]
    if (errorMeta) {
      this.message = message || errorMeta.message
      this.statusCode = errorMeta.httpStatus
      this.isInternal = errorMeta.isInternal
    } else {
      this.message = message
    }
    this.payload = payload
  }

  Error.captureStackTrace(this, this.constructor)
}

util.inherits(PanException, Error)

module.exports = PanException
