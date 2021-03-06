const _ = require('lodash')
const chai = require('chai')
  .use(require('chai-properties'))
  .use(require('chai-generator'))
  .use(require('chai-eventemitter'))
  // TODO: dirty-chai kills the .not chain
  .use(require('dirty-chai'))
  .use(require('sinon-chai'))

module.exports = {
  expect: chai.expect,
  EPS: 0.001,
  _: _,
  sinon: require('sinon'),
  request: _.once(() => {
    const supertest = require('supertest')
    const app = require('lib/server')
    return supertest(app.callback())
  })
}
