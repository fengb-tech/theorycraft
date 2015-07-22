const React = require('react')
const jade = require('react-jade')
const run = require('lib/util/run')
const time = require('lib/util/time')

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

      let now = time.now()

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

  humanResultLine(num){
    let directive = this.props.combat.result[num]
    switch(directive[1]){
      case 'attack':
        let attacker = directive[2]
        let damage = directive[4] || 'miss'
        if(attacker === this.props.combat.hero){
          return `attack: ${damage}`
        } else {
          return `defend: ${damage}`
        }
      case 'recover': case 'mend':
        return 'mending wounds'
      case 'end':
        return '---'
      default:
        return '???'
    }
  },

  render: jade`
div.combat
  if this.props.combat
    each l in _.range(this.state.line + 1).reverse()
      div(key=l)= this.humanResultLine(l)
`
})
