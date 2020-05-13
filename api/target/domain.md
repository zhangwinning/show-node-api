[35m[4m[1m# Domain[22m[24m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.8.0[39m
[90m    description: Any `Promise`s created in VM contexts no longer have a[39m
[90m                 `.domain` property. Their handlers are still executed in the[39m
[90m                 proper domain, however, and `Promise`s created in the main[39m
[90m                 context still possess a `.domain` property.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12489[39m
[90m    description: Handlers for `Promise`s are now invoked in the domain in which[39m
[90m                 the first promise of a chain was created.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated[0m[23m[39m

[0m[1mThis module is pending deprecation[22m. Once a replacement API has been[0m
[0mfinalized, this module will be fully deprecated. Most end users should[0m
[0m[1mnot[22m have cause to use this module. Users who absolutely must have[0m
[0mthe functionality that domains provide may rely on it for the time being[0m
[0mbut should expect to have to migrate to a different solution[0m
[0min the future.[0m

[0mDomains provide a way to handle multiple different IO operations as a[0m
[0msingle group. If any of the event emitters or callbacks registered to a[0m
[0mdomain emit an [33m'error'[39m event, or throw an error, then the domain object[0m
[0mwill be notified, rather than losing the context of the error in the[0m
[0m[33mprocess.on('uncaughtException')[39m handler, or causing the program to[0m
[0mexit immediately with an error code.[0m

[32m[1m## Warning: Don't Ignore Errors![22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mDomain error handlers are not a substitute for closing down a[0m
[0mprocess when an error occurs.[0m

[0mBy the very nature of how [34m[33mthrow[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw[24m[39m[34m)[39m works in JavaScript, there is almost[0m
[0mnever any way to safely "pick up where it left off", without leaking[0m
[0mreferences, or creating some other sort of undefined brittle state.[0m

[0mThe safest way to respond to a thrown error is to shut down the[0m
[0mprocess. Of course, in a normal web server, there may be many[0m
[0mopen connections, and it is not reasonable to abruptly shut those down[0m
[0mbecause an error was triggered by someone else.[0m

[0mThe better approach is to send an error response to the request that[0m
[0mtriggered the error, while letting the others finish in their normal[0m
[0mtime, and stop listening for new requests in that worker.[0m

[0mIn this way, [33mdomain[39m usage goes hand-in-hand with the cluster module,[0m
[0msince the master process can fork a new worker when a worker[0m
[0mencounters an error. For Node.js programs that scale to multiple[0m
[0mmachines, the terminating proxy or service registry can take note of[0m
[0mthe failure, and react accordingly.[0m

[0mFor example, this is not a good idea:[0m

    [90m// XXX WARNING! BAD IDEA![39m
    
    [94mconst[39m [37md[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/domain'[39m[90m)[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
    [37md[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37mer[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// The error won't crash the process, but what it does is worse![39m
      [90m// Though we've prevented abrupt process restarting, we are leaking[39m
      [90m// resources like crazy if this ever happens.[39m
      [90m// This is no better than process.on('uncaughtException')![39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`error, but oh well ${[37mer[39m[32m.[39m[37mmessage[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37md[39m[32m.[39m[37mrun[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mhandleRequest[39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[37mPORT[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mBy using the context of a domain, and the resilience of separating our[0m
[0mprogram into multiple worker processes, we can react more[0m
[0mappropriately, and handle errors with much greater safety.[0m

    [90m// Much better![39m
    
    [94mconst[39m [37mcluster[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/cluster'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mPORT[39m [93m=[39m [93m+[39m[37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mPORT[39m [93m||[39m [34m1337[39m[90m;[39m
    
    [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misMaster[39m[90m)[39m [33m{[39m
      [90m// A more realistic scenario would have more than 2 workers,[39m
      [90m// and perhaps not put the master and worker in the same file.[39m
      [90m//[39m
      [90m// It is also possible to get a bit fancier about logging, and[39m
      [90m// implement whatever custom logic is needed to prevent DoS[39m
      [90m// attacks and other bad behavior.[39m
      [90m//[39m
      [90m// See the options in the cluster documentation.[39m
      [90m//[39m
      [90m// The important thing is that the master does very little,[39m
      [90m// increasing our resilience to unexpected errors.[39m
    
      [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
      [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
    
      [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'disconnect'[39m[32m,[39m [90m([39m[37mworker[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'disconnect!'[39m[90m)[39m[90m;[39m
        [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
    [33m}[39m [94melse[39m [33m{[39m
      [90m// the worker[39m
      [90m//[39m
      [90m// This is where we put our bugs![39m
    
      [94mconst[39m [37mdomain[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/domain'[39m[90m)[39m[90m;[39m
    
      [90m// See the cluster documentation for more details about using[39m
      [90m// worker processes to serve requests. How it works, caveats, etc.[39m
    
      [94mconst[39m [37mserver[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mconst[39m [37md[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
        [37md[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37mer[39m[90m)[39m [93m=>[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`error ${[37mer[39m[32m.[39m[37mstack[39m}`[90m)[39m[90m;[39m
    
          [90m// We're in dangerous territory![39m
          [90m// By definition, something unexpected occurred,[39m
          [90m// which we probably didn't want.[39m
          [90m// Anything can happen now! Be very careful![39m
    
          [36mtry[39m [33m{[39m
            [90m// Make sure we close down within 30 seconds[39m
            [94mconst[39m [37mkilltimer[39m [93m=[39m [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
              [37mprocess[39m[32m.[39m[37mexit[39m[90m([39m[34m1[39m[90m)[39m[90m;[39m
            [33m}[39m[32m,[39m [34m30000[39m[90m)[39m[90m;[39m
            [90m// But don't keep the process open just for that![39m
            [37mkilltimer[39m[32m.[39m[37munref[39m[90m([39m[90m)[39m[90m;[39m
    
            [90m// Stop taking new requests.[39m
            [37mserver[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
    
            [90m// Let the master know we're dead. This will trigger a[39m
            [90m// 'disconnect' in the cluster master, and then it will fork[39m
            [90m// a new worker.[39m
            [37mcluster[39m[32m.[39m[37mworker[39m[32m.[39m[37mdisconnect[39m[90m([39m[90m)[39m[90m;[39m
    
            [90m// Try to send an error to the request that triggered the problem[39m
            [37mres[39m[32m.[39m[37mstatusCode[39m [93m=[39m [34m500[39m[90m;[39m
            [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'content-type'[39m[32m,[39m [92m'text/plain'[39m[90m)[39m[90m;[39m
            [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'Oops, there was a problem!\n'[39m[90m)[39m[90m;[39m
          [33m}[39m [36mcatch[39m [90m([39m[37mer2[39m[90m)[39m [33m{[39m
            [90m// Oh well, not much we can do at this point.[39m
            [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`Error sending 500! ${[37mer2[39m[32m.[39m[37mstack[39m}`[90m)[39m[90m;[39m
          [33m}[39m
        [33m}[39m[90m)[39m[90m;[39m
    
        [90m// Because req and res were created before this domain existed,[39m
        [90m// we need to explicitly add them.[39m
        [90m// See the explanation of implicit vs explicit binding below.[39m
        [37md[39m[32m.[39m[37madd[39m[90m([39m[37mreq[39m[90m)[39m[90m;[39m
        [37md[39m[32m.[39m[37madd[39m[90m([39m[37mres[39m[90m)[39m[90m;[39m
    
        [90m// Now run the handler function in the domain.[39m
        [37md[39m[32m.[39m[37mrun[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [37mhandleRequest[39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[37mPORT[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [90m// This part is not important. Just an example routing thing.[39m
    [90m// Put fancy application logic here.[39m
    [94mfunction[39m [37mhandleRequest[39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [33m{[39m
      [94mswitch[39m [90m([39m[37mreq[39m[32m.[39m[37murl[39m[90m)[39m [33m{[39m
        [94mcase[39m [32m'/error'[39m[93m:[39m
          [90m// We do some async stuff, and then...[39m
          [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
            [90m// Whoops![39m
            [37mflerb[39m[32m.[39m[37mbark[39m[90m([39m[90m)[39m[90m;[39m
          [33m}[39m[32m,[39m [37mtimeout[39m[90m)[39m[90m;[39m
          [94mbreak[39m[90m;[39m
        [94mdefault[39m[93m:[39m
          [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'ok'[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m

[32m[1m## Additions to [33mError[39m[32m objects[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mAny time an [33mError[39m object is routed through a domain, a few extra fields[0m
[0mare added to it.[0m

    * [0m[33merror.domain[39m The domain that first handled the error.[0m
    * [0m[33merror.domainEmitter[39m The event emitter that emitted an [33m'error'[39m event[0m
      [0mwith the error object.[0m
    * [0m[33merror.domainBound[39m The callback function which was bound to the[0m
      [0mdomain, and passed an error as its first argument.[0m
    * [0m[33merror.domainThrown[39m A boolean indicating whether the error was[0m
      [0mthrown, emitted, or passed to a bound callback function.[0m

[32m[1m## Implicit Binding[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mIf domains are in use, then all [1mnew[22m [33mEventEmitter[39m objects (including[0m
[0mStream objects, requests, responses, etc.) will be implicitly bound to[0m
[0mthe active domain at the time of their creation.[0m

[0mAdditionally, callbacks passed to lowlevel event loop requests (such as[0m
[0mto [33mfs.open()[39m, or other callback-taking methods) will automatically be[0m
[0mbound to the active domain. If they throw, then the domain will catch[0m
[0mthe error.[0m

[0mIn order to prevent excessive memory usage, [33mDomain[39m objects themselves[0m
[0mare not implicitly added as children of the active domain. If they[0m
[0mwere, then it would be too easy to prevent request and response objects[0m
[0mfrom being properly garbage collected.[0m

[0mTo nest [33mDomain[39m objects as children of a parent [33mDomain[39m they must be[0m
[0mexplicitly added.[0m

[0mImplicit binding routes thrown errors and [33m'error'[39m events to the[0m
[0m[33mDomain[39m's [33m'error'[39m event, but does not register the [33mEventEmitter[39m on the[0m
[0m[33mDomain[39m.[0m
[0mImplicit binding only takes care of thrown errors and [33m'error'[39m events.[0m

[32m[1m## Explicit Binding[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mSometimes, the domain in use is not the one that ought to be used for a[0m
[0mspecific event emitter. Or, the event emitter could have been created[0m
[0min the context of one domain, but ought to instead be bound to some[0m
[0mother domain.[0m

[0mFor example, there could be one domain in use for an HTTP server, but[0m
[0mperhaps we would like to have a separate domain to use for each request.[0m

[0mThat is possible via explicit binding.[0m

    [90m// Create a top-level domain for the server[39m
    [94mconst[39m [37mdomain[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/domain'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserverDomain[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mserverDomain[39m[32m.[39m[37mrun[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Server is created in the scope of serverDomain[39m
      [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// Req and res are also created in the scope of serverDomain[39m
        [90m// however, we'd prefer to have a separate domain for each request.[39m
        [90m// create it first thing, and add req and res to it.[39m
        [94mconst[39m [37mreqd[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
        [37mreqd[39m[32m.[39m[37madd[39m[90m([39m[37mreq[39m[90m)[39m[90m;[39m
        [37mreqd[39m[32m.[39m[37madd[39m[90m([39m[37mres[39m[90m)[39m[90m;[39m
        [37mreqd[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37mer[39m[90m)[39m [93m=>[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'Error'[39m[32m,[39m [37mer[39m[32m,[39m [37mreq[39m[32m.[39m[37murl[39m[90m)[39m[90m;[39m
          [36mtry[39m [33m{[39m
            [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m500[39m[90m)[39m[90m;[39m
            [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'Error occurred, sorry.'[39m[90m)[39m[90m;[39m
          [33m}[39m [36mcatch[39m [90m([39m[37mer2[39m[90m)[39m [33m{[39m
            [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'Error sending 500'[39m[32m,[39m [37mer2[39m[32m,[39m [37mreq[39m[32m.[39m[37murl[39m[90m)[39m[90m;[39m
          [33m}[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mdomain.create()[39m[32m[22m[39m

    * [0mReturns: {Domain}[0m

[32m[1m## Class: [33mDomain[39m[32m[22m[39m

    * [0mExtends: {EventEmitter}[0m

[0mThe [33mDomain[39m class encapsulates the functionality of routing errors and[0m
[0muncaught exceptions to the active [33mDomain[39m object.[0m

[0mTo handle the errors that it catches, listen to its [33m'error'[39m event.[0m

[32m[1m### [33mdomain.members[39m[32m[22m[39m

    * [0m{Array}[0m

[0mAn array of timers and event emitters that have been explicitly added[0m
[0mto the domain.[0m

[32m[1m### [33mdomain.add(emitter)[39m[32m[22m[39m

    * [0m[33memitter[39m {EventEmitter|Timer} emitter or timer to be added to the domain[0m

[0mExplicitly adds an emitter to the domain. If any event handlers called by[0m
[0mthe emitter throw an error, or if the emitter emits an [33m'error'[39m event, it[0m
[0mwill be routed to the domain's [33m'error'[39m event, just like with implicit[0m
[0mbinding.[0m

[0mThis also works with timers that are returned from [34m[33msetInterval()[39m[34m ([34m[4mtimers.html#timers_setinterval_callback_delay_args[24m[39m[34m)[39m and[0m
[0m[34m[33msetTimeout()[39m[34m ([34m[4mtimers.html#timers_settimeout_callback_delay_args[24m[39m[34m)[39m. If their callback function throws, it will be caught by[0m
[0mthe domain [33m'error'[39m handler.[0m

[0mIf the Timer or [33mEventEmitter[39m was already bound to a domain, it is removed[0m
[0mfrom that one, and bound to this one instead.[0m

[32m[1m### [33mdomain.bind(callback)[39m[32m[22m[39m

    * [0m[33mcallback[39m {Function} The callback function[0m
    * [0mReturns: {Function} The bound function[0m

[0mThe returned function will be a wrapper around the supplied callback[0m
[0mfunction. When the returned function is called, any errors that are[0m
[0mthrown will be routed to the domain's [33m'error'[39m event.[0m

    [94mconst[39m [37md[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mreadSomeFile[39m[90m([39m[37mfilename[39m[32m,[39m [37mcb[39m[90m)[39m [33m{[39m
      [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[37mfilename[39m[32m,[39m [92m'utf8'[39m[32m,[39m [37md[39m[32m.[39m[37mbind[39m[90m([39m[90m([39m[37mer[39m[32m,[39m [37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// If this throws, it will also be passed to the domain.[39m
        [31mreturn[39m [37mcb[39m[90m([39m[37mer[39m[32m,[39m [37mdata[39m [93m?[39m [37mJSON[39m[32m.[39m[37mparse[39m[90m([39m[37mdata[39m[90m)[39m [93m:[39m [90mnull[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37md[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37mer[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// An error occurred somewhere. If we throw it now, it will crash the program[39m
      [90m// with the normal line number and stack message.[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mdomain.enter()[39m[32m[22m[39m

[0mThe [33menter()[39m method is plumbing used by the [33mrun()[39m, [33mbind()[39m, and[0m
[0m[33mintercept()[39m methods to set the active domain. It sets [33mdomain.active[39m and[0m
[0m[33mprocess.domain[39m to the domain, and implicitly pushes the domain onto the domain[0m
[0mstack managed by the domain module (see [34m[33mdomain.exit()[39m[34m ([34m[4m#domain_domain_exit[24m[39m[34m)[39m for details on the[0m
[0mdomain stack). The call to [33menter()[39m delimits the beginning of a chain of[0m
[0masynchronous calls and I/O operations bound to a domain.[0m

[0mCalling [33menter()[39m changes only the active domain, and does not alter the domain[0m
[0mitself. [33menter()[39m and [33mexit()[39m can be called an arbitrary number of times on a[0m
[0msingle domain.[0m

[32m[1m### [33mdomain.exit()[39m[32m[22m[39m

[0mThe [33mexit()[39m method exits the current domain, popping it off the domain stack.[0m
[0mAny time execution is going to switch to the context of a different chain of[0m
[0masynchronous calls, it's important to ensure that the current domain is exited.[0m
[0mThe call to [33mexit()[39m delimits either the end of or an interruption to the chain[0m
[0mof asynchronous calls and I/O operations bound to a domain.[0m

[0mIf there are multiple, nested domains bound to the current execution context,[0m
[0m[33mexit()[39m will exit any domains nested within this domain.[0m

[0mCalling [33mexit()[39m changes only the active domain, and does not alter the domain[0m
[0mitself. [33menter()[39m and [33mexit()[39m can be called an arbitrary number of times on a[0m
[0msingle domain.[0m

[32m[1m### [33mdomain.intercept(callback)[39m[32m[22m[39m

    * [0m[33mcallback[39m {Function} The callback function[0m
    * [0mReturns: {Function} The intercepted function[0m

[0mThis method is almost identical to [34m[33mdomain.bind(callback)[39m[34m ([34m[4m#domain_domain_bind_callback[24m[39m[34m)[39m. However, in[0m
[0maddition to catching thrown errors, it will also intercept [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m[0m
[0mobjects sent as the first argument to the function.[0m

[0mIn this way, the common [33mif (err) return callback(err);[39m pattern can be replaced[0m
[0mwith a single error handler in a single place.[0m

    [94mconst[39m [37md[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mreadSomeFile[39m[90m([39m[37mfilename[39m[32m,[39m [37mcb[39m[90m)[39m [33m{[39m
      [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[37mfilename[39m[32m,[39m [92m'utf8'[39m[32m,[39m [37md[39m[32m.[39m[37mintercept[39m[90m([39m[90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// Note, the first argument is never passed to the[39m
        [90m// callback since it is assumed to be the 'Error' argument[39m
        [90m// and thus intercepted by the domain.[39m
    
        [90m// If this throws, it will also be passed to the domain[39m
        [90m// so the error-handling logic can be moved to the 'error'[39m
        [90m// event on the domain instead of being repeated throughout[39m
        [90m// the program.[39m
        [31mreturn[39m [37mcb[39m[90m([39m[90mnull[39m[32m,[39m [37mJSON[39m[32m.[39m[37mparse[39m[90m([39m[37mdata[39m[90m)[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37md[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37mer[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// An error occurred somewhere. If we throw it now, it will crash the program[39m
      [90m// with the normal line number and stack message.[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mdomain.remove(emitter)[39m[32m[22m[39m

    * [0m[33memitter[39m {EventEmitter|Timer} emitter or timer to be removed from the domain[0m

[0mThe opposite of [34m[33mdomain.add(emitter)[39m[34m ([34m[4m#domain_domain_add_emitter[24m[39m[34m)[39m. Removes domain handling from the[0m
[0mspecified emitter.[0m

[32m[1m### [33mdomain.run(fn[, ...args])[39m[32m[22m[39m

    * [0m[33mfn[39m {Function}[0m
    * [0m[33m...args[39m {any}[0m

[0mRun the supplied function in the context of the domain, implicitly[0m
[0mbinding all event emitters, timers, and lowlevel requests that are[0m
[0mcreated in that context. Optionally, arguments can be passed to[0m
[0mthe function.[0m

[0mThis is the most basic way to use a domain.[0m

    [94mconst[39m [37mdomain[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/domain'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37md[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
    [37md[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37mer[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'Caught error!'[39m[32m,[39m [37mer[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37md[39m[32m.[39m[37mrun[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m [90m// Simulating some various async stuff[39m
          [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'non-existent file'[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37mer[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
            [94mif[39m [90m([39m[37mer[39m[90m)[39m [94mthrow[39m [37mer[39m[90m;[39m
            [90m// proceed...[39m
          [33m}[39m[90m)[39m[90m;[39m
        [33m}[39m[32m,[39m [34m100[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIn this example, the [33md.on('error')[39m handler will be triggered, rather[0m
[0mthan crashing the program.[0m

[32m[1m## Domains and Promises[22m[39m

[0mAs of Node.js 8.0.0, the handlers of Promises are run inside the domain in[0m
[0mwhich the call to [33m.then()[39m or [33m.catch()[39m itself was made:[0m

    [94mconst[39m [37md1[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37md2[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mlet[39m [37mp[39m[90m;[39m
    [37md1[39m[32m.[39m[37mrun[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mp[39m [93m=[39m [37mPromise[39m[32m.[39m[37mresolve[39m[90m([39m[34m42[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37md2[39m[32m.[39m[37mrun[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mp[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37mv[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// running in d2[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mA callback may be bound to a specific domain using [34m[33mdomain.bind(callback)[39m[34m ([34m[4m#domain_domain_bind_callback[24m[39m[34m)[39m:[0m

    [94mconst[39m [37md1[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37md2[39m [93m=[39m [37mdomain[39m[32m.[39m[37mcreate[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mlet[39m [37mp[39m[90m;[39m
    [37md1[39m[32m.[39m[37mrun[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mp[39m [93m=[39m [37mPromise[39m[32m.[39m[37mresolve[39m[90m([39m[34m42[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37md2[39m[32m.[39m[37mrun[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mp[39m[32m.[39m[37mthen[39m[90m([39m[37mp[39m[32m.[39m[37mdomain[39m[32m.[39m[37mbind[39m[90m([39m[90m([39m[37mv[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// running in d1[39m
      [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mDomains will not interfere with the error handling mechanisms for[0m
[0mPromises. In other words, no [33m'error'[39m event will be emitted for unhandled[0m
[0m[33mPromise[39m rejections.[0m

