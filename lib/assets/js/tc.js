const ReactHelper = require('./react-helper')

const HeroView = require('./views/hero')
const CombatView = require('./views/combat')
const CombatController = require('./controllers/combat')

const Hero = require('lib/core/hero')

let hero = new Hero(1)
let controller = new CombatController(hero)

ReactHelper.render('#ui', HeroView, { hero })
ReactHelper.render('#combat', CombatView, { controller })

controller.startAutoSync()
