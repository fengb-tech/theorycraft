const PIXI = require('pixi.js')
const PIXISpine = require('pixi-spine')

const run = require('lib/util/run')

module.exports = {
  init (_options) {
    return Object.assign(new PIXI.Container(), methods)
  },

  load: {
    'spineboy.json': function (resources) {
      let spine = this.spine = new PIXISpine.Spine(resources['spineboy.json'].spineData)

      spine.stateData.setMixByName('walk', 'jump', 0.2)
      spine.stateData.setMixByName('jump', 'walk', 0.4)

      spine.state.setAnimationByName(0, 'walk', true)

      this.addChild(spine)

      return spine
    }
  }
}

const methods = {
  attack () {
    if (this.spine) {
      this.spine.state.setAnimationByName(0, 'jump', false)
      this.spine.state.addAnimationByName(0, 'walk', true, 0)
    }

    return Promise.resolve()
  },

  die () {
    if (this.spine) {
      this.spine.state.setAnimationByName(0, 'walk', false)
    }

    // TODO: play death animation and leave a dead body
    return new Promise((resolve, reject) => {
      run.in(3000, resolve)
    })
  }
}
