let Stats = require('lib/core/stats')

let Item = module.exports = class Item {
  constructor(options = {}){
    for(let key of Object.keys(options)){
      this[key] = options[key]
    }
    this.stats = this.stats || new Stats()
  }
}

Item.Weapon = require('lib/core/item/weapon')
Item.TYPES = ['weapon', 'shield', 'helm', 'armor']
