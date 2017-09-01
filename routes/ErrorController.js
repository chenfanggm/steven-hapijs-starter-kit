const Request = require('request')
const boom = require('boom')

const returnError = {
  handler: function (request, reply) {
    // not return customized message to client
    reply(new Error('Return error'))
  }
}

const returnBoomError = {
  handler: function (request, reply) {
    // return customized message to client
    reply(boom.badRequest('Return boom error'))
  }
}

const throwError = {
  handler: function (request, reply) {
    // not trigger uncaught error
    // protected by hapi and return 500 internal server error
    throw new Error('Throw error')
  }
}

const throwBoomError = {
  handler: function (request, reply) {
    // not trigger uncaught error
    // protected by hapi and return 500 internal server error
    // need more approval, since test case not get response but a exception
    throw boom.badRequest('Throw boom error')
  }
}

const rejectErrorInReturnedPromise = {
  handler: function (request, reply) {
    // not trigger unhandled rejection
    // protected by hapi and return 500 internal server error
    return new Promise((resolve, reject) => {
      reject(new Error('Reject error in returned promise'))
    })
  }
}

const rejectErrorInNoReturnedPromise = {
  handler: function (request, reply) {
    // trigger unhandled rejection
    // will turn down the server
    new Promise((resolve, reject) => {
      reject(new Error('Reject error in no returned promise'))
    })
  }
}

const throwErrorInReturnedPromise = {
  handler: function (request, reply) {
    // not trigger unhandled rejection
    // return 500 internal server error
    return new Promise((resolve, reject) => {
      throw new Error('Throw error in returned promise')
    })
  }
}

const throwErrorInNoReturnedPromise = {
  handler: function (request, reply) {
    // trigger unhandled rejection
    // will turn down the server
    new Promise((resolve, reject) => {
      throw new Error('Throw error in no returned promise ')
    })
  }
}

const rejectErrorInAsyncWithinReturnedPromise = {
  handler: function (request, reply) {
    // not trigger unhandled rejection
    return new Promise((resolve, reject) => {
      Request
        .get('http://localhost')
        .on('error', (err) => {
          reject(new Error(`Reject error in async within returned promise, and got error: ${err}`))
        })
    })
  }
}

const rejectErrorInAsyncWithinNoReturnedPromise = {
  handler: function (request, reply) {
    // trigger unhandled rejection
    // will turn down the server
    new Promise((resolve, reject) => {
      Request
        .get('http://localhost')
        .on('error', (err) => {
          reject(new Error(`Reject error in async within no returned promise, and got error: ${err}`))
        })
    })
  }
}

const throwErrorInAsyncWithinReturnedPromise = {
  handler: function (request, reply) {
    // not trigger uncaught error
    return new Promise((resolve, reject) => {
      Request
        .get('http://localhost')
        .on('error', (err) => {
          throw new Error(`Throw error in async within returned promise, and got error: ${err}`)
        })
    })
  }
}

const throwErrorInAsyncWithinNoReturnedPromise = {
  handler: function (request, reply) {
    // not trigger uncaught error
    // protected by hapi and return 500 internal server error
    new Promise((resolve, reject) => {
      Request
        .get('http://localhost')
        .on('error', (err) => {
          throw new Error(`Throw error in async within no returned promise, and got error: ${err}`)
        })
    })
  }
}

module.exports = {
  returnError,
  returnBoomError,
  throwError,
  throwBoomError,
  rejectErrorInReturnedPromise,
  rejectErrorInNoReturnedPromise,
  throwErrorInReturnedPromise,
  throwErrorInNoReturnedPromise,
  rejectErrorInAsyncWithinReturnedPromise,
  rejectErrorInAsyncWithinNoReturnedPromise,
  throwErrorInAsyncWithinReturnedPromise,
  throwErrorInAsyncWithinNoReturnedPromise
}
