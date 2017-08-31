const Lab = require('lab')
const lab = exports.lab = Lab.script()
const chai = require('chai')
const server = require('../server/server')

const describe = lab.describe
const it = lab.it
const before = lab.before
const after = lab.after
const expect = chai.expect;

describe('server should', () => {

  before((done) => {
    done()
  })

  after((done) => {
    done()
  })

  it('response a html file with title "Hello Hapi"', () => {
    return server.inject({
      method: 'GET',
      url: '/api/v1/'
    })
      .then((response) => {
        console.log(response)
        const { statusCode, result } = response
        expect(statusCode).equal(200)
        expect(result).include('<title>Hello Hapi</title>')
      })
  })
})