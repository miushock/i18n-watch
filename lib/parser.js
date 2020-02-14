"use strict";

var Parser = function () {};

Parser.parse = function (command, args) {
    if (command === 'init') {
        const handler = require('./init.js');
        handler(args)
    } else if (command === 'track'){
        const handler = require('./track.js');
        handler(args)
    } else if (command === 'untrack') {
        // console.log('not yet implemented')
        const handler = require('./untrack.js');
        handler(args);
    } else if (command === 'server-start') {
        // console.log('not yet implemented')
        const handler = require('./server-start.js');
        handler(args);
    } else if (command === 'server-stop') {
        // console.log('not yet implemented')
        const handler = require('./server-stop.js');
        handler(args);
    } else {
        console.log('help message place holder');
    }
};

module.exports = Parser;