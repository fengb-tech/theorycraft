const React = require('react')
const { TYPES } = require('lib/core/stats')

let Stats = module.exports = class Stats extends React.Component {
  render () {
    return (
      <div className='stats'>
        {TYPES.map((type) => {
          <dl className={ 'pair stat ' + type } key={ type }>
            <dt className='pair-name'>{ type }</dt>
            <dd className='pair-value'>{ this.props.stats[type] }</dd>
          </dl>
        })}
      </div>
    )
  }
}
