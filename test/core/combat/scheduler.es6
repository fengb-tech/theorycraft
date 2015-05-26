import { expect } from 'tc-test/support'

import createSchedule from 'tc/core/combat/scheduler'

describe('core/combat/scheduler', () => {
  it('schedules based on attackMspa', () => {
    let attackers = [
      { attackMspa: 2000, initiative: 0 },
      { attackMspa: 3000, initiative: 0 },
    ]
    let schedule = createSchedule(attackers)

    expect(schedule).to.deep.yield([   0, [attackers[0], attackers[1]]])
    expect(schedule).to.deep.yield([2000, [attackers[0]]])
    expect(schedule).to.deep.yield([3000, [attackers[1]]])
    expect(schedule).to.deep.yield([4000, [attackers[0]]])
    expect(schedule).to.deep.yield([6000, [attackers[0], attackers[1]]])
  })

  it('schedules initiative earlier', () => {
    let attackers = [
      { attackMspa: 2000, initiative: 1 },
      { attackMspa: 3000, initiative: 2 },
    ]
    let schedule = createSchedule(attackers)

    expect(schedule).to.deep.yield([  -2, [attackers[1]]])
    expect(schedule).to.deep.yield([  -1, [attackers[0]]])
    expect(schedule).to.deep.yield([1999, [attackers[0]]])
    expect(schedule).to.deep.yield([2998, [attackers[1]]])
  })

  describe('bad input', () => {
    it('dies if no attackers', () => {
      let schedule = createSchedule()
      expect(() => schedule.next()).to.throw(TypeError)
    })

    it('dies if attacker has no attackMspa', () => {
      let schedule = createSchedule([{ initiative: 0 }])
      expect(() => schedule.next()).to.throw(TypeError)
    })

    it('dies if attacker has no initiative', () => {
      let schedule = createSchedule([{ attackMspa: 1000 }])
      expect(() => schedule.next()).to.throw(TypeError)
    })
  })
})
