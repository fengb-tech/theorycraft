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

    combat.simulation.on('action', (action) => {
      if (action.type !== 'attack') {
        return
      }

      if (action.source === combat.hero) {
        hero.state.setAnimationByName(0, 'jump', false)
        hero.state.addAnimationByName(0, 'walk', true, 0)
      } else {
        enemy.state.setAnimationByName(0, 'jump', false)
        enemy.state.addAnimationByName(0, 'walk', true, 0)
      }
    })

    combat.simulation.on('death', (target) => {
      if (target !== combat.hero) {
        // TODO: play enemy death animation and leave a dead body
        stage.removeChild(enemy)
      }
    })
  })

  this.stage = stage
}

function autoResizeRenderer (options) {
  let { width, height } = options.sizer()
  let renderer = PIXI.autoDetectRenderer(width, height, options)
  window.addEventListener('resize', run.debounce(50, () => {
    let { width, height } = options.sizer()
    renderer.resize(width, height)
  }))
  return renderer
}

module.exports = function pixi (dom) {
  if (_.isString(dom)) {
    dom = document.querySelector(dom)
  }

  let context = {
    stage: new PIXI.Container(),
    renderer: autoResizeRenderer({
      transparent: true,
      sizer: () => ({ width: dom.offsetWidth, height: dom.offsetHeight }),
    }),
  }
  dom.appendChild(context.renderer.view)

  PIXI.loader
    .add('spineboy', 'spineboy.json')
    .load(onAssetsLoaded.bind(context))

  run.everyFrame(() => {
    context.renderer.render(context.stage)
  })
}
