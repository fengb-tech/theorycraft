const pixiHelper = require('./pixi')
const riotHelper = require('./riot')

const CombatController = require('./controllers/combat')
const UserController = require('./controllers/user')

const Hero = require('lib/core/hero')

let data = JSON.parse(localStorage.hero || null)
let hero = new Hero(data || undefined)

let combatController = new CombatController(hero)
let userController = new UserController()

let game = { hero }

combatController.startAutoSync()
userController.observe()

riotHelper(game)

pixiHelper('#pixi')
