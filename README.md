# kanjidic-node

[kanjidic](http://www.edrdg.org/kanjidic/kanjidic_doc.html) is a Kanji
dictionary created by Jim Breen and maintained by
_The Electronic Dictionary Research and Development Group_.

This project is a small Node.JS wrapper around it.

### Installation

```shell
npm install kanjidic
```

### Usage

```javascript
var kanjidic = require('kanjidic');

// get data on single kanji
var ame = kanjidic.lookup('雨');

// get JSON dump of the whole database
var dump = kanjidic.toJSON();

// this can be useful for further processing:
var subset = dump.filter(function(kanjiData) {
    return kanjiData.oldJlptLevel >= 3;
  })
  .map(function(kanjiData) {
    return _(kanjiData).pick('kanji', 'kunyomi', 'onyomi', 'meaning');
  });
```

The data is returned in the following format:

```json
{
  "unicodeHexCode": "96e8",
  "radicalNumber": 173,
  "jouyouGrade": 1,
  "strokeCount": [ 8 ],
  "frequencyOfUse": 950,
  "oldJlptLevel": 4,
  "nelsonId": 5042,
  "haigId": [ 6518 ],
  "halpernId": 3561,
  "dictionaryCodes": [ "P4378", "K2218", "L2983", "N451", "O114", "A30",
    "S42", "F97", "H69", "T76", "J232", "B2.15", "G1858", "M429", "R3153" ],
  "heisigId": 422,
  "gakkenKanjiId": 655,
  "oNeillId": [ "759" ],
  "morohashiId": "42210",
  "morohashiVolumePage": "12.0001",
  "henshallId": 3,
  "kanjiAndKanaCode": 30,
  "skipPattern": "4-8-1",
  "theKanjiDictionaryCode": "8d0.1",
  "fourCornerCode": [ "1022.7" ],
  "chineseReadings": [ "yu3", "yu4" ],
  "koreanReadings": [ "u" ],
  "onyomi": [ "ウ" ],
  "kunyomi": [ "あめ", "あま-", "-さめ" ],
  "kanji": "雨",
  "jisHexCode": "312B",
  "meaning": [ "rain" ]
}
```

### License

The code itself is available under [MIT license](LICENSE), however
**[kanjidic has its own license terms](http://www.edrdg.org/edrdg/licence.html)**.
