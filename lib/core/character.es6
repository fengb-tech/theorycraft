import Equipment from 'tc/core/equipment'
import Level from 'tc/core/character/level'

export default class Character {
  constructor(){
    this.xp = 0
    this.level = new Level(1)
    this.equipment = new Equipment()
  }

  get stats(){
    return this.level.stats.add(this.equipment.stats)
  }
}
