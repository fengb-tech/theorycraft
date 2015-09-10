const Hero = require('lib/core/hero')
const Combat = require('lib/core/combat')

describe('lib/core/combat', () => {
  describe('#run', () => {
    it('resolves', () => {
      let hero = new Hero()
      Combat.run(hero)
    })
  })
})
