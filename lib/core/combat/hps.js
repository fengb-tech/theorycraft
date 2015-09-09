const FULL_HP = 10000

module.exports = class Hps {
  constructor(chars){
    this._lookup = {}

    for(let char of chars){
      this._lookup[char] = FULL_HP
    }
  }

  isActive(char){
    return this._lookup[char] > 0
  }

  hurt(char, damage){
    let newHp = this._lookup[char] -= damage
    return newHp
  }

  recover(char){
    this._lookup[char] = FULL_HP
  }

  kill(char){
    this._lookup[char] = 0
  }
}
