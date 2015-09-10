const jade = require('react-jade')

const Listener = require('./listener')

let Stats = module.exports = class Stats extends Listener {
  constructor(){
    super()
    this._listenOn = { stats: 'change' }
  }
}

Stats.prototype.render = jade`
div.stats
  each type in this.props.stats.types
    dl.stat(class=type key=type)
      dt.stat-type
        = type
      dd.stat-value
        = this.props.stats[type]
`
