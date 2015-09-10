const React = require('react')
const jade = require('react-jade')
const util = require('util')
const run = require('lib/util/run')
const time = require('lib/util/time')

function zeroPad(length, value){
  let valueStr = value.toString()
  while(valueStr.length < length){
    valueStr = '0' + valueStr
  }
  return valueStr
}

function humanResultLine(combat, directive){
  let date = new Date(directive.time)
  let timeStr = util.format('%s:%s:%s.%s',
    zeroPad(2, date.getHours()),
    zeroPad(2, date.getMinutes()),
    zeroPad(2, date.getSeconds()),
    Math.floor(date.getMilliseconds()/100)
  )
  switch(directive.action) {
    case 'attack':
      let action = directive.source === combat.hero ? 'attack' : 'defend'
      let damage = directive.damage || 'miss'
      if(directive.isCrit){
        damage += '**'
      }
      return `${timeStr} - ${action}: ${damage}`
    case 'recover':
      return `${timeStr} - mending wounds`
    case 'end':
      return `${timeStr} - ---`
    default:
      return `${timeStr} - ???`
  }
}

const Combat = module.exports = class Combat extends React.Component {
  constructor(){
    super()
    this.state = { lines: [] }
  }

  componentDidMount(){
    this.isAutoScrolling = true
    this.scheduleNextSync(this.props.combat)

    let node = React.findDOMNode(this)
    node.addEventListener('scroll', (_event) => {
      this.isAutoScrolling = node.scrollTop >= node.scrollHeight - node.offsetHeight
    })
  }

  componentDidUnmount(){
    run.clear(this.nextSync)
  }

  loadCombat(combat){
    this.scheduleNextSync(combat)
  }

  componentDidUpdate(){
    if(!this.isAutoScrolling){
      return
    }

    let node = React.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }

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
      while(true){ // eslint-disable-line no-constant-condition
        let directive = combat.result[l]
        if(!directive || directive.time > now){
          break
        }

        lines.push(humanResultLine(combat, directive))

        l += 1
      }

      this.setState({ lines })
      this.scheduleNextSync(combat, l)
    })
  }
}

Combat.prototype.render = jade`
div.combat
  each line, l in this.state.lines
    div(key=l)= line
`
