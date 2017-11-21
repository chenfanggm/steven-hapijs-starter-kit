module.exports = {
  PAN_FE_API_INTERNAL_SERVER_ERROR: {
    message: 'Internal server error',
    httpStatus: 500,
    isInternal: true
  },
  PAN_FE_API_BAD_REQUEST: {
    message: 'Bad request',
    httpStatus: 400
  },
  PAN_FE_API_INVALID_SEQUENCE: {
    message: 'Invalid Sequence Number {{sequenceNo}}. Should be {{sequenceNo - 1}} only.',
    httpStatus: 400
  }
}
