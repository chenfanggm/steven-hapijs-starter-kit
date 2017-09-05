'use strict'
const lab = exports.lab = require('lab').script()
const sinon = require('sinon')
const chai = require('chai').use(require('sinon-chai'))
const PromiseService = require('../../services/PromiseService')

const { describe, it, before, after } = lab
const { expect } = chai
const expectedRoundTime = 20 //ms


describe('PromiseController.normalNestedPromiseWithReturn', () => {

  before((done) => {
    sinon.spy(console, 'log')
    done()
  })

  after((done) => {
    console.log.restore()
    done()
  })

  it('should call both inner then and outer then', (done) => {
    PromiseService.normalNestedPromiseWithResolve()
    setTimeout(() => {
      expect(console.log).calledWith('Hit: inner promise then')
      expect(console.log).not.calledWith('Hit: inner promise catch')
      expect(console.log).calledWith('Hit: outer promise then')
      expect(console.log).not.calledWith('Hit: outer promise catch')

      done()
    }, expectedRoundTime)
  })
})


describe('PromiseController.throwErrorAtInnerPromiseWithInnerCatchButNotThrow', () => {

  before((done) => {
    sinon.spy(console, 'log')
    done()
  })

  after((done) => {
    console.log.restore()
    done()
  })

  it('should be caught in the inner catch, and continue outer then', (done) => {
    PromiseService.throwErrorAtInnerPromiseWithInnerCatchButNotThrow()
    setTimeout(() => {
      expect(console.log).not.calledWith('Hit: inner promise then')
      expect(console.log).calledWith('Hit: inner promise catch')
      expect(console.log).calledWith('Hit: outer promise then')
      expect(console.log).not.calledWith('Hit: outer promise catch')
      done()
    }, expectedRoundTime)
  })
})

describe('PromiseController.throwErrorAtInnerPromiseWithInnerCatchButThrow', () => {

  before((done) => {
    sinon.spy(console, 'log')
    done()
  })

  after((done) => {
    console.log.restore()
    done()
  })

  it('should be caught in both the inner catch and the outer catch', (done) => {
    PromiseService.throwErrorAtInnerPromiseWithInnerCatchButThrow()
    setTimeout(() => {
      expect(console.log).not.calledWith('Hit: inner promise then')
      expect(console.log).calledWith('Hit: inner promise catch')
      expect(console.log).not.calledWith('Hit: outer promise then')
      expect(console.log).calledWith('Hit: outer promise catch')
      done()
    }, expectedRoundTime)
  })
})

describe('PromiseController.rejectAtInnerPromiseWithInnerCatchButNotThrow', () => {

  before((done) => {
    sinon.spy(console, 'log')
    done()
  })

  after((done) => {
    console.log.restore()
    done()
  })

  it('should be caught in the inner catch, but the outer then', (done) => {
    PromiseService.rejectAtInnerPromiseWithInnerCatchButNotThrow()
    setTimeout(() => {
      expect(console.log).calledWith('Hit: inner promise catch')
      expect(console.log).calledWith('Hit: outer promise then')
      done()
    }, expectedRoundTime)
  })
})

describe('PromiseController.rejectAtInnerPromiseWithInnerCatchButThrow', () => {

  before((done) => {
    sinon.spy(console, 'log')
    done()
  })

  after((done) => {
    console.log.restore()
    done()
  })

  it('should be caught in both the inner catch and the outer catch', (done) => {
    PromiseService.rejectAtInnerPromiseWithInnerCatchButThrow()
    setTimeout(() => {
      expect(console.log).calledWith('Hit: inner promise catch')
      expect(console.log).calledWith('Hit: outer promise catch')
      done()
    }, expectedRoundTime)
  })
})
