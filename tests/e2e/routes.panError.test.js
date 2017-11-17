const server = require('../../server/server')
const PanErrorConstants = require('../../common/errors/PanErrorConstants')
const PanErrorCode = require('../../common/errors/PanErrorCode')

const expectedResponseMessage = 'Testing message'
const expectedResponsePayloadData = 'Testing data'

describe('Testing PanError Route...', () => {
  describe('GET /api/v1/returnBadImplementation', () => {
    it('should response 500 only', (done) => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadImplementation'
      }, (response) => {
        const { statusCode, result } = response
        const errorCode = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
        const errorMeta = PanErrorCode[errorCode]
        expect(statusCode).toBe(errorMeta.STATUS_CODE)
        expect(result.code).toBe(errorCode)
        expect(result.message).toBeUndefined()
        done()
      })
    })
  })

  describe('GET /api/v1/returnBadImplementationWithMessage', () => {
    it('should response 500 with message', (done) => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadImplementationWithMessage'
      }, (response) => {
        const { statusCode, result } = response
        const errorCode = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
        const errorMeta = PanErrorCode[errorCode]
        expect(statusCode).toBe(errorMeta.STATUS_CODE)
        expect(result.code).toBe(errorCode)
        expect(result.message).toBeUndefined()
        expect(result.payload).toBeUndefined()
        done()
      })
    })
  })

  describe('GET /api/v1/returnBadImplementationWithMessageAndPayload', () => {
    it('should response 500 with message and payload', (done) => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadImplementationWithMessageAndPayload'
      }, (response) => {
        const { statusCode, result } = response
        const errorCode = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
        const errorMeta = PanErrorCode[errorCode]
        expect(statusCode).toBe(errorMeta.STATUS_CODE)
        expect(result.code).toBe(errorCode)
        expect(result.message).toBeUndefined()
        expect(result.payload).toBeDefined()
        expect(result.payload.data).toBe(expectedResponsePayloadData)
        done()
      })
    })
  })

  describe('GET /api/v1/returnBadRequest', () => {
    it('should response 400', (done) => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadRequest'
      }, (response) => {
        const { statusCode, result } = response
        const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
        const errorMeta = PanErrorCode[errorCode]
        expect(statusCode).toBe(errorMeta.STATUS_CODE)
        expect(result.code).toBe(errorCode)
        expect(result.message).toBe(errorMeta.MESSAGE)
        done()
      })
    })
  })

  describe('GET /api/v1/returnBadRequestWithMessage', () => {
    it('should response 400 with message', (done) => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadRequestWithMessage'
      }, (response) => {
        const { statusCode, result } = response
        const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
        const errorMeta = PanErrorCode[errorCode]
        expect(statusCode).toBe(errorMeta.STATUS_CODE)
        expect(result.code).toBe(errorCode)
        expect(result.message).toBe(expectedResponseMessage)
        expect(result.payload).toBeUndefined()
        done()
      })
    })
  })

  describe('GET /api/v1/returnBadRequestWithMessageAndPayload', () => {
    it('should response 500 with message and payload', (done) => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadRequestWithMessageAndPayload'
      }, (response) => {
        const { statusCode, result } = response
        const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
        const errorMeta = PanErrorCode[errorCode]
        expect(statusCode).toBe(errorMeta.STATUS_CODE)
        expect(result.code).toBe(errorCode)
        expect(result.message).toBe(expectedResponseMessage)
        expect(result.payload).toBeDefined()
        expect(result.payload.data).toBe(expectedResponsePayloadData)
        done()
      })
    })
  })
})
