const jade = require('react-jade')

const Listener = require('./listener')
const StatsView = require('./stats')
const pubsub = require('lib/assets/js/controllers/pubsub')

let Inspect = module.exports = class Inspect extends Listener {
  constructor () {
    super()
    this.state = {}

    this.onMouseMove = this.onMouseMove.bind(this)

    pubsub.on('item.show', this.onItemShow, this)
    pubsub.on('item.hide', this.onItemHide, this)
  }

  onItemShow (item) {
    this.setState({ item: item })
    document.addEventListener('mousemove', this.onMouseMove)
  }

  onItemHide (item) {
    if (item !== this.state.item) {
      return
    }

    this.setState({ item: null })
    document.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove (event) {
    this.setState({ x: event.clientX + 10, y: event.clientY + 10 })
  }
}

Inspect.prototype.render = jade`
div.inspect-view(style={ left: this.state.x, top: this.state.y, visibility: this.state.item ? 'visible' : 'hidden' })
  if this.state.item
    StatsView(stats=this.state.item.stats)
`
