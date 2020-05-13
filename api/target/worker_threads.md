[35m[4m[1m# Worker Threads[22m[24m[39m

[90m<!--introduced_in=v10.5.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mworker_threads[39m module enables the use of threads that execute JavaScript[0m
[0min parallel. To access it:[0m

    [94mconst[39m [37mworker[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m

[0mWorkers (threads) are useful for performing CPU-intensive JavaScript operations.[0m
[0mThey will not help much with I/O-intensive work. Node.js’s built-in asynchronous[0m
[0mI/O operations are more efficient than Workers can be.[0m

[0mUnlike [33mchild_process[39m or [33mcluster[39m, [33mworker_threads[39m can share memory. They do[0m
[0mso by transferring [33mArrayBuffer[39m instances or sharing [33mSharedArrayBuffer[39m[0m
[0minstances.[0m

    [94mconst[39m [33m{[39m
      [37mWorker[39m[32m,[39m [37misMainThread[39m[32m,[39m [37mparentPort[39m[32m,[39m [37mworkerData[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    
    [94mif[39m [90m([39m[37misMainThread[39m[90m)[39m [33m{[39m
      [37mmodule[39m[32m.[39m[37mexports[39m [93m=[39m [94mfunction[39m [37mparseJSAsync[39m[90m([39m[37mscript[39m[90m)[39m [33m{[39m
        [31mreturn[39m [31mnew[39m [37mPromise[39m[90m([39m[90m([39m[37mresolve[39m[32m,[39m [37mreject[39m[90m)[39m [93m=>[39m [33m{[39m
          [94mconst[39m [37mworker[39m [93m=[39m [31mnew[39m [37mWorker[39m[90m([39m[37m__filename[39m[32m,[39m [33m{[39m
            [37mworkerData[39m[93m:[39m [37mscript[39m
          [33m}[39m[90m)[39m[90m;[39m
          [37mworker[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [37mresolve[39m[90m)[39m[90m;[39m
          [37mworker[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [37mreject[39m[90m)[39m[90m;[39m
          [37mworker[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
            [94mif[39m [90m([39m[37mcode[39m [93m!==[39m [34m0[39m[90m)[39m
              [37mreject[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m`Worker stopped with exit code ${[37mcode[39m}`[90m)[39m[90m)[39m[90m;[39m
          [33m}[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m;[39m
    [33m}[39m [94melse[39m [33m{[39m
      [94mconst[39m [33m{[39m [37mparse[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'some-js-parsing-library'[39m[90m)[39m[90m;[39m
      [94mconst[39m [37mscript[39m [93m=[39m [37mworkerData[39m[90m;[39m
      [37mparentPort[39m[32m.[39m[37mpostMessage[39m[90m([39m[37mparse[39m[90m([39m[37mscript[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m

[0mThe above example spawns a Worker thread for each [33mparse()[39m call. In actual[0m
[0mpractice, use a pool of Workers instead for these kinds of tasks. Otherwise, the[0m
[0moverhead of creating Workers would likely exceed their benefit.[0m

[0mWhen implementing a worker pool, use the [34m[33mAsyncResource[39m[34m ([34m[4masync_hooks.html#async_hooks_class_asyncresource[24m[39m[34m)[39m API to inform[0m
[0mdiagnostic tools (e.g. in order to provide asynchronous stack traces) about the[0m
[0mcorrelation between tasks and their outcomes. See[0m
[0m[34m"Using [33mAsyncResource[39m[34m for a [33mWorker[39m[34m thread pool" ([34m[4masync_hooks.html#async-resource-worker-pool[24m[39m[34m)[39m[0m
[0min the [33masync_hooks[39m documentation for an example implementation.[0m

[0mWorker threads inherit non-process-specific options by default. Refer to[0m
[0m[34m[33mWorker constructor options[39m[34m ([34m[4m#worker_threads_new_worker_filename_options[24m[39m[34m)[39m to know how to customize worker thread options,[0m
[0mspecifically [33margv[39m and [33mexecArgv[39m options.[0m

[32m[1m## [33mworker.isMainThread[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m if this code is not running inside of a [34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m thread.[0m

    [94mconst[39m [33m{[39m [37mWorker[39m[32m,[39m [37misMainThread[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    
    [94mif[39m [90m([39m[37misMainThread[39m[90m)[39m [33m{[39m
      [90m// This re-loads the current file inside a Worker instance.[39m
      [31mnew[39m [37mWorker[39m[90m([39m[37m__filename[39m[90m)[39m[90m;[39m
    [33m}[39m [94melse[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Inside Worker!'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37misMainThread[39m[90m)[39m[90m;[39m  [90m// Prints 'false'.[39m
    [33m}[39m

[32m[1m## [33mworker.moveMessagePortToContext(port, contextifiedSandbox)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[0m[0m[33mport[39m {MessagePort} The message port which will be transferred.[0m[0m[0m
    * [0m[0m[0m[33mcontextifiedSandbox[39m {Object} A [34mcontextified ([34m[4mvm.html#vm_what_does_it_mean_to_contextify_an_object[24m[39m[34m)[39m object as returned by the[0m[0m[0m
      [0m[0m[0m[33mvm.createContext()[39m method.[0m[0m[0m
    * [0m[0m[0mReturns: {MessagePort}[0m[0m[0m

[0mTransfer a [33mMessagePort[39m to a different [34m[33mvm[39m[34m ([34m[4mvm.html[24m[39m[34m)[39m Context. The original [33mport[39m[0m
[0mobject will be rendered unusable, and the returned [33mMessagePort[39m instance will[0m
[0mtake its place.[0m

[0mThe returned [33mMessagePort[39m will be an object in the target context, and will[0m
[0minherit from its global [33mObject[39m class. Objects passed to the[0m
[0m[34m[33mport.onmessage()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/API/MessagePort/onmessage[24m[39m[34m)[39m listener will also be created in the target context[0m
[0mand inherit from its global [33mObject[39m class.[0m

[0mHowever, the created [33mMessagePort[39m will no longer inherit from[0m
[0m[34m[33mEventEmitter[39m[34m ([34m[4mevents.html[24m[39m[34m)[39m, and only [34m[33mport.onmessage()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/API/MessagePort/onmessage[24m[39m[34m)[39m can be used to receive[0m
[0mevents using it.[0m

[32m[1m## [33mworker.parentPort[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{null|MessagePort}[0m

[0mIf this thread was spawned as a [34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m, this will be a [34m[33mMessagePort[39m[34m ([34m[4m#worker_threads_class_messageport[24m[39m[34m)[39m[0m
[0mallowing communication with the parent thread. Messages sent using[0m
[0m[33mparentPort.postMessage()[39m will be available in the parent thread[0m
[0musing [33mworker.on('message')[39m, and messages sent from the parent thread[0m
[0musing [33mworker.postMessage()[39m will be available in this thread using[0m
[0m[33mparentPort.on('message')[39m.[0m

    [94mconst[39m [33m{[39m [37mWorker[39m[32m,[39m [37misMainThread[39m[32m,[39m [37mparentPort[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    
    [94mif[39m [90m([39m[37misMainThread[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mworker[39m [93m=[39m [31mnew[39m [37mWorker[39m[90m([39m[37m__filename[39m[90m)[39m[90m;[39m
      [37mworker[39m[32m.[39m[37monce[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmessage[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmessage[39m[90m)[39m[90m;[39m  [90m// Prints 'Hello, world!'.[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mworker[39m[32m.[39m[37mpostMessage[39m[90m([39m[92m'Hello, world!'[39m[90m)[39m[90m;[39m
    [33m}[39m [94melse[39m [33m{[39m
      [90m// When a message from the parent thread is received, send it back:[39m
      [37mparentPort[39m[32m.[39m[37monce[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmessage[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mparentPort[39m[32m.[39m[37mpostMessage[39m[90m([39m[37mmessage[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## [33mworker.receiveMessageOnPort(port)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[0m[0m[33mport[39m {MessagePort}[0m[0m[0m
    * [0m[0m[0mReturns: {Object|undefined}[0m[0m[0m

[0mReceive a single message from a given [33mMessagePort[39m. If no message is available,[0m
[0m[33mundefined[39m is returned, otherwise an object with a single [33mmessage[39m property[0m
[0mthat contains the message payload, corresponding to the oldest message in the[0m
[0m[33mMessagePort[39m’s queue.[0m

    [94mconst[39m [33m{[39m [37mMessageChannel[39m[32m,[39m [37mreceiveMessageOnPort[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mport1[39m[32m,[39m [37mport2[39m [33m}[39m [93m=[39m [31mnew[39m [37mMessageChannel[39m[90m([39m[90m)[39m[90m;[39m
    [37mport1[39m[32m.[39m[37mpostMessage[39m[90m([39m[33m{[39m [37mhello[39m[93m:[39m [92m'world'[39m [33m}[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mreceiveMessageOnPort[39m[90m([39m[37mport2[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: { message: { hello: 'world' } }[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mreceiveMessageOnPort[39m[90m([39m[37mport2[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: undefined[39m

[0mWhen this function is used, no [33m'message'[39m event will be emitted and the[0m
[0m[33monmessage[39m listener will not be invoked.[0m

[32m[1m## [33mworker.resourceLimits[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}
        * [0m[0m[33mmaxYoungGenerationSizeMb[39m {number}[0m[0m[0m
      [0m
        * [0m[0m[33mmaxOldGenerationSizeMb[39m {number}[0m[0m[0m
      [0m
        * [0m[0m[33mcodeRangeSizeMb[39m {number}[0m[0m[0m

[0mProvides the set of JS engine resource constraints inside this Worker thread.[0m
[0mIf the [33mresourceLimits[39m option was passed to the [34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m constructor,[0m
[0mthis matches its values.[0m

[0mIf this is used in the main thread, its value is an empty object.[0m

[32m[1m## [33mworker.SHARE_ENV[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.14.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{symbol}[0m

[0mA special value that can be passed as the [33menv[39m option of the [34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m[0m
[0mconstructor, to indicate that the current thread and the Worker thread should[0m
[0mshare read and write access to the same set of environment variables.[0m

    [94mconst[39m [33m{[39m [37mWorker[39m[32m,[39m [37mSHARE_ENV[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    [31mnew[39m [37mWorker[39m[90m([39m[92m'process.env.SET_IN_WORKER = "foo"'[39m[32m,[39m [33m{[39m [37meval[39m[93m:[39m [91mtrue[39m[32m,[39m [37menv[39m[93m:[39m [37mSHARE_ENV[39m [33m}[39m[90m)[39m
      [32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mSET_IN_WORKER[39m[90m)[39m[90m;[39m  [90m// Prints 'foo'.[39m
      [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mworker.threadId[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mAn integer identifier for the current thread. On the corresponding worker object[0m
[0m(if there is any), it is available as [34m[33mworker.threadId[39m[34m ([34m[4m#worker_threads_worker_threadid_1[24m[39m[34m)[39m.[0m
[0mThis value is unique for each [34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m instance inside a single process.[0m

[32m[1m## [33mworker.workerData[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn arbitrary JavaScript value that contains a clone of the data passed[0m
[0mto this thread’s [33mWorker[39m constructor.[0m

[0mThe data is cloned as if using [34m[33mpostMessage()[39m[34m ([34m[4m#worker_threads_port_postmessage_value_transferlist[24m[39m[34m)[39m,[0m
[0maccording to the [34mHTML structured clone algorithm ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm[24m[39m[34m)[39m.[0m

    [94mconst[39m [33m{[39m [37mWorker[39m[32m,[39m [37misMainThread[39m[32m,[39m [37mworkerData[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    
    [94mif[39m [90m([39m[37misMainThread[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mworker[39m [93m=[39m [31mnew[39m [37mWorker[39m[90m([39m[37m__filename[39m[32m,[39m [33m{[39m [37mworkerData[39m[93m:[39m [92m'Hello, world!'[39m [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m [94melse[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mworkerData[39m[90m)[39m[90m;[39m  [90m// Prints 'Hello, world!'.[39m
    [33m}[39m

[32m[1m## Class: [33mMessageChannel[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mInstances of the [33mworker.MessageChannel[39m class represent an asynchronous,[0m
[0mtwo-way communications channel.[0m
[0mThe [33mMessageChannel[39m has no methods of its own. [33mnew MessageChannel()[39m[0m
[0myields an object with [33mport1[39m and [33mport2[39m properties, which refer to linked[0m
[0m[34m[33mMessagePort[39m[34m ([34m[4m#worker_threads_class_messageport[24m[39m[34m)[39m instances.[0m

    [94mconst[39m [33m{[39m [37mMessageChannel[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [33m{[39m [37mport1[39m[32m,[39m [37mport2[39m [33m}[39m [93m=[39m [31mnew[39m [37mMessageChannel[39m[90m([39m[90m)[39m[90m;[39m
    [37mport1[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmessage[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'received'[39m[32m,[39m [37mmessage[39m[90m)[39m[90m)[39m[90m;[39m
    [37mport2[39m[32m.[39m[37mpostMessage[39m[90m([39m[33m{[39m [37mfoo[39m[93m:[39m [92m'bar'[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// Prints: received { foo: 'bar' } from the `port1.on('message')` listener[39m

[32m[1m## Class: [33mMessagePort[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {EventEmitter}[0m

[0mInstances of the [33mworker.MessagePort[39m class represent one end of an[0m
[0masynchronous, two-way communications channel. It can be used to transfer[0m
[0mstructured data, memory regions and other [33mMessagePort[39ms between different[0m
[0m[34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39ms.[0m

[0mWith the exception of [33mMessagePort[39ms being [34m[33mEventEmitter[39m[34m ([34m[4mevents.html[24m[39m[34m)[39ms rather[0m
[0mthan [34m[33mEventTarget[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/API/EventTarget[24m[39m[34m)[39ms, this implementation matches [34mbrowser [33mMessagePort[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/API/MessagePort[24m[39m[34m)[39ms.[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'close'[39m event is emitted once either side of the channel has been[0m
[0mdisconnected.[0m

    [94mconst[39m [33m{[39m [37mMessageChannel[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mport1[39m[32m,[39m [37mport2[39m [33m}[39m [93m=[39m [31mnew[39m [37mMessageChannel[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// Prints:[39m
    [90m//   foobar[39m
    [90m//   closed![39m
    [37mport2[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmessage[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmessage[39m[90m)[39m[90m)[39m[90m;[39m
    [37mport2[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'closed!'[39m[90m)[39m[90m)[39m[90m;[39m
    
    [37mport1[39m[32m.[39m[37mpostMessage[39m[90m([39m[92m'foobar'[39m[90m)[39m[90m;[39m
    [37mport1[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'message'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any} The transmitted value[0m

[0mThe [33m'message'[39m event is emitted for any incoming message, containing the cloned[0m
[0minput of [34m[33mport.postMessage()[39m[34m ([34m[4m#worker_threads_port_postmessage_value_transferlist[24m[39m[34m)[39m.[0m

[0mListeners on this event will receive a clone of the [33mvalue[39m parameter as passed[0m
[0mto [33mpostMessage()[39m and no further arguments.[0m

[32m[1m### [33mport.close()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mDisables further sending of messages on either side of the connection.[0m
[0mThis method can be called when no further communication will happen over this[0m
[0m[33mMessagePort[39m.[0m

[0mThe [34m[33m'close'[39m[34m event ([34m[4m#worker_threads_event_close[24m[39m[34m)[39m will be emitted on both [33mMessagePort[39m instances that[0m
[0mare part of the channel.[0m

[32m[1m### [33mport.postMessage(value[, transferList])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0m[33mtransferList[39m {Object[]}[0m

[0mSends a JavaScript value to the receiving side of this channel.[0m
[0m[33mvalue[39m will be transferred in a way which is compatible with[0m
[0mthe [34mHTML structured clone algorithm ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm[24m[39m[34m)[39m.[0m

[0mIn particular, the significant differences to [33mJSON[39m are:[0m

    * [0m[33mvalue[39m may contain circular references.[0m
    * [0m[33mvalue[39m may contain instances of builtin JS types such as [33mRegExp[39ms,[0m
      [0m[33mBigInt[39ms, [33mMap[39ms, [33mSet[39ms, etc.[0m
    * [0m[33mvalue[39m may contain typed arrays, both using [33mArrayBuffer[39ms[0m
      [0m and [33mSharedArrayBuffer[39ms.[0m
    * [0m[33mvalue[39m may contain [34m[33mWebAssembly.Module[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module[24m[39m[34m)[39m instances.[0m
    * [0m[33mvalue[39m may not contain native (C++-backed) objects other than [33mMessagePort[39ms.[0m

    [94mconst[39m [33m{[39m [37mMessageChannel[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mport1[39m[32m,[39m [37mport2[39m [33m}[39m [93m=[39m [31mnew[39m [37mMessageChannel[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mport1[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmessage[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmessage[39m[90m)[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcircularData[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [37mcircularData[39m[32m.[39m[37mfoo[39m [93m=[39m [37mcircularData[39m[90m;[39m
    [90m// Prints: { foo: [Circular] }[39m
    [37mport2[39m[32m.[39m[37mpostMessage[39m[90m([39m[37mcircularData[39m[90m)[39m[90m;[39m

[0m[33mtransferList[39m may be a list of [33mArrayBuffer[39m and [33mMessagePort[39m objects.[0m
[0mAfter transferring, they will not be usable on the sending side of the channel[0m
[0manymore (even if they are not contained in [33mvalue[39m). Unlike with[0m
[0m[34mchild processes ([34m[4mchild_process.html[24m[39m[34m)[39m, transferring handles such as network sockets is currently[0m
[0mnot supported.[0m

[0mIf [33mvalue[39m contains [34m[33mSharedArrayBuffer[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer[24m[39m[34m)[39m instances, those will be accessible[0m
[0mfrom either thread. They cannot be listed in [33mtransferList[39m.[0m

[0m[33mvalue[39m may still contain [33mArrayBuffer[39m instances that are not in[0m
[0m[33mtransferList[39m; in that case, the underlying memory is copied rather than moved.[0m

    [94mconst[39m [33m{[39m [37mMessageChannel[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mport1[39m[32m,[39m [37mport2[39m [33m}[39m [93m=[39m [31mnew[39m [37mMessageChannel[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mport1[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmessage[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmessage[39m[90m)[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37muint8Array[39m [93m=[39m [31mnew[39m [37mUint8Array[39m[90m([39m[33m[[39m [34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m4[39m [33m][39m[90m)[39m[90m;[39m
    [90m// This posts a copy of `uint8Array`:[39m
    [37mport2[39m[32m.[39m[37mpostMessage[39m[90m([39m[37muint8Array[39m[90m)[39m[90m;[39m
    [90m// This does not copy data, but renders `uint8Array` unusable:[39m
    [37mport2[39m[32m.[39m[37mpostMessage[39m[90m([39m[37muint8Array[39m[32m,[39m [33m[[39m [37muint8Array[39m[32m.[39m[37mbuffer[39m [33m][39m[90m)[39m[90m;[39m
    
    [90m// The memory for the `sharedUint8Array` will be accessible from both the[39m
    [90m// original and the copy received by `.on('message')`:[39m
    [94mconst[39m [37msharedUint8Array[39m [93m=[39m [31mnew[39m [37mUint8Array[39m[90m([39m[31mnew[39m [37mSharedArrayBuffer[39m[90m([39m[34m4[39m[90m)[39m[90m)[39m[90m;[39m
    [37mport2[39m[32m.[39m[37mpostMessage[39m[90m([39m[37msharedUint8Array[39m[90m)[39m[90m;[39m
    
    [90m// This transfers a freshly created message port to the receiver.[39m
    [90m// This can be used, for example, to create communication channels between[39m
    [90m// multiple `Worker` threads that are children of the same parent thread.[39m
    [94mconst[39m [37motherChannel[39m [93m=[39m [31mnew[39m [37mMessageChannel[39m[90m([39m[90m)[39m[90m;[39m
    [37mport2[39m[32m.[39m[37mpostMessage[39m[90m([39m[33m{[39m [37mport[39m[93m:[39m [37motherChannel[39m[32m.[39m[37mport1[39m [33m}[39m[32m,[39m [33m[[39m [37motherChannel[39m[32m.[39m[37mport1[39m [33m][39m[90m)[39m[90m;[39m

[0mBecause the object cloning uses the structured clone algorithm,[0m
[0mnon-enumerable properties, property accessors, and object prototypes are[0m
[0mnot preserved. In particular, [34m[33mBuffer[39m[34m ([34m[4mbuffer.html[24m[39m[34m)[39m objects will be read as[0m
[0mplain [34m[33mUint8Array[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array[24m[39m[34m)[39ms on the receiving side.[0m

[0mThe message object will be cloned immediately, and can be modified after[0m
[0mposting without having side effects.[0m

[0mFor more information on the serialization and deserialization mechanisms[0m
[0mbehind this API, see the [34mserialization API of the [33mv8[39m[34m module ([34m[4mv8.html#v8_serialization_api[24m[39m[34m)[39m.[0m

[32m[1m### [33mport.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mOpposite of [33munref()[39m. Calling [33mref()[39m on a previously [33munref()[39med port will[0m
[0m[3mnot[23m let the program exit if it's the only active handle left (the default[0m
[0mbehavior). If the port is [33mref()[39med, calling [33mref()[39m again will have no effect.[0m

[0mIf listeners are attached or removed using [33m.on('message')[39m, the port will[0m
[0mbe [33mref()[39med and [33munref()[39med automatically depending on whether[0m
[0mlisteners for the event exist.[0m

[32m[1m### [33mport.start()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mStarts receiving messages on this [33mMessagePort[39m. When using this port[0m
[0mas an event emitter, this will be called automatically once [33m'message'[39m[0m
[0mlisteners are attached.[0m

[0mThis method exists for parity with the Web [33mMessagePort[39m API. In Node.js,[0m
[0mit is only useful for ignoring messages when no event listener is present.[0m
[0mNode.js also diverges in its handling of [33m.onmessage[39m. Setting it will[0m
[0mautomatically call [33m.start()[39m, but unsetting it will let messages queue up[0m
[0muntil a new handler is set or the port is discarded.[0m

[32m[1m### [33mport.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCalling [33munref()[39m on a port will allow the thread to exit if this is the only[0m
[0mactive handle in the event system. If the port is already [33munref()[39med calling[0m
[0m[33munref()[39m again will have no effect.[0m

[0mIf listeners are attached or removed using [33m.on('message')[39m, the port will[0m
[0mbe [33mref()[39med and [33munref()[39med automatically depending on whether[0m
[0mlisteners for the event exist.[0m

[32m[1m## Class: [33mWorker[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {EventEmitter}[0m

[0mThe [33mWorker[39m class represents an independent JavaScript execution thread.[0m
[0mMost Node.js APIs are available inside of it.[0m

[0mNotable differences inside a Worker environment are:[0m

    * [0mThe [34m[33mprocess.stdin[39m[34m ([34m[4mprocess.html#process_process_stdin[24m[39m[34m)[39m, [34m[33mprocess.stdout[39m[34m ([34m[4mprocess.html#process_process_stdout[24m[39m[34m)[39m and [34m[33mprocess.stderr[39m[34m ([34m[4mprocess.html#process_process_stderr[24m[39m[34m)[39m[0m
      [0mmay be redirected by the parent thread.[0m
    * [0mThe [34m[33mrequire('worker_threads').isMainThread[39m[34m ([34m[4m#worker_threads_worker_ismainthread[24m[39m[34m)[39m property is set to [33mfalse[39m.[0m
    * [0mThe [34m[33mrequire('worker_threads').parentPort[39m[34m ([34m[4m#worker_threads_worker_parentport[24m[39m[34m)[39m message port is available.[0m
    * [0m[34m[33mprocess.exit()[39m[34m ([34m[4mprocess.html#process_process_exit_code[24m[39m[34m)[39m does not stop the whole program, just the single thread,[0m
      [0mand [34m[33mprocess.abort()[39m[34m ([34m[4mprocess.html#process_process_abort[24m[39m[34m)[39m is not available.[0m
    * [0m[34m[33mprocess.chdir()[39m[34m ([34m[4mprocess.html#process_process_chdir_directory[24m[39m[34m)[39m and [33mprocess[39m methods that set group or user ids[0m
      [0mare not available.[0m
    * [0m[34m[33mprocess.env[39m[34m ([34m[4mprocess.html#process_process_env[24m[39m[34m)[39m is a copy of the parent thread's environment variables,[0m
      [0munless otherwise specified. Changes to one copy will not be visible in other[0m
      [0mthreads, and will not be visible to native add-ons (unless[0m
      [0m[34m[33mworker.SHARE_ENV[39m[34m ([34m[4m#worker_threads_worker_share_env[24m[39m[34m)[39m has been passed as the [33menv[39m option to the[0m
      [0m[34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m constructor).[0m
    * [0m[34m[33mprocess.title[39m[34m ([34m[4mprocess.html#process_process_title[24m[39m[34m)[39m cannot be modified.[0m
    * [0mSignals will not be delivered through [34m[33mprocess.on('...')[39m[34m ([34m[4mprocess.html#process_signal_events[24m[39m[34m)[39m.[0m
    * [0mExecution may stop at any point as a result of [34m[33mworker.terminate()[39m[34m ([34m[4m#worker_threads_worker_terminate[24m[39m[34m)[39m[0m
      [0mbeing invoked.[0m
    * [0mIPC channels from parent processes are not accessible.[0m
    * [0mThe [34m[33mtrace_events[39m[34m ([34m[4mtracing.html[24m[39m[34m)[39m module is not supported.[0m
    * [0mNative add-ons can only be loaded from multiple threads if they fulfill[0m
      [0m[34mcertain conditions ([34m[4maddons.html#addons_worker_support[24m[39m[34m)[39m.[0m

[0mCreating [33mWorker[39m instances inside of other [33mWorker[39ms is possible.[0m

[0mLike [34mWeb Workers ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API[24m[39m[34m)[39m and the [34m[33mcluster[39m[34m module ([34m[4mcluster.html[24m[39m[34m)[39m, two-way communication can be[0m
[0machieved through inter-thread message passing. Internally, a [33mWorker[39m has a[0m
[0mbuilt-in pair of [34m[33mMessagePort[39m[34m ([34m[4m#worker_threads_class_messageport[24m[39m[34m)[39ms that are already associated with each other[0m
[0mwhen the [33mWorker[39m is created. While the [33mMessagePort[39m object on the parent side[0m
[0mis not directly exposed, its functionalities are exposed through[0m
[0m[34m[33mworker.postMessage()[39m[34m ([34m[4m#worker_threads_worker_postmessage_value_transferlist[24m[39m[34m)[39m and the [34m[33mworker.on('message')[39m[34m ([34m[4m#worker_threads_event_message_1[24m[39m[34m)[39m event[0m
[0mon the [33mWorker[39m object for the parent thread.[0m

[0mTo create custom messaging channels (which is encouraged over using the default[0m
[0mglobal channel because it facilitates separation of concerns), users can create[0m
[0ma [33mMessageChannel[39m object on either thread and pass one of the[0m
[0m[33mMessagePort[39ms on that [33mMessageChannel[39m to the other thread through a[0m
[0mpre-existing channel, such as the global one.[0m

[0mSee [34m[33mport.postMessage()[39m[34m ([34m[4m#worker_threads_port_postmessage_value_transferlist[24m[39m[34m)[39m for more information on how messages are passed,[0m
[0mand what kind of JavaScript values can be successfully transported through[0m
[0mthe thread barrier.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m
      [37mWorker[39m[32m,[39m [37mMessageChannel[39m[32m,[39m [37mMessagePort[39m[32m,[39m [37misMainThread[39m[32m,[39m [37mparentPort[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    [94mif[39m [90m([39m[37misMainThread[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mworker[39m [93m=[39m [31mnew[39m [37mWorker[39m[90m([39m[37m__filename[39m[90m)[39m[90m;[39m
      [94mconst[39m [37msubChannel[39m [93m=[39m [31mnew[39m [37mMessageChannel[39m[90m([39m[90m)[39m[90m;[39m
      [37mworker[39m[32m.[39m[37mpostMessage[39m[90m([39m[33m{[39m [37mhereIsYourPort[39m[93m:[39m [37msubChannel[39m[32m.[39m[37mport1[39m [33m}[39m[32m,[39m [33m[[39m[37msubChannel[39m[32m.[39m[37mport1[39m[33m][39m[90m)[39m[90m;[39m
      [37msubChannel[39m[32m.[39m[37mport2[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mvalue[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'received:'[39m[32m,[39m [37mvalue[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m [94melse[39m [33m{[39m
      [37mparentPort[39m[32m.[39m[37monce[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mvalue[39m[90m)[39m [93m=>[39m [33m{[39m
        [37massert[39m[90m([39m[37mvalue[39m[32m.[39m[37mhereIsYourPort[39m [94minstanceof[39m [37mMessagePort[39m[90m)[39m[90m;[39m
        [37mvalue[39m[32m.[39m[37mhereIsYourPort[39m[32m.[39m[37mpostMessage[39m[90m([39m[92m'the worker is sending this'[39m[90m)[39m[90m;[39m
        [37mvalue[39m[32m.[39m[37mhereIsYourPort[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m### [33mnew Worker(filename[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32278[39m
[90m    description: The `transferList` option was introduced.[39m
[90m  - version: v13.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31664[39m
[90m    description: The `filename` parameter can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol.[39m
[90m  - version: v13.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26628[39m
[90m    description: The `resourceLimits` option was introduced.[39m
[90m  - version: v13.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30559[39m
[90m    description: The `argv` option was introduced.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfilename[39m {string|URL} The path to the Worker’s main script or module. Must[0m
      [0mbe either an absolute path or a relative path (i.e. relative to the[0m
      [0mcurrent working directory) starting with [33m./[39m or [33m../[39m, or a WHATWG [33mURL[39m[0m
      [0mobject using [33mfile:[39m protocol.[0m
      [0mIf [33moptions.eval[39m is [33mtrue[39m, this is a string containing JavaScript code[0m
      [0mrather than a path.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33margv[39m {any[]} List of arguments which would be stringified and appended to[0m[0m[0m
      [0m      [0m[0m[33mprocess.argv[39m in the worker. This is mostly similar to the [33mworkerData[39m[0m[0m[0m
      [0m      [0m[0mbut the values will be available on the global [33mprocess.argv[39m as if they[0m[0m[0m
      [0m      [0m[0mwere passed as CLI options to the script.[0m[0m[0m
      [0m
        * [0m[0m[33menv[39m {Object} If set, specifies the initial value of [33mprocess.env[39m inside[0m[0m[0m
      [0m      [0m[0mthe Worker thread. As a special value, [34m[33mworker.SHARE_ENV[39m[34m ([34m[4m#worker_threads_worker_share_env[24m[39m[34m)[39m may be used[0m[0m[0m
      [0m      [0m[0mto specify that the parent thread and the child thread should share their[0m[0m[0m
      [0m      [0m[0menvironment variables; in that case, changes to one thread’s [33mprocess.env[39m[0m[0m[0m
      [0m      [0m[0mobject will affect the other thread as well. [1mDefault:[22m [33mprocess.env[39m.[0m[0m[0m
      [0m
        * [0m[0m[33meval[39m {boolean} If [33mtrue[39m and the first argument is a [33mstring[39m, interpret[0m[0m[0m
      [0m      [0m[0mthe first argument to the constructor as a script that is executed once the[0m[0m[0m
      [0m      [0m[0mworker is online.[0m[0m[0m
      [0m
        * [0m[0m[33mexecArgv[39m {string[]} List of node CLI options passed to the worker.[0m[0m[0m
      [0m      [0m[0mV8 options (such as [33m--max-old-space-size[39m) and options that affect the[0m[0m[0m
      [0m      [0m[0mprocess (such as [33m--title[39m) are not supported. If set, this will be provided[0m[0m[0m
      [0m      [0m[0mas [34m[33mprocess.execArgv[39m[34m ([34m[4mprocess.html#process_process_execargv[24m[39m[34m)[39m inside the worker. By default, options will be[0m[0m[0m
      [0m      [0m[0minherited from the parent thread.[0m[0m[0m
      [0m
        * [0m[0m[33mstdin[39m {boolean} If this is set to [33mtrue[39m, then [33mworker.stdin[39m will[0m[0m[0m
      [0m      [0m[0mprovide a writable stream whose contents will appear as [33mprocess.stdin[39m[0m[0m[0m
      [0m      [0m[0minside the Worker. By default, no data is provided.[0m[0m[0m
      [0m
        * [0m[0m[33mstdout[39m {boolean} If this is set to [33mtrue[39m, then [33mworker.stdout[39m will[0m[0m[0m
      [0m      [0m[0mnot automatically be piped through to [33mprocess.stdout[39m in the parent.[0m[0m[0m
      [0m
        * [0m[0m[33mstderr[39m {boolean} If this is set to [33mtrue[39m, then [33mworker.stderr[39m will[0m[0m[0m
      [0m      [0m[0mnot automatically be piped through to [33mprocess.stderr[39m in the parent.[0m[0m[0m
      [0m
        * [0m[0m[33mworkerData[39m {any} Any JavaScript value that will be cloned and made[0m[0m[0m
      [0m      [0m[0mavailable as [34m[33mrequire('worker_threads').workerData[39m[34m ([34m[4m#worker_threads_worker_workerdata[24m[39m[34m)[39m. The cloning will[0m[0m[0m
      [0m      [0m[0moccur as described in the [34mHTML structured clone algorithm ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm[24m[39m[34m)[39m, and an error[0m[0m[0m
      [0m      [0m[0mwill be thrown if the object cannot be cloned (e.g. because it contains[0m[0m[0m
      [0m      [0m[0m[33mfunction[39ms).[0m[0m[0m
      [0m
        * [0m[0m[33mresourceLimits[39m {Object} An optional set of resource limits for the new[0m[0m[0m
      [0m      [0m[0mJS engine instance. Reaching these limits will lead to termination of the[0m[0m[0m
      [0m      [0m[0m[33mWorker[39m instance. These limits only affect the JS engine, and no external[0m[0m[0m
      [0m      [0m[0mdata, including no [33mArrayBuffer[39ms. Even if these limits are set, the process[0m[0m[0m
      [0m      [0m[0mmay still abort if it encounters a global out-of-memory situation.[0m
      [0m
            * [0m[0m[0m[0m[33mmaxOldGenerationSizeMb[39m {number} The maximum size of the main heap in MB.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mmaxYoungGenerationSizeMb[39m {number} The maximum size of a heap space for[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mrecently created objects.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mcodeRangeSizeMb[39m {number} The size of a pre-allocated memory range[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mused for generated code.[0m[0m[0m[0m[0m[0m[0m

[32m[1m### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merr[39m {Error}[0m

[0mThe [33m'error'[39m event is emitted if the worker thread throws an uncaught[0m
[0mexception. In that case, the worker will be terminated.[0m

[32m[1m### Event: [33m'exit'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mexitCode[39m {integer}[0m

[0mThe [33m'exit'[39m event is emitted once the worker has stopped. If the worker[0m
[0mexited by calling [34m[33mprocess.exit()[39m[34m ([34m[4mprocess.html#process_process_exit_code[24m[39m[34m)[39m, the [33mexitCode[39m parameter will be the[0m
[0mpassed exit code. If the worker was terminated, the [33mexitCode[39m parameter will[0m
[0mbe [33m1[39m.[0m

[0mThis is the final event emitted by any [33mWorker[39m instance.[0m

[32m[1m### Event: [33m'message'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any} The transmitted value[0m

[0mThe [33m'message'[39m event is emitted when the worker thread has invoked[0m
[0m[34m[33mrequire('worker_threads').parentPort.postMessage()[39m[34m ([34m[4m#worker_threads_worker_postmessage_value_transferlist[24m[39m[34m)[39m.[0m
[0mSee the [34m[33mport.on('message')[39m[34m ([34m[4m#worker_threads_event_message[24m[39m[34m)[39m event for more details.[0m

[0mAll messages sent from the worker thread will be emitted before the[0m
[0m[34m[33m'exit'[39m[34m event ([34m[4m#worker_threads_event_exit[24m[39m[34m)[39m is emitted on the [33mWorker[39m object.[0m

[32m[1m### Event: [33m'online'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'online'[39m event is emitted when the worker thread has started executing[0m
[0mJavaScript code.[0m

[32m[1m### [33mworker.getHeapSnapshot()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Promise} A promise for a Readable Stream containing[0m
      [0ma V8 heap snapshot[0m

[0mReturns a readable stream for a V8 snapshot of the current state of the Worker.[0m
[0mSee [34m[33mv8.getHeapSnapshot()[39m[34m ([34m[4mv8.html#v8_v8_getheapsnapshot[24m[39m[34m)[39m for more details.[0m

[0mIf the Worker thread is no longer running, which may occur before the[0m
[0m[34m[33m'exit'[39m[34m event ([34m[4m#worker_threads_event_exit[24m[39m[34m)[39m is emitted, the returned [33mPromise[39m will be rejected[0m
[0mimmediately with an [34m[33mERR_WORKER_NOT_RUNNING[39m[34m ([34m[4merrors.html#ERR_WORKER_NOT_RUNNING[24m[39m[34m)[39m error.[0m

[32m[1m### [33mworker.postMessage(value[, transferList])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0m[33mtransferList[39m {Object[]}[0m

[0mSend a message to the worker that will be received via[0m
[0m[34m[33mrequire('worker_threads').parentPort.on('message')[39m[34m ([34m[4m#worker_threads_event_message[24m[39m[34m)[39m.[0m
[0mSee [34m[33mport.postMessage()[39m[34m ([34m[4m#worker_threads_port_postmessage_value_transferlist[24m[39m[34m)[39m for more details.[0m

[32m[1m### [33mworker.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mOpposite of [33munref()[39m, calling [33mref()[39m on a previously [33munref()[39med worker will[0m
[0m[3mnot[23m let the program exit if it's the only active handle left (the default[0m
[0mbehavior). If the worker is [33mref()[39med, calling [33mref()[39m again will have[0m
[0mno effect.[0m

[32m[1m### [33mworker.resourceLimits[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}
        * [0m[0m[33mmaxYoungGenerationSizeMb[39m {number}[0m[0m[0m
      [0m
        * [0m[0m[33mmaxOldGenerationSizeMb[39m {number}[0m[0m[0m
      [0m
        * [0m[0m[33mcodeRangeSizeMb[39m {number}[0m[0m[0m

[0mProvides the set of JS engine resource constraints for this Worker thread.[0m
[0mIf the [33mresourceLimits[39m option was passed to the [34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m constructor,[0m
[0mthis matches its values.[0m

[0mIf the worker has stopped, the return value is an empty object.[0m

[32m[1m### [33mworker.stderr[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{stream.Readable}[0m

[0mThis is a readable stream which contains data written to [34m[33mprocess.stderr[39m[34m ([34m[4mprocess.html#process_process_stderr[24m[39m[34m)[39m[0m
[0minside the worker thread. If [33mstderr: true[39m was not passed to the[0m
[0m[34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m constructor, then data will be piped to the parent thread's[0m
[0m[34m[33mprocess.stderr[39m[34m ([34m[4mprocess.html#process_process_stderr[24m[39m[34m)[39m stream.[0m

[32m[1m### [33mworker.stdin[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{null|stream.Writable}[0m

[0mIf [33mstdin: true[39m was passed to the [34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m constructor, this is a[0m
[0mwritable stream. The data written to this stream will be made available in[0m
[0mthe worker thread as [34m[33mprocess.stdin[39m[34m ([34m[4mprocess.html#process_process_stdin[24m[39m[34m)[39m.[0m

[32m[1m### [33mworker.stdout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{stream.Readable}[0m

[0mThis is a readable stream which contains data written to [34m[33mprocess.stdout[39m[34m ([34m[4mprocess.html#process_process_stdout[24m[39m[34m)[39m[0m
[0minside the worker thread. If [33mstdout: true[39m was not passed to the[0m
[0m[34m[33mWorker[39m[34m ([34m[4m#worker_threads_class_worker[24m[39m[34m)[39m constructor, then data will be piped to the parent thread's[0m
[0m[34m[33mprocess.stdout[39m[34m ([34m[4mprocess.html#process_process_stdout[24m[39m[34m)[39m stream.[0m

[32m[1m### [33mworker.terminate()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90mchanges:[39m
[90m  - version: v12.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28021[39m
[90m    description: This function now returns a Promise.[39m
[90m                 Passing a callback is deprecated, and was useless up to this[39m
[90m                 version, as the Worker was actually terminated synchronously.[39m
[90m                 Terminating is now a fully asynchronous operation.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Promise}[0m

[0mStop all JavaScript execution in the worker thread as soon as possible.[0m
[0mReturns a Promise for the exit code that is fulfilled when the[0m
[0m[34m[33m'exit'[39m[34m event ([34m[4m#worker_threads_event_exit[24m[39m[34m)[39m is emitted.[0m

[32m[1m### [33mworker.threadId[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mAn integer identifier for the referenced thread. Inside the worker thread,[0m
[0mit is available as [34m[33mrequire('worker_threads').threadId[39m[34m ([34m[4m#worker_threads_worker_threadid[24m[39m[34m)[39m.[0m
[0mThis value is unique for each [33mWorker[39m instance inside a single process.[0m

[32m[1m### [33mworker.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCalling [33munref()[39m on a worker will allow the thread to exit if this is the only[0m
[0mactive handle in the event system. If the worker is already [33munref()[39med calling[0m
[0m[33munref()[39m again will have no effect.[0m

