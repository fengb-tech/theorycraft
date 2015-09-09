const FULL_HP = 10000

module.exports = class State {
  constructor(chars){
    this.hps = {}

    for(let char of chars){
      this.hps[char] = FULL_HP
    }
  }

  process(directive){
    switch(directive.action){
      case 'attack':
        this.hps[directive.target] -= directive.damage
        break
      case 'recover':
        this.hps[directive.target] = FULL_HP
        break
    }
  }

  isActive(char){
    return this.hps[char] > 0
  }

  kill(char){
    this.hps[char] = 0
  }
}
