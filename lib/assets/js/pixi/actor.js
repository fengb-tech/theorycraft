const PIXISpine = require('pixi-spine')

const run = require('lib/util/run')

module.exports = {
  assets: { spineboy: 'spineboy.json' },
  init (resources, _options) {
    let spine = new PIXISpine.Spine(resources.spineboy.spineData)

    spine.stateData.setMixByName('walk', 'jump', 0.2)
    spine.stateData.setMixByName('jump', 'walk', 0.4)

    spine.state.setAnimationByName(0, 'walk', true)

    return Object.assign(spine, methods)
  }
}

const methods = {
  attack () {
    this.state.setAnimationByName(0, 'jump', false)
    this.state.addAnimationByName(0, 'walk', true, 0)
    return Promise.resolve()
  },

  die () {
    this.state.setAnimationByName(0, 'walk', false)
    // TODO: play death animation and leave a dead body
    return new Promise((resolve, reject) => {
      run.in(3000, Promise.resolve)
    })
  }
}
