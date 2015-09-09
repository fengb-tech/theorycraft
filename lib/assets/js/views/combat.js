const React = require('react')
const jade = require('react-jade')
const run = require('lib/util/run')
const time = require('lib/util/time')

module.exports = React.createClass({
  getInitialState(){
    return {
      lines: [],
    }
  },

  componentDidMount(){
    this.isAutoScrolling = true
    this.scheduleNextSync(this.props.combat)

    let node = React.findDOMNode(this)
    node.addEventListener('scroll', (event) => {
      this.isAutoScrolling = node.scrollTop >= node.scrollHeight - node.offsetHeight
    })
  },

  scheduleNextSync(combat, l = 0){
    if(this.nextSync){
      run.clear(this.nextSync)
      this.nextSync = null
    }

    if(!combat){
      return
    }

    let directive = combat.result[l]
    if(!directive){
      return
    }

    this.nextSync = run.at(directive.time, () => {
      let now = time.now()
      let lines = this.state.lines
      while(true){
        let directive = combat.result[l]
        if(!directive || directive.time > now){
          break
        }

        lines.push(this.humanResultLine(directive))

        l += 1
      }

      this.setState({ lines })
      this.scheduleNextSync(combat, l)
    })
  },

  componentWillReceiveProps(newProps){
    if(newProps.combat){
      this.scheduleNextSync(newProps.combat)
    }
  },

  humanResultLine(directive){
    switch(directive.action) {
      case 'attack':
        let damage = directive.damage || 'miss'
        let action = directive.source === this.props.combat.hero ? 'attack' : 'defend'
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
  each line, l in this.state.lines
    div(key=l)= line
`
})
