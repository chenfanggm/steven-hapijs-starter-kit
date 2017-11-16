'use strict'
const joi = require('joi')
const zlib = require('zlib')

module.exports.hello = {
  handler: (request, reply) => {
    return reply('world');
  },
  description: 'reply "world" if someone say hello',
  notes: 'The user parameter defaults to \'stranger\' if unspecified',
  tags: ['api']
}

module.exports.binaryArray = {
  handler: (request, reply) => {
    const response = new Buffer([1, 2, 3, 4, 5]);
    return reply(response);
  },
  tags: ['api']
}

module.exports.binaryString = {
  handler: (request, reply) => {
    const response = new Buffer('hello world');
    return reply(response)
  },
  tags: ['api']
}

module.exports.arrayBuffer = {
  handler: (request, reply) => {
    const buff = new ArrayBuffer(5);
    const arrBuf = new Uint8Array(buff);
    arrBuf[0] = 1
    arrBuf[1] = 2
    arrBuf[2] = 3
    arrBuf[3] = 4
    arrBuf[4] = 5

    console.log('arrBuf: ', arrBuf)
    console.log('typeof arrBuf: ', typeof arrBuf)
    console.log('length of arrBuf: ', arrBuf.length)
    console.log('arrBuf is buffer? ', Buffer.isBuffer(arrBuf))
    return reply(arrBuf)
  },
  tags: ['api']
}

module.exports.binaryGzip = {
  handler: (request, reply) => {
    const buff = new Buffer('hello world');
    zlib.gzip(buff, (err, zipped) => {
      if (err) return console.log(err)

      console.log('zipped: ', zipped)
      console.log('typeof zipped: ', typeof zipped)
      console.log('length of zipped: ', zipped.length)
      console.log('zipped is buffer? ', Buffer.isBuffer(zipped))

      return reply(zipped.toString("binary"));

      // const arrBuf = Uint8Array.from(zipped).buffer;
      // console.log('arrBuffed: ', arrBuf)
    })
  },
  tags: ['api']
}
