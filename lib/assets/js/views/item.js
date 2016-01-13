const React = require('react')
const jade = require('react-jade')

const StatsView = require('./stats')

let Item = module.exports = class Inspect extends React.Component {
  constructor () {
    super()
  }
}

Item.prototype.render = jade`
div.item-view
  h2.item-name= this.props.item.name
  StatsView(stats=this.props.item.stats)
`.locals({ StatsView })
