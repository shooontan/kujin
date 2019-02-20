# Kujin

[![npm version](https://img.shields.io/npm/v/kujin.svg)](https://www.npmjs.com/package/kujin)
[![install size](https://packagephobia.now.sh/badge?p=kujin)](https://packagephobia.now.sh/result?p=kujin)
[![Build Status](https://travis-ci.com/shooontan/kujin.svg?branch=master)](https://travis-ci.com/shooontan/kujin)


## Install

```bash
# npm
$ npm install kujin kuromoji

# or yarn
$ yarn add kujin kuromoji
```

## Usage

```js
const Kujin = require('kujin')

const kujin = Kujin();

(async () => {
  const ku = await kujin.find('閑さや古池や蛙飛び込む水の音');

  /**
   * [ [ '古池', 'や' ], [ '蛙', '飛び込む' ], [ '水', 'の', '音' ] ]
   **/
  console.log(ku);
})();
```

## Documents

### Kujin Node

`Kujin` uses Node which extended [kuromoji.js](https://www.npmjs.com/package/kuromoji) ipadic feature.

```js
const node = {
  word_id: 189220,
  word_type: 'KNOWN',
  word_position: 8,
  surface_form: '句',
  pos: '名詞',
  pos_detail_1: '一般',
  pos_detail_2: '*',
  pos_detail_3: '*',
  conjugated_type: '*',
  conjugated_form: '*',
  basic_form: '句',
  reading: 'ク',
  pronunciation: 'ク',
  head: true,
  tail: true,
}
```

### Kujin(options)

```js
const kujin = Kujin({
  dicPath: 'path/to/dictionary/dir',
  noHeads: [node, node],
  noTails: [node],
  trims: [node],
  rule: [5, 7, 5],
});
```

#### dicPath : string

path to dictionary.

default: `node_modules/kuromoji/dict`

#### noHeads : Node[]

default:

```js
noHeads: [
  {
    pos: '助詞',
  },
  {
    pos: '助動詞',
  },
  {
    pos: 'フィラー',
  },
]
```

#### noTails : Node[]

default:

```js
noTails: [
  {
    pos: '動詞',
    conjugated_form: '未然形',
  },
  {
    pos: '接頭詞',
  },
]
```

#### trims : Node[]

Node filter. trims remove Nodes.

default:
```js
trims: [
  {
    pos: '記号',
  },
  {
    pos: '名詞',
    surface_form: '!',
  },
  {
    pos: '名詞',
    surface_form: '?',
  },
  {
    pos: '名詞',
    surface_form: ')',
  },
]
```

#### rule : number[]

default: `[5, 7, 5]`

parse rule.

### kujin.find(text)

`text` : `string`

find out Ku from text.

```js
/**
 *  [ [ '古池', 'や' ], [ '蛙', '飛び込む' ], [ '水', 'の', '音' ] ]
 **/
const ku = await kujin.find('閑さや古池や蛙飛び込む水の音')
```

### kujin.findAll(text)

`text` : `string`

find out all Ku from text.


```js
/**
 *  [
 *    [
 *      [ '古池', 'や' ], [ '蛙', '飛び込む' ], [ '水', 'の', '音' ]
 *    ],
 *    [
 *      [ '柿', 'く', 'へ', 'ば' ], [ '鐘', 'が', '鳴る', 'なり' ], [ '法隆寺' ]
 *    ]
 *  ]
 **/
const ku = await kujin.findAll('閑さや古池や蛙飛び込む水の音柿くへば鐘が鳴るなり法隆寺')
```
