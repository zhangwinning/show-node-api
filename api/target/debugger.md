[35m[4m[1m# Debugger[22m[24m[39m

[90m<!--introduced_in=v0.9.12-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mNode.js includes an out-of-process debugging utility accessible via a[0m
[0m[34mV8 Inspector ([34m[4m#debugger_v8_inspector_integration_for_node_js[24m[39m[34m)[39m and built-in debugging client. To use it, start Node.js[0m
[0mwith the [33minspect[39m argument followed by the path to the script to debug; a[0m
[0mprompt will be displayed indicating successful launch of the debugger:[0m

    [33m$ node inspect myscript.js[39m
    [33m< Debugger listening on ws://127.0.0.1:9229/80e7a814-7cd3-49fb-921a-2e02228cd5ba[39m
    [33m< For help, see: https://nodejs.org/en/docs/inspector[39m
    [33m< Debugger attached.[39m
    [33mBreak on start in myscript.js:1[39m
    [33m> 1 (function (exports, require, module, __filename, __dirname) { global.x = 5;[39m
    [33m  2 setTimeout(() => {[39m
    [33m  3   console.log('world');[39m
    [33mdebug>[39m

[0mThe Node.js debugger client is not a full-featured debugger, but simple step and[0m
[0minspection are possible.[0m

[0mInserting the statement [33mdebugger;[39m into the source code of a script will[0m
[0menable a breakpoint at that position in the code:[0m

[90m<!-- eslint-disable no-debugger -->[39m
[90m[39m    [90m// myscript.js[39m
    [37mglobal[39m[32m.[39m[37mx[39m [93m=[39m [34m5[39m[90m;[39m
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mdebugger[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'world'[39m[90m)[39m[90m;[39m
    [33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'hello'[39m[90m)[39m[90m;[39m

[0mOnce the debugger is run, a breakpoint will occur at line 3:[0m

    [33m$ node inspect myscript.js[39m
    [33m< Debugger listening on ws://127.0.0.1:9229/80e7a814-7cd3-49fb-921a-2e02228cd5ba[39m
    [33m< For help, see: https://nodejs.org/en/docs/inspector[39m
    [33m< Debugger attached.[39m
    [33mBreak on start in myscript.js:1[39m
    [33m> 1 (function (exports, require, module, __filename, __dirname) { global.x = 5;[39m
    [33m  2 setTimeout(() => {[39m
    [33m  3   debugger;[39m
    [33mdebug> cont[39m
    [33m< hello[39m
    [33mbreak in myscript.js:3[39m
    [33m  1 (function (exports, require, module, __filename, __dirname) { global.x = 5;[39m
    [33m  2 setTimeout(() => {[39m
    [33m> 3   debugger;[39m
    [33m  4   console.log('world');[39m
    [33m  5 }, 1000);[39m
    [33mdebug> next[39m
    [33mbreak in myscript.js:4[39m
    [33m  2 setTimeout(() => {[39m
    [33m  3   debugger;[39m
    [33m> 4   console.log('world');[39m
    [33m  5 }, 1000);[39m
    [33m  6 console.log('hello');[39m
    [33mdebug> repl[39m
    [33mPress Ctrl + C to leave debug repl[39m
    [33m> x[39m
    [33m5[39m
    [33m> 2 + 2[39m
    [33m4[39m
    [33mdebug> next[39m
    [33m< world[39m
    [33mbreak in myscript.js:5[39m
    [33m  3   debugger;[39m
    [33m  4   console.log('world');[39m
    [33m> 5 }, 1000);[39m
    [33m  6 console.log('hello');[39m
    [33m  7[39m
    [33mdebug> .exit[39m

[0mThe [33mrepl[39m command allows code to be evaluated remotely. The [33mnext[39m command[0m
[0msteps to the next line. Type [33mhelp[39m to see what other commands are available.[0m

[0mPressing [33menter[39m without typing a command will repeat the previous debugger[0m
[0mcommand.[0m

[32m[1m## Watchers[22m[39m

[0mIt is possible to watch expression and variable values while debugging. On[0m
[0mevery breakpoint, each expression from the watchers list will be evaluated[0m
[0min the current context and displayed immediately before the breakpoint's[0m
[0msource code listing.[0m

[0mTo begin watching an expression, type [33mwatch('my_expression')[39m. The command[0m
[0m[33mwatchers[39m will print the active watchers. To remove a watcher, type[0m
[0m[33munwatch('my_expression')[39m.[0m

[32m[1m## Command reference[22m[39m

[32m[1m### Stepping[22m[39m

    * [0m[33mcont[39m, [33mc[39m: Continue execution[0m
    * [0m[33mnext[39m, [33mn[39m: Step next[0m
    * [0m[33mstep[39m, [33ms[39m: Step in[0m
    * [0m[33mout[39m, [33mo[39m: Step out[0m
    * [0m[33mpause[39m: Pause running code (like pause button in Developer Tools)[0m

[32m[1m### Breakpoints[22m[39m

    * [0m[33msetBreakpoint()[39m, [33msb()[39m: Set breakpoint on current line[0m
    * [0m[33msetBreakpoint(line)[39m, [33msb(line)[39m: Set breakpoint on specific line[0m
    * [0m[33msetBreakpoint('fn()')[39m, [33msb(...)[39m: Set breakpoint on a first statement in[0m
      [0mfunctions body[0m
    * [0m[33msetBreakpoint('script.js', 1)[39m, [33msb(...)[39m: Set breakpoint on first line of[0m
      [0m[33mscript.js[39m[0m
    * [0m[33mclearBreakpoint('script.js', 1)[39m, [33mcb(...)[39m: Clear breakpoint in [33mscript.js[39m[0m
      [0mon line 1[0m

[0mIt is also possible to set a breakpoint in a file (module) that[0m
[0mis not loaded yet:[0m

    [33m$ node inspect main.js[39m
    [33m< Debugger listening on ws://127.0.0.1:9229/4e3db158-9791-4274-8909-914f7facf3bd[39m
    [33m< For help, see: https://nodejs.org/en/docs/inspector[39m
    [33m< Debugger attached.[39m
    [33mBreak on start in main.js:1[39m
    [33m> 1 (function (exports, require, module, __filename, __dirname) { const mod = require('./mod.js');[39m
    [33m  2 mod.hello();[39m
    [33m  3 mod.hello();[39m
    [33mdebug> setBreakpoint('mod.js', 22)[39m
    [33mWarning: script 'mod.js' was not loaded yet.[39m
    [33mdebug> c[39m
    [33mbreak in mod.js:22[39m
    [33m 20 // USE OR OTHER DEALINGS IN THE SOFTWARE.[39m
    [33m 21[39m
    [33m>22 exports.hello = function() {[39m
    [33m 23   return 'hello from module';[39m
    [33m 24 };[39m
    [33mdebug>[39m

[32m[1m### Information[22m[39m

    * [0m[33mbacktrace[39m, [33mbt[39m: Print backtrace of current execution frame[0m
    * [0m[33mlist(5)[39m: List scripts source code with 5 line context (5 lines before and[0m
      [0mafter)[0m
    * [0m[33mwatch(expr)[39m: Add expression to watch list[0m
    * [0m[33munwatch(expr)[39m: Remove expression from watch list[0m
    * [0m[33mwatchers[39m: List all watchers and their values (automatically listed on each[0m
      [0mbreakpoint)[0m
    * [0m[33mrepl[39m: Open debugger's repl for evaluation in debugging script's context[0m
    * [0m[33mexec expr[39m: Execute an expression in debugging script's context[0m

[32m[1m### Execution control[22m[39m

    * [0m[33mrun[39m: Run script (automatically runs on debugger's start)[0m
    * [0m[33mrestart[39m: Restart script[0m
    * [0m[33mkill[39m: Kill script[0m

[32m[1m### Various[22m[39m

    * [0m[33mscripts[39m: List all loaded scripts[0m
    * [0m[33mversion[39m: Display V8's version[0m

[32m[1m## Advanced Usage[22m[39m

[32m[1m### V8 Inspector Integration for Node.js[22m[39m

[0mV8 Inspector integration allows attaching Chrome DevTools to Node.js[0m
[0minstances for debugging and profiling. It uses the[0m
[0m[34mChrome DevTools Protocol ([34m[4mhttps://chromedevtools.github.io/devtools-protocol/[24m[39m[34m)[39m.[0m

[0mV8 Inspector can be enabled by passing the [33m--inspect[39m flag when starting a[0m
[0mNode.js application. It is also possible to supply a custom port with that flag,[0m
[0me.g. [33m--inspect=9222[39m will accept DevTools connections on port 9222.[0m

[0mTo break on the first line of the application code, pass the [33m--inspect-brk[39m[0m
[0mflag instead of [33m--inspect[39m.[0m

    [33m$ node --inspect index.js[39m
    [33mDebugger listening on 127.0.0.1:9229.[39m
    [33mTo start debugging, open the following URL in Chrome:[39m
    [33m    chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9229/dc9010dd-f8b8-4ac5-a510-c1a114ec7d29[39m

[0m(In the example above, the UUID dc9010dd-f8b8-4ac5-a510-c1a114ec7d29[0m
[0mat the end of the URL is generated on the fly, it varies in different[0m
[0mdebugging sessions.)[0m

[0mIf the Chrome browser is older than 66.0.3345.0,[0m
[0muse [33minspector.html[39m instead of [33mjs_app.html[39m in the above URL.[0m

[0mChrome DevTools doesn't support debugging [34mWorker Threads ([34m[4mworker_threads.html[24m[39m[34m)[39m yet.[0m
[0m[34mndb ([34m[4mhttps://github.com/GoogleChromeLabs/ndb/[24m[39m[34m)[39m can be used to debug them.[0m

