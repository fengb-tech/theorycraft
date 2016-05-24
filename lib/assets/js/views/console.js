const React = require('react')
const jade = require('react-jade')
const Listener = require('./listener')
const pubsub = require('../controllers/pubsub')

const eventable = require('lib/util/eventable')

function zeroPad (length, value) {
  let valueStr = value.toString()
  while (valueStr.length < length) {
    valueStr = '0' + valueStr
  }
  return valueStr
}

function humanTime (timeValue) {
  let date = new Date(timeValue)
  return zeroPad(2, date.getHours()) + ':' +
         zeroPad(2, date.getMinutes()) + ':' +
         zeroPad(2, date.getSeconds()) + '.' +
         Math.floor(date.getMilliseconds() / 100)
}

function humanResultLine (hero, action) {
  let timeStr = humanTime(action.time)
  switch (action.type) {
    case 'attack':
      let display = action.source === hero ? 'attack' : 'defend'
      let damage = action.damage || 'miss'
      return `${timeStr} - ${display}: ${damage}`
    case 'recover':
      return `${timeStr} - mending wounds`
    case 'end':
      return `${timeStr} - ---`
    default:
      return `${timeStr} - ??? ${JSON.stringify(action)}`
  }
}

const Console = module.exports = class Console extends Listener {
  constructor () {
    super()
    this.console = eventable.circularBuffer(100)

    pubsub.on('combat', (combat) => {
      this.simulation = combat.simulation

      this.simulation.on('action', (action) => {
        this.console.push(humanResultLine(combat.hero, action))
        this.forceUpdate()
      })
    })
  }

  componentDidMount () {
    super.componentDidMount()

    this.isAutoScrolling = true

    let node = React.findDOMNode(this)
    node.addEventListener('scroll', (_event) => {
      this.isAutoScrolling = node.scrollTop >= node.scrollHeight - node.offsetHeight
    })
  }

  componentDidUpdate () {
    if (!this.isAutoScrolling) {
      return
    }

    let node = React.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }
}

Console.prototype.render = jade`
div.console
  each line in this.console
    div(key=line)= line
`
