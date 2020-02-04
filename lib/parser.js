"use strict"

var Parser = function () {}

Parser.parse = function (command, args) {
    if (command === 'watch'){
        console.log('not yet implemented')
    }
    else if (command === 'unwatch') {
        console.log('not yet implemented')
    }
    else if (command === 'server-start') {
        console.log('not yet implemented')
    }
    else if (command === 'server-stop') {
        console.log('not yet implemented')
    }
    else {
        console.log('help message yet to be written');
    }
}

module.exports = Parser