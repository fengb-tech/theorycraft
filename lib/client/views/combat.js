const jade = require('react-jade')

module.exports = React.createClass({
  getInitialState(){
    clearInterval(this._interval)
    this._interval = setInterval(() => {
      let line = this.state.line
      this.setState({ line: line + 1 })
    }, 1000)

    return { line: 0 }
  },

  componentWillReceiveProps(newProps){
    this.setState(this.getInitialState())
  },

  render: jade`
div.combat
  if this.props.combat
    = this.props.combat.result[this.state.line]
`
})
