'use strict'
const Hapi = require('hapi')
const Nes = require('nes');
const debug = require('debug')('app:server')
const inert = require('inert')
const config = require('../config')
const routes = require('../routes')
const wsRoutes = require('../routesWS')
const logger = require('../plugins/logger')
const errorHandler = require('../plugins/errorHandler')


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
  errorHandler,
  //inert, // serve static file
  routes,
  logger
], (err) => {
  if (err) throw err
})

// server.register({
//   register: Nes,
//   options: {
//     onConnection: (socket) => {
//       console.log(`A client connected with id ${socket.id}`)
//     },
//     onDisconnection: (socket) => {
//       console.log(`A client dis-connected with id ${socket.id}`)
//     },
//     onMessage: (socket, message, next) => {
//       console.log(message)
//       //console.log(`A message sent from client with id ${socket.id}, as ${message}`)
//       next()
//     }
//   }
// }, (err) => {
//   if (err) throw err
//
//   server.register([
//     wsRoutes
//   ], (err) => {
//     if (err) throw err
//   })
// })

module.exports = server