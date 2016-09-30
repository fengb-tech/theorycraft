const _ = require('lodash')
const PIXI = require('pixi.js')

module.exports = {
  load (assets) {
    let needsLoading = unloaded(assets)
    if (needsLoading.length === 0) {
      return Promise.resolve(PIXI.loader.resources)
    }

    return new Promise((resolve, reject) => {
      for (let asset of needsLoading) {
        try {
          let resource = PIXI.loader.resources[asset]
          if (!resource) {
            PIXI.loader.add(asset)
          }
        } catch (e) {
          reject(e)
          return
        }
      }

      PIXI.loader.load((_loader, resources) => {
        resolve(resources)
      })
    })
  }
}

function unloaded (assets = []) {
  return _.filter(assets, (asset) => {
    let resource = PIXI.loader.resources[asset]
    return !resource || !resource.isComplete
  })
}
