const React = require('react')
const jade = require('react-jade')
const run = require('lib/util/run')
const time = require('lib/util/time')

module.exports = React.createClass({
  getInitialState(){
    return {
      nextLine: 0,
      lines: [],
    }
  },

  componentDidMount(){
    this.isActive = true
    this.isAutoScrolling = true
    run.everyFrame(() => {
      if(!this.isActive){
        return false
      }

      let now = time.now()

      let directive = this.props.combat.result[this.state.nextLine]
      if(directive[0] <= now){
        let lines = this.state.lines
        lines.push(this.humanResultLine(directive))

        this.setState({
          nextLine: this.state.nextLine + 1,
          lines: lines,
        })
      }
    })

    let node = React.findDOMNode(this)
    node.addEventListener('scroll', (event) => {
      this.isAutoScrolling = node.scrollTop >= node.scrollHeight - node.offsetHeight
    })
  },

  componentWillUnmount(){
    this.isActive = false
  },

  componentWillReceiveProps(newProps){
    this.setState({ nextLine: 0 })
    console.log(newProps.combat)
  },

  humanResultLine(directive){
    switch(directive[1]){
      case 'attack':
        let damage = directive[4] || 'miss'
        let action = directive[2] === this.props.combat.hero ? 'attack' : 'defend'
        return `${action}: ${damage}`
      case 'recover': case 'mend':
        return 'mending wounds'
      case 'end':
        return '---'
      default:
        return '???'
    }
  },

  componentDidUpdate(){
    if(!this.isAutoScrolling){
      return
    }

    let node = React.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  },

  render: jade`
div.combat
  if this.props.combat
    each line, l in this.state.lines
      div(key=l)= line
`
})
