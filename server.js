'use strict'
const Hapi = require('hapi')
const routes = require('./routes')
const config = require('./config')
const debug = require('debug')('app:server')
const inert = require('inert')
const loggingPlugin = require('./plugins/loggingPlugin')


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

// -----------------------------------
// register plugins & routes
// -----------------------------------
debug('init plugins...')
server.register([
  inert, // serve static file
  loggingPlugin,
  {
    register: routes,
    routes: {
      prefix: '/api/v1'
    }
  }
], (err) => {
  if (err) {
    throw err
  }
})


module.exports = server