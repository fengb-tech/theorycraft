const jade = require('react-jade')
const Listener = require('./listener')
const Console = require('./console')
const CombatHp = require('./combat-hp.js')

const Combat = module.exports = class Combat extends Listener {
  constructor () {
    super()
    this._listenOn = { controller: 'change' }
  }
}

Combat.prototype.render = jade`
div.combat
  Console(console=this.props.controller.console)
  if this.props.controller.combat
    CombatHp(title='Hero', combat=this.props.controller, character=this.props.controller.hero)
    each enemy in this.props.controller.combat.enemies
      CombatHp(title='Enemy', combat=this.props.controller, character=enemy)
`.locals({ Console, CombatHp })
