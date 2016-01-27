const React = require('react')
const jade = require('react-jade')

const StatsView = require('./stats')
const EquipmentView = require('./equipment')
const BackpackView = require('./backpack')
// TODO: move this to a sibling of HeroView
const InspectView = require('./inspect')

module.exports = React.createClass({
  render: jade`
div.hero
  StatsView(stats=this.props.hero.stats)
  EquipmentView(equipment=this.props.hero.equipment controller=this.props.controller)
  BackpackView(backpack=this.props.hero.backpack controller=this.props.controller)
  InspectView()
`.locals({ StatsView, EquipmentView, BackpackView, InspectView }),
})
