'use strict'
const Main = require('./MainRoute')
const User = require('./UserRoute')

module.exports = {
  initRoutes(server) {
    server.route([
      { method: 'GET', path: '/', config: Main.home },
      { method: 'GET', path: '/hello/{user?}', config: User.greetingUser},
      { method: 'GET', path: '/list', config: User.listUser },
      { method: 'GET', path: '/hello/{user*2}', config: User.greetingMultiUser},
      { method: 'GET', path: '/{path*}', config: Main.notFound }
    ])
  }
}