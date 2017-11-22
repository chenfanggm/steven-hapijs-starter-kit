const server = require('../../server/server')
const PanErrorConstants = require('../../plugins/errorHandler/panErrorConstants')
const PanErrorCode = require('../../plugins/errorHandler/panErrorMeta')


describe('Testing Server Throw Normal Error...', () => {

  describe('GET /api/v1/throwNormalError', () => {
    it('should response 500 only', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwNormalError'
      })
        .then((response) => {
          const {statusCode, result} = response
          expect(statusCode).toBe(500)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
          expect(result.message).toBeUndefined()
          expect(result.payload).toBeUndefined()
        })
    })
  })

  describe('GET /api/v1/throwNormalErrorInDeeperLayer', () => {
    it('should response 500 only', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/throwNormalErrorInDeeperLayer'
      })
        .then((response) => {
          const {statusCode, result} = response
          expect(statusCode).toBe(500)
          expect(result.errorCode).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
          expect(result.message).toBeUndefined()
          expect(result.payload).toBeUndefined()
        })
    })
  })

})
