import _ from 'lodash'

import Stats from 'tc/core/stats'
import Item from 'tc/core/item'

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
}
