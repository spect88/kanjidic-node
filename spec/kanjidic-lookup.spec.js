'use strict';

var expect = require('chai').expect;

var lookup = require('../lib/kanjidic-lookup');

describe('KanjiDic Lookup', function() {
  var validInput = '私';
  var invalidInput = 'わたし';

  it('returns correct kanji data for valid input', function() {
    var output = lookup(validInput);
    expect(output).not.to.be.null;
    expect(output.kunyomi).to.include('わたし');
  });

  it('returns null on invalid input', function() {
    var output = lookup(invalidInput);
    expect(output).to.be.null;
  });
});
