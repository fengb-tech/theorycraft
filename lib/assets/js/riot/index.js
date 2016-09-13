require('./ui.tag')

const _ = require('lodash')
const riot = require('riot')

riot.mixin({
  css (obj) {
    return _(obj).map((value, key) => `${key}: ${value}`).join(';')
  },

  px (number) {
    return (number || 0) + 'px'
  },
})

module.exports = function (game) {
  riot.mount('ui', { game })
}
