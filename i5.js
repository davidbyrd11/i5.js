#!/usr/bin/env node
var fs = require('fs'),
    spawn = require('child_process').spawn,
    ssh;


var methods = {
  login: function (username) {
    username ?
      ssh = spawn('ssh', ['-tt', username + '@i5.nyu.edu'], { stdio: 'inherit' })
    : console.log('Please provide your username.');
  },
  connect: function () {

  },
  upload: function (folder) {
    
  },
  run: function (folder) {
    this.connect();
    this.upload(folder);

  }
};

//execute correct method
!function (args) {
  var command = args.shift();
  methods[command] && methods[command].apply(methods, args)
}(process.argv.slice(2))
