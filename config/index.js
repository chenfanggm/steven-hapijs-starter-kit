const debug = require('debug')('app:config')
const path = require('path')

// ========================================================
// Default Configuration
// ========================================================
debug('Init configuration...')

module.exports = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  root_path: path.resolve(__dirname, '..'),
  dir_test: 'tests',
  dir_static: path.resolve(__dirname, '../static'),

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: 'localhost',
  server_port: process.env.PORT || 8080,
  cors: {
    origin: [
      'http://hapijs-starter.com'
    ],
    credentials: true
  },
  stripTrailingSlash: true,
  debugMode: process.env.NODE_ENV === 'development' ? { request: ['error', 'request-internal', 'uncaught'] } : {},


  // ----------------------------------
  // Database Configuration
  // ----------------------------------
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/hapijs_starter'
  },

  // ----------------------------------
  // JWT Configuration
  // ----------------------------------
  jwt: {
    tokenCookie: 'create_token',
    refreshTokenCookie: 'create_refresh',
    tokenExpire: '5m',
    tokenCookieExpire: 300000,
    refreshTokenExpire: '30d',
    refreshTokenCookieExpire: 86400000,
    secret: 'eyJ0aXRsZSI6ImZ1Y2sgeW91IHBheSBtZSIsImxlYWQiOiJ0'
  },

  pwd:{
    secret: 'hapijs_starter_secret'
  },

  // ----------------------------------
  // Logger Configuration
  // ----------------------------------
  logger: {
    level: "debug",
    colorize: true,
    opsInterval: 30 * 60 * 1000,
    requestLogPath: path.resolve(__dirname, '../logs'),
    requestLogName: 'starter-kit.log',
    requestLogFile: path.resolve(__dirname, '../logs/starter-kit.log'),
    opsLogFile: path.resolve(__dirname, '../logs/ops.log')
  },

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverageReporters : [
    { type : 'text-summary' },
    { type : 'html', dir : 'coverage' }
  ]
}
