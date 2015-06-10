const jade = require('react-jade')

const Listener = require('./listener')

module.exports = Listener.props({ stats: 'change' }, React.createClass({
  render: jade`
div.stats
  each type in this.props.stats.types
    dl.stat(class=type key=type)
      dt.stat-type
        = type
      dd.stat-value
        = this.props.stats[type]
`
}))
