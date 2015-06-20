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
      if(!this._updateListener){
        this._updateListener = () => this.forceUpdate()
      }

      for(let [field, eventName] of options.entries()){
        addListener(this.props[field], eventName, this._updateListener)
      }
    },

    componentWillUnmount(){
      for(let [field, eventName] of options.entries()){
        removeListener(this.props[field], eventName, this._updateListener)
      }
    },

    componentWillReceiveProps(newProps){
      for(let [field, eventName] of options.entries()){
        if(field in newProps){
          removeListener(this.props[field], eventName, this._updateListener)
          addListener(newProps[field], eventName, this._updateListener)
        }
      }
    },
  }
}

exports.props = function(options, klass) {
  let methods = createListenerMethods(options)
  for(let name in methods){
    let listener = methods[name]
    klass.prototype[name] = compose.series(listener, klass.prototype[name])
  }
  return klass
}
