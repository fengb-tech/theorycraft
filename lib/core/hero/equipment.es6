let _ = require('lodash')

let Stats = require('tc/core/stats')
let Item = require('tc/core/item')
let random = require('tc/util/random')

module.exports = class Equipment {
  constructor(){
    for(let itemType of Item.TYPES){
      this[itemType] = null
    }
  }

  get stats(){
    let itemStatses = _.map(Item.TYPES, (type) => this[type].stats)
    return Stats.mergeAll(itemStatses)
  }

  rollDamage(){
    return random.int(this.weapon.minDamage, this.weapon.maxDamage)
  }
}
