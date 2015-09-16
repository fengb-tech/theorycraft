const { expect } = require('test/support')

const time = require('lib/util/time')

describe('lib/util/time', () => {
  describe('time()', () => {
    it('converts to milliseconds', () => {
      expect(time({ ms: 8 })).to.equal(8)
      expect(time({ sec: 4 })).to.equal(4000)
      expect(time({ min: 1 })).to.equal(60000)
      expect(time({ min: 1, sec: 4, ms: 8 })).to.equal(64008)
    })
  })

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
