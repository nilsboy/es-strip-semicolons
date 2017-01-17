/* global it */

'use strict'

var assert = require('assert')
var format = require('../')

it('should replace a semicolon with a line break', () =>
  assert.equal(format('1;1').toString(), '1\n1')
)

it('should replace a semicolon with a line break preserving indentation', () =>
  assert.equal(format('   1;1').toString(), '   1\n   1')
)

it('should keep indent even with a semicolon followed by whitespace',
  () => assert.equal(format('111;   2; 3').toString(), '111\n2\n3')
)

it('should keep indentation after line breaks',
  () => assert.equal(format('111;\n   2; 3').toString(), '111\n   2\n   3')
)

it('should remove indent following whitespace',
  () => assert.equal(format('111; 2').toString(), '111\n2')
)

it('should replace a semicolon with a line break removing semicolon trailing white space', () =>
  assert.equal(format('   1;  1').toString(), '   1\n   1')
)

it('should strip a semicolon if its the only token', () =>
  assert.equal(format(';').toString(), '')
)

it('should strip a semicolon that is followed by a closing curly brace', () =>
  assert.equal(format('{ 1; }').toString(), '{ 1 }')
)

it('should strip a semicolon that is followed by a line break', () =>
  assert.equal(format('1;\n1').toString(), '1\n1')
)

it('should strip a semicolon that is followed by white space and a line break', () =>
  assert.equal(format('1;   \n1').toString(), '1\n1')
)

it('should strip a semicolon that is followed by a LineComment', () =>
  assert.equal(format('1; // comment').toString(), '1 // comment')
)

it('should leave a semicolon infront of [ at the start of the program', () =>
  assert.equal(format(';[]').toString(), ';[]')
)
it('should leave a semicolon infront of ( at the start of the program', () =>
  assert.equal(format(';(1)').toString(), ';(1)')
)

it('should leave a semicolon infront of [ at the start of a line', () =>
  assert.equal(format('1\n;[]').toString(), '1\n;[]')
)
it('should leave a semicolon infront of ( at the start of a line', () =>
  assert.equal(format('1\n;(1)').toString(), '1\n;(1)')
)
it('should leave a semicolon infront of [ at the start of a line preceded by white space', () =>
  assert.equal(format('1\n   ;[]').toString(), '1\n   ;[]')
)
it('should leave a semicolon infront of ( at the start of a line preceded by white space', () =>
  assert.equal(format('1\n   ;(1)').toString(), '1\n   ;(1)')
)

it('should leave a semicolon infront of - at the start of a line', () =>
  assert.equal(format('1\n;-1').toString(), '1\n;-1')
)
it('should leave a semicolon infront of + at the start of a line', () =>
  assert.equal(format('1\n;+1').toString(), '1\n;+1')
)
it('should leave a semicolon infront of / at the start of a line', () =>
  assert.equal(format('1\n;/./').toString(), '1\n;/./')
)
it('should strip a semicolon infront of // at the start of a line', () =>
  assert.equal(format('1\n;// comment').toString(), '1\n// comment')
)

it('should leave semicolons inside a for statement when using var', () =>
  assert.equal(format('for (var i = 0; i < 10; i ++){}').toString(), 'for (var i = 0; i < 10; i ++){}')
)

it('should leave semicolons inside a for statement when using let', () =>
  assert.equal(format('for (let i = 0; i < 10; i++){}').toString(), 'for (let i = 0; i < 10; i++){}')
)

it('should strip a semicolon of a while statement', () =>
  assert.equal(format('while(1) { 1 ; 1 };').toString(), 'while(1) { 1 \n1 }')
)

it('should leave a semicolon of an empty while statement', () =>
  assert.equal(format('while(1);;').toString(), 'while(1);')
)

it('should leave a semicolon of an empty for statement', () =>
  assert.equal(format('for(;;);').toString(), 'for(;;);')
)

it('should leave a semicolon of an empty if statement', () =>
  assert.equal(format('if(1); 1').toString(), 'if(1); 1')
)

