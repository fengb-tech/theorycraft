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
  div.hud
    if this.props.controller.state
      CombatHp(title='Hero', state=this.props.controller.state, character=this.props.controller.hero)
      each enemy in this.props.controller.combat.enemies
        CombatHp(key=enemy, title='Enemy', state=this.props.controller.state, character=enemy)
`.locals({ Console, CombatHp })
