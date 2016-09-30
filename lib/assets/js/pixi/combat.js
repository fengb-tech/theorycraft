const PIXI = require('pixi.js')

const pubsub = require('../controllers/pubsub')
const Actor = require('./actor')

module.exports = class Combat extends PIXI.Container {
  constructor (options) {
    super()
    this.options = options
    this.actors = {}
    pubsub.on('combat', this.newCombat, this)
  }

  newCombat (combat) {
    if (!this.actors[combat.hero]) {
      let hero = this.actors[combat.hero] = new Actor({ model: combat.hero })

      hero.position.x = this.options.width / 2 - 100
      hero.position.y = this.options.height

      this.addChild(hero)
    }

    let enemy = this.actors[combat.enemies[0]] = new Actor({ model: combat.enemies[0] })

    enemy.scale.x = -1
    enemy.position.x = this.options.width / 2 + 100
    enemy.position.y = this.options.height

    this.addChild(enemy)

    combat.simulation.on('action', (action) => {
      if (action.type !== 'attack') {
        return
      }

      let actor = this.actors[action.source]
      actor.attack()
    })

    combat.simulation.on('death', (target) => {
      let actor = this.actors[target]
      actor.die().then(() => {
        this.removeChild(actor)
        delete this.actors[target]
      })
    })
  }
}
