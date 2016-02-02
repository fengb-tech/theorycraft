module.exports = {
  randomize: {
    attackDelay: [-0.3, 0.3],
    maxDamage: [-0.3, 0.3],
  },
  empty: {
    name: 'fist',
    attackDelay: 500,
    minDamage: 100,
    maxDamage: 400,
  },
  templates: [
    {
      names: ['dagger', 'sword', 'hatchet', 'spear'],
      attackDelay: 1000,
      minDamage: 300,
      maxDamage: 700,
    },
    {
      names: ['club'],
      attackDelay: 1000,
      minDamage: 400,
      maxDamage: 600,
    },
    {
      names: ['axe', 'pike'],
      attackDelay: 1800,
      minDamage: 540,
      maxDamage: 1260,
    },
    {
      names: ['mace', 'hammer'],
      attackDelay: 1800,
      minDamage: 720,
      maxDamage: 1080,
    },
  ],
}
