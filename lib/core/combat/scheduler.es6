export default class Scheduler {
  constructor(startTime, characters){
    this.startTime = startTime
    this.characters = characters
  }

  initiative(){
    let schedule = {}
    for(let [c, character] of this.characters.entries()){
      let time = this.startTime - character.initiative
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
      let offset = this.startTime - character.initiative
      let cStart = Math.ceil((start - offset) / character.attackMspa)
      let cEnd = Math.ceil((end - offset) / character.attackMspa)
      for(let i = cStart; i < cEnd; i++){
        let time = i * character.attackMspa + offset
        if(!schedule[time]){
          schedule[time] = []
        }

        schedule[time].push(c)
      }
    }

    return schedule
  }
}
