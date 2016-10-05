const _ = require('lodash')
const PIXI = require('pixi.js')
const Promise = require('bluebird')

module.exports = {
  load (arg) {
    if (_.isArray(arg)) {
      return Promise.map(arg, loadOne)
    } else {
      return loadOne(arg)
    }
  }
}

const loadOne = _.memoize((asset) => {
  return new Promise((resolve, reject) => {
    PIXI.loader
      .add(asset)
      .load((_loader, resources) => {
        let resource = PIXI.loader.resources[asset]
        if (resource.isComplete) {
          resolve(resource)
        } else {
          reject(resource)
        }
      })
  })
})
