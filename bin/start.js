'use strict'

const server = require('../server/server')
const debug = require('debug')('app:bin:start')

// -----------------------------------
// process event listener
// -----------------------------------
process.on('exit', (code) => {
  const message = `[process] exiting with code ${code}`
  console.log(message)
  //Logger.error(message)
})

process.on('uncaughtException', (err) => {
  const message = `[process] encountered an uncaughtException. Will now exit. ${err}, Stack: ${err.stack}.`
  console.log(message)
  //Logger.error(message)
  process.exit(2)
})

process.on('unhandledRejection', (err) => {
  const message = `[process] encountered an unhandledRejection. Will ignore and continue. ${err}, Stack: ${err.stack}.`
  console.log(message)
  //Logger.error(message)
})

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
