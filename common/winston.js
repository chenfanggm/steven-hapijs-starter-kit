const winston = require('winston')
require('winston-daily-rotate-file')
const config = require('../config')

const logger = new (winston.Logger)({
  level: config.logger.level,
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: config.logger.requestLogFile,
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      colorize: false,
      json: config.logger.json,
      prettyPrint: true,
      silent: false
    })
  ]
})

module.exports = logger
