'use strict';

var kana = require('./kana');

// See http://www.csse.monash.edu.au/~jwb/kanjidic_doc.html for documentation
var FIELDS = [
  {
    pattern: /^B(\d+)$/,
    name: 'radicalNumber',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^C(\d+)$/,
    name: 'classicalRadicalNumber',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^F(\d+)$/,
    name: 'frequencyOfUse',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^G(\d+)$/,
    name: 'jouyouGrade',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^J(\d+)$/,
    name: 'oldJlptLevel',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^H(\d+)$/,
    name: 'halpernId',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^N(\d+)$/,
    name: 'nelsonId',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^V(\d+)$/,
    name: 'haigId',
    type: 'number',
    multiple: true
  },
  {
    pattern: /^D(.+)$/,
    name: 'dictionaryCodes',
    type: 'string',
    multiple: true
  },
  {
    pattern: /^P(\d+-\d+-\d+)$/,
    name: 'skipPattern',
    type: 'string',
    multiple: false
  },
  {
    pattern: /^S(\d+)$/,
    name: 'strokeCount',
    type: 'number',
    multiple: true
  },
  {
    pattern: /^U([A-Fa-f0-9]+)$/,
    name: 'unicodeHexCode',
    type: 'string',
    multiple: false
  },
  {
    pattern: /^I(\d+[a-z]+\d+\.\d+(-2)?)$/,
    name: 'theKanjiDictionaryCode',
    type: 'string',
    multiple: false
  },
  {
    pattern: /^IN(\d+)$/,
    name: 'kanjiAndKanaCode',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^Q(\d+\.\d+)$/,
    name: 'fourCornerCode',
    type: 'string',
    multiple: true
  },
  {
    pattern: /^MN(\d+P?X?)$/,
    name: 'morohashiId',
    type: 'string',
    multiple: false
  },
  {
    pattern: /^MP(\d+\.\d+)$/,
    name: 'morohashiVolumePage',
    type: 'string',
    multiple: false
  },
  {
    pattern: /^E(\d+)$/,
    name: 'henshallId',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^K(\d+)$/,
    name: 'gakkenKanjiId',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^L(\d+)$/,
    name: 'heisigId',
    type: 'number',
    multiple: false
  },
  {
    pattern: /^O(\d+A?)$/,
    name: 'oNeillId',
    type: 'string',
    multiple: true
  },
  {
    pattern: /^W(.+)$/,
    name: 'koreanReadings',
    type: 'string',
    multiple: true
  },
  {
    pattern: /^Y(.+)$/,
    name: 'chineseReadings',
    type: 'string',
    multiple: true
  },
  {
    pattern: /^X(.+)$/,
    name: 'crossReferences',
    type: 'string',
    multiple: true
  },
  {
    pattern: /^Z(.+)$/,
    name: 'misclassifications',
    type: 'string',
    multiple: true
  },
  {
    pattern: /^T(1|2)$/,
    name: 'nanoriMarker',
    type: 'number',
    multiple: false
  }
];

function encounteredNanoriMarker(parsedFields) {
  return parsedFields.some(function (field) {
    return field.name === 'nanoriMarker';
  });
}

function isKana(kanjiDicField) {
  return kana.isKana(kanjiDicField[0]) ||
    (kanjiDicField[0] === '-' && kana.isKana(kanjiDicField[1]));
}

function categorizeKana(parsedFields, kanjiDicField) {
  if (encounteredNanoriMarker(parsedFields)) {
    return {
      name: 'nanori',
      value: kanjiDicField,
      multiple: true
    };
  }

  var kanaCharacter = kanjiDicField[0] === '-' ?
    kanjiDicField[1] : kanjiDicField[0];

  if (kana.isHiragana(kanaCharacter)) {
    return {
      name: 'kunyomi',
      value: kanjiDicField,
      multiple: true
    };
  }

  if (kana.isKatakana(kanaCharacter)) {
    return {
      name: 'onyomi',
      value: kanjiDicField,
      multiple: true
    };
  }

  throw new Error("Couldn't identify kana: " + kanjiDicField);
}

function parseField(parsedFields, kanjiDicField) {
  if (!kanjiDicField) return parsedFields;

  var result;

  FIELDS.forEach(function (knownField) {
    var match = kanjiDicField.match(knownField.pattern);
    if (match) {
      result = {
        name: knownField.name,
        value: knownField.type === 'number' ? Number(match[1]) : match[1],
        multiple: knownField.multiple
      };
    }
  });

  if (!result && isKana(kanjiDicField)) {
    result = categorizeKana(parsedFields, kanjiDicField);
  }

  if (!result) {
    throw new Error("Couldn't parse field: " + kanjiDicField);
  }

  parsedFields.push(result);

  return parsedFields;
}

function formatResult(parsedFields) {
  return parsedFields.reduce(function(output, field) {
    var key = field.name;

    if (output[key]) {
      if (!field.multiple) {
        throw new Error('Multiple field definitions: ' + field.name);
      }
      output[key].push(field.value);
    } else {
      output[key] = field.multiple ? [field.value] : field.value;
    }

    return output;
  }, {});
}

function parseLine(kanjiDicLine) {
  if (kanjiDicLine.match(/^\s*(#|$)/)) return null;

  var meanings = kanjiDicLine.match(/\{.+?\}/g) || [];
  var lineWithoutMeanings = kanjiDicLine.replace(/\{.+?}/g, '');

  var fields = lineWithoutMeanings.split(/\s+/);

  var kanji = fields[0];
  var jisHexCode = fields[1];

  var parsedFields = fields.slice(2)
    .reduce(parseField, [])
    .filter(function (f) { return f && f.name !== 'nanoriMarker'; });

  parsedFields.push({ name: 'kanji', value: kanji, multiple: false });
  parsedFields.push({ name: 'jisHexCode', value: jisHexCode, multiple: false });

  meanings.forEach(function(meaningInBrackets) {
    var meaning = meaningInBrackets.substr(1, meaningInBrackets.length - 2);
    parsedFields.push({ name: 'meaning', value: meaning, multiple: true });
  });

  return formatResult(parsedFields);
}

module.exports = parseLine;
