#!/usr/bin/env node

var profile = require('./support').profile

var Hero = require('lib/core/hero')
var Combat = require('lib/core/combat')
var Enemy = require('lib/core/enemy')

var h = new Hero()
var e = new Enemy(1)
e.stats.armor = 10000000 // ENDLESS COMBAT

var c = new Combat(h, {
  enemies: [e],
  runTimeout: 100000000,
})
var run = c.runner()

profile(() => run.next())
