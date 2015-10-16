/* global it */

'use strict'

var assert = require('assert')
var stripSemicolons = require('../')

it('should replace a semicolon with a line break', function () {
  assert.equal(stripSemicolons('1;1').toString(), '1\n1')
})

it('should replace a semicolon with a line break preserving indentation on the new line', function () {
  assert.equal(stripSemicolons('   1;1').toString(), '   1\n   1')
})
it('should replace a semicolon with a line break removing semicolon trailing white space', function () {
  assert.equal(stripSemicolons('   1;  1').toString(), '   1\n   1')
})

it('should strip a semicolon if its the only token', function () {
  assert.equal(stripSemicolons(';').toString(), '')
})

it('should strip a semicolon that is followed by a closing curly brace', function () {
  assert.equal(stripSemicolons('{ 1; }').toString(), '{ 1 }')
})

it('should strip a semicolon that is followed by a line break', function () {
  assert.equal(stripSemicolons('1;\n1').toString(), '1\n1')
})

it('should strip a semicolon that is followed by white space and a line break', function () {
  assert.equal(stripSemicolons('1;   \n1').toString(), '1   \n1')
})

it('should strip a semicolon that is followed by a LineComment', function () {
  assert.equal(stripSemicolons('1; // comment').toString(), '1 // comment')
})

it('should leave a semicolon infront of [ at the start of the program', function () {
  assert.equal(stripSemicolons(';[]').toString(), ';[]')
})
it('should leave a semicolon infront of ( at the start of the program', function () {
  assert.equal(stripSemicolons(';(1)').toString(), ';(1)')
})

it('should leave a semicolon infront of [ at the start of a line', function () {
  assert.equal(stripSemicolons('1\n;[]').toString(), '1\n;[]')
})
it('should leave a semicolon infront of ( at the start of a line', function () {
  assert.equal(stripSemicolons('1\n;(1)').toString(), '1\n;(1)')
})
it('should leave a semicolon infront of [ at the start of a line preceded by white space', function () {
  assert.equal(stripSemicolons('1\n   ;[]').toString(), '1\n   ;[]')
})
it('should leave a semicolon infront of ( at the start of a line preceded by white space', function () {
  assert.equal(stripSemicolons('1\n   ;(1)').toString(), '1\n   ;(1)')
})

it('should leave a semicolon infront of - at the start of a line', function () {
  assert.equal(stripSemicolons('1\n;-1').toString(), '1\n;-1')
})
it('should leave a semicolon infront of + at the start of a line', function () {
  assert.equal(stripSemicolons('1\n;+1').toString(), '1\n;+1')
})

it('should leave semicolons inside of for statement', function () {
  assert.equal(stripSemicolons('for (var i = 0; i < 10; i ++){}').toString(), 'for (var i = 0; i < 10; i ++){}')
})
