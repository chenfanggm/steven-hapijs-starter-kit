const server = require('../../server/server')
const PanErrorConstants = require('../../common/errors/PanErrorConstants')


describe('Test Server Return Errors...', () => {

  describe('GET /api/v1/returnError', () => {
    it('should response 500', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/returnError'
      })
        .then((response) => {
          const { statusCode, result } = response
          expect(statusCode).toBe(500)
          expect(result.message).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
        })
    })
  })

  describe('GET /api/v1/returnBoomError', () => {
    it('should response 500', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/returnBoomError'
      })
        .then((response) => {
          const { statusCode, result } = response
          expect(statusCode).toBe(500)
          expect(result.message).toBe(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
        })
    })
  })

})

