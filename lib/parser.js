"use strict"

var Parser = function () {}

Parser.parse = function (command, args) {
    if (command === 'init') {
        let handler = require('./init.js')
        handler(args)
    }
    else if (command === 'track'){
        let handler = require('./track.js')
        handler(args)
    }
    else if (command === 'untrack') {
        console.log('not yet implemented')
    }
    else if (command === 'server-start') {
        console.log('not yet implemented')
    }
    else if (command === 'server-stop') {
        console.log('not yet implemented')
    }
    else {
        console.log('help message place holder');
    }
}

module.exports = Parser