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

  onClick (index) {
    pubsub.emit('click.item', this.props.backpack, index)
  }

  render () {
    return (
      <ul className='backpack-view'>
        {this.props.backpack.map((item, index) => {
          return <li className='backpack-item'
                     key={item.uuid}
                     onMouseOver={this.onMouseOver.bind(this, item)}
                     onMouseOut={this.onMouseOut.bind(this, item)}
                     onClick={this.onClick.bind(this, item)}
                 >{item.name}</li>
        })}
      </ul>
    )
  }
}
