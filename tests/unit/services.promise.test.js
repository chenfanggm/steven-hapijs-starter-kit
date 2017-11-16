const promiseService = require('../../services/PromiseService')
const utils = require('../utils')


const expectedRoundTime = 1 //ms
const testbed = {
  spy: {}
}

describe('Nested promises', () => {
  utils.setupConsoleLogSpy(testbed)

  describe('normal nested promise with resolve', () => {
    it('should call inner then and outer then', (done) => {
      promiseService.normalNestedPromiseWithResolve()
      setTimeout(() => {
        expect(testbed.spy.consoleLog).toHaveBeenCalledWith('Hit: inner promise then')
        expect(testbed.spy.consoleLog).not.toHaveBeenCalledWith('Hit: inner promise catch')
        expect(testbed.spy.consoleLog).toHaveBeenCalledWith('Hit: outer promise then')
        expect(testbed.spy.consoleLog).not.toHaveBeenCalledWith('Hit: outer promise catch')
        done()
      }, expectedRoundTime)
    })
  })
})
