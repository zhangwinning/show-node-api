[35m[4m[1m# Console[22m[24m[39m

[90m<!--introduced_in=v0.10.13-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mconsole[39m module provides a simple debugging console that is similar to the[0m
[0mJavaScript console mechanism provided by web browsers.[0m

[0mThe module exports two specific components:[0m

    * [0mA [33mConsole[39m class with methods such as [33mconsole.log()[39m, [33mconsole.error()[39m and[0m
      [0m[33mconsole.warn()[39m that can be used to write to any Node.js stream.[0m
    * [0mA global [33mconsole[39m instance configured to write to [34m[33mprocess.stdout[39m[34m ([34m[4mprocess.html#process_process_stdout[24m[39m[34m)[39m and[0m
      [0m[34m[33mprocess.stderr[39m[34m ([34m[4mprocess.html#process_process_stderr[24m[39m[34m)[39m. The global [33mconsole[39m can be used without calling[0m
      [0m[33mrequire('console')[39m.[0m

[0m[1m[3mWarning[23m[22m: The global console object's methods are neither consistently[0m
[0msynchronous like the browser APIs they resemble, nor are they consistently[0m
[0masynchronous like all other Node.js streams. See the [34mnote on process I/O ([34m[4mprocess.html#process_a_note_on_process_i_o[24m[39m[34m)[39m for[0m
[0mmore information.[0m

[0mExample using the global [33mconsole[39m:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'hello world'[39m[90m)[39m[90m;[39m
    [90m// Prints: hello world, to stdout[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'hello %s'[39m[32m,[39m [92m'world'[39m[90m)[39m[90m;[39m
    [90m// Prints: hello world, to stdout[39m
    [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'Whoops, something bad happened'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: [Error: Whoops, something bad happened], to stderr[39m
    
    [94mconst[39m [37mname[39m [93m=[39m [92m'Will Robinson'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m`Danger ${[37mname[39m}! Danger!`[90m)[39m[90m;[39m
    [90m// Prints: Danger Will Robinson! Danger!, to stderr[39m

[0mExample using the [33mConsole[39m class:[0m

    [94mconst[39m [37mout[39m [93m=[39m [37mgetStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37merr[39m [93m=[39m [37mgetStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmyConsole[39m [93m=[39m [31mnew[39m [34mconsole[39m[32m.[39m[37mConsole[39m[90m([39m[37mout[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
    
    [37mmyConsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'hello world'[39m[90m)[39m[90m;[39m
    [90m// Prints: hello world, to out[39m
    [37mmyConsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'hello %s'[39m[32m,[39m [92m'world'[39m[90m)[39m[90m;[39m
    [90m// Prints: hello world, to out[39m
    [37mmyConsole[39m[32m.[39m[91merror[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'Whoops, something bad happened'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: [Error: Whoops, something bad happened], to err[39m
    
    [94mconst[39m [37mname[39m [93m=[39m [92m'Will Robinson'[39m[90m;[39m
    [37mmyConsole[39m[32m.[39m[31mwarn[39m[90m([39m`Danger ${[37mname[39m}! Danger!`[90m)[39m[90m;[39m
    [90m// Prints: Danger Will Robinson! Danger!, to err[39m

[32m[1m## Class: [33mConsole[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9744[39m
[90m    description: Errors that occur while writing to the underlying streams[39m
[90m                 will now be ignored by default.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=class-->[39m
[90m[39m
[90m[39m[0mThe [33mConsole[39m class can be used to create a simple logger with configurable[0m
[0moutput streams and can be accessed using either [33mrequire('console').Console[39m[0m
[0mor [33mconsole.Console[39m (or their destructured counterparts):[0m

    [94mconst[39m [33m{[39m [37mConsole[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/console'[39m[90m)[39m[90m;[39m

    [94mconst[39m [33m{[39m [37mConsole[39m [33m}[39m [93m=[39m [34mconsole[39m[90m;[39m

[32m[1m### [33mnew Console(stdout[, stderr][, ignoreErrors])[39m[32m[22m[39m

[32m[1m### [33mnew Console(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9744[39m
[90m    description: The `ignoreErrors` option was introduced.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19372[39m
[90m    description: The `Console` constructor now supports an `options` argument,[39m
[90m                 and the `colorMode` option was introduced.[39m
[90m  - version: v11.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24978[39m
[90m    description: The `inspectOptions` option is introduced.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mstdout[39m {stream.Writable}[0m[0m[0m
      [0m
        * [0m[0m[33mstderr[39m {stream.Writable}[0m[0m[0m
      [0m
        * [0m[0m[33mignoreErrors[39m {boolean} Ignore errors when writing to the underlying[0m[0m[0m
      [0m      [0m[0mstreams. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcolorMode[39m {boolean|string} Set color support for this [33mConsole[39m instance.[0m[0m[0m
      [0m      [0m[0mSetting to [33mtrue[39m enables coloring while inspecting values. Setting to[0m[0m[0m
      [0m      [0m[0m[33mfalse[39m disables coloring while inspecting values. Setting to[0m[0m[0m
      [0m      [0m[0m[33m'auto'[39m makes color support depend on the value of the [33misTTY[39m property[0m[0m[0m
      [0m      [0m[0mand the value returned by [33mgetColorDepth()[39m on the respective stream. This[0m[0m[0m
      [0m      [0m[0moption can not be used, if [33minspectOptions.colors[39m is set as well.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'auto'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33minspectOptions[39m {Object} Specifies options that are passed along to[0m[0m[0m
      [0m      [0m[0m[34m[33mutil.inspect()[39m[34m ([34m[4mutil.html#util_util_inspect_object_options[24m[39m[34m)[39m.[0m[0m[0m

[0mCreates a new [33mConsole[39m with one or two writable stream instances. [33mstdout[39m is a[0m
[0mwritable stream to print log or info output. [33mstderr[39m is used for warning or[0m
[0merror output. If [33mstderr[39m is not provided, [33mstdout[39m is used for [33mstderr[39m.[0m

    [94mconst[39m [37moutput[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'./stdout.log'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37merrorOutput[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'./stderr.log'[39m[90m)[39m[90m;[39m
    [90m// Custom simple logger[39m
    [94mconst[39m [37mlogger[39m [93m=[39m [31mnew[39m [37mConsole[39m[90m([39m[33m{[39m [37mstdout[39m[93m:[39m [37moutput[39m[32m,[39m [37mstderr[39m[93m:[39m [37merrorOutput[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// use it like console[39m
    [94mconst[39m [37mcount[39m [93m=[39m [34m5[39m[90m;[39m
    [37mlogger[39m[32m.[39m[34mlog[39m[90m([39m[92m'count: %d'[39m[32m,[39m [37mcount[39m[90m)[39m[90m;[39m
    [90m// In stdout.log: count 5[39m

[0mThe global [33mconsole[39m is a special [33mConsole[39m whose output is sent to[0m
[0m[34m[33mprocess.stdout[39m[34m ([34m[4mprocess.html#process_process_stdout[24m[39m[34m)[39m and [34m[33mprocess.stderr[39m[34m ([34m[4mprocess.html#process_process_stderr[24m[39m[34m)[39m. It is equivalent to calling:[0m

    [31mnew[39m [37mConsole[39m[90m([39m[33m{[39m [37mstdout[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstdout[39m[32m,[39m [37mstderr[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstderr[39m [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mconsole.assert(value[, ...message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.101[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17706[39m
[90m    description: The implementation is now spec compliant and does not throw[39m
[90m                 anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any} The value tested for being truthy.[0m
    * [0m[33m...message[39m {any} All arguments besides [33mvalue[39m are used as error message.[0m

[0mA simple assertion test that verifies whether [33mvalue[39m is truthy. If it is not,[0m
[0m[33mAssertion failed[39m is logged. If provided, the error [33mmessage[39m is formatted[0m
[0musing [34m[33mutil.format()[39m[34m ([34m[4mutil.html#util_util_format_format_args[24m[39m[34m)[39m by passing along all message arguments. The output is[0m
[0mused as the error message.[0m

    [34mconsole[39m[32m.[39m[37massert[39m[90m([39m[91mtrue[39m[32m,[39m [92m'does nothing'[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    [34mconsole[39m[32m.[39m[37massert[39m[90m([39m[91mfalse[39m[32m,[39m [92m'Whoops %s work'[39m[32m,[39m [92m'didn\'t'[39m[90m)[39m[90m;[39m
    [90m// Assertion failed: Whoops didn't work[39m

[0mCalling [33mconsole.assert()[39m with a falsy assertion will only cause the [33mmessage[39m[0m
[0mto be printed to the console without interrupting execution of subsequent code.[0m

[32m[1m### [33mconsole.clear()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mWhen [33mstdout[39m is a TTY, calling [33mconsole.clear()[39m will attempt to clear the[0m
[0mTTY. When [33mstdout[39m is not a TTY, this method does nothing.[0m

[0mThe specific operation of [33mconsole.clear()[39m can vary across operating systems[0m
[0mand terminal types. For most Linux operating systems, [33mconsole.clear()[39m[0m
[0moperates similarly to the [33mclear[39m shell command. On Windows, [33mconsole.clear()[39m[0m
[0mwill clear only the output in the current terminal viewport for the Node.js[0m
[0mbinary.[0m

[32m[1m### [33mconsole.count([label])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlabel[39m {string} The display label for the counter. [1mDefault:[22m [33m'default'[39m.[0m

[0mMaintains an internal counter specific to [33mlabel[39m and outputs to [33mstdout[39m the[0m
[0mnumber of times [33mconsole.count()[39m has been called with the given [33mlabel[39m.[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [93m>[39m [34mconsole[39m[32m.[39m[37mcount[39m[90m([39m[90m)[39m
    [94mdefault[39m[93m:[39m [34m1[39m
    [90mundefined[39m
    [93m>[39m [34mconsole[39m[32m.[39m[37mcount[39m[90m([39m[92m'default'[39m[90m)[39m
    [94mdefault[39m[93m:[39m [34m2[39m
    [90mundefined[39m
    [93m>[39m [34mconsole[39m[32m.[39m[37mcount[39m[90m([39m[92m'abc'[39m[90m)[39m
    [37mabc[39m[93m:[39m [34m1[39m
    [90mundefined[39m
    [93m>[39m [34mconsole[39m[32m.[39m[37mcount[39m[90m([39m[92m'xyz'[39m[90m)[39m
    [37mxyz[39m[93m:[39m [34m1[39m
    [90mundefined[39m
    [93m>[39m [34mconsole[39m[32m.[39m[37mcount[39m[90m([39m[92m'abc'[39m[90m)[39m
    [37mabc[39m[93m:[39m [34m2[39m
    [90mundefined[39m
    [93m>[39m [34mconsole[39m[32m.[39m[37mcount[39m[90m([39m[90m)[39m
    [94mdefault[39m[93m:[39m [34m3[39m
    [90mundefined[39m
    [93m>[39m

[32m[1m### [33mconsole.countReset([label])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlabel[39m {string} The display label for the counter. [1mDefault:[22m [33m'default'[39m.[0m

[0mResets the internal counter specific to [33mlabel[39m.[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [93m>[39m [34mconsole[39m[32m.[39m[37mcount[39m[90m([39m[92m'abc'[39m[90m)[39m[90m;[39m
    [37mabc[39m[93m:[39m [34m1[39m
    [90mundefined[39m
    [93m>[39m [34mconsole[39m[32m.[39m[37mcountReset[39m[90m([39m[92m'abc'[39m[90m)[39m[90m;[39m
    [90mundefined[39m
    [93m>[39m [34mconsole[39m[32m.[39m[37mcount[39m[90m([39m[92m'abc'[39m[90m)[39m[90m;[39m
    [37mabc[39m[93m:[39m [34m1[39m
    [90mundefined[39m
    [93m>[39m

[32m[1m### [33mconsole.debug(data[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mchanges:[39m
[90m  - version: v8.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17033[39m
[90m    description: "`console.debug` is now an alias for `console.log`."[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {any}[0m
    * [0m[33m...args[39m {any}[0m

[0mThe [33mconsole.debug()[39m function is an alias for [34m[33mconsole.log()[39m[34m ([34m[4m#console_console_log_data_args[24m[39m[34m)[39m.[0m

[32m[1m### [33mconsole.dir(obj[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.101[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mobj[39m {any}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mshowHidden[39m {boolean} If [33mtrue[39m then the object's non-enumerable and symbol[0m[0m[0m
      [0m      [0m[0mproperties will be shown too. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mdepth[39m {number} Tells [34m[33mutil.inspect()[39m[34m ([34m[4mutil.html#util_util_inspect_object_options[24m[39m[34m)[39m how many times to recurse while[0m[0m[0m
      [0m      [0m[0mformatting the object. This is useful for inspecting large complicated[0m[0m[0m
      [0m      [0m[0mobjects. To make it recurse indefinitely, pass [33mnull[39m. [1mDefault:[22m [33m2[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcolors[39m {boolean} If [33mtrue[39m, then the output will be styled with ANSI color[0m[0m[0m
      [0m      [0m[0m codes. Colors are customizable;[0m[0m[0m
      [0m      [0m[0m see [34mcustomizing [33mutil.inspect()[39m[34m colors ([34m[4mutil.html#util_customizing_util_inspect_colors[24m[39m[34m)[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m

[0mUses [34m[33mutil.inspect()[39m[34m ([34m[4mutil.html#util_util_inspect_object_options[24m[39m[34m)[39m on [33mobj[39m and prints the resulting string to [33mstdout[39m.[0m
[0mThis function bypasses any custom [33minspect()[39m function defined on [33mobj[39m.[0m

[32m[1m### [33mconsole.dirxml(...data)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mchanges:[39m
[90m  - version: v9.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17152[39m
[90m    description: "`console.dirxml` now calls `console.log` for its arguments."[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33m...data[39m {any}[0m

[0mThis method calls [33mconsole.log()[39m passing it the arguments received.[0m
[0mThis method does not produce any XML formatting.[0m

[32m[1m### [33mconsole.error([data][, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.100[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {any}[0m
    * [0m[33m...args[39m {any}[0m

[0mPrints to [33mstderr[39m with newline. Multiple arguments can be passed, with the[0m
[0mfirst used as the primary message and all additional used as substitution[0m
[0mvalues similar to printf(3) (the arguments are all passed to[0m
[0m[34m[33mutil.format()[39m[34m ([34m[4mutil.html#util_util_format_format_args[24m[39m[34m)[39m).[0m

    [94mconst[39m [37mcode[39m [93m=[39m [34m5[39m[90m;[39m
    [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'error #%d'[39m[32m,[39m [37mcode[39m[90m)[39m[90m;[39m
    [90m// Prints: error #5, to stderr[39m
    [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'error'[39m[32m,[39m [37mcode[39m[90m)[39m[90m;[39m
    [90m// Prints: error 5, to stderr[39m

[0mIf formatting elements (e.g. [33m%d[39m) are not found in the first string then[0m
[0m[34m[33mutil.inspect()[39m[34m ([34m[4mutil.html#util_util_inspect_object_options[24m[39m[34m)[39m is called on each argument and the resulting string[0m
[0mvalues are concatenated. See [34m[33mutil.format()[39m[34m ([34m[4mutil.html#util_util_format_format_args[24m[39m[34m)[39m for more information.[0m

[32m[1m### [33mconsole.group([...label])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33m...label[39m {any}[0m

[0mIncreases indentation of subsequent lines by two spaces.[0m

[0mIf one or more [33mlabel[39ms are provided, those are printed first without the[0m
[0madditional indentation.[0m

[32m[1m### [33mconsole.groupCollapsed()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90m  added: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn alias for [34m[33mconsole.group()[39m[34m ([34m[4m#console_console_group_label[24m[39m[34m)[39m.[0m

[32m[1m### [33mconsole.groupEnd()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mDecreases indentation of subsequent lines by two spaces.[0m

[32m[1m### [33mconsole.info([data][, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.100[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {any}[0m
    * [0m[33m...args[39m {any}[0m

[0mThe [33mconsole.info()[39m function is an alias for [34m[33mconsole.log()[39m[34m ([34m[4m#console_console_log_data_args[24m[39m[34m)[39m.[0m

[32m[1m### [33mconsole.log([data][, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.100[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {any}[0m
    * [0m[33m...args[39m {any}[0m

[0mPrints to [33mstdout[39m with newline. Multiple arguments can be passed, with the[0m
[0mfirst used as the primary message and all additional used as substitution[0m
[0mvalues similar to printf(3) (the arguments are all passed to[0m
[0m[34m[33mutil.format()[39m[34m ([34m[4mutil.html#util_util_format_format_args[24m[39m[34m)[39m).[0m

    [94mconst[39m [37mcount[39m [93m=[39m [34m5[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'count: %d'[39m[32m,[39m [37mcount[39m[90m)[39m[90m;[39m
    [90m// Prints: count: 5, to stdout[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'count:'[39m[32m,[39m [37mcount[39m[90m)[39m[90m;[39m
    [90m// Prints: count: 5, to stdout[39m

[0mSee [34m[33mutil.format()[39m[34m ([34m[4mutil.html#util_util_format_format_args[24m[39m[34m)[39m for more information.[0m

[32m[1m### [33mconsole.table(tabularData[, properties])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtabularData[39m {any}[0m
    * [0m[33mproperties[39m {string[]} Alternate properties for constructing the table.[0m

[0mTry to construct a table with the columns of the properties of [33mtabularData[39m[0m
[0m(or use [33mproperties[39m) and rows of [33mtabularData[39m and log it. Falls back to just[0m
[0mlogging the argument if it can’t be parsed as tabular.[0m

    [90m// These can't be parsed as tabular data[39m
    [34mconsole[39m[32m.[39m[37mtable[39m[90m([39m[37mSymbol[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Symbol()[39m
    
    [34mconsole[39m[32m.[39m[37mtable[39m[90m([39m[90mundefined[39m[90m)[39m[90m;[39m
    [90m// undefined[39m
    
    [34mconsole[39m[32m.[39m[37mtable[39m[90m([39m[33m[[39m[33m{[39m [37ma[39m[93m:[39m [34m1[39m[32m,[39m [37mb[39m[93m:[39m [92m'Y'[39m [33m}[39m[32m,[39m [33m{[39m [37ma[39m[93m:[39m [92m'Z'[39m[32m,[39m [37mb[39m[93m:[39m [34m2[39m [33m}[39m[33m][39m[90m)[39m[90m;[39m
    [90m// ┌─────────┬─────┬─────┐[39m
    [90m// │ (index) │  a  │  b  │[39m
    [90m// ├─────────┼─────┼─────┤[39m
    [90m// │    0    │  1  │ 'Y' │[39m
    [90m// │    1    │ 'Z' │  2  │[39m
    [90m// └─────────┴─────┴─────┘[39m
    
    [34mconsole[39m[32m.[39m[37mtable[39m[90m([39m[33m[[39m[33m{[39m [37ma[39m[93m:[39m [34m1[39m[32m,[39m [37mb[39m[93m:[39m [92m'Y'[39m [33m}[39m[32m,[39m [33m{[39m [37ma[39m[93m:[39m [92m'Z'[39m[32m,[39m [37mb[39m[93m:[39m [34m2[39m [33m}[39m[33m][39m[32m,[39m [33m[[39m[92m'a'[39m[33m][39m[90m)[39m[90m;[39m
    [90m// ┌─────────┬─────┐[39m
    [90m// │ (index) │  a  │[39m
    [90m// ├─────────┼─────┤[39m
    [90m// │    0    │  1  │[39m
    [90m// │    1    │ 'Z' │[39m
    [90m// └─────────┴─────┘[39m

[32m[1m### [33mconsole.time([label])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.104[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlabel[39m {string} [1mDefault:[22m [33m'default'[39m[0m

[0mStarts a timer that can be used to compute the duration of an operation. Timers[0m
[0mare identified by a unique [33mlabel[39m. Use the same [33mlabel[39m when calling[0m
[0m[34m[33mconsole.timeEnd()[39m[34m ([34m[4m#console_console_timeend_label[24m[39m[34m)[39m to stop the timer and output the elapsed time in[0m
[0mmilliseconds to [33mstdout[39m. Timer durations are accurate to the sub-millisecond.[0m

[32m[1m### [33mconsole.timeEnd([label])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.104[39m
[90mchanges:[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5901[39m
[90m    description: This method no longer supports multiple calls that don’t map[39m
[90m                 to individual `console.time()` calls; see below for details.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlabel[39m {string} [1mDefault:[22m [33m'default'[39m[0m

[0mStops a timer that was previously started by calling [34m[33mconsole.time()[39m[34m ([34m[4m#console_console_time_label[24m[39m[34m)[39m and[0m
[0mprints the result to [33mstdout[39m:[0m

    [34mconsole[39m[32m.[39m[37mtime[39m[90m([39m[92m'100-elements'[39m[90m)[39m[90m;[39m
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m100[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m[33m}[39m
    [34mconsole[39m[32m.[39m[37mtimeEnd[39m[90m([39m[92m'100-elements'[39m[90m)[39m[90m;[39m
    [90m// prints 100-elements: 225.438ms[39m

[32m[1m### [33mconsole.timeLog([label][, ...data])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlabel[39m {string} [1mDefault:[22m [33m'default'[39m[0m
    * [0m[33m...data[39m {any}[0m

[0mFor a timer that was previously started by calling [34m[33mconsole.time()[39m[34m ([34m[4m#console_console_time_label[24m[39m[34m)[39m, prints[0m
[0mthe elapsed time and other [33mdata[39m arguments to [33mstdout[39m:[0m

    [34mconsole[39m[32m.[39m[37mtime[39m[90m([39m[92m'process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mvalue[39m [93m=[39m [37mexpensiveProcess1[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns 42[39m
    [34mconsole[39m[32m.[39m[37mtimeLog[39m[90m([39m[92m'process'[39m[32m,[39m [37mvalue[39m[90m)[39m[90m;[39m
    [90m// Prints "process: 365.227ms 42".[39m
    [37mdoExpensiveProcess2[39m[90m([39m[37mvalue[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[37mtimeEnd[39m[90m([39m[92m'process'[39m[90m)[39m[90m;[39m

[32m[1m### [33mconsole.trace([message][, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.104[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmessage[39m {any}[0m
    * [0m[33m...args[39m {any}[0m

[0mPrints to [33mstderr[39m the string [33m'Trace: '[39m, followed by the [34m[33mutil.format()[39m[34m ([34m[4mutil.html#util_util_format_format_args[24m[39m[34m)[39m[0m
[0mformatted message and stack trace to the current position in the code.[0m

    [34mconsole[39m[32m.[39m[37mtrace[39m[90m([39m[92m'Show me'[39m[90m)[39m[90m;[39m
    [90m// Prints: (stack trace will vary based on where trace is called)[39m
    [90m//  Trace: Show me[39m
    [90m//    at repl:2:9[39m
    [90m//    at REPLServer.defaultEval (repl.js:248:27)[39m
    [90m//    at bound (domain.js:287:14)[39m
    [90m//    at REPLServer.runBound [as eval] (domain.js:300:12)[39m
    [90m//    at REPLServer.<anonymous> (repl.js:412:12)[39m
    [90m//    at emitOne (events.js:82:20)[39m
    [90m//    at REPLServer.emit (events.js:169:7)[39m
    [90m//    at REPLServer.Interface._onLine (readline.js:210:10)[39m
    [90m//    at REPLServer.Interface._line (readline.js:549:8)[39m
    [90m//    at REPLServer.Interface._ttyWrite (readline.js:826:14)[39m

[32m[1m### [33mconsole.warn([data][, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.100[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {any}[0m
    * [0m[33m...args[39m {any}[0m

[0mThe [33mconsole.warn()[39m function is an alias for [34m[33mconsole.error()[39m[34m ([34m[4m#console_console_error_data_args[24m[39m[34m)[39m.[0m

[32m[1m## Inspector only methods[22m[39m

[0mThe following methods are exposed by the V8 engine in the general API but do[0m
[0mnot display anything unless used in conjunction with the [34minspector ([34m[4mdebugger.html[24m[39m[34m)[39m[0m
[0m([33m--inspect[39m flag).[0m

[32m[1m### [33mconsole.profile([label])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlabel[39m {string}[0m

[0mThis method does not display anything unless used in the inspector. The[0m
[0m[33mconsole.profile()[39m method starts a JavaScript CPU profile with an optional[0m
[0mlabel until [34m[33mconsole.profileEnd()[39m[34m ([34m[4m#console_console_profileend_label[24m[39m[34m)[39m is called. The profile is then added to[0m
[0mthe [1mProfile[22m panel of the inspector.[0m

    [34mconsole[39m[32m.[39m[37mprofile[39m[90m([39m[92m'MyLabel'[39m[90m)[39m[90m;[39m
    [90m// Some code[39m
    [34mconsole[39m[32m.[39m[37mprofileEnd[39m[90m([39m[92m'MyLabel'[39m[90m)[39m[90m;[39m
    [90m// Adds the profile 'MyLabel' to the Profiles panel of the inspector.[39m

[32m[1m### [33mconsole.profileEnd([label])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlabel[39m {string}[0m

[0mThis method does not display anything unless used in the inspector. Stops the[0m
[0mcurrent JavaScript CPU profiling session if one has been started and prints[0m
[0mthe report to the [1mProfiles[22m panel of the inspector. See[0m
[0m[34m[33mconsole.profile()[39m[34m ([34m[4m#console_console_profile_label[24m[39m[34m)[39m for an example.[0m

[0mIf this method is called without a label, the most recently started profile is[0m
[0mstopped.[0m

[32m[1m### [33mconsole.timeStamp([label])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlabel[39m {string}[0m

[0mThis method does not display anything unless used in the inspector. The[0m
[0m[33mconsole.timeStamp()[39m method adds an event with the label [33m'label'[39m to the[0m
[0m[1mTimeline[22m panel of the inspector.[0m

