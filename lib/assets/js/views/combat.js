const React = require('react')
const jade = require('react-jade')
const Console = require('./console')

const Combat = module.exports = class Combat extends React.Component {
}

Combat.prototype.render = jade`
div.combat
  Console(console=this.props.controller.console)
`.locals({ Console })
