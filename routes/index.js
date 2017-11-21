'use strict'
const MainController = require('./MainController')
const UserController = require('./UserController')
const ErrorController = require('./ErrorController')
const PanErrorController = require('./PanErrorController')


const routes = (server, options, next) => {
  server.route([
    // main
    { method: 'GET', path: '/', config: MainController.home },

    // throw boom error
    { method: 'GET', path: '/throwBoomImplementationError', config: PanErrorController.throwBoomImplementationError },
    { method: 'GET', path: '/throwBoomImplementationErrorWithPayload', config: PanErrorController.throwBoomImplementationErrorWithPayload },
    { method: 'GET', path: '/throwBoomBadRequest', config: PanErrorController.throwBoomBadRequest },
    { method: 'GET', path: '/throwBoomBadRequestInDeeperLayer', config: PanErrorController.throwBoomBadRequestInDeeperLayer },
    { method: 'GET', path: '/throwBoomBadRequestWithExtra', config: PanErrorController.throwBoomBadRequestWithExtra },

    //throw normal error
    { method: 'GET', path: '/throwNormalError', config: PanErrorController.throwNormalError },
    { method: 'GET', path: '/throwNormalErrorInDeeperLayer', config: PanErrorController.throwNormalErrorInDeeperLayer },

    // throw pan error
    { method: 'GET', path: '/throwPanInternalServerError', config: PanErrorController.throwPanInternalServerError },
    { method: 'GET', path: '/throwPanInternalServerErrorWithExtra', config: PanErrorController.throwPanInternalServerErrorWithExtra },
    { method: 'GET', path: '/throwPanBadRequestError', config: PanErrorController.throwPanBadRequestError },
    { method: 'GET', path: '/throwPanBadRequestErrorWithExtra', config: PanErrorController.throwPanBadRequestErrorWithExtra },
    { method: 'GET', path: '/throwPanInvalidSequenceErrorWithExtra', config: PanErrorController.throwPanInvalidSequenceErrorWithExtra },


    // return pan error
    { method: 'GET', path: '/returnPanInternalServerError', config: PanErrorController.returnPanInternalServerError },
    { method: 'GET', path: '/returnPanBadRequestWithExtra', config: PanErrorController.returnPanBadRequestWithExtra },

    // return error
    // conclusion: promise need be returned or handle catch explicitly
    { method: 'GET', path: '/returnError', config: ErrorController.returnError },
    { method: 'GET', path: '/returnBoomError', config: ErrorController.returnBoomError },

    // not-ref
    { method: 'GET', path: '/rejectErrorInReturnedPromise', config: ErrorController.rejectErrorInReturnedPromise },
    { method: 'GET', path: '/rejectErrorInNoReturnedPromise', config: ErrorController.rejectErrorInNoReturnedPromise },
    { method: 'GET', path: '/throwErrorInReturnedPromise', config: ErrorController.throwErrorInReturnedPromise },
    { method: 'GET', path: '/throwErrorInNoReturnedPromise', config: ErrorController.throwErrorInNoReturnedPromise },
    { method: 'GET', path: '/rejectErrorInAsyncWithinReturnedPromise', config: ErrorController.rejectErrorInAsyncWithinReturnedPromise },
    { method: 'GET', path: '/rejectErrorInAsyncWithinNoReturnedPromise', config: ErrorController.rejectErrorInAsyncWithinNoReturnedPromise },
    { method: 'GET', path: '/throwErrorInAsyncWithinReturnedPromise', config: ErrorController.throwErrorInAsyncWithinReturnedPromise },
    { method: 'GET', path: '/throwErrorInAsyncWithinNoReturnedPromise', config: ErrorController.throwErrorInAsyncWithinNoReturnedPromise },

    // user
    { method: 'GET', path: '/hello/{user?}', config: UserController.greetingUser},

    // default not found
    { method: 'GET', path: '/{path*}', config: MainController.notFound }
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

