const FULL_HP = 10000

module.exports = class Hps {
  constructor(chars){
    this._map = new Map()

    for(let char of chars){
      this._map.set(char, FULL_HP)
    }
  }

  isActive(char){
    return this._map.get(char) > 0
  }

  hurt(char, damage){
    let newHp = this._map.get(char) - damage
    this._map.set(char, newHp)
    return newHp
  }

  recover(char){
    this._map.set(char, FULL_HP)
  }

  kill(char){
    this._map.set(char, 0)
  }
}
