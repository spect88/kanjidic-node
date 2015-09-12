'use strict';

var expect = require('chai').expect;

var kana = require('../lib/kana');

describe('Kana utility', function() {
  it('identifies hiragana', function() {
    expect(kana.isHiragana('よ')).to.be.true;
    expect(kana.isHiragana('ヨ')).to.be.false;
    expect(kana.isHiragana('良')).to.be.false;
    expect(kana.isHiragana('y')).to.be.false;
  });

  it('identifies katakana', function() {
    expect(kana.isKatakana('よ')).to.be.false;
    expect(kana.isKatakana('ヨ')).to.be.true;
    expect(kana.isKatakana('良')).to.be.false;
    expect(kana.isKatakana('y')).to.be.false;
  });

  it('identifies kana', function() {
    expect(kana.isKana('よ')).to.be.true;
    expect(kana.isKana('ヨ')).to.be.true;
    expect(kana.isKana('良')).to.be.false;
    expect(kana.isKana('y')).to.be.false;
  });
});
