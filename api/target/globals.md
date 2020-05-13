[35m[4m[1m# Global Objects[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mThese objects are available in all modules. The following variables may appear[0m
[0mto be global but are not. They exist only in the scope of modules, see the[0m
[0m[34mmodule system documentation ([34m[4mmodules.html[24m[39m[34m)[39m:[0m

    * [0m[34m[33m__dirname[39m[34m ([34m[4mmodules.html#modules_dirname[24m[39m[34m)[39m[0m
    * [0m[34m[33m__filename[39m[34m ([34m[4mmodules.html#modules_filename[24m[39m[34m)[39m[0m
    * [0m[34m[33mexports[39m[34m ([34m[4mmodules.html#modules_exports[24m[39m[34m)[39m[0m
    * [0m[34m[33mmodule[39m[34m ([34m[4mmodules.html#modules_module[24m[39m[34m)[39m[0m
    * [0m[34m[33mrequire()[39m[34m ([34m[4mmodules.html#modules_require_id[24m[39m[34m)[39m[0m

[0mThe objects listed here are specific to Node.js. There are [34mbuilt-in objects ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects[24m[39m[34m)[39m[0m
[0mthat are part of the JavaScript language itself, which are also globally[0m
[0maccessible.[0m

[32m[1m## Class: [33mBuffer[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.103[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m    * [0m{Function}[0m

[0mUsed to handle binary data. See the [34mbuffer section ([34m[4mbuffer.html[24m[39m[34m)[39m.[0m

[32m[1m## [33m__dirname[39m[32m[22m[39m

[0mThis variable may appear to be global but is not. See [34m[33m__dirname[39m[34m ([34m[4mmodules.html#modules_dirname[24m[39m[34m)[39m.[0m

[32m[1m## [33m__filename[39m[32m[22m[39m

[0mThis variable may appear to be global but is not. See [34m[33m__filename[39m[34m ([34m[4mmodules.html#modules_filename[24m[39m[34m)[39m.[0m

[32m[1m## [33mclearImmediate(immediateObject)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=global-->[39m
[90m[39m
[90m[39m[0m[34m[33mclearImmediate[39m[34m ([34m[4mtimers.html#timers_clearimmediate_immediate[24m[39m[34m)[39m is described in the [34mtimers ([34m[4mtimers.html[24m[39m[34m)[39m section.[0m

[32m[1m## [33mclearInterval(intervalObject)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=global-->[39m
[90m[39m
[90m[39m[0m[34m[33mclearInterval[39m[34m ([34m[4mtimers.html#timers_clearinterval_timeout[24m[39m[34m)[39m is described in the [34mtimers ([34m[4mtimers.html[24m[39m[34m)[39m section.[0m

[32m[1m## [33mclearTimeout(timeoutObject)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=global-->[39m
[90m[39m
[90m[39m[0m[34m[33mclearTimeout[39m[34m ([34m[4mtimers.html#timers_cleartimeout_timeout[24m[39m[34m)[39m is described in the [34mtimers ([34m[4mtimers.html[24m[39m[34m)[39m section.[0m

[32m[1m## [33mconsole[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.100[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mUsed to print to stdout and stderr. See the [34m[33mconsole[39m[34m ([34m[4mconsole.html[24m[39m[34m)[39m section.[0m

[32m[1m## [33mexports[39m[32m[22m[39m

[0mThis variable may appear to be global but is not. See [34m[33mexports[39m[34m ([34m[4mmodules.html#modules_exports[24m[39m[34m)[39m.[0m

[32m[1m## [33mglobal[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.27[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m    * [0m{Object} The global namespace object.[0m

[0mIn browsers, the top-level scope is the global scope. This means that[0m
[0mwithin the browser [33mvar something[39m will define a new global variable. In[0m
[0mNode.js this is different. The top-level scope is not the global scope;[0m
[0m[33mvar something[39m inside a Node.js module will be local to that module.[0m

[32m[1m## [33mmodule[39m[32m[22m[39m

[0mThis variable may appear to be global but is not. See [34m[33mmodule[39m[34m ([34m[4mmodules.html#modules_module[24m[39m[34m)[39m.[0m

[32m[1m## [33mprocess[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.7[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe process object. See the [34m[33mprocess[39m[34m object ([34m[4mprocess.html#process_process[24m[39m[34m)[39m section.[0m

[32m[1m## [33mqueueMicrotask(callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} Function to be queued.[0m

[0mThe [33mqueueMicrotask()[39m method queues a microtask to invoke [33mcallback[39m. If[0m
[0m[33mcallback[39m throws an exception, the [34m[33mprocess[39m[34m object ([34m[4mprocess.html#process_process[24m[39m[34m)[39m [33m'uncaughtException'[39m[0m
[0mevent will be emitted.[0m

[0mThe microtask queue is managed by V8 and may be used in a similar manner to[0m
[0mthe [34m[33mprocess.nextTick()[39m[34m ([34m[4mprocess.html#process_process_nexttick_callback_args[24m[39m[34m)[39m queue, which is managed by Node.js. The[0m
[0m[33mprocess.nextTick()[39m queue is always processed before the microtask queue[0m
[0mwithin each turn of the Node.js event loop.[0m

    [90m// Here, `queueMicrotask()` is used to ensure the 'load' event is always[39m
    [90m// emitted asynchronously, and therefore consistently. Using[39m
    [90m// `process.nextTick()` here would result in the 'load' event always emitting[39m
    [90m// before any other promise jobs.[39m
    
    [37mDataHandler[39m[32m.[39m[37mprototype[39m[32m.[39m[37mload[39m [93m=[39m [37masync[39m [94mfunction[39m [37mload[39m[90m([39m[37mkey[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mhit[39m [93m=[39m [91mthis[39m[32m.[39m[37m_cache[39m[32m.[39m[37mget[39m[90m([39m[37murl[39m[90m)[39m[90m;[39m
      [94mif[39m [90m([39m[37mhit[39m [93m!==[39m [90mundefined[39m[90m)[39m [33m{[39m
        [37mqueueMicrotask[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [91mthis[39m[32m.[39m[37memit[39m[90m([39m[92m'load'[39m[32m,[39m [37mhit[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
    
      [94mconst[39m [37mdata[39m [93m=[39m [37mawait[39m [37mfetchData[39m[90m([39m[37mkey[39m[90m)[39m[90m;[39m
      [91mthis[39m[32m.[39m[37m_cache[39m[32m.[39m[37mset[39m[90m([39m[37murl[39m[32m,[39m [37mdata[39m[90m)[39m[90m;[39m
      [91mthis[39m[32m.[39m[37memit[39m[90m([39m[92m'load'[39m[32m,[39m [37mdata[39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m

[32m[1m## [33mrequire()[39m[32m[22m[39m

[0mThis variable may appear to be global but is not. See [34m[33mrequire()[39m[34m ([34m[4mmodules.html#modules_require_id[24m[39m[34m)[39m.[0m

[32m[1m## [33msetImmediate(callback[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m[0m[34m[33msetImmediate[39m[34m ([34m[4mtimers.html#timers_setimmediate_callback_args[24m[39m[34m)[39m is described in the [34mtimers ([34m[4mtimers.html[24m[39m[34m)[39m section.[0m

[32m[1m## [33msetInterval(callback, delay[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m[0m[34m[33msetInterval[39m[34m ([34m[4mtimers.html#timers_setinterval_callback_delay_args[24m[39m[34m)[39m is described in the [34mtimers ([34m[4mtimers.html[24m[39m[34m)[39m section.[0m

[32m[1m## [33msetTimeout(callback, delay[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m[0m[34m[33msetTimeout[39m[34m ([34m[4mtimers.html#timers_settimeout_callback_delay_args[24m[39m[34m)[39m is described in the [34mtimers ([34m[4mtimers.html[24m[39m[34m)[39m section.[0m

[32m[1m## [33mTextDecoder[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m[0mThe WHATWG [33mTextDecoder[39m class. See the [34m[33mTextDecoder[39m[34m ([34m[4mutil.html#util_class_util_textdecoder[24m[39m[34m)[39m section.[0m

[32m[1m## [33mTextEncoder[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m[0mThe WHATWG [33mTextEncoder[39m class. See the [34m[33mTextEncoder[39m[34m ([34m[4mutil.html#util_class_util_textencoder[24m[39m[34m)[39m section.[0m

[32m[1m## [33mURL[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m[0mThe WHATWG [33mURL[39m class. See the [34m[33mURL[39m[34m ([34m[4murl.html#url_class_url[24m[39m[34m)[39m section.[0m

[32m[1m## [33mURLSearchParams[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m[0mThe WHATWG [33mURLSearchParams[39m class. See the [34m[33mURLSearchParams[39m[34m ([34m[4murl.html#url_class_urlsearchparams[24m[39m[34m)[39m section.[0m

[32m[1m## [33mWebAssembly[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe object that acts as the namespace for all W3C[0m
[0m[34mWebAssembly ([34m[4mhttps://webassembly.org[24m[39m[34m)[39m related functionality. See the[0m
[0m[34mMozilla Developer Network ([34m[4mhttps://developer.mozilla.org/en-US/docs/WebAssembly[24m[39m[34m)[39m for usage and compatibility.[0m

