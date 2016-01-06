const jade = require('react-jade')

const Listener = require('./listener')

let Equipment = module.exports = class Equipment extends Listener {
  constructor () {
    super()
    this._listenOn = { equipment: 'change' }
  }
}

Equipment.prototype.render = jade`
div.equipment
  each item in this.props.equipment.items
    dl.item(class=item.type key=item.type)
      dt.item-type
        = item.type
      dd.item-name
        = item.name
`
