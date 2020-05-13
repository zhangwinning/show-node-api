[35m[4m[1m# TTY[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mtty[39m module provides the [33mtty.ReadStream[39m and [33mtty.WriteStream[39m classes.[0m
[0mIn most cases, it will not be necessary or possible to use this module directly.[0m
[0mHowever, it can be accessed using:[0m

    [94mconst[39m [37mtty[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/tty'[39m[90m)[39m[90m;[39m

[0mWhen Node.js detects that it is being run with a text terminal ("TTY")[0m
[0mattached, [34m[33mprocess.stdin[39m[34m ([34m[4mprocess.html#process_process_stdin[24m[39m[34m)[39m will, by default, be initialized as an instance of[0m
[0m[33mtty.ReadStream[39m and both [34m[33mprocess.stdout[39m[34m ([34m[4mprocess.html#process_process_stdout[24m[39m[34m)[39m and [34m[33mprocess.stderr[39m[34m ([34m[4mprocess.html#process_process_stderr[24m[39m[34m)[39m will, by[0m
[0mdefault be instances of [33mtty.WriteStream[39m. The preferred method of determining[0m
[0mwhether Node.js is being run within a TTY context is to check that the value of[0m
[0mthe [33mprocess.stdout.isTTY[39m property is [33mtrue[39m:[0m

    [33m$ node -p -e "Boolean(process.stdout.isTTY)"[39m
    [33mtrue[39m
    [33m$ node -p -e "Boolean(process.stdout.isTTY)" | cat[39m
    [33mfalse[39m

[0mIn most cases, there should be little to no reason for an application to[0m
[0mmanually create instances of the [33mtty.ReadStream[39m and [33mtty.WriteStream[39m[0m
[0mclasses.[0m

[32m[1m## Class: [33mtty.ReadStream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {net.Socket}[0m

[0mRepresents the readable side of a TTY. In normal circumstances[0m
[0m[34m[33mprocess.stdin[39m[34m ([34m[4mprocess.html#process_process_stdin[24m[39m[34m)[39m will be the only [33mtty.ReadStream[39m instance in a Node.js[0m
[0mprocess and there should be no reason to create additional instances.[0m

[32m[1m### [33mreadStream.isRaw[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA [33mboolean[39m that is [33mtrue[39m if the TTY is currently configured to operate as a[0m
[0mraw device. Defaults to [33mfalse[39m.[0m

[32m[1m### [33mreadStream.isTTY[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA [33mboolean[39m that is always [33mtrue[39m for [33mtty.ReadStream[39m instances.[0m

[32m[1m### [33mreadStream.setRawMode(mode)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmode[39m {boolean} If [33mtrue[39m, configures the [33mtty.ReadStream[39m to operate as a[0m
      [0mraw device. If [33mfalse[39m, configures the [33mtty.ReadStream[39m to operate in its[0m
      [0mdefault mode. The [33mreadStream.isRaw[39m property will be set to the resulting[0m
      [0mmode.[0m
    * [0mReturns: {this} The read stream instance.[0m

[0mAllows configuration of [33mtty.ReadStream[39m so that it operates as a raw device.[0m

[0mWhen in raw mode, input is always available character-by-character, not[0m
[0mincluding modifiers. Additionally, all special processing of characters by the[0m
[0mterminal is disabled, including echoing input characters.[0m
[0m[33mCTRL[39m+[33mC[39m will no longer cause a [33mSIGINT[39m when in this mode.[0m

[32m[1m## Class: [33mtty.WriteStream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {net.Socket}[0m

[0mRepresents the writable side of a TTY. In normal circumstances,[0m
[0m[34m[33mprocess.stdout[39m[34m ([34m[4mprocess.html#process_process_stdout[24m[39m[34m)[39m and [34m[33mprocess.stderr[39m[34m ([34m[4mprocess.html#process_process_stderr[24m[39m[34m)[39m will be the only[0m
[0m[33mtty.WriteStream[39m instances created for a Node.js process and there[0m
[0mshould be no reason to create additional instances.[0m

[32m[1m### Event: [33m'resize'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'resize'[39m event is emitted whenever either of the [33mwriteStream.columns[39m[0m
[0mor [33mwriteStream.rows[39m properties have changed. No arguments are passed to the[0m
[0mlistener callback when called.[0m

    [37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mon[39m[90m([39m[92m'resize'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'screen size has changed!'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mcolumns[39m}x${[37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mrows[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mwriteStream.clearLine(dir[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90mchanges:[39m
[90m  - version: v12.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28721[39m
[90m    description: The stream's write() callback and return value are exposed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdir[39m {number}
        * [0m[0m[33m-1[39m: to the left from cursor[0m[0m[0m
      [0m
        * [0m[0m[33m1[39m: to the right from cursor[0m[0m[0m
      [0m
        * [0m[0m[33m0[39m: the entire line[0m[0m[0m
    * [0m[33mcallback[39m {Function} Invoked once the operation completes.[0m
    * [0mReturns: {boolean} [33mfalse[39m if the stream wishes for the calling code to wait[0m
      [0mfor the [33m'drain'[39m event to be emitted before continuing to write additional[0m
      [0mdata; otherwise [33mtrue[39m.[0m

[0m[33mwriteStream.clearLine()[39m clears the current line of this [33mWriteStream[39m in a[0m
[0mdirection identified by [33mdir[39m.[0m

[32m[1m### [33mwriteStream.clearScreenDown([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90mchanges:[39m
[90m  - version: v12.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28721[39m
[90m    description: The stream's write() callback and return value are exposed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} Invoked once the operation completes.[0m
    * [0mReturns: {boolean} [33mfalse[39m if the stream wishes for the calling code to wait[0m
      [0mfor the [33m'drain'[39m event to be emitted before continuing to write additional[0m
      [0mdata; otherwise [33mtrue[39m.[0m

[0m[33mwriteStream.clearScreenDown()[39m clears this [33mWriteStream[39m from the current[0m
[0mcursor down.[0m

[32m[1m### [33mwriteStream.columns[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA [33mnumber[39m specifying the number of columns the TTY currently has. This property[0m
[0mis updated whenever the [33m'resize'[39m event is emitted.[0m

[32m[1m### [33mwriteStream.cursorTo(x[, y][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90mchanges:[39m
[90m  - version: v12.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28721[39m
[90m    description: The stream's write() callback and return value are exposed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mx[39m {number}[0m
    * [0m[33my[39m {number}[0m
    * [0m[33mcallback[39m {Function} Invoked once the operation completes.[0m
    * [0mReturns: {boolean} [33mfalse[39m if the stream wishes for the calling code to wait[0m
      [0mfor the [33m'drain'[39m event to be emitted before continuing to write additional[0m
      [0mdata; otherwise [33mtrue[39m.[0m

[0m[33mwriteStream.cursorTo()[39m moves this [33mWriteStream[39m's cursor to the specified[0m
[0mposition.[0m

[32m[1m### [33mwriteStream.getColorDepth([env])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33menv[39m {Object} An object containing the environment variables to check. This[0m
      [0menables simulating the usage of a specific terminal. [1mDefault:[22m[0m
      [0m[33mprocess.env[39m.[0m
    * [0mReturns: {number}[0m

[0mReturns:[0m

    * [0m[33m1[39m for 2,[0m
    * [0m[33m4[39m for 16,[0m
    * [0m[33m8[39m for 256,[0m
    * [0m[33m24[39m for 16,777,216[0m
      [0mcolors supported.[0m

[0mUse this to determine what colors the terminal supports. Due to the nature of[0m
[0mcolors in terminals it is possible to either have false positives or false[0m
[0mnegatives. It depends on process information and the environment variables that[0m
[0mmay lie about what terminal is used.[0m
[0mIt is possible to pass in an [33menv[39m object to simulate the usage of a specific[0m
[0mterminal. This can be useful to check how specific environment settings behave.[0m

[0mTo enforce a specific color support, use one of the below environment settings.[0m

    * [0m2 colors: [33mFORCE_COLOR = 0[39m (Disables colors)[0m
    * [0m16 colors: [33mFORCE_COLOR = 1[39m[0m
    * [0m256 colors: [33mFORCE_COLOR = 2[39m[0m
    * [0m16,777,216 colors: [33mFORCE_COLOR = 3[39m[0m

[0mDisabling color support is also possible by using the [33mNO_COLOR[39m and[0m
[0m[33mNODE_DISABLE_COLORS[39m environment variables.[0m

[32m[1m### [33mwriteStream.getWindowSize()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {number[]}[0m

[0m[33mwriteStream.getWindowSize()[39m returns the size of the [34mTTY ([34m[4mtty.html[24m[39m[34m)[39m[0m
[0mcorresponding to this [33mWriteStream[39m. The array is of the type[0m
[0m[33m[numColumns, numRows][39m where [33mnumColumns[39m and [33mnumRows[39m represent the number[0m
[0mof columns and rows in the corresponding [34mTTY ([34m[4mtty.html[24m[39m[34m)[39m.[0m

[32m[1m### [33mwriteStream.hasColors([count][, env])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcount[39m {integer} The number of colors that are requested (minimum 2).[0m
      [0m[1mDefault:[22m 16.[0m
    * [0m[33menv[39m {Object} An object containing the environment variables to check. This[0m
      [0menables simulating the usage of a specific terminal. [1mDefault:[22m[0m
      [0m[33mprocess.env[39m.[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mwriteStream[39m supports at least as many colors as provided[0m
[0min [33mcount[39m. Minimum support is 2 (black and white).[0m

[0mThis has the same false positives and negatives as described in[0m
[0m[34m[33mwriteStream.getColorDepth()[39m[34m ([34m[4m#tty_writestream_getcolordepth_env[24m[39m[34m)[39m.[0m

    [37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mhasColors[39m[90m([39m[90m)[39m[90m;[39m
    [90m// Returns true or false depending on if `stdout` supports at least 16 colors.[39m
    [37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mhasColors[39m[90m([39m[34m256[39m[90m)[39m[90m;[39m
    [90m// Returns true or false depending on if `stdout` supports at least 256 colors.[39m
    [37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mhasColors[39m[90m([39m[33m{[39m [37mTMUX[39m[93m:[39m [92m'1'[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns true.[39m
    [37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mhasColors[39m[90m([39m[34m2[39m [93m**[39m [34m24[39m[32m,[39m [33m{[39m [37mTMUX[39m[93m:[39m [92m'1'[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns false (the environment setting pretends to support 2 ** 8 colors).[39m

[32m[1m### [33mwriteStream.isTTY[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA [33mboolean[39m that is always [33mtrue[39m.[0m

[32m[1m### [33mwriteStream.moveCursor(dx, dy[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90mchanges:[39m
[90m  - version: v12.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28721[39m
[90m    description: The stream's write() callback and return value are exposed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdx[39m {number}[0m
    * [0m[33mdy[39m {number}[0m
    * [0m[33mcallback[39m {Function} Invoked once the operation completes.[0m
    * [0mReturns: {boolean} [33mfalse[39m if the stream wishes for the calling code to wait[0m
      [0mfor the [33m'drain'[39m event to be emitted before continuing to write additional[0m
      [0mdata; otherwise [33mtrue[39m.[0m

[0m[33mwriteStream.moveCursor()[39m moves this [33mWriteStream[39m's cursor [3mrelative[23m to its[0m
[0mcurrent position.[0m

[32m[1m### [33mwriteStream.rows[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA [33mnumber[39m specifying the number of rows the TTY currently has. This property[0m
[0mis updated whenever the [33m'resize'[39m event is emitted.[0m

[32m[1m## [33mtty.isatty(fd)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {number} A numeric file descriptor[0m
    * [0mReturns: {boolean}[0m

[0mThe [33mtty.isatty()[39m method returns [33mtrue[39m if the given [33mfd[39m is associated with[0m
[0ma TTY and [33mfalse[39m if it is not, including whenever [33mfd[39m is not a non-negative[0m
[0minteger.[0m

