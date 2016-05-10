const _ = require('lodash')
const PIXI = require('pixi.js')
const run = require('lib/util/run')

function onAssetsLoaded (loader, resources) {
  let stage = new PIXI.Container()
  let bunny = new PIXI.Sprite(resources.bunny.texture)

  bunny.position.x = 400
  bunny.position.y = 300

  bunny.scale.x = 2
  bunny.scale.y = 2

  stage.addChild(bunny)

  this.stage = stage

  run.everyFrame(() => {
    bunny.rotation += 0.01
  })
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
    .add('bunny', 'bunny.png')
    .load(onAssetsLoaded.bind(context))

  run.everyFrame(() => {
    context.renderer.render(context.stage)
  })
}
