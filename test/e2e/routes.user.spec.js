'use strict'
const lab = exports.lab = require('lab').script()
const sinon = require('sinon')
const chai = require('chai').use(require('sinon-chai'))
const server = require('../../server/server')

const { describe, it } = lab
const { expect } = chai
const expectedRoundTime = 50 //ms

describe('GET /hello/{user?}', () => {
  it('should response "Hello {user}!"', (done) => {
    server.inject({
      method: 'GET',
      url: '/api/v1/hello/Chen'
    }, (response) => {
      const { statusCode, result } = response
      expect(statusCode).equal(200)
      expect(result).equal('Hello Chen!')
      done()
    })
  })
})
