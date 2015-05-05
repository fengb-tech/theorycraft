export default class Scheduler {
  constructor(startTime, attackers){
    this.startTime = startTime
    this.attackers = attackers
  }

  initiative(){
    let schedule = {}
    for(let [a, attacker] of this.attackers.entries()){
      let time = this.startTime - attacker.initiative
      if(!schedule[time]){
        schedule[time] = []
      }

      schedule[time].push(a)
    }
    return schedule
  }

  between(start, end){
    let schedule = {}

    for(let [a, attacker] of this.attackers.entries()){
      let offset = this.startTime - attacker.initiative
      let aStart = Math.ceil((start - offset) / attacker.attackMspa)
      let aEnd = Math.ceil((end - offset) / attacker.attackMspa)
      for(let i = aStart; i < aEnd; i++){
        let time = i * attacker.attackMspa + offset
        if(!schedule[time]){
          schedule[time] = []
        }

        schedule[time].push(a)
      }
    }

    return schedule
  }
}
