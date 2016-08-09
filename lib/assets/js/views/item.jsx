const React = require('react')

const StatsView = require('./stats.jsx')

let Item = module.exports = class Inspect extends React.Component {
  constructor () {
    super()
  }

  speed (attackDelay) {
    return (1000 / attackDelay).toFixed(2)
  }

  render () {
    let weaponView = this.props.item.minDamage && [
      <dl>
        <dt>Damage</dt>
        <dd>{ this.props.item.minDamage }&nbsp;-&nbsp;{ this.props.item.maxDamage }</dd>
      </dl>,
      <dl>
        <dt>Atk/s</dt>
        <dd>{ this.speed(this.props.item.attackDelay) }</dd>
      </dl>
    ]

    render (
      <div className='item-view'>
        <h2 className='item-name'>{ this.props.item.name }</h2>
        <div>
          { weaponView }
        </div>
        <StatsView stats={this.props.item.stats} />
      </div>
    )
  }
}
