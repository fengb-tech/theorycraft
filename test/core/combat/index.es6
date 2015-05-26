import _ from 'lodash'

import { expect } from 'tc-test/support'
import { Combat } from 'tc/core/combat'
import { endless } from 'tc/util/generators'

describe('tc/core/combat', () => {
  beforeEach(function(){
    this.hero = { hero: true, hp: 1 }
    this.enemy = { hp: 1 }
    this.combat = new Combat(this.hero, [this.enemy])
  })

  describe('#isDone', () => {
    it('is false if active enemies', function(){
      expect(this.combat.isDone()).to.be.false()
    })

    it('is true if no enemy has hp', function(){
      this.enemy.hp = 0
      expect(this.combat.isDone()).to.be.true()
    })
  })

  describe('#runner', () => {
    beforeEach(function(){
      _.extend(this.combat, {
        schedule: [],
        isdone: () => false,
        processAttack: (attacker) => attacker
      })
      this.combatRunner = this.combat.runner()
    })

    it('duels for scheduled attackers', function(){
      this.combat.schedule.push([10, [this.hero, this.enemy]])
      expect(this.combatRunner).to.deep.yield([10, this.hero])
      expect(this.combatRunner).to.deep.yield([10, this.enemy])
    })

    it('ignores attackers with no hp', function(){
      this.enemy = { hp: 0 }
      this.combat.schedule.push([10, [this.hero, this.enemy]])
      expect(this.combatRunner).to.deep.yield([10, this.hero])
      expect(this.combatRunner).not.to.deep.yield([10, this.enemy])
    })

    it('terminates when taking too long', function(){
      this.combat.schedule = endless([0, []])
      expect(() => this.combat.run()).to.throw(RangeError)
    })

    describe('when isDone = true', () => {
      beforeEach(function(){
        this.combat.isDone = () => true
      })

      it('yields processCleanup() and return', function(){
        this.combat.processCleanup = () => ['foobar!']
        expect(this.combatRunner).to.yield('foobar!')
        expect(this.combatRunner).to.return()
      })

      it('ignores cleanup() if null', function(){
        this.combat.cleanup = () => null
        expect(this.combatRunner).to.return()
      })
    })
  })
})
