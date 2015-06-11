const HeroView = require('./views/hero')
const CombatView = require('./views/combat')

const Hero = require('tc/lib/core/hero')
const Combat = require('tc/lib/core/combat')

const dom = document.querySelector('main')

let hero = new Hero(1)

//FIXME: actually render this!
//React.render(React.createElement(HeroView, { hero }), dom)

let combatComponent = React.render(React.createElement(CombatView), dom)

let combat = window.combat = Combat.run(hero)
combatComponent.setProps({ combat })
