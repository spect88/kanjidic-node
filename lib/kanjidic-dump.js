'use strict';

var kanjidic = require('./kanjidic');
var parseLine = require('./kanjidic-line-parser');

module.exports = function kanjidicDump() {
  var lines = kanjidic.split('\n').slice(1, -1);
  return lines.map(parseLine)
    .filter(function(kanjiDef) { return kanjiDef != null; });
};
