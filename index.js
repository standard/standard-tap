module.exports = makeTap

var jsonify = require('standard-json')
var yamlish = require('yamlish')

function makeTap (rawtext, opts) {
  opts = opts || {complex: false}

  var results = jsonify(rawtext)

  var ret = '\nTAP version 13\n'
  var total = 0

  results.forEach(function (result) {
    var messages = result.messages

    if (messages.length === 0) {
      return
    }

    ret += messages.map(function (el) {
        var testName = 'Linter Rule'
        if (el.ruleId) testName += ': ' + el.ruleId
        return 'not ok ' + (++total) + ' ' + testName + '\n    ---' + yamlish.encode({
            message: el.message,
            severity: 'error',
            file: result.filePath,
            line: el.line || 0,
            name: el.ruleId
          }) + '\n    ...\n'
      }).join('\n') + '\n'
  })

  ret += '1..' + total

  if (opts.complex) return {output: ret, errors: total}
  return ret
}
