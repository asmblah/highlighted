Highlighted
===========

[![Build Status](https://secure.travis-ci.org/asmblah/highlighted.png?branch=master)](http://travis-ci.org/asmblah/highlighted)

A helper for transforming text with an AST, eg. when building syntax highlighters.

Usage
-----

See [the tests](https://github.com/asmblah/highlighted/tree/master/test) for examples.

Example
-------

In this example, the [parsing](https://github.com/asmblah/parsing) JS library is used to create a parser,
then the input code is parsed to an AST and fed to `highlighted` for highlighting using a simple spec.

```javascript

var parser = require('parsing').create({
    ignore: 'N_WHITESPACE',
    start: 'N_PROGRAM',
    rules: {
        'N_WHITESPACE': /\s+/,
        'N_STATEMENT': {
            oneOf: ['N_EXPRESSION_STATEMENT']
        },
        'N_EXPRESSION_STATEMENT': [
            {name: 'expression', rule: 'N_EXPRESSION'},
            /;/
        ],
        'N_EXPRESSION': {
            oneOf: ['N_BINARY_EXPRESSION']
        },
        'N_BINARY_EXPRESSION': [
            {name: 'left', rule: 'N_NUMBER', captureOffsetAs: 'offset'},
            {name: 'operator', what: /[+*\/-]/, captureOffsetAs: 'offset'},
            {name: 'right', rule: 'N_NUMBER', captureOffsetAs: 'offset'}
        ],
        'N_NUMBER': [
            {name: 'number', what: /\d+/, captureOffsetAs: 'offset'}
        ],
        'N_PROGRAM': [
            {name: 'statements', zeroOrMoreOf: 'N_STATEMENT'}
        ]
    }
});

var highlighter = require('highlighted').create({
    offset: function (node) {
        return node.offset.offset;
    },
    length: function (node) {
        return node.offset.length;
    },
    type: 'name',
    nodes: {
        'N_NUMBER': function (node, replace) {
            replace(node, '<span class="number">' + node.number + '</span>');
        }
    }
});

var code = '21 + 22; 23 + 24;';

var ast = parser.parse(code);

var highlightedResult = highlighter.highlight(code, ast);

console.log(highlightedResult);
```

Keeping up to date
------------------
- [Follow me on Twitter](https://twitter.com/@asmblah) for updates: [https://twitter.com/@asmblah](https://twitter.com/@asmblah)
