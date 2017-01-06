/* global it */

'use strict'

var assert = require('assert')
var formatter = require('../')

it('should replace a semicolon with a line break', () =>
  assert.equal(formatter('1;1').toString(), '1\n1')
)

it('should replace a semicolon with a line break preserving indentation', () =>
  assert.equal(formatter('   1;1').toString(), '   1\n   1')
)
it('should replace a semicolon with a line break removing semicolon trailing white space', () =>
  assert.equal(formatter('   1;  1').toString(), '   1\n   1')
)

it('should strip a semicolon if its the only token', () =>
  assert.equal(formatter(';').toString(), '')
)

it('should strip a semicolon that is followed by a closing curly brace', () =>
  assert.equal(formatter('{ 1; }').toString(), '{ 1 }')
)

it('should strip a semicolon that is followed by a line break', () =>
  assert.equal(formatter('1;\n1').toString(), '1\n1')
)

it('should strip a semicolon that is followed by white space and a line break', () =>
  assert.equal(formatter('1;   \n1').toString(), '1   \n1')
)

it('should strip a semicolon that is followed by a LineComment', () =>
  assert.equal(formatter('1; // comment').toString(), '1 // comment')
)

it('should leave a semicolon infront of [ at the start of the program', () =>
  assert.equal(formatter(';[]').toString(), ';[]')
)
it('should leave a semicolon infront of ( at the start of the program', () =>
  assert.equal(formatter(';(1)').toString(), ';(1)')
)

it('should leave a semicolon infront of [ at the start of a line', () =>
  assert.equal(formatter('1\n;[]').toString(), '1\n;[]')
)
it('should leave a semicolon infront of ( at the start of a line', () =>
  assert.equal(formatter('1\n;(1)').toString(), '1\n;(1)')
)
it('should leave a semicolon infront of [ at the start of a line preceded by white space', () =>
  assert.equal(formatter('1\n   ;[]').toString(), '1\n   ;[]')
)
it('should leave a semicolon infront of ( at the start of a line preceded by white space', () =>
  assert.equal(formatter('1\n   ;(1)').toString(), '1\n   ;(1)')
)

it('should leave a semicolon infront of - at the start of a line', () =>
  assert.equal(formatter('1\n;-1').toString(), '1\n;-1')
)
it('should leave a semicolon infront of + at the start of a line', () =>
  assert.equal(formatter('1\n;+1').toString(), '1\n;+1')
)
it('should leave a semicolon infront of / at the start of a line', () =>
  assert.equal(formatter('1\n;/./').toString(), '1\n;/./')
)
it('should strip a semicolon infront of // at the start of a line', () =>
  assert.equal(formatter('1\n;// comment').toString(), '1\n// comment')
)

it('should leave semicolons inside a for statement', () =>
  assert.equal(formatter('for (var i = 0; i < 10; i ++){}').toString(), 'for (var i = 0; i < 10; i ++){}')
)

it('should strip a semicolon of a while statement', () =>
  assert.equal(formatter('while(1) { 1 ; 1 };').toString(), 'while(1) { 1 \n 1 }')
)

it('should leave a semicolon of an empty while statement', () =>
  assert.equal(formatter('while(1);;').toString(), 'while(1);')
)

