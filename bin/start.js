'use strict'

const server = require('../server')
const debug = require('debug')('app:bin:start')

// -----------------------------------
// start server
// -----------------------------------
debug('starting server...')
server.start((err) => {
  if (err) {
    throw err
  }
  debug(`server now running at: ${server.info.uri}`)
})
