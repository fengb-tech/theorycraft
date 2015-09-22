const jade = require('react-jade')
const Listener = require('./listener')

const CombatHp = module.exports = class CombatHp extends Listener {
  constructor () {
    super()
    this._listenOn = { combat: 'change' }
  }

  hp () {
    let state = this.props.combat.state
    if (state) {
      if (state.isAlive(this.props.character)) {
        return state.hps[this.props.character]
      } else {
        return '(x_x)'
      }
    }
  }
}

CombatHp.prototype.render = jade`
dl.combat-hp
  dt= this.props.title
  dd= this.hp()
`
