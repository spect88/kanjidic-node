'use strict';

var fs = require('fs');
var jconv = require('jconv');

var FILE_PATH = __dirname + '/../data/kanjidic';

function loadKanjiDic() {
  var buffer = fs.readFileSync(FILE_PATH);
  return jconv.decode(buffer, 'EUCJP');
}

module.exports = loadKanjiDic();
