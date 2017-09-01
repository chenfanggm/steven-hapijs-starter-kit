'use strict'
const lab = exports.lab = require('lab').script()
const sinon = require('sinon')
const chai = require('chai').use(require('sinon-chai'))
const server = require('../../server/server')

const { describe, it } = lab
const { expect } = chai
const expectedRoundTime = 50 //ms

describe('GET /api/v1/returnError', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/returnError'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(500)
      expect(result.error).equal('Internal Server Error')
      done()
    })
  })
})

describe('GET /api/v1/returnBoomError', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/returnBoomError'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(400)
      expect(result.error).equal('Bad Request')
      expect(result.message).equal('Return boom error')
      done()
    })
  })
})

describe('GET /api/v1/throwError', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/throwError'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(500)
      expect(result.error).equal('Internal Server Error')
      done()
    })
  })
})

describe('GET /api/v1/throwBoomError', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/throwBoomError'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(500)
      expect(result.error).equal('Internal Server Error')
      done()
    })
  })
})

describe('GET /api/v1/rejectErrorInReturnedPromise', () => {
  it('should throw unhandled reject, but handled by hapi and return a 500 response', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/rejectErrorInReturnedPromise'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(500)
      expect(result.error).equal('Internal Server Error')
      done()
    })
  })
})

describe('GET /api/v1/rejectErrorInNoReturnedPromise', () => {
  it('should Throws an unhandled rejection, thus no response and catch', (done) => {
    const spy = sinon.spy()

    server.inject({
      method: 'GET',
      url: '/api/v1/rejectErrorInNoReturnedPromise'
    }, (response) => {
      spy()
    })

    setTimeout(() => {
      expect(spy).not.called
      done()
    }, expectedRoundTime)
  })
})

describe('GET /api/v1/throwErrorInReturnedPromise', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/throwErrorInReturnedPromise'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(500)
      expect(result.error).equal('Internal Server Error')
      done()
    })
  })
})

describe('GET /api/v1/throwErrorInNoReturnedPromise', () => {
  it('should Throws an unhandled rejection, thus no response and catch', (done) => {
    const spy = sinon.spy()

    server.inject({
      method: 'GET',
      url: '/api/v1/throwErrorInNoReturnedPromise'
    }, (response) => {
      spy()

    })

    setTimeout(() => {
      expect(spy).not.called
      done()
    }, expectedRoundTime)
  })
})

describe('GET /api/v1/rejectErrorInAsyncWithinReturnedPromise', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/rejectErrorInAsyncWithinReturnedPromise'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(500)
      expect(result.error).equal('Internal Server Error')
      done()
    })
  })
})

describe('GET /api/v1/rejectErrorInAsyncWithinNoReturnedPromise', () => {
  it('should Throws an unhandled rejection, thus no response and catch', (done) => {
    const spy = sinon.spy()

    server.inject({
      method: 'GET',
      url: '/api/v1/rejectErrorInAsyncWithinNoReturnedPromise'
    }, (response) => {
      spy()
    })

    setTimeout(() => {
      expect(spy).not.called
      done()
    }, expectedRoundTime)
  })
})

describe('GET /api/v1/throwErrorInAsyncWithinReturnedPromise', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/throwErrorInAsyncWithinReturnedPromise'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(500)
      expect(result.error).equal('Internal Server Error')
      done()
    })
  })
})

describe('GET /api/v1/throwErrorInAsyncWithinNoReturnedPromise', () => {
  it('should handled by hapi, then response 500', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/throwErrorInAsyncWithinNoReturnedPromise'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(500)
      expect(result.error).equal('Internal Server Error')
      done()
    })
  })
})
