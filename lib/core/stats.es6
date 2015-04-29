const STAT_NAMES = ['damage', 'hit', 'critical',
                    'armor', 'dodge', 'resilience']

export default class Stats {
  constructor(object = {}){
    for(let statName of STAT_NAMES){
      this[statName] = object[statName] || 0
    }
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
