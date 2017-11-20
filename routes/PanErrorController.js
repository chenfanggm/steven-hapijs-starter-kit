const axios = require('axios')
const Promise = require('bluebird')
const PanError = require('../common/errors/PanError')
const PanErrorConstants = require('../common/errors/PanErrorConstants')
const boom = require('boom')


const testMessage = 'This is a testing message'
module.exports = {
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
              const error = new Error('This is a test error')
              throw boom.badRequest(PanErrorConstants.FE_API.BAD_REQUEST, {
                stk: error.stack
              })
            })
        })
    }
  },

  throwNormalError: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new Error('This is a normal testing error')
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
  },

  throwPanInternalServerError: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanError(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR)
        })
    }
  },

  throwPanInternalServerErrorWithExtra: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanError(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR, {
            extra: testMessage
          })
        })
    }
  },

  throwPanBadRequestError: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanError(PanErrorConstants.FE_API.BAD_REQUEST)
        })
    }
  },

  returnPanInternalServerError: {
    handler: (request, reply) => {
      reply(new PanError(PanErrorConstants.FE_API.INTERNAL_SERVER_ERROR))
    }
  },

  returnPanBadRequestWithExtra: {
    handler: (request, reply) => {
      return Promise.resolve()
        .then(() => {
          throw new PanError(PanErrorConstants.FE_API.BAD_REQUEST, {
            extra: testMessage
          })
        })
    }
  }
}

