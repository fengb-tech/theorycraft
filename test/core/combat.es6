import { expect } from 'tc-test/support'

import Combat from 'tc/core/combat'
import Stats from 'tc/core/stats'

describe('Combat', () => {
  beforeEach(function(){
    this.attackerStats = Stats.allAt(0)
    this.defenderStats = Stats.allAt(0)
    this.combat = new Combat(this.attackerStats, this.defenderStats)
  })

  describe('#hitPercent', () => {
    beforeEach(function(){
      this.defenderStats.dodge = 100
    })

    it('is 0.7 when att.accuracy == def.dodge', function(){
      this.attackerStats.accuracy = this.defenderStats.dodge
      expect(this.combat.hitPercent).to.be.closeTo(0.7, 0.001)
    })

    it('is 1 when att.accuracy == 1.5x def.dodge', function(){
      this.attackerStats.accuracy = 1.5 * this.defenderStats.dodge
      expect(this.combat.hitPercent).to.be.closeTo(1, 0.001)
    })
  })

  describe('#damageMultiplier', () => {
    beforeEach(function(){
      this.defenderStats.armor = 100
    })

    it('is 1 when att.power == def.armor', function(){
      this.attackerStats.power = 100
      expect(this.combat.damageMultiplier).to.be.closeTo(1, 0.001)
    })

    it('is 2 when att.power == 2x def.armor', function(){
      this.attackerStats.power = 2 * this.defenderStats.armor
      expect(this.combat.damageMultiplier).to.be.closeTo(2, 0.001)
    })
  })

  describe('#critMultiplier', () => {
    beforeEach(function(){
      this.defenderStats.resilience = 100
    })

    it('is 2 when att.critical == def.resilience', function(){
      this.attackerStats.critical = this.defenderStats.resilience
      expect(this.combat.critMultiplier).to.be.closeTo(2, 0.001)
    })
  })
})
