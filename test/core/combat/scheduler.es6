import { expect } from 'tc-test/support'

import createSchedule from 'tc/core/combat/scheduler'

describe('core/combat/scheduler', () => {
  it('schedules based on attackMspa', () => {
    let schedule = createSchedule([
      { attackMspa: 2000, initiative: 0 },
      { attackMspa: 3000, initiative: 0 },
    ])

    expect(schedule).to.yield([   0, [0, 1]])
    expect(schedule).to.yield([2000, [0]])
    expect(schedule).to.yield([3000, [1]])
    expect(schedule).to.yield([4000, [0]])
    expect(schedule).to.yield([6000, [0, 1]])
  })

  it('schedules initiative earlier', () => {
    let schedule = createSchedule([
      { attackMspa: 2000, initiative: 1 },
      { attackMspa: 3000, initiative: 2 },
    ])

    expect(schedule).to.yield([  -2, [1]])
    expect(schedule).to.yield([  -1, [0]])
    expect(schedule).to.yield([1999, [0]])
    expect(schedule).to.yield([2998, [1]])
  })
})
