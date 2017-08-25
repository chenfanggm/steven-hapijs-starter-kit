'use strict'
const Main = require('./MainRoute')
const User = require('./UserRoute')

const routes = (server, options, next) => {
  server.route([
    { method: 'GET', path: '/', config: Main.home },
    { method: 'GET', path: '/hello/{user?}', config: User.greetingUser},
    { method: 'GET', path: '/list', config: User.listUser },
    { method: 'GET', path: '/hello/{user*2}', config: User.greetingMultiUser},
    { method: 'GET', path: '/{path*}', config: Main.notFound }
  ])

  next()
}

routes.attributes = {
  name: 'routes',
  version: '1.0.0'
}

module.exports.register = routes

