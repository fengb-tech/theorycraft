const React = require('react')

module.exports = class Listener extends React.Component {
  componentDidMount () {
    for (let field in this._listenOn) {
      this._listenerAdd(this.props, field)
    }
  }

  componentWillUnmount () {
    for (let field in this._listenOn) {
      this._listenerRemove(this.props, field)
    }
  }

  componentWillReceiveProps (newProps) {
    for (let field in this._listenOn) {
      if (field in newProps) {
        this._listenerRemove(this.props, field)
        this._listenerAdd(newProps, field)
      }
    }
  }

  _listenerAdd (props, field) {
    let eventable = props[field]
    if (eventable) {
      eventable.on(this._listenOn[field], this.forceUpdate, this)
    }
  }

  _listenerRemove (props, field) {
    let eventable = props[field]
    if (eventable) {
      eventable.off(this._listenOn[field], this.forceUpdate, this)
    }
  }
}
