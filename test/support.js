let chai = require('chai')

chai
  .use(require('chai-properties'))
  .use(require('chai-generator'))
  .use(require('chai-eventemitter'))
  // TODO: dirty-chai kills the .not chain
  .use(require('dirty-chai'))
  .use(require('sinon-chai'))

exports.expect = chai.expect
exports.sinon = require('sinon')
exports._ = require('lodash')
