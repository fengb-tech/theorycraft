const React = require('react')
const jade = require('react-jade')

const HeroView = require('./hero')
const InspectView = require('./inspect')
const CombatView = require('./combat')
const ConsoleView = require('./console')

const UserController = require('../controllers/user')

let Ui = module.exports = class Hero extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  componentWillReceiveProps (props) {
    let controller = new UserController(props.hero)
    this.setState({ controller })
  }
}

Ui.prototype.render = jade`
div.ui
  ConsoleView()
  CombatView()
  HeroView(hero=this.props.hero, controller=this.state.controller)
  InspectView()
`.locals({ ConsoleView, CombatView, HeroView, InspectView })
