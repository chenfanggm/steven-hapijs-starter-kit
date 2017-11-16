const setupConsoleLogSpy = (testbed) => {
  if (!testbed.spy) {
    testbed.spy = {}
  }

  beforeEach(() => {
    testbed.spy.consoleLog = jest.spyOn(console, 'log')
      .mockImplementation(() => {})
  })

  afterEach(() => {
    testbed.spy.consoleLog.mockReset()
    testbed.spy.consoleLog.mockRestore()
  })
}

module.exports = {
  setupConsoleLogSpy
}