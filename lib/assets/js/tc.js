const pixiHelper = require('./pixi')
const ReactHelper = require('./react-helper')

const UiView = require('./views/ui')
const CombatController = require('./controllers/combat')

const Hero = require('lib/core/hero')

let data = JSON.parse(localStorage.hero || null)
let hero = new Hero(data || undefined)
let combatController = new CombatController(hero)

ReactHelper.render('#ui', UiView, { hero })

combatController.startAutoSync()

pixiHelper('#pixi')
