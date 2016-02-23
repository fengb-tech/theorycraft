const jade = require('react-jade')

const React = require('react')
const { TYPES } = require('lib/core/stats')

let Stats = module.exports = class Stats extends React.Component {
}

Stats.prototype.render = jade`
div.stats
  each type in TYPES
    dl.stat(class=type key=type)
      dt.stat-type
        = type
      dd.stat-value
        = this.props.stats[type]
`.locals({ TYPES })
