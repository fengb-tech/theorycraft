const React = require('react')
const jade = require('react-jade')
const run = require('lib/util/run')
const time = require('lib/util/time')
const Console = require('./console')
const Controller = require('lib/assets/js/controllers/combat')

const Combat = module.exports = class Combat extends React.Component {
  constructor () {
    super()

    let console = []
    this.controller = new Controller({ console })
    this.state = { console }
  }

  componentDidMount () {
    this.scheduleNextSync(this.props.combat)
  }

  componentDidUnmount () {
    run.clear(this.nextSync)
  }

  loadCombat (combat) {
    this.scheduleNextSync(combat)
  }

  scheduleNextSync (combat = null) {
    if (this.nextSync) {
      run.clear(this.nextSync)
      this.nextSync = null
    }

    if (combat != null) {
      this.controller.combat = combat
    }

    if (!this.controller.isDone()) {
      run.at(this.controller.nextTime(), () => this.onSync())
    }
  }

  onSync () {
    let now = time.now()
    this.controller.syncTo(now)
    this.forceUpdate()
    this.scheduleNextSync()
  }
}

Combat.prototype.render = jade`
div.combat
  Console(lines=this.state.console)
`.locals({ Console })
