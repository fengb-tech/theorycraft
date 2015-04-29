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
  })

  describe('.merge()', () => {
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
