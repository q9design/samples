#!/usr/bin/env node

var chalk = require('chalk')
var eDir = require('ensureDir')
var path = require('path')

var tp = path.resolve('./temp-ok-to-delete')

console.log(chalk.yellow.bold(tp))

eDir(tp,err=>console.log(chalk.blue.bold('edir',err)))

