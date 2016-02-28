/*
 * Highlighted - Text transformation helper
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/highlighted
 *
 * Released under the MIT license
 * https://github.com/asmblah/highlighted/raw/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('microdash'),
    hasOwn = {}.hasOwnProperty;

/**
 * @param {object} options
 * @constructor
 */
function Highlighter(options) {
    /**
     * @name Highlighter#options
     * @type {Object}
     */
    this.options = options;
}

_.extend(Highlighter.prototype, {
    /**
     * Highlights the specified text using the specified AST and the options
     * configured for this highlighter.
     * Returns the highlighted text.
     *
     * @param {string} text
     * @param {object} ast
     * @returns {string}
     */
    highlight: function (text, ast) {
        function makeCallback(value) {
            if (_.isFunction(value)) {
                return value;
            }

            return function (node) {
                return node[value];
            };
        }

        var highlighter = this,
            nodeHighlighters = highlighter.options.nodes,
            getOffset = makeCallback(highlighter.options.offset),
            getLength = makeCallback(highlighter.options.length),
            getType = makeCallback(highlighter.options.type),
            parts = text.split('');

        _.forOwn(ast, function highlight(node) {
            if (typeof node === 'object' && hasOwn.call(nodeHighlighters, getType(node))) {
                nodeHighlighters[getType(node)](node, function (node, replacement) {
                    var i,
                        l;

                    parts[getOffset(node)] = replacement;

                    for (i = getOffset(node) + 1, l = getOffset(node) + getLength(node); i < l; i++) {
                        parts[i] = '';
                    }
                });
            }

            if (_.isArray(node)) {
                _.each(node, function (element) {
                    highlight(element);
                });
            } else if (_.isPlainObject(node)) {
                _.forOwn(node, function (property) {
                    highlight(property);
                });
            }
        });

        return parts.join('');
    }
});

module.exports = Highlighter;
