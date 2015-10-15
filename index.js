#!/usr/bin/env node

var rocambole = require('rocambole')

module.exports = function (src) {
  return rocambole.moonwalk(src, function (node) {
    var endToken = node.endToken

    if (endToken.type !== 'Punctuator') return
    if (endToken.value !== ';') return
    if (!endToken.prev) return
    if (endToken.prev.type === 'LineBreak') return

    if (endToken.next && endToken.next.type !== 'LineBreak') {
      endToken.type = 'LineBreak'
      endToken.value = '\n'
    } else {
      endToken.value = ''
    }
  })
}
