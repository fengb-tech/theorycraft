const React = require('react')
const jade = require('react-jade')
const run = require('lib/util/run')

module.exports = React.createClass({
  getInitialState(){
    return { line: 0 }
  },

  componentDidMount(){
    this.isActive = true
    run.everyFrame(() => {
      if(!this.isActive){
        return false
      }

      let now = Date.now()

      let directive = this.props.combat.result[this.state.line]
      if(directive[0] <= now){
        this.setState({ line: this.state.line + 1 })
      }
    })
  },

  componentWillUnmount(){
    this.isActive = false
  },

  componentWillReceiveProps(newProps){
    this.setState(this.getInitialState())
    console.log(newProps.combat)
  },

  render: jade`
div.combat
  if this.props.combat
    = this.props.combat.result[this.state.line]
`
})
