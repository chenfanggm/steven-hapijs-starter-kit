'use strict'
const Main = require('./MainController')
const User = require('./UserController')
const Error = require('./ErrorController')


const routes = (server, options, next) => {
  server.route([
    // main
    { method: 'GET', path: '/', config: Main.home },
    // error
    // conclusion: promise need be returned or handle catch explicitly
    { method: 'GET', path: '/returnError', config: Error.returnError },
    { method: 'GET', path: '/returnBoomError', config: Error.returnBoomError },
    { method: 'GET', path: '/throwError', config: Error.throwError },
    { method: 'GET', path: '/throwBoomError', config: Error.throwBoomError },
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
    { method: 'GET', path: '/list', config: User.listUser },
    { method: 'GET', path: '/hello/{user*2}', config: User.greetingMultiUser},
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

