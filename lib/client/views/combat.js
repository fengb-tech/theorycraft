const jade = require('react-jade')
const run = require('tc/lib/util/run')

module.exports = React.createClass({
  getInitialState(){
    run.clearEvery(this._interval)
    this._interval = run.every(1000, () => {
      let line = this.state.line
      this.setState({ line: line + 1 })
    })

    return { line: 0 }
  },

  componentWillReceiveProps(newProps){
    this.setState(this.getInitialState())
    console.log(newProps.combat)
  },

  render: jade`
div.combat
  if this.props.combat
    if this.state.line == 0
      p INITIAL
    = this.props.combat.result[this.state.line]
`
})
