const React = require('react')
const jade = require('react-jade')

const Console = module.exports = class Console extends React.Component {
  constructor () {
    super()
  }

  componentDidMount () {
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
  each line, l in this.props.lines
    div(key=l)= line
`
