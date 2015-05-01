import { expect } from 'tc-test/support'
import Level from 'tc/core/character/level'

describe('Character', () => {
  describe('Level', () => {
    describe('constructor', () => {
      it('has correct values', () => {
        let level = new Level(1)
        expect(level.value).to.equal(1)
        expect(+level).to.equal(1)

        level = new Level(42)
        expect(level.value).to.equal(42)
        expect(+level).to.equal(42)
      })

      it('has correct stats', () => {
        let level = new Level(1)
        expect(level.stats.damage).to.equal(100)

        level = new Level(2)
        expect(level.stats.damage).to.equal(105)

        level = new Level(10)
        expect(level.stats.damage).to.equal(155)
      })
    })

    describe('.targetForXp()', () => {
      it('returns 1 for xp=0', () => {
        let target = Level.targetForXp(0)
        expect(target).to.equal(1)
      })
    })
  })
})
