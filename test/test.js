/* global it */

'use strict'
var assert = require('assert')
var stripSemicolons = require('../')

it('should replace a semicolon with a line break', function () {
  assert.equal(stripSemicolons('true;if (true) { foo() }').toString(), 'true\nif (true) { foo() }')
})

it('should strip a semicolon that is followed by a line break', function () {
  assert.equal(stripSemicolons('true;\nif (true) { foo() }').toString(), 'true\nif (true) { foo() }')
})

it('should strip a semicolon that is followed by spaces and a line break', function () {
  assert.equal(stripSemicolons('true;   \nif (true) { foo() }').toString(), 'true   \nif (true) { foo() }')
})

it('should strip a semicolon that is followed by a LineComment', function () {
  assert.equal(stripSemicolons('true; // comment').toString(), 'true // comment')
})

it('should leave a semicolon infront of [ at the start of the program', function () {
  assert.equal(stripSemicolons(';[]').toString(), ';[]')
})
it('should leave a semicolon infront of ( at the start of the program', function () {
  assert.equal(stripSemicolons(';(true)').toString(), ';(true)')
})

it('should leave a semicolon infront of [ at the start of a line', function () {
  assert.equal(stripSemicolons('true\n;[]').toString(), 'true\n;[]')
})
it('should leave a semicolon infront of ( at the start of a line', function () {
  assert.equal(stripSemicolons('true\n;(true)').toString(), 'true\n;(true)')
})
