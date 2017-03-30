/*jslint indent: 2, maxlen: 80, continue: false, unparam: false */
/* -*- tab-width: 2 -*- */
/*global define: true, module: true, require: true */
((typeof define === 'function') && define.amd ? define : function (factory) {
  'use strict';
  var m = ((typeof module === 'object') && module), e = (m && m.exports);
  if (e) { m.exports = (factory(require, e, m) || m.exports); }
})(function () {
  'use strict';


  var EX = function parseJson(json, opts) {
    opts = (opts || false);
    var d = EX.dareParse(json);
    return (d.caught ? EX.hadErr(d.err, json, opts) : d.data);
  };


  EX.dareParse = function (json) {
    try {
      return { data: JSON.parse(json) };
    } catch (jsonParseErr) {
      return { caught: true, err: jsonParseErr };
    }
  };


  EX.hadErr = function (err, json, opts) {
    err = EX.chkErr(err);
    err.input = json;
    var hnd = (err.isSyntaxError ? opts.synErr : (opts.othErr || true));
    if (!hnd) { return hnd; }
    if (hnd === true) { throw err; }
    if (typeof hnd === 'function') { return hnd(err); }
    return hnd;
  };


  EX.chkErr = function (err) {
    var et = (err === null ? 'null' : typeof err), synErr = false;
    if (et === 'object') {
      synErr = ((err instanceof SyntaxError)
        || (!!/^\s*\S*syntax(error|)\b/i.exec(err)));
    } else {
      et = new Error('Caught a non-object (' + et + ') error: ' + String(err));
      et.origValue = err;
      err = et;
    }
    err.isSyntaxError = synErr;
    return err;
  };






  return EX;
});
