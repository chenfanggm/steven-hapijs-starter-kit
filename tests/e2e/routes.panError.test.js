const server = require('../../server/server')
const PanErrorConstants = require('../../common/errors/PanErrorConstants')
const PanErrorCode = require('../../common/errors/PanErrorCode')

const expectedResponseMessage = 'Testing message'
const expectedResponsePayloadData = 'Testing data'

describe('Testing PanError Route...', () => {
  describe('GET /api/v1/returnBadImplementation', () => {
    it('should response 500 only', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/returnBadImplementation'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
          const errorMeta = PanErrorCode[errorCode]
          expect(statusCode).toBe(errorMeta.STATUS_CODE)
          expect(result.code).toBe(errorCode)
          expect(result.message).toBeUndefined()
        })
    })
  })

  describe('GET /api/v1/returnBadImplementationWithMessage', () => {
    it('should response 500 with message', () => {
      return server.inject({
        method: 'GET',
        url: '/api/v1/returnBadImplementationWithMessage'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
          const errorMeta = PanErrorCode[errorCode]
          expect(statusCode).toBe(errorMeta.STATUS_CODE)
          expect(result.code).toBe(errorCode)
          expect(result.message).toBeUndefined()
          expect(result.payload).toBeUndefined()
        })
    })
  })

  describe('GET /api/v1/returnBadImplementationWithMessageAndPayload', () => {
    it('should response 500 with message and payload', () => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadImplementationWithMessageAndPayload'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
          const errorMeta = PanErrorCode[errorCode]
          expect(statusCode).toBe(errorMeta.STATUS_CODE)
          expect(result.code).toBe(errorCode)
          expect(result.message).toBeUndefined()
          expect(result.payload).toBeDefined()
          expect(result.payload.data).toBe(expectedResponsePayloadData)
        })
    })
  })

  describe('GET /api/v1/returnBadRequest', () => {
    it('should response 400', () => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadRequest'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
          const errorMeta = PanErrorCode[errorCode]
          expect(statusCode).toBe(errorMeta.STATUS_CODE)
          expect(result.code).toBe(errorCode)
          expect(result.message).toBe(errorMeta.MESSAGE)
        })
    })
  })

  describe('GET /api/v1/returnBadRequestWithMessage', () => {
    it('should response 400 with message', () => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadRequestWithMessage'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
          const errorMeta = PanErrorCode[errorCode]
          expect(statusCode).toBe(errorMeta.STATUS_CODE)
          expect(result.code).toBe(errorCode)
          expect(result.message).toBe(expectedResponseMessage)
          expect(result.payload).toBeUndefined()
        })
    })
  })

  describe('GET /api/v1/returnBadRequestWithMessageAndPayload', () => {
    it('should response 500 with message and payload', () => {
      server.inject({
        method: 'GET',
        url: '/api/v1/returnBadRequestWithMessageAndPayload'
      })
        .then((response) => {
          const { statusCode, result } = response
          const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
          const errorMeta = PanErrorCode[errorCode]
          expect(statusCode).toBe(errorMeta.STATUS_CODE)
          expect(result.code).toBe(errorCode)
          expect(result.message).toBe(expectedResponseMessage)
          expect(result.payload).toBeDefined()
          expect(result.payload.data).toBe(expectedResponsePayloadData)
        })
    })
  })
})
