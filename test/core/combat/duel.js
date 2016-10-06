const { expect, EPS } = require('test/support')

const Duel = require('lib/core/combat/duel')
const Stats = require('lib/core/stats')

describe('core/combat/duel', () => {
  beforeEach(function () {
    this.attacker = {
      stats: Stats.allAt(0)
    }

    this.defender = {
      stats: Stats.allAt(0)
    }

    this.duel = new Duel(this.attacker, this.defender)
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

    it('is 2 when att.accuracy = 2x def.dodge', function () {
      this.attacker.stats.accuracy = 2 * this.defender.stats.dodge
      expect(this.duel.hitPercent()).to.be.closeTo(2, EPS)
    })
  })

  describe('#targetPercent', () => {
    // Roll needs to be >= 0.05
    it('is 0.05 when hitPercent = 0.95', function () {
      this.duel.hitPercent = () => 0.95
      expect(this.duel.targetPercent()).to.be.closeTo(0.05, EPS)
    })

    it('is 0.95 when hitPercent = 1.05', function () {
      this.duel.hitPercent = () => 1.05
      expect(this.duel.targetPercent()).to.be.closeTo(0.95, EPS)
    })

    it('is 0.9 when hitPercent = 2.1', function () {
      this.duel.hitPercent = () => 2.1
      expect(this.duel.targetPercent()).to.be.closeTo(0.9, EPS)
    })

    it('is 0.2 when hitPercent = 10.8', function () {
      this.duel.hitPercent = () => 10.8
      expect(this.duel.targetPercent()).to.be.closeTo(0.2, EPS)
    })
  })

  describe('#baseMultiplier', () => {
    it('is 0 when hitPercent = 0.95', function () {
      this.duel.hitPercent = () => 0.95
      expect(this.duel.baseMultiplier()).to.equal(0)
    })

    it('is 1 when hitPercent = 1.05', function () {
      this.duel.hitPercent = () => 1.05
      expect(this.duel.baseMultiplier()).to.equal(1)
    })

    it('is 1 when hitPercent = 1.95', function () {
      this.duel.hitPercent = () => 1.95
      expect(this.duel.baseMultiplier()).to.equal(1)
    })

    it('is 9 when hitPercent = 9.95', function () {
      this.duel.hitPercent = () => 9.95
      expect(this.duel.baseMultiplier()).to.equal(9)
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
      this.defender.stats.armor = 100
      this.attacker.maxDamage = 300
    })

    it('is half damage when att.power = 0.5x def.armor', function () {
      this.attacker.stats.power = 0.5 * this.defender.stats.armor
      expect(this.duel.targetMaxDamage()).to.be.closeTo(this.attacker.maxDamage / 2, EPS)
    })

    it('is regular damage when att.power = x def.armor', function () {
      this.attacker.stats.power = this.defender.stats.armor
      expect(this.duel.targetMaxDamage()).to.be.closeTo(this.attacker.maxDamage, EPS)
    })

    it('is double damage when att.power = 2x def.armor', function () {
      this.attacker.stats.power = 2 * this.defender.stats.armor
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
