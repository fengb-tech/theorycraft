const React = require('react')
const jade = require('react-jade')

const Stats = require('tc/lib/core/stats')

module.exports = React.createClass({
  render: jade.compile(`
div.stats
  each value, name in this.props.stats
    dl.stat(key=name)
      dt.name
        = name
      dd.value
        = value
`)
})
