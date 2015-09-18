const _ = require('lodash')
const React = require('react')

exports.render = (dom, component, options) => {
  if (_.isString(dom)) {
    dom = document.querySelector(dom)
  }

  let element = React.createElement(component, options)
  return React.render(element, dom)
}
