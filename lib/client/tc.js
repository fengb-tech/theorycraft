const React = require('react')

class Hello extends React.Component {
  render() {
    return <div>Hello, {this.props.name}!</div>
  }
}

const dom = document.querySelector('main')
React.render(<Hello name='World' />, dom)
