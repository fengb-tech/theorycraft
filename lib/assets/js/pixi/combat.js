const PIXI = require('pixi.js')

const pubsub = require('../controllers/pubsub')
const helpers = require('./helpers')
const Actor = require('./actor')

module.exports = {
  init (options) {
    let stage = new PIXI.Container()

    let actors = {}

    pubsub.on('combat', function (combat) {
      if (!actors[combat.hero]) {
        let hero = actors[combat.hero] = helpers.create(Actor, {
          model: combat.hero
        })

        hero.position.x = options.width / 2 - 100
        hero.position.y = options.height

        stage.addChild(hero)
      }

      let enemy = actors[combat.enemies[0]] = helpers.create(Actor, {
        model: combat.enemies[0]
      })

      enemy.scale.x = -1
      enemy.position.x = options.width / 2 + 100
      enemy.position.y = options.height

      stage.addChild(enemy)

      combat.simulation.on('action', (action) => {
        if (action.type !== 'attack') {
          return
        }

        let actor = actors[action.source]
        actor.attack()
      })

      combat.simulation.on('death', (target) => {
        let actor = actors[target]
        actor.die().then(() => {
          stage.removeChild(actor)
          delete actors[target]
        })
      })
    })

    return stage
  }
}
