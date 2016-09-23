const PIXI = require('pixi.js')

const pubsub = require('../controllers/pubsub')
const helpers = require('./helpers')
const Actor = require('./actor')

module.exports = {
  init (_resources, options) {
    let stage = new PIXI.Container()

    let actors = {}

    pubsub.on('combat', function (combat) {
      if (!actors[combat.hero]) {
        helpers.create(Actor, {
          model: combat.hero
        }).then((hero) => {
          hero.position.x = options.width / 2 - 100
          hero.position.y = options.height

          stage.addChild(hero)
          actors[combat.hero] = hero
        })
      }

      helpers.create(Actor, {
        model: combat.enemies[0]
      }).then((enemy) => {
        enemy.scale.x = -1
        enemy.position.x = options.width / 2 + 100
        enemy.position.y = options.height

        stage.addChild(enemy)
        actors[combat.enemies[0]] = enemy
      })

      combat.simulation.on('action', (action) => {
        if (action.type !== 'attack') {
          return
        }

        let actor = actors[action.source]
        actor && actor.attack()
      })

      combat.simulation.on('death', (target) => {
        let actor = actors[target]
        actor && actor.die().then(() => {
          stage.removeChild(actor)
          delete actors[target]
        })
      })
    })

    return stage
  }
}
