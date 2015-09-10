const { expect, _, sinon } = require('test/support')

const compose = require('lib/util/compose')

describe('lib/util/compose', () => {
  describe('.series', () => {
    it('runs everything', () => {
      let spies = _.times(3, () => sinon.spy())
      let composed = compose.series(spies)

      composed()
      for(let spy of spies){
        expect(spy).to.have.been.called()
      }
    })

    it('runs in order', () => {
      let spies = _.times(3, () => sinon.spy())
      let composed = compose.series(spies)

      composed()
      expect(spies[1]).to.have.been.calledAfter(spies[0])
      expect(spies[2]).to.have.been.calledAfter(spies[1])
    })

    it('ignores null / undefined', () => {
      let spy = sinon.spy()
      let composed = compose.series([null, undefined, spy])

      composed()
      expect(spy).to.have.been.called()
    })

    it('returns the last result', () => {
      let composed = compose.series([() => 'foo'])

      expect(composed()).to.equal('foo')
    })

    it('forwards the arguments', () => {
      let spy = sinon.spy()
      let composed = compose.series([spy])
      let args = ['a', 'z', 113]

      composed(...args)
      expect(spy).to.have.been.calledWith(...args)
    })

    it('maintains "this"', () => {
      let spy = sinon.spy()
      let composed = compose.series([spy])

      composed.call(composed)
      expect(spy).to.have.been.calledOn(composed)

      composed.call(spy)
      expect(spy).to.have.been.calledOn(spy)
    })

    it('returns a function if it is the only one being composed', () => {
      let spy = sinon.spy()
      let composed = compose.series([null, spy, undefined])

      expect(composed).to.equal(spy)
    })
  })
})
