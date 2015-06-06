const EventEmitter = require('eventemitter3')

const Stats = module.exports = class Stats extends EventEmitter {
  constructor(object = {}){
    super()
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
    return mergedStats.merge(...array)
  }

  merge(...objects){
    for(let object of objects){
      for(let key of Object.keys(object)){
        if(this[key] != null) {
          this[key] += object[key]
        }
      }
    }

    this.emit('change')
    return this
  }

  add(...objects){
    return this.clone().merge(...objects)
  }

  clone(){
    return new Stats(this)
  }
}

Stats.TYPES = ['power', 'accuracy', 'critical',
               'armor', 'dodge',    'resilience']
