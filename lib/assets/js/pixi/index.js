const _ = require('lodash')
const PIXI = require('pixi.js')
const PIXISpine = require('pixi-spine')
const run = require('lib/util/run')

function onAssetsLoaded (loader, resources) {
  let stage = new PIXI.Container()
  var spineBoy = new PIXISpine.Spine(resources.spineboy.spineData)

  // set the position
  spineBoy.position.x = this.renderer.width / 2
  spineBoy.position.y = this.renderer.height

  spineBoy.scale.set(1.5)

  // set up the mixes!
  spineBoy.stateData.setMixByName('walk', 'jump', 0.2)
  spineBoy.stateData.setMixByName('jump', 'walk', 0.4)

  // play animation
  spineBoy.state.setAnimationByName(0, 'walk', true)

  stage.addChild(spineBoy)

  stage.on('click', function () {
    spineBoy.state.setAnimationByName(0, 'jump', false)
    spineBoy.state.addAnimationByName(0, 'walk', true, 0)
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
