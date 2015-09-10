const { expect, _ } = require('test/support')
const endlessGenerator = require('endless-generator')

const Combat = require('lib/core/combat')
const Enemy = require('lib/core/enemy')

describe('lib/core/combat', () => {
  beforeEach(function(){
    this.hero = new Enemy(1)
    this.enemy = new Enemy(1)
    this.combat = new Combat(this.hero, { enemies: [this.enemy] })
  })

  describe('#isDone', () => {
    it('is false if active enemies', function(){
      expect(this.combat.isDone()).to.be.false()
    })

    it('is true if enemies are killed', function(){
      this.combat.kill(this.enemy)
      expect(this.combat.isDone()).to.be.true()
    })
  })

  describe('#runner', () => {
    beforeEach(function(){
      _.extend(this.combat, {
        schedule: [],
        isDone: () => false,
        processAttack: (...args) => [args]
      })
      this.combatRunner = this.combat.runner()
    })

    it('duels for scheduled attackers', function(){
      this.combat.schedule.push([10, [this.hero, this.enemy]])
      expect(this.combatRunner).to.deep.yield([10, this.hero])
      expect(this.combatRunner).to.deep.yield([10, this.enemy])
    })

    it('ignores attackers with no hp', function(){
      this.combat.kill(this.enemy)
      this.combat.schedule.push([10, [this.hero, this.enemy]])
      expect(this.combatRunner).to.deep.yield([10, this.hero])
      expect(this.combatRunner).not.to.deep.yield([10, this.enemy])
    })

    it('terminates when taking too long', function(){
      _.extend(this.combat, {
        schedule: endlessGenerator([0, []]),
        runTimeout: 10,
      })
      expect(() => this.combat.run()).to.throw(RangeError)
    })

    describe('when isDone = true', () => {
      beforeEach(function(){
        this.combat.schedule = endlessGenerator([0, []])
        this.combat.isDone = () => true
      })

      it('yields processCleanup() and return', function(){
        this.combat.processCleanup = () => ['foobar!']
        expect(this.combatRunner).to.yield('foobar!')
        expect(this.combatRunner).to.return()
      })
    })
  })
})
