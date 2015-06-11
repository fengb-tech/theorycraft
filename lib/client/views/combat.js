const jade = require('react-jade')

module.exports = React.createClass({
  render: jade`
div.combat
  if this.props.combat
    each line in this.props.combat.result
      p
        = line
`
})
