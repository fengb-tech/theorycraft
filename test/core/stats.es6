import { expect } from 'tc-test/support'

import Stats from 'tc/core/stats'

describe('Stats', () => {
  describe('constructor', () => {
    it('builds as 0 everything', () => {
      let stats = new Stats()
      expect(stats).to.have.properties({
        damage:     0,
        hit:        0,
        critical:   0,
        armor:      0,
        dodge:      0,
        resilience: 0,
      })
    })

    it('builds using existing data where possible', () => {
      let stats = new Stats({
        damage: 4,
        hit: 8,
      })
      expect(stats).to.have.properties({
        damage:     4,
        hit:        8,
        critical:   0,
        armor:      0,
        dodge:      0,
        resilience: 0,
      })
    })

    it('coerces to integer', () => {
      let stats = new Stats({ damage: 100.1 })
      expect(stats.damage).to.equal(100)
    })
  })

  describe('.allAt()', () => {
    it('creates with all stats at one value', () => {
      let stats = Stats.allAt(200)
      expect(stats).to.have.properties({
        damage:     200,
        hit:        200,
        critical:   200,
        armor:      200,
        dodge:      200,
        resilience: 200,
      })
    })

    it('coerces to integer', () => {
      let stats = Stats.allAt(50.4)
      expect(stats.damage).to.equal(50)
    })
  })

  describe('#merge()', () => {
    it('merges new stats onto the first object', () => {
      let stats = new Stats({
        damage: 1,
        hit: 2,
        resilience: 9,
      })
      stats.merge({
        damage: 5,
        hit: 6,
        critical: 7,
      })

      expect(stats).to.have.properties({
        damage:     6,
        hit:        8,
        critical:   7,
        armor:      0,
        dodge:      0,
        resilience: 9,
      })
    })
  })
})
