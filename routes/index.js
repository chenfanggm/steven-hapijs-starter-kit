'use strict'
const Main = require('./MainController')
const User = require('./UserController')
const Error = require('./ErrorController')
const PanError = require('./PanErrorController')



const routes = (server, options, next) => {
  server.route([
    // main
    { method: 'GET', path: '/', config: Main.home },

    // throw boom error
    { method: 'GET', path: '/throwBoomImplementationError', config: PanError.throwBoomImplementationError },
    { method: 'GET', path: '/throwBoomImplementationErrorWithPayload', config: PanError.throwBoomImplementationErrorWithPayload },
    { method: 'GET', path: '/throwBoomBadRequest', config: PanError.throwBoomBadRequest },
    { method: 'GET', path: '/throwBoomBadRequestInDeeperLayer', config: PanError.throwBoomBadRequestInDeeperLayer },

    //throw normal error
    { method: 'GET', path: '/throwNormalError', config: PanError.throwNormalError },
    { method: 'GET', path: '/throwNormalErrorInDeeperLayer', config: PanError.throwNormalErrorInDeeperLayer },

    // throw pan error
    { method: 'GET', path: '/throwPanInternalServerError', config: PanError.throwPanInternalServerError },
    { method: 'GET', path: '/throwPanInternalServerErrorWithExtra', config: PanError.throwPanInternalServerErrorWithExtra },
    { method: 'GET', path: '/throwPanBadRequestError', config: PanError.throwPanBadRequestError },

    // return pan error
    { method: 'GET', path: '/returnPanInternalServerError', config: PanError.returnPanInternalServerError },
    { method: 'GET', path: '/returnPanBadRequestWithExtra', config: PanError.returnPanBadRequestWithExtra },

    // return error
    // conclusion: promise need be returned or handle catch explicitly
    { method: 'GET', path: '/returnError', config: Error.returnError },
    { method: 'GET', path: '/returnBoomError', config: Error.returnBoomError },

    { method: 'GET', path: '/rejectErrorInReturnedPromise', config: Error.rejectErrorInReturnedPromise },
    { method: 'GET', path: '/rejectErrorInNoReturnedPromise', config: Error.rejectErrorInNoReturnedPromise },
    { method: 'GET', path: '/throwErrorInReturnedPromise', config: Error.throwErrorInReturnedPromise },
    { method: 'GET', path: '/throwErrorInNoReturnedPromise', config: Error.throwErrorInNoReturnedPromise },
    { method: 'GET', path: '/rejectErrorInAsyncWithinReturnedPromise', config: Error.rejectErrorInAsyncWithinReturnedPromise },
    { method: 'GET', path: '/rejectErrorInAsyncWithinNoReturnedPromise', config: Error.rejectErrorInAsyncWithinNoReturnedPromise },
    { method: 'GET', path: '/throwErrorInAsyncWithinReturnedPromise', config: Error.throwErrorInAsyncWithinReturnedPromise },
    { method: 'GET', path: '/throwErrorInAsyncWithinNoReturnedPromise', config: Error.throwErrorInAsyncWithinNoReturnedPromise },

    // user
    { method: 'GET', path: '/hello/{user?}', config: User.greetingUser},

    // default not found
    { method: 'GET', path: '/{path*}', config: Main.notFound }
  ])

  next()
}

routes.attributes = {
  name: 'routes',
  version: '1.0.0'
}

module.exports = {
  register: routes,
  routes: {
    prefix: '/api/v1'
  }
}

