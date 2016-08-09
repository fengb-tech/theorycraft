const React = require('react')
const CombatHp = require('./combat-hp.jsx')
const pubsub = require('../controllers/pubsub')

const Combat = module.exports = class Combat extends React.Component {
  constructor () {
    super()
    pubsub.on('combat', (combat) => {
      this.setState({
        simulation: combat.simulation,
        hero: combat.hero,
        enemies: combat.enemies,
      })
    })
  }

  render () {
    let hps = []
    if (this.state) {
      hps.push(<CombatHp title='Hero' simulation={ this.state.simulation } character={ this.state.hero } />)
      this.state.enemies.map((enemy) => {
        hps.push(<CombatHp key={ enemy } title='Enemy' simulation={ this.state.simulation } character={ enemy } />)
      })
    }
    return (
      <div className='combat'>
        {hps}
      </div>
    )
  }
}
