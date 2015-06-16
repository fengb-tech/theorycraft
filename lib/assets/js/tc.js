const HeroView = require('./views/hero')
const CombatView = require('./views/combat')

const Hero = require('tc/lib/core/hero')
const Combat = require('tc/lib/core/combat')

const run = require('tc/lib/util/run')

let hero = new Hero(1)

React.render(React.createElement(HeroView, { hero }), document.getElementById('ui'))

let combatComponent = React.render(React.createElement(CombatView), document.getElementById('combat'))

function runCombat(){
  let combat = Combat.run(hero)
  combatComponent.setProps({ combat })
  run.at(combat.endTime, runCombat)
}
runCombat()
