const util = require('util')
const PanErrorCode = require('./PanErrorCode')

const PanError = function (code, message, payload) {
  this.name = this.constructor.name

  if (typeof code === 'undefined') {
    this.code = -1
  } else if (code.indexOf('PAN_') !== 0 && typeof message === 'undefined') {
    this.code = -1
    this.message = code
  } else if (code.indexOf('PAN_') !== 0 && typeof message === 'object') {
    this.code = -1
    this.message = code
    this.payload = message
  } else if (code.indexOf('PAN_') === 0 && typeof message === 'undefined') {
    this.code = code
    const errorCode = PanErrorCode[code]
    this.message = errorCode.MESSAGE
    this.statusCode = errorCode.STATUS_CODE
    this.isInternal = errorCode.IS_INTERNAL
  } else if (code.indexOf('PAN_') === 0 && typeof message === 'object') {
    this.code = code
    const errorCode = PanErrorCode[code]
    this.message = errorCode.MESSAGE
    this.statusCode = errorCode.STATUS_CODE
    this.isInternal = errorCode.IS_INTERNAL
    this.payload = message
  } else {
    this.code = code || 0
    const errorCode = PanErrorCode[this.code]
    if (errorCode) {
      this.message = message || errorCode.MESSAGE
      this.statusCode = errorCode.STATUS_CODE
      this.isInternal = errorCode.IS_INTERNAL
    } else {
      this.message = message
    }
    this.payload = payload
  }

  Error.captureStackTrace(this, this.constructor)
}

util.inherits(PanError, Error)

module.exports = PanError
