[35m[4m[1m# Util[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mutil[39m module supports the needs of Node.js internal APIs. Many of the[0m
[0mutilities are useful for application and module developers as well. To access[0m
[0mit:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m

[32m[1m## [33mutil.callbackify(original)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moriginal[39m {Function} An [33masync[39m function[0m
    * [0mReturns: {Function} a callback style function[0m

[0mTakes an [33masync[39m function (or a function that returns a [33mPromise[39m) and returns a[0m
[0mfunction following the error-first callback style, i.e. taking[0m
[0man [33m(err, value) => ...[39m callback as the last argument. In the callback, the[0m
[0mfirst argument will be the rejection reason (or [33mnull[39m if the [33mPromise[39m[0m
[0mresolved), and the second argument will be the resolved value.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mfn[39m[90m([39m[90m)[39m [33m{[39m
      [31mreturn[39m [92m'hello world'[39m[90m;[39m
    [33m}[39m
    [94mconst[39m [37mcallbackFunction[39m [93m=[39m [37mutil[39m[32m.[39m[37mcallbackify[39m[90m([39m[37mfn[39m[90m)[39m[90m;[39m
    
    [37mcallbackFunction[39m[90m([39m[90m([39m[37merr[39m[32m,[39m [37mret[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mret[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mWill print:[0m

    [33mhello world[39m

[0mThe callback is executed asynchronously, and will have a limited stack trace.[0m
[0mIf the callback throws, the process will emit an [34m[33m'uncaughtException'[39m[34m ([34m[4mprocess.html#process_event_uncaughtexception[24m[39m[34m)[39m[0m
[0mevent, and if not handled will exit.[0m

[0mSince [33mnull[39m has a special meaning as the first argument to a callback, if a[0m
[0mwrapped function rejects a [33mPromise[39m with a falsy value as a reason, the value[0m
[0mis wrapped in an [33mError[39m with the original value stored in a field named[0m
[0m[33mreason[39m.[0m

    [94mfunction[39m [37mfn[39m[90m([39m[90m)[39m [33m{[39m
      [31mreturn[39m [37mPromise[39m[32m.[39m[37mreject[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
    [33m}[39m
    [94mconst[39m [37mcallbackFunction[39m [93m=[39m [37mutil[39m[32m.[39m[37mcallbackify[39m[90m([39m[37mfn[39m[90m)[39m[90m;[39m
    
    [37mcallbackFunction[39m[90m([39m[90m([39m[37merr[39m[32m,[39m [37mret[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// When the Promise was rejected with `null` it is wrapped with an Error and[39m
      [90m// the original value is stored in `reason`.[39m
      [37merr[39m [93m&&[39m [37merr[39m[32m.[39m[37mhasOwnProperty[39m[90m([39m[92m'reason'[39m[90m)[39m [93m&&[39m [37merr[39m[32m.[39m[37mreason[39m [93m===[39m [90mnull[39m[90m;[39m  [90m// true[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mutil.debuglog(section)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msection[39m {string} A string identifying the portion of the application for[0m
      [0mwhich the [33mdebuglog[39m function is being created.[0m
    * [0mReturns: {Function} The logging function[0m

[0mThe [33mutil.debuglog()[39m method is used to create a function that conditionally[0m
[0mwrites debug messages to [33mstderr[39m based on the existence of the [33mNODE_DEBUG[39m[0m
[0menvironment variable. If the [33msection[39m name appears within the value of that[0m
[0menvironment variable, then the returned function operates similar to[0m
[0m[[33mconsole.error()[39m][]. If not, then the returned function is a no-op.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mdebuglog[39m [93m=[39m [37mutil[39m[32m.[39m[37mdebuglog[39m[90m([39m[92m'foo'[39m[90m)[39m[90m;[39m
    
    [37mdebuglog[39m[90m([39m[92m'hello from foo [%d]'[39m[32m,[39m [34m123[39m[90m)[39m[90m;[39m

[0mIf this program is run with [33mNODE_DEBUG=foo[39m in the environment, then[0m
[0mit will output something like:[0m

    [33mFOO 3245: hello from foo [123][39m

[0mwhere [33m3245[39m is the process id. If it is not run with that[0m
[0menvironment variable set, then it will not print anything.[0m

[0mThe [33msection[39m supports wildcard also:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mdebuglog[39m [93m=[39m [37mutil[39m[32m.[39m[37mdebuglog[39m[90m([39m[92m'foo-bar'[39m[90m)[39m[90m;[39m
    
    [37mdebuglog[39m[90m([39m[92m'hi there, it\'s foo-bar [%d]'[39m[32m,[39m [34m2333[39m[90m)[39m[90m;[39m

[0mif it is run with [33mNODE_DEBUG=foo*[39m in the environment, then it will output[0m
[0msomething like:[0m

    [33mFOO-BAR 3257: hi there, it's foo-bar [2333][39m

[0mMultiple comma-separated [33msection[39m names may be specified in the [33mNODE_DEBUG[39m[0m
[0menvironment variable: [33mNODE_DEBUG=fs,net,tls[39m.[0m

[32m[1m## [33mutil.deprecate(fn, msg[, code])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16393[39m
[90m    description: Deprecation warnings are only emitted once for each code.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfn[39m {Function} The function that is being deprecated.[0m
    * [0m[33mmsg[39m {string} A warning message to display when the deprecated function is[0m
      [0minvoked.[0m
    * [0m[33mcode[39m {string} A deprecation code. See the [list of deprecated APIs][] for a[0m
      [0mlist of codes.[0m
    * [0mReturns: {Function} The deprecated function wrapped to emit a warning.[0m

[0mThe [33mutil.deprecate()[39m method wraps [33mfn[39m (which may be a function or class) in[0m
[0msuch a way that it is marked as deprecated.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mexports[39m[32m.[39m[37mobsoleteFunction[39m [93m=[39m [37mutil[39m[32m.[39m[37mdeprecate[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Do something here.[39m
    [33m}[39m[32m,[39m [92m'obsoleteFunction() is deprecated. Use newShinyFunction() instead.'[39m[90m)[39m[90m;[39m

[0mWhen called, [33mutil.deprecate()[39m will return a function that will emit a[0m
[0m[33mDeprecationWarning[39m using the [34m[33m'warning'[39m[34m ([34m[4mprocess.html#process_event_warning[24m[39m[34m)[39m event. The warning will[0m
[0mbe emitted and printed to [33mstderr[39m the first time the returned function is[0m
[0mcalled. After the warning is emitted, the wrapped function is called without[0m
[0memitting a warning.[0m

[0mIf the same optional [33mcode[39m is supplied in multiple calls to [33mutil.deprecate()[39m,[0m
[0mthe warning will be emitted only once for that [33mcode[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mfn1[39m [93m=[39m [37mutil[39m[32m.[39m[37mdeprecate[39m[90m([39m[37msomeFunction[39m[32m,[39m [37msomeMessage[39m[32m,[39m [92m'DEP0001'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfn2[39m [93m=[39m [37mutil[39m[32m.[39m[37mdeprecate[39m[90m([39m[37msomeOtherFunction[39m[32m,[39m [37msomeOtherMessage[39m[32m,[39m [92m'DEP0001'[39m[90m)[39m[90m;[39m
    [37mfn1[39m[90m([39m[90m)[39m[90m;[39m [90m// Emits a deprecation warning with code DEP0001[39m
    [37mfn2[39m[90m([39m[90m)[39m[90m;[39m [90m// Does not emit a deprecation warning because it has the same code[39m

[0mIf either the [33m--no-deprecation[39m or [33m--no-warnings[39m command line flags are[0m
[0mused, or if the [33mprocess.noDeprecation[39m property is set to [33mtrue[39m [3mprior[23m to[0m
[0mthe first deprecation warning, the [33mutil.deprecate()[39m method does nothing.[0m

[0mIf the [33m--trace-deprecation[39m or [33m--trace-warnings[39m command line flags are set,[0m
[0mor the [33mprocess.traceDeprecation[39m property is set to [33mtrue[39m, a warning and a[0m
[0mstack trace are printed to [33mstderr[39m the first time the deprecated function is[0m
[0mcalled.[0m

[0mIf the [33m--throw-deprecation[39m command line flag is set, or the[0m
[0m[33mprocess.throwDeprecation[39m property is set to [33mtrue[39m, then an exception will be[0m
[0mthrown when the deprecated function is called.[0m

[0mThe [33m--throw-deprecation[39m command line flag and [33mprocess.throwDeprecation[39m[0m
[0mproperty take precedence over [33m--trace-deprecation[39m and[0m
[0m[33mprocess.traceDeprecation[39m.[0m

[32m[1m## [33mutil.format(format[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.3[39m
[90mchanges:[39m
[90m  - version: v12.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29606[39m
[90m    description: The `%c` specifier is ignored now.[39m
[90m  - version: v11.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23708[39m
[90m    description: The `%d`, `%f` and `%i` specifiers now support Symbols[39m
[90m                 properly.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23162[39m
[90m    description: The `format` argument is now only taken as such if it actually[39m
[90m                 contains format specifiers.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23162[39m
[90m    description: If the `format` argument is not a format string, the output[39m
[90m                 string's formatting is no longer dependent on the type of the[39m
[90m                 first argument. This change removes previously present quotes[39m
[90m                 from strings that were being output when the first argument[39m
[90m                 was not a string.[39m
[90m  - version: v11.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24806[39m
[90m    description: The `%o` specifier's `depth` has default depth of 4 again.[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17907[39m
[90m    description: The `%o` specifier's `depth` option will now fall back to the[39m
[90m                 default depth.[39m
[90m  - version: v10.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22097[39m
[90m    description: The `%d` and `%i` specifiers now support BigInt.[39m
[90m  - version: v8.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14558[39m
[90m    description: The `%o` and `%O` specifiers are supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mformat[39m {string} A [33mprintf[39m-like format string.[0m

[0mThe [33mutil.format()[39m method returns a formatted string using the first argument[0m
[0mas a [33mprintf[39m-like format string which can contain zero or more format[0m
[0mspecifiers. Each specifier is replaced with the converted value from the[0m
[0mcorresponding argument. Supported specifiers are:[0m

    * [0m[33m%s[39m: [33mString[39m will be used to convert all values except [33mBigInt[39m, [33mObject[39m[0m
      [0mand [33m-0[39m. [33mBigInt[39m values will be represented with an [33mn[39m and Objects that[0m
      [0mhave no user defined [33mtoString[39m function are inspected using [33mutil.inspect()[39m[0m
      [0mwith options [33m{ depth: 0, colors: false, compact: 3 }[39m.[0m
    * [0m[33m%d[39m: [33mNumber[39m will be used to convert all values except [33mBigInt[39m and[0m
      [0m[33mSymbol[39m.[0m
    * [0m[33m%i[39m: [33mparseInt(value, 10)[39m is used for all values except [33mBigInt[39m and[0m
      [0m[33mSymbol[39m.[0m
    * [0m[33m%f[39m: [33mparseFloat(value)[39m is used for all values expect [33mSymbol[39m.[0m
    * [0m[33m%j[39m: JSON. Replaced with the string [33m'[Circular]'[39m if the argument contains[0m
      [0mcircular references.[0m
    * [0m[33m%o[39m: [33mObject[39m. A string representation of an object with generic JavaScript[0m
      [0mobject formatting. Similar to [33mutil.inspect()[39m with options[0m
      [0m[33m{ showHidden: true, showProxy: true }[39m. This will show the full object[0m
      [0mincluding non-enumerable properties and proxies.[0m
    * [0m[33m%O[39m: [33mObject[39m. A string representation of an object with generic JavaScript[0m
      [0mobject formatting. Similar to [33mutil.inspect()[39m without options. This will show[0m
      [0mthe full object not including non-enumerable properties and proxies.[0m
    * [0m[33m%c[39m: [33mCSS[39m. This specifier is currently ignored, and will skip any CSS[0m
      [0mpassed in.[0m
    * [0m[33m%%[39m: single percent sign ([33m'%'[39m). This does not consume an argument.[0m
    * [0mReturns: {string} The formatted string[0m

[0mIf a specifier does not have a corresponding argument, it is not replaced:[0m

    [37mutil[39m[32m.[39m[37mformat[39m[90m([39m[92m'%s:%s'[39m[32m,[39m [92m'foo'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'foo:%s'[39m

[0mValues that are not part of the format string are formatted using[0m
[0m[33mutil.inspect()[39m if their type is not [33mstring[39m.[0m

[0mIf there are more arguments passed to the [33mutil.format()[39m method than the[0m
[0mnumber of specifiers, the extra arguments are concatenated to the returned[0m
[0mstring, separated by spaces:[0m

    [37mutil[39m[32m.[39m[37mformat[39m[90m([39m[92m'%s:%s'[39m[32m,[39m [92m'foo'[39m[32m,[39m [92m'bar'[39m[32m,[39m [92m'baz'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'foo:bar baz'[39m

[0mIf the first argument does not contain a valid format specifier, [33mutil.format()[39m[0m
[0mreturns a string that is the concatenation of all arguments separated by spaces:[0m

    [37mutil[39m[32m.[39m[37mformat[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[90m)[39m[90m;[39m
    [90m// Returns: '1 2 3'[39m

[0mIf only one argument is passed to [33mutil.format()[39m, it is returned as it is[0m
[0mwithout any formatting:[0m

    [37mutil[39m[32m.[39m[37mformat[39m[90m([39m[92m'%% %s'[39m[90m)[39m[90m;[39m
    [90m// Returns: '%% %s'[39m

[0m[33mutil.format()[39m is a synchronous method that is intended as a debugging tool.[0m
[0mSome input values can have a significant performance overhead that can block the[0m
[0mevent loop. Use this function with care and never in a hot code path.[0m

[32m[1m## [33mutil.formatWithOptions(inspectOptions, format[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33minspectOptions[39m {Object}[0m
    * [0m[33mformat[39m {string}[0m

[0mThis function is identical to [[33mutil.format()[39m][], except in that it takes[0m
[0man [33minspectOptions[39m argument which specifies options that are passed along to[0m
[0m[[33mutil.inspect()[39m][].[0m

    [37mutil[39m[32m.[39m[37mformatWithOptions[39m[90m([39m[33m{[39m [37mcolors[39m[93m:[39m [91mtrue[39m [33m}[39m[32m,[39m [92m'See object %O'[39m[32m,[39m [33m{[39m [37mfoo[39m[93m:[39m [34m42[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns 'See object { foo: 42 }', where `42` is colored as a number[39m
    [90m// when printed to a terminal.[39m

[32m[1m## [33mutil.getSystemErrorName(err)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merr[39m {number}[0m
    * [0mReturns: {string}[0m

[0mReturns the string name for a numeric error code that comes from a Node.js API.[0m
[0mThe mapping between error codes and error names is platform-dependent.[0m
[0mSee [Common System Errors][] for the names of common errors.[0m

    [37mfs[39m[32m.[39m[37maccess[39m[90m([39m[92m'file/that/does/not/exist'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mname[39m [93m=[39m [37mutil[39m[32m.[39m[37mgetSystemErrorName[39m[90m([39m[37merr[39m[32m.[39m[37merrno[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37mname[39m[90m)[39m[90m;[39m  [90m// ENOENT[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mutil.inherits(constructor, superConstructor)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90mchanges:[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3455[39m
[90m    description: The `constructor` parameter can refer to an ES6 class now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mconstructor[39m {Function}[0m
    * [0m[33msuperConstructor[39m {Function}[0m

[0mUsage of [33mutil.inherits()[39m is discouraged. Please use the ES6 [33mclass[39m and[0m
[0m[33mextends[39m keywords to get language level inheritance support. Also note[0m
[0mthat the two styles are [semantically incompatible][].[0m

[0mInherit the prototype methods from one [constructor][] into another. The[0m
[0mprototype of [33mconstructor[39m will be set to a new object created from[0m
[0m[33msuperConstructor[39m.[0m

[0mThis mainly adds some input validation on top of[0m
[0m[33mObject.setPrototypeOf(constructor.prototype, superConstructor.prototype)[39m.[0m
[0mAs an additional convenience, [33msuperConstructor[39m will be accessible[0m
[0mthrough the [33mconstructor.super_[39m property.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mEventEmitter[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mMyStream[39m[90m([39m[90m)[39m [33m{[39m
      [37mEventEmitter[39m[32m.[39m[37mcall[39m[90m([39m[91mthis[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mutil[39m[32m.[39m[37minherits[39m[90m([39m[37mMyStream[39m[32m,[39m [37mEventEmitter[39m[90m)[39m[90m;[39m
    
    [37mMyStream[39m[32m.[39m[37mprototype[39m[32m.[39m[37mwrite[39m [93m=[39m [94mfunction[39m[90m([39m[37mdata[39m[90m)[39m [33m{[39m
      [91mthis[39m[32m.[39m[37memit[39m[90m([39m[92m'data'[39m[32m,[39m [37mdata[39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m
    
    [94mconst[39m [37mstream[39m [93m=[39m [31mnew[39m [37mMyStream[39m[90m([39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mstream[39m [94minstanceof[39m [37mEventEmitter[39m[90m)[39m[90m;[39m [90m// true[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mMyStream[39m[32m.[39m[37msuper_[39m [93m===[39m [37mEventEmitter[39m[90m)[39m[90m;[39m [90m// true[39m
    
    [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received data: "${[37mdata[39m}"`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'It works!'[39m[90m)[39m[90m;[39m [90m// Received data: "It works!"[39m

[0mES6 example using [33mclass[39m and [33mextends[39m:[0m

    [94mconst[39m [37mEventEmitter[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyStream[39m [94mextends[39m [37mEventEmitter[39m [33m{[39m
      [37mwrite[39m[90m([39m[37mdata[39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37memit[39m[90m([39m[92m'data'[39m[32m,[39m [37mdata[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [94mconst[39m [37mstream[39m [93m=[39m [31mnew[39m [37mMyStream[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received data: "${[37mdata[39m}"`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'With ES6'[39m[90m)[39m[90m;[39m

[32m[1m## [33mutil.inspect(object[, options])[39m[32m[22m[39m

[32m[1m## [33mutil.inspect(object[, showHidden[, depth[, colors]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32392[39m
[90m    description: The `maxStringLength` option is supported now.[39m
[90m  - version: v13.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30768[39m
[90m    description: User defined prototype properties are inspected in case[39m
[90m                 `showHidden` is `true`.[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27685[39m
[90m    description: Circular references now include a marker to the reference.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27109[39m
[90m    description: The `compact` options default is changed to `3` and the[39m
[90m                 `breakLength` options default is changed to `80`.[39m
[90m  - version: v11.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26269[39m
[90m    description: The `compact` option accepts numbers for a new output mode.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24971[39m
[90m    description: Internal properties no longer appear in the context argument[39m
[90m                 of a custom inspection function.[39m
[90m  - version: v11.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25006[39m
[90m    description: ArrayBuffers now also show their binary contents.[39m
[90m  - version: v11.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24852[39m
[90m    description: The `getters` option is supported now.[39m
[90m  - version: v11.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24326[39m
[90m    description: The `depth` default changed back to `2`.[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22846[39m
[90m    description: The `depth` default changed to `20`.[39m
[90m  - version: v10.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22788[39m
[90m    description: The `sorted` option is supported now.[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22756[39m
[90m    description: The inspection output is now limited to about 128 MB. Data[39m
[90m                 above that size will not be fully inspected.[39m
[90m  - version: v10.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20725[39m
[90m    description: Inspecting linked lists and similar objects is now possible[39m
[90m                 up to the maximum call stack size.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19259[39m
[90m    description: The `WeakMap` and `WeakSet` entries can now be inspected[39m
[90m                 as well.[39m
[90m  - version: v9.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17576[39m
[90m    description: The `compact` option is supported now.[39m
[90m  - version: v6.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8174[39m
[90m    description: Custom inspection functions can now return `this`.[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7499[39m
[90m    description: The `breakLength` option is supported now.[39m
[90m  - version: v6.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6334[39m
[90m    description: The `maxArrayLength` option is supported now; in particular,[39m
[90m                 long arrays are truncated by default.[39m
[90m  - version: v6.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6465[39m
[90m    description: The `showProxy` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mobject[39m {any} Any JavaScript primitive or [33mObject[39m.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mshowHidden[39m {boolean} If [33mtrue[39m, [33mobject[39m's non-enumerable symbols and[0m[0m[0m
      [0m      [0m[0mproperties are included in the formatted result. [[33mWeakMap[39m][] and[0m[0m[0m
      [0m      [0m[0m[[33mWeakSet[39m][] entries are also included as well as user defined prototype[0m[0m[0m
      [0m      [0m[0mproperties (excluding method properties). [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mdepth[39m {number} Specifies the number of times to recurse while formatting[0m[0m[0m
      [0m      [0m[0m[33mobject[39m. This is useful for inspecting large objects. To recurse up to[0m[0m[0m
      [0m      [0m[0mthe maximum call stack size pass [33mInfinity[39m or [33mnull[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m2[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcolors[39m {boolean} If [33mtrue[39m, the output is styled with ANSI color[0m[0m[0m
      [0m      [0m[0mcodes. Colors are customizable. See [Customizing [33mutil.inspect[39m colors][].[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcustomInspect[39m {boolean} If [33mfalse[39m,[0m[0m[0m
      [0m      [0m[0m[33m[util.inspect.custom](depth, opts)[39m functions are not invoked.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mshowProxy[39m {boolean} If [33mtrue[39m, [33mProxy[39m inspection includes[0m[0m[0m
      [0m      [0m[0mthe [[33mtarget[39m and [33mhandler[39m][] objects. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxArrayLength[39m {integer} Specifies the maximum number of [33mArray[39m,[0m[0m[0m
      [0m      [0m[0m[[33mTypedArray[39m][], [[33mWeakMap[39m][] and [[33mWeakSet[39m][] elements to include when[0m[0m[0m
      [0m      [0m[0mformatting. Set to [33mnull[39m or [33mInfinity[39m to show all elements. Set to [33m0[39m or[0m[0m[0m
      [0m      [0m[0mnegative to show no elements. [1mDefault:[22m [33m100[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxStringLength[39m {integer} Specifies the maximum number of characters to[0m[0m[0m
      [0m      [0m[0minclude when formatting. Set to [33mnull[39m or [33mInfinity[39m to show all elements.[0m[0m[0m
      [0m      [0m[0mSet to [33m0[39m or negative to show no characters. [1mDefault:[22m [33mInfinity[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mbreakLength[39m {integer} The length at which input values are split across[0m[0m[0m
      [0m      [0m[0mmultiple lines. Set to [33mInfinity[39m to format the input as a single line[0m[0m[0m
      [0m      [0m[0m(in combination with [33mcompact[39m set to [33mtrue[39m or any number >= [33m1[39m).[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m80[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcompact[39m {boolean|integer} Setting this to [33mfalse[39m causes each object key[0m[0m[0m
      [0m      [0m[0mto be displayed on a new line. It will also add new lines to text that is[0m[0m[0m
      [0m      [0m[0mlonger than [33mbreakLength[39m. If set to a number, the most [33mn[39m inner elements[0m[0m[0m
      [0m      [0m[0mare united on a single line as long as all properties fit into[0m[0m[0m
      [0m      [0m[0m[33mbreakLength[39m. Short array elements are also grouped together. No[0m[0m[0m
      [0m      [0m[0mtext will be reduced below 16 characters, no matter the [33mbreakLength[39m size.[0m[0m[0m
      [0m      [0m[0mFor more information, see the example below. [1mDefault:[22m [33m3[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msorted[39m {boolean|Function} If set to [33mtrue[39m or a function, all properties[0m[0m[0m
      [0m      [0m[0mof an object, and [33mSet[39m and [33mMap[39m entries are sorted in the resulting[0m[0m[0m
      [0m      [0m[0mstring. If set to [33mtrue[39m the [default sort][] is used. If set to a function,[0m[0m[0m
      [0m      [0m[0mit is used as a [compare function][].[0m[0m[0m
      [0m
        * [0m[0m[33mgetters[39m {boolean|string} If set to [33mtrue[39m, getters are inspected. If set[0m[0m[0m
      [0m      [0m[0mto [33m'get'[39m, only getters without a corresponding setter are inspected. If[0m[0m[0m
      [0m      [0m[0mset to [33m'set'[39m, only getters with a corresponding setter are inspected.[0m[0m[0m
      [0m      [0m[0mThis might cause side effects depending on the getter function.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {string} The representation of [33mobject[39m.[0m

[0mThe [33mutil.inspect()[39m method returns a string representation of [33mobject[39m that is[0m
[0mintended for debugging. The output of [33mutil.inspect[39m may change at any time[0m
[0mand should not be depended upon programmatically. Additional [33moptions[39m may be[0m
[0mpassed that alter the result.[0m
[0m[33mutil.inspect()[39m will use the constructor's name and/or [33m@@toStringTag[39m to make[0m
[0man identifiable tag for an inspected value.[0m

    [94mclass[39m [37mFoo[39m [33m{[39m
      [37mget[39m [33m[[39m[37mSymbol[39m[32m.[39m[37mtoStringTag[39m[33m][39m[90m([39m[90m)[39m [33m{[39m
        [31mreturn[39m [92m'bar'[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [94mclass[39m [37mBar[39m [33m{[39m[33m}[39m
    
    [94mconst[39m [37mbaz[39m [93m=[39m [37mObject[39m[32m.[39m[37mcreate[39m[90m([39m[90mnull[39m[32m,[39m [33m{[39m [33m[[39m[37mSymbol[39m[32m.[39m[37mtoStringTag[39m[33m][39m[93m:[39m [33m{[39m [37mvalue[39m[93m:[39m [92m'foo'[39m [33m}[39m [33m}[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37minspect[39m[90m([39m[31mnew[39m [37mFoo[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m [90m// 'Foo [bar] {}'[39m
    [37mutil[39m[32m.[39m[37minspect[39m[90m([39m[31mnew[39m [37mBar[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m [90m// 'Bar {}'[39m
    [37mutil[39m[32m.[39m[37minspect[39m[90m([39m[37mbaz[39m[90m)[39m[90m;[39m       [90m// '[foo] {}'[39m

[0mCircular references point to their anchor by using a reference index:[0m

    [94mconst[39m [33m{[39m [37minspect[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobj[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [37mobj[39m[32m.[39m[37ma[39m [93m=[39m [33m[[39m[37mobj[39m[33m][39m[90m;[39m
    [37mobj[39m[32m.[39m[37mb[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [37mobj[39m[32m.[39m[37mb[39m[32m.[39m[37minner[39m [93m=[39m [37mobj[39m[32m.[39m[37mb[39m[90m;[39m
    [37mobj[39m[32m.[39m[37mb[39m[32m.[39m[37mobj[39m [93m=[39m [37mobj[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37minspect[39m[90m([39m[37mobj[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// <ref *1> {[39m
    [90m//   a: [ [Circular *1] ],[39m
    [90m//   b: <ref *2> { inner: [Circular *2], obj: [Circular *1] }[39m
    [90m// }[39m

[0mThe following example inspects all properties of the [33mutil[39m object:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mutil[39m[32m.[39m[37minspect[39m[90m([39m[37mutil[39m[32m,[39m [33m{[39m [37mshowHidden[39m[93m:[39m [91mtrue[39m[32m,[39m [37mdepth[39m[93m:[39m [90mnull[39m [33m}[39m[90m)[39m[90m)[39m[90m;[39m

[0mThe following example highlights the effect of the [33mcompact[39m option:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mo[39m [93m=[39m [33m{[39m
      [37ma[39m[93m:[39m [33m[[39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [33m[[39m[33m[[39m
        [92m'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do '[39m [93m+[39m
          [92m'eiusmod tempor incididunt ut labore et dolore magna aliqua.'[39m[32m,[39m
        [92m'test'[39m[32m,[39m
        [92m'foo'[39m[33m][39m[33m][39m[32m,[39m [34m4[39m[33m][39m[32m,[39m
      [37mb[39m[93m:[39m [31mnew[39m [37mMap[39m[90m([39m[33m[[39m[33m[[39m[92m'za'[39m[32m,[39m [34m1[39m[33m][39m[32m,[39m [33m[[39m[92m'zb'[39m[32m,[39m [92m'test'[39m[33m][39m[33m][39m[90m)[39m
    [33m}[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mutil[39m[32m.[39m[37minspect[39m[90m([39m[37mo[39m[32m,[39m [33m{[39m [37mcompact[39m[93m:[39m [91mtrue[39m[32m,[39m [37mdepth[39m[93m:[39m [34m5[39m[32m,[39m [37mbreakLength[39m[93m:[39m [34m80[39m [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    
    [90m// { a:[39m
    [90m//   [ 1,[39m
    [90m//     2,[39m
    [90m//     [ [ 'Lorem ipsum dolor sit amet, consectetur [...]', // A long line[39m
    [90m//           'test',[39m
    [90m//           'foo' ] ],[39m
    [90m//     4 ],[39m
    [90m//   b: Map(2) { 'za' => 1, 'zb' => 'test' } }[39m
    
    [90m// Setting `compact` to false changes the output to be more reader friendly.[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mutil[39m[32m.[39m[37minspect[39m[90m([39m[37mo[39m[32m,[39m [33m{[39m [37mcompact[39m[93m:[39m [91mfalse[39m[32m,[39m [37mdepth[39m[93m:[39m [34m5[39m[32m,[39m [37mbreakLength[39m[93m:[39m [34m80[39m [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    
    [90m// {[39m
    [90m//   a: [[39m
    [90m//     1,[39m
    [90m//     2,[39m
    [90m//     [[39m
    [90m//       [[39m
    [90m//         'Lorem ipsum dolor sit amet, consectetur ' +[39m
    [90m//           'adipiscing elit, sed do eiusmod tempor ' +[39m
    [90m//           'incididunt ut labore et dolore magna ' +[39m
    [90m//           'aliqua.,[39m
    [90m//         'test',[39m
    [90m//         'foo'[39m
    [90m//       ][39m
    [90m//     ],[39m
    [90m//     4[39m
    [90m//   ],[39m
    [90m//   b: Map(2) {[39m
    [90m//     'za' => 1,[39m
    [90m//     'zb' => 'test'[39m
    [90m//   }[39m
    [90m// }[39m
    
    [90m// Setting `breakLength` to e.g. 150 will print the "Lorem ipsum" text in a[39m
    [90m// single line.[39m
    [90m// Reducing the `breakLength` will split the "Lorem ipsum" text in smaller[39m
    [90m// chunks.[39m

[0mThe [33mshowHidden[39m option allows [[33mWeakMap[39m][] and [[33mWeakSet[39m][] entries to be[0m
[0minspected. If there are more entries than [33mmaxArrayLength[39m, there is no[0m
[0mguarantee which entries are displayed. That means retrieving the same[0m
[0m[[33mWeakSet[39m][] entries twice may result in different output. Furthermore, entries[0m
[0mwith no remaining strong references may be garbage collected at any time.[0m

    [94mconst[39m [33m{[39m [37minspect[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobj[39m [93m=[39m [33m{[39m [37ma[39m[93m:[39m [34m1[39m [33m}[39m[90m;[39m
    [94mconst[39m [37mobj2[39m [93m=[39m [33m{[39m [37mb[39m[93m:[39m [34m2[39m [33m}[39m[90m;[39m
    [94mconst[39m [37mweakSet[39m [93m=[39m [31mnew[39m [37mWeakSet[39m[90m([39m[33m[[39m[37mobj[39m[32m,[39m [37mobj2[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37minspect[39m[90m([39m[37mweakSet[39m[32m,[39m [33m{[39m [37mshowHidden[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// WeakSet { { a: 1 }, { b: 2 } }[39m

[0mThe [33msorted[39m option ensures that an object's property insertion order does not[0m
[0mimpact the result of [33mutil.inspect()[39m.[0m

    [94mconst[39m [33m{[39m [37minspect[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mo1[39m [93m=[39m [33m{[39m
      [37mb[39m[93m:[39m [33m[[39m[34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m1[39m[33m][39m[32m,[39m
      [37ma[39m[93m:[39m [92m'`a` comes before `b`'[39m[32m,[39m
      [37mc[39m[93m:[39m [31mnew[39m [37mSet[39m[90m([39m[33m[[39m[34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m1[39m[33m][39m[90m)[39m
    [33m}[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37minspect[39m[90m([39m[37mo1[39m[32m,[39m [33m{[39m [37msorted[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// { a: '`a` comes before `b`', b: [ 2, 3, 1 ], c: Set(3) { 1, 2, 3 } }[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37minspect[39m[90m([39m[37mo1[39m[32m,[39m [33m{[39m [37msorted[39m[93m:[39m [90m([39m[37ma[39m[32m,[39m [37mb[39m[90m)[39m [93m=>[39m [37mb[39m[32m.[39m[37mlocaleCompare[39m[90m([39m[37ma[39m[90m)[39m [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// { c: Set(3) { 3, 2, 1 }, b: [ 2, 3, 1 ], a: '`a` comes before `b`' }[39m
    
    [94mconst[39m [37mo2[39m [93m=[39m [33m{[39m
      [37mc[39m[93m:[39m [31mnew[39m [37mSet[39m[90m([39m[33m[[39m[34m2[39m[32m,[39m [34m1[39m[32m,[39m [34m3[39m[33m][39m[90m)[39m[32m,[39m
      [37ma[39m[93m:[39m [92m'`a` comes before `b`'[39m[32m,[39m
      [37mb[39m[93m:[39m [33m[[39m[34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m1[39m[33m][39m
    [33m}[39m[90m;[39m
    [37massert[39m[32m.[39m[37mstrict[39m[32m.[39m[37mequal[39m[90m([39m
      [37minspect[39m[90m([39m[37mo1[39m[32m,[39m [33m{[39m [37msorted[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[32m,[39m
      [37minspect[39m[90m([39m[37mo2[39m[32m,[39m [33m{[39m [37msorted[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m
    [90m)[39m[90m;[39m

[0m[33mutil.inspect()[39m is a synchronous method intended for debugging. Its maximum[0m
[0moutput length is approximately 128 MB. Inputs that result in longer output will[0m
[0mbe truncated.[0m

[32m[1m### Customizing [33mutil.inspect[39m[32m colors[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mColor output (if enabled) of [33mutil.inspect[39m is customizable globally[0m
[0mvia the [33mutil.inspect.styles[39m and [33mutil.inspect.colors[39m properties.[0m

[0m[33mutil.inspect.styles[39m is a map associating a style name to a color from[0m
[0m[33mutil.inspect.colors[39m.[0m

[0mThe default styles and associated colors are:[0m

    * [0m[33mbigint[39m: [33myellow[39m[0m
    * [0m[33mboolean[39m: [33myellow[39m[0m
    * [0m[33mdate[39m: [33mmagenta[39m[0m
    * [0m[33mmodule[39m: [33munderline[39m[0m
    * [0m[33mname[39m: (no styling)[0m
    * [0m[33mnull[39m: [33mbold[39m[0m
    * [0m[33mnumber[39m: [33myellow[39m[0m
    * [0m[33mregexp[39m: [33mred[39m[0m
    * [0m[33mspecial[39m: [33mcyan[39m (e.g., [33mProxies[39m)[0m
    * [0m[33mstring[39m: [33mgreen[39m[0m
    * [0m[33msymbol[39m: [33mgreen[39m[0m
    * [0m[33mundefined[39m: [33mgrey[39m[0m

[0mColor styling uses ANSI control codes that may not be supported on all[0m
[0mterminals. To verify color support use [[33mtty.hasColors()[39m][].[0m

[0mPredefined control codes are listed below (grouped as "Modifiers", "Foreground[0m
[0mcolors", and "Background colors").[0m

[32m[1m#### Modifiers[22m[39m

[0mModifier support varies throughout different terminals. They will mostly be[0m
[0mignored, if not supported.[0m

    * [0m[33mreset[39m - Resets all (color) modifiers to their defaults[0m
    * [0m[1mbold[22m - Make text bold[0m
    * [0m[3mitalic[23m - Make text italic[0m
    * [0m[90m<span style="border-bottom: 1px;">[39munderline[90m</span>[39m - Make text underlined[0m
    * [0m[2m[90m[9mstrikethrough[29m[39m[22m - Puts a horizontal line through the center of the text[0m
      [0m(Alias: [33mstrikeThrough[39m, [33mcrossedout[39m, [33mcrossedOut[39m)[0m
    * [0m[33mhidden[39m - Prints the text, but makes it invisible (Alias: conceal)[0m
    * [0m[90m<span style="opacity: 0.5;">[39mdim[90m</span>[39m - Decreased color intensity (Alias:[0m
      [0m[33mfaint[39m)[0m
    * [0m[90m<span style="border-top: 1px">[39moverlined[90m</span>[39m - Make text overlined[0m
    * [0mblink - Hides and shows the text in an interval[0m
    * [0m[90m<span style="filter: invert(100%)">[39minverse[90m</span>[39m - Swap foreground and[0m
      [0mbackground colors (Alias: [33mswapcolors[39m, [33mswapColors[39m)[0m
    * [0m[90m<span style="border-bottom: 1px double;">[39mdoubleunderline[90m</span>[39m - Make text[0m
      [0mdouble underlined (Alias: [33mdoubleUnderline[39m)[0m
    * [0m[90m<span style="border: 1px">[39mframed[90m</span>[39m - Draw a frame around the text[0m

[32m[1m#### Foreground colors[22m[39m

    * [0m[33mblack[39m[0m
    * [0m[33mred[39m[0m
    * [0m[33mgreen[39m[0m
    * [0m[33myellow[39m[0m
    * [0m[33mblue[39m[0m
    * [0m[33mmagenta[39m[0m
    * [0m[33mcyan[39m[0m
    * [0m[33mwhite[39m[0m
    * [0m[33mgray[39m (alias: [33mgrey[39m, [33mblackBright[39m)[0m
    * [0m[33mredBright[39m[0m
    * [0m[33mgreenBright[39m[0m
    * [0m[33myellowBright[39m[0m
    * [0m[33mblueBright[39m[0m
    * [0m[33mmagentaBright[39m[0m
    * [0m[33mcyanBright[39m[0m
    * [0m[33mwhiteBright[39m[0m

[32m[1m#### Background colors[22m[39m

    * [0m[33mbgBlack[39m[0m
    * [0m[33mbgRed[39m[0m
    * [0m[33mbgGreen[39m[0m
    * [0m[33mbgYellow[39m[0m
    * [0m[33mbgBlue[39m[0m
    * [0m[33mbgMagenta[39m[0m
    * [0m[33mbgCyan[39m[0m
    * [0m[33mbgWhite[39m[0m
    * [0m[33mbgGray[39m (alias: [33mbgGrey[39m, [33mbgBlackBright[39m)[0m
    * [0m[33mbgRedBright[39m[0m
    * [0m[33mbgGreenBright[39m[0m
    * [0m[33mbgYellowBright[39m[0m
    * [0m[33mbgBlueBright[39m[0m
    * [0m[33mbgMagentaBright[39m[0m
    * [0m[33mbgCyanBright[39m[0m
    * [0m[33mbgWhiteBright[39m[0m

[32m[1m### Custom inspection functions on Objects[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mObjects may also define their own[0m
[0m[[33m[util.inspect.custom](depth, opts)[39m][util.inspect.custom] function,[0m
[0mwhich [33mutil.inspect()[39m will invoke and use the result of when inspecting[0m
[0mthe object:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mBox[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37mvalue[39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37mvalue[39m [93m=[39m [37mvalue[39m[90m;[39m
      [33m}[39m
    
      [33m[[39m[37mutil[39m[32m.[39m[37minspect[39m[32m.[39m[37mcustom[39m[33m][39m[90m([39m[37mdepth[39m[32m,[39m [37moptions[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37mdepth[39m [93m<[39m [34m0[39m[90m)[39m [33m{[39m
          [31mreturn[39m [37moptions[39m[32m.[39m[37mstylize[39m[90m([39m[92m'[Box]'[39m[32m,[39m [92m'special'[39m[90m)[39m[90m;[39m
        [33m}[39m
    
        [94mconst[39m [37mnewOptions[39m [93m=[39m [37mObject[39m[32m.[39m[37massign[39m[90m([39m[33m{[39m[33m}[39m[32m,[39m [37moptions[39m[32m,[39m [33m{[39m
          [37mdepth[39m[93m:[39m [37moptions[39m[32m.[39m[37mdepth[39m [93m===[39m [90mnull[39m [93m?[39m [90mnull[39m [93m:[39m [37moptions[39m[32m.[39m[37mdepth[39m [93m-[39m [34m1[39m
        [33m}[39m[90m)[39m[90m;[39m
    
        [90m// Five space padding because that's the size of "Box< ".[39m
        [94mconst[39m [37mpadding[39m [93m=[39m [92m' '[39m[32m.[39m[37mrepeat[39m[90m([39m[34m5[39m[90m)[39m[90m;[39m
        [94mconst[39m [37minner[39m [93m=[39m [37mutil[39m[32m.[39m[37minspect[39m[90m([39m[91mthis[39m[32m.[39m[37mvalue[39m[32m,[39m [37mnewOptions[39m[90m)[39m
                          [32m.[39m[37mreplace[39m[90m([39m/\n/g[32m,[39m `\n${[37mpadding[39m}`[90m)[39m[90m;[39m
        [31mreturn[39m `${[37moptions[39m[32m.[39m[37mstylize[39m[90m([39m[92m'Box'[39m[32m,[39m [92m'special'[39m[90m)[39m}< ${[37minner[39m} >`[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [94mconst[39m [37mbox[39m [93m=[39m [31mnew[39m [37mBox[39m[90m([39m[91mtrue[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37minspect[39m[90m([39m[37mbox[39m[90m)[39m[90m;[39m
    [90m// Returns: "Box< true >"[39m

[0mCustom [33m[util.inspect.custom](depth, opts)[39m functions typically return a string[0m
[0mbut may return a value of any type that will be formatted accordingly by[0m
[0m[33mutil.inspect()[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobj[39m [93m=[39m [33m{[39m [37mfoo[39m[93m:[39m [92m'this will not show up in the inspect() output'[39m [33m}[39m[90m;[39m
    [37mobj[39m[33m[[39m[37mutil[39m[32m.[39m[37minspect[39m[32m.[39m[37mcustom[39m[33m][39m [93m=[39m [90m([39m[37mdepth[39m[90m)[39m [93m=>[39m [33m{[39m
      [31mreturn[39m [33m{[39m [37mbar[39m[93m:[39m [92m'baz'[39m [33m}[39m[90m;[39m
    [33m}[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37minspect[39m[90m([39m[37mobj[39m[90m)[39m[90m;[39m
    [90m// Returns: "{ bar: 'baz' }"[39m

[32m[1m### [33mutil.inspect.custom[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.6.0[39m
[90mchanges:[39m
[90m  - version: v10.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20857[39m
[90m    description: This is now defined as a shared symbol.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{symbol} that can be used to declare custom inspect functions.[0m

[0mIn addition to being accessible through [33mutil.inspect.custom[39m, this[0m
[0msymbol is [registered globally][global symbol registry] and can be[0m
[0maccessed in any environment as [33mSymbol.for('nodejs.util.inspect.custom')[39m.[0m

    [94mconst[39m [37minspect[39m [93m=[39m [37mSymbol[39m[32m.[39m[94mfor[39m[90m([39m[92m'nodejs.util.inspect.custom'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mPassword[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37mvalue[39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37mvalue[39m [93m=[39m [37mvalue[39m[90m;[39m
      [33m}[39m
    
      [37mtoString[39m[90m([39m[90m)[39m [33m{[39m
        [31mreturn[39m [92m'xxxxxxxx'[39m[90m;[39m
      [33m}[39m
    
      [33m[[39m[37minspect[39m[33m][39m[90m([39m[90m)[39m [33m{[39m
        [31mreturn[39m `Password <${[91mthis[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m}>`[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [94mconst[39m [37mpassword[39m [93m=[39m [31mnew[39m [37mPassword[39m[90m([39m[92m'r0sebud'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mpassword[39m[90m)[39m[90m;[39m
    [90m// Prints Password <xxxxxxxx>[39m

[0mSee [Custom inspection functions on Objects][] for more details.[0m

[32m[1m### [33mutil.inspect.defaultOptions[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mdefaultOptions[39m value allows customization of the default options used by[0m
[0m[33mutil.inspect[39m. This is useful for functions like [33mconsole.log[39m or[0m
[0m[33mutil.format[39m which implicitly call into [33mutil.inspect[39m. It shall be set to an[0m
[0mobject containing one or more valid [[33mutil.inspect()[39m][] options. Setting[0m
[0moption properties directly is also supported.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37marr[39m [93m=[39m [37mArray[39m[90m([39m[34m101[39m[90m)[39m[32m.[39m[37mfill[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37marr[39m[90m)[39m[90m;[39m [90m// Logs the truncated array[39m
    [37mutil[39m[32m.[39m[37minspect[39m[32m.[39m[37mdefaultOptions[39m[32m.[39m[37mmaxArrayLength[39m [93m=[39m [90mnull[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37marr[39m[90m)[39m[90m;[39m [90m// logs the full array[39m

[32m[1m## [33mutil.isDeepStrictEqual(val1, val2)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mval1[39m {any}[0m
    * [0m[33mval2[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if there is deep strict equality between [33mval1[39m and [33mval2[39m.[0m
[0mOtherwise, returns [33mfalse[39m.[0m

[0mSee [[33massert.deepStrictEqual()[39m][] for more information about deep strict[0m
[0mequality.[0m

[32m[1m## [33mutil.promisify(original)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moriginal[39m {Function}[0m
    * [0mReturns: {Function}[0m

[0mTakes a function following the common error-first callback style, i.e. taking[0m
[0man [33m(err, value) => ...[39m callback as the last argument, and returns a version[0m
[0mthat returns promises.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mstat[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mfs[39m[32m.[39m[37mstat[39m[90m)[39m[90m;[39m
    [37mstat[39m[90m([39m[92m'.'[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37mstats[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Do something with `stats`[39m
    [33m}[39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[90m([39m[91merror[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Handle the error.[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOr, equivalently using [33masync function[39ms:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mstat[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mfs[39m[32m.[39m[37mstat[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mcallStat[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [37mstats[39m [93m=[39m [37mawait[39m [37mstat[39m[90m([39m[92m'.'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`This directory is owned by ${[37mstats[39m[32m.[39m[37muid[39m}`[90m)[39m[90m;[39m
    [33m}[39m

[0mIf there is an [33moriginal[util.promisify.custom][39m property present, [33mpromisify[39m[0m
[0mwill return its value, see [Custom promisified functions][].[0m

[0m[33mpromisify()[39m assumes that [33moriginal[39m is a function taking a callback as its[0m
[0mfinal argument in all cases. If [33moriginal[39m is not a function, [33mpromisify()[39m[0m
[0mwill throw an error. If [33moriginal[39m is a function but its last argument is not[0m
[0man error-first callback, it will still be passed an error-first[0m
[0mcallback as its last argument.[0m

[0mUsing [33mpromisify()[39m on class methods or other methods that use [33mthis[39m may not[0m
[0mwork as expected unless handled specially:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mFoo[39m [33m{[39m
      [37mconstructor[39m[90m([39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37ma[39m [93m=[39m [34m42[39m[90m;[39m
      [33m}[39m
    
      [37mbar[39m[90m([39m[37mcallback[39m[90m)[39m [33m{[39m
        [37mcallback[39m[90m([39m[90mnull[39m[32m,[39m [91mthis[39m[32m.[39m[37ma[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [94mconst[39m [37mfoo[39m [93m=[39m [31mnew[39m [37mFoo[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mnaiveBar[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mfoo[39m[32m.[39m[37mbar[39m[90m)[39m[90m;[39m
    [90m// TypeError: Cannot read property 'a' of undefined[39m
    [90m// naiveBar().then(a => console.log(a));[39m
    
    [37mnaiveBar[39m[32m.[39m[37mcall[39m[90m([39m[37mfoo[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37ma[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37ma[39m[90m)[39m[90m)[39m[90m;[39m [90m// '42'[39m
    
    [94mconst[39m [37mbindBar[39m [93m=[39m [37mnaiveBar[39m[32m.[39m[37mbind[39m[90m([39m[37mfoo[39m[90m)[39m[90m;[39m
    [37mbindBar[39m[90m([39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37ma[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37ma[39m[90m)[39m[90m)[39m[90m;[39m [90m// '42'[39m

[32m[1m### Custom promisified functions[22m[39m

[0mUsing the [33mutil.promisify.custom[39m symbol one can override the return value of[0m
[0m[[33mutil.promisify()[39m][]:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mdoSomething[39m[90m([39m[37mfoo[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m
    
    [37mdoSomething[39m[33m[[39m[37mutil[39m[32m.[39m[37mpromisify[39m[32m.[39m[37mcustom[39m[33m][39m [93m=[39m [90m([39m[37mfoo[39m[90m)[39m [93m=>[39m [33m{[39m
      [31mreturn[39m [37mgetPromiseSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m
    
    [94mconst[39m [37mpromisified[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mdoSomething[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mpromisified[39m [93m===[39m [37mdoSomething[39m[33m[[39m[37mutil[39m[32m.[39m[37mpromisify[39m[32m.[39m[37mcustom[39m[33m][39m[90m)[39m[90m;[39m
    [90m// prints 'true'[39m

[0mThis can be useful for cases where the original function does not follow the[0m
[0mstandard format of taking an error-first callback as the last argument.[0m

[0mFor example, with a function that takes in[0m
[0m[33m(foo, onSuccessCallback, onErrorCallback)[39m:[0m

    [37mdoSomething[39m[33m[[39m[37mutil[39m[32m.[39m[37mpromisify[39m[32m.[39m[37mcustom[39m[33m][39m [93m=[39m [90m([39m[37mfoo[39m[90m)[39m [93m=>[39m [33m{[39m
      [31mreturn[39m [31mnew[39m [37mPromise[39m[90m([39m[90m([39m[37mresolve[39m[32m,[39m [37mreject[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mdoSomething[39m[90m([39m[37mfoo[39m[32m,[39m [37mresolve[39m[32m,[39m [37mreject[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m

[0mIf [33mpromisify.custom[39m is defined but is not a function, [33mpromisify()[39m will[0m
[0mthrow an error.[0m

[32m[1m### [33mutil.promisify.custom[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mchanges:[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31672[39m
[90m    description: This is now defined as a shared symbol.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{symbol} that can be used to declare custom promisified variants of functions,[0m
      [0msee [Custom promisified functions][].[0m

[0mIn addition to being accessible through [33mutil.promisify.custom[39m, this[0m
[0msymbol is [registered globally][global symbol registry] and can be[0m
[0maccessed in any environment as [33mSymbol.for('nodejs.util.promisify.custom')[39m.[0m

[0mFor example, with a function that takes in[0m
[0m[33m(foo, onSuccessCallback, onErrorCallback)[39m:[0m

    [94mconst[39m [37mkCustomPromisifiedSymbol[39m [93m=[39m [37mSymbol[39m[32m.[39m[94mfor[39m[90m([39m[92m'nodejs.util.promisify.custom'[39m[90m)[39m[90m;[39m
    
    [37mdoSomething[39m[33m[[39m[37mkCustomPromisifiedSymbol[39m[33m][39m [93m=[39m [90m([39m[37mfoo[39m[90m)[39m [93m=>[39m [33m{[39m
      [31mreturn[39m [31mnew[39m [37mPromise[39m[90m([39m[90m([39m[37mresolve[39m[32m,[39m [37mreject[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mdoSomething[39m[90m([39m[37mfoo[39m[32m,[39m [37mresolve[39m[32m,[39m [37mreject[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m

[32m[1m## Class: [33mutil.TextDecoder[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn implementation of the [WHATWG Encoding Standard][] [33mTextDecoder[39m API.[0m

    [94mconst[39m [37mdecoder[39m [93m=[39m [31mnew[39m [37mTextDecoder[39m[90m([39m[92m'shift_jis'[39m[90m)[39m[90m;[39m
    [94mlet[39m [37mstring[39m [93m=[39m [92m''[39m[90m;[39m
    [94mlet[39m [37mbuffer[39m[90m;[39m
    [94mwhile[39m [90m([39m[37mbuffer[39m [93m=[39m [37mgetNextChunkSomehow[39m[90m([39m[90m)[39m[90m)[39m [33m{[39m
      [37mstring[39m [93m+=[39m [37mdecoder[39m[32m.[39m[37mdecode[39m[90m([39m[37mbuffer[39m[32m,[39m [33m{[39m [37mstream[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m
    [37mstring[39m [93m+=[39m [37mdecoder[39m[32m.[39m[37mdecode[39m[90m([39m[90m)[39m[90m;[39m [90m// end-of-stream[39m

[32m[1m### WHATWG Supported Encodings[22m[39m

[0mPer the [WHATWG Encoding Standard][], the encodings supported by the[0m
[0m[33mTextDecoder[39m API are outlined in the tables below. For each encoding,[0m
[0mone or more aliases may be used.[0m

[0mDifferent Node.js build configurations support different sets of encodings.[0m
[0m(see [Internationalization][])[0m

[32m[1m#### Encodings Supported by Default (With Full ICU Data)[22m[39m

[0m┌──────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐[0m
[0m│ Encoding         │ Aliases                                                                                                                                                                                             │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'ibm866'[39m         │ [33m'866'[39m, [33m'cp866'[39m, [33m'csibm866'[39m                                                                                                                                                                          │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-2'[39m     │ [33m'csisolatin2'[39m, [33m'iso-ir-101'[39m, [33m'iso8859-2'[39m, [33m'iso88592'[39m, [33m'iso_8859-2'[39m, [33m'iso_8859-2:1987'[39m, [33m'l2'[39m, [33m'latin2'[39m                                                                                               │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-3'[39m     │ [33m'csisolatin3'[39m, [33m'iso-ir-109'[39m, [33m'iso8859-3'[39m, [33m'iso88593'[39m, [33m'iso_8859-3'[39m, [33m'iso_8859-3:1988'[39m, [33m'l3'[39m, [33m'latin3'[39m                                                                                               │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-4'[39m     │ [33m'csisolatin4'[39m, [33m'iso-ir-110'[39m, [33m'iso8859-4'[39m, [33m'iso88594'[39m, [33m'iso_8859-4'[39m, [33m'iso_8859-4:1988'[39m, [33m'l4'[39m, [33m'latin4'[39m                                                                                               │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-5'[39m     │ [33m'csisolatincyrillic'[39m, [33m'cyrillic'[39m, [33m'iso-ir-144'[39m, [33m'iso8859-5'[39m, [33m'iso88595'[39m, [33m'iso_8859-5'[39m, [33m'iso_8859-5:1988'[39m                                                                                            │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-6'[39m     │ [33m'arabic'[39m, [33m'asmo-708'[39m, [33m'csiso88596e'[39m, [33m'csiso88596i'[39m, [33m'csisolatinarabic'[39m, [33m'ecma-114'[39m, [33m'iso-8859-6-e'[39m, [33m'iso-8859-6-i'[39m, [33m'iso-ir-127'[39m, [33m'iso8859-6'[39m, [33m'iso88596'[39m, [33m'iso_8859-6'[39m, [33m'iso_8859-6:1987'[39m          │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-7'[39m     │ [33m'csisolatingreek'[39m, [33m'ecma-118'[39m, [33m'elot_928'[39m, [33m'greek'[39m, [33m'greek8'[39m, [33m'iso-ir-126'[39m, [33m'iso8859-7'[39m, [33m'iso88597'[39m, [33m'iso_8859-7'[39m, [33m'iso_8859-7:1987'[39m, [33m'sun_eu_greek'[39m                                                │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-8'[39m     │ [33m'csiso88598e'[39m, [33m'csisolatinhebrew'[39m, [33m'hebrew'[39m, [33m'iso-8859-8-e'[39m, [33m'iso-ir-138'[39m, [33m'iso8859-8'[39m, [33m'iso88598'[39m, [33m'iso_8859-8'[39m, [33m'iso_8859-8:1988'[39m, [33m'visual'[39m                                                       │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-8-i'[39m   │ [33m'csiso88598i'[39m, [33m'logical'[39m                                                                                                                                                                            │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-10'[39m    │ [33m'csisolatin6'[39m, [33m'iso-ir-157'[39m, [33m'iso8859-10'[39m, [33m'iso885910'[39m, [33m'l6'[39m, [33m'latin6'[39m                                                                                                                              │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-13'[39m    │ [33m'iso8859-13'[39m, [33m'iso885913'[39m                                                                                                                                                                           │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-14'[39m    │ [33m'iso8859-14'[39m, [33m'iso885914'[39m                                                                                                                                                                           │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-8859-15'[39m    │ [33m'csisolatin9'[39m, [33m'iso8859-15'[39m, [33m'iso885915'[39m, [33m'iso_8859-15'[39m, [33m'l9'[39m                                                                                                                                       │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'koi8-r'[39m         │ [33m'cskoi8r'[39m, [33m'koi'[39m, [33m'koi8'[39m, [33m'koi8_r'[39m                                                                                                                                                                  │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'koi8-u'[39m         │ [33m'koi8-ru'[39m                                                                                                                                                                                           │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'macintosh'[39m      │ [33m'csmacintosh'[39m, [33m'mac'[39m, [33m'x-mac-roman'[39m                                                                                                                                                                 │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-874'[39m    │ [33m'dos-874'[39m, [33m'iso-8859-11'[39m, [33m'iso8859-11'[39m, [33m'iso885911'[39m, [33m'tis-620'[39m                                                                                                                                      │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-1250'[39m   │ [33m'cp1250'[39m, [33m'x-cp1250'[39m                                                                                                                                                                                │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-1251'[39m   │ [33m'cp1251'[39m, [33m'x-cp1251'[39m                                                                                                                                                                                │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-1252'[39m   │ [33m'ansi_x3.4-1968'[39m, [33m'ascii'[39m, [33m'cp1252'[39m, [33m'cp819'[39m, [33m'csisolatin1'[39m, [33m'ibm819'[39m, [33m'iso-8859-1'[39m, [33m'iso-ir-100'[39m, [33m'iso8859-1'[39m, [33m'iso88591'[39m, [33m'iso_8859-1'[39m, [33m'iso_8859-1:1987'[39m, [33m'l1'[39m, [33m'latin1'[39m, [33m'us-ascii'[39m, [33m'x-cp1252'[39m │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-1253'[39m   │ [33m'cp1253'[39m, [33m'x-cp1253'[39m                                                                                                                                                                                │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-1254'[39m   │ [33m'cp1254'[39m, [33m'csisolatin5'[39m, [33m'iso-8859-9'[39m, [33m'iso-ir-148'[39m, [33m'iso8859-9'[39m, [33m'iso88599'[39m, [33m'iso_8859-9'[39m, [33m'iso_8859-9:1989'[39m, [33m'l5'[39m, [33m'latin5'[39m, [33m'x-cp1254'[39m                                                           │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-1255'[39m   │ [33m'cp1255'[39m, [33m'x-cp1255'[39m                                                                                                                                                                                │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-1256'[39m   │ [33m'cp1256'[39m, [33m'x-cp1256'[39m                                                                                                                                                                                │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-1257'[39m   │ [33m'cp1257'[39m, [33m'x-cp1257'[39m                                                                                                                                                                                │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'windows-1258'[39m   │ [33m'cp1258'[39m, [33m'x-cp1258'[39m                                                                                                                                                                                │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'x-mac-cyrillic'[39m │ [33m'x-mac-ukrainian'[39m                                                                                                                                                                                   │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'gbk'[39m            │ [33m'chinese'[39m, [33m'csgb2312'[39m, [33m'csiso58gb231280'[39m, [33m'gb2312'[39m, [33m'gb_2312'[39m, [33m'gb_2312-80'[39m, [33m'iso-ir-58'[39m, [33m'x-gbk'[39m                                                                                                   │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'gb18030'[39m        │                                                                                                                                                                                                     │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'big5'[39m           │ [33m'big5-hkscs'[39m, [33m'cn-big5'[39m, [33m'csbig5'[39m, [33m'x-x-big5'[39m                                                                                                                                                       │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'euc-jp'[39m         │ [33m'cseucpkdfmtjapanese'[39m, [33m'x-euc-jp'[39m                                                                                                                                                                   │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'iso-2022-jp'[39m    │ [33m'csiso2022jp'[39m                                                                                                                                                                                       │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'shift_jis'[39m      │ [33m'csshiftjis'[39m, [33m'ms932'[39m, [33m'ms_kanji'[39m, [33m'shift-jis'[39m, [33m'sjis'[39m, [33m'windows-31j'[39m, [33m'x-sjis'[39m                                                                                                                     │[0m
[0m├──────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'euc-kr'[39m         │ [33m'cseuckr'[39m, [33m'csksc56011987'[39m, [33m'iso-ir-149'[39m, [33m'korean'[39m, [33m'ks_c_5601-1987'[39m, [33m'ks_c_5601-1989'[39m, [33m'ksc5601'[39m, [33m'ksc_5601'[39m, [33m'windows-949'[39m                                                                        │[0m
[0m└──────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘[0m

[32m[1m#### Encodings Supported when Node.js is built with the [33msmall-icu[39m[32m option[22m[39m

[0m┌────────────┬─────────────────────────────┐[0m
[0m│ Encoding   │ Aliases                     │[0m
[0m├────────────┼─────────────────────────────┤[0m
[0m│ [33m'utf-8'[39m    │ [33m'unicode-1-1-utf-8'[39m, [33m'utf8'[39m │[0m
[0m├────────────┼─────────────────────────────┤[0m
[0m│ [33m'utf-16le'[39m │ [33m'utf-16'[39m                    │[0m
[0m├────────────┼─────────────────────────────┤[0m
[0m│ [33m'utf-16be'[39m │                             │[0m
[0m└────────────┴─────────────────────────────┘[0m

[32m[1m#### Encodings Supported when ICU is disabled[22m[39m

[0m┌────────────┬─────────────────────────────┐[0m
[0m│ Encoding   │ Aliases                     │[0m
[0m├────────────┼─────────────────────────────┤[0m
[0m│ [33m'utf-8'[39m    │ [33m'unicode-1-1-utf-8'[39m, [33m'utf8'[39m │[0m
[0m├────────────┼─────────────────────────────┤[0m
[0m│ [33m'utf-16le'[39m │ [33m'utf-16'[39m                    │[0m
[0m└────────────┴─────────────────────────────┘[0m

[0mThe [33m'iso-8859-16'[39m encoding listed in the [WHATWG Encoding Standard][][0m
[0mis not supported.[0m

[32m[1m### [33mnew TextDecoder([encoding[, options]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: v11.0.0[39m
[90m    description: The class is now available on the global object.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mencoding[39m {string} Identifies the [33mencoding[39m that this [33mTextDecoder[39m instance[0m
      [0msupports. [1mDefault:[22m [33m'utf-8'[39m.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mfatal[39m {boolean} [33mtrue[39m if decoding failures are fatal.[0m[0m[0m
      [0m      [0m[0mThis option is not supported when ICU is disabled[0m[0m[0m
      [0m      [0m[0m(see [Internationalization][]). [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mignoreBOM[39m {boolean} When [33mtrue[39m, the [33mTextDecoder[39m will include the byte[0m[0m[0m
      [0m      [0m[0m order mark in the decoded result. When [33mfalse[39m, the byte order mark will[0m[0m[0m
      [0m      [0m[0m be removed from the output. This option is only used when [33mencoding[39m is[0m[0m[0m
      [0m      [0m[0m [33m'utf-8'[39m, [33m'utf-16be'[39m or [33m'utf-16le'[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m

[0mCreates an new [33mTextDecoder[39m instance. The [33mencoding[39m may specify one of the[0m
[0msupported encodings or an alias.[0m

[0mThe [33mTextDecoder[39m class is also available on the global object.[0m

[32m[1m### [33mtextDecoder.decode([input[, options]])[39m[32m[22m[39m

    * [0m[33minput[39m {ArrayBuffer|DataView|TypedArray} An [33mArrayBuffer[39m, [33mDataView[39m or[0m
      [0m[33mTypedArray[39m instance containing the encoded data.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mstream[39m {boolean} [33mtrue[39m if additional chunks of data are expected.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {string}[0m

[0mDecodes the [33minput[39m and returns a string. If [33moptions.stream[39m is [33mtrue[39m, any[0m
[0mincomplete byte sequences occurring at the end of the [33minput[39m are buffered[0m
[0minternally and emitted after the next call to [33mtextDecoder.decode()[39m.[0m

[0mIf [33mtextDecoder.fatal[39m is [33mtrue[39m, decoding errors that occur will result in a[0m
[0m[33mTypeError[39m being thrown.[0m

[32m[1m### [33mtextDecoder.encoding[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe encoding supported by the [33mTextDecoder[39m instance.[0m

[32m[1m### [33mtextDecoder.fatal[39m[32m[22m[39m

    * [0m{boolean}[0m

[0mThe value will be [33mtrue[39m if decoding errors result in a [33mTypeError[39m being[0m
[0mthrown.[0m

[32m[1m### [33mtextDecoder.ignoreBOM[39m[32m[22m[39m

    * [0m{boolean}[0m

[0mThe value will be [33mtrue[39m if the decoding result will include the byte order[0m
[0mmark.[0m

[32m[1m## Class: [33mutil.TextEncoder[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: v11.0.0[39m
[90m    description: The class is now available on the global object.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn implementation of the [WHATWG Encoding Standard][] [33mTextEncoder[39m API. All[0m
[0minstances of [33mTextEncoder[39m only support UTF-8 encoding.[0m

    [94mconst[39m [37mencoder[39m [93m=[39m [31mnew[39m [37mTextEncoder[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37muint8array[39m [93m=[39m [37mencoder[39m[32m.[39m[37mencode[39m[90m([39m[92m'this is some data'[39m[90m)[39m[90m;[39m

[0mThe [33mTextEncoder[39m class is also available on the global object.[0m

[32m[1m### [33mtextEncoder.encode([input])[39m[32m[22m[39m

    * [0m[33minput[39m {string} The text to encode. [1mDefault:[22m an empty string.[0m
    * [0mReturns: {Uint8Array}[0m

[0mUTF-8 encodes the [33minput[39m string and returns a [33mUint8Array[39m containing the[0m
[0mencoded bytes.[0m

[32m[1m### [33mtextEncoder.encodeInto(src, dest)[39m[32m[22m[39m

    * [0m[33msrc[39m {string} The text to encode.[0m
    * [0m[33mdest[39m {Uint8Array} The array to hold the encode result.[0m
    * [0mReturns: {Object}
        * [0m[0m[33mread[39m {number} The read Unicode code units of src.[0m[0m[0m
      [0m
        * [0m[0m[33mwritten[39m {number} The written UTF-8 bytes of dest.[0m[0m[0m

[0mUTF-8 encodes the [33msrc[39m string to the [33mdest[39m Uint8Array and returns an object[0m
[0mcontaining the read Unicode code units and written UTF-8 bytes.[0m

    [94mconst[39m [37mencoder[39m [93m=[39m [31mnew[39m [37mTextEncoder[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37msrc[39m [93m=[39m [92m'this is some data'[39m[90m;[39m
    [94mconst[39m [37mdest[39m [93m=[39m [31mnew[39m [37mUint8Array[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mread[39m[32m,[39m [37mwritten[39m [33m}[39m [93m=[39m [37mencoder[39m[32m.[39m[37mencodeInto[39m[90m([39m[37msrc[39m[32m,[39m [37mdest[39m[90m)[39m[90m;[39m

[32m[1m### [33mtextEncoder.encoding[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe encoding supported by the [33mTextEncoder[39m instance. Always set to [33m'utf-8'[39m.[0m

[32m[1m## [33mutil.types[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0m[33mutil.types[39m provides type checks for different kinds of built-in objects.[0m
[0mUnlike [33minstanceof[39m or [33mObject.prototype.toString.call(value)[39m, these checks do[0m
[0mnot inspect properties of the object that are accessible from JavaScript (like[0m
[0mtheir prototype), and usually have the overhead of calling into C++.[0m

[0mThe result generally does not make any guarantees about what kinds of[0m
[0mproperties or behavior a value exposes in JavaScript. They are primarily[0m
[0museful for addon developers who prefer to do type checking in JavaScript.[0m

[32m[1m### [33mutil.types.isAnyArrayBuffer(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mArrayBuffer[39m][] or[0m
[0m[[33mSharedArrayBuffer[39m][] instance.[0m

[0mSee also [[33mutil.types.isArrayBuffer()[39m][] and[0m
[0m[[33mutil.types.isSharedArrayBuffer()[39m][].[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misAnyArrayBuffer[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misAnyArrayBuffer[39m[90m([39m[31mnew[39m [37mSharedArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isArgumentsObject(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is an [33marguments[39m object.[0m

[90m<!-- eslint-disable prefer-rest-params -->[39m
[90m[39m    [94mfunction[39m [37mfoo[39m[90m([39m[90m)[39m [33m{[39m
      [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misArgumentsObject[39m[90m([39m[37marguments[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [33m}[39m

[32m[1m### [33mutil.types.isArrayBuffer(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mArrayBuffer[39m][] instance.[0m
[0mThis does [3mnot[23m include [[33mSharedArrayBuffer[39m][] instances. Usually, it is[0m
[0mdesirable to test for both; See [[33mutil.types.isAnyArrayBuffer()[39m][] for that.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misArrayBuffer[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misArrayBuffer[39m[90m([39m[31mnew[39m [37mSharedArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isAsyncFunction(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is an [async function][].[0m
[0mThis only reports back what the JavaScript engine is seeing;[0m
[0min particular, the return value may not match the original source code if[0m
[0ma transpilation tool was used.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misAsyncFunction[39m[90m([39m[94mfunction[39m [37mfoo[39m[90m([39m[90m)[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misAsyncFunction[39m[90m([39m[37masync[39m [94mfunction[39m [37mfoo[39m[90m([39m[90m)[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isBigInt64Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a [33mBigInt64Array[39m instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBigInt64Array[39m[90m([39m[31mnew[39m [37mBigInt64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m   [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBigInt64Array[39m[90m([39m[31mnew[39m [37mBigUint64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isBigUint64Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a [33mBigUint64Array[39m instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBigUint64Array[39m[90m([39m[31mnew[39m [37mBigInt64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m   [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBigUint64Array[39m[90m([39m[31mnew[39m [37mBigUint64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isBooleanObject(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a boolean object, e.g. created[0m
[0mby [33mnew Boolean()[39m.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBooleanObject[39m[90m([39m[91mfalse[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBooleanObject[39m[90m([39m[91mtrue[39m[90m)[39m[90m;[39m   [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBooleanObject[39m[90m([39m[31mnew[39m [37mBoolean[39m[90m([39m[91mfalse[39m[90m)[39m[90m)[39m[90m;[39m [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBooleanObject[39m[90m([39m[31mnew[39m [37mBoolean[39m[90m([39m[91mtrue[39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBooleanObject[39m[90m([39m[37mBoolean[39m[90m([39m[91mfalse[39m[90m)[39m[90m)[39m[90m;[39m [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBooleanObject[39m[90m([39m[37mBoolean[39m[90m([39m[91mtrue[39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isBoxedPrimitive(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is any boxed primitive object, e.g. created[0m
[0mby [33mnew Boolean()[39m, [33mnew String()[39m or [33mObject(Symbol())[39m.[0m

[0mFor example:[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBoxedPrimitive[39m[90m([39m[91mfalse[39m[90m)[39m[90m;[39m [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBoxedPrimitive[39m[90m([39m[31mnew[39m [37mBoolean[39m[90m([39m[91mfalse[39m[90m)[39m[90m)[39m[90m;[39m [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBoxedPrimitive[39m[90m([39m[37mSymbol[39m[90m([39m[92m'foo'[39m[90m)[39m[90m)[39m[90m;[39m [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBoxedPrimitive[39m[90m([39m[37mObject[39m[90m([39m[37mSymbol[39m[90m([39m[92m'foo'[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misBoxedPrimitive[39m[90m([39m[37mObject[39m[90m([39m[37mBigInt[39m[90m([39m[34m5[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m [90m// Returns true[39m

[32m[1m### [33mutil.types.isDataView(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mDataView[39m][] instance.[0m

    [94mconst[39m [37mab[39m [93m=[39m [31mnew[39m [37mArrayBuffer[39m[90m([39m[34m20[39m[90m)[39m[90m;[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misDataView[39m[90m([39m[31mnew[39m [37mDataView[39m[90m([39m[37mab[39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misDataView[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[0mSee also [[33mArrayBuffer.isView()[39m][].[0m

[32m[1m### [33mutil.types.isDate(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mDate[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misDate[39m[90m([39m[31mnew[39m [37mDate[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isExternal(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a native [33mExternal[39m value.[0m

[0mA native [33mExternal[39m value is a special type of object that contains a[0m
[0mraw C++ pointer ([33mvoid*[39m) for access from native code, and has no other[0m
[0mproperties. Such objects are created either by Node.js internals or native[0m
[0maddons. In JavaScript, they are [frozen][[33mObject.freeze()[39m] objects with a[0m
[0m[33mnull[39m prototype.[0m

    [33m#include <js_native_api.h>[39m
    [33m#include <stdlib.h>[39m
    [33mnapi_value result;[39m
    [33mstatic napi_value MyNapi(napi_env env, napi_callback_info info) {[39m
    [33m  int* raw = (int*) malloc(1024);[39m
    [33m  napi_status status = napi_create_external(env, (void*) raw, NULL, NULL, &result);[39m
    [33m  if (status != napi_ok) {[39m
    [33m    napi_throw_error(env, NULL, "napi_create_external failed");[39m
    [33m    return NULL;[39m
    [33m  }[39m
    [33m  return result;[39m
    [33m}[39m
    [33m...[39m
    [33mDECLARE_NAPI_PROPERTY("myNapi", MyNapi)[39m
    [33m...[39m

    [94mconst[39m [37mnative[39m [93m=[39m [37mrequire[39m[90m([39m[92m'napi_addon.node'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mdata[39m [93m=[39m [37mnative[39m[32m.[39m[37mmyNapi[39m[90m([39m[90m)[39m[90m;[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misExternal[39m[90m([39m[37mdata[39m[90m)[39m[90m;[39m [90m// returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misExternal[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m [90m// returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misExternal[39m[90m([39m[31mnew[39m [37mString[39m[90m([39m[92m'foo'[39m[90m)[39m[90m)[39m[90m;[39m [90m// returns false[39m

[0mFor further information on [33mnapi_create_external[39m, refer to[0m
[0m[[33mnapi_create_external()[39m][].[0m

[32m[1m### [33mutil.types.isFloat32Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mFloat32Array[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misFloat32Array[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misFloat32Array[39m[90m([39m[31mnew[39m [37mFloat32Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misFloat32Array[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isFloat64Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mFloat64Array[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misFloat64Array[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misFloat64Array[39m[90m([39m[31mnew[39m [37mUint8Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misFloat64Array[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isGeneratorFunction(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a generator function.[0m
[0mThis only reports back what the JavaScript engine is seeing;[0m
[0min particular, the return value may not match the original source code if[0m
[0ma transpilation tool was used.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misGeneratorFunction[39m[90m([39m[94mfunction[39m [37mfoo[39m[90m([39m[90m)[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misGeneratorFunction[39m[90m([39m[94mfunction[39m[93m*[39m [37mfoo[39m[90m([39m[90m)[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isGeneratorObject(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a generator object as returned from a[0m
[0mbuilt-in generator function.[0m
[0mThis only reports back what the JavaScript engine is seeing;[0m
[0min particular, the return value may not match the original source code if[0m
[0ma transpilation tool was used.[0m

    [94mfunction[39m[93m*[39m [37mfoo[39m[90m([39m[90m)[39m [33m{[39m[33m}[39m
    [94mconst[39m [37mgenerator[39m [93m=[39m [37mfoo[39m[90m([39m[90m)[39m[90m;[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misGeneratorObject[39m[90m([39m[37mgenerator[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isInt8Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mInt8Array[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misInt8Array[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misInt8Array[39m[90m([39m[31mnew[39m [37mInt8Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misInt8Array[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isInt16Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mInt16Array[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misInt16Array[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misInt16Array[39m[90m([39m[31mnew[39m [37mInt16Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misInt16Array[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isInt32Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mInt32Array[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misInt32Array[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misInt32Array[39m[90m([39m[31mnew[39m [37mInt32Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misInt32Array[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isMap(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mMap[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misMap[39m[90m([39m[31mnew[39m [37mMap[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isMapIterator(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is an iterator returned for a built-in[0m
[0m[[33mMap[39m][] instance.[0m

    [94mconst[39m [37mmap[39m [93m=[39m [31mnew[39m [37mMap[39m[90m([39m[90m)[39m[90m;[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misMapIterator[39m[90m([39m[37mmap[39m[32m.[39m[37mkeys[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misMapIterator[39m[90m([39m[37mmap[39m[32m.[39m[37mvalues[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misMapIterator[39m[90m([39m[37mmap[39m[32m.[39m[37mentries[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misMapIterator[39m[90m([39m[37mmap[39m[33m[[39m[37mSymbol[39m[32m.[39m[37miterator[39m[33m][39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isModuleNamespaceObject(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is an instance of a [Module Namespace Object][].[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [94mimport[39m [93m*[39m [37mas[39m [37mns[39m [37mfrom[39m [92m'./a.js'[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misModuleNamespaceObject[39m[90m([39m[37mns[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isNativeError(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is an instance of a built-in [[33mError[39m][] type.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misNativeError[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misNativeError[39m[90m([39m[31mnew[39m [37mTypeError[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misNativeError[39m[90m([39m[31mnew[39m [37mRangeError[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isNumberObject(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a number object, e.g. created[0m
[0mby [33mnew Number()[39m.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misNumberObject[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misNumberObject[39m[90m([39m[31mnew[39m [37mNumber[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m   [90m// Returns true[39m

[32m[1m### [33mutil.types.isPromise(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mPromise[39m][].[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misPromise[39m[90m([39m[37mPromise[39m[32m.[39m[37mresolve[39m[90m([39m[34m42[39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isProxy(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a [[33mProxy[39m][] instance.[0m

    [94mconst[39m [37mtarget[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [94mconst[39m [37mproxy[39m [93m=[39m [31mnew[39m [37mProxy[39m[90m([39m[37mtarget[39m[32m,[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misProxy[39m[90m([39m[37mtarget[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misProxy[39m[90m([39m[37mproxy[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isRegExp(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a regular expression object.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misRegExp[39m[90m([39m/abc/[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misRegExp[39m[90m([39m[31mnew[39m [37mRegExp[39m[90m([39m[92m'abc'[39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isSet(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mSet[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misSet[39m[90m([39m[31mnew[39m [37mSet[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isSetIterator(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is an iterator returned for a built-in[0m
[0m[[33mSet[39m][] instance.[0m

    [94mconst[39m [37mset[39m [93m=[39m [31mnew[39m [37mSet[39m[90m([39m[90m)[39m[90m;[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misSetIterator[39m[90m([39m[37mset[39m[32m.[39m[37mkeys[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misSetIterator[39m[90m([39m[37mset[39m[32m.[39m[37mvalues[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misSetIterator[39m[90m([39m[37mset[39m[32m.[39m[37mentries[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misSetIterator[39m[90m([39m[37mset[39m[33m[[39m[37mSymbol[39m[32m.[39m[37miterator[39m[33m][39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isSharedArrayBuffer(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mSharedArrayBuffer[39m][] instance.[0m
[0mThis does [3mnot[23m include [[33mArrayBuffer[39m][] instances. Usually, it is[0m
[0mdesirable to test for both; See [[33mutil.types.isAnyArrayBuffer()[39m][] for that.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misSharedArrayBuffer[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misSharedArrayBuffer[39m[90m([39m[31mnew[39m [37mSharedArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isStringObject(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a string object, e.g. created[0m
[0mby [33mnew String()[39m.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misStringObject[39m[90m([39m[92m'foo'[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misStringObject[39m[90m([39m[31mnew[39m [37mString[39m[90m([39m[92m'foo'[39m[90m)[39m[90m)[39m[90m;[39m   [90m// Returns true[39m

[32m[1m### [33mutil.types.isSymbolObject(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a symbol object, created[0m
[0mby calling [33mObject()[39m on a [33mSymbol[39m primitive.[0m

    [94mconst[39m [37msymbol[39m [93m=[39m [37mSymbol[39m[90m([39m[92m'foo'[39m[90m)[39m[90m;[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misSymbolObject[39m[90m([39m[37msymbol[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misSymbolObject[39m[90m([39m[37mObject[39m[90m([39m[37msymbol[39m[90m)[39m[90m)[39m[90m;[39m   [90m// Returns true[39m

[32m[1m### [33mutil.types.isTypedArray(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mTypedArray[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misTypedArray[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misTypedArray[39m[90m([39m[31mnew[39m [37mUint8Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misTypedArray[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[0mSee also [[33mArrayBuffer.isView()[39m][].[0m

[32m[1m### [33mutil.types.isUint8Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mUint8Array[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint8Array[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint8Array[39m[90m([39m[31mnew[39m [37mUint8Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint8Array[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isUint8ClampedArray(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mUint8ClampedArray[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint8ClampedArray[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint8ClampedArray[39m[90m([39m[31mnew[39m [37mUint8ClampedArray[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint8ClampedArray[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isUint16Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mUint16Array[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint16Array[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint16Array[39m[90m([39m[31mnew[39m [37mUint16Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint16Array[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isUint32Array(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mUint32Array[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint32Array[39m[90m([39m[31mnew[39m [37mArrayBuffer[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint32Array[39m[90m([39m[31mnew[39m [37mUint32Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misUint32Array[39m[90m([39m[31mnew[39m [37mFloat64Array[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns false[39m

[32m[1m### [33mutil.types.isWeakMap(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mWeakMap[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misWeakMap[39m[90m([39m[31mnew[39m [37mWeakMap[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isWeakSet(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mWeakSet[39m][] instance.[0m

    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misWeakSet[39m[90m([39m[31mnew[39m [37mWeakSet[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m### [33mutil.types.isWebAssemblyCompiledModule(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mdeprecated: REPLACEME[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [33mvalue instanceof WebAssembly.Module[39m[90m instead.[0m[23m[39m

    * [0m[33mvalue[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the value is a built-in [[33mWebAssembly.Module[39m][] instance.[0m

    [94mconst[39m [37mmodule[39m [93m=[39m [31mnew[39m [37mWebAssembly[39m[32m.[39m[37mModule[39m[90m([39m[37mwasmBuffer[39m[90m)[39m[90m;[39m
    [37mutil[39m[32m.[39m[37mtypes[39m[32m.[39m[37misWebAssemblyCompiledModule[39m[90m([39m[37mmodule[39m[90m)[39m[90m;[39m  [90m// Returns true[39m

[32m[1m## Deprecated APIs[22m[39m

[0mThe following APIs are deprecated and should no longer be used. Existing[0m
[0mapplications and modules should be updated to find alternative approaches.[0m

[32m[1m### [33mutil._extend(target, source)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.5[39m
[90mdeprecated: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [[33mObject.assign()[39m[90m][] instead.[0m[23m[39m

    * [0m[33mtarget[39m {Object}[0m
    * [0m[33msource[39m {Object}[0m

[0mThe [33mutil._extend()[39m method was never intended to be used outside of internal[0m
[0mNode.js modules. The community found and used it anyway.[0m

[0mIt is deprecated and should not be used in new code. JavaScript comes with very[0m
[0msimilar built-in functionality through [[33mObject.assign()[39m][].[0m

[32m[1m### [33mutil.isArray(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mArray.isArray()[39m[90m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Object[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mAlias for [34m[33mArray.isArray()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Object[24m[39m[34m)[39m.[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is an [33mArray[39m. Otherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misArray[39m[90m([39m[33m[[39m[33m][39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misArray[39m[90m([39m[31mnew[39m [37mArray[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misArray[39m[90m([39m[33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m

[32m[1m### [33mutil.isBoolean(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [33mtypeof value === 'boolean'[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is a [33mBoolean[39m. Otherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misBoolean[39m[90m([39m[34m1[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misBoolean[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misBoolean[39m[90m([39m[91mfalse[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m

[32m[1m### [33mutil.isBuffer(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [[33mBuffer.isBuffer()[39m[90m][] instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is a [33mBuffer[39m. Otherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misBuffer[39m[90m([39m[33m{[39m [37mlength[39m[93m:[39m [34m0[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misBuffer[39m[90m([39m[33m[[39m[33m][39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misBuffer[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'hello world'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m

[32m[1m### [33mutil.isDate(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [[33mutil.types.isDate()[39m[90m][] instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is a [33mDate[39m. Otherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misDate[39m[90m([39m[31mnew[39m [37mDate[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misDate[39m[90m([39m[37mDate[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// false (without 'new' returns a String)[39m
    [37mutil[39m[32m.[39m[37misDate[39m[90m([39m[33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m

[32m[1m### [33mutil.isError(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [[33mutil.types.isNativeError()[39m[90m][] instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is an [[33mError[39m][]. Otherwise, returns[0m
[0m[33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misError[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misError[39m[90m([39m[31mnew[39m [37mTypeError[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misError[39m[90m([39m[33m{[39m [37mname[39m[93m:[39m [92m'Error'[39m[32m,[39m [37mmessage[39m[93m:[39m [92m'an error occurred'[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m

[0mThis method relies on [33mObject.prototype.toString()[39m behavior. It is[0m
[0mpossible to obtain an incorrect result when the [33mobject[39m argument manipulates[0m
[0m[33m@@toStringTag[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mobj[39m [93m=[39m [33m{[39m [37mname[39m[93m:[39m [92m'Error'[39m[32m,[39m [37mmessage[39m[93m:[39m [92m'an error occurred'[39m [33m}[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misError[39m[90m([39m[37mobj[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mobj[39m[33m[[39m[37mSymbol[39m[32m.[39m[37mtoStringTag[39m[33m][39m [93m=[39m [92m'Error'[39m[90m;[39m
    [37mutil[39m[32m.[39m[37misError[39m[90m([39m[37mobj[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m

[32m[1m### [33mutil.isFunction(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [33mtypeof value === 'function'[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is a [33mFunction[39m. Otherwise, returns[0m
[0m[33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mFoo[39m[90m([39m[90m)[39m [33m{[39m[33m}[39m
    [94mconst[39m [37mBar[39m [93m=[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misFunction[39m[90m([39m[33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misFunction[39m[90m([39m[37mFoo[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misFunction[39m[90m([39m[37mBar[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m

[32m[1m### [33mutil.isNull(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [33mvalue === null[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is strictly [33mnull[39m. Otherwise, returns[0m
[0m[33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misNull[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misNull[39m[90m([39m[90mundefined[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misNull[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m

[32m[1m### [33mutil.isNullOrUndefined(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use[0m[23m[39m
[90m[3m    [0m[33mvalue === undefined || value === null[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is [33mnull[39m or [33mundefined[39m. Otherwise,[0m
[0mreturns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misNullOrUndefined[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misNullOrUndefined[39m[90m([39m[90mundefined[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misNullOrUndefined[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m

[32m[1m### [33mutil.isNumber(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [33mtypeof value === 'number'[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is a [33mNumber[39m. Otherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misNumber[39m[90m([39m[91mfalse[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misNumber[39m[90m([39m[37mInfinity[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misNumber[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misNumber[39m[90m([39m[37mNaN[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m

[32m[1m### [33mutil.isObject(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated:[0m[23m[39m
[90m[3m    [0mUse [33mvalue !== null && typeof value === 'object'[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is strictly an [33mObject[39m [1mand[22m not a[0m
[0m[33mFunction[39m (even though functions are objects in JavaScript).[0m
[0mOtherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misObject[39m[90m([39m[34m5[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misObject[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misObject[39m[90m([39m[33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misObject[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m

[32m[1m### [33mutil.isPrimitive(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use[0m[23m[39m
[90m[3m    [0m[33m(typeof value !== 'object' && typeof value !== 'function') || value === null[39m[90m[0m[23m[39m
[90m[3m    [0minstead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is a primitive type. Otherwise, returns[0m
[0m[33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misPrimitive[39m[90m([39m[34m5[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misPrimitive[39m[90m([39m[92m'foo'[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misPrimitive[39m[90m([39m[91mfalse[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misPrimitive[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misPrimitive[39m[90m([39m[90mundefined[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misPrimitive[39m[90m([39m[33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misPrimitive[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misPrimitive[39m[90m([39m/^$/[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misPrimitive[39m[90m([39m[31mnew[39m [37mDate[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m

[32m[1m### [33mutil.isRegExp(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is a [33mRegExp[39m. Otherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misRegExp[39m[90m([39m/some regexp/[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misRegExp[39m[90m([39m[31mnew[39m [37mRegExp[39m[90m([39m[92m'another regexp'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misRegExp[39m[90m([39m[33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m

[32m[1m### [33mutil.isString(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [33mtypeof value === 'string'[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is a [33mstring[39m. Otherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misString[39m[90m([39m[92m''[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misString[39m[90m([39m[92m'foo'[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misString[39m[90m([39m[37mString[39m[90m([39m[92m'foo'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misString[39m[90m([39m[34m5[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m

[32m[1m### [33mutil.isSymbol(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [33mtypeof value === 'symbol'[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is a [33mSymbol[39m. Otherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[37misSymbol[39m[90m([39m[34m5[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misSymbol[39m[90m([39m[92m'foo'[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misSymbol[39m[90m([39m[37mSymbol[39m[90m([39m[92m'foo'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m

[32m[1m### [33mutil.isUndefined(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [33mvalue === undefined[39m[90m instead.[0m[23m[39m

    * [0m[33mobject[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33mobject[39m is [33mundefined[39m. Otherwise, returns [33mfalse[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mfoo[39m [93m=[39m [90mundefined[39m[90m;[39m
    [37mutil[39m[32m.[39m[37misUndefined[39m[90m([39m[34m5[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m
    [37mutil[39m[32m.[39m[37misUndefined[39m[90m([39m[37mfoo[39m[90m)[39m[90m;[39m
    [90m// Returns: true[39m
    [37mutil[39m[32m.[39m[37misUndefined[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
    [90m// Returns: false[39m

[32m[1m### [33mutil.log(string)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90mdeprecated: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use a third party module instead.[0m[23m[39m

    * [0m[33mstring[39m {string}[0m

[0mThe [33mutil.log()[39m method prints the given [33mstring[39m to [33mstdout[39m with an included[0m
[0mtimestamp.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [37mutil[39m[32m.[39m[34mlog[39m[90m([39m[92m'Timestamped message.'[39m[90m)[39m[90m;[39m

[0ms/Array/isArray[0m
[0m[[33mArrayBuffer.isView()[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView[24m[39m[34m[39m[0m
[0m[[33mArrayBuffer[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer[24m[39m[34m[39m[0m
[0m[[33mBuffer.isBuffer()[39m]: buffer.html#buffer_class_method_buffer_isbuffer_obj[0m
[0m[[33mDataView[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView[24m[39m[34m[39m[0m
[0m[[33mDate[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date[24m[39m[34m[39m[0m
[0m[[33mError[39m]: errors.html#errors_class_error[0m
[0m[[33mFloat32Array[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array[24m[39m[34m[39m[0m
[0m[[33mFloat64Array[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array[24m[39m[34m[39m[0m
[0m[[33mInt16Array[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array[24m[39m[34m[39m[0m
[0m[[33mInt32Array[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array[24m[39m[34m[39m[0m
[0m[[33mInt8Array[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array[24m[39m[34m[39m[0m
[0m[[33mMap[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map[24m[39m[34m[39m[0m
[0m[[33mObject.assign()[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign[24m[39m[34m[39m[0m
[0m[[33mObject.freeze()[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze[24m[39m[34m[39m[0m
[0m[[33mPromise[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise[24m[39m[34m[39m[0m
[0m[[33mProxy[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy[24m[39m[34m[39m[0m
[0m[[33mSet[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set[24m[39m[34m[39m[0m
[0m[[33mSharedArrayBuffer[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer[24m[39m[34m[39m[0m
[0m[[33mTypedArray[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray[24m[39m[34m[39m[0m
[0m[[33mUint16Array[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array[24m[39m[34m[39m[0m
[0m[[33mUint32Array[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array[24m[39m[34m[39m[0m
[0m[[33mUint8Array[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array[24m[39m[34m[39m[0m
[0m[[33mUint8ClampedArray[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray[24m[39m[34m[39m[0m
[0m[[33mWeakMap[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap[24m[39m[34m[39m[0m
[0m[[33mWeakSet[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet[24m[39m[34m[39m[0m
[0m[[33mWebAssembly.Module[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module[24m[39m[34m[39m[0m
[0m[[33massert.deepStrictEqual()[39m]: assert.html#assert_assert_deepstrictequal_actual_expected_message[0m
[0m[[33mconsole.error()[39m]: console.html#console_console_error_data_args[0m
[0m[[33mtarget[39m and [33mhandler[39m]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Terminology[24m[39m[34m[39m[0m
[0m[[33mtty.hasColors()[39m]: tty.html#tty_writestream_hascolors_count_env[0m
[0m[[33mutil.format()[39m]: #util_util_format_format_args[0m
[0m[[33mutil.inspect()[39m]: #util_util_inspect_object_options[0m
[0m[[33mutil.promisify()[39m]: #util_util_promisify_original[0m
[0m[[33mutil.types.isAnyArrayBuffer()[39m]: #util_util_types_isanyarraybuffer_value[0m
[0m[[33mutil.types.isArrayBuffer()[39m]: #util_util_types_isarraybuffer_value[0m
[0m[[33mutil.types.isDate()[39m]: #util_util_types_isdate_value[0m
[0m[[33mutil.types.isNativeError()[39m]: #util_util_types_isnativeerror_value[0m
[0m[[33mutil.types.isSharedArrayBuffer()[39m]: #util_util_types_issharedarraybuffer_value[0m
[0m[Common System Errors]: errors.html#errors_common_system_errors[0m
[0m[Custom inspection functions on Objects]: #util_custom_inspection_functions_on_objects[0m
[0m[Custom promisified functions]: #util_custom_promisified_functions[0m
[0m[Customizing [33mutil.inspect[39m colors]: #util_customizing_util_inspect_colors[0m
[0m[Internationalization]: intl.html[0m
[0m[Module Namespace Object]: [34m[34m[4mhttps://tc39.github.io/ecma262/#sec-module-namespace-exotic-objects[24m[39m[34m[39m[0m
[0m[WHATWG Encoding Standard]: [34m[34m[4mhttps://encoding.spec.whatwg.org/[24m[39m[34m[39m[0m
[0m[async function]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function[24m[39m[34m[39m[0m
[0m[compare function]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters[24m[39m[34m[39m[0m
[0m[constructor]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor[24m[39m[34m[39m[0m
[0m[default sort]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort[24m[39m[34m[39m[0m
[0m[global symbol registry]: [34m[34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for[24m[39m[34m[39m[0m
[0m[list of deprecated APIS]: deprecations.html#deprecations_list_of_deprecated_apis[0m
[0m[[33mnapi_create_external()[39m]: n-api.html#n_api_napi_create_external[0m
[0m[semantically incompatible]: [34m[34m[4mhttps://github.com/nodejs/node/issues/4179[24m[39m[34m[39m[0m
[0m[util.inspect.custom]: #util_util_inspect_custom[0m

