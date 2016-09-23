#!/usr/bin/env node

var njwt = require('njwt');
var fs = require('fs');

var payload = JSON.parse(fs.readFileSync('payload.json', 'utf8'));

var secret = fs.readFileSync("private_key","utf8");
var token = njwt.create(payload, secret, "RS256");
var headers = JSON.parse(fs.readFileSync('header.json', 'utf8'));
if ( "typ" in headers ) {
  token.header.typ = headers.typ; 
}
if ( "iss" in headers ) {
  token.header.iss = headers.iss; 
}
if ( "alg" in headers ) {
  token.header.alg = headers.alg; 
}

console.log(token.compact());

