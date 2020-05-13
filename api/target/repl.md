[35m[4m[1m# REPL[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mrepl[39m module provides a Read-Eval-Print-Loop (REPL) implementation that[0m
[0mis available both as a standalone program or includible in other applications.[0m
[0mIt can be accessed using:[0m

    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m

[32m[1m## Design and Features[22m[39m

[0mThe [33mrepl[39m module exports the [34m[33mrepl.REPLServer[39m[34m ([34m[4m#repl_class_replserver[24m[39m[34m)[39m class. While running,[0m
[0minstances of [34m[33mrepl.REPLServer[39m[34m ([34m[4m#repl_class_replserver[24m[39m[34m)[39m will accept individual lines of user input,[0m
[0mevaluate those according to a user-defined evaluation function, then output the[0m
[0mresult. Input and output may be from [33mstdin[39m and [33mstdout[39m, respectively, or may[0m
[0mbe connected to any Node.js [34mstream ([34m[4mstream.html[24m[39m[34m)[39m.[0m

[0mInstances of [34m[33mrepl.REPLServer[39m[34m ([34m[4m#repl_class_replserver[24m[39m[34m)[39m support automatic completion of inputs,[0m
[0mcompletion preview, simplistic Emacs-style line editing, multi-line inputs,[0m
[0m[34mZSH ([34m[4mhttps://en.wikipedia.org/wiki/Z_shell[24m[39m[34m)[39m-like reverse-i-search, [34mZSH ([34m[4mhttps://en.wikipedia.org/wiki/Z_shell[24m[39m[34m)[39m-like substring-based history search,[0m
[0mANSI-styled output, saving and restoring current REPL session state, error[0m
[0mrecovery, and customizable evaluation functions. Terminals that do not support[0m
[0mANSI styles and Emacs-style line editing automatically fall back to a limited[0m
[0mfeature set.[0m

[32m[1m### Commands and Special Keys[22m[39m

[0mThe following special commands are supported by all REPL instances:[0m

    * [0m[33m.break[39m: When in the process of inputting a multi-line expression, entering[0m
      [0mthe [33m.break[39m command (or pressing the [33m<ctrl>-C[39m key combination) will abort[0m
      [0mfurther input or processing of that expression.[0m
    * [0m[33m.clear[39m: Resets the REPL [33mcontext[39m to an empty object and clears any[0m
      [0mmulti-line expression currently being input.[0m
    * [0m[33m.exit[39m: Close the I/O stream, causing the REPL to exit.[0m
    * [0m[33m.help[39m: Show this list of special commands.[0m
    * [0m[33m.save[39m: Save the current REPL session to a file:[0m
      [0m[33m> .save ./file/to/save.js[39m[0m
    * [0m[33m.load[39m: Load a file into the current REPL session.[0m
      [0m[33m> .load ./file/to/load.js[39m[0m
    * [0m[33m.editor[39m: Enter editor mode ([33m<ctrl>-D[39m to finish, [33m<ctrl>-C[39m to cancel).[0m

    [33m> .editor[39m
    [33m// Entering editor mode (^D to finish, ^C to cancel)[39m
    [33mfunction welcome(name) {[39m
    [33m  return `Hello ${name}!`;[39m
    [33m}[39m
    [33m[39m
    [33mwelcome('Node.js User');[39m
    [33m[39m
    [33m// ^D[39m
    [33m'Hello Node.js User!'[39m
    [33m>[39m

[0mThe following key combinations in the REPL have these special effects:[0m

    * [0m[33m<ctrl>-C[39m: When pressed once, has the same effect as the [33m.break[39m command.[0m
      [0mWhen pressed twice on a blank line, has the same effect as the [33m.exit[39m[0m
      [0mcommand.[0m
    * [0m[33m<ctrl>-D[39m: Has the same effect as the [33m.exit[39m command.[0m
    * [0m[33m<tab>[39m: When pressed on a blank line, displays global and local (scope)[0m
      [0mvariables. When pressed while entering other input, displays relevant[0m
      [0mautocompletion options.[0m

[0mFor key bindings related to the reverse-i-search, see [34m[33mreverse-i-search[39m[34m ([34m[4m#repl_reverse_i_search[24m[39m[34m)[39m.[0m
[0mFor all other key bindings, see [34mTTY keybindings ([34m[4mreadline.html#readline_tty_keybindings[24m[39m[34m)[39m.[0m

[32m[1m### Default Evaluation[22m[39m

[0mBy default, all instances of [34m[33mrepl.REPLServer[39m[34m ([34m[4m#repl_class_replserver[24m[39m[34m)[39m use an evaluation function[0m
[0mthat evaluates JavaScript expressions and provides access to Node.js built-in[0m
[0mmodules. This default behavior can be overridden by passing in an alternative[0m
[0mevaluation function when the [34m[33mrepl.REPLServer[39m[34m ([34m[4m#repl_class_replserver[24m[39m[34m)[39m instance is created.[0m

[32m[1m#### JavaScript Expressions[22m[39m

[0mThe default evaluator supports direct evaluation of JavaScript expressions:[0m

    [33m> 1 + 1[39m
    [33m2[39m
    [33m> const m = 2[39m
    [33mundefined[39m
    [33m> m + 1[39m
    [33m3[39m

[0mUnless otherwise scoped within blocks or functions, variables declared[0m
[0meither implicitly or using the [33mconst[39m, [33mlet[39m, or [33mvar[39m keywords[0m
[0mare declared at the global scope.[0m

[32m[1m#### Global and Local Scope[22m[39m

[0mThe default evaluator provides access to any variables that exist in the global[0m
[0mscope. It is possible to expose a variable to the REPL explicitly by assigning[0m
[0mit to the [33mcontext[39m object associated with each [33mREPLServer[39m:[0m

    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmsg[39m [93m=[39m [92m'message'[39m[90m;[39m
    
    [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[92m'> '[39m[90m)[39m[32m.[39m[37mcontext[39m[32m.[39m[37mm[39m [93m=[39m [37mmsg[39m[90m;[39m

[0mProperties in the [33mcontext[39m object appear as local within the REPL:[0m

    [33m$ node repl_test.js[39m
    [33m> m[39m
    [33m'message'[39m

[0mContext properties are not read-only by default. To specify read-only globals,[0m
[0mcontext properties must be defined using [33mObject.defineProperty()[39m:[0m

    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmsg[39m [93m=[39m [92m'message'[39m[90m;[39m
    
    [94mconst[39m [37mr[39m [93m=[39m [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[92m'> '[39m[90m)[39m[90m;[39m
    [37mObject[39m[32m.[39m[37mdefineProperty[39m[90m([39m[37mr[39m[32m.[39m[37mcontext[39m[32m,[39m [92m'm'[39m[32m,[39m [33m{[39m
      [37mconfigurable[39m[93m:[39m [91mfalse[39m[32m,[39m
      [37menumerable[39m[93m:[39m [91mtrue[39m[32m,[39m
      [37mvalue[39m[93m:[39m [37mmsg[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Accessing Core Node.js Modules[22m[39m

[0mThe default evaluator will automatically load Node.js core modules into the[0m
[0mREPL environment when used. For instance, unless otherwise declared as a[0m
[0mglobal or scoped variable, the input [33mfs[39m will be evaluated on-demand as[0m
[0m[33mglobal.fs = require('fs')[39m.[0m

    [33m> fs.createReadStream('./some/file');[39m

[32m[1m#### Global Uncaught Exceptions[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27151[39m
[90m    description: The `'uncaughtException'` event is from now on triggered if the[39m
[90m                 repl is used as standalone program.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe REPL uses the [34m[33mdomain[39m[34m ([34m[4mdomain.html[24m[39m[34m)[39m module to catch all uncaught exceptions for that[0m
[0mREPL session.[0m

[0mThis use of the [34m[33mdomain[39m[34m ([34m[4mdomain.html[24m[39m[34m)[39m module in the REPL has these side effects:[0m

    * [0mUncaught exceptions only emit the [34m[33m'uncaughtException'[39m[34m ([34m[4mprocess.html#process_event_uncaughtexception[24m[39m[34m)[39m event in the[0m
      [0mstandalone REPL. Adding a listener for this event in a REPL within[0m
      [0manother Node.js program throws [34m[33mERR_INVALID_REPL_INPUT[39m[34m ([34m[4merrors.html#errors_err_invalid_repl_input[24m[39m[34m)[39m.[0m
    * [0mTrying to use [34m[33mprocess.setUncaughtExceptionCaptureCallback()[39m[34m ([34m[4mprocess.html#process_process_setuncaughtexceptioncapturecallback_fn[24m[39m[34m)[39m throws[0m
      [0man [34m[33mERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE[39m[34m ([34m[4merrors.html#errors_err_domain_cannot_set_uncaught_exception_capture[24m[39m[34m)[39m error.[0m

[0mAs standalone program:[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'uncaughtException'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Uncaught'[39m[90m)[39m[90m)[39m[90m;[39m
    
    [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'foobar'[39m[90m)[39m[90m;[39m
    [90m// Uncaught[39m

[0mWhen used in another application:[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'uncaughtException'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Uncaught'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// TypeError [ERR_INVALID_REPL_INPUT]: Listeners for `uncaughtException`[39m
    [90m// cannot be used in the REPL[39m
    
    [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'foobar'[39m[90m)[39m[90m;[39m
    [90m// Thrown:[39m
    [90m// Error: foobar[39m

[32m[1m#### Assignment of the [33m_[39m[32m (underscore) variable[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18919[39m
[90m    description: Added `_error` support.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe default evaluator will, by default, assign the result of the most recently[0m
[0mevaluated expression to the special variable [33m_[39m (underscore).[0m
[0mExplicitly setting [33m_[39m to a value will disable this behavior.[0m

    [33m> [ 'a', 'b', 'c' ][39m
    [33m[ 'a', 'b', 'c' ][39m
    [33m> _.length[39m
    [33m3[39m
    [33m> _ += 1[39m
    [33mExpression assignment to _ now disabled.[39m
    [33m4[39m
    [33m> 1 + 1[39m
    [33m2[39m
    [33m> _[39m
    [33m4[39m

[0mSimilarly, [33m_error[39m will refer to the last seen error, if there was any.[0m
[0mExplicitly setting [33m_error[39m to a value will disable this behavior.[0m

    [33m> throw new Error('foo');[39m
    [33mError: foo[39m
    [33m> _error.message[39m
    [33m'foo'[39m

[32m[1m#### [33mawait[39m[32m keyword[22m[39m

[0mWith the [34m[33m--experimental-repl-await[39m[34m ([34m[4mcli.html#cli_experimental_repl_await[24m[39m[34m)[39m command line option specified,[0m
[0mexperimental support for the [33mawait[39m keyword is enabled.[0m

    [33m> await Promise.resolve(123)[39m
    [33m123[39m
    [33m> await Promise.reject(new Error('REPL await'))[39m
    [33mError: REPL await[39m
    [33m    at repl:1:45[39m
    [33m> const timeout = util.promisify(setTimeout);[39m
    [33mundefined[39m
    [33m> const old = Date.now(); await timeout(1000); console.log(Date.now() - old);[39m
    [33m1002[39m
    [33mundefined[39m

[32m[1m### Reverse-i-search[22m[39m

[90m<!-- YAML[39m
[90madded: v13.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe REPL supports bi-directional reverse-i-search similar to [34mZSH ([34m[4mhttps://en.wikipedia.org/wiki/Z_shell[24m[39m[34m)[39m. It is[0m
[0mtriggered with [33m<ctrl> + R[39m to search backwards and [33m<ctrl> + S[39m to search[0m
[0mforwards.[0m

[0mDuplicated history entires will be skipped.[0m

[0mEntries are accepted as soon as any button is pressed that doesn't correspond[0m
[0mwith the reverse search. Cancelling is possible by pressing [33mescape[39m or[0m
[0m[33m<ctrl> + C[39m.[0m

[0mChanging the direction immediately searches for the next entry in the expected[0m
[0mdirection from the current position on.[0m

[32m[1m### Custom Evaluation Functions[22m[39m

[0mWhen a new [34m[33mrepl.REPLServer[39m[34m ([34m[4m#repl_class_replserver[24m[39m[34m)[39m is created, a custom evaluation function may be[0m
[0mprovided. This can be used, for instance, to implement fully customized REPL[0m
[0mapplications.[0m

[0mThe following illustrates a hypothetical example of a REPL that performs[0m
[0mtranslation of text from one language to another:[0m

    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mTranslator[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'translator'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mmyTranslator[39m [93m=[39m [31mnew[39m [37mTranslator[39m[90m([39m[92m'en'[39m[32m,[39m [92m'fr'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mmyEval[39m[90m([39m[37mcmd[39m[32m,[39m [37mcontext[39m[32m,[39m [37mfilename[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
      [37mcallback[39m[90m([39m[90mnull[39m[32m,[39m [37mmyTranslator[39m[32m.[39m[37mtranslate[39m[90m([39m[37mcmd[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[33m{[39m [37mprompt[39m[93m:[39m [92m'> '[39m[32m,[39m [37meval[39m[93m:[39m [37mmyEval[39m [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Recoverable Errors[22m[39m

[0mAs a user is typing input into the REPL prompt, pressing the [33m<enter>[39m key will[0m
[0msend the current line of input to the [33meval[39m function. In order to support[0m
[0mmulti-line input, the eval function can return an instance of [33mrepl.Recoverable[39m[0m
[0mto the provided callback function:[0m

    [94mfunction[39m [37mmyEval[39m[90m([39m[37mcmd[39m[32m,[39m [37mcontext[39m[32m,[39m [37mfilename[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
      [94mlet[39m [37mresult[39m[90m;[39m
      [36mtry[39m [33m{[39m
        [37mresult[39m [93m=[39m [37mvm[39m[32m.[39m[37mrunInThisContext[39m[90m([39m[37mcmd[39m[90m)[39m[90m;[39m
      [33m}[39m [36mcatch[39m [90m([39m[37me[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37misRecoverableError[39m[90m([39m[37me[39m[90m)[39m[90m)[39m [33m{[39m
          [31mreturn[39m [37mcallback[39m[90m([39m[31mnew[39m [37mrepl[39m[32m.[39m[37mRecoverable[39m[90m([39m[37me[39m[90m)[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
      [37mcallback[39m[90m([39m[90mnull[39m[32m,[39m [37mresult[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mfunction[39m [37misRecoverableError[39m[90m([39m[91merror[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[91merror[39m[32m.[39m[37mname[39m [93m===[39m [92m'SyntaxError'[39m[90m)[39m [33m{[39m
        [31mreturn[39m /^(Unexpected end of input|Unexpected token)/[32m.[39m[37mtest[39m[90m([39m[91merror[39m[32m.[39m[37mmessage[39m[90m)[39m[90m;[39m
      [33m}[39m
      [31mreturn[39m [91mfalse[39m[90m;[39m
    [33m}[39m

[32m[1m### Customizing REPL Output[22m[39m

[0mBy default, [34m[33mrepl.REPLServer[39m[34m ([34m[4m#repl_class_replserver[24m[39m[34m)[39m instances format output using the[0m
[0m[34m[33mutil.inspect()[39m[34m ([34m[4mutil.html#util_util_inspect_object_options[24m[39m[34m)[39m method before writing the output to the provided [33mWritable[39m[0m
[0mstream ([33mprocess.stdout[39m by default). The [33mshowProxy[39m inspection option is set[0m
[0mto true by default and the [33mcolors[39m option is set to true depending on the[0m
[0mREPL's [33museColors[39m option.[0m

[0mThe [33museColors[39m boolean option can be specified at construction to instruct the[0m
[0mdefault writer to use ANSI style codes to colorize the output from the[0m
[0m[33mutil.inspect()[39m method.[0m

[0mIf the REPL is run as standalone program, it is also possible to change the[0m
[0mREPL's [34minspection defaults ([34m[4mutil.html#util_util_inspect_object_options[24m[39m[34m)[39m from inside the REPL by using the[0m
[0m[33minspect.replDefaults[39m property which mirrors the [33mdefaultOptions[39m from[0m
[0m[34m[33mutil.inspect()[39m[34m ([34m[4mutil.html#util_util_inspect_object_options[24m[39m[34m)[39m.[0m

    [33m> util.inspect.replDefaults.compact = false;[39m
    [33mfalse[39m
    [33m> [1][39m
    [33m[[39m
    [33m  1[39m
    [33m][39m
    [33m>[39m

[0mTo fully customize the output of a [34m[33mrepl.REPLServer[39m[34m ([34m[4m#repl_class_replserver[24m[39m[34m)[39m instance pass in a new[0m
[0mfunction for the [33mwriter[39m option on construction. The following example, for[0m
[0minstance, simply converts any input text to upper case:[0m

    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mr[39m [93m=[39m [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[33m{[39m [37mprompt[39m[93m:[39m [92m'> '[39m[32m,[39m [37meval[39m[93m:[39m [37mmyEval[39m[32m,[39m [37mwriter[39m[93m:[39m [37mmyWriter[39m [33m}[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mmyEval[39m[90m([39m[37mcmd[39m[32m,[39m [37mcontext[39m[32m,[39m [37mfilename[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
      [37mcallback[39m[90m([39m[90mnull[39m[32m,[39m [37mcmd[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mfunction[39m [37mmyWriter[39m[90m([39m[37moutput[39m[90m)[39m [33m{[39m
      [31mreturn[39m [37moutput[39m[32m.[39m[37mtoUpperCase[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## Class: [33mREPLServer[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.91[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object|string} See [34m[33mrepl.start()[39m[34m ([34m[4m#repl_repl_start_options[24m[39m[34m)[39m[0m
    * [0mExtends: {readline.Interface}[0m

[0mInstances of [33mrepl.REPLServer[39m are created using the [34m[33mrepl.start()[39m[34m ([34m[4m#repl_repl_start_options[24m[39m[34m)[39m method[0m
[0mor directly using the JavaScript [33mnew[39m keyword.[0m

    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m [37museColors[39m[93m:[39m [91mtrue[39m [33m}[39m[90m;[39m
    
    [94mconst[39m [37mfirstInstance[39m [93m=[39m [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    [94mconst[39m [37msecondInstance[39m [93m=[39m [31mnew[39m [37mrepl[39m[32m.[39m[37mREPLServer[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'exit'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'exit'[39m event is emitted when the REPL is exited either by receiving the[0m
[0m[33m.exit[39m command as input, the user pressing [33m<ctrl>-C[39m twice to signal [33mSIGINT[39m,[0m
[0mor by pressing [33m<ctrl>-D[39m to signal [33m'end'[39m on the input stream. The listener[0m
[0mcallback is invoked without any arguments.[0m

    [37mreplServer[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Received "exit" event from repl!'[39m[90m)[39m[90m;[39m
      [37mprocess[39m[32m.[39m[37mexit[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'reset'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'reset'[39m event is emitted when the REPL's context is reset. This occurs[0m
[0mwhenever the [33m.clear[39m command is received as input [3munless[23m the REPL is using[0m
[0mthe default evaluator and the [33mrepl.REPLServer[39m instance was created with the[0m
[0m[33museGlobal[39m option set to [33mtrue[39m. The listener callback will be called with a[0m
[0mreference to the [33mcontext[39m object as the only argument.[0m

[0mThis can be used primarily to re-initialize REPL context to some pre-defined[0m
[0mstate:[0m

    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37minitializeContext[39m[90m([39m[37mcontext[39m[90m)[39m [33m{[39m
      [37mcontext[39m[32m.[39m[37mm[39m [93m=[39m [92m'test'[39m[90m;[39m
    [33m}[39m
    
    [94mconst[39m [37mr[39m [93m=[39m [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[33m{[39m [37mprompt[39m[93m:[39m [92m'> '[39m [33m}[39m[90m)[39m[90m;[39m
    [37minitializeContext[39m[90m([39m[37mr[39m[32m.[39m[37mcontext[39m[90m)[39m[90m;[39m
    
    [37mr[39m[32m.[39m[37mon[39m[90m([39m[92m'reset'[39m[32m,[39m [37minitializeContext[39m[90m)[39m[90m;[39m

[0mWhen this code is executed, the global [33m'm'[39m variable can be modified but then[0m
[0mreset to its initial value using the [33m.clear[39m command:[0m

    [33m$ ./node example.js[39m
    [33m> m[39m
    [33m'test'[39m
    [33m> m = 1[39m
    [33m1[39m
    [33m> m[39m
    [33m1[39m
    [33m> .clear[39m
    [33mClearing context...[39m
    [33m> m[39m
    [33m'test'[39m
    [33m>[39m

[32m[1m### [33mreplServer.defineCommand(keyword, cmd)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mkeyword[39m {string} The command keyword ([3mwithout[23m a leading [33m.[39m character).[0m
    * [0m[33mcmd[39m {Object|Function} The function to invoke when the command is processed.[0m

[0mThe [33mreplServer.defineCommand()[39m method is used to add new [33m.[39m-prefixed commands[0m
[0mto the REPL instance. Such commands are invoked by typing a [33m.[39m followed by the[0m
[0m[33mkeyword[39m. The [33mcmd[39m is either a [33mFunction[39m or an [33mObject[39m with the following[0m
[0mproperties:[0m

    * [0m[33mhelp[39m {string} Help text to be displayed when [33m.help[39m is entered (Optional).[0m
    * [0m[33maction[39m {Function} The function to execute, optionally accepting a single[0m
      [0mstring argument.[0m

[0mThe following example shows two new commands added to the REPL instance:[0m

    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mreplServer[39m [93m=[39m [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[33m{[39m [37mprompt[39m[93m:[39m [92m'> '[39m [33m}[39m[90m)[39m[90m;[39m
    [37mreplServer[39m[32m.[39m[37mdefineCommand[39m[90m([39m[92m'sayhello'[39m[32m,[39m [33m{[39m
      [37mhelp[39m[93m:[39m [92m'Say hello'[39m[32m,[39m
      [37maction[39m[90m([39m[37mname[39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37mclearBufferedCommand[39m[90m([39m[90m)[39m[90m;[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Hello, ${[37mname[39m}!`[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37mdisplayPrompt[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mreplServer[39m[32m.[39m[37mdefineCommand[39m[90m([39m[92m'saybye'[39m[32m,[39m [94mfunction[39m [37msaybye[39m[90m([39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Goodbye!'[39m[90m)[39m[90m;[39m
      [91mthis[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe new commands can then be used from within the REPL instance:[0m

    [33m> .sayhello Node.js User[39m
    [33mHello, Node.js User![39m
    [33m> .saybye[39m
    [33mGoodbye![39m

[32m[1m### [33mreplServer.displayPrompt([preserveCursor])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.91[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpreserveCursor[39m {boolean}[0m

[0mThe [33mreplServer.displayPrompt()[39m method readies the REPL instance for input[0m
[0mfrom the user, printing the configured [33mprompt[39m to a new line in the [33moutput[39m[0m
[0mand resuming the [33minput[39m to accept new input.[0m

[0mWhen multi-line input is being entered, an ellipsis is printed rather than the[0m
[0m'prompt'.[0m

[0mWhen [33mpreserveCursor[39m is [33mtrue[39m, the cursor placement will not be reset to [33m0[39m.[0m

[0mThe [33mreplServer.displayPrompt[39m method is primarily intended to be called from[0m
[0mwithin the action function for commands registered using the[0m
[0m[33mreplServer.defineCommand()[39m method.[0m

[32m[1m### [33mreplServer.clearBufferedCommand()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mreplServer.clearBufferedCommand()[39m method clears any command that has been[0m
[0mbuffered but not yet executed. This method is primarily intended to be[0m
[0mcalled from within the action function for commands registered using the[0m
[0m[33mreplServer.defineCommand()[39m method.[0m

[32m[1m### [33mreplServer.parseREPLKeyword(keyword[, rest])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.9[39m
[90mdeprecated: v9.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated.[0m[23m[39m

    * [0m[33mkeyword[39m {string} the potential keyword to parse and execute[0m
    * [0m[33mrest[39m {any} any parameters to the keyword command[0m
    * [0mReturns: {boolean}[0m

[0mAn internal method used to parse and execute [33mREPLServer[39m keywords.[0m
[0mReturns [33mtrue[39m if [33mkeyword[39m is a valid keyword, otherwise [33mfalse[39m.[0m

[32m[1m### [33mreplServer.setupHistory(historyPath, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhistoryPath[39m {string} the path to the history file[0m
    * [0m[33mcallback[39m {Function} called when history writes are ready or upon error
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mrepl[39m {repl.REPLServer}[0m[0m[0m

[0mInitializes a history log file for the REPL instance. When executing the[0m
[0mNode.js binary and using the command line REPL, a history file is initialized[0m
[0mby default. However, this is not the case when creating a REPL[0m
[0mprogrammatically. Use this method to initialize a history log file when working[0m
[0mwith REPL instances programmatically.[0m

[32m[1m## [33mrepl.start([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.91[39m
[90mchanges:[39m
[90m  - version: v13.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30811[39m
[90m    description: The `preview` option is now available.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26518[39m
[90m    description: The `terminal` option now follows the default description in[39m
[90m                 all cases and `useColors` checks `hasColors()` if available.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19187[39m
[90m    description: The `REPL_MAGIC_MODE` `replMode` was removed.[39m
[90m  - version: v5.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5388[39m
[90m    description: The `options` parameter is optional now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mprompt[39m {string} The input prompt to display. [1mDefault:[22m [33m'> '[39m[0m[0m[0m
      [0m      [0m[0m(with a trailing space).[0m[0m[0m
      [0m
        * [0m[0m[33minput[39m {stream.Readable} The [33mReadable[39m stream from which REPL input will[0m[0m[0m
      [0m      [0m[0mbe read. [1mDefault:[22m [33mprocess.stdin[39m.[0m[0m[0m
      [0m
        * [0m[0m[33moutput[39m {stream.Writable} The [33mWritable[39m stream to which REPL output will[0m[0m[0m
      [0m      [0m[0mbe written. [1mDefault:[22m [33mprocess.stdout[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mterminal[39m {boolean} If [33mtrue[39m, specifies that the [33moutput[39m should be[0m[0m[0m
      [0m      [0m[0mtreated as a TTY terminal.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m checking the value of the [33misTTY[39m property on the [33moutput[39m[0m[0m[0m
      [0m      [0m[0mstream upon instantiation.[0m[0m[0m
      [0m
        * [0m[0m[33meval[39m {Function} The function to be used when evaluating each given line[0m[0m[0m
      [0m      [0m[0mof input. [1mDefault:[22m an async wrapper for the JavaScript [33meval()[39m[0m[0m[0m
      [0m      [0m[0mfunction. An [33meval[39m function can error with [33mrepl.Recoverable[39m to indicate[0m[0m[0m
      [0m      [0m[0mthe input was incomplete and prompt for additional lines.[0m[0m[0m
      [0m
        * [0m[0m[33museColors[39m {boolean} If [33mtrue[39m, specifies that the default [33mwriter[39m[0m[0m[0m
      [0m      [0m[0mfunction should include ANSI color styling to REPL output. If a custom[0m[0m[0m
      [0m      [0m[0m[33mwriter[39m function is provided then this has no effect. [1mDefault:[22m checking[0m[0m[0m
      [0m      [0m[0mcolor support on the [33moutput[39m stream if the REPL instance's [33mterminal[39m value[0m[0m[0m
      [0m      [0m[0mis [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33museGlobal[39m {boolean} If [33mtrue[39m, specifies that the default evaluation[0m[0m[0m
      [0m      [0m[0m function will use the JavaScript [33mglobal[39m as the context as opposed to[0m[0m[0m
      [0m      [0m[0m creating a new separate context for the REPL instance. The node CLI REPL[0m[0m[0m
      [0m      [0m[0m sets this value to [33mtrue[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mignoreUndefined[39m {boolean} If [33mtrue[39m, specifies that the default writer[0m[0m[0m
      [0m      [0m[0m will not output the return value of a command if it evaluates to[0m[0m[0m
      [0m      [0m[0m [33mundefined[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwriter[39m {Function} The function to invoke to format the output of each[0m[0m[0m
      [0m      [0m[0m command before writing to [33moutput[39m. [1mDefault:[22m [34m[33mutil.inspect()[39m[34m ([34m[4mutil.html#util_util_inspect_object_options[24m[39m[34m)[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcompleter[39m {Function} An optional function used for custom Tab auto[0m[0m[0m
      [0m      [0m[0m completion. See [34m[33mreadline.InterfaceCompleter[39m[34m ([34m[4mreadline.html#readline_use_of_the_completer_function[24m[39m[34m)[39m for an example.[0m[0m[0m
      [0m
        * [0m[0m[33mreplMode[39m {symbol} A flag that specifies whether the default evaluator[0m[0m[0m
      [0m      [0m[0mexecutes all JavaScript commands in strict mode or default (sloppy) mode.[0m[0m[0m
      [0m      [0m[0mAcceptable values are:[0m
      [0m
            * [0m[0m[0m[0m[33mrepl.REPL_MODE_SLOPPY[39m to evaluate expressions in sloppy mode.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mrepl.REPL_MODE_STRICT[39m to evaluate expressions in strict mode. This is[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mequivalent to prefacing every repl statement with [33m'use strict'[39m.[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[33mbreakEvalOnSigint[39m {boolean} Stop evaluating the current piece of code when[0m[0m[0m
      [0m      [0m[0m[33mSIGINT[39m is received, such as when [33mCtrl+C[39m is pressed. This cannot be used[0m[0m[0m
      [0m      [0m[0mtogether with a custom [33meval[39m function. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mpreview[39m {boolean} Defines if the repl prints autocomplete and output[0m[0m[0m
      [0m      [0m[0mpreviews or not. [1mDefault:[22m [33mtrue[39m with the default eval function and[0m[0m[0m
      [0m      [0m[0m[33mfalse[39m in case a custom eval function is used. If [33mterminal[39m is falsy, then[0m[0m[0m
      [0m      [0m[0mthere are no previews and the value of [33mpreview[39m has no effect.[0m[0m[0m
    * [0mReturns: {repl.REPLServer}[0m

[0mThe [33mrepl.start()[39m method creates and starts a [34m[33mrepl.REPLServer[39m[34m ([34m[4m#repl_class_replserver[24m[39m[34m)[39m instance.[0m

[0mIf [33moptions[39m is a string, then it specifies the input prompt:[0m

    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m
    
    [90m// a Unix style prompt[39m
    [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[92m'$ '[39m[90m)[39m[90m;[39m

[32m[1m## The Node.js REPL[22m[39m

[0mNode.js itself uses the [33mrepl[39m module to provide its own interactive interface[0m
[0mfor executing JavaScript. This can be used by executing the Node.js binary[0m
[0mwithout passing any arguments (or by passing the [33m-i[39m argument):[0m

    [33m$ node[39m
    [33m> const a = [1, 2, 3];[39m
    [33mundefined[39m
    [33m> a[39m
    [33m[ 1, 2, 3 ][39m
    [33m> a.forEach((v) => {[39m
    [33m...   console.log(v);[39m
    [33m...   });[39m
    [33m1[39m
    [33m2[39m
    [33m3[39m

[32m[1m### Environment Variable Options[22m[39m

[0mVarious behaviors of the Node.js REPL can be customized using the following[0m
[0menvironment variables:[0m

    * [0m[33mNODE_REPL_HISTORY[39m: When a valid path is given, persistent REPL history[0m
      [0mwill be saved to the specified file rather than [33m.node_repl_history[39m in the[0m
      [0muser's home directory. Setting this value to [33m''[39m (an empty string) will[0m
      [0mdisable persistent REPL history. Whitespace will be trimmed from the value.[0m
      [0mOn Windows platforms environment variables with empty values are invalid so[0m
      [0mset this variable to one or more spaces to disable persistent REPL history.[0m
    * [0m[33mNODE_REPL_HISTORY_SIZE[39m: Controls how many lines of history will be[0m
      [0mpersisted if history is available. Must be a positive number.[0m
      [0m[1mDefault:[22m [33m1000[39m.[0m
    * [0m[33mNODE_REPL_MODE[39m: May be either [33m'sloppy'[39m or [33m'strict'[39m. [1mDefault:[22m[0m
      [0m[33m'sloppy'[39m, which will allow non-strict mode code to be run.[0m

[32m[1m### Persistent History[22m[39m

[0mBy default, the Node.js REPL will persist history between [33mnode[39m REPL sessions[0m
[0mby saving inputs to a [33m.node_repl_history[39m file located in the user's home[0m
[0mdirectory. This can be disabled by setting the environment variable[0m
[0m[33mNODE_REPL_HISTORY=''[39m.[0m

[32m[1m### Using the Node.js REPL with advanced line-editors[22m[39m

[0mFor advanced line-editors, start Node.js with the environment variable[0m
[0m[33mNODE_NO_READLINE=1[39m. This will start the main and debugger REPL in canonical[0m
[0mterminal settings, which will allow use with [33mrlwrap[39m.[0m

[0mFor example, the following can be added to a [33m.bashrc[39m file:[0m

    [33malias node="env NODE_NO_READLINE=1 rlwrap node"[39m

[32m[1m### Starting multiple REPL instances against a single running instance[22m[39m

[0mIt is possible to create and run multiple REPL instances against a single[0m
[0mrunning instance of Node.js that share a single [33mglobal[39m object but have[0m
[0mseparate I/O interfaces.[0m

[0mThe following example, for instance, provides separate REPLs on [33mstdin[39m, a Unix[0m
[0msocket, and a TCP socket:[0m

    [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mrepl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/repl'[39m[90m)[39m[90m;[39m
    [94mlet[39m [37mconnections[39m [93m=[39m [34m0[39m[90m;[39m
    
    [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[33m{[39m
      [37mprompt[39m[93m:[39m [92m'Node.js via stdin> '[39m[32m,[39m
      [37minput[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstdin[39m[32m,[39m
      [37moutput[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstdout[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mconnections[39m [93m+=[39m [34m1[39m[90m;[39m
      [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[33m{[39m
        [37mprompt[39m[93m:[39m [92m'Node.js via Unix socket> '[39m[32m,[39m
        [37minput[39m[93m:[39m [37msocket[39m[32m,[39m
        [37moutput[39m[93m:[39m [37msocket[39m
      [33m}[39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37msocket[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[92m'/tmp/node-repl-sock'[39m[90m)[39m[90m;[39m
    
    [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mconnections[39m [93m+=[39m [34m1[39m[90m;[39m
      [37mrepl[39m[32m.[39m[37mstart[39m[90m([39m[33m{[39m
        [37mprompt[39m[93m:[39m [92m'Node.js via TCP socket> '[39m[32m,[39m
        [37minput[39m[93m:[39m [37msocket[39m[32m,[39m
        [37moutput[39m[93m:[39m [37msocket[39m
      [33m}[39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37msocket[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m5001[39m[90m)[39m[90m;[39m

[0mRunning this application from the command line will start a REPL on stdin.[0m
[0mOther REPL clients may connect through the Unix socket or TCP socket. [33mtelnet[39m,[0m
[0mfor instance, is useful for connecting to TCP sockets, while [33msocat[39m can be used[0m
[0mto connect to both Unix and TCP sockets.[0m

[0mBy starting a REPL from a Unix socket-based server instead of stdin, it is[0m
[0mpossible to connect to a long-running Node.js process without restarting it.[0m

[0mFor an example of running a "full-featured" ([33mterminal[39m) REPL over[0m
[0ma [33mnet.Server[39m and [33mnet.Socket[39m instance, see:[0m
[0m[34m[34m[4mhttps://gist.github.com/TooTallNate/2209310[24m[39m[34m[39m.[0m

[0mFor an example of running a REPL instance over [34mcurl(1) ([34m[4mhttps://curl.haxx.se/docs/manpage.html[24m[39m[34m)[39m, see:[0m
[0m[34m[34m[4mhttps://gist.github.com/TooTallNate/2053342[24m[39m[34m[39m.[0m

