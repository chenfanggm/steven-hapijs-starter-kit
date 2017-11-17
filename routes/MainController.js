
const home = {
  handler: (request, reply) => {
    reply.file('index.html')
  }
}

const notFound = {
  handler: (request, reply) => {
    reply('Not Found')
  }
}

module.exports = {
  home,
  notFound
}