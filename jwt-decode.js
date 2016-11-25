#!/usr/bin/env node

var jwt = require('jwt-decode');
var fs = require('fs');

var jwt_file = process.env.JWT_FILE;

if (jwt_file === undefined) {
  process.exit(1);
}

var token = fs.readFileSync(jwt_file, 'utf8');

console.log(jwt(token));

