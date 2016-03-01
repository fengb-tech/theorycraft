const _ = require('lodash')
const Stats = require('lib/core/stats')

function levelForXp (xp) {
  return 1 + Math.floor(Math.max(0, Math.log(xp + 1) - 6))
}

function statValueForLevel (level) {
  return 100 * Math.pow(1.05, level - 1)
}

function statsForLevel (level) {
  return Stats.allAt(statValueForLevel(level))
}

function calcBase (opt = {}) {
  let xp = Math.floor(opt.xp || 0)
  let level = levelForXp(xp)
  let stats = statsForLevel(level)
  return { xp, level, stats }
}

module.exports = _.merge(calcBase, { levelForXp, statValueForLevel, statsForLevel })
