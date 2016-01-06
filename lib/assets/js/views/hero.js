const React = require('react')
const jade = require('react-jade')

const StatsView = require('./stats')
const EquipmentView = require('./equipment')
// TODO: move this to a sibling of HeroView
const InspectView = require('./inspect')

module.exports = React.createClass({
  render: jade`
div.hero
  StatsView(stats=this.props.hero.stats)
  EquipmentView(equipment=this.props.hero.equipment)
  InspectView()
`.locals({ StatsView, EquipmentView, InspectView }),
})
