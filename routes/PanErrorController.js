const axios = require('axios')
const Promise = require('bluebird')
const PanException = require('../plugins/errorHandler/PanException')
const PanErrorConstants = require('../plugins/errorHandler/panErrorConstants')
const boom = require('boom')


const testMessage = 'This is a testing message'
module.exports = {

  throwPanInternalServerError: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanException(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
        })
    }
  },

  throwPanInternalServerErrorWithExtra: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanException(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR, {
            extra: testMessage
          })
        })
    }
  },

  throwPanBadRequestError: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanException(PanErrorConstants.FE_API.BAD_REQUEST)
        })
    }
  },

  throwPanBadRequestErrorWithExtra: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanException(PanErrorConstants.FE_API.BAD_REQUEST, {
            extra: testMessage
          })
        })
    }
  },

  throwPanInvalidSequenceErrorWithExtra: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanException(PanErrorConstants.FE_API.INVALID_SEQUENCE, {
            sequenceNo: 1,
            preSequenceNo: 0,
            extra: testMessage
          })
        })
    }
  },

  returnPanInternalServerError: {
    handler: (request, reply) => {
      reply(new PanException(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR))
    }
  },

  returnPanBadRequestWithExtra: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanException(PanErrorConstants.FE_API.BAD_REQUEST, {
            extra: testMessage
          })
        })
    }
  },

  throwBoomImplementationError: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw boom.badImplementation(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
        })
    }
  },

  throwBoomImplementationErrorWithPayload: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          const error = new Error('This is a test error')
          throw boom.badImplementation(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR, {
            stk: error.stack
          })
        })
    }
  },

  throwBoomBadRequest: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw boom.badRequest(PanErrorConstants.FE_API.BAD_REQUEST)
        })
    }
  },

  throwBoomBadRequestInDeeperLayer: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          return axios({
            method: 'GET',
            path: 'errorlocation'
          })
            .catch((err) => {
              const error = new Error(testMessage)
              throw boom.badRequest(PanErrorConstants.FE_API.BAD_REQUEST, {
                stk: error.stack
              })
            })
        })
    }
  },

  throwBoomBadRequestWithExtra: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw boom.badRequest(PanErrorConstants.FE_API.BAD_REQUEST, {
            extra: testMessage
          })
        })
    }
  },

  throwNormalError: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new Error(testMessage)
        })
    }
  },

  throwNormalErrorInDeeperLayer: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          return axios({
            method: 'GET',
            path: 'errorlocation'
          })
            .catch((err) => {
              throw err
            })
        })
    }
  }
}

