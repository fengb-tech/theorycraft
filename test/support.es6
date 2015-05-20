import chai from 'chai'
import dirtyChai from 'dirty-chai'
import chaiProperties from 'chai-properties'
import chaiGenerator from 'chai-generator'

chai
  .use(dirtyChai)
  .use(chaiProperties)
  .use(chaiGenerator)

export { expect } from 'chai'
