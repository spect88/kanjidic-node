'use strict';

function isHiragana(character) {
  var charCode = character.charCodeAt(0);
  return charCode > 0x3041 && charCode < 0x3096;
}

function isKatakana(character) {
  var charCode = character.charCodeAt(0);
  return charCode > 0x30A1 && charCode < 0x30FA;
}

function isKana(character) {
  return isHiragana(character) || isKatakana(character);
}

module.exports = {
  isHiragana: isHiragana,
  isKatakana: isKatakana,
  isKana: isKana
};
