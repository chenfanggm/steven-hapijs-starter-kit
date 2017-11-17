const fries = require('../common/errors/fries')


const returnBadImplementation = {
  handler: (request, reply) => {
    reply(fries.badImplementation())
  }
}

const returnBadImplementationWithMessage = {
  handler: (request, reply) => {
    const testMessage = 'Testing message'
    reply(fries.badImplementation(testMessage))
  }
}

const returnBadImplementationWithMessageAndPayload = {
  handler: (request, reply) => {
    const testMessage = 'Testing message'
    const testData = { data: 'Testing data' }
    reply(fries.badImplementation(testMessage, testData))
  }
}

const returnBadRequest = {
  handler: (request, reply) => {
    reply(fries.badRequest())
  }
}

const returnBadRequestWithMessage = {
  handler: (request, reply) => {
    const testMessage = 'Testing message'
    reply(fries.badRequest(testMessage))
  }
}

const returnBadRequestWithMessageAndPayload = {
  handler: (request, reply) => {
    const testMessage = 'Testing message'
    const testData = { data: 'Testing data' }
    reply(fries.badRequest(testMessage, testData))
  }
}

module.exports = {
  returnBadImplementation,
  returnBadImplementationWithMessage,
  returnBadImplementationWithMessageAndPayload,
  returnBadRequest,
  returnBadRequestWithMessage,
  returnBadRequestWithMessageAndPayload
}
