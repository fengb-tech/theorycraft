const React = require('react')

const Hero = require('./views/hero')

const dom = document.querySelector('main')
React.render(React.createElement(Hero), dom)
