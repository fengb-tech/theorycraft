import { expect } from 'tc-test/support'

import Duel from 'tc/core/combat/duel'
import Stats from 'tc/core/stats'

describe('core/combat/duel', () => {
  beforeEach(function(){
    this.attackerStats = Stats.allAt(0)
    this.defenderStats = Stats.allAt(0)
    this.combat = new Duel(this.attackerStats, this.defenderStats)
  })

  describe('#hitPercent', () => {
    beforeEach(function(){
      this.defenderStats.dodge = 100
    })

    it('is 0.5 when att.accuracy = 0.5x def.dodge', function(){
      this.attackerStats.accuracy = 0.5 * this.defenderStats.dodge
      expect(this.combat.hitPercent).to.be.closeTo(0.5, 0.001)
    })

    it('is 1 when att.accuracy = def.dodge', function(){
      this.attackerStats.accuracy = this.defenderStats.dodge
      expect(this.combat.hitPercent).to.be.closeTo(1, 0.001)
    })

    it('is 1 when att.accuracy = 2x def.dodge', function(){
      this.attackerStats.accuracy = 2 * this.defenderStats.dodge
      expect(this.combat.hitPercent).to.be.closeTo(1, 0.001)
    })
  })

  describe('#critPercent', () => {
    beforeEach(function(){
      this.defenderStats.dodge = 100
    })

    it('is 0.05 when att.accuracy = 0.5x def.dodge', function(){
      this.attackerStats.accuracy = 0.5 * this.defenderStats.dodge
      expect(this.combat.critPercent).to.be.closeTo(0.05, 0.001)
    })

    it('is 0.1 when att.accuracy = def.dodge', function(){
      this.attackerStats.accuracy = this.defenderStats.dodge
      expect(this.combat.critPercent).to.be.closeTo(0.1, 0.001)
    })

    it('is 0.6 when att.accuracy = 1.5x def.dodge', function(){
      this.attackerStats.accuracy = 1.5 * this.defenderStats.dodge
      expect(this.combat.critPercent).to.be.closeTo(0.6, 0.001)
    })

    it('is 1 when att.accuracy = 2x def.dodge', function(){
      this.attackerStats.accuracy = 2 * this.defenderStats.dodge
      expect(this.combat.critPercent).to.be.closeTo(1, 0.001)
    })
  })

  describe('#damageMultiplier', () => {
    beforeEach(function(){
      this.defenderStats.armor = 100
    })

    it('is 1 when att.power = def.armor', function(){
      this.attackerStats.power = 100
      expect(this.combat.damageMultiplier).to.be.closeTo(1, 0.001)
    })

    it('is 2 when att.power = 2x def.armor', function(){
      this.attackerStats.power = 2 * this.defenderStats.armor
      expect(this.combat.damageMultiplier).to.be.closeTo(2, 0.001)
    })
  })

  describe('#critMultiplier', () => {
    beforeEach(function(){
      this.defenderStats.resilience = 100
    })

    it('is 2 when att.critical = def.resilience', function(){
      this.attackerStats.critical = this.defenderStats.resilience
      expect(this.combat.critMultiplier).to.be.closeTo(2, 0.001)
    })
  })
})
