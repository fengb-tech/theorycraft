const PIXI = require('pixi.js')

const LOADED_ASSETS = {}

module.exports = {
  create (module, options) {
    if (!module.assets) {
      let sprite = module.init(PIXI.loader.resources, options)
      return Promise.resolve(sprite)
    }

    return new Promise((resolve, reject) => {
      for (let name of Object.keys(module.assets)) {
        let url = module.assets[name]
        if (LOADED_ASSETS[name] == null) {
          PIXI.loader.add(name, url)
          LOADED_ASSETS[name] = url
        } else if (LOADED_ASSETS[name] === url) {
          // Do nothing, already loaded
        } else {
          throw new Error(`Multiple assets defined for '${name}': '${url}' + '${LOADED_ASSETS[name]}'`)
        }
      }

      PIXI.loader.load((_loader, resources) => {
        let sprite = module.init(resources, options)
        resolve(sprite)
      })
    })
  }
}
