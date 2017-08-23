'use strict'
const inert = require('inert')
const logging = require('./loggingPlugin')
const myPlugin = require('./myPlugin')


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
