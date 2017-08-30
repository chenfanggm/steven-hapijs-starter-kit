
const home = {
  handler: function (request, reply) {
    reply.file('index.html')
  }
}

const notFound = {
  handler: function (request, reply) {
    reply('Not Found')
  }
}

module.exports = {
  home,
  notFound
}