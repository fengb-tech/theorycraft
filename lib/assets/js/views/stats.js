const jade = require('react-jade')

const React = require('react')
const { TYPES } = require('lib/core/stats')

let Stats = module.exports = class Stats extends React.Component {
}

Stats.prototype.render = jade`
div.stats
  each type in TYPES
    dl.pair.stat(class=type key=type)
      dt.pair-name
        = type
      dd.pair-value
        = this.props.stats[type]
`.locals({ TYPES })
