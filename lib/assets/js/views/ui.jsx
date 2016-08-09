const React = require('react')

const HeroView = require('./hero.jsx')
const InspectView = require('./inspect.jsx')
const CombatView = require('./combat.jsx')
const ConsoleView = require('./console.jsx')

let Ui = module.exports = class Hero extends React.Component {
  render () {
    return (
      <div className='ui'>
        <ConsoleView />
        <CombatView />
        <HeroView hero={ this.props.hero } />
        <InspectView />
      </div>
    )
  }
}
