[35m[4m[1m# WebAssembly System Interface (WASI)[22m[24m[39m

[90m<!--introduced_in=v13.3.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mThe WASI API provides an implementation of the [34mWebAssembly System Interface ([34m[4mhttps://wasi.dev/[24m[39m[34m)[39m[0m
[0mspecification. WASI gives sandboxed WebAssembly applications access to the[0m
[0munderlying operating system via a collection of POSIX-like functions.[0m

    [92m'use strict'[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mWASI[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/wasi'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mwasi[39m [93m=[39m [31mnew[39m [37mWASI[39m[90m([39m[33m{[39m
      [37margs[39m[93m:[39m [37mprocess[39m[32m.[39m[37margv[39m[32m,[39m
      [37menv[39m[93m:[39m [37mprocess[39m[32m.[39m[37menv[39m[32m,[39m
      [37mpreopens[39m[93m:[39m [33m{[39m
        [32m'/sandbox'[39m[93m:[39m [92m'/some/real/path/that/wasm/can/access'[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mimportObject[39m [93m=[39m [33m{[39m [37mwasi_snapshot_preview1[39m[93m:[39m [37mwasi[39m[32m.[39m[37mwasiImport[39m [33m}[39m[90m;[39m
    
    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mwasm[39m [93m=[39m [37mawait[39m [37mWebAssembly[39m[32m.[39m[37mcompile[39m[90m([39m[37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'./binary.wasm'[39m[90m)[39m[90m)[39m[90m;[39m
      [94mconst[39m [37minstance[39m [93m=[39m [37mawait[39m [37mWebAssembly[39m[32m.[39m[37minstantiate[39m[90m([39m[37mwasm[39m[32m,[39m [37mimportObject[39m[90m)[39m[90m;[39m
    
      [37mwasi[39m[32m.[39m[37mstart[39m[90m([39m[37minstance[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[0mThe [33m--experimental-wasi-unstable-preview1[39m and [33m--experimental-wasm-bigint[39m[0m
[0mCLI arguments are needed for the previous example to run.[0m

[32m[1m## Class: [33mWASI[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mWASI[39m class provides the WASI system call API and additional convenience[0m
[0mmethods for working with WASI-based applications. Each [33mWASI[39m instance[0m
[0mrepresents a distinct sandbox environment. For security purposes, each [33mWASI[39m[0m
[0minstance must have its command line arguments, environment variables, and[0m
[0msandbox directory structure configured explicitly.[0m

[32m[1m### [33mnew WASI([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33margs[39m {Array} An array of strings that the WebAssembly application will[0m[0m[0m
      [0m      [0m[0msee as command line arguments. The first argument is the virtual path to the[0m[0m[0m
      [0m      [0m[0mWASI command itself. [1mDefault:[22m [33m[][39m.[0m[0m[0m
      [0m
        * [0m[0m[33menv[39m {Object} An object similar to [33mprocess.env[39m that the WebAssembly[0m[0m[0m
      [0m      [0m[0mapplication will see as its environment. [1mDefault:[22m [33m{}[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mpreopens[39m {Object} This object represents the WebAssembly application's[0m[0m[0m
      [0m      [0m[0msandbox directory structure. The string keys of [33mpreopens[39m are treated as[0m[0m[0m
      [0m      [0m[0mdirectories within the sandbox. The corresponding values in [33mpreopens[39m are[0m[0m[0m
      [0m      [0m[0mthe real paths to those directories on the host machine.[0m[0m[0m
      [0m
        * [0m[0m[33mreturnOnExit[39m {boolean} By default, WASI applications terminate the Node.js[0m[0m[0m
      [0m      [0m[0mprocess via the [33m__wasi_proc_exit()[39m function. Setting this option to [33mtrue[39m[0m[0m[0m
      [0m      [0m[0mcauses [33mwasi.start()[39m to return the exit code rather than terminate the[0m[0m[0m
      [0m      [0m[0mprocess. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m

[32m[1m### [33mwasi.start(instance)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33minstance[39m {WebAssembly.Instance}[0m

[0mAttempt to begin execution of [33minstance[39m by invoking its [33m_start()[39m export.[0m
[0mIf [33minstance[39m does not contain a [33m_start()[39m export, then [33mstart()[39m attempts to[0m
[0minvoke the [33m__wasi_unstable_reactor_start()[39m export. If neither of those exports[0m
[0mis present on [33minstance[39m, then [33mstart()[39m does nothing.[0m

[0m[33mstart()[39m requires that [33minstance[39m exports a [34m[33mWebAssembly.Memory[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory[24m[39m[34m)[39m named[0m
[0m[33mmemory[39m. If [33minstance[39m does not have a [33mmemory[39m export an exception is thrown.[0m

[32m[1m### [33mwasi.wasiImport[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0m[33mwasiImport[39m is an object that implements the WASI system call API. This object[0m
[0mshould be passed as the [33mwasi_snapshot_preview1[39m import during the instantiation[0m
[0mof a [34m[33mWebAssembly.Instance[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance[24m[39m[34m)[39m.[0m

