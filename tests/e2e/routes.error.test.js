const server = require('../../server/server')
const PanErrorMeta = require('../../common/errors/PanErrorMeta')


describe('GET /api/v1/returnError', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/returnError'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).toBe(500)
      expect(result.message).toBe(PanErrorMeta.FE_API.INTERNAL_SERVER_ERROR.MESSAGE)
      done()
    })
  })
})
