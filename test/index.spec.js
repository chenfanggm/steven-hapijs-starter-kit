
const lab = exports.lab = require('lab').script()
const chai = require('chai')
const server = require('../server/server')

const { describe, it } = lab
const { expect } = chai

describe('GET /api/v1/', () => {

  it('should response a html file with title "Hello Hapi"', () => {
    return server.inject({
      method: 'GET',
      url: '/api/v1/'
    })
      .then((response) => {
        const { statusCode, result } = response
        expect(statusCode).equal(200)
        expect(result).include('<title>Hello Hapi</title>')
      })
  })
})

describe('GET /api/v1/notFound', () => {

  it('should response a string "Not Found"', () => {
    return server.inject({
      method: 'GET',
      url: '/api/v1/notFound'
    })
      .then((response) => {
        const { statusCode, result } = response
        expect(statusCode).equal(200)
        expect(result).equal('Not Found')
      })
  })
})