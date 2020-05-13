[35m[4m[1m# Async Hooks[22m[24m[39m

[90m<!--introduced_in=v8.1.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mThe [33masync_hooks[39m module provides an API to track asynchronous resources. It[0m
[0mcan be accessed using:[0m

    [94mconst[39m [37masync_hooks[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m

[32m[1m## Terminology[22m[39m

[0mAn asynchronous resource represents an object with an associated callback.[0m
[0mThis callback may be called multiple times, for example, the [33m'connection'[39m[0m
[0mevent in [33mnet.createServer()[39m, or just a single time like in [33mfs.open()[39m.[0m
[0mA resource can also be closed before the callback is called. [33mAsyncHook[39m does[0m
[0mnot explicitly distinguish between these different cases but will represent them[0m
[0mas the abstract concept that is a resource.[0m

[0mIf [34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m are used, each thread has an independent [33masync_hooks[39m[0m
[0minterface, and each thread will use a new set of async IDs.[0m

[32m[1m## Public API[22m[39m

[32m[1m### Overview[22m[39m

[0mFollowing is a simple overview of the public API.[0m

    [94mconst[39m [37masync_hooks[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    
    [90m// Return the ID of the current execution context.[39m
    [94mconst[39m [37meid[39m [93m=[39m [37masync_hooks[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// Return the ID of the handle responsible for triggering the callback of the[39m
    [90m// current execution scope to call.[39m
    [94mconst[39m [37mtid[39m [93m=[39m [37masync_hooks[39m[32m.[39m[37mtriggerAsyncId[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// Create a new AsyncHook instance. All of these callbacks are optional.[39m
    [94mconst[39m [37masyncHook[39m [93m=[39m
        [37masync_hooks[39m[32m.[39m[37mcreateHook[39m[90m([39m[33m{[39m [37minit[39m[32m,[39m [37mbefore[39m[32m,[39m [37mafter[39m[32m,[39m [37mdestroy[39m[32m,[39m [37mpromiseResolve[39m [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Allow callbacks of this AsyncHook instance to call. This is not an implicit[39m
    [90m// action after running the constructor, and must be explicitly run to begin[39m
    [90m// executing callbacks.[39m
    [37masyncHook[39m[32m.[39m[37menable[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// Disable listening for new asynchronous events.[39m
    [37masyncHook[39m[32m.[39m[37mdisable[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m//[39m
    [90m// The following are the callbacks that can be passed to createHook().[39m
    [90m//[39m
    
    [90m// init is called during object construction. The resource may not have[39m
    [90m// completed construction when this callback runs, therefore all fields of the[39m
    [90m// resource referenced by "asyncId" may not have been populated.[39m
    [94mfunction[39m [37minit[39m[90m([39m[37masyncId[39m[32m,[39m [37mtype[39m[32m,[39m [37mtriggerAsyncId[39m[32m,[39m [37mresource[39m[90m)[39m [33m{[39m [33m}[39m
    
    [90m// Before is called just before the resource's callback is called. It can be[39m
    [90m// called 0-N times for handles (e.g. TCPWrap), and will be called exactly 1[39m
    [90m// time for requests (e.g. FSReqCallback).[39m
    [94mfunction[39m [37mbefore[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m [33m}[39m
    
    [90m// After is called just after the resource's callback has finished.[39m
    [94mfunction[39m [37mafter[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m [33m}[39m
    
    [90m// Destroy is called when an AsyncWrap instance is destroyed.[39m
    [94mfunction[39m [37mdestroy[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m [33m}[39m
    
    [90m// promiseResolve is called only for promise resources, when the[39m
    [90m// `resolve` function passed to the `Promise` constructor is invoked[39m
    [90m// (either directly or through other means of resolving a promise).[39m
    [94mfunction[39m [37mpromiseResolve[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m [33m}[39m

[32m[1m#### [33masync_hooks.createHook(callbacks)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallbacks[39m {Object} The [34mHook Callbacks ([34m[4m#async_hooks_hook_callbacks[24m[39m[34m)[39m to register
        * [0m[0m[33minit[39m {Function} The [34m[33minit[39m[34m callback ([34m[4m#async_hooks_init_asyncid_type_triggerasyncid_resource[24m[39m[34m)[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mbefore[39m {Function} The [34m[33mbefore[39m[34m callback ([34m[4m#async_hooks_before_asyncid[24m[39m[34m)[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mafter[39m {Function} The [34m[33mafter[39m[34m callback ([34m[4m#async_hooks_after_asyncid[24m[39m[34m)[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mdestroy[39m {Function} The [34m[33mdestroy[39m[34m callback ([34m[4m#async_hooks_destroy_asyncid[24m[39m[34m)[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mpromiseResolve[39m {Function} The [34m[33mpromiseResolve[39m[34m callback ([34m[4m#async_hooks_promiseresolve_asyncid[24m[39m[34m)[39m.[0m[0m[0m
    * [0mReturns: {AsyncHook} Instance used for disabling and enabling hooks[0m

[0mRegisters functions to be called for different lifetime events of each async[0m
[0moperation.[0m

[0mThe callbacks [33minit()[39m/[33mbefore()[39m/[33mafter()[39m/[33mdestroy()[39m are called for the[0m
[0mrespective asynchronous event during a resource's lifetime.[0m

[0mAll callbacks are optional. For example, if only resource cleanup needs to[0m
[0mbe tracked, then only the [33mdestroy[39m callback needs to be passed. The[0m
[0mspecifics of all functions that can be passed to [33mcallbacks[39m is in the[0m
[0m[34mHook Callbacks ([34m[4m#async_hooks_hook_callbacks[24m[39m[34m)[39m section.[0m

    [94mconst[39m [37masync_hooks[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37masyncHook[39m [93m=[39m [37masync_hooks[39m[32m.[39m[37mcreateHook[39m[90m([39m[33m{[39m
      [37minit[39m[90m([39m[37masyncId[39m[32m,[39m [37mtype[39m[32m,[39m [37mtriggerAsyncId[39m[32m,[39m [37mresource[39m[90m)[39m [33m{[39m [33m}[39m[32m,[39m
      [37mdestroy[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe callbacks will be inherited via the prototype chain:[0m

    [94mclass[39m [37mMyAsyncCallbacks[39m [33m{[39m
      [37minit[39m[90m([39m[37masyncId[39m[32m,[39m [37mtype[39m[32m,[39m [37mtriggerAsyncId[39m[32m,[39m [37mresource[39m[90m)[39m [33m{[39m [33m}[39m
      [37mdestroy[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m[33m}[39m
    [33m}[39m
    
    [94mclass[39m [37mMyAddedCallbacks[39m [94mextends[39m [37mMyAsyncCallbacks[39m [33m{[39m
      [37mbefore[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m [33m}[39m
      [37mafter[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m [33m}[39m
    [33m}[39m
    
    [94mconst[39m [37masyncHook[39m [93m=[39m [37masync_hooks[39m[32m.[39m[37mcreateHook[39m[90m([39m[31mnew[39m [37mMyAddedCallbacks[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m

[32m[1m##### Error Handling[22m[39m

[0mIf any [33mAsyncHook[39m callbacks throw, the application will print the stack trace[0m
[0mand exit. The exit path does follow that of an uncaught exception, but[0m
[0mall [33m'uncaughtException'[39m listeners are removed, thus forcing the process to[0m
[0mexit. The [33m'exit'[39m callbacks will still be called unless the application is run[0m
[0mwith [33m--abort-on-uncaught-exception[39m, in which case a stack trace will be[0m
[0mprinted and the application exits, leaving a core file.[0m

[0mThe reason for this error handling behavior is that these callbacks are running[0m
[0mat potentially volatile points in an object's lifetime, for example during[0m
[0mclass construction and destruction. Because of this, it is deemed necessary to[0m
[0mbring down the process quickly in order to prevent an unintentional abort in the[0m
[0mfuture. This is subject to change in the future if a comprehensive analysis is[0m
[0mperformed to ensure an exception can follow the normal control flow without[0m
[0munintentional side effects.[0m

[32m[1m##### Printing in AsyncHooks callbacks[22m[39m

[0mBecause printing to the console is an asynchronous operation, [33mconsole.log()[39m[0m
[0mwill cause the AsyncHooks callbacks to be called. Using [33mconsole.log()[39m or[0m
[0msimilar asynchronous operations inside an AsyncHooks callback function will thus[0m
[0mcause an infinite recursion. An easy solution to this when debugging is to use a[0m
[0msynchronous logging operation such as [33mfs.writeFileSync(file, msg, flag)[39m.[0m
[0mThis will print to the file and will not invoke AsyncHooks recursively because[0m
[0mit is synchronous.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mdebug[39m[90m([39m[93m...[39m[37margs[39m[90m)[39m [33m{[39m
      [90m// Use a function like this one when debugging inside an AsyncHooks callback[39m
      [37mfs[39m[32m.[39m[37mwriteFileSync[39m[90m([39m[92m'log.out'[39m[32m,[39m `${[37mutil[39m[32m.[39m[37mformat[39m[90m([39m[93m...[39m[37margs[39m[90m)[39m}\n`[32m,[39m [33m{[39m [37mflag[39m[93m:[39m [92m'a'[39m [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[0mIf an asynchronous operation is needed for logging, it is possible to keep[0m
[0mtrack of what caused the asynchronous operation using the information[0m
[0mprovided by AsyncHooks itself. The logging should then be skipped when[0m
[0mit was the logging itself that caused AsyncHooks callback to call. By[0m
[0mdoing this the otherwise infinite recursion is broken.[0m

[32m[1m### Class: [33mAsyncHook[39m[32m[22m[39m

[0mThe class [33mAsyncHook[39m exposes an interface for tracking lifetime events[0m
[0mof asynchronous operations.[0m

[32m[1m#### [33masyncHook.enable()[39m[32m[22m[39m

    * [0mReturns: {AsyncHook} A reference to [33masyncHook[39m.[0m

[0mEnable the callbacks for a given [33mAsyncHook[39m instance. If no callbacks are[0m
[0mprovided enabling is a noop.[0m

[0mThe [33mAsyncHook[39m instance is disabled by default. If the [33mAsyncHook[39m instance[0m
[0mshould be enabled immediately after creation, the following pattern can be used.[0m

    [94mconst[39m [37masync_hooks[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mhook[39m [93m=[39m [37masync_hooks[39m[32m.[39m[37mcreateHook[39m[90m([39m[37mcallbacks[39m[90m)[39m[32m.[39m[37menable[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m#### [33masyncHook.disable()[39m[32m[22m[39m

    * [0mReturns: {AsyncHook} A reference to [33masyncHook[39m.[0m

[0mDisable the callbacks for a given [33mAsyncHook[39m instance from the global pool of[0m
[0m[33mAsyncHook[39m callbacks to be executed. Once a hook has been disabled it will not[0m
[0mbe called again until enabled.[0m

[0mFor API consistency [33mdisable()[39m also returns the [33mAsyncHook[39m instance.[0m

[32m[1m#### Hook Callbacks[22m[39m

[0mKey events in the lifetime of asynchronous events have been categorized into[0m
[0mfour areas: instantiation, before/after the callback is called, and when the[0m
[0minstance is destroyed.[0m

[32m[1m##### [33minit(asyncId, type, triggerAsyncId, resource)[39m[32m[22m[39m

    * [0m[33masyncId[39m {number} A unique ID for the async resource.[0m
    * [0m[33mtype[39m {string} The type of the async resource.[0m
    * [0m[33mtriggerAsyncId[39m {number} The unique ID of the async resource in whose[0m
      [0mexecution context this async resource was created.[0m
    * [0m[33mresource[39m {Object} Reference to the resource representing the async[0m
      [0moperation, needs to be released during [3mdestroy[23m.[0m

[0mCalled when a class is constructed that has the [3mpossibility[23m to emit an[0m
[0masynchronous event. This [3mdoes not[23m mean the instance must call[0m
[0m[33mbefore[39m/[33mafter[39m before [33mdestroy[39m is called, only that the possibility[0m
[0mexists.[0m

[0mThis behavior can be observed by doing something like opening a resource then[0m
[0mclosing it before the resource can be used. The following snippet demonstrates[0m
[0mthis.[0m

    [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[94mfunction[39m[90m([39m[90m)[39m [33m{[39m [91mthis[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// OR[39m
    [37mclearTimeout[39m[90m([39m[37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[32m,[39m [34m10[39m[90m)[39m[90m)[39m[90m;[39m

[0mEvery new resource is assigned an ID that is unique within the scope of the[0m
[0mcurrent Node.js instance.[0m

[32m[1m###### [33mtype[39m[32m[22m[39m

[0mThe [33mtype[39m is a string identifying the type of resource that caused[0m
[0m[33minit[39m to be called. Generally, it will correspond to the name of the[0m
[0mresource's constructor.[0m

    [33mFSEVENTWRAP, FSREQCALLBACK, GETADDRINFOREQWRAP, GETNAMEINFOREQWRAP, HTTPINCOMINGMESSAGE,[39m
    [33mHTTPCLIENTREQUEST, JSSTREAM, PIPECONNECTWRAP, PIPEWRAP, PROCESSWRAP, QUERYWRAP,[39m
    [33mSHUTDOWNWRAP, SIGNALWRAP, STATWATCHER, TCPCONNECTWRAP, TCPSERVERWRAP, TCPWRAP,[39m
    [33mTTYWRAP, UDPSENDWRAP, UDPWRAP, WRITEWRAP, ZLIB, SSLCONNECTION, PBKDF2REQUEST,[39m
    [33mRANDOMBYTESREQUEST, TLSWRAP, Microtask, Timeout, Immediate, TickObject[39m

[0mThere is also the [33mPROMISE[39m resource type, which is used to track [33mPromise[39m[0m
[0minstances and asynchronous work scheduled by them.[0m

[0mUsers are able to define their own [33mtype[39m when using the public embedder API.[0m

[0mIt is possible to have type name collisions. Embedders are encouraged to use[0m
[0munique prefixes, such as the npm package name, to prevent collisions when[0m
[0mlistening to the hooks.[0m

[32m[1m###### [33mtriggerAsyncId[39m[32m[22m[39m

[0m[33mtriggerAsyncId[39m is the [33masyncId[39m of the resource that caused (or "triggered")[0m
[0mthe new resource to initialize and that caused [33minit[39m to call. This is different[0m
[0mfrom [33masync_hooks.executionAsyncId()[39m that only shows [3mwhen[23m a resource was[0m
[0mcreated, while [33mtriggerAsyncId[39m shows [3mwhy[23m a resource was created.[0m

[0mThe following is a simple demonstration of [33mtriggerAsyncId[39m:[0m

    [37masync_hooks[39m[32m.[39m[37mcreateHook[39m[90m([39m[33m{[39m
      [37minit[39m[90m([39m[37masyncId[39m[32m,[39m [37mtype[39m[32m,[39m [37mtriggerAsyncId[39m[90m)[39m [33m{[39m
        [94mconst[39m [37meid[39m [93m=[39m [37masync_hooks[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[90m;[39m
        [37mfs[39m[32m.[39m[37mwriteSync[39m[90m([39m
          [34m1[39m[32m,[39m `${[37mtype[39m}(${[37masyncId[39m}): trigger: ${[37mtriggerAsyncId[39m} execution: ${[37meid[39m}\n`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[32m.[39m[37menable[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mconn[39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m8080[39m[90m)[39m[90m;[39m

[0mOutput when hitting the server with [33mnc localhost 8080[39m:[0m

    [33mTCPSERVERWRAP(5): trigger: 1 execution: 1[39m
    [33mTCPWRAP(7): trigger: 5 execution: 0[39m

[0mThe [33mTCPSERVERWRAP[39m is the server which receives the connections.[0m

[0mThe [33mTCPWRAP[39m is the new connection from the client. When a new[0m
[0mconnection is made, the [33mTCPWrap[39m instance is immediately constructed. This[0m
[0mhappens outside of any JavaScript stack. (An [33mexecutionAsyncId()[39m of [33m0[39m means[0m
[0mthat it is being executed from C++ with no JavaScript stack above it.) With only[0m
[0mthat information, it would be impossible to link resources together in[0m
[0mterms of what caused them to be created, so [33mtriggerAsyncId[39m is given the task[0m
[0mof propagating what resource is responsible for the new resource's existence.[0m

[32m[1m###### [33mresource[39m[32m[22m[39m

[0m[33mresource[39m is an object that represents the actual async resource that has[0m
[0mbeen initialized. This can contain useful information that can vary based on[0m
[0mthe value of [33mtype[39m. For instance, for the [33mGETADDRINFOREQWRAP[39m resource type,[0m
[0m[33mresource[39m provides the host name used when looking up the IP address for the[0m
[0mhost in [33mnet.Server.listen()[39m. The API for accessing this information is[0m
[0mcurrently not considered public, but using the Embedder API, users can provide[0m
[0mand document their own resource objects. For example, such a resource object[0m
[0mcould contain the SQL query being executed.[0m

[0mIn the case of Promises, the [33mresource[39m object will have an[0m
[0m[33misChainedPromise[39m property, set to [33mtrue[39m if the promise has a parent promise,[0m
[0mand [33mfalse[39m otherwise. For example, in the case of [33mb = a.then(handler)[39m, [33ma[39m is[0m
[0mconsidered a parent [33mPromise[39m of [33mb[39m. Here, [33mb[39m is considered a chained promise.[0m

[0mIn some cases the resource object is reused for performance reasons, it is[0m
[0mthus not safe to use it as a key in a [33mWeakMap[39m or add properties to it.[0m

[32m[1m###### Asynchronous context example[22m[39m

[0mThe following is an example with additional information about the calls to[0m
[0m[33minit[39m between the [33mbefore[39m and [33mafter[39m calls, specifically what the[0m
[0mcallback to [33mlisten()[39m will look like. The output formatting is slightly more[0m
[0melaborate to make calling context easier to see.[0m

    [94mlet[39m [37mindent[39m [93m=[39m [34m0[39m[90m;[39m
    [37masync_hooks[39m[32m.[39m[37mcreateHook[39m[90m([39m[33m{[39m
      [37minit[39m[90m([39m[37masyncId[39m[32m,[39m [37mtype[39m[32m,[39m [37mtriggerAsyncId[39m[90m)[39m [33m{[39m
        [94mconst[39m [37meid[39m [93m=[39m [37masync_hooks[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[90m;[39m
        [94mconst[39m [37mindentStr[39m [93m=[39m [92m' '[39m[32m.[39m[37mrepeat[39m[90m([39m[37mindent[39m[90m)[39m[90m;[39m
        [37mfs[39m[32m.[39m[37mwriteSync[39m[90m([39m
          [34m1[39m[32m,[39m
          `${[37mindentStr[39m}${[37mtype[39m}(${[37masyncId[39m}):` [93m+[39m
          ` trigger: ${[37mtriggerAsyncId[39m} execution: ${[37meid[39m}\n`[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m
      [37mbefore[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m
        [94mconst[39m [37mindentStr[39m [93m=[39m [92m' '[39m[32m.[39m[37mrepeat[39m[90m([39m[37mindent[39m[90m)[39m[90m;[39m
        [37mfs[39m[32m.[39m[37mwriteFileSync[39m[90m([39m[92m'log.out'[39m[32m,[39m
                         `${[37mindentStr[39m}before:  ${[37masyncId[39m}\n`[32m,[39m [33m{[39m [37mflag[39m[93m:[39m [92m'a'[39m [33m}[39m[90m)[39m[90m;[39m
        [37mindent[39m [93m+=[39m [34m2[39m[90m;[39m
      [33m}[39m[32m,[39m
      [37mafter[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m
        [37mindent[39m [93m-=[39m [34m2[39m[90m;[39m
        [94mconst[39m [37mindentStr[39m [93m=[39m [92m' '[39m[32m.[39m[37mrepeat[39m[90m([39m[37mindent[39m[90m)[39m[90m;[39m
        [37mfs[39m[32m.[39m[37mwriteFileSync[39m[90m([39m[92m'log.out'[39m[32m,[39m
                         `${[37mindentStr[39m}after:  ${[37masyncId[39m}\n`[32m,[39m [33m{[39m [37mflag[39m[93m:[39m [92m'a'[39m [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m
      [37mdestroy[39m[90m([39m[37masyncId[39m[90m)[39m [33m{[39m
        [94mconst[39m [37mindentStr[39m [93m=[39m [92m' '[39m[32m.[39m[37mrepeat[39m[90m([39m[37mindent[39m[90m)[39m[90m;[39m
        [37mfs[39m[32m.[39m[37mwriteFileSync[39m[90m([39m[92m'log.out'[39m[32m,[39m
                         `${[37mindentStr[39m}destroy:  ${[37masyncId[39m}\n`[32m,[39m [33m{[39m [37mflag[39m[93m:[39m [92m'a'[39m [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m
    [33m}[39m[90m)[39m[32m.[39m[37menable[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m8080[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Let's wait 10ms before logging the server started.[39m
      [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'>>>'[39m[32m,[39m [37masync_hooks[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m [34m10[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOutput from only starting the server:[0m

    [33mTCPSERVERWRAP(5): trigger: 1 execution: 1[39m
    [33mTickObject(6): trigger: 5 execution: 1[39m
    [33mbefore:  6[39m
    [33m  Timeout(7): trigger: 6 execution: 6[39m
    [33mafter:   6[39m
    [33mdestroy: 6[39m
    [33mbefore:  7[39m
    [33m>>> 7[39m
    [33m  TickObject(8): trigger: 7 execution: 7[39m
    [33mafter:   7[39m
    [33mbefore:  8[39m
    [33mafter:   8[39m

[0mAs illustrated in the example, [33mexecutionAsyncId()[39m and [33mexecution[39m each specify[0m
[0mthe value of the current execution context; which is delineated by calls to[0m
[0m[33mbefore[39m and [33mafter[39m.[0m

[0mOnly using [33mexecution[39m to graph resource allocation results in the following:[0m

    [33mTimeout(7) -> TickObject(6) -> root(1)[39m

[0mThe [33mTCPSERVERWRAP[39m is not part of this graph, even though it was the reason for[0m
[0m[33mconsole.log()[39m being called. This is because binding to a port without a host[0m
[0mname is a [3msynchronous[23m operation, but to maintain a completely asynchronous[0m
[0mAPI the user's callback is placed in a [33mprocess.nextTick()[39m.[0m

[0mThe graph only shows [3mwhen[23m a resource was created, not [3mwhy[23m, so to track[0m
[0mthe [3mwhy[23m use [33mtriggerAsyncId[39m.[0m

[32m[1m##### [33mbefore(asyncId)[39m[32m[22m[39m

    * [0m[33masyncId[39m {number}[0m

[0mWhen an asynchronous operation is initiated (such as a TCP server receiving a[0m
[0mnew connection) or completes (such as writing data to disk) a callback is[0m
[0mcalled to notify the user. The [33mbefore[39m callback is called just before said[0m
[0mcallback is executed. [33masyncId[39m is the unique identifier assigned to the[0m
[0mresource about to execute the callback.[0m

[0mThe [33mbefore[39m callback will be called 0 to N times. The [33mbefore[39m callback[0m
[0mwill typically be called 0 times if the asynchronous operation was cancelled[0m
[0mor, for example, if no connections are received by a TCP server. Persistent[0m
[0masynchronous resources like a TCP server will typically call the [33mbefore[39m[0m
[0mcallback multiple times, while other operations like [33mfs.open()[39m will call[0m
[0mit only once.[0m

[32m[1m##### [33mafter(asyncId)[39m[32m[22m[39m

    * [0m[33masyncId[39m {number}[0m

[0mCalled immediately after the callback specified in [33mbefore[39m is completed.[0m

[0mIf an uncaught exception occurs during execution of the callback, then [33mafter[39m[0m
[0mwill run [3mafter[23m the [33m'uncaughtException'[39m event is emitted or a [33mdomain[39m's[0m
[0mhandler runs.[0m

[32m[1m##### [33mdestroy(asyncId)[39m[32m[22m[39m

    * [0m[33masyncId[39m {number}[0m

[0mCalled after the resource corresponding to [33masyncId[39m is destroyed. It is also[0m
[0mcalled asynchronously from the embedder API [33memitDestroy()[39m.[0m

[0mSome resources depend on garbage collection for cleanup, so if a reference is[0m
[0mmade to the [33mresource[39m object passed to [33minit[39m it is possible that [33mdestroy[39m[0m
[0mwill never be called, causing a memory leak in the application. If the resource[0m
[0mdoes not depend on garbage collection, then this will not be an issue.[0m

[32m[1m##### [33mpromiseResolve(asyncId)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33masyncId[39m {number}[0m

[0mCalled when the [33mresolve[39m function passed to the [33mPromise[39m constructor is[0m
[0minvoked (either directly or through other means of resolving a promise).[0m

[0m[33mresolve()[39m does not do any observable synchronous work.[0m

[0mThe [33mPromise[39m is not necessarily fulfilled or rejected at this point if the[0m
[0m[33mPromise[39m was resolved by assuming the state of another [33mPromise[39m.[0m

    [31mnew[39m [37mPromise[39m[90m([39m[90m([39m[37mresolve[39m[90m)[39m [93m=>[39m [37mresolve[39m[90m([39m[91mtrue[39m[90m)[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37ma[39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m

[0mcalls the following callbacks:[0m

    [33minit for PROMISE with id 5, trigger id: 1[39m
    [33m  promise resolve 5      # corresponds to resolve(true)[39m
    [33minit for PROMISE with id 6, trigger id: 5  # the Promise returned by then()[39m
    [33m  before 6               # the then() callback is entered[39m
    [33m  promise resolve 6      # the then() callback resolves the promise by returning[39m
    [33m  after 6[39m

[32m[1m#### [33masync_hooks.executionAsyncResource()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object} The resource representing the current execution.[0m
      [0mUseful to store data within the resource.[0m

[0mResource objects returned by [33mexecutionAsyncResource()[39m are most often internal[0m
[0mNode.js handle objects with undocumented APIs. Using any functions or properties[0m
[0mon the object is likely to crash your application and should be avoided.[0m

[0mUsing [33mexecutionAsyncResource()[39m in the top-level execution context will[0m
[0mreturn an empty object as there is no handle or request object to use,[0m
[0mbut having an object representing the top-level can be helpful.[0m

    [94mconst[39m [33m{[39m [37mopen[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mexecutionAsyncId[39m[32m,[39m [37mexecutionAsyncResource[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[32m,[39m [37mexecutionAsyncResource[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// 1 {}[39m
    [37mopen[39m[90m([39m[37m__filename[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[32m,[39m [37mexecutionAsyncResource[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// 7 FSReqWrap[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThis can be used to implement continuation local storage without the[0m
[0muse of a tracking [33mMap[39m to store the metadata:[0m

    [94mconst[39m [33m{[39m [37mcreateServer[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m
      [37mexecutionAsyncId[39m[32m,[39m
      [37mexecutionAsyncResource[39m[32m,[39m
      [37mcreateHook[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37msym[39m [93m=[39m [37mSymbol[39m[90m([39m[92m'state'[39m[90m)[39m[90m;[39m [90m// Private symbol to avoid pollution[39m
    
    [37mcreateHook[39m[90m([39m[33m{[39m
      [37minit[39m[90m([39m[37masyncId[39m[32m,[39m [37mtype[39m[32m,[39m [37mtriggerAsyncId[39m[32m,[39m [37mresource[39m[90m)[39m [33m{[39m
        [94mconst[39m [37mcr[39m [93m=[39m [37mexecutionAsyncResource[39m[90m([39m[90m)[39m[90m;[39m
        [94mif[39m [90m([39m[37mcr[39m[90m)[39m [33m{[39m
          [37mresource[39m[33m[[39m[37msym[39m[33m][39m [93m=[39m [37mcr[39m[33m[[39m[37msym[39m[33m][39m[90m;[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m[90m)[39m[32m.[39m[37menable[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mcreateServer[39m[90m([39m[94mfunction[39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [33m{[39m
      [37mexecutionAsyncResource[39m[90m([39m[90m)[39m[33m[[39m[37msym[39m[33m][39m [93m=[39m [33m{[39m [37mstate[39m[93m:[39m [37mreq[39m[32m.[39m[37murl[39m [33m}[39m[90m;[39m
      [37msetTimeout[39m[90m([39m[94mfunction[39m[90m([39m[90m)[39m [33m{[39m
        [37mres[39m[32m.[39m[37mend[39m[90m([39m[37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37mexecutionAsyncResource[39m[90m([39m[90m)[39m[33m[[39m[37msym[39m[33m][39m[90m)[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m [34m100[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m3000[39m[90m)[39m[90m;[39m

[32m[1m#### [33masync_hooks.executionAsyncId()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.1.0[39m
[90mchanges:[39m
[90m  - version: v8.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13490[39m
[90m    description: Renamed from `currentId`[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {number} The [33masyncId[39m of the current execution context. Useful to[0m
      [0mtrack when something calls.[0m

    [94mconst[39m [37masync_hooks[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37masync_hooks[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// 1 - bootstrap[39m
    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[37mpath[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37masync_hooks[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m  [90m// 6 - open()[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe ID returned from [33mexecutionAsyncId()[39m is related to execution timing, not[0m
[0mcausality (which is covered by [33mtriggerAsyncId()[39m):[0m

    [94mconst[39m [37mserver[39m [93m=[39m [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mconn[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Returns the ID of the server, not of the new connection, because the[39m
      [90m// callback runs in the execution scope of the server's MakeCallback().[39m
      [37masync_hooks[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[90m;[39m
    
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[37mport[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Returns the ID of a TickObject (i.e. process.nextTick()) because all[39m
      [90m// callbacks passed to .listen() are wrapped in a nextTick().[39m
      [37masync_hooks[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mPromise contexts may not get precise [33mexecutionAsyncIds[39m by default.[0m
[0mSee the section on [34mpromise execution tracking ([34m[4m#async_hooks_promise_execution_tracking[24m[39m[34m)[39m.[0m

[32m[1m#### [33masync_hooks.triggerAsyncId()[39m[32m[22m[39m

    * [0mReturns: {number} The ID of the resource responsible for calling the callback[0m
      [0mthat is currently being executed.[0m

    [94mconst[39m [37mserver[39m [93m=[39m [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mconn[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// The resource that caused (or triggered) this callback to be called[39m
      [90m// was that of the new connection. Thus the return value of triggerAsyncId()[39m
      [90m// is the asyncId of "conn".[39m
      [37masync_hooks[39m[32m.[39m[37mtriggerAsyncId[39m[90m([39m[90m)[39m[90m;[39m
    
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[37mport[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Even though all callbacks passed to .listen() are wrapped in a nextTick()[39m
      [90m// the callback itself exists because the call to the server's .listen()[39m
      [90m// was made. So the return value would be the ID of the server.[39m
      [37masync_hooks[39m[32m.[39m[37mtriggerAsyncId[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mPromise contexts may not get valid [33mtriggerAsyncId[39ms by default. See[0m
[0mthe section on [34mpromise execution tracking ([34m[4m#async_hooks_promise_execution_tracking[24m[39m[34m)[39m.[0m

[32m[1m## Promise execution tracking[22m[39m

[0mBy default, promise executions are not assigned [33masyncId[39ms due to the relatively[0m
[0mexpensive nature of the [34mpromise introspection API ([34m[4mhttps://docs.google.com/document/d/1rda3yKGHimKIhg5YeoAmCOtyURgsbTH_qaYR79FELlk/edit[24m[39m[34m)[39m provided by[0m
[0mV8. This means that programs using promises or [33masync[39m/[33mawait[39m will not get[0m
[0mcorrect execution and trigger ids for promise callback contexts by default.[0m

    [94mconst[39m [37mah[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    [37mPromise[39m[32m.[39m[37mresolve[39m[90m([39m[34m1729[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`eid ${[37mah[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m} tid ${[37mah[39m[32m.[39m[37mtriggerAsyncId[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// produces:[39m
    [90m// eid 1 tid 0[39m

[0mObserve that the [33mthen()[39m callback claims to have executed in the context of the[0m
[0mouter scope even though there was an asynchronous hop involved. Also,[0m
[0mthe [33mtriggerAsyncId[39m value is [33m0[39m, which means that we are missing context about[0m
[0mthe resource that caused (triggered) the [33mthen()[39m callback to be executed.[0m

[0mInstalling async hooks via [33masync_hooks.createHook[39m enables promise execution[0m
[0mtracking:[0m

    [94mconst[39m [37mah[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    [37mah[39m[32m.[39m[37mcreateHook[39m[90m([39m[33m{[39m [37minit[39m[90m([39m[90m)[39m [33m{[39m[33m}[39m [33m}[39m[90m)[39m[32m.[39m[37menable[39m[90m([39m[90m)[39m[90m;[39m [90m// forces PromiseHooks to be enabled.[39m
    [37mPromise[39m[32m.[39m[37mresolve[39m[90m([39m[34m1729[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`eid ${[37mah[39m[32m.[39m[37mexecutionAsyncId[39m[90m([39m[90m)[39m} tid ${[37mah[39m[32m.[39m[37mtriggerAsyncId[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// produces:[39m
    [90m// eid 7 tid 6[39m

[0mIn this example, adding any actual hook function enabled the tracking of[0m
[0mpromises. There are two promises in the example above; the promise created by[0m
[0m[33mPromise.resolve()[39m and the promise returned by the call to [33mthen()[39m. In the[0m
[0mexample above, the first promise got the [33masyncId[39m [33m6[39m and the latter got[0m
[0m[33masyncId[39m [33m7[39m. During the execution of the [33mthen()[39m callback, we are executing[0m
[0min the context of promise with [33masyncId[39m [33m7[39m. This promise was triggered by[0m
[0masync resource [33m6[39m.[0m

[0mAnother subtlety with promises is that [33mbefore[39m and [33mafter[39m callbacks are run[0m
[0monly on chained promises. That means promises not created by [33mthen()[39m/[33mcatch()[39m[0m
[0mwill not have the [33mbefore[39m and [33mafter[39m callbacks fired on them. For more details[0m
[0msee the details of the V8 [34mPromiseHooks ([34m[4mhttps://docs.google.com/document/d/1rda3yKGHimKIhg5YeoAmCOtyURgsbTH_qaYR79FELlk/edit[24m[39m[34m)[39m API.[0m

[32m[1m## JavaScript Embedder API[22m[39m

[0mLibrary developers that handle their own asynchronous resources performing tasks[0m
[0mlike I/O, connection pooling, or managing callback queues may use the[0m
[0m[33mAsyncWrap[39m JavaScript API so that all the appropriate callbacks are called.[0m

[32m[1m### Class: [33mAsyncResource[39m[32m[22m[39m

[0mThe class [33mAsyncResource[39m is designed to be extended by the embedder's async[0m
[0mresources. Using this, users can easily trigger the lifetime events of their[0m
[0mown resources.[0m

[0mThe [33minit[39m hook will trigger when an [33mAsyncResource[39m is instantiated.[0m

[0mThe following is an overview of the [33mAsyncResource[39m API.[0m

    [94mconst[39m [33m{[39m [37mAsyncResource[39m[32m,[39m [37mexecutionAsyncId[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    
    [90m// AsyncResource() is meant to be extended. Instantiating a[39m
    [90m// new AsyncResource() also triggers init. If triggerAsyncId is omitted then[39m
    [90m// async_hook.executionAsyncId() is used.[39m
    [94mconst[39m [37masyncResource[39m [93m=[39m [31mnew[39m [37mAsyncResource[39m[90m([39m
      [37mtype[39m[32m,[39m [33m{[39m [37mtriggerAsyncId[39m[93m:[39m [37mexecutionAsyncId[39m[90m([39m[90m)[39m[32m,[39m [37mrequireManualDestroy[39m[93m:[39m [91mfalse[39m [33m}[39m
    [90m)[39m[90m;[39m
    
    [90m// Run a function in the execution context of the resource. This will[39m
    [90m// * establish the context of the resource[39m
    [90m// * trigger the AsyncHooks before callbacks[39m
    [90m// * call the provided function `fn` with the supplied arguments[39m
    [90m// * trigger the AsyncHooks after callbacks[39m
    [90m// * restore the original execution context[39m
    [37masyncResource[39m[32m.[39m[37mrunInAsyncScope[39m[90m([39m[37mfn[39m[32m,[39m [37mthisArg[39m[32m,[39m [93m...[39m[37margs[39m[90m)[39m[90m;[39m
    
    [90m// Call AsyncHooks destroy callbacks.[39m
    [37masyncResource[39m[32m.[39m[37memitDestroy[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// Return the unique ID assigned to the AsyncResource instance.[39m
    [37masyncResource[39m[32m.[39m[37masyncId[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// Return the trigger ID for the AsyncResource instance.[39m
    [37masyncResource[39m[32m.[39m[37mtriggerAsyncId[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m#### [33mnew AsyncResource(type[, options])[39m[32m[22m[39m

    * [0m[33mtype[39m {string} The type of async event.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mtriggerAsyncId[39m {number} The ID of the execution context that created this[0m[0m[0m
      [0m      [0m[0masync event. [1mDefault:[22m [33mexecutionAsyncId()[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mrequireManualDestroy[39m {boolean} If set to [33mtrue[39m, disables [33memitDestroy[39m[0m[0m[0m
      [0m      [0m[0mwhen the object is garbage collected. This usually does not need to be set[0m[0m[0m
      [0m      [0m[0m(even if [33memitDestroy[39m is called manually), unless the resource's [33masyncId[39m[0m[0m[0m
      [0m      [0m[0mis retrieved and the sensitive API's [33memitDestroy[39m is called with it.[0m[0m[0m
      [0m      [0m[0mWhen set to [33mfalse[39m, the [33memitDestroy[39m call on garbage collection[0m[0m[0m
      [0m      [0m[0mwill only take place if there is at least one active [33mdestroy[39m hook.[0m[0m[0m
      [0m
        * [0m[0m[3mDefault:*[23m [33mfalse[39m.[0m[0m[0m

[0mExample usage:[0m

    [94mclass[39m [37mDBQuery[39m [94mextends[39m [37mAsyncResource[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37mdb[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[92m'DBQuery'[39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37mdb[39m [93m=[39m [37mdb[39m[90m;[39m
      [33m}[39m
    
      [37mgetInfo[39m[90m([39m[37mquery[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37mdb[39m[32m.[39m[37mget[39m[90m([39m[37mquery[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
          [91mthis[39m[32m.[39m[37mrunInAsyncScope[39m[90m([39m[37mcallback[39m[32m,[39m [90mnull[39m[32m,[39m [37merr[39m[32m,[39m [37mdata[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [37mclose[39m[90m([39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37mdb[39m [93m=[39m [90mnull[39m[90m;[39m
        [91mthis[39m[32m.[39m[37memitDestroy[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m

[32m[1m#### [33masyncResource.runInAsyncScope(fn[, thisArg, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfn[39m {Function} The function to call in the execution context of this async[0m
      [0mresource.[0m
    * [0m[33mthisArg[39m {any} The receiver to be used for the function call.[0m
    * [0m[33m...args[39m {any} Optional arguments to pass to the function.[0m

[0mCall the provided function with the provided arguments in the execution context[0m
[0mof the async resource. This will establish the context, trigger the AsyncHooks[0m
[0mbefore callbacks, call the function, trigger the AsyncHooks after callbacks, and[0m
[0mthen restore the original execution context.[0m

[32m[1m#### [33masyncResource.emitDestroy()[39m[32m[22m[39m

    * [0mReturns: {AsyncResource} A reference to [33masyncResource[39m.[0m

[0mCall all [33mdestroy[39m hooks. This should only ever be called once. An error will[0m
[0mbe thrown if it is called more than once. This [1mmust[22m be manually called. If[0m
[0mthe resource is left to be collected by the GC then the [33mdestroy[39m hooks will[0m
[0mnever be called.[0m

[32m[1m#### [33masyncResource.asyncId()[39m[32m[22m[39m

    * [0mReturns: {number} The unique [33masyncId[39m assigned to the resource.[0m

[32m[1m#### [33masyncResource.triggerAsyncId()[39m[32m[22m[39m

    * [0mReturns: {number} The same [33mtriggerAsyncId[39m that is passed to the[0m
      [0m[33mAsyncResource[39m constructor.[0m

[0m[90m<a id="async-resource-worker-pool">[39m[90m</a>[39m[0m

[32m[1m### Using [33mAsyncResource[39m[32m for a [33mWorker[39m[32m thread pool[22m[39m

[0mThe following example shows how to use the [33mAsyncResource[39m class to properly[0m
[0mprovide async tracking for a [34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m pool. Other resource pools, such as[0m
[0mdatabase connection pools, can follow a similar model.[0m

[0mAssuming that the task is adding two numbers, using a file named[0m
[0m[33mtask_processor.js[39m with the following content:[0m

    [94mconst[39m [33m{[39m [37mparentPort[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    [37mparentPort[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mtask[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mparentPort[39m[32m.[39m[37mpostMessage[39m[90m([39m[37mtask[39m[32m.[39m[37ma[39m [93m+[39m [37mtask[39m[32m.[39m[37mb[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0ma Worker pool around it could use the following structure:[0m

    [94mconst[39m [33m{[39m [37mAsyncResource[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mEventEmitter[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mpath[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/path'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mWorker[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/worker_threads'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mkTaskInfo[39m [93m=[39m [37mSymbol[39m[90m([39m[92m'kTaskInfo'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mkWorkerFreedEvent[39m [93m=[39m [37mSymbol[39m[90m([39m[92m'kWorkerFreedEvent'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mWorkerPoolTaskInfo[39m [94mextends[39m [37mAsyncResource[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37mcallback[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[92m'WorkerPoolTaskInfo'[39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37mcallback[39m [93m=[39m [37mcallback[39m[90m;[39m
      [33m}[39m
    
      [37mdone[39m[90m([39m[37merr[39m[32m,[39m [37mresult[39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37mrunInAsyncScope[39m[90m([39m[91mthis[39m[32m.[39m[37mcallback[39m[32m,[39m [90mnull[39m[32m,[39m [37merr[39m[32m,[39m [37mresult[39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37memitDestroy[39m[90m([39m[90m)[39m[90m;[39m  [90m// `TaskInfo`s are used only once.[39m
      [33m}[39m
    [33m}[39m
    
    [94mclass[39m [37mWorkerPool[39m [94mextends[39m [37mEventEmitter[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37mnumThreads[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37mnumThreads[39m [93m=[39m [37mnumThreads[39m[90m;[39m
        [91mthis[39m[32m.[39m[37mworkers[39m [93m=[39m [33m[[39m[33m][39m[90m;[39m
        [91mthis[39m[32m.[39m[37mfreeWorkers[39m [93m=[39m [33m[[39m[33m][39m[90m;[39m
    
        [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [37mnumThreads[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m
          [91mthis[39m[32m.[39m[37maddNewWorker[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [37maddNewWorker[39m[90m([39m[90m)[39m [33m{[39m
        [94mconst[39m [37mworker[39m [93m=[39m [31mnew[39m [37mWorker[39m[90m([39m[37mpath[39m[32m.[39m[37mresolve[39m[90m([39m[37m__dirname[39m[32m,[39m [92m'task_processor.js'[39m[90m)[39m[90m)[39m[90m;[39m
        [37mworker[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mresult[39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// In case of success: Call the callback that was passed to `runTask`,[39m
          [90m// remove the `TaskInfo` associated with the Worker, and mark it as free[39m
          [90m// again.[39m
          [37mworker[39m[33m[[39m[37mkTaskInfo[39m[33m][39m[32m.[39m[37mdone[39m[90m([39m[90mnull[39m[32m,[39m [37mresult[39m[90m)[39m[90m;[39m
          [37mworker[39m[33m[[39m[37mkTaskInfo[39m[33m][39m [93m=[39m [90mnull[39m[90m;[39m
          [91mthis[39m[32m.[39m[37mfreeWorkers[39m[32m.[39m[37mpush[39m[90m([39m[37mworker[39m[90m)[39m[90m;[39m
          [91mthis[39m[32m.[39m[37memit[39m[90m([39m[37mkWorkerFreedEvent[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
        [37mworker[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// In case of an uncaught exception: Call the callback that was passed to[39m
          [90m// `runTask` with the error.[39m
          [94mif[39m [90m([39m[37mworker[39m[33m[[39m[37mkTaskInfo[39m[33m][39m[90m)[39m
            [37mworker[39m[33m[[39m[37mkTaskInfo[39m[33m][39m[32m.[39m[37mdone[39m[90m([39m[37merr[39m[32m,[39m [90mnull[39m[90m)[39m[90m;[39m
          [94melse[39m
            [91mthis[39m[32m.[39m[37memit[39m[90m([39m[92m'error'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
          [90m// Remove the worker from the list and start a new Worker to replace the[39m
          [90m// current one.[39m
          [91mthis[39m[32m.[39m[37mworkers[39m[32m.[39m[37msplice[39m[90m([39m[91mthis[39m[32m.[39m[37mworkers[39m[32m.[39m[37mindexOf[39m[90m([39m[37mworker[39m[90m)[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
          [91mthis[39m[32m.[39m[37maddNewWorker[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37mworkers[39m[32m.[39m[37mpush[39m[90m([39m[37mworker[39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37mfreeWorkers[39m[32m.[39m[37mpush[39m[90m([39m[37mworker[39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [37mrunTask[39m[90m([39m[37mtask[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[91mthis[39m[32m.[39m[37mfreeWorkers[39m[32m.[39m[37mlength[39m [93m===[39m [34m0[39m[90m)[39m [33m{[39m
          [90m// No free threads, wait until a worker thread becomes free.[39m
          [91mthis[39m[32m.[39m[37monce[39m[90m([39m[37mkWorkerFreedEvent[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [91mthis[39m[32m.[39m[37mrunTask[39m[90m([39m[37mtask[39m[32m,[39m [37mcallback[39m[90m)[39m[90m)[39m[90m;[39m
          [31mreturn[39m[90m;[39m
        [33m}[39m
    
        [94mconst[39m [37mworker[39m [93m=[39m [91mthis[39m[32m.[39m[37mfreeWorkers[39m[32m.[39m[37mpop[39m[90m([39m[90m)[39m[90m;[39m
        [37mworker[39m[33m[[39m[37mkTaskInfo[39m[33m][39m [93m=[39m [31mnew[39m [37mWorkerPoolTaskInfo[39m[90m([39m[37mcallback[39m[90m)[39m[90m;[39m
        [37mworker[39m[32m.[39m[37mpostMessage[39m[90m([39m[37mtask[39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [37mclose[39m[90m([39m[90m)[39m [33m{[39m
        [94mfor[39m [90m([39m[94mconst[39m [37mworker[39m [37mof[39m [91mthis[39m[32m.[39m[37mworkers[39m[90m)[39m [37mworker[39m[32m.[39m[37mterminate[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [37mmodule[39m[32m.[39m[37mexports[39m [93m=[39m [37mWorkerPool[39m[90m;[39m

[0mWithout the explicit tracking added by the [33mWorkerPoolTaskInfo[39m objects,[0m
[0mit would appear that the callbacks are associated with the individual [33mWorker[39m[0m
[0mobjects. However, the creation of the [33mWorker[39ms is not associated with the[0m
[0mcreation of the tasks and does not provide information about when tasks[0m
[0mwere scheduled.[0m

[0mThis pool could be used as follows:[0m

    [94mconst[39m [37mWorkerPool[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./worker_pool.js'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mos[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/os'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mpool[39m [93m=[39m [31mnew[39m [37mWorkerPool[39m[90m([39m[37mos[39m[32m.[39m[37mcpus[39m[90m([39m[90m)[39m[32m.[39m[37mlength[39m[90m)[39m[90m;[39m
    
    [94mlet[39m [37mfinished[39m [93m=[39m [34m0[39m[90m;[39m
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m10[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
      [37mpool[39m[32m.[39m[37mrunTask[39m[90m([39m[33m{[39m [37ma[39m[93m:[39m [34m42[39m[32m,[39m [37mb[39m[93m:[39m [34m100[39m [33m}[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mresult[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mi[39m[32m,[39m [37merr[39m[32m,[39m [37mresult[39m[90m)[39m[90m;[39m
        [94mif[39m [90m([39m[93m++[39m[37mfinished[39m [93m===[39m [34m10[39m[90m)[39m
          [37mpool[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## Class: [33mAsyncLocalStorage[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis class is used to create asynchronous state within callbacks and promise[0m
[0mchains. It allows storing data throughout the lifetime of a web request[0m
[0mor any other asynchronous duration. It is similar to thread-local storage[0m
[0min other languages.[0m

[0mThe following example builds a logger that will always know the current HTTP[0m
[0mrequest and uses it to display enhanced logs without needing to explicitly[0m
[0mprovide the current HTTP request to it.[0m

    [94mconst[39m [33m{[39m [37mAsyncLocalStorage[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/async_hooks'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mkReq[39m [93m=[39m [92m'CURRENT_REQUEST'[39m[90m;[39m
    [94mconst[39m [37masyncLocalStorage[39m [93m=[39m [31mnew[39m [37mAsyncLocalStorage[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [34mlog[39m[90m([39m[93m...[39m[37margs[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mstore[39m [93m=[39m [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m
      [90m// Make sure the store exists and it contains a request.[39m
      [94mif[39m [90m([39m[37mstore[39m [93m&&[39m [37mstore[39m[32m.[39m[37mhas[39m[90m([39m[37mkReq[39m[90m)[39m[90m)[39m [33m{[39m
        [94mconst[39m [37mreq[39m [93m=[39m [37mstore[39m[32m.[39m[37mget[39m[90m([39m[37mkReq[39m[90m)[39m[90m;[39m
        [90m// Prints `GET /items ERR could not do something[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mreq[39m[32m.[39m[37mmethod[39m[32m,[39m [37mreq[39m[32m.[39m[37murl[39m[32m,[39m [93m...[39m[37margs[39m[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[93m...[39m[37margs[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mrequest[39m[32m,[39m [37mresponse[39m[90m)[39m [93m=>[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mrun[39m[90m([39m[31mnew[39m [37mMap[39m[90m([39m[90m)[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mconst[39m [37mstore[39m [93m=[39m [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m
        [37mstore[39m[32m.[39m[37mset[39m[90m([39m[37mkReq[39m[32m,[39m [37mrequest[39m[90m)[39m[90m;[39m
        [37msomeAsyncOperation[39m[90m([39m[90m([39m[37merr[39m[32m,[39m [37mresult[39m[90m)[39m [93m=>[39m [33m{[39m
          [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
            [34mlog[39m[90m([39m[92m'ERR'[39m[32m,[39m [37merr[39m[32m.[39m[37mmessage[39m[90m)[39m[90m;[39m
          [33m}[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m
    [32m.[39m[37mlisten[39m[90m([39m[34m8080[39m[90m)[39m[90m;[39m

[0mWhen having multiple instances of [33mAsyncLocalStorage[39m, they are independent[0m
[0mfrom each other. It is safe to instantiate this class multiple times.[0m

[32m[1m### [33mnew AsyncLocalStorage()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCreates a new instance of [33mAsyncLocalStorage[39m. Store is only provided within a[0m
[0m[33mrun[39m or a [33mrunSyncAndReturn[39m method call.[0m

[32m[1m### [33masyncLocalStorage.disable()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis method disables the instance of [33mAsyncLocalStorage[39m. All subsequent calls[0m
[0mto [33masyncLocalStorage.getStore()[39m will return [33mundefined[39m until[0m
[0m[33masyncLocalStorage.run()[39m or [33masyncLocalStorage.runSyncAndReturn()[39m[0m
[0mis called again.[0m

[0mWhen calling [33masyncLocalStorage.disable()[39m, all current contexts linked to the[0m
[0minstance will be exited.[0m

[0mCalling [33masyncLocalStorage.disable()[39m is required before the[0m
[0m[33masyncLocalStorage[39m can be garbage collected. This does not apply to stores[0m
[0mprovided by the [33masyncLocalStorage[39m, as those objects are garbage collected[0m
[0malong with the corresponding async resources.[0m

[0mThis method is to be used when the [33masyncLocalStorage[39m is not in use anymore[0m
[0min the current process.[0m

[32m[1m### [33masyncLocalStorage.getStore()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {any}[0m

[0mThis method returns the current store.[0m
[0mIf this method is called outside of an asynchronous context initialized by[0m
[0mcalling [33masyncLocalStorage.run[39m or [33masyncLocalStorage.runSyncAndReturn[39m, it will[0m
[0mreturn [33mundefined[39m.[0m

[32m[1m### [33masyncLocalStorage.enterWith(store)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstore[39m {any}[0m

[0mCalling [33masyncLocalStorage.enterWith(store)[39m will transition into the context[0m
[0mfor the remainder of the current synchronous execution and will persist[0m
[0mthrough any following asynchronous calls.[0m

[0mExample:[0m

    [94mconst[39m [37mstore[39m [93m=[39m [33m{[39m [37mid[39m[93m:[39m [34m1[39m [33m}[39m[90m;[39m
    [37masyncLocalStorage[39m[32m.[39m[37menterWith[39m[90m([39m[37mstore[39m[90m)[39m[90m;[39m
    [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns the store object[39m
    [37msomeAsyncOperation[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns the same object[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThis transition will continue for the [3mentire[23m synchronous execution.[0m
[0mThis means that if, for example, the context is entered within an event[0m
[0mhandler subsequent event handlers will also run within that context unless[0m
[0mspecifically bound to another context with an [33mAsyncResource[39m.[0m

    [94mconst[39m [37mstore[39m [93m=[39m [33m{[39m [37mid[39m[93m:[39m [34m1[39m [33m}[39m[90m;[39m
    
    [37memitter[39m[32m.[39m[37mon[39m[90m([39m[92m'my-event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37menterWith[39m[90m([39m[37mstore[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37memitter[39m[32m.[39m[37mon[39m[90m([39m[92m'my-event'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns the same object[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns undefined[39m
    [37memitter[39m[32m.[39m[37memit[39m[90m([39m[92m'my-event'[39m[90m)[39m[90m;[39m
    [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns the same object[39m

[32m[1m### [33masyncLocalStorage.run(store, callback[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstore[39m {any}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0m[33m...args[39m {any}[0m

[0mCalling [33masyncLocalStorage.run(callback)[39m will create a new asynchronous[0m
[0mcontext. Within the callback function and the asynchronous operations from[0m
[0mthe callback, [33masyncLocalStorage.getStore()[39m will return the object or[0m
[0mthe primitive value passed into the [33mstore[39m argument (known as "the store").[0m
[0mThis store will be persistent through the following asynchronous calls.[0m

[0mThe callback will be ran asynchronously. Optionally, arguments can be passed[0m
[0mto the function. They will be passed to the callback function.[0m

[0mIf an error is thrown by the callback function, it will not be caught by[0m
[0ma [33mtry/catch[39m block as the callback is ran in a new asynchronous resource.[0m
[0mAlso, the stacktrace will be impacted by the asynchronous call.[0m

[0mExample:[0m

    [94mconst[39m [37mstore[39m [93m=[39m [33m{[39m [37mid[39m[93m:[39m [34m1[39m [33m}[39m[90m;[39m
    [37masyncLocalStorage[39m[32m.[39m[37mrun[39m[90m([39m[37mstore[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns the store object[39m
      [37msomeAsyncOperation[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns the same object[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns undefined[39m

[32m[1m### [33masyncLocalStorage.exit(callback[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m
    * [0m[33m...args[39m {any}[0m

[0mCalling [33masyncLocalStorage.exit(callback)[39m will create a new asynchronous[0m
[0mcontext.[0m
[0mWithin the callback function and the asynchronous operations from the callback,[0m
[0m[33masyncLocalStorage.getStore()[39m will return [33mundefined[39m.[0m

[0mThe callback will be ran asynchronously. Optionally, arguments can be passed[0m
[0mto the function. They will be passed to the callback function.[0m

[0mIf an error is thrown by the callback function, it will not be caught by[0m
[0ma [33mtry/catch[39m block as the callback is ran in a new asynchronous resource.[0m
[0mAlso, the stacktrace will be impacted by the asynchronous call.[0m

[0mExample:[0m

    [37masyncLocalStorage[39m[32m.[39m[37mrun[39m[90m([39m[92m'store value'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns 'store value'[39m
      [37masyncLocalStorage[39m[32m.[39m[37mexit[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns undefined[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns 'store value'[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33masyncLocalStorage.runSyncAndReturn(store, callback[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstore[39m {any}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0m[33m...args[39m {any}[0m

[0mThis methods runs a function synchronously within a context and return its[0m
[0mreturn value. The store is not accessible outside of the callback function or[0m
[0mthe asynchronous operations created within the callback.[0m

[0mOptionally, arguments can be passed to the function. They will be passed to[0m
[0mthe callback function.[0m

[0mIf the callback function throws an error, it will be thrown by[0m
[0m[33mrunSyncAndReturn[39m too. The stacktrace will not be impacted by this call and[0m
[0mthe context will be exited.[0m

[0mExample:[0m

    [94mconst[39m [37mstore[39m [93m=[39m [33m{[39m [37mid[39m[93m:[39m [34m2[39m [33m}[39m[90m;[39m
    [36mtry[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mrunSyncAndReturn[39m[90m([39m[37mstore[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns the store object[39m
        [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37me[39m[90m)[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns undefined[39m
      [90m// The error will be caught here[39m
    [33m}[39m

[32m[1m### [33masyncLocalStorage.exitSyncAndReturn(callback[, ...args])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m
    * [0m[33m...args[39m {any}[0m

[0mThis methods runs a function synchronously outside of a context and return its[0m
[0mreturn value. The store is not accessible within the callback function or[0m
[0mthe asynchronous operations created within the callback.[0m

[0mOptionally, arguments can be passed to the function. They will be passed to[0m
[0mthe callback function.[0m

[0mIf the callback function throws an error, it will be thrown by[0m
[0m[33mexitSyncAndReturn[39m too. The stacktrace will not be impacted by this call and[0m
[0mthe context will be re-entered.[0m

[0mExample:[0m

    [90m// Within a call to run or runSyncAndReturn[39m
    [36mtry[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns the store object or value[39m
      [37masyncLocalStorage[39m[32m.[39m[37mexitSyncAndReturn[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns undefined[39m
        [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37me[39m[90m)[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[90m;[39m [90m// Returns the same object or value[39m
      [90m// The error will be caught here[39m
    [33m}[39m

[32m[1m### Choosing between [33mrun[39m[32m and [33mrunSyncAndReturn[39m[32m[22m[39m

[32m[1m#### When to choose [33mrun[39m[32m[22m[39m

[0m[33mrun[39m is asynchronous. It is called with a callback function that[0m
[0mruns within a new asynchronous call. This is the most explicit behavior as[0m
[0meverything that is executed within the callback of [33mrun[39m (including further[0m
[0masynchronous operations) will have access to the store.[0m

[0mIf an instance of [33mAsyncLocalStorage[39m is used for error management (for[0m
[0minstance, with [33mprocess.setUncaughtExceptionCaptureCallback[39m), only[0m
[0mexceptions thrown in the scope of the callback function will be associated[0m
[0mwith the context.[0m

[0mThis method is the safest as it provides strong scoping and consistent[0m
[0mbehavior.[0m

[0mIt cannot be promisified using [33mutil.promisify[39m. If needed, the [33mPromise[39m[0m
[0mconstructor can be used:[0m

    [94mconst[39m [37mstore[39m [93m=[39m [31mnew[39m [37mMap[39m[90m([39m[90m)[39m[90m;[39m [90m// initialize the store[39m
    [31mnew[39m [37mPromise[39m[90m([39m[90m([39m[37mresolve[39m[32m,[39m [37mreject[39m[90m)[39m [93m=>[39m [33m{[39m
      [37masyncLocalStorage[39m[32m.[39m[37mrun[39m[90m([39m[37mstore[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37msomeFunction[39m[90m([39m[90m([39m[37merr[39m[32m,[39m [37mresult[39m[90m)[39m [93m=>[39m [33m{[39m
          [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
            [31mreturn[39m [37mreject[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
          [33m}[39m
          [31mreturn[39m [37mresolve[39m[90m([39m[37mresult[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### When to choose [33mrunSyncAndReturn[39m[32m[22m[39m

[0m[33mrunSyncAndReturn[39m is synchronous. The callback function will be executed[0m
[0msynchronously and its return value will be returned by [33mrunSyncAndReturn[39m.[0m
[0mThe store will only be accessible from within the callback[0m
[0mfunction and the asynchronous operations created within this scope.[0m
[0mIf the callback throws an error, [33mrunSyncAndReturn[39m will throw it and it will[0m
[0mnot be associated with the context.[0m

[0mThis method provides good scoping while being synchronous.[0m

[32m[1m#### Usage with [33masync/await[39m[32m[22m[39m

[0mIf, within an async function, only one [33mawait[39m call is to run within a context,[0m
[0mthe following pattern should be used:[0m

    [37masync[39m [94mfunction[39m [37mfn[39m[90m([39m[90m)[39m [33m{[39m
      [37mawait[39m [37masyncLocalStorage[39m[32m.[39m[37mrunSyncAndReturn[39m[90m([39m[31mnew[39m [37mMap[39m[90m([39m[90m)[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37masyncLocalStorage[39m[32m.[39m[37mgetStore[39m[90m([39m[90m)[39m[32m.[39m[37mset[39m[90m([39m[92m'key'[39m[32m,[39m [37mvalue[39m[90m)[39m[90m;[39m
        [31mreturn[39m [37mfoo[39m[90m([39m[90m)[39m[90m;[39m [90m// The return value of foo will be awaited[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[0mIn this example, the store is only available in the callback function and the[0m
[0mfunctions called by [33mfoo[39m. Outside of [33mrunSyncAndReturn[39m, calling [33mgetStore[39m[0m
[0mwill return [33mundefined[39m.[0m

