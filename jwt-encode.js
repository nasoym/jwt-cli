#!/usr/bin/env node

var njwt = require('njwt');
var fs = require('fs');

var private_key_file = process.env.KEY_FILE;
var header_file = process.env.HEADER_FILE;
var payload_file = process.env.PAYLOAD_FILE;

if ((private_key_file === undefined) || (payload_file === undefined)) {
  process.exit(1);
}

var secret = fs.readFileSync(private_key_file,"utf8");
var payload = JSON.parse(fs.readFileSync(payload_file, 'utf8'));
var token = njwt.create(payload, secret, "RS256");

if (header_file !== undefined) {
  var headers = JSON.parse(fs.readFileSync(header_file, 'utf8'));
  if ( "typ" in headers ) {
    token.header.typ = headers.typ; 
  }
  if ( "iss" in headers ) {
    token.header.iss = headers.iss; 
  }
  if ( "alg" in headers ) {
    token.header.alg = headers.alg; 
  }
}

console.log(token.compact());

