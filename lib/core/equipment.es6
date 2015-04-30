import Stats from 'tc/core/stats'
import _ from 'lodash'

const ITEM_TYPES = ['weapon', 'shield', 'helm', 'body']

export default class Equipment {
  constructor(){
    for(let itemType of ITEM_TYPES){
      this[itemType] = null
    }
  }

  get stats(){
    let itemStatses = _.map(ITEM_TYPES, (type) => this[type].stats)
    return Stats.mergeAll(itemStatses)
  }
}
