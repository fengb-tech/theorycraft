const jade = require('react-jade')

const Listener = require('./listener')
const pubsub = require('lib/assets/js/controllers/pubsub')

let Backpack = module.exports = class Equipment extends Listener {
  constructor () {
    super()
    this._listenOn = { backpack: 'change' }
  }

  onMouseOver (item) {
    pubsub.emit('item.show', item)
  }

  onMouseOut (item) {
    pubsub.emit('item.hide', item)
  }
}

Backpack.prototype.render = jade`
ul.backpack-view
  each item in this.props.backpack
    li.backpack-item(key=item.uuid onMouseOver=this.onMouseOver.bind(this, item) onMouseOut=this.onMouseOut.bind(this, item))= item.name
`