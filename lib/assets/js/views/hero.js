const jade = require('react-jade')

const Listener = require('./listener')
const { TYPES } = require('lib/core/stats')

const EquipmentView = require('./equipment')
const BackpackView = require('./backpack')
// TODO: move this to a sibling of HeroView
const InspectView = require('./inspect')

let Hero = module.exports = class Hero extends Listener {
  constructor () {
    super()
    this._listenOn = { hero: 'change' }
  }
}

Hero.prototype.render = jade`
div.hero
  div
    dl.pair
      dt.pair-name Level
      dd.pair-value= this.props.hero.base.level
    dl.pair
      dt.pair-name XP
      dd.pair-value= this.props.hero.base.xp
    each type in TYPES
      dl.pair
        dt.pair-name= type
        dd.pair-value
          = this.props.hero.base.stats[type]
          | +
          = this.props.hero.equipment.stats[type]
          | =
          = this.props.hero.stats[type]
  EquipmentView(equipment=this.props.hero.equipment)
  BackpackView(backpack=this.props.hero.backpack)
`.locals({ TYPES, EquipmentView, BackpackView, InspectView })
