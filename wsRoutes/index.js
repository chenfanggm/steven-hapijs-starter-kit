'use strict'
const WS = require('./WSController')


const wsRoutes = (server, options, next) => {
  server.route([
    // ws
    { method: 'GET', path: '/hello', config: WS.hello},
    { method: 'GET', path: '/binaryArray', config: WS.binaryArray},
    { method: 'GET', path: '/binaryString', config: WS.binaryString},
    { method: 'GET', path: '/arrayBuffer', config: WS.arrayBuffer},
    { method: 'GET', path: '/binaryGzip', config: WS.binaryGzip},
  ])

  next()
}

wsRoutes.attributes = {
  name: 'wsRoutes',
  version: '1.0.0'
}

module.exports = {
  register: wsRoutes,
  routes: {
    prefix: '/api/v1/ws'
  }
}

