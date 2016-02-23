const Stats = require('lib/core/stats')

function levelForXp (_xp) {
  return 1
}

function statValueForLevel (level) {
  return 100 * Math.pow(1.05, level - 1)
}

function statsForLevel (level) {
  return Stats.allAt(statValueForLevel(level))
}

module.exports = function (opt = {}) {
  let xp = opt.xp || 0
  let level = levelForXp(xp)
  let stats = statsForLevel(level)
  return { xp, level, stats }
}
