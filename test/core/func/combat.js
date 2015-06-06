let Hero = require('tc/lib/core/hero')
let Combat = require('tc/lib/core/combat')

describe('tc/lib/core/combat', () => {
  describe('#run', () => {
    it('resolves', () => {
      let hero = new Hero()
      Combat.run(hero)
    })
  })
})
