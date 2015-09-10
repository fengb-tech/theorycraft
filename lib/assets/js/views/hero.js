const React = require('react')
const jade = require('react-jade')

const StatsView = require('./stats')

module.exports = React.createClass({
  render: jade`
div.hero
  StatsView(stats=this.props.hero.stats)
`.locals({ StatsView }),
})
