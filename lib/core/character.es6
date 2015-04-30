import Stats from 'tc/core/stats'
import Equipment from 'tc/core/equipment'

export default class Character {
  constructor(){
    this.level = 1
    this.baseStats = new Stats()

    this.equipment = new Equipment()
  }

  get stats(){
    return this.baseStats.add(this.equipment.stats)
  }
}
