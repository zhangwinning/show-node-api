[35m[4m[1m# Inspector[22m[24m[39m

[90m<!--introduced_in=v8.0.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mThe [33minspector[39m module provides an API for interacting with the V8 inspector.[0m

[0mIt can be accessed using:[0m

    [94mconst[39m [37minspector[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/inspector'[39m[90m)[39m[90m;[39m

[32m[1m## [33minspector.close()[39m[32m[22m[39m

[0mDeactivate the inspector. Blocks until there are no active connections.[0m

[32m[1m## [33minspector.console[39m[32m[22m[39m

    * [0m{Object} An object to send messages to the remote inspector console.[0m

    [37mrequire[39m[90m([39m[92m'api/source/inspector'[39m[90m)[39m[32m.[39m[34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'a message'[39m[90m)[39m[90m;[39m

[0mThe inspector console does not have API parity with Node.js[0m
[0mconsole.[0m

[32m[1m## [33minspector.open([port[, host[, wait]]])[39m[32m[22m[39m

    * [0m[33mport[39m {number} Port to listen on for inspector connections. Optional.[0m
      [0m[1mDefault:[22m what was specified on the CLI.[0m
    * [0m[33mhost[39m {string} Host to listen on for inspector connections. Optional.[0m
      [0m[1mDefault:[22m what was specified on the CLI.[0m
    * [0m[33mwait[39m {boolean} Block until a client has connected. Optional.[0m
      [0m[1mDefault:[22m [33mfalse[39m.[0m

[0mActivate inspector on host and port. Equivalent to [33mnode[39m[0m
[0m[33m--inspect=[[host:]port][39m, but can be done programmatically after node has[0m
[0mstarted.[0m

[0mIf wait is [33mtrue[39m, will block until a client has connected to the inspect port[0m
[0mand flow control has been passed to the debugger client.[0m

[0mSee the [34msecurity warning ([34m[4mcli.html#inspector_security[24m[39m[34m)[39m regarding the [33mhost[39m[0m
[0mparameter usage.[0m

[32m[1m## [33minspector.url()[39m[32m[22m[39m

    * [0mReturns: {string|undefined}[0m

[0mReturn the URL of the active inspector, or [33mundefined[39m if there is none.[0m

    [33m$ node --inspect -p 'inspector.url()'[39m
    [33mDebugger listening on ws://127.0.0.1:9229/166e272e-7a30-4d09-97ce-f1c012b43c34[39m
    [33mFor help see https://nodejs.org/en/docs/inspector[39m
    [33mws://127.0.0.1:9229/166e272e-7a30-4d09-97ce-f1c012b43c34[39m
    [33m[39m
    [33m$ node --inspect=localhost:3000 -p 'inspector.url()'[39m
    [33mDebugger listening on ws://localhost:3000/51cf8d0e-3c36-4c59-8efd-54519839e56a[39m
    [33mFor help see https://nodejs.org/en/docs/inspector[39m
    [33mws://localhost:3000/51cf8d0e-3c36-4c59-8efd-54519839e56a[39m
    [33m[39m
    [33m$ node -p 'inspector.url()'[39m
    [33mundefined[39m

[32m[1m## [33minspector.waitForDebugger()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mBlocks until a client (existing or connected later) has sent[0m
[0m[33mRuntime.runIfWaitingForDebugger[39m command.[0m

[0mAn exception will be thrown if there is no active inspector.[0m

[32m[1m## Class: [33minspector.Session[39m[32m[22m[39m

    * [0mExtends: {EventEmitter}[0m

[0mThe [33minspector.Session[39m is used for dispatching messages to the V8 inspector[0m
[0mback-end and receiving message responses and notifications.[0m

[32m[1m### Constructor: [33mnew inspector.Session()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCreate a new instance of the [33minspector.Session[39m class. The inspector session[0m
[0mneeds to be connected through [34m[33msession.connect()[39m[34m ([34m[4m#inspector_session_connect[24m[39m[34m)[39m before the messages[0m
[0mcan be dispatched to the inspector backend.[0m

[32m[1m### Event: [33m'inspectorNotification'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object} The notification message object[0m

[0mEmitted when any notification from the V8 Inspector is received.[0m

    [37msession[39m[32m.[39m[37mon[39m[90m([39m[92m'inspectorNotification'[39m[32m,[39m [90m([39m[37mmessage[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmessage[39m[32m.[39m[37mmethod[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Debugger.paused[39m
    [90m// Debugger.resumed[39m

[0mIt is also possible to subscribe only to notifications with specific method:[0m

[32m[1m### Event: [33m<inspector-protocol-method>[39m[32m;[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object} The notification message object[0m

[0mEmitted when an inspector notification is received that has its method field set[0m
[0mto the [33m<inspector-protocol-method>[39m value.[0m

[0mThe following snippet installs a listener on the [34m[33m'Debugger.paused'[39m[34m ([34m[4mhttps://chromedevtools.github.io/devtools-protocol/v8/Debugger#event-paused[24m[39m[34m)[39m[0m
[0mevent, and prints the reason for program suspension whenever program[0m
[0mexecution is suspended (through breakpoints, for example):[0m

    [37msession[39m[32m.[39m[37mon[39m[90m([39m[92m'Debugger.paused'[39m[32m,[39m [90m([39m[33m{[39m [37mparams[39m [33m}[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mhitBreakpoints[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// [ '/the/file/that/has/the/breakpoint.js:11:0' ][39m

[32m[1m### [33msession.connect()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mConnects a session to the inspector back-end.[0m

[32m[1m### [33msession.connectToMainThread()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mConnects a session to the main thread inspector back-end. An exception will[0m
[0mbe thrown if this API was not called on a Worker thread.[0m

[32m[1m### [33msession.disconnect()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mImmediately close the session. All pending message callbacks will be called[0m
[0mwith an error. [34m[33msession.connect()[39m[34m ([34m[4m#inspector_session_connect[24m[39m[34m)[39m will need to be called to be able to send[0m
[0mmessages again. Reconnected session will lose all inspector state, such as[0m
[0menabled agents or configured breakpoints.[0m

[32m[1m### [33msession.post(method[, params][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmethod[39m {string}[0m
    * [0m[33mparams[39m {Object}[0m
    * [0m[33mcallback[39m {Function}[0m

[0mPosts a message to the inspector back-end. [33mcallback[39m will be notified when[0m
[0ma response is received. [33mcallback[39m is a function that accepts two optional[0m
[0marguments: error and message-specific result.[0m

    [37msession[39m[32m.[39m[37mpost[39m[90m([39m[92m'Runtime.evaluate'[39m[32m,[39m [33m{[39m [37mexpression[39m[93m:[39m [92m'2 + 2'[39m [33m}[39m[32m,[39m
                 [90m([39m[91merror[39m[32m,[39m [33m{[39m [37mresult[39m [33m}[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mresult[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Output: { type: 'number', value: 4, description: '4' }[39m

[0mThe latest version of the V8 inspector protocol is published on the[0m
[0m[34mChrome DevTools Protocol Viewer ([34m[4mhttps://chromedevtools.github.io/devtools-protocol/v8/[24m[39m[34m)[39m.[0m

[0mNode.js inspector supports all the Chrome DevTools Protocol domains declared[0m
[0mby V8. Chrome DevTools Protocol domain provides an interface for interacting[0m
[0mwith one of the runtime agents used to inspect the application state and listen[0m
[0mto the run-time events.[0m

[32m[1m## Example usage[22m[39m

[0mApart from the debugger, various V8 Profilers are available through the DevTools[0m
[0mprotocol.[0m

[32m[1m### CPU Profiler[22m[39m

[0mHere's an example showing how to use the [34mCPU Profiler ([34m[4mhttps://chromedevtools.github.io/devtools-protocol/v8/Profiler[24m[39m[34m)[39m:[0m

    [94mconst[39m [37minspector[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/inspector'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37msession[39m [93m=[39m [31mnew[39m [37minspector[39m[32m.[39m[37mSession[39m[90m([39m[90m)[39m[90m;[39m
    [37msession[39m[32m.[39m[37mconnect[39m[90m([39m[90m)[39m[90m;[39m
    
    [37msession[39m[32m.[39m[37mpost[39m[90m([39m[92m'Profiler.enable'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37msession[39m[32m.[39m[37mpost[39m[90m([39m[92m'Profiler.start'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// Invoke business logic under measurement here...[39m
    
        [90m// some time later...[39m
        [37msession[39m[32m.[39m[37mpost[39m[90m([39m[92m'Profiler.stop'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [33m{[39m [37mprofile[39m [33m}[39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// Write profile to disk, upload, etc.[39m
          [94mif[39m [90m([39m[93m![39m[37merr[39m[90m)[39m [33m{[39m
            [37mfs[39m[32m.[39m[37mwriteFileSync[39m[90m([39m[92m'./profile.cpuprofile'[39m[32m,[39m [37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37mprofile[39m[90m)[39m[90m)[39m[90m;[39m
          [33m}[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Heap Profiler[22m[39m

[0mHere's an example showing how to use the [34mHeap Profiler ([34m[4mhttps://chromedevtools.github.io/devtools-protocol/v8/HeapProfiler[24m[39m[34m)[39m:[0m

    [94mconst[39m [37minspector[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/inspector'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37msession[39m [93m=[39m [31mnew[39m [37minspector[39m[32m.[39m[37mSession[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mfd[39m [93m=[39m [37mfs[39m[32m.[39m[37mopenSync[39m[90m([39m[92m'profile.heapsnapshot'[39m[32m,[39m [92m'w'[39m[90m)[39m[90m;[39m
    
    [37msession[39m[32m.[39m[37mconnect[39m[90m([39m[90m)[39m[90m;[39m
    
    [37msession[39m[32m.[39m[37mon[39m[90m([39m[92m'HeapProfiler.addHeapSnapshotChunk'[39m[32m,[39m [90m([39m[37mm[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mfs[39m[32m.[39m[37mwriteSync[39m[90m([39m[37mfd[39m[32m,[39m [37mm[39m[32m.[39m[37mparams[39m[32m.[39m[37mchunk[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37msession[39m[32m.[39m[37mpost[39m[90m([39m[92m'HeapProfiler.takeHeapSnapshot'[39m[32m,[39m [90mnull[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mr[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'HeapProfiler.takeHeapSnapshot done:'[39m[32m,[39m [37merr[39m[32m,[39m [37mr[39m[90m)[39m[90m;[39m
      [37msession[39m[32m.[39m[37mdisconnect[39m[90m([39m[90m)[39m[90m;[39m
      [37mfs[39m[32m.[39m[37mcloseSync[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

