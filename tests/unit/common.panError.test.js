const PanException = require('../../common/errors/PanException')
const PanErrorConstants = require('../../common/errors/PanErrorConstants')
const PanErrorCode = require('../../common/errors/PanErrorMeta')


const throwPanException = (errorCode, message, payload) => {
  throw new PanException(errorCode, message, payload)
}

describe('PanException Test...', () => {

  const errorCode = PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR
  const errorMeta = PanErrorCode[errorCode]
  const message = errorMeta.message
  const errorPayload = {
    status: 500
  }

  describe('when throw a complete PanException', () => {
    it('should be recognized as both PanException and Error', () => {
      try {
        throwPanException(errorCode, message, errorPayload)
      } catch (err) {
        expect(err instanceof Error).toBe(true)
        expect(err instanceof PanException).toBe(true)
      }
    })

    it('should have errorCode, message, and payload', () => {
      try {
        throwPanException(errorCode, message, errorPayload)
      } catch (err) {
        expect(err.name).toBe('PanException')
        expect(err.errorCode).toBe(errorCode)
        expect(err.message).toBe(message)
        expect(err.payload).toBe(errorPayload)
      }
    })


    it('should have error stack', () => {
      try {
        throwPanException(errorCode, message, errorPayload)
      } catch (err) {
        expect(err.toString()).toBe(`PanException: ${message}`)
        expect(err.stack).toBeDefined()
        expect(err.stack.split('\n')[0]).toBe(`PanException: ${message}`)
        expect(err.stack.split('\n')[1].indexOf('throwPanException')).toBe(7)
      }
    })
  })

  describe('when throw a errorCode only PanException', () => {
    it('should still have the errorCode and message', () => {
      try {
        throwPanException(errorCode)
      } catch (err) {
        expect(err.errorCode).toBe(errorCode)
        expect(err.message).toBe(message)
        expect(err.payload).toBeUndefined()
      }
    })
  })

  describe('when throw a message only PanException', () => {
    it('should have the errorCode as -1 and message', () => {
      const message = 'A random message!'
      try {
        throwPanException(message)
      } catch (err) {
        expect(err.errorCode).toBe(-1)
        expect(err.message).toBe(message)
        expect(err.payload).toBeUndefined()
      }
    })
  })

  describe('when throw a errorCode and payload only PanException', () => {
    it('should still have the errorCode, codeErrorMessage, and payload', () => {
      try {
        throwPanException(errorCode, errorPayload)
      } catch (err) {
        expect(err.errorCode).toBe(errorCode)
        expect(err.message).toBe(message)
        expect(err.payload).toBe(errorPayload)
      }
    })
  })

  describe('when throw a message and payload only PanException', () => {
    it('should have the errorCode as -1, message, and payload', () => {
      const message = 'A random message!'
      try {
        throwPanException(message, errorPayload)
      } catch (err) {
        expect(err.errorCode).toBe(-1)
        expect(err.message).toBe(message)
        expect(err.payload).toBe(errorPayload)
      }
    })
  })

  describe('when throw a errorCode only PanException, and that errorCode does not have message', () => {
    it('should have the errorCode and the pre-defined message', () => {
      const errorCode = PanErrorConstants.FE_API.BAD_REQUEST
      const errorMeta = PanErrorCode[errorCode]
      try {
        throwPanException(errorCode)
      } catch (err) {
        expect(err.errorCode).toBe(errorCode)
        expect(err.message).toBe(errorMeta.message)
        expect(err.payload).toBeUndefined()
      }
    })
  })
})

