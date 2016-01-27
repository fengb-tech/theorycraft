module.exports = class User {
  click (target, key) {
    if (this.target === target && this.key === key) {
      this.deselect()
    } else if (this.hasSelection()) {
      let swap = this.target[this.key]
      this.target[this.key] = target[key]
      target[key] = swap

      this.target.emit('change')
      target.emit('change')

      this.deselect()
    } else {
      this.target = target
      this.key = key
    }
  }

  hasSelection () {
    return this.target != null
  }

  deselect () {
    this.target = null
    this.key = null
  }
}
