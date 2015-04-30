const STAT_NAMES = ['damage', 'hit', 'critical',
                    'armor', 'dodge', 'resilience']

export default class Stats {
  constructor(object = {}){
    for(let statName of STAT_NAMES){
      this[statName] = object[statName] || 0
    }
  }

  static mergeAll(array){
    let mergedStats = new Stats(array[0])

    for(let i = 1; i < array.length; i++){
      mergedStats.merge(array[i])
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
    new Stats(this)
  }
}
