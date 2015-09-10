const React = require('react')

module.exports = class Listener extends React.Component {
  componentDidMount(){
    for(let field in this._listenOn){
      this._listenerAdd(this.props, field)
    }
  }

  componentWillUnmount(){
    for(let field in this._listenOn){
      this._listenerRemove(this.props, field)
    }
  }

  componentWillReceiveProps(newProps){
    for(let field in this._listenOn){
      if(field in newProps){
        this._listenerRemove(this.props, field)
        this._listenerAdd(newProps, field)
      }
    }
  }

  get _listenerForceUpdate(){
    if(!this.__listenerForceUpdate) {
      this.__listenerForceUpdate = () => this.forceUpdate()
    }

    return this.__listenerForceUpdate
  }

  _listenerAdd(props, field){
    let eventable = props[field]
    if(eventable){
      let eventName = this._listenOn[field]
      eventable.on(eventName, this._listenerForceUpdate)
    }
  }

  _listenerRemove(props, field){
    let eventable = props[field]
    if(eventable){
      let eventName = this._listenOn[field]
      eventable.off(eventName, this._listenerForceUpdate)
    }
  }
}
