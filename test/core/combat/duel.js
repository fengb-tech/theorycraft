const { expect, _, EPS } = require('test/support')

const Duel = require('lib/core/combat/duel')
const Stats = require('lib/core/stats')

describe('core/combat/duel', () => {
  beforeEach(function () {
    this.attacker = {
      stats: Stats.allAt(0),
    }

    this.defender = {
      stats: Stats.allAt(0),
    }

    this.duel = new Duel(this.attacker, this.defender)
  })

  describe('#calculate', () => {
    beforeEach(function () {
      _.extend(this.duel, {
        hitPercent: () => 0.5,
        minDamage: () => 100,
        maxDamage: () => 300,
      })
    })

    it('is null when hitRoll is too low', function () {
      expect(this.duel.calculate(0.49)).to.be.null()
    })

    it('is minDamage when hitRoll == hitPercent', function () {
      expect(this.duel.calculate(0.5)).to.equal(100)
    })

    it('is maxDamage when hitRoll == 1', function () {
      expect(this.duel.calculate(1)).to.equal(300)
    })
  })

  describe('#hitPercent', () => {
    beforeEach(function () {
      this.defender.stats.dodge = 100
    })

    it('is 0.5 when att.accuracy = 0.5x def.dodge', function () {
      this.attacker.stats.accuracy = 0.5 * this.defender.stats.dodge
      expect(this.duel.hitPercent()).to.be.closeTo(0.5, EPS)
    })

    it('is 1 when att.accuracy = def.dodge', function () {
      this.attacker.stats.accuracy = this.defender.stats.dodge
      expect(this.duel.hitPercent()).to.be.closeTo(1, EPS)
    })

    it('is 1 when att.accuracy = 2x def.dodge', function () {
      this.attacker.stats.accuracy = 2 * this.defender.stats.dodge
      expect(this.duel.hitPercent()).to.be.closeTo(1, EPS)
    })
  })
})
