'use strict';

var expect = require('chai').expect;

var dump = require('../lib/kanjidic-dump');

describe('KanjiDic Dump', function() {
  var output;

  beforeEach(function() {
    // slight performance optimization ;)
    if (!output) output = dump();
  });

  it('produces an array', function() {
    expect(output).to.be.a('array');
  });

  it('contains 6355 elements', function() {
    expect(output.length).to.equal(6355);
  });

  it('contains kanji data in the same order as in kanjidic', function() {
    var first = output[0];
    var last = output[output.length - 1];
    expect(first.kanji).to.equal('亜');
    expect(last.kanji).to.equal('熙');
  });
});
