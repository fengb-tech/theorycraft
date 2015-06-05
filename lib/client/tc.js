const React = require('react')
const jade = require('react-jade')

const Hello = React.createClass({
  render: jade.compile(`
div
  | Hello,
  = this.props.name
`)
})

const dom = document.querySelector('main')
React.render(React.createElement(Hello, {name: 'World'}), dom)
