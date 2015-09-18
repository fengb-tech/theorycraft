const React = require('react')
const jade = require('react-jade')
const eventable = require('lib/util/eventable')
const Console = require('./console')
const Controller = require('lib/assets/js/controllers/combat')

const Combat = module.exports = class Combat extends React.Component {
  constructor () {
    super()

    this.console = eventable.circularBuffer(100)
    this.controller = new Controller({ console: this.console })
  }

  componentDidMount () {
    this.controller.startAutoSync()
  }

  componentDidUnmount () {
    this.controller.stopAutoSync()
  }

  loadCombat (combat) {
    this.controller.combat = combat
  }
}

Combat.prototype.render = jade`
div.combat
  Console(console=this.console)
`.locals({ Console })
