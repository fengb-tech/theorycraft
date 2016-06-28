module.exports = {
  randomize: {
    attackDelay: 1.0,
    maxDamage: 0.4,
  },
  empty: {
    name: 'fist',
    attackDelay: 200,
    minDamage: 100,
    maxDamage: 300,
  },
  templates: [
    {
      names: ['dagger', 'sword', 'hatchet', 'spear'],
      attackDelay: 300,
      minDamage: 200,
      maxDamage: 400,
    },
    {
      names: ['club'],
      attackDelay: 300,
      minDamage: 300,
      maxDamage: 300,
    },
    {
      names: ['axe', 'pike'],
      attackDelay: 700,
      minDamage: 450,
      maxDamage: 950,
    },
    {
      names: ['mace', 'hammer'],
      attackDelay: 700,
      minDamage: 700,
      maxDamage: 700,
    },
  ],
}
