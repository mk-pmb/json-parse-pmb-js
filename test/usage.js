/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var equal = require('equal-pmb');

function readmeDemo() {
  //#u
  var jsonParse = require('json-parse-pmb'), bad, opts;

  equal(jsonParse('true'),          true);
  equal(jsonParse('{"abc":123}'),   { abc: 123 });

  bad = '{abc:123, missing: "quotes around key names"}';
  equal(jsonParse(bad, opts),   undefined);

  opts = { synErr: false };
  equal(jsonParse(bad, opts),   false);

  opts.synErr = { err: 'bad json' };
  equal(jsonParse(bad, opts),   { err: 'bad json' });
  //#r
  console.log("+OK usage test passed.");    //= "+OK usage test passed."
}




module.exports = readmeDemo;
