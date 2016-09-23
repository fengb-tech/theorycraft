const { request } = require('test/support')

describe('/', function () {
  this.timeout(10000)

  it('runs', () => {
    return request()
           .get('/')
           .expect(200)
  })
})
