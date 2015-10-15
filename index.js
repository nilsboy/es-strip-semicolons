#!/usr/bin/env node

'use strict'

var rocambole = require('rocambole')

module.exports = function (src) {
  return rocambole.moonwalk(src, function (node) {
    var endToken = node.endToken

    if (endToken.type !== 'Punctuator') return
    if (endToken.value !== ';') return
    if (!endToken.prev) return
    if (endToken.prev.type === 'LineBreak') return

    if (!endToken.next) {
      endToken.value = ''
      return
    }

    var nextToken = _findNextNonWhiteSpace(endToken)

    if (nextToken.type === 'LineComment' || nextToken.type === 'LineBreak') {
      endToken.value = ''
      return
    }
    endToken.type = 'LineBreak'
    endToken.value = '\n'
  })
}

function _findNextNonWhiteSpace (token) {
  while (token.next) {
    token = token.next
    if (token.type !== 'WhiteSpace') return token
  }
}

