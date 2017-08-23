'use strict'
const path = require('path')
const Hapi = require('hapi')
const routes = require('./routes')
const plugins = require('./plugins')
const config = require('./config')
const debug = require('debug')('app:server')


debug('instantiate server...')
const server = new Hapi.Server({
  connections: {
    routes: {
      cors: config.cors,
      files: {
        relativeTo: config.dir_static
      }
    },
    router: {
      stripTrailingSlash: config.stripTrailingSlash
    }
  }
})

// -----------------------------------
// create connection
// -----------------------------------
debug('establish connection...')
server.connection({
  host: config.server_host,
  port: config.server_port
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