const { expect, sinon } = require('test/support')

const EventEmitter = require('eventemitter3')
const Listener = require('lib/assets/js/views/listener')

describe('lib/assets/js/views/listener', () => {
  class Tester extends Listener {
    constructor(props){
      super()
      this._listenOn = { emitter: 'update' }
      this.props = props
    }
  }

  beforeEach(function(){
    this.emitter = new EventEmitter()
    this.tester = new Tester({ emitter: this.emitter })
    this.tester.forceUpdate = sinon.spy()
  })

  it('wires up forceUpdate after componentDidMount', function(){
    this.tester.componentDidMount()

    this.emitter.emit('update')
    expect(this.tester.forceUpdate).to.have.been.called()
  })

  it('ignores forceUpdate after componentWillUnmount', function(){
    this.tester.componentDidMount()
    this.tester.componentWillUnmount()

    this.emitter.emit('update')
    expect(this.tester.forceUpdate).not.to.have.been.called()
  })

  it('swaps forceUpdate listener after componentWillReceiveProps', function(){
    this.tester.componentDidMount()
    let emitter = new EventEmitter()
    this.tester.componentWillReceiveProps({ emitter })

    this.emitter.emit('update')
    expect(this.tester.forceUpdate).not.to.have.been.called()

    emitter.emit('update')
    expect(this.tester.forceUpdate).to.have.been.called()
  })
})
