const React = require('react')
const jade = require('react-jade')

const HeroView = require('./hero')
const InspectView = require('./inspect')
const CombatView = require('./combat')
const ConsoleView = require('./console')

let Ui = module.exports = class Hero extends React.Component {
}

Ui.prototype.render = jade`
div.ui
  ConsoleView()
  CombatView()
  HeroView(hero=this.props.hero)
  InspectView()
`.locals({ ConsoleView, CombatView, HeroView, InspectView })
