const _ = require('lodash')
const pubsub = require('../controllers/pubsub')

const eventable = require('lib/util/eventable')

<console>
  <div each={ line in console }>{ line }</div>

  <style scoped>
    :scope {
      display: block;
      overflow: auto;
      padding: 8px;
      border: 1px solid black;
    }
  </style>

  <script>
    this.isAutoScrolling = true
    this.console = eventable.circularBuffer(100)

    pubsub.on('combat', (combat) => {
      this.simulation = combat.simulation

      this.simulation.on('action', (action) => {
        this.console.push(humanResultLine(combat, action))
        this.update()
      })
    })

    this.on('mount', () => {
      this.root.addEventListener('scroll', (_event) => {
        this.isAutoScrolling = this.root.scrollTop >= this.root.scrollHeight - this.root.offsetHeight
      })
    })

    this.on('updated', () => {
      if (!this.isAutoScrolling) {
        return
      }

      this.root.scrollTop = this.root.scrollHeight
    })

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

    function humanResultLine (combat, action) {
      let timeStr = humanTime(action.time)
      switch (action.type) {
        case 'attack':
          let display = action.source === combat.hero ? 'attack' : 'defend'
          let damage = action.damage || 'miss'
          if (action.multiplier && action.multiplier > 1) {
            damage += _.repeat('*', action.multiplier - 1)
          }
          return `${timeStr} - ${display}: ${damage}`
        case 'recover':
          return `${timeStr} - mending wounds`
        case 'end':
          let blorks = combat.blorks
          return `${timeStr} - monster slain! gold=${blorks.gold} xp=${blorks.xp}`
        default:
          return `${timeStr} - ??? ${JSON.stringify(action)}`
      }
    }
  </script>
</console>
