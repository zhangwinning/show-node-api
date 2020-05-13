[35m[4m[1m# Performance Timing API[22m[24m[39m

[90m<!--introduced_in=v8.5.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe Performance Timing API provides an implementation of the[0m
[0m[34mW3C Performance Timeline ([34m[4mhttps://w3c.github.io/performance-timeline/[24m[39m[34m)[39m specification. The purpose of the API[0m
[0mis to support collection of high resolution performance metrics.[0m
[0mThis is the same Performance API as implemented in modern Web browsers.[0m

    [94mconst[39m [33m{[39m [37mPerformanceObserver[39m[32m,[39m [37mperformance[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/perf_hooks'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobs[39m [93m=[39m [31mnew[39m [37mPerformanceObserver[39m[90m([39m[90m([39m[37mitems[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mitems[39m[32m.[39m[37mgetEntries[39m[90m([39m[90m)[39m[33m[[39m[34m0[39m[33m][39m[32m.[39m[37mduration[39m[90m)[39m[90m;[39m
      [37mperformance[39m[32m.[39m[37mclearMarks[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mobs[39m[32m.[39m[37mobserve[39m[90m([39m[33m{[39m [37mentryTypes[39m[93m:[39m [33m[[39m[92m'measure'[39m[33m][39m [33m}[39m[90m)[39m[90m;[39m
    
    [37mperformance[39m[32m.[39m[37mmark[39m[90m([39m[92m'A'[39m[90m)[39m[90m;[39m
    [37mdoSomeLongRunningProcess[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mperformance[39m[32m.[39m[37mmark[39m[90m([39m[92m'B'[39m[90m)[39m[90m;[39m
      [37mperformance[39m[32m.[39m[37mmeasure[39m[90m([39m[92m'A to B'[39m[32m,[39m [92m'A'[39m[32m,[39m [92m'B'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Class: [33mPerformance[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[32m[1m### [33mperformance.clearMarks([name])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m

[0mIf [33mname[39m is not provided, removes all [33mPerformanceMark[39m objects from the[0m
[0mPerformance Timeline. If [33mname[39m is provided, removes only the named mark.[0m

[32m[1m### [33mperformance.mark([name])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m

[0mCreates a new [33mPerformanceMark[39m entry in the Performance Timeline. A[0m
[0m[33mPerformanceMark[39m is a subclass of [33mPerformanceEntry[39m whose[0m
[0m[33mperformanceEntry.entryType[39m is always [33m'mark'[39m, and whose[0m
[0m[33mperformanceEntry.duration[39m is always [33m0[39m. Performance marks are used[0m
[0mto mark specific significant moments in the Performance Timeline.[0m

[32m[1m### [33mperformance.measure(name, startMark, endMark)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0m[33mstartMark[39m {string}[0m
    * [0m[33mendMark[39m {string}[0m

[0mCreates a new [33mPerformanceMeasure[39m entry in the Performance Timeline. A[0m
[0m[33mPerformanceMeasure[39m is a subclass of [33mPerformanceEntry[39m whose[0m
[0m[33mperformanceEntry.entryType[39m is always [33m'measure'[39m, and whose[0m
[0m[33mperformanceEntry.duration[39m measures the number of milliseconds elapsed since[0m
[0m[33mstartMark[39m and [33mendMark[39m.[0m

[0mThe [33mstartMark[39m argument may identify any [3mexisting[23m [33mPerformanceMark[39m in the[0m
[0mPerformance Timeline, or [3mmay[23m identify any of the timestamp properties[0m
[0mprovided by the [33mPerformanceNodeTiming[39m class. If the named [33mstartMark[39m does[0m
[0mnot exist, then [33mstartMark[39m is set to [34m[33mtimeOrigin[39m[34m ([34m[4mhttps://w3c.github.io/hr-time/#dom-performance-timeorigin[24m[39m[34m)[39m by default.[0m

[0mThe [33mendMark[39m argument must identify any [3mexisting[23m [33mPerformanceMark[39m in the[0m
[0mPerformance Timeline or any of the timestamp properties provided by the[0m
[0m[33mPerformanceNodeTiming[39m class. If the named [33mendMark[39m does not exist, an[0m
[0merror will be thrown.[0m

[32m[1m### [33mperformance.nodeTiming[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{PerformanceNodeTiming}[0m

[0mAn instance of the [33mPerformanceNodeTiming[39m class that provides performance[0m
[0mmetrics for specific Node.js operational milestones.[0m

[32m[1m### [33mperformance.now()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {number}[0m

[0mReturns the current high resolution millisecond timestamp, where 0 represents[0m
[0mthe start of the current [33mnode[39m process.[0m

[32m[1m### [33mperformance.timeOrigin[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe [34m[33mtimeOrigin[39m[34m ([34m[4mhttps://w3c.github.io/hr-time/#dom-performance-timeorigin[24m[39m[34m)[39m specifies the high resolution millisecond timestamp at[0m
[0mwhich the current [33mnode[39m process began, measured in Unix time.[0m

[32m[1m### [33mperformance.timerify(fn)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfn[39m {Function}[0m

[0mWraps a function within a new function that measures the running time of the[0m
[0mwrapped function. A [33mPerformanceObserver[39m must be subscribed to the [33m'function'[39m[0m
[0mevent type in order for the timing details to be accessed.[0m

    [94mconst[39m [33m{[39m
      [37mperformance[39m[32m,[39m
      [37mPerformanceObserver[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/perf_hooks'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37msomeFunction[39m[90m([39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'hello world'[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mconst[39m [37mwrapped[39m [93m=[39m [37mperformance[39m[32m.[39m[37mtimerify[39m[90m([39m[37msomeFunction[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobs[39m [93m=[39m [31mnew[39m [37mPerformanceObserver[39m[90m([39m[90m([39m[37mlist[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mlist[39m[32m.[39m[37mgetEntries[39m[90m([39m[90m)[39m[33m[[39m[34m0[39m[33m][39m[32m.[39m[37mduration[39m[90m)[39m[90m;[39m
      [37mobs[39m[32m.[39m[37mdisconnect[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mobs[39m[32m.[39m[37mobserve[39m[90m([39m[33m{[39m [37mentryTypes[39m[93m:[39m [33m[[39m[92m'function'[39m[33m][39m [33m}[39m[90m)[39m[90m;[39m
    
    [90m// A performance timeline entry will be created[39m
    [37mwrapped[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m## Class: [33mPerformanceEntry[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[32m[1m### [33mperformanceEntry.duration[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe total number of milliseconds elapsed for this entry. This value will not[0m
[0mbe meaningful for all Performance Entry types.[0m

[32m[1m### [33mperformanceEntry.name[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe name of the performance entry.[0m

[32m[1m### [33mperformanceEntry.startTime[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe high resolution millisecond timestamp marking the starting time of the[0m
[0mPerformance Entry.[0m

[32m[1m### [33mperformanceEntry.entryType[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe type of the performance entry. Currently it may be one of: [33m'node'[39m,[0m
[0m[33m'mark'[39m, [33m'measure'[39m, [33m'gc'[39m, [33m'function'[39m, [33m'http2'[39m or [33m'http'[39m.[0m

[32m[1m### [33mperformanceEntry.kind[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mWhen [33mperformanceEntry.entryType[39m is equal to [33m'gc'[39m, the [33mperformance.kind[39m[0m
[0mproperty identifies the type of garbage collection operation that occurred.[0m
[0mThe value may be one of:[0m

    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_MAJOR[39m[0m
    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_MINOR[39m[0m
    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_INCREMENTAL[39m[0m
    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_WEAKCB[39m[0m

[32m[1m### performanceEntry.flags[22m[39m

[90m<!-- YAML[39m
[90madded: v13.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mWhen [33mperformanceEntry.entryType[39m is equal to [33m'gc'[39m, the [33mperformance.flags[39m[0m
[0mproperty contains additional information about garbage collection operation.[0m
[0mThe value may be one of:[0m

    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_NO[39m[0m
    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED[39m[0m
    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_FORCED[39m[0m
    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING[39m[0m
    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE[39m[0m
    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY[39m[0m
    * [0m[33mperf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE[39m[0m

[32m[1m## Class: [33mPerformanceNodeTiming extends PerformanceEntry[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mProvides timing details for Node.js itself.[0m

[32m[1m### [33mperformanceNodeTiming.bootstrapComplete[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe high resolution millisecond timestamp at which the Node.js process[0m
[0mcompleted bootstrapping. If bootstrapping has not yet finished, the property[0m
[0mhas the value of -1.[0m

[32m[1m### [33mperformanceNodeTiming.environment[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe high resolution millisecond timestamp at which the Node.js environment was[0m
[0minitialized.[0m

[32m[1m### [33mperformanceNodeTiming.loopExit[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe high resolution millisecond timestamp at which the Node.js event loop[0m
[0mexited. If the event loop has not yet exited, the property has the value of -1.[0m
[0mIt can only have a value of not -1 in a handler of the [34m[33m'exit'[39m[34m ([34m[4mprocess.html#process_event_exit[24m[39m[34m)[39m event.[0m

[32m[1m### [33mperformanceNodeTiming.loopStart[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe high resolution millisecond timestamp at which the Node.js event loop[0m
[0mstarted. If the event loop has not yet started (e.g., in the first tick of the[0m
[0mmain script), the property has the value of -1.[0m

[32m[1m### [33mperformanceNodeTiming.nodeStart[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe high resolution millisecond timestamp at which the Node.js process was[0m
[0minitialized.[0m

[32m[1m### [33mperformanceNodeTiming.v8Start[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe high resolution millisecond timestamp at which the V8 platform was[0m
[0minitialized.[0m

[32m[1m## Class: [33mPerformanceObserver[39m[32m[22m[39m

[32m[1m### [33mnew PerformanceObserver(callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}
        * [0m[0m[33mlist[39m {PerformanceObserverEntryList}[0m[0m[0m
      [0m
        * [0m[0m[33mobserver[39m {PerformanceObserver}[0m[0m[0m

[0m[33mPerformanceObserver[39m objects provide notifications when new[0m
[0m[33mPerformanceEntry[39m instances have been added to the Performance Timeline.[0m

    [94mconst[39m [33m{[39m
      [37mperformance[39m[32m,[39m
      [37mPerformanceObserver[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/perf_hooks'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobs[39m [93m=[39m [31mnew[39m [37mPerformanceObserver[39m[90m([39m[90m([39m[37mlist[39m[32m,[39m [37mobserver[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mlist[39m[32m.[39m[37mgetEntries[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
      [37mobserver[39m[32m.[39m[37mdisconnect[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mobs[39m[32m.[39m[37mobserve[39m[90m([39m[33m{[39m [37mentryTypes[39m[93m:[39m [33m[[39m[92m'mark'[39m[33m][39m[32m,[39m [37mbuffered[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    
    [37mperformance[39m[32m.[39m[37mmark[39m[90m([39m[92m'test'[39m[90m)[39m[90m;[39m

[0mBecause [33mPerformanceObserver[39m instances introduce their own additional[0m
[0mperformance overhead, instances should not be left subscribed to notifications[0m
[0mindefinitely. Users should disconnect observers as soon as they are no[0m
[0mlonger needed.[0m

[0mThe [33mcallback[39m is invoked when a [33mPerformanceObserver[39m is[0m
[0mnotified about new [33mPerformanceEntry[39m instances. The callback receives a[0m
[0m[33mPerformanceObserverEntryList[39m instance and a reference to the[0m
[0m[33mPerformanceObserver[39m.[0m

[32m[1m### [33mperformanceObserver.disconnect()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m[0mDisconnects the [33mPerformanceObserver[39m instance from all notifications.[0m

[32m[1m### [33mperformanceObserver.observe(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mentryTypes[39m {string[]} An array of strings identifying the types of[0m[0m[0m
      [0m      [0m[0m[33mPerformanceEntry[39m instances the observer is interested in. If not[0m[0m[0m
      [0m      [0m[0mprovided an error will be thrown.[0m[0m[0m
      [0m
        * [0m[0m[33mbuffered[39m {boolean} If true, the notification callback will be[0m[0m[0m
      [0m      [0m[0mcalled using [33msetImmediate()[39m and multiple [33mPerformanceEntry[39m instance[0m[0m[0m
      [0m      [0m[0mnotifications will be buffered internally. If [33mfalse[39m, notifications will[0m[0m[0m
      [0m      [0m[0mbe immediate and synchronous. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m

[0mSubscribes the [33mPerformanceObserver[39m instance to notifications of new[0m
[0m[33mPerformanceEntry[39m instances identified by [33moptions.entryTypes[39m.[0m

[0mWhen [33moptions.buffered[39m is [33mfalse[39m, the [33mcallback[39m will be invoked once for[0m
[0mevery [33mPerformanceEntry[39m instance:[0m

    [94mconst[39m [33m{[39m
      [37mperformance[39m[32m,[39m
      [37mPerformanceObserver[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/perf_hooks'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobs[39m [93m=[39m [31mnew[39m [37mPerformanceObserver[39m[90m([39m[90m([39m[37mlist[39m[32m,[39m [37mobserver[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Called three times synchronously. `list` contains one item.[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mobs[39m[32m.[39m[37mobserve[39m[90m([39m[33m{[39m [37mentryTypes[39m[93m:[39m [33m[[39m[92m'mark'[39m[33m][39m [33m}[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mn[39m [93m=[39m [34m0[39m[90m;[39m [37mn[39m [93m<[39m [34m3[39m[90m;[39m [37mn[39m[93m++[39m[90m)[39m
      [37mperformance[39m[32m.[39m[37mmark[39m[90m([39m`test${[37mn[39m}`[90m)[39m[90m;[39m

    [94mconst[39m [33m{[39m
      [37mperformance[39m[32m,[39m
      [37mPerformanceObserver[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/perf_hooks'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobs[39m [93m=[39m [31mnew[39m [37mPerformanceObserver[39m[90m([39m[90m([39m[37mlist[39m[32m,[39m [37mobserver[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Called once. `list` contains three items.[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mobs[39m[32m.[39m[37mobserve[39m[90m([39m[33m{[39m [37mentryTypes[39m[93m:[39m [33m[[39m[92m'mark'[39m[33m][39m[32m,[39m [37mbuffered[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mn[39m [93m=[39m [34m0[39m[90m;[39m [37mn[39m [93m<[39m [34m3[39m[90m;[39m [37mn[39m[93m++[39m[90m)[39m
      [37mperformance[39m[32m.[39m[37mmark[39m[90m([39m`test${[37mn[39m}`[90m)[39m[90m;[39m

[32m[1m## Class: [33mPerformanceObserverEntryList[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mPerformanceObserverEntryList[39m class is used to provide access to the[0m
[0m[33mPerformanceEntry[39m instances passed to a [33mPerformanceObserver[39m.[0m

[32m[1m### [33mperformanceObserverEntryList.getEntries()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {PerformanceEntry[]}[0m

[0mReturns a list of [33mPerformanceEntry[39m objects in chronological order[0m
[0mwith respect to [33mperformanceEntry.startTime[39m.[0m

[32m[1m### [33mperformanceObserverEntryList.getEntriesByName(name[, type])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0m[33mtype[39m {string}[0m
    * [0mReturns: {PerformanceEntry[]}[0m

[0mReturns a list of [33mPerformanceEntry[39m objects in chronological order[0m
[0mwith respect to [33mperformanceEntry.startTime[39m whose [33mperformanceEntry.name[39m is[0m
[0mequal to [33mname[39m, and optionally, whose [33mperformanceEntry.entryType[39m is equal to[0m
[0m[33mtype[39m.[0m

[32m[1m### [33mperformanceObserverEntryList.getEntriesByType(type)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtype[39m {string}[0m
    * [0mReturns: {PerformanceEntry[]}[0m

[0mReturns a list of [33mPerformanceEntry[39m objects in chronological order[0m
[0mwith respect to [33mperformanceEntry.startTime[39m whose [33mperformanceEntry.entryType[39m[0m
[0mis equal to [33mtype[39m.[0m

[32m[1m## [33mperf_hooks.monitorEventLoopDelay([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mresolution[39m {number} The sampling rate in milliseconds. Must be greater[0m[0m[0m
      [0m      [0m[0mthan zero. [1mDefault:[22m [33m10[39m.[0m[0m[0m
    * [0mReturns: {Histogram}[0m

[0mCreates a [33mHistogram[39m object that samples and reports the event loop delay[0m
[0mover time. The delays will be reported in nanoseconds.[0m

[0mUsing a timer to detect approximate event loop delay works because the[0m
[0mexecution of timers is tied specifically to the lifecycle of the libuv[0m
[0mevent loop. That is, a delay in the loop will cause a delay in the execution[0m
[0mof the timer, and those delays are specifically what this API is intended to[0m
[0mdetect.[0m

    [94mconst[39m [33m{[39m [37mmonitorEventLoopDelay[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/perf_hooks'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mh[39m [93m=[39m [37mmonitorEventLoopDelay[39m[90m([39m[33m{[39m [37mresolution[39m[93m:[39m [34m20[39m [33m}[39m[90m)[39m[90m;[39m
    [37mh[39m[32m.[39m[37menable[39m[90m([39m[90m)[39m[90m;[39m
    [90m// Do something.[39m
    [37mh[39m[32m.[39m[37mdisable[39m[90m([39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mh[39m[32m.[39m[37mmin[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mh[39m[32m.[39m[37mmax[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mh[39m[32m.[39m[37mmean[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mh[39m[32m.[39m[37mstddev[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mh[39m[32m.[39m[37mpercentiles[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mh[39m[32m.[39m[37mpercentile[39m[90m([39m[34m50[39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mh[39m[32m.[39m[37mpercentile[39m[90m([39m[34m99[39m[90m)[39m[90m)[39m[90m;[39m

[32m[1m### Class: [33mHistogram[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m[0mTracks the event loop delay at a given sampling rate.[0m

[32m[1m#### [33mhistogram.disable()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mDisables the event loop delay sample timer. Returns [33mtrue[39m if the timer was[0m
[0mstopped, [33mfalse[39m if it was already stopped.[0m

[32m[1m#### [33mhistogram.enable()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mEnables the event loop delay sample timer. Returns [33mtrue[39m if the timer was[0m
[0mstarted, [33mfalse[39m if it was already started.[0m

[32m[1m#### [33mhistogram.exceeds[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe number of times the event loop delay exceeded the maximum 1 hour event[0m
[0mloop delay threshold.[0m

[32m[1m#### [33mhistogram.max[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe maximum recorded event loop delay.[0m

[32m[1m#### [33mhistogram.mean[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe mean of the recorded event loop delays.[0m

[32m[1m#### [33mhistogram.min[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe minimum recorded event loop delay.[0m

[32m[1m#### [33mhistogram.percentile(percentile)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpercentile[39m {number} A percentile value between 1 and 100.[0m
    * [0mReturns: {number}[0m

[0mReturns the value at the given percentile.[0m

[32m[1m#### [33mhistogram.percentiles[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Map}[0m

[0mReturns a [33mMap[39m object detailing the accumulated percentile distribution.[0m

[32m[1m#### [33mhistogram.reset()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mResets the collected histogram data.[0m

[32m[1m#### [33mhistogram.stddev[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe standard deviation of the recorded event loop delays.[0m

[32m[1m## Examples[22m[39m

[32m[1m### Measuring the duration of async operations[22m[39m

[0mThe following example uses the [34mAsync Hooks ([34m[4masync_hooks.html[24m[39m[34m)[39m and Performance APIs to measure[0m
[0mthe actual duration of a Timeout operation (including the amount of time it took[0m
[0mto execute the callback).[0m

    [92m'use strict'[39m[90m;[39m
    [94mconst[39m [37masync_hooks[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m
      [37mperformance[39m[32m,[39m
      [37mPerformanceObserver[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/perf_hooks'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mset[39m [93m=[39m [31mnew[39m [37mSet[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhook[39m [93m=[39m [37masync_hooks[39m[32m.[39m[37mcreateHook[39m[90m([39m[33m{[39m
      [37minit[39m[90m([39m[37mid[39m[32m,[39m [37mtype[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37mtype[39m [93m===[39m [92m'Timeout'[39m[90m)[39m [33m{[39m
          [37mperformance[39m[32m.[39m[37mmark[39m[90m([39m`Timeout-${[37mid[39m}-Init`[90m)[39m[90m;[39m
          [37mset[39m[32m.[39m[37madd[39m[90m([39m[37mid[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m[32m,[39m
      [37mdestroy[39m[90m([39m[37mid[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37mset[39m[32m.[39m[37mhas[39m[90m([39m[37mid[39m[90m)[39m[90m)[39m [33m{[39m
          [37mset[39m[32m.[39m[31mdelete[39m[90m([39m[37mid[39m[90m)[39m[90m;[39m
          [37mperformance[39m[32m.[39m[37mmark[39m[90m([39m`Timeout-${[37mid[39m}-Destroy`[90m)[39m[90m;[39m
          [37mperformance[39m[32m.[39m[37mmeasure[39m[90m([39m`Timeout-${[37mid[39m}`[32m,[39m
                              `Timeout-${[37mid[39m}-Init`[32m,[39m
                              `Timeout-${[37mid[39m}-Destroy`[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mhook[39m[32m.[39m[37menable[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobs[39m [93m=[39m [31mnew[39m [37mPerformanceObserver[39m[90m([39m[90m([39m[37mlist[39m[32m,[39m [37mobserver[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mlist[39m[32m.[39m[37mgetEntries[39m[90m([39m[90m)[39m[33m[[39m[34m0[39m[33m][39m[90m)[39m[90m;[39m
      [37mperformance[39m[32m.[39m[37mclearMarks[39m[90m([39m[90m)[39m[90m;[39m
      [37mobserver[39m[32m.[39m[37mdisconnect[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mobs[39m[32m.[39m[37mobserve[39m[90m([39m[33m{[39m [37mentryTypes[39m[93m:[39m [33m[[39m[92m'measure'[39m[33m][39m[32m,[39m [37mbuffered[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m

[32m[1m### Measuring how long it takes to load dependencies[22m[39m

[0mThe following example measures the duration of [33mrequire()[39m operations to load[0m
[0mdependencies:[0m

[90m<!-- eslint-disable no-global-assign -->[39m
[90m[39m    [92m'use strict'[39m[90m;[39m
    [94mconst[39m [33m{[39m
      [37mperformance[39m[32m,[39m
      [37mPerformanceObserver[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/perf_hooks'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmod[39m [93m=[39m [37mrequire[39m[90m([39m[92m'module'[39m[90m)[39m[90m;[39m
    
    [90m// Monkey patch the require function[39m
    [37mmod[39m[32m.[39m[37mModule[39m[32m.[39m[37mprototype[39m[32m.[39m[37mrequire[39m [93m=[39m
      [37mperformance[39m[32m.[39m[37mtimerify[39m[90m([39m[37mmod[39m[32m.[39m[37mModule[39m[32m.[39m[37mprototype[39m[32m.[39m[37mrequire[39m[90m)[39m[90m;[39m
    [37mrequire[39m [93m=[39m [37mperformance[39m[32m.[39m[37mtimerify[39m[90m([39m[37mrequire[39m[90m)[39m[90m;[39m
    
    [90m// Activate the observer[39m
    [94mconst[39m [37mobs[39m [93m=[39m [31mnew[39m [37mPerformanceObserver[39m[90m([39m[90m([39m[37mlist[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mentries[39m [93m=[39m [37mlist[39m[32m.[39m[37mgetEntries[39m[90m([39m[90m)[39m[90m;[39m
      [37mentries[39m[32m.[39m[37mforEach[39m[90m([39m[90m([39m[37mentry[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`require('${[37mentry[39m[33m[[39m[34m0[39m[33m][39m}')`[32m,[39m [37mentry[39m[32m.[39m[37mduration[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mobs[39m[32m.[39m[37mdisconnect[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mobs[39m[32m.[39m[37mobserve[39m[90m([39m[33m{[39m [37mentryTypes[39m[93m:[39m [33m[[39m[92m'function'[39m[33m][39m[32m,[39m [37mbuffered[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    
    [37mrequire[39m[90m([39m[92m'some-module'[39m[90m)[39m[90m;[39m

