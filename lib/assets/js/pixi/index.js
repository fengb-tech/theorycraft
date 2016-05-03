const _ = require('lodash')
const PIXI = require('pixi.js')
const run = require('lib/util/run')

module.exports = function pixi (dom) {
  if (_.isString(dom)) {
    dom = document.querySelector(dom)
  }

  let renderer = PIXI.autoDetectRenderer(dom.offsetWidth, dom.offsetHeight, {
    transparent: true
  })
  dom.appendChild(renderer.view)
  window.addEventListener('resize', run.debounce(50, () => {
    renderer.resize(dom.offsetWidth, dom.offsetHeight)
  }))

  PIXI.loader.add('bunny', 'bunny.png').load((loader, resources) => {
    let stage = new PIXI.Container()
    let bunny = new PIXI.Sprite(resources.bunny.texture)

    bunny.position.x = 400
    bunny.position.y = 300

    bunny.scale.x = 2
    bunny.scale.y = 2

    stage.addChild(bunny)

    run.everyFrame(() => {
      bunny.rotation += 0.01
      renderer.render(stage)
    })
  })
}
