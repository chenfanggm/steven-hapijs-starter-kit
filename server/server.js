'use strict'
const Hapi = require('hapi')
const routes = require('../routes/index')
const config = require('../config/index')
const debug = require('debug')('app:server')
const inert = require('inert')
const loggingPlugin = require('../plugins/loggingPlugin')
const errorHandlerPlugin = require('../plugins/errorHandlerPlugin')


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
  loggingPlugin,
  errorHandlerPlugin,
  inert, // serve static file
  routes
], (err) => {
  if (err) {
    throw err
  }
})


module.exports = server