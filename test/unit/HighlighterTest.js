/*
 * Highlighted - Text transformation helper
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/highlighted
 *
 * Released under the MIT license
 * https://github.com/asmblah/highlighted/raw/master/MIT-LICENSE.txt
 */

'use strict';

var Highlighter = require('../../src/Highlighter');

describe('Highlighter', function () {
    it('should support highlighting a simple piece of text with AST', function () {
        var highlighter = new Highlighter({
                offset: function (node) {
                    return node.offset.offset;
                },
                length: function (node) {
                    return node.offset.length;
                },
                type: 'name',
                nodes: {
                    'N_NUMBER': function (node, replace) {
                        replace(node, '[num]' + node.number + '[/num]');
                    }
                }
            }),
            ast = {
                'statements': [
                    {
                        'expression': {
                            'left': {
                                'number': '21',
                                'offset': {
                                    'length': 2,
                                    'line': 1,
                                    'offset': 0
                                },
                                'name': 'N_NUMBER'
                            },
                            'offset': {
                                'length': 2,
                                'line': 1,
                                'offset': 5
                            },
                            'operator': '+',
                            'right': {
                                'number': '22',
                                'offset': {
                                    'length': 2,
                                    'line': 1,
                                    'offset': 5
                                },
                                'name': 'N_NUMBER'
                            },
                            'name': 'N_BINARY_EXPRESSION'
                        },
                        'name': 'N_EXPRESSION_STATEMENT'
                    },
                    {
                        'expression': {
                            'left': {
                                'number': '23',
                                'offset': {
                                    'length': 2,
                                    'line': 1,
                                    'offset': 9
                                },
                                'name': 'N_NUMBER'
                            },
                            'offset': {
                                'length': 2,
                                'line': 1,
                                'offset': 14
                            },
                            'operator': '+',
                            'right': {
                                'number': '24',
                                'offset': {
                                    'length': 2,
                                    'line': 1,
                                    'offset': 14
                                },
                                'name': 'N_NUMBER'
                            },
                            'name': 'N_BINARY_EXPRESSION'
                        },
                        'name': 'N_EXPRESSION_STATEMENT'
                    }
                ],
                'name': 'N_PROGRAM'
            };

        expect(highlighter.highlight('21 + 22; 23 + 24;', ast))
            .to.equal('[num]21[/num] + [num]22[/num]; [num]23[/num] + [num]24[/num];');
    });
});
