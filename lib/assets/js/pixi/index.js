const _ = require('lodash')
const PIXI = require('pixi.js')

const run = require('lib/util/run')

const helpers = require('./helpers')
const Combat = require('./combat')

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

  let renderer = autofillRenderer(dom, { transparent: true })
  dom.appendChild(renderer.view)

  return helpers.create(Combat, {
    width: renderer.width,
    height: renderer.height
  }).then((combat) => {
    run.everyFrame(() => {
      renderer.render(combat)
    })
    return renderer
  })
}
