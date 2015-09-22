const { expect } = require('test/support')

const Stats = require('lib/core/stats')

describe('Stats', () => {
  describe('constructor', () => {
    it('builds as 0 everything', () => {
      let stats = new Stats()
      expect(stats).to.have.properties({
        power:      0,
        accuracy:   0,
        critical:   0,
        armor:      0,
        dodge:      0,
        resilience: 0,
      })
    })

    it('builds using existing data where possible', () => {
      let stats = new Stats({
        power:    4,
        accuracy: 8,
      })
      expect(stats).to.have.properties({
        power:      4,
        accuracy:   8,
        critical:   0,
        armor:      0,
        dodge:      0,
        resilience: 0,
      })
    })

    it('coerces to integer', () => {
      let stats = new Stats({ power:  100.1 })
      expect(stats.power).to.equal(100)
    })
  })

  describe('.allAt()', () => {
    it('creates with all stats at one value', () => {
      let stats = Stats.allAt(200)
      expect(stats).to.have.properties({
        power:      200,
        accuracy:   200,
        critical:   200,
        armor:      200,
        dodge:      200,
        resilience: 200,
      })
    })

    it('coerces to integer', () => {
      let stats = Stats.allAt(50.4)
      expect(stats.power).to.equal(50)
    })
  })

  describe('.mergeAll()', () => {
    it('returns 0s if no stats', () => {
      let merged = Stats.mergeAll([])
      expect(merged).to.have.properties({
        power:      0,
        accuracy:   0,
        critical:   0,
        armor:      0,
        dodge:      0,
        resilience: 0,
      })
    })

    it('merges a bunch of stats', () => {
      let statses = [
        Stats.allAt(10),
        Stats.allAt(200),
      ]
      let merged = Stats.mergeAll(statses)
      expect(merged).to.have.properties({
        power:      210,
        accuracy:   210,
        critical:   210,
        armor:      210,
        dodge:      210,
        resilience: 210,
      })
    })
  })

  describe('#merge()', () => {
    it('creates a new object with merged stats', () => {
      let stats = new Stats({
        power:      1,
        accuracy:   2,
        resilience: 9,
      }).merge({
        power:    5,
        accuracy: 6,
        critical: 7,
      })

      expect(stats).to.have.properties({
        power:      6,
        accuracy:   8,
        critical:   7,
        armor:      0,
        dodge:      0,
        resilience: 9,
      })
    })

    it('emits a change event', () => {
      let stats = new Stats()
      expect(() => stats.merge()).to.emitFrom(stats, 'change')
    })
  })

  describe('#add()', () => {
    it('creates a new object with merged stats', () => {
      let stats = new Stats({
        power:      1,
        accuracy:   2,
        resilience: 9,
      }).add({
        power:    5,
        accuracy: 6,
        critical: 7,
      })

      expect(stats).to.have.properties({
        power:      6,
        accuracy:   8,
        critical:   7,
        armor:      0,
        dodge:      0,
        resilience: 9,
      })
    })

    it('does not change original stats', () => {
      let original = Stats.allAt(0)
      original.add({
        power:    5,
        accuracy: 6,
        critical: 7,
      })

      expect(original).to.have.properties({
        power:      0,
        accuracy:   0,
        critical:   0,
        armor:      0,
        dodge:      0,
        resilience: 0,
      })
    })
  })
})
