const React = require('react')
const jade = require('react-jade')

const StatsView = require('./stats')

let Item = module.exports = class Inspect extends React.Component {
  constructor () {
    super()
  }

  speed (attackDelay) {
    return (1000 / attackDelay).toFixed(2)
  }
}

Item.prototype.render = jade`
div.item-view
  h2.item-name= this.props.item.name
  if this.props.item.minDamage
    dl
      dt Damage
      dd
        = this.props.item.minDamage
        | &nbsp;-&nbsp;
        = this.props.item.maxDamage
    dl
      dt Atk/s
      dd= this.speed(this.props.item.attackDelay)

  StatsView(stats=this.props.item.stats)
`.locals({ StatsView })
