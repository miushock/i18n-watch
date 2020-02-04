#!/usr/bin/env node

process.title = 'i18n-watch'

command = process.argv[2]
args = process.argv.slice(3)

var Parser = require('../lib/parser.js')

Parser.parse(command,args)