const server = require('../../server/server')


describe('Test Error Route...', () => {

  describe('GET /api/v1/returnError', () => {
    it('should handled by hapi, then response 500', () => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnError'
      })
        .then((response) => {
          const { statusCode, result } = response
          expect(statusCode).toBe(500)
          expect(result.error).toBe('Internal Server Error')
          expect(result.message).not.toBe('Return error')
        })
    })
  })

})

