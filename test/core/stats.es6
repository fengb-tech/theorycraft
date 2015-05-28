let expect = require('tc-test/support').expect

let Stats = require('tc/core/stats')

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

  describe('#merge()', () => {
    it('merges new stats onto the first object', () => {
      let stats = new Stats({
        power:      1,
        accuracy:   2,
        resilience: 9,
      })
      stats.merge({
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
  })
})
