export default function *createSchedule(attackers){
  let nextTimes = attackers.map((attacker) => 0 - attacker.initiative)

  while(true){
    let time = Math.min(...nextTimes)

    let cycle = []
    for(let i = 0; i < nextTimes.length; i++){
      if(nextTimes[i] === time){
        cycle.push(i)
        nextTimes[i] += attackers[i].attackMspa
      }
    }
    yield [time, cycle]
  }
}
