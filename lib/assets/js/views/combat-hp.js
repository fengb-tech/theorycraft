const jade = require('react-jade')
const Listener = require('./listener')

const DEATH = '(x_x)'

const CombatHp = module.exports = class CombatHp extends Listener {
  constructor () {
    super()
    this._listenOn = { state: (props) => `hp.${props.character}` }
  }

  hp () {
    let state = this.props.state
    if (state) {
      if (state.isAlive(this.props.character)) {
        return state.hps[this.props.character]
      } else {
        return DEATH
      }
    }
  }

  barClasses () {
    let hp = this.hp()
    if (hp === 10000) {
      return 'recover'
    } else {
      return ''
    }
  }

  barStyle () {
    let hp = this.hp()
    if (hp == null) {
      return { width: '100%' }
    } else if (hp === DEATH) {
      return { width: '0' }
    }

    let totalHp = 10000
    return { width: `${Math.round(100 * hp / totalHp)}%` }
  }
}

CombatHp.prototype.render = jade`
dl.combat-hp
  dt.combat-hp-bar(style=this.barStyle() class=this.barClasses())
  dt.combat-hp-name= this.props.title
  dd.combat-hp-value= this.hp()
`
