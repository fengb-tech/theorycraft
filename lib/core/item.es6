import Stats from 'tc/core/stats'

export default class Item {
  constructor(options = {}){
    this.type = options.type
    this.stats = new Stats()
  }
}

Item.TYPES = ['weapon', 'shield', 'helm', 'body']
