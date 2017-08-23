module.exports.home = {
  handler: function (request, reply) {
    reply.file('index.html')
  }
}

module.exports.notFound = {
  handler: function (request, reply) {
    reply('Not Found')
  }
}