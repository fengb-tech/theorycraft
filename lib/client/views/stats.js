const React = require('react')
const jade = require('react-jade')

const Stats = require('tc/lib/core/stats')

module.exports = React.createClass({
  _addUpdateListener(eventable){
    if(!this._updateListener){
      this._updateListener = () => this.forceUpdate()
    }
    eventable.on('change', this._updateListener)
  },

  _removeUpdateListener(eventable){
    eventable.off('change', this._updateListener)
  },

  componentDidMount(){
    this._addUpdateListener(this.props.stats)
  },

  componentWillUnmount(){
    this._removeUpdateListener(this.props.stats)
  },

  componentWillReceiveProps(newProps){
    if('stats' in props){
      this._removeUpdateListener(this.newProps.stats)
      this._addUpdateListener(newProps.stats)
    }
  },

  render: jade`
div.stats
  each type in Stats.TYPES
    dl.stat(key=type)
      dt.stat-type
        = type
      dd.stat-value
        = this.props.stats[type]
`
})
