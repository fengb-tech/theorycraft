const React = require('react')
const jade = require('react-jade')

const StatsView = require('./stats')
const EquipmentView = require('./equipment')

module.exports = React.createClass({
  render: jade`
div.hero
  StatsView(stats=this.props.hero.stats)
  EquipmentView(equipment=this.props.hero.equipment)
`.locals({ StatsView, EquipmentView }),
})
