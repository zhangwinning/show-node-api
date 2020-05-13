[35m[4m[1m# Readline[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mreadline[39m module provides an interface for reading data from a [34mReadable ([34m[4mstream.html#stream_readable_streams[24m[39m[34m)[39m[0m
[0mstream (such as [34m[33mprocess.stdin[39m[34m ([34m[4mprocess.html#process_process_stdin[24m[39m[34m)[39m) one line at a time. It can be accessed[0m
[0musing:[0m

    [94mconst[39m [37mreadline[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/readline'[39m[90m)[39m[90m;[39m

[0mThe following simple example illustrates the basic use of the [33mreadline[39m module.[0m

    [94mconst[39m [37mreadline[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/readline'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mrl[39m [93m=[39m [37mreadline[39m[32m.[39m[37mcreateInterface[39m[90m([39m[33m{[39m
      [37minput[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstdin[39m[32m,[39m
      [37moutput[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstdout[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mrl[39m[32m.[39m[37mquestion[39m[90m([39m[92m'What do you think of Node.js? '[39m[32m,[39m [90m([39m[37manswer[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// TODO: Log the answer in a database[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Thank you for your valuable feedback: ${[37manswer[39m}`[90m)[39m[90m;[39m
    
      [37mrl[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOnce this code is invoked, the Node.js application will not terminate until the[0m
[0m[33mreadline.Interface[39m is closed because the interface waits for data to be[0m
[0mreceived on the [33minput[39m stream.[0m

[32m[1m## Class: [33mInterface[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.104[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {EventEmitter}[0m

[0mInstances of the [33mreadline.Interface[39m class are constructed using the[0m
[0m[33mreadline.createInterface()[39m method. Every instance is associated with a[0m
[0msingle [33minput[39m [34mReadable ([34m[4mstream.html#stream_readable_streams[24m[39m[34m)[39m stream and a single [33moutput[39m [34mWritable ([34m[4mstream.html#stream_writable_streams[24m[39m[34m)[39m stream.[0m
[0mThe [33moutput[39m stream is used to print prompts for user input that arrives on,[0m
[0mand is read from, the [33minput[39m stream.[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.98[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'close'[39m event is emitted when one of the following occur:[0m

    * [0mThe [33mrl.close()[39m method is called and the [33mreadline.Interface[39m instance has[0m
      [0mrelinquished control over the [33minput[39m and [33moutput[39m streams;[0m
    * [0mThe [33minput[39m stream receives its [33m'end'[39m event;[0m
    * [0mThe [33minput[39m stream receives [33m<ctrl>-D[39m to signal end-of-transmission (EOT);[0m
    * [0mThe [33minput[39m stream receives [33m<ctrl>-C[39m to signal [33mSIGINT[39m and there is no[0m
      [0m[33m'SIGINT'[39m event listener registered on the [33mreadline.Interface[39m instance.[0m

[0mThe listener function is called without passing any arguments.[0m

[0mThe [33mreadline.Interface[39m instance is finished once the [33m'close'[39m event is[0m
[0memitted.[0m

[32m[1m### Event: [33m'line'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.98[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'line'[39m event is emitted whenever the [33minput[39m stream receives an[0m
[0mend-of-line input ([33m\n[39m, [33m\r[39m, or [33m\r\n[39m). This usually occurs when the user[0m
[0mpresses the [33m<Enter>[39m, or [33m<Return>[39m keys.[0m

[0mThe listener function is called with a string containing the single line of[0m
[0mreceived input.[0m

    [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'line'[39m[32m,[39m [90m([39m[37minput[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received: ${[37minput[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'pause'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.5[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'pause'[39m event is emitted when one of the following occur:[0m

    * [0mThe [33minput[39m stream is paused.[0m
    * [0mThe [33minput[39m stream is not paused and receives the [33m'SIGCONT'[39m event. (See[0m
      [0mevents [34m[33m'SIGTSTP'[39m[34m ([34m[4mreadline.html#readline_event_sigtstp[24m[39m[34m)[39m and [34m[33m'SIGCONT'[39m[34m ([34m[4mreadline.html#readline_event_sigcont[24m[39m[34m)[39m.)[0m

[0mThe listener function is called without passing any arguments.[0m

    [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'pause'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Readline paused.'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'resume'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.5[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'resume'[39m event is emitted whenever the [33minput[39m stream is resumed.[0m

[0mThe listener function is called without passing any arguments.[0m

    [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'resume'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Readline resumed.'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'SIGCONT'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.5[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'SIGCONT'[39m event is emitted when a Node.js process previously moved into[0m
[0mthe background using [33m<ctrl>-Z[39m (i.e. [33mSIGTSTP[39m) is then brought back to the[0m
[0mforeground using fg(1p).[0m

[0mIf the [33minput[39m stream was paused [3mbefore[23m the [33mSIGTSTP[39m request, this event will[0m
[0mnot be emitted.[0m

[0mThe listener function is invoked without passing any arguments.[0m

    [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'SIGCONT'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// `prompt` will automatically resume the stream[39m
      [37mrl[39m[32m.[39m[37mprompt[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33m'SIGCONT'[39m event is [3mnot[23m supported on Windows.[0m

[32m[1m### Event: [33m'SIGINT'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'SIGINT'[39m event is emitted whenever the [33minput[39m stream receives a[0m
[0m[33m<ctrl>-C[39m input, known typically as [33mSIGINT[39m. If there are no [33m'SIGINT'[39m event[0m
[0mlisteners registered when the [33minput[39m stream receives a [33mSIGINT[39m, the [33m'pause'[39m[0m
[0mevent will be emitted.[0m

[0mThe listener function is invoked without passing any arguments.[0m

    [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'SIGINT'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mrl[39m[32m.[39m[37mquestion[39m[90m([39m[92m'Are you sure you want to exit? '[39m[32m,[39m [90m([39m[37manswer[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37manswer[39m[32m.[39m[37mmatch[39m[90m([39m/^y(es)?$/i[90m)[39m[90m)[39m [37mrl[39m[32m.[39m[37mpause[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'SIGTSTP'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.5[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'SIGTSTP'[39m event is emitted when the [33minput[39m stream receives a [33m<ctrl>-Z[39m[0m
[0minput, typically known as [33mSIGTSTP[39m. If there are no [33m'SIGTSTP'[39m event listeners[0m
[0mregistered when the [33minput[39m stream receives a [33mSIGTSTP[39m, the Node.js process[0m
[0mwill be sent to the background.[0m

[0mWhen the program is resumed using fg(1p), the [33m'pause'[39m and [33m'SIGCONT'[39m events[0m
[0mwill be emitted. These can be used to resume the [33minput[39m stream.[0m

[0mThe [33m'pause'[39m and [33m'SIGCONT'[39m events will not be emitted if the [33minput[39m was[0m
[0mpaused before the process was sent to the background.[0m

[0mThe listener function is invoked without passing any arguments.[0m

    [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'SIGTSTP'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// This will override SIGTSTP and prevent the program from going to the[39m
      [90m// background.[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Caught SIGTSTP.'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33m'SIGTSTP'[39m event is [3mnot[23m supported on Windows.[0m

[32m[1m### [33mrl.close()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.98[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mrl.close()[39m method closes the [33mreadline.Interface[39m instance and[0m
[0mrelinquishes control over the [33minput[39m and [33moutput[39m streams. When called,[0m
[0mthe [33m'close'[39m event will be emitted.[0m

[0mCalling [33mrl.close()[39m does not immediately stop other events (including [33m'line'[39m)[0m
[0mfrom being emitted by the [33mreadline.Interface[39m instance.[0m

[32m[1m### [33mrl.pause()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mrl.pause()[39m method pauses the [33minput[39m stream, allowing it to be resumed[0m
[0mlater if necessary.[0m

[0mCalling [33mrl.pause()[39m does not immediately pause other events (including[0m
[0m[33m'line'[39m) from being emitted by the [33mreadline.Interface[39m instance.[0m

[32m[1m### [33mrl.prompt([preserveCursor])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.98[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpreserveCursor[39m {boolean} If [33mtrue[39m, prevents the cursor placement from[0m
      [0mbeing reset to [33m0[39m.[0m

[0mThe [33mrl.prompt()[39m method writes the [33mreadline.Interface[39m instances configured[0m
[0m[33mprompt[39m to a new line in [33moutput[39m in order to provide a user with a new[0m
[0mlocation at which to provide input.[0m

[0mWhen called, [33mrl.prompt()[39m will resume the [33minput[39m stream if it has been[0m
[0mpaused.[0m

[0mIf the [33mreadline.Interface[39m was created with [33moutput[39m set to [33mnull[39m or[0m
[0m[33mundefined[39m the prompt is not written.[0m

[32m[1m### [33mrl.question(query, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mquery[39m {string} A statement or query to write to [33moutput[39m, prepended to the[0m
      [0mprompt.[0m
    * [0m[33mcallback[39m {Function} A callback function that is invoked with the user's[0m
      [0minput in response to the [33mquery[39m.[0m

[0mThe [33mrl.question()[39m method displays the [33mquery[39m by writing it to the [33moutput[39m,[0m
[0mwaits for user input to be provided on [33minput[39m, then invokes the [33mcallback[39m[0m
[0mfunction passing the provided input as the first argument.[0m

[0mWhen called, [33mrl.question()[39m will resume the [33minput[39m stream if it has been[0m
[0mpaused.[0m

[0mIf the [33mreadline.Interface[39m was created with [33moutput[39m set to [33mnull[39m or[0m
[0m[33mundefined[39m the [33mquery[39m is not written.[0m

[0mExample usage:[0m

    [37mrl[39m[32m.[39m[37mquestion[39m[90m([39m[92m'What is your favorite food? '[39m[32m,[39m [90m([39m[37manswer[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Oh, so your favorite food is ${[37manswer[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mcallback[39m function passed to [33mrl.question()[39m does not follow the typical[0m
[0mpattern of accepting an [33mError[39m object or [33mnull[39m as the first argument.[0m
[0mThe [33mcallback[39m is called with the provided answer as the only argument.[0m

[32m[1m### [33mrl.resume()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mrl.resume()[39m method resumes the [33minput[39m stream if it has been paused.[0m

[32m[1m### [33mrl.setPrompt(prompt)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.98[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mprompt[39m {string}[0m

[0mThe [33mrl.setPrompt()[39m method sets the prompt that will be written to [33moutput[39m[0m
[0mwhenever [33mrl.prompt()[39m is called.[0m

[32m[1m### [33mrl.write(data[, key])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.98[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {string}[0m
    * [0m[33mkey[39m {Object}
        * [0m[0m[33mctrl[39m {boolean} [33mtrue[39m to indicate the [33m<ctrl>[39m key.[0m[0m[0m
      [0m
        * [0m[0m[33mmeta[39m {boolean} [33mtrue[39m to indicate the [33m<Meta>[39m key.[0m[0m[0m
      [0m
        * [0m[0m[33mshift[39m {boolean} [33mtrue[39m to indicate the [33m<Shift>[39m key.[0m[0m[0m
      [0m
        * [0m[0m[33mname[39m {string} The name of the a key.[0m[0m[0m

[0mThe [33mrl.write()[39m method will write either [33mdata[39m or a key sequence identified[0m
[0mby [33mkey[39m to the [33moutput[39m. The [33mkey[39m argument is supported only if [33moutput[39m is[0m
[0ma [34mTTY ([34m[4mtty.html[24m[39m[34m)[39m text terminal. See [34mTTY keybindings ([34m[4m#readline_tty_keybindings[24m[39m[34m)[39m for a list of key[0m
[0mcombinations.[0m

[0mIf [33mkey[39m is specified, [33mdata[39m is ignored.[0m

[0mWhen called, [33mrl.write()[39m will resume the [33minput[39m stream if it has been[0m
[0mpaused.[0m

[0mIf the [33mreadline.Interface[39m was created with [33moutput[39m set to [33mnull[39m or[0m
[0m[33mundefined[39m the [33mdata[39m and [33mkey[39m are not written.[0m

    [37mrl[39m[32m.[39m[37mwrite[39m[90m([39m[92m'Delete this!'[39m[90m)[39m[90m;[39m
    [90m// Simulate Ctrl+u to delete the line written previously[39m
    [37mrl[39m[32m.[39m[37mwrite[39m[90m([39m[90mnull[39m[32m,[39m [33m{[39m [37mctrl[39m[93m:[39m [91mtrue[39m[32m,[39m [37mname[39m[93m:[39m [92m'u'[39m [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mrl.write()[39m method will write the data to the [33mreadline[39m [33mInterface[39m's[0m
[0m[33minput[39m [3mas if it were provided by the user[23m.[0m

[32m[1m### [33mrl[Symbol.asyncIterator]()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.4.0[39m
[90mchanges:[39m
[90m  - version: v11.14.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26989[39m
[90m    description: Symbol.asyncIterator support is no longer experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {AsyncIterator}[0m

[0mCreate an [33mAsyncIterator[39m object that iterates through each line in the input[0m
[0mstream as a string. This method allows asynchronous iteration of[0m
[0m[33mreadline.Interface[39m objects through [33mfor await...of[39m loops.[0m

[0mErrors in the input stream are not forwarded.[0m

[0mIf the loop is terminated with [33mbreak[39m, [33mthrow[39m, or [33mreturn[39m,[0m
[0m[34m[33mrl.close()[39m[34m ([34m[4m#readline_rl_close[24m[39m[34m)[39m will be called. In other words, iterating over a[0m
[0m[33mreadline.Interface[39m will always consume the input stream fully.[0m

[0mPerformance is not on par with the traditional [33m'line'[39m event API. Use [33m'line'[39m[0m
[0minstead for performance-sensitive applications.[0m

    [37masync[39m [94mfunction[39m [37mprocessLineByLine[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [37mrl[39m [93m=[39m [37mreadline[39m[32m.[39m[37mcreateInterface[39m[90m([39m[33m{[39m
        [90m// ...[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [94mfor[39m [37mawait[39m [90m([39m[94mconst[39m [37mline[39m [37mof[39m [37mrl[39m[90m)[39m [33m{[39m
        [90m// Each line in the readline input will be successively available here as[39m
        [90m// `line`.[39m
      [33m}[39m
    [33m}[39m

[32m[1m### [33mrl.line[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.98[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string|undefined}[0m

[0mThe current input data being processed by node.[0m

[0mThis can be used when collecting input from a TTY stream to retrieve the[0m
[0mcurrent value that has been processed thus far, prior to the [33mline[39m event[0m
[0mbeing emitted.  Once the [33mline[39m event has been emitted, this property will[0m
[0mbe an empty string.[0m

[0mBe aware that modifying the value during the instance runtime may have[0m
[0munintended consequences if [33mrl.cursor[39m is not also controlled.[0m

[0m[1mIf not using a TTY stream for input, use the [34m[33m'line'[39m[34m ([34m[4m#readline_event_line[24m[39m[34m)[39m event.[22m[0m

[0mOne possible use case would be as follows:[0m

    [94mconst[39m [37mvalues[39m [93m=[39m [33m[[39m[92m'lorem ipsum'[39m[32m,[39m [92m'dolor sit amet'[39m[33m][39m[90m;[39m
    [94mconst[39m [37mrl[39m [93m=[39m [37mreadline[39m[32m.[39m[37mcreateInterface[39m[90m([39m[37mprocess[39m[32m.[39m[37mstdin[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mshowResults[39m [93m=[39m [37mdebounce[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m
        [92m'\n'[39m[32m,[39m
        [37mvalues[39m[32m.[39m[37mfilter[39m[90m([39m[90m([39m[37mval[39m[90m)[39m [93m=>[39m [37mval[39m[32m.[39m[37mstartsWith[39m[90m([39m[37mrl[39m[32m.[39m[37mline[39m[90m)[39m[90m)[39m[32m.[39m[37mjoin[39m[90m([39m[92m' '[39m[90m)[39m
      [90m)[39m[90m;[39m
    [33m}[39m[32m,[39m [34m300[39m[90m)[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37mon[39m[90m([39m[92m'keypress'[39m[32m,[39m [90m([39m[37mc[39m[32m,[39m [37mk[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mshowResults[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mrl.cursor[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.98[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number|undefined}[0m

[0mThe cursor position relative to [33mrl.line[39m.[0m

[0mThis will track where the current cursor lands in the input string, when[0m
[0mreading input from a TTY stream.  The position of cursor determines the[0m
[0mportion of the input string that will be modified as input is processed,[0m
[0mas well as the column where the terminal caret will be rendered.[0m

[32m[1m### [33mrl.getCursorPos()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}
        * [0m[0m[33mrows[39m {number} the row of the prompt the cursor currently lands on[0m[0m[0m
      [0m
        * [0m[0m[33mcols[39m {number} the screen column the cursor currently lands on[0m[0m[0m

[0mReturns the real position of the cursor in relation to the input[0m
[0mprompt + string.  Long input (wrapping) strings, as well as multiple[0m
[0mline prompts are included in the calculations.[0m

[32m[1m## [33mreadline.clearLine(stream, dir[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90mchanges:[39m
[90m  - version: v12.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28674[39m
[90m    description: The stream's write() callback and return value are exposed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstream[39m {stream.Writable}[0m
    * [0m[33mdir[39m {number}
        * [0m[0m[33m-1[39m: to the left from cursor[0m[0m[0m
      [0m
        * [0m[0m[33m1[39m: to the right from cursor[0m[0m[0m
      [0m
        * [0m[0m[33m0[39m: the entire line[0m[0m[0m
    * [0m[33mcallback[39m {Function} Invoked once the operation completes.[0m
    * [0mReturns: {boolean} [33mfalse[39m if [33mstream[39m wishes for the calling code to wait for[0m
      [0mthe [33m'drain'[39m event to be emitted before continuing to write additional data;[0m
      [0motherwise [33mtrue[39m.[0m

[0mThe [33mreadline.clearLine()[39m method clears current line of given [34mTTY ([34m[4mtty.html[24m[39m[34m)[39m stream[0m
[0min a specified direction identified by [33mdir[39m.[0m

[32m[1m## [33mreadline.clearScreenDown(stream[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90mchanges:[39m
[90m  - version: v12.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28641[39m
[90m    description: The stream's write() callback and return value are exposed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstream[39m {stream.Writable}[0m
    * [0m[33mcallback[39m {Function} Invoked once the operation completes.[0m
    * [0mReturns: {boolean} [33mfalse[39m if [33mstream[39m wishes for the calling code to wait for[0m
      [0mthe [33m'drain'[39m event to be emitted before continuing to write additional data;[0m
      [0motherwise [33mtrue[39m.[0m

[0mThe [33mreadline.clearScreenDown()[39m method clears the given [34mTTY ([34m[4mtty.html[24m[39m[34m)[39m stream from[0m
[0mthe current position of the cursor down.[0m

[32m[1m## [33mreadline.createInterface(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.98[39m
[90mchanges:[39m
[90m  - version: v13.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31318[39m
[90m    description: The `tabSize` option is supported now.[39m
[90m  - version: v8.3.0, 6.11.4[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13497[39m
[90m    description: Remove max limit of `crlfDelay` option.[39m
[90m  - version: v6.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8109[39m
[90m    description: The `crlfDelay` option is supported now.[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7125[39m
[90m    description: The `prompt` option is supported now.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6352[39m
[90m    description: The `historySize` option can be `0` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33minput[39m {stream.Readable} The [34mReadable ([34m[4mstream.html#stream_readable_streams[24m[39m[34m)[39m stream to listen to. This option[0m[0m[0m
      [0m      [0m[0mis [3mrequired[23m.[0m[0m[0m
      [0m
        * [0m[0m[33moutput[39m {stream.Writable} The [34mWritable ([34m[4mstream.html#stream_writable_streams[24m[39m[34m)[39m stream to write readline data[0m[0m[0m
      [0m      [0m[0mto.[0m[0m[0m
      [0m
        * [0m[0m[33mcompleter[39m {Function} An optional function used for Tab autocompletion.[0m[0m[0m
      [0m
        * [0m[0m[33mterminal[39m {boolean} [33mtrue[39m if the [33minput[39m and [33moutput[39m streams should be[0m[0m[0m
      [0m      [0m[0mtreated like a TTY, and have ANSI/VT100 escape codes written to it.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m checking [33misTTY[39m on the [33moutput[39m stream upon instantiation.[0m[0m[0m
      [0m
        * [0m[0m[33mhistorySize[39m {number} Maximum number of history lines retained. To disable[0m[0m[0m
      [0m      [0m[0mthe history set this value to [33m0[39m. This option makes sense only if[0m[0m[0m
      [0m      [0m[0m[33mterminal[39m is set to [33mtrue[39m by the user or by an internal [33moutput[39m check,[0m[0m[0m
      [0m      [0m[0motherwise the history caching mechanism is not initialized at all.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m30[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mprompt[39m {string} The prompt string to use. [1mDefault:[22m [33m'> '[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcrlfDelay[39m {number} If the delay between [33m\r[39m and [33m\n[39m exceeds[0m[0m[0m
      [0m      [0m[0m[33mcrlfDelay[39m milliseconds, both [33m\r[39m and [33m\n[39m will be treated as separate[0m[0m[0m
      [0m      [0m[0mend-of-line input. [33mcrlfDelay[39m will be coerced to a number no less than[0m[0m[0m
      [0m      [0m[0m[33m100[39m. It can be set to [33mInfinity[39m, in which case [33m\r[39m followed by [33m\n[39m[0m[0m[0m
      [0m      [0m[0mwill always be considered a single newline (which may be reasonable for[0m[0m[0m
      [0m      [0m[0m[34mreading files ([34m[4m#readline_example_read_file_stream_line_by_line[24m[39m[34m)[39m with [33m\r\n[39m line delimiter). [1mDefault:[22m [33m100[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mremoveHistoryDuplicates[39m {boolean} If [33mtrue[39m, when a new input line added[0m[0m[0m
      [0m      [0m[0mto the history list duplicates an older one, this removes the older line[0m[0m[0m
      [0m      [0m[0mfrom the list. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mescapeCodeTimeout[39m {number} The duration [33mreadline[39m will wait for a[0m[0m[0m
      [0m      [0m[0mcharacter (when reading an ambiguous key sequence in milliseconds one that[0m[0m[0m
      [0m      [0m[0mcan both form a complete key sequence using the input read so far and can[0m[0m[0m
      [0m      [0m[0mtake additional input to complete a longer key sequence).[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m500[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mtabSize[39m {integer} The number of spaces a tab is equal to (minimum 1).[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m8[39m.[0m[0m[0m

[0mThe [33mreadline.createInterface()[39m method creates a new [33mreadline.Interface[39m[0m
[0minstance.[0m

    [94mconst[39m [37mreadline[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/readline'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mrl[39m [93m=[39m [37mreadline[39m[32m.[39m[37mcreateInterface[39m[90m([39m[33m{[39m
      [37minput[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstdin[39m[32m,[39m
      [37moutput[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstdout[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOnce the [33mreadline.Interface[39m instance is created, the most common case is to[0m
[0mlisten for the [33m'line'[39m event:[0m

    [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'line'[39m[32m,[39m [90m([39m[37mline[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received: ${[37mline[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf [33mterminal[39m is [33mtrue[39m for this instance then the [33moutput[39m stream will get[0m
[0mthe best compatibility if it defines an [33moutput.columns[39m property and emits[0m
[0ma [33m'resize'[39m event on the [33moutput[39m if or when the columns ever change[0m
[0m([34m[33mprocess.stdout[39m[34m ([34m[4mprocess.html#process_process_stdout[24m[39m[34m)[39m does this automatically when it is a TTY).[0m

[32m[1m### Use of the [33mcompleter[39m[32m Function[22m[39m

[0mThe [33mcompleter[39m function takes the current line entered by the user[0m
[0mas an argument, and returns an [33mArray[39m with 2 entries:[0m

    * [0mAn [33mArray[39m with matching entries for the completion.[0m
    * [0mThe substring that was used for the matching.[0m

[0mFor instance: [33m[[substr1, substr2, ...], originalsubstring][39m.[0m

    [94mfunction[39m [37mcompleter[39m[90m([39m[37mline[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mcompletions[39m [93m=[39m [92m'.help .error .exit .quit .q'[39m[32m.[39m[37msplit[39m[90m([39m[92m' '[39m[90m)[39m[90m;[39m
      [94mconst[39m [37mhits[39m [93m=[39m [37mcompletions[39m[32m.[39m[37mfilter[39m[90m([39m[90m([39m[37mc[39m[90m)[39m [93m=>[39m [37mc[39m[32m.[39m[37mstartsWith[39m[90m([39m[37mline[39m[90m)[39m[90m)[39m[90m;[39m
      [90m// Show all completions if none found[39m
      [31mreturn[39m [33m[[39m[37mhits[39m[32m.[39m[37mlength[39m [93m?[39m [37mhits[39m [93m:[39m [37mcompletions[39m[32m,[39m [37mline[39m[33m][39m[90m;[39m
    [33m}[39m

[0mThe [33mcompleter[39m function can be called asynchronously if it accepts two[0m
[0marguments:[0m

    [94mfunction[39m [37mcompleter[39m[90m([39m[37mlinePartial[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
      [37mcallback[39m[90m([39m[90mnull[39m[32m,[39m [33m[[39m[33m[[39m[92m'123'[39m[33m][39m[32m,[39m [37mlinePartial[39m[33m][39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## [33mreadline.cursorTo(stream, x[, y][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90mchanges:[39m
[90m  - version: v12.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28674[39m
[90m    description: The stream's write() callback and return value are exposed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstream[39m {stream.Writable}[0m
    * [0m[33mx[39m {number}[0m
    * [0m[33my[39m {number}[0m
    * [0m[33mcallback[39m {Function} Invoked once the operation completes.[0m
    * [0mReturns: {boolean} [33mfalse[39m if [33mstream[39m wishes for the calling code to wait for[0m
      [0mthe [33m'drain'[39m event to be emitted before continuing to write additional data;[0m
      [0motherwise [33mtrue[39m.[0m

[0mThe [33mreadline.cursorTo()[39m method moves cursor to the specified position in a[0m
[0mgiven [34mTTY ([34m[4mtty.html[24m[39m[34m)[39m [33mstream[39m.[0m

[32m[1m## [33mreadline.emitKeypressEvents(stream[, interface])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstream[39m {stream.Readable}[0m
    * [0m[33minterface[39m {readline.Interface}[0m

[0mThe [33mreadline.emitKeypressEvents()[39m method causes the given [34mReadable ([34m[4mstream.html#stream_readable_streams[24m[39m[34m)[39m[0m
[0mstream to begin emitting [33m'keypress'[39m events corresponding to received input.[0m

[0mOptionally, [33minterface[39m specifies a [33mreadline.Interface[39m instance for which[0m
[0mautocompletion is disabled when copy-pasted input is detected.[0m

[0mIf the [33mstream[39m is a [34mTTY ([34m[4mtty.html[24m[39m[34m)[39m, then it must be in raw mode.[0m

[0mThis is automatically called by any readline instance on its [33minput[39m if the[0m
[0m[33minput[39m is a terminal. Closing the [33mreadline[39m instance does not stop[0m
[0mthe [33minput[39m from emitting [33m'keypress'[39m events.[0m

    [37mreadline[39m[32m.[39m[37memitKeypressEvents[39m[90m([39m[37mprocess[39m[32m.[39m[37mstdin[39m[90m)[39m[90m;[39m
    [94mif[39m [90m([39m[37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37misTTY[39m[90m)[39m
      [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37msetRawMode[39m[90m([39m[91mtrue[39m[90m)[39m[90m;[39m

[32m[1m## [33mreadline.moveCursor(stream, dx, dy[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90mchanges:[39m
[90m  - version: v12.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28674[39m
[90m    description: The stream's write() callback and return value are exposed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstream[39m {stream.Writable}[0m
    * [0m[33mdx[39m {number}[0m
    * [0m[33mdy[39m {number}[0m
    * [0m[33mcallback[39m {Function} Invoked once the operation completes.[0m
    * [0mReturns: {boolean} [33mfalse[39m if [33mstream[39m wishes for the calling code to wait for[0m
      [0mthe [33m'drain'[39m event to be emitted before continuing to write additional data;[0m
      [0motherwise [33mtrue[39m.[0m

[0mThe [33mreadline.moveCursor()[39m method moves the cursor [3mrelative[23m to its current[0m
[0mposition in a given [34mTTY ([34m[4mtty.html[24m[39m[34m)[39m [33mstream[39m.[0m

[32m[1m## Example: Tiny CLI[22m[39m

[0mThe following example illustrates the use of [33mreadline.Interface[39m class to[0m
[0mimplement a small command-line interface:[0m

    [94mconst[39m [37mreadline[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/readline'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mrl[39m [93m=[39m [37mreadline[39m[32m.[39m[37mcreateInterface[39m[90m([39m[33m{[39m
      [37minput[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstdin[39m[32m,[39m
      [37moutput[39m[93m:[39m [37mprocess[39m[32m.[39m[37mstdout[39m[32m,[39m
      [37mprompt[39m[93m:[39m [92m'OHAI> '[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mrl[39m[32m.[39m[37mprompt[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'line'[39m[32m,[39m [90m([39m[37mline[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mswitch[39m [90m([39m[37mline[39m[32m.[39m[37mtrim[39m[90m([39m[90m)[39m[90m)[39m [33m{[39m
        [94mcase[39m [32m'hello'[39m[93m:[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'world!'[39m[90m)[39m[90m;[39m
          [94mbreak[39m[90m;[39m
        [94mdefault[39m[93m:[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Say what? I might have heard '${[37mline[39m[32m.[39m[37mtrim[39m[90m([39m[90m)[39m}'`[90m)[39m[90m;[39m
          [94mbreak[39m[90m;[39m
      [33m}[39m
      [37mrl[39m[32m.[39m[37mprompt[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Have a great day!'[39m[90m)[39m[90m;[39m
      [37mprocess[39m[32m.[39m[37mexit[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Example: Read File Stream Line-by-Line[22m[39m

[0mA common use case for [33mreadline[39m is to consume an input file one line at a[0m
[0mtime. The easiest way to do so is leveraging the [34m[33mfs.ReadStream[39m[34m ([34m[4mfs.html#fs_class_fs_readstream[24m[39m[34m)[39m API as[0m
[0mwell as a [33mfor await...of[39m loop:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mreadline[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/readline'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mprocessLineByLine[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [37mfileStream[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'input.txt'[39m[90m)[39m[90m;[39m
    
      [94mconst[39m [37mrl[39m [93m=[39m [37mreadline[39m[32m.[39m[37mcreateInterface[39m[90m([39m[33m{[39m
        [37minput[39m[93m:[39m [37mfileStream[39m[32m,[39m
        [37mcrlfDelay[39m[93m:[39m [37mInfinity[39m
      [33m}[39m[90m)[39m[90m;[39m
      [90m// Note: we use the crlfDelay option to recognize all instances of CR LF[39m
      [90m// ('\r\n') in input.txt as a single line break.[39m
    
      [94mfor[39m [37mawait[39m [90m([39m[94mconst[39m [37mline[39m [37mof[39m [37mrl[39m[90m)[39m [33m{[39m
        [90m// Each line in input.txt will be successively available here as `line`.[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Line from file: ${[37mline[39m}`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [37mprocessLineByLine[39m[90m([39m[90m)[39m[90m;[39m

[0mAlternatively, one could use the [34m[33m'line'[39m[34m ([34m[4m#readline_event_line[24m[39m[34m)[39m event:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mreadline[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/readline'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mrl[39m [93m=[39m [37mreadline[39m[32m.[39m[37mcreateInterface[39m[90m([39m[33m{[39m
      [37minput[39m[93m:[39m [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'sample.txt'[39m[90m)[39m[32m,[39m
      [37mcrlfDelay[39m[93m:[39m [37mInfinity[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'line'[39m[32m,[39m [90m([39m[37mline[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Line from file: ${[37mline[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mCurrently, [33mfor await...of[39m loop can be a bit slower. If [33masync[39m / [33mawait[39m[0m
[0mflow and speed are both essential, a mixed approach can be applied:[0m

    [94mconst[39m [33m{[39m [37monce[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mcreateReadStream[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mcreateInterface[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/readline'[39m[90m)[39m[90m;[39m
    
    [90m([39m[37masync[39m [94mfunction[39m [37mprocessLineByLine[39m[90m([39m[90m)[39m [33m{[39m
      [36mtry[39m [33m{[39m
        [94mconst[39m [37mrl[39m [93m=[39m [37mcreateInterface[39m[90m([39m[33m{[39m
          [37minput[39m[93m:[39m [37mcreateReadStream[39m[90m([39m[92m'big-file.txt'[39m[90m)[39m[32m,[39m
          [37mcrlfDelay[39m[93m:[39m [37mInfinity[39m
        [33m}[39m[90m)[39m[90m;[39m
    
        [37mrl[39m[32m.[39m[37mon[39m[90m([39m[92m'line'[39m[32m,[39m [90m([39m[37mline[39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// Process the line.[39m
        [33m}[39m[90m)[39m[90m;[39m
    
        [37mawait[39m [37monce[39m[90m([39m[37mrl[39m[32m,[39m [92m'close'[39m[90m)[39m[90m;[39m
    
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'File processed.'[39m[90m)[39m[90m;[39m
      [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m## TTY keybindings[22m[39m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Keybindings</th>[39m
[90m    <th>Description</th>[39m
[90m    <th>Notes</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>shift</code> + <code>backspace</code></td>[39m
[90m    <td>Delete line left</td>[39m
[90m    <td>Doesn't work on Linux, Mac and Windows</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>shift</code> + <code>delete</code></td>[39m
[90m    <td>Delete line right</td>[39m
[90m    <td>Doesn't work on Linux and Mac</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>c</code></td>[39m
[90m    <td>Emit <code>SIGINT</code> or close the readline instance</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>h</code></td>[39m
[90m    <td>Delete left</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>d</code></td>[39m
[90m    <td>Delete right or close the readline instance in case the current line is empty / EOF</td>[39m
[90m    <td>Doesn't work on Windows</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>u</code></td>[39m
[90m    <td>Delete from the current position to the line start</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>k</code></td>[39m
[90m    <td>Delete from the current position to the end of line</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>a</code></td>[39m
[90m    <td>Go to start of line</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>e</code></td>[39m
[90m    <td>Go to to end of line</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>b</code></td>[39m
[90m    <td>Back one character</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>f</code></td>[39m
[90m    <td>Forward one character</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>l</code></td>[39m
[90m    <td>Clear screen</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>n</code></td>[39m
[90m    <td>Next history item</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>p</code></td>[39m
[90m    <td>Previous history item</td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>z</code></td>[39m
[90m    <td>Moves running process into background. Type[39m
[90m    <code>fg</code> and press <code>enter</code>[39m
[90m    to return.</td>[39m
[90m    <td>Doesn't work on Windows</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>w</code> or <code>ctrl</code>[39m
[90m    + <code>backspace</code></td>[39m
[90m    <td>Delete backwards to a word boundary</td>[39m
[90m    <td><code>ctrl</code> + <code>backspace</code> Doesn't[39m
[90m    work as expected on Windows</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>delete</code></td>[39m
[90m    <td>Delete forward to a word boundary</td>[39m
[90m    <td>Doesn't work on Mac</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>left</code> or[39m
[90m    <code>meta</code> + <code>b</code></td>[39m
[90m    <td>Word left</td>[39m
[90m    <td><code>ctrl</code> + <code>left</code> Doesn't work[39m
[90m    on Mac</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ctrl</code> + <code>right</code> or[39m
[90m    <code>meta</code> + <code>f</code></td>[39m
[90m    <td>Word right</td>[39m
[90m    <td><code>ctrl</code> + <code>right</code> Doesn't work[39m
[90m    on Mac</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>meta</code> + <code>d</code> or <code>meta</code>[39m
[90m    + <code>delete</code></td>[39m
[90m    <td>Delete word right</td>[39m
[90m    <td><code>meta</code> + <code>delete</code> Doesn't work[39m
[90m    on windows</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>meta</code> + <code>backspace</code></td>[39m
[90m    <td>Delete word left</td>[39m
[90m    <td>Doesn't work on Mac</td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m