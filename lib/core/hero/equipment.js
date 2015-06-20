let _ = require('lodash')

let Stats = require('lib/core/stats')
let Item = require('lib/core/item')

module.exports = class Equipment {
  constructor(){
    for(let itemType of Item.TYPES){
      this[itemType] = null
    }
  }

  get items(){
    return _(Item.TYPES)
             .map((type) => this[type])
             .compact()
             .value()
  }

  get stats(){
    let itemStatses = _.map(this.items, (item) => item.stats)
    return Stats.mergeAll(itemStatses)
  }

  get attackDelay(){
    if(this.weapon){
      return this.weapon.attackDelay
    } else {
      // FIXME: magic numbers
      return 1000
    }
  }

  rollDamage(){
    if(this.weapon){
      return _.random(this.weapon.minDamage, this.weapon.maxDamage)
    } else {
      // FIXME: magic numbers
      return 1000
    }
  }
}
