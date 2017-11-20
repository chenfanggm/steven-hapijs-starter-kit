const server = require('../../server/server')
const PanErrorConstants = require('../../common/errors/PanErrorConstants')
const PanErrorCode = require('../../common/errors/PanErrorCode')
const CONSTANTS = require('../constants')

describe('Testing Server Throw Pan Error...', () => {

  describe('GET /api/v1/throwPanInternalServerError', () => {
    it('should response 500 only', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwPanInternalServerError'
      })
        .then((response) => {
          const { statusCode, result } = response
          expect(statusCode).toBe(500)
          expect(result.message).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
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
          expect(statusCode).toBe(500)
          expect(result.message).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
          expect(result.payload.extra).toBe(CONSTANTS.EXPECTED_EXTRA_MESSAGE)
        })
    })
  })

  describe('GET /api/v1/throwPanBadRequestError', () => {
    it('should response 400 with error message', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwPanBadRequestError'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
          const errorMeta = PanErrorCode[errorCode]
          expect(statusCode).toBe(400)
          expect(result.message).toBe(errorCode)
          expect(result.desc).toBe(errorMeta.MESSAGE)
        })
    })
  })
})


describe('Testing Server Return Pan Error...', () => {

  describe('GET /api/v1/returnPanInternalServerError', () => {
    it('should response 500 only', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/returnPanInternalServerError'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
          const errorMeta = PanErrorCode[errorCode]
          expect(statusCode).toBe(errorMeta.STATUS_CODE)
          expect(result.message).toBe(errorCode)
          expect(result.payload).toBeUndefined()
        })
    })
  })

  describe('GET /api/v1/returnPanBadRequestWithExtra', () => {
    it('should response 500 with extra message', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/returnPanBadRequestWithExtra'
      })
        .then((response) => {
          const { statusCode, result } = response
          expect(statusCode).toBe(400)
          expect(result.message).toBe(PanErrorConstants.FE_API.BAD_REQUEST)
          expect(result.payload.extra).toBe(CONSTANTS.EXPECTED_EXTRA_MESSAGE)
        })
    })
  })
})