const _ = require('lodash')
const PIXI = require('pixi.js')
const PIXISpine = require('pixi-spine')
const run = require('lib/util/run')
const pubsub = require('lib/assets/js/controllers/pubsub')

function onAssetsLoaded (loader, resources) {
  let stage = new PIXI.Container()
  let hero = new PIXISpine.Spine(resources.spineboy.spineData)

  hero.position.x = this.renderer.width / 2 - 100
  hero.position.y = this.renderer.height

  hero.stateData.setMixByName('walk', 'jump', 0.2)
  hero.stateData.setMixByName('jump', 'walk', 0.4)

  hero.state.setAnimationByName(0, 'walk', true)

  stage.addChild(hero)

  pubsub.on('combat', (combat) => {
    let enemy = new PIXISpine.Spine(resources.spineboy.spineData)

    enemy.scale.x = -1
    enemy.position.x = this.renderer.width / 2 + 100
    enemy.position.y = this.renderer.height

    enemy.stateData.setMixByName('walk', 'jump', 0.2)
    enemy.stateData.setMixByName('jump', 'walk', 0.4)

    enemy.state.setAnimationByName(0, 'walk', true)

    stage.addChild(enemy)

    let spines = {
      [combat.hero]: hero,
      [combat.enemies[0]]: enemy
    }

    combat.simulation.on('action', (action) => {
      if (action.type !== 'attack') {
        return
      }

      let spine = spines[action.source]
      spine.state.setAnimationByName(0, 'jump', false)
      spine.state.addAnimationByName(0, 'walk', true, 0)
    })

    combat.simulation.on('death', (target) => {
      let spine = spines[target]
      // TODO: play death animation and leave a dead body
      stage.removeChild(spine)
    })
  })

  this.stage = stage
}

function autofillRenderer (parent, options) {
  let renderer = PIXI.autoDetectRenderer(parent.offsetWidth, parent.offsetHeight, options)
  window.addEventListener('resize', run.debounce(50, () => {
    renderer.resize(parent.offsetWidth, parent.offsetHeight)
  }))
  return renderer
}

module.exports = function pixi (dom) {
  if (_.isString(dom)) {
    dom = document.querySelector(dom)
  }

  let context = {
    stage: new PIXI.Container(),
    renderer: autofillRenderer(dom, { transparent: true })
  }
  dom.appendChild(context.renderer.view)

  PIXI.loader
    .add('spineboy', 'spineboy.json')
    .load(onAssetsLoaded.bind(context))

  run.everyFrame(() => {
    context.renderer.render(context.stage)
  })
}
