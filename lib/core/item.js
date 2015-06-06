let Stats = require('tc/lib/core/stats')

let Item = module.exports = class Item {
  constructor(options = {}){
    this.type = options.type
    this.stats = new Stats()
  }
}

Item.TYPES = ['weapon', 'shield', 'helm', 'body']
