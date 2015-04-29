import { expect } from 'chai'
import Stats from 'tc/core/stats'

describe('Stats', () => {
  describe('constructor', () => {
    it('builds as 0 everything', () => {
      let stats = new Stats()
      expect(stats.damage).to.equal(0)
      expect(stats.hit).to.equal(0)
      expect(stats.critical).to.equal(0)
      expect(stats.armor).to.equal(0)
      expect(stats.dodge).to.equal(0)
      expect(stats.resilience).to.equal(0)
    })

    it('builds using existing data where possible', () => {
      let stats = new Stats({
        damage: 4,
        hit: 8,
      })
      expect(stats.damage).to.equal(4)
      expect(stats.hit).to.equal(8)
      expect(stats.critical).to.equal(0)
      expect(stats.armor).to.equal(0)
      expect(stats.dodge).to.equal(0)
      expect(stats.resilience).to.equal(0)
    })
  })

  describe('.merge()', () => {
    it('merges new stats onto the first object', () => {
      let baseStats = new Stats({
        damage: 1,
        hit: 2,
        resilience: 9,
      })
      baseStats.merge({
        damage: 5,
        hit: 6,
        critical: 7,
      })

      expect(baseStats.damage).to.equal(6)
      expect(baseStats.hit).to.equal(8)
      expect(baseStats.resilience).to.equal(9)
      expect(baseStats.critical).to.equal(7)
    })
  })
})
