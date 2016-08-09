//const pixiHelper = require('./pixi')
const ReactHelper = require('./react-helper')

const UiView = require('./views/ui.jsx')
const CombatController = require('./controllers/combat')
const UserController = require('./controllers/user')

const Hero = require('lib/core/hero')

let data = JSON.parse(localStorage.hero || null)
let hero = new Hero(data || undefined)

let combatController = new CombatController(hero)
let userController = new UserController()

ReactHelper.render('#ui', UiView, { hero })

combatController.startAutoSync()
userController.observe()

//pixiHelper('#pixi')
