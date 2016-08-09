const Listener = require('./listener')
const { TYPES } = require('lib/core/stats')

const EquipmentView = require('./equipment.jsx')
const BackpackView = require('./backpack.jsx')

let Hero = module.exports = class Hero extends Listener {
  constructor () {
    super()
    this._listenOn = { hero: 'change' }
  }

  render () {
    let pairs = [
      ['Level', this.props.hero.base.level],
      ['XP', this.props.hero.base.xp],
      ['Gold', this.props.hero.base.gold],
    ].concat(TYPES.map((type) => {
      let hero = this.props.hero
      return [type, `${hero.base.stats[type]} + ${hero.equipment.stats[type]} = ${hero.stats[type]}`]
    }))

    return (
      <div className='hero'>
        <div>
          {pairs.map(([ name, value ]) => {
            <dl className='pair'>
              <dt className='pair-name'>{ name }</dt>
              <dd className='pair-value'>{ value }</dd>
            </dl>
          })}
        </div>
        <EquipmentView equipment={this.props.hero.equipment} />
        <BackpackView backpack={this.props.hero.backpack} />
      </div>
    )
  }
}
