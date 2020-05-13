[35m[4m[1m# Events[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[90m<!--type=module-->[39m
[90m[39m
[90m[39m[0mMuch of the Node.js core API is built around an idiomatic asynchronous[0m
[0mevent-driven architecture in which certain kinds of objects (called "emitters")[0m
[0memit named events that cause [33mFunction[39m objects ("listeners") to be called.[0m

[0mFor instance: a [34m[33mnet.Server[39m[34m ([34m[4mnet.html#net_class_net_server[24m[39m[34m)[39m object emits an event each time a peer[0m
[0mconnects to it; a [34m[33mfs.ReadStream[39m[34m ([34m[4mfs.html#fs_class_fs_readstream[24m[39m[34m)[39m emits an event when the file is opened;[0m
[0ma [34mstream ([34m[4mstream.html[24m[39m[34m)[39m emits an event whenever data is available to be read.[0m

[0mAll objects that emit events are instances of the [33mEventEmitter[39m class. These[0m
[0mobjects expose an [33meventEmitter.on()[39m function that allows one or more[0m
[0mfunctions to be attached to named events emitted by the object. Typically,[0m
[0mevent names are camel-cased strings but any valid JavaScript property key[0m
[0mcan be used.[0m

[0mWhen the [33mEventEmitter[39m object emits an event, all of the functions attached[0m
[0mto that specific event are called [3msynchronously[23m. Any values returned by the[0m
[0mcalled listeners are [3mignored[23m and will be discarded.[0m

[0mThe following example shows a simple [33mEventEmitter[39m instance with a single[0m
[0mlistener. The [33meventEmitter.on()[39m method is used to register listeners, while[0m
[0mthe [33meventEmitter.emit()[39m method is used to trigger the event.[0m

    [94mconst[39m [37mEventEmitter[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyEmitter[39m [94mextends[39m [37mEventEmitter[39m [33m{[39m[33m}[39m
    
    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'an event occurred!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[90m)[39m[90m;[39m

[32m[1m## Passing arguments and [33mthis[39m[32m to listeners[22m[39m

[0mThe [33meventEmitter.emit()[39m method allows an arbitrary set of arguments to be[0m
[0mpassed to the listener functions. Keep in mind that when[0m
[0man ordinary listener function is called, the standard [33mthis[39m keyword[0m
[0mis intentionally set to reference the [33mEventEmitter[39m instance to which the[0m
[0mlistener is attached.[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [94mfunction[39m[90m([39m[37ma[39m[32m,[39m [37mb[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37ma[39m[32m,[39m [37mb[39m[32m,[39m [91mthis[39m[32m,[39m [91mthis[39m [93m===[39m [37mmyEmitter[39m[90m)[39m[90m;[39m
      [90m// Prints:[39m
      [90m//   a b MyEmitter {[39m
      [90m//     domain: null,[39m
      [90m//     _events: { event: [Function] },[39m
      [90m//     _eventsCount: 1,[39m
      [90m//     _maxListeners: undefined } true[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[32m,[39m [92m'a'[39m[32m,[39m [92m'b'[39m[90m)[39m[90m;[39m

[0mIt is possible to use ES6 Arrow Functions as listeners, however, when doing so,[0m
[0mthe [33mthis[39m keyword will no longer reference the [33mEventEmitter[39m instance:[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[37ma[39m[32m,[39m [37mb[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37ma[39m[32m,[39m [37mb[39m[32m,[39m [91mthis[39m[90m)[39m[90m;[39m
      [90m// Prints: a b {}[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[32m,[39m [92m'a'[39m[32m,[39m [92m'b'[39m[90m)[39m[90m;[39m

[32m[1m## Asynchronous vs. Synchronous[22m[39m

[0mThe [33mEventEmitter[39m calls all listeners synchronously in the order in which[0m
[0mthey were registered. This ensures the proper sequencing of[0m
[0mevents and helps avoid race conditions and logic errors. When appropriate,[0m
[0mlistener functions can switch to an asynchronous mode of operation using[0m
[0mthe [33msetImmediate()[39m or [33mprocess.nextTick()[39m methods:[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[37ma[39m[32m,[39m [37mb[39m[90m)[39m [93m=>[39m [33m{[39m
      [37msetImmediate[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'this happens asynchronously'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[32m,[39m [92m'a'[39m[32m,[39m [92m'b'[39m[90m)[39m[90m;[39m

[32m[1m## Handling events only once[22m[39m

[0mWhen a listener is registered using the [33meventEmitter.on()[39m method, that[0m
[0mlistener will be invoked [3mevery time[23m the named event is emitted.[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [94mlet[39m [37mm[39m [93m=[39m [34m0[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[93m++[39m[37mm[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[90m)[39m[90m;[39m
    [90m// Prints: 1[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[90m)[39m[90m;[39m
    [90m// Prints: 2[39m

[0mUsing the [33meventEmitter.once()[39m method, it is possible to register a listener[0m
[0mthat is called at most once for a particular event. Once the event is emitted,[0m
[0mthe listener is unregistered and [3mthen[23m called.[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [94mlet[39m [37mm[39m [93m=[39m [34m0[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37monce[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[93m++[39m[37mm[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[90m)[39m[90m;[39m
    [90m// Prints: 1[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[90m)[39m[90m;[39m
    [90m// Ignored[39m

[32m[1m## Error events[22m[39m

[0mWhen an error occurs within an [33mEventEmitter[39m instance, the typical action is[0m
[0mfor an [33m'error'[39m event to be emitted. These are treated as special cases[0m
[0mwithin Node.js.[0m

[0mIf an [33mEventEmitter[39m does [3mnot[23m have at least one listener registered for the[0m
[0m[33m'error'[39m event, and an [33m'error'[39m event is emitted, the error is thrown, a[0m
[0mstack trace is printed, and the Node.js process exits.[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'error'[39m[32m,[39m [31mnew[39m [37mError[39m[90m([39m[92m'whoops!'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws and crashes Node.js[39m

[0mTo guard against crashing the Node.js process the [34m[33mdomain[39m[34m ([34m[4mdomain.html[24m[39m[34m)[39m module can be[0m
[0mused. (Note, however, that the [33mdomain[39m module is deprecated.)[0m

[0mAs a best practice, listeners should always be added for the [33m'error'[39m events.[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'whoops! there was an error'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'error'[39m[32m,[39m [31mnew[39m [37mError[39m[90m([39m[92m'whoops!'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: whoops! there was an error[39m

[0mIt is possible to monitor [33m'error'[39m events without consuming the emitted error[0m
[0mby installing a listener using the symbol [33merrorMonitor[39m.[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[37mEventEmitter[39m[32m.[39m[37merrorMonitor[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mMyMonitoringTool[39m[32m.[39m[34mlog[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'error'[39m[32m,[39m [31mnew[39m [37mError[39m[90m([39m[92m'whoops!'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Still throws and crashes Node.js[39m

[32m[1m## Capture Rejections of Promises[22m[39m

[90m[3m    [0mStability: 1 - captureRejections is experimental.[0m[23m[39m

[0mUsing [33masync[39m functions with event handlers is problematic, because it[0m
[0mcan lead to an unhandled rejection in case of a thrown exception:[0m

    [94mconst[39m [37mee[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mee[39m[32m.[39m[37mon[39m[90m([39m[92m'something'[39m[32m,[39m [37masync[39m [90m([39m[37mvalue[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'kaboom'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mcaptureRejections[39m option in the [33mEventEmitter[39m constructor or the global[0m
[0msetting change this behavior, installing a [33m.then(undefined, handler)[39m[0m
[0mhandler on the [33mPromise[39m. This handler routes the exception[0m
[0masynchronously to the [34m[33mSymbol.for('nodejs.rejection')[39m[34m ([34m[4m#events_emitter_symbol_for_nodejs_rejection_err_eventname_args[24m[39m[34m)[39m method[0m
[0mif there is one, or to [34m[33m'error'[39m[34m ([34m[4m#events_error_events[24m[39m[34m)[39m event handler if there is none.[0m

    [94mconst[39m [37mee1[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[33m{[39m [37mcaptureRejections[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    [37mee1[39m[32m.[39m[37mon[39m[90m([39m[92m'something'[39m[32m,[39m [37masync[39m [90m([39m[37mvalue[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'kaboom'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mee1[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mee2[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[33m{[39m [37mcaptureRejections[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    [37mee2[39m[32m.[39m[37mon[39m[90m([39m[92m'something'[39m[32m,[39m [37masync[39m [90m([39m[37mvalue[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'kaboom'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mee2[39m[33m[[39m[37mSymbol[39m[32m.[39m[94mfor[39m[90m([39m[92m'nodejs.rejection'[39m[90m)[39m[33m][39m [93m=[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m;[39m

[0mSetting [33mEventEmitter.captureRejections = true[39m will change the default for all[0m
[0mnew instances of [33mEventEmitter[39m.[0m

    [37mEventEmitter[39m[32m.[39m[37mcaptureRejections[39m [93m=[39m [91mtrue[39m[90m;[39m
    [94mconst[39m [37mee1[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mee1[39m[32m.[39m[37mon[39m[90m([39m[92m'something'[39m[32m,[39m [37masync[39m [90m([39m[37mvalue[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'kaboom'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mee1[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m)[39m[90m;[39m

[0mThe [33m'error'[39m events that are generated by the [33mcaptureRejections[39m behavior[0m
[0mdo not have a catch handler to avoid infinite error loops: the[0m
[0mrecommendation is to [1mnot use [33masync[39m functions as [33m'error'[39m event handlers[22m.[0m

[32m[1m## Class: [33mEventEmitter[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.26[39m
[90mchanges:[39m
[90m  - version: v13.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27867[39m
[90m    description: Added captureRejections option.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mEventEmitter[39m class is defined and exposed by the [33mevents[39m module:[0m

    [94mconst[39m [37mEventEmitter[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m

[0mAll [33mEventEmitter[39ms emit the event [33m'newListener'[39m when new listeners are[0m
[0madded and [33m'removeListener'[39m when existing listeners are removed.[0m

[0mIt supports the following option:[0m

    * [0m[33mcaptureRejections[39m {boolean} It enables[0m
      [0m[34mautomatic capturing of promise rejection ([34m[4m#events_capture_rejections_of_promises[24m[39m[34m)[39m.[0m
      [0mDefault: [33mfalse[39m.[0m

[32m[1m### Event: [33m'newListener'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.26[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol} The name of the event being listened for[0m
    * [0m[33mlistener[39m {Function} The event handler function[0m

[0mThe [33mEventEmitter[39m instance will emit its own [33m'newListener'[39m event [3mbefore[23m[0m
[0ma listener is added to its internal array of listeners.[0m

[0mListeners registered for the [33m'newListener'[39m event will be passed the event[0m
[0mname and a reference to the listener being added.[0m

[0mThe fact that the event is triggered before adding the listener has a subtle[0m
[0mbut important side effect: any [3madditional[23m listeners registered to the same[0m
[0m[33mname[39m [3mwithin[23m the [33m'newListener'[39m callback will be inserted [3mbefore[23m the[0m
[0mlistener that is in the process of being added.[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [90m// Only do this once so we don't loop forever[39m
    [37mmyEmitter[39m[32m.[39m[37monce[39m[90m([39m[92m'newListener'[39m[32m,[39m [90m([39m[37mevent[39m[32m,[39m [37mlistener[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mevent[39m [93m===[39m [92m'event'[39m[90m)[39m [33m{[39m
        [90m// Insert a new listener in front[39m
        [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'B'[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'A'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[90m)[39m[90m;[39m
    [90m// Prints:[39m
    [90m//   B[39m
    [90m//   A[39m

[32m[1m### Event: [33m'removeListener'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.3[39m
[90mchanges:[39m
[90m  - version: v6.1.0, v4.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6394[39m
[90m    description: For listeners attached using `.once()`, the `listener` argument[39m
[90m                 now yields the original listener function.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol} The event name[0m
    * [0m[33mlistener[39m {Function} The event handler function[0m

[0mThe [33m'removeListener'[39m event is emitted [3mafter[23m the [33mlistener[39m is removed.[0m

[32m[1m### [33mEventEmitter.listenerCount(emitter, eventName)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.12[39m
[90mdeprecated: v4.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33memitter.listenerCount()[39m[90m[34m ([34m[4m#events_emitter_listenercount_eventname[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m[33memitter[39m {EventEmitter} The emitter to query[0m
    * [0m[33meventName[39m {string|symbol} The event name[0m

[0mA class method that returns the number of listeners for the given [33meventName[39m[0m
[0mregistered on the given [33memitter[39m.[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mEventEmitter[39m[32m.[39m[37mlistenerCount[39m[90m([39m[37mmyEmitter[39m[32m,[39m [92m'event'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 2[39m

[32m[1m### [33mEventEmitter.defaultMaxListeners[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mBy default, a maximum of [33m10[39m listeners can be registered for any single[0m
[0mevent. This limit can be changed for individual [33mEventEmitter[39m instances[0m
[0musing the [34m[33memitter.setMaxListeners(n)[39m[34m ([34m[4m#events_emitter_setmaxlisteners_n[24m[39m[34m)[39m method. To change the default[0m
[0mfor [3mall[23m [33mEventEmitter[39m instances, the [33mEventEmitter.defaultMaxListeners[39m[0m
[0mproperty can be used. If this value is not a positive number, a [33mTypeError[39m[0m
[0mwill be thrown.[0m

[0mTake caution when setting the [33mEventEmitter.defaultMaxListeners[39m because the[0m
[0mchange affects [3mall[23m [33mEventEmitter[39m instances, including those created before[0m
[0mthe change is made. However, calling [34m[33memitter.setMaxListeners(n)[39m[34m ([34m[4m#events_emitter_setmaxlisteners_n[24m[39m[34m)[39m still has[0m
[0mprecedence over [33mEventEmitter.defaultMaxListeners[39m.[0m

[0mThis is not a hard limit. The [33mEventEmitter[39m instance will allow[0m
[0mmore listeners to be added but will output a trace warning to stderr indicating[0m
[0mthat a "possible EventEmitter memory leak" has been detected. For any single[0m
[0m[33mEventEmitter[39m, the [33memitter.getMaxListeners()[39m and [33memitter.setMaxListeners()[39m[0m
[0mmethods can be used to temporarily avoid this warning:[0m

    [37memitter[39m[32m.[39m[37msetMaxListeners[39m[90m([39m[37memitter[39m[32m.[39m[37mgetMaxListeners[39m[90m([39m[90m)[39m [93m+[39m [34m1[39m[90m)[39m[90m;[39m
    [37memitter[39m[32m.[39m[37monce[39m[90m([39m[92m'event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// do stuff[39m
      [37memitter[39m[32m.[39m[37msetMaxListeners[39m[90m([39m[37mMath[39m[32m.[39m[37mmax[39m[90m([39m[37memitter[39m[32m.[39m[37mgetMaxListeners[39m[90m([39m[90m)[39m [93m-[39m [34m1[39m[32m,[39m [34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [34m[33m--trace-warnings[39m[34m ([34m[4mcli.html#cli_trace_warnings[24m[39m[34m)[39m command line flag can be used to display the[0m
[0mstack trace for such warnings.[0m

[0mThe emitted warning can be inspected with [34m[33mprocess.on('warning')[39m[34m ([34m[4mprocess.html#process_event_warning[24m[39m[34m)[39m and will[0m
[0mhave the additional [33memitter[39m, [33mtype[39m and [33mcount[39m properties, referring to[0m
[0mthe event emitter instance, the event’s name and the number of attached[0m
[0mlisteners, respectively.[0m
[0mIts [33mname[39m property is set to [33m'MaxListenersExceededWarning'[39m.[0m

[32m[1m### [33mEventEmitter.errorMonitor[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis symbol shall be used to install a listener for only monitoring [33m'error'[39m[0m
[0mevents. Listeners installed using this symbol are called before the regular[0m
[0m[33m'error'[39m listeners are called.[0m

[0mInstalling a listener using this symbol does not change the behavior once an[0m
[0m[33m'error'[39m event is emitted, therefore the process will still crash if no[0m
[0mregular [33m'error'[39m listener is installed.[0m

[32m[1m### [33memitter.addListener(eventName, listener)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.26[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol}[0m
    * [0m[33mlistener[39m {Function}[0m

[0mAlias for [33memitter.on(eventName, listener)[39m.[0m

[32m[1m### [33memitter.emit(eventName[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.26[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol}[0m
    * [0m[33m...args[39m {any}[0m
    * [0mReturns: {boolean}[0m

[0mSynchronously calls each of the listeners registered for the event named[0m
[0m[33meventName[39m, in the order they were registered, passing the supplied arguments[0m
[0mto each.[0m

[0mReturns [33mtrue[39m if the event had listeners, [33mfalse[39m otherwise.[0m

    [94mconst[39m [37mEventEmitter[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// First listener[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [94mfunction[39m [37mfirstListener[39m[90m([39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Helloooo! first listener'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Second listener[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [94mfunction[39m [37msecondListener[39m[90m([39m[37marg1[39m[32m,[39m [37marg2[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`event with parameters ${[37marg1[39m}, ${[37marg2[39m} in second listener`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Third listener[39m
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [94mfunction[39m [37mthirdListener[39m[90m([39m[93m...[39m[37margs[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mparameters[39m [93m=[39m [37margs[39m[32m.[39m[37mjoin[39m[90m([39m[92m', '[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`event with parameters ${[37mparameters[39m} in third listener`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyEmitter[39m[32m.[39m[37mlisteners[39m[90m([39m[92m'event'[39m[90m)[39m[90m)[39m[90m;[39m
    
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[32m,[39m [34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m4[39m[32m,[39m [34m5[39m[90m)[39m[90m;[39m
    
    [90m// Prints:[39m
    [90m// [[39m
    [90m//   [Function: firstListener],[39m
    [90m//   [Function: secondListener],[39m
    [90m//   [Function: thirdListener][39m
    [90m// ][39m
    [90m// Helloooo! first listener[39m
    [90m// event with parameters 1, 2 in second listener[39m
    [90m// event with parameters 1, 2, 3, 4, 5 in third listener[39m

[32m[1m### [33memitter.eventNames()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Array}[0m

[0mReturns an array listing the events for which the emitter has registered[0m
[0mlisteners. The values in the array will be strings or [33mSymbol[39ms.[0m

    [94mconst[39m [37mEventEmitter[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmyEE[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEE[39m[32m.[39m[37mon[39m[90m([39m[92m'foo'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [37mmyEE[39m[32m.[39m[37mon[39m[90m([39m[92m'bar'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37msym[39m [93m=[39m [37mSymbol[39m[90m([39m[92m'symbol'[39m[90m)[39m[90m;[39m
    [37mmyEE[39m[32m.[39m[37mon[39m[90m([39m[37msym[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyEE[39m[32m.[39m[37meventNames[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: [ 'foo', 'bar', Symbol(symbol) ][39m

[32m[1m### [33memitter.getMaxListeners()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {integer}[0m

[0mReturns the current max listener value for the [33mEventEmitter[39m which is either[0m
[0mset by [34m[33memitter.setMaxListeners(n)[39m[34m ([34m[4m#events_emitter_setmaxlisteners_n[24m[39m[34m)[39m or defaults to[0m
[0m[34m[33mEventEmitter.defaultMaxListeners[39m[34m ([34m[4m#events_eventemitter_defaultmaxlisteners[24m[39m[34m)[39m.[0m

[32m[1m### [33memitter.listenerCount(eventName)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v3.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol} The name of the event being listened for[0m
    * [0mReturns: {integer}[0m

[0mReturns the number of listeners listening to the event named [33meventName[39m.[0m

[32m[1m### [33memitter.listeners(eventName)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.26[39m
[90mchanges:[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6881[39m
[90m    description: For listeners attached using `.once()` this returns the[39m
[90m                 original listeners instead of wrapper functions now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol}[0m
    * [0mReturns: {Function[]}[0m

[0mReturns a copy of the array of listeners for the event named [33meventName[39m.[0m

    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'connection'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'someone connected!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mutil[39m[32m.[39m[37minspect[39m[90m([39m[37mserver[39m[32m.[39m[37mlisteners[39m[90m([39m[92m'connection'[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: [ [Function] ][39m

[32m[1m### [33memitter.off(eventName, listener)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol}[0m
    * [0m[33mlistener[39m {Function}[0m
    * [0mReturns: {EventEmitter}[0m

[0mAlias for [34m[33memitter.removeListener()[39m[34m ([34m[4m#events_emitter_removelistener_eventname_listener[24m[39m[34m)[39m.[0m

[32m[1m### [33memitter.on(eventName, listener)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.101[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol} The name of the event.[0m
    * [0m[33mlistener[39m {Function} The callback function[0m
    * [0mReturns: {EventEmitter}[0m

[0mAdds the [33mlistener[39m function to the end of the listeners array for the[0m
[0mevent named [33meventName[39m. No checks are made to see if the [33mlistener[39m has[0m
[0malready been added. Multiple calls passing the same combination of [33meventName[39m[0m
[0mand [33mlistener[39m will result in the [33mlistener[39m being added, and called, multiple[0m
[0mtimes.[0m

    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'connection'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'someone connected!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mReturns a reference to the [33mEventEmitter[39m, so that calls can be chained.[0m

[0mBy default, event listeners are invoked in the order they are added. The[0m
[0m[33memitter.prependListener()[39m method can be used as an alternative to add the[0m
[0mevent listener to the beginning of the listeners array.[0m

    [94mconst[39m [37mmyEE[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEE[39m[32m.[39m[37mon[39m[90m([39m[92m'foo'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'a'[39m[90m)[39m[90m)[39m[90m;[39m
    [37mmyEE[39m[32m.[39m[37mprependListener[39m[90m([39m[92m'foo'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'b'[39m[90m)[39m[90m)[39m[90m;[39m
    [37mmyEE[39m[32m.[39m[37memit[39m[90m([39m[92m'foo'[39m[90m)[39m[90m;[39m
    [90m// Prints:[39m
    [90m//   b[39m
    [90m//   a[39m

[32m[1m### [33memitter.once(eventName, listener)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol} The name of the event.[0m
    * [0m[33mlistener[39m {Function} The callback function[0m
    * [0mReturns: {EventEmitter}[0m

[0mAdds a [1mone-time[22m [33mlistener[39m function for the event named [33meventName[39m. The[0m
[0mnext time [33meventName[39m is triggered, this listener is removed and then invoked.[0m

    [37mserver[39m[32m.[39m[37monce[39m[90m([39m[92m'connection'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Ah, we have our first user!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mReturns a reference to the [33mEventEmitter[39m, so that calls can be chained.[0m

[0mBy default, event listeners are invoked in the order they are added. The[0m
[0m[33memitter.prependOnceListener()[39m method can be used as an alternative to add the[0m
[0mevent listener to the beginning of the listeners array.[0m

    [94mconst[39m [37mmyEE[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyEE[39m[32m.[39m[37monce[39m[90m([39m[92m'foo'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'a'[39m[90m)[39m[90m)[39m[90m;[39m
    [37mmyEE[39m[32m.[39m[37mprependOnceListener[39m[90m([39m[92m'foo'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'b'[39m[90m)[39m[90m)[39m[90m;[39m
    [37mmyEE[39m[32m.[39m[37memit[39m[90m([39m[92m'foo'[39m[90m)[39m[90m;[39m
    [90m// Prints:[39m
    [90m//   b[39m
    [90m//   a[39m

[32m[1m### [33memitter.prependListener(eventName, listener)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol} The name of the event.[0m
    * [0m[33mlistener[39m {Function} The callback function[0m
    * [0mReturns: {EventEmitter}[0m

[0mAdds the [33mlistener[39m function to the [3mbeginning[23m of the listeners array for the[0m
[0mevent named [33meventName[39m. No checks are made to see if the [33mlistener[39m has[0m
[0malready been added. Multiple calls passing the same combination of [33meventName[39m[0m
[0mand [33mlistener[39m will result in the [33mlistener[39m being added, and called, multiple[0m
[0mtimes.[0m

    [37mserver[39m[32m.[39m[37mprependListener[39m[90m([39m[92m'connection'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'someone connected!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mReturns a reference to the [33mEventEmitter[39m, so that calls can be chained.[0m

[32m[1m### [33memitter.prependOnceListener(eventName, listener)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol} The name of the event.[0m
    * [0m[33mlistener[39m {Function} The callback function[0m
    * [0mReturns: {EventEmitter}[0m

[0mAdds a [1mone-time[22m [33mlistener[39m function for the event named [33meventName[39m to the[0m
[0m[3mbeginning[23m of the listeners array. The next time [33meventName[39m is triggered, this[0m
[0mlistener is removed, and then invoked.[0m

    [37mserver[39m[32m.[39m[37mprependOnceListener[39m[90m([39m[92m'connection'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Ah, we have our first user!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mReturns a reference to the [33mEventEmitter[39m, so that calls can be chained.[0m

[32m[1m### [33memitter.removeAllListeners([eventName])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.26[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol}[0m
    * [0mReturns: {EventEmitter}[0m

[0mRemoves all listeners, or those of the specified [33meventName[39m.[0m

[0mIt is bad practice to remove listeners added elsewhere in the code,[0m
[0mparticularly when the [33mEventEmitter[39m instance was created by some other[0m
[0mcomponent or module (e.g. sockets or file streams).[0m

[0mReturns a reference to the [33mEventEmitter[39m, so that calls can be chained.[0m

[32m[1m### [33memitter.removeListener(eventName, listener)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.26[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol}[0m
    * [0m[33mlistener[39m {Function}[0m
    * [0mReturns: {EventEmitter}[0m

[0mRemoves the specified [33mlistener[39m from the listener array for the event named[0m
[0m[33meventName[39m.[0m

    [94mconst[39m [37mcallback[39m [93m=[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'someone connected!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'connection'[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m
    [90m// ...[39m
    [37mserver[39m[32m.[39m[37mremoveListener[39m[90m([39m[92m'connection'[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m

[0m[33mremoveListener()[39m will remove, at most, one instance of a listener from the[0m
[0mlistener array. If any single listener has been added multiple times to the[0m
[0mlistener array for the specified [33meventName[39m, then [33mremoveListener()[39m must be[0m
[0mcalled multiple times to remove each instance.[0m

[0mOnce an event has been emitted, all listeners attached to it at the[0m
[0mtime of emitting will be called in order. This implies that any[0m
[0m[33mremoveListener()[39m or [33mremoveAllListeners()[39m calls [3mafter[23m emitting and[0m
[0m[3mbefore[23m the last listener finishes execution will not remove them from[0m
[0m[33memit()[39m in progress. Subsequent events will behave as expected.[0m

    [94mconst[39m [37mmyEmitter[39m [93m=[39m [31mnew[39m [37mMyEmitter[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcallbackA[39m [93m=[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'A'[39m[90m)[39m[90m;[39m
      [37mmyEmitter[39m[32m.[39m[37mremoveListener[39m[90m([39m[92m'event'[39m[32m,[39m [37mcallbackB[39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m
    
    [94mconst[39m [37mcallbackB[39m [93m=[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'B'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m
    
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [37mcallbackA[39m[90m)[39m[90m;[39m
    
    [37mmyEmitter[39m[32m.[39m[37mon[39m[90m([39m[92m'event'[39m[32m,[39m [37mcallbackB[39m[90m)[39m[90m;[39m
    
    [90m// callbackA removes listener callbackB but it will still be called.[39m
    [90m// Internal listener array at time of emit [callbackA, callbackB][39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[90m)[39m[90m;[39m
    [90m// Prints:[39m
    [90m//   A[39m
    [90m//   B[39m
    
    [90m// callbackB is now removed.[39m
    [90m// Internal listener array [callbackA][39m
    [37mmyEmitter[39m[32m.[39m[37memit[39m[90m([39m[92m'event'[39m[90m)[39m[90m;[39m
    [90m// Prints:[39m
    [90m//   A[39m

[0mBecause listeners are managed using an internal array, calling this will[0m
[0mchange the position indices of any listener registered [3mafter[23m the listener[0m
[0mbeing removed. This will not impact the order in which listeners are called,[0m
[0mbut it means that any copies of the listener array as returned by[0m
[0mthe [33memitter.listeners()[39m method will need to be recreated.[0m

[0mWhen a single function has been added as a handler multiple times for a single[0m
[0mevent (as in the example below), [33mremoveListener()[39m will remove the most[0m
[0mrecently added instance. In the example the [33monce('ping')[39m[0m
[0mlistener is removed:[0m

    [94mconst[39m [37mee[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mpong[39m[90m([39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'pong'[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mee[39m[32m.[39m[37mon[39m[90m([39m[92m'ping'[39m[32m,[39m [37mpong[39m[90m)[39m[90m;[39m
    [37mee[39m[32m.[39m[37monce[39m[90m([39m[92m'ping'[39m[32m,[39m [37mpong[39m[90m)[39m[90m;[39m
    [37mee[39m[32m.[39m[37mremoveListener[39m[90m([39m[92m'ping'[39m[32m,[39m [37mpong[39m[90m)[39m[90m;[39m
    
    [37mee[39m[32m.[39m[37memit[39m[90m([39m[92m'ping'[39m[90m)[39m[90m;[39m
    [37mee[39m[32m.[39m[37memit[39m[90m([39m[92m'ping'[39m[90m)[39m[90m;[39m

[0mReturns a reference to the [33mEventEmitter[39m, so that calls can be chained.[0m

[32m[1m### [33memitter.setMaxListeners(n)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.5[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mn[39m {integer}[0m
    * [0mReturns: {EventEmitter}[0m

[0mBy default [33mEventEmitter[39ms will print a warning if more than [33m10[39m listeners are[0m
[0madded for a particular event. This is a useful default that helps finding[0m
[0mmemory leaks. The [33memitter.setMaxListeners()[39m method allows the limit to be[0m
[0mmodified for this specific [33mEventEmitter[39m instance. The value can be set to[0m
[0m[33mInfinity[39m (or [33m0[39m) to indicate an unlimited number of listeners.[0m

[0mReturns a reference to the [33mEventEmitter[39m, so that calls can be chained.[0m

[32m[1m### [33memitter.rawListeners(eventName)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventName[39m {string|symbol}[0m
    * [0mReturns: {Function[]}[0m

[0mReturns a copy of the array of listeners for the event named [33meventName[39m,[0m
[0mincluding any wrappers (such as those created by [33m.once()[39m).[0m

    [94mconst[39m [37memitter[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    [37memitter[39m[32m.[39m[37monce[39m[90m([39m[92m'log'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'log once'[39m[90m)[39m[90m)[39m[90m;[39m
    
    [90m// Returns a new Array with a function `onceWrapper` which has a property[39m
    [90m// `listener` which contains the original listener bound above[39m
    [94mconst[39m [37mlisteners[39m [93m=[39m [37memitter[39m[32m.[39m[37mrawListeners[39m[90m([39m[92m'log'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mlogFnWrapper[39m [93m=[39m [37mlisteners[39m[33m[[39m[34m0[39m[33m][39m[90m;[39m
    
    [90m// Logs "log once" to the console and does not unbind the `once` event[39m
    [37mlogFnWrapper[39m[32m.[39m[37mlistener[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// Logs "log once" to the console and removes the listener[39m
    [37mlogFnWrapper[39m[90m([39m[90m)[39m[90m;[39m
    
    [37memitter[39m[32m.[39m[37mon[39m[90m([39m[92m'log'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'log persistently'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Will return a new Array with a single function bound by `.on()` above[39m
    [94mconst[39m [37mnewListeners[39m [93m=[39m [37memitter[39m[32m.[39m[37mrawListeners[39m[90m([39m[92m'log'[39m[90m)[39m[90m;[39m
    
    [90m// Logs "log persistently" twice[39m
    [37mnewListeners[39m[33m[[39m[34m0[39m[33m][39m[90m([39m[90m)[39m[90m;[39m
    [37memitter[39m[32m.[39m[37memit[39m[90m([39m[92m'log'[39m[90m)[39m[90m;[39m

[32m[1m### [33memitter[Symbol.for('nodejs.rejection')](err, eventName[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - captureRejections is experimental.[0m[23m[39m

    * [0m[33merr[39m Error[0m
    * [0m[33meventName[39m {string|symbol}[0m
    * [0m[33m...args[39m {any}[0m

[0mThe [33mSymbol.for('nodejs.rejection')[39m method is called in case a[0m
[0mpromise rejection happens when emitting an event and[0m
[0m[34m[33mcaptureRejections[39m[34m ([34m[4m#events_capture_rejections_of_promises[24m[39m[34m)[39m is enabled on the emitter.[0m
[0mIt is possible to use [34m[33mevents.captureRejectionSymbol[39m[34m ([34m[4m#events_events_capturerejectionsymbol[24m[39m[34m)[39m in[0m
[0mplace of [33mSymbol.for('nodejs.rejection')[39m.[0m

    [94mconst[39m [33m{[39m [37mEventEmitter[39m[32m,[39m [37mcaptureRejectionSymbol[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyClass[39m [94mextends[39m [37mEventEmitter[39m [33m{[39m
      [37mconstructor[39m[90m([39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[33m{[39m [37mcaptureRejections[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [33m[[39m[37mcaptureRejectionSymbol[39m[33m][39m[90m([39m[37merr[39m[32m,[39m [37mevent[39m[32m,[39m [93m...[39m[37margs[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'rejection happened for'[39m[32m,[39m [37mevent[39m[32m,[39m [92m'with'[39m[32m,[39m [37merr[39m[32m,[39m [93m...[39m[37margs[39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37mdestroy[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [37mdestroy[39m[90m([39m[37merr[39m[90m)[39m [33m{[39m
        [90m// Tear the resource down here.[39m
      [33m}[39m
    [33m}[39m

[32m[1m## [33mevents.once(emitter, name)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33memitter[39m {EventEmitter}[0m
    * [0m[33mname[39m {string}[0m
    * [0mReturns: {Promise}[0m

[0mCreates a [33mPromise[39m that is fulfilled when the [33mEventEmitter[39m emits the given[0m
[0mevent or that is rejected when the [33mEventEmitter[39m emits [33m'error'[39m.[0m
[0mThe [33mPromise[39m will resolve with an array of all the arguments emitted to the[0m
[0mgiven event.[0m

[0mThis method is intentionally generic and works with the web platform[0m
[0m[34mEventTarget ([34m[4mhttps://dom.spec.whatwg.org/#interface-eventtarget[24m[39m[34m)[39m interface, which has no special[0m
[0m[33m'error'[39m event semantics and does not listen to the [33m'error'[39m event.[0m

    [94mconst[39m [33m{[39m [37monce[39m[32m,[39m [37mEventEmitter[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mrun[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [37mee[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    
      [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mee[39m[32m.[39m[37memit[39m[90m([39m[92m'myevent'[39m[32m,[39m [34m42[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [94mconst[39m [33m[[39m[37mvalue[39m[33m][39m [93m=[39m [37mawait[39m [37monce[39m[90m([39m[37mee[39m[32m,[39m [92m'myevent'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mvalue[39m[90m)[39m[90m;[39m
    
      [94mconst[39m [37merr[39m [93m=[39m [31mnew[39m [37mError[39m[90m([39m[92m'kaboom'[39m[90m)[39m[90m;[39m
      [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mee[39m[32m.[39m[37memit[39m[90m([39m[92m'error'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [36mtry[39m [33m{[39m
        [37mawait[39m [37monce[39m[90m([39m[37mee[39m[32m,[39m [92m'myevent'[39m[90m)[39m[90m;[39m
      [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'error happened'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [37mrun[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m## [33mevents.captureRejections[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - captureRejections is experimental.[0m[23m[39m

[0mValue: {boolean}[0m

[0mChange the default [33mcaptureRejections[39m option on all new [33mEventEmitter[39m objects.[0m

[32m[1m## [33mevents.captureRejectionSymbol[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - captureRejections is experimental.[0m[23m[39m

[0mValue: [33mSymbol.for('nodejs.rejection')[39m[0m

[0mSee how to write a custom [34mrejection handler ([34m[4m#events_emitter_symbol_for_nodejs_rejection_err_eventname_args[24m[39m[34m)[39m.[0m

[32m[1m## [33mevents.on(emitter, eventName)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33memitter[39m {EventEmitter}[0m
    * [0m[33meventName[39m {string|symbol} The name of the event being listened for[0m
    * [0mReturns: {AsyncIterator} that iterates [33meventName[39m events emitted by the [33memitter[39m[0m

    [94mconst[39m [33m{[39m [37mon[39m[32m,[39m [37mEventEmitter[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    
    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mee[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    
      [90m// Emit later on[39m
      [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mee[39m[32m.[39m[37memit[39m[90m([39m[92m'foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
        [37mee[39m[32m.[39m[37memit[39m[90m([39m[92m'foo'[39m[32m,[39m [34m42[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [94mfor[39m [37mawait[39m [90m([39m[94mconst[39m [37mevent[39m [37mof[39m [37mon[39m[90m([39m[37mee[39m[32m,[39m [92m'foo'[39m[90m)[39m[90m)[39m [33m{[39m
        [90m// The execution of this inner block is synchronous and it[39m
        [90m// processes one event at a time (even with await). Do not use[39m
        [90m// if concurrent execution is required.[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mevent[39m[90m)[39m[90m;[39m [90m// prints ['bar'] [42][39m
      [33m}[39m
      [90m// Unreachable here[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[0mReturns an [33mAsyncIterator[39m that iterates [33meventName[39m events. It will throw[0m
[0mif the [33mEventEmitter[39m emits [33m'error'[39m. It removes all listeners when[0m
[0mexiting the loop. The [33mvalue[39m returned by each iteration is an array[0m
[0mcomposed of the emitted event arguments.[0m

