import _ from 'lodash'

import { expect } from 'tc-test/support'
import { Combat } from 'tc/core/combat'

describe('tc/core/combat', () => {
  describe('#isDone', () => {
    beforeEach(function(){
      this.hero = { hp: 1 }
      this.enemy = { hp: 1 }
      this.combat = new Combat(this.hero, [this.enemy])
    })

    it('is false if hero has hp and has enemy', function(){
      expect(this.combat.isDone()).to.be.false()
    })

    it('is true if hero has no hp', function(){
      this.hero.hp = 0
      expect(this.combat.isDone()).to.be.true()
    })

    it('is true if no enemy has hp', function(){
      this.enemy.hp = 0
      expect(this.combat.isDone()).to.be.true()
    })
  })

  describe('#run', () => {
    beforeEach(function(){
      this.hero = { hp: 1 }
      this.combat = _.extend(new Combat(this.hero, []), {
        schedule: [],
        isDone: () => false,
        duelFor: (attacker) => attacker
      })
      this.combatRunner = this.combat.run()
    })

    it('duels for scheduled attackers', function(){
      let enemy = { hp: 1 }
      this.combat.schedule.push([10, [this.hero, enemy]])
      expect(this.combatRunner).to.yield([10, [this.hero, enemy]])
    })

    it('ignores attackers with no hp', function(){
      let enemy = { hp: 0 }
      this.combat.schedule.push([10, [this.hero, enemy]])
      expect(this.combatRunner).to.yield([10, [this.hero]])
    })

    describe('when isDone = true', () => {
      beforeEach(function(){
        this.combat.isDone = () => true
      })

      it('yields cleanup() and return', function(){
        this.combat.cleanup = () => 'foobar!'
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
