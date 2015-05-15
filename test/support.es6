import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiGenerator from 'chai-generator'

chai
  .use(chaiProperties)
  .use(chaiGenerator)

export { expect } from 'chai'
