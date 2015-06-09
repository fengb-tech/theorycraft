const HeroView = require('./views/hero')
const Hero = require('tc/lib/core/hero')

const dom = document.querySelector('main')

let hero = new Hero(1)

React.render(React.createElement(HeroView, { hero }), dom)
