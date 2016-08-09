const Listener = require('./listener')
const pubsub = require('lib/assets/js/controllers/pubsub')

let Equipment = module.exports = class Equipment extends Listener {
  constructor () {
    super()
    this._listenOn = { equipment: 'change' }
  }

  onMouseOver (item) {
    pubsub.emit('item.show', item)
  }

  onMouseOut (item) {
    pubsub.emit('item.hide', item)
  }

  onClick (type) {
    pubsub.emit('click.item', this.props.equipment, type)
  }

  render () {
    return (
      <div className='equipment'>
        {this.props.equipment.items.map((item) => {
          <dl className={ 'item ' + item.type }
              key={ item.type }
              onMouseOver={ this.onMouseOver.bind(this, item) }
              onMouseOut={ this.onMouseOut.bind(this, item) }
              onClick={ this.onClick.bind(this, item.type) }
              >
            <dt className='item-type'>{ item.type }</dt>
            <dd className='item-name'>{ item.name }</dd>
          </dl>
        })}
      </div>
    )
  }
}
