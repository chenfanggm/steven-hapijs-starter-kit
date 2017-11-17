const good = require('good')
const winston = require('../common/winston')
const config = require('../config')

module.exports = {
  register: good,
  options: {
    ops: {
      interval: config.logger.opsInterval
    },
    includes: {
      request: ['headers', 'payload'],
      response: ['payload'],
    },
    reporters: {
      request:[{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ request: '*', response: '*', log: '*' }]
      }, {
        module: 'good-squeeze',
        name: 'SafeJson'
      }/*, {
        module: 'rotating-file-stream',
        args: [config.logger.requestLogName, {
          path: config.logger.requestLogPath,
          size: '10M',
          interval: '1d'
        }]
      }*/],
      winston: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ request: '*', response: '*', log: '*' }]
      }, {
        module: 'good-winston',
        args: [{ winston }]
      }],
      ops: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*' }]
      }, {
        module: 'good-squeeze',
        name: 'SafeJson'
      }, {
        module: 'good-file',
        args: [config.logger.opsLogFile]
      }],
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ request: '*', response: '*', log: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout'],
      /*http: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ error: '*' }]
      }, {
        module: 'good-http',
        args: ['http://prod.logs:3000', {
          wreck: {
            headers: { 'x-api-key': 12345 }
          }
        }]
      }]*/
    }
  }
}
