#!/usr/bin/env node

'use strict'

var fs = require('fs')
var stdin = require('get-stdin')
var meow = require('meow')
var strip = require('es-strip-semicolons')

var cli = meow([
  'Usage',
  '  $ es-strip-semicolons <input file> > <output file>',
  '  $ cat <input file> | es-strip-semicolons > <output file>',
  '',
  'Examples',
  '  $ es-strip-semicolons src/app.js > dist/app.js',
  '  $ cat src/app.js | es-strip-semicolons > dist/app.js'
])

if (process.stdin.isTTY) {
  if (!cli.input[0]) {
    console.error('Input file required')
    process.exit(1)
  }
  process.stdout.write(strip(fs.readFileSync(cli.input[0], 'utf8')).toString())
} else {
  stdin(function (data) {
    process.stdout.write(strip(data).toString())
  })
}
