#!/usr/bin/env node

'use strict'

var _ = require('lodash')
var rocambole = require('rocambole')

var START_OF_LINE_NEED_PREFIX = [ '(', '[', '-', '+' ]

module.exports = function (src) {
  return rocambole.moonwalk(src, function (node) {
    var token = node.endToken

    if (token.type !== 'Punctuator') return
    if (token.value !== ';') return

    var prevToken = _findPrevNonWhiteSpace(token)
    var nextToken = _findNextNonWhiteSpace(token)

    if (!prevToken && !nextToken) {
      token.value = ''
      return
    }

    if (!prevToken || prevToken.type === 'LineBreak') {
      if (~START_OF_LINE_NEED_PREFIX.indexOf(nextToken.value)) {
        return
      }
      token.value = ''
      return
    }

    if (!nextToken) {
      token.value = ''
      return
    }

    if (nextToken.type === 'LineComment' || nextToken.type === 'LineBreak' || nextToken.value === '}') {
      token.value = ''
      return
    }

    var indentation = _findIndentation(token)

    if (indentation) {
      insertIndentationAfter(token, indentation)
    }

    token.type = 'LineBreak'
    token.value = '\n'
  })
}

function insertIndentationAfter (token, indentation) {
  var newIndentation
  if (token.next.type === 'WhiteSpace') {
    newIndentation = token.next
    _.extend(newIndentation.range, indentation.range)
    newIndentation.value = _.repeat(' ', indentation.range[1])
  } else {
    newIndentation = {}
    _.extend(newIndentation, indentation,
      {
        prev: token,
        next: token.next
      }
    )
    token.next.prev = newIndentation
    token.next = newIndentation
  }
}

function _findNextNonWhiteSpace (token) {
  while (token.next) {
    token = token.next
    if (token.type !== 'WhiteSpace') return token
  }
}

function _findPrevNonWhiteSpace (token) {
  while (token.prev) {
    token = token.prev
    if (token.type !== 'WhiteSpace') return token
  }
}

function _findIndentation (token) {
  var indentation
  while (token.prev) {
    token = token.prev
    if (token.type === 'WhiteSpace') {
      indentation = token
      continue
    }
    if (token.type === 'LineBreak') {
      return indentation
    }
    indentation = undefined
  }

  return indentation
}

