var test = require('tape')
var stdTap = require('../')
var fs = require('fs')
var path = require('path')

test('stdTap', function (t) {
  t.plan(1)
  var data = fs.readFileSync(path.join(__dirname, 'data.txt'), {encoding: 'utf8'})
  var dataTapped = fs.readFileSync(path.join(__dirname, 'data-tapped.txt'), {encoding: 'utf8'})

  var output = stdTap(data)

  t.equal(dataTapped, output, 'TAP formatted')
})

test('stdTap --verbose', function (t) {
  t.plan(1)
  var data = fs.readFileSync(path.join(__dirname, 'data-verbose.txt'), {encoding: 'utf8'})
  var dataTapped = fs.readFileSync(path.join(__dirname, 'data-verbose-tapped.txt'), {encoding: 'utf8'})

  var output = stdTap(data)

  t.equal(dataTapped, output, 'TAP formatted --verbose')
})

test('stdTap complex true', function (t) {
  t.plan(2)
  var data = fs.readFileSync(path.join(__dirname, 'data.txt'), {encoding: 'utf8'})
  var dataTapped = fs.readFileSync(path.join(__dirname, 'data-tapped.txt'), {encoding: 'utf8'})

  var output = stdTap(data, {complex: true})

  t.equal(dataTapped, output.output, 'TAP formatted output')
  t.equal(2, output.errors, 'TAP formatted error count')

})

test('stdTap complex true - no errors', function (t) {
  t.plan(2)
  var data = ''
  var dataTapped = '\nTAP version 13\n1..0'

  var output = stdTap(data, {complex: true})

  t.equal(dataTapped, output.output, 'TAP formatted output')
  t.equal(0, output.errors, 'TAP formatted error count')

})

