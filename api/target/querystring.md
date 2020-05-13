[35m[4m[1m# Query String[22m[24m[39m

[90m<!--introduced_in=v0.1.25-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[90m<!--name=querystring-->[39m
[90m[39m
[90m[39m[0mThe [33mquerystring[39m module provides utilities for parsing and formatting URL[0m
[0mquery strings. It can be accessed using:[0m

    [94mconst[39m [37mquerystring[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/querystring'[39m[90m)[39m[90m;[39m

[32m[1m## [33mquerystring.decode()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mquerystring.decode()[39m function is an alias for [33mquerystring.parse()[39m.[0m

[32m[1m## [33mquerystring.encode()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mquerystring.encode()[39m function is an alias for [33mquerystring.stringify()[39m.[0m

[32m[1m## [33mquerystring.escape(str)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.25[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstr[39m {string}[0m

[0mThe [33mquerystring.escape()[39m method performs URL percent-encoding on the given[0m
[0m[33mstr[39m in a manner that is optimized for the specific requirements of URL[0m
[0mquery strings.[0m

[0mThe [33mquerystring.escape()[39m method is used by [33mquerystring.stringify()[39m and is[0m
[0mgenerally not expected to be used directly. It is exported primarily to allow[0m
[0mapplication code to provide a replacement percent-encoding implementation if[0m
[0mnecessary by assigning [33mquerystring.escape[39m to an alternative function.[0m

[32m[1m## [33mquerystring.parse(str[, sep[, eq[, options]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.25[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10967[39m
[90m    description: Multiple empty entries are now parsed correctly (e.g. `&=&=`).[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6055[39m
[90m    description: The returned object no longer inherits from `Object.prototype`.[39m
[90m  - version: v6.0.0, v4.2.4[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3807[39m
[90m    description: The `eq` parameter may now have a length of more than `1`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstr[39m {string} The URL query string to parse[0m
    * [0m[33msep[39m {string} The substring used to delimit key and value pairs in the[0m
      [0mquery string. [1mDefault:[22m [33m'&'[39m.[0m
    * [0m[33meq[39m {string}. The substring used to delimit keys and values in the[0m
      [0mquery string. [1mDefault:[22m [33m'='[39m.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mdecodeURIComponent[39m {Function} The function to use when decoding[0m[0m[0m
      [0m      [0m[0mpercent-encoded characters in the query string. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mquerystring.unescape()[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxKeys[39m {number} Specifies the maximum number of keys to parse.[0m[0m[0m
      [0m      [0m[0mSpecify [33m0[39m to remove key counting limitations. [1mDefault:[22m [33m1000[39m.[0m[0m[0m

[0mThe [33mquerystring.parse()[39m method parses a URL query string ([33mstr[39m) into a[0m
[0mcollection of key and value pairs.[0m

[0mFor example, the query string [33m'foo=bar&abc=xyz&abc=123'[39m is parsed into:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mfoo[39m[93m:[39m [92m'bar'[39m[32m,[39m
      [37mabc[39m[93m:[39m [33m[[39m[92m'xyz'[39m[32m,[39m [92m'123'[39m[33m][39m
    [33m}[39m

[0mThe object returned by the [33mquerystring.parse()[39m method [3mdoes not[23m[0m
[0mprototypically inherit from the JavaScript [33mObject[39m. This means that typical[0m
[0m[33mObject[39m methods such as [33mobj.toString()[39m, [33mobj.hasOwnProperty()[39m, and others[0m
[0mare not defined and [3mwill not work[23m.[0m

[0mBy default, percent-encoded characters within the query string will be assumed[0m
[0mto use UTF-8 encoding. If an alternative character encoding is used, then an[0m
[0malternative [33mdecodeURIComponent[39m option will need to be specified:[0m

    [90m// Assuming gbkDecodeURIComponent function already exists...[39m
    
    [37mquerystring[39m[32m.[39m[37mparse[39m[90m([39m[92m'w=%D6%D0%CE%C4&foo=bar'[39m[32m,[39m [90mnull[39m[32m,[39m [90mnull[39m[32m,[39m
                      [33m{[39m [37mdecodeURIComponent[39m[93m:[39m [37mgbkDecodeURIComponent[39m [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mquerystring.stringify(obj[, sep[, eq[, options]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.25[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mobj[39m {Object} The object to serialize into a URL query string[0m
    * [0m[33msep[39m {string} The substring used to delimit key and value pairs in the[0m
      [0mquery string. [1mDefault:[22m [33m'&'[39m.[0m
    * [0m[33meq[39m {string}. The substring used to delimit keys and values in the[0m
      [0mquery string. [1mDefault:[22m [33m'='[39m.[0m
    * [0m[33moptions[39m
        * [0m[0m[33mencodeURIComponent[39m {Function} The function to use when converting[0m[0m[0m
      [0m      [0m[0mURL-unsafe characters to percent-encoding in the query string. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mquerystring.escape()[39m.[0m[0m[0m

[0mThe [33mquerystring.stringify()[39m method produces a URL query string from a[0m
[0mgiven [33mobj[39m by iterating through the object's "own properties".[0m

[0mIt serializes the following types of values passed in [33mobj[39m:[0m
[0m{string|number|boolean|string[]|number[]|boolean[]}[0m
[0mAny other input values will be coerced to empty strings.[0m

    [37mquerystring[39m[32m.[39m[37mstringify[39m[90m([39m[33m{[39m [37mfoo[39m[93m:[39m [92m'bar'[39m[32m,[39m [37mbaz[39m[93m:[39m [33m[[39m[92m'qux'[39m[32m,[39m [92m'quux'[39m[33m][39m[32m,[39m [37mcorge[39m[93m:[39m [92m''[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns 'foo=bar&baz=qux&baz=quux&corge='[39m
    
    [37mquerystring[39m[32m.[39m[37mstringify[39m[90m([39m[33m{[39m [37mfoo[39m[93m:[39m [92m'bar'[39m[32m,[39m [37mbaz[39m[93m:[39m [92m'qux'[39m [33m}[39m[32m,[39m [92m';'[39m[32m,[39m [92m':'[39m[90m)[39m[90m;[39m
    [90m// Returns 'foo:bar;baz:qux'[39m

[0mBy default, characters requiring percent-encoding within the query string will[0m
[0mbe encoded as UTF-8. If an alternative encoding is required, then an alternative[0m
[0m[33mencodeURIComponent[39m option will need to be specified:[0m

    [90m// Assuming gbkEncodeURIComponent function already exists,[39m
    
    [37mquerystring[39m[32m.[39m[37mstringify[39m[90m([39m[33m{[39m [37mw[39m[93m:[39m [92m'中文'[39m[32m,[39m [37mfoo[39m[93m:[39m [92m'bar'[39m [33m}[39m[32m,[39m [90mnull[39m[32m,[39m [90mnull[39m[32m,[39m
                          [33m{[39m [37mencodeURIComponent[39m[93m:[39m [37mgbkEncodeURIComponent[39m [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mquerystring.unescape(str)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.25[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstr[39m {string}[0m

[0mThe [33mquerystring.unescape()[39m method performs decoding of URL percent-encoded[0m
[0mcharacters on the given [33mstr[39m.[0m

[0mThe [33mquerystring.unescape()[39m method is used by [33mquerystring.parse()[39m and is[0m
[0mgenerally not expected to be used directly. It is exported primarily to allow[0m
[0mapplication code to provide a replacement decoding implementation if[0m
[0mnecessary by assigning [33mquerystring.unescape[39m to an alternative function.[0m

[0mBy default, the [33mquerystring.unescape()[39m method will attempt to use the[0m
[0mJavaScript built-in [33mdecodeURIComponent()[39m method to decode. If that fails,[0m
[0ma safer equivalent that does not throw on malformed URLs will be used.[0m

