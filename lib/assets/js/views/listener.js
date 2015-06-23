const compose = require('lib/util/compose')

function addListener(eventable, eventName, listener){
  if(eventable){
    eventable.on(eventName, listener)
  }
}

function removeListener(eventable, eventName, listener){
  if(eventable){
    eventable.off(eventName, listener)
  }
}

function createListenerMethods(options){
  return {
    componentDidMount(){
      if(!this._forceUpdateBound){
        this._forceUpdateBound = () => this.forceUpdate()
      }

      for(let field in options){
        addListener(this.props[field], options[field], this._forceUpdateBound)
      }
    },

    componentWillUnmount(){
      for(let field in options){
        removeListener(this.props[field], options[field], this._forceUpdateBound)
      }
    },

    componentWillReceiveProps(newProps){
      for(let field in options){
        if(field in newProps){
          removeListener(this.props[field], options[field], this._forceUpdateBound)
          addListener(newProps[field], options[field], this._forceUpdateBound)
        }
      }
    },
  }
}

exports.props = function(options, klass) {
  let methods = createListenerMethods(options)
  for(let name in methods){
    let listener = methods[name]
    klass.prototype[name] = compose.series([listener, klass.prototype[name]])
  }
  return klass
}
