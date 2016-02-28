/*
 * Highlighted - Text transformation helper
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/highlighted
 *
 * Released under the MIT license
 * https://github.com/asmblah/highlighted/raw/master/MIT-LICENSE.txt
 */

'use strict';

var Highlighter = require('./src/Highlighter'),
    Highlighted = require('./src/Highlighted');

module.exports = new Highlighted(Highlighter);
