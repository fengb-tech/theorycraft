const { expect, EPS } = require('test/support')
const Weapon = require('lib/core/weapon')

let template = {
  names: ['template'],
  delay: 1000,
  minDamage: 400,
  maxDamage: 600,
}

describe('lib/core/weapon', () => {
  describe('data', () => {
    it('has balanced weapons', () => {
      let baseDpms = Weapon.dpms(Weapon.data.items[0])
      for(let weapon of Weapon.data.items){
        expect(Weapon.dpms(weapon)).to.be.closeTo(baseDpms, EPS)
      }
    })
  })

  describe('constructor', () => {
    it('randomizes data', () => {
      let weapon = new Weapon(template)
      expect(weapon.name).to.equal('template')
      expect(weapon.delay).to.not.equal(template.delay)
      expect(weapon.minDamage).to.not.equal(template.minDamage)
      expect(weapon.maxDamage).to.not.equal(template.maxDamage)
    })
  })
})
