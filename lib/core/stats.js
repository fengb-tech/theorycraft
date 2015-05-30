let Stats = module.exports = class Stats {
  constructor(object = {}){
    for(let statName of Stats.TYPES){
      this[statName] = object[statName] | 0
    }
  }

  static allAt(value){
    value = value | 0

    let stats = new Stats()

    for(let statName of Stats.TYPES){
      stats[statName] = value
    }

    return stats
  }

  static mergeAll(array){
    let mergedStats = new Stats()

    for(let stat of array){
      mergedStats.merge(stat)
    }

    return mergedStats
  }

  merge(object){
    for(let key of Object.keys(object)){
      if(this[key] != null) {
        this[key] += object[key]
      }
    }
    return this
  }

  add(object){
    return this.clone().merge(object)
  }

  clone(){
    return new Stats(this)
  }
}

Stats.TYPES = ['power', 'accuracy', 'critical',
               'armor', 'dodge',    'resilience']
