const PIXI = require('pixi.js')
const PIXISpine = require('pixi-spine')
const Promise = require('bluebird')

const helpers = require('./helpers')

module.exports = class Actor extends PIXI.Container {
  constructor (_options) {
    super()

    helpers.load('spineboy.json').then((spineboyJson) => {
      let spine = this.spine = new PIXISpine.Spine(spineboyJson.spineData)

      spine.stateData.setMixByName('walk', 'jump', 0.2)
      spine.stateData.setMixByName('jump', 'walk', 0.4)

      spine.state.setAnimationByName(0, 'walk', true)

      this.addChild(spine)
    })
  }

  attack () {
    if (this.spine) {
      this.spine.state.setAnimationByName(0, 'jump', false)
      this.spine.state.addAnimationByName(0, 'walk', true, 0)
    }

    return Promise.resolve()
  }

  die () {
    if (this.spine) {
      this.spine.state.setAnimationByName(0, 'walk', false)
    }

    // TODO: play death animation and leave a dead body
    return Promise.delay(3000)
  }
}
