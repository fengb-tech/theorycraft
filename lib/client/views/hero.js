const React = require('react')
const jade = require('react-jade')

const Hero = require('tc/lib/core/hero')

const StatsView = require('./stats')

module.exports = React.createClass({
  getInitialState(){
    return {
      hero: new Hero(1),
    }
  },

  render: jade.compile(`
div.hero
  StatsView(stats=this.state.hero.stats)
`)
})
