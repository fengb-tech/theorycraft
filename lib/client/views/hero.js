const React = require('react')
const jade = require('react-jade')

const Hero = require('tc/lib/core/hero')

module.exports = React.createClass({
  getInitialState(){
    return {
      hero: new Hero(1),
    }
  },

  render: jade.compile(`
div.hero
  div.stats
    each value, name in this.state.hero.stats
      dl.stat(key=name)
        dt.name
          = name
        dd.value
          = value
`)
})
