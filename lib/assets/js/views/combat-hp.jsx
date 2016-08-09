const Listener = require('./listener')

const DEATH = '(x_x)'

const CombatHp = module.exports = class CombatHp extends Listener {
  constructor () {
    super()
    this._listenOn = { simulation: (props) => `hp.${props.character}` }
  }

  hp () {
    let simulation = this.props.simulation
    if (simulation) {
      if (simulation.isAlive(this.props.character)) {
        return simulation.hps[this.props.character]
      } else {
        return DEATH
      }
    }
  }

  barClasses () {
    let hp = this.hp()
    if (hp === 10000) {
      return 'combat-hp-bar recover'
    } else {
      return 'combat-hp-bar'
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

  render () {
    return (
      <dl className='combat-hp'>
        <dt className={this.barClasses()}
            style={this.barStyle()}
            />
        <dt className='combat-hp-name'>{ this.props.title }</dt>
        <dd className='combat-hp-value'>{ this.hp() }</dd>
      </dl>
    )
  }
}
