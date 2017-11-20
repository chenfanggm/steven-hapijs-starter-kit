const server = require('../../server/server')
const PanErrorConstants = require('../../common/errors/PanErrorConstants')
const PanErrorCode = require('../../common/errors/PanErrorCode')


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
          expect(result.message).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
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
          expect(result.message).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
        })
    })
  })

})
