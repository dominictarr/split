var it = require('it-is').style('colour')
  , split = require('..')

exports ['emit mapper exceptions as error events'] = function (test) {
  var s = split(JSON.parse)
    , caughtError = false
    , rows = []
 
  s.on('error', function (err) {
    caughtError = true
  })
 
  s.on('data', function (row) { rows.push(row) })

  s.write('{"a":1}\n{"')
  it(caughtError).equal(false)
  s.write('b":2}\n{"c":}')
  it(caughtError).equal(true)
  s.end()
 
  it(rows).deepEqual([
    { a: 1 },
    { b: 2 }
  ])
 
  test.done()
}
