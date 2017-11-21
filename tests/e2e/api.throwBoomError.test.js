const server = require('../../server/server')
const PanErrorConstants = require('../../common/errors/PanErrorConstants')
const PanErrorCode = require('../../common/errors/PanErrorMeta')
const CONSTANTS = require('../constants')


describe('Testing Server Throw Boom Error...', () => {

  describe('GET /api/v1/throwBoomImplementationError', () => {
    it('should response 500 and error code', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwBoomImplementationError'
      })
        .then((response) => {
          const {statusCode, result} = response
          expect(statusCode).toBe(500)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
        })
    })
  })

  describe('GET /api/v1/throwBoomImplementationErrorWithPayload', () => {
    it('should response 500, error code, and payload', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwBoomImplementationErrorWithPayload'
      })
        .then((response) => {
          const {statusCode, result} = response
          expect(statusCode).toBe(500)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
          expect(result.payload.stk.split('\n')[0]).toBe('Error: This is a test error')
        })
    })
  })

  describe('GET /api/v1/throwBoomBadRequest', () => {
    it('should response 400 and error code', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwBoomBadRequest'
      })
        .then((response) => {
          const {statusCode, result} = response
          expect(statusCode).toBe(400)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.BAD_REQUEST)
        })
    })
  })

  describe('GET /api/v1/throwBoomBadRequestInDeeperLayer', () => {
    it('should response 400 with message', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwBoomBadRequestInDeeperLayer'
      })
        .then((response) => {
          const {statusCode, result} = response
          const errorMeta = PanErrorCode[PanErrorConstants.FE_API.BAD_REQUEST]
          expect(statusCode).toBe(400)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.BAD_REQUEST)
          expect(result.message).toBe(errorMeta.message)
          expect(result.payload.stk.split('\n')[0]).toBe('Error: This is a test error')
        })
    })
  })

  describe('GET /api/v1/throwBoomBadRequestWithExtra', () => {
    it('should response 400 with message', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwBoomBadRequestWithExtra'
      })
        .then((response) => {
          const {statusCode, result} = response
          const errorMeta = PanErrorCode[PanErrorConstants.FE_API.BAD_REQUEST]
          expect(statusCode).toBe(400)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.BAD_REQUEST)
          expect(result.message).toBe(errorMeta.message)
          expect(result.payload.extra).toBe(CONSTANTS.EXPECTED_EXTRA_MESSAGE)
        })
    })
  })

})
