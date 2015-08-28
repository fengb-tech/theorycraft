const weaponsData = require('lib/data/weapons.json')
const { expect, EPS } = require('test/support')

describe('lib/data/weapons.json', () => {
  it('has balanced weapons', () => {
    function dpms(weaponData){
      let damage = (weaponData.minDamage + weaponData.maxDamage) / 2
      return damage / weaponData.delay
    }

    let baseDpms = dpms(weaponsData.items[0])
    for(let weapon of weaponsData.items){
      expect(dpms(weapon)).to.be.closeTo(baseDpms, EPS)
    }
  })
})
