var it = require('it-is').style('colour')
  , split = require('..')

exports ['split data with partitioned unicode character'] = function (test) {
  var s = split(/,/g)
    , caughtError = false
    , rows = []

  s.on('error', function (err) {
    caughtError = true
  })
 
  s.on('data', function (row) { rows.push(row) })

  unicodeData = new Buffer('テスト試験今日とても,よい天気で');

  // partition of 日
  piece1 = unicodeData.slice(0, 20);
  piece2 = unicodeData.slice(20, unicodeData.length);

  s.write(piece1);
  s.write(piece2);

  s.end()

  it(caughtError).equal(false)
  it(rows).deepEqual(['テスト試験今日とても', 'よい天気で']);

  test.done()
}