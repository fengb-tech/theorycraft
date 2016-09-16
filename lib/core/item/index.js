const Weapon = require('lib/core/item/weapon')

const Stats = require('lib/core/stats')

const Item = module.exports = {
  TYPES: ['weapon', 'shield', 'helm', 'armor'],
  EMPTY: {
    weapon: Weapon.EMPTY,
    shield: { type: 'shield', name: 'arm', stats: new Stats() },
    helm: { type: 'helm', name: 'noggin', stats: new Stats() },
    armor: { type: 'armor', name: 'guts', stats: new Stats() }
  },

  generate (ilvl) {
    return Item.generateWeapon(ilvl)
  },

  generateWeapon (ilvl) {
    return Weapon.generate(ilvl)
  }
}
