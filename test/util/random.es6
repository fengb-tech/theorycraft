import { expect } from 'chai'

import * as Random from 'tc/util/random'

describe('tc/util/random', () => {
  describe('randomInt()', () => {
    let min = 1
    let max = 10

    it('returns numbers within range', () => {
      for(let i=0; i < 100; i++){
        let num = Random.randomInt(min, max)
        expect(num).to.be.at.least(1)
        expect(num).to.be.at.most(10)
      }
    })

    it('returns numbers on the bounds', () => {
      let generated = {}
      for(let i=0; i < 100; i++){
        let num = Random.randomInt(min, max)
        generated[num] = true
      }
      expect(generated).to.contain.all.keys(min.toString(), max.toString())
    })
  })
})
