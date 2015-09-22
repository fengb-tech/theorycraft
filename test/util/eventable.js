const { expect, _ } = require('test/support')

const eventable = require('lib/util/eventable')

describe('lib/util/eventable', () => {
  describe('circularBuffer', () => {
    it('behaves like an array', () => {
      let buff = eventable.circularBuffer(10)
      buff[0] = 1
      buff[1] = 5
      expect(_.toArray(buff)).to.deep.equal([1, 5])
    })

    it('throws events for mutation', () => {
      let buff = eventable.circularBuffer(10)

      expect(() => buff.push(4, 2)).to.cause(buff).to.emit('push', 4, 2)
      expect(_.toArray(buff)).to.eql([4, 2])

      expect(() => buff.pop()).to.cause(buff).to.emit('pop')
      expect(_.toArray(buff)).to.deep.equal([4])

      expect(() => buff.unshift(8, 1)).to.cause(buff).to.emit('unshift', 8, 1)
      expect(_.toArray(buff)).to.deep.equal([8, 1, 4])

      expect(() => buff.shift()).to.cause(buff).to.emit('shift')
      expect(_.toArray(buff)).to.deep.equal([1, 4])

      expect(() => buff.reverse()).to.cause(buff).to.emit('reverse')
      expect(_.toArray(buff)).to.deep.equal([4, 1])

      expect(() => buff.sort()).to.cause(buff).to.emit('sort')
      expect(_.toArray(buff)).to.deep.equal([1, 4])
    })

    it('rotates elements off the front when too many', () => {
      let buff = eventable.circularBuffer(3, [1, 2, 3])
      expect(_.toArray(buff)).to.deep.equal([1, 2, 3])

      buff.push(4)
      expect(_.toArray(buff)).to.deep.equal([2, 3, 4])

      buff.push(5, 6)
      expect(_.toArray(buff)).to.deep.equal([4, 5, 6])
    })
  })
})