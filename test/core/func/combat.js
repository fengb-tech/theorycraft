let Hero = require('tc/core/hero')
let Combat = require('tc/core/combat')

describe('tc/core/combat', () => {
  describe('#run', () => {
    it('resolves', () => {
      let hero = new Hero()
      Combat.run(hero)
    })
  })
})
