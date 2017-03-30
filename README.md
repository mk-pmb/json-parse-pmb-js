
<!--#echo json="package.json" key="name" underline="=" -->
json-parse-pmb
==============
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Yet another try/catch for JSON#parse. This one returns your custom error token
value in case of a SyntaxError (default: undefined), and passes all other
errors to your custom error handler (default: re-throw).
<!--/#echo -->


API
---

This module exports one function:

### parseJson(json[, opts])

Where `json` should be a string with data in JSON format,
and `opts` is an optional config object which supports these keys:

<!--
  * `revivie`: Optional revivier function to be passed to `JSON.parse`.
    * Nope: nodejs v7 seems to not support this.
  -->
* `synErr`: What to do in case of a syntax error.
  * `undefined` (default): Return `undefined` for easy distinction from valid
    JSON values like `null`, `false`, zero and the empty string.
  * any string or false-y value: Return that value.
  * `true`: Throw an error.
  * a function: Call it, with one argument, the error object.
  * any other value: Fail in unreliable, mysterious ways.
* `othErr`: What to do in case of a non-syntax error.
  * `undefined` (default) or any false-y value: re-throw the error.
  * any other value: like `synErr`.

Any error that is re-thrown or forwarded to your custom error handler
function…
* is indeed an object. Caught non-objects will be wrapped in an Error.
* has a property `input` set to the original `json` argument.
* has a boolean property `isSyntaxError`.


Usage
-----

see [doc/demo/usage.js](doc/demo/usage.js)
from [test/usage.js](test/usage.js):
:TODO:

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="15" -->
```javascript
var jsonParse = require('json-parse-pmb'), bad, opts;

equal(jsonParse('true'),          true);
equal(jsonParse('{"abc":123}'),   { abc: 123 });

bad = '{abc:123, missing: "quotes around key names"}';
equal(jsonParse(bad, opts),   undefined);

opts = { synErr: false };
equal(jsonParse(bad, opts),   false);

opts.synErr = { err: 'bad json' };
equal(jsonParse(bad, opts),   { err: 'bad json' });
```
<!--/include-->


<!--#toc stop="scan" -->



&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
