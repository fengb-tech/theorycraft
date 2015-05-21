import _ from 'lodash'

import { expect } from 'tc-test/support'
import { Combat } from 'tc/core/combat'

describe('tc/core/combat', () => {
  describe('#run', () => {
    beforeEach(function(){
      this.combat = _.extend(new Combat({}, []), {
        schedule: [],
        isDone: () => false,
        duelFor: (attacker) => attacker
      })
      this.combatRunner = this.combat.run()
    })

    it('terminates when isDone = true', function(){
      this.combat.isDone = () => true
      expect(this.combatRunner).to.return()
    })

    it('duels for scheduled attacker', function(){
      let attacker = { hp: 1 }
      this.combat.schedule.push([10, [attacker]])
      expect(this.combatRunner).to.yield([10, [attacker]])
    })

    it('ignores attackers with no hp', function(){
      let attacker = { hp: 0 }
      this.combat.schedule.push([10, [attacker]])
      expect(this.combatRunner).not.to.yield([10, [attacker]])
    })
  })
})
