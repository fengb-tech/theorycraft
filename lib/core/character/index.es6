import Equipment from './equipment'
import Base from './base'

export default class Character {
  constructor(){
    this.base = new Base(0)
    this.equipment = new Equipment()
  }

  get stats(){
    return this.base.stats.add(this.equipment.stats)
  }

  addXp(xp){
    this.base.xp += xp
  }
}