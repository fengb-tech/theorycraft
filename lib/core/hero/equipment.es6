import _ from 'lodash'

import Stats from 'tc/core/stats'
import Item from 'tc/core/item'
import { randomInt } from 'tc/util/random'

export default class Equipment {
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
    return randomInt(this.weapon.minDamage, this.weapon.maxDamage)
  }
}
