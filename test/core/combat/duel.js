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

  describe('#targetMinDamage', () => {
    beforeEach(function () {
      this.defender.stats.armor = 100
      this.attacker.minDamage = 100
    })

    it('is half damage when att.finesse = 0.5x def.armor', function () {
      this.attacker.stats.finesse = 0.5 * this.defender.stats.armor
      expect(this.duel.targetMinDamage()).to.be.closeTo(this.attacker.minDamage / 2, EPS)
    })

    it('is regular damage when att.finesse = x def.armor', function () {
      this.attacker.stats.finesse = this.defender.stats.armor
      expect(this.duel.targetMinDamage()).to.be.closeTo(this.attacker.minDamage, EPS)
    })

    it('is double damage when att.finesse = 2x def.armor', function () {
      this.attacker.stats.finesse = 2 * this.defender.stats.armor
      expect(this.duel.targetMinDamage()).to.be.closeTo(2 * this.attacker.minDamage, EPS)
    })
  })

  describe('#targetMaxDamage', () => {
    beforeEach(function () {
      this.defender.stats.resilience = 100
      this.attacker.maxDamage = 300
    })

    it('is half damage when att.power = 0.5x def.resilience', function () {
      this.attacker.stats.power = 0.5 * this.defender.stats.resilience
      expect(this.duel.targetMaxDamage()).to.be.closeTo(this.attacker.maxDamage / 2, EPS)
    })

    it('is regular damage when att.power = x def.resilience', function () {
      this.attacker.stats.power = this.defender.stats.resilience
      expect(this.duel.targetMaxDamage()).to.be.closeTo(this.attacker.maxDamage, EPS)
    })

    it('is double damage when att.power = 2x def.resilience', function () {
      this.attacker.stats.power = 2 * this.defender.stats.resilience
      expect(this.duel.targetMaxDamage()).to.be.closeTo(2 * this.attacker.maxDamage, EPS)
    })
  })

  describe('#minDamage and #maxDamage', () => {
    it('is targetMinDamage and targetMaxDamage if they do not overlap', function () {
      this.duel.targetMinDamage = () => 100
      this.duel.targetMaxDamage = () => 300
      expect(this.duel.minDamage()).to.be.closeTo(100, EPS)
      expect(this.duel.maxDamage()).to.be.closeTo(300, EPS)
    })

    it('is somewhere in between if targetMinDamage > targetMaxDamage', function () {
      this.duel.targetMinDamage = () => 300
      this.duel.targetMaxDamage = () => 50
      expect(this.duel.minDamage()).to.be.gt(50)
      expect(this.duel.maxDamage()).to.be.lte(300)
      expect(this.duel.minDamage()).to.be.lt(this.duel.maxDamage())
    })
  })
})
