require('./ui.tag')

const riot = require('riot')

module.exports = function (game) {
  riot.mount('ui', { game })
}
