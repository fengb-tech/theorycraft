const React = require('react')
const jade = require('react-jade')
const CombatHp = require('./combat-hp')
const pubsub = require('../controllers/pubsub')

const Combat = module.exports = class Combat extends React.Component {
  constructor () {
    super()
    pubsub.on('combat', (combat, directive, state) => {
      this.setState({
        state: state,
        hero: combat.hero,
        enemies: combat.enemies,
      })
    })
  }
}

Combat.prototype.render = jade`
div.combat
  if this.state
    CombatHp(title='Hero', state=this.state.state, character=this.state.hero)
    each enemy in this.state.enemies
      CombatHp(key=enemy, title='Enemy', state=this.state.state, character=enemy)
`.locals({ CombatHp })
