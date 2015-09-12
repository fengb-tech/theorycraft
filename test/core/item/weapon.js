const { expect, EPS } = require('test/support')
const Weapon = require('lib/core/item/weapon')

let template = {
  names: ['template'],
  attackDelay: 1000,
  minDamage: 400,
  maxDamage: 600,
}

describe('lib/core/item/weapon', () => {
  describe('data', () => {
    it('has balanced weapons', () => {
      let baseDpms = Weapon.dpms(Weapon.data.templates[0])
      for (let weapon of Weapon.data.templates) {
        expect(Weapon.dpms(weapon)).to.be.closeTo(baseDpms, EPS)
      }
    })
  })

  describe('.fromTemplate', () => {
    it('randomizes data', () => {
      let weapon = Weapon.fromTemplate(template)
      expect(weapon.name).to.equal('template')
      expect(weapon.attackDelay).to.not.equal(template.attackDelay)
      expect(weapon.minDamage).to.not.equal(template.minDamage)
      expect(weapon.maxDamage).to.not.equal(template.maxDamage)
    })

    it('has consistent dpms', () => {
      let weapon = Weapon.fromTemplate(template)
      expect(weapon.dpms).to.be.closeTo(Weapon.dpms(template), 0.01)
    })
  })

  describe('.generate', () => {
    it('creates a new weapon', () => {
      let weapon1 = Weapon.generate()
      let weapon2 = Weapon.generate()
      expect(weapon1.attackDelay).to.not.equal(weapon2.attackDelay)
      expect(weapon1.minDamage).to.not.equal(weapon2.minDamage)
      expect(weapon1.maxDamage).to.not.equal(weapon2.maxDamage)
    })
  })
})
