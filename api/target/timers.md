[35m[4m[1m# Timers[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mtimer[39m module exposes a global API for scheduling functions to[0m
[0mbe called at some future period of time. Because the timer functions are[0m
[0mglobals, there is no need to call [33mrequire('timers')[39m to use the API.[0m

[0mThe timer functions within Node.js implement a similar API as the timers API[0m
[0mprovided by Web Browsers but use a different internal implementation that is[0m
[0mbuilt around the Node.js [34mEvent Loop ([34m[4mhttps://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout[24m[39m[34m)[39m.[0m

[32m[1m## Class: [33mImmediate[39m[32m[22m[39m

[0mThis object is created internally and is returned from [34m[33msetImmediate()[39m[34m ([34m[4mtimers.html#timers_setimmediate_callback_args[24m[39m[34m)[39m. It[0m
[0mcan be passed to [34m[33mclearImmediate()[39m[34m ([34m[4mtimers.html#timers_clearimmediate_immediate[24m[39m[34m)[39m in order to cancel the scheduled[0m
[0mactions.[0m

[0mBy default, when an immediate is scheduled, the Node.js event loop will continue[0m
[0mrunning as long as the immediate is active. The [33mImmediate[39m object returned by[0m
[0m[34m[33msetImmediate()[39m[34m ([34m[4mtimers.html#timers_setimmediate_callback_args[24m[39m[34m)[39m exports both [33mimmediate.ref()[39m and [33mimmediate.unref()[39m[0m
[0mfunctions that can be used to control this default behavior.[0m

[32m[1m### [33mimmediate.hasRef()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mIf true, the [33mImmediate[39m object will keep the Node.js event loop active.[0m

[32m[1m### [33mimmediate.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Immediate} a reference to [33mimmediate[39m[0m

[0mWhen called, requests that the Node.js event loop [3mnot[23m exit so long as the[0m
[0m[33mImmediate[39m is active. Calling [33mimmediate.ref()[39m multiple times will have no[0m
[0meffect.[0m

[0mBy default, all [33mImmediate[39m objects are "ref'ed", making it normally unnecessary[0m
[0mto call [33mimmediate.ref()[39m unless [33mimmediate.unref()[39m had been called previously.[0m

[32m[1m### [33mimmediate.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Immediate} a reference to [33mimmediate[39m[0m

[0mWhen called, the active [33mImmediate[39m object will not require the Node.js event[0m
[0mloop to remain active. If there is no other activity keeping the event loop[0m
[0mrunning, the process may exit before the [33mImmediate[39m object's callback is[0m
[0minvoked. Calling [33mimmediate.unref()[39m multiple times will have no effect.[0m

[32m[1m## Class: [33mTimeout[39m[32m[22m[39m

[0mThis object is created internally and is returned from [34m[33msetTimeout()[39m[34m ([34m[4mtimers.html#timers_settimeout_callback_delay_args[24m[39m[34m)[39m and[0m
[0m[34m[33msetInterval()[39m[34m ([34m[4mtimers.html#timers_setinterval_callback_delay_args[24m[39m[34m)[39m. It can be passed to either [34m[33mclearTimeout()[39m[34m ([34m[4mtimers.html#timers_cleartimeout_timeout[24m[39m[34m)[39m or[0m
[0m[34m[33mclearInterval()[39m[34m ([34m[4mtimers.html#timers_clearinterval_timeout[24m[39m[34m)[39m in order to cancel the scheduled actions.[0m

[0mBy default, when a timer is scheduled using either [34m[33msetTimeout()[39m[34m ([34m[4mtimers.html#timers_settimeout_callback_delay_args[24m[39m[34m)[39m or[0m
[0m[34m[33msetInterval()[39m[34m ([34m[4mtimers.html#timers_setinterval_callback_delay_args[24m[39m[34m)[39m, the Node.js event loop will continue running as long as the[0m
[0mtimer is active. Each of the [33mTimeout[39m objects returned by these functions[0m
[0mexport both [33mtimeout.ref()[39m and [33mtimeout.unref()[39m functions that can be used to[0m
[0mcontrol this default behavior.[0m

[32m[1m### [33mtimeout.hasRef()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mIf true, the [33mTimeout[39m object will keep the Node.js event loop active.[0m

[32m[1m### [33mtimeout.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Timeout} a reference to [33mtimeout[39m[0m

[0mWhen called, requests that the Node.js event loop [3mnot[23m exit so long as the[0m
[0m[33mTimeout[39m is active. Calling [33mtimeout.ref()[39m multiple times will have no effect.[0m

[0mBy default, all [33mTimeout[39m objects are "ref'ed", making it normally unnecessary[0m
[0mto call [33mtimeout.ref()[39m unless [33mtimeout.unref()[39m had been called previously.[0m

[32m[1m### [33mtimeout.refresh()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Timeout} a reference to [33mtimeout[39m[0m

[0mSets the timer's start time to the current time, and reschedules the timer to[0m
[0mcall its callback at the previously specified duration adjusted to the current[0m
[0mtime. This is useful for refreshing a timer without allocating a new[0m
[0mJavaScript object.[0m

[0mUsing this on a timer that has already called its callback will reactivate the[0m
[0mtimer.[0m

[32m[1m### [33mtimeout.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Timeout} a reference to [33mtimeout[39m[0m

[0mWhen called, the active [33mTimeout[39m object will not require the Node.js event loop[0m
[0mto remain active. If there is no other activity keeping the event loop running,[0m
[0mthe process may exit before the [33mTimeout[39m object's callback is invoked. Calling[0m
[0m[33mtimeout.unref()[39m multiple times will have no effect.[0m

[0mCalling [33mtimeout.unref()[39m creates an internal timer that will wake the Node.js[0m
[0mevent loop. Creating too many of these can adversely impact performance[0m
[0mof the Node.js application.[0m

[32m[1m## Scheduling Timers[22m[39m

[0mA timer in Node.js is an internal construct that calls a given function after[0m
[0ma certain period of time. When a timer's function is called varies depending on[0m
[0mwhich method was used to create the timer and what other work the Node.js[0m
[0mevent loop is doing.[0m

[32m[1m### [33msetImmediate(callback[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} The function to call at the end of this turn of[0m
      [0mthe Node.js [34mEvent Loop ([34m[4mhttps://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout[24m[39m[34m)[39m[0m
    * [0m[33m...args[39m {any} Optional arguments to pass when the [33mcallback[39m is called.[0m
    * [0mReturns: {Immediate} for use with [34m[33mclearImmediate()[39m[34m ([34m[4mtimers.html#timers_clearimmediate_immediate[24m[39m[34m)[39m[0m

[0mSchedules the "immediate" execution of the [33mcallback[39m after I/O events'[0m
[0mcallbacks.[0m

[0mWhen multiple calls to [33msetImmediate()[39m are made, the [33mcallback[39m functions are[0m
[0mqueued for execution in the order in which they are created. The entire callback[0m
[0mqueue is processed every event loop iteration. If an immediate timer is queued[0m
[0mfrom inside an executing callback, that timer will not be triggered until the[0m
[0mnext event loop iteration.[0m

[0mIf [33mcallback[39m is not a function, a [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m will be thrown.[0m

[0mThis method has a custom variant for promises that is available using[0m
[0m[34m[33mutil.promisify()[39m[34m ([34m[4mutil.html#util_util_promisify_original[24m[39m[34m)[39m:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37msetImmediatePromise[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37msetImmediate[39m[90m)[39m[90m;[39m
    
    [37msetImmediatePromise[39m[90m([39m[92m'foobar'[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37mvalue[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// value === 'foobar' (passing values is optional)[39m
      [90m// This is executed after all I/O callbacks.[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Or with async function[39m
    [37masync[39m [94mfunction[39m [37mtimerExample[39m[90m([39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Before I/O callbacks'[39m[90m)[39m[90m;[39m
      [37mawait[39m [37msetImmediatePromise[39m[90m([39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'After I/O callbacks'[39m[90m)[39m[90m;[39m
    [33m}[39m
    [37mtimerExample[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33msetInterval(callback, delay[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} The function to call when the timer elapses.[0m
    * [0m[33mdelay[39m {number} The number of milliseconds to wait before calling the[0m
      [0m[33mcallback[39m.[0m
    * [0m[33m...args[39m {any} Optional arguments to pass when the [33mcallback[39m is called.[0m
    * [0mReturns: {Timeout} for use with [34m[33mclearInterval()[39m[34m ([34m[4mtimers.html#timers_clearinterval_timeout[24m[39m[34m)[39m[0m

[0mSchedules repeated execution of [33mcallback[39m every [33mdelay[39m milliseconds.[0m

[0mWhen [33mdelay[39m is larger than [33m2147483647[39m or less than [33m1[39m, the [33mdelay[39m will be[0m
[0mset to [33m1[39m. Non-integer delays are truncated to an integer.[0m

[0mIf [33mcallback[39m is not a function, a [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m will be thrown.[0m

[32m[1m### [33msetTimeout(callback, delay[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} The function to call when the timer elapses.[0m
    * [0m[33mdelay[39m {number} The number of milliseconds to wait before calling the[0m
      [0m[33mcallback[39m.[0m
    * [0m[33m...args[39m {any} Optional arguments to pass when the [33mcallback[39m is called.[0m
    * [0mReturns: {Timeout} for use with [34m[33mclearTimeout()[39m[34m ([34m[4mtimers.html#timers_cleartimeout_timeout[24m[39m[34m)[39m[0m

[0mSchedules execution of a one-time [33mcallback[39m after [33mdelay[39m milliseconds.[0m

[0mThe [33mcallback[39m will likely not be invoked in precisely [33mdelay[39m milliseconds.[0m
[0mNode.js makes no guarantees about the exact timing of when callbacks will fire,[0m
[0mnor of their ordering. The callback will be called as close as possible to the[0m
[0mtime specified.[0m

[0mWhen [33mdelay[39m is larger than [33m2147483647[39m or less than [33m1[39m, the [33mdelay[39m[0m
[0mwill be set to [33m1[39m. Non-integer delays are truncated to an integer.[0m

[0mIf [33mcallback[39m is not a function, a [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m will be thrown.[0m

[0mThis method has a custom variant for promises that is available using[0m
[0m[34m[33mutil.promisify()[39m[34m ([34m[4mutil.html#util_util_promisify_original[24m[39m[34m)[39m:[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37msetTimeoutPromise[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37msetTimeout[39m[90m)[39m[90m;[39m
    
    [37msetTimeoutPromise[39m[90m([39m[34m40[39m[32m,[39m [92m'foobar'[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37mvalue[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// value === 'foobar' (passing values is optional)[39m
      [90m// This is executed after about 40 milliseconds.[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Cancelling Timers[22m[39m

[0mThe [34m[33msetImmediate()[39m[34m ([34m[4mtimers.html#timers_setimmediate_callback_args[24m[39m[34m)[39m, [34m[33msetInterval()[39m[34m ([34m[4mtimers.html#timers_setinterval_callback_delay_args[24m[39m[34m)[39m, and [34m[33msetTimeout()[39m[34m ([34m[4mtimers.html#timers_settimeout_callback_delay_args[24m[39m[34m)[39m methods[0m
[0meach return objects that represent the scheduled timers. These can be used to[0m
[0mcancel the timer and prevent it from triggering.[0m

[0mIt is not possible to cancel timers that were created using the promisified[0m
[0mvariants of [34m[33msetImmediate()[39m[34m ([34m[4mtimers.html#timers_setimmediate_callback_args[24m[39m[34m)[39m, [34m[33msetTimeout()[39m[34m ([34m[4mtimers.html#timers_settimeout_callback_delay_args[24m[39m[34m)[39m.[0m

[32m[1m### [33mclearImmediate(immediate)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mimmediate[39m {Immediate} An [33mImmediate[39m object as returned by[0m
      [0m[34m[33msetImmediate()[39m[34m ([34m[4mtimers.html#timers_setimmediate_callback_args[24m[39m[34m)[39m.[0m

[0mCancels an [33mImmediate[39m object created by [34m[33msetImmediate()[39m[34m ([34m[4mtimers.html#timers_setimmediate_callback_args[24m[39m[34m)[39m.[0m

[32m[1m### [33mclearInterval(timeout)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtimeout[39m {Timeout} A [33mTimeout[39m object as returned by [34m[33msetInterval()[39m[34m ([34m[4mtimers.html#timers_setinterval_callback_delay_args[24m[39m[34m)[39m.[0m

[0mCancels a [33mTimeout[39m object created by [34m[33msetInterval()[39m[34m ([34m[4mtimers.html#timers_setinterval_callback_delay_args[24m[39m[34m)[39m.[0m

[32m[1m### [33mclearTimeout(timeout)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtimeout[39m {Timeout} A [33mTimeout[39m object as returned by [34m[33msetTimeout()[39m[34m ([34m[4mtimers.html#timers_settimeout_callback_delay_args[24m[39m[34m)[39m.[0m

[0mCancels a [33mTimeout[39m object created by [34m[33msetTimeout()[39m[34m ([34m[4mtimers.html#timers_settimeout_callback_delay_args[24m[39m[34m)[39m.[0m

