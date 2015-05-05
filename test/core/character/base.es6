import { expect } from 'tc-test/support'
import Base from 'tc/core/character/base'

describe('Character', () => {
  describe('Base', () => {
    describe('constructor', () => {
      it('has correct xp', () => {
        let base = new Base(1)
        expect(base.xp).to.equal(1)

        base = new Base(42)
        expect(base.xp).to.equal(42)
      })
    })

    describe('.levelForXp()', () => {
      it('returns 1 for xp=0', () => {
        let target = Base.levelForXp(0)
        expect(target).to.equal(1)
      })
    })

    describe('.statsForLevel()', () => {
      it('has correct stats', () => {
        let stats = Base.statsForLevel(1)
        expect(stats.power).to.equal(100)

        stats = Base.statsForLevel(2)
        expect(stats.power).to.equal(105)

        stats = Base.statsForLevel(10)
        expect(stats.power).to.equal(155)
      })
    })
  })
})
