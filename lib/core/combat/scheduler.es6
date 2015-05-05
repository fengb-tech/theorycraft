export default class Scheduler {
  constructor(startTime, attackers){
    this.startTime = startTime
    this.attackers = attackers
  }

  initiative(){
    let startTime = this.startTime
    return this._buildSchedule(function *(attacker){
      if(attacker.initiative > 0){
        yield startTime - attacker.initiative
      }
    })
  }

  between(start, end){
    let startTime = this.startTime

    return this._buildSchedule(function *(attacker){
      let offset = startTime - attacker.initiative
      let aStart = Math.ceil((start - offset) / attacker.attackMspa)
      let aEnd = Math.ceil((end - offset) / attacker.attackMspa)
      for(let i = aStart; i < aEnd; i++){
        yield i * attacker.attackMspa + offset
      }
    })
  }

  _buildSchedule(callback){
    let schedule = {}
    for(let attacker of this.attackers){
      for(let time of callback(attacker)){
        let a = this.attackers.indexOf(attacker)
        if(!schedule[time]){
          schedule[time] = []
        }

        schedule[time].push(a)
      }
    }
    return schedule
  }
}
