[35m[4m[1m# Stream[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mA stream is an abstract interface for working with streaming data in Node.js.[0m
[0mThe [33mstream[39m module provides an API for implementing the stream interface.[0m

[0mThere are many stream objects provided by Node.js. For instance, a[0m
[0m[request to an HTTP server][http-incoming-message] and [[33mprocess.stdout[39m][][0m
[0mare both stream instances.[0m

[0mStreams can be readable, writable, or both. All streams are instances of[0m
[0m[[33mEventEmitter[39m][].[0m

[0mTo access the [33mstream[39m module:[0m

    [94mconst[39m [37mstream[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m

[0mThe [33mstream[39m module is useful for creating new types of stream instances. It is[0m
[0musually not necessary to use the [33mstream[39m module to consume streams.[0m

[32m[1m## Organization of this Document[22m[39m

[0mThis document contains two primary sections and a third section for notes. The[0m
[0mfirst section explains how to use existing streams within an application. The[0m
[0msecond section explains how to create new types of streams.[0m

[32m[1m## Types of Streams[22m[39m

[0mThere are four fundamental stream types within Node.js:[0m

    * [0m[[33mWritable[39m][]: streams to which data can be written (for example,[0m
      [0m[[33mfs.createWriteStream()[39m][]).[0m
    * [0m[[33mReadable[39m][]: streams from which data can be read (for example,[0m
      [0m[[33mfs.createReadStream()[39m][]).[0m
    * [0m[[33mDuplex[39m][]: streams that are both [33mReadable[39m and [33mWritable[39m (for example,[0m
      [0m[[33mnet.Socket[39m][]).[0m
    * [0m[[33mTransform[39m][]: [33mDuplex[39m streams that can modify or transform the data as it[0m
      [0mis written and read (for example, [[33mzlib.createDeflate()[39m][]).[0m

[0mAdditionally, this module includes the utility functions[0m
[0m[[33mstream.pipeline()[39m][], [[33mstream.finished()[39m][] and[0m
[0m[[33mstream.Readable.from()[39m][].[0m

[32m[1m### Object Mode[22m[39m

[0mAll streams created by Node.js APIs operate exclusively on strings and [33mBuffer[39m[0m
[0m(or [33mUint8Array[39m) objects. It is possible, however, for stream implementations[0m
[0mto work with other types of JavaScript values (with the exception of [33mnull[39m,[0m
[0mwhich serves a special purpose within streams). Such streams are considered to[0m
[0moperate in "object mode".[0m

[0mStream instances are switched into object mode using the [33mobjectMode[39m option[0m
[0mwhen the stream is created. Attempting to switch an existing stream into[0m
[0mobject mode is not safe.[0m

[32m[1m### Buffering[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mBoth [[33mWritable[39m][] and [[33mReadable[39m][] streams will store data in an internal[0m
[0mbuffer that can be retrieved using [33mwritable.writableBuffer[39m or[0m
[0m[33mreadable.readableBuffer[39m, respectively.[0m

[0mThe amount of data potentially buffered depends on the [33mhighWaterMark[39m option[0m
[0mpassed into the stream's constructor. For normal streams, the [33mhighWaterMark[39m[0m
[0moption specifies a [total number of bytes][hwm-gotcha]. For streams operating[0m
[0min object mode, the [33mhighWaterMark[39m specifies a total number of objects.[0m

[0mData is buffered in [33mReadable[39m streams when the implementation calls[0m
[0m[[33mstream.push(chunk)[39m][stream-push]. If the consumer of the Stream does not[0m
[0mcall [[33mstream.read()[39m][stream-read], the data will sit in the internal[0m
[0mqueue until it is consumed.[0m

[0mOnce the total size of the internal read buffer reaches the threshold specified[0m
[0mby [33mhighWaterMark[39m, the stream will temporarily stop reading data from the[0m
[0munderlying resource until the data currently buffered can be consumed (that is,[0m
[0mthe stream will stop calling the internal [33mreadable._read()[39m method that is[0m
[0mused to fill the read buffer).[0m

[0mData is buffered in [33mWritable[39m streams when the[0m
[0m[[33mwritable.write(chunk)[39m][stream-write] method is called repeatedly. While the[0m
[0mtotal size of the internal write buffer is below the threshold set by[0m
[0m[33mhighWaterMark[39m, calls to [33mwritable.write()[39m will return [33mtrue[39m. Once[0m
[0mthe size of the internal buffer reaches or exceeds the [33mhighWaterMark[39m, [33mfalse[39m[0m
[0mwill be returned.[0m

[0mA key goal of the [33mstream[39m API, particularly the [[33mstream.pipe()[39m][] method,[0m
[0mis to limit the buffering of data to acceptable levels such that sources and[0m
[0mdestinations of differing speeds will not overwhelm the available memory.[0m

[0mBecause [[33mDuplex[39m][] and [[33mTransform[39m][] streams are both [33mReadable[39m and[0m
[0m[33mWritable[39m, each maintains [3mtwo[23m separate internal buffers used for reading and[0m
[0mwriting, allowing each side to operate independently of the other while[0m
[0mmaintaining an appropriate and efficient flow of data. For example,[0m
[0m[[33mnet.Socket[39m][] instances are [[33mDuplex[39m][] streams whose [33mReadable[39m side allows[0m
[0mconsumption of data received [3mfrom[23m the socket and whose [33mWritable[39m side allows[0m
[0mwriting data [3mto[23m the socket. Because data may be written to the socket at a[0m
[0mfaster or slower rate than data is received, each side should[0m
[0moperate (and buffer) independently of the other.[0m

[32m[1m## API for Stream Consumers[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mAlmost all Node.js applications, no matter how simple, use streams in some[0m
[0mmanner. The following is an example of using streams in a Node.js application[0m
[0mthat implements an HTTP server:[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// `req` is an http.IncomingMessage, which is a Readable Stream.[39m
      [90m// `res` is an http.ServerResponse, which is a Writable Stream.[39m
    
      [94mlet[39m [37mbody[39m [93m=[39m [92m''[39m[90m;[39m
      [90m// Get the data as utf8 strings.[39m
      [90m// If an encoding is not set, Buffer objects will be received.[39m
      [37mreq[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
    
      [90m// Readable streams emit 'data' events once a listener is added.[39m
      [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mbody[39m [93m+=[39m [37mchunk[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [90m// The 'end' event indicates that the entire body has been received.[39m
      [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [36mtry[39m [33m{[39m
          [94mconst[39m [37mdata[39m [93m=[39m [37mJSON[39m[32m.[39m[37mparse[39m[90m([39m[37mbody[39m[90m)[39m[90m;[39m
          [90m// Write back something interesting to the user:[39m
          [37mres[39m[32m.[39m[37mwrite[39m[90m([39m[94mtypeof[39m [37mdata[39m[90m)[39m[90m;[39m
          [37mres[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m [36mcatch[39m [90m([39m[37mer[39m[90m)[39m [33m{[39m
          [90m// uh oh! bad json![39m
          [37mres[39m[32m.[39m[37mstatusCode[39m [93m=[39m [34m400[39m[90m;[39m
          [31mreturn[39m [37mres[39m[32m.[39m[37mend[39m[90m([39m`error: ${[37mer[39m[32m.[39m[37mmessage[39m}`[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[90m)[39m[90m;[39m
    
    [90m// $ curl localhost:1337 -d "{}"[39m
    [90m// object[39m
    [90m// $ curl localhost:1337 -d "\"foo\""[39m
    [90m// string[39m
    [90m// $ curl localhost:1337 -d "not json"[39m
    [90m// error: Unexpected token o in JSON at position 1[39m

[0m[[33mWritable[39m][] streams (such as [33mres[39m in the example) expose methods such as[0m
[0m[33mwrite()[39m and [33mend()[39m that are used to write data onto the stream.[0m

[0m[[33mReadable[39m][] streams use the [[33mEventEmitter[39m][] API for notifying application[0m
[0mcode when data is available to be read off the stream. That available data can[0m
[0mbe read from the stream in multiple ways.[0m

[0mBoth [[33mWritable[39m][] and [[33mReadable[39m][] streams use the [[33mEventEmitter[39m][] API in[0m
[0mvarious ways to communicate the current state of the stream.[0m

[0m[[33mDuplex[39m][] and [[33mTransform[39m][] streams are both [[33mWritable[39m][] and[0m
[0m[[33mReadable[39m][].[0m

[0mApplications that are either writing data to or consuming data from a stream[0m
[0mare not required to implement the stream interfaces directly and will generally[0m
[0mhave no reason to call [33mrequire('stream')[39m.[0m

[0mDevelopers wishing to implement new types of streams should refer to the[0m
[0msection [API for Stream Implementers][].[0m

[32m[1m### Writable Streams[22m[39m

[0mWritable streams are an abstraction for a [3mdestination[23m to which data is[0m
[0mwritten.[0m

[0mExamples of [[33mWritable[39m][] streams include:[0m

    * [0m[HTTP requests, on the client][][0m
    * [0m[HTTP responses, on the server][][0m
    * [0m[fs write streams][][0m
    * [0m[zlib streams][zlib][0m
    * [0m[crypto streams][crypto][0m
    * [0m[TCP sockets][][0m
    * [0m[child process stdin][][0m
    * [0m[[33mprocess.stdout[39m][], [[33mprocess.stderr[39m][][0m

[0mSome of these examples are actually [[33mDuplex[39m][] streams that implement the[0m
[0m[[33mWritable[39m][] interface.[0m

[0mAll [[33mWritable[39m][] streams implement the interface defined by the[0m
[0m[33mstream.Writable[39m class.[0m

[0mWhile specific instances of [[33mWritable[39m][] streams may differ in various ways,[0m
[0mall [33mWritable[39m streams follow the same fundamental usage pattern as illustrated[0m
[0min the example below:[0m

    [94mconst[39m [37mmyStream[39m [93m=[39m [37mgetWritableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37mmyStream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'some data'[39m[90m)[39m[90m;[39m
    [37mmyStream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'some more data'[39m[90m)[39m[90m;[39m
    [37mmyStream[39m[32m.[39m[37mend[39m[90m([39m[92m'done writing data'[39m[90m)[39m[90m;[39m

[32m[1m#### Class: [33mstream.Writable[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=class-->[39m
[90m[39m
[90m[39m[32m[1m##### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18438[39m
[90m    description: Add `emitClose` option to specify if `'close'` is emitted on[39m
[90m                 destroy.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'close'[39m event is emitted when the stream and any of its underlying[0m
[0mresources (a file descriptor, for example) have been closed. The event indicates[0m
[0mthat no more events will be emitted, and no further computation will occur.[0m

[0mA [[33mWritable[39m][] stream will always emit the [33m'close'[39m event if it is[0m
[0mcreated with the [33memitClose[39m option.[0m

[32m[1m##### Event: [33m'drain'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mIf a call to [[33mstream.write(chunk)[39m][stream-write] returns [33mfalse[39m, the[0m
[0m[33m'drain'[39m event will be emitted when it is appropriate to resume writing data[0m
[0mto the stream.[0m

    [90m// Write the data to the supplied writable stream one million times.[39m
    [90m// Be attentive to back-pressure.[39m
    [94mfunction[39m [37mwriteOneMillionTimes[39m[90m([39m[37mwriter[39m[32m,[39m [37mdata[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
      [94mlet[39m [37mi[39m [93m=[39m [34m1000000[39m[90m;[39m
      [37mwrite[39m[90m([39m[90m)[39m[90m;[39m
      [94mfunction[39m [37mwrite[39m[90m([39m[90m)[39m [33m{[39m
        [94mlet[39m [37mok[39m [93m=[39m [91mtrue[39m[90m;[39m
        [94mdo[39m [33m{[39m
          [37mi[39m[93m--[39m[90m;[39m
          [94mif[39m [90m([39m[37mi[39m [93m===[39m [34m0[39m[90m)[39m [33m{[39m
            [90m// Last time![39m
            [37mwriter[39m[32m.[39m[37mwrite[39m[90m([39m[37mdata[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m
          [33m}[39m [94melse[39m [33m{[39m
            [90m// See if we should continue, or wait.[39m
            [90m// Don't pass the callback, because we're not done yet.[39m
            [37mok[39m [93m=[39m [37mwriter[39m[32m.[39m[37mwrite[39m[90m([39m[37mdata[39m[32m,[39m [37mencoding[39m[90m)[39m[90m;[39m
          [33m}[39m
        [33m}[39m [94mwhile[39m [90m([39m[37mi[39m [93m>[39m [34m0[39m [93m&&[39m [37mok[39m[90m)[39m[90m;[39m
        [94mif[39m [90m([39m[37mi[39m [93m>[39m [34m0[39m[90m)[39m [33m{[39m
          [90m// Had to stop early![39m
          [90m// Write some more once it drains.[39m
          [37mwriter[39m[32m.[39m[37monce[39m[90m([39m[92m'drain'[39m[32m,[39m [37mwrite[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m

[32m[1m##### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Error}[0m

[0mThe [33m'error'[39m event is emitted if an error occurred while writing or piping[0m
[0mdata. The listener callback is passed a single [33mError[39m argument when called.[0m

[0mThe stream is closed when the [33m'error'[39m event is emitted unless the[0m
[0m[[33mautoDestroy[39m][writable-new] option was set to [33mfalse[39m when creating the[0m
[0mstream.[0m

[0mAfter [33m'error'[39m, no further events other than [33m'close'[39m [3mshould[23m be emitted[0m
[0m(including [33m'error'[39m events).[0m

[32m[1m##### Event: [33m'finish'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'finish'[39m event is emitted after the [[33mstream.end()[39m][stream-end] method[0m
[0mhas been called, and all data has been flushed to the underlying system.[0m

    [94mconst[39m [37mwriter[39m [93m=[39m [37mgetWritableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m100[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
      [37mwriter[39m[32m.[39m[37mwrite[39m[90m([39m`hello, #${[37mi[39m}!\n`[90m)[39m[90m;[39m
    [33m}[39m
    [37mwriter[39m[32m.[39m[37mon[39m[90m([39m[92m'finish'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'All writes are now complete.'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mwriter[39m[32m.[39m[37mend[39m[90m([39m[92m'This is the end\n'[39m[90m)[39m[90m;[39m

[32m[1m##### Event: [33m'pipe'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msrc[39m {stream.Readable} source stream that is piping to this writable[0m

[0mThe [33m'pipe'[39m event is emitted when the [[33mstream.pipe()[39m][] method is called on[0m
[0ma readable stream, adding this writable to its set of destinations.[0m

    [94mconst[39m [37mwriter[39m [93m=[39m [37mgetWritableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mreader[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37mwriter[39m[32m.[39m[37mon[39m[90m([39m[92m'pipe'[39m[32m,[39m [90m([39m[37msrc[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Something is piping into the writer.'[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mequal[39m[90m([39m[37msrc[39m[32m,[39m [37mreader[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mreader[39m[32m.[39m[37mpipe[39m[90m([39m[37mwriter[39m[90m)[39m[90m;[39m

[32m[1m##### Event: [33m'unpipe'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msrc[39m {stream.Readable} The source stream that[0m
      [0m[unpiped][[33mstream.unpipe()[39m] this writable[0m

[0mThe [33m'unpipe'[39m event is emitted when the [[33mstream.unpipe()[39m][] method is called[0m
[0mon a [[33mReadable[39m][] stream, removing this [[33mWritable[39m][] from its set of[0m
[0mdestinations.[0m

[0mThis is also emitted in case this [[33mWritable[39m][] stream emits an error when a[0m
[0m[[33mReadable[39m][] stream pipes into it.[0m

    [94mconst[39m [37mwriter[39m [93m=[39m [37mgetWritableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mreader[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37mwriter[39m[32m.[39m[37mon[39m[90m([39m[92m'unpipe'[39m[32m,[39m [90m([39m[37msrc[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Something has stopped piping into the writer.'[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mequal[39m[90m([39m[37msrc[39m[32m,[39m [37mreader[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mreader[39m[32m.[39m[37mpipe[39m[90m([39m[37mwriter[39m[90m)[39m[90m;[39m
    [37mreader[39m[32m.[39m[37munpipe[39m[90m([39m[37mwriter[39m[90m)[39m[90m;[39m

[32m[1m##### [33mwritable.cork()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mwritable.cork()[39m method forces all written data to be buffered in memory.[0m
[0mThe buffered data will be flushed when either the [[33mstream.uncork()[39m][] or[0m
[0m[[33mstream.end()[39m][stream-end] methods are called.[0m

[0mThe primary intent of [33mwritable.cork()[39m is to accommodate a situation in which[0m
[0mseveral small chunks are written to the stream in rapid succession. Instead of[0m
[0mimmediately forwarding them to the underlying destination, [33mwritable.cork()[39m[0m
[0mbuffers all the chunks until [33mwritable.uncork()[39m is called, which will pass them[0m
[0mall to [33mwritable._writev()[39m, if present. This prevents a head-of-line blocking[0m
[0msituation where data is being buffered while waiting for the first small chunk[0m
[0mto be processed. However, use of [33mwritable.cork()[39m without implementing[0m
[0m[33mwritable._writev()[39m may have an adverse effect on throughput.[0m

[0mSee also: [[33mwritable.uncork()[39m][], [[33mwritable._writev()[39m][stream-_writev].[0m

[32m[1m##### [33mwritable.destroy([error])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merror[39m {Error} Optional, an error to emit with [33m'error'[39m event.[0m
    * [0mReturns: {this}[0m

[0mDestroy the stream. Optionally emit an [33m'error'[39m event, and emit a [33m'close'[39m[0m
[0mevent (unless [33memitClose[39m is set to [33mfalse[39m). After this call, the writable[0m
[0mstream has ended and subsequent calls to [33mwrite()[39m or [33mend()[39m will result in[0m
[0man [33mERR_STREAM_DESTROYED[39m error.[0m
[0mThis is a destructive and immediate way to destroy a stream. Previous calls to[0m
[0m[33mwrite()[39m may not have drained, and may trigger an [33mERR_STREAM_DESTROYED[39m error.[0m
[0mUse [33mend()[39m instead of destroy if data should flush before close, or wait for[0m
[0mthe [33m'drain'[39m event before destroying the stream.[0m

[0mOnce [33mdestroy()[39m has been called any further calls will be a noop and no[0m
[0mfurther errors except from [33m_destroy[39m may be emitted as [33m'error'[39m.[0m

[0mImplementors should not override this method,[0m
[0mbut instead implement [[33mwritable._destroy()[39m][writable-_destroy].[0m

[32m[1m##### [33mwritable.destroyed[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m after [[33mwritable.destroy()[39m][writable-destroy] has been called.[0m

[32m[1m##### [33mwritable.end([chunk[, encoding]][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29747[39m
[90m    description: The `callback` is invoked if 'finish' or 'error' is emitted.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18780[39m
[90m    description: This method now returns a reference to `writable`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11608[39m
[90m    description: The `chunk` argument can now be a `Uint8Array` instance.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mchunk[39m {string|Buffer|Uint8Array|any} Optional data to write. For streams[0m
      [0mnot operating in object mode, [33mchunk[39m must be a string, [33mBuffer[39m or[0m
      [0m[33mUint8Array[39m. For object mode streams, [33mchunk[39m may be any JavaScript value[0m
      [0mother than [33mnull[39m.[0m
    * [0m[33mencoding[39m {string} The encoding if [33mchunk[39m is a string[0m
    * [0m[33mcallback[39m {Function} Optional callback for when the stream finishes[0m
      [0mor errors[0m
    * [0mReturns: {this}[0m

[0mCalling the [33mwritable.end()[39m method signals that no more data will be written[0m
[0mto the [[33mWritable[39m][]. The optional [33mchunk[39m and [33mencoding[39m arguments allow one[0m
[0mfinal additional chunk of data to be written immediately before closing the[0m
[0mstream. If provided, the optional [33mcallback[39m function is attached as a listener[0m
[0mfor the [[33m'finish'[39m][] and the [33m'error'[39m event.[0m

[0mCalling the [[33mstream.write()[39m][stream-write] method after calling[0m
[0m[[33mstream.end()[39m][stream-end] will raise an error.[0m

    [90m// Write 'hello, ' and then end with 'world!'.[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfile[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'example.txt'[39m[90m)[39m[90m;[39m
    [37mfile[39m[32m.[39m[37mwrite[39m[90m([39m[92m'hello, '[39m[90m)[39m[90m;[39m
    [37mfile[39m[32m.[39m[37mend[39m[90m([39m[92m'world!'[39m[90m)[39m[90m;[39m
    [90m// Writing more now is not allowed![39m

[32m[1m##### [33mwritable.setDefaultEncoding(encoding)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v6.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5040[39m
[90m    description: This method now returns a reference to `writable`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mencoding[39m {string} The new default encoding[0m
    * [0mReturns: {this}[0m

[0mThe [33mwritable.setDefaultEncoding()[39m method sets the default [33mencoding[39m for a[0m
[0m[[33mWritable[39m][] stream.[0m

[32m[1m##### [33mwritable.uncork()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mwritable.uncork()[39m method flushes all data buffered since[0m
[0m[[33mstream.cork()[39m][] was called.[0m

[0mWhen using [[33mwritable.cork()[39m][] and [33mwritable.uncork()[39m to manage the buffering[0m
[0mof writes to a stream, it is recommended that calls to [33mwritable.uncork()[39m be[0m
[0mdeferred using [33mprocess.nextTick()[39m. Doing so allows batching of all[0m
[0m[33mwritable.write()[39m calls that occur within a given Node.js event loop phase.[0m

    [37mstream[39m[32m.[39m[37mcork[39m[90m([39m[90m)[39m[90m;[39m
    [37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'some '[39m[90m)[39m[90m;[39m
    [37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'data '[39m[90m)[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [37mstream[39m[32m.[39m[37muncork[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m

[0mIf the [[33mwritable.cork()[39m][] method is called multiple times on a stream, the[0m
[0msame number of calls to [33mwritable.uncork()[39m must be called to flush the buffered[0m
[0mdata.[0m

    [37mstream[39m[32m.[39m[37mcork[39m[90m([39m[90m)[39m[90m;[39m
    [37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'some '[39m[90m)[39m[90m;[39m
    [37mstream[39m[32m.[39m[37mcork[39m[90m([39m[90m)[39m[90m;[39m
    [37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'data '[39m[90m)[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37muncork[39m[90m([39m[90m)[39m[90m;[39m
      [90m// The data will not be flushed until uncork() is called a second time.[39m
      [37mstream[39m[32m.[39m[37muncork[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mSee also: [[33mwritable.cork()[39m][].[0m

[32m[1m##### [33mwritable.writable[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m if it is safe to call [[33mwritable.write()[39m][stream-write], which means[0m
[0mthe stream has not been destroyed, errored or ended.[0m

[32m[1m##### [33mwritable.writableEnded[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m after [[33mwritable.end()[39m][] has been called. This property[0m
[0mdoes not indicate whether the data has been flushed, for this use[0m
[0m[[33mwritable.writableFinished[39m][] instead.[0m

[32m[1m##### [33mwritable.writableCorked[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mNumber of times [[33mwritable.uncork()[39m][stream-uncork] needs to be[0m
[0mcalled in order to fully uncork the stream.[0m

[32m[1m##### [33mwritable.writableFinished[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs set to [33mtrue[39m immediately before the [[33m'finish'[39m][] event is emitted.[0m

[32m[1m##### [33mwritable.writableHighWaterMark[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mReturn the value of [33mhighWaterMark[39m passed when constructing this[0m
[0m[33mWritable[39m.[0m

[32m[1m##### [33mwritable.writableLength[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThis property contains the number of bytes (or objects) in the queue[0m
[0mready to be written. The value provides introspection data regarding[0m
[0mthe status of the [33mhighWaterMark[39m.[0m

[32m[1m##### [33mwritable.writableObjectMode[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mGetter for the property [33mobjectMode[39m of a given [33mWritable[39m stream.[0m

[32m[1m##### [33mwritable.write(chunk[, encoding][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11608[39m
[90m    description: The `chunk` argument can now be a `Uint8Array` instance.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6170[39m
[90m    description: Passing `null` as the `chunk` parameter will always be[39m
[90m                 considered invalid now, even in object mode.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mchunk[39m {string|Buffer|Uint8Array|any} Optional data to write. For streams[0m
      [0mnot operating in object mode, [33mchunk[39m must be a string, [33mBuffer[39m or[0m
      [0m[33mUint8Array[39m. For object mode streams, [33mchunk[39m may be any JavaScript value[0m
      [0mother than [33mnull[39m.[0m
    * [0m[33mencoding[39m {string} The encoding, if [33mchunk[39m is a string[0m
    * [0m[33mcallback[39m {Function} Callback for when this chunk of data is flushed[0m
    * [0mReturns: {boolean} [33mfalse[39m if the stream wishes for the calling code to[0m
      [0mwait for the [33m'drain'[39m event to be emitted before continuing to write[0m
      [0madditional data; otherwise [33mtrue[39m.[0m

[0mThe [33mwritable.write()[39m method writes some data to the stream, and calls the[0m
[0msupplied [33mcallback[39m once the data has been fully handled. If an error[0m
[0moccurs, the [33mcallback[39m [3mmay or may not[23m be called with the error as its[0m
[0mfirst argument. To reliably detect write errors, add a listener for the[0m
[0m[33m'error'[39m event. The [33mcallback[39m is called asynchronously and before [33m'error'[39m is[0m
[0memitted.[0m

[0mThe return value is [33mtrue[39m if the internal buffer is less than the[0m
[0m[33mhighWaterMark[39m configured when the stream was created after admitting [33mchunk[39m.[0m
[0mIf [33mfalse[39m is returned, further attempts to write data to the stream should[0m
[0mstop until the [[33m'drain'[39m][] event is emitted.[0m

[0mWhile a stream is not draining, calls to [33mwrite()[39m will buffer [33mchunk[39m, and[0m
[0mreturn false. Once all currently buffered chunks are drained (accepted for[0m
[0mdelivery by the operating system), the [33m'drain'[39m event will be emitted.[0m
[0mIt is recommended that once [33mwrite()[39m returns false, no more chunks be written[0m
[0muntil the [33m'drain'[39m event is emitted. While calling [33mwrite()[39m on a stream that[0m
[0mis not draining is allowed, Node.js will buffer all written chunks until[0m
[0mmaximum memory usage occurs, at which point it will abort unconditionally.[0m
[0mEven before it aborts, high memory usage will cause poor garbage collector[0m
[0mperformance and high RSS (which is not typically released back to the system,[0m
[0meven after the memory is no longer required). Since TCP sockets may never[0m
[0mdrain if the remote peer does not read the data, writing a socket that is[0m
[0mnot draining may lead to a remotely exploitable vulnerability.[0m

[0mWriting data while the stream is not draining is particularly[0m
[0mproblematic for a [[33mTransform[39m][], because the [33mTransform[39m streams are paused[0m
[0mby default until they are piped or a [33m'data'[39m or [33m'readable'[39m event handler[0m
[0mis added.[0m

[0mIf the data to be written can be generated or fetched on demand, it is[0m
[0mrecommended to encapsulate the logic into a [[33mReadable[39m][] and use[0m
[0m[[33mstream.pipe()[39m][]. However, if calling [33mwrite()[39m is preferred, it is[0m
[0mpossible to respect backpressure and avoid memory issues using the[0m
[0m[[33m'drain'[39m][] event:[0m

    [94mfunction[39m [37mwrite[39m[90m([39m[37mdata[39m[32m,[39m [37mcb[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[93m![39m[37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[37mdata[39m[90m)[39m[90m)[39m [33m{[39m
        [37mstream[39m[32m.[39m[37monce[39m[90m([39m[92m'drain'[39m[32m,[39m [37mcb[39m[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37mnextTick[39m[90m([39m[37mcb[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [90m// Wait for cb to be called before doing any other write.[39m
    [37mwrite[39m[90m([39m[92m'hello'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Write completed, do more writes now.'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mA [33mWritable[39m stream in object mode will always ignore the [33mencoding[39m argument.[0m

[32m[1m### Readable Streams[22m[39m

[0mReadable streams are an abstraction for a [3msource[23m from which data is[0m
[0mconsumed.[0m

[0mExamples of [33mReadable[39m streams include:[0m

    * [0m[HTTP responses, on the client][http-incoming-message][0m
    * [0m[HTTP requests, on the server][http-incoming-message][0m
    * [0m[fs read streams][][0m
    * [0m[zlib streams][zlib][0m
    * [0m[crypto streams][crypto][0m
    * [0m[TCP sockets][][0m
    * [0m[child process stdout and stderr][][0m
    * [0m[[33mprocess.stdin[39m][][0m

[0mAll [[33mReadable[39m][] streams implement the interface defined by the[0m
[0m[33mstream.Readable[39m class.[0m

[32m[1m#### Two Reading Modes[22m[39m

[0m[33mReadable[39m streams effectively operate in one of two modes: flowing and[0m
[0mpaused. These modes are separate from [object mode][object-mode].[0m
[0mA [[33mReadable[39m][] stream can be in object mode or not, regardless of whether[0m
[0mit is in flowing mode or paused mode.[0m

    * [0m[0m[0mIn flowing mode, data is read from the underlying system automatically[0m[0m[0m
      [0m[0m[0mand provided to an application as quickly as possible using events via the[0m[0m[0m
      [0m[0m[0m[[33mEventEmitter[39m][] interface.[0m[0m[0m
    * [0m[0m[0mIn paused mode, the [[33mstream.read()[39m][stream-read] method must be called[0m[0m[0m
      [0m[0m[0mexplicitly to read chunks of data from the stream.[0m[0m[0m

[0mAll [[33mReadable[39m][] streams begin in paused mode but can be switched to flowing[0m
[0mmode in one of the following ways:[0m

    * [0mAdding a [[33m'data'[39m][] event handler.[0m
    * [0mCalling the [[33mstream.resume()[39m][stream-resume] method.[0m
    * [0mCalling the [[33mstream.pipe()[39m][] method to send the data to a [[33mWritable[39m][].[0m

[0mThe [33mReadable[39m can switch back to paused mode using one of the following:[0m

    * [0mIf there are no pipe destinations, by calling the[0m
      [0m[[33mstream.pause()[39m][stream-pause] method.[0m
    * [0mIf there are pipe destinations, by removing all pipe destinations.[0m
      [0mMultiple pipe destinations may be removed by calling the[0m
      [0m[[33mstream.unpipe()[39m][] method.[0m

[0mThe important concept to remember is that a [33mReadable[39m will not generate data[0m
[0muntil a mechanism for either consuming or ignoring that data is provided. If[0m
[0mthe consuming mechanism is disabled or taken away, the [33mReadable[39m will [3mattempt[23m[0m
[0mto stop generating the data.[0m

[0mFor backward compatibility reasons, removing [[33m'data'[39m][] event handlers will[0m
[0m[1mnot[22m automatically pause the stream. Also, if there are piped destinations,[0m
[0mthen calling [[33mstream.pause()[39m][stream-pause] will not guarantee that the[0m
[0mstream will [3mremain[23m paused once those destinations drain and ask for more data.[0m

[0mIf a [[33mReadable[39m][] is switched into flowing mode and there are no consumers[0m
[0mavailable to handle the data, that data will be lost. This can occur, for[0m
[0minstance, when the [33mreadable.resume()[39m method is called without a listener[0m
[0mattached to the [33m'data'[39m event, or when a [33m'data'[39m event handler is removed[0m
[0mfrom the stream.[0m

[0mAdding a [[33m'readable'[39m][] event handler automatically make the stream to[0m
[0mstop flowing, and the data to be consumed via[0m
[0m[[33mreadable.read()[39m][stream-read]. If the [[33m'readable'[39m][] event handler is[0m
[0mremoved, then the stream will start flowing again if there is a[0m
[0m[[33m'data'[39m][] event handler.[0m

[32m[1m#### Three States[22m[39m

[0mThe "two modes" of operation for a [33mReadable[39m stream are a simplified[0m
[0mabstraction for the more complicated internal state management that is happening[0m
[0mwithin the [33mReadable[39m stream implementation.[0m

[0mSpecifically, at any given point in time, every [33mReadable[39m is in one of three[0m
[0mpossible states:[0m

    * [0m[33mreadable.readableFlowing === null[39m[0m
    * [0m[33mreadable.readableFlowing === false[39m[0m
    * [0m[33mreadable.readableFlowing === true[39m[0m

[0mWhen [33mreadable.readableFlowing[39m is [33mnull[39m, no mechanism for consuming the[0m
[0mstream's data is provided. Therefore, the stream will not generate data.[0m
[0mWhile in this state, attaching a listener for the [33m'data'[39m event, calling the[0m
[0m[33mreadable.pipe()[39m method, or calling the [33mreadable.resume()[39m method will switch[0m
[0m[33mreadable.readableFlowing[39m to [33mtrue[39m, causing the [33mReadable[39m to begin actively[0m
[0memitting events as data is generated.[0m

[0mCalling [33mreadable.pause()[39m, [33mreadable.unpipe()[39m, or receiving backpressure[0m
[0mwill cause the [33mreadable.readableFlowing[39m to be set as [33mfalse[39m,[0m
[0mtemporarily halting the flowing of events but [3mnot[23m halting the generation of[0m
[0mdata. While in this state, attaching a listener for the [33m'data'[39m event[0m
[0mwill not switch [33mreadable.readableFlowing[39m to [33mtrue[39m.[0m

    [94mconst[39m [33m{[39m [37mPassThrough[39m[32m,[39m [37mWritable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mpass[39m [93m=[39m [31mnew[39m [37mPassThrough[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mwritable[39m [93m=[39m [31mnew[39m [37mWritable[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mpass[39m[32m.[39m[37mpipe[39m[90m([39m[37mwritable[39m[90m)[39m[90m;[39m
    [37mpass[39m[32m.[39m[37munpipe[39m[90m([39m[37mwritable[39m[90m)[39m[90m;[39m
    [90m// readableFlowing is now false.[39m
    
    [37mpass[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mchunk[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m [33m}[39m[90m)[39m[90m;[39m
    [37mpass[39m[32m.[39m[37mwrite[39m[90m([39m[92m'ok'[39m[90m)[39m[90m;[39m  [90m// Will not emit 'data'.[39m
    [37mpass[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m     [90m// Must be called to make stream emit 'data'.[39m

[0mWhile [33mreadable.readableFlowing[39m is [33mfalse[39m, data may be accumulating[0m
[0mwithin the stream's internal buffer.[0m

[32m[1m#### Choose One API Style[22m[39m

[0mThe [33mReadable[39m stream API evolved across multiple Node.js versions and provides[0m
[0mmultiple methods of consuming stream data. In general, developers should choose[0m
[0m[3mone[23m of the methods of consuming data and [3mshould never[23m use multiple methods[0m
[0mto consume data from a single stream. Specifically, using a combination[0m
[0mof [33mon('data')[39m, [33mon('readable')[39m, [33mpipe()[39m, or async iterators could[0m
[0mlead to unintuitive behavior.[0m

[0mUse of the [33mreadable.pipe()[39m method is recommended for most users as it has been[0m
[0mimplemented to provide the easiest way of consuming stream data. Developers that[0m
[0mrequire more fine-grained control over the transfer and generation of data can[0m
[0muse the [[33mEventEmitter[39m][] and [33mreadable.on('readable')[39m/[33mreadable.read()[39m[0m
[0mor the [33mreadable.pause()[39m/[33mreadable.resume()[39m APIs.[0m

[32m[1m#### Class: [33mstream.Readable[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=class-->[39m
[90m[39m
[90m[39m[32m[1m##### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18438[39m
[90m    description: Add `emitClose` option to specify if `'close'` is emitted on[39m
[90m                 destroy.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'close'[39m event is emitted when the stream and any of its underlying[0m
[0mresources (a file descriptor, for example) have been closed. The event indicates[0m
[0mthat no more events will be emitted, and no further computation will occur.[0m

[0mA [[33mReadable[39m][] stream will always emit the [33m'close'[39m event if it is[0m
[0mcreated with the [33memitClose[39m option.[0m

[32m[1m##### Event: [33m'data'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mchunk[39m {Buffer|string|any} The chunk of data. For streams that are not[0m
      [0moperating in object mode, the chunk will be either a string or [33mBuffer[39m.[0m
      [0mFor streams that are in object mode, the chunk can be any JavaScript value[0m
      [0mother than [33mnull[39m.[0m

[0mThe [33m'data'[39m event is emitted whenever the stream is relinquishing ownership of[0m
[0ma chunk of data to a consumer. This may occur whenever the stream is switched[0m
[0min flowing mode by calling [33mreadable.pipe()[39m, [33mreadable.resume()[39m, or by[0m
[0mattaching a listener callback to the [33m'data'[39m event. The [33m'data'[39m event will[0m
[0malso be emitted whenever the [33mreadable.read()[39m method is called and a chunk of[0m
[0mdata is available to be returned.[0m

[0mAttaching a [33m'data'[39m event listener to a stream that has not been explicitly[0m
[0mpaused will switch the stream into flowing mode. Data will then be passed as[0m
[0msoon as it is available.[0m

[0mThe listener callback will be passed the chunk of data as a string if a default[0m
[0mencoding has been specified for the stream using the[0m
[0m[33mreadable.setEncoding()[39m method; otherwise the data will be passed as a[0m
[0m[33mBuffer[39m.[0m

    [94mconst[39m [37mreadable[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received ${[37mchunk[39m[32m.[39m[37mlength[39m} bytes of data.`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m##### Event: [33m'end'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'end'[39m event is emitted when there is no more data to be consumed from[0m
[0mthe stream.[0m

[0mThe [33m'end'[39m event [1mwill not be emitted[22m unless the data is completely[0m
[0mconsumed. This can be accomplished by switching the stream into flowing mode,[0m
[0mor by calling [[33mstream.read()[39m][stream-read] repeatedly until all data has been[0m
[0mconsumed.[0m

    [94mconst[39m [37mreadable[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received ${[37mchunk[39m[32m.[39m[37mlength[39m} bytes of data.`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'There will be no more data.'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m##### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Error}[0m

[0mThe [33m'error'[39m event may be emitted by a [33mReadable[39m implementation at any time.[0m
[0mTypically, this may occur if the underlying stream is unable to generate data[0m
[0mdue to an underlying internal failure, or when a stream implementation attempts[0m
[0mto push an invalid chunk of data.[0m

[0mThe listener callback will be passed a single [33mError[39m object.[0m

[32m[1m##### Event: [33m'pause'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'pause'[39m event is emitted when [[33mstream.pause()[39m][stream-pause] is called[0m
[0mand [33mreadableFlowing[39m is not [33mfalse[39m.[0m

[32m[1m##### Event: [33m'readable'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17979[39m
[90m    description: The `'readable'` is always emitted in the next tick after[39m
[90m                 `.push()` is called.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18994[39m
[90m    description: Using `'readable'` requires calling `.read()`.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'readable'[39m event is emitted when there is data available to be read from[0m
[0mthe stream. In some cases, attaching a listener for the [33m'readable'[39m event will[0m
[0mcause some amount of data to be read into an internal buffer.[0m

    [94mconst[39m [37mreadable[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37mon[39m[90m([39m[92m'readable'[39m[32m,[39m [94mfunction[39m[90m([39m[90m)[39m [33m{[39m
      [90m// There is some data to read now.[39m
      [94mlet[39m [37mdata[39m[90m;[39m
    
      [94mwhile[39m [90m([39m[37mdata[39m [93m=[39m [91mthis[39m[32m.[39m[37mread[39m[90m([39m[90m)[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdata[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33m'readable'[39m event will also be emitted once the end of the stream data[0m
[0mhas been reached but before the [33m'end'[39m event is emitted.[0m

[0mEffectively, the [33m'readable'[39m event indicates that the stream has new[0m
[0minformation: either new data is available or the end of the stream has been[0m
[0mreached. In the former case, [[33mstream.read()[39m][stream-read] will return the[0m
[0mavailable data. In the latter case, [[33mstream.read()[39m][stream-read] will return[0m
[0m[33mnull[39m. For instance, in the following example, [33mfoo.txt[39m is an empty file:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mrr[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'foo.txt'[39m[90m)[39m[90m;[39m
    [37mrr[39m[32m.[39m[37mon[39m[90m([39m[92m'readable'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`readable: ${[37mrr[39m[32m.[39m[37mread[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mrr[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'end'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe output of running this script is:[0m

    [33m$ node test.js[39m
    [33mreadable: null[39m
    [33mend[39m

[0mIn general, the [33mreadable.pipe()[39m and [33m'data'[39m event mechanisms are easier to[0m
[0munderstand than the [33m'readable'[39m event. However, handling [33m'readable'[39m might[0m
[0mresult in increased throughput.[0m

[0mIf both [33m'readable'[39m and [[33m'data'[39m][] are used at the same time, [33m'readable'[39m[0m
[0mtakes precedence in controlling the flow, i.e. [33m'data'[39m will be emitted[0m
[0monly when [[33mstream.read()[39m][stream-read] is called. The[0m
[0m[33mreadableFlowing[39m property would become [33mfalse[39m.[0m
[0mIf there are [33m'data'[39m listeners when [33m'readable'[39m is removed, the stream[0m
[0mwill start flowing, i.e. [33m'data'[39m events will be emitted without calling[0m
[0m[33m.resume()[39m.[0m

[32m[1m##### Event: [33m'resume'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'resume'[39m event is emitted when [[33mstream.resume()[39m][stream-resume] is[0m
[0mcalled and [33mreadableFlowing[39m is not [33mtrue[39m.[0m

[32m[1m##### [33mreadable.destroy([error])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merror[39m {Error} Error which will be passed as payload in [33m'error'[39m event[0m
    * [0mReturns: {this}[0m

[0mDestroy the stream. Optionally emit an [33m'error'[39m event, and emit a [33m'close'[39m[0m
[0mevent (unless [33memitClose[39m is set to [33mfalse[39m). After this call, the readable[0m
[0mstream will release any internal resources and subsequent calls to [33mpush()[39m[0m
[0mwill be ignored.[0m

[0mOnce [33mdestroy()[39m has been called any further calls will be a noop and no[0m
[0mfurther errors except from [33m_destroy[39m may be emitted as [33m'error'[39m.[0m

[0mImplementors should not override this method, but instead implement[0m
[0m[[33mreadable._destroy()[39m][readable-_destroy].[0m

[32m[1m##### [33mreadable.destroyed[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m after [[33mreadable.destroy()[39m][readable-destroy] has been called.[0m

[32m[1m##### [33mreadable.isPaused()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.14[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mThe [33mreadable.isPaused()[39m method returns the current operating state of the[0m
[0m[33mReadable[39m. This is used primarily by the mechanism that underlies the[0m
[0m[33mreadable.pipe()[39m method. In most typical cases, there will be no reason to[0m
[0muse this method directly.[0m

    [94mconst[39m [37mreadable[39m [93m=[39m [31mnew[39m [37mstream[39m[32m.[39m[37mReadable[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mreadable[39m[32m.[39m[37misPaused[39m[90m([39m[90m)[39m[90m;[39m [90m// === false[39m
    [37mreadable[39m[32m.[39m[37mpause[39m[90m([39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37misPaused[39m[90m([39m[90m)[39m[90m;[39m [90m// === true[39m
    [37mreadable[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37misPaused[39m[90m([39m[90m)[39m[90m;[39m [90m// === false[39m

[32m[1m##### [33mreadable.pause()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {this}[0m

[0mThe [33mreadable.pause()[39m method will cause a stream in flowing mode to stop[0m
[0memitting [[33m'data'[39m][] events, switching out of flowing mode. Any data that[0m
[0mbecomes available will remain in the internal buffer.[0m

    [94mconst[39m [37mreadable[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received ${[37mchunk[39m[32m.[39m[37mlength[39m} bytes of data.`[90m)[39m[90m;[39m
      [37mreadable[39m[32m.[39m[37mpause[39m[90m([39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'There will be no additional data for 1 second.'[39m[90m)[39m[90m;[39m
      [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Now data will start flowing again.'[39m[90m)[39m[90m;[39m
        [37mreadable[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mreadable.pause()[39m method has no effect if there is a [33m'readable'[39m[0m
[0mevent listener.[0m

[32m[1m##### [33mreadable.pipe(destination[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdestination[39m {stream.Writable} The destination for writing data[0m
    * [0m[33moptions[39m {Object} Pipe options
        * [0m[0m[33mend[39m {boolean} End the writer when the reader ends. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
    * [0mReturns: {stream.Writable} The [3mdestination[23m, allowing for a chain of pipes if[0m
      [0mit is a [[33mDuplex[39m][] or a [[33mTransform[39m][] stream[0m

[0mThe [33mreadable.pipe()[39m method attaches a [[33mWritable[39m][] stream to the [33mreadable[39m,[0m
[0mcausing it to switch automatically into flowing mode and push all of its data[0m
[0mto the attached [[33mWritable[39m][]. The flow of data will be automatically managed[0m
[0mso that the destination [33mWritable[39m stream is not overwhelmed by a faster[0m
[0m[33mReadable[39m stream.[0m

[0mThe following example pipes all of the data from the [33mreadable[39m into a file[0m
[0mnamed [33mfile.txt[39m:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mreadable[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mwritable[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'file.txt'[39m[90m)[39m[90m;[39m
    [90m// All the data from readable goes into 'file.txt'.[39m
    [37mreadable[39m[32m.[39m[37mpipe[39m[90m([39m[37mwritable[39m[90m)[39m[90m;[39m

[0mIt is possible to attach multiple [33mWritable[39m streams to a single [33mReadable[39m[0m
[0mstream.[0m

[0mThe [33mreadable.pipe()[39m method returns a reference to the [3mdestination[23m stream[0m
[0mmaking it possible to set up chains of piped streams:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mr[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'file.txt'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mz[39m [93m=[39m [37mzlib[39m[32m.[39m[37mcreateGzip[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mw[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'file.txt.gz'[39m[90m)[39m[90m;[39m
    [37mr[39m[32m.[39m[37mpipe[39m[90m([39m[37mz[39m[90m)[39m[32m.[39m[37mpipe[39m[90m([39m[37mw[39m[90m)[39m[90m;[39m

[0mBy default, [[33mstream.end()[39m][stream-end] is called on the destination [33mWritable[39m[0m
[0mstream when the source [33mReadable[39m stream emits [[33m'end'[39m][], so that the[0m
[0mdestination is no longer writable. To disable this default behavior, the [33mend[39m[0m
[0moption can be passed as [33mfalse[39m, causing the destination stream to remain open:[0m

    [37mreader[39m[32m.[39m[37mpipe[39m[90m([39m[37mwriter[39m[32m,[39m [33m{[39m [37mend[39m[93m:[39m [91mfalse[39m [33m}[39m[90m)[39m[90m;[39m
    [37mreader[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mwriter[39m[32m.[39m[37mend[39m[90m([39m[92m'Goodbye\n'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOne important caveat is that if the [33mReadable[39m stream emits an error during[0m
[0mprocessing, the [33mWritable[39m destination [3mis not closed[23m automatically. If an[0m
[0merror occurs, it will be necessary to [3mmanually[23m close each stream in order[0m
[0mto prevent memory leaks.[0m

[0mThe [[33mprocess.stderr[39m][] and [[33mprocess.stdout[39m][] [33mWritable[39m streams are never[0m
[0mclosed until the Node.js process exits, regardless of the specified options.[0m

[32m[1m##### [33mreadable.read([size])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msize[39m {number} Optional argument to specify how much data to read.[0m
    * [0mReturns: {string|Buffer|null|any}[0m

[0mThe [33mreadable.read()[39m method pulls some data out of the internal buffer and[0m
[0mreturns it. If no data available to be read, [33mnull[39m is returned. By default,[0m
[0mthe data will be returned as a [33mBuffer[39m object unless an encoding has been[0m
[0mspecified using the [33mreadable.setEncoding()[39m method or the stream is operating[0m
[0min object mode.[0m

[0mThe optional [33msize[39m argument specifies a specific number of bytes to read. If[0m
[0m[33msize[39m bytes are not available to be read, [33mnull[39m will be returned [3munless[23m[0m
[0mthe stream has ended, in which case all of the data remaining in the internal[0m
[0mbuffer will be returned.[0m

[0mIf the [33msize[39m argument is not specified, all of the data contained in the[0m
[0minternal buffer will be returned.[0m

[0mThe [33msize[39m argument must be less than or equal to 1 GB.[0m

[0mThe [33mreadable.read()[39m method should only be called on [33mReadable[39m streams[0m
[0moperating in paused mode. In flowing mode, [33mreadable.read()[39m is called[0m
[0mautomatically until the internal buffer is fully drained.[0m

    [94mconst[39m [37mreadable[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37mon[39m[90m([39m[92m'readable'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mlet[39m [37mchunk[39m[90m;[39m
      [94mwhile[39m [90m([39m[90mnull[39m [93m!==[39m [90m([39m[37mchunk[39m [93m=[39m [37mreadable[39m[32m.[39m[37mread[39m[90m([39m[90m)[39m[90m)[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received ${[37mchunk[39m[32m.[39m[37mlength[39m} bytes of data.`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mwhile[39m loop is necessary when processing data with[0m
[0m[33mreadable.read()[39m. Only after [33mreadable.read()[39m returns [33mnull[39m,[0m
[0m[[33m'readable'[39m][] will be emitted.[0m

[0mA [33mReadable[39m stream in object mode will always return a single item from[0m
[0ma call to [[33mreadable.read(size)[39m][stream-read], regardless of the value of the[0m
[0m[33msize[39m argument.[0m

[0mIf the [33mreadable.read()[39m method returns a chunk of data, a [33m'data'[39m event will[0m
[0malso be emitted.[0m

[0mCalling [[33mstream.read([size])[39m][stream-read] after the [[33m'end'[39m][] event has[0m
[0mbeen emitted will return [33mnull[39m. No runtime error will be raised.[0m

[32m[1m##### [33mreadable.readable[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m if it is safe to call [[33mreadable.read()[39m][stream-read], which means[0m
[0mthe stream has not been destroyed or emitted [33m'error'[39m or [33m'end'[39m.[0m

[32m[1m##### [33mreadable.readableEncoding[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{null|string}[0m

[0mGetter for the property [33mencoding[39m of a given [33mReadable[39m stream. The [33mencoding[39m[0m
[0mproperty can be set using the [[33mreadable.setEncoding()[39m][] method.[0m

[32m[1m##### [33mreadable.readableEnded[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mBecomes [33mtrue[39m when [[33m'end'[39m][] event is emitted.[0m

[32m[1m##### [33mreadable.readableFlowing[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThis property reflects the current state of a [33mReadable[39m stream as described[0m
[0min the [Stream Three States][] section.[0m

[32m[1m##### [33mreadable.readableHighWaterMark[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mReturns the value of [33mhighWaterMark[39m passed when constructing this[0m
[0m[33mReadable[39m.[0m

[32m[1m##### [33mreadable.readableLength[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThis property contains the number of bytes (or objects) in the queue[0m
[0mready to be read. The value provides introspection data regarding[0m
[0mthe status of the [33mhighWaterMark[39m.[0m

[32m[1m##### [33mreadable.readableObjectMode[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mGetter for the property [33mobjectMode[39m of a given [33mReadable[39m stream.[0m

[32m[1m##### [33mreadable.resume()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18994[39m
[90m    description: The `resume()` has no effect if there is a `'readable'` event[39m
[90m                 listening.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {this}[0m

[0mThe [33mreadable.resume()[39m method causes an explicitly paused [33mReadable[39m stream to[0m
[0mresume emitting [[33m'data'[39m][] events, switching the stream into flowing mode.[0m

[0mThe [33mreadable.resume()[39m method can be used to fully consume the data from a[0m
[0mstream without actually processing any of that data:[0m

    [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m
      [32m.[39m[37mresume[39m[90m([39m[90m)[39m
      [32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Reached the end, but did not read anything.'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mreadable.resume()[39m method has no effect if there is a [33m'readable'[39m[0m
[0mevent listener.[0m

[32m[1m##### [33mreadable.setEncoding(encoding)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mencoding[39m {string} The encoding to use.[0m
    * [0mReturns: {this}[0m

[0mThe [33mreadable.setEncoding()[39m method sets the character encoding for[0m
[0mdata read from the [33mReadable[39m stream.[0m

[0mBy default, no encoding is assigned and stream data will be returned as[0m
[0m[33mBuffer[39m objects. Setting an encoding causes the stream data[0m
[0mto be returned as strings of the specified encoding rather than as [33mBuffer[39m[0m
[0mobjects. For instance, calling [33mreadable.setEncoding('utf8')[39m will cause the[0m
[0moutput data to be interpreted as UTF-8 data, and passed as strings. Calling[0m
[0m[33mreadable.setEncoding('hex')[39m will cause the data to be encoded in hexadecimal[0m
[0mstring format.[0m

[0mThe [33mReadable[39m stream will properly handle multi-byte characters delivered[0m
[0mthrough the stream that would otherwise become improperly decoded if simply[0m
[0mpulled from the stream as [33mBuffer[39m objects.[0m

    [94mconst[39m [37mreadable[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
    [37mreadable[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
      [37massert[39m[32m.[39m[37mequal[39m[90m([39m[94mtypeof[39m [37mchunk[39m[32m,[39m [92m'string'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Got %d characters of string data:'[39m[32m,[39m [37mchunk[39m[32m.[39m[37mlength[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m##### [33mreadable.unpipe([destination])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdestination[39m {stream.Writable} Optional specific stream to unpipe[0m
    * [0mReturns: {this}[0m

[0mThe [33mreadable.unpipe()[39m method detaches a [33mWritable[39m stream previously attached[0m
[0musing the [[33mstream.pipe()[39m][] method.[0m

[0mIf the [33mdestination[39m is not specified, then [3mall[23m pipes are detached.[0m

[0mIf the [33mdestination[39m is specified, but no pipe is set up for it, then[0m
[0mthe method does nothing.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mreadable[39m [93m=[39m [37mgetReadableStreamSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mwritable[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'file.txt'[39m[90m)[39m[90m;[39m
    [90m// All the data from readable goes into 'file.txt',[39m
    [90m// but only for the first second.[39m
    [37mreadable[39m[32m.[39m[37mpipe[39m[90m([39m[37mwritable[39m[90m)[39m[90m;[39m
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Stop writing to file.txt.'[39m[90m)[39m[90m;[39m
      [37mreadable[39m[32m.[39m[37munpipe[39m[90m([39m[37mwritable[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Manually close the file stream.'[39m[90m)[39m[90m;[39m
      [37mwritable[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m

[32m[1m##### [33mreadable.unshift(chunk[, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.11[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11608[39m
[90m    description: The `chunk` argument can now be a `Uint8Array` instance.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mchunk[39m {Buffer|Uint8Array|string|null|any} Chunk of data to unshift onto the[0m
      [0mread queue. For streams not operating in object mode, [33mchunk[39m must be a[0m
      [0mstring, [33mBuffer[39m, [33mUint8Array[39m or [33mnull[39m. For object mode streams, [33mchunk[39m[0m
      [0mmay be any JavaScript value.[0m
    * [0m[33mencoding[39m {string} Encoding of string chunks. Must be a valid[0m
      [0m[33mBuffer[39m encoding, such as [33m'utf8'[39m or [33m'ascii'[39m.[0m

[0mPassing [33mchunk[39m as [33mnull[39m signals the end of the stream (EOF) and behaves the[0m
[0msame as [33mreadable.push(null)[39m, after which no more data can be written. The EOF[0m
[0msignal is put at the end of the buffer and any buffered data will still be[0m
[0mflushed.[0m

[0mThe [33mreadable.unshift()[39m method pushes a chunk of data back into the internal[0m
[0mbuffer. This is useful in certain situations where a stream is being consumed by[0m
[0mcode that needs to "un-consume" some amount of data that it has optimistically[0m
[0mpulled out of the source, so that the data can be passed on to some other party.[0m

[0mThe [33mstream.unshift(chunk)[39m method cannot be called after the [[33m'end'[39m][] event[0m
[0mhas been emitted or a runtime error will be thrown.[0m

[0mDevelopers using [33mstream.unshift()[39m often should consider switching to[0m
[0muse of a [[33mTransform[39m][] stream instead. See the [API for Stream Implementers][][0m
[0msection for more information.[0m

    [90m// Pull off a header delimited by \n\n.[39m
    [90m// Use unshift() if we get too much.[39m
    [90m// Call the callback with (error, header, stream).[39m
    [94mconst[39m [33m{[39m [37mStringDecoder[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/string_decoder'[39m[90m)[39m[90m;[39m
    [94mfunction[39m [37mparseHeader[39m[90m([39m[37mstream[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'readable'[39m[32m,[39m [37monReadable[39m[90m)[39m[90m;[39m
      [94mconst[39m [37mdecoder[39m [93m=[39m [31mnew[39m [37mStringDecoder[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
      [94mlet[39m [37mheader[39m [93m=[39m [92m''[39m[90m;[39m
      [94mfunction[39m [37monReadable[39m[90m([39m[90m)[39m [33m{[39m
        [94mlet[39m [37mchunk[39m[90m;[39m
        [94mwhile[39m [90m([39m[90mnull[39m [93m!==[39m [90m([39m[37mchunk[39m [93m=[39m [37mstream[39m[32m.[39m[37mread[39m[90m([39m[90m)[39m[90m)[39m[90m)[39m [33m{[39m
          [94mconst[39m [37mstr[39m [93m=[39m [37mdecoder[39m[32m.[39m[37mwrite[39m[90m([39m[37mchunk[39m[90m)[39m[90m;[39m
          [94mif[39m [90m([39m[37mstr[39m[32m.[39m[37mmatch[39m[90m([39m/\n\n/[90m)[39m[90m)[39m [33m{[39m
            [90m// Found the header boundary.[39m
            [94mconst[39m [37msplit[39m [93m=[39m [37mstr[39m[32m.[39m[37msplit[39m[90m([39m/\n\n/[90m)[39m[90m;[39m
            [37mheader[39m [93m+=[39m [37msplit[39m[32m.[39m[37mshift[39m[90m([39m[90m)[39m[90m;[39m
            [94mconst[39m [37mremaining[39m [93m=[39m [37msplit[39m[32m.[39m[37mjoin[39m[90m([39m[92m'\n\n'[39m[90m)[39m[90m;[39m
            [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37mremaining[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m;[39m
            [37mstream[39m[32m.[39m[37mremoveListener[39m[90m([39m[92m'error'[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m
            [90m// Remove the 'readable' listener before unshifting.[39m
            [37mstream[39m[32m.[39m[37mremoveListener[39m[90m([39m[92m'readable'[39m[32m,[39m [37monReadable[39m[90m)[39m[90m;[39m
            [94mif[39m [90m([39m[37mbuf[39m[32m.[39m[37mlength[39m[90m)[39m
              [37mstream[39m[32m.[39m[37munshift[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
            [90m// Now the body of the message can be read from the stream.[39m
            [37mcallback[39m[90m([39m[90mnull[39m[32m,[39m [37mheader[39m[32m,[39m [37mstream[39m[90m)[39m[90m;[39m
          [33m}[39m [94melse[39m [33m{[39m
            [90m// Still reading the header.[39m
            [37mheader[39m [93m+=[39m [37mstr[39m[90m;[39m
          [33m}[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m

[0mUnlike [[33mstream.push(chunk)[39m][stream-push], [33mstream.unshift(chunk)[39m will not[0m
[0mend the reading process by resetting the internal reading state of the stream.[0m
[0mThis can cause unexpected results if [33mreadable.unshift()[39m is called during a[0m
[0mread (i.e. from within a [[33mstream._read()[39m][stream-_read] implementation on a[0m
[0mcustom stream). Following the call to [33mreadable.unshift()[39m with an immediate[0m
[0m[[33mstream.push('')[39m][stream-push] will reset the reading state appropriately,[0m
[0mhowever it is best to simply avoid calling [33mreadable.unshift()[39m while in the[0m
[0mprocess of performing a read.[0m

[32m[1m##### [33mreadable.wrap(stream)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstream[39m {Stream} An "old style" readable stream[0m
    * [0mReturns: {this}[0m

[0mPrior to Node.js 0.10, streams did not implement the entire [33mstream[39m module API[0m
[0mas it is currently defined. (See [Compatibility][] for more information.)[0m

[0mWhen using an older Node.js library that emits [[33m'data'[39m][] events and has a[0m
[0m[[33mstream.pause()[39m][stream-pause] method that is advisory only, the[0m
[0m[33mreadable.wrap()[39m method can be used to create a [[33mReadable[39m][] stream that uses[0m
[0mthe old stream as its data source.[0m

[0mIt will rarely be necessary to use [33mreadable.wrap()[39m but the method has been[0m
[0mprovided as a convenience for interacting with older Node.js applications and[0m
[0mlibraries.[0m

    [94mconst[39m [33m{[39m [37mOldReader[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./old-api-module.js'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mReadable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37moreader[39m [93m=[39m [31mnew[39m [37mOldReader[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmyReader[39m [93m=[39m [31mnew[39m [37mReadable[39m[90m([39m[90m)[39m[32m.[39m[37mwrap[39m[90m([39m[37moreader[39m[90m)[39m[90m;[39m
    
    [37mmyReader[39m[32m.[39m[37mon[39m[90m([39m[92m'readable'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mmyReader[39m[32m.[39m[37mread[39m[90m([39m[90m)[39m[90m;[39m [90m// etc.[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m##### [33mreadable[Symbol.asyncIterator]()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: v11.14.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26989[39m
[90m    description: Symbol.asyncIterator support is no longer experimental.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {AsyncIterator} to fully consume the stream.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mprint[39m[90m([39m[37mreadable[39m[90m)[39m [33m{[39m
      [37mreadable[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
      [94mlet[39m [37mdata[39m [93m=[39m [92m''[39m[90m;[39m
      [94mfor[39m [37mawait[39m [90m([39m[94mconst[39m [37mchunk[39m [37mof[39m [37mreadable[39m[90m)[39m [33m{[39m
        [37mdata[39m [93m+=[39m [37mchunk[39m[90m;[39m
      [33m}[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdata[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mprint[39m[90m([39m[37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'file'[39m[90m)[39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m

[0mIf the loop terminates with a [33mbreak[39m or a [33mthrow[39m, the stream will be[0m
[0mdestroyed. In other terms, iterating over a stream will consume the stream[0m
[0mfully. The stream will be read in chunks of size equal to the [33mhighWaterMark[39m[0m
[0moption. In the code example above, data will be in a single chunk if the file[0m
[0mhas less then 64kb of data because no [33mhighWaterMark[39m option is provided to[0m
[0m[[33mfs.createReadStream()[39m][].[0m

[32m[1m### Duplex and Transform Streams[22m[39m

[32m[1m#### Class: [33mstream.Duplex[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90mchanges:[39m
[90m  - version: v6.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8834[39m
[90m    description: Instances of `Duplex` now return `true` when[39m
[90m                 checking `instanceof stream.Writable`.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=class-->[39m
[90m[39m
[90m[39m[0mDuplex streams are streams that implement both the [[33mReadable[39m][] and[0m
[0m[[33mWritable[39m][] interfaces.[0m

[0mExamples of [33mDuplex[39m streams include:[0m

    * [0m[TCP sockets][][0m
    * [0m[zlib streams][zlib][0m
    * [0m[crypto streams][crypto][0m

[32m[1m#### Class: [33mstream.Transform[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=class-->[39m
[90m[39m
[90m[39m[0mTransform streams are [[33mDuplex[39m][] streams where the output is in some way[0m
[0mrelated to the input. Like all [[33mDuplex[39m][] streams, [33mTransform[39m streams[0m
[0mimplement both the [[33mReadable[39m][] and [[33mWritable[39m][] interfaces.[0m

[0mExamples of [33mTransform[39m streams include:[0m

    * [0m[zlib streams][zlib][0m
    * [0m[crypto streams][crypto][0m

[32m[1m##### [33mtransform.destroy([error])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merror[39m {Error}[0m

[0mDestroy the stream, and optionally emit an [33m'error'[39m event. After this call, the[0m
[0mtransform stream would release any internal resources.[0m
[0mImplementors should not override this method, but instead implement[0m
[0m[[33mreadable._destroy()[39m][readable-_destroy].[0m
[0mThe default implementation of [33m_destroy()[39m for [33mTransform[39m also emit [33m'close'[39m[0m
[0munless [33memitClose[39m is set in false.[0m

[0mOnce [33mdestroy()[39m has been called any further calls will be a noop and no[0m
[0mfurther errors except from [33m_destroy[39m may be emitted as [33m'error'[39m.[0m

[32m[1m### [33mstream.finished(stream[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstream[39m {Stream} A readable and/or writable stream.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33merror[39m {boolean} If set to [33mfalse[39m, then a call to [33memit('error', err)[39m is[0m[0m[0m
      [0m      [0m[0mnot treated as finished. [1mDefault[22m: [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mreadable[39m {boolean} When set to [33mfalse[39m, the callback will be called when[0m[0m[0m
      [0m      [0m[0mthe stream ends even though the stream might still be readable.[0m[0m[0m
      [0m      [0m[0m[1mDefault[22m: [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwritable[39m {boolean} When set to [33mfalse[39m, the callback will be called when[0m[0m[0m
      [0m      [0m[0mthe stream ends even though the stream might still be writable.[0m[0m[0m
      [0m      [0m[0m[1mDefault[22m: [33mtrue[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function} A callback function that takes an optional error[0m
      [0margument.[0m
    * [0mReturns: {Function} A cleanup function which removes all registered[0m
      [0mlisteners.[0m

[0mA function to get notified when a stream is no longer readable, writable[0m
[0mor has experienced an error or a premature close event.[0m

    [94mconst[39m [33m{[39m [37mfinished[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mrs[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'archive.tar'[39m[90m)[39m[90m;[39m
    
    [37mfinished[39m[90m([39m[37mrs[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'Stream failed.'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Stream is done reading.'[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mrs[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m [90m// Drain the stream.[39m

[0mEspecially useful in error handling scenarios where a stream is destroyed[0m
[0mprematurely (like an aborted HTTP request), and will not emit [33m'end'[39m[0m
[0mor [33m'finish'[39m.[0m

[0mThe [33mfinished[39m API is promisify-able as well;[0m

    [94mconst[39m [37mfinished[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mstream[39m[32m.[39m[37mfinished[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mrs[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'archive.tar'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mrun[39m[90m([39m[90m)[39m [33m{[39m
      [37mawait[39m [37mfinished[39m[90m([39m[37mrs[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Stream is done reading.'[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mrun[39m[90m([39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m
    [37mrs[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m [90m// Drain the stream.[39m

[0m[33mstream.finished()[39m leaves dangling event listeners (in particular[0m
[0m[33m'error'[39m, [33m'end'[39m, [33m'finish'[39m and [33m'close'[39m) after [33mcallback[39m has been[0m
[0minvoked. The reason for this is so that unexpected [33m'error'[39m events (due to[0m
[0mincorrect stream implementations) do not cause unexpected crashes.[0m
[0mIf this is unwanted behavior then the returned cleanup function needs to be[0m
[0minvoked in the callback:[0m

    [94mconst[39m [37mcleanup[39m [93m=[39m [37mfinished[39m[90m([39m[37mrs[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mcleanup[39m[90m([39m[90m)[39m[90m;[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mstream.pipeline(source[, ...transforms], destination, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: v13.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31223[39m
[90m    description: Add support for async generators.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msource[39m {Stream|Iterable|AsyncIterable|Function}
        * [0m[0mReturns: {Iterable|AsyncIterable}[0m[0m[0m
    * [0m[33m...transforms[39m {Stream|Function}
        * [0m[0m[33msource[39m {AsyncIterable}[0m[0m[0m
      [0m
        * [0m[0mReturns: {AsyncIterable}[0m[0m[0m
    * [0m[33mdestination[39m {Stream|Function}
        * [0m[0m[33msource[39m {AsyncIterable}[0m[0m[0m
      [0m
        * [0m[0mReturns: {AsyncIterable|Promise}[0m[0m[0m
    * [0m[33mcallback[39m {Function} Called when the pipeline is fully done.
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mval[39m Resolved value of [33mPromise[39m returned by [33mdestination[39m.[0m[0m[0m
    * [0mReturns: {Stream}[0m

[0mA module method to pipe between streams and generators forwarding errors and[0m
[0mproperly cleaning up and provide a callback when the pipeline is complete.[0m

    [94mconst[39m [33m{[39m [37mpipeline[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mzlib[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/zlib'[39m[90m)[39m[90m;[39m
    
    [90m// Use the pipeline API to easily pipe a series of streams[39m
    [90m// together and get notified when the pipeline is fully done.[39m
    
    [90m// A pipeline to gzip a potentially huge tar file efficiently:[39m
    
    [37mpipeline[39m[90m([39m
      [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'archive.tar'[39m[90m)[39m[32m,[39m
      [37mzlib[39m[32m.[39m[37mcreateGzip[39m[90m([39m[90m)[39m[32m,[39m
      [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'archive.tar.gz'[39m[90m)[39m[32m,[39m
      [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'Pipeline failed.'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
        [33m}[39m [94melse[39m [33m{[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Pipeline succeeded.'[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
    [90m)[39m[90m;[39m

[0mThe [33mpipeline[39m API is promisify-able as well:[0m

    [94mconst[39m [37mpipeline[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mstream[39m[32m.[39m[37mpipeline[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mrun[39m[90m([39m[90m)[39m [33m{[39m
      [37mawait[39m [37mpipeline[39m[90m([39m
        [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'archive.tar'[39m[90m)[39m[32m,[39m
        [37mzlib[39m[32m.[39m[37mcreateGzip[39m[90m([39m[90m)[39m[32m,[39m
        [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'archive.tar.gz'[39m[90m)[39m
      [90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Pipeline succeeded.'[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mrun[39m[90m([39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m

[0mThe [33mpipeline[39m API also supports async generators:[0m

    [94mconst[39m [37mpipeline[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mstream[39m[32m.[39m[37mpipeline[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[32m.[39m[37mpromises[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mrun[39m[90m([39m[90m)[39m [33m{[39m
      [37mawait[39m [37mpipeline[39m[90m([39m
        [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'lowercase.txt'[39m[90m)[39m[32m,[39m
        [37masync[39m [94mfunction[39m[93m*[39m [90m([39m[37msource[39m[90m)[39m [33m{[39m
          [94mfor[39m [37mawait[39m [90m([39m[94mconst[39m [37mchunk[39m [37mof[39m [37msource[39m[90m)[39m [33m{[39m
            [94myield[39m [37mString[39m[90m([39m[37mchunk[39m[90m)[39m[32m.[39m[37mtoUpperCase[39m[90m([39m[90m)[39m[90m;[39m
          [33m}[39m
        [33m}[39m[32m,[39m
        [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'uppercase.txt'[39m[90m)[39m
      [90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Pipeline succeeded.'[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mrun[39m[90m([39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m

[0m[33mstream.pipeline()[39m will call [33mstream.destroy(err)[39m on all streams except:[0m

    * [0m[33mReadable[39m streams which have emitted [33m'end'[39m or [33m'close'[39m.[0m
    * [0m[33mWritable[39m streams which have emitted [33m'finish'[39m or [33m'close'[39m.[0m

[0m[33mstream.pipeline()[39m leaves dangling event listeners on the streams[0m
[0mafter the [33mcallback[39m has been invoked. In the case of reuse of streams after[0m
[0mfailure, this can cause event listener leaks and swallowed errors.[0m

[32m[1m### [33mstream.Readable.from(iterable, [options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v12.3.0[39m
[90m  - v10.17.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33miterable[39m {Iterable} Object implementing the [33mSymbol.asyncIterator[39m or[0m
      [0m[33mSymbol.iterator[39m iterable protocol.[0m
    * [0m[33moptions[39m {Object} Options provided to [33mnew stream.Readable([options])[39m.[0m
      [0mBy default, [33mReadable.from()[39m will set [33moptions.objectMode[39m to [33mtrue[39m, unless[0m
      [0mthis is explicitly opted out by setting [33moptions.objectMode[39m to [33mfalse[39m.[0m
    * [0mReturns: {stream.Readable}[0m

[0mA utility method for creating Readable Streams out of iterators.[0m

    [94mconst[39m [33m{[39m [37mReadable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [93m*[39m [37mgenerate[39m[90m([39m[90m)[39m [33m{[39m
      [94myield[39m [92m'hello'[39m[90m;[39m
      [94myield[39m [92m'streams'[39m[90m;[39m
    [33m}[39m
    
    [94mconst[39m [37mreadable[39m [93m=[39m [37mReadable[39m[32m.[39m[37mfrom[39m[90m([39m[37mgenerate[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    
    [37mreadable[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mchunk[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mCalling [33mReadable.from(string)[39m or [33mReadable.from(buffer)[39m will not have[0m
[0mthe strings or buffers be iterated to match the other streams semantics[0m
[0mfor performance reasons.[0m

[32m[1m## API for Stream Implementers[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mThe [33mstream[39m module API has been designed to make it possible to easily[0m
[0mimplement streams using JavaScript's prototypal inheritance model.[0m

[0mFirst, a stream developer would declare a new JavaScript class that extends one[0m
[0mof the four basic stream classes ([33mstream.Writable[39m, [33mstream.Readable[39m,[0m
[0m[33mstream.Duplex[39m, or [33mstream.Transform[39m), making sure they call the appropriate[0m
[0mparent class constructor:[0m

[90m<!-- eslint-disable no-useless-constructor -->[39m
[90m[39m    [94mconst[39m [33m{[39m [37mWritable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyWritable[39m [94mextends[39m [37mWritable[39m [33m{[39m
      [37mconstructor[39m[90m([39m[33m{[39m [37mhighWaterMark[39m[32m,[39m [93m...[39m[37moptions[39m [33m}[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[33m{[39m [37mhighWaterMark[39m [33m}[39m[90m)[39m[90m;[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m

[0mWhen extending streams, keep in mind what options the user[0m
[0mcan and should provide before forwarding these to the base constructor. For[0m
[0mexample, if the implementation makes assumptions in regard to the[0m
[0m[33mautoDestroy[39m and [33memitClose[39m options, do not allow the[0m
[0muser to override these. Be explicit about what[0m
[0moptions are forwarded instead of implicitly forwarding all options.[0m

[0mThe new stream class must then implement one or more specific methods, depending[0m
[0mon the type of stream being created, as detailed in the chart below:[0m

[0m┌───────────────────────────────────────────────┬───────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────┐[0m
[0m│ Use-case                                      │ Class         │ Method(s) to implement                                                                                     │[0m
[0m├───────────────────────────────────────────────┼───────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ Reading only                                  │ [[33mReadable[39m][]  │ [[33m_read()[39m][stream-_read]                                                                                    │[0m
[0m├───────────────────────────────────────────────┼───────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ Writing only                                  │ [[33mWritable[39m][]  │ [[33m_write()[39m][stream-_write], [[33m_writev()[39m][stream-_writev], [[33m_final()[39m][stream-_final]                          │[0m
[0m├───────────────────────────────────────────────┼───────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ Reading and writing                           │ [[33mDuplex[39m][]    │ [[33m_read()[39m][stream-_read], [[33m_write()[39m][stream-_write], [[33m_writev()[39m][stream-_writev], [[33m_final()[39m][stream-_final] │[0m
[0m├───────────────────────────────────────────────┼───────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ Operate on written data, then read the result │ [[33mTransform[39m][] │ [[33m_transform()[39m][stream-_transform], [[33m_flush()[39m][stream-_flush], [[33m_final()[39m][stream-_final]                    │[0m
[0m└───────────────────────────────────────────────┴───────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────┘[0m

[0mThe implementation code for a stream should [3mnever[23m call the "public" methods[0m
[0mof a stream that are intended for use by consumers (as described in the[0m
[0m[API for Stream Consumers][] section). Doing so may lead to adverse side effects[0m
[0min application code consuming the stream.[0m

[0mAvoid overriding public methods such as [33mwrite()[39m, [33mend()[39m, [33mcork()[39m,[0m
[0m[33muncork()[39m, [33mread()[39m and [33mdestroy()[39m, or emitting internal events such[0m
[0mas [33m'error'[39m, [33m'data'[39m, [33m'end'[39m, [33m'finish'[39m and [33m'close'[39m through [33m.emit()[39m.[0m
[0mDoing so can break current and future stream invariants leading to behavior[0m
[0mand/or compatibility issues with other streams, stream utilities, and user[0m
[0mexpectations.[0m

[32m[1m### Simplified Construction[22m[39m

[90m<!-- YAML[39m
[90madded: v1.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mFor many simple cases, it is possible to construct a stream without relying on[0m
[0minheritance. This can be accomplished by directly creating instances of the[0m
[0m[33mstream.Writable[39m, [33mstream.Readable[39m, [33mstream.Duplex[39m or [33mstream.Transform[39m[0m
[0mobjects and passing appropriate methods as constructor options.[0m

    [94mconst[39m [33m{[39m [37mWritable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mmyWritable[39m [93m=[39m [31mnew[39m [37mWritable[39m[90m([39m[33m{[39m
      [37mwrite[39m[90m([39m[37mchunk[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Implementing a Writable Stream[22m[39m

[0mThe [33mstream.Writable[39m class is extended to implement a [[33mWritable[39m][] stream.[0m

[0mCustom [33mWritable[39m streams [3mmust[23m call the [33mnew stream.Writable([options])[39m[0m
[0mconstructor and implement the [33mwritable._write()[39m and/or [33mwritable._writev()[39m[0m
[0mmethod.[0m

[32m[1m#### Constructor: [33mnew stream.Writable([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18438[39m
[90m    description: Add `emitClose` option to specify if `'close'` is emitted on[39m
[90m                 destroy.[39m
[90m  - version: v11.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22795[39m
[90m    description: Add `autoDestroy` option to automatically `destroy()` the[39m
[90m                 stream when it emits `'finish'` or errors.[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30623[39m
[90m    description: Change `autoDestroy` option default to `true`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mhighWaterMark[39m {number} Buffer level when[0m[0m[0m
      [0m      [0m[0m[[33mstream.write()[39m][stream-write] starts returning [33mfalse[39m. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m16384[39m (16kb), or [33m16[39m for [33mobjectMode[39m streams.[0m[0m[0m
      [0m
        * [0m[0m[33mdecodeStrings[39m {boolean} Whether to encode [33mstring[39ms passed to[0m[0m[0m
      [0m      [0m[0m[[33mstream.write()[39m][stream-write] to [33mBuffer[39ms (with the encoding[0m[0m[0m
      [0m      [0m[0mspecified in the [[33mstream.write()[39m][stream-write] call) before passing[0m[0m[0m
      [0m      [0m[0mthem to [[33mstream._write()[39m][stream-_write]. Other types of data are not[0m[0m[0m
      [0m      [0m[0mconverted (i.e. [33mBuffer[39ms are not decoded into [33mstring[39ms). Setting to[0m[0m[0m
      [0m      [0m[0mfalse will prevent [33mstring[39ms from being converted.  [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mdefaultEncoding[39m {string} The default encoding that is used when no[0m[0m[0m
      [0m      [0m[0mencoding is specified as an argument to [[33mstream.write()[39m][stream-write].[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'utf8'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mobjectMode[39m {boolean} Whether or not the[0m[0m[0m
      [0m      [0m[0m[[33mstream.write(anyObj)[39m][stream-write] is a valid operation. When set,[0m[0m[0m
      [0m      [0m[0mit becomes possible to write JavaScript values other than string,[0m[0m[0m
      [0m      [0m[0m[33mBuffer[39m or [33mUint8Array[39m if supported by the stream implementation.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33memitClose[39m {boolean} Whether or not the stream should emit [33m'close'[39m[0m[0m[0m
      [0m      [0m[0mafter it has been destroyed. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwrite[39m {Function} Implementation for the[0m[0m[0m
      [0m      [0m[0m[[33mstream._write()[39m][stream-_write] method.[0m[0m[0m
      [0m
        * [0m[0m[33mwritev[39m {Function} Implementation for the[0m[0m[0m
      [0m      [0m[0m[[33mstream._writev()[39m][stream-_writev] method.[0m[0m[0m
      [0m
        * [0m[0m[33mdestroy[39m {Function} Implementation for the[0m[0m[0m
      [0m      [0m[0m[[33mstream._destroy()[39m][writable-_destroy] method.[0m[0m[0m
      [0m
        * [0m[0m[33mfinal[39m {Function} Implementation for the[0m[0m[0m
      [0m      [0m[0m[[33mstream._final()[39m][stream-_final] method.[0m[0m[0m
      [0m
        * [0m[0m[33mautoDestroy[39m {boolean} Whether this stream should automatically call[0m[0m[0m
      [0m      [0m[0m[33m.destroy()[39m on itself after ending. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m

[90m<!-- eslint-disable no-useless-constructor -->[39m
[90m[39m    [94mconst[39m [33m{[39m [37mWritable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyWritable[39m [94mextends[39m [37mWritable[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
        [90m// Calls the stream.Writable() constructor.[39m
        [94msuper[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m

[0mOr, when using pre-ES6 style constructors:[0m

    [94mconst[39m [33m{[39m [37mWritable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mMyWritable[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[93m![39m[90m([39m[91mthis[39m [94minstanceof[39m [37mMyWritable[39m[90m)[39m[90m)[39m
        [31mreturn[39m [31mnew[39m [37mMyWritable[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
      [37mWritable[39m[32m.[39m[37mcall[39m[90m([39m[91mthis[39m[32m,[39m [37moptions[39m[90m)[39m[90m;[39m
    [33m}[39m
    [37mutil[39m[32m.[39m[37minherits[39m[90m([39m[37mMyWritable[39m[32m,[39m [37mWritable[39m[90m)[39m[90m;[39m

[0mOr, using the Simplified Constructor approach:[0m

    [94mconst[39m [33m{[39m [37mWritable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mmyWritable[39m [93m=[39m [31mnew[39m [37mWritable[39m[90m([39m[33m{[39m
      [37mwrite[39m[90m([39m[37mchunk[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [90m// ...[39m
      [33m}[39m[32m,[39m
      [37mwritev[39m[90m([39m[37mchunks[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### [33mwritable._write(chunk, encoding, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29639[39m
[90m    description: _write() is optional when providing _writev().[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mchunk[39m {Buffer|string|any} The [33mBuffer[39m to be written, converted from the[0m
      [0m[33mstring[39m passed to [[33mstream.write()[39m][stream-write]. If the stream's[0m
      [0m[33mdecodeStrings[39m option is [33mfalse[39m or the stream is operating in object mode,[0m
      [0mthe chunk will not be converted & will be whatever was passed to[0m
      [0m[[33mstream.write()[39m][stream-write].[0m
    * [0m[33mencoding[39m {string} If the chunk is a string, then [33mencoding[39m is the[0m
      [0mcharacter encoding of that string. If chunk is a [33mBuffer[39m, or if the[0m
      [0mstream is operating in object mode, [33mencoding[39m may be ignored.[0m
    * [0m[33mcallback[39m {Function} Call this function (optionally with an error[0m
      [0margument) when processing is complete for the supplied chunk.[0m

[0mAll [33mWritable[39m stream implementations must provide a[0m
[0m[[33mwritable._write()[39m][stream-_write] and/or[0m
[0m[[33mwritable._writev()[39m][stream-_writev] method to send data to the underlying[0m
[0mresource.[0m

[0m[[33mTransform[39m][] streams provide their own implementation of the[0m
[0m[[33mwritable._write()[39m][stream-_write].[0m

[0mThis function MUST NOT be called by application code directly. It should be[0m
[0mimplemented by child classes, and called by the internal [33mWritable[39m class[0m
[0mmethods only.[0m

[0mThe [33mcallback[39m function must be called synchronously inside of[0m
[0m[33mwritable._write()[39m or asynchronously (i.e. different tick) to signal either[0m
[0mthat the write completed successfully or failed with an error.[0m
[0mThe first argument passed to the [33mcallback[39m must be the [33mError[39m object if the[0m
[0mcall failed or [33mnull[39m if the write succeeded.[0m

[0mAll calls to [33mwritable.write()[39m that occur between the time [33mwritable._write()[39m[0m
[0mis called and the [33mcallback[39m is called will cause the written data to be[0m
[0mbuffered. When the [33mcallback[39m is invoked, the stream might emit a [[33m'drain'[39m][][0m
[0mevent. If a stream implementation is capable of processing multiple chunks of[0m
[0mdata at once, the [33mwritable._writev()[39m method should be implemented.[0m

[0mIf the [33mdecodeStrings[39m property is explicitly set to [33mfalse[39m in the constructor[0m
[0moptions, then [33mchunk[39m will remain the same object that is passed to [33m.write()[39m,[0m
[0mand may be a string rather than a [33mBuffer[39m. This is to support implementations[0m
[0mthat have an optimized handling for certain string data encodings. In that case,[0m
[0mthe [33mencoding[39m argument will indicate the character encoding of the string.[0m
[0mOtherwise, the [33mencoding[39m argument can be safely ignored.[0m

[0mThe [33mwritable._write()[39m method is prefixed with an underscore because it is[0m
[0minternal to the class that defines it, and should never be called directly by[0m
[0muser programs.[0m

[32m[1m#### [33mwritable._writev(chunks, callback)[39m[32m[22m[39m

    * [0m[33mchunks[39m {Object[]} The chunks to be written. Each chunk has following[0m
      [0mformat: [33m{ chunk: ..., encoding: ... }[39m.[0m
    * [0m[33mcallback[39m {Function} A callback function (optionally with an error[0m
      [0margument) to be invoked when processing is complete for the supplied chunks.[0m

[0mThis function MUST NOT be called by application code directly. It should be[0m
[0mimplemented by child classes, and called by the internal [33mWritable[39m class[0m
[0mmethods only.[0m

[0mThe [33mwritable._writev()[39m method may be implemented in addition or alternatively[0m
[0mto [33mwritable._write()[39m in stream implementations that are capable of processing[0m
[0mmultiple chunks of data at once. If implemented and if there is buffered data[0m
[0mfrom previous writes, [33m_writev()[39m will be called instead of [33m_write()[39m.[0m

[0mThe [33mwritable._writev()[39m method is prefixed with an underscore because it is[0m
[0minternal to the class that defines it, and should never be called directly by[0m
[0muser programs.[0m

[32m[1m#### [33mwritable._destroy(err, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merr[39m {Error} A possible error.[0m
    * [0m[33mcallback[39m {Function} A callback function that takes an optional error[0m
      [0margument.[0m

[0mThe [33m_destroy()[39m method is called by [[33mwritable.destroy()[39m][writable-destroy].[0m
[0mIt can be overridden by child classes but it [1mmust not[22m be called directly.[0m

[32m[1m#### [33mwritable._final(callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} Call this function (optionally with an error[0m
      [0margument) when finished writing any remaining data.[0m

[0mThe [33m_final()[39m method [1mmust not[22m be called directly. It may be implemented[0m
[0mby child classes, and if so, will be called by the in[0m

[0mternal [33mWritable[39m[0m
[0mclass methods only.[0m

[0mThis optional function will be called before the stream closes, delaying the[0m
[0m[33m'finish'[39m event until [33mcallback[39m is called. This is useful to close resources[0m
[0mor write buffered data before a stream ends.[0m

[32m[1m#### Errors While Writing[22m[39m

[0mErrors occurring during the processing of the [34m[33mwritable._write()[39m[34m ([34m[4m#stream_writable_write_chunk_encoding_callback_1[24m[39m[34m)[39m,[0m
[0m[34m[33mwritable._writev()[39m[34m ([34m[4m#stream_writable_writev_chunks_callback[24m[39m[34m)[39m and [34m[33mwritable._final()[39m[34m ([34m[4m#stream_writable_final_callback[24m[39m[34m)[39m methods must be propagated[0m
[0mby invoking the callback and passing the error as the first argument.[0m
[0mThrowing an [33mError[39m from within these methods or manually emitting an [33m'error'[39m[0m
[0mevent results in undefined behavior.[0m

[0mIf a [33mReadable[39m stream pipes into a [33mWritable[39m stream when [33mWritable[39m emits an[0m
[0merror, the [33mReadable[39m stream will be unpiped.[0m

    [94mconst[39m [33m{[39m [37mWritable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mmyWritable[39m [93m=[39m [31mnew[39m [37mWritable[39m[90m([39m[33m{[39m
      [37mwrite[39m[90m([39m[37mchunk[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37mchunk[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'a'[39m[90m)[39m [93m>=[39m [34m0[39m[90m)[39m [33m{[39m
          [37mcallback[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'chunk is invalid'[39m[90m)[39m[90m)[39m[90m;[39m
        [33m}[39m [94melse[39m [33m{[39m
          [37mcallback[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### An Example Writable Stream[22m[39m

[0mThe following illustrates a rather simplistic (and somewhat pointless) custom[0m
[0m[33mWritable[39m stream implementation. While this specific [33mWritable[39m stream instance[0m
[0mis not of any real particular usefulness, the example illustrates each of the[0m
[0mrequired elements of a custom [34m[33mWritable[39m[34m ([34m[4m#stream_class_stream_writable[24m[39m[34m)[39m stream instance:[0m

    [94mconst[39m [33m{[39m [37mWritable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyWritable[39m [94mextends[39m [37mWritable[39m [33m{[39m
      [37m_write[39m[90m([39m[37mchunk[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37mchunk[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'a'[39m[90m)[39m [93m>=[39m [34m0[39m[90m)[39m [33m{[39m
          [37mcallback[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'chunk is invalid'[39m[90m)[39m[90m)[39m[90m;[39m
        [33m}[39m [94melse[39m [33m{[39m
          [37mcallback[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m

[32m[1m#### Decoding buffers in a Writable Stream[22m[39m

[0mDecoding buffers is a common task, for instance, when using transformers whose[0m
[0minput is a string. This is not a trivial process when using multi-byte[0m
[0mcharacters encoding, such as UTF-8. The following example shows how to decode[0m
[0mmulti-byte strings using [33mStringDecoder[39m and [34m[33mWritable[39m[34m ([34m[4m#stream_class_stream_writable[24m[39m[34m)[39m.[0m

    [94mconst[39m [33m{[39m [37mWritable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mStringDecoder[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/string_decoder'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mStringWritable[39m [94mextends[39m [37mWritable[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37m_decoder[39m [93m=[39m [31mnew[39m [37mStringDecoder[39m[90m([39m[37moptions[39m [93m&&[39m [37moptions[39m[32m.[39m[37mdefaultEncoding[39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37mdata[39m [93m=[39m [92m''[39m[90m;[39m
      [33m}[39m
      [37m_write[39m[90m([39m[37mchunk[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37mencoding[39m [93m===[39m [92m'buffer'[39m[90m)[39m [33m{[39m
          [37mchunk[39m [93m=[39m [91mthis[39m[32m.[39m[37m_decoder[39m[32m.[39m[37mwrite[39m[90m([39m[37mchunk[39m[90m)[39m[90m;[39m
        [33m}[39m
        [91mthis[39m[32m.[39m[37mdata[39m [93m+=[39m [37mchunk[39m[90m;[39m
        [37mcallback[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
      [37m_final[39m[90m([39m[37mcallback[39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37mdata[39m [93m+=[39m [91mthis[39m[32m.[39m[37m_decoder[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
        [37mcallback[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [94mconst[39m [37meuro[39m [93m=[39m [33m[[39m[33m[[39m[34m0xE2[39m[32m,[39m [34m0x82[39m[33m][39m[32m,[39m [33m[[39m[34m0xAC[39m[33m][39m[33m][39m[32m.[39m[37mmap[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mw[39m [93m=[39m [31mnew[39m [37mStringWritable[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mw[39m[32m.[39m[37mwrite[39m[90m([39m[92m'currency: '[39m[90m)[39m[90m;[39m
    [37mw[39m[32m.[39m[37mwrite[39m[90m([39m[37meuro[39m[33m[[39m[34m0[39m[33m][39m[90m)[39m[90m;[39m
    [37mw[39m[32m.[39m[37mend[39m[90m([39m[37meuro[39m[33m[[39m[34m1[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mw[39m[32m.[39m[37mdata[39m[90m)[39m[90m;[39m [90m// currency: €[39m

[32m[1m### Implementing a Readable Stream[22m[39m

[0mThe [33mstream.Readable[39m class is extended to implement a [34m[33mReadable[39m[34m ([34m[4m#stream_class_stream_readable[24m[39m[34m)[39m stream.[0m

[0mCustom [33mReadable[39m streams [3mmust[23m call the [33mnew stream.Readable([options])[39m[0m
[0mconstructor and implement the [33mreadable._read()[39m method.[0m

[32m[1m#### [33mnew stream.Readable([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22795[39m
[90m    description: Add `autoDestroy` option to automatically `destroy()` the[39m
[90m                 stream when it emits `'end'` or errors.[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30623[39m
[90m    description: Change `autoDestroy` option default to `true`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mhighWaterMark[39m {number} The maximum [34mnumber of bytes ([34m[4m#stream_highwatermark_discrepancy_after_calling_readable_setencoding[24m[39m[34m)[39m to store[0m[0m[0m
      [0m      [0m[0min the internal buffer before ceasing to read from the underlying resource.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m16384[39m (16kb), or [33m16[39m for [33mobjectMode[39m streams.[0m[0m[0m
      [0m
        * [0m[0m[33mencoding[39m {string} If specified, then buffers will be decoded to[0m[0m[0m
      [0m      [0m[0mstrings using the specified encoding. [1mDefault:[22m [33mnull[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mobjectMode[39m {boolean} Whether this stream should behave[0m[0m[0m
      [0m      [0m[0mas a stream of objects. Meaning that [34m[33mstream.read(n)[39m[34m ([34m[4m#stream_readable_read_size[24m[39m[34m)[39m returns[0m[0m[0m
      [0m      [0m[0ma single value instead of a [33mBuffer[39m of size [33mn[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33memitClose[39m {boolean} Whether or not the stream should emit [33m'close'[39m[0m[0m[0m
      [0m      [0m[0mafter it has been destroyed. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mread[39m {Function} Implementation for the [34m[33mstream._read()[39m[34m ([34m[4m#stream_readable_read_size_1[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mmethod.[0m[0m[0m
      [0m
        * [0m[0m[33mdestroy[39m {Function} Implementation for the[0m[0m[0m
      [0m      [0m[0m[34m[33mstream._destroy()[39m[34m ([34m[4m#stream_readable_destroy_err_callback[24m[39m[34m)[39m method.[0m[0m[0m
      [0m
        * [0m[0m[33mautoDestroy[39m {boolean} Whether this stream should automatically call[0m[0m[0m
      [0m      [0m[0m[33m.destroy()[39m on itself after ending. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m

[90m<!-- eslint-disable no-useless-constructor -->[39m
[90m[39m    [94mconst[39m [33m{[39m [37mReadable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyReadable[39m [94mextends[39m [37mReadable[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
        [90m// Calls the stream.Readable(options) constructor.[39m
        [94msuper[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m

[0mOr, when using pre-ES6 style constructors:[0m

    [94mconst[39m [33m{[39m [37mReadable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mMyReadable[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[93m![39m[90m([39m[91mthis[39m [94minstanceof[39m [37mMyReadable[39m[90m)[39m[90m)[39m
        [31mreturn[39m [31mnew[39m [37mMyReadable[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
      [37mReadable[39m[32m.[39m[37mcall[39m[90m([39m[91mthis[39m[32m,[39m [37moptions[39m[90m)[39m[90m;[39m
    [33m}[39m
    [37mutil[39m[32m.[39m[37minherits[39m[90m([39m[37mMyReadable[39m[32m,[39m [37mReadable[39m[90m)[39m[90m;[39m

[0mOr, using the Simplified Constructor approach:[0m

    [94mconst[39m [33m{[39m [37mReadable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mmyReadable[39m [93m=[39m [31mnew[39m [37mReadable[39m[90m([39m[33m{[39m
      [37mread[39m[90m([39m[37msize[39m[90m)[39m [33m{[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### [33mreadable._read(size)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msize[39m {number} Number of bytes to read asynchronously[0m

[0mThis function MUST NOT be called by application code directly. It should be[0m
[0mimplemented by child classes, and called by the internal [33mReadable[39m class[0m
[0mmethods only.[0m

[0mAll [33mReadable[39m stream implementations must provide an implementation of the[0m
[0m[33mreadable._read()[39m method to fetch data from the underlying resource.[0m

[0mWhen [33mreadable._read()[39m is called, if data is available from the resource, the[0m
[0mimplementation should begin pushing that data into the read queue using the[0m
[0m[34m[33mthis.push(dataChunk)[39m[34m ([34m[4m#stream_readable_push_chunk_encoding[24m[39m[34m)[39m method. [33m_read()[39m should continue reading[0m
[0mfrom the resource and pushing data until [33mreadable.push()[39m returns [33mfalse[39m. Only[0m
[0mwhen [33m_read()[39m is called again after it has stopped should it resume pushing[0m
[0madditional data onto the queue.[0m

[0mOnce the [33mreadable._read()[39m method has been called, it will not be called again[0m
[0muntil more data is pushed through the [34m[33mreadable.push()[39m[34m ([34m[4m#stream_readable_push_chunk_encoding[24m[39m[34m)[39m method.[0m
[0mEmpty data such as empty buffers and strings will not cause [33mreadable._read()[39m[0m
[0mto be called.[0m

[0mThe [33msize[39m argument is advisory. For implementations where a "read" is a[0m
[0msingle operation that returns data can use the [33msize[39m argument to determine how[0m
[0mmuch data to fetch. Other implementations may ignore this argument and simply[0m
[0mprovide data whenever it becomes available. There is no need to "wait" until[0m
[0m[33msize[39m bytes are available before calling [34m[33mstream.push(chunk)[39m[34m ([34m[4m#stream_readable_push_chunk_encoding[24m[39m[34m)[39m.[0m

[0mThe [33mreadable._read()[39m method is prefixed with an underscore because it is[0m
[0minternal to the class that defines it, and should never be called directly by[0m
[0muser programs.[0m

[32m[1m#### [33mreadable._destroy(err, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merr[39m {Error} A possible error.[0m
    * [0m[33mcallback[39m {Function} A callback function that takes an optional error[0m
      [0margument.[0m

[0mThe [33m_destroy()[39m method is called by [34m[33mreadable.destroy()[39m[34m ([34m[4m#stream_readable_destroy_error[24m[39m[34m)[39m.[0m
[0mIt can be overridden by child classes but it [1mmust not[22m be called directly.[0m

[32m[1m#### [33mreadable.push(chunk[, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11608[39m
[90m    description: The `chunk` argument can now be a `Uint8Array` instance.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mchunk[39m {Buffer|Uint8Array|string|null|any} Chunk of data to push into the[0m
      [0mread queue. For streams not operating in object mode, [33mchunk[39m must be a[0m
      [0mstring, [33mBuffer[39m or [33mUint8Array[39m. For object mode streams, [33mchunk[39m may be[0m
      [0many JavaScript value.[0m
    * [0m[33mencoding[39m {string} Encoding of string chunks. Must be a valid[0m
      [0m[33mBuffer[39m encoding, such as [33m'utf8'[39m or [33m'ascii'[39m.[0m
    * [0mReturns: {boolean} [33mtrue[39m if additional chunks of data may continue to be[0m
      [0mpushed; [33mfalse[39m otherwise.[0m

[0mWhen [33mchunk[39m is a [33mBuffer[39m, [33mUint8Array[39m or [33mstring[39m, the [33mchunk[39m of data will[0m
[0mbe added to the internal queue for users of the stream to consume.[0m
[0mPassing [33mchunk[39m as [33mnull[39m signals the end of the stream (EOF), after which no[0m
[0mmore data can be written.[0m

[0mWhen the [33mReadable[39m is operating in paused mode, the data added with[0m
[0m[33mreadable.push()[39m can be read out by calling the[0m
[0m[34m[33mreadable.read()[39m[34m ([34m[4m#stream_readable_read_size[24m[39m[34m)[39m method when the [34m[33m'readable'[39m[34m ([34m[4m#stream_event_readable[24m[39m[34m)[39m event is[0m
[0memitted.[0m

[0mWhen the [33mReadable[39m is operating in flowing mode, the data added with[0m
[0m[33mreadable.push()[39m will be delivered by emitting a [33m'data'[39m event.[0m

[0mThe [33mreadable.push()[39m method is designed to be as flexible as possible. For[0m
[0mexample, when wrapping a lower-level source that provides some form of[0m
[0mpause/resume mechanism, and a data callback, the low-level source can be wrapped[0m
[0mby the custom [33mReadable[39m instance:[0m

    [90m// `_source` is an object with readStop() and readStart() methods,[39m
    [90m// and an `ondata` member that gets called when it has data, and[39m
    [90m// an `onend` member that gets called when the data is over.[39m
    
    [94mclass[39m [37mSourceWrapper[39m [94mextends[39m [37mReadable[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    
        [91mthis[39m[32m.[39m[37m_source[39m [93m=[39m [37mgetLowLevelSourceObject[39m[90m([39m[90m)[39m[90m;[39m
    
        [90m// Every time there's data, push it into the internal buffer.[39m
        [91mthis[39m[32m.[39m[37m_source[39m[32m.[39m[37mondata[39m [93m=[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// If push() returns false, then stop reading from source.[39m
          [94mif[39m [90m([39m[93m![39m[91mthis[39m[32m.[39m[37mpush[39m[90m([39m[37mchunk[39m[90m)[39m[90m)[39m
            [91mthis[39m[32m.[39m[37m_source[39m[32m.[39m[37mreadStop[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m[90m;[39m
    
        [90m// When the source ends, push the EOF-signaling `null` chunk.[39m
        [91mthis[39m[32m.[39m[37m_source[39m[32m.[39m[37monend[39m [93m=[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [91mthis[39m[32m.[39m[37mpush[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
        [33m}[39m[90m;[39m
      [33m}[39m
      [90m// _read() will be called when the stream wants to pull more data in.[39m
      [90m// The advisory size argument is ignored in this case.[39m
      [37m_read[39m[90m([39m[37msize[39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37m_source[39m[32m.[39m[37mreadStart[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m

[0mThe [33mreadable.push()[39m method is used to push the content[0m
[0minto the internal buffer. It can be driven by the [33mreadable._read()[39m method.[0m

[0mFor streams not operating in object mode, if the [33mchunk[39m parameter of[0m
[0m[33mreadable.push()[39m is [33mundefined[39m, it will be treated as empty string or[0m
[0mbuffer. See [34m[33mreadable.push('')[39m[34m ([34m[4m#stream_readable_push[24m[39m[34m)[39m for more information.[0m

[32m[1m#### Errors While Reading[22m[39m

[0mErrors occurring during processing of the [34m[33mreadable._read()[39m[34m ([34m[4m#stream_readable_read_size_1[24m[39m[34m)[39m must be[0m
[0mpropagated through the [34m[33mreadable.destroy(err)[39m[34m ([34m[4m#stream_readable_destroy_err_callback[24m[39m[34m)[39m method.[0m
[0mThrowing an [33mError[39m from within [34m[33mreadable._read()[39m[34m ([34m[4m#stream_readable_read_size_1[24m[39m[34m)[39m or manually emitting an[0m
[0m[33m'error'[39m event results in undefined behavior.[0m

    [94mconst[39m [33m{[39m [37mReadable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mmyReadable[39m [93m=[39m [31mnew[39m [37mReadable[39m[90m([39m[33m{[39m
      [37mread[39m[90m([39m[37msize[39m[90m)[39m [33m{[39m
        [94mconst[39m [37merr[39m [93m=[39m [37mcheckSomeErrorCondition[39m[90m([39m[90m)[39m[90m;[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
          [91mthis[39m[32m.[39m[37mdestroy[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
        [33m}[39m [94melse[39m [33m{[39m
          [90m// Do some work.[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### An Example Counting Stream[22m[39m

[90m<!--type=example-->[39m
[90m[39m
[90m[39m[0mThe following is a basic example of a [33mReadable[39m stream that emits the numerals[0m
[0mfrom 1 to 1,000,000 in ascending order, and then ends.[0m

    [94mconst[39m [33m{[39m [37mReadable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mCounter[39m [94mextends[39m [37mReadable[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37mopt[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[37mopt[39m[90m)[39m[90m;[39m
        [91mthis[39m[32m.[39m[37m_max[39m [93m=[39m [34m1000000[39m[90m;[39m
        [91mthis[39m[32m.[39m[37m_index[39m [93m=[39m [34m1[39m[90m;[39m
      [33m}[39m
    
      [37m_read[39m[90m([39m[90m)[39m [33m{[39m
        [94mconst[39m [37mi[39m [93m=[39m [91mthis[39m[32m.[39m[37m_index[39m[93m++[39m[90m;[39m
        [94mif[39m [90m([39m[37mi[39m [93m>[39m [91mthis[39m[32m.[39m[37m_max[39m[90m)[39m
          [91mthis[39m[32m.[39m[37mpush[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
        [94melse[39m [33m{[39m
          [94mconst[39m [37mstr[39m [93m=[39m [37mString[39m[90m([39m[37mi[39m[90m)[39m[90m;[39m
          [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37mstr[39m[32m,[39m [92m'ascii'[39m[90m)[39m[90m;[39m
          [91mthis[39m[32m.[39m[37mpush[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m

[32m[1m### Implementing a Duplex Stream[22m[39m

[0mA [34m[33mDuplex[39m[34m ([34m[4m#stream_class_stream_duplex[24m[39m[34m)[39m stream is one that implements both [34m[33mReadable[39m[34m ([34m[4m#stream_class_stream_readable[24m[39m[34m)[39m and[0m
[0m[34m[33mWritable[39m[34m ([34m[4m#stream_class_stream_writable[24m[39m[34m)[39m, such as a TCP socket connection.[0m

[0mBecause JavaScript does not have support for multiple inheritance, the[0m
[0m[33mstream.Duplex[39m class is extended to implement a [34m[33mDuplex[39m[34m ([34m[4m#stream_class_stream_duplex[24m[39m[34m)[39m stream (as opposed[0m
[0mto extending the [33mstream.Readable[39m [3mand[23m [33mstream.Writable[39m classes).[0m

[0mThe [33mstream.Duplex[39m class prototypically inherits from [33mstream.Readable[39m and[0m
[0mparasitically from [33mstream.Writable[39m, but [33minstanceof[39m will work properly for[0m
[0mboth base classes due to overriding [34m[33mSymbol.hasInstance[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance[24m[39m[34m)[39m on[0m
[0m[33mstream.Writable[39m.[0m

[0mCustom [33mDuplex[39m streams [3mmust[23m call the [33mnew stream.Duplex([options])[39m[0m
[0mconstructor and implement [3mboth[23m the [33mreadable._read()[39m and[0m
[0m[33mwritable._write()[39m methods.[0m

[32m[1m#### [33mnew stream.Duplex(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14636[39m
[90m    description: The `readableHighWaterMark` and `writableHighWaterMark` options[39m
[90m                 are supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} Passed to both [33mWritable[39m and [33mReadable[39m[0m
      [0mconstructors. Also has the following fields:
        * [0m[0m[33mallowHalfOpen[39m {boolean} If set to [33mfalse[39m, then the stream will[0m[0m[0m
      [0m      [0m[0mautomatically end the writable side when the readable side ends.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mreadableObjectMode[39m {boolean} Sets [33mobjectMode[39m for readable side of the[0m[0m[0m
      [0m      [0m[0mstream. Has no effect if [33mobjectMode[39m is [33mtrue[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwritableObjectMode[39m {boolean} Sets [33mobjectMode[39m for writable side of the[0m[0m[0m
      [0m      [0m[0mstream. Has no effect if [33mobjectMode[39m is [33mtrue[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mreadableHighWaterMark[39m {number} Sets [33mhighWaterMark[39m for the readable side[0m[0m[0m
      [0m      [0m[0mof the stream. Has no effect if [33mhighWaterMark[39m is provided.[0m[0m[0m
      [0m
        * [0m[0m[33mwritableHighWaterMark[39m {number} Sets [33mhighWaterMark[39m for the writable side[0m[0m[0m
      [0m      [0m[0mof the stream. Has no effect if [33mhighWaterMark[39m is provided.[0m[0m[0m

[90m<!-- eslint-disable no-useless-constructor -->[39m
[90m[39m    [94mconst[39m [33m{[39m [37mDuplex[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyDuplex[39m [94mextends[39m [37mDuplex[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m

[0mOr, when using pre-ES6 style constructors:[0m

    [94mconst[39m [33m{[39m [37mDuplex[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mMyDuplex[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[93m![39m[90m([39m[91mthis[39m [94minstanceof[39m [37mMyDuplex[39m[90m)[39m[90m)[39m
        [31mreturn[39m [31mnew[39m [37mMyDuplex[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
      [37mDuplex[39m[32m.[39m[37mcall[39m[90m([39m[91mthis[39m[32m,[39m [37moptions[39m[90m)[39m[90m;[39m
    [33m}[39m
    [37mutil[39m[32m.[39m[37minherits[39m[90m([39m[37mMyDuplex[39m[32m,[39m [37mDuplex[39m[90m)[39m[90m;[39m

[0mOr, using the Simplified Constructor approach:[0m

    [94mconst[39m [33m{[39m [37mDuplex[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mmyDuplex[39m [93m=[39m [31mnew[39m [37mDuplex[39m[90m([39m[33m{[39m
      [37mread[39m[90m([39m[37msize[39m[90m)[39m [33m{[39m
        [90m// ...[39m
      [33m}[39m[32m,[39m
      [37mwrite[39m[90m([39m[37mchunk[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### An Example Duplex Stream[22m[39m

[0mThe following illustrates a simple example of a [33mDuplex[39m stream that wraps a[0m
[0mhypothetical lower-level source object to which data can be written, and[0m
[0mfrom which data can be read, albeit using an API that is not compatible with[0m
[0mNode.js streams.[0m
[0mThe following illustrates a simple example of a [33mDuplex[39m stream that buffers[0m
[0mincoming written data via the [34m[33mWritable[39m[34m ([34m[4m#stream_class_stream_writable[24m[39m[34m)[39m interface that is read back out[0m
[0mvia the [34m[33mReadable[39m[34m ([34m[4m#stream_class_stream_readable[24m[39m[34m)[39m interface.[0m

    [94mconst[39m [33m{[39m [37mDuplex[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mkSource[39m [93m=[39m [37mSymbol[39m[90m([39m[92m'source'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyDuplex[39m [94mextends[39m [37mDuplex[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37msource[39m[32m,[39m [37moptions[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
        [91mthis[39m[33m[[39m[37mkSource[39m[33m][39m [93m=[39m [37msource[39m[90m;[39m
      [33m}[39m
    
      [37m_write[39m[90m([39m[37mchunk[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [90m// The underlying source only deals with strings.[39m
        [94mif[39m [90m([39m[37mBuffer[39m[32m.[39m[37misBuffer[39m[90m([39m[37mchunk[39m[90m)[39m[90m)[39m
          [37mchunk[39m [93m=[39m [37mchunk[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m;[39m
        [91mthis[39m[33m[[39m[37mkSource[39m[33m][39m[32m.[39m[37mwriteSomeData[39m[90m([39m[37mchunk[39m[90m)[39m[90m;[39m
        [37mcallback[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [37m_read[39m[90m([39m[37msize[39m[90m)[39m [33m{[39m
        [91mthis[39m[33m[[39m[37mkSource[39m[33m][39m[32m.[39m[37mfetchSomeData[39m[90m([39m[37msize[39m[32m,[39m [90m([39m[37mdata[39m[32m,[39m [37mencoding[39m[90m)[39m [93m=>[39m [33m{[39m
          [91mthis[39m[32m.[39m[37mpush[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37mdata[39m[32m,[39m [37mencoding[39m[90m)[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m

[0mThe most important aspect of a [33mDuplex[39m stream is that the [33mReadable[39m and[0m
[0m[33mWritable[39m sides operate independently of one another despite co-existing within[0m
[0ma single object instance.[0m

[32m[1m#### Object Mode Duplex Streams[22m[39m

[0mFor [33mDuplex[39m streams, [33mobjectMode[39m can be set exclusively for either the[0m
[0m[33mReadable[39m or [33mWritable[39m side using the [33mreadableObjectMode[39m and[0m
[0m[33mwritableObjectMode[39m options respectively.[0m

[0mIn the following example, for instance, a new [33mTransform[39m stream (which is a[0m
[0mtype of [34m[33mDuplex[39m[34m ([34m[4m#stream_class_stream_duplex[24m[39m[34m)[39m stream) is created that has an object mode [33mWritable[39m side[0m
[0mthat accepts JavaScript numbers that are converted to hexadecimal strings on[0m
[0mthe [33mReadable[39m side.[0m

    [94mconst[39m [33m{[39m [37mTransform[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [90m// All Transform streams are also Duplex Streams.[39m
    [94mconst[39m [37mmyTransform[39m [93m=[39m [31mnew[39m [37mTransform[39m[90m([39m[33m{[39m
      [37mwritableObjectMode[39m[93m:[39m [91mtrue[39m[32m,[39m
    
      [37mtransform[39m[90m([39m[37mchunk[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [90m// Coerce the chunk to a number if necessary.[39m
        [37mchunk[39m [93m|=[39m [34m0[39m[90m;[39m
    
        [90m// Transform the chunk into something else.[39m
        [94mconst[39m [37mdata[39m [93m=[39m [37mchunk[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m;[39m
    
        [90m// Push the data onto the readable queue.[39m
        [37mcallback[39m[90m([39m[90mnull[39m[32m,[39m [92m'0'[39m[32m.[39m[37mrepeat[39m[90m([39m[37mdata[39m[32m.[39m[37mlength[39m [93m%[39m [34m2[39m[90m)[39m [93m+[39m [37mdata[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mmyTransform[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'ascii'[39m[90m)[39m[90m;[39m
    [37mmyTransform[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mchunk[39m[90m)[39m[90m)[39m[90m;[39m
    
    [37mmyTransform[39m[32m.[39m[37mwrite[39m[90m([39m[34m1[39m[90m)[39m[90m;[39m
    [90m// Prints: 01[39m
    [37mmyTransform[39m[32m.[39m[37mwrite[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    [90m// Prints: 0a[39m
    [37mmyTransform[39m[32m.[39m[37mwrite[39m[90m([39m[34m100[39m[90m)[39m[90m;[39m
    [90m// Prints: 64[39m

[32m[1m### Implementing a Transform Stream[22m[39m

[0mA [34m[33mTransform[39m[34m ([34m[4m#stream_class_stream_transform[24m[39m[34m)[39m stream is a [34m[33mDuplex[39m[34m ([34m[4m#stream_class_stream_duplex[24m[39m[34m)[39m stream where the output is computed[0m
[0min some way from the input. Examples include [34mzlib ([34m[4mzlib.html[24m[39m[34m)[39m streams or [34mcrypto ([34m[4mcrypto.html[24m[39m[34m)[39m[0m
[0mstreams that compress, encrypt, or decrypt data.[0m

[0mThere is no requirement that the output be the same size as the input, the same[0m
[0mnumber of chunks, or arrive at the same time. For example, a [33mHash[39m stream will[0m
[0monly ever have a single chunk of output which is provided when the input is[0m
[0mended. A [33mzlib[39m stream will produce output that is either much smaller or much[0m
[0mlarger than its input.[0m

[0mThe [33mstream.Transform[39m class is extended to implement a [34m[33mTransform[39m[34m ([34m[4m#stream_class_stream_transform[24m[39m[34m)[39m stream.[0m

[0mThe [33mstream.Transform[39m class prototypically inherits from [33mstream.Duplex[39m and[0m
[0mimplements its own versions of the [33mwritable._write()[39m and [33mreadable._read()[39m[0m
[0mmethods. Custom [33mTransform[39m implementations [3mmust[23m implement the[0m
[0m[34m[33mtransform._transform()[39m[34m ([34m[4m#stream_transform_transform_chunk_encoding_callback[24m[39m[34m)[39m method and [3mmay[23m also implement[0m
[0mthe [34m[33mtransform._flush()[39m[34m ([34m[4m#stream_transform_flush_callback[24m[39m[34m)[39m method.[0m

[0mCare must be taken when using [33mTransform[39m streams in that data written to the[0m
[0mstream can cause the [33mWritable[39m side of the stream to become paused if the[0m
[0moutput on the [33mReadable[39m side is not consumed.[0m

[32m[1m#### [33mnew stream.Transform([options])[39m[32m[22m[39m

    * [0m[33moptions[39m {Object} Passed to both [33mWritable[39m and [33mReadable[39m[0m
      [0mconstructors. Also has the following fields:
        * [0m[0m[33mtransform[39m {Function} Implementation for the[0m[0m[0m
      [0m      [0m[0m[34m[33mstream._transform()[39m[34m ([34m[4m#stream_transform_transform_chunk_encoding_callback[24m[39m[34m)[39m method.[0m[0m[0m
      [0m
        * [0m[0m[33mflush[39m {Function} Implementation for the [34m[33mstream._flush()[39m[34m ([34m[4m#stream_transform_flush_callback[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mmethod.[0m[0m[0m

[90m<!-- eslint-disable no-useless-constructor -->[39m
[90m[39m    [94mconst[39m [33m{[39m [37mTransform[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mclass[39m [37mMyTransform[39m [94mextends[39m [37mTransform[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
        [94msuper[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m

[0mOr, when using pre-ES6 style constructors:[0m

    [94mconst[39m [33m{[39m [37mTransform[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mMyTransform[39m[90m([39m[37moptions[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[93m![39m[90m([39m[91mthis[39m [94minstanceof[39m [37mMyTransform[39m[90m)[39m[90m)[39m
        [31mreturn[39m [31mnew[39m [37mMyTransform[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
      [37mTransform[39m[32m.[39m[37mcall[39m[90m([39m[91mthis[39m[32m,[39m [37moptions[39m[90m)[39m[90m;[39m
    [33m}[39m
    [37mutil[39m[32m.[39m[37minherits[39m[90m([39m[37mMyTransform[39m[32m,[39m [37mTransform[39m[90m)[39m[90m;[39m

[0mOr, using the Simplified Constructor approach:[0m

    [94mconst[39m [33m{[39m [37mTransform[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mmyTransform[39m [93m=[39m [31mnew[39m [37mTransform[39m[90m([39m[33m{[39m
      [37mtransform[39m[90m([39m[37mchunk[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Events: [33m'finish'[39m[32m and [33m'end'[39m[32m[22m[39m

[0mThe [34m[33m'finish'[39m[34m ([34m[4m#stream_event_finish[24m[39m[34m)[39m and [34m[33m'end'[39m[34m ([34m[4m#stream_event_end[24m[39m[34m)[39m events are from the [33mstream.Writable[39m[0m
[0mand [33mstream.Readable[39m classes, respectively. The [33m'finish'[39m event is emitted[0m
[0mafter [34m[33mstream.end()[39m[34m ([34m[4m#stream_writable_end_chunk_encoding_callback[24m[39m[34m)[39m is called and all chunks have been processed[0m
[0mby [34m[33mstream._transform()[39m[34m ([34m[4m#stream_transform_transform_chunk_encoding_callback[24m[39m[34m)[39m. The [33m'end'[39m event is emitted[0m
[0mafter all data has been output, which occurs after the callback in[0m
[0m[34m[33mtransform._flush()[39m[34m ([34m[4m#stream_transform_flush_callback[24m[39m[34m)[39m has been called. In the case of an error,[0m
[0mneither [33m'finish'[39m nor [33m'end'[39m should be emitted.[0m

[32m[1m#### [33mtransform._flush(callback)[39m[32m[22m[39m

    * [0m[33mcallback[39m {Function} A callback function (optionally with an error[0m
      [0margument and data) to be called when remaining data has been flushed.[0m

[0mThis function MUST NOT be called by application code directly. It should be[0m
[0mimplemented by child classes, and called by the internal [33mReadable[39m class[0m
[0mmethods only.[0m

[0mIn some cases, a transform operation may need to emit an additional bit of[0m
[0mdata at the end of the stream. For example, a [33mzlib[39m compression stream will[0m
[0mstore an amount of internal state used to optimally compress the output. When[0m
[0mthe stream ends, however, that additional data needs to be flushed so that the[0m
[0mcompressed data will be complete.[0m

[0mCustom [34m[33mTransform[39m[34m ([34m[4m#stream_class_stream_transform[24m[39m[34m)[39m implementations [3mmay[23m implement the [33mtransform._flush()[39m[0m
[0mmethod. This will be called when there is no more written data to be consumed,[0m
[0mbut before the [34m[33m'end'[39m[34m ([34m[4m#stream_event_end[24m[39m[34m)[39m event is emitted signaling the end of the[0m
[0m[34m[33mReadable[39m[34m ([34m[4m#stream_class_stream_readable[24m[39m[34m)[39m stream.[0m

[0mWithin the [33mtransform._flush()[39m implementation, the [33mreadable.push()[39m method[0m
[0mmay be called zero or more times, as appropriate. The [33mcallback[39m function must[0m
[0mbe called when the flush operation is complete.[0m

[0mThe [33mtransform._flush()[39m method is prefixed with an underscore because it is[0m
[0minternal to the class that defines it, and should never be called directly by[0m
[0muser programs.[0m

[32m[1m#### [33mtransform._transform(chunk, encoding, callback)[39m[32m[22m[39m

    * [0m[33mchunk[39m {Buffer|string|any} The [33mBuffer[39m to be transformed, converted from[0m
      [0mthe [33mstring[39m passed to [34m[33mstream.write()[39m[34m ([34m[4m#stream_writable_write_chunk_encoding_callback[24m[39m[34m)[39m. If the stream's[0m
      [0m[33mdecodeStrings[39m option is [33mfalse[39m or the stream is operating in object mode,[0m
      [0mthe chunk will not be converted & will be whatever was passed to[0m
      [0m[34m[33mstream.write()[39m[34m ([34m[4m#stream_writable_write_chunk_encoding_callback[24m[39m[34m)[39m.[0m
    * [0m[33mencoding[39m {string} If the chunk is a string, then this is the[0m
      [0mencoding type. If chunk is a buffer, then this is the special[0m
      [0mvalue [33m'buffer'[39m. Ignore it in that case.[0m
    * [0m[33mcallback[39m {Function} A callback function (optionally with an error[0m
      [0margument and data) to be called after the supplied [33mchunk[39m has been[0m
      [0mprocessed.[0m

[0mThis function MUST NOT be called by application code directly. It should be[0m
[0mimplemented by child classes, and called by the internal [33mReadable[39m class[0m
[0mmethods only.[0m

[0mAll [33mTransform[39m stream implementations must provide a [33m_transform()[39m[0m
[0mmethod to accept input and produce output. The [33mtransform._transform()[39m[0m
[0mimplementation handles the bytes being written, computes an output, then passes[0m
[0mthat output off to the readable portion using the [33mreadable.push()[39m method.[0m

[0mThe [33mtransform.push()[39m method may be called zero or more times to generate[0m
[0moutput from a single input chunk, depending on how much is to be output[0m
[0mas a result of the chunk.[0m

[0mIt is possible that no output is generated from any given chunk of input data.[0m

[0mThe [33mcallback[39m function must be called only when the current chunk is completely[0m
[0mconsumed. The first argument passed to the [33mcallback[39m must be an [33mError[39m object[0m
[0mif an error occurred while processing the input or [33mnull[39m otherwise. If a second[0m
[0margument is passed to the [33mcallback[39m, it will be forwarded on to the[0m
[0m[33mreadable.push()[39m method. In other words, the following are equivalent:[0m

    [37mtransform[39m[32m.[39m[37mprototype[39m[32m.[39m[37m_transform[39m [93m=[39m [94mfunction[39m[90m([39m[37mdata[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
      [91mthis[39m[32m.[39m[37mpush[39m[90m([39m[37mdata[39m[90m)[39m[90m;[39m
      [37mcallback[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m
    
    [37mtransform[39m[32m.[39m[37mprototype[39m[32m.[39m[37m_transform[39m [93m=[39m [94mfunction[39m[90m([39m[37mdata[39m[32m,[39m [37mencoding[39m[32m,[39m [37mcallback[39m[90m)[39m [33m{[39m
      [37mcallback[39m[90m([39m[90mnull[39m[32m,[39m [37mdata[39m[90m)[39m[90m;[39m
    [33m}[39m[90m;[39m

[0mThe [33mtransform._transform()[39m method is prefixed with an underscore because it[0m
[0mis internal to the class that defines it, and should never be called directly by[0m
[0muser programs.[0m

[0m[33mtransform._transform()[39m is never called in parallel; streams implement a[0m
[0mqueue mechanism, and to receive the next chunk, [33mcallback[39m must be[0m
[0mcalled, either synchronously or asynchronously.[0m

[32m[1m#### Class: [33mstream.PassThrough[39m[32m[22m[39m

[0mThe [33mstream.PassThrough[39m class is a trivial implementation of a [34m[33mTransform[39m[34m ([34m[4m#stream_class_stream_transform[24m[39m[34m)[39m[0m
[0mstream that simply passes the input bytes across to the output. Its purpose is[0m
[0mprimarily for examples and testing, but there are some use cases where[0m
[0m[33mstream.PassThrough[39m is useful as a building block for novel sorts of streams.[0m

[32m[1m## Additional Notes[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[32m[1m### Streams Compatibility with Async Generators and Async Iterators[22m[39m

[0mWith the support of async generators and iterators in JavaScript, async[0m
[0mgenerators are effectively a first-class language-level stream construct at[0m
[0mthis point.[0m

[0mSome common interop cases of using Node.js streams with async generators[0m
[0mand async iterators are provided below.[0m

[32m[1m#### Consuming Readable Streams with Async Iterators[22m[39m

    [90m([39m[37masync[39m [94mfunction[39m[90m([39m[90m)[39m [33m{[39m
      [94mfor[39m [37mawait[39m [90m([39m[94mconst[39m [37mchunk[39m [37mof[39m [37mreadable[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mchunk[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[0mAsync iterators register a permanent error handler on the stream to prevent any[0m
[0munhandled post-destroy errors.[0m

[32m[1m#### Creating Readable Streams with Async Generators[22m[39m

[0mWe can construct a Node.js Readable Stream from an asynchronous generator[0m
[0musing the [33mReadable.from()[39m utility method:[0m

    [94mconst[39m [33m{[39m [37mReadable[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [93m*[39m [37mgenerate[39m[90m([39m[90m)[39m [33m{[39m
      [94myield[39m [92m'a'[39m[90m;[39m
      [94myield[39m [92m'b'[39m[90m;[39m
      [94myield[39m [92m'c'[39m[90m;[39m
    [33m}[39m
    
    [94mconst[39m [37mreadable[39m [93m=[39m [37mReadable[39m[32m.[39m[37mfrom[39m[90m([39m[37mgenerate[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    
    [37mreadable[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mchunk[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Piping to Writable Streams from Async Iterators[22m[39m

[0mIn the scenario of writing to a writable stream from an async iterator, ensure[0m
[0mthe correct handling of backpressure and errors.[0m

    [94mconst[39m [33m{[39m [37monce[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfinished[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mstream[39m[32m.[39m[37mfinished[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mwritable[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'./file'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mdrain[39m[90m([39m[37mwritable[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[37mwritable[39m[32m.[39m[37mdestroyed[39m[90m)[39m [33m{[39m
        [31mreturn[39m [37mPromise[39m[32m.[39m[37mreject[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'premature close'[39m[90m)[39m[90m)[39m[90m;[39m
      [33m}[39m
      [31mreturn[39m [37mPromise[39m[32m.[39m[37mrace[39m[90m([39m[33m[[39m
        [37monce[39m[90m([39m[37mwritable[39m[32m,[39m [92m'drain'[39m[90m)[39m[32m,[39m
        [37monce[39m[90m([39m[37mwritable[39m[32m,[39m [92m'close'[39m[90m)[39m
          [32m.[39m[37mthen[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [37mPromise[39m[32m.[39m[37mreject[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'premature close'[39m[90m)[39m[90m)[39m[90m)[39m
      [33m][39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37masync[39m [94mfunction[39m [37mpump[39m[90m([39m[37miterable[39m[32m,[39m [37mwritable[39m[90m)[39m [33m{[39m
      [94mfor[39m [37mawait[39m [90m([39m[94mconst[39m [37mchunk[39m [37mof[39m [37miterable[39m[90m)[39m [33m{[39m
        [90m// Handle backpressure on write().[39m
        [94mif[39m [90m([39m[93m![39m[37mwritable[39m[32m.[39m[37mwrite[39m[90m([39m[37mchunk[39m[90m)[39m[90m)[39m [33m{[39m
          [37mawait[39m [37mdrain[39m[90m([39m[37mwritable[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
      [37mwritable[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [90m([39m[37masync[39m [94mfunction[39m[90m([39m[90m)[39m [33m{[39m
      [90m// Ensure completion without errors.[39m
      [37mawait[39m [37mPromise[39m[32m.[39m[37mall[39m[90m([39m[33m[[39m
        [37mpump[39m[90m([39m[37miterable[39m[32m,[39m [37mwritable[39m[90m)[39m[32m,[39m
        [37mfinished[39m[90m([39m[37mwritable[39m[90m)[39m
      [33m][39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[0mIn the above, errors on [33mwrite()[39m would be caught and thrown by the[0m
[0m[33monce()[39m listener for the [33m'drain'[39m event, since [33monce()[39m will also handle the[0m
[0m[33m'error'[39m event. To ensure completion of the write stream without errors,[0m
[0mit is safer to use the [33mfinished()[39m method as above, instead of using the[0m
[0m[33monce()[39m listener for the [33m'finish'[39m event. Under certain cases, an [33m'error'[39m[0m
[0mevent could be emitted by the writable stream after [33m'finish'[39m and as [33monce()[39m[0m
[0mwill release the [33m'error'[39m handler on handling the [33m'finish'[39m event, it could[0m
[0mresult in an unhandled error.[0m

[0mAlternatively, the readable stream could be wrapped with [33mReadable.from()[39m and[0m
[0mthen piped via [33m.pipe()[39m:[0m

    [94mconst[39m [37mfinished[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mstream[39m[32m.[39m[37mfinished[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mwritable[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'./file'[39m[90m)[39m[90m;[39m
    
    [90m([39m[37masync[39m [94mfunction[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [37mreadable[39m [93m=[39m [37mReadable[39m[32m.[39m[37mfrom[39m[90m([39m[37miterable[39m[90m)[39m[90m;[39m
      [37mreadable[39m[32m.[39m[37mpipe[39m[90m([39m[37mwritable[39m[90m)[39m[90m;[39m
      [90m// Ensure completion without errors.[39m
      [37mawait[39m [37mfinished[39m[90m([39m[37mwritable[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[0mOr, using [33mstream.pipeline()[39m to pipe streams:[0m

    [94mconst[39m [37mpipeline[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mstream[39m[32m.[39m[37mpipeline[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mwritable[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'./file'[39m[90m)[39m[90m;[39m
    
    [90m([39m[37masync[39m [94mfunction[39m[90m([39m[90m)[39m [33m{[39m
      [37mawait[39m [37mpipeline[39m[90m([39m[37miterable[39m[32m,[39m [37mwritable[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[32m[1m### Compatibility with Older Node.js Versions[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mPrior to Node.js 0.10, the [33mReadable[39m stream interface was simpler, but also[0m
[0mless powerful and less useful.[0m

    * [0mRather than waiting for calls to the [34m[33mstream.read()[39m[34m ([34m[4m#stream_readable_read_size[24m[39m[34m)[39m method,[0m
      [0m[34m[33m'data'[39m[34m ([34m[4m#stream_event_data[24m[39m[34m)[39m events would begin emitting immediately. Applications that[0m
      [0mwould need to perform some amount of work to decide how to handle data[0m
      [0mwere required to store read data into buffers so the data would not be lost.[0m
    * [0mThe [34m[33mstream.pause()[39m[34m ([34m[4m#stream_readable_pause[24m[39m[34m)[39m method was advisory, rather than[0m
      [0mguaranteed. This meant that it was still necessary to be prepared to receive[0m
      [0m[34m[33m'data'[39m[34m ([34m[4m#stream_event_data[24m[39m[34m)[39m events [3meven when the stream was in a paused state[23m.[0m

[0mIn Node.js 0.10, the [34m[33mReadable[39m[34m ([34m[4m#stream_class_stream_readable[24m[39m[34m)[39m class was added. For backward[0m
[0mcompatibility with older Node.js programs, [33mReadable[39m streams switch into[0m
[0m"flowing mode" when a [34m[33m'data'[39m[34m ([34m[4m#stream_event_data[24m[39m[34m)[39m event handler is added, or when the[0m
[0m[34m[33mstream.resume()[39m[34m ([34m[4m#stream_readable_resume[24m[39m[34m)[39m method is called. The effect is that, even[0m
[0mwhen not using the new [34m[33mstream.read()[39m[34m ([34m[4m#stream_readable_read_size[24m[39m[34m)[39m method and[0m
[0m[34m[33m'readable'[39m[34m ([34m[4m#stream_event_readable[24m[39m[34m)[39m event, it is no longer necessary to worry about losing[0m
[0m[34m[33m'data'[39m[34m ([34m[4m#stream_event_data[24m[39m[34m)[39m chunks.[0m

[0mWhile most applications will continue to function normally, this introduces an[0m
[0medge case in the following conditions:[0m

    * [0mNo [34m[33m'data'[39m[34m ([34m[4m#stream_event_data[24m[39m[34m)[39m event listener is added.[0m
    * [0mThe [34m[33mstream.resume()[39m[34m ([34m[4m#stream_readable_resume[24m[39m[34m)[39m method is never called.[0m
    * [0mThe stream is not piped to any writable destination.[0m

[0mFor example, consider the following code:[0m

    [90m// WARNING!  BROKEN![39m
    [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
    
      [90m// We add an 'end' listener, but never consume the data.[39m
      [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// It will never get here.[39m
        [37msocket[39m[32m.[39m[37mend[39m[90m([39m[92m'The message was received but was not processed.\n'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[90m)[39m[90m;[39m

[0mPrior to Node.js 0.10, the incoming message data would be simply discarded.[0m
[0mHowever, in Node.js 0.10 and beyond, the socket remains paused forever.[0m

[0mThe workaround in this situation is to call the[0m
[0m[34m[33mstream.resume()[39m[34m ([34m[4m#stream_readable_resume[24m[39m[34m)[39m method to begin the flow of data:[0m

    [90m// Workaround.[39m
    [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37msocket[39m[32m.[39m[37mend[39m[90m([39m[92m'The message was received but was not processed.\n'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [90m// Start the flow of data, discarding it.[39m
      [37msocket[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[90m)[39m[90m;[39m

[0mIn addition to new [33mReadable[39m streams switching into flowing mode,[0m
[0mpre-0.10 style streams can be wrapped in a [33mReadable[39m class using the[0m
[0m[34m[33mreadable.wrap()[39m[34m ([34m[4m#stream_readable_wrap_stream[24m[39m[34m)[39m method.[0m

[32m[1m### [33mreadable.read(0)[39m[32m[22m[39m

[0mThere are some cases where it is necessary to trigger a refresh of the[0m
[0munderlying readable stream mechanisms, without actually consuming any[0m
[0mdata. In such cases, it is possible to call [33mreadable.read(0)[39m, which will[0m
[0malways return [33mnull[39m.[0m

[0mIf the internal read buffer is below the [33mhighWaterMark[39m, and the[0m
[0mstream is not currently reading, then calling [33mstream.read(0)[39m will trigger[0m
[0ma low-level [34m[33mstream._read()[39m[34m ([34m[4m#stream_readable_read_size_1[24m[39m[34m)[39m call.[0m

[0mWhile most applications will almost never need to do this, there are[0m
[0msituations within Node.js where this is done, particularly in the[0m
[0m[33mReadable[39m stream class internals.[0m

[32m[1m### [33mreadable.push('')[39m[32m[22m[39m

[0mUse of [33mreadable.push('')[39m is not recommended.[0m

[0mPushing a zero-byte string, [33mBuffer[39m or [33mUint8Array[39m to a stream that is not in[0m
[0mobject mode has an interesting side effect. Because it [3mis[23m a call to[0m
[0m[34m[33mreadable.push()[39m[34m ([34m[4m#stream_readable_push_chunk_encoding[24m[39m[34m)[39m, the call will end the reading process.[0m
[0mHowever, because the argument is an empty string, no data is added to the[0m
[0mreadable buffer so there is nothing for a user to consume.[0m

[32m[1m### [33mhighWaterMark[39m[32m discrepancy after calling [33mreadable.setEncoding()[39m[32m[22m[39m

[0mThe use of [33mreadable.setEncoding()[39m will change the behavior of how the[0m
[0m[33mhighWaterMark[39m operates in non-object mode.[0m

[0mTypically, the size of the current buffer is measured against the[0m
[0m[33mhighWaterMark[39m in [3mbytes[23m. However, after [33msetEncoding()[39m is called, the[0m
[0mcomparison function will begin to measure the buffer's size in [3mcharacters[23m.[0m

[0mThis is not a problem in common cases with [33mlatin1[39m or [33mascii[39m. But it is[0m
[0madvised to be mindful about this behavior when working with strings that could[0m
[0mcontain multi-byte characters.[0m

