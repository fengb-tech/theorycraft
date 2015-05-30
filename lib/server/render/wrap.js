let _ = require('lodash')
let co = require('co')

class Wrap {
  constructor(options){
    Wrap.init()
    this.options = options
  }

  static init(){
    if(Wrap.prototype.render){
      return
    }

    // Hide this here to prevent circular reference
    let render = Wrap.prototype.render = require('.')
    _.forIn(render, (func, key) => {
      Wrap.prototype[key] = function(...args){
        return this.unroll(func(...args))
      }
    })
  }

  unroll(wrappedRender){
    let options = this.options
    let render = this.render

    return function*(next){
      yield co(wrappedRender.bind(this))

      let localOptions = _.extend({}, options, { content: this.body })
      yield co(render.view('wrapper.jade', localOptions).bind(this))
    }
  }
}

module.exports = function(options = {}){
  return new Wrap(options)
}
