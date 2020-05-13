[35m[4m[1m# Process[22m[24m[39m

[90m<!-- introduced_in=v0.10.0 -->[39m
[90m[39m[90m<!-- type=global -->[39m
[90m[39m
[90m[39m[0mThe [33mprocess[39m object is a [33mglobal[39m that provides information about, and control[0m
[0mover, the current Node.js process. As a global, it is always available to[0m
[0mNode.js applications without using [33mrequire()[39m. It can also be explicitly[0m
[0maccessed using [33mrequire()[39m:[0m

    [94mconst[39m [37mprocess[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/process'[39m[90m)[39m[90m;[39m

[32m[1m## Process Events[22m[39m

[0mThe [33mprocess[39m object is an instance of [[33mEventEmitter[39m][].[0m

[32m[1m### Event: [33m'beforeExit'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'beforeExit'[39m event is emitted when Node.js empties its event loop and has[0m
[0mno additional work to schedule. Normally, the Node.js process will exit when[0m
[0mthere is no work scheduled, but a listener registered on the [33m'beforeExit'[39m[0m
[0mevent can make asynchronous calls, and thereby cause the Node.js process to[0m
[0mcontinue.[0m

[0mThe listener callback function is invoked with the value of[0m
[0m[[33mprocess.exitCode[39m][] passed as the only argument.[0m

[0mThe [33m'beforeExit'[39m event is [3mnot[23m emitted for conditions causing explicit[0m
[0mtermination, such as calling [[33mprocess.exit()[39m][] or uncaught exceptions.[0m

[0mThe [33m'beforeExit'[39m should [3mnot[23m be used as an alternative to the [33m'exit'[39m event[0m
[0munless the intention is to schedule additional work.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'beforeExit'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Process beforeExit event with code: '[39m[32m,[39m [37mcode[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Process exit event with code: '[39m[32m,[39m [37mcode[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'This message is displayed first.'[39m[90m)[39m[90m;[39m
    
    [90m// Prints:[39m
    [90m// This message is displayed first.[39m
    [90m// Process beforeExit event with code: 0[39m
    [90m// Process exit event with code: 0[39m

[32m[1m### Event: [33m'disconnect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m[0mIf the Node.js process is spawned with an IPC channel (see the [Child Process][][0m
[0mand [Cluster][] documentation), the [33m'disconnect'[39m event will be emitted when[0m
[0mthe IPC channel is closed.[0m

[32m[1m### Event: [33m'exit'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {integer}[0m

[0mThe [33m'exit'[39m event is emitted when the Node.js process is about to exit as a[0m
[0mresult of either:[0m

    * [0mThe [33mprocess.exit()[39m method being called explicitly;[0m
    * [0mThe Node.js event loop no longer having any additional work to perform.[0m

[0mThere is no way to prevent the exiting of the event loop at this point, and once[0m
[0mall [33m'exit'[39m listeners have finished running the Node.js process will terminate.[0m

[0mThe listener callback function is invoked with the exit code specified either[0m
[0mby the [[33mprocess.exitCode[39m][] property, or the [33mexitCode[39m argument passed to the[0m
[0m[[33mprocess.exit()[39m][] method.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`About to exit with code: ${[37mcode[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mListener functions [1mmust[22m only perform [1msynchronous[22m operations. The Node.js[0m
[0mprocess will exit immediately after calling the [33m'exit'[39m event listeners[0m
[0mcausing any additional work still queued in the event loop to be abandoned.[0m
[0mIn the following example, for instance, the timeout will never occur:[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'This will not run'[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'message'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmessage[39m { Object | boolean | number | string | null } a parsed JSON object[0m
      [0mor a serializable primitive value.[0m
    * [0m[33msendHandle[39m {net.Server|net.Socket} a [[33mnet.Server[39m][] or [[33mnet.Socket[39m][][0m
      [0mobject, or undefined.[0m

[0mIf the Node.js process is spawned with an IPC channel (see the [Child Process][][0m
[0mand [Cluster][] documentation), the [33m'message'[39m event is emitted whenever a[0m
[0mmessage sent by a parent process using [[33mchildprocess.send()[39m][] is received by[0m
[0mthe child process.[0m

[0mThe message goes through serialization and parsing. The resulting message might[0m
[0mnot be the same as what is originally sent.[0m

[0mIf the [33mserialization[39m option was set to [33madvanced[39m used when spawning the[0m
[0mprocess, the [33mmessage[39m argument can contain data that JSON is not able[0m
[0mto represent.[0m
[0mSee [Advanced Serialization for [33mchild_process[39m][] for more details.[0m

[32m[1m### Event: [33m'multipleResolves'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtype[39m {string} The resolution type. One of [33m'resolve'[39m or [33m'reject'[39m.[0m
    * [0m[33mpromise[39m {Promise} The promise that resolved or rejected more than once.[0m
    * [0m[33mvalue[39m {any} The value with which the promise was either resolved or[0m
      [0mrejected after the original resolve.[0m

[0mThe [33m'multipleResolves'[39m event is emitted whenever a [33mPromise[39m has been either:[0m

    * [0mResolved more than once.[0m
    * [0mRejected more than once.[0m
    * [0mRejected after resolve.[0m
    * [0mResolved after reject.[0m

[0mThis is useful for tracking potential errors in an application while using the[0m
[0m[33mPromise[39m constructor, as multiple resolutions are silently swallowed. However,[0m
[0mthe occurrence of this event does not necessarily indicate an error. For[0m
[0mexample, [[33mPromise.race()[39m][] can trigger a [33m'multipleResolves'[39m event.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'multipleResolves'[39m[32m,[39m [90m([39m[37mtype[39m[32m,[39m [37mpromise[39m[32m,[39m [37mreason[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37mtype[39m[32m,[39m [37mpromise[39m[32m,[39m [37mreason[39m[90m)[39m[90m;[39m
      [37msetImmediate[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [37mprocess[39m[32m.[39m[37mexit[39m[90m([39m[34m1[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mmain[39m[90m([39m[90m)[39m [33m{[39m
      [36mtry[39m [33m{[39m
        [31mreturn[39m [37mawait[39m [31mnew[39m [37mPromise[39m[90m([39m[90m([39m[37mresolve[39m[32m,[39m [37mreject[39m[90m)[39m [93m=>[39m [33m{[39m
          [37mresolve[39m[90m([39m[92m'First call'[39m[90m)[39m[90m;[39m
          [37mresolve[39m[90m([39m[92m'Swallowed resolve'[39m[90m)[39m[90m;[39m
          [37mreject[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'Swallowed reject'[39m[90m)[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m [36mcatch[39m [33m{[39m
        [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'Failed'[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [37mmain[39m[90m([39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[34mconsole[39m[32m.[39m[34mlog[39m[90m)[39m[90m;[39m
    [90m// resolve: Promise { 'First call' } 'Swallowed resolve'[39m
    [90m// reject: Promise { 'First call' } Error: Swallowed reject[39m
    [90m//     at Promise (*)[39m
    [90m//     at new Promise (<anonymous>)[39m
    [90m//     at main (*)[39m
    [90m// First call[39m

[32m[1m### Event: [33m'rejectionHandled'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.4.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpromise[39m {Promise} The late handled promise.[0m

[0mThe [33m'rejectionHandled'[39m event is emitted whenever a [33mPromise[39m has been rejected[0m
[0mand an error handler was attached to it (using [[33mpromise.catch()[39m][], for[0m
[0mexample) later than one turn of the Node.js event loop.[0m

[0mThe [33mPromise[39m object would have previously been emitted in an[0m
[0m[33m'unhandledRejection'[39m event, but during the course of processing gained a[0m
[0mrejection handler.[0m

[0mThere is no notion of a top level for a [33mPromise[39m chain at which rejections can[0m
[0malways be handled. Being inherently asynchronous in nature, a [33mPromise[39m[0m
[0mrejection can be handled at a future point in time, possibly much later than[0m
[0mthe event loop turn it takes for the [33m'unhandledRejection'[39m event to be emitted.[0m

[0mAnother way of stating this is that, unlike in synchronous code where there is[0m
[0man ever-growing list of unhandled exceptions, with Promises there can be a[0m
[0mgrowing-and-shrinking list of unhandled rejections.[0m

[0mIn synchronous code, the [33m'uncaughtException'[39m event is emitted when the list of[0m
[0munhandled exceptions grows.[0m

[0mIn asynchronous code, the [33m'unhandledRejection'[39m event is emitted when the list[0m
[0mof unhandled rejections grows, and the [33m'rejectionHandled'[39m event is emitted[0m
[0mwhen the list of unhandled rejections shrinks.[0m

    [94mconst[39m [37munhandledRejections[39m [93m=[39m [31mnew[39m [37mMap[39m[90m([39m[90m)[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'unhandledRejection'[39m[32m,[39m [90m([39m[37mreason[39m[32m,[39m [37mpromise[39m[90m)[39m [93m=>[39m [33m{[39m
      [37munhandledRejections[39m[32m.[39m[37mset[39m[90m([39m[37mpromise[39m[32m,[39m [37mreason[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'rejectionHandled'[39m[32m,[39m [90m([39m[37mpromise[39m[90m)[39m [93m=>[39m [33m{[39m
      [37munhandledRejections[39m[32m.[39m[31mdelete[39m[90m([39m[37mpromise[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIn this example, the [33munhandledRejections[39m [33mMap[39m will grow and shrink over time,[0m
[0mreflecting rejections that start unhandled and then become handled. It is[0m
[0mpossible to record such errors in an error log, either periodically (which is[0m
[0mlikely best for long-running application) or upon process exit (which is likely[0m
[0mmost convenient for scripts).[0m

[32m[1m### Event: [33m'uncaughtException'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.18[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26599[39m
[90m    description: Added the `origin` argument.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merr[39m {Error} The uncaught exception.[0m
    * [0m[33morigin[39m {string} Indicates if the exception originates from an unhandled[0m
      [0mrejection or from synchronous errors. Can either be [33m'uncaughtException'[39m or[0m
      [0m[33m'unhandledRejection'[39m.[0m

[0mThe [33m'uncaughtException'[39m event is emitted when an uncaught JavaScript[0m
[0mexception bubbles all the way back to the event loop. By default, Node.js[0m
[0mhandles such exceptions by printing the stack trace to [33mstderr[39m and exiting[0m
[0mwith code 1, overriding any previously set [[33mprocess.exitCode[39m][].[0m
[0mAdding a handler for the [33m'uncaughtException'[39m event overrides this default[0m
[0mbehavior. Alternatively, change the [[33mprocess.exitCode[39m][] in the[0m
[0m[33m'uncaughtException'[39m handler which will result in the process exiting with the[0m
[0mprovided exit code. Otherwise, in the presence of such handler the process will[0m
[0mexit with 0.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'uncaughtException'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37morigin[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mfs[39m[32m.[39m[37mwriteSync[39m[90m([39m
        [37mprocess[39m[32m.[39m[37mstderr[39m[32m.[39m[37mfd[39m[32m,[39m
        `Caught exception: ${[37merr[39m}\n` [93m+[39m
        `Exception origin: ${[37morigin[39m}`
      [90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'This will still run.'[39m[90m)[39m[90m;[39m
    [33m}[39m[32m,[39m [34m500[39m[90m)[39m[90m;[39m
    
    [90m// Intentionally cause an exception, but don't catch it.[39m
    [37mnonexistentFunc[39m[90m([39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'This will not run.'[39m[90m)[39m[90m;[39m

[0mIt is possible to monitor [33m'uncaughtException'[39m events without overriding the[0m
[0mdefault behavior to exit the process by installing a[0m
[0m[33m'uncaughtExceptionMonitor'[39m listener.[0m

[32m[1m#### Warning: Using [33m'uncaughtException'[39m[32m correctly[22m[39m

[0m[33m'uncaughtException'[39m is a crude mechanism for exception handling[0m
[0mintended to be used only as a last resort. The event [3mshould not[23m be used as[0m
[0man equivalent to [33mOn Error Resume Next[39m. Unhandled exceptions inherently mean[0m
[0mthat an application is in an undefined state. Attempting to resume application[0m
[0mcode without properly recovering from the exception can cause additional[0m
[0munforeseen and unpredictable issues.[0m

[0mExceptions thrown from within the event handler will not be caught. Instead the[0m
[0mprocess will exit with a non-zero exit code and the stack trace will be printed.[0m
[0mThis is to avoid infinite recursion.[0m

[0mAttempting to resume normally after an uncaught exception can be similar to[0m
[0mpulling out the power cord when upgrading a computer. Nine out of ten[0m
[0mtimes, nothing happens. But the tenth time, the system becomes corrupted.[0m

[0mThe correct use of [33m'uncaughtException'[39m is to perform synchronous cleanup[0m
[0mof allocated resources (e.g. file descriptors, handles, etc) before shutting[0m
[0mdown the process. [1mIt is not safe to resume normal operation after[22m[0m
[0m[1m[33m'uncaughtException'[39m.[22m[0m

[0mTo restart a crashed application in a more reliable way, whether[0m
[0m[33m'uncaughtException'[39m is emitted or not, an external monitor should be employed[0m
[0min a separate process to detect application failures and recover or restart as[0m
[0mneeded.[0m

[32m[1m### Event: [33m'uncaughtExceptionMonitor'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merr[39m {Error} The uncaught exception.[0m
    * [0m[33morigin[39m {string} Indicates if the exception originates from an unhandled[0m
      [0mrejection or from synchronous errors. Can either be [33m'uncaughtException'[39m or[0m
      [0m[33m'unhandledRejection'[39m.[0m

[0mThe [33m'uncaughtExceptionMonitor'[39m event is emitted before an[0m
[0m[33m'uncaughtException'[39m event is emitted or a hook installed via[0m
[0m[[33mprocess.setUncaughtExceptionCaptureCallback()[39m][] is called.[0m

[0mInstalling an [33m'uncaughtExceptionMonitor'[39m listener does not change the behavior[0m
[0monce an [33m'uncaughtException'[39m event is emitted. The process will[0m
[0mstill crash if no [33m'uncaughtException'[39m listener is installed.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'uncaughtExceptionMonitor'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37morigin[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mMyMonitoringTool[39m[32m.[39m[37mlogSync[39m[90m([39m[37merr[39m[32m,[39m [37morigin[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Intentionally cause an exception, but don't catch it.[39m
    [37mnonexistentFunc[39m[90m([39m[90m)[39m[90m;[39m
    [90m// Still crashes Node.js[39m

[32m[1m### Event: [33m'unhandledRejection'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.4.1[39m
[90mchanges:[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8217[39m
[90m    description: Not handling `Promise` rejections is deprecated.[39m
[90m  - version: v6.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8223[39m
[90m    description: Unhandled `Promise` rejections will now emit[39m
[90m                 a process warning.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mreason[39m {Error|any} The object with which the promise was rejected[0m
      [0m(typically an [[33mError[39m][] object).[0m
    * [0m[33mpromise[39m {Promise} The rejected promise.[0m

[0mThe [33m'unhandledRejection'[39m event is emitted whenever a [33mPromise[39m is rejected and[0m
[0mno error handler is attached to the promise within a turn of the event loop.[0m
[0mWhen programming with Promises, exceptions are encapsulated as "rejected[0m
[0mpromises". Rejections can be caught and handled using [[33mpromise.catch()[39m][] and[0m
[0mare propagated through a [33mPromise[39m chain. The [33m'unhandledRejection'[39m event is[0m
[0museful for detecting and keeping track of promises that were rejected whose[0m
[0mrejections have not yet been handled.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'unhandledRejection'[39m[32m,[39m [90m([39m[37mreason[39m[32m,[39m [37mpromise[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Unhandled Rejection at:'[39m[32m,[39m [37mpromise[39m[32m,[39m [92m'reason:'[39m[32m,[39m [37mreason[39m[90m)[39m[90m;[39m
      [90m// Application specific logging, throwing an error, or other logic here[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37msomePromise[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [31mreturn[39m [37mreportToUser[39m[90m([39m[37mJSON[39m[32m.[39m[37mpasre[39m[90m([39m[37mres[39m[90m)[39m[90m)[39m[90m;[39m [90m// Note the typo (`pasre`)[39m
    [33m}[39m[90m)[39m[90m;[39m [90m// No `.catch()` or `.then()`[39m

[0mThe following will also trigger the [33m'unhandledRejection'[39m event to be[0m
[0memitted:[0m

    [94mfunction[39m [37mSomeResource[39m[90m([39m[90m)[39m [33m{[39m
      [90m// Initially set the loaded status to a rejected promise[39m
      [91mthis[39m[32m.[39m[37mloaded[39m [93m=[39m [37mPromise[39m[32m.[39m[37mreject[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'Resource not yet loaded!'[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mconst[39m [37mresource[39m [93m=[39m [31mnew[39m [37mSomeResource[39m[90m([39m[90m)[39m[90m;[39m
    [90m// no .catch or .then on resource.loaded for at least a turn[39m

[0mIn this example case, it is possible to track the rejection as a developer error[0m
[0mas would typically be the case for other [33m'unhandledRejection'[39m events. To[0m
[0maddress such failures, a non-operational[0m
[0m[[33m.catch(() => { })[39m][[33mpromise.catch()[39m] handler may be attached to[0m
[0m[33mresource.loaded[39m, which would prevent the [33m'unhandledRejection'[39m event from[0m
[0mbeing emitted.[0m

[32m[1m### Event: [33m'warning'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mwarning[39m {Error} Key properties of the warning are:
        * [0m[0m[33mname[39m {string} The name of the warning. [1mDefault:[22m [33m'Warning'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmessage[39m {string} A system-provided description of the warning.[0m[0m[0m
      [0m
        * [0m[0m[33mstack[39m {string} A stack trace to the location in the code where the warning[0m[0m[0m
      [0m      [0m[0mwas issued.[0m[0m[0m

[0mThe [33m'warning'[39m event is emitted whenever Node.js emits a process warning.[0m

[0mA process warning is similar to an error in that it describes exceptional[0m
[0mconditions that are being brought to the user's attention. However, warnings[0m
[0mare not part of the normal Node.js and JavaScript error handling flow.[0m
[0mNode.js can emit warnings whenever it detects bad coding practices that could[0m
[0mlead to sub-optimal application performance, bugs, or security vulnerabilities.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'warning'[39m[32m,[39m [90m([39m[37mwarning[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mname[39m[90m)[39m[90m;[39m    [90m// Print the warning name[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mmessage[39m[90m)[39m[90m;[39m [90m// Print the warning message[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mstack[39m[90m)[39m[90m;[39m   [90m// Print the stack trace[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mBy default, Node.js will print process warnings to [33mstderr[39m. The [33m--no-warnings[39m[0m
[0mcommand-line option can be used to suppress the default console output but the[0m
[0m[33m'warning'[39m event will still be emitted by the [33mprocess[39m object.[0m

[0mThe following example illustrates the warning that is printed to [33mstderr[39m when[0m
[0mtoo many listeners have been added to an event:[0m

    [33m$ node[39m
    [33m> events.defaultMaxListeners = 1;[39m
    [33m> process.on('foo', () => {});[39m
    [33m> process.on('foo', () => {});[39m
    [33m> (node:38638) MaxListenersExceededWarning: Possible EventEmitter memory leak[39m
    [33mdetected. 2 foo listeners added. Use emitter.setMaxListeners() to increase limit[39m

[0mIn contrast, the following example turns off the default warning output and[0m
[0madds a custom handler to the [33m'warning'[39m event:[0m

    [33m$ node --no-warnings[39m
    [33m> const p = process.on('warning', (warning) => console.warn('Do not do that!'));[39m
    [33m> events.defaultMaxListeners = 1;[39m
    [33m> process.on('foo', () => {});[39m
    [33m> process.on('foo', () => {});[39m
    [33m> Do not do that![39m

[0mThe [33m--trace-warnings[39m command-line option can be used to have the default[0m
[0mconsole output for warnings include the full stack trace of the warning.[0m

[0mLaunching Node.js using the [33m--throw-deprecation[39m command line flag will[0m
[0mcause custom deprecation warnings to be thrown as exceptions.[0m

[0mUsing the [33m--trace-deprecation[39m command line flag will cause the custom[0m
[0mdeprecation to be printed to [33mstderr[39m along with the stack trace.[0m

[0mUsing the [33m--no-deprecation[39m command line flag will suppress all reporting[0m
[0mof the custom deprecation.[0m

[0mThe [33m*-deprecation[39m command line flags only affect warnings that use the name[0m
[0m[33m'DeprecationWarning'[39m.[0m

[32m[1m#### Emitting custom warnings[22m[39m

[0mSee the [[33mprocess.emitWarning()[39m][process_emit_warning] method for issuing[0m
[0mcustom or application-specific warnings.[0m

[32m[1m### Signal Events[22m[39m

[90m<!--type=event-->[39m
[90m[39m[90m<!--name=SIGINT, SIGHUP, etc.-->[39m
[90m[39m
[90m[39m[0mSignal events will be emitted when the Node.js process receives a signal. Please[0m
[0mrefer to signal(7) for a listing of standard POSIX signal names such as[0m
[0m[33m'SIGINT'[39m, [33m'SIGHUP'[39m, etc.[0m

[0mSignals are not available on [[33mWorker[39m][] threads.[0m

[0mThe signal handler will receive the signal's name ([33m'SIGINT'[39m,[0m
[0m [33m'SIGTERM'[39m, etc.) as the first argument.[0m

[0mThe name of each event will be the uppercase common name for the signal (e.g.[0m
[0m[33m'SIGINT'[39m for [33mSIGINT[39m signals).[0m

    [90m// Begin reading from stdin so the process does not exit.[39m
    [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'SIGINT'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Received SIGINT. Press Control-D to exit.'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Using a single function to handle multiple signals[39m
    [94mfunction[39m [37mhandle[39m[90m([39m[37msignal[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received ${[37msignal[39m}`[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'SIGINT'[39m[32m,[39m [37mhandle[39m[90m)[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'SIGTERM'[39m[32m,[39m [37mhandle[39m[90m)[39m[90m;[39m

    * [0m[33m'SIGUSR1'[39m is reserved by Node.js to start the [debugger][]. It's possible to[0m
      [0minstall a listener but doing so might interfere with the debugger.[0m
    * [0m[33m'SIGTERM'[39m and [33m'SIGINT'[39m have default handlers on non-Windows platforms that[0m
      [0mreset the terminal mode before exiting with code [33m128 + signal number[39m. If one[0m
      [0mof these signals has a listener installed, its default behavior will be[0m
      [0mremoved (Node.js will no longer exit).[0m
    * [0m[33m'SIGPIPE'[39m is ignored by default. It can have a listener installed.[0m
    * [0m[33m'SIGHUP'[39m is generated on Windows when the console window is closed, and on[0m
      [0mother platforms under various similar conditions. See signal(7). It can have a[0m
      [0mlistener installed, however Node.js will be unconditionally terminated by[0m
      [0mWindows about 10 seconds later. On non-Windows platforms, the default[0m
      [0mbehavior of [33mSIGHUP[39m is to terminate Node.js, but once a listener has been[0m
      [0minstalled its default behavior will be removed.[0m
    * [0m[33m'SIGTERM'[39m is not supported on Windows, it can be listened on.[0m
    * [0m[33m'SIGINT'[39m from the terminal is supported on all platforms, and can usually be[0m
      [0mgenerated with [33m<Ctrl>+C[39m (though this may be configurable). It is not[0m
      [0mgenerated when [terminal raw mode][] is enabled and [33m<Ctrl>+C[39m is used.[0m
    * [0m[33m'SIGBREAK'[39m is delivered on Windows when [33m<Ctrl>+<Break>[39m is pressed, on[0m
      [0mnon-Windows platforms it can be listened on, but there is no way to send or[0m
      [0mgenerate it.[0m
    * [0m[33m'SIGWINCH'[39m is delivered when the console has been resized. On Windows, this[0m
      [0mwill only happen on write to the console when the cursor is being moved, or[0m
      [0mwhen a readable tty is used in raw mode.[0m
    * [0m[33m'SIGKILL'[39m cannot have a listener installed, it will unconditionally[0m
      [0mterminate Node.js on all platforms.[0m
    * [0m[33m'SIGSTOP'[39m cannot have a listener installed.[0m
    * [0m[33m'SIGBUS'[39m, [33m'SIGFPE'[39m, [33m'SIGSEGV'[39m and [33m'SIGILL'[39m, when not raised[0m
      [0m artificially using kill(2), inherently leave the process in a state from[0m
      [0m which it is not safe to attempt to call JS listeners. Doing so might lead to[0m
      [0m the process hanging in an endless loop, since listeners attached using[0m
      [0m [33mprocess.on()[39m are called asynchronously and therefore unable to correct the[0m
      [0m underlying problem.[0m
    * [0m[33m0[39m can be sent to test for the existence of a process, it has no effect if[0m
      [0m the process exists, but will throw an error if the process does not exist.[0m

[0mWindows does not support signals so has no equivalent to termination by signal,[0m
[0mbut Node.js offers some emulation with [[33mprocess.kill()[39m][], and[0m
[0m[[33msubprocess.kill()[39m][]:[0m

    * [0mSending [33mSIGINT[39m, [33mSIGTERM[39m, and [33mSIGKILL[39m will cause the unconditional[0m
      [0mtermination of the target process, and afterwards, subprocess will report that[0m
      [0mthe process was terminated by signal.[0m
    * [0mSending signal [33m0[39m can be used as a platform independent way to test for the[0m
      [0mexistence of a process.[0m

[32m[1m## [33mprocess.abort()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mprocess.abort()[39m method causes the Node.js process to exit immediately and[0m
[0mgenerate a core file.[0m

[0mThis feature is not available in [[33mWorker[39m][] threads.[0m

[32m[1m## [33mprocess.allowedNodeEnvironmentFlags[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Set}[0m

[0mThe [33mprocess.allowedNodeEnvironmentFlags[39m property is a special,[0m
[0mread-only [33mSet[39m of flags allowable within the [[33mNODE_OPTIONS[39m][][0m
[0menvironment variable.[0m

[0m[33mprocess.allowedNodeEnvironmentFlags[39m extends [33mSet[39m, but overrides[0m
[0m[33mSet.prototype.has[39m to recognize several different possible flag[0m
[0mrepresentations.  [33mprocess.allowedNodeEnvironmentFlags.has()[39m will[0m
[0mreturn [33mtrue[39m in the following cases:[0m

    * [0mFlags may omit leading single ([33m-[39m) or double ([33m--[39m) dashes; e.g.,[0m
      [0m[33minspect-brk[39m for [33m--inspect-brk[39m, or [33mr[39m for [33m-r[39m.[0m
    * [0mFlags passed through to V8 (as listed in [33m--v8-options[39m) may replace[0m
      [0mone or more [3mnon-leading[23m dashes for an underscore, or vice-versa;[0m
      [0me.g., [33m--perf_basic_prof[39m, [33m--perf-basic-prof[39m, [33m--perf_basic-prof[39m,[0m
      [0metc.[0m
    * [0mFlags may contain one or more equals ([33m=[39m) characters; all[0m
      [0mcharacters after and including the first equals will be ignored;[0m
      [0me.g., [33m--stack-trace-limit=100[39m.[0m
    * [0mFlags [3mmust[23m be allowable within [[33mNODE_OPTIONS[39m][].[0m

[0mWhen iterating over [33mprocess.allowedNodeEnvironmentFlags[39m, flags will[0m
[0mappear only [3monce[23m; each will begin with one or more dashes. Flags[0m
[0mpassed through to V8 will contain underscores instead of non-leading[0m
[0mdashes:[0m

    [37mprocess[39m[32m.[39m[37mallowedNodeEnvironmentFlags[39m[32m.[39m[37mforEach[39m[90m([39m[90m([39m[37mflag[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// -r[39m
      [90m// --inspect-brk[39m
      [90m// --abort_on_uncaught_exception[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe methods [33madd()[39m, [33mclear()[39m, and [33mdelete()[39m of[0m
[0m[33mprocess.allowedNodeEnvironmentFlags[39m do nothing, and will fail[0m
[0msilently.[0m

[0mIf Node.js was compiled [3mwithout[23m [[33mNODE_OPTIONS[39m][] support (shown in[0m
[0m[[33mprocess.config[39m][]), [33mprocess.allowedNodeEnvironmentFlags[39m will[0m
[0mcontain what [3mwould have[23m been allowable.[0m

[32m[1m## [33mprocess.arch[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe operating system CPU architecture for which the Node.js binary was compiled.[0m
[0mPossible values are: [33m'arm'[39m, [33m'arm64'[39m, [33m'ia32'[39m, [33m'mips'[39m,[33m'mipsel'[39m, [33m'ppc'[39m,[0m
[0m[33m'ppc64'[39m, [33m's390'[39m, [33m's390x'[39m, [33m'x32'[39m, and [33m'x64'[39m.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`This processor architecture is ${[37mprocess[39m[32m.[39m[37march[39m}`[90m)[39m[90m;[39m

[32m[1m## [33mprocess.argv[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.27[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]}[0m

[0mThe [33mprocess.argv[39m property returns an array containing the command line[0m
[0marguments passed when the Node.js process was launched. The first element will[0m
[0mbe [[33mprocess.execPath[39m][]. See [33mprocess.argv0[39m if access to the original value[0m
[0mof [33margv[0][39m is needed. The second element will be the path to the JavaScript[0m
[0mfile being executed. The remaining elements will be any additional command line[0m
[0marguments.[0m

[0mFor example, assuming the following script for [33mprocess-args.js[39m:[0m

    [90m// print process.argv[39m
    [37mprocess[39m[32m.[39m[37margv[39m[32m.[39m[37mforEach[39m[90m([39m[90m([39m[37mval[39m[32m,[39m [37mindex[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mindex[39m}: ${[37mval[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mLaunching the Node.js process as:[0m

    [33m$ node process-args.js one two=three four[39m

[0mWould generate the output:[0m

    [33m0: /usr/local/bin/node[39m
    [33m1: /Users/mjr/work/node/process-args.js[39m
    [33m2: one[39m
    [33m3: two=three[39m
    [33m4: four[39m

[32m[1m## [33mprocess.argv0[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe [33mprocess.argv0[39m property stores a read-only copy of the original value of[0m
[0m[33margv[0][39m passed when Node.js starts.[0m

    [33m$ bash -c 'exec -a customArgv0 ./node'[39m
    [33m> process.argv[0][39m
    [33m'/Volumes/code/external/node/out/Release/node'[39m
    [33m> process.argv0[39m
    [33m'customArgv0'[39m

[32m[1m## [33mprocess.channel[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.1.0[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30165[39m
[90m    description: The object no longer accidentally exposes native C++ bindings.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mIf the Node.js process was spawned with an IPC channel (see the[0m
[0m[Child Process][] documentation), the [33mprocess.channel[39m[0m
[0mproperty is a reference to the IPC channel. If no IPC channel exists, this[0m
[0mproperty is [33mundefined[39m.[0m

[32m[1m### [33mprocess.channel.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis method makes the IPC channel keep the event loop of the process[0m
[0mrunning if [33m.unref()[39m has been called before.[0m

[0mTypically, this is managed through the number of [33m'disconnect'[39m and [33m'message'[39m[0m
[0mlisteners on the [33mprocess[39m object. However, this method can be used to[0m
[0mexplicitly request a specific behavior.[0m

[32m[1m### [33mprocess.channel.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis method makes the IPC channel not keep the event loop of the process[0m
[0mrunning, and lets it finish even while the channel is open.[0m

[0mTypically, this is managed through the number of [33m'disconnect'[39m and [33m'message'[39m[0m
[0mlisteners on the [33mprocess[39m object. However, this method can be used to[0m
[0mexplicitly request a specific behavior.[0m

[32m[1m## [33mprocess.chdir(directory)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.17[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdirectory[39m {string}[0m

[0mThe [33mprocess.chdir()[39m method changes the current working directory of the[0m
[0mNode.js process or throws an exception if doing so fails (for instance, if[0m
[0mthe specified [33mdirectory[39m does not exist).[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Starting directory: ${[37mprocess[39m[32m.[39m[37mcwd[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
    [36mtry[39m [33m{[39m
      [37mprocess[39m[32m.[39m[37mchdir[39m[90m([39m[92m'/tmp'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`New directory: ${[37mprocess[39m[32m.[39m[37mcwd[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`chdir: ${[37merr[39m}`[90m)[39m[90m;[39m
    [33m}[39m

[0mThis feature is not available in [[33mWorker[39m][] threads.[0m

[32m[1m## [33mprocess.config[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe [33mprocess.config[39m property returns an [33mObject[39m containing the JavaScript[0m
[0mrepresentation of the configure options used to compile the current Node.js[0m
[0mexecutable. This is the same as the [33mconfig.gypi[39m file that was produced when[0m
[0mrunning the [33m./configure[39m script.[0m

[0mAn example of the possible output looks like:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mtarget_defaults[39m[93m:[39m
       [33m{[39m [37mcflags[39m[93m:[39m [33m[[39m[33m][39m[32m,[39m
         [37mdefault_configuration[39m[93m:[39m [92m'Release'[39m[32m,[39m
         [37mdefines[39m[93m:[39m [33m[[39m[33m][39m[32m,[39m
         [37minclude_dirs[39m[93m:[39m [33m[[39m[33m][39m[32m,[39m
         [37mlibraries[39m[93m:[39m [33m[[39m[33m][39m [33m}[39m[32m,[39m
      [37mvariables[39m[93m:[39m
       [33m{[39m
         [37mhost_arch[39m[93m:[39m [92m'x64'[39m[32m,[39m
         [37mnapi_build_version[39m[93m:[39m [34m5[39m[32m,[39m
         [37mnode_install_npm[39m[93m:[39m [92m'true'[39m[32m,[39m
         [37mnode_prefix[39m[93m:[39m [92m''[39m[32m,[39m
         [37mnode_shared_cares[39m[93m:[39m [92m'false'[39m[32m,[39m
         [37mnode_shared_http_parser[39m[93m:[39m [92m'false'[39m[32m,[39m
         [37mnode_shared_libuv[39m[93m:[39m [92m'false'[39m[32m,[39m
         [37mnode_shared_zlib[39m[93m:[39m [92m'false'[39m[32m,[39m
         [37mnode_use_dtrace[39m[93m:[39m [92m'false'[39m[32m,[39m
         [37mnode_use_openssl[39m[93m:[39m [92m'true'[39m[32m,[39m
         [37mnode_shared_openssl[39m[93m:[39m [92m'false'[39m[32m,[39m
         [37mstrict_aliasing[39m[93m:[39m [92m'true'[39m[32m,[39m
         [37mtarget_arch[39m[93m:[39m [92m'x64'[39m[32m,[39m
         [37mv8_use_snapshot[39m[93m:[39m [34m1[39m
       [33m}[39m
    [33m}[39m

[0mThe [33mprocess.config[39m property is [1mnot[22m read-only and there are existing[0m
[0mmodules in the ecosystem that are known to extend, modify, or entirely replace[0m
[0mthe value of [33mprocess.config[39m.[0m

[32m[1m## [33mprocess.connected[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIf the Node.js process is spawned with an IPC channel (see the [Child Process][][0m
[0mand [Cluster][] documentation), the [33mprocess.connected[39m property will return[0m
[0m[33mtrue[39m so long as the IPC channel is connected and will return [33mfalse[39m after[0m
[0m[33mprocess.disconnect()[39m is called.[0m

[0mOnce [33mprocess.connected[39m is [33mfalse[39m, it is no longer possible to send messages[0m
[0mover the IPC channel using [33mprocess.send()[39m.[0m

[32m[1m## [33mprocess.cpuUsage([previousValue])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpreviousValue[39m {Object} A previous return value from calling[0m
      [0m[33mprocess.cpuUsage()[39m[0m
    * [0mReturns: {Object}
        * [0m[0m[33muser[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33msystem[39m {integer}[0m[0m[0m

[0mThe [33mprocess.cpuUsage()[39m method returns the user and system CPU time usage of[0m
[0mthe current process, in an object with properties [33muser[39m and [33msystem[39m, whose[0m
[0mvalues are microsecond values (millionth of a second). These values measure time[0m
[0mspent in user and system code respectively, and may end up being greater than[0m
[0mactual elapsed time if multiple CPU cores are performing work for this process.[0m

[0mThe result of a previous call to [33mprocess.cpuUsage()[39m can be passed as the[0m
[0margument to the function, to get a diff reading.[0m

    [94mconst[39m [37mstartUsage[39m [93m=[39m [37mprocess[39m[32m.[39m[37mcpuUsage[39m[90m([39m[90m)[39m[90m;[39m
    [90m// { user: 38579, system: 6986 }[39m
    
    [90m// spin the CPU for 500 milliseconds[39m
    [94mconst[39m [37mnow[39m [93m=[39m [37mDate[39m[32m.[39m[37mnow[39m[90m([39m[90m)[39m[90m;[39m
    [94mwhile[39m [90m([39m[37mDate[39m[32m.[39m[37mnow[39m[90m([39m[90m)[39m [93m-[39m [37mnow[39m [93m<[39m [34m500[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37mcpuUsage[39m[90m([39m[37mstartUsage[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// { user: 514883, system: 11226 }[39m

[32m[1m## [33mprocess.cwd()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string}[0m

[0mThe [33mprocess.cwd()[39m method returns the current working directory of the Node.js[0m
[0mprocess.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Current directory: ${[37mprocess[39m[32m.[39m[37mcwd[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m

[32m[1m## [33mprocess.debugPort[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe port used by the Node.js debugger when enabled.[0m

    [37mprocess[39m[32m.[39m[37mdebugPort[39m [93m=[39m [34m5858[39m[90m;[39m

[32m[1m## [33mprocess.disconnect()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mIf the Node.js process is spawned with an IPC channel (see the [Child Process][][0m
[0mand [Cluster][] documentation), the [33mprocess.disconnect()[39m method will close the[0m
[0mIPC channel to the parent process, allowing the child process to exit gracefully[0m
[0monce there are no other connections keeping it alive.[0m

[0mThe effect of calling [33mprocess.disconnect()[39m is the same as calling[0m
[0m[[33mChildProcess.disconnect()[39m][] from the parent process.[0m

[0mIf the Node.js process was not spawned with an IPC channel,[0m
[0m[33mprocess.disconnect()[39m will be [33mundefined[39m.[0m

[32m[1m## [33mprocess.dlopen(module, filename[, flags])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12794[39m
[90m    description: Added support for the `flags` argument.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmodule[39m {Object}[0m
    * [0m[33mfilename[39m {string}[0m
    * [0m[33mflags[39m {os.constants.dlopen} [1mDefault:[22m [33mos.constants.dlopen.RTLD_LAZY[39m[0m

[0mThe [33mprocess.dlopen()[39m method allows to dynamically load shared[0m
[0mobjects. It is primarily used by [33mrequire()[39m to load[0m
[0mC++ Addons, and should not be used directly, except in special[0m
[0mcases. In other words, [[33mrequire()[39m][] should be preferred over[0m
[0m[33mprocess.dlopen()[39m, unless there are specific reasons.[0m

[0mThe [33mflags[39m argument is an integer that allows to specify dlopen[0m
[0mbehavior. See the [[33mos.constants.dlopen[39m][] documentation for details.[0m

[0mIf there are specific reasons to use [33mprocess.dlopen()[39m (for instance,[0m
[0mto specify dlopen flags), it's often useful to use [[33mrequire.resolve()[39m][][0m
[0mto look up the module's path.[0m

[0mAn important drawback when calling [33mprocess.dlopen()[39m is that the [33mmodule[39m[0m
[0minstance must be passed. Functions exported by the C++ Addon will be accessible[0m
[0mvia [33mmodule.exports[39m.[0m

[0mThe example below shows how to load a C++ Addon, named as [33mbinding[39m,[0m
[0mthat exports a [33mfoo[39m function. All the symbols will be loaded before[0m
[0mthe call returns, by passing the [33mRTLD_NOW[39m constant. In this example[0m
[0mthe constant is assumed to be available.[0m

    [94mconst[39m [37mos[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/os'[39m[90m)[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mdlopen[39m[90m([39m[37mmodule[39m[32m,[39m [37mrequire[39m[32m.[39m[37mresolve[39m[90m([39m[92m'binding'[39m[90m)[39m[32m,[39m
                   [37mos[39m[32m.[39m[37mconstants[39m[32m.[39m[37mdlopen[39m[32m.[39m[37mRTLD_NOW[39m[90m)[39m[90m;[39m
    [37mmodule[39m[32m.[39m[37mexports[39m[32m.[39m[37mfoo[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m## [33mprocess.emitWarning(warning[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mwarning[39m {string|Error} The warning to emit.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mtype[39m {string} When [33mwarning[39m is a [33mString[39m, [33mtype[39m is the name to use[0m[0m[0m
      [0m      [0m[0mfor the [3mtype[23m of warning being emitted. [1mDefault:[22m [33m'Warning'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcode[39m {string} A unique identifier for the warning instance being emitted.[0m[0m[0m
      [0m
        * [0m[0m[33mctor[39m {Function} When [33mwarning[39m is a [33mString[39m, [33mctor[39m is an optional[0m[0m[0m
      [0m      [0m[0mfunction used to limit the generated stack trace. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mprocess.emitWarning[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mdetail[39m {string} Additional text to include with the error.[0m[0m[0m

[0mThe [33mprocess.emitWarning()[39m method can be used to emit custom or application[0m
[0mspecific process warnings. These can be listened for by adding a handler to the[0m
[0m[[33m'warning'[39m][process_warning] event.[0m

    [90m// Emit a warning with a code and additional detail.[39m
    [37mprocess[39m[32m.[39m[37memitWarning[39m[90m([39m[92m'Something happened!'[39m[32m,[39m [33m{[39m
      [37mcode[39m[93m:[39m [92m'MY_WARNING'[39m[32m,[39m
      [37mdetail[39m[93m:[39m [92m'This is some additional information'[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Emits:[39m
    [90m// (node:56338) [MY_WARNING] Warning: Something happened![39m
    [90m// This is some additional information[39m

[0mIn this example, an [33mError[39m object is generated internally by[0m
[0m[33mprocess.emitWarning()[39m and passed through to the[0m
[0m[[33m'warning'[39m][process_warning] handler.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'warning'[39m[32m,[39m [90m([39m[37mwarning[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mname[39m[90m)[39m[90m;[39m    [90m// 'Warning'[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mmessage[39m[90m)[39m[90m;[39m [90m// 'Something happened!'[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mcode[39m[90m)[39m[90m;[39m    [90m// 'MY_WARNING'[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mstack[39m[90m)[39m[90m;[39m   [90m// Stack trace[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mdetail[39m[90m)[39m[90m;[39m  [90m// 'This is some additional information'[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf [33mwarning[39m is passed as an [33mError[39m object, the [33moptions[39m argument is ignored.[0m

[32m[1m## [33mprocess.emitWarning(warning[, type[, code]][, ctor])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mwarning[39m {string|Error} The warning to emit.[0m
    * [0m[33mtype[39m {string} When [33mwarning[39m is a [33mString[39m, [33mtype[39m is the name to use[0m
      [0mfor the [3mtype[23m of warning being emitted. [1mDefault:[22m [33m'Warning'[39m.[0m
    * [0m[33mcode[39m {string} A unique identifier for the warning instance being emitted.[0m
    * [0m[33mctor[39m {Function} When [33mwarning[39m is a [33mString[39m, [33mctor[39m is an optional[0m
      [0mfunction used to limit the generated stack trace. [1mDefault:[22m[0m
      [0m[33mprocess.emitWarning[39m.[0m

[0mThe [33mprocess.emitWarning()[39m method can be used to emit custom or application[0m
[0mspecific process warnings. These can be listened for by adding a handler to the[0m
[0m[[33m'warning'[39m][process_warning] event.[0m

    [90m// Emit a warning using a string.[39m
    [37mprocess[39m[32m.[39m[37memitWarning[39m[90m([39m[92m'Something happened!'[39m[90m)[39m[90m;[39m
    [90m// Emits: (node: 56338) Warning: Something happened![39m

    [90m// Emit a warning using a string and a type.[39m
    [37mprocess[39m[32m.[39m[37memitWarning[39m[90m([39m[92m'Something Happened!'[39m[32m,[39m [92m'CustomWarning'[39m[90m)[39m[90m;[39m
    [90m// Emits: (node:56338) CustomWarning: Something Happened![39m

    [37mprocess[39m[32m.[39m[37memitWarning[39m[90m([39m[92m'Something happened!'[39m[32m,[39m [92m'CustomWarning'[39m[32m,[39m [92m'WARN001'[39m[90m)[39m[90m;[39m
    [90m// Emits: (node:56338) [WARN001] CustomWarning: Something happened![39m

[0mIn each of the previous examples, an [33mError[39m object is generated internally by[0m
[0m[33mprocess.emitWarning()[39m and passed through to the [[33m'warning'[39m][process_warning][0m
[0mhandler.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'warning'[39m[32m,[39m [90m([39m[37mwarning[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mname[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mmessage[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mcode[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[31mwarn[39m[90m([39m[37mwarning[39m[32m.[39m[37mstack[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf [33mwarning[39m is passed as an [33mError[39m object, it will be passed through to the[0m
[0m[33m'warning'[39m event handler unmodified (and the optional [33mtype[39m,[0m
[0m[33mcode[39m and [33mctor[39m arguments will be ignored):[0m

    [90m// Emit a warning using an Error object.[39m
    [94mconst[39m [37mmyWarning[39m [93m=[39m [31mnew[39m [37mError[39m[90m([39m[92m'Something happened!'[39m[90m)[39m[90m;[39m
    [90m// Use the Error name property to specify the type name[39m
    [37mmyWarning[39m[32m.[39m[37mname[39m [93m=[39m [92m'CustomWarning'[39m[90m;[39m
    [37mmyWarning[39m[32m.[39m[37mcode[39m [93m=[39m [92m'WARN001'[39m[90m;[39m
    
    [37mprocess[39m[32m.[39m[37memitWarning[39m[90m([39m[37mmyWarning[39m[90m)[39m[90m;[39m
    [90m// Emits: (node:56338) [WARN001] CustomWarning: Something happened![39m

[0mA [33mTypeError[39m is thrown if [33mwarning[39m is anything other than a string or [33mError[39m[0m
[0mobject.[0m

[0mWhile process warnings use [33mError[39m objects, the process warning[0m
[0mmechanism is [1mnot[22m a replacement for normal error handling mechanisms.[0m

[0mThe following additional handling is implemented if the warning [33mtype[39m is[0m
[0m[33m'DeprecationWarning'[39m:[0m

    * [0mIf the [33m--throw-deprecation[39m command-line flag is used, the deprecation[0m
      [0mwarning is thrown as an exception rather than being emitted as an event.[0m
    * [0mIf the [33m--no-deprecation[39m command-line flag is used, the deprecation[0m
      [0mwarning is suppressed.[0m
    * [0mIf the [33m--trace-deprecation[39m command-line flag is used, the deprecation[0m
      [0mwarning is printed to [33mstderr[39m along with the full stack trace.[0m

[32m[1m### Avoiding duplicate warnings[22m[39m

[0mAs a best practice, warnings should be emitted only once per process. To do[0m
[0mso, it is recommended to place the [33memitWarning()[39m behind a simple boolean[0m
[0mflag as illustrated in the example below:[0m

    [94mfunction[39m [37memitMyWarning[39m[90m([39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[93m![39m[37memitMyWarning[39m[32m.[39m[37mwarned[39m[90m)[39m [33m{[39m
        [37memitMyWarning[39m[32m.[39m[37mwarned[39m [93m=[39m [91mtrue[39m[90m;[39m
        [37mprocess[39m[32m.[39m[37memitWarning[39m[90m([39m[92m'Only warn once!'[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    [37memitMyWarning[39m[90m([39m[90m)[39m[90m;[39m
    [90m// Emits: (node: 56339) Warning: Only warn once![39m
    [37memitMyWarning[39m[90m([39m[90m)[39m[90m;[39m
    [90m// Emits nothing[39m

[32m[1m## [33mprocess.env[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.27[39m
[90mchanges:[39m
[90m  - version: v11.14.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26544[39m
[90m    description: Worker threads will now use a copy of the parent thread’s[39m
[90m                 `process.env` by default, configurable through the `env`[39m
[90m                 option of the `Worker` constructor.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18990[39m
[90m    description: Implicit conversion of variable value to string is deprecated.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe [33mprocess.env[39m property returns an object containing the user environment.[0m
[0mSee environ(7).[0m

[0mAn example of this object looks like:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mTERM[39m[93m:[39m [92m'xterm-256color'[39m[32m,[39m
      [37mSHELL[39m[93m:[39m [92m'/usr/local/bin/bash'[39m[32m,[39m
      [37mUSER[39m[93m:[39m [92m'maciej'[39m[32m,[39m
      [37mPATH[39m[93m:[39m [92m'~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'[39m[32m,[39m
      [37mPWD[39m[93m:[39m [92m'/Users/maciej'[39m[32m,[39m
      [37mEDITOR[39m[93m:[39m [92m'vim'[39m[32m,[39m
      [37mSHLVL[39m[93m:[39m [92m'1'[39m[32m,[39m
      [37mHOME[39m[93m:[39m [92m'/Users/maciej'[39m[32m,[39m
      [37mLOGNAME[39m[93m:[39m [92m'maciej'[39m[32m,[39m
      [37m_[39m[93m:[39m [92m'/usr/local/bin/node'[39m
    [33m}[39m

[0mIt is possible to modify this object, but such modifications will not be[0m
[0mreflected outside the Node.js process, or (unless explicitly requested)[0m
[0mto other [[33mWorker[39m][] threads.[0m
[0mIn other words, the following example would not work:[0m

    [33m$ node -e 'process.env.foo = "bar"' && echo $foo[39m

[0mWhile the following will:[0m

    [37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mfoo[39m [93m=[39m [92m'bar'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mfoo[39m[90m)[39m[90m;[39m

[0mAssigning a property on [33mprocess.env[39m will implicitly convert the value[0m
[0mto a string. [1mThis behavior is deprecated.[22m Future versions of Node.js may[0m
[0mthrow an error when the value is not a string, number, or boolean.[0m

    [37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mtest[39m [93m=[39m [90mnull[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mtest[39m[90m)[39m[90m;[39m
    [90m// => 'null'[39m
    [37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mtest[39m [93m=[39m [90mundefined[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mtest[39m[90m)[39m[90m;[39m
    [90m// => 'undefined'[39m

[0mUse [33mdelete[39m to delete a property from [33mprocess.env[39m.[0m

    [37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mTEST[39m [93m=[39m [34m1[39m[90m;[39m
    [31mdelete[39m [37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mTEST[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mTEST[39m[90m)[39m[90m;[39m
    [90m// => undefined[39m

[0mOn Windows operating systems, environment variables are case-insensitive.[0m

    [37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mTEST[39m [93m=[39m [34m1[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mtest[39m[90m)[39m[90m;[39m
    [90m// => 1[39m

[0mUnless explicitly specified when creating a [[33mWorker[39m][] instance,[0m
[0meach [[33mWorker[39m][] thread has its own copy of [33mprocess.env[39m, based on its[0m
[0mparent thread’s [33mprocess.env[39m, or whatever was specified as the [33menv[39m option[0m
[0mto the [[33mWorker[39m][] constructor. Changes to [33mprocess.env[39m will not be visible[0m
[0macross [[33mWorker[39m][] threads, and only the main thread can make changes that[0m
[0mare visible to the operating system or to native add-ons.[0m

[32m[1m## [33mprocess.execArgv[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]}[0m

[0mThe [33mprocess.execArgv[39m property returns the set of Node.js-specific command-line[0m
[0moptions passed when the Node.js process was launched. These options do not[0m
[0mappear in the array returned by the [[33mprocess.argv[39m][] property, and do not[0m
[0minclude the Node.js executable, the name of the script, or any options following[0m
[0mthe script name. These options are useful in order to spawn child processes with[0m
[0mthe same execution environment as the parent.[0m

    [33m$ node --harmony script.js --version[39m

[0mResults in [33mprocess.execArgv[39m:[0m

[90m<!-- eslint-disable semi -->[39m
[90m[39m    [33m[[39m[92m'--harmony'[39m[33m][39m

[0mAnd [33mprocess.argv[39m:[0m

[90m<!-- eslint-disable semi -->[39m
[90m[39m    [33m[[39m[92m'/usr/local/bin/node'[39m[32m,[39m [92m'script.js'[39m[32m,[39m [92m'--version'[39m[33m][39m

[32m[1m## [33mprocess.execPath[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.100[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe [33mprocess.execPath[39m property returns the absolute pathname of the executable[0m
[0mthat started the Node.js process.[0m

[90m<!-- eslint-disable semi -->[39m
[90m[39m    [92m'/usr/local/bin/node'[39m

[32m[1m## [33mprocess.exit([code])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.13[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {integer} The exit code. [1mDefault:[22m [33m0[39m.[0m

[0mThe [33mprocess.exit()[39m method instructs Node.js to terminate the process[0m
[0msynchronously with an exit status of [33mcode[39m. If [33mcode[39m is omitted, exit uses[0m
[0meither the 'success' code [33m0[39m or the value of [33mprocess.exitCode[39m if it has been[0m
[0mset. Node.js will not terminate until all the [[33m'exit'[39m][] event listeners are[0m
[0mcalled.[0m

[0mTo exit with a 'failure' code:[0m

    [37mprocess[39m[32m.[39m[37mexit[39m[90m([39m[34m1[39m[90m)[39m[90m;[39m

[0mThe shell that executed Node.js should see the exit code as [33m1[39m.[0m

[0mCalling [33mprocess.exit()[39m will force the process to exit as quickly as possible[0m
[0meven if there are still asynchronous operations pending that have not yet[0m
[0mcompleted fully, including I/O operations to [33mprocess.stdout[39m and[0m
[0m[33mprocess.stderr[39m.[0m

[0mIn most situations, it is not actually necessary to call [33mprocess.exit()[39m[0m
[0mexplicitly. The Node.js process will exit on its own [3mif there is no additional[23m[0m
[0m[3mwork pending[23m in the event loop. The [33mprocess.exitCode[39m property can be set to[0m
[0mtell the process which exit code to use when the process exits gracefully.[0m

[0mFor instance, the following example illustrates a [3mmisuse[23m of the[0m
[0m[33mprocess.exit()[39m method that could lead to data printed to stdout being[0m
[0mtruncated and lost:[0m

    [90m// This is an example of what *not* to do:[39m
    [94mif[39m [90m([39m[37msomeConditionNotMet[39m[90m([39m[90m)[39m[90m)[39m [33m{[39m
      [37mprintUsageToStdout[39m[90m([39m[90m)[39m[90m;[39m
      [37mprocess[39m[32m.[39m[37mexit[39m[90m([39m[34m1[39m[90m)[39m[90m;[39m
    [33m}[39m

[0mThe reason this is problematic is because writes to [33mprocess.stdout[39m in Node.js[0m
[0mare sometimes [3masynchronous[23m and may occur over multiple ticks of the Node.js[0m
[0mevent loop. Calling [33mprocess.exit()[39m, however, forces the process to exit[0m
[0m[3mbefore[23m those additional writes to [33mstdout[39m can be performed.[0m

[0mRather than calling [33mprocess.exit()[39m directly, the code [3mshould[23m set the[0m
[0m[33mprocess.exitCode[39m and allow the process to exit naturally by avoiding[0m
[0mscheduling any additional work for the event loop:[0m

    [90m// How to properly set the exit code while letting[39m
    [90m// the process exit gracefully.[39m
    [94mif[39m [90m([39m[37msomeConditionNotMet[39m[90m([39m[90m)[39m[90m)[39m [33m{[39m
      [37mprintUsageToStdout[39m[90m([39m[90m)[39m[90m;[39m
      [37mprocess[39m[32m.[39m[37mexitCode[39m [93m=[39m [34m1[39m[90m;[39m
    [33m}[39m

[0mIf it is necessary to terminate the Node.js process due to an error condition,[0m
[0mthrowing an [3muncaught[23m error and allowing the process to terminate accordingly[0m
[0mis safer than calling [33mprocess.exit()[39m.[0m

[0mIn [[33mWorker[39m][] threads, this function stops the current thread rather[0m
[0mthan the current process.[0m

[32m[1m## [33mprocess.exitCode[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mA number which will be the process exit code, when the process either[0m
[0mexits gracefully, or is exited via [[33mprocess.exit()[39m][] without specifying[0m
[0ma code.[0m

[0mSpecifying a code to [[33mprocess.exit(code)[39m][[33mprocess.exit()[39m] will override any[0m
[0mprevious setting of [33mprocess.exitCode[39m.[0m

[32m[1m## [33mprocess.getegid()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v2.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mprocess.getegid()[39m method returns the numerical effective group identity[0m
[0mof the Node.js process. (See getegid(2).)[0m

    [94mif[39m [90m([39m[37mprocess[39m[32m.[39m[37mgetegid[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Current gid: ${[37mprocess[39m[32m.[39m[37mgetegid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
    [33m}[39m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m

[32m[1m## [33mprocess.geteuid()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v2.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mThe [33mprocess.geteuid()[39m method returns the numerical effective user identity of[0m
[0mthe process. (See geteuid(2).)[0m

    [94mif[39m [90m([39m[37mprocess[39m[32m.[39m[37mgeteuid[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Current uid: ${[37mprocess[39m[32m.[39m[37mgeteuid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
    [33m}[39m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m

[32m[1m## [33mprocess.getgid()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mThe [33mprocess.getgid()[39m method returns the numerical group identity of the[0m
[0mprocess. (See getgid(2).)[0m

    [94mif[39m [90m([39m[37mprocess[39m[32m.[39m[37mgetgid[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Current gid: ${[37mprocess[39m[32m.[39m[37mgetgid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
    [33m}[39m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m

[32m[1m## [33mprocess.getgroups()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {integer[]}[0m

[0mThe [33mprocess.getgroups()[39m method returns an array with the supplementary group[0m
[0mIDs. POSIX leaves it unspecified if the effective group ID is included but[0m
[0mNode.js ensures it always is.[0m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m

[32m[1m## [33mprocess.getuid()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.28[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {integer}[0m

[0mThe [33mprocess.getuid()[39m method returns the numeric user identity of the process.[0m
[0m(See getuid(2).)[0m

    [94mif[39m [90m([39m[37mprocess[39m[32m.[39m[37mgetuid[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Current uid: ${[37mprocess[39m[32m.[39m[37mgetuid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
    [33m}[39m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m

[32m[1m## [33mprocess.hasUncaughtExceptionCaptureCallback()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mIndicates whether a callback has been set using[0m
[0m[[33mprocess.setUncaughtExceptionCaptureCallback()[39m][].[0m

[32m[1m## [33mprocess.hrtime([time])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtime[39m {integer[]} The result of a previous call to [33mprocess.hrtime()[39m[0m
    * [0mReturns: {integer[]}[0m

[0mThis is the legacy version of [[33mprocess.hrtime.bigint()[39m][][0m
[0mbefore [33mbigint[39m was introduced in JavaScript.[0m

[0mThe [33mprocess.hrtime()[39m method returns the current high-resolution real time[0m
[0min a [33m[seconds, nanoseconds][39m tuple [33mArray[39m, where [33mnanoseconds[39m is the[0m
[0mremaining part of the real time that can't be represented in second precision.[0m

[0m[33mtime[39m is an optional parameter that must be the result of a previous[0m
[0m[33mprocess.hrtime()[39m call to diff with the current time. If the parameter[0m
[0mpassed in is not a tuple [33mArray[39m, a [33mTypeError[39m will be thrown. Passing in a[0m
[0muser-defined array instead of the result of a previous call to[0m
[0m[33mprocess.hrtime()[39m will lead to undefined behavior.[0m

[0mThese times are relative to an arbitrary time in the[0m
[0mpast, and not related to the time of day and therefore not subject to clock[0m
[0mdrift. The primary use is for measuring performance between intervals:[0m

    [94mconst[39m [37mNS_PER_SEC[39m [93m=[39m [34m1e9[39m[90m;[39m
    [94mconst[39m [37mtime[39m [93m=[39m [37mprocess[39m[32m.[39m[37mhrtime[39m[90m([39m[90m)[39m[90m;[39m
    [90m// [ 1800216, 25 ][39m
    
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mdiff[39m [93m=[39m [37mprocess[39m[32m.[39m[37mhrtime[39m[90m([39m[37mtime[39m[90m)[39m[90m;[39m
      [90m// [ 1, 552 ][39m
    
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Benchmark took ${[37mdiff[39m[33m[[39m[34m0[39m[33m][39m [93m*[39m [37mNS_PER_SEC[39m [93m+[39m [37mdiff[39m[33m[[39m[34m1[39m[33m][39m} nanoseconds`[90m)[39m[90m;[39m
      [90m// Benchmark took 1000000552 nanoseconds[39m
    [33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m

[32m[1m## [33mprocess.hrtime.bigint()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {bigint}[0m

[0mThe [33mbigint[39m version of the [[33mprocess.hrtime()[39m][] method returning the[0m
[0mcurrent high-resolution real time in nanoseconds as a [33mbigint[39m.[0m

[0mUnlike [[33mprocess.hrtime()[39m][], it does not support an additional [33mtime[39m[0m
[0margument since the difference can just be computed directly[0m
[0mby subtraction of the two [33mbigint[39ms.[0m

    [94mconst[39m [37mstart[39m [93m=[39m [37mprocess[39m[32m.[39m[37mhrtime[39m[32m.[39m[37mbigint[39m[90m([39m[90m)[39m[90m;[39m
    [90m// 191051479007711n[39m
    
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mend[39m [93m=[39m [37mprocess[39m[32m.[39m[37mhrtime[39m[32m.[39m[37mbigint[39m[90m([39m[90m)[39m[90m;[39m
      [90m// 191052633396993n[39m
    
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Benchmark took ${[37mend[39m [93m-[39m [37mstart[39m} nanoseconds`[90m)[39m[90m;[39m
      [90m// Benchmark took 1154389282 nanoseconds[39m
    [33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m

[32m[1m## [33mprocess.initgroups(user, extraGroup)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33muser[39m {string|number} The user name or numeric identifier.[0m
    * [0m[33mextraGroup[39m {string|number} A group name or numeric identifier.[0m

[0mThe [33mprocess.initgroups()[39m method reads the [33m/etc/group[39m file and initializes[0m
[0mthe group access list, using all groups of which the user is a member. This is[0m
[0ma privileged operation that requires that the Node.js process either have [33mroot[39m[0m
[0maccess or the [33mCAP_SETGID[39m capability.[0m

[0mUse care when dropping privileges:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37mgetgroups[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m         [90m// [ 0 ][39m
    [37mprocess[39m[32m.[39m[37minitgroups[39m[90m([39m[92m'bnoordhuis'[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m   [90m// switch user[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37mgetgroups[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m         [90m// [ 27, 30, 46, 1000, 0 ][39m
    [37mprocess[39m[32m.[39m[37msetgid[39m[90m([39m[34m1000[39m[90m)[39m[90m;[39m                     [90m// drop root gid[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37mgetgroups[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m         [90m// [ 27, 30, 46, 1000 ][39m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m
[0mThis feature is not available in [[33mWorker[39m][] threads.[0m

[32m[1m## [33mprocess.kill(pid[, signal])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpid[39m {number} A process ID[0m
    * [0m[33msignal[39m {string|number} The signal to send, either as a string or number.[0m
      [0m[1mDefault:[22m [33m'SIGTERM'[39m.[0m

[0mThe [33mprocess.kill()[39m method sends the [33msignal[39m to the process identified by[0m
[0m[33mpid[39m.[0m

[0mSignal names are strings such as [33m'SIGINT'[39m or [33m'SIGHUP'[39m. See [Signal Events][][0m
[0mand kill(2) for more information.[0m

[0mThis method will throw an error if the target [33mpid[39m does not exist. As a special[0m
[0mcase, a signal of [33m0[39m can be used to test for the existence of a process.[0m
[0mWindows platforms will throw an error if the [33mpid[39m is used to kill a process[0m
[0mgroup.[0m

[0mEven though the name of this function is [33mprocess.kill()[39m, it is really just a[0m
[0msignal sender, like the [33mkill[39m system call. The signal sent may do something[0m
[0mother than kill the target process.[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'SIGHUP'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Got SIGHUP signal.'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Exiting.'[39m[90m)[39m[90m;[39m
      [37mprocess[39m[32m.[39m[37mexit[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [33m}[39m[32m,[39m [34m100[39m[90m)[39m[90m;[39m
    
    [37mprocess[39m[32m.[39m[37mkill[39m[90m([39m[37mprocess[39m[32m.[39m[37mpid[39m[32m,[39m [92m'SIGHUP'[39m[90m)[39m[90m;[39m

[0mWhen [33mSIGUSR1[39m is received by a Node.js process, Node.js will start the[0m
[0mdebugger. See [Signal Events][].[0m

[32m[1m## [33mprocess.mainModule[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.17[39m
[90mdeprecated: REPLACEME[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [[33mrequire.main[39m[90m][] instead.[0m[23m[39m

    * [0m{Object}[0m

[0mThe [33mprocess.mainModule[39m property provides an alternative way of retrieving[0m
[0m[[33mrequire.main[39m][]. The difference is that if the main module changes at[0m
[0mruntime, [[33mrequire.main[39m][] may still refer to the original main module in[0m
[0mmodules that were required before the change occurred. Generally, it's[0m
[0msafe to assume that the two refer to the same module.[0m

[0mAs with [[33mrequire.main[39m][], [33mprocess.mainModule[39m will be [33mundefined[39m if there[0m
[0mis no entry script.[0m

[32m[1m## [33mprocess.memoryUsage()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90mchanges:[39m
[90m  - version: v13.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31550[39m
[90m    description: Added `arrayBuffers` to the returned object.[39m
[90m  - version: v7.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9587[39m
[90m    description: Added `external` to the returned object.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}
        * [0m[0m[33mrss[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mheapTotal[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mheapUsed[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mexternal[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33marrayBuffers[39m {integer}[0m[0m[0m

[0mThe [33mprocess.memoryUsage()[39m method returns an object describing the memory usage[0m
[0mof the Node.js process measured in bytes.[0m

[0mFor example, the code:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37mmemoryUsage[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m

[0mWill generate:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mrss[39m[93m:[39m [34m4935680[39m[32m,[39m
      [37mheapTotal[39m[93m:[39m [34m1826816[39m[32m,[39m
      [37mheapUsed[39m[93m:[39m [34m650472[39m[32m,[39m
      [37mexternal[39m[93m:[39m [34m49879[39m[32m,[39m
      [37marrayBuffers[39m[93m:[39m [34m9386[39m
    [33m}[39m

    * [0m[33mheapTotal[39m and [33mheapUsed[39m refer to V8's memory usage.[0m
    * [0m[33mexternal[39m refers to the memory usage of C++ objects bound to JavaScript[0m
      [0mobjects managed by V8.[0m
    * [0m[33mrss[39m, Resident Set Size, is the amount of space occupied in the main[0m
      [0mmemory device (that is a subset of the total allocated memory) for the[0m
      [0mprocess, including all C++ and JavaScript objects and code.[0m
    * [0m[33marrayBuffers[39m refers to memory allocated for [33mArrayBuffer[39ms and[0m
      [0m[33mSharedArrayBuffer[39ms, including all Node.js [[33mBuffer[39m][]s.[0m
      [0mThis is also included in the [33mexternal[39m value. When Node.js is used as an[0m
      [0membedded library, this value may be [33m0[39m because allocations for [33mArrayBuffer[39ms[0m
      [0mmay not be tracked in that case.[0m

[0mWhen using [[33mWorker[39m][] threads, [33mrss[39m will be a value that is valid for the[0m
[0mentire process, while the other fields will only refer to the current thread.[0m

[32m[1m## [33mprocess.nextTick(callback[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.26[39m
[90mchanges:[39m
[90m  - version: v1.8.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/1077[39m
[90m    description: Additional arguments after `callback` are now supported.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m
    * [0m[33m...args[39m {any} Additional arguments to pass when invoking the [33mcallback[39m[0m

[0m[33mprocess.nextTick()[39m adds [33mcallback[39m to the "next tick queue". This queue is[0m
[0mfully drained after the current operation on the JavaScript stack runs to[0m
[0mcompletion and before the event loop is allowed to continue. It's possible to[0m
[0mcreate an infinite loop if one were to recursively call [33mprocess.nextTick()[39m.[0m
[0mSee the [Event Loop][] guide for more background.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'start'[39m[90m)[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'nextTick callback'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'scheduled'[39m[90m)[39m[90m;[39m
    [90m// Output:[39m
    [90m// start[39m
    [90m// scheduled[39m
    [90m// nextTick callback[39m

[0mThis is important when developing APIs in order to give users the opportunity[0m
[0mto assign event handlers [3mafter[23m an object has been constructed but before any[0m
[0mI/O has occurred:[0m

    [94mfunction[39m [37mMyThing[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
      [91mthis[39m[32m.[39m[37msetupOptions[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    
      [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [91mthis[39m[32m.[39m[37mstartDoingStuff[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mconst[39m [37mthing[39m [93m=[39m [31mnew[39m [37mMyThing[39m[90m([39m[90m)[39m[90m;[39m
    [37mthing[39m[32m.[39m[37mgetReadyForStuff[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// thing.startDoingStuff() gets called now, not before.[39m

[0mIt is very important for APIs to be either 100% synchronous or 100%[0m
[0masynchronous. Consider this example:[0m

    [90m// WARNING!  DO NOT USE!  BAD UNSAFE HAZARD![39m
    [94mfunction[39m [37mmaybeSync[39m[90m([39m[37marg[39m[32m,[39m [37mcb[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[37marg[39m[90m)[39m [33m{[39m
        [37mcb[39m[90m([39m[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
    
      [37mfs[39m[32m.[39m[37mstat[39m[90m([39m[92m'file'[39m[32m,[39m [37mcb[39m[90m)[39m[90m;[39m
    [33m}[39m

[0mThis API is hazardous because in the following case:[0m

    [94mconst[39m [37mmaybeTrue[39m [93m=[39m [37mMath[39m[32m.[39m[37mrandom[39m[90m([39m[90m)[39m [93m>[39m [34m0.5[39m[90m;[39m
    
    [37mmaybeSync[39m[90m([39m[37mmaybeTrue[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mfoo[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mbar[39m[90m([39m[90m)[39m[90m;[39m

[0mIt is not clear whether [33mfoo()[39m or [33mbar()[39m will be called first.[0m

[0mThe following approach is much better:[0m

    [94mfunction[39m [37mdefinitelyAsync[39m[90m([39m[37marg[39m[32m,[39m [37mcb[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[37marg[39m[90m)[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[37mcb[39m[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
    
      [37mfs[39m[32m.[39m[37mstat[39m[90m([39m[92m'file'[39m[32m,[39m [37mcb[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## [33mprocess.noDeprecation[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThe [33mprocess.noDeprecation[39m property indicates whether the [33m--no-deprecation[39m[0m
[0mflag is set on the current Node.js process. See the documentation for[0m
[0mthe [[33m'warning'[39m event][process_warning] and the[0m
[0m[[33memitWarning()[39m method][process_emit_warning] for more information about this[0m
[0mflag's behavior.[0m

[32m[1m## [33mprocess.pid[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.15[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mThe [33mprocess.pid[39m property returns the PID of the process.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`This process is pid ${[37mprocess[39m[32m.[39m[37mpid[39m}`[90m)[39m[90m;[39m

[32m[1m## [33mprocess.platform[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe [33mprocess.platform[39m property returns a string identifying the operating[0m
[0msystem platform on which the Node.js process is running.[0m

[0mCurrently possible values are:[0m

    * [0m[33m'aix'[39m[0m
    * [0m[33m'darwin'[39m[0m
    * [0m[33m'freebsd'[39m[0m
    * [0m[33m'linux'[39m[0m
    * [0m[33m'openbsd'[39m[0m
    * [0m[33m'sunos'[39m[0m
    * [0m[33m'win32'[39m[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`This platform is ${[37mprocess[39m[32m.[39m[37mplatform[39m}`[90m)[39m[90m;[39m

[0mThe value [33m'android'[39m may also be returned if the Node.js is built on the[0m
[0mAndroid operating system. However, Android support in Node.js[0m
[0m[is experimental][Android building].[0m

[32m[1m## [33mprocess.ppid[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v9.2.0[39m
[90m  - v8.10.0[39m
[90m  - v6.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mThe [33mprocess.ppid[39m property returns the PID of the current parent process.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`The parent process is pid ${[37mprocess[39m[32m.[39m[37mppid[39m}`[90m)[39m[90m;[39m

[32m[1m## [33mprocess.release[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v3.0.0[39m
[90mchanges:[39m
[90m  - version: v4.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3212[39m
[90m    description: The `lts` property is now supported.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe [33mprocess.release[39m property returns an [33mObject[39m containing metadata related[0m
[0mto the current release, including URLs for the source tarball and headers-only[0m
[0mtarball.[0m

[0m[33mprocess.release[39m contains the following properties:[0m

    * [0m[33mname[39m {string} A value that will always be [33m'node'[39m for Node.js. For[0m
      [0mlegacy io.js releases, this will be [33m'io.js'[39m.[0m
    * [0m[33msourceUrl[39m {string} an absolute URL pointing to a [3m[33m.tar.gz[39m[23m file containing[0m
      [0mthe source code of the current release.[0m
    * [0m[33mheadersUrl[39m{string} an absolute URL pointing to a [3m[33m.tar.gz[39m[23m file containing[0m
      [0monly the source header files for the current release. This file is[0m
      [0msignificantly smaller than the full source file and can be used for compiling[0m
      [0mNode.js native add-ons.[0m
    * [0m[33mlibUrl[39m {string} an absolute URL pointing to a [3m[33mnode.lib[39m[23m file matching the[0m
      [0marchitecture and version of the current release. This file is used for[0m
      [0mcompiling Node.js native add-ons. _This property is only present on Windows[0m
      [0mbuilds of Node.js and will be missing on all other platforms._[0m
    * [0m[33mlts[39m {string} a string label identifying the [LTS][] label for this release.[0m
      [0mThis property only exists for LTS releases and is [33mundefined[39m for all other[0m
      [0mrelease types, including [3mCurrent[23m releases. Currently the valid values are:
        * [0m[0m[33m'Argon'[39m for the 4.x LTS line beginning with 4.2.0.[0m[0m[0m
      [0m
        * [0m[0m[33m'Boron'[39m for the 6.x LTS line beginning with 6.9.0.[0m[0m[0m
      [0m
        * [0m[0m[33m'Carbon'[39m for the 8.x LTS line beginning with 8.9.1.[0m[0m[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mname[39m[93m:[39m [92m'node'[39m[32m,[39m
      [37mlts[39m[93m:[39m [92m'Argon'[39m[32m,[39m
      [37msourceUrl[39m[93m:[39m [92m'https://nodejs.org/download/release/v4.4.5/node-v4.4.5.tar.gz'[39m[32m,[39m
      [37mheadersUrl[39m[93m:[39m [92m'https://nodejs.org/download/release/v4.4.5/node-v4.4.5-headers.tar.gz'[39m[32m,[39m
      [37mlibUrl[39m[93m:[39m [92m'https://nodejs.org/download/release/v4.4.5/win-x64/node.lib'[39m
    [33m}[39m

[0mIn custom builds from non-release versions of the source tree, only the[0m
[0m[33mname[39m property may be present. The additional properties should not be[0m
[0mrelied upon to exist.[0m

[32m[1m## [33mprocess.report[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.8.0[39m
[90mchanges:[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32242[39m
[90m    description: This API is no longer considered experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0m[33mprocess.report[39m is an object whose methods are used to generate diagnostic[0m
[0mreports for the current process. Additional documentation is available in the[0m
[0m[report documentation][].[0m

[32m[1m### [33mprocess.report.compact[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mWrite reports in a compact format, single-line JSON, more easily consumable[0m
[0mby log processing systems than the default multi-line format designed for[0m
[0mhuman consumption.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Reports are compact? ${[37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mcompact[39m}`[90m)[39m[90m;[39m

[32m[1m### [33mprocess.report.directory[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.12.0[39m
[90mchanges:[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32242[39m
[90m    description: This API is no longer considered experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mDirectory where the report is written. The default value is the empty string,[0m
[0mindicating that reports are written to the current working directory of the[0m
[0mNode.js process.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Report directory is ${[37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mdirectory[39m}`[90m)[39m[90m;[39m

[32m[1m### [33mprocess.report.filename[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.12.0[39m
[90mchanges:[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32242[39m
[90m    description: This API is no longer considered experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mFilename where the report is written. If set to the empty string, the output[0m
[0mfilename will be comprised of a timestamp, PID, and sequence number. The default[0m
[0mvalue is the empty string.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Report filename is ${[37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mfilename[39m}`[90m)[39m[90m;[39m

[32m[1m### [33mprocess.report.getReport([err])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.8.0[39m
[90mchanges:[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32242[39m
[90m    description: This API is no longer considered experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merr[39m {Error} A custom error used for reporting the JavaScript stack.[0m
    * [0mReturns: {Object}[0m

[0mReturns a JavaScript Object representation of a diagnostic report for the[0m
[0mrunning process. The report's JavaScript stack trace is taken from [33merr[39m, if[0m
[0mpresent.[0m

    [94mconst[39m [37mdata[39m [93m=[39m [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mgetReport[39m[90m([39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdata[39m[32m.[39m[37mheader[39m[32m.[39m[37mnodeJsVersion[39m[90m)[39m[90m;[39m
    
    [90m// Similar to process.report.writeReport()[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [37mfs[39m[32m.[39m[37mwriteFileSync[39m[90m([39m[37mutil[39m[32m.[39m[37minspect[39m[90m([39m[37mdata[39m[90m)[39m[32m,[39m [92m'my-report.log'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m;[39m

[0mAdditional documentation is available in the [report documentation][].[0m

[32m[1m### [33mprocess.report.reportOnFatalError[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

    * [0m{boolean}[0m

[0mIf [33mtrue[39m, a diagnostic report is generated on fatal errors, such as out of[0m
[0mmemory errors or failed C++ assertions.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Report on fatal error: ${[37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnFatalError[39m}`[90m)[39m[90m;[39m

[32m[1m### [33mprocess.report.reportOnSignal[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.12.0[39m
[90mchanges:[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32242[39m
[90m    description: This API is no longer considered experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIf [33mtrue[39m, a diagnostic report is generated when the process receives the[0m
[0msignal specified by [33mprocess.report.signal[39m.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Report on signal: ${[37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnSignal[39m}`[90m)[39m[90m;[39m

[32m[1m### [33mprocess.report.reportOnUncaughtException[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.12.0[39m
[90mchanges:[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32242[39m
[90m    description: This API is no longer considered experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIf [33mtrue[39m, a diagnostic report is generated on uncaught exception.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Report on exception: ${[37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnUncaughtException[39m}`[90m)[39m[90m;[39m

[32m[1m### [33mprocess.report.signal[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.12.0[39m
[90mchanges:[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32242[39m
[90m    description: This API is no longer considered experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe signal used to trigger the creation of a diagnostic report. Defaults to[0m
[0m[33m'SIGUSR2'[39m.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Report signal: ${[37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37msignal[39m}`[90m)[39m[90m;[39m

[32m[1m### [33mprocess.report.writeReport([filename][, err])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.8.0[39m
[90mchanges:[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32242[39m
[90m    description: This API is no longer considered experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[0m[0m[33mfilename[39m {string} Name of the file where the report is written. This[0m[0m[0m
      [0m[0m[0mshould be a relative path, that will be appended to the directory specified in[0m[0m[0m
      [0m[0m[0m[33mprocess.report.directory[39m, or the current working directory of the Node.js[0m[0m[0m
      [0m[0m[0mprocess, if unspecified.[0m[0m[0m
    * [0m[0m[0m[33merr[39m {Error} A custom error used for reporting the JavaScript stack.[0m[0m[0m
    * [0m[0m[0mReturns: {string} Returns the filename of the generated report.[0m[0m[0m

[0mWrites a diagnostic report to a file. If [33mfilename[39m is not provided, the default[0m
[0mfilename includes the date, time, PID, and a sequence number. The report's[0m
[0mJavaScript stack trace is taken from [33merr[39m, if present.[0m

    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mwriteReport[39m[90m([39m[90m)[39m[90m;[39m

[0mAdditional documentation is available in the [report documentation][].[0m

[32m[1m## [33mprocess.resourceUsage()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object} the resource usage for the current process. All of these[0m
      [0mvalues come from the [33muv_getrusage[39m call which returns[0m
      [0ma [[33muv_rusage_t[39m struct][uv_rusage_t].
        * [0m[0m[33muserCPUTime[39m {integer} maps to [33mru_utime[39m computed in microseconds.[0m[0m[0m
      [0m      [0m[0mIt is the same value as [[33mprocess.cpuUsage().user[39m][process.cpuUsage].[0m[0m[0m
      [0m
        * [0m[0m[33msystemCPUTime[39m {integer} maps to [33mru_stime[39m computed in microseconds.[0m[0m[0m
      [0m      [0m[0mIt is the same value as [[33mprocess.cpuUsage().system[39m][process.cpuUsage].[0m[0m[0m
      [0m
        * [0m[0m[33mmaxRSS[39m {integer} maps to [33mru_maxrss[39m which is the maximum resident set[0m[0m[0m
      [0m      [0m[0msize used in kilobytes.[0m[0m[0m
      [0m
        * [0m[0m[33msharedMemorySize[39m {integer} maps to [33mru_ixrss[39m but is not supported by[0m[0m[0m
      [0m      [0m[0many platform.[0m[0m[0m
      [0m
        * [0m[0m[33munsharedDataSize[39m {integer} maps to [33mru_idrss[39m but is not supported by[0m[0m[0m
      [0m      [0m[0many platform.[0m[0m[0m
      [0m
        * [0m[0m[33munsharedStackSize[39m {integer} maps to [33mru_isrss[39m but is not supported by[0m[0m[0m
      [0m      [0m[0many platform.[0m[0m[0m
      [0m
        * [0m[0m[33mminorPageFault[39m {integer} maps to [33mru_minflt[39m which is the number of[0m[0m[0m
      [0m      [0m[0mminor page faults for the process, see[0m[0m[0m
      [0m      [0m[0m[this article for more details][wikipedia_minor_fault].[0m[0m[0m
      [0m
        * [0m[0m[33mmajorPageFault[39m {integer} maps to [33mru_majflt[39m which is the number of[0m[0m[0m
      [0m      [0m[0mmajor page faults for the process, see[0m[0m[0m
      [0m      [0m[0m[this article for more details][wikipedia_major_fault]. This field is not[0m[0m[0m
      [0m      [0m[0msupported on Windows.[0m[0m[0m
      [0m
        * [0m[0m[33mswappedOut[39m {integer} maps to [33mru_nswap[39m but is not supported by any[0m[0m[0m
      [0m      [0m[0mplatform.[0m[0m[0m
      [0m
        * [0m[0m[33mfsRead[39m {integer} maps to [33mru_inblock[39m which is the number of times the[0m[0m[0m
      [0m      [0m[0mfile system had to perform input.[0m[0m[0m
      [0m
        * [0m[0m[33mfsWrite[39m {integer} maps to [33mru_oublock[39m which is the number of times the[0m[0m[0m
      [0m      [0m[0mfile system had to perform output.[0m[0m[0m
      [0m
        * [0m[0m[33mipcSent[39m {integer} maps to [33mru_msgsnd[39m but is not supported by any[0m[0m[0m
      [0m      [0m[0mplatform.[0m[0m[0m
      [0m
        * [0m[0m[33mipcReceived[39m {integer} maps to [33mru_msgrcv[39m but is not supported by any[0m[0m[0m
      [0m      [0m[0mplatform.[0m[0m[0m
      [0m
        * [0m[0m[33msignalsCount[39m {integer} maps to [33mru_nsignals[39m but is not supported by any[0m[0m[0m
      [0m      [0m[0mplatform.[0m[0m[0m
      [0m
        * [0m[0m[33mvoluntaryContextSwitches[39m {integer} maps to [33mru_nvcsw[39m which is the[0m[0m[0m
      [0m      [0m[0mnumber of times a CPU context switch resulted due to a process voluntarily[0m[0m[0m
      [0m      [0m[0mgiving up the processor before its time slice was completed (usually to[0m[0m[0m
      [0m      [0m[0mawait availability of a resource). This field is not supported on Windows.[0m[0m[0m
      [0m
        * [0m[0m[33minvoluntaryContextSwitches[39m {integer} maps to [33mru_nivcsw[39m which is the[0m[0m[0m
      [0m      [0m[0mnumber of times a CPU context switch resulted due to a higher priority[0m[0m[0m
      [0m      [0m[0mprocess becoming runnable or because the current process exceeded its[0m[0m[0m
      [0m      [0m[0mtime slice. This field is not supported on Windows.[0m[0m[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37mresourceUsage[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m/*
      Will output:
      {
        userCPUTime: 82872,
        systemCPUTime: 4143,
        maxRSS: 33164,
        sharedMemorySize: 0,
        unsharedDataSize: 0,
        unsharedStackSize: 0,
        minorPageFault: 2469,
        majorPageFault: 0,
        swappedOut: 0,
        fsRead: 0,
        fsWrite: 8,
        ipcSent: 0,
        ipcReceived: 0,
        signalsCount: 0,
        voluntaryContextSwitches: 79,
        involuntaryContextSwitches: 1
      }
    */[39m

[32m[1m## [33mprocess.send(message[, sendHandle[, options]][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmessage[39m {Object}[0m
    * [0m[33msendHandle[39m {net.Server|net.Socket}[0m
    * [0m[33moptions[39m {Object} used to parameterize the sending of certain types of[0m
      [0mhandles.[33moptions[39m supports the following properties:
        * [0m[0m[33mkeepOpen[39m {boolean} A value that can be used when passing instances of[0m[0m[0m
      [0m      [0m[0m[33mnet.Socket[39m. When [33mtrue[39m, the socket is kept open in the sending process.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {boolean}[0m

[0mIf Node.js is spawned with an IPC channel, the [33mprocess.send()[39m method can be[0m
[0mused to send messages to the parent process. Messages will be received as a[0m
[0m[[33m'message'[39m][] event on the parent's [[33mChildProcess[39m][] object.[0m

[0mIf Node.js was not spawned with an IPC channel, [33mprocess.send[39m will be[0m
[0m[33mundefined[39m.[0m

[0mThe message goes through serialization and parsing. The resulting message might[0m
[0mnot be the same as what is originally sent.[0m

[32m[1m## [33mprocess.setegid(id)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v2.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mid[39m {string|number} A group name or ID[0m

[0mThe [33mprocess.setegid()[39m method sets the effective group identity of the process.[0m
[0m(See setegid(2).) The [33mid[39m can be passed as either a numeric ID or a group[0m
[0mname string. If a group name is specified, this method blocks while resolving[0m
[0mthe associated a numeric ID.[0m

    [94mif[39m [90m([39m[37mprocess[39m[32m.[39m[37mgetegid[39m [93m&&[39m [37mprocess[39m[32m.[39m[37msetegid[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Current gid: ${[37mprocess[39m[32m.[39m[37mgetegid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
      [36mtry[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37msetegid[39m[90m([39m[34m501[39m[90m)[39m[90m;[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`New gid: ${[37mprocess[39m[32m.[39m[37mgetegid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
      [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Failed to set gid: ${[37merr[39m}`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m
[0mThis feature is not available in [[33mWorker[39m][] threads.[0m

[32m[1m## [33mprocess.seteuid(id)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v2.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mid[39m {string|number} A user name or ID[0m

[0mThe [33mprocess.seteuid()[39m method sets the effective user identity of the process.[0m
[0m(See seteuid(2).) The [33mid[39m can be passed as either a numeric ID or a username[0m
[0mstring. If a username is specified, the method blocks while resolving the[0m
[0massociated numeric ID.[0m

    [94mif[39m [90m([39m[37mprocess[39m[32m.[39m[37mgeteuid[39m [93m&&[39m [37mprocess[39m[32m.[39m[37mseteuid[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Current uid: ${[37mprocess[39m[32m.[39m[37mgeteuid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
      [36mtry[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37mseteuid[39m[90m([39m[34m501[39m[90m)[39m[90m;[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`New uid: ${[37mprocess[39m[32m.[39m[37mgeteuid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
      [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Failed to set uid: ${[37merr[39m}`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m
[0mThis feature is not available in [[33mWorker[39m][] threads.[0m

[32m[1m## [33mprocess.setgid(id)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mid[39m {string|number} The group name or ID[0m

[0mThe [33mprocess.setgid()[39m method sets the group identity of the process. (See[0m
[0msetgid(2).) The [33mid[39m can be passed as either a numeric ID or a group name[0m
[0mstring. If a group name is specified, this method blocks while resolving the[0m
[0massociated numeric ID.[0m

    [94mif[39m [90m([39m[37mprocess[39m[32m.[39m[37mgetgid[39m [93m&&[39m [37mprocess[39m[32m.[39m[37msetgid[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Current gid: ${[37mprocess[39m[32m.[39m[37mgetgid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
      [36mtry[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37msetgid[39m[90m([39m[34m501[39m[90m)[39m[90m;[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`New gid: ${[37mprocess[39m[32m.[39m[37mgetgid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
      [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Failed to set gid: ${[37merr[39m}`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m

[0mThis function is only available on P[0m

[0mOSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m
[0mThis feature is not available in [34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m threads.[0m

[32m[1m## [33mprocess.setgroups(groups)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mgroups[39m {integer[]}[0m

[0mThe [33mprocess.setgroups()[39m method sets the supplementary group IDs for the[0m
[0mNode.js process. This is a privileged operation that requires the Node.js[0m
[0mprocess to have [33mroot[39m or the [33mCAP_SETGID[39m capability.[0m

[0mThe [33mgroups[39m array can contain numeric group IDs, group names or both.[0m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m
[0mThis feature is not available in [34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m threads.[0m

[32m[1m## [33mprocess.setuid(id)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.28[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mid[39m {integer | string}[0m

[0mThe [33mprocess.setuid(id)[39m method sets the user identity of the process. (See[0m
[0msetuid(2).) The [33mid[39m can be passed as either a numeric ID or a username string.[0m
[0mIf a username is specified, the method blocks while resolving the associated[0m
[0mnumeric ID.[0m

    [94mif[39m [90m([39m[37mprocess[39m[32m.[39m[37mgetuid[39m [93m&&[39m [37mprocess[39m[32m.[39m[37msetuid[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Current uid: ${[37mprocess[39m[32m.[39m[37mgetuid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
      [36mtry[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37msetuid[39m[90m([39m[34m501[39m[90m)[39m[90m;[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`New uid: ${[37mprocess[39m[32m.[39m[37mgetuid[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
      [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Failed to set uid: ${[37merr[39m}`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m

[0mThis function is only available on POSIX platforms (i.e. not Windows or[0m
[0mAndroid).[0m
[0mThis feature is not available in [34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m threads.[0m

[32m[1m## [33mprocess.setUncaughtExceptionCaptureCallback(fn)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfn[39m {Function|null}[0m

[0mThe [33mprocess.setUncaughtExceptionCaptureCallback()[39m function sets a function[0m
[0mthat will be invoked when an uncaught exception occurs, which will receive the[0m
[0mexception value itself as its first argument.[0m

[0mIf such a function is set, the [34m[33m'uncaughtException'[39m[34m ([34m[4m#process_event_uncaughtexception[24m[39m[34m)[39m event will[0m
[0mnot be emitted. If [33m--abort-on-uncaught-exception[39m was passed from the[0m
[0mcommand line or set through [34m[33mv8.setFlagsFromString()[39m[34m ([34m[4mv8.html#v8_v8_setflagsfromstring_flags[24m[39m[34m)[39m, the process will[0m
[0mnot abort.[0m

[0mTo unset the capture function,[0m
[0m[33mprocess.setUncaughtExceptionCaptureCallback(null)[39m may be used. Calling this[0m
[0mmethod with a non-[33mnull[39m argument while another capture function is set will[0m
[0mthrow an error.[0m

[0mUsing this function is mutually exclusive with using the deprecated[0m
[0m[34m[33mdomain[39m[34m ([34m[4mdomain.html[24m[39m[34m)[39m built-in module.[0m

[32m[1m## [33mprocess.stderr[39m[32m[22m[39m

    * [0m{Stream}[0m

[0mThe [33mprocess.stderr[39m property returns a stream connected to[0m
[0m[33mstderr[39m (fd [33m2[39m). It is a [34m[33mnet.Socket[39m[34m ([34m[4mnet.html#net_class_net_socket[24m[39m[34m)[39m (which is a [34mDuplex ([34m[4mstream.html#stream_duplex_and_transform_streams[24m[39m[34m)[39m[0m
[0mstream) unless fd [33m2[39m refers to a file, in which case it is[0m
[0ma [34mWritable ([34m[4mstream.html#stream_writable_streams[24m[39m[34m)[39m stream.[0m

[0m[33mprocess.stderr[39m differs from other Node.js streams in important ways. See[0m
[0m[34mnote on process I/O ([34m[4mprocess.html#process_a_note_on_process_i_o[24m[39m[34m)[39m for more information.[0m

[32m[1m### [33mprocess.stderr.fd[39m[32m[22m[39m

    * [0m{number}[0m

[0mThis property refers to the value of underlying file descriptor of[0m
[0m[33mprocess.stderr[39m. The value is fixed at [33m2[39m. In [34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m threads,[0m
[0mthis field does not exist.[0m

[32m[1m## [33mprocess.stdin[39m[32m[22m[39m

    * [0m{Stream}[0m

[0mThe [33mprocess.stdin[39m property returns a stream connected to[0m
[0m[33mstdin[39m (fd [33m0[39m). It is a [34m[33mnet.Socket[39m[34m ([34m[4mnet.html#net_class_net_socket[24m[39m[34m)[39m (which is a [34mDuplex ([34m[4mstream.html#stream_duplex_and_transform_streams[24m[39m[34m)[39m[0m
[0mstream) unless fd [33m0[39m refers to a file, in which case it is[0m
[0ma [34mReadable ([34m[4mstream.html#stream_readable_streams[24m[39m[34m)[39m stream.[0m

    [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
    
    [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37mon[39m[90m([39m[92m'readable'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mlet[39m [37mchunk[39m[90m;[39m
      [90m// Use a loop to make sure we read all available data.[39m
      [94mwhile[39m [90m([39m[90m([39m[37mchunk[39m [93m=[39m [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37mread[39m[90m([39m[90m)[39m[90m)[39m [93m!==[39m [90mnull[39m[90m)[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mwrite[39m[90m([39m`data: ${[37mchunk[39m}`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mwrite[39m[90m([39m[92m'end'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mAs a [34mDuplex ([34m[4mstream.html#stream_duplex_and_transform_streams[24m[39m[34m)[39m stream, [33mprocess.stdin[39m can also be used in "old" mode that[0m
[0mis compatible with scripts written for Node.js prior to v0.10.[0m
[0mFor more information see [34mStream compatibility ([34m[4mstream.html#stream_compatibility_with_older_node_js_versions[24m[39m[34m)[39m.[0m

[0mIn "old" streams mode the [33mstdin[39m stream is paused by default, so one[0m
[0mmust call [33mprocess.stdin.resume()[39m to read from it. Note also that calling[0m
[0m[33mprocess.stdin.resume()[39m itself would switch stream to "old" mode.[0m

[32m[1m### [33mprocess.stdin.fd[39m[32m[22m[39m

    * [0m{number}[0m

[0mThis property refers to the value of underlying file descriptor of[0m
[0m[33mprocess.stdin[39m. The value is fixed at [33m0[39m. In [34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m threads,[0m
[0mthis field does not exist.[0m

[32m[1m## [33mprocess.stdout[39m[32m[22m[39m

    * [0m{Stream}[0m

[0mThe [33mprocess.stdout[39m property returns a stream connected to[0m
[0m[33mstdout[39m (fd [33m1[39m). It is a [34m[33mnet.Socket[39m[34m ([34m[4mnet.html#net_class_net_socket[24m[39m[34m)[39m (which is a [34mDuplex ([34m[4mstream.html#stream_duplex_and_transform_streams[24m[39m[34m)[39m[0m
[0mstream) unless fd [33m1[39m refers to a file, in which case it is[0m
[0ma [34mWritable ([34m[4mstream.html#stream_writable_streams[24m[39m[34m)[39m stream.[0m

[0mFor example, to copy [33mprocess.stdin[39m to [33mprocess.stdout[39m:[0m

    [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37mpipe[39m[90m([39m[37mprocess[39m[32m.[39m[37mstdout[39m[90m)[39m[90m;[39m

[0m[33mprocess.stdout[39m differs from other Node.js streams in important ways. See[0m
[0m[34mnote on process I/O ([34m[4mprocess.html#process_a_note_on_process_i_o[24m[39m[34m)[39m for more information.[0m

[32m[1m### [33mprocess.stdout.fd[39m[32m[22m[39m

    * [0m{number}[0m

[0mThis property refers to the value of underlying file descriptor of[0m
[0m[33mprocess.stdout[39m. The value is fixed at [33m1[39m. In [34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m threads,[0m
[0mthis field does not exist.[0m

[32m[1m### A note on process I/O[22m[39m

[0m[33mprocess.stdout[39m and [33mprocess.stderr[39m differ from other Node.js streams in[0m
[0mimportant ways:[0m

    1. [0mThey are used internally by [34m[33mconsole.log()[39m[34m ([34m[4mconsole.html#console_console_log_data_args[24m[39m[34m)[39m and [34m[33mconsole.error()[39m[34m ([34m[4mconsole.html#console_console_error_data_args[24m[39m[34m)[39m,[0m
       [0mrespectively.[0m
    2. [0mWrites may be synchronous depending on what the stream is connected to[0m
       [0mand whether the system is Windows or POSIX:
        * [0m[0mFiles: [3msynchronous[23m on Windows and POSIX[0m[0m[0m
       [0m
        * [0m[0mTTYs (Terminals): [3masynchronous[23m on Windows, [3msynchronous[23m on POSIX[0m[0m[0m
       [0m
        * [0m[0mPipes (and sockets): [3msynchronous[23m on Windows, [3masynchronous[23m on POSIX[0m[0m[0m

[0mThese behaviors are partly for historical reasons, as changing them would[0m
[0mcreate backwards incompatibility, but they are also expected by some users.[0m

[0mSynchronous writes avoid problems such as output written with [33mconsole.log()[39m or[0m
[0m[33mconsole.error()[39m being unexpectedly interleaved, or not written at all if[0m
[0m[33mprocess.exit()[39m is called before an asynchronous write completes. See[0m
[0m[34m[33mprocess.exit()[39m[34m ([34m[4m#process_process_exit_code[24m[39m[34m)[39m for more information.[0m

[0m[1m[3mWarning[23m[22m: Synchronous writes block the event loop until the write has[0m
[0mcompleted. This can be near instantaneous in the case of output to a file, but[0m
[0munder high system load, pipes that are not being read at the receiving end, or[0m
[0mwith slow terminals or file systems, its possible for the event loop to be[0m
[0mblocked often enough and long enough to have severe negative performance[0m
[0mimpacts. This may not be a problem when writing to an interactive terminal[0m
[0msession, but consider this particularly careful when doing production logging to[0m
[0mthe process output streams.[0m

[0mTo check if a stream is connected to a [34mTTY ([34m[4mtty.html#tty_tty[24m[39m[34m)[39m context, check the [33misTTY[39m[0m
[0mproperty.[0m

[0mFor instance:[0m

    [33m$ node -p "Boolean(process.stdin.isTTY)"[39m
    [33mtrue[39m
    [33m$ echo "foo" | node -p "Boolean(process.stdin.isTTY)"[39m
    [33mfalse[39m
    [33m$ node -p "Boolean(process.stdout.isTTY)"[39m
    [33mtrue[39m
    [33m$ node -p "Boolean(process.stdout.isTTY)" | cat[39m
    [33mfalse[39m

[0mSee the [34mTTY ([34m[4mtty.html#tty_tty[24m[39m[34m)[39m documentation for more information.[0m

[32m[1m## [33mprocess.throwDeprecation[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.12[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThe initial value of [33mprocess.throwDeprecation[39m indicates whether the[0m
[0m[33m--throw-deprecation[39m flag is set on the current Node.js process.[0m
[0m[33mprocess.throwDeprecation[39m is mutable, so whether or not deprecation[0m
[0mwarnings result in errors may be altered at runtime. See the[0m
[0mdocumentation for the [34m[33m'warning'[39m[34m event ([34m[4m#process_event_warning[24m[39m[34m)[39m and the[0m
[0m[34m[33memitWarning()[39m[34m method ([34m[4m#process_process_emitwarning_warning_type_code_ctor[24m[39m[34m)[39m for more information.[0m

    [33m$ node --throw-deprecation -p "process.throwDeprecation"[39m
    [33mtrue[39m
    [33m$ node -p "process.throwDeprecation"[39m
    [33mundefined[39m
    [33m$ node[39m
    [33m> process.emitWarning('test', 'DeprecationWarning');[39m
    [33mundefined[39m
    [33m> (node:26598) DeprecationWarning: test[39m
    [33m> process.throwDeprecation = true;[39m
    [33mtrue[39m
    [33m> process.emitWarning('test', 'DeprecationWarning');[39m
    [33mThrown:[39m
    [33m[DeprecationWarning: test] { name: 'DeprecationWarning' }[39m

[32m[1m## [33mprocess.title[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.104[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe [33mprocess.title[39m property returns the current process title (i.e. returns[0m
[0mthe current value of [33mps[39m). Assigning a new value to [33mprocess.title[39m modifies[0m
[0mthe current value of [33mps[39m.[0m

[0mWhen a new value is assigned, different platforms will impose different maximum[0m
[0mlength restrictions on the title. Usually such restrictions are quite limited.[0m
[0mFor instance, on Linux and macOS, [33mprocess.title[39m is limited to the size of the[0m
[0mbinary name plus the length of the command line arguments because setting the[0m
[0m[33mprocess.title[39m overwrites the [33margv[39m memory of the process. Node.js v0.8[0m
[0mallowed for longer process title strings by also overwriting the [33menviron[39m[0m
[0mmemory but that was potentially insecure and confusing in some (rather obscure)[0m
[0mcases.[0m

[32m[1m## [33mprocess.traceDeprecation[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThe [33mprocess.traceDeprecation[39m property indicates whether the[0m
[0m[33m--trace-deprecation[39m flag is set on the current Node.js process. See the[0m
[0mdocumentation for the [34m[33m'warning'[39m[34m event ([34m[4m#process_event_warning[24m[39m[34m)[39m and the[0m
[0m[34m[33memitWarning()[39m[34m method ([34m[4m#process_process_emitwarning_warning_type_code_ctor[24m[39m[34m)[39m for more information about this[0m
[0mflag's behavior.[0m

[32m[1m## [33mprocess.umask([mask])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.19[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32499[39m
[90m    description: Calling `process.umask()` with no arguments is deprecated.[39m
[90m[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated. Calling [33mprocess.umask()[39m[90m with no arguments is[0m[23m[39m
[90m[3m    [0mdeprecated. No alternative is provided.[0m[23m[39m

    * [0m[33mmask[39m {string|integer}[0m

[0mThe [33mprocess.umask()[39m method sets or returns the Node.js process's file mode[0m
[0mcreation mask. Child processes inherit the mask from the parent process. Invoked[0m
[0mwithout an argument, the current mask is returned, otherwise the umask is set to[0m
[0mthe argument value and the previous mask is returned.[0m

    [94mconst[39m [37mnewmask[39m [93m=[39m [34m0o022[39m[90m;[39m
    [94mconst[39m [37moldmask[39m [93m=[39m [37mprocess[39m[32m.[39m[37mumask[39m[90m([39m[37mnewmask[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m
      `Changed umask from ${[37moldmask[39m[32m.[39m[37mtoString[39m[90m([39m[34m8[39m[90m)[39m} to ${[37mnewmask[39m[32m.[39m[37mtoString[39m[90m([39m[34m8[39m[90m)[39m}`
    [90m)[39m[90m;[39m

[0m[34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m threads are able to read the umask, however attempting to set the[0m
[0mumask will result in a thrown exception.[0m

[32m[1m## [33mprocess.uptime()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {number}[0m

[0mThe [33mprocess.uptime()[39m method returns the number of seconds the current Node.js[0m
[0mprocess has been running.[0m

[0mThe return value includes fractions of a second. Use [33mMath.floor()[39m to get whole[0m
[0mseconds.[0m

[32m[1m## [33mprocess.version[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe [33mprocess.version[39m property returns the Node.js version string.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Version: ${[37mprocess[39m[32m.[39m[37mversion[39m}`[90m)[39m[90m;[39m

[32m[1m## [33mprocess.versions[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.2.0[39m
[90mchanges:[39m
[90m  - version: v4.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3102[39m
[90m    description: The `icu` property is now supported.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15785[39m
[90m    description: The `v8` property now includes a Node.js specific suffix.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe [33mprocess.versions[39m property returns an object listing the version strings of[0m
[0mNode.js and its dependencies. [33mprocess.versions.modules[39m indicates the current[0m
[0mABI version, which is increased whenever a C++ API changes. Node.js will refuse[0m
[0mto load modules that were compiled against a different module ABI version.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37mversions[39m[90m)[39m[90m;[39m

[0mWill generate an object similar to:[0m

    [33m{ node: '11.13.0',[39m
    [33m  v8: '7.0.276.38-node.18',[39m
    [33m  uv: '1.27.0',[39m
    [33m  zlib: '1.2.11',[39m
    [33m  brotli: '1.0.7',[39m
    [33m  ares: '1.15.0',[39m
    [33m  modules: '67',[39m
    [33m  nghttp2: '1.34.0',[39m
    [33m  napi: '4',[39m
    [33m  llhttp: '1.1.1',[39m
    [33m  openssl: '1.1.1b',[39m
    [33m  cldr: '34.0',[39m
    [33m  icu: '63.1',[39m
    [33m  tz: '2018e',[39m
    [33m  unicode: '11.0' }[39m

[32m[1m## Exit Codes[22m[39m

[0mNode.js will normally exit with a [33m0[39m status code when no more async[0m
[0moperations are pending. The following status codes are used in other[0m
[0mcases:[0m

    * [0m[33m1[39m [1mUncaught Fatal Exception[22m: There was an uncaught exception,[0m
      [0mand it was not handled by a domain or an [34m[33m'uncaughtException'[39m[34m ([34m[4m#process_event_uncaughtexception[24m[39m[34m)[39m event[0m
      [0mhandler.[0m
    * [0m[33m2[39m: Unused (reserved by Bash for builtin misuse)[0m
    * [0m[33m3[39m [1mInternal JavaScript Parse Error[22m: The JavaScript source code[0m
      [0minternal in the Node.js bootstrapping process caused a parse error. This[0m
      [0mis extremely rare, and generally can only happen during development[0m
      [0mof Node.js itself.[0m
    * [0m[33m4[39m [1mInternal JavaScript Evaluation Failure[22m: The JavaScript[0m
      [0msource code internal in the Node.js bootstrapping process failed to[0m
      [0mreturn a function value when evaluated. This is extremely rare, and[0m
      [0mgenerally can only happen during development of Node.js itself.[0m
    * [0m[33m5[39m [1mFatal Error[22m: There was a fatal unrecoverable error in V8.[0m
      [0mTypically a message will be printed to stderr with the prefix `FATAL[0m
      [0mERROR`.[0m
    * [0m[33m6[39m [1mNon-function Internal Exception Handler[22m: There was an[0m
      [0muncaught exception, but the internal fatal exception handler[0m
      [0mfunction was somehow set to a non-function, and could not be called.[0m
    * [0m[33m7[39m [1mInternal Exception Handler Run-Time Failure[22m: There was an[0m
      [0muncaught exception, and the internal fatal exception handler[0m
      [0mfunction itself threw an error while attempting to handle it. This[0m
      [0mcan happen, for example, if an [34m[33m'uncaughtException'[39m[34m ([34m[4m#process_event_uncaughtexception[24m[39m[34m)[39m or[0m
      [0m[33mdomain.on('error')[39m handler throws an error.[0m
    * [0m[33m8[39m: Unused. In previous versions of Node.js, exit code 8 sometimes[0m
      [0mindicated an uncaught exception.[0m
    * [0m[33m9[39m [1mInvalid Argument[22m: Either an unknown option was specified,[0m
      [0mor an option requiring a value was provided without a value.[0m
    * [0m[33m10[39m [1mInternal JavaScript Run-Time Failure[22m: The JavaScript[0m
      [0msource code internal in the Node.js bootstrapping process threw an error[0m
      [0mwhen the bootstrapping function was called. This is extremely rare,[0m
      [0mand generally can only happen during development of Node.js itself.[0m
    * [0m[33m12[39m [1mInvalid Debug Argument[22m: The [33m--inspect[39m and/or [33m--inspect-brk[39m[0m
      [0moptions were set, but the port number chosen was invalid or unavailable.[0m
    * [0m[33m>128[39m [1mSignal Exits[22m: If Node.js receives a fatal signal such as[0m
      [0m[33mSIGKILL[39m or [33mSIGHUP[39m, then its exit code will be [33m128[39m plus the[0m
      [0mvalue of the signal code. This is a standard POSIX practice, since[0m
      [0mexit codes are defined to be 7-bit integers, and signal exits set[0m
      [0mthe high-order bit, and then contain the value of the signal code.[0m
      [0mFor example, signal [33mSIGABRT[39m has value [33m6[39m, so the expected exit[0m
      [0mcode will be [33m128[39m + [33m6[39m, or [33m134[39m.[0m

