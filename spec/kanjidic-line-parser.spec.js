'use strict';

var expect = require('chai').expect;

var parseLine = require('../lib/kanjidic-line-parser');

describe('KanjiDic Line Parser', function() {
  var input =
    '娃 3023 U5a03 B38 G9 S9 V1213 DP419 DL313 L2200 DN2313 MN6262 MP3.0707 ' +
    'P1-3-6 I3e6.5 Q4441.4 Ywa2 Wwae Wwa ア アイ ワ うつく.しい T1 い ' +
    '{beautiful} ';
  var output;

  beforeEach(function() {
    output = parseLine(input);
  });

  it('extracts kanji', function() {
    expect(output.kanji).to.equal('娃');
  });

  it('extracts unicode hexcode', function() {
    expect(output.unicodeHexCode).to.equal('5a03');
  });

  it('extracts jouyou grade', function() {
    expect(output.jouyouGrade).to.equal(9);
  });

  it('extracts radical number', function() {
    expect(output.radicalNumber).to.equal(38);
  });

  it('extracts stroke count', function() {
    expect(output.strokeCount).to.deep.equal([9]);
  });

  it('extracts Chinese readings', function() {
    expect(output.chineseReadings).to.deep.equal(['wa2']);
  });

  it('extracts Korean readings', function() {
    expect(output.koreanReadings).to.deep.equal(['wae', 'wa']);
  });

  it('extracts onyomi', function() {
    expect(output.onyomi).to.deep.equal(['ア', 'アイ', 'ワ']);
  });

  it('extracts kunyomi', function() {
    expect(output.kunyomi).to.deep.equal(['うつく.しい']);
  });

  it('extracts nanori', function() {
    expect(output.nanori).to.deep.equal(['い']);
  });

  it('extracts meaning', function() {
    expect(output.meaning).to.deep.equal(['beautiful']);
  });

  it('extracts miscellaneous fields', function() {
    expect(output).to.include.keys([
      'haigId', 'dictionaryCodes', 'heisigId', 'morohashiId',
      'morohashiVolumePage', 'skipPattern', 'theKanjiDictionaryCode',
      'fourCornerCode', 'jisHexCode'
    ]);
  });
});
