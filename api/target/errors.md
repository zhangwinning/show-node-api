[35m[4m[1m# Errors[22m[24m[39m

[90m<!--introduced_in=v4.0.0-->[39m
[90m[39m[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mApplications running in Node.js will generally experience four categories of[0m
[0merrors:[0m

    * [0mStandard JavaScript errors such as {EvalError}, {SyntaxError}, {RangeError},[0m
      [0m{ReferenceError}, {TypeError}, and {URIError}.[0m
    * [0mSystem errors triggered by underlying operating system constraints such[0m
      [0mas attempting to open a file that does not exist or attempting to send data[0m
      [0mover a closed socket.[0m
    * [0mUser-specified errors triggered by application code.[0m
    * [0m[33mAssertionError[39ms are a special class of error that can be triggered when[0m
      [0mNode.js detects an exceptional logic violation that should never occur. These[0m
      [0mare raised typically by the [33massert[39m module.[0m

[0mAll JavaScript and System errors raised by Node.js inherit from, or are[0m
[0minstances of, the standard JavaScript {Error} class and are guaranteed[0m
[0mto provide [3mat least[23m the properties available on that class.[0m

[32m[1m## Error Propagation and Interception[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mNode.js supports several mechanisms for propagating and handling errors that[0m
[0moccur while an application is running. How these errors are reported and[0m
[0mhandled depends entirely on the type of [33mError[39m and the style of the API that is[0m
[0mcalled.[0m

[0mAll JavaScript errors are handled as exceptions that [3mimmediately[23m generate[0m
[0mand throw an error using the standard JavaScript [33mthrow[39m mechanism. These[0m
[0mare handled using the [[33mtry…catch[39m construct][try-catch] provided by the[0m
[0mJavaScript language.[0m

    [90m// Throws with a ReferenceError because z is not defined.[39m
    [36mtry[39m [33m{[39m
      [94mconst[39m [37mm[39m [93m=[39m [34m1[39m[90m;[39m
      [94mconst[39m [37mn[39m [93m=[39m [37mm[39m [93m+[39m [37mz[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [90m// Handle the error here.[39m
    [33m}[39m

[0mAny use of the JavaScript [33mthrow[39m mechanism will raise an exception that[0m
[0m[3mmust[23m be handled using [33mtry…catch[39m or the Node.js process will exit[0m
[0mimmediately.[0m

[0mWith few exceptions, [3mSynchronous[23m APIs (any blocking method that does not[0m
[0maccept a [33mcallback[39m function, such as [[33mfs.readFileSync[39m][]), will use [33mthrow[39m[0m
[0mto report errors.[0m

[0mErrors that occur within [3mAsynchronous APIs[23m may be reported in multiple ways:[0m

    * [0mMost asynchronous methods that accept a [33mcallback[39m function will accept an[0m
      [0m[33mError[39m object passed as the first argument to that function. If that first[0m
      [0margument is not [33mnull[39m and is an instance of [33mError[39m, then an error occurred[0m
      [0mthat should be handled.[0m

[90m<!-- eslint-disable no-useless-return -->[39m
[90m[39m      [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
      [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[92m'a file that does not exist'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'There was an error reading the file!'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
          [31mreturn[39m[90m;[39m
        [33m}[39m
        [90m// Otherwise handle the data[39m
      [33m}[39m[90m)[39m[90m;[39m

    * [0m[0m[0mWhen an asynchronous method is called on an object that is an[0m[0m[0m
      [0m[0m[0m[[33mEventEmitter[39m][], errors can be routed to that object's [33m'error'[39m event.[0m[0m[0m
      [0m[0m
      [0m    [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m[0m
      [0m    [94mconst[39m [37mconnection[39m [93m=[39m [37mnet[39m[32m.[39m[37mconnect[39m[90m([39m[92m'localhost'[39m[90m)[39m[90m;[39m[0m
      [0m    [0m
      [0m    [90m// Adding an 'error' event handler to a stream:[39m[0m
      [0m    [37mconnection[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m[0m
      [0m      [90m// If the connection is reset by the server, or if it can't[39m[0m
      [0m      [90m// connect at all, or on any sort of error encountered by[39m[0m
      [0m      [90m// the connection, the error will be sent here.[39m[0m
      [0m      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m[0m
      [0m    [33m}[39m[90m)[39m[90m;[39m[0m
      [0m    [0m
      [0m    [37mconnection[39m[32m.[39m[37mpipe[39m[90m([39m[37mprocess[39m[32m.[39m[37mstdout[39m[90m)[39m[90m;[39m[0m
    * [0m[0m[0mA handful of typically asynchronous methods in the Node.js API may still[0m[0m[0m
      [0m[0m[0muse the [33mthrow[39m mechanism to raise exceptions that must be handled using[0m[0m[0m
      [0m[0m[0m[33mtry…catch[39m. There is no comprehensive list of such methods; please[0m[0m[0m
      [0m[0m[0mrefer to the documentation of each method to determine the appropriate[0m[0m[0m
      [0m[0m[0merror handling mechanism required.[0m[0m[0m

[0mThe use of the [33m'error'[39m event mechanism is most common for [stream-based][][0m
[0mand [event emitter-based][] APIs, which themselves represent a series of[0m
[0masynchronous operations over time (as opposed to a single operation that may[0m
[0mpass or fail).[0m

[0mFor [3mall[23m [[33mEventEmitter[39m][] objects, if an [33m'error'[39m event handler is not[0m
[0mprovided, the error will be thrown, causing the Node.js process to report an[0m
[0muncaught exception and crash unless either: The [[33mdomain[39m][domains] module is[0m
[0mused appropriately or a handler has been registered for the[0m
[0m[[33m'uncaughtException'[39m][] event.[0m

    [94mconst[39m [37mEventEmitter[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mee[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    
    [37msetImmediate[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// This will crash the process because no 'error' event[39m
      [90m// handler has been added.[39m
      [37mee[39m[32m.[39m[37memit[39m[90m([39m[92m'error'[39m[32m,[39m [31mnew[39m [37mError[39m[90m([39m[92m'This will crash'[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mErrors generated in this way [3mcannot[23m be intercepted using [33mtry…catch[39m as[0m
[0mthey are thrown [3mafter[23m the calling code has already exited.[0m

[0mDevelopers must refer to the documentation for each method to determine[0m
[0mexactly how errors raised by those methods are propagated.[0m

[32m[1m### Error-first callbacks[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mMost asynchronous methods exposed by the Node.js core API follow an idiomatic[0m
[0mpattern referred to as an [3merror-first callback[23m. With this pattern, a callback[0m
[0mfunction is passed to the method as an argument. When the operation either[0m
[0mcompletes or an error is raised, the callback function is called with the[0m
[0m[33mError[39m object (if any) passed as the first argument. If no error was raised,[0m
[0mthe first argument will be passed as [33mnull[39m.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37merrorFirstCallback[39m[90m([39m[37merr[39m[32m,[39m [37mdata[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'There was an error'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdata[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[92m'/some/file/that/does-not-exist'[39m[32m,[39m [37merrorFirstCallback[39m[90m)[39m[90m;[39m
    [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[92m'/some/file/that/does-exist'[39m[32m,[39m [37merrorFirstCallback[39m[90m)[39m[90m;[39m

[0mThe JavaScript [33mtry…catch[39m mechanism [1mcannot[22m be used to intercept errors[0m
[0mgenerated by asynchronous APIs. A common mistake for beginners is to try to[0m
[0muse [33mthrow[39m inside an error-first callback:[0m

    [90m// THIS WILL NOT WORK:[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [36mtry[39m [33m{[39m
      [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[92m'/some/file/that/does-not-exist'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// Mistaken assumption: throwing here...[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
          [94mthrow[39m [37merr[39m[90m;[39m
        [33m}[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [90m// This will not catch the throw![39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
    [33m}[39m

[0mThis will not work because the callback function passed to [33mfs.readFile()[39m is[0m
[0mcalled asynchronously. By the time the callback has been called, the[0m
[0msurrounding code, including the [33mtry…catch[39m block, will have already exited.[0m
[0mThrowing an error inside the callback [1mcan crash the Node.js process[22m in most[0m
[0mcases. If [domains][] are enabled, or a handler has been registered with[0m
[0m[33mprocess.on('uncaughtException')[39m, such errors can be intercepted.[0m

[32m[1m## Class: [33mError[39m[32m[22m[39m

[90m<!--type=class-->[39m
[90m[39m
[90m[39m[0mA generic JavaScript {Error} object that does not denote any specific[0m
[0mcircumstance of why the error occurred. [33mError[39m objects capture a "stack trace"[0m
[0mdetailing the point in the code at which the [33mError[39m was instantiated, and may[0m
[0mprovide a text description of the error.[0m

[0mAll errors generated by Node.js, including all System and JavaScript errors,[0m
[0mwill either be instances of, or inherit from, the [33mError[39m class.[0m

[32m[1m### [33mnew Error(message)[39m[32m[22m[39m

    * [0m[33mmessage[39m {string}[0m

[0mCreates a new [33mError[39m object and sets the [33merror.message[39m property to the[0m
[0mprovided text message. If an object is passed as [33mmessage[39m, the text message[0m
[0mis generated by calling [33mmessage.toString()[39m. The [33merror.stack[39m property will[0m
[0mrepresent the point in the code at which [33mnew Error()[39m was called. Stack traces[0m
[0mare dependent on [V8's stack trace API][]. Stack traces extend only to either[0m
[0m(a) the beginning of [3msynchronous code execution[23m, or (b) the number of frames[0m
[0mgiven by the property [33mError.stackTraceLimit[39m, whichever is smaller.[0m

[32m[1m### [33mError.captureStackTrace(targetObject[, constructorOpt])[39m[32m[22m[39m

    * [0m[33mtargetObject[39m {Object}[0m
    * [0m[33mconstructorOpt[39m {Function}[0m

[0mCreates a [33m.stack[39m property on [33mtargetObject[39m, which when accessed returns[0m
[0ma string representing the location in the code at which[0m
[0m[33mError.captureStackTrace()[39m was called.[0m

    [94mconst[39m [37mmyObject[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [37mError[39m[32m.[39m[37mcaptureStackTrace[39m[90m([39m[37mmyObject[39m[90m)[39m[90m;[39m
    [37mmyObject[39m[32m.[39m[37mstack[39m[90m;[39m  [90m// Similar to `new Error().stack`[39m

[0mThe first line of the trace will be prefixed with[0m
[0m[33m${myObject.name}: ${myObject.message}[39m.[0m

[0mThe optional [33mconstructorOpt[39m argument accepts a function. If given, all frames[0m
[0mabove [33mconstructorOpt[39m, including [33mconstructorOpt[39m, will be omitted from the[0m
[0mgenerated stack trace.[0m

[0mThe [33mconstructorOpt[39m argument is useful for hiding implementation[0m
[0mdetails of error generation from an end user. For instance:[0m

    [94mfunction[39m [37mMyError[39m[90m([39m[90m)[39m [33m{[39m
      [37mError[39m[32m.[39m[37mcaptureStackTrace[39m[90m([39m[91mthis[39m[32m,[39m [37mMyError[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [90m// Without passing MyError to captureStackTrace, the MyError[39m
    [90m// frame would show up in the .stack property. By passing[39m
    [90m// the constructor, we omit that frame, and retain all frames below it.[39m
    [31mnew[39m [37mMyError[39m[90m([39m[90m)[39m[32m.[39m[37mstack[39m[90m;[39m

[32m[1m### [33mError.stackTraceLimit[39m[32m[22m[39m

    * [0m{number}[0m

[0mThe [33mError.stackTraceLimit[39m property specifies the number of stack frames[0m
[0mcollected by a stack trace (whether generated by [33mnew Error().stack[39m or[0m
[0m[33mError.captureStackTrace(obj)[39m).[0m

[0mThe default value is [33m10[39m but may be set to any valid JavaScript number. Changes[0m
[0mwill affect any stack trace captured [3mafter[23m the value has been changed.[0m

[0mIf set to a non-number value, or set to a negative number, stack traces will[0m
[0mnot capture any frames.[0m

[32m[1m### [33merror.code[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe [33merror.code[39m property is a string label that identifies the kind of error.[0m
[0m[33merror.code[39m is the most stable way to identify an error. It will only change[0m
[0mbetween major versions of Node.js. In contrast, [33merror.message[39m strings may[0m
[0mchange between any versions of Node.js. See [Node.js Error Codes][] for details[0m
[0mabout specific codes.[0m

[32m[1m### [33merror.message[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe [33merror.message[39m property is the string description of the error as set by[0m
[0mcalling [33mnew Error(message)[39m. The [33mmessage[39m passed to the constructor will also[0m
[0mappear in the first line of the stack trace of the [33mError[39m, however changing[0m
[0mthis property after the [33mError[39m object is created [3mmay not[23m change the first[0m
[0mline of the stack trace (for example, when [33merror.stack[39m is read before this[0m
[0mproperty is changed).[0m

    [94mconst[39m [37merr[39m [93m=[39m [31mnew[39m [37mError[39m[90m([39m[92m'The message'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37merr[39m[32m.[39m[37mmessage[39m[90m)[39m[90m;[39m
    [90m// Prints: The message[39m

[32m[1m### [33merror.stack[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe [33merror.stack[39m property is a string describing the point in the code at which[0m
[0mthe [33mError[39m was instantiated.[0m

    [33mError: Things keep happening![39m
    [33m   at /home/gbusey/file.js:525:2[39m
    [33m   at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21)[39m
    [33m   at Actor.<anonymous> (/home/gbusey/actors.js:400:8)[39m
    [33m   at increaseSynergy (/home/gbusey/actors.js:701:6)[39m

[0mThe first line is formatted as [33m<error class name>: <error message>[39m, and[0m
[0mis followed by a series of stack frames (each line beginning with "at ").[0m
[0mEach frame describes a call site within the code that lead to the error being[0m
[0mgenerated. V8 attempts to display a name for each function (by variable name,[0m
[0mfunction name, or object method name), but occasionally it will not be able to[0m
[0mfind a suitable name. If V8 cannot determine a name for the function, only[0m
[0mlocation information will be displayed for that frame. Otherwise, the[0m
[0mdetermined function name will be displayed with location information appended[0m
[0min parentheses.[0m

[0mFrames are only generated for JavaScript functions. If, for example, execution[0m
[0msynchronously passes through a C++ addon function called [33mcheetahify[39m which[0m
[0mitself calls a JavaScript function, the frame representing the [33mcheetahify[39m call[0m
[0mwill not be present in the stack traces:[0m

    [94mconst[39m [37mcheetahify[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./native-binding.node'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mmakeFaster[39m[90m([39m[90m)[39m [33m{[39m
      [90m// `cheetahify()` *synchronously* calls speedy.[39m
      [37mcheetahify[39m[90m([39m[94mfunction[39m [37mspeedy[39m[90m([39m[90m)[39m [33m{[39m
        [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'oh no!'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mmakeFaster[39m[90m([39m[90m)[39m[90m;[39m
    [90m// will throw:[39m
    [90m//   /home/gbusey/file.js:6[39m
    [90m//       throw new Error('oh no!');[39m
    [90m//           ^[39m
    [90m//   Error: oh no![39m
    [90m//       at speedy (/home/gbusey/file.js:6:11)[39m
    [90m//       at makeFaster (/home/gbusey/file.js:5:3)[39m
    [90m//       at Object.<anonymous> (/home/gbusey/file.js:10:1)[39m
    [90m//       at Module._compile (module.js:456:26)[39m
    [90m//       at Object.Module._extensions..js (module.js:474:10)[39m
    [90m//       at Module.load (module.js:356:32)[39m
    [90m//       at Function.Module._load (module.js:312:12)[39m
    [90m//       at Function.Module.runMain (module.js:497:10)[39m
    [90m//       at startup (node.js:119:16)[39m
    [90m//       at node.js:906:3[39m

[0mThe location information will be one of:[0m

    * [0m[33mnative[39m, if the frame represents a call internal to V8 (as in [33m[].forEach[39m).[0m
    * [0m[33mplain-filename.js:line:column[39m, if the frame represents a call internal[0m
      [0m to Node.js.[0m
    * [0m[33m/absolute/path/to/file.js:line:column[39m, if the frame represents a call in[0m
      [0ma user program, or its dependencies.[0m

[0mThe string representing the stack trace is lazily generated when the[0m
[0m[33merror.stack[39m property is [1maccessed[22m.[0m

[0mThe number of frames captured by the stack trace is bounded by the smaller of[0m
[0m[33mError.stackTraceLimit[39m or the number of available frames on the current event[0m
[0mloop tick.[0m

[32m[1m## Class: [33mAssertionError[39m[32m[22m[39m

    * [0mExtends: {errors.Error}[0m

[0mIndicates the failure of an assertion. For details, see[0m
[0m[[33mClass: assert.AssertionError[39m][].[0m

[32m[1m## Class: [33mRangeError[39m[32m[22m[39m

    * [0mExtends: {errors.Error}[0m

[0mIndicates that a provided argument was not within the set or range of[0m
[0macceptable values for a function; whether that is a numeric range, or[0m
[0moutside the set of options for a given function parameter.[0m

    [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[32m.[39m[37mconnect[39m[90m([39m[93m-[39m[34m1[39m[90m)[39m[90m;[39m
    [90m// Throws "RangeError: "port" option should be >= 0 and < 65536: -1"[39m

[0mNode.js will generate and throw [33mRangeError[39m instances [3mimmediately[23m as a form[0m
[0mof argument validation.[0m

[32m[1m## Class: [33mReferenceError[39m[32m[22m[39m

    * [0mExtends: {errors.Error}[0m

[0mIndicates that an attempt is being made to access a variable that is not[0m
[0mdefined. Such errors commonly indicate typos in code, or an otherwise broken[0m
[0mprogram.[0m

[0mWhile client code may generate and propagate these errors, in practice, only V8[0m
[0mwill do so.[0m

    [37mdoesNotExist[39m[90m;[39m
    [90m// Throws ReferenceError, doesNotExist is not a variable in this program.[39m

[0mUnless an application is dynamically generating and running code,[0m
[0m[33mReferenceError[39m instances should always be considered a bug in the code[0m
[0mor its dependencies.[0m

[32m[1m## Class: [33mSyntaxError[39m[32m[22m[39m

    * [0mExtends: {errors.Error}[0m

[0mIndicates that a program is not valid JavaScript. These errors may only be[0m
[0mgenerated and propagated as a result of code evaluation. Code evaluation may[0m
[0mhappen as a result of [33meval[39m, [33mFunction[39m, [33mrequire[39m, or [vm][]. These errors[0m
[0mare almost always indicative of a broken program.[0m

    [36mtry[39m [33m{[39m
      [37mrequire[39m[90m([39m[92m'api/source/vm'[39m[90m)[39m[32m.[39m[37mrunInThisContext[39m[90m([39m[92m'binary ! isNotOk'[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [90m// 'err' will be a SyntaxError.[39m
    [33m}[39m

[0m[33mSyntaxError[39m instances are unrecoverable in the context that created them –[0m
[0mthey may only be caught by other contexts.[0m

[32m[1m## Class: [33mSystemError[39m[32m[22m[39m

    * [0mExtends: {errors.Error}[0m

[0mNode.js generates system errors when exceptions occur within its runtime[0m
[0menvironment. These usually occur when an application violates an operating[0m
[0msystem constraint. For example, a system error will occur if an application[0m
[0mattempts to read a file that does not exist.[0m

    * [0m[33maddress[39m {string} If present, the address to which a network connection[0m
      [0mfailed[0m
    * [0m[33mcode[39m {string} The string error code[0m
    * [0m[33mdest[39m {string} If present, the file path destination when reporting a file[0m
      [0msystem error[0m
    * [0m[33merrno[39m {number} The system-provided error number[0m
    * [0m[33minfo[39m {Object} If present, extra details about the error condition[0m
    * [0m[33mmessage[39m {string} A system-provided human-readable description of the error[0m
    * [0m[33mpath[39m {string} If present, the file path when reporting a file system error[0m
    * [0m[33mport[39m {number} If present, the network connection port that is not available[0m
    * [0m[33msyscall[39m {string} The name of the system call that triggered the error[0m

[32m[1m### [33merror.address[39m[32m[22m[39m

    * [0m{string}[0m

[0mIf present, [33merror.address[39m is a string describing the address to which a[0m
[0mnetwork connection failed.[0m

[32m[1m### [33merror.code[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe [33merror.code[39m property is a string representing the error code.[0m

[32m[1m### [33merror.dest[39m[32m[22m[39m

    * [0m{string}[0m

[0mIf present, [33merror.dest[39m is the file path destination when reporting a file[0m
[0msystem error.[0m

[32m[1m### [33merror.errno[39m[32m[22m[39m

    * [0m{number}[0m

[0mThe [33merror.errno[39m property is a negative number which corresponds[0m
[0mto the error code defined in [[33mlibuv Error handling[39m][].[0m

[0mOn Windows the error number provided by the system will be normalized by libuv.[0m

[0mTo get the string representation of the error code, use[0m
[0m[[33mutil.getSystemErrorName(error.errno)[39m][].[0m

[32m[1m### [33merror.info[39m[32m[22m[39m

    * [0m{Object}[0m

[0mIf present, [33merror.info[39m is an object with details about the error condition.[0m

[32m[1m### [33merror.message[39m[32m[22m[39m

    * [0m{string}[0m

[0m[33merror.message[39m is a system-provided human-readable description of the error.[0m

[32m[1m### [33merror.path[39m[32m[22m[39m

    * [0m{string}[0m

[0mIf present, [33merror.path[39m is a string containing a relevant invalid pathname.[0m

[32m[1m### [33merror.port[39m[32m[22m[39m

    * [0m{number}[0m

[0mIf present, [33merror.port[39m is the network connection port that is not available.[0m

[32m[1m### [33merror.syscall[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe [33merror.syscall[39m property is a string describing the [syscall][] that failed.[0m

[32m[1m### Common System Errors[22m[39m

[0mThis is a list of system errors commonly-encountered when writing a Node.js[0m
[0mprogram. For a comprehensive list, see the [[33merrno[39m(3) man page][].[0m

    * [0m[0m[0m[33mEACCES[39m (Permission denied): An attempt was made to access a file in a way[0m[0m[0m
      [0m[0m[0mforbidden by its file access permissions.[0m[0m[0m
    * [0m[0m[0m[33mEADDRINUSE[39m (Address already in use): An attempt to bind a server[0m[0m[0m
      [0m[0m[0m([[33mnet[39m][], [[33mhttp[39m][], or [[33mhttps[39m][]) to a local address failed due to[0m[0m[0m
      [0m[0m[0manother server on the local system already occupying that address.[0m[0m[0m
    * [0m[0m[0m[33mECONNREFUSED[39m (Connection refused): No connection could be made because the[0m[0m[0m
      [0m[0m[0mtarget machine actively refused it. This usually results from trying to[0m[0m[0m
      [0m[0m[0mconnect to a service that is inactive on the foreign host.[0m[0m[0m
    * [0m[0m[0m[33mECONNRESET[39m (Connection reset by peer): A connection was forcibly closed by[0m[0m[0m
      [0m[0m[0ma peer. This normally results from a loss of the connection on the remote[0m[0m[0m
      [0m[0m[0msocket due to a timeout or reboot. Commonly encountered via the [[33mhttp[39m][][0m[0m[0m
      [0m[0m[0mand [[33mnet[39m][] modules.[0m[0m[0m
    * [0m[0m[0m[33mEEXIST[39m (File exists): An existing file was the target of an operation that[0m[0m[0m
      [0m[0m[0mrequired that the target not exist.[0m[0m[0m
    * [0m[0m[0m[33mEISDIR[39m (Is a directory): An operation expected a file, but the given[0m[0m[0m
      [0m[0m[0mpathname was a directory.[0m[0m[0m
    * [0m[0m[0m[33mEMFILE[39m (Too many open files in system): Maximum number of[0m[0m[0m
      [0m[0m[0m[file descriptors][] allowable on the system has been reached, and[0m[0m[0m
      [0m[0m[0mrequests for another descriptor cannot be fulfilled until at least one[0m[0m[0m
      [0m[0m[0mhas been closed. This is encountered when opening many files at once in[0m[0m[0m
      [0m[0m[0mparallel, especially on systems (in particular, macOS) where there is a low[0m[0m[0m
      [0m[0m[0mfile descriptor limit for processes. To remedy a low limit, run[0m[0m[0m
      [0m[0m[0m[33mulimit -n 2048[39m in the same shell that will run the Node.js process.[0m[0m[0m
    * [0m[0m[0m[33mENOENT[39m (No such file or directory): Commonly raised by [[33mfs[39m][] operations[0m[0m[0m
      [0m[0m[0mto indicate that a component of the specified pathname does not exist. No[0m[0m[0m
      [0m[0m[0mentity (file or directory) could be found by the given path.[0m[0m[0m
    * [0m[0m[0m[33mENOTDIR[39m (Not a directory): A component of the given pathname existed, but[0m[0m[0m
      [0m[0m[0mwas not a directory as expected. Commonly raised by [[33mfs.readdir[39m][].[0m[0m[0m
    * [0m[0m[0m[33mENOTEMPTY[39m (Directory not empty): A directory with entries was the target[0m[0m[0m
      [0m[0m[0mof an operation that requires an empty directory, usually [[33mfs.unlink[39m][].[0m[0m[0m
    * [0m[0m[0m[33mENOTFOUND[39m (DNS lookup failed): Indicates a DNS failure of either[0m[0m[0m
      [0m[0m[0m[33mEAI_NODATA[39m or [33mEAI_NONAME[39m. This is not a standard POSIX error.[0m[0m[0m
    * [0m[0m[0m[33mEPERM[39m (Operation not permitted): An attempt was made to perform an[0m[0m[0m
      [0m[0m[0moperation that requires elevated privileges.[0m[0m[0m
    * [0m[0m[0m[33mEPIPE[39m (Broken pipe): A write on a pipe, socket, or FIFO for which there is[0m[0m[0m
      [0m[0m[0mno process to read the data. Commonly encountered at the [[33mnet[39m][] and[0m[0m[0m
      [0m[0m[0m[[33mhttp[39m][] layers, indicative that the remote side of the stream being[0m[0m[0m
      [0m[0m[0mwritten to has been closed.[0m[0m[0m
    * [0m[0m[0m[33mETIMEDOUT[39m (Operation timed out): A connect or send request failed because[0m[0m[0m
      [0m[0m[0mthe connected party did not properly respond after a period of time. Usually[0m[0m[0m
      [0m[0m[0mencountered by [[33mhttp[39m][] or [[33mnet[39m][]. Often a sign that a [33msocket.end()[39m[0m[0m[0m
      [0m[0m[0mwas not properly called.[0m[0m[0m

[32m[1m## Class: [33mTypeError[39m[32m[22m[39m

    * [0mExtends {errors.Error}[0m

[0mIndicates that a provided argument is not an allowable type. For example,[0m
[0mpassing a function to a parameter which expects a string would be considered[0m
[0ma [33mTypeError[39m.[0m

    [37mrequire[39m[90m([39m[92m'api/source/url'[39m[90m)[39m[32m.[39m[37mparse[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// Throws TypeError, since it expected a string.[39m

[0mNode.js will generate and throw [33mTypeError[39m instances [3mimmediately[23m as a form[0m
[0mof argument validation.[0m

[32m[1m## Exceptions vs. Errors[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mA JavaScript exception is a value that is thrown as a result of an invalid[0m
[0moperation or as the target of a [33mthrow[39m statement. While it is not required[0m
[0mthat these values are instances of [33mError[39m or classes which inherit from[0m
[0m[33mError[39m, all exceptions thrown by Node.js or the JavaScript runtime [3mwill[23m be[0m
[0minstances of [33mError[39m.[0m

[0mSome exceptions are [3munrecoverable[23m at the JavaScript layer. Such exceptions[0m
[0mwill [3malways[23m cause the Node.js process to crash. Examples include [33massert()[39m[0m
[0mchecks or [33mabort()[39m calls in the C++ layer.[0m

[32m[1m## OpenSSL Errors[22m[39m

[0mErrors originating in [33mcrypto[39m or [33mtls[39m are of class [33mError[39m, and in addition to[0m
[0mthe standard [33m.code[39m and [33m.message[39m properties, may have some additional[0m
[0mOpenSSL-specific properties.[0m

[32m[1m### [33merror.opensslErrorStack[39m[32m[22m[39m

[0mAn array of errors that can give context to where in the OpenSSL library an[0m
[0merror originates from.[0m

[32m[1m### [33merror.function[39m[32m[22m[39m

[0mThe OpenSSL function the error originates in.[0m

[32m[1m### [33merror.library[39m[32m[22m[39m

[0mThe OpenSSL library the error originates in.[0m

[32m[1m### [33merror.reason[39m[32m[22m[39m

[0mA human-readable string describing the reason for the error.[0m

[0m[90m<a id="nodejs-error-codes">[39m[90m</a>[39m[0m

[32m[1m## Node.js Error Codes[22m[39m

[0m[90m<a id="ERR_AMBIGUOUS_ARGUMENT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_AMBIGUOUS_ARGUMENT[39m[32m[22m[39m

[0mA function argument is being used in a way that suggests that the function[0m
[0msignature may be misunderstood. This is thrown by the [33massert[39m module when the[0m
[0m[33mmessage[39m parameter in [33massert.throws(block, message)[39m matches the error message[0m
[0mthrown by [33mblock[39m because that usage suggests that the user believes [33mmessage[39m[0m
[0mis the expected message rather than the message the [33mAssertionError[39m will[0m
[0mdisplay if [33mblock[39m does not throw.[0m

[0m[90m<a id="ERR_ARG_NOT_ITERABLE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_ARG_NOT_ITERABLE[39m[32m[22m[39m

[0mAn iterable argument (i.e. a value that works with [33mfor...of[39m loops) was[0m
[0mrequired, but not provided to a Node.js API.[0m

[0m[90m<a id="ERR_ASSERTION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_ASSERTION[39m[32m[22m[39m

[0mA special type of error that can be triggered whenever Node.js detects an[0m
[0mexceptional logic violation that should never occur. These are raised typically[0m
[0mby the [33massert[39m module.[0m

[0m[90m<a id="ERR_ASYNC_CALLBACK">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_ASYNC_CALLBACK[39m[32m[22m[39m

[0mAn attempt was made to register something that is not a function as an[0m
[0m[33mAsyncHooks[39m callback.[0m

[0m[90m<a id="ERR_ASYNC_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_ASYNC_TYPE[39m[32m[22m[39m

[0mThe type of an asynchronous resource was invalid. Users are also able[0m
[0mto define their own types if using the public embedder API.[0m

[0m[90m<a id="ERR_BROTLI_COMPRESSION_FAILED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_BROTLI_COMPRESSION_FAILED[39m[32m[22m[39m

[0mData passed to a Brotli stream was not successfully compressed.[0m

[0m[90m<a id="ERR_BROTLI_INVALID_PARAM">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_BROTLI_INVALID_PARAM[39m[32m[22m[39m

[0mAn invalid parameter key was passed during construction of a Brotli stream.[0m

[0m[90m<a id="ERR_BUFFER_CONTEXT_NOT_AVAILABLE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_BUFFER_CONTEXT_NOT_AVAILABLE[39m[32m[22m[39m

[0mAn attempt was made to create a Node.js [33mBuffer[39m instance from addon or embedder[0m
[0mcode, while in a JS engine Context that is not associated with a Node.js[0m
[0minstance. The data passed to the [33mBuffer[39m method will have been released[0m
[0mby the time the method returns.[0m

[0mWhen encountering this error, a possible alternative to creating a [33mBuffer[39m[0m
[0minstance is to create a normal [33mUint8Array[39m, which only differs in the[0m
[0mprototype of the resulting object. [33mUint8Array[39ms are generally accepted in all[0m
[0mNode.js core APIs where [33mBuffer[39ms are; they are available in all Contexts.[0m

[0m[90m<a id="ERR_BUFFER_OUT_OF_BOUNDS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_BUFFER_OUT_OF_BOUNDS[39m[32m[22m[39m

[0mAn operation outside the bounds of a [33mBuffer[39m was attempted.[0m

[0m[90m<a id="ERR_BUFFER_TOO_LARGE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_BUFFER_TOO_LARGE[39m[32m[22m[39m

[0mAn attempt has been made to create a [33mBuffer[39m larger than the maximum allowed[0m
[0msize.[0m

[0m[90m<a id="ERR_CANNOT_WATCH_SIGINT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CANNOT_WATCH_SIGINT[39m[32m[22m[39m

[0mNode.js was unable to watch for the [33mSIGINT[39m signal.[0m

[0m[90m<a id="ERR_CHILD_CLOSED_BEFORE_REPLY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CHILD_CLOSED_BEFORE_REPLY[39m[32m[22m[39m

[0mA child process was closed before the parent received a reply.[0m

[0m[90m<a id="ERR_CHILD_PROCESS_IPC_REQUIRED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CHILD_PROCESS_IPC_REQUIRED[39m[32m[22m[39m

[0mUsed when a child process is being forked without specifying an IPC channel.[0m

[0m[90m<a id="ERR_CHILD_PROCESS_STDIO_MAXBUFFER">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CHILD_PROCESS_STDIO_MAXBUFFER[39m[32m[22m[39m

[0mUsed when the main process is trying to read data from the child process's[0m
[0mSTDERR/STDOUT, and the data's length is longer than the [33mmaxBuffer[39m option.[0m

[0m[90m<a id="ERR_CONSOLE_WRITABLE_STREAM">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CONSOLE_WRITABLE_STREAM[39m[32m[22m[39m

[0m[33mConsole[39m was instantiated without [33mstdout[39m stream, or [33mConsole[39m has a[0m
[0mnon-writable [33mstdout[39m or [33mstderr[39m stream.[0m

[0m[90m<a id="ERR_CONTEXT_NOT_INITIALIZED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CONTEXT_NOT_INITIALIZED[39m[32m[22m[39m

[0mThe vm context passed into the API is not yet initialized. This could happen[0m
[0mwhen an error occurs (and is caught) during the creation of the[0m
[0mcontext, for example, when the allocation fails or the maximum call stack[0m
[0msize is reached when the context is created.[0m

[0m[90m<a id="ERR_CONSTRUCT_CALL_REQUIRED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CONSTRUCT_CALL_REQUIRED[39m[32m[22m[39m

[0mA constructor for a class was called without [33mnew[39m.[0m

[0m[90m<a id="ERR_CONSTRUCT_CALL_INVALID">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CONSTRUCT_CALL_INVALID[39m[32m[22m[39m

[90m<!--[39m
[90madded: v12.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA class constructor was called that is not callable.[0m

[0m[90m<a id="ERR_CPU_USAGE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CPU_USAGE[39m[32m[22m[39m

[0mThe native call from [33mprocess.cpuUsage[39m could not be processed.[0m

[0m[90m<a id="ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED[39m[32m[22m[39m

[0mA client certificate engine was requested that is not supported by the version[0m
[0mof OpenSSL being used.[0m

[0m[90m<a id="ERR_CRYPTO_ECDH_INVALID_FORMAT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_ECDH_INVALID_FORMAT[39m[32m[22m[39m

[0mAn invalid value for the [33mformat[39m argument was passed to the [33mcrypto.ECDH()[39m[0m
[0mclass [33mgetPublicKey()[39m method.[0m

[0m[90m<a id="ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY[39m[32m[22m[39m

[0mAn invalid value for the [33mkey[39m argument has been passed to the[0m
[0m[33mcrypto.ECDH()[39m class [33mcomputeSecret()[39m method. It means that the public[0m
[0mkey lies outside of the elliptic curve.[0m

[0m[90m<a id="ERR_CRYPTO_ENGINE_UNKNOWN">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_ENGINE_UNKNOWN[39m[32m[22m[39m

[0mAn invalid crypto engine identifier was passed to[0m
[0m[[33mrequire('crypto').setEngine()[39m][].[0m

[0m[90m<a id="ERR_CRYPTO_FIPS_FORCED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_FIPS_FORCED[39m[32m[22m[39m

[0mThe [[33m--force-fips[39m][] command-line argument was used but there was an attempt[0m
[0mto enable or disable FIPS mode in the [33mcrypto[39m module.[0m

[0m[90m<a id="ERR_CRYPTO_FIPS_UNAVAILABLE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_FIPS_UNAVAILABLE[39m[32m[22m[39m

[0mAn attempt was made to enable or disable FIPS mode, but FIPS mode was not[0m
[0mavailable.[0m

[0m[90m<a id="ERR_CRYPTO_HASH_FINALIZED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_HASH_FINALIZED[39m[32m[22m[39m

[0m[[33mhash.digest()[39m][] was called multiple times. The [33mhash.digest()[39m method must[0m
[0mbe called no more than one time per instance of a [33mHash[39m object.[0m

[0m[90m<a id="ERR_CRYPTO_HASH_UPDATE_FAILED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_HASH_UPDATE_FAILED[39m[32m[22m[39m

[0m[[33mhash.update()[39m][] failed for any reason. This should rarely, if ever, happen.[0m

[0m[90m<a id="ERR_CRYPTO_INCOMPATIBLE_KEY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_INCOMPATIBLE_KEY[39m[32m[22m[39m

[0mThe given crypto keys are incompatible with the attempted operation.[0m

[0m[90m<a id="ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS[39m[32m[22m[39m

[0mThe selected public or private key encoding is incompatible with other options.[0m

[0m[90m<a id="ERR_CRYPTO_INVALID_DIGEST">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_INVALID_DIGEST[39m[32m[22m[39m

[0mAn invalid [crypto digest algorithm][] was specified.[0m

[0m[90m<a id="ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_INVALID_KEY_OBJECT_TYPE[39m[32m[22m[39m

[0mThe given crypto key object's type is invalid for the attempted operation.[0m

[0m[90m<a id="ERR_CRYPTO_INVALID_STATE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_INVALID_STATE[39m[32m[22m[39m

[0mA crypto method was used on an object that was in an invalid state. For[0m
[0minstance, calling [[33mcipher.getAuthTag()[39m][] before calling [33mcipher.final()[39m.[0m

[0m[90m<a id="ERR_CRYPTO_PBKDF2_ERROR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_PBKDF2_ERROR[39m[32m[22m[39m

[0mThe PBKDF2 algorithm failed for unspecified reasons. OpenSSL does not provide[0m
[0mmore details and therefore neither does Node.js.[0m

[0m[90m<a id="ERR_CRYPTO_SCRYPT_INVALID_PARAMETER">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_SCRYPT_INVALID_PARAMETER[39m[32m[22m[39m

[0mOne or more [[33mcrypto.scrypt()[39m][] or [[33mcrypto.scryptSync()[39m][] parameters are[0m
[0moutside their legal range.[0m

[0m[90m<a id="ERR_CRYPTO_SCRYPT_NOT_SUPPORTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_SCRYPT_NOT_SUPPORTED[39m[32m[22m[39m

[0mNode.js was compiled without [33mscrypt[39m support. Not possible with the official[0m
[0mrelease binaries but can happen with custom builds, including distro builds.[0m

[0m[90m<a id="ERR_CRYPTO_SIGN_KEY_REQUIRED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_SIGN_KEY_REQUIRED[39m[32m[22m[39m

[0mA signing [33mkey[39m was not provided to the [[33msign.sign()[39m][] method.[0m

[0m[90m<a id="ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH[39m[32m[22m[39m

[0m[[33mcrypto.timingSafeEqual()[39m][] was called with [33mBuffer[39m, [33mTypedArray[39m, or[0m
[0m[33mDataView[39m arguments of different lengths.[0m

[0m[90m<a id="ERR_CRYPTO_UNKNOWN_CIPHER">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_UNKNOWN_CIPHER[39m[32m[22m[39m

[0mAn unknown cipher was specified.[0m

[0m[90m<a id="ERR_CRYPTO_UNKNOWN_DH_GROUP">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_UNKNOWN_DH_GROUP[39m[32m[22m[39m

[0mAn unknown Diffie-Hellman group name was given. See[0m
[0m[[33mcrypto.getDiffieHellman()[39m][] for a list of valid group names.[0m

[0m[90m<a id="ERR_DIR_CLOSED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_DIR_CLOSED[39m[32m[22m[39m

[0mThe [[33mfs.Dir[39m][] was previously closed.[0m

[0m[90m<a id="ERR_DNS_SET_SERVERS_FAILED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_DNS_SET_SERVERS_FAILED[39m[32m[22m[39m

[0m[33mc-ares[39m failed to set the DNS server.[0m

[0m[90m<a id="ERR_DOMAIN_CALLBACK_NOT_AVAILABLE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_DOMAIN_CALLBACK_NOT_AVAILABLE[39m[32m[22m[39m

[0mThe [33mdomain[39m module was not usable since it could not establish the required[0m
[0merror handling hooks, because[0m
[0m[[33mprocess.setUncaughtExceptionCaptureCallback()[39m][] had been called at an[0m
[0mearlier point in time.[0m

[0m[90m<a id="ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE[39m[32m[22m[39m

[0m[[33mprocess.setUncaughtExceptionCaptureCallback()[39m][] could not be called[0m
[0mbecause the [33mdomain[39m module has been loaded at an earlier point in time.[0m

[0mThe stack trace is extended to include the point in time at which the[0m
[0m[33mdomain[39m module had been loaded.[0m

[0m[90m<a id="ERR_ENCODING_INVALID_ENCODED_DATA">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_ENCODING_INVALID_ENCODED_DATA[39m[32m[22m[39m

[0mData provided to [33mTextDecoder()[39m API was invalid according to the encoding[0m
[0mprovided.[0m

[0m[90m<a id="ERR_ENCODING_NOT_SUPPORTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_ENCODING_NOT_SUPPORTED[39m[32m[22m[39m

[0mEncoding provided to [33mTextDecoder()[39m API was not one of the[0m
[0m[WHATWG Supported Encodings][].[0m

[0m[90m<a id="ERR_EXECUTION_ENVIRONMENT_NOT_AVAILABLE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_EXECUTION_ENVIRONMENT_NOT_AVAILABLE[39m[32m[22m[39m

[0mThe JS execution context is not associated with a Node.js environment.[0m
[0mThis may occur when Node.js is used as an embedded library and some hooks[0m
[0mfor the JS engine are not set up properly.[0m

[0m[90m<a id="ERR_FALSY_VALUE_REJECTION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_FALSY_VALUE_REJECTION[39m[32m[22m[39m

[0mA [33mPromise[39m that was callbackified via [33mutil.callbackify()[39m was rejected with a[0m
[0mfalsy value.[0m

[0m[90m<a id="ERR_FS_FILE_TOO_LARGE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_FS_FILE_TOO_LARGE[39m[32m[22m[39m

[0mAn attempt has been made to read a file whose size is larger than the maximum[0m
[0mallowed size for a [33mBuffer[39m.[0m

[0m[90m<a id="ERR_FS_INVALID_SYMLINK_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_FS_INVALID_SYMLINK_TYPE[39m[32m[22m[39m

[0mAn invalid symlink type was passed to the [[33mfs.symlink()[39m][] or[0m
[0m[[33mfs.symlinkSync()[39m][] methods.[0m

[0m[90m<a id="ERR_HTTP_HEADERS_SENT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP_HEADERS_SENT[39m[32m[22m[39m

[0mAn attempt was made to add more headers after the headers had already been sent.[0m

[0m[90m<a id="ERR_HTTP_INVALID_HEADER_VALUE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP_INVALID_HEADER_VALUE[39m[32m[22m[39m

[0mAn invalid HTTP header value was specified.[0m

[0m[90m<a id="ERR_HTTP_INVALID_STATUS_CODE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP_INVALID_STATUS_CODE[39m[32m[22m[39m

[0mStatus code was outside the regular status code range (100-999).[0m

[0m[90m<a id="ERR_HTTP_TRAILER_INVALID">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP_TRAILER_INVALID[39m[32m[22m[39m

[0mThe [33mTrailer[39m header was set even though the transfer encoding does not support[0m
[0mthat.[0m

[0m[90m<a id="ERR_HTTP2_ALTSVC_INVALID_ORIGIN">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_ALTSVC_INVALID_ORIGIN[39m[32m[22m[39m

[0mHTTP/2 ALTSVC frames require a valid origin.[0m

[0m[90m<a id="ERR_HTTP2_ALTSVC_LENGTH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_ALTSVC_LENGTH[39m[32m[22m[39m

[0mHTTP/2 ALTSVC frames are limited to a maximum of 16,382 payload bytes.[0m

[0m[90m<a id="ERR_HTTP2_CONNECT_AUTHORITY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_CONNECT_AUTHORITY[39m[32m[22m[39m

[0mFor HTTP/2 requests using the [33mCONNECT[39m method, the [33m:authority[39m pseudo-header[0m
[0mis required.[0m

[0m[90m<a id="ERR_HTTP2_CONNECT_PATH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_CONNECT_PATH[39m[32m[22m[39m

[0mFor HTTP/2 requests using the [33mCONNECT[39m method, the [33m:path[39m pseudo-header is[0m
[0mforbidden.[0m

[0m[90m<a id="ERR_HTTP2_CONNECT_SCHEME">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_CONNECT_SCHEME[39m[32m[22m[39m

[0mFor HTTP/2 requests using the [33mCONNECT[39m method, the [33m:scheme[39m pseudo-header is[0m
[0mforbidden.[0m

[0m[90m<a id="ERR_HTTP2_ERROR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_ERROR[39m[32m[22m[39m

[0mA non-specific HTTP/2 error has occurred.[0m

[0m[90m<a id="ERR_HTTP2_GOAWAY_SESSION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_GOAWAY_SESSION[39m[32m[22m[39m

[0mNew HTTP/2 Streams may not be opened after the [33mHttp2Session[39m has received a[0m
[0m[33mGOAWAY[39m frame from the connected peer.[0m

[0m[90m<a id="ERR_HTTP2_HEADERS_AFTER_RESPOND">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_HEADERS_AFTER_RESPOND[39m[32m[22m[39m

[0mAn additional headers was specified after an HTTP/2 response was initiated.[0m

[0m[90m<a id="ERR_HTTP2_HEADERS_SENT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_HEADERS_SENT[39m[32m[22m[39m

[0mAn attempt was made to send multiple response headers.[0m

[0m[90m<a id="ERR_HTTP2_HEADER_SINGLE_VALUE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_HEADER_SINGLE_VALUE[39m[32m[22m[39m

[0mMultiple values were provided for an HTTP/2 header field that was required to[0m
[0mhave only a single value.[0m

[0m[90m<a id="ERR_HTTP2_INFO_STATUS_NOT_ALLOWED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INFO_STATUS_NOT_ALLOWED[39m[32m[22m[39m

[0mInformational HTTP status codes ([33m1xx[39m) may not be set as the response status[0m
[0mcode on HTTP/2 responses.[0m

[0m[90m<a id="ERR_HTTP2_INVALID_CONNECTION_HEADERS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INVALID_CONNECTION_HEADERS[39m[32m[22m[39m

[0mHTTP/1 connection specific headers are forbidden to be used in HTTP/2[0m
[0mrequests and responses.[0m

[0m[90m<a id="ERR_HTTP2_INVALID_HEADER_VALUE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INVALID_HEADER_VALUE[39m[32m[22m[39m

[0mAn invalid HTTP/2 header value was specified.[0m

[0m[90m<a id="ERR_HTTP2_INVALID_INFO_STATUS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INVALID_INFO_STATUS[39m[32m[22m[39m

[0mAn invalid HTTP informational status code has been specified. Informational[0m
[0mstatus codes must be an integer between [33m100[39m and [33m199[39m (inclusive).[0m

[0m[90m<a id="ERR_HTTP2_INVALID_ORIGIN">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INVALID_ORIGIN[39m[32m[22m[39m

[0mHTTP/2 [33mORIGIN[39m frames require a valid origin.[0m

[0m[90m<a id="ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH[39m[32m[22m[39m

[0mInput [33mBuffer[39m and [33mUint8Array[39m instances passed to the[0m
[0m[33mhttp2.getUnpackedSettings()[39m API must have a length that is a multiple of[0m
[0msix.[0m

[0m[90m<a id="ERR_HTTP2_INVALID_PSEUDOHEADER">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INVALID_PSEUDOHEADER[39m[32m[22m[39m

[0mOnly valid HTTP/2 pseudoheaders ([33m:status[39m, [33m:path[39m, [33m:authority[39m, [33m:scheme[39m,[0m
[0mand [33m:method[39m) may be used.[0m

[0m[90m<a id="ERR_HTTP2_INVALID_SESSION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INVALID_SESSION[39m[32m[22m[39m

[0mAn action was performed on an [33mHttp2Session[39m object that had already been[0m
[0mdestroyed.[0m

[0m[90m<a id="ERR_HTTP2_INVALID_SETTING_VALUE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INVALID_SETTING_VALUE[39m[32m[22m[39m

[0mAn invalid value has been specified for an HTTP/2 setting.[0m

[0m[90m<a id="ERR_HTTP2_INVALID_STREAM">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INVALID_STREAM[39m[32m[22m[39m

[0mAn operation was performed on a stream that had already been destroyed.[0m

[0m[90m<a id="ERR_HTTP2_MAX_PENDING_SETTINGS_ACK">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_MAX_PENDING_SETTINGS_ACK[39m[32m[22m[39m

[0mWhenever an HTTP/2 [33mSETTINGS[39m frame is sent to a connected peer, the peer is[0m
[0mrequired to send an acknowledgment that it has received and applied the new[0m
[0m[33mSETTINGS[39m. By default, a maximum number of unacknowledged [33mSETTINGS[39m frames may[0m
[0mbe sent at any given time. This error code is used when that limit has been[0m
[0mreached.[0m

[0m[90m<a id="ERR_HTTP2_NESTED_PUSH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_NESTED_PUSH[39m[32m[22m[39m

[0mAn attempt was made to initiate a new push stream from within a push stream.[0m
[0mNested push streams are not permitted.[0m

[0m[90m<a id="ERR_HTTP2_NO_SOCKET_MANIPULATION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_NO_SOCKET_MANIPULATION[39m[32m[22m[39m

[0mAn attempt was made to directly manipulate (read, write, pause, resume, etc.) a[0m
[0msocket attached to an [33mHttp2Session[39m.[0m

[0m[90m<a id="ERR_HTTP2_ORIGIN_LENGTH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_ORIGIN_LENGTH[39m[32m[22m[39m

[0mHTTP/2 [33mORIGIN[39m frames are limited to a length of 16382 bytes.[0m

[0m[90m<a id="ERR_HTTP2_OUT_OF_STREAMS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_OUT_OF_STREAMS[39m[32m[22m[39m

[0mThe number of streams created on a single HTTP/2 session reached the maximum[0m
[0mlimit.[0m

[0m[90m<a id="ERR_HTTP2_PAYLOAD_FORBIDDEN">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_PAYLOAD_FORBIDDEN[39m[32m[22m[39m

[0mA message payload was specified for an HTTP response code for which a payload is[0m
[0mforbidden.[0m

[0m[90m<a id="ERR_HTTP2_PING_CANCEL">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_PING_CANCEL[39m[32m[22m[39m

[0mAn HTTP/2 ping was canceled.[0m

[0m[90m<a id="ERR_HTTP2_PING_LENGTH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_PING_LENGTH[39m[32m[22m[39m

[0mHTTP/2 ping payloads must be exactly 8 bytes in length.[0m

[0m[90m<a id="ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED[39m[32m[22m[39m

[0mAn HTTP/2 pseudo-header has been used inappropriately. Pseudo-headers are header[0m
[0mkey names that begin with the [33m:[39m prefix.[0m

[0m[90m<a id="ERR_HTTP2_PUSH_DISABLED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_PUSH_DISABLED[39m[32m[22m[39m

[0mAn attempt was made to create a push stream, which had been disabled by the[0m
[0mclient.[0m

[0m[90m<a id="ERR_HTTP2_SEND_FILE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_SEND_FILE[39m[32m[22m[39m

[0mAn attempt was made to use the [33mHttp2Stream.prototype.responseWithFile()[39m API to[0m
[0msend a directory.[0m

[0m[90m<a id="ERR_HTTP2_SEND_FILE_NOSEEK">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_SEND_FILE_NOSEEK[39m[32m[22m[39m

[0mAn attempt was made to use the [33mHttp2Stream.prototype.responseWithFile()[39m API to[0m
[0msend something other than a regular file, but [33moffset[39m or [33mlength[39m options were[0m
[0mprovided.[0m

[0m[90m<a id="ERR_HTTP2_SESSION_ERROR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_SESSION_ERROR[39m[32m[22m[39m

[0mThe [33mHttp2Session[39m closed with a non-zero error code.[0m

[0m[90m<a id="ERR_HTTP2_SETTINGS_CANCEL">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_SETTINGS_CANCEL[39m[32m[22m[39m

[0mThe [33mHttp2Session[39m settings canceled.[0m

[0m[90m<a id="ERR_HTTP2_SOCKET_BOUND">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_SOCKET_BOUND[39m[32m[22m[39m

[0mAn attempt was made to connect a [33mHttp2Session[39m object to a [33mnet.Socket[39m or[0m
[0m[33mtls.TLSSocket[39m that had already been bound to another [33mHttp2Session[39m object.[0m

[0m[90m<a id="ERR_HTTP2_SOCKET_UNBOUND">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_SOCKET_UNBOUND[39m[32m[22m[39m

[0mAn attempt was made to use the [33msocket[39m property of an [33mHttp2Session[39m that[0m
[0mhas already been closed.[0m

[0m[90m<a id="ERR_HTTP2_STATUS_101">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_STATUS_101[39m[32m[22m[39m

[0mUse of the [33m101[39m Informational status code is forbidden in HTTP/2.[0m

[0m[90m<a id="ERR_HTTP2_STATUS_INVALID">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_STATUS_INVALID[39m[32m[22m[39m

[0mAn invalid HTTP status code has been specified. Status codes must be an integer[0m
[0mbetween [33m100[39m and [33m599[39m (inclusive).[0m

[0m[90m<a id="ERR_HTTP2_STREAM_CANCEL">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_STREAM_CANCEL[39m[32m[22m[39m

[0mAn [33mHttp2Stream[39m was destroyed before any data was transmitted to the connected[0m
[0mpeer.[0m

[0m[90m<a id="ERR_HTTP2_STREAM_ERROR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_STREAM_ERROR[39m[32m[22m[39m

[0mA non-zero error code was been specified in an [33mRST_STREAM[39m frame.[0m

[0m[90m<a id="ERR_HTTP2_STREAM_SELF_DEPENDENCY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_STREAM_SELF_DEPENDENCY[39m[32m[22m[39m

[0mWhen setting the priority for an HTTP/2 stream, the stream may be marked as[0m
[0ma dependency for a parent stream. This error code is used when an attempt is[0m
[0mmade to mark a stream and dependent of itself.[0m

[0m[90m<a id="ERR_HTTP2_TRAILERS_ALREADY_SENT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_TRAILERS_ALREADY_SENT[39m[32m[22m[39m

[0mTrailing headers have already been sent on the [33mHttp2Stream[39m.[0m

[0m[90m<a id="ERR_HTTP2_TRAILERS_NOT_READY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_TRAILERS_NOT_READY[39m[32m[22m[39m

[0mThe [33mhttp2stream.sendTrailers()[39m method cannot be called until after the[0m
[0m[33m'wantTrailers'[39m event is emitted on an [33mHttp2Stream[39m object. The[0m
[0m[33m'wantTrailers'[39m event will only be emitted if the [33mwaitForTrailers[39m option[0m
[0mis set for the [33mHttp2Stream[39m.[0m

[0m[90m<a id="ERR_HTTP2_UNSUPPORTED_PROTOCOL">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_UNSUPPORTED_PROTOCOL[39m[32m[22m[39m

[0m[33mhttp2.connect()[39m was passed a URL that uses any protocol other than [33mhttp:[39m or[0m
[0m[33mhttps:[39m.[0m

[0m[90m<a id="ERR_INTERNAL_ASSERTION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INTERNAL_ASSERTION[39m[32m[22m[39m

[0mThere was a bug in Node.js or incorrect usage of Node.js internals.[0m
[0mTo fix the error, open an issue at [34m[34m[4mhttps://github.com/nodejs/node/issues[24m[39m[34m[39m.[0m

[0m[90m<a id="ERR_INCOMPATIBLE_OPTION_PAIR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INCOMPATIBLE_OPTION_PAIR[39m[32m[22m[39m

[0mAn option pair is incompatible with each other and cannot be used at the same[0m
[0mtime.[0m

[0m[90m<a id="ERR_INPUT_TYPE_NOT_ALLOWED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INPUT_TYPE_NOT_ALLOWED[39m[32m[22m[39m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mThe [33m--input-type[39m flag was used to attempt to execute a file. This flag can[0m
[0monly be used with input via [33m--eval[39m, [33m--print[39m or [33mSTDIN[39m.[0m

[0m[90m<a id="ERR_INSPECTOR_ALREADY_CONNECTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INSPECTOR_ALREADY_CONNECTED[39m[32m[22m[39m

[0mWhile using the [33minspector[39m module, an attempt was made to connect when the[0m
[0minspector was already connected.[0m

[0m[90m<a id="ERR_INSPECTOR_CLOSED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INSPECTOR_CLOSED[39m[32m[22m[39m

[0mWhile using the [33minspector[39m module, an attempt was made to use the inspector[0m
[0mafter the session had already closed.[0m

[0m[90m<a id="ERR_INSPECTOR_COMMAND">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INSPECTOR_COMMAND[39m[32m[22m[39m

[0mAn error occurred while issuing a command via the [33minspector[39m module.[0m

[0m[90m<a id="ERR_INSPECTOR_NOT_ACTIVE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INSPECTOR_NOT_ACTIVE[39m[32m[22m[39m

[0mThe [33minspector[39m is not active when [33minspector.waitForDebugger()[39m is called.[0m

[0m[90m<a id="ERR_INSPECTOR_NOT_AVAILABLE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INSPECTOR_NOT_AVAILABLE[39m[32m[22m[39m

[0mThe [33minspector[39m module is not available for use.[0m

[0m[90m<a id="ERR_INSPECTOR_NOT_CONNECTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INSPECTOR_NOT_CONNECTED[39m[32m[22m[39m

[0mWhile using the [33minspector[39m module, an attempt was made to use the inspector[0m
[0mbefore it was connected.[0m

[0m[90m<a id="ERR_INSPECTOR_NOT_WORKER">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INSPECTOR_NOT_WORKER[39m[32m[22m[39m

[0mAn API was called on the main thread that can only be used from[0m
[0mthe worker thread.[0m

[0m[90m<a id="ERR_INVALID_ADDRESS_FAMILY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_ADDRESS_FAMILY[39m[32m[22m[39m

[0mThe provided address family is not understood by the Node.js API.[0m

[0m[90m<a id="ERR_INVALID_ARG_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_ARG_TYPE[39m[32m[22m[39m

[0mAn argument of the wrong type was passed to a Node.js API.[0m

[0m[90m<a id="ERR_INVALID_ARG_VALUE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_ARG_VALUE[39m[32m[22m[39m

[0mAn invalid or unsupported value was passed for a given argument.[0m

[0m[90m<a id="ERR_INVALID_ASYNC_ID">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_ASYNC_ID[39m[32m[22m[39m

[0mAn invalid [33masyncId[39m or [33mtriggerAsyncId[39m was passed using [33mAsyncHooks[39m. An id[0m
[0mless than -1 should never happen.[0m

[0m[90m<a id="ERR_INVALID_BUFFER_SIZE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_BUFFER_SIZE[39m[32m[22m[39m

[0mA swap was performed on a [33mBuffer[39m but its size was not compatible with the[0m
[0moperation.[0m

[0m[90m<a id="ERR_INVALID_CALLBACK">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_CALLBACK[39m[32m[22m[39m

[0mA callback function was required but was not been provided to a Node.js API.[0m

[0m[90m<a id="ERR_INVALID_CHAR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_CHAR[39m[32m[22m[39m

[0mInvalid characters were detected in headers.[0m

[0m[90m<a id="ERR_INVALID_CURSOR_POS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_CURSOR_POS[39m[32m[22m[39m

[0mA cursor on a given stream cannot be moved to a specified row without a[0m
[0mspecified column.[0m

[0m[90m<a id="ERR_INVALID_FD">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_FD[39m[32m[22m[39m

[0mA file descriptor ('fd') was not valid (e.g. it was a negative value).[0m

[0m[90m<a id="ERR_INVALID_FD_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_FD_TYPE[39m[32m[22m[39m

[0mA file descriptor ('fd') type was not valid.[0m

[0m[90m<a id="ERR_INVALID_FILE_URL_HOST">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_FILE_URL_HOST[39m[32m[22m[39m

[0mA Node.js API that consumes [33mfile:[39m URLs (such as certain functions in the[0m
[0m[[33mfs[39m][] module) encountered a file URL with an incompatible host. This[0m
[0msituation can only occur on Unix-like systems where only [33mlocalhost[39m or an empty[0m
[0mhost is supported.[0m

[0m[90m<a id="ERR_INVALID_FILE_URL_PATH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_FILE_URL_PATH[39m[32m[22m[39m

[0mA Node.js API that consumes [33mfile:[39m URLs (such as certain functions in the[0m
[0m[[33mfs[39m][] module) encountered a file URL with an incompatible path. The exact[0m
[0msemantics for determining whether a path can be used is platform-dependent.[0m

[0m[90m<a id="ERR_INVALID_HANDLE_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_HANDLE_TYPE[39m[32m[22m[39m

[0mAn attempt was made to send an unsupported "handle" over an IPC communication[0m
[0mchannel to a child process. See [[33msubprocess.send()[39m][] and [[33mprocess.send()[39m][][0m
[0mfor more information.[0m

[0m[90m<a id="ERR_INVALID_HTTP_TOKEN">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_HTTP_TOKEN[39m[32m[22m[39m

[0mAn invalid HTTP token was supplied.[0m

[0m[90m<a id="ERR_INVALID_IP_ADDRESS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_IP_ADDRESS[39m[32m[22m[39m

[0mAn IP address is not valid.[0m

[0m[90m<a id="ERR_INVALID_MODULE_SPECIFIER">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_MODULE_SPECIFIER[39m[32m[22m[39m

[0mThe imported module string is an invalid URL, package name, or package subpath[0m
[0mspecifier.[0m

[0m[90m<a id="ERR_INVALID_OPT_VALUE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_OPT_VALUE[39m[32m[22m[39m

[0mAn invalid or unexpected value was passed in an options object.[0m

[0m[90m<a id="ERR_INVALID_OPT_VALUE_ENCODING">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_OPT_VALUE_ENCODING[39m[32m[22m[39m

[0mAn invalid or unknown file encoding was passed.[0m

[0m[90m<a id="ERR_INVALID_PACKAGE_CONFIG">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_PACKAGE_CONFIG[39m[32m[22m[39m

[0mAn invalid [33mpackage.json[39m file was found which failed parsing.[0m

[0m[90m<a id="ERR_INVALID_PACKAGE_TARGET">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_PACKAGE_TARGET[39m[32m[22m[39m

[0mThe [33mpackage.json[39m [exports][] field contains an invalid target mapping value[0m
[0mfor the attempted module resolution.[0m

[0m[90m<a id="ERR_INVALID_PERFORMANCE_MARK">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_PERFORMANCE_MARK[39m[32m[22m[39m

[0mWhile using the Performance Timing API ([33mperf_hooks[39m), a performance mark is[0m
[0minvalid.[0m

[0m[90m<a id="ERR_INVALID_PROTOCOL">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_PROTOCOL[39m[32m[22m[39m

[0mAn invalid [33moptions.protocol[39m was passed to [33mhttp.request()[39m.[0m

[0m[90m<a id="ERR_INVALID_REPL_EVAL_CONFIG">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_REPL_EVAL_CONFIG[39m[32m[22m[39m

[0mBoth [33mbreakEvalOnSigint[39m and [33meval[39m options were set in the [[33mREPL[39m][] config,[0m
[0mwhich is not supported.[0m

[0m[90m<a id="ERR_INVALID_REPL_INPUT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_REPL_INPUT[39m[32m[22m[39m

[0mThe input may not be used in the [[33mREPL[39m][]. All prohibited inputs are[0m
[0mdocumented in the [[33mREPL[39m][]'s documentation.[0m

[0m[90m<a id="ERR_INVALID_RETURN_PROPERTY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_RETURN_PROPERTY[39m[32m[22m[39m

[0mThrown in case a function option does not provide a valid value for one of its[0m
[0mreturned object properties on execution.[0m

[0m[90m<a id="ERR_INVALID_RETURN_PROPERTY_VALUE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_RETURN_PROPERTY_VALUE[39m[32m[22m[39m

[0mThrown in case a function option does not provide an expected value[0m
[0mtype for one of its returned object properties on execution.[0m

[0m[90m<a id="ERR_INVALID_RETURN_VALUE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_RETURN_VALUE[39m[32m[22m[39m

[0mThrown in case a function option does not return an expected value[0m
[0mtype on execution, such as when a function is expected to return a promise.[0m

[0m[90m<a id="ERR_INVALID_SYNC_FORK_INPUT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_SYNC_FORK_INPUT[39m[32m[22m[39m

[0mA [33mBuffer[39m, [33mTypedArray[39m, [33mDataView[39m or [33mstring[39m was provided as stdio input to[0m
[0man asynchronous fork. See the documentation for the [[33mchild_process[39m][] module[0m
[0mfor more information.[0m

[0m[90m<a id="ERR_INVALID_THIS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_THIS[39m[32m[22m[39m

[0mA Node.js API function was called with an incompatible [33mthis[39m value.[0m

    [94mconst[39m [37murlSearchParams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[92m'foo=bar&baz=new'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m1[39m[90m)[39m[90m;[39m
    [37murlSearchParams[39m[32m.[39m[37mhas[39m[32m.[39m[37mcall[39m[90m([39m[37mbuf[39m[32m,[39m [92m'foo'[39m[90m)[39m[90m;[39m
    [90m// Throws a TypeError with code 'ERR_INVALID_THIS'[39m

[0m[90m<a id="ERR_INVALID_TRANSFER_OBJECT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_TRANSFER_OBJECT[39m[32m[22m[39m

[0mAn invalid transfer object was passed to [33mpostMessage()[39m.[0m

[0m[90m<a id="ERR_INVALID_TUPLE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_TUPLE[39m[32m[22m[39m

[0mAn element in the [33miterable[39m provided to the [WHATWG][WHATWG URL API][0m
[0m[[33mURLSearchParams[39m constructor][[33mnew URLSearchParams(iterable)[39m] did not[0m
[0mrepresent a [33m[name, value][39m tuple – that is, if an element is not iterable, or[0m
[0mdoes not consist of exactly two elements.[0m

[0m[90m<a id="ERR_INVALID_URI">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_URI[39m[32m[22m[39m

[0mAn invalid URI was passed.[0m

[0m[90m<a id="ERR_INVALID_URL">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_URL[39m[32m[22m[39m

[0mAn invalid URL was passed to the [WHATWG][WHATWG URL API][0m
[0m[[33mURL[39m constructor][[33mnew URL(input)[39m] to be parsed. The thrown error object[0m
[0mtypically has an additional property [33m'input'[39m that contains the URL that failed[0m
[0mto parse.[0m

[0m[90m<a id="ERR_INVALID_URL_SCHEME">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INVALID_URL_SCHEME[39m[32m[22m[39m

[0mAn attempt was made to use a URL of an incompatible scheme (protocol) for a[0m
[0mspecific purpose. It is only used in the [WHATWG URL API][] support in the[0m
[0m[[33mfs[39m][] module (which only accepts URLs with [33m'file'[39m scheme), but may be used[0m
[0min other Node.js APIs as well in the future.[0m

[0m[90m<a id="ERR_IPC_CHANNEL_CLOSED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_IPC_CHANNEL_CLOSED[39m[32m[22m[39m

[0mAn attempt was made to use an IPC communication channel that was already closed.[0m

[0m[90m<a id="ERR_IPC_DISCONNECTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_IPC_DISCONNECTED[39m[32m[22m[39m

[0mAn attempt was made to disconnect an IPC communication channel that was already[0m
[0mdisconnected. See the documentation for the [[33mchild_process[39m][] module[0m
[0mfor more information.[0m

[0m[90m<a id="ERR_IPC_ONE_PIPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_IPC_ONE_PIPE[39m[32m[22m[39m

[0mAn attempt was made to create a child Node.js process using more than one IPC[0m
[0mcommunication channel. See the documentation for the [[33mchild_process[39m][] module[0m
[0mfor more information.[0m

[0m[90m<a id="ERR_IPC_SYNC_FORK">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_IPC_SYNC_FORK[39m[32m[22m[39m

[0mAn attempt was made to open an IPC communication channel with a synchronously[0m
[0mforked Node.js process. See the documentation for the [[33mchild_process[39m][] module[0m
[0mfor more information.[0m

[0m[90m<a id="ERR_MANIFEST_ASSERT_INTEGRITY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MANIFEST_ASSERT_INTEGRITY[39m[32m[22m[39m

[0mAn attempt was made to load a resource, but the resource did not match the[0m
[0mintegrity defined by the policy manifest. See the documentation for [policy][][0m
[0mmanifests for more information.[0m

[0m[90m<a id="ERR_MANIFEST_DEPENDENCY_MISSING">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MANIFEST_DEPENDENCY_MISSING[39m[32m[22m[39m

[0mAn attempt was made to load a resource, but the resource was not listed as a[0m
[0mdependency from the location that attempted to load it. See the documentation[0m
[0mfor [policy][] manifests for more information.[0m

[0m[90m<a id="ERR_MANIFEST_INTEGRITY_MISMATCH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MANIFEST_INTEGRITY_MISMATCH[39m[32m[22m[39m

[0mAn attempt was made to load a policy manifest, but the manifest had multiple[0m
[0mentries for a resource which did not match each other. Update the manifest[0m
[0mentries to match in order to resolve this error. See the documentation for[0m
[0m[policy][] manifests for more information.[0m

[0m[90m<a id="ERR_MANIFEST_INVALID_RESOURCE_FIELD">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MANIFEST_INVALID_RESOURCE_FIELD[39m[32m[22m[39m

[0mA policy manifest resource had an invalid value for one of its fields. Update[0m
[0mthe manifest entry to match in order to resolve this error. See the[0m
[0mdocumentation for [policy][] manifests for more information.[0m

[0m[90m<a id="ERR_MANIFEST_PARSE_POLICY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MANIFEST_PARSE_POLICY[39m[32m[22m[39m

[0mAn attempt was made to load a policy manifest, but the manifest was unable to[0m
[0mbe parsed. See the documentation for [policy][] manifests for more information.[0m

[0m[90m<a id="ERR_MANIFEST_TDZ">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MANIFEST_TDZ[39m[32m[22m[39m

[0mAn attempt was made to read from a policy manifest, but the manifest[0m
[0minitialization has not yet taken place. This is likely a bug in Node.js.[0m

[0m[90m<a id="ERR_MANIFEST_UNKNOWN_ONERROR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MANIFEST_UNKNOWN_ONERROR[39m[32m[22m[39m

[0mA policy manifest was loaded, but had an unknown value for its "onerror"[0m
[0mbehavior. See the documentation for [policy][] manifests for more information.[0m

[0m[90m<a id="ERR_MEMORY_ALLOCATION_FAILED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MEMORY_ALLOCATION_FAILED[39m[32m[22m[39m

[0mAn attempt was made to allocate memory (usually in the C++ layer) but it[0m
[0mfailed.[0m

[0m[90m<a id="ERR_METHOD_NOT_IMPLEMENTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_METHOD_NOT_IMPLEMENTED[39m[32m[22m[39m

[0mA method is required but not implemented.[0m

[0m[90m<a id="ERR_MISSING_ARGS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MISSING_ARGS[39m[32m[22m[39m

[0mA required argument of a Node.js API was not passed. This is only used for[0m
[0mstrict compliance with the API specification (which in some cases may accept[0m
[0m[33mfunc(undefined)[39m but not [33mfunc()[39m). In most native Node.js APIs,[0m
[0m[33mfunc(undefined)[39m and [33mfunc()[39m are treated identically, and the[0m
[0m[[33mERR_INVALID_ARG_TYPE[39m][] error code may be used instead.[0m

[0m[90m<a id="ERR_MISSING_DYNAMIC_INSTANTIATE_HOOK">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MISSING_DYNAMIC_INSTANTIATE_HOOK[39m[32m[22m[39m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mAn [ES Module][] loader hook specified [33mformat: 'dynamic'[39m but did not provide[0m
[0ma [33mdynamicInstantiate[39m hook.[0m

[0m[90m<a id="ERR_MISSING_OPTION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MISSING_OPTION[39m[32m[22m[39m

[0mFor APIs that accept options objects, some options might be mandatory. This code[0m
[0mis thrown if a required option is missing.[0m

[0m[90m<a id="ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST[39m[32m[22m[39m

[0mA [33mMessagePort[39m was found in the object passed to a [33mpostMessage()[39m call,[0m
[0mbut not provided in the [33mtransferList[39m for that call.[0m

[0m[90m<a id="ERR_MISSING_PASSPHRASE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MISSING_PASSPHRASE[39m[32m[22m[39m

[0mAn attempt was made to read an encrypted key without specifying a passphrase.[0m

[0m[90m<a id="ERR_MISSING_PLATFORM_FOR_WORKER">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MISSING_PLATFORM_FOR_WORKER[39m[32m[22m[39m

[0mThe V8 platform used by this instance of Node.js does not support creating[0m
[0mWorkers. This is caused by lack of embedder support for Workers. In particular,[0m
[0mthis error will not occur with standard builds of Node.js.[0m

[0m[90m<a id="ERR_MODULE_NOT_FOUND">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MODULE_NOT_FOUND[39m[32m[22m[39m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mAn [ES Module][] could not be resolved.[0m

[0m[90m<a id="ERR_MULTIPLE_CALLBACK">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_MULTIPLE_CALLBACK[39m[32m[22m[39m

[0mA callback was called more than once.[0m

[0mA callback is almost always meant to only be called once as the query[0m
[0mcan either be fulfilled or rejected but not both at the same time. The latter[0m
[0mwould be possible by calling a callback more than once.[0m

[0m[90m<a id="ERR_NAPI_CONS_FUNCTION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NAPI_CONS_FUNCTION[39m[32m[22m[39m

[0mWhile using [33mN-API[39m, a constructor passed was not a function.[0m

[0m[90m<a id="ERR_NAPI_INVALID_DATAVIEW_ARGS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NAPI_INVALID_DATAVIEW_ARGS[39m[32m[22m[39m

[0mWhile calling [33mnapi_create_dataview()[39m, a given [33moffset[39m was outside the bounds[0m
[0mof the dataview or [33moffset + length[39m was larger than a length of given [33mbuffer[39m.[0m

[0m[90m<a id="ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT[39m[32m[22m[39m

[0mWhile calling [33mnapi_create_typedarray()[39m, the provided [33moffset[39m was not a[0m
[0mmultiple of the element size.[0m

[0m[90m<a id="ERR_NAPI_INVALID_TYPEDARRAY_LENGTH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NAPI_INVALID_TYPEDARRAY_LENGTH[39m[32m[22m[39m

[0mWhile calling [33mnapi_create_typedarray()[39m, [33m(length * size_of_element) +[39m[0m
[0m[33mbyte_offset[39m was larger than the length of given [33mbuffer[39m.[0m

[0m[90m<a id="ERR_NAPI_TSFN_CALL_JS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NAPI_TSFN_CALL_JS[39m[32m[22m[39m

[0mAn error occurred while invoking the JavaScript portion of the thread-safe[0m
[0mfunction.[0m

[0m[90m<a id="ERR_NAPI_TSFN_GET_UNDEFINED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NAPI_TSFN_GET_UNDEFINED[39m[32m[22m[39m

[0mAn error occurred while attempting to retrieve the JavaScript [33mundefined[39m[0m
[0mvalue.[0m

[0m[90m<a id="ERR_NAPI_TSFN_START_IDLE_LOOP">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NAPI_TSFN_START_IDLE_LOOP[39m[32m[22m[39m

[0mOn the main thread, values are removed from the queue associated with the[0m
[0mthread-safe function in an idle loop. This error indicates that an error[0m
[0mhas occurred when attempting to start the loop.[0m

[0m[90m<a id="ERR_NAPI_TSFN_STOP_IDLE_LOOP">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NAPI_TSFN_STOP_IDLE_LOOP[39m[32m[22m[39m

[0mOnce no more items are left in the queue, the idle loop must be suspended. This[0m
[0merror indicates that the idle loop has failed to stop.[0m

[0m[90m<a id="ERR_NO_CRYPTO">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NO_CRYPTO[39m[32m[22m[39m

[0mAn attempt was made to use crypto features while Node.js was not compiled with[0m
[0mOpenSSL crypto support.[0m

[0m[90m<a id="ERR_NO_ICU">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NO_ICU[39m[32m[22m[39m

[0mAn attempt was made to use features that require [ICU][], but Node.js was not[0m
[0mcompiled with ICU support.[0m

[0m[90m<a id="ERR_NON_CONTEXT_AWARE_DISABLED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NON_CONTEXT_AWARE_DISABLED[39m[32m[22m[39m

[0mA non-context-aware native addon was loaded in a process that disallows them.[0m

[0m[90m<a id="ERR_OUT_OF_RANGE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_OUT_OF_RANGE[39m[32m[22m[39m

[0mA given value is out of the accepted range.[0m

[0m[90m<a id="ERR_PACKAGE_PATH_NOT_EXPORTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_PACKAGE_PATH_NOT_EXPORTED[39m[32m[22m[39m

[0mThe [33mpackage.json[39m [exports][] field does not export the requested subpath.[0m
[0mBecause exports are encapsulated, private internal modules that are not exported[0m
[0mcannot be imported through the package resolution, unless using an absolute URL.[0m

[0m[90m<a id="ERR_PROTO_ACCESS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_PROTO_ACCESS[39m[32m[22m[39m

[0mAccessing [33mObject.prototype.__proto__[39m has been forbidden using[0m
[0m[[33m--disable-proto=throw[39m][]. [[33mObject.getPrototypeOf[39m][] and[0m
[0m[[33mObject.setPrototypeOf[39m][] should be used to get and set the prototype of an[0m
[0mobject.[0m

[0m[90m<a id="ERR_REQUIRE_ESM">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_REQUIRE_ESM[39m[32m[22m[39m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mAn attempt was made to [33mrequire()[39m an [ES Module][].[0m

[0m[90m<a id="ERR_SCRIPT_EXECUTION_INTERRUPTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SCRIPT_EXECUTION_INTERRUPTED[39m[32m[22m[39m

[0mScript execution was interrupted by [33mSIGINT[39m (For example, when Ctrl+C was[0m
[0mpressed).[0m

[0m[90m<a id="ERR_SCRIPT_EXECUTION_TIMEOUT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SCRIPT_EXECUTION_TIMEOUT[39m[32m[22m[39m

[0mScript execution timed out, possibly due to bugs in the script being executed.[0m

[0m[90m<a id="ERR_SERVER_ALREADY_LISTEN">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SERVER_ALREADY_LISTEN[39m[32m[22m[39m

[0mThe [[33mserver.listen()[39m][] method was called while a [33mnet.Server[39m was already[0m
[0mlistening. This applies to all instances of [33mnet.Server[39m, including HTTP, HTTPS,[0m
[0mand HTTP/2 [33mServer[39m instances.[0m

[0m[90m<a id="ERR_SERVER_NOT_RUNNING">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SERVER_NOT_RUNNING[39m[32m[22m[39m

[0mThe [[33mserver.close()[39m][] method was called when a [33mnet.Server[39m was not[0m
[0mrunning. This applies to all instances of [33mnet.Server[39m, including HTTP, HTTPS,[0m
[0mand HTTP/2 [33mServer[39m instances.[0m

[0m[90m<a id="ERR_SOCKET_ALREADY_BOUND">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_ALREADY_BOUND[39m[32m[22m[39m

[0mAn attempt was made to bind a socket that has already been bound.[0m

[0m[90m<a id="ERR_SOCKET_BAD_BUFFER_SIZE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_BAD_BUFFER_SIZE[39m[32m[22m[39m

[0mAn invalid (negative) size was passed for either the [33mrecvBufferSize[39m or[0m
[0m[33msendBufferSize[39m options in [[33mdgram.createSocket()[39m][].[0m

[0m[90m<a id="ERR_SOCKET_BAD_PORT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_BAD_PORT[39m[32m[22m[39m

[0mAn API function expecting a port >= 0 and < 65536 received an invalid value.[0m

[0m[90m<a id="ERR_SOCKET_BAD_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_BAD_TYPE[39m[32m[22m[39m

[0mAn API function expecting a socket type ([33mudp4[39m or [33mudp6[39m) received an invalid[0m
[0mvalue.[0m

[0m[90m<a id="ERR_SOCKET_BUFFER_SIZE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_BUFFER_SIZE[39m[32m[22m[39m

[0mWhile using [[33mdgram.createSocket()[39m][], the size of the receive or send [33mBuffer[39m[0m
[0mcould not be determined.[0m

[0m[90m<a id="ERR_SOCKET_CLOSED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_CLOSED[39m[32m[22m[39m

[0mAn attempt was made to operate on an already closed socket.[0m

[0m[90m<a id="ERR_SOCKET_DGRAM_IS_CONNECTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_DGRAM_IS_CONNECTED[39m[32m[22m[39m

[0mA [[33mdgram.connect()[39m][] call was made on an already connected socket.[0m

[0m[90m<a id="ERR_SOCKET_DGRAM_NOT_CONNECTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_DGRAM_NOT_CONNECTED[39m[32m[22m[39m

[0mA [[33mdgram.disconnect()[39m][] or [[33mdgram.remoteAddress()[39m][] call was made on a[0m
[0mdisconnected socket.[0m

[0m[90m<a id="ERR_SOCKET_DGRAM_NOT_RUNNING">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_DGRAM_NOT_RUNNING[39m[32m[22m[39m

[0mA call was made and the UDP subsystem was not running.[0m

[0m[90m<a id="ERR_SRI_PARSE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SRI_PARSE[39m[32m[22m[39m

[0mA string was provided for a Subresource Integrity check, but was unable to be[0m
[0mparsed. Check the format of integrity attributes by looking at the[0m
[0m[Subresource Integrity specification][].[0m

[0m[90m<a id="ERR_STREAM_CANNOT_PIPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_CANNOT_PIPE[39m[32m[22m[39m

[0mAn attempt was made to call [[33mstream.pipe()[39m][] on a [[33mWritable[39m][] stream.[0m

[0m[90m<a id="ERR_STREAM_DESTROYED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_DESTROYED[39m[32m[22m[39m

[0mA stream method was called that cannot complete because the stream was[0m
[0mdestroyed using [33mstream.destroy()[39m.[0m

[0m[90m<a id="ERR_STREAM_ALREADY_FINISHED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_ALREADY_FINISHED[39m[32m[22m[39m

[0mA stream method was called that cannot complete because the stream was[0m
[0mfinished.[0m

[0m[90m<a id="ERR_STREAM_NULL_VALUES">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_NULL_VALUES[39m[32m[22m[39m

[0mAn attempt was made to call [[33mstream.write()[39m][] with a [33mnull[39m chunk.[0m

[0m[90m<a id="ERR_STREAM_PREMATURE_CLOSE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_PREMATURE_CLOSE[39m[32m[22m[39m

[0mAn error returned by [33mstream.finished()[39m and [33mstream.pipeline()[39m, when a stream[0m
[0mor a pipeline ends non gracefully with no explicit error.[0m

[0m[90m<a id="ERR_STREAM_PUSH_AFTER_EOF">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_PUSH_AFTER_EOF[39m[32m[22m[39m

[0mAn attempt was made to call [[33mstream.push()[39m][] after a [33mnull[39m(EOF) had been[0m
[0mpushed to the stream.[0m

[0m[90m<a id="ERR_STREAM_UNSHIFT_AFTER_END_EVENT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_UNSHIFT_AFTER_END_EVENT[39m[32m[22m[39m

[0mAn attempt was made to call [[33mstream.unshift()[39m][] after the [33m'end'[39m event was[0m
[0memitted.[0m

[0m[90m<a id="ERR_STREAM_WRAP">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_WRAP[39m[32m[22m[39m

[0mPrevents an abort if a string decoder was set on the Socket or if the decoder[0m
[0mis in [33mobjectMode[39m.[0m

    [94mconst[39m [37mSocket[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[32m.[39m[37mSocket[39m[90m;[39m
    [94mconst[39m [37minstance[39m [93m=[39m [31mnew[39m [37mSocket[39m[90m([39m[90m)[39m[90m;[39m
    
    [37minstance[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m

[0m[90m<a id="ERR_STREAM_WRITE_AFTER_END">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_WRITE_AFTER_END[39m[32m[22m[39m

[0mAn attempt was made to call [[33mstream.write()[39m][] after [33mstream.end()[39m has been[0m
[0mcalled.[0m

[0m[90m<a id="ERR_STRING_TOO_LONG">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STRING_TOO_LONG[39m[32m[22m[39m

[0mAn attempt has been made to create a string longer than the maximum allowed[0m
[0mlength.[0m

[0m[90m<a id="ERR_SYNTHETIC">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SYNTHETIC[39m[32m[22m[39m

[0mAn artificial error object used to capture the call stack for diagnostic[0m
[0mreports.[0m

[0m[90m<a id="ERR_SYSTEM_ERROR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SYSTEM_ERROR[39m[32m[22m[39m

[0mAn unspecified or non-specific system error has occurred within the Node.js[0m
[0mprocess. The error object will have an [33merr.info[39m object property with[0m
[0madditional details.[0m

[0m[90m<a id="ERR_TLS_CERT_ALTNAME_INVALID">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_CERT_ALTNAME_INVALID[39m[32m[22m[39m

[0mWhile using TLS, the host name/IP of the peer did not match any of the[0m
[0m[33msubjectAltNames[39m in its certificate.[0m

[0m[90m<a id="ERR_TLS_DH_PARAM_SIZE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_DH_PARAM_SIZE[39m[32m[22m[39m

[0mWhile using TLS, the parameter offered for the Diffie-Hellman ([33mDH[39m)[0m
[0mkey-agreement protocol is too small. By default, the key length must be greater[0m
[0mthan or equal to 1024 bits to avoid vulnerabilities, even though it is strongly[0m
[0mrecommended to use 2048 bits or larger for stronger security.[0m

[0m[90m<a id="ERR_TLS_HANDSHAKE_TIMEOUT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_HANDSHAKE_TIMEOUT[39m[32m[22m[39m

[0mA TLS/SSL handshake timed out. In this case, the server must also abort the[0m
[0mconnection.[0m

[0m[90m<a id="ERR_TLS_INVALID_CONTEXT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_INVALID_CONTEXT[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe context must be a [33mSecureContext[39m.[0m

[0m[90m<a id="ERR_TLS_INVALID_STATE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_INVALID_STATE[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe TLS socket must be connected and securily established. Ensure the 'secure'[0m
[0mevent is emitted before continuing.[0m

[0m[90m<a id="ERR_TLS_INVALID_PROTOCOL_METHOD">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_INVALID_PROTOCOL_METHOD[39m[32m[22m[39m

[0mThe specified  [33msecureProtocol[39m method is invalid. It is  either unknown, or[0m
[0mdisabled because it is insecure.[0m

[0m[90m<a id="ERR_TLS_INVALID_PROTOCOL_VERSION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_INVALID_PROTOCOL_VERSION[39m[32m[22m[39m

[0mValid TLS protocol versions are [33m'TLSv1'[39m, [33m'TLSv1.1'[39m, or [33m'TLSv1.2'[39m.[0m

[0m[90m<a id="ERR_TLS_PROTOCOL_VERSION_CONFLICT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_PROTOCOL_VERSION_CONFLICT[39m[32m[22m[39m

[0mAttempting to set a TLS protocol [33mminVersion[39m or [33mmaxVersion[39m conflicts with an[0m
[0mattempt to set the [33msecureProtocol[39m explicitly. Use one mechanism or the other.[0m

[0m[90m<a id="ERR_TLS_RENEGOTIATION_DISABLED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_RENEGOTIATION_DISABLED[39m[32m[22m[39m

[0mAn attempt was made to renegotiate TLS on a socket instance with TLS disabled.[0m

[0m[90m<a id="ERR_TLS_REQUIRED_SERVER_NAME">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_REQUIRED_SERVER_NAME[39m[32m[22m[39m

[0mWhile using TLS, the [33mserver.addContext()[39m method was called without providing[0m
[0ma host name in the first parameter.[0m

[0m[90m<a id="ERR_TLS_SESSION_ATTACK">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_SESSION_ATTACK[39m[32m[22m[39m

[0mAn excessive amount of TLS renegotiations is detected, which is a potential[0m
[0mvector for denial-of-service attacks.[0m

[0m[90m<a id="ERR_TLS_SNI_FROM_SERVER">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_SNI_FROM_SERVER[39m[32m[22m[39m

[0mAn attempt was made to issue Server Name Indication from a TLS server-side[0m
[0msocket, which is only valid from a client.[0m

[0m[90m<a id="ERR_TLS_PSK_SET_IDENTIY_HINT_FAILED">[39m[90m</a>[39m[0m

[32m[1m### ERR_TLS_PSK_SET_IDENTIY_HINT_FAILED[22m[39m

[0mFailed to set PSK identity hint. Hint may be too long.[0m

[0m[90m<a id="ERR_TRACE_EVENTS_CATEGORY_REQUIRED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TRACE_EVENTS_CATEGORY_REQUIRED[39m[32m[22m[39m

[0mThe [33mtrace_events.createTracing()[39m method requires at least one trace event[0m
[0mcategory.[0m

[0m[90m<a id="ERR_TRACE_EVENTS_UNAVAILABLE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TRACE_EVENTS_UNAVAILABLE[39m[32m[22m[39m

[0mThe [33mtrace_events[39m module could not be loaded because Node.js was compiled with[0m
[0mthe [33m--without-v8-platform[39m flag.[0m

[0m[90m<a id="ERR_TRANSFERRING_EXTERNALIZED_SHAREDARRAYBUFFER">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TRANSFERRING_EXTERNALIZED_SHAREDARRAYBUFFER[39m[32m[22m[39m

[0mA [33mSharedArrayBuffer[39m whose memory is not managed by the JavaScript engine[0m
[0mor by Node.js was encountered during serialization. Such a [33mSharedArrayBuffer[39m[0m
[0mcannot be serialized.[0m

[0mThis can only happen when native addons create [33mSharedArrayBuffer[39ms in[0m
[0m"externalized" mode, or put existing [33mSharedArrayBuffer[39m into externalized mode.[0m

[0m[90m<a id="ERR_TRANSFORM_ALREADY_TRANSFORMING">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TRANSFORM_ALREADY_TRANSFORMING[39m[32m[22m[39m

[0mA [33mTransform[39m stream finished while it was still transforming.[0m

[0m[90m<a id="ERR_TRANSFORM_WITH_LENGTH_0">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TRANSFORM_WITH_LENGTH_0[39m[32m[22m[39m

[0mA [33mTransform[39m stream finished with data still in the write buffer.[0m

[0m[90m<a id="ERR_TTY_INIT_FAILED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TTY_INIT_FAILED[39m[32m[22m[39m

[0mThe initialization of a TTY failed due to a system error.[0m

[0m[90m<a id="ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET[39m[32m[22m[39m

[0m[[33mprocess.setUncaughtExceptionCaptureCallback()[39m][] was called twice,[0m
[0mwithout first resetting the callback to [33mnull[39m.[0m

[0mThis error is designed to prevent accidentally overwriting a callback registered[0m
[0mfrom another module.[0m

[0m[90m<a id="ERR_UNESCAPED_CHARACTERS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNESCAPED_CHARACTERS[39m[32m[22m[39m

[0mA string that contained unescaped characters was received.[0m

[0m[90m<a id="ERR_UNHANDLED_ERROR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNHANDLED_ERROR[39m[32m[22m[39m

[0mAn unhandled error occurred (for instance, when an [33m'error'[39m event is emitted[0m
[0mby an [[33mEventEmitter[39m][] but an [33m'error'[39m handler is not registered).[0m

[0m[90m<a id="ERR_UNKNOWN_BUILTIN_MODULE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNKNOWN_BUILTIN_MODULE[39m[32m[22m[39m

[0mUsed to identify a specific kind of internal Node.js error that should not[0m
[0mtypically be triggered by user code. Instances of this error point to an[0m
[0minternal bug within the Node.js binary itself.[0m

[0m[90m<a id="ERR_UNKNOWN_CREDENTIAL">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNKNOWN_CREDENTIAL[39m[32m[22m[39m

[0mA Unix group or user identifier that does not exist was passed.[0m

[0m[90m<a id="ERR_UNKNOWN_ENCODING">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNKNOWN_ENCODING[39m[32m[22m[39m

[0mAn invalid or unknown encoding option was passed to an API.[0m

[0m[90m<a id="ERR_UNKNOWN_FILE_EXTENSION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNKNOWN_FILE_EXTENSION[39m[32m[22m[39m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mAn attempt was made to load a module with an unknown or unsupported file[0m
[0mextension.[0m

[0m[90m<a id="ERR_UNKNOWN_MODULE_FORMAT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNKNOWN_MODULE_FORMAT[39m[32m[22m[39m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mAn attempt was made to load a module with an unknown or unsupported format.[0m

[0m[90m<a id="ERR_UNKNOWN_SIGNAL">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNKNOWN_SIGNAL[39m[32m[22m[39m

[0mAn invalid or unknown process signal was passed to an API expecting a valid[0m
[0msignal (such as [[33msubprocess.kill()[39m][]).[0m

[0m[90m<a id="ERR_UNSUPPORTED_ESM_URL_SCHEME">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNSUPPORTED_ESM_URL_SCHEME[39m[32m[22m[39m

[0m[33mimport[39m with URL schemes other than [33mfile[39m and [33mdata[39m is unsupported.[0m

[0m[90m<a id="ERR_V8BREAKITERATOR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_V8BREAKITERATOR[39m[32m[22m[39m

[0mThe V8 [33mBreakIterator[39m API was used but the full ICU data set is not installed.[0m

[0m[90m<a id="ERR_VALID_PERFORMANCE_ENTRY_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VALID_PERFORMANCE_ENTRY_TYPE[39m[32m[22m[39m

[0mWhile using the Performance Timing API ([33mperf_hooks[39m), no valid performance[0m
[0mentry types were found.[0m

[0m[90m<a id="ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[39m[32m[22m[39m

[0mA dynamic import callback was not specified.[0m

[0m<a id="ERR_VM[0m

[0m_MODULE_ALREADY_LINKED">[90m</a>[39m[0m

[32m[1m### [33mERR_VM_MODULE_ALREADY_LINKED[39m[32m[22m[39m

[0mThe module attempted to be linked is not eligible for linking, because of one of[0m
[0mthe following reasons:[0m

    * [0mIt has already been linked ([33mlinkingStatus[39m is [33m'linked'[39m)[0m
    * [0mIt is being linked ([33mlinkingStatus[39m is [33m'linking'[39m)[0m
    * [0mLinking has failed for this module ([33mlinkingStatus[39m is [33m'errored'[39m)[0m

[0m[90m<a id="ERR_VM_MODULE_CACHED_DATA_REJECTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VM_MODULE_CACHED_DATA_REJECTED[39m[32m[22m[39m

[0mThe [33mcachedData[39m option passed to a module constructor is invalid.[0m

[0m[90m<a id="ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA[39m[32m[22m[39m

[0mCached data cannot be created for modules which have already been evaluated.[0m

[0m[90m<a id="ERR_VM_MODULE_DIFFERENT_CONTEXT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VM_MODULE_DIFFERENT_CONTEXT[39m[32m[22m[39m

[0mThe module being returned from the linker function is from a different context[0m
[0mthan the parent module. Linked modules must share the same context.[0m

[0m[90m<a id="ERR_VM_MODULE_LINKING_ERRORED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VM_MODULE_LINKING_ERRORED[39m[32m[22m[39m

[0mThe linker function returned a module for which linking has failed.[0m

[0m[90m<a id="ERR_VM_MODULE_NOT_MODULE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VM_MODULE_NOT_MODULE[39m[32m[22m[39m

[0mThe fulfilled value of a linking promise is not a [33mvm.Module[39m object.[0m

[0m[90m<a id="ERR_VM_MODULE_STATUS">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VM_MODULE_STATUS[39m[32m[22m[39m

[0mThe current module's status does not allow for this operation. The specific[0m
[0mmeaning of the error depends on the specific function.[0m

[0m[90m<a id="ERR_WASI_ALREADY_STARTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_WASI_ALREADY_STARTED[39m[32m[22m[39m

[0mThe WASI instance has already started.[0m

[0m[90m<a id="ERR_WORKER_INIT_FAILED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_WORKER_INIT_FAILED[39m[32m[22m[39m

[0mThe [33mWorker[39m initialization failed.[0m

[0m[90m<a id="ERR_WORKER_INVALID_EXEC_ARGV">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_WORKER_INVALID_EXEC_ARGV[39m[32m[22m[39m

[0mThe [33mexecArgv[39m option passed to the [33mWorker[39m constructor contains[0m
[0minvalid flags.[0m

[0m[90m<a id="ERR_WORKER_NOT_RUNNING">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_WORKER_NOT_RUNNING[39m[32m[22m[39m

[0mAn operation failed because the [33mWorker[39m instance is not currently running.[0m

[0m[90m<a id="ERR_WORKER_OUT_OF_MEMORY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_WORKER_OUT_OF_MEMORY[39m[32m[22m[39m

[0mThe [33mWorker[39m instance terminated because it reached its memory limit.[0m

[0m[90m<a id="ERR_WORKER_PATH">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_WORKER_PATH[39m[32m[22m[39m

[0mThe path for the main script of a worker is neither an absolute path[0m
[0mnor a relative path starting with [33m./[39m or [33m../[39m.[0m

[0m[90m<a id="ERR_WORKER_UNSERIALIZABLE_ERROR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_WORKER_UNSERIALIZABLE_ERROR[39m[32m[22m[39m

[0mAll attempts at serializing an uncaught exception from a worker thread failed.[0m

[0m[90m<a id="ERR_WORKER_UNSUPPORTED_EXTENSION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_WORKER_UNSUPPORTED_EXTENSION[39m[32m[22m[39m

[0mThe pathname used for the main script of a worker has an[0m
[0munknown file extension.[0m

[0m[90m<a id="ERR_WORKER_UNSUPPORTED_OPERATION">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_WORKER_UNSUPPORTED_OPERATION[39m[32m[22m[39m

[0mThe requested functionality is not supported in worker threads.[0m

[0m[90m<a id="ERR_ZLIB_INITIALIZATION_FAILED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_ZLIB_INITIALIZATION_FAILED[39m[32m[22m[39m

[0mCreation of a [34m[33mzlib[39m[34m ([34m[4mzlib.html[24m[39m[34m)[39m object failed due to incorrect configuration.[0m

[0m[90m<a id="HPE_HEADER_OVERFLOW">[39m[90m</a>[39m[0m

[32m[1m### [33mHPE_HEADER_OVERFLOW[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/commit/186035243fad247e3955f[39m
[90m    description: Max header size in `http_parser` was set to 8KB.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mToo much HTTP header data was received. In order to protect against malicious or[0m
[0mmalconfigured clients, if more than 8KB of HTTP header data is received then[0m
[0mHTTP parsing will abort without a request or response object being created, and[0m
[0man [33mError[39m with this code will be emitted.[0m

[0m[90m<a id="MODULE_NOT_FOUND">[39m[90m</a>[39m[0m

[32m[1m### [33mMODULE_NOT_FOUND[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25690[39m
[90m    description: Added `requireStack` property.[39m
[90m-->[39m
[90m[39m[0mA module file could not be resolved while attempting a [34m[33mrequire()[39m[34m ([34m[4mmodules.html#modules_require_id[24m[39m[34m)[39m or[0m
[0m[33mimport[39m operation.[0m

[32m[1m## Legacy Node.js Error Codes[22m[39m

[90m[3m    [0mStability: 0 - Deprecated. These error codes are either inconsistent, or have[0m[23m[39m
[90m[3m    [0mbeen removed.[0m[23m[39m

[0m[90m<a id="ERR_CANNOT_TRANSFER_OBJECT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CANNOT_TRANSFER_OBJECT[39m[32m[22m[39m

[90m<!--[39m
[90madded: v10.5.0[39m
[90mremoved: v12.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe value passed to [33mpostMessage()[39m contained an object that is not supported[0m
[0mfor transferring.[0m

[0m[90m<a id="ERR_CLOSED_MESSAGE_PORT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CLOSED_MESSAGE_PORT[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.5.0[39m
[90mremoved: v11.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThere was an attempt to use a [33mMessagePort[39m instance in a closed[0m
[0mstate, usually after [33m.close()[39m has been called.[0m

[0m[90m<a id="ERR_CRYPTO_HASH_DIGEST_NO_UTF16">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_CRYPTO_HASH_DIGEST_NO_UTF16[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe UTF-16 encoding was used with [34m[33mhash.digest()[39m[34m ([34m[4mcrypto.html#crypto_hash_digest_encoding[24m[39m[34m)[39m. While the[0m
[0m[33mhash.digest()[39m method does allow an [33mencoding[39m argument to be passed in,[0m
[0mcausing the method to return a string rather than a [33mBuffer[39m, the UTF-16[0m
[0mencoding (e.g. [33mucs[39m or [33mutf16le[39m) is not supported.[0m

[0m[90m<a id="ERR_HTTP2_FRAME_ERROR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_FRAME_ERROR[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed when a failure occurs sending an individual frame on the HTTP/2[0m
[0msession.[0m

[0m[90m<a id="ERR_HTTP2_HEADERS_OBJECT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_HEADERS_OBJECT[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed when an HTTP/2 Headers Object is expected.[0m

[0m[90m<a id="ERR_HTTP2_HEADER_REQUIRED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_HEADER_REQUIRED[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed when a required header is missing in an HTTP/2 message.[0m

[0m[90m<a id="ERR_HTTP2_INFO_HEADERS_AFTER_RESPOND">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_INFO_HEADERS_AFTER_RESPOND[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mHTTP/2 informational headers must only be sent [3mprior[23m to calling the[0m
[0m[33mHttp2Stream.prototype.respond()[39m method.[0m

[0m[90m<a id="ERR_HTTP2_STREAM_CLOSED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP2_STREAM_CLOSED[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed when an action has been performed on an HTTP/2 Stream that has already[0m
[0mbeen closed.[0m

[0m[90m<a id="ERR_HTTP_INVALID_CHAR">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_HTTP_INVALID_CHAR[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed when an invalid character is found in an HTTP response status message[0m
[0m(reason phrase).[0m

[0m[90m<a id="ERR_INDEX_OUT_OF_RANGE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_INDEX_OUT_OF_RANGE[39m[32m[22m[39m

[90m<!-- YAML[39m
[90m  added: v10.0.0[39m
[90m  removed: v11.0.0[39m
[90m-->[39m
[90m[39m[0mA given index was out of the accepted range (e.g. negative offsets).[0m

[0m[90m<a id="ERR_NAPI_CONS_PROTOTYPE_OBJECT">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NAPI_CONS_PROTOTYPE_OBJECT[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed by the [33mN-API[39m when [33mConstructor.prototype[39m is not an object.[0m

[0m[90m<a id="ERR_NO_LONGER_SUPPORTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_NO_LONGER_SUPPORTED[39m[32m[22m[39m

[0mA Node.js API was called in an unsupported manner, such as[0m
[0m[33mBuffer.write(string, encoding, offset[, length])[39m.[0m

[0m[90m<a id="ERR_OUTOFMEMORY">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_OUTOFMEMORY[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed generically to identify that an operation caused an out of memory[0m
[0mcondition.[0m

[0m[90m<a id="ERR_PARSE_HISTORY_DATA">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_PARSE_HISTORY_DATA[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mrepl[39m module was unable to parse data from the REPL history file.[0m

[0m[90m<a id="ERR_SOCKET_CANNOT_SEND">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_SOCKET_CANNOT_SEND[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: REPLACEME[39m
[90m-->[39m
[90m[39m
[90m[39m[0mData could be sent on a socket.[0m

[0m[90m<a id="ERR_STDERR_CLOSE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STDERR_CLOSE[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mremoved: v10.12.0[39m
[90mchanges:[39m
[90m  - version: v10.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23053[39m
[90m    description: Rather than emitting an error, `process.stderr.end()` now[39m
[90m                 only closes the stream side but not the underlying resource,[39m
[90m                 making this error obsolete.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn attempt was made to close the [33mprocess.stderr[39m stream. By design, Node.js[0m
[0mdoes not allow [33mstdout[39m or [33mstderr[39m streams to be closed by user code.[0m

[0m[90m<a id="ERR_STDOUT_CLOSE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STDOUT_CLOSE[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mremoved: v10.12.0[39m
[90mchanges:[39m
[90m  - version: v10.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23053[39m
[90m    description: Rather than emitting an error, `process.stderr.end()` now[39m
[90m                 only closes the stream side but not the underlying resource,[39m
[90m                 making this error obsolete.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn attempt was made to close the [33mprocess.stdout[39m stream. By design, Node.js[0m
[0mdoes not allow [33mstdout[39m or [33mstderr[39m streams to be closed by user code.[0m

[0m[90m<a id="ERR_STREAM_READ_NOT_IMPLEMENTED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_STREAM_READ_NOT_IMPLEMENTED[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed when an attempt is made to use a readable stream that has not implemented[0m
[0m[34m[33mreadable._read()[39m[34m ([34m[4mstream.html#stream_readable_read_size_1[24m[39m[34m)[39m.[0m

[0m[90m<a id="ERR_TLS_RENEGOTIATION_FAILED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_TLS_RENEGOTIATION_FAILED[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed when a TLS renegotiation request has failed in a non-specific way.[0m

[0m[90m<a id="ERR_UNKNOWN_BUILTIN_MODULE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNKNOWN_BUILTIN_MODULE[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mremoved: v9.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'ERR_UNKNOWN_BUILTIN_MODULE'[39m error code is used to identify a specific[0m
[0mkind of internal Node.js error that should not typically be triggered by user[0m
[0mcode. Instances of this error point to an internal bug within the Node.js[0m
[0mbinary itself.[0m

[0m[90m<a id="ERR_UNKNOWN_STDIN_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNKNOWN_STDIN_TYPE[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mremoved: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn attempt was made to launch a Node.js process with an unknown [33mstdin[39m file[0m
[0mtype. This error is usually an indication of a bug within Node.js itself,[0m
[0malthough it is possible for user code to trigger it.[0m

[0m[90m<a id="ERR_UNKNOWN_STREAM_TYPE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_UNKNOWN_STREAM_TYPE[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mremoved: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn attempt was made to launch a Node.js process with an unknown [33mstdout[39m or[0m
[0m[33mstderr[39m file type. This error is usually an indication of a bug within Node.js[0m
[0mitself, although it is possible for user code to trigger it.[0m

[0m[90m<a id="ERR_VALUE_OUT_OF_RANGE">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VALUE_OUT_OF_RANGE[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed when a given value is out of the accepted range.[0m

[0m[90m<a id="ERR_VM_MODULE_NOT_LINKED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_VM_MODULE_NOT_LINKED[39m[32m[22m[39m

[0mThe module must be successfully linked before instantiation.[0m

[0m[90m<a id="ERR_ZLIB_BINDING_CLOSED">[39m[90m</a>[39m[0m

[32m[1m### [33mERR_ZLIB_BINDING_CLOSED[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90mremoved: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mUsed when an attempt is made to use a [33mzlib[39m object after it has already been[0m
[0mclosed.[0m

[32m[1m### Other error codes[22m[39m

[0mThese errors have never been released, but had been present on master between[0m
[0mreleases.[0m

[0m[90m<a id="ERR_ENTRY_TYPE_MISMATCH">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_ENTRY_TYPE_MISMATCH[39m[32m[22m[39m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mThe [33m--entry-type=commonjs[39m flag was used to attempt to execute an [33m.mjs[39m file[0m
[0mor a [33m.js[39m file where the nearest parent [33mpackage.json[39m contains[0m
[0m[33m"type": "module"[39m; or[0m
[0mthe [33m--entry-type=module[39m flag was used to attempt to execute a [33m.cjs[39m file or[0m
[0ma [33m.js[39m file where the nearest parent [33mpackage.json[39m either lacks a [33m"type"[39m[0m
[0mfield or contains [33m"type": "commonjs"[39m.[0m

[0m[90m<a id="ERR_FS_WATCHER_ALREADY_STARTED">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_FS_WATCHER_ALREADY_STARTED[39m[32m[22m[39m

[0mAn attempt was made to start a watcher returned by [33mfs.watch()[39m that has[0m
[0malready been started.[0m

[0m[90m<a id="ERR_FS_WATCHER_NOT_STARTED">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_FS_WATCHER_NOT_STARTED[39m[32m[22m[39m

[0mAn attempt was made to initiate operations on a watcher returned by[0m
[0m[33mfs.watch()[39m that has not yet been started.[0m

[0m[90m<a id="ERR_HTTP2_ALREADY_SHUTDOWN">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_HTTP2_ALREADY_SHUTDOWN[39m[32m[22m[39m

[0mOccurs with multiple attempts to shutdown an HTTP/2 session.[0m

[0m[90m<a id="ERR_HTTP2_ERROR">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_HTTP2_ERROR[39m[32m[22m[39m

[0mA non-specific HTTP/2 error has occurred.[0m

[0m[90m<a id="ERR_INVALID_REPL_HISTORY">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_INVALID_REPL_HISTORY[39m[32m[22m[39m

[0mUsed in the [33mrepl[39m in case the old history file is used and an error occurred[0m
[0mwhile trying to read and parse it.[0m

[0m[90m<a id="ERR_INVALID_REPL_TYPE">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_INVALID_REPL_TYPE[39m[32m[22m[39m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mThe [33m--entry-type=...[39m flag is not compatible with the Node.js REPL.[0m

[0m[90m<a id="ERR_MISSING_DYNAMIC_INSTANTIATE_HOOK">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_MISSING_DYNAMIC_INSTANTIATE_HOOK[39m[32m[22m[39m

[0mUsed when an [34mES Module ([34m[4mesm.html[24m[39m[34m)[39m loader hook specifies [33mformat: 'dynamic'[39m but does[0m
[0mnot provide a [33mdynamicInstantiate[39m hook.[0m

[0m[90m<a id="ERR_FEATURE_UNAVAILABLE_ON_PLATFORM">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_FEATURE_UNAVAILABLE_ON_PLATFORM[39m[32m[22m[39m

[0mUsed when a feature that is not available[0m
[0mto the current platform which is running Node.js is used.[0m

[0m[90m<a id="ERR_STREAM_HAS_STRINGDECODER">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_STREAM_HAS_STRINGDECODER[39m[32m[22m[39m

[0mUsed to prevent an abort if a string decoder was set on the Socket.[0m

    [94mconst[39m [37mSocket[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[32m.[39m[37mSocket[39m[90m;[39m
    [94mconst[39m [37minstance[39m [93m=[39m [31mnew[39m [37mSocket[39m[90m([39m[90m)[39m[90m;[39m
    
    [37minstance[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m

[0m[90m<a id="ERR_STRING_TOO_LARGE">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_STRING_TOO_LARGE[39m[32m[22m[39m

[0mAn attempt has been made to create a string larger than the maximum allowed[0m
[0msize.[0m

[0m[90m<a id="ERR_TTY_WRITABLE_NOT_READABLE">[39m[90m</a>[39m[0m

[32m[1m#### [33mERR_TTY_WRITABLE_NOT_READABLE[39m[32m[22m[39m

[0mThis [33mError[39m is thrown when a read is attempted on a TTY [33mWriteStream[39m,[0m
[0msuch as [33mprocess.stdout.on('data')[39m.[0m

