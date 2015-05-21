import chai from 'chai'
import dirtyChai from 'dirty-chai'
import chaiProperties from 'chai-properties'
import chaiGenerator from 'chai-generator'

chai
  .use(chaiProperties)
  .use(chaiGenerator)
  // TODO: dirty-chai kills the .not chain
  .use(dirtyChai)

export { expect } from 'chai'
