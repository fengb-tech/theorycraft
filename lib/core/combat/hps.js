const FULL_HP = 10000

module.exports = class Hps {
  constructor(chars){
    this._lookup = {}

    for(let char of chars){
      this._lookup[char] = FULL_HP
    }
  }

  process(directive){
    switch(directive.action){
      case 'attack':
        this.hurt(directive.target, directive.damage)
        break
      case 'recover':
        this.recover(directive.target)
        break
    }
  }

  lookup(char){
    return this._lookup[char]
  }

  isActive(char){
    return this._lookup[char] > 0
  }

  hurt(char, damage){
    this._lookup[char] -= damage
  }

  recover(char){
    this._lookup[char] = FULL_HP
  }

  kill(char){
    this._lookup[char] = 0
  }
}
