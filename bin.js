#!/usr/bin/env node

var makeTap = require('./index.js')
var cp = require('child_process')
var minimist = require('minimist')
var path = require('path')
var concat = require('concat-stream')

var STANDARD_CMD = path.join(require.resolve('standard'), '../.bin/standard')
if (/^win/.test(process.platform)) STANDARD_CMD += '.cmd'

var argv = minimist(process.argv.slice(2), {
  boolean: [
    'stdin'
  ]
})

process.stdout.on('error', function () {})

var stream
if (!process.stdin.isTTY || argv._[0] === '-' || argv.stdin) {
  stream = process.stdin
} else {
  var args = process.argv.slice(2)
  var standard = cp.spawn(STANDARD_CMD, args)
  standard.stderr.pipe(process.stderr)
  stream = standard.stdout

  var standardCode
  standard.on('exit', function (code) { standardCode = code })
  process.on('exit', function (code) {
    if (code === 0 && standardCode !== 0) {
      console.error('non-zero exit from the `standard` command')
      process.exit(standardCode)
    }
  })
}

var concatStream = concat({ encoding: 'string' }, function (data) {
  var output = makeTap(data, { complex: true })
  console.log(output.output)
  if (output.errors) process.exit(1)
})
stream.pipe(concatStream)

stream.on('error', handleError)

function handleError (err) {
  console.error(err)
  process.exit(1)
}
