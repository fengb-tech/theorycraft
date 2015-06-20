#!/usr/bin/env babel-node

require('../env')

let Benchmark = require('benchmark')
let Hero = require('lib/core/hero')
let Combat = require('lib/core/combat')
let Enemy = require('lib/core/enemy')

let h = new Hero()
let e = new Enemy(1)
e.stats.armor = 10000000 // ENDLESS COMBAT

let c = new Combat(h, {
  enemies: [e],
  runTimeout: 100000000,
})
let run = c.runner()

new Benchmark.Suite()
  .add('combat', () => run.next())
  .on('cycle', (event) => console.log(String(event.target)))
  .run({ 'async': true })
