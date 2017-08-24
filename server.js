'use strict'
const path = require('path')
const Hapi = require('hapi')
const routes = require('./routes')
const plugins = require('./plugins')
const config = require('./config')
const debug = require('debug')('app:server')


debug('instantiate server...')
const server = new Hapi.Server({debug: config.debugMode})

// -----------------------------------
// create connection
// -----------------------------------
debug('establish connection...')
server.connection({
  host: config.server_host,
  port: config.server_port,
  labels: ['api'],
  routes: {
    cors: config.cors,
    files: {
      relativeTo: config.dir_static
    }
  },
  router: {
    stripTrailingSlash: config.stripTrailingSlash
  }
})

const apiServer = server.select('api')

const inert = require('inert')
const logging = require('./plugins/loggingPlugin')
const myPlugin = require('./plugins/myPlugin')


module.exports = {
  initPlugins(server) {
    server.register([
      inert,
      myPlugin,
      logging
    ], (err) => {
      if (err) {
        console.error('Failed to load a plugin:', err)
      }
    })
  }
}

server.register([
  { register: inert }, // serve static file
  { register: myPlugin },
  { register: logging }
], (err) => {
  if (err) {
    throw err
  }
})

// -----------------------------------
// create routes
// -----------------------------------
debug('init routes...')
routes.initRoutes(server)

// -----------------------------------
// register plugins
// -----------------------------------
debug('init plugins...')
plugins.initPlugins(server)

module.exports = server