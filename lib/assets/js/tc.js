const ReactHelper = require('./react-helper')

const HeroView = require('./views/hero')
const CombatView = require('./views/combat')
const CombatController = require('./controllers/combat')
const UserController = require('./controllers/user')

const Hero = require('lib/core/hero')

let data = JSON.parse(localStorage.hero || null)
let hero = new Hero(data || undefined)
let userController = new UserController(hero)
let combatController = new CombatController(hero)

ReactHelper.render('#ui', HeroView, { hero, controller: userController })
ReactHelper.render('#combat', CombatView, { controller: combatController })

combatController.startAutoSync()
