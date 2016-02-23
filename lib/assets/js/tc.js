const ReactHelper = require('./react-helper')

const HeroView = require('./views/hero')
const CombatView = require('./views/combat')
const CombatController = require('./controllers/combat')
const UserController = require('./controllers/user')

const Hero = require('lib/core/hero')

let hero = window.hero = new Hero(1)
let userController = new UserController(hero)
let combatController = new CombatController(hero)

ReactHelper.render('#ui', HeroView, { hero, controller: userController })
ReactHelper.render('#combat', CombatView, { controller: combatController })

combatController.startAutoSync()
