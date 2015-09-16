const { expect } = require('test/support')

const time = require('lib/util/time')

describe('lib/util/time', () => {
  describe('setNow', () => {
    afterEach(() => {
      time.resetNow()
    })

    it('sets now to arbitrary value', () => {
      expect(time.now()).to.be.greaterThan(1000000000000)
      time.setNow(0)
      expect(time.now()).to.be.lessThan(1000)
    })
  })
})
