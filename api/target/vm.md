[35m[4m[1m# VM (Executing JavaScript)[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[90m<!--name=vm-->[39m
[90m[39m
[90m[39m[0mThe [33mvm[39m module enables compiling and running code within V8 Virtual[0m
[0mMachine contexts. [1mThe [33mvm[39m module is not a security mechanism. Do[22m[0m
[0m[1mnot use it to run untrusted code[22m.[0m

[0mJavaScript code can be compiled and run immediately or[0m
[0mcompiled, saved, and run later.[0m

[0mA common use case is to run the code in a different V8 Context. This means[0m
[0minvoked code has a different global object than the invoking code.[0m

[0mOne can provide the context by [34m[3mcontextifying[23m ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m an[0m
[0mobject. The invoked code treats any property in the context like a[0m
[0mglobal variable. Any changes to global variables caused by the invoked[0m
[0mcode are reflected in the context object.[0m

    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mx[39m [93m=[39m [34m1[39m[90m;[39m
    
    [94mconst[39m [37mcontext[39m [93m=[39m [33m{[39m [37mx[39m[93m:[39m [34m2[39m [33m}[39m[90m;[39m
    [37mvm[39m[32m.[39m[37mcreateContext[39m[90m([39m[37mcontext[39m[90m)[39m[90m;[39m [90m// Contextify the object.[39m
    
    [94mconst[39m [37mcode[39m [93m=[39m [92m'x += 40; var y = 17;'[39m[90m;[39m
    [90m// `x` and `y` are global variables in the context.[39m
    [90m// Initially, x has the value 2 because that is the value of context.x.[39m
    [37mvm[39m[32m.[39m[37mrunInContext[39m[90m([39m[37mcode[39m[32m,[39m [37mcontext[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mcontext[39m[32m.[39m[37mx[39m[90m)[39m[90m;[39m [90m// 42[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mcontext[39m[32m.[39m[37my[39m[90m)[39m[90m;[39m [90m// 17[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mx[39m[90m)[39m[90m;[39m [90m// 1; y is not defined.[39m

[32m[1m## Class: [33mvm.Script[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.1[39m
[90m-->[39m
[90m[39m
[90m[39m[0mInstances of the [33mvm.Script[39m class contain precompiled scripts that can be[0m
[0mexecuted in specific contexts.[0m

[32m[1m### Constructor: [33mnew vm.Script(code[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.1[39m
[90mchanges:[39m
[90m  - version: v5.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4777[39m
[90m    description: The `cachedData` and `produceCachedData` options are[39m
[90m                 supported now.[39m
[90m  - version: v10.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20300[39m
[90m    description: The `produceCachedData` is deprecated in favour of[39m
[90m                 `script.createCachedData()`[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {string} The JavaScript code to compile.[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mfilename[39m {string} Specifies the filename used in stack traces produced[0m[0m[0m
      [0m      [0m[0mby this script. [1mDefault:[22m [33m'evalmachine.<anonymous>'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mlineOffset[39m {number} Specifies the line number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcolumnOffset[39m {number} Specifies the column number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcachedData[39m {Buffer|TypedArray|DataView} Provides an optional [33mBuffer[39m or[0m[0m[0m
      [0m      [0m[0m[33mTypedArray[39m, or [33mDataView[39m with V8's code cache data for the supplied[0m[0m[0m
      [0m      [0m[0m source. When supplied, the [33mcachedDataRejected[39m value will be set to[0m[0m[0m
      [0m      [0m[0m either [33mtrue[39m or [33mfalse[39m depending on acceptance of the data by V8.[0m[0m[0m
      [0m
        * [0m[0m[33mproduceCachedData[39m {boolean} When [33mtrue[39m and no [33mcachedData[39m is present, V8[0m[0m[0m
      [0m      [0m[0mwill attempt to produce code cache data for [33mcode[39m. Upon success, a[0m[0m[0m
      [0m      [0m[0m[33mBuffer[39m with V8's code cache data will be produced and stored in the[0m[0m[0m
      [0m      [0m[0m[33mcachedData[39m property of the returned [33mvm.Script[39m instance.[0m[0m[0m
      [0m      [0m[0mThe [33mcachedDataProduced[39m value will be set to either [33mtrue[39m or [33mfalse[39m[0m[0m[0m
      [0m      [0m[0mdepending on whether code cache data is produced successfully.[0m[0m[0m
      [0m      [0m[0mThis option is [1mdeprecated[22m in favor of [33mscript.createCachedData()[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mimportModuleDynamically[39m {Function} Called during evaluation of this module[0m[0m[0m
      [0m      [0m[0mwhen [33mimport()[39m is called. If this option is not specified, calls to[0m[0m[0m
      [0m      [0m[0m[33mimport()[39m will reject with [34m[33mERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[39m[34m ([34m[4merrors.html#ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0mThis option is part of the experimental modules API, and should not be[0m[0m[0m
      [0m      [0m[0mconsidered stable.[0m
      [0m
            * [0m[0m[0m[0m[33mspecifier[39m {string} specifier passed to [33mimport()[39m[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mmodule[39m {vm.Module}[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0mReturns: {Module Namespace Object|vm.Module} Returning a [33mvm.Module[39m is[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mrecommended in order to take advantage of error tracking, and to avoid[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0missues with namespaces that contain [33mthen[39m function exports.[0m[0m[0m[0m[0m[0m[0m

[0mIf [33moptions[39m is a string, then it specifies the filename.[0m

[0mCreating a new [33mvm.Script[39m object compiles [33mcode[39m but does not run it. The[0m
[0mcompiled [33mvm.Script[39m can be run later multiple times. The [33mcode[39m is not bound to[0m
[0many global object; rather, it is bound before each run, just for that run.[0m

[32m[1m### [33mscript.createCachedData()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Buffer}[0m

[0mCreates a code cache that can be used with the [33mScript[39m constructor's[0m
[0m[33mcachedData[39m option. Returns a [33mBuffer[39m. This method may be called at any[0m
[0mtime and any number of times.[0m

    [94mconst[39m [37mscript[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mScript[39m[90m([39m`
    function add(a, b) {
      return a + b;
    }
    
    const x = add(1, 2);
    `[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcacheWithoutX[39m [93m=[39m [37mscript[39m[32m.[39m[37mcreateCachedData[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mscript[39m[32m.[39m[37mrunInThisContext[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcacheWithX[39m [93m=[39m [37mscript[39m[32m.[39m[37mcreateCachedData[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33mscript.runInContext(contextifiedObject[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.1[39m
[90mchanges:[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6635[39m
[90m    description: The `breakOnSigint` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcontextifiedObject[39m {Object} A [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m object as returned by the[0m
      [0m[33mvm.createContext()[39m method.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mdisplayErrors[39m {boolean} When [33mtrue[39m, if an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m occurs[0m[0m[0m
      [0m      [0m[0mwhile compiling the [33mcode[39m, the line of code causing the error is attached[0m[0m[0m
      [0m      [0m[0mto the stack trace. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {integer} Specifies the number of milliseconds to execute [33mcode[39m[0m[0m[0m
      [0m      [0m[0mbefore terminating execution. If execution is terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mwill be thrown. This value must be a strictly positive integer.[0m[0m[0m
      [0m
        * [0m[0m[33mbreakOnSigint[39m {boolean} If [33mtrue[39m, the execution will be terminated when[0m[0m[0m
      [0m      [0m[0m[33mSIGINT[39m (Ctrl+C) is received. Existing handlers for the[0m[0m[0m
      [0m      [0m[0mevent that have been attached via [33mprocess.on('SIGINT')[39m will be disabled[0m[0m[0m
      [0m      [0m[0mduring script execution, but will continue to work after that. If execution[0m[0m[0m
      [0m      [0m[0mis terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m will be thrown. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {any} the result of the very last statement executed in the script.[0m

[0mRuns the compiled code contained by the [33mvm.Script[39m object within the given[0m
[0m[33mcontextifiedObject[39m and returns the result. Running code does not have access[0m
[0mto local scope.[0m

[0mThe following example compiles code that increments a global variable, sets[0m
[0mthe value of another global variable, then execute the code multiple times.[0m
[0mThe globals are contained in the [33mcontext[39m object.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcontext[39m [93m=[39m [33m{[39m
      [37manimal[39m[93m:[39m [92m'cat'[39m[32m,[39m
      [37mcount[39m[93m:[39m [34m2[39m
    [33m}[39m[90m;[39m
    
    [94mconst[39m [37mscript[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mScript[39m[90m([39m[92m'count += 1; name = "kitty";'[39m[90m)[39m[90m;[39m
    
    [37mvm[39m[32m.[39m[37mcreateContext[39m[90m([39m[37mcontext[39m[90m)[39m[90m;[39m
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m10[39m[90m;[39m [93m++[39m[37mi[39m[90m)[39m [33m{[39m
      [37mscript[39m[32m.[39m[37mrunInContext[39m[90m([39m[37mcontext[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mcontext[39m[90m)[39m[90m;[39m
    [90m// Prints: { animal: 'cat', count: 12, name: 'kitty' }[39m

[0mUsing the [33mtimeout[39m or [33mbreakOnSigint[39m options will result in new event loops[0m
[0mand corresponding threads being started, which have a non-zero performance[0m
[0moverhead.[0m

[32m[1m### [33mscript.runInNewContext([contextObject[, options]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.1[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19016[39m
[90m    description: The `contextCodeGeneration` option is supported now.[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6635[39m
[90m    description: The `breakOnSigint` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcontextObject[39m {Object} An object that will be [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m. If[0m
      [0m[33mundefined[39m, a new object will be created.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mdisplayErrors[39m {boolean} When [33mtrue[39m, if an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m occurs[0m[0m[0m
      [0m      [0m[0mwhile compiling the [33mcode[39m, the line of code causing the error is attached[0m[0m[0m
      [0m      [0m[0mto the stack trace. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {integer} Specifies the number of milliseconds to execute [33mcode[39m[0m[0m[0m
      [0m      [0m[0mbefore terminating execution. If execution is terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mwill be thrown. This value must be a strictly positive integer.[0m[0m[0m
      [0m
        * [0m[0m[33mbreakOnSigint[39m {boolean} If [33mtrue[39m, the execution will be terminated when[0m[0m[0m
      [0m      [0m[0m[33mSIGINT[39m (Ctrl+C) is received. Existing handlers for the[0m[0m[0m
      [0m      [0m[0mevent that have been attached via [33mprocess.on('SIGINT')[39m will be disabled[0m[0m[0m
      [0m      [0m[0mduring script execution, but will continue to work after that. If execution[0m[0m[0m
      [0m      [0m[0mis terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m will be thrown. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcontextName[39m {string} Human-readable name of the newly created context.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'VM Context i'[39m, where [33mi[39m is an ascending numerical index of[0m[0m[0m
      [0m      [0m[0mthe created context.[0m[0m[0m
      [0m
        * [0m[0m[33mcontextOrigin[39m {string} [34mOrigin ([34m[4mhttps://developer.mozilla.org/en-US/docs/Glossary/Origin[24m[39m[34m)[39m corresponding to the newly[0m[0m[0m
      [0m      [0m[0mcreated context for display purposes. The origin should be formatted like a[0m[0m[0m
      [0m      [0m[0mURL, but with only the scheme, host, and port (if necessary), like the[0m[0m[0m
      [0m      [0m[0mvalue of the [34m[33murl.origin[39m[34m ([34m[4murl.html#url_url_origin[24m[39m[34m)[39m property of a [34m[33mURL[39m[34m ([34m[4murl.html#url_class_url[24m[39m[34m)[39m object. Most notably,[0m[0m[0m
      [0m      [0m[0mthis string should omit the trailing slash, as that denotes a path.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m''[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcontextCodeGeneration[39m {Object}[0m
      [0m
            * [0m[0m[0m[0m[33mstrings[39m {boolean} If set to false any calls to [33meval[39m or function[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mconstructors ([33mFunction[39m, [33mGeneratorFunction[39m, etc) will throw an[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0m[33mEvalError[39m. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mwasm[39m {boolean} If set to false any attempt to compile a WebAssembly[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mmodule will throw a [33mWebAssembly.CompileError[39m. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m[0m[0m[0m[0m
    * [0mReturns: {any} the result of the very last statement executed in the script.[0m

[0mFirst contextifies the given [33mcontextObject[39m, runs the compiled code contained[0m
[0mby the [33mvm.Script[39m object within the created context, and returns the result.[0m
[0mRunning code does not have access to local scope.[0m

[0mThe following example compiles code that sets a global variable, then executes[0m
[0mthe code multiple times in different contexts. The globals are set on and[0m
[0mcontained within each individual [33mcontext[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mscript[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mScript[39m[90m([39m[92m'globalVar = "set"'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcontexts[39m [93m=[39m [33m[[39m[33m{[39m[33m}[39m[32m,[39m [33m{[39m[33m}[39m[32m,[39m [33m{[39m[33m}[39m[33m][39m[90m;[39m
    [37mcontexts[39m[32m.[39m[37mforEach[39m[90m([39m[90m([39m[37mcontext[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mscript[39m[32m.[39m[37mrunInNewContext[39m[90m([39m[37mcontext[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mcontexts[39m[90m)[39m[90m;[39m
    [90m// Prints: [{ globalVar: 'set' }, { globalVar: 'set' }, { globalVar: 'set' }][39m

[32m[1m### [33mscript.runInThisContext([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.1[39m
[90mchanges:[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6635[39m
[90m    description: The `breakOnSigint` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mdisplayErrors[39m {boolean} When [33mtrue[39m, if an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m occurs[0m[0m[0m
      [0m      [0m[0mwhile compiling the [33mcode[39m, the line of code causing the error is attached[0m[0m[0m
      [0m      [0m[0mto the stack trace. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {integer} Specifies the number of milliseconds to execute [33mcode[39m[0m[0m[0m
      [0m      [0m[0mbefore terminating execution. If execution is terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mwill be thrown. This value must be a strictly positive integer.[0m[0m[0m
      [0m
        * [0m[0m[33mbreakOnSigint[39m {boolean} If [33mtrue[39m, the execution will be terminated when[0m[0m[0m
      [0m      [0m[0m[33mSIGINT[39m (Ctrl+C) is received. Existing handlers for the[0m[0m[0m
      [0m      [0m[0mevent that have been attached via [33mprocess.on('SIGINT')[39m will be disabled[0m[0m[0m
      [0m      [0m[0mduring script execution, but will continue to work after that. If execution[0m[0m[0m
      [0m      [0m[0mis terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m will be thrown. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {any} the result of the very last statement executed in the script.[0m

[0mRuns the compiled code contained by the [33mvm.Script[39m within the context of the[0m
[0mcurrent [33mglobal[39m object. Running code does not have access to local scope, but[0m
[0m[3mdoes[23m have access to the current [33mglobal[39m object.[0m

[0mThe following example compiles code that increments a [33mglobal[39m variable then[0m
[0mexecutes that code multiple times:[0m

    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [37mglobal[39m[32m.[39m[37mglobalVar[39m [93m=[39m [34m0[39m[90m;[39m
    
    [94mconst[39m [37mscript[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mScript[39m[90m([39m[92m'globalVar += 1'[39m[32m,[39m [33m{[39m [37mfilename[39m[93m:[39m [92m'myfile.vm'[39m [33m}[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m1000[39m[90m;[39m [93m++[39m[37mi[39m[90m)[39m [33m{[39m
      [37mscript[39m[32m.[39m[37mrunInThisContext[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mglobalVar[39m[90m)[39m[90m;[39m
    
    [90m// 1000[39m

[32m[1m## [33mvm.measureMemory([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mMeasure the memory known to V8 and used by the current execution context[0m
[0mor a specified context.[0m

    * [0m[33moptions[39m {Object} Optional.
        * [0m[0m[33mmode[39m {string} Either [33m'summary'[39m or [33m'detailed'[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'summary'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mcontext[39m {Object} Optional. A [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m object returned[0m[0m[0m
      [0m      [0m[0mby [33mvm.createContext()[39m. If not specified, measure the memory[0m[0m[0m
      [0m      [0m[0musage of the current context where [33mvm.measureMemory()[39m is invoked.[0m[0m[0m
    * [0mReturns: {Promise} If the memory is successfully measured the promise will[0m
      [0mresolve with an object containing information about the memory usage.[0m

[0mThe format of the object that the returned Promise may resolve with is[0m
[0mspecific to the V8 engine and may change from one version of V8 to the next.[0m

[0mThe returned result is different from the statistics returned by[0m
[0m[33mv8.getHeapSpaceStatistics()[39m in that [33mvm.measureMemory()[39m measures[0m
[0mthe memory reachable by V8 from a specific context, while[0m
[0m[33mv8.getHeapSpaceStatistics()[39m measures the memory used by an instance[0m
[0mof V8 engine, which can switch among multiple contexts that reference[0m
[0mobjects in the heap of one engine.[0m

    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    [90m// Measure the memory used by the current context and return the result[39m
    [90m// in summary.[39m
    [37mvm[39m[32m.[39m[37mmeasureMemory[39m[90m([39m[33m{[39m [37mmode[39m[93m:[39m [92m'summary'[39m [33m}[39m[90m)[39m
      [90m// Is the same as vm.measureMemory()[39m
      [32m.[39m[37mthen[39m[90m([39m[90m([39m[37mresult[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// The current format is:[39m
        [90m// { total: { jsMemoryEstimate: 2211728, jsMemoryRange: [ 0, 2211728 ] } }[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mresult[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcontext[39m [93m=[39m [37mvm[39m[32m.[39m[37mcreateContext[39m[90m([39m[33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [37mvm[39m[32m.[39m[37mmeasureMemory[39m[90m([39m[33m{[39m [37mmode[39m[93m:[39m [92m'detailed'[39m [33m}[39m[32m,[39m [37mcontext[39m[90m)[39m
      [32m.[39m[37mthen[39m[90m([39m[90m([39m[37mresult[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// At the moment the detailed format is the same as the summary one.[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mresult[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Class: [33mvm.Module[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0m[3mThis feature is only available with the [33m--experimental-vm-modules[39m command[23m[0m
[0m[3mflag enabled.[23m[0m

[0mThe [33mvm.Module[39m class provides a low-level interface for using[0m
[0mECMAScript modules in VM contexts. It is the counterpart of the [33mvm.Script[39m[0m
[0mclass that closely mirrors [34mModule Record ([34m[4mhttps://www.ecma-international.org/ecma-262/#sec-abstract-module-records[24m[39m[34m)[39ms as defined in the ECMAScript[0m
[0mspecification.[0m

[0mUnlike [33mvm.Script[39m however, every [33mvm.Module[39m object is bound to a context from[0m
[0mits creation. Operations on [33mvm.Module[39m objects are intrinsically asynchronous,[0m
[0min contrast with the synchronous nature of [33mvm.Script[39m objects. The use of[0m
[0m'async' functions can help with manipulating [33mvm.Module[39m objects.[0m

[0mUsing a [33mvm.Module[39m object requires three distinct steps: creation/parsing,[0m
[0mlinking, and evaluation. These three steps are illustrated in the following[0m
[0mexample.[0m

[0mThis implementation lies at a lower level than the [34mECMAScript Module[39m[0m
[0m[34mloader ([34m[4mesm.html#esm_ecmascript_modules[24m[39m[34m)[39m. There is also currently no way to interact with the Loader, though[0m
[0msupport is planned.[0m

    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcontextifiedObject[39m [93m=[39m [37mvm[39m[32m.[39m[37mcreateContext[39m[90m([39m[33m{[39m [37msecret[39m[93m:[39m [34m42[39m [33m}[39m[90m)[39m[90m;[39m
    
    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Step 1[39m
      [90m//[39m
      [90m// Create a Module by constructing a new `vm.SourceTextModule` object. This[39m
      [90m// parses the provided source text, throwing a `SyntaxError` if anything goes[39m
      [90m// wrong. By default, a Module is created in the top context. But here, we[39m
      [90m// specify `contextifiedObject` as the context this Module belongs to.[39m
      [90m//[39m
      [90m// Here, we attempt to obtain the default export from the module "foo", and[39m
      [90m// put it into local binding "secret".[39m
    
      [94mconst[39m [37mbar[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mSourceTextModule[39m[90m([39m`
        import s from 'foo';
        s;
      `[32m,[39m [33m{[39m [37mcontext[39m[93m:[39m [37mcontextifiedObject[39m [33m}[39m[90m)[39m[90m;[39m
    
      [90m// Step 2[39m
      [90m//[39m
      [90m// "Link" the imported dependencies of this Module to it.[39m
      [90m//[39m
      [90m// The provided linking callback (the "linker") accepts two arguments: the[39m
      [90m// parent module (`bar` in this case) and the string that is the specifier of[39m
      [90m// the imported module. The callback is expected to return a Module that[39m
      [90m// corresponds to the provided specifier, with certain requirements documented[39m
      [90m// in `module.link()`.[39m
      [90m//[39m
      [90m// If linking has not started for the returned Module, the same linker[39m
      [90m// callback will be called on the returned Module.[39m
      [90m//[39m
      [90m// Even top-level Modules without dependencies must be explicitly linked. The[39m
      [90m// callback provided would never be called, however.[39m
      [90m//[39m
      [90m// The link() method returns a Promise that will be resolved when all the[39m
      [90m// Promises returned by the linker resolve.[39m
      [90m//[39m
      [90m// Note: This is a contrived example in that the linker function creates a new[39m
      [90m// "foo" module every time it is called. In a full-fledged module system, a[39m
      [90m// cache would probably be used to avoid duplicated modules.[39m
    
      [37masync[39m [94mfunction[39m [37mlinker[39m[90m([39m[37mspecifier[39m[32m,[39m [37mreferencingModule[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37mspecifier[39m [93m===[39m [92m'foo'[39m[90m)[39m [33m{[39m
          [31mreturn[39m [31mnew[39m [37mvm[39m[32m.[39m[37mSourceTextModule[39m[90m([39m`
            // The "secret" variable refers to the global variable we added to
            // "contextifiedObject" when creating the context.
            export default secret;
          `[32m,[39m [33m{[39m [37mcontext[39m[93m:[39m [37mreferencingModule[39m[32m.[39m[37mcontext[39m [33m}[39m[90m)[39m[90m;[39m
    
          [90m// Using `contextifiedObject` instead of `referencingModule.context`[39m
          [90m// here would work as well.[39m
        [33m}[39m
        [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m`Unable to resolve dependency: ${[37mspecifier[39m}`[90m)[39m[90m;[39m
      [33m}[39m
      [37mawait[39m [37mbar[39m[32m.[39m[37mlink[39m[90m([39m[37mlinker[39m[90m)[39m[90m;[39m
    
      [90m// Step 3[39m
      [90m//[39m
      [90m// Evaluate the Module. The evaluate() method returns a Promise with a single[39m
      [90m// property "result" that contains the result of the very last statement[39m
      [90m// executed in the Module. In the case of `bar`, it is `s;`, which refers to[39m
      [90m// the default export of the `foo` module, the `secret` we set in the[39m
      [90m// beginning to 42.[39m
    
      [94mconst[39m [33m{[39m [37mresult[39m [33m}[39m [93m=[39m [37mawait[39m [37mbar[39m[32m.[39m[37mevaluate[39m[90m([39m[90m)[39m[90m;[39m
    
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mresult[39m[90m)[39m[90m;[39m
      [90m// Prints 42.[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33mmodule.dependencySpecifiers[39m[32m[22m[39m

    * [0m{string[]}[0m

[0mThe specifiers of all dependencies of this module. The returned array is frozen[0m
[0mto disallow any changes to it.[0m

[0mCorresponds to the [33m[[RequestedModules]][39m field of [34mCyclic Module Record ([34m[4mhttps://tc39.es/ecma262/#sec-cyclic-module-records[24m[39m[34m)[39ms in[0m
[0mthe ECMAScript specification.[0m

[32m[1m### [33mmodule.error[39m[32m[22m[39m

    * [0m{any}[0m

[0mIf the [33mmodule.status[39m is [33m'errored'[39m, this property contains the exception[0m
[0mthrown by the module during evaluation. If the status is anything else,[0m
[0maccessing this property will result in a thrown exception.[0m

[0mThe value [33mundefined[39m cannot be used for cases where there is not a thrown[0m
[0mexception due to possible ambiguity with [33mthrow undefined;[39m.[0m

[0mCorresponds to the [33m[[EvaluationError]][39m field of [34mCyclic Module Record ([34m[4mhttps://tc39.es/ecma262/#sec-cyclic-module-records[24m[39m[34m)[39ms[0m
[0min the ECMAScript specification.[0m

[32m[1m### [33mmodule.evaluate([options])[39m[32m[22m[39m

    * [0m[33moptions[39m {Object}
        * [0m[0m[33mtimeout[39m {integer} Specifies the number of milliseconds to evaluate[0m[0m[0m
      [0m      [0m[0mbefore terminating execution. If execution is interrupted, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mwill be thrown. This value must be a strictly positive integer.[0m[0m[0m
      [0m
        * [0m[0m[33mbreakOnSigint[39m {boolean} If [33mtrue[39m, the execution will be terminated when[0m[0m[0m
      [0m      [0m[0m[33mSIGINT[39m (Ctrl+C) is received. Existing handlers for the event that have[0m[0m[0m
      [0m      [0m[0mbeen attached via [33mprocess.on('SIGINT')[39m will be disabled during script[0m[0m[0m
      [0m      [0m[0mexecution, but will continue to work after that. If execution is[0m[0m[0m
      [0m      [0m[0minterrupted, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m will be thrown. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mEvaluate the module.[0m

[0mThis must be called after the module has been linked; otherwise it will[0m
[0mthrow an error. It could be called also when the module has already been[0m
[0mevaluated, in which case it will do one of the following two things:[0m

    * [0mreturn [33mundefined[39m if the initial evaluation ended in success ([33mmodule.status[39m[0m
      [0mis [33m'evaluated'[39m)[0m
    * [0mrethrow the same exception the initial evaluation threw if the initial[0m
      [0mevaluation ended in an error ([33mmodule.status[39m is [33m'errored'[39m)[0m

[0mThis method cannot be called while the module is being evaluated[0m
[0m([33mmodule.status[39m is [33m'evaluating'[39m) to prevent infinite recursion.[0m

[0mCorresponds to the [34mEvaluate() concrete method ([34m[4mhttps://tc39.es/ecma262/#sec-moduleevaluation[24m[39m[34m)[39m field of [34mCyclic Module[39m[0m
[0m[34mRecord ([34m[4mhttps://tc39.es/ecma262/#sec-cyclic-module-records[24m[39m[34m)[39ms in the ECMAScript specification.[0m

[32m[1m### [33mmodule.link(linker)[39m[32m[22m[39m

    * [0m[0m[0m[33mlinker[39m {Function}[0m[0m[0m
      [0m[0m
      [0m
        * [0m[0m[0m[0m[0m[0m[33mspecifier[39m {string} The specifier of the requested module:[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m[0m[0m
      [0m      [0m[0m[90m<!-- eslint-skip -->[39m[0m[0m[0m
      [0m      [0m[0m[90m[39m    [94mimport[39m [37mfoo[39m [37mfrom[39m [92m'foo'[39m[90m;[39m[0m[0m[0m
      [0m      [0m[0m    [90m//              ^^^^^ the module specifier[39m[0m[0m[0m
      [0m
        * [0m[0m[0m[0m[0m[0m[33mreferencingModule[39m {vm.Module} The [33mModule[39m object [33mlink()[39m is called on.[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[0m[0m[0m[0mReturns: {vm.Module|Promise}[0m[0m[0m[0m[0m[0m[0m
    * [0m[0m[0mReturns: {Promise}[0m[0m[0m

[0mLink module dependencies. This method must be called before evaluation, and[0m
[0mcan only be called once per module.[0m

[0mThe function is expected to return a [33mModule[39m object or a [33mPromise[39m that[0m
[0meventually resolves to a [33mModule[39m object. The returned [33mModule[39m must satisfy the[0m
[0mfollowing two invariants:[0m

    * [0mIt must belong to the same context as the parent [33mModule[39m.[0m
    * [0mIts [33mstatus[39m must not be [33m'errored'[39m.[0m

[0mIf the returned [33mModule[39m's [33mstatus[39m is [33m'unlinked'[39m, this method will be[0m
[0mrecursively called on the returned [33mModule[39m with the same provided [33mlinker[39m[0m
[0mfunction.[0m

[0m[33mlink()[39m returns a [33mPromise[39m that will either get resolved when all linking[0m
[0minstances resolve to a valid [33mModule[39m, or rejected if the linker function either[0m
[0mthrows an exception or returns an invalid [33mModule[39m.[0m

[0mThe linker function roughly corresponds to the implementation-defined[0m
[0m[34mHostResolveImportedModule ([34m[4mhttps://tc39.es/ecma262/#sec-hostresolveimportedmodule[24m[39m[34m)[39m abstract operation in the ECMAScript[0m
[0mspecification, with a few key differences:[0m

    * [0mThe linker function is allowed to be asynchronous while[0m
      [0m[34mHostResolveImportedModule ([34m[4mhttps://tc39.es/ecma262/#sec-hostresolveimportedmodule[24m[39m[34m)[39m is synchronous.[0m

[0mThe actual [34mHostResolveImportedModule ([34m[4mhttps://tc39.es/ecma262/#sec-hostresolveimportedmodule[24m[39m[34m)[39m implementation used during module[0m
[0mlinking is one that returns the modules linked during linking. Since at[0m
[0mthat point all modules would have been fully linked already, the[0m
[0m[34mHostResolveImportedModule ([34m[4mhttps://tc39.es/ecma262/#sec-hostresolveimportedmodule[24m[39m[34m)[39m implementation is fully synchronous per[0m
[0mspecification.[0m

[0mCorresponds to the [34mLink() concrete method ([34m[4mhttps://tc39.es/ecma262/#sec-moduledeclarationlinking[24m[39m[34m)[39m field of [34mCyclic Module[39m[0m
[0m[34mRecord ([34m[4mhttps://tc39.es/ecma262/#sec-cyclic-module-records[24m[39m[34m)[39ms in the ECMAScript specification.[0m

[32m[1m### [33mmodule.namespace[39m[32m[22m[39m

    * [0m{Object}[0m

[0mThe namespace object of the module. This is only available after linking[0m
[0m([33mmodule.link()[39m) has completed.[0m

[0mCorresponds to the [34mGetModuleNamespace ([34m[4mhttps://tc39.es/ecma262/#sec-getmodulenamespace[24m[39m[34m)[39m abstract operation in the ECMAScript[0m
[0mspecification.[0m

[32m[1m### [33mmodule.status[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe current status of the module. Will be one of:[0m

    * [0m[0m[0m[33m'unlinked'[39m: [33mmodule.link()[39m has not yet been called.[0m[0m[0m
    * [0m[0m[0m[33m'linking'[39m: [33mmodule.link()[39m has been called, but not all Promises returned[0m[0m[0m
      [0m[0m[0mby the linker function have been resolved yet.[0m[0m[0m
    * [0m[0m[0m[33m'linked'[39m: The module has been linked successfully, and all of its[0m[0m[0m
      [0m[0m[0mdependencies are linked, but [33mmodule.evaluate()[39m has not yet been called.[0m[0m[0m
    * [0m[0m[0m[33m'evaluating'[39m: The module is being evaluated through a [33mmodule.evaluate()[39m on[0m[0m[0m
      [0m[0m[0mitself or a parent module.[0m[0m[0m
    * [0m[0m[0m[33m'evaluated'[39m: The module has been successfully evaluated.[0m[0m[0m
    * [0m[0m[0m[33m'errored'[39m: The module has been evaluated, but an exception was thrown.[0m[0m[0m

[0mOther than [33m'errored'[39m, this status string corresponds to the specification's[0m
[0m[34mCyclic Module Record ([34m[4mhttps://tc39.es/ecma262/#sec-cyclic-module-records[24m[39m[34m)[39m's [33m[[Status]][39m field. [33m'errored'[39m corresponds to[0m
[0m[33m'evaluated'[39m in the specification, but with [33m[[EvaluationError]][39m set to a[0m
[0mvalue that is not [33mundefined[39m.[0m

[32m[1m### [33mmodule.identifier[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe identifier of the current module, as set in the constructor.[0m

[32m[1m## Class: [33mvm.SourceTextModule[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0m[3mThis feature is only available with the [33m--experimental-vm-modules[39m command[23m[0m
[0m[3mflag enabled.[23m[0m

    * [0mExtends: {vm.Module}[0m

[0mThe [33mvm.SourceTextModule[39m class provides the [34mSource Text Module Record ([34m[4mhttps://tc39.es/ecma262/#sec-source-text-module-records[24m[39m[34m)[39m as[0m
[0mdefined in the ECMAScript specification.[0m

[32m[1m### Constructor: [33mnew vm.SourceTextModule(code[, options])[39m[32m[22m[39m

    * [0m[33mcode[39m {string} JavaScript Module code to parse[0m
    * [0m[33moptions[39m
        * [0m[0m[33midentifier[39m {string} String used in stack traces.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'vm:module(i)'[39m where [33mi[39m is a context-specific ascending[0m[0m[0m
      [0m      [0m[0mindex.[0m[0m[0m
      [0m
        * [0m[0m[33mcachedData[39m {Buffer|TypedArray|DataView} Provides an optional [33mBuffer[39m or[0m[0m[0m
      [0m      [0m[0m[33mTypedArray[39m, or [33mDataView[39m with V8's code cache data for the supplied[0m[0m[0m
      [0m      [0m[0m source. The [33mcode[39m must be the same as the module from which this[0m[0m[0m
      [0m      [0m[0m [33mcachedData[39m was created.[0m[0m[0m
      [0m
        * [0m[0m[33mcontext[39m {Object} The [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m object as returned by the[0m[0m[0m
      [0m      [0m[0m[33mvm.createContext()[39m method, to compile and evaluate this [33mModule[39m in.[0m[0m[0m
      [0m
        * [0m[0m[33mlineOffset[39m {integer} Specifies the line number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this [33mModule[39m. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcolumnOffset[39m {integer} Specifies the column number offset that is[0m[0m[0m
      [0m      [0m[0mdisplayed in stack traces produced by this [33mModule[39m. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33minitializeImportMeta[39m {Function} Called during evaluation of this [33mModule[39m[0m[0m[0m
      [0m      [0m[0mto initialize the [33mimport.meta[39m.[0m
      [0m
            * [0m[0m[0m[0m[33mmeta[39m {import.meta}[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mmodule[39m {vm.SourceTextModule}[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[33mimportModuleDynamically[39m {Function} Called during evaluation of this module[0m[0m[0m
      [0m      [0m[0mwhen [33mimport()[39m is called. If this option is not specified, calls to[0m[0m[0m
      [0m      [0m[0m[33mimport()[39m will reject with [34m[33mERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[39m[34m ([34m[4merrors.html#ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[24m[39m[34m)[39m.[0m
      [0m
            * [0m[0m[0m[0m[33mspecifier[39m {string} specifier passed to [33mimport()[39m[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mmodule[39m {vm.Module}[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0mReturns: {Module Namespace Object|vm.Module} Returning a [33mvm.Module[39m is[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mrecommended in order to take advantage of error tracking, and to avoid[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0missues with namespaces that contain [33mthen[39m function exports.[0m[0m[0m[0m[0m[0m[0m

[0mCreates a new [33mSourceTextModule[39m instance.[0m

[0mProperties assigned to the [33mimport.meta[39m object that are objects may[0m
[0mallow the module to access information outside the specified [33mcontext[39m. Use[0m
[0m[33mvm.runInContext()[39m to create objects in a specific context.[0m

    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcontextifiedObject[39m [93m=[39m [37mvm[39m[32m.[39m[37mcreateContext[39m[90m([39m[33m{[39m [37msecret[39m[93m:[39m [34m42[39m [33m}[39m[90m)[39m[90m;[39m
    
    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mmodule[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mSourceTextModule[39m[90m([39m
        [92m'Object.getPrototypeOf(import.meta.prop).secret = secret;'[39m[32m,[39m
        [33m{[39m
          [37minitializeImportMeta[39m[90m([39m[37mmeta[39m[90m)[39m [33m{[39m
            [90m// Note: this object is created in the top context. As such,[39m
            [90m// Object.getPrototypeOf(import.meta.prop) points to the[39m
            [90m// Object.prototype in the top context rather than that in[39m
            [90m// the contextified object.[39m
            [37mmeta[39m[32m.[39m[37mprop[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
          [33m}[39m
        [33m}[39m[90m)[39m[90m;[39m
      [90m// Since module has no dependencies, the linker function will never be called.[39m
      [37mawait[39m [37mmodule[39m[32m.[39m[37mlink[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
      [37mawait[39m [37mmodule[39m[32m.[39m[37mevaluate[39m[90m([39m[90m)[39m[90m;[39m
    
      [90m// Now, Object.prototype.secret will be equal to 42.[39m
      [90m//[39m
      [90m// To fix this problem, replace[39m
      [90m//     meta.prop = {};[39m
      [90m// above with[39m
      [90m//     meta.prop = vm.runInContext('{}', contextifiedObject);[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33msourceTextModule.createCachedData()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Buffer}[0m

[0mCreates a code cache that can be used with the [33mSourceTextModule[39m constructor's[0m
[0m[33mcachedData[39m option. Returns a [33mBuffer[39m. This method may be called any number[0m
[0mof times before the module has been evaluated.[0m

    [90m// Create an initial module[39m
    [94mconst[39m [37mmodule[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mSourceTextModule[39m[90m([39m[92m'const a = 1;'[39m[90m)[39m[90m;[39m
    
    [90m// Create cached data from this module[39m
    [94mconst[39m [37mcachedData[39m [93m=[39m [37mmodule[39m[32m.[39m[37mcreateCachedData[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// Create a new module using the cached data. The code must be the same.[39m
    [94mconst[39m [37mmodule2[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mSourceTextModule[39m[90m([39m[92m'const a = 1;'[39m[32m,[39m [33m{[39m [37mcachedData[39m [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Class: [33mvm.SyntheticModule[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0m[3mThis feature is only available with the [33m--experimental-vm-modules[39m command[23m[0m
[0m[3mflag enabled.[23m[0m

    * [0mExtends: {vm.Module}[0m

[0mThe [33mvm.SyntheticModule[39m class provides the [34mSynthetic Module Record ([34m[4mhttps://heycam.github.io/webidl/#synthetic-module-records[24m[39m[34m)[39m as[0m
[0mdefined in the WebIDL specification. The purpose of synthetic modules is to[0m
[0mprovide a generic interface for exposing non-JavaScript sources to ECMAScript[0m
[0mmodule graphs.[0m

    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37msource[39m [93m=[39m [92m'{ "a": 1 }'[39m[90m;[39m
    [94mconst[39m [37mmodule[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mSyntheticModule[39m[90m([39m[33m[[39m[92m'default'[39m[33m][39m[32m,[39m [94mfunction[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [37mobj[39m [93m=[39m [37mJSON[39m[32m.[39m[37mparse[39m[90m([39m[37msource[39m[90m)[39m[90m;[39m
      [91mthis[39m[32m.[39m[37msetExport[39m[90m([39m[92m'default'[39m[32m,[39m [37mobj[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Use `module` in linking...[39m

[32m[1m### Constructor: [33mnew vm.SyntheticModule(exportNames, evaluateCallback[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mexportNames[39m {string[]} Array of names that will be exported from the module.[0m
    * [0m[33mevaluateCallback[39m {Function} Called when the module is evaluated.[0m
    * [0m[33moptions[39m
        * [0m[0m[33midentifier[39m {string} String used in stack traces.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'vm:module(i)'[39m where [33mi[39m is a context-specific ascending[0m[0m[0m
      [0m      [0m[0mindex.[0m[0m[0m
      [0m
        * [0m[0m[33mcontext[39m {Object} The [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m object as returned by the[0m[0m[0m
      [0m      [0m[0m[33mvm.createContext()[39m method, to compile and evaluate this [33mModule[39m in.[0m[0m[0m

[0mCreates a new [33mSyntheticModule[39m instance.[0m

[0mObjects assigned to the exports of this instance may allow importers of[0m
[0mthe module to access information outside the specified [33mcontext[39m. Use[0m
[0m[33mvm.runInContext()[39m to create objects in a specific context.[0m

[32m[1m### [33msyntheticModule.setExport(name, value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string} Name of the export to set.[0m
    * [0m[33mvalue[39m {any} The value to set the export to.[0m

[0mThis method is used after the module is linked to set the values of exports. If[0m
[0mit is called before the module is linked, an [34m[33mERR_VM_MODULE_STATUS[39m[34m ([34m[4merrors.html#ERR_VM_MODULE_STATUS[24m[39m[34m)[39m error[0m
[0mwill be thrown.[0m

    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mm[39m [93m=[39m [31mnew[39m [37mvm[39m[32m.[39m[37mSyntheticModule[39m[90m([39m[33m[[39m[92m'x'[39m[33m][39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mm[39m[32m.[39m[37msetExport[39m[90m([39m[92m'x'[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [37mawait[39m [37mm[39m[32m.[39m[37mlink[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
      [37mawait[39m [37mm[39m[32m.[39m[37mevaluate[39m[90m([39m[90m)[39m[90m;[39m
    
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37mm[39m[32m.[39m[37mnamespace[39m[32m.[39m[37mx[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m## [33mvm.compileFunction(code[, params[, options]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {string} The body of the function to compile.[0m
    * [0m[33mparams[39m {string[]} An array of strings containing all parameters for the[0m
      [0mfunction.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mfilename[39m {string} Specifies the filename used in stack traces produced[0m[0m[0m
      [0m      [0m[0mby this script. [1mDefault:[22m [33m''[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mlineOffset[39m {number} Specifies the line number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcolumnOffset[39m {number} Specifies the column number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcachedData[39m {Buffer|TypedArray|DataView} Provides an optional [33mBuffer[39m or[0m[0m[0m
      [0m      [0m[0m[33mTypedArray[39m, or [33mDataView[39m with V8's code cache data for the supplied[0m[0m[0m
      [0m      [0m[0m source.[0m[0m[0m
      [0m
        * [0m[0m[33mproduceCachedData[39m {boolean} Specifies whether to produce new cache data.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mparsingContext[39m {Object} The [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m object in which the said[0m[0m[0m
      [0m      [0m[0mfunction should be compiled in.[0m[0m[0m
      [0m
        * [0m[0m[33mcontextExtensions[39m {Object[]} An array containing a collection of context[0m[0m[0m
      [0m      [0m[0mextensions (objects wrapping the current scope) to be applied while[0m[0m[0m
      [0m      [0m[0mcompiling. [1mDefault:[22m [33m[][39m.[0m[0m[0m
    * [0mReturns: {Function}[0m

[0mCompiles the given code into the provided context (if no context is[0m
[0msupplied, the current context is used), and returns it wrapped inside a[0m
[0mfunction with the given [33mparams[39m.[0m

[32m[1m## [33mvm.createContext([contextObject[, options]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.1[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19398[39m
[90m    description: The first argument can no longer be a function.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19016[39m
[90m    description: The `codeGeneration` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcontextObject[39m {Object}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mname[39m {string} Human-readable name of the newly created context.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'VM Context i'[39m, where [33mi[39m is an ascending numerical index of[0m[0m[0m
      [0m      [0m[0mthe created context.[0m[0m[0m
      [0m
        * [0m[0m[33morigin[39m {string} [34mOrigin ([34m[4mhttps://developer.mozilla.org/en-US/docs/Glossary/Origin[24m[39m[34m)[39m corresponding to the newly created[0m[0m[0m
      [0m      [0m[0mcontext for display purposes. The origin should be formatted like a URL,[0m[0m[0m
      [0m      [0m[0mbut with only the scheme, host, and port (if necessary), like the value of[0m[0m[0m
      [0m      [0m[0mthe [34m[33murl.origin[39m[34m ([34m[4murl.html#url_url_origin[24m[39m[34m)[39m property of a [34m[33mURL[39m[34m ([34m[4murl.html#url_class_url[24m[39m[34m)[39m object. Most notably, this[0m[0m[0m
      [0m      [0m[0mstring should omit the trailing slash, as that denotes a path.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m''[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcodeGeneration[39m {Object}[0m
      [0m
            * [0m[0m[0m[0m[33mstrings[39m {boolean} If set to false any calls to [33meval[39m or function[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mconstructors ([33mFunction[39m, [33mGeneratorFunction[39m, etc) will throw an[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0m[33mEvalError[39m. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mwasm[39m {boolean} If set to false any attempt to compile a WebAssembly[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mmodule will throw a [33mWebAssembly.CompileError[39m. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m[0m[0m[0m[0m
    * [0mReturns: {Object} contextified object.[0m

[0mIf given a [33mcontextObject[39m, the [33mvm.createContext()[39m method will [34mprepare[39m[0m
[0m[34mthat object ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m so that it can be used in calls to[0m
[0m[34m[33mvm.runInContext()[39m[34m ([34m[4m#vm_vm_runincontext_code_contextifiedobject_options[24m[39m[34m)[39m or [34m[33mscript.runInContext()[39m[34m ([34m[4m#vm_script_runincontext_contextifiedobject_options[24m[39m[34m)[39m. Inside such scripts,[0m
[0mthe [33mcontextObject[39m will be the global object, retaining all of its existing[0m
[0mproperties but also having the built-in objects and functions any standard[0m
[0m[34mglobal object ([34m[4mhttps://es5.github.io/#x15.1[24m[39m[34m)[39m has. Outside of scripts run by the vm module, global variables[0m
[0mwill remain unchanged.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [37mglobal[39m[32m.[39m[37mglobalVar[39m [93m=[39m [34m3[39m[90m;[39m
    
    [94mconst[39m [37mcontext[39m [93m=[39m [33m{[39m [37mglobalVar[39m[93m:[39m [34m1[39m [33m}[39m[90m;[39m
    [37mvm[39m[32m.[39m[37mcreateContext[39m[90m([39m[37mcontext[39m[90m)[39m[90m;[39m
    
    [37mvm[39m[32m.[39m[37mrunInContext[39m[90m([39m[92m'globalVar *= 2;'[39m[32m,[39m [37mcontext[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mcontext[39m[90m)[39m[90m;[39m
    [90m// Prints: { globalVar: 2 }[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mglobal[39m[32m.[39m[37mglobalVar[39m[90m)[39m[90m;[39m
    [90m// Prints: 3[39m

[0mIf [33mcontextObject[39m is omitted (or passed explicitly as [33mundefined[39m), a new,[0m
[0mempty [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m object will be returned.[0m

[0mThe [33mvm.createContext()[39m method is primarily useful for creating a single[0m
[0mcontext that can be used to run multiple scripts. For instance, if emulating a[0m
[0mweb browser, the method can be used to create a single context representing a[0m
[0mwindow's global object, then run all [33m<script>[39m tags together within that[0m
[0mcontext.[0m

[0mThe provided [33mname[39m and [33morigin[39m of the context are made visible through the[0m
[0mInspector API.[0m

[32m[1m## [33mvm.isContext(object)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mobject[39m {Object}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the given [33moject[39m object has been [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m using[0m
[0m[34m[33mvm.createContext()[39m[34m ([34m[4m#vm_vm_createcontext_contextobject_options[24m[39m[34m)[39m.[0m

[32m[1m## [33mvm.runInContext(code, contextifiedObject[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.1[39m
[90mchanges:[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6635[39m
[90m    description: The `breakOnSigint` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {string} The JavaScript code to compile and run.[0m
    * [0m[33mcontextifiedObject[39m {Object} The [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m object that will be used[0m
      [0mas the [33mglobal[39m when the [33mcode[39m is compiled and run.[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mfilename[39m {string} Specifies the filename used in stack traces produced[0m[0m[0m
      [0m      [0m[0mby this script. [1mDefault:[22m [33m'evalmachine.<anonymous>'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mlineOffset[39m {number} Specifies the line number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcolumnOffset[39m {number} Specifies the column number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mdisplayErrors[39m {boolean} When [33mtrue[39m, if an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m occurs[0m[0m[0m
      [0m      [0m[0mwhile compiling the [33mcode[39m, the line of code causing the error is attached[0m[0m[0m
      [0m      [0m[0mto the stack trace. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {integer} Specifies the number of milliseconds to execute [33mcode[39m[0m[0m[0m
      [0m      [0m[0mbefore terminating execution. If execution is terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mwill be thrown. This value must be a strictly positive integer.[0m[0m[0m
      [0m
        * [0m[0m[33mbreakOnSigint[39m {boolean} If [33mtrue[39m, the execution will be terminated when[0m[0m[0m
      [0m      [0m[0m[33mSIGINT[39m (Ctrl+C) is received. Existing handlers for the[0m[0m[0m
      [0m      [0m[0mevent that have been attached via [33mprocess.on('SIGINT')[39m will be disabled[0m[0m[0m
      [0m      [0m[0mduring script execution, but will continue to work after that. If execution[0m[0m[0m
      [0m      [0m[0mis terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m will be thrown. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcachedData[39m {Buffer|TypedArray|DataView} Provides an optional [33mBuffer[39m or[0m[0m[0m
      [0m      [0m[0m[33mTypedArray[39m, or [33mDataView[39m with V8's code cache data for the supplied[0m[0m[0m
      [0m      [0m[0m source. When supplied, the [33mcachedDataRejected[39m value will be set to[0m[0m[0m
      [0m      [0m[0m either [33mtrue[39m or [33mfalse[39m depending on acceptance of the data by V8.[0m[0m[0m
      [0m
        * [0m[0m[33mproduceCachedData[39m {boolean} When [33mtrue[39m and no [33mcachedData[39m is present, V8[0m[0m[0m
      [0m      [0m[0mwill attempt to produce code cache data for [33mcode[39m. Upon success, a[0m[0m[0m
      [0m      [0m[0m[33mBuffer[39m with V8's code cache data will be produced and stored in the[0m[0m[0m
      [0m      [0m[0m[33mcachedData[39m property of the returned [33mvm.Script[39m instance.[0m[0m[0m
      [0m      [0m[0mThe [33mcachedDataProduced[39m value will be set to either [33mtrue[39m or [33mfalse[39m[0m[0m[0m
      [0m      [0m[0mdepending on whether code cache data is produced successfully.[0m[0m[0m
      [0m      [0m[0mThis option is [1mdeprecated[22m in favor of [33mscript.createCachedData()[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mimportModuleDynamically[39m {Function} Called during evaluation of this module[0m[0m[0m
      [0m      [0m[0mwhen [33mimport()[39m is called. If this option is not specified, calls to[0m[0m[0m
      [0m      [0m[0m[33mimport()[39m will reject with [34m[33mERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[39m[34m ([34m[4merrors.html#ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0mThis option is part of the experimental modules API, and should not be[0m[0m[0m
      [0m      [0m[0mconsidered stable.[0m
      [0m
            * [0m[0m[0m[0m[33mspecifier[39m {string} specifier passed to [33mimport()[39m[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mmodule[39m {vm.Module}[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0mReturns: {Module Namespace Object|vm.Module} Returning a [33mvm.Module[39m is[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mrecommended in order to take advantage of error tracking, and to avoid[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0missues with namespaces that contain [33mthen[39m function exports.[0m[0m[0m[0m[0m[0m[0m
    * [0mReturns: {any} the result of the very last statement executed in the script.[0m

[0mThe [33mvm.runInContext()[39m method compiles [33mcode[39m, runs it within the context of[0m
[0mthe [33mcontextifiedObject[39m, then returns the result. Running code does not have[0m
[0maccess to the local scope. The [33mcontextifiedObject[39m object [3mmust[23m have been[0m
[0mpreviously [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m using the [34m[33mvm.createContext()[39m[34m ([34m[4m#vm_vm_createcontext_contextobject_options[24m[39m[34m)[39m method.[0m

[0mIf [33moptions[39m is a string, then it specifies the filename.[0m

[0mThe following example compiles and executes different scripts using a single[0m
[0m[34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m object:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcontextObject[39m [93m=[39m [33m{[39m [37mglobalVar[39m[93m:[39m [34m1[39m [33m}[39m[90m;[39m
    [37mvm[39m[32m.[39m[37mcreateContext[39m[90m([39m[37mcontextObject[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m10[39m[90m;[39m [93m++[39m[37mi[39m[90m)[39m [33m{[39m
      [37mvm[39m[32m.[39m[37mrunInContext[39m[90m([39m[92m'globalVar *= 2;'[39m[32m,[39m [37mcontextObject[39m[90m)[39m[90m;[39m
    [33m}[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mcontextObject[39m[90m)[39m[90m;[39m
    [90m// Prints: { globalVar: 1024 }[39m

[32m[1m## [33mvm.runInNewContext(code[, contextObject[, options]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.1[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19016[39m
[90m    description: The `contextCodeGeneration` option is supported now.[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6635[39m
[90m    description: The `breakOnSigint` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {string} The JavaScript code to compile and run.[0m
    * [0m[33mcontextObject[39m {Object} An object that will be [34mcontextified ([34m[4m#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m. If[0m
      [0m[33mundefined[39m, a new object will be created.[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mfilename[39m {string} Specifies the filename used in stack traces produced[0m[0m[0m
      [0m      [0m[0mby this script. [1mDefault:[22m [33m'evalmachine.<anonymous>'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mlineOffset[39m {number} Specifies the line number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcolumnOffset[39m {number} Specifies the column number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mdisplayErrors[39m {boolean} When [33mtrue[39m, if an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m occurs[0m[0m[0m
      [0m      [0m[0mwhile compiling the [33mcode[39m, the line of code causing the error is attached[0m[0m[0m
      [0m      [0m[0mto the stack trace. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {integer} Specifies the number of milliseconds to execute [33mcode[39m[0m[0m[0m
      [0m      [0m[0mbefore terminating execution. If execution is terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mwill be thrown. This value must be a strictly positive integer.[0m[0m[0m
      [0m
        * [0m[0m[33mbreakOnSigint[39m {boolean} If [33mtrue[39m, the execution will be terminated when[0m[0m[0m
      [0m      [0m[0m[33mSIGINT[39m (Ctrl+C) is received. Existing handlers for the[0m[0m[0m
      [0m      [0m[0mevent that have been attached via [33mprocess.on('SIGINT')[39m will be disabled[0m[0m[0m
      [0m      [0m[0mduring script execution, but will continue to work after that. If execution[0m[0m[0m
      [0m      [0m[0mis terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m will be thrown. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcontextName[39m {string} Human-readable name of the newly created context.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'VM Context i'[39m, where [33mi[39m is an ascending numerical index of[0m[0m[0m
      [0m      [0m[0mthe created context.[0m[0m[0m
      [0m
        * [0m[0m[33mcontextOrigin[39m {string} [34mOrigin ([34m[4mhttps://developer.mozilla.org/en-US/docs/Glossary/Origin[24m[39m[34m)[39m corresponding to the newly[0m[0m[0m
      [0m      [0m[0mcreated context for display purposes. The origin should be formatted like a[0m[0m[0m
      [0m      [0m[0mURL, but with only the scheme, host, and port (if necessary), like the[0m[0m[0m
      [0m      [0m[0mvalue of the [34m[33murl.origin[39m[34m ([34m[4murl.html#url_url_origin[24m[39m[34m)[39m property of a [34m[33mURL[39m[34m ([34m[4murl.html#url_class_url[24m[39m[34m)[39m object. Most notably,[0m[0m[0m
      [0m      [0m[0mthis string should omit the trailing slash, as that denotes a path.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m''[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcontextCodeGeneration[39m {Object}[0m
      [0m
            * [0m[0m[0m[0m[33mstrings[39m {boolean} If set to false any calls to [33meval[39m or function[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mconstructors ([33mFunction[39m, [33mGeneratorFunction[39m, etc) will throw an[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0m[33mEvalError[39m. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mwasm[39m {boolean} If set to false any attempt to compile a WebAssembly[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mmodule will throw a [33mWebAssembly.CompileError[39m. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[33mcachedData[39m {Buffer|TypedArray|DataView} Provides an optional [33mBuffer[39m or[0m[0m[0m
      [0m      [0m[0m[33mTypedArray[39m, or [33mDataView[39m with V8's code cache data for the supplied[0m[0m[0m
      [0m      [0m[0m source. When supplied, the [33mcachedDataRejected[39m value will be set to[0m[0m[0m
      [0m      [0m[0m either [33mtrue[39m or [33mfalse[39m depending on acceptance of the data by V8.[0m[0m[0m
      [0m
        * [0m[0m[33mproduceCachedData[39m {boolean} When [33mtrue[39m and no [33mcachedData[39m is present, V8[0m[0m[0m
      [0m      [0m[0mwill attempt to produce code cache data for [33mcode[39m. Upon success, a[0m[0m[0m
      [0m      [0m[0m[33mBuffer[39m with V8's code cache data will be produced and stored in the[0m[0m[0m
      [0m      [0m[0m[33mcachedData[39m property of the returned [33mvm.Script[39m instance.[0m[0m[0m
      [0m      [0m[0mThe [33mcachedDataProduced[39m value will be set to either [33mtrue[39m or [33mfalse[39m[0m[0m[0m
      [0m      [0m[0mdepending on whether code cache data is produced successfully.[0m[0m[0m
      [0m      [0m[0mThis option is [1mdeprecated[22m in favor of [33mscript.createCachedData()[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mimportModuleDynamically[39m {Function} Called during evaluation of this module[0m[0m[0m
      [0m      [0m[0mwhen [33mimport()[39m is called. If this option is not specified, calls to[0m[0m[0m
      [0m      [0m[0m[33mimport()[39m will reject with [34m[33mERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[39m[34m ([34m[4merrors.html#ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0mThis option is part of the experimental modules API, and should not be[0m[0m[0m
      [0m      [0m[0mconsidered stable.[0m
      [0m
            * [0m[0m[0m[0m[33mspecifier[39m {string} specifier passed to [33mimport()[39m[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mmodule[39m {vm.Module}[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0mReturns: {Module Namespace Object|vm.Module} Returning a [33mvm.Module[39m is[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mrecommended in order to take advantage of error tracking, and to avoid[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0missues with namespaces that contain [33mthen[39m function exports.[0m[0m[0m[0m[0m[0m[0m
    * [0mReturns: {any} the result of the very last statement executed in the script.[0m

[0mThe [33mvm.runInNewContext()[39m first contextifies the given [33mcontextObject[39m (or[0m
[0mcreates a new [33mcontextObject[39m if passed as [33mundefined[39m), compiles the [33mcode[39m,[0m
[0mruns it within the created context, then returns the result. Running code[0m
[0mdoes not have access to the local scope.[0m

[0mIf [33moptions[39m is a string, then it specifies the filename.[0m

[0mThe following example compiles and executes code that increments a global[0m
[0mvariable and sets a new one. These globals are contained in the [33mcontextObject[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcontextObject[39m [93m=[39m [33m{[39m
      [37manimal[39m[93m:[39m [92m'cat'[39m[32m,[39m
      [37mcount[39m[93m:[39m [34m2[39m
    [33m}[39m[90m;[39m
    
    [37mvm[39m[32m.[39m[37mrunInNewContext[39m[90m([39m[92m'count += 1; name = "kitty"'[39m[32m,[39m [37mcontextObject[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mcontextObject[39m[90m)[39m[90m;[39m
    [90m// Prints: { animal: 'cat', count: 3, name: 'kitty' }[39m

[32m[1m## [33mvm.runInThisContext(code[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.1[39m
[90mchanges:[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6635[39m
[90m    description: The `breakOnSigint` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {string} The JavaScript code to compile and run.[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mfilename[39m {string} Specifies the filename used in stack traces produced[0m[0m[0m
      [0m      [0m[0mby this script. [1mDefault:[22m [33m'evalmachine.<anonymous>'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mlineOffset[39m {number} Specifies the line number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcolumnOffset[39m {number} Specifies the column number offset that is displayed[0m[0m[0m
      [0m      [0m[0min stack traces produced by this script. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mdisplayErrors[39m {boolean} When [33mtrue[39m, if an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m occurs[0m[0m[0m
      [0m      [0m[0mwhile compiling the [33mcode[39m, the line of code causing the error is attached[0m[0m[0m
      [0m      [0m[0mto the stack trace. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {integer} Specifies the number of milliseconds to execute [33mcode[39m[0m[0m[0m
      [0m      [0m[0mbefore terminating execution. If execution is terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mwill be thrown. This value must be a strictly positive integer.[0m[0m[0m
      [0m
        * [0m[0m[33mbreakOnSigint[39m {boolean} If [33mtrue[39m, the execution will be terminated when[0m[0m[0m
      [0m      [0m[0m[33mSIGINT[39m (Ctrl+C) is received. Existing handlers for the[0m[0m[0m
      [0m      [0m[0mevent that have been attached via [33mprocess.on('SIGINT')[39m will be disabled[0m[0m[0m
      [0m      [0m[0mduring script execution, but will continue to work after that. If execution[0m[0m[0m
      [0m      [0m[0mis terminated, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m will be thrown. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcachedData[39m {Buffer|TypedArray|DataView} Provides an optional [33mBuffer[39m or[0m[0m[0m
      [0m      [0m[0m[33mTypedArray[39m, or [33mDataView[39m with V8's code cache data for the supplied[0m[0m[0m
      [0m      [0m[0m source. When supplied, the [33mcachedDataRejected[39m value will be set to[0m[0m[0m
      [0m      [0m[0m either [33mtrue[39m or [33mfalse[39m depending on acceptance of the data by V8.[0m[0m[0m
      [0m
        * [0m[0m[33mproduceCachedData[39m {boolean} When [33mtrue[39m and no [33mcachedData[39m is present, V8[0m[0m[0m
      [0m      [0m[0mwill attempt to produce code cache data for [33mcode[39m. Upon success, a[0m[0m[0m
      [0m      [0m[0m[33mBuffer[39m with V8's code cache data will be produced and stored in the[0m[0m[0m
      [0m      [0m[0m[33mcachedData[39m property of the returned [33mvm.Script[39m instance.[0m[0m[0m
      [0m      [0m[0mThe [33mcachedDataProduced[39m value will be set to either [33mtrue[39m or [33mfalse[39m[0m[0m[0m
      [0m      [0m[0mdepending on whether code cache data is produced successfully.[0m[0m[0m
      [0m      [0m[0mThis option is [1mdeprecated[22m in favor of [33mscript.createCachedData()[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mimportModuleDynamically[39m {Function} Called during evaluation of this module[0m[0m[0m
      [0m      [0m[0mwhen [33mimport()[39m is called. If this option is not specified, calls to[0m[0m[0m
      [0m      [0m[0m[33mimport()[39m will reject with [34m[33mERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[39m[34m ([34m[4merrors.html#ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0mThis option is part of the experimental modules API, and should not be[0m[0m[0m
      [0m      [0m[0mconsidered stable.[0m
      [0m
            * [0m[0m[0m[0m[33mspecifier[39m {string} specifier passed to [33mimport()[39m[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mmodule[39m {vm.Module}[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0mReturns: {Module Namespace Object|vm.Module} Returning a [33mvm.Module[39m is[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mrecommended in order to take advantage of error tracking, and to avoid[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0missues with namespaces that contain [33mthen[39m function exports.[0m[0m[0m[0m[0m[0m[0m
    * [0mReturns: {any} the result of the very last statement executed in the script.[0m

[0m[33mvm.runInThisContext()[39m compiles [33mcode[39m, runs it within the context of the[0m
[0mcurrent [33mglobal[39m and returns the result. Running code does not have access to[0m
[0mlocal scope, but does have access to the current [33mglobal[39m object.[0m

[0mIf [33moptions[39m is a string, then it specifies the filename.[0m

[0mThe following example illustrates using both [33mvm.runInThisContext()[39m and[0m
[0mthe JavaScript [34m[33meval()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval[24m[39m[34m)[39m function to run the same code:[0m

[90m<!-- eslint-disable prefer-const -->[39m
[90m[39m    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    [94mlet[39m [37mlocalVar[39m [93m=[39m [92m'initial value'[39m[90m;[39m
    
    [94mconst[39m [37mvmResult[39m [93m=[39m [37mvm[39m[32m.[39m[37mrunInThisContext[39m[90m([39m[92m'localVar = "vm";'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`vmResult: '${[37mvmResult[39m}', localVar: '${[37mlocalVar[39m}'`[90m)[39m[90m;[39m
    [90m// Prints: vmResult: 'vm', localVar: 'initial value'[39m
    
    [94mconst[39m [37mevalResult[39m [93m=[39m [37meval[39m[90m([39m[92m'localVar = "eval";'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`evalResult: '${[37mevalResult[39m}', localVar: '${[37mlocalVar[39m}'`[90m)[39m[90m;[39m
    [90m// Prints: evalResult: 'eval', localVar: 'eval'[39m

[0mBecause [33mvm.runInThisContext()[39m does not have access to the local scope,[0m
[0m[33mlocalVar[39m is unchanged. In contrast, [34m[33meval()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval[24m[39m[34m)[39m [3mdoes[23m have access to the[0m
[0mlocal scope, so the value [33mlocalVar[39m is changed. In this way[0m
[0m[33mvm.runInThisContext()[39m is much like an [34mindirect [33meval()[39m[34m call ([34m[4mhttps://es5.github.io/#x10.4.2[24m[39m[34m)[39m, e.g.[0m
[0m[33m(0,eval)('code')[39m.[0m

[32m[1m## Example: Running an HTTP Server within a VM[22m[39m

[0mWhen using either [34m[33mscript.runInThisContext()[39m[34m ([34m[4m#vm_script_runinthiscontext_options[24m[39m[34m)[39m or[0m
[0m[34m[33mvm.runInThisContext()[39m[34m ([34m[4m#vm_vm_runinthiscontext_code_options[24m[39m[34m)[39m, the code is executed within the current V8 global[0m
[0mcontext. The code passed to this VM context will have its own isolated scope.[0m

[0mIn order to run a simple web server using the [33mhttp[39m module the code passed to[0m
[0mthe context must either call [33mrequire('http')[39m on its own, or have a reference[0m
[0mto the [33mhttp[39m module passed to it. For instance:[0m

    [92m'use strict'[39m[90m;[39m
    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcode[39m [93m=[39m `
    ((require) => {
      const http = require('http');
    
      http.createServer((request, response) => {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello World\\n');
      }).listen(8124);
    
      console.log('Server running at http://127.0.0.1:8124/');
    })`[90m;[39m
    
    [37mvm[39m[32m.[39m[37mrunInThisContext[39m[90m([39m[37mcode[39m[90m)[39m[90m([39m[37mrequire[39m[90m)[39m[90m;[39m

[0mThe [33mrequire()[39m in the above case shares the state with the context it is[0m
[0mpassed from. This may introduce risks when untrusted code is executed, e.g.[0m
[0maltering objects in the context in unwanted ways.[0m

[32m[1m## What does it mean to "contextify" an object?[22m[39m

[0mAll JavaScript executed within Node.js runs within the scope of a "context".[0m
[0mAccording to the [34mV8 Embedder's Guide ([34m[4mhttps://v8.dev/docs/embed#contexts[24m[39m[34m)[39m:[0m

[90m[3m    [0mIn V8, a context is an execution environment that allows separate, unrelated,[0m[23m[39m
[90m[3m    [0mJavaScript applications to run in a single instance of V8. You must explicitly[0m[23m[39m
[90m[3m    [0mspecify the context in which you want any JavaScript code to be run.[0m[23m[39m

[0mWhen the method [33mvm.createContext()[39m is called, the [33mcontextObject[39m argument[0m
[0m(or a newly-created object if [33mcontextObject[39m is [33mundefined[39m) is associated[0m
[0minternally with a new instance of a V8 Context. This V8 Context provides the[0m
[0m[33mcode[39m run using the [33mvm[39m module's methods with an isolated global environment[0m
[0mwithin which it can operate. The process of creating the V8 Context and[0m
[0massociating it with the [33mcontextObject[39m is what this document refers to as[0m
[0m"contextifying" the object.[0m

[32m[1m## Timeout limitations when using [33mprocess.nextTick()[39m[32m, Promises, and [33mqueueMicrotask()[39m[32m[22m[39m

[0mBecause of the internal mechanics of how the [33mprocess.nextTick()[39m queue and[0m
[0mthe microtask queue that underlies Promises are implemented within V8 and[0m
[0mNode.js, it is possible for code running within a context to "escape" the[0m
[0m[33mtimeout[39m set using [33mvm.runInContext()[39m, [33mvm.runInNewContext()[39m, and[0m
[0m[33mvm.runInThisContext()[39m.[0m

[0mFor example, the following code executed by [33mvm.runInNewContext()[39m with a[0m
[0mtimeout of 5 milliseconds schedules an infinite loop to run after a promise[0m
[0mresolves. The scheduled loop is never interrupted by the timeout:[0m

    [94mconst[39m [37mvm[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mloop[39m[90m([39m[90m)[39m [33m{[39m
      [94mwhile[39m [90m([39m[34m1[39m[90m)[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mDate[39m[32m.[39m[37mnow[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mvm[39m[32m.[39m[37mrunInNewContext[39m[90m([39m
      [92m'Promise.resolve().then(loop);'[39m[32m,[39m
      [33m{[39m [37mloop[39m[32m,[39m [34mconsole[39m [33m}[39m[32m,[39m
      [33m{[39m [37mtimeout[39m[93m:[39m [34m5[39m [33m}[39m
    [90m)[39m[90m;[39m

[0mThis issue also occurs when the [33mloop()[39m call is scheduled using[0m
[0mthe [33mprocess.nextTick()[39m and [33mqueueMicrotask()[39m functions.[0m

[0mThis issue occurs because all contexts share the same microtask and nextTick[0m
[0mqueues.[0m

