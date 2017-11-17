const PanError = require('../../common/errors/PanError')
const PanErrorMeta = require('../../common/errors/PanErrorMeta')


const throwPanError = (code, message, payload) => {
  throw new PanError(code, message, payload);
}

describe('PanError Test...', () => {

  const errorMeta = PanErrorMeta.FE_API.INTERNAL_SERVER_ERROR
  const errorCode = errorMeta.code
  const errorMessage = errorMeta.message
  const errorPayload = {
    status: 500
  }

  describe('when throw a complete PanError', () => {
    it('should be recognized as both PanError and Error', () => {
      try {
        throwPanError(errorCode, errorMessage, errorPayload)
      } catch (err) {
        expect(err instanceof Error).toBe(true)
        expect(err instanceof PanError).toBe(true)
      }
    })

    it('should have code, message, and payload', () => {
      try {
        throwPanError(errorCode, errorMessage, errorPayload)
      } catch (err) {
        expect(err.name).toBe('PanError')
        expect(err.code).toBe(errorCode)
        expect(err.message).toBe(errorMessage)
        expect(err.payload).toBe(errorPayload)
      }
    })


    it('should have error stack', () => {
      try {
        throwPanError(errorCode, errorMessage, errorPayload)
      } catch (err) {
        expect(err.toString()).toBe(`PanError: ${errorMessage}`)
        expect(err.stack).toBeDefined()
        expect(err.stack.split('\n')[0]).toBe(`PanError: ${errorMessage}`)
        expect(err.stack.split('\n')[1].indexOf('throwPanError')).toBe(7)
      }
    })
  })

  describe('when throw a code only PanError', () => {
    it('should still have the code and message', () => {
      try {
        throwPanError(errorCode)
      } catch (err) {
        expect(err.code).toBe(errorCode)
        expect(err.message).toBe(errorMessage)
        expect(err.payload).toBeUndefined()
      }
    })
  })

  describe('when throw a message only PanError', () => {
    it('should have the code as -1 and message', () => {
      const errorMessage = 'A random message!'
      try {
        throwPanError(errorMessage)
      } catch (err) {
        expect(err.code).toBe(-1)
        expect(err.message).toBe(errorMessage)
        expect(err.payload).toBeUndefined()
      }
    })
  })

  describe('when throw a code and payload only PanError', () => {
    it('should still have the code, codeErrorMessage, and payload', () => {
      try {
        throwPanError(errorCode, errorPayload)
      } catch (err) {
        expect(err.code).toBe(errorCode)
        expect(err.message).toBe(errorMessage)
        expect(err.payload).toBe(errorPayload)
      }
    })
  })

  describe('when throw a message and payload only PanError', () => {
    it('should have the code as -1, message, and payload', () => {
      const errorMessage = 'A random message!'
      try {
        throwPanError(errorMessage, errorPayload)
      } catch (err) {
        expect(err.code).toBe(-1)
        expect(err.message).toBe(errorMessage)
        expect(err.payload).toBe(errorPayload)
      }
    })
  })

  describe('when throw a code only PanError, and that code does not have message', () => {
    it('should have only have the code', () => {
      const errorCode = PanErrorMeta.FE_API.BAD_REQUEST.code
      try {
        throwPanError(errorCode)
      } catch (err) {
        expect(err.code).toBe(errorCode)
        expect(err.message).toBeUndefined()
        expect(err.payload).toBeUndefined()
      }
    })
  })
})

