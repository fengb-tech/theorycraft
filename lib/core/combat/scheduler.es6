export default class Scheduler {
  constructor(startTime, characters){
    this.startTime = startTime
    this.characters = characters
  }

  initiative(){
    let schedule = {}
    for(let [c, character] of this.characters.entries()){
      let time = -character.initiative
      if(!schedule[time]){
        schedule[time] = []
      }

      schedule[time].push(c)
    }
    return schedule
  }

  between(start, end){
    let schedule = {}

    for(let [c, character] of this.characters.entries()){
      let cStart = Math.ceil((start + character.initiative) / character.attackMspa)
      let cEnd = Math.ceil((end + character.initiative) / character.attackMspa)
      for(let i = cStart; i < cEnd; i++){
        let time = i * character.attackMspa - character.initiative
        if(!schedule[time]){
          schedule[time] = []
        }

        schedule[time].push(c)
      }
    }

    return schedule
  }
}
