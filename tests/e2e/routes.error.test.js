const server = require('../../server/server')


const expectedRoundTime = 1 //ms
const testbed = {
  spy: {}
}

describe('GET /api/v1/returnError', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/returnError'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).toBe(500)
      expect(result.error).toBe('Internal Server Error')
      done()
    })
  })
})
