import { expect } from 'tc-test/support'
import Level from 'tc/core/character/level'

describe('Character', () => {
  describe('Level', () => {
    describe('.targetForXp()', () => {
      it('returns 1 for xp=0', () => {
        let target = Level.targetForXp(0)
        expect(target).to.equal(1)
      })
    })

    describe('new ()', () => {
      it('creates with correct level', () => {
        let level = new Level(1)
        expect(level.value).to.equal(1)

        level = new Level(100)
        expect(level.value).to.equal(100)
      })
    })
  })
})
