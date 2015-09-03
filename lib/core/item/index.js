const _ = require('lodash')
let Stats = require('lib/core/stats')

let Item = module.exports = class Item {
  constructor(data){
    _.merge(this, data)
    this.stats = this.stats || new Stats()
  }
}

Item.Weapon = require('lib/core/item/weapon')
Item.TYPES = ['weapon', 'shield', 'helm', 'armor']
