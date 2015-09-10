const React = require('react')

const HeroView = require('./views/hero')
const CombatView = require('./views/combat')

const Hero = require('lib/core/hero')
const Combat = require('lib/core/combat')

const run = require('lib/util/run')

let hero = new Hero(1)

React.render(React.createElement(HeroView, { hero }), document.getElementById('ui'))

let combatComponent = React.render(React.createElement(CombatView), document.getElementById('combat'))

const TRAVEL_TIME = 5000

function runCombat(){
  let combat = Combat.run(hero)
  combatComponent.loadCombat(combat)
  run.at(combat.endTime + TRAVEL_TIME, runCombat)
}
runCombat()
