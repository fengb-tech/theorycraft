const { expect } = require('test/support')
const Hero = require('lib/core/hero')
const Combat = require('lib/core/combat')

describe('lib/core/combat', () => {
  describe('#run', () => {
    it('resolves', () => {
      let hero = new Hero()
      let combat = Combat.run(hero)
      expect(combat.drops.length).to.equal(1)
    })
  })
})
