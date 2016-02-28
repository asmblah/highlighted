/*
 * Highlighted - Text transformation helper
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/highlighted
 *
 * Released under the MIT license
 * https://github.com/asmblah/highlighted/raw/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('microdash');

/**
 * @param {class} Highlighter
 * @constructor
 */
function Highlighted(Highlighter) {
    /**
     * @name Highlighted#Highlighter
     * @type {class}
     */
    this.Highlighter = Highlighter;
}

_.extend(Highlighted.prototype, {
    /**
     * Creates a new Highlighter
     *
     * @param {object} options
     * @returns {Highlighter}
     */
    create: function (options) {
        return new this.Highlighter(options);
    }
});

module.exports = Highlighted;
