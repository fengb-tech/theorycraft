import Stats from 'tc/core/stats'

export default class Character {
  constructor(){
    this.level = 1
    this.baseStats = new Stats()

    this.items = []
  }

  get itemsStats(){
    let itemStats = new Stats()

    for(let item of this.items){
      itemStats.merge(item.stats)
    }

    return itemStats
  }

  get stats(){
    return this.baseStats.add(this.itemStats)
  }
}
