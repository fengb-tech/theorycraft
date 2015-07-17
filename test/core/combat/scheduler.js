let { expect } = require('test/support')

let createSchedule = require('lib/core/combat/scheduler')

describe('core/combat/scheduler', () => {
  it('schedules based on attackDelay', () => {
    let attackers = [
      { attackDelay: 2000, initiative: 0 },
      { attackDelay: 3000, initiative: 0 },
    ]
    let schedule = createSchedule(0, attackers)

    expect(schedule).to.deep.yield([   0, [attackers[0], attackers[1]]])
    expect(schedule).to.deep.yield([2000, [attackers[0]]])
    expect(schedule).to.deep.yield([3000, [attackers[1]]])
    expect(schedule).to.deep.yield([4000, [attackers[0]]])
    expect(schedule).to.deep.yield([6000, [attackers[0], attackers[1]]])
  })

  it('schedules initiative earlier', () => {
    let attackers = [
      { attackDelay: 2000, initiative: 1 },
      { attackDelay: 3000, initiative: 2 },
    ]
    let schedule = createSchedule(0, attackers)

    expect(schedule).to.deep.yield([  -2, [attackers[1]]])
    expect(schedule).to.deep.yield([  -1, [attackers[0]]])
    expect(schedule).to.deep.yield([1999, [attackers[0]]])
    expect(schedule).to.deep.yield([2998, [attackers[1]]])
  })

  describe('bad input', () => {
    it('dies if no attackers', () => {
      let schedule = createSchedule(0)
      expect(() => schedule.next()).to.throw(TypeError)
    })

    it('dies if attacker has no attackDelay', () => {
      let schedule = createSchedule(0, [{ initiative: 0 }])
      expect(() => schedule.next()).to.throw(TypeError)
    })

    it('dies if attacker has no initiative', () => {
      let schedule = createSchedule(0, [{ attackDelay: 1000 }])
      expect(() => schedule.next()).to.throw(TypeError)
    })
  })
})
