const React = require('react')
const jade = require('react-jade')

const Stats = require('tc/lib/core/stats')

module.exports = React.createClass({
  render: jade`
div.stats
  each type in Stats.TYPES
    dl.stat(key=type)
      dt.stat-type
        = type
      dd.stat-value
        = this.props.stats[type]
`
})
