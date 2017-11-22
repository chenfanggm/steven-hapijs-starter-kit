const server = require('../../server/server')
const PanErrorConstants = require('../../plugins/errorHandler/panErrorConstants')
const PanErrorMeta = require('../../plugins/errorHandler/panErrorMeta')
const PanErrorCode = require('../../plugins/errorHandler/locale/en/errorCode')
const CONSTANTS = require('../constants')


describe('Testing Server Throw Pan Exception...', () => {

  describe('GET /api/v1/throwPanInternalServerError', () => {
    it('should response 500 with errorCode', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwPanInternalServerError'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorMeta = PanErrorMeta[PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR]
          expect(statusCode).toBe(errorMeta.httpStatus)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
          expect(result.message).toBeUndefined()
          expect(result.payload).toBeUndefined()
        })
    })
  })

  describe('GET /api/v1/throwPanInternalServerErrorWithExtra', () => {
    it('should response 500 only', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwPanInternalServerErrorWithExtra'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorMeta = PanErrorMeta[PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR]
          expect(statusCode).toBe(errorMeta.httpStatus)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
          expect(result.message).toBeUndefined()
          expect(result.payload.extra).toBe(CONSTANTS.EXPECTED_EXTRA_MESSAGE)
        })
    })
  })

  describe('GET /api/v1/throwPanBadRequestError', () => {
    it('should response 400 with errorCode', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwPanBadRequestError'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
          expect(statusCode).toBe(400)
          expect(result.errorCode).toBe(errorCode)
          expect(result.message).toBe(PanErrorCode[errorCode])

        })
    })
  })

  describe('GET /api/v1/throwPanBadRequestErrorWithExtra', () => {
    it('should response 400 with errorCode, message and extra info', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwPanBadRequestErrorWithExtra'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
          expect(statusCode).toBe(400)
          expect(result.errorCode).toBe(errorCode)
          expect(result.message).toBe(PanErrorCode[errorCode])
          expect(result.payload.extra).toBe(CONSTANTS.EXPECTED_EXTRA_MESSAGE)
        })
    })
  })

  describe('GET /api/v1/throwPanInvalidSequenceErrorWithExtra', () => {
    it('should response 400 with errorCode, message and extra info', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwPanInvalidSequenceErrorWithExtra'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.INVALID_SEQUENCE
          expect(statusCode).toBe(400)
          expect(result.errorCode).toBe(errorCode)
          expect(result.message).toBe('Invalid Sequence Number 1. Should be 0 only.')
          expect(result.payload.extra).toBe(CONSTANTS.EXPECTED_EXTRA_MESSAGE)
        })
    })
  })

})
