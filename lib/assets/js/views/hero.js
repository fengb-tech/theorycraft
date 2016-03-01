const jade = require('react-jade')

const Listener = require('./listener')

const StatsView = require('./stats')
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
    StatsView(stats=this.props.hero.stats)
  EquipmentView(equipment=this.props.hero.equipment controller=this.props.controller)
  BackpackView(backpack=this.props.hero.backpack controller=this.props.controller)
  InspectView()
`.locals({ StatsView, EquipmentView, BackpackView, InspectView })
