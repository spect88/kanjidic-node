'use strict';

var kanjidic = require('./kanjidic');
var parseLine = require('./kanjidic-line-parser');

function appendKanji(lookupTable, kanjiLine) {
  var kanji = kanjiLine.split(' ')[0];
  lookupTable[kanji] = kanjiLine;
  return lookupTable;
}

function createLookupTable() {
  var lines = kanjidic.split('\n');
  return lines.reduce(appendKanji, {});
}

var lookupTable = createLookupTable();

module.exports = function kanjidicLookup(kanji) {
  var line = lookupTable[kanji];
  if (!line) return null;
  return parseLine(line);
};
