#!/usr/bin/env node
var fs = require('fs'),
    input = require('prompt'),
    cp = require('child_process'),
    spawn = cp.spawn,
    exec = cp.exec;

input.message = 'i5';

var methods = {
  login: function (username) {
    var self = this

    if (username)
      fs.writeFile('.i5', username)
    else
      fs.readFile('.i5', function (error, username) {
        error ?
          self.getUsername('login', username)
        : spawn('ssh', ['-tt', username + '@i5.nyu.edu'], { stdio: 'inherit' })
      });

  }

, upload: function (folder) {

    var self = this

    fs.readFile('.i5', function (error, username) {
      error ?
        self.getUsername('upload', folder)
      : scp = spawn('scp', ['-r', folder, username + '@i5.nyu.edu:public_html'], { stdio: 'inherit'})
      
    });

  }

, run: function (folder) {
    
  }

, reset: function () {
    exec('rm .i5')
  }

, getUsername: function (origin, origin_arg) {

    var self = this

    input.start();

    input.get(['username'], function (error, result) {
        fs.writeFileSync('.i5', result.username)
        self[origin](origin_arg)
    });
  }
};

!function (args) {
  var command = args.shift()
  methods[command] && methods[command].apply(methods, args)
}(process.argv.slice(2))
