let sanity = require('tc/lib/util/sanity')

module.exports = function* createSchedule(attackers){
  sanity.notEmpty(attackers)
  sanity.allHaveProperty(attackers, 'attackDelay', Number)
  sanity.allHaveProperty(attackers, 'initiative', Number)

  let nextTimes = attackers.map((attacker) => 0 - attacker.initiative)

  while(true){
    let time = Math.min(...nextTimes)

    let cycle = []
    for(let i = 0; i < nextTimes.length; i++){
      if(nextTimes[i] === time){
        let attacker = attackers[i]
        cycle.push(attacker)
        nextTimes[i] += attacker.attackDelay
      }
    }
    yield [time, cycle]
  }
}
