const server = require('../../server/server')
const PanErrorConstants = require('../../common/errors/PanErrorConstants')
const CONSTANTS = require('../constants')


describe('Test Server Return Normal Error...', () => {

  describe('GET /api/v1/returnError', () => {
    it('should response 500', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/returnError'
      })
        .then((response) => {
          const { statusCode, result } = response
          expect(statusCode).toBe(500)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
          expect(result.message).toBeUndefined()
          expect(result.payload).toBeUndefined()
        })
    })
  })
})

describe('Test Server Return Boom Error...', () => {

  describe('GET /api/v1/returnBoomError', () => {
    it('should response 500', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/returnBoomError'
      })
        .then((response) => {
          const {statusCode, result} = response
          expect(statusCode).toBe(500)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
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
          expect(statusCode).toBe(500)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
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
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.BAD_REQUEST)
          expect(result.payload.extra).toBe(CONSTANTS.EXPECTED_EXTRA_MESSAGE)
        })
    })
  })
})

