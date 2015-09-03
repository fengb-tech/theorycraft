let _ = require('lodash')

let Stats = require('lib/core/stats')
let Item = require('lib/core/item')

const EMPTY = {
  weapon: Item.Weapon.DEFAULT,
  shield: new Item({ type: 'shield', name: 'arm' }),
  helm:   new Item({ type: 'helm',   name: 'noggin' }),
  armor:  new Item({ type: 'armor',  name: 'guts' }),
}

module.exports = class Equipment {
  constructor(){
    for(let type of Object.keys(EMPTY)){
      this[type] = EMPTY[type]
    }
  }

  get stats(){
    let itemStatses = _.map(Item.TYPES, (type) => this[type].stats)
    return Stats.mergeAll(itemStatses)
  }

  get attackDelay(){
    return this.weapon.attackDelay
  }

  rollDamage(){
    return _.random(this.weapon.minDamage, this.weapon.maxDamage)
  }
}
