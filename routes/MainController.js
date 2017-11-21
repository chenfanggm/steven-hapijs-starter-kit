const boom = require('boom')


const home = {
  handler: (request, reply) => {
    reply.file('index.html')
  }
}

const notFound = {
  handler: (request, reply) => {
    reply(boom.notFound('Not Found'))
  }
}

module.exports = {
  home,
  notFound
}