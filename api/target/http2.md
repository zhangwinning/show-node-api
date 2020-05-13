[35m[4m[1m# HTTP/2[22m[24m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22466[39m
[90m    description: HTTP/2 is now Stable. Previously, it had been Experimental.[39m
[90m-->[39m
[90m[39m[90m<!--introduced_in=v8.4.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mhttp2[39m module provides an implementation of the [HTTP/2][] protocol. It[0m
[0mcan be accessed using:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m

[32m[1m## Core API[22m[39m

[0mThe Core API provides a low-level interface designed specifically around[0m
[0msupport for HTTP/2 protocol features. It is specifically [3mnot[23m designed for[0m
[0mcompatibility with the existing [HTTP/1][] module API. However,[0m
[0mthe [Compatibility API][] is.[0m

[0mThe [33mhttp2[39m Core API is much more symmetric between client and server than the[0m
[0m[33mhttp[39m API. For instance, most events, like [33m'error'[39m, [33m'connect'[39m and[0m
[0m[33m'stream'[39m, can be emitted either by client-side code or server-side code.[0m

[32m[1m### Server-side example[22m[39m

[0mThe following illustrates a simple HTTP/2 server using the Core API.[0m
[0mSince there are no browsers known that support[0m
[0m[unencrypted HTTP/2][HTTP/2 Unencrypted], the use of[0m
[0m[[33mhttp2.createSecureServer()[39m][] is necessary when communicating[0m
[0mwith browser clients.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateSecureServer[39m[90m([39m[33m{[39m
      [37mkey[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'localhost-privkey.pem'[39m[90m)[39m[32m,[39m
      [37mcert[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'localhost-cert.pem'[39m[90m)[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37merr[39m[90m)[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[32m,[39m [37mheaders[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// stream is a Duplex[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m
        [32m'content-type'[39m[93m:[39m [92m'text/html'[39m[32m,[39m
        [32m':status'[39m[93m:[39m [34m200[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'<h1>Hello World</h1>'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m8443[39m[90m)[39m[90m;[39m

[0mTo generate the certificate and key for this example, run:[0m

    [33mopenssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \[39m
    [33m  -keyout localhost-privkey.pem -out localhost-cert.pem[39m

[32m[1m### Client-side example[22m[39m

[0mThe following illustrates an HTTP/2 client:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'https://localhost:8443'[39m[32m,[39m [33m{[39m
      [37mca[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'localhost-cert.pem'[39m[90m)[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mclient[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37merr[39m[90m)[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mreq[39m [93m=[39m [37mclient[39m[32m.[39m[37mrequest[39m[90m([39m[33m{[39m [32m':path'[39m[93m:[39m [92m'/'[39m [33m}[39m[90m)[39m[90m;[39m
    
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'response'[39m[32m,[39m [90m([39m[37mheaders[39m[32m,[39m [37mflags[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mfor[39m [90m([39m[94mconst[39m [37mname[39m [94min[39m [37mheaders[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mname[39m}: ${[37mheaders[39m[33m[[39m[37mname[39m[33m][39m}`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mreq[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
    [94mlet[39m [37mdata[39m [93m=[39m [92m''[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m [37mdata[39m [93m+=[39m [37mchunk[39m[90m;[39m [33m}[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`\n${[37mdata[39m}`[90m)[39m[90m;[39m
      [37mclient[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### Class: [33mHttp2Session[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {EventEmitter}[0m

[0mInstances of the [33mhttp2.Http2Session[39m class represent an active communications[0m
[0msession between an HTTP/2 client and server. Instances of this class are [3mnot[23m[0m
[0mintended to be constructed directly by user code.[0m

[0mEach [33mHttp2Session[39m instance will exhibit slightly different behaviors[0m
[0mdepending on whether it is operating as a server or a client. The[0m
[0m[33mhttp2session.type[39m property can be used to determine the mode in which an[0m
[0m[33mHttp2Session[39m is operating. On the server side, user code should rarely[0m
[0mhave occasion to work with the [33mHttp2Session[39m object directly, with most[0m
[0mactions typically taken through interactions with either the [33mHttp2Server[39m or[0m
[0m[33mHttp2Stream[39m objects.[0m

[0mUser code will not create [33mHttp2Session[39m instances directly. Server-side[0m
[0m[33mHttp2Session[39m instances are created by the [33mHttp2Server[39m instance when a[0m
[0mnew HTTP/2 connection is received. Client-side [33mHttp2Session[39m instances are[0m
[0mcreated using the [33mhttp2.connect()[39m method.[0m

[32m[1m#### [33mHttp2Session[39m[32m and Sockets[22m[39m

[0mEvery [33mHttp2Session[39m instance is associated with exactly one [[33mnet.Socket[39m][] or[0m
[0m[[33mtls.TLSSocket[39m][] when it is created. When either the [33mSocket[39m or the[0m
[0m[33mHttp2Session[39m are destroyed, both will be destroyed.[0m

[0mBecause of the specific serialization and processing requirements imposed[0m
[0mby the HTTP/2 protocol, it is not recommended for user code to read data from[0m
[0mor write data to a [33mSocket[39m instance bound to a [33mHttp2Session[39m. Doing so can[0m
[0mput the HTTP/2 session into an indeterminate state causing the session and[0m
[0mthe socket to become unusable.[0m

[0mOnce a [33mSocket[39m has been bound to an [33mHttp2Session[39m, user code should rely[0m
[0msolely on the API of the [33mHttp2Session[39m.[0m

[32m[1m#### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'close'[39m event is emitted once the [33mHttp2Session[39m has been destroyed. Its[0m
[0mlistener does not expect any arguments.[0m

[32m[1m#### Event: [33m'connect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msession[39m {Http2Session}[0m
    * [0m[33msocket[39m {net.Socket}[0m

[0mThe [33m'connect'[39m event is emitted once the [33mHttp2Session[39m has been successfully[0m
[0mconnected to the remote peer and communication may begin.[0m

[0mUser code will typically not listen for this event directly.[0m

[32m[1m#### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merror[39m {Error}[0m

[0mThe [33m'error'[39m event is emitted when an error occurs during the processing of[0m
[0man [33mHttp2Session[39m.[0m

[32m[1m#### Event: [33m'frameError'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtype[39m {integer} The frame type.[0m
    * [0m[33mcode[39m {integer} The error code.[0m
    * [0m[33mid[39m {integer} The stream id (or [33m0[39m if the frame isn't associated with a[0m
      [0mstream).[0m

[0mThe [33m'frameError'[39m event is emitted when an error occurs while attempting to[0m
[0msend a frame on the session. If the frame that could not be sent is associated[0m
[0mwith a specific [33mHttp2Stream[39m, an attempt to emit a [33m'frameError'[39m event on the[0m
[0m[33mHttp2Stream[39m is made.[0m

[0mIf the [33m'frameError'[39m event is associated with a stream, the stream will be[0m
[0mclosed and destroyed immediately following the [33m'frameError'[39m event. If the[0m
[0mevent is not associated with a stream, the [33mHttp2Session[39m will be shut down[0m
[0mimmediately following the [33m'frameError'[39m event.[0m

[32m[1m#### Event: [33m'goaway'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merrorCode[39m {number} The HTTP/2 error code specified in the [33mGOAWAY[39m frame.[0m
    * [0m[33mlastStreamID[39m {number} The ID of the last stream the remote peer successfully[0m
      [0mprocessed (or [33m0[39m if no ID is specified).[0m
    * [0m[33mopaqueData[39m {Buffer} If additional opaque data was included in the [33mGOAWAY[39m[0m
      [0mframe, a [33mBuffer[39m instance will be passed containing that data.[0m

[0mThe [33m'goaway'[39m event is emitted when a [33mGOAWAY[39m frame is received.[0m

[0mThe [33mHttp2Session[39m instance will be shut down automatically when the [33m'goaway'[39m[0m
[0mevent is emitted.[0m

[32m[1m#### Event: [33m'localSettings'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msettings[39m {HTTP/2 Settings Object} A copy of the [33mSETTINGS[39m frame received.[0m

[0mThe [33m'localSettings'[39m event is emitted when an acknowledgment [33mSETTINGS[39m frame[0m
[0mhas been received.[0m

[0mWhen using [33mhttp2session.settings()[39m to submit new settings, the modified[0m
[0msettings do not take effect until the [33m'localSettings'[39m event is emitted.[0m

    [37msession[39m[32m.[39m[37msettings[39m[90m([39m[33m{[39m [37menablePush[39m[93m:[39m [91mfalse[39m [33m}[39m[90m)[39m[90m;[39m
    
    [37msession[39m[32m.[39m[37mon[39m[90m([39m[92m'localSettings'[39m[32m,[39m [90m([39m[37msettings[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m/* Use the new settings */[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Event: [33m'ping'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpayload[39m {Buffer} The [33mPING[39m frame 8-byte payload[0m

[0mThe [33m'ping'[39m event is emitted whenever a [33mPING[39m frame is received from the[0m
[0mconnected peer.[0m

[32m[1m#### Event: [33m'remoteSettings'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msettings[39m {HTTP/2 Settings Object} A copy of the [33mSETTINGS[39m frame received.[0m

[0mThe [33m'remoteSettings'[39m event is emitted when a new [33mSETTINGS[39m frame is received[0m
[0mfrom the connected peer.[0m

    [37msession[39m[32m.[39m[37mon[39m[90m([39m[92m'remoteSettings'[39m[32m,[39m [90m([39m[37msettings[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m/* Use the new settings */[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Event: [33m'stream'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstream[39m {Http2Stream} A reference to the stream[0m
    * [0m[33mheaders[39m {HTTP/2 Headers Object} An object describing the headers[0m
    * [0m[33mflags[39m {number} The associated numeric flags[0m
    * [0m[33mrawHeaders[39m {Array} An array containing the raw header names followed by[0m
      [0mtheir respective values.[0m

[0mThe [33m'stream'[39m event is emitted when a new [33mHttp2Stream[39m is created.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [37msession[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[32m,[39m [37mheaders[39m[32m,[39m [37mflags[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mmethod[39m [93m=[39m [37mheaders[39m[33m[[39m[92m':method'[39m[33m][39m[90m;[39m
      [94mconst[39m [37mpath[39m [93m=[39m [37mheaders[39m[33m[[39m[92m':path'[39m[33m][39m[90m;[39m
      [90m// ...[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m
        [32m':status'[39m[93m:[39m [34m200[39m[32m,[39m
        [32m'content-type'[39m[93m:[39m [92m'text/plain'[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'hello '[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'world'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOn the server side, user code will typically not listen for this event directly,[0m
[0mand would instead register a handler for the [33m'stream'[39m event emitted by the[0m
[0m[33mnet.Server[39m or [33mtls.Server[39m instances returned by [33mhttp2.createServer()[39m and[0m
[0m[33mhttp2.createSecureServer()[39m, respectively, as in the example below:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    
    [90m// Create an unencrypted HTTP/2 server[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[32m,[39m [37mheaders[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m
        [32m'content-type'[39m[93m:[39m [92m'text/html'[39m[32m,[39m
        [32m':status'[39m[93m:[39m [34m200[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[91merror[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[91merror[39m[90m)[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'<h1>Hello World</h1>'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m80[39m[90m)[39m[90m;[39m

[0mEven though HTTP/2 streams and network sockets are not in a 1:1 correspondence,[0m
[0ma network error will destroy each individual stream and must be handled on the[0m
[0mstream level, as shown above.[0m

[32m[1m#### Event: [33m'timeout'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAfter the [33mhttp2session.setTimeout()[39m method is used to set the timeout period[0m
[0mfor this [33mHttp2Session[39m, the [33m'timeout'[39m event is emitted if there is no[0m
[0mactivity on the [33mHttp2Session[39m after the configured number of milliseconds.[0m
[0mIts listener does not expect any arguments.[0m

    [37msession[39m[32m.[39m[37msetTimeout[39m[90m([39m[34m2000[39m[90m)[39m[90m;[39m
    [37msession[39m[32m.[39m[37mon[39m[90m([39m[92m'timeout'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m [90m/* .. */[39m [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### [33mhttp2session.alpnProtocol[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string|undefined}[0m

[0mValue will be [33mundefined[39m if the [33mHttp2Session[39m is not yet connected to a[0m
[0msocket, [33mh2c[39m if the [33mHttp2Session[39m is not connected to a [33mTLSSocket[39m, or[0m
[0mwill return the value of the connected [33mTLSSocket[39m's own [33malpnProtocol[39m[0m
[0mproperty.[0m

[32m[1m#### [33mhttp2session.close([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m

[0mGracefully closes the [33mHttp2Session[39m, allowing any existing streams to[0m
[0mcomplete on their own and preventing new [33mHttp2Stream[39m instances from being[0m
[0mcreated. Once closed, [33mhttp2session.destroy()[39m [3mmight[23m be called if there[0m
[0mare no open [33mHttp2Stream[39m instances.[0m

[0mIf specified, the [33mcallback[39m function is registered as a handler for the[0m
[0m[33m'close'[39m event.[0m

[32m[1m#### [33mhttp2session.closed[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mWill be [33mtrue[39m if this [33mHttp2Session[39m instance has been closed, otherwise[0m
[0m[33mfalse[39m.[0m

[32m[1m#### [33mhttp2session.connecting[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mWill be [33mtrue[39m if this [33mHttp2Session[39m instance is still connecting, will be set[0m
[0mto [33mfalse[39m before emitting [33mconnect[39m event and/or calling the [33mhttp2.connect[39m[0m
[0mcallback.[0m

[32m[1m#### [33mhttp2session.destroy([error][, code])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merror[39m {Error} An [33mError[39m object if the [33mHttp2Session[39m is being destroyed[0m
      [0mdue to an error.[0m
    * [0m[33mcode[39m {number} The HTTP/2 error code to send in the final [33mGOAWAY[39m frame.[0m
      [0mIf unspecified, and [33merror[39m is not undefined, the default is [33mINTERNAL_ERROR[39m,[0m
      [0motherwise defaults to [33mNO_ERROR[39m.[0m

[0mImmediately terminates the [33mHttp2Session[39m and the associated [33mnet.Socket[39m or[0m
[0m[33mtls.TLSSocket[39m.[0m

[0mOnce destroyed, the [33mHttp2Session[39m will emit the [33m'close'[39m event. If [33merror[39m[0m
[0mis not undefined, an [33m'error'[39m event will be emitted immediately before the[0m
[0m[33m'close'[39m event.[0m

[0mIf there are any remaining open [33mHttp2Streams[39m associated with the[0m
[0m[33mHttp2Session[39m, those will also be destroyed.[0m

[32m[1m#### [33mhttp2session.destroyed[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mWill be [33mtrue[39m if this [33mHttp2Session[39m instance has been destroyed and must no[0m
[0mlonger be used, otherwise [33mfalse[39m.[0m

[32m[1m#### [33mhttp2session.encrypted[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean|undefined}[0m

[0mValue is [33mundefined[39m if the [33mHttp2Session[39m session socket has not yet been[0m
[0mconnected, [33mtrue[39m if the [33mHttp2Session[39m is connected with a [33mTLSSocket[39m,[0m
[0mand [33mfalse[39m if the [33mHttp2Session[39m is connected to any other kind of socket[0m
[0mor stream.[0m

[32m[1m#### [33mhttp2session.goaway([code[, lastStreamID[, opaqueData]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {number} An HTTP/2 error code[0m
    * [0m[33mlastStreamID[39m {number} The numeric ID of the last processed [33mHttp2Stream[39m[0m
    * [0m[33mopaqueData[39m {Buffer|TypedArray|DataView} A [33mTypedArray[39m or [33mDataView[39m[0m
      [0minstance containing additional data to be carried within the [33mGOAWAY[39m frame.[0m

[0mTransmits a [33mGOAWAY[39m frame to the connected peer [3mwithout[23m shutting down the[0m
[0m[33mHttp2Session[39m.[0m

[32m[1m#### [33mhttp2session.localSettings[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{HTTP/2 Settings Object}[0m

[0mA prototype-less object describing the current local settings of this[0m
[0m[33mHttp2Session[39m. The local settings are local to [3mthis[23m [33mHttp2Session[39m instance.[0m

[32m[1m#### [33mhttp2session.originSet[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]|undefined}[0m

[0mIf the [33mHttp2Session[39m is connected to a [33mTLSSocket[39m, the [33moriginSet[39m property[0m
[0mwill return an [33mArray[39m of origins for which the [33mHttp2Session[39m may be[0m
[0mconsidered authoritative.[0m

[0mThe [33moriginSet[39m property is only available when using a secure TLS connection.[0m

[32m[1m#### [33mhttp2session.pendingSettingsAck[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIndicates whether the [33mHttp2Session[39m is currently waiting for acknowledgment of[0m
[0ma sent [33mSETTINGS[39m frame. Will be [33mtrue[39m after calling the[0m
[0m[33mhttp2session.settings()[39m method. Will be [33mfalse[39m once all sent [33mSETTINGS[39m[0m
[0mframes have been acknowledged.[0m

[32m[1m#### [33mhttp2session.ping([payload, ]callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.9.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpayload[39m {Buffer|TypedArray|DataView} Optional ping payload.[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {boolean}[0m

[0mSends a [33mPING[39m frame to the connected HTTP/2 peer. A [33mcallback[39m function must[0m
[0mbe provided. The method will return [33mtrue[39m if the [33mPING[39m was sent, [33mfalse[39m[0m
[0motherwise.[0m

[0mThe maximum number of outstanding (unacknowledged) pings is determined by the[0m
[0m[33mmaxOutstandingPings[39m configuration option. The default maximum is 10.[0m

[0mIf provided, the [33mpayload[39m must be a [33mBuffer[39m, [33mTypedArray[39m, or [33mDataView[39m[0m
[0mcontaining 8 bytes of data that will be transmitted with the [33mPING[39m and[0m
[0mreturned with the ping acknowledgment.[0m

[0mThe callback will be invoked with three arguments: an error argument that will[0m
[0mbe [33mnull[39m if the [33mPING[39m was successfully acknowledged, a [33mduration[39m argument[0m
[0mthat reports the number of milliseconds elapsed since the ping was sent and the[0m
[0macknowledgment was received, and a [33mBuffer[39m containing the 8-byte [33mPING[39m[0m
[0mpayload.[0m

    [37msession[39m[32m.[39m[37mping[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'abcdefgh'[39m[90m)[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mduration[39m[32m,[39m [37mpayload[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[93m![39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Ping acknowledged in ${[37mduration[39m} milliseconds`[90m)[39m[90m;[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`With payload '${[37mpayload[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m}'`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf the [33mpayload[39m argument is not specified, the default payload will be the[0m
[0m64-bit timestamp (little endian) marking the start of the [33mPING[39m duration.[0m

[32m[1m#### [33mhttp2session.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCalls [[33mref()[39m][[33mnet.Socket.prototype.ref()[39m] on this [33mHttp2Session[39m[0m
[0minstance's underlying [[33mnet.Socket[39m][].[0m

[32m[1m#### [33mhttp2session.remoteSettings[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{HTTP/2 Settings Object}[0m

[0mA prototype-less object describing the current remote settings of this[0m
[0m[33mHttp2Session[39m. The remote settings are set by the [3mconnected[23m HTTP/2 peer.[0m

[32m[1m#### [33mhttp2session.setTimeout(msecs, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number}[0m
    * [0m[33mcallback[39m {Function}[0m

[0mUsed to set a callback function that is called when there is no activity on[0m
[0mthe [33mHttp2Session[39m after [33mmsecs[39m milliseconds. The given [33mcallback[39m is[0m
[0mregistered as a listener on the [33m'timeout'[39m event.[0m

[32m[1m#### [33mhttp2session.socket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{net.Socket|tls.TLSSocket}[0m

[0mReturns a [33mProxy[39m object that acts as a [33mnet.Socket[39m (or [33mtls.TLSSocket[39m) but[0m
[0mlimits available methods to ones safe to use with HTTP/2.[0m

[0m[33mdestroy[39m, [33memit[39m, [33mend[39m, [33mpause[39m, [33mread[39m, [33mresume[39m, and [33mwrite[39m will throw[0m
[0man error with code [33mERR_HTTP2_NO_SOCKET_MANIPULATION[39m. See[0m
[0m[[33mHttp2Session[39m and Sockets][] for more information.[0m

[0m[33msetTimeout[39m method will be called on this [33mHttp2Session[39m.[0m

[0mAll other interactions will be routed directly to the socket.[0m

[32m[1m#### [33mhttp2session.state[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mProvides miscellaneous information about the current state of the[0m
[0m[33mHttp2Session[39m.[0m

    * [0m{Object}
        * [0m[0m[33meffectiveLocalWindowSize[39m {number} The current local (receive)[0m[0m[0m
      [0m      [0m[0mflow control window size for the [33mHttp2Session[39m.[0m[0m[0m
      [0m
        * [0m[0m[33meffectiveRecvDataLength[39m {number} The current number of bytes[0m[0m[0m
      [0m      [0m[0mthat have been received since the last flow control [33mWINDOW_UPDATE[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mnextStreamID[39m {number} The numeric identifier to be used the[0m[0m[0m
      [0m      [0m[0mnext time a new [33mHttp2Stream[39m is created by this [33mHttp2Session[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mlocalWindowSize[39m {number} The number of bytes that the remote peer can[0m[0m[0m
      [0m      [0m[0msend without receiving a [33mWINDOW_UPDATE[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mlastProcStreamID[39m {number} The numeric id of the [33mHttp2Stream[39m[0m[0m[0m
      [0m      [0m[0mfor which a [33mHEADERS[39m or [33mDATA[39m frame was most recently received.[0m[0m[0m
      [0m
        * [0m[0m[33mremoteWindowSize[39m {number} The number of bytes that this [33mHttp2Session[39m[0m[0m[0m
      [0m      [0m[0mmay send without receiving a [33mWINDOW_UPDATE[39m.[0m[0m[0m
      [0m
        * [0m[0m[33moutboundQueueSize[39m {number} The number of frames currently within the[0m[0m[0m
      [0m      [0m[0moutbound queue for this [33mHttp2Session[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mdeflateDynamicTableSize[39m {number} The current size in bytes of the[0m[0m[0m
      [0m      [0m[0moutbound header compression state table.[0m[0m[0m
      [0m
        * [0m[0m[33minflateDynamicTableSize[39m {number} The current size in bytes of the[0m[0m[0m
      [0m      [0m[0minbound header compression state table.[0m[0m[0m

[0mAn object describing the current status of this [33mHttp2Session[39m.[0m

[32m[1m#### [33mhttp2session.settings([settings][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msettings[39m {HTTP/2 Settings Object}[0m
    * [0m[33mcallback[39m {Function} Callback that is called once the session is connected or[0m
      [0mright away if the session is already connected.
        * [0m[0m[33merr[39m {Error|null}[0m[0m[0m
      [0m
        * [0m[0m[33msettings[39m {HTTP/2 Settings Object} The updated [33msettings[39m object.[0m[0m[0m
      [0m
        * [0m[0m[33mduration[39m {integer}[0m[0m[0m

[0mUpdates the current local settings for this [33mHttp2Session[39m and sends a new[0m
[0m[33mSETTINGS[39m frame to the connected HTTP/2 peer.[0m

[0mOnce called, the [33mhttp2session.pendingSettingsAck[39m property will be [33mtrue[39m[0m
[0mwhile the session is waiting for the remote peer to acknowledge the new[0m
[0msettings.[0m

[0mThe new settings will not become effective until the [33mSETTINGS[39m acknowledgment[0m
[0mis received and the [33m'localSettings'[39m event is emitted. It is possible to send[0m
[0mmultiple [33mSETTINGS[39m frames while acknowledgment is still pending.[0m

[32m[1m#### [33mhttp2session.type[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe [33mhttp2session.type[39m will be equal to[0m
[0m[33mhttp2.constants.NGHTTP2_SESSION_SERVER[39m if this [33mHttp2Session[39m instance is a[0m
[0mserver, and [33mhttp2.constants.NGHTTP2_SESSION_CLIENT[39m if the instance is a[0m
[0mclient.[0m

[32m[1m#### [33mhttp2session.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCalls [[33munref()[39m][[33mnet.Socket.prototype.unref()[39m] on this [33mHttp2Session[39m[0m
[0minstance's underlying [[33mnet.Socket[39m][].[0m

[32m[1m### Class: [33mServerHttp2Session[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {Http2Session}[0m

[32m[1m#### [33mserverhttp2session.altsvc(alt, originOrStream)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33malt[39m {string} A description of the alternative service configuration as[0m
      [0mdefined by [RFC 7838][].[0m
    * [0m[33moriginOrStream[39m {number|string|URL|Object} Either a URL string specifying[0m
      [0mthe origin (or an [33mObject[39m with an [33morigin[39m property) or the numeric[0m
      [0midentifier of an active [33mHttp2Stream[39m as given by the [33mhttp2stream.id[39m[0m
      [0mproperty.[0m

[0mSubmits an [33mALTSVC[39m frame (as defined by [RFC 7838][]) to the connected client.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'session'[39m[32m,[39m [90m([39m[37msession[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Set altsvc for origin https://example.org:80[39m
      [37msession[39m[32m.[39m[37maltsvc[39m[90m([39m[92m'h2=":8000"'[39m[32m,[39m [92m'https://example.org:80'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Set altsvc for a specific stream[39m
      [37mstream[39m[32m.[39m[37msession[39m[32m.[39m[37maltsvc[39m[90m([39m[92m'h2=":8000"'[39m[32m,[39m [37mstream[39m[32m.[39m[37mid[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mSending an [33mALTSVC[39m frame with a specific stream ID indicates that the alternate[0m
[0mservice is associated with the origin of the given [33mHttp2Stream[39m.[0m

[0mThe [33malt[39m and origin string [3mmust[23m contain only ASCII bytes and are[0m
[0mstrictly interpreted as a sequence of ASCII bytes. The special value [33m'clear'[39m[0m
[0mmay be passed to clear any previously set alternative service for a given[0m
[0mdomain.[0m

[0mWhen a string is passed for the [33moriginOrStream[39m argument, it will be parsed as[0m
[0ma URL and the origin will be derived. For instance, the origin for the[0m
[0mHTTP URL [33m'https://example.org/foo/bar'[39m is the ASCII string[0m
[0m[33m'https://example.org'[39m. An error will be thrown if either the given string[0m
[0mcannot be parsed as a URL or if a valid origin cannot be derived.[0m

[0mA [33mURL[39m object, or any object with an [33morigin[39m property, may be passed as[0m
[0m[33moriginOrStream[39m, in which case the value of the [33morigin[39m property will be[0m
[0mused. The value of the [33morigin[39m property [3mmust[23m be a properly serialized[0m
[0mASCII origin.[0m

[32m[1m#### Specifying alternative services[22m[39m

[0mThe format of the [33malt[39m parameter is strictly defined by [RFC 7838][] as an[0m
[0mASCII string containing a comma-delimited list of "alternative" protocols[0m
[0massociated with a specific host and port.[0m

[0mFor example, the value [33m'h2="example.org:81"'[39m indicates that the HTTP/2[0m
[0mprotocol is available on the host [33m'example.org'[39m on TCP/IP port 81. The[0m
[0mhost and port [3mmust[23m be contained within the quote ([33m"[39m) characters.[0m

[0mMultiple alternatives may be specified, for instance: [33m'h2="example.org:81",[39m[0m
[0m[33mh2=":82"'[39m.[0m

[0mThe protocol identifier ([33m'h2'[39m in the examples) may be any valid[0m
[0m[ALPN Protocol ID][].[0m

[0mThe syntax of these values is not validated by the Node.js implementation and[0m
[0mare passed through as provided by the user or received from the peer.[0m

[32m[1m#### [33mserverhttp2session.origin(...origins)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33morigins[39m { string | URL | Object } One or more URL Strings passed as[0m
      [0mseparate arguments.[0m

[0mSubmits an [33mORIGIN[39m frame (as defined by [RFC 8336][]) to the connected client[0m
[0mto advertise the set of origins for which the server is capable of providing[0m
[0mauthoritative responses.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37moptions[39m [93m=[39m [37mgetSecureOptionsSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateSecureServer[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'ok'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'session'[39m[32m,[39m [90m([39m[37msession[39m[90m)[39m [93m=>[39m [33m{[39m
      [37msession[39m[32m.[39m[37morigin[39m[90m([39m[92m'https://example.com'[39m[32m,[39m [92m'https://example.org'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mWhen a string is passed as an [33morigin[39m, it will be parsed as a URL and the[0m
[0morigin will be derived. For instance, the origin for the HTTP URL[0m
[0m[33m'https://example.org/foo/bar'[39m is the ASCII string[0m
[0m[33m'https://example.org'[39m. An error will be thrown if either the given string[0m
[0mcannot be parsed as a URL or if a valid origin cannot be derived.[0m

[0mA [33mURL[39m object, or any object with an [33morigin[39m property, may be passed as[0m
[0man [33morigin[39m, in which case the value of the [33morigin[39m property will be[0m
[0mused. The value of the [33morigin[39m property [3mmust[23m be a properly serialized[0m
[0mASCII origin.[0m

[0mAlternatively, the [33morigins[39m option may be used when creating a new HTTP/2[0m
[0mserver using the [33mhttp2.createSecureServer()[39m method:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37moptions[39m [93m=[39m [37mgetSecureOptionsSomehow[39m[90m([39m[90m)[39m[90m;[39m
    [37moptions[39m[32m.[39m[37morigins[39m [93m=[39m [33m[[39m[92m'https://example.com'[39m[32m,[39m [92m'https://example.org'[39m[33m][39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateSecureServer[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'ok'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Class: [33mClientHttp2Session[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {Http2Session}[0m

[32m[1m#### Event: [33m'altsvc'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33malt[39m {string}[0m
    * [0m[33morigin[39m {string}[0m
    * [0m[33mstreamId[39m {number}[0m

[0mThe [33m'altsvc'[39m event is emitted whenever an [33mALTSVC[39m frame is received by[0m
[0mthe client. The event is emitted with the [33mALTSVC[39m value, origin, and stream[0m
[0mID. If no [33morigin[39m is provided in the [33mALTSVC[39m frame, [33morigin[39m will[0m
[0mbe an empty string.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'https://example.org'[39m[90m)[39m[90m;[39m
    
    [37mclient[39m[32m.[39m[37mon[39m[90m([39m[92m'altsvc'[39m[32m,[39m [90m([39m[37malt[39m[32m,[39m [37morigin[39m[32m,[39m [37mstreamId[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37malt[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37morigin[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mstreamId[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Event: [33m'origin'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33morigins[39m {string[]}[0m

[0mThe [33m'origin'[39m event is emitted whenever an [33mORIGIN[39m frame is received by[0m
[0mthe client. The event is emitted with an array of [33morigin[39m strings. The[0m
[0m[33mhttp2session.originSet[39m will be updated to include the received[0m
[0morigins.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'https://example.org'[39m[90m)[39m[90m;[39m
    
    [37mclient[39m[32m.[39m[37mon[39m[90m([39m[92m'origin'[39m[32m,[39m [90m([39m[37morigins[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mfor[39m [90m([39m[94mlet[39m [37mn[39m [93m=[39m [34m0[39m[90m;[39m [37mn[39m [93m<[39m [37morigins[39m[32m.[39m[37mlength[39m[90m;[39m [37mn[39m[93m++[39m[90m)[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37morigins[39m[33m[[39m[37mn[39m[33m][39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33m'origin'[39m event is only emitted when using a secure TLS connection.[0m

[32m[1m#### [33mclienthttp2session.request(headers[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[0m[0m[33mheaders[39m {HTTP/2 Headers Object}[0m[0m[0m
    * [0m[0m[0m[33moptions[39m {Object}[0m[0m[0m
      [0m[0m
      [0m
        * [0m[0m[33mendStream[39m {boolean} [33mtrue[39m if the [33mHttp2Stream[39m [3mwritable[23m side should[0m[0m[0m
      [0m      [0m[0mbe closed initially, such as when sending a [33mGET[39m request that should not[0m[0m[0m
      [0m      [0m[0mexpect a payload body.[0m[0m[0m
      [0m
        * [0m[0m[33mexclusive[39m {boolean} When [33mtrue[39m and [33mparent[39m identifies a parent Stream,[0m[0m[0m
      [0m      [0m[0mthe created stream is made the sole direct dependency of the parent, with[0m[0m[0m
      [0m      [0m[0mall other existing dependents made a dependent of the newly created stream.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mparent[39m {number} Specifies the numeric identifier of a stream the newly[0m[0m[0m
      [0m      [0m[0mcreated stream is dependent on.[0m[0m[0m
      [0m
        * [0m[0m[33mweight[39m {number} Specifies the relative dependency of a stream in relation[0m[0m[0m
      [0m      [0m[0mto other streams with the same [33mparent[39m. The value is a number between [33m1[39m[0m[0m[0m
      [0m      [0m[0mand [33m256[39m (inclusive).[0m[0m[0m
      [0m
        * [0m[0m[33mwaitForTrailers[39m {boolean} When [33mtrue[39m, the [33mHttp2Stream[39m will emit the[0m[0m[0m
      [0m      [0m[0m[33m'wantTrailers'[39m event after the final [33mDATA[39m frame has been sent.[0m[0m[0m
    * [0m[0m[0mReturns: {ClientHttp2Stream}[0m[0m[0m

[0mFor HTTP/2 Client [33mHttp2Session[39m instances only, the [33mhttp2session.request()[39m[0m
[0mcreates and returns an [33mHttp2Stream[39m instance that can be used to send an[0m
[0mHTTP/2 request to the connected server.[0m

[0mThis method is only available if [33mhttp2session.type[39m is equal to[0m
[0m[33mhttp2.constants.NGHTTP2_SESSION_CLIENT[39m.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclientSession[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'https://localhost:1234'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m
      [37mHTTP2_HEADER_PATH[39m[32m,[39m
      [37mHTTP2_HEADER_STATUS[39m
    [33m}[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconstants[39m[90m;[39m
    
    [94mconst[39m [37mreq[39m [93m=[39m [37mclientSession[39m[32m.[39m[37mrequest[39m[90m([39m[33m{[39m [33m[[39m[37mHTTP2_HEADER_PATH[39m[33m][39m[93m:[39m [92m'/'[39m [33m}[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'response'[39m[32m,[39m [90m([39m[37mheaders[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mheaders[39m[33m[[39m[37mHTTP2_HEADER_STATUS[39m[33m][39m[90m)[39m[90m;[39m
      [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m [90m/* .. */[39m [33m}[39m[90m)[39m[90m;[39m
      [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m [90m/* .. */[39m [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mWhen the [33moptions.waitForTrailers[39m option is set, the [33m'wantTrailers'[39m event[0m
[0mis emitted immediately after queuing the last chunk of payload data to be sent.[0m
[0mThe [33mhttp2stream.sendTrailers()[39m method can then be called to send trailing[0m
[0mheaders to the peer.[0m

[0mWhen [33moptions.waitForTrailers[39m is set, the [33mHttp2Stream[39m will not automatically[0m
[0mclose when the final [33mDATA[39m frame is transmitted. User code must call either[0m
[0m[33mhttp2stream.sendTrailers()[39m or [33mhttp2stream.close()[39m to close the[0m
[0m[33mHttp2Stream[39m.[0m

[0mThe [33m:method[39m and [33m:path[39m pseudo-headers are not specified within [33mheaders[39m,[0m
[0mthey respectively default to:[0m

    * [0m[33m:method[39m = [33m'GET'[39m[0m
    * [0m[33m:path[39m = [33m/[39m[0m

[32m[1m### Class: [33mHttp2Stream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {stream.Duplex}[0m

[0mEach instance of the [33mHttp2Stream[39m class represents a bidirectional HTTP/2[0m
[0mcommunications stream over an [33mHttp2Session[39m instance. Any single [33mHttp2Session[39m[0m
[0mmay have up to 2[90m<sup>[39m31[90m</sup>[39m-1 [33mHttp2Stream[39m instances over its lifetime.[0m

[0mUser code will not construct [33mHttp2Stream[39m instances directly. Rather, these[0m
[0mare created, managed, and provided to user code through the [33mHttp2Session[39m[0m
[0minstance. On the server, [33mHttp2Stream[39m instances are created either in response[0m
[0mto an incoming HTTP request (and handed off to user code via the [33m'stream'[39m[0m
[0mevent), or in response to a call to the [33mhttp2stream.pushStream()[39m method.[0m
[0mOn the client, [33mHttp2Stream[39m instances are created and returned when either the[0m
[0m[33mhttp2session.request()[39m method is called, or in response to an incoming[0m
[0m[33m'push'[39m event.[0m

[0mThe [33mHttp2Stream[39m class is a base for the [[33mServerHttp2Stream[39m][] and[0m
[0m[[33mClientHttp2Stream[39m][] classes, each of which is used specifically by either[0m
[0mthe Server or Client side, respectively.[0m

[0mAll [33mHttp2Stream[39m instances are [[33mDuplex[39m][] streams. The [33mWritable[39m side of the[0m
[0m[33mDuplex[39m is used to send data to the connected peer, while the [33mReadable[39m side[0m
[0mis used to receive data sent by the connected peer.[0m

[32m[1m#### [33mHttp2Stream[39m[32m Lifecycle[22m[39m

[32m[1m##### Creation[22m[39m

[0mOn the server side, instances of [[33mServerHttp2Stream[39m][] are created either[0m
[0mwhen:[0m

    * [0mA new HTTP/2 [33mHEADERS[39m frame with a previously unused stream ID is received;[0m
    * [0mThe [33mhttp2stream.pushStream()[39m method is called.[0m

[0mOn the client side, instances of [[33mClientHttp2Stream[39m][] are created when the[0m
[0m[33mhttp2session.request()[39m method is called.[0m

[0mOn the client, the [33mHttp2Stream[39m instance returned by [33mhttp2session.request()[39m[0m
[0mmay not be immediately ready for use if the parent [33mHttp2Session[39m has not yet[0m
[0mbeen fully established. In such cases, operations called on the [33mHttp2Stream[39m[0m
[0mwill be buffered until the [33m'ready'[39m event is emitted. User code should rarely,[0m
[0mif ever, need to handle the [33m'ready'[39m event directly. The ready status of an[0m
[0m[33mHttp2Stream[39m can be determined by checking the value of [33mhttp2stream.id[39m. If[0m
[0mthe value is [33mundefined[39m, the stream is not yet ready for use.[0m

[32m[1m##### Destruction[22m[39m

[0mAll [[33mHttp2Stream[39m][] instances are destroyed either when:[0m

    * [0mAn [33mRST_STREAM[39m frame for the stream is received by the connected peer,[0m
      [0mand pending data has been read.[0m
    * [0mThe [33mhttp2stream.close()[39m method is called, and pending data has been read.[0m
    * [0mThe [33mhttp2stream.destroy()[39m or [33mhttp2session.destroy()[39m methods are called.[0m

[0mWhen an [33mHttp2Stream[39m instance is destroyed, an attempt will be made to send an[0m
[0m[33mRST_STREAM[39m frame to the connected peer.[0m

[0mWhen the [33mHttp2Stream[39m instance is destroyed, the [33m'close'[39m event will[0m
[0mbe emitted. Because [33mHttp2Stream[39m is an instance of [33mstream.Duplex[39m, the[0m
[0m[33m'end'[39m event will also be emitted if the stream data is currently flowing.[0m
[0mThe [33m'error'[39m event may also be emitted if [33mhttp2stream.destroy()[39m was called[0m
[0mwith an [33mError[39m passed as the first argument.[0m

[0mAfter the [33mHttp2Stream[39m has been destroyed, the [33mhttp2stream.destroyed[39m[0m
[0mproperty will be [33mtrue[39m and the [33mhttp2stream.rstCode[39m property will specify the[0m
[0m[33mRST_STREAM[39m error code. The [33mHttp2Stream[39m instance is no longer usable once[0m
[0mdestroyed.[0m

[32m[1m#### Event: [33m'aborted'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'aborted'[39m event is emitted whenever a [33mHttp2Stream[39m instance is[0m
[0mabnormally aborted in mid-communication.[0m
[0mIts listener does not expect any arguments.[0m

[0mThe [33m'aborted'[39m event will only be emitted if the [33mHttp2Stream[39m writable side[0m
[0mhas not been ended.[0m

[32m[1m#### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'close'[39m event is emitted when the [33mHttp2Stream[39m is destroyed. Once[0m
[0mthis event is emitted, the [33mHttp2Stream[39m instance is no longer usable.[0m

[0mThe HTTP/2 error code used when closing the stream can be retrieved using[0m
[0mthe [33mhttp2stream.rstCode[39m property. If the code is any value other than[0m
[0m[33mNGHTTP2_NO_ERROR[39m ([33m0[39m), an [33m'error'[39m event will have also been emitted.[0m

[32m[1m#### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merror[39m {Error}[0m

[0mThe [33m'error'[39m event is emitted when an error occurs during the processing of[0m
[0man [33mHttp2Stream[39m.[0m

[32m[1m#### Event: [33m'frameError'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtype[39m {integer} The frame type.[0m
    * [0m[33mcode[39m {integer} The error code.[0m
    * [0m[33mid[39m {integer} The stream id (or [33m0[39m if the frame isn't associated with a[0m
      [0mstream).[0m

[0mThe [33m'frameError'[39m event is emitted when an error occurs while attempting to[0m
[0msend a frame. When invoked, the handler function will receive an integer[0m
[0margument identifying the frame type, and an integer argument identifying the[0m
[0merror code. The [33mHttp2Stream[39m instance will be destroyed immediately after the[0m
[0m[33m'frameError'[39m event is emitted.[0m

[32m[1m#### Event: [33m'timeout'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'timeout'[39m event is emitted after no activity is received for this[0m
[0m[33mHttp2Stream[39m within the number of milliseconds set using[0m
[0m[33mhttp2stream.setTimeout()[39m.[0m
[0mIts listener does not expect any arguments.[0m

[32m[1m#### Event: [33m'trailers'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mheaders[39m {HTTP/2 Headers Object} An object describing the headers[0m
    * [0m[33mflags[39m {number} The associated numeric flags[0m

[0mThe [33m'trailers'[39m event is emitted when a block of headers associated with[0m
[0mtrailing header fields is received. The listener callback is passed the[0m
[0m[HTTP/2 Headers Object][] and flags associated with the headers.[0m

[0mThis event might not be emitted if [33mhttp2stream.end()[39m is called[0m
[0mbefore trailers are received and the incoming data is not being read or[0m
[0mlistened for.[0m

    [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'trailers'[39m[32m,[39m [90m([39m[37mheaders[39m[32m,[39m [37mflags[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mheaders[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Event: [33m'wantTrailers'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'wantTrailers'[39m event is emitted when the [33mHttp2Stream[39m has queued the[0m
[0mfinal [33mDATA[39m frame to be sent on a frame and the [33mHttp2Stream[39m is ready to send[0m
[0mtrailing headers. When initiating a request or response, the [33mwaitForTrailers[39m[0m
[0moption must be set for this event to be emitted.[0m

[32m[1m#### [33mhttp2stream.aborted[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mSet to [33mtrue[39m if the [33mHttp2Stream[39m instance was aborted abnormally. When set,[0m
[0mthe [33m'aborted'[39m event will have been emitted.[0m

[32m[1m#### [33mhttp2stream.bufferSize[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThis property shows the number of characters currently buffered to be written.[0m
[0mSee [[33mnet.Socket.bufferSize[39m][] for details.[0m

[32m[1m#### [33mhttp2stream.close(code[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {number} Unsigned 32-bit integer identifying the error code.[0m
      [0m[1mDefault:[22m [33mhttp2.constants.NGHTTP2_NO_ERROR[39m ([33m0x00[39m).[0m
    * [0m[33mcallback[39m {Function} An optional function registered to listen for the[0m
      [0m[33m'close'[39m event.[0m

[0mCloses the [33mHttp2Stream[39m instance by sending an [33mRST_STREAM[39m frame to the[0m
[0mconnected HTTP/2 peer.[0m

[32m[1m#### [33mhttp2stream.closed[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mSet to [33mtrue[39m if the [33mHttp2Stream[39m instance has been closed.[0m

[32m[1m#### [33mhttp2stream.destroyed[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mSet to [33mtrue[39m if the [33mHttp2Stream[39m instance has been destroyed and is no longer[0m
[0musable.[0m

[32m[1m#### [33mhttp2stream.endAfterHeaders[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mSet the [33mtrue[39m if the [33mEND_STREAM[39m flag was set in the request or response[0m
[0mHEADERS frame received, indicating that no additional data should be received[0m
[0mand the readable side of the [33mHttp2Stream[39m will be closed.[0m

[32m[1m#### [33mhttp2stream.id[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number|undefined}[0m

[0mThe numeric stream identifier of this [33mHttp2Stream[39m instance. Set to [33mundefined[39m[0m
[0mif the stream identifier has not yet been assigned.[0m

[32m[1m#### [33mhttp2stream.pending[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mSet to [33mtrue[39m if the [33mHttp2Stream[39m instance has not yet been assigned a[0m
[0mnumeric stream identifier.[0m

[32m[1m#### [33mhttp2stream.priority(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mexclusive[39m {boolean} When [33mtrue[39m and [33mparent[39m identifies a parent Stream,[0m[0m[0m
      [0m      [0m[0mthis stream is made the sole direct dependency of the parent, with[0m[0m[0m
      [0m      [0m[0mall other existing dependents made a dependent of this stream. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mparent[39m {number} Specifies the numeric identifier of a stream this stream[0m[0m[0m
      [0m      [0m[0mis dependent on.[0m[0m[0m
      [0m
        * [0m[0m[33mweight[39m {number} Specifies the relative dependency of a stream in relation[0m[0m[0m
      [0m      [0m[0mto other streams with the same [33mparent[39m. The value is a number between [33m1[39m[0m[0m[0m
      [0m      [0m[0mand [33m256[39m (inclusive).[0m[0m[0m
      [0m
        * [0m[0m[33msilent[39m {boolean} When [33mtrue[39m, changes the priority locally without[0m[0m[0m
      [0m      [0m[0msending a [33mPRIORITY[39m frame to the connected peer.[0m[0m[0m

[0mUpdates the priority for this [33mHttp2Stream[39m instance.[0m

[32m[1m#### [33mhttp2stream.rstCode[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mSet to the [33mRST_STREAM[39m [error code][] reported when the [33mHttp2Stream[39m is[0m
[0mdestroyed after either receiving an [33mRST_STREAM[39m frame from the connected peer,[0m
[0mcalling [33mhttp2stream.close()[39m, or [33mhttp2stream.destroy()[39m. Will be[0m
[0m[33mundefined[39m if the [33mHttp2Stream[39m has not been closed.[0m

[32m[1m#### [33mhttp2stream.sentHeaders[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{HTTP/2 Headers Object}[0m

[0mAn object containing the outbound headers sent for this [33mHttp2Stream[39m.[0m

[32m[1m#### [33mhttp2stream.sentInfoHeaders[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{HTTP/2 Headers Object[]}[0m

[0mAn array of objects containing the outbound informational (additional) headers[0m
[0msent for this [33mHttp2Stream[39m.[0m

[32m[1m#### [33mhttp2stream.sentTrailers[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{HTTP/2 Headers Object}[0m

[0mAn object containing the outbound trailers sent for this [33mHttpStream[39m.[0m

[32m[1m#### [33mhttp2stream.session[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Http2Session}[0m

[0mA reference to the [33mHttp2Session[39m instance that owns this [33mHttp2Stream[39m. The[0m
[0mvalue will be [33mundefined[39m after the [33mHttp2Stream[39m instance is destroyed.[0m

[32m[1m#### [33mhttp2stream.setTimeout(msecs, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number}[0m
    * [0m[33mcallback[39m {Function}[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'http://example.org:8000'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mNGHTTP2_CANCEL[39m [33m}[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconstants[39m[90m;[39m
    [94mconst[39m [37mreq[39m [93m=[39m [37mclient[39m[32m.[39m[37mrequest[39m[90m([39m[33m{[39m [32m':path'[39m[93m:[39m [92m'/'[39m [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Cancel the stream if there's no activity after 5 seconds[39m
    [37mreq[39m[32m.[39m[37msetTimeout[39m[90m([39m[34m5000[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [37mreq[39m[32m.[39m[37mclose[39m[90m([39m[37mNGHTTP2_CANCEL[39m[90m)[39m[90m)[39m[90m;[39m

[32m[1m#### [33mhttp2stream.state[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m[0mProvides miscellaneous information about the current state of the[0m
[0m[33mHttp2Stream[39m.[0m

    * [0m{Object}
        * [0m[0m[33mlocalWindowSize[39m {number} The number of bytes the connected peer may send[0m[0m[0m
      [0m      [0m[0mfor this [33mHttp2Stream[39m without receiving a [33mWINDOW_UPDATE[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mstate[39m {number} A flag indicating the low-level current state of the[0m[0m[0m
      [0m      [0m[0m[33mHttp2Stream[39m as determined by [33mnghttp2[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mlocalClose[39m {number} [33m1[39m if this [33mHttp2Stream[39m has been closed locally.[0m[0m[0m
      [0m
        * [0m[0m[33mremoteClose[39m {number} [33m1[39m if this [33mHttp2Stream[39m has been closed[0m[0m[0m
      [0m      [0m[0mremotely.[0m[0m[0m
      [0m
        * [0m[0m[33msumDependencyWeight[39m {number} The sum weight of all [33mHttp2Stream[39m[0m[0m[0m
      [0m      [0m[0minstances that depend on this [33mHttp2Stream[39m as specified using[0m[0m[0m
      [0m      [0m[0m[33mPRIORITY[39m frames.[0m[0m[0m
      [0m
        * [0m[0m[33mweight[39m {number} The priority weight of this [33mHttp2Stream[39m.[0m[0m[0m

[0mA current state of this [33mHttp2Stream[39m.[0m

[32m[1m#### [33mhttp2stream.sendTrailers(headers)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mheaders[39m {HTTP/2 Headers Object}[0m

[0mSends a trailing [33mHEADERS[39m frame to the connected HTTP/2 peer. This method[0m
[0mwill cause the [33mHttp2Stream[39m to be immediately closed and must only be[0m
[0mcalled after the [33m'wantTrailers'[39m event has been emitted. When sending a[0m
[0mrequest or sending a response, the [33moptions.waitForTrailers[39m option must be set[0m
[0min order to keep the [33mHttp2Stream[39m open after the final [33mDATA[39m frame so that[0m
[0mtrailers can be sent.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[90mundefined[39m[32m,[39m [33m{[39m [37mwaitForTrailers[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'wantTrailers'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mstream[39m[32m.[39m[37msendTrailers[39m[90m([39m[33m{[39m [37mxyz[39m[93m:[39m [92m'abc'[39m [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'Hello World'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe HTTP/1 specification forbids trailers from containing HTTP/2 pseudo-header[0m
[0mfields (e.g. [33m':method'[39m, [33m':path'[39m, etc).[0m

[32m[1m### Class: [33mClientHttp2Stream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends {Http2Stream}[0m

[0mThe [33mClientHttp2Stream[39m class is an extension of [33mHttp2Stream[39m that is[0m
[0mused exclusively on HTTP/2 Clients. [33mHttp2Stream[39m instances on the client[0m
[0mprovide events such as [33m'response'[39m and [33m'push'[39m that are only relevant on[0m
[0mthe client.[0m

[32m[1m#### Event: [33m'continue'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the server sends a [33m100 Continue[39m status, usually because[0m
[0mthe request contained [33mExpect: 100-continue[39m. This is an instruction that[0m
[0mthe client should send the request body.[0m

[32m[1m#### Event: [33m'headers'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'headers'[39m event is emitted when an additional block of headers is received[0m
[0mfor a stream, such as when a block of [33m1xx[39m informational headers is received.[0m
[0mThe listener callback is passed the [HTTP/2 Headers Object][] and flags[0m
[0massociated with the headers.[0m

    [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'headers'[39m[32m,[39m [90m([39m[37mheaders[39m[32m,[39m [37mflags[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mheaders[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Event: [33m'push'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'push'[39m event is emitted when response headers for a Server Push stream[0m
[0mare received. The listener callback is passed the [HTTP/2 Headers Object][] and[0m
[0mflags associated with the headers.[0m

    [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'push'[39m[32m,[39m [90m([39m[37mheaders[39m[32m,[39m [37mflags[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mheaders[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Event: [33m'response'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'response'[39m event is emitted when a response [33mHEADERS[39m frame has been[0m
[0mreceived for this stream from the connected HTTP/2 server. The listener is[0m
[0minvoked with two arguments: an [33mObject[39m containing the received[0m
[0m[HTTP/2 Headers Object][], and flags associated with the headers.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'https://localhost'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mreq[39m [93m=[39m [37mclient[39m[32m.[39m[37mrequest[39m[90m([39m[33m{[39m [32m':path'[39m[93m:[39m [92m'/'[39m [33m}[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'response'[39m[32m,[39m [90m([39m[37mheaders[39m[32m,[39m [37mflags[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mheaders[39m[33m[[39m[92m':status'[39m[33m][39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Class: [33mServerHttp2Stream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {Http2Stream}[0m

[0mThe [33mServerHttp2Stream[39m class is an extension of [[33mHttp2Stream[39m][] that is[0m
[0mused exclusively on HTTP/2 Servers. [33mHttp2Stream[39m instances on the server[0m
[0mprovide additional methods such as [33mhttp2stream.pushStream()[39m and[0m
[0m[33mhttp2stream.respond()[39m that are only relevant on the server.[0m

[32m[1m#### [33mhttp2stream.additionalHeaders(headers)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mheaders[39m {HTTP/2 Headers Object}[0m

[0mSends an additional informational [33mHEADERS[39m frame to the connected HTTP/2 peer.[0m

[32m[1m#### [33mhttp2stream.headersSent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mTrue if headers were sent, false otherwise (read-only).[0m

[32m[1m#### [33mhttp2stream.pushAllowed[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mRead-only property mapped to the [33mSETTINGS_ENABLE_PUSH[39m flag of the remote[0m
[0mclient's most recent [33mSETTINGS[39m frame. Will be [33mtrue[39m if the remote peer[0m
[0maccepts push streams, [33mfalse[39m otherwise. Settings are the same for every[0m
[0m[33mHttp2Stream[39m in the same [33mHttp2Session[39m.[0m

[32m[1m#### [33mhttp2stream.pushStream(headers[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mheaders[39m {HTTP/2 Headers Object}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mexclusive[39m {boolean} When [33mtrue[39m and [33mparent[39m identifies a parent Stream,[0m[0m[0m
      [0m      [0m[0mthe created stream is made the sole direct dependency of the parent, with[0m[0m[0m
      [0m      [0m[0mall other existing dependents made a dependent of the newly created stream.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mparent[39m {number} Specifies the numeric identifier of a stream the newly[0m[0m[0m
      [0m      [0m[0mcreated stream is dependent on.[0m[0m[0m
    * [0m[33mcallback[39m {Function} Callback that is called once the push stream has been[0m
      [0minitiated.
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mpushStream[39m {ServerHttp2Stream} The returned [33mpushStream[39m object.[0m[0m[0m
      [0m
        * [0m[0m[33mheaders[39m {HTTP/2 Headers Object} Headers object the [33mpushStream[39m was[0m[0m[0m
      [0m      [0m[0minitiated with.[0m[0m[0m

[0mInitiates a push stream. The callback is invoked with the new [33mHttp2Stream[39m[0m
[0minstance created for the push stream passed as the second argument, or an[0m
[0m[33mError[39m passed as the first argument.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m [32m':status'[39m[93m:[39m [34m200[39m [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mpushStream[39m[90m([39m[33m{[39m [32m':path'[39m[93m:[39m [92m'/'[39m [33m}[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mpushStream[39m[32m,[39m [37mheaders[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
        [37mpushStream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m [32m':status'[39m[93m:[39m [34m200[39m [33m}[39m[90m)[39m[90m;[39m
        [37mpushStream[39m[32m.[39m[37mend[39m[90m([39m[92m'some pushed data'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'some data'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mSetting the weight of a push stream is not allowed in the [33mHEADERS[39m frame. Pass[0m
[0ma [33mweight[39m value to [33mhttp2stream.priority[39m with the [33msilent[39m option set to[0m
[0m[33mtrue[39m to enable server-side bandwidth balancing between concurrent streams.[0m

[0mCalling [33mhttp2stream.pushStream()[39m from within a pushed stream is not permitted[0m
[0mand will throw an error.[0m

[32m[1m#### [33mhttp2stream.respond([headers[, options]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mheaders[39m {HTTP/2 Headers Object}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mendStream[39m {boolean} Set to [33mtrue[39m to indicate that the response will not[0m[0m[0m
      [0m      [0m[0minclude payload data.[0m[0m[0m
      [0m
        * [0m[0m[33mwaitForTrailers[39m {boolean} When [33mtrue[39m, the [33mHttp2Stream[39m will emit the[0m[0m[0m
      [0m      [0m[0m[33m'wantTrailers'[39m event after the final [33mDATA[39m frame has been sent.[0m[0m[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m [32m':status'[39m[93m:[39m [34m200[39m [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'some data'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mWhen the [33moptions.waitForTrailers[39m option is set, the [33m'wantTrailers'[39m event[0m
[0mwill be emitted immediately after queuing the last chunk of payload data to be[0m
[0msent. The [33mhttp2stream.sendTrailers()[39m method can then be used to sent trailing[0m
[0mheader fields to the peer.[0m

[0mWhen [33moptions.waitForTrailers[39m is set, the [33mHttp2Stream[39m will not automatically[0m
[0mclose when the final [33mDATA[39m frame is transmitted. User code must call either[0m
[0m[33mhttp2stream.sendTrailers()[39m or [33mhttp2stream.close()[39m to close the[0m
[0m[33mHttp2Stream[39m.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m [32m':status'[39m[93m:[39m [34m200[39m [33m}[39m[32m,[39m [33m{[39m [37mwaitForTrailers[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'wantTrailers'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mstream[39m[32m.[39m[37msendTrailers[39m[90m([39m[33m{[39m [37mABC[39m[93m:[39m [92m'some value to send'[39m [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'some data'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### [33mhttp2stream.respondWithFD(fd[, headers[, options]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v12.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29876[39m
[90m    description: The `fd` option may now be a `FileHandle`.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18936[39m
[90m    description: Any readable file descriptor, not necessarily for a[39m
[90m                 regular file, is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {number|FileHandle} A readable file descriptor.[0m
    * [0m[33mheaders[39m {HTTP/2 Headers Object}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mstatCheck[39m {Function}[0m[0m[0m
      [0m
        * [0m[0m[33mwaitForTrailers[39m {boolean} When [33mtrue[39m, the [33mHttp2Stream[39m will emit the[0m[0m[0m
      [0m      [0m[0m[33m'wantTrailers'[39m event after the final [33mDATA[39m frame has been sent.[0m[0m[0m
      [0m
        * [0m[0m[33moffset[39m {number} The offset position at which to begin reading.[0m[0m[0m
      [0m
        * [0m[0m[33mlength[39m {number} The amount of data from the fd to send.[0m[0m[0m

[0mInitiates a response whose data is read from the given file descriptor. No[0m
[0mvalidation is performed on the given file descriptor. If an error occurs while[0m
[0mattempting to read data using the file descriptor, the [33mHttp2Stream[39m will be[0m
[0mclosed using an [33mRST_STREAM[39m frame using the standard [33mINTERNAL_ERROR[39m code.[0m

[0mWhen used, the [33mHttp2Stream[39m object's [33mDuplex[39m interface will be closed[0m
[0mautomatically.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mfd[39m [93m=[39m [37mfs[39m[32m.[39m[37mopenSync[39m[90m([39m[92m'/some/file'[39m[32m,[39m [92m'r'[39m[90m)[39m[90m;[39m
    
      [94mconst[39m [37mstat[39m [93m=[39m [37mfs[39m[32m.[39m[37mfstatSync[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
      [94mconst[39m [37mheaders[39m [93m=[39m [33m{[39m
        [32m'content-length'[39m[93m:[39m [37mstat[39m[32m.[39m[37msize[39m[32m,[39m
        [32m'last-modified'[39m[93m:[39m [37mstat[39m[32m.[39m[37mmtime[39m[32m.[39m[37mtoUTCString[39m[90m([39m[90m)[39m[32m,[39m
        [32m'content-type'[39m[93m:[39m [92m'text/plain'[39m
      [33m}[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mrespondWithFD[39m[90m([39m[37mfd[39m[32m,[39m [37mheaders[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [37mfs[39m[32m.[39m[37mcloseSync[39m[90m([39m[37mfd[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe optional [33moptions.statCheck[39m function may be specified to give user code[0m
[0man opportunity to set additional content headers based on the [33mfs.Stat[39m details[0m
[0mof the given fd. If the [33mstatCheck[39m function is provided, the[0m
[0m[33mhttp2stream.respondWithFD()[39m method will perform an [33mfs.fstat()[39m call to[0m
[0mcollect details on the provided file descriptor.[0m

[0mThe [33moffset[39m and [33mlength[39m options may be used to limit the response to a[0m
[0mspecific range subset. This can be used, for instance, to support HTTP Range[0m
[0mrequests.[0m

[0mThe file descriptor or [33mFileHandle[39m is not closed when the stream is closed,[0m
[0mso it will need to be closed manually once it is no longer needed.[0m
[0mUsing the same file descriptor concurrently for multiple streams[0m
[0mis not supported and may result in data loss. Re-using a file descriptor[0m
[0mafter a stream has finished is supported.[0m

[0mWhen the [33moptions.waitForTrailers[39m option is set, the [33m'wantTrailers'[39m event[0m
[0mwill be emitted immediately after queuing the last chunk of payload data to be[0m
[0msent. The [33mhttp2stream.sendTrailers()[39m method can then be used to sent trailing[0m
[0mheader fields to the peer.[0m

[0mWhen [33moptions.waitForTrailers[39m is set, the [33mHttp2Stream[39m will not automatically[0m
[0mclose when the final [33mDATA[39m frame is transmitted. User code [3mmust[23m call either[0m
[0m[33mhttp2stream.sendTrailers()[39m or [33mhttp2stream.close()[39m to close the[0m
[0m[33mHttp2Stream[39m.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mfd[39m [93m=[39m [37mfs[39m[32m.[39m[37mopenSync[39m[90m([39m[92m'/some/file'[39m[32m,[39m [92m'r'[39m[90m)[39m[90m;[39m
    
      [94mconst[39m [37mstat[39m [93m=[39m [37mfs[39m[32m.[39m[37mfstatSync[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
      [94mconst[39m [37mheaders[39m [93m=[39m [33m{[39m
        [32m'content-length'[39m[93m:[39m [37mstat[39m[32m.[39m[37msize[39m[32m,[39m
        [32m'last-modified'[39m[93m:[39m [37mstat[39m[32m.[39m[37mmtime[39m[32m.[39m[37mtoUTCString[39m[90m([39m[90m)[39m[32m,[39m
        [32m'content-type'[39m[93m:[39m [92m'text/plain'[39m
      [33m}[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mrespondWithFD[39m[90m([39m[37mfd[39m[32m,[39m [37mheaders[39m[32m,[39m [33m{[39m [37mwaitForTrailers[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'wantTrailers'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mstream[39m[32m.[39m[37msendTrailers[39m[90m([39m[33m{[39m [37mABC[39m[93m:[39m [92m'some value to send'[39m [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [37mfs[39m[32m.[39m[37mcloseSync[39m[90m([39m[37mfd[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### [33mhttp2stream.respondWithFile(path[, headers[, options]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18936[39m
[90m    description: Any readable file, not necessarily a[39m
[90m                 regular file, is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mheaders[39m {HTTP/2 Headers Object}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mstatCheck[39m {Function}[0m[0m[0m
      [0m
        * [0m[0m[33monError[39m {Function} Callback function invoked in the case of an[0m[0m[0m
      [0m      [0m[0merror before send.[0m[0m[0m
      [0m
        * [0m[0m[33mwaitForTrailers[39m {boolean} When [33mtrue[39m, the [33mHttp2Stream[39m will emit the[0m[0m[0m
      [0m      [0m[0m[33m'wantTrailers'[39m event after the final [33mDATA[39m frame has been sent.[0m[0m[0m
      [0m
        * [0m[0m[33moffset[39m {number} The offset position at which to begin reading.[0m[0m[0m
      [0m
        * [0m[0m[33mlength[39m {number} The amount of data from the fd to send.[0m[0m[0m

[0mSends a regular file as the response. The [33mpath[39m must specify a regular file[0m
[0mor an [33m'error'[39m event will be emitted on the [33mHttp2Stream[39m object.[0m

[0mWhen used, the [33mHttp2Stream[39m object's [33mDuplex[39m interface will be closed[0m
[0mautomatically.[0m

[0mThe optional [33moptions.statCheck[39m function may be specified to give user code[0m
[0man opportunity to set additional content headers based on the [33mfs.Stat[39m details[0m
[0mof the given file:[0m

[0mIf an error occurs while attempting to read the file data, the [33mHttp2Stream[39m[0m
[0mwill be closed using an [33mRST_STREAM[39m frame using the standard [33mINTERNAL_ERROR[39m[0m
[0mcode. If the [33monError[39m callback is defined, then it will be called. Otherwise[0m
[0mthe stream will be destroyed.[0m

[0mExample using a file path:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mfunction[39m [37mstatCheck[39m[90m([39m[37mstat[39m[32m,[39m [37mheaders[39m[90m)[39m [33m{[39m
        [37mheaders[39m[33m[[39m[92m'last-modified'[39m[33m][39m [93m=[39m [37mstat[39m[32m.[39m[37mmtime[39m[32m.[39m[37mtoUTCString[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [94mfunction[39m [37monError[39m[90m([39m[37merr[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[32m.[39m[37mcode[39m [93m===[39m [92m'ENOENT'[39m[90m)[39m [33m{[39m
          [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m [32m':status'[39m[93m:[39m [34m404[39m [33m}[39m[90m)[39m[90m;[39m
        [33m}[39m [94melse[39m [33m{[39m
          [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m [32m':status'[39m[93m:[39m [34m500[39m [33m}[39m[90m)[39m[90m;[39m
        [33m}[39m
        [37mstream[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [37mstream[39m[32m.[39m[37mrespondWithFile[39m[90m([39m[92m'/some/file'[39m[32m,[39m
                             [33m{[39m [32m'content-type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[32m,[39m
                             [33m{[39m [37mstatCheck[39m[32m,[39m [37monError[39m [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33moptions.statCheck[39m function may also be used to cancel the send operation[0m
[0mby returning [33mfalse[39m. For instance, a conditional request may check the stat[0m
[0mresults to determine if the file has been modified to return an appropriate[0m
[0m[33m304[39m response:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mfunction[39m [37mstatCheck[39m[90m([39m[37mstat[39m[32m,[39m [37mheaders[39m[90m)[39m [33m{[39m
        [90m// Check the stat here...[39m
        [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m [32m':status'[39m[93m:[39m [34m304[39m [33m}[39m[90m)[39m[90m;[39m
        [31mreturn[39m [91mfalse[39m[90m;[39m [90m// Cancel the send operation[39m
      [33m}[39m
      [37mstream[39m[32m.[39m[37mrespondWithFile[39m[90m([39m[92m'/some/file'[39m[32m,[39m
                             [33m{[39m [32m'content-type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[32m,[39m
                             [33m{[39m [37mstatCheck[39m [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mcontent-length[39m header field will be automatically set.[0m

[0mThe [33moffset[39m and [33mlength[39m options may be used to limit the response to a[0m
[0mspecific range subset. This can be used, for instance, to support HTTP Range[0m
[0mrequests.[0m

[0mThe [33moptions.onError[39m function may also be used to handle all the errors[0m
[0mthat could happen before the delivery of the file is initiated. The[0m
[0mdefault behavior is to destroy the stream.[0m

[0mWhen the [33moptions.waitForTrailers[39m option is set, the [33m'wantTrailers'[39m event[0m
[0mwill be emitted immediately after queuing the last chunk of payload data to be[0m
[0msent. The [33mhttp2stream.sendTrailers()[39m method can then be used to sent trailing[0m
[0mheader fields to the peer.[0m

[0mWhen [33moptions.waitForTrailers[39m is set, the [33mHttp2Stream[39m will not automatically[0m
[0mclose when the final [33mDATA[39m frame is transmitted. User code must call either[0m
[0m[33mhttp2stream.sendTrailers()[39m or [33mhttp2stream.close()[39m to close the[0m
[0m[33mHttp2Stream[39m.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespondWithFile[39m[90m([39m[92m'/some/file'[39m[32m,[39m
                             [33m{[39m [32m'content-type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[32m,[39m
                             [33m{[39m [37mwaitForTrailers[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mon[39m[90m([39m[92m'wantTrailers'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mstream[39m[32m.[39m[37msendTrailers[39m[90m([39m[33m{[39m [37mABC[39m[93m:[39m [92m'some value to send'[39m [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Class: [33mHttp2Server[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {net.Server}[0m

[0mInstances of [33mHttp2Server[39m are created using the [33mhttp2.createServer()[39m[0m
[0mfunction. The [33mHttp2Server[39m class is not exported directly by the [33mhttp2[39m[0m
[0mmodule.[0m

[32m[1m#### Event: [33m'checkContinue'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {http2.Http2ServerRequest}[0m
    * [0m[33mresponse[39m {http2.Http2ServerResponse}[0m

[0mIf a [[33m'request'[39m][] listener is registered or [[33mhttp2.createServer()[39m][] is[0m
[0msupplied a callback function, the [33m'checkContinue'[39m event is emitted each time[0m
[0ma request with an HTTP [33mExpect: 100-continue[39m is received. If this event is[0m
[0mnot listened for, the server will automatically respond with a status[0m
[0m[33m100 Continue[39m as appropriate.[0m

[0mHandling this event involves calling [[33mresponse.writeContinue()[39m][] if the[0m
[0mclient should continue to send the request body, or generating an appropriate[0m
[0mHTTP response (e.g. 400 Bad Request) if the client should not continue to send[0m
[0mthe request body.[0m

[0mWhen this event is emitted and handled, the [[33m'request'[39m][] event will[0m
[0mnot be emitted.[0m

[32m[1m#### Event: [33m'request'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {http2.Http2ServerRequest}[0m
    * [0m[33mresponse[39m {http2.Http2ServerResponse}[0m

[0mEmitted each time there is a request. There may be multiple requests[0m
[0mper session. See the [Compatibility API][].[0m

[32m[1m#### Event: [33m'session'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'session'[39m event is emitted when a new [33mHttp2Session[39m is created by the[0m
[0m[33mHttp2Server[39m.[0m

[32m[1m#### Event: [33m'sessionError'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'sessionError'[39m event is emitted when an [33m'error'[39m event is emitted by[0m
[0man [33mHttp2Session[39m object associated with the [33mHttp2Server[39m.[0m

[32m[1m#### Event: [33m'stream'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'stream'[39m event is emitted when a [33m'stream'[39m event has been emitted by[0m
[0man [33mHttp2Session[39m associated with the server.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m
      [37mHTTP2_HEADER_METHOD[39m[32m,[39m
      [37mHTTP2_HEADER_PATH[39m[32m,[39m
      [37mHTTP2_HEADER_STATUS[39m[32m,[39m
      [37mHTTP2_HEADER_CONTENT_TYPE[39m
    [33m}[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconstants[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[32m,[39m [37mheaders[39m[32m,[39m [37mflags[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mmethod[39m [93m=[39m [37mheaders[39m[33m[[39m[37mHTTP2_HEADER_METHOD[39m[33m][39m[90m;[39m
      [94mconst[39m [37mpath[39m [93m=[39m [37mheaders[39m[33m[[39m[37mHTTP2_HEADER_PATH[39m[33m][39m[90m;[39m
      [90m// ...[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m
        [33m[[39m[37mHTTP2_HEADER_STATUS[39m[33m][39m[93m:[39m [34m200[39m[32m,[39m
        [33m[[39m[37mHTTP2_HEADER_CONTENT_TYPE[39m[33m][39m[93m:[39m [92m'text/plain'[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'hello '[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'world'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Event: [33m'timeout'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27558[39m
[90m    description: The default timeout changed from 120s to 0 (no timeout).[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'timeout'[39m event is emitted when there is no activity on the Server for[0m
[0ma given number of milliseconds set using [33mhttp2server.setTimeout()[39m.[0m
[0m[1mDefault:[22m 0 (no timeout)[0m

[32m[1m#### [33mserver.close([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m

[0mStops the server from establishing new sessions. This does not prevent new[0m
[0mrequest streams from being created due to the persistent nature of HTTP/2[0m
[0msessions. To gracefully shut down the server, call [[33mhttp2session.close()[39m][] on[0m
[0mall active sessions.[0m

[0mIf [33mcallback[39m is provided, it is not invoked until all active sessions have been[0m
[0mclosed, although the server has already stopped allowing new sessions. See[0m
[0m[[33mnet.Server.close()[39m][] for more details.[0m

[32m[1m#### [33mserver.setTimeout([msecs][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27558[39m
[90m    description: The default timeout changed from 120s to 0 (no timeout).[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number} [1mDefault:[22m 0 (no timeout)[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {Http2Server}[0m

[0mUsed to set the timeout value for http2 server requests,[0m
[0mand sets a callback function that is called when there is no activity[0m
[0mon the [33mHttp2Server[39m after [33mmsecs[39m milliseconds.[0m

[0mThe given callback is registered as a listener on the [33m'timeout'[39m event.[0m

[0mIn case if [33mcallback[39m is not a function, a new [33mERR_INVALID_CALLBACK[39m[0m
[0merror will be thrown.[0m

[32m[1m#### [33mserver.timeout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27558[39m
[90m    description: The default timeout changed from 120s to 0 (no timeout).[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} Timeout in milliseconds. [1mDefault:[22m 0 (no timeout)[0m

[0mThe number of milliseconds of inactivity before a socket is presumed[0m
[0mto have timed out.[0m

[0mA value of [33m0[39m will disable the timeout behavior on incoming connections.[0m

[0mThe socket timeout logic is set up on connection, so changing this[0m
[0mvalue only affects new connections to the server, not any existing connections.[0m

[32m[1m### Class: [33mHttp2SecureServer[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {tls.Server}[0m

[0mInstances of [33mHttp2SecureServer[39m are created using the[0m
[0m[33mhttp2.createSecureServer()[39m function. The [33mHttp2SecureServer[39m class is not[0m
[0mexported directly by the [33mhttp2[39m module.[0m

[32m[1m#### Event: [33m'checkContinue'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {http2.Http2ServerRequest}[0m
    * [0m[33mresponse[39m {http2.Http2ServerResponse}[0m

[0mIf a [[33m'request'[39m][] listener is registered or [[33mhttp2.createSecureServer()[39m][][0m
[0mis supplied a callback function, the [33m'checkContinue'[39m event is emitted each[0m
[0mtime a request with an HTTP [33mExpect: 100-continue[39m is received. If this event[0m
[0mis not listened for, the server will automatically respond with a status[0m
[0m[33m100 Continue[39m as appropriate.[0m

[0mHandling this event involves calling [[33mresponse.writeContinue()[39m][] if the[0m
[0mclient should continue to send the request body, or generating an appropriate[0m
[0mHTTP response (e.g. 400 Bad Request) if the client should not continue to send[0m
[0mthe request body.[0m

[0mWhen this event is emitted and handled, the [[33m'request'[39m][] event will[0m
[0mnot be emitted.[0m

[32m[1m#### Event: [33m'request'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {http2.Http2ServerRequest}[0m
    * [0m[33mresponse[39m {http2.Http2ServerResponse}[0m

[0mEmitted each time there is a request. There may be multiple requests[0m
[0mper session. See the [Compatibility API][].[0m

[32m[1m#### Event: [33m'session'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'session'[39m event is emitted when a new [33mHttp2Session[39m is created by the[0m
[0m[33mHttp2SecureServer[39m.[0m

[32m[1m#### Event: [33m'sessionError'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'sessionError'[39m event is emitted when an [33m'error'[39m event is emitted by[0m
[0man [33mHttp2Session[39m object associated with the [33mHttp2SecureServer[39m.[0m

[32m[1m#### Event: [33m'stream'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'stream'[39m event is emitted when a [33m'stream'[39m event has been emitted by[0m
[0man [33mHttp2Session[39m associated with the server.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m
      [37mHTTP2_HEADER_METHOD[39m[32m,[39m
      [37mHTTP2_HEADER_PATH[39m[32m,[39m
      [37mHTTP2_HEADER_STATUS[39m[32m,[39m
      [37mHTTP2_HEADER_CONTENT_TYPE[39m
    [33m}[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconstants[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [37mgetOptionsSomehow[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateSecureServer[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[32m,[39m [37mheaders[39m[32m,[39m [37mflags[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mmethod[39m [93m=[39m [37mheaders[39m[33m[[39m[37mHTTP2_HEADER_METHOD[39m[33m][39m[90m;[39m
      [94mconst[39m [37mpath[39m [93m=[39m [37mheaders[39m[33m[[39m[37mHTTP2_HEADER_PATH[39m[33m][39m[90m;[39m
      [90m// ...[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m
        [33m[[39m[37mHTTP2_HEADER_STATUS[39m[33m][39m[93m:[39m [34m200[39m[32m,[39m
        [33m[[39m[37mHTTP2_HEADER_CONTENT_TYPE[39m[33m][39m[93m:[39m [92m'text/plain'[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mwrite[39m[90m([39m[92m'hello '[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'world'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Event: [33m'timeout'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'timeout'[39m event is emitted when there is no activity on the Server for[0m
[0ma given number of milliseconds set using [33mhttp2secureServer.setTimeout()[39m.[0m
[0m[1mDefault:[22m 2 minutes.[0m

[32m[1m#### Event: [33m'unknownProtocol'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'unknownProtocol'[39m event is emitted when a connecting client fails to[0m
[0mnegotiate an allowed protocol (i.e. HTTP/2 or HTTP/1.1). The event handler[0m
[0mreceives the socket for handling. If no listener is registered for this event,[0m
[0mthe connection is terminated. See the [Compatibility API][].[0m

[32m[1m#### [33mserver.close([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m

[0mStops the server from establishing new sessions. This does not prevent new[0m
[0mrequest streams from being created due to the persistent nature of HTTP/2[0m
[0msessions. To gracefully shut down the server, call [[33mhttp2session.close()[39m][] on[0m
[0mall active sessions.[0m

[0mIf [33mcallback[39m is provided, it is not invoked until all active sessions have been[0m
[0mclosed, although the server has already stopped allowing new sessions. See[0m
[0m[[33mtls.Server.close()[39m][] for more details.[0m

[32m[1m#### [33mserver.setTimeout([msecs][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number} [1mDefault:[22m [33m120000[39m (2 minutes)[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {Http2SecureServer}[0m

[0mUsed to set the timeout value for http2 secure server requests,[0m
[0mand sets a callback function that is called when there is no activity[0m
[0mon the [33mHttp2SecureServer[39m after [33mmsecs[39m milliseconds.[0m

[0mThe given callback is registered as a listener on the [33m'timeout'[39m event.[0m

[0mIn case if [33mcallback[39m is not a function, a new [33mERR_INVALID_CALLBACK[39m[0m
[0merror will be thrown.[0m

[32m[1m#### [33mserver.timeout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27558[39m
[90m    description: The default timeout changed from 120s to 0 (no timeout).[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} Timeout in milliseconds. [1mDefault:[22m 0 (no timeout)[0m

[0mThe number of milliseconds of inactivity before a socket is presumed[0m
[0mto have timed out.[0m

[0mA value of [33m0[39m will disable the timeout behavior on incoming connections.[0m

[0mThe socket timeout logic is set up on connection, so changing this[0m
[0mvalue only affects new connections to the server, not any existing connections.[0m

[32m[1m### [33mhttp2.createServer(options[, onRequestHandler])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v13.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30534[39m
[90m    description: Added `maxSessionRejectedStreams` option with a default of 100.[39m
[90m  - version: v13.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30534[39m
[90m    description: Added `maxSessionInvalidFrames` option with a default of 1000.[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29144[39m
[90m    description: The `PADDING_STRATEGY_CALLBACK` has been made equivalent to[39m
[90m                 providing `PADDING_STRATEGY_ALIGNED` and `selectPadding`[39m
[90m                 has been removed.[39m
[90m  - version: v12.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27782[39m
[90m    description: The `options` parameter now supports `net.createServer()`[39m
[90m                 options.[39m
[90m  - version: v8.9.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17105[39m
[90m    description: Added the `maxOutstandingPings` option with a default limit of[39m
[90m                 10.[39m
[90m  - version: v8.9.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16676[39m
[90m    description: Added the `maxHeaderListPairs` option with a default limit of[39m
[90m                 128 header pairs.[39m
[90m  - version: v9.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15752[39m
[90m    description: Added the `Http1IncomingMessage` and `Http1ServerResponse`[39m
[90m                 option.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mmaxDeflateDynamicTableSize[39m {number} Sets the maximum dynamic table size[0m[0m[0m
      [0m      [0m[0mfor deflating header fields. [1mDefault:[22m [33m4Kib[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSessionMemory[39m{number} Sets the maximum memory that the [33mHttp2Session[39m[0m[0m[0m
      [0m      [0m[0mis permitted to use. The value is expressed in terms of number of megabytes,[0m[0m[0m
      [0m      [0m[0me.g. [33m1[39m equal 1 megabyte. The minimum value allowed is [33m1[39m.[0m[0m[0m
      [0m      [0m[0mThis is a credit based limit, existing [33mHttp2Stream[39ms may cause this[0m[0m[0m
      [0m      [0m[0mlimit to be exceeded, but new [33mHttp2Stream[39m instances will be rejected[0m[0m[0m
      [0m      [0m[0mwhile this limit is exceeded. The current number of [33mHttp2Stream[39m sessions,[0m[0m[0m
      [0m      [0m[0mthe current memory use of the header compression tables, current data[0m[0m[0m
      [0m      [0m[0mqueued to be sent, and unacknowledged [33mPING[39m and [33mSETTINGS[39m frames are all[0m[0m[0m
      [0m      [0m[0mcounted towards the current limit. [1mDefault:[22m [33m10[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxHeaderListPairs[39m {number} Sets the maximum number of header entries.[0m[0m[0m
      [0m      [0m[0mThe minimum value is [33m4[39m. [1mDefault:[22m [33m128[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxOutstandingPings[39m {number} Sets the maximum number of outstanding,[0m[0m[0m
      [0m      [0m[0munacknowledged pings. [1mDefault:[22m [33m10[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSendHeaderBlockLength[39m {number} Sets the maximum allowed size for a[0m[0m[0m
      [0m      [0m[0mserialized, compressed block of headers. Attempts to send headers that[0m[0m[0m
      [0m      [0m[0mexceed this limit will result in a [33m'frameError'[39m event being emitted[0m[0m[0m
      [0m      [0m[0mand the stream being closed and destroyed.[0m[0m[0m
      [0m
        * [0m[0m[33mpaddingStrategy[39m {number} The strategy used for determining the amount of[0m[0m[0m
      [0m      [0m[0mpadding to use for [33mHEADERS[39m and [33mDATA[39m frames. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mhttp2.constants.PADDING_STRATEGY_NONE[39m. Value may be one of:[0m
      [0m
            * [0m[0m[0m[0m[33mhttp2.constants.PADDING_STRATEGY_NONE[39m: No padding is applied.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mhttp2.constants.PADDING_STRATEGY_MAX[39m: The maximum amount of padding,[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mdetermined by the internal implementation, is applied.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mhttp2.constants.PADDING_STRATEGY_ALIGNED[39m: Attempts to apply enough[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mpadding to ensure that the total frame length, including the 9-byte[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mheader, is a multiple of 8. For each frame, there is a maximum allowed[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mnumber of padding bytes that is determined by current flow control state[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mand settings. If this maximum is less than the calculated amount needed to[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mensure alignment, the maximum is used and the total frame length is not[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mnecessarily aligned at 8 bytes.[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[33mpeerMaxConcurrentStreams[39m {number} Sets the maximum number of concurrent[0m[0m[0m
      [0m      [0m[0mstreams for the remote peer as if a [33mSETTINGS[39m frame had been received. Will[0m[0m[0m
      [0m      [0m[0mbe overridden if the remote peer sets its own value for[0m[0m[0m
      [0m      [0m[0m[33mmaxConcurrentStreams[39m. [1mDefault:[22m [33m100[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSessionInvalidFrames[39m {integer} Sets the maximum number of invalid[0m[0m[0m
      [0m      [0m[0mframes that will be tolerated before the session is closed.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m1000[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSessionRejectedStreams[39m {integer} Sets the maximum number of rejected[0m[0m[0m
      [0m      [0m[0mupon creation streams that will be tolerated before the session is closed.[0m[0m[0m
      [0m      [0m[0mEach rejection is associated with an [33mNGHTTP2_ENHANCE_YOUR_CALM[39m[0m[0m[0m
      [0m      [0m[0merror that should tell the peer to not open any more streams, continuing[0m[0m[0m
      [0m      [0m[0mto open streams is therefore regarded as a sign of a misbehaving peer.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m100[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msettings[39m {HTTP/2 Settings Object} The initial settings to send to the[0m[0m[0m
      [0m      [0m[0mremote peer upon connection.[0m[0m[0m
      [0m
        * [0m[0m[33mHttp1IncomingMessage[39m {http.IncomingMessage} Specifies the[0m[0m[0m

[0m [33mIncomingMessage[39m class to used for HTTP/1 fallback. Useful for extending[0m
[0m    the original [33mhttp.IncomingMessage[39m. [1mDefault:[22m [33mhttp.IncomingMessage[39m.[0m

    * [0m[33mHttp1ServerResponse[39m {http.ServerResponse} Specifies the [33mServerResponse[39m[0m
      [0mclass to used for HTTP/1 fallback. Useful for extending the original[0m
      [0m[33mhttp.ServerResponse[39m. [1mDefault:[22m [33mhttp.ServerResponse[39m.[0m
    * [0m[33mHttp2ServerRequest[39m {http2.Http2ServerRequest} Specifies the[0m
      [0m[33mHttp2ServerRequest[39m class to use.[0m
      [0mUseful for extending the original [33mHttp2ServerRequest[39m.[0m
      [0m[1mDefault:[22m [33mHttp2ServerRequest[39m.[0m
    * [0m[33mHttp2ServerResponse[39m {http2.Http2ServerResponse} Specifies the[0m
      [0m[33mHttp2ServerResponse[39m class to use.[0m
      [0mUseful for extending the original [33mHttp2ServerResponse[39m.[0m
      [0m[1mDefault:[22m [33mHttp2ServerResponse[39m.[0m
    * [0m...: Any [34m[33mnet.createServer()[39m[34m ([34m[4mnet.html#net_net_createserver_options_connectionlistener[24m[39m[34m)[39m option can be provided.
        * [0m[0m[33monRequestHandler[39m {Function} See [34mCompatibility API ([34m[4m#http2_compatibility_api[24m[39m[34m)[39m[0m[0m[0m
      [0m
        * [0m[0mReturns: {Http2Server}[0m[0m[0m

[0mReturns a [33mnet.Server[39m instance that creates and manages [33mHttp2Session[39m[0m
[0minstances.[0m

[0mSince there are no browsers known that support[0m
[0m[34munencrypted HTTP/2 ([34m[4mhttps://http2.github.io/faq/#does-http2-require-encryption[24m[39m[34m)[39m, the use of[0m
[0m[34m[33mhttp2.createSecureServer()[39m[34m ([34m[4m#http2_http2_createsecureserver_options_onrequesthandler[24m[39m[34m)[39m is necessary when communicating[0m
[0mwith browser clients.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    
    [90m// Create an unencrypted HTTP/2 server.[39m
    [90m// Since there are no browsers known that support[39m
    [90m// unencrypted HTTP/2, the use of `http2.createSecureServer()`[39m
    [90m// is necessary when communicating with browser clients.[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[32m,[39m [37mheaders[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m
        [32m'content-type'[39m[93m:[39m [92m'text/html'[39m[32m,[39m
        [32m':status'[39m[93m:[39m [34m200[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'<h1>Hello World</h1>'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m80[39m[90m)[39m[90m;[39m

[32m[1m### [33mhttp2.createSecureServer(options[, onRequestHandler])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v13.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30534[39m
[90m    description: Added `maxSessionRejectedStreams` option with a default of 100.[39m
[90m  - version: v13.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30534[39m
[90m    description: Added `maxSessionInvalidFrames` option with a default of 1000.[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29144[39m
[90m    description: The `PADDING_STRATEGY_CALLBACK` has been made equivalent to[39m
[90m                 providing `PADDING_STRATEGY_ALIGNED` and `selectPadding`[39m
[90m                 has been removed.[39m
[90m  - version: v10.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22956[39m
[90m    description: Added the `origins` option to automatically send an `ORIGIN`[39m
[90m                 frame on `Http2Session` startup.[39m
[90m  - version: v8.9.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17105[39m
[90m    description: Added the `maxOutstandingPings` option with a default limit of[39m
[90m                 10.[39m
[90m  - version: v8.9.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16676[39m
[90m    description: Added the `maxHeaderListPairs` option with a default limit of[39m
[90m                 128 header pairs.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mallowHTTP1[39m {boolean} Incoming client connections that do not support[0m[0m[0m
      [0m      [0m[0mHTTP/2 will be downgraded to HTTP/1.x when set to [33mtrue[39m.[0m[0m[0m
      [0m      [0m[0mSee the [34m[33m'unknownProtocol'[39m[34m ([34m[4m#http2_event_unknownprotocol[24m[39m[34m)[39m event. See [34mALPN negotiation ([34m[4m#http2_alpn_negotiation[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxDeflateDynamicTableSize[39m {number} Sets the maximum dynamic table size[0m[0m[0m
      [0m      [0m[0mfor deflating header fields. [1mDefault:[22m [33m4Kib[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSessionMemory[39m{number} Sets the maximum memory that the [33mHttp2Session[39m[0m[0m[0m
      [0m      [0m[0mis permitted to use. The value is expressed in terms of number of megabytes,[0m[0m[0m
      [0m      [0m[0me.g. [33m1[39m equal 1 megabyte. The minimum value allowed is [33m1[39m. This is a[0m[0m[0m
      [0m      [0m[0mcredit based limit, existing [33mHttp2Stream[39ms may cause this[0m[0m[0m
      [0m      [0m[0mlimit to be exceeded, but new [33mHttp2Stream[39m instances will be rejected[0m[0m[0m
      [0m      [0m[0mwhile this limit is exceeded. The current number of [33mHttp2Stream[39m sessions,[0m[0m[0m
      [0m      [0m[0mthe current memory use of the header compression tables, current data[0m[0m[0m
      [0m      [0m[0mqueued to be sent, and unacknowledged [33mPING[39m and [33mSETTINGS[39m frames are all[0m[0m[0m
      [0m      [0m[0mcounted towards the current limit. [1mDefault:[22m [33m10[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxHeaderListPairs[39m {number} Sets the maximum number of header entries.[0m[0m[0m
      [0m      [0m[0mThe minimum value is [33m4[39m. [1mDefault:[22m [33m128[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxOutstandingPings[39m {number} Sets the maximum number of outstanding,[0m[0m[0m
      [0m      [0m[0munacknowledged pings. [1mDefault:[22m [33m10[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSendHeaderBlockLength[39m {number} Sets the maximum allowed size for a[0m[0m[0m
      [0m      [0m[0mserialized, compressed block of headers. Attempts to send headers that[0m[0m[0m
      [0m      [0m[0mexceed this limit will result in a [33m'frameError'[39m event being emitted[0m[0m[0m
      [0m      [0m[0mand the stream being closed and destroyed.[0m[0m[0m
      [0m
        * [0m[0m[33mpaddingStrategy[39m {number} Strategy used for determining the amount of[0m[0m[0m
      [0m      [0m[0mpadding to use for [33mHEADERS[39m and [33mDATA[39m frames. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mhttp2.constants.PADDING_STRATEGY_NONE[39m. Value may be one of:[0m
      [0m
            * [0m[0m[0m[0m[33mhttp2.constants.PADDING_STRATEGY_NONE[39m: No padding is applied.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mhttp2.constants.PADDING_STRATEGY_MAX[39m: The maximum amount of padding,[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mdetermined by the internal implementation, is applied.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mhttp2.constants.PADDING_STRATEGY_ALIGNED[39m: Attempts to apply enough[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mpadding to ensure that the total frame length, including the[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0m9-byte header, is a multiple of 8. For each frame, there is a maximum[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mallowed number of padding bytes that is determined by current flow control[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mstate and settings. If this maximum is less than the calculated amount[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mneeded to ensure alignment, the maximum is used and the total frame length[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mis not necessarily aligned at 8 bytes.[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[33mpeerMaxConcurrentStreams[39m {number} Sets the maximum number of concurrent[0m[0m[0m
      [0m      [0m[0mstreams for the remote peer as if a [33mSETTINGS[39m frame had been received. Will[0m[0m[0m
      [0m      [0m[0mbe overridden if the remote peer sets its own value for[0m[0m[0m
      [0m      [0m[0m[33mmaxConcurrentStreams[39m. [1mDefault:[22m [33m100[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSessionInvalidFrames[39m {integer} Sets the maximum number of invalid[0m[0m[0m
      [0m      [0m[0mframes that will be tolerated before the session is closed.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m1000[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSessionRejectedStreams[39m {integer} Sets the maximum number of rejected[0m[0m[0m
      [0m      [0m[0mupon creation streams that will be tolerated before the session is closed.[0m[0m[0m
      [0m      [0m[0mEach rejection is associated with an [33mNGHTTP2_ENHANCE_YOUR_CALM[39m[0m[0m[0m
      [0m      [0m[0merror that should tell the peer to not open any more streams, continuing[0m[0m[0m
      [0m      [0m[0mto open streams is therefore regarded as a sign of a misbehaving peer.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m100[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msettings[39m {HTTP/2 Settings Object} The initial settings to send to the[0m[0m[0m
      [0m      [0m[0mremote peer upon connection.[0m[0m[0m
      [0m
        * [0m[0m...: Any [34m[33mtls.createServer()[39m[34m ([34m[4mtls.html#tls_tls_createserver_options_secureconnectionlistener[24m[39m[34m)[39m options can be provided. For[0m[0m[0m
      [0m      [0m[0mservers, the identity options ([33mpfx[39m or [33mkey[39m/[33mcert[39m) are usually required.[0m[0m[0m
      [0m
        * [0m[0m[33morigins[39m {string[]} An array of origin strings to send within an [33mORIGIN[39m[0m[0m[0m
      [0m      [0m[0mframe immediately following creation of a new server [33mHttp2Session[39m.[0m[0m[0m
    * [0m[33monRequestHandler[39m {Function} See [34mCompatibility API ([34m[4m#http2_compatibility_api[24m[39m[34m)[39m[0m
    * [0mReturns: {Http2SecureServer}[0m

[0mReturns a [33mtls.Server[39m instance that creates and manages [33mHttp2Session[39m[0m
[0minstances.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mkey[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'server-key.pem'[39m[90m)[39m[32m,[39m
      [37mcert[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'server-cert.pem'[39m[90m)[39m
    [33m}[39m[90m;[39m
    
    [90m// Create a secure HTTP/2 server[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateSecureServer[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[32m,[39m [37mheaders[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[33m{[39m
        [32m'content-type'[39m[93m:[39m [92m'text/html'[39m[32m,[39m
        [32m':status'[39m[93m:[39m [34m200[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mend[39m[90m([39m[92m'<h1>Hello World</h1>'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m80[39m[90m)[39m[90m;[39m

[32m[1m### [33mhttp2.connect(authority[, options][, listener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29144[39m
[90m    description: The `PADDING_STRATEGY_CALLBACK` has been made equivalent to[39m
[90m                 providing `PADDING_STRATEGY_ALIGNED` and `selectPadding`[39m
[90m                 has been removed.[39m
[90m  - version: v8.9.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17105[39m
[90m    description: Added the `maxOutstandingPings` option with a default limit of[39m
[90m                 10.[39m
[90m  - version: v8.9.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16676[39m
[90m    description: Added the `maxHeaderListPairs` option with a default limit of[39m
[90m                 128 header pairs.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mauthority[39m {string|URL} The remote HTTP/2 server to connect to. This must[0m
      [0mbe in the form of a minimal, valid URL with the [33mhttp://[39m or [33mhttps://[39m[0m
      [0mprefix, host name, and IP port (if a non-default port is used). Userinfo[0m
      [0m(user ID and password), path, querystring, and fragment details in the[0m
      [0mURL will be ignored.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mmaxDeflateDynamicTableSize[39m {number} Sets the maximum dynamic table size[0m[0m[0m
      [0m      [0m[0mfor deflating header fields. [1mDefault:[22m [33m4Kib[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSessionMemory[39m{number} Sets the maximum memory that the [33mHttp2Session[39m[0m[0m[0m
      [0m      [0m[0mis permitted to use. The value is expressed in terms of number of megabytes,[0m[0m[0m
      [0m      [0m[0me.g. [33m1[39m equal 1 megabyte. The minimum value allowed is [33m1[39m.[0m[0m[0m
      [0m      [0m[0mThis is a credit based limit, existing [33mHttp2Stream[39ms may cause this[0m[0m[0m
      [0m      [0m[0mlimit to be exceeded, but new [33mHttp2Stream[39m instances will be rejected[0m[0m[0m
      [0m      [0m[0mwhile this limit is exceeded. The current number of [33mHttp2Stream[39m sessions,[0m[0m[0m
      [0m      [0m[0mthe current memory use of the header compression tables, current data[0m[0m[0m
      [0m      [0m[0mqueued to be sent, and unacknowledged [33mPING[39m and [33mSETTINGS[39m frames are all[0m[0m[0m
      [0m      [0m[0mcounted towards the current limit. [1mDefault:[22m [33m10[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxHeaderListPairs[39m {number} Sets the maximum number of header entries.[0m[0m[0m
      [0m      [0m[0mThe minimum value is [33m1[39m. [1mDefault:[22m [33m128[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxOutstandingPings[39m {number} Sets the maximum number of outstanding,[0m[0m[0m
      [0m      [0m[0munacknowledged pings. [1mDefault:[22m [33m10[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxReservedRemoteStreams[39m {number} Sets the maximum number of reserved push[0m[0m[0m
      [0m      [0m[0mstreams the client will accept at any given time. Once the current number of[0m[0m[0m
      [0m      [0m[0mcurrently reserved push streams exceeds reaches this limit, new push streams[0m[0m[0m
      [0m      [0m[0msent by the server will be automatically rejected. The minimum allowed value[0m[0m[0m
      [0m      [0m[0mis 0. The maximum allowed value is 2[90m<sup>[39m32[90m</sup>[39m-1. A negative value sets[0m[0m[0m
      [0m      [0m[0mthis option to the maximum allowed value. [1mDefault:[22m [33m200[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSendHeaderBlockLength[39m {number} Sets the maximum allowed size for a[0m[0m[0m
      [0m      [0m[0mserialized, compressed block of headers. Attempts to send headers that[0m[0m[0m
      [0m      [0m[0mexceed this limit will result in a [33m'frameError'[39m event being emitted[0m[0m[0m
      [0m      [0m[0mand the stream being closed and destroyed.[0m[0m[0m
      [0m
        * [0m[0m[33mpaddingStrategy[39m {number} Strategy used for determining the amount of[0m[0m[0m
      [0m      [0m[0mpadding to use for [33mHEADERS[39m and [33mDATA[39m frames. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mhttp2.constants.PADDING_STRATEGY_NONE[39m. Value may be one of:[0m
      [0m
            * [0m[0m[0m[0m[33mhttp2.constants.PADDING_STRATEGY_NONE[39m: No padding is applied.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mhttp2.constants.PADDING_STRATEGY_MAX[39m: The maximum amount of padding,[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mdetermined by the internal implementation, is applied.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mhttp2.constants.PADDING_STRATEGY_ALIGNED[39m: Attempts to apply enough[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mpadding to ensure that the total frame length, including the[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0m9-byte header, is a multiple of 8. For each frame, there is a maximum[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mallowed number of padding bytes that is determined by current flow control[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mstate and settings. If this maximum is less than the calculated amount[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mneeded to ensure alignment, the maximum is used and the total frame length[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mis not necessarily aligned at 8 bytes.[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[33mpeerMaxConcurrentStreams[39m {number} Sets the maximum number of concurrent[0m[0m[0m
      [0m      [0m[0mstreams for the remote peer as if a [33mSETTINGS[39m frame had been received. Will[0m[0m[0m
      [0m      [0m[0mbe overridden if the remote peer sets its own value for[0m[0m[0m
      [0m      [0m[0m[33mmaxConcurrentStreams[39m. [1mDefault:[22m [33m100[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mprotocol[39m {string} The protocol to connect with, if not set in the[0m[0m[0m
      [0m      [0m[0m[33mauthority[39m. Value may be either [33m'http:'[39m or [33m'https:'[39m. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m'https:'[39m[0m[0m[0m
      [0m
        * [0m[0m[33msettings[39m {HTTP/2 Settings Object} The initial settings to send to the[0m[0m[0m
      [0m      [0m[0mremote peer upon connection.[0m[0m[0m
      [0m
        * [0m[0m[33mcreateConnection[39m {Function} An optional callback that receives the [33mURL[39m[0m[0m[0m
      [0m      [0m[0minstance passed to [33mconnect[39m and the [33moptions[39m object, and returns any[0m[0m[0m
      [0m      [0m[0m[34m[33mDuplex[39m[34m ([34m[4mstream.html#stream_class_stream_duplex[24m[39m[34m)[39m stream that is to be used as the connection for this session.[0m[0m[0m
      [0m
        * [0m[0m...: Any [34m[33mnet.connect()[39m[34m ([34m[4mnet.html#net_net_connect[24m[39m[34m)[39m or [34m[33mtls.connect()[39m[34m ([34m[4mtls.html#tls_tls_connect_options_callback[24m[39m[34m)[39m options can be provided.[0m[0m[0m
    * [0m[33mlistener[39m {Function} Will be registered as a one-time listener of the[0m
      [0m[34m[33m'connect'[39m[34m ([34m[4m#http2_event_connect[24m[39m[34m)[39m event.[0m
    * [0mReturns: {ClientHttp2Session}[0m

[0mReturns a [33mClientHttp2Session[39m instance.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'https://localhost:1234'[39m[90m)[39m[90m;[39m
    
    [90m/* Use the client */[39m
    
    [37mclient[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33mhttp2.constants[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[32m[1m#### Error Codes for [33mRST_STREAM[39m[32m and [33mGOAWAY[39m[32m[22m[39m

[0m[90m<a id="error_codes">[39m[90m</a>[39m[0m

[0m┌───────┬─────────────────────┬─────────────────────────────────────────────┐[0m
[0m│ Value │ Name                │ Constant                                    │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x00[39m  │ No Error            │ [33mhttp2.constants.NGHTTP2_NO_ERROR[39m            │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x01[39m  │ Protocol Error      │ [33mhttp2.constants.NGHTTP2_PROTOCOL_ERROR[39m      │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x02[39m  │ Internal Error      │ [33mhttp2.constants.NGHTTP2_INTERNAL_ERROR[39m      │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x03[39m  │ Flow Control Error  │ [33mhttp2.constants.NGHTTP2_FLOW_CONTROL_ERROR[39m  │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x04[39m  │ Settings Timeout    │ [33mhttp2.constants.NGHTTP2_SETTINGS_TIMEOUT[39m    │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x05[39m  │ Stream Closed       │ [33mhttp2.constants.NGHTTP2_STREAM_CLOSED[39m       │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x06[39m  │ Frame Size Error    │ [33mhttp2.constants.NGHTTP2_FRAME_SIZE_ERROR[39m    │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x07[39m  │ Refused Stream      │ [33mhttp2.constants.NGHTTP2_REFUSED_STREAM[39m      │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x08[39m  │ Cancel              │ [33mhttp2.constants.NGHTTP2_CANCEL[39m              │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x09[39m  │ Compression Error   │ [33mhttp2.constants.NGHTTP2_COMPRESSION_ERROR[39m   │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x0a[39m  │ Connect Error       │ [33mhttp2.constants.NGHTTP2_CONNECT_ERROR[39m       │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x0b[39m  │ Enhance Your Calm   │ [33mhttp2.constants.NGHTTP2_ENHANCE_YOUR_CALM[39m   │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x0c[39m  │ Inadequate Security │ [33mhttp2.constants.NGHTTP2_INADEQUATE_SECURITY[39m │[0m
[0m├───────┼─────────────────────┼─────────────────────────────────────────────┤[0m
[0m│ [33m0x0d[39m  │ HTTP/1.1 Required   │ [33mhttp2.constants.NGHTTP2_HTTP_1_1_REQUIRED[39m   │[0m
[0m└───────┴─────────────────────┴─────────────────────────────────────────────┘[0m

[0mThe [33m'timeout'[39m event is emitted when there is no activity on the Server for[0m
[0ma given number of milliseconds set using [33mhttp2server.setTimeout()[39m.[0m

[32m[1m### [33mhttp2.getDefaultSettings()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {HTTP/2 Settings Object}[0m

[0mReturns an object containing the default settings for an [33mHttp2Session[39m[0m
[0minstance. This method returns a new object instance every time it is called[0m
[0mso instances returned may be safely modified for use.[0m

[32m[1m### [33mhttp2.getPackedSettings([settings])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msettings[39m {HTTP/2 Settings Object}[0m
    * [0mReturns: {Buffer}[0m

[0mReturns a [33mBuffer[39m instance containing serialized representation of the given[0m
[0mHTTP/2 settings as specified in the [34mHTTP/2 ([34m[4mhttps://tools.ietf.org/html/rfc7540[24m[39m[34m)[39m specification. This is intended[0m
[0mfor use with the [33mHTTP2-Settings[39m header field.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mpacked[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mgetPackedSettings[39m[90m([39m[33m{[39m [37menablePush[39m[93m:[39m [91mfalse[39m [33m}[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mpacked[39m[32m.[39m[37mtoString[39m[90m([39m[92m'base64'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: AAIAAAAA[39m

[32m[1m### [33mhttp2.getUnpackedSettings(buf)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuf[39m {Buffer|Uint8Array} The packed settings.[0m
    * [0mReturns: {HTTP/2 Settings Object}[0m

[0mReturns a [34mHTTP/2 Settings Object ([34m[4m#http2_settings_object[24m[39m[34m)[39m containing the deserialized settings from[0m
[0mthe given [33mBuffer[39m as generated by [33mhttp2.getPackedSettings()[39m.[0m

[32m[1m### Headers Object[22m[39m

[0mHeaders are represented as own-properties on JavaScript objects. The property[0m
[0mkeys will be serialized to lower-case. Property values should be strings (if[0m
[0mthey are not they will be coerced to strings) or an [33mArray[39m of strings (in order[0m
[0mto send more than one value per header field).[0m

    [94mconst[39m [37mheaders[39m [93m=[39m [33m{[39m
      [32m':status'[39m[93m:[39m [92m'200'[39m[32m,[39m
      [32m'content-type'[39m[93m:[39m [92m'text-plain'[39m[32m,[39m
      [32m'ABC'[39m[93m:[39m [33m[[39m[92m'has'[39m[32m,[39m [92m'more'[39m[32m,[39m [92m'than'[39m[32m,[39m [92m'one'[39m[32m,[39m [92m'value'[39m[33m][39m
    [33m}[39m[90m;[39m
    
    [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[37mheaders[39m[90m)[39m[90m;[39m

[0mHeader objects passed to callback functions will have a [33mnull[39m prototype. This[0m
[0mmeans that normal JavaScript object methods such as[0m
[0m[33mObject.prototype.toString()[39m and [33mObject.prototype.hasOwnProperty()[39m will[0m
[0mnot work.[0m

[0mFor incoming headers:[0m

    * [0mThe [33m:status[39m header is converted to [33mnumber[39m.[0m
    * [0mDuplicates of [33m:status[39m, [33m:method[39m, [33m:authority[39m, [33m:scheme[39m, [33m:path[39m,[0m
      [0m[33m:protocol[39m, [33mage[39m, [33mauthorization[39m, [33maccess-control-allow-credentials[39m,[0m
      [0m[33maccess-control-max-age[39m, [33maccess-control-request-method[39m, [33mcontent-encoding[39m,[0m
      [0m[33mcontent-language[39m, [33mcontent-length[39m, [33mcontent-location[39m, [33mcontent-md5[39m,[0m
      [0m[33mcontent-range[39m, [33mcontent-type[39m, [33mdate[39m, [33mdnt[39m, [33metag[39m, [33mexpires[39m, [33mfrom[39m,[0m
      [0m[33mif-match[39m, [33mif-modified-since[39m, [33mif-none-match[39m, [33mif-range[39m,[0m
      [0m[33mif-unmodified-since[39m, [33mlast-modified[39m, [33mlocation[39m, [33mmax-forwards[39m,[0m
      [0m[33mproxy-authorization[39m, [33mrange[39m, [33mreferer[39m,[33mretry-after[39m, [33mtk[39m,[0m
      [0m[33mupgrade-insecure-requests[39m, [33muser-agent[39m or [33mx-content-type-options[39m are[0m
      [0mdiscarded.[0m
    * [0m[33mset-cookie[39m is always an array. Duplicates are added to the array.[0m
    * [0mFor duplicate [33mcookie[39m headers, the values are joined together with '; '.[0m
    * [0mFor all other headers, the values are joined together with ', '.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[32m,[39m [37mheaders[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mheaders[39m[33m[[39m[92m':path'[39m[33m][39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mheaders[39m[32m.[39m[37mABC[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Settings Object[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v12.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29833[39m
[90m    description: The `maxConcurrentStreams` setting is stricter.[39m
[90m  - version: v8.9.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16676[39m
[90m    description: The `maxHeaderListSize` setting is now strictly enforced.[39m
[90m-->[39m
[90m[39m[0mThe [33mhttp2.getDefaultSettings()[39m, [33mhttp2.getPackedSettings()[39m,[0m
[0m[33mhttp2.createServer()[39m, [33mhttp2.createSecureServer()[39m,[0m
[0m[33mhttp2session.settings()[39m, [33mhttp2session.localSettings[39m, and[0m
[0m[33mhttp2session.remoteSettings[39m APIs either return or receive as input an[0m
[0mobject that defines configuration settings for an [33mHttp2Session[39m object.[0m
[0mThese objects are ordinary JavaScript objects containing the following[0m
[0mproperties.[0m

    * [0m[33mheaderTableSize[39m {number} Specifies the maximum number of bytes used for[0m
      [0mheader compression. The minimum allowed value is 0. The maximum allowed value[0m
      [0mis 2[90m<sup>[39m32[90m</sup>[39m-1. [1mDefault:[22m [33m4,096 octets[39m.[0m
    * [0m[33menablePush[39m {boolean} Specifies [33mtrue[39m if HTTP/2 Push Streams are to be[0m
      [0mpermitted on the [33mHttp2Session[39m instances. [1mDefault:[22m [33mtrue[39m.[0m
    * [0m[33minitialWindowSize[39m {number} Specifies the [3msenders[23m initial window size[0m
      [0mfor stream-level flow control. The minimum allowed value is 0. The maximum[0m
      [0mallowed value is 2[90m<sup>[39m32[90m</sup>[39m-1. [1mDefault:[22m [33m65,535 bytes[39m.[0m
    * [0m[33mmaxFrameSize[39m {number} Specifies the size of the largest frame payload.[0m
      [0mThe minimum allowed value is 16,384. The maximum allowed value[0m
      [0mis 2[90m<sup>[39m24[90m</sup>[39m-1. [1mDefault:[22m [33m16,384 bytes[39m.[0m
    * [0m[33mmaxConcurrentStreams[39m {number} Specifies the maximum number of concurrent[0m
      [0mstreams permitted on an [33mHttp2Session[39m. There is no default value which[0m
      [0mimplies, at least theoretically, 2[90m<sup>[39m32[90m</sup>[39m-1 streams may be open[0m
      [0mconcurrently at any given time in an [33mHttp2Session[39m. The minimum value[0m
      [0mis 0. The maximum allowed value is 2[90m<sup>[39m32[90m</sup>[39m-1. [1mDefault:[22m[0m
      [0m[33m4294967295[39m.[0m
    * [0m[33mmaxHeaderListSize[39m {number} Specifies the maximum size (uncompressed octets)[0m
      [0mof header list that will be accepted. The minimum allowed value is 0. The[0m
      [0mmaximum allowed value is 2[90m<sup>[39m32[90m</sup>[39m-1. [1mDefault:[22m [33m65535[39m.[0m
    * [0m[33menableConnectProtocol[39m{boolean} Specifies [33mtrue[39m if the "Extended Connect[0m
      [0mProtocol" defined by [34mRFC 8441 ([34m[4mhttps://tools.ietf.org/html/rfc8441[24m[39m[34m)[39m is to be enabled. This setting is only[0m
      [0mmeaningful if sent by the server. Once the [33menableConnectProtocol[39m setting[0m
      [0mhas been enabled for a given [33mHttp2Session[39m, it cannot be disabled.[0m
      [0m[1mDefault:[22m [33mfalse[39m.[0m

[0mAll additional properties on the settings object are ignored.[0m

[32m[1m### Error Handling[22m[39m

[0mThere are several types of error conditions that may arise when using the[0m
[0m[33mhttp2[39m module:[0m

[0mValidation errors occur when an incorrect argument, option, or setting value is[0m
[0mpassed in. These will always be reported by a synchronous [33mthrow[39m.[0m

[0mState errors occur when an action is attempted at an incorrect time (for[0m
[0minstance, attempting to send data on a stream after it has closed). These will[0m
[0mbe reported using either a synchronous [33mthrow[39m or via an [33m'error'[39m event on[0m
[0mthe [33mHttp2Stream[39m, [33mHttp2Session[39m or HTTP/2 Server objects, depending on where[0m
[0mand when the error occurs.[0m

[0mInternal errors occur when an HTTP/2 session fails unexpectedly. These will be[0m
[0mreported via an [33m'error'[39m event on the [33mHttp2Session[39m or HTTP/2 Server objects.[0m

[0mProtocol errors occur when various HTTP/2 protocol constraints are violated.[0m
[0mThese will be reported using either a synchronous [33mthrow[39m or via an [33m'error'[39m[0m
[0mevent on the [33mHttp2Stream[39m, [33mHttp2Session[39m or HTTP/2 Server objects, depending[0m
[0mon where and when the error occurs.[0m

[32m[1m### Invalid character handling in header names and values[22m[39m

[0mThe HTTP/2 implementation applies stricter handling of invalid characters in[0m
[0mHTTP header names and values than the HTTP/1 implementation.[0m

[0mHeader field names are [3mcase-insensitive[23m and are transmitted over the wire[0m
[0mstrictly as lower-case strings. The API provided by Node.js allows header[0m
[0mnames to be set as mixed-case strings (e.g. [33mContent-Type[39m) but will convert[0m
[0mthose to lower-case (e.g. [33mcontent-type[39m) upon transmission.[0m

[0mHeader field-names [3mmust only[23m contain one or more of the following ASCII[0m
[0mcharacters: [33ma[39m-[33mz[39m, [33mA[39m-[33mZ[39m, [33m0[39m-[33m9[39m, [33m![39m, [33m#[39m, [33m$[39m, [33m%[39m, [33m&[39m, [33m'[39m, [33m*[39m, [33m+[39m,[0m
[0m[33m-[39m, [33m.[39m, [33m^[39m, [33m_[39m, [33m`[39m (backtick), [33m|[39m, and [33m~[39m.[0m

[0mUsing invalid characters within an HTTP header field name will cause the[0m
[0mstream to be closed with a protocol error being reported.[0m

[0mHeader field values are handled with more leniency but [3mshould[23m not contain[0m
[0mnew-line or carriage return characters and [3mshould[23m be limited to US-ASCII[0m
[0mcharacters, per the requirements of the HTTP specification.[0m

[32m[1m### Push streams on the client[22m[39m

[0mTo receive pushed streams on the client, set a listener for the [33m'stream'[39m[0m
[0mevent on the [33mClientHttp2Session[39m:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mclient[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'http://localhost'[39m[90m)[39m[90m;[39m
    
    [37mclient[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mpushedStream[39m[32m,[39m [37mrequestHeaders[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mpushedStream[39m[32m.[39m[37mon[39m[90m([39m[92m'push'[39m[32m,[39m [90m([39m[37mresponseHeaders[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// Process response headers[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mpushedStream[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m [90m/* handle pushed data */[39m [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mreq[39m [93m=[39m [37mclient[39m[32m.[39m[37mrequest[39m[90m([39m[33m{[39m [32m':path'[39m[93m:[39m [92m'/'[39m [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Supporting the [33mCONNECT[39m[32m method[22m[39m

[0mThe [33mCONNECT[39m method is used to allow an HTTP/2 server to be used as a proxy[0m
[0mfor TCP/IP connections.[0m

[0mA simple TCP Server:[0m

    [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mlet[39m [37mname[39m [93m=[39m [92m''[39m[90m;[39m
      [37msocket[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
      [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [37mname[39m [93m+=[39m [37mchunk[39m[90m)[39m[90m;[39m
      [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [37msocket[39m[32m.[39m[37mend[39m[90m([39m`hello ${[37mname[39m}`[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m8000[39m[90m)[39m[90m;[39m

[0mAn HTTP/2 CONNECT proxy:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mNGHTTP2_REFUSED_STREAM[39m [33m}[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconstants[39m[90m;[39m
    [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mproxy[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mproxy[39m[32m.[39m[37mon[39m[90m([39m[92m'stream'[39m[32m,[39m [90m([39m[37mstream[39m[32m,[39m [37mheaders[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mheaders[39m[33m[[39m[92m':method'[39m[33m][39m [93m!==[39m [92m'CONNECT'[39m[90m)[39m [33m{[39m
        [90m// Only accept CONNECT requests[39m
        [37mstream[39m[32m.[39m[37mclose[39m[90m([39m[37mNGHTTP2_REFUSED_STREAM[39m[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
      [94mconst[39m [37mauth[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m`tcp://${[37mheaders[39m[33m[[39m[92m':authority'[39m[33m][39m}`[90m)[39m[90m;[39m
      [90m// It's a very good idea to verify that hostname and port are[39m
      [90m// things this proxy should be connecting to.[39m
      [94mconst[39m [37msocket[39m [93m=[39m [37mnet[39m[32m.[39m[37mconnect[39m[90m([39m[37mauth[39m[32m.[39m[37mport[39m[32m,[39m [37mauth[39m[32m.[39m[37mhostname[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mstream[39m[32m.[39m[37mrespond[39m[90m([39m[90m)[39m[90m;[39m
        [37msocket[39m[32m.[39m[37mpipe[39m[90m([39m[37mstream[39m[90m)[39m[90m;[39m
        [37mstream[39m[32m.[39m[37mpipe[39m[90m([39m[37msocket[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[91merror[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mstream[39m[32m.[39m[37mclose[39m[90m([39m[37mhttp2[39m[32m.[39m[37mconstants[39m[32m.[39m[37mNGHTTP2_CONNECT_ERROR[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mproxy[39m[32m.[39m[37mlisten[39m[90m([39m[34m8001[39m[90m)[39m[90m;[39m

[0mAn HTTP/2 CONNECT client:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mclient[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'http://localhost:8001'[39m[90m)[39m[90m;[39m
    
    [90m// Must not specify the ':path' and ':scheme' headers[39m
    [90m// for CONNECT requests or an error will be thrown.[39m
    [94mconst[39m [37mreq[39m [93m=[39m [37mclient[39m[32m.[39m[37mrequest[39m[90m([39m[33m{[39m
      [32m':method'[39m[93m:[39m [92m'CONNECT'[39m[32m,[39m
      [32m':authority'[39m[93m:[39m `localhost:${[37mport[39m}`
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'response'[39m[32m,[39m [90m([39m[37mheaders[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mheaders[39m[33m[[39m[37mhttp2[39m[32m.[39m[37mconstants[39m[32m.[39m[37mHTTP2_HEADER_STATUS[39m[33m][39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [94mlet[39m [37mdata[39m [93m=[39m [92m''[39m[90m;[39m
    [37mreq[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [37mdata[39m [93m+=[39m [37mchunk[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`The server says: ${[37mdata[39m}`[90m)[39m[90m;[39m
      [37mclient[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mend[39m[90m([39m[92m'Jane'[39m[90m)[39m[90m;[39m

[32m[1m### The Extended [33mCONNECT[39m[32m Protocol[22m[39m

[0m[34mRFC 8441 ([34m[4mhttps://tools.ietf.org/html/rfc8441[24m[39m[34m)[39m defines an "Extended CONNECT Protocol" extension to HTTP/2 that[0m
[0mmay be used to bootstrap the use of an [33mHttp2Stream[39m using the [33mCONNECT[39m[0m
[0mmethod as a tunnel for other communication protocols (such as WebSockets).[0m

[0mThe use of the Extended CONNECT Protocol is enabled by HTTP/2 servers by using[0m
[0mthe [33menableConnectProtocol[39m setting:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37msettings[39m [93m=[39m [33m{[39m [37menableConnectProtocol[39m[93m:[39m [91mtrue[39m [33m}[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[33m{[39m [37msettings[39m [33m}[39m[90m)[39m[90m;[39m

[0mOnce the client receives the [33mSETTINGS[39m frame from the server indicating that[0m
[0mthe extended CONNECT may be used, it may send [33mCONNECT[39m requests that use the[0m
[0m[33m':protocol'[39m HTTP/2 pseudo-header:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mconnect[39m[90m([39m[92m'http://localhost:8080'[39m[90m)[39m[90m;[39m
    [37mclient[39m[32m.[39m[37mon[39m[90m([39m[92m'remoteSettings'[39m[32m,[39m [90m([39m[37msettings[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37msettings[39m[32m.[39m[37menableConnectProtocol[39m[90m)[39m [33m{[39m
        [94mconst[39m [37mreq[39m [93m=[39m [37mclient[39m[32m.[39m[37mrequest[39m[90m([39m[33m{[39m [32m':method'[39m[93m:[39m [92m'CONNECT'[39m[32m,[39m [32m':protocol'[39m[93m:[39m [92m'foo'[39m [33m}[39m[90m)[39m[90m;[39m
        [90m// ...[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Compatibility API[22m[39m

[0mThe Compatibility API has the goal of providing a similar developer experience[0m
[0mof HTTP/1 when using HTTP/2, making it possible to develop applications[0m
[0mthat support both [34mHTTP/1 ([34m[4mhttp.html[24m[39m[34m)[39m and HTTP/2. This API targets only the[0m
[0m[1mpublic API[22m of the [34mHTTP/1 ([34m[4mhttp.html[24m[39m[34m)[39m. However many modules use internal[0m
[0mmethods or state, and those [3mare not supported[23m as it is a completely[0m
[0mdifferent implementation.[0m

[0mThe following example creates an HTTP/2 server using the compatibility[0m
[0mAPI:[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'text/html'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'X-Foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'ok'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIn order to create a mixed [34mHTTPS ([34m[4mhttps.html[24m[39m[34m)[39m and HTTP/2 server, refer to the[0m
[0m[34mALPN negotiation ([34m[4m#http2_alpn_negotiation[24m[39m[34m)[39m section.[0m
[0mUpgrading from non-tls HTTP/1 servers is not supported.[0m

[0mThe HTTP/2 compatibility API is composed of [34m[33mHttp2ServerRequest[39m[34m ([34m[4m#http2_class_http2_http2serverrequest[24m[39m[34m)[39m and[0m
[0m[34m[33mHttp2ServerResponse[39m[34m ([34m[4m#class-http2http2serverresponse[24m[39m[34m)[39m. They aim at API compatibility with HTTP/1, but[0m
[0mthey do not hide the differences between the protocols. As an example,[0m
[0mthe status message for HTTP codes is ignored.[0m

[32m[1m### ALPN negotiation[22m[39m

[0mALPN negotiation allows supporting both [34mHTTPS ([34m[4mhttps.html[24m[39m[34m)[39m and HTTP/2 over[0m
[0mthe same socket. The [33mreq[39m and [33mres[39m objects can be either HTTP/1 or[0m
[0mHTTP/2, and an application [1mmust[22m restrict itself to the public API of[0m
[0m[34mHTTP/1 ([34m[4mhttp.html[24m[39m[34m)[39m, and detect if it is possible to use the more advanced[0m
[0mfeatures of HTTP/2.[0m

[0mThe following example creates a server that supports both protocols:[0m

    [94mconst[39m [33m{[39m [37mcreateSecureServer[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mreadFileSync[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcert[39m [93m=[39m [37mreadFileSync[39m[90m([39m[92m'./cert.pem'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mkey[39m [93m=[39m [37mreadFileSync[39m[90m([39m[92m'./key.pem'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mcreateSecureServer[39m[90m([39m
      [33m{[39m [37mcert[39m[32m,[39m [37mkey[39m[32m,[39m [37mallowHTTP1[39m[93m:[39m [91mtrue[39m [33m}[39m[32m,[39m
      [37monRequest[39m
    [90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m4443[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37monRequest[39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [33m{[39m
      [90m// Detects if it is a HTTPS request or HTTP/2[39m
      [94mconst[39m [33m{[39m [37msocket[39m[93m:[39m [33m{[39m [37malpnProtocol[39m [33m}[39m [33m}[39m [93m=[39m [37mreq[39m[32m.[39m[37mhttpVersion[39m [93m===[39m [92m'2.0'[39m [93m?[39m
        [37mreq[39m[32m.[39m[37mstream[39m[32m.[39m[37msession[39m [93m:[39m [37mreq[39m[90m;[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'content-type'[39m[93m:[39m [92m'application/json'[39m [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[33m{[39m
        [37malpnProtocol[39m[32m,[39m
        [37mhttpVersion[39m[93m:[39m [37mreq[39m[32m.[39m[37mhttpVersion[39m
      [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m

[0mThe [33m'request'[39m event works identically on both [34mHTTPS ([34m[4mhttps.html[24m[39m[34m)[39m and[0m
[0mHTTP/2.[0m

[32m[1m### Class: [33mhttp2.Http2ServerRequest[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {stream.Readable}[0m

[0mA [33mHttp2ServerRequest[39m object is created by [34m[33mhttp2.Server[39m[34m ([34m[4m#http2_class_http2server[24m[39m[34m)[39m or[0m
[0m[34m[33mhttp2.SecureServer[39m[34m ([34m[4m#http2_class_http2secureserver[24m[39m[34m)[39m and passed as the first argument to the[0m
[0m[34m[33m'request'[39m[34m ([34m[4m#http2_event_request[24m[39m[34m)[39m event. It may be used to access a request status, headers, and[0m
[0mdata.[0m

[32m[1m#### Event: [33m'aborted'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'aborted'[39m event is emitted whenever a [33mHttp2ServerRequest[39m instance is[0m
[0mabnormally aborted in mid-communication.[0m

[0mThe [33m'aborted'[39m event will only be emitted if the [33mHttp2ServerRequest[39m writable[0m
[0mside has not been ended.[0m

[32m[1m#### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mIndicates that the underlying [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39m was closed.[0m
[0mJust like [33m'end'[39m, this event occurs only once per response.[0m

[32m[1m#### [33mrequest.aborted[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThe [33mrequest.aborted[39m property will be [33mtrue[39m if the request has[0m
[0mbeen aborted.[0m

[32m[1m#### [33mrequest.authority[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe request authority pseudo header field. It can also be accessed via[0m
[0m[33mreq.headers[':authority'][39m.[0m

[32m[1m#### [33mrequest.complete[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThe [33mrequest.complete[39m property will be [33mtrue[39m if the request has[0m
[0mbeen completed, aborted, or destroyed.[0m

[32m[1m#### [33mrequest.connection[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mdeprecated: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated. Use [34m[33mrequest.socket[39m[90m[34m ([34m[4m#http2_request_socket[24m[39m[90m[34m)[39m[90m.[0m[23m[39m

    * [0m{net.Socket|tls.TLSSocket}[0m

[0mSee [34m[33mrequest.socket[39m[34m ([34m[4m#http2_request_socket[24m[39m[34m)[39m.[0m

[32m[1m#### [33mrequest.destroy([error])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merror[39m {Error}[0m

[0mCalls [33mdestroy()[39m on the [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39m that received[0m
[0mthe [34m[33mHttp2ServerRequest[39m[34m ([34m[4m#http2_class_http2_http2serverrequest[24m[39m[34m)[39m. If [33merror[39m is provided, an [33m'error'[39m event[0m
[0mis emitted and [33merror[39m is passed as an argument to any listeners on the event.[0m

[0mIt does nothing if the stream was already destroyed.[0m

[32m[1m#### [33mrequest.headers[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe request/response headers object.[0m

[0mKey-value pairs of header names and values. Header names are lower-cased.[0m

    [90m// Prints something like:[39m
    [90m//[39m
    [90m// { 'user-agent': 'curl/7.22.0',[39m
    [90m//   host: '127.0.0.1:8000',[39m
    [90m//   accept: '*/*' }[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mrequest[39m[32m.[39m[37mheaders[39m[90m)[39m[90m;[39m

[0mSee [34mHTTP/2 Headers Object ([34m[4m#http2_headers_object[24m[39m[34m)[39m.[0m

[0mIn HTTP/2, the request path, host name, protocol, and method are represented as[0m
[0mspecial headers prefixed with the [33m:[39m character (e.g. [33m':path'[39m). These special[0m
[0mheaders will be included in the [33mrequest.headers[39m object. Care must be taken not[0m
[0mto inadvertently modify these special headers or errors may occur. For instance,[0m
[0mremoving all headers from the request will cause errors to occur:[0m

    [37mremoveAllHeaders[39m[90m([39m[37mrequest[39m[32m.[39m[37mheaders[39m[90m)[39m[90m;[39m
    [37massert[39m[90m([39m[37mrequest[39m[32m.[39m[37murl[39m[90m)[39m[90m;[39m   [90m// Fails because the :path header has been removed[39m

[32m[1m#### [33mrequest.httpVersion[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mIn case of server request, the HTTP version sent by the client. In the case of[0m
[0mclient response, the HTTP version of the connected-to server. Returns[0m
[0m[33m'2.0'[39m.[0m

[0mAlso [33mmessage.httpVersionMajor[39m is the first integer and[0m
[0m[33mmessage.httpVersionMinor[39m is the second.[0m

[32m[1m#### [33mrequest.method[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe request method as a string. Read-only. Examples: [33m'GET'[39m, [33m'DELETE'[39m.[0m

[32m[1m#### [33mrequest.rawHeaders[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]}[0m

[0mThe raw request/response headers list exactly as they were received.[0m

[0mThe keys and values are in the same list. It is [3mnot[23m a[0m
[0mlist of tuples. So, the even-numbered offsets are key values, and the[0m
[0modd-numbered offsets are the associated values.[0m

[0mHeader names are not lowercased, and duplicates are not merged.[0m

    [90m// Prints something like:[39m
    [90m//[39m
    [90m// [ 'user-agent',[39m
    [90m//   'this is invalid because there can be only one',[39m
    [90m//   'User-Agent',[39m
    [90m//   'curl/7.22.0',[39m
    [90m//   'Host',[39m
    [90m//   '127.0.0.1:8000',[39m
    [90m//   'ACCEPT',[39m
    [90m//   '*/*' ][39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mrequest[39m[32m.[39m[37mrawHeaders[39m[90m)[39m[90m;[39m

[32m[1m#### [33mrequest.rawTrailers[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]}[0m

[0mThe raw request/response trailer keys and values exactly as they were[0m
[0mreceived. Only populated at the [33m'end'[39m event.[0m

[32m[1m#### [33mrequest.scheme[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe request scheme pseudo header field indicating the scheme[0m
[0mportion of the target URL.[0m

[32m[1m#### [33mrequest.setTimeout(msecs, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {http2.Http2ServerRequest}[0m

[0mSets the [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39m's timeout value to [33mmsecs[39m. If a callback is[0m
[0mprovided, then it is added as a listener on the [33m'timeout'[39m event on[0m
[0mthe response object.[0m

[0mIf no [33m'timeout'[39m listener is added to the request, the response, or[0m
[0mthe server, then [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39ms are destroyed when they time out. If a[0m
[0mhandler is assigned to the request, the response, or the server's [33m'timeout'[39m[0m
[0mevents, timed out sockets must be handled explicitly.[0m

[32m[1m#### [33mrequest.socket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{net.Socket|tls.TLSSocket}[0m

[0mReturns a [33mProxy[39m object that acts as a [33mnet.Socket[39m (or [33mtls.TLSSocket[39m) but[0m
[0mapplies getters, setters, and methods based on HTTP/2 logic.[0m

[0m[33mdestroyed[39m, [33mreadable[39m, and [33mwritable[39m properties will be retrieved from and[0m
[0mset on [33mrequest.stream[39m.[0m

[0m[33mdestroy[39m, [33memit[39m, [33mend[39m, [33mon[39m and [33monce[39m methods will be called on[0m
[0m[33mrequest.stream[39m.[0m

[0m[33msetTimeout[39m method will be called on [33mrequest.stream.session[39m.[0m

[0m[33mpause[39m, [33mread[39m, [33mresume[39m, and [33mwrite[39m will throw an error with code[0m
[0m[33mERR_HTTP2_NO_SOCKET_MANIPULATION[39m. See [34m[33mHttp2Session[39m[34m and Sockets ([34m[4m#http2_http2session_and_sockets[24m[39m[34m)[39m for[0m
[0mmore information.[0m

[0mAll other interactions will be routed directly to the socket. With TLS support,[0m
[0muse [34m[33mrequest.socket.getPeerCertificate()[39m[34m ([34m[4mtls.html#tls_tlssocket_getpeercertificate_detailed[24m[39m[34m)[39m to obtain the client's[0m
[0mauthentication details.[0m

[32m[1m#### [33mrequest.stream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Http2Stream}[0m

[0mThe [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39m object backing the request.[0m

[32m[1m#### [33mrequest.trailers[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe request/response trailers object. Only populated at the [33m'end'[39m event.[0m

[32m[1m#### [33mrequest.url[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mRequest URL string. This contains only the URL that is[0m
[0mpresent in the actual HTTP request. If the request is:[0m

    [33mGET /status?name=ryan HTTP/1.1\r\n[39m
    [33mAccept: text/plain\r\n[39m
    [33m\r\n[39m

[0mThen [33mrequest.url[39m will be:[0m

[90m<!-- eslint-disable semi -->[39m
[90m[39m    [92m'/status?name=ryan'[39m

[0mTo parse the url into its parts [33mrequire('url').parse(request.url)[39m[0m
[0mcan be used:[0m

    [33m$ node[39m
    [33m> require('url').parse('/status?name=ryan')[39m
    [33mUrl {[39m
    [33m  protocol: null,[39m
    [33m  slashes: null,[39m
    [33m  auth: null,[39m
    [33m  host: null,[39m
    [33m  port: null,[39m
    [33m  hostname: null,[39m
    [33m  hash: null,[39m
    [33m  search: '?name=ryan',[39m
    [33m  query: 'name=ryan',[39m
    [33m  pathname: '/status',[39m
    [33m  path: '/status?name=ryan',[39m
    [33m  href: '/status?name=ryan' }[39m

[0mTo extract the parameters from the query string, the[0m
[0m[33mrequire('querystring').parse[39m function can be used, or[0m
[0m[33mtrue[39m can be passed as the second argument to [33mrequire('url').parse[39m.[0m

    [33m$ node[39m
    [33m> require('url').parse('/status?name=ryan', true)[39m
    [33mUrl {[39m
    [33m  protocol: null,[39m
    [33m  slashes: null,[39m
    [33m  auth: null,[39m
    [33m  host: null,[39m
    [33m  port: null,[39m
    [33m  hostname: null,[39m
    [33m  hash: null,[39m
    [33m  search: '?name=ryan',[39m
    [33m  query: { name: 'ryan' },[39m
    [33m  pathname: '/status',[39m
    [33m  path: '/status?name=ryan',[39m
    [33m  href: '/status?name=ryan' }[39m

[32m[1m### Class: [33mhttp2.Http2ServerResponse[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {Stream}[0m

[0mThis object is created internally by an HTTP server, not by the user. It is[0m
[0mpassed as the second parameter to the [34m[33m'request'[39m[34m ([34m[4m#http2_event_request[24m[39m[34m)[39m event.[0m

[32m[1m#### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mIndicates that the underlying [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39m was terminated before[0m
[0m[34m[33mresponse.end()[39m[34m ([34m[4m#http2_response_end_data_encoding_callback[24m[39m[34m)[39m was called or able to flush.[0m

[32m[1m#### Event: [33m'finish'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the response has been sent. More specifically, this event is[0m
[0memitted when the last segment of the response headers and body have been[0m
[0mhanded off to the HTTP/2 multiplexing for transmission over the network. It[0m
[0mdoes not imply that the client has received anything yet.[0m

[0mAfter this event, no more events will be emitted on the response object.[0m

[32m[1m#### [33mresponse.addTrailers(headers)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mheaders[39m {Object}[0m

[0mThis method adds HTTP trailing headers (a header but at the end of the[0m
[0mmessage) to the response.[0m

[0mAttempting to set a header field name or value that contains invalid characters[0m
[0mwill result in a [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m being thrown.[0m

[32m[1m#### [33mresponse.connection[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mdeprecated: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated. Use [34m[33mresponse.socket[39m[90m[34m ([34m[4m#http2_response_socket[24m[39m[90m[34m)[39m[90m.[0m[23m[39m

    * [0m{net.Socket|tls.TLSSocket}[0m

[0mSee [34m[33mresponse.socket[39m[34m ([34m[4m#http2_response_socket[24m[39m[34m)[39m.[0m

[32m[1m#### [33mresponse.end([data[, encoding]][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18780[39m
[90m    description: This method now returns a reference to `ServerResponse`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {string|Buffer}[0m
    * [0m[33mencoding[39m {string}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {this}[0m

[0mThis method signals to the server that all of the response headers and body[0m
[0mhave been sent; that server should consider this message complete.[0m
[0mThe method, [33mresponse.end()[39m, MUST be called on each response.[0m

[0mIf [33mdata[39m is specified, it is equivalent to calling[0m
[0m[34m[33mresponse.write(data, encoding)[39m[34m ([34m[4mhttp.html#http_response_write_chunk_encoding_callback[24m[39m[34m)[39m followed by [33mresponse.end(callback)[39m.[0m

[0mIf [33mcallback[39m is specified, it will be called when the response stream[0m
[0mis finished.[0m

[32m[1m#### [33mresponse.finished[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mdeprecated: v13.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated. Use [34m[33mresponse.writableEnded[39m[90m[34m ([34m[4m#http2_response_writableended[24m[39m[90m[34m)[39m[90m.[0m[23m[39m

    * [0m{boolean}[0m

[0mBoolean value that indicates whether the response has completed. Starts[0m
[0mas [33mfalse[39m. After [34m[33mresponse.end()[39m[34m ([34m[4m#http2_response_end_data_encoding_callback[24m[39m[34m)[39m executes, the value will be [33mtrue[39m.[0m

[32m[1m#### [33mresponse.getHeader(name)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0mReturns: {string}[0m

[0mReads out a header that has already been queued but not sent to the client.[0m
[0mThe name is case-insensitive.[0m

    [94mconst[39m [37mcontentType[39m [93m=[39m [37mresponse[39m[32m.[39m[37mgetHeader[39m[90m([39m[92m'content-type'[39m[90m)[39m[90m;[39m

[32m[1m#### [33mresponse.getHeaderNames()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string[]}[0m

[0mReturns an array containing the unique names of the current outgoing headers.[0m
[0mAll header names are lowercase.[0m

    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Set-Cookie'[39m[32m,[39m [33m[[39m[92m'foo=bar'[39m[32m,[39m [92m'bar=baz'[39m[33m][39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mheaderNames[39m [93m=[39m [37mresponse[39m[32m.[39m[37mgetHeaderNames[39m[90m([39m[90m)[39m[90m;[39m
    [90m// headerNames === ['foo', 'set-cookie'][39m

[32m[1m#### [33mresponse.getHeaders()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns a shallow copy of the current outgoing headers. Since a shallow copy[0m
[0mis used, array values may be mutated without additional calls to various[0m
[0mheader-related http module methods. The keys of the returned object are the[0m
[0mheader names and the values are the respective header values. All header names[0m
[0mare lowercase.[0m

[0mThe object returned by the [33mresponse.getHeaders()[39m method [3mdoes not[23m[0m
[0mprototypically inherit from the JavaScript [33mObject[39m. This means that typical[0m
[0m[33mObject[39m methods such as [33mobj.toString()[39m, [33mobj.hasOwnProperty()[39m, and others[0m
[0mare not defined and [3mwill not work[23m.[0m

    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Set-Cookie'[39m[32m,[39m [33m[[39m[92m'foo=bar'[39m[32m,[39m [92m'bar=baz'[39m[33m][39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mheaders[39m [93m=[39m [37mresponse[39m[32m.[39m[37mgetHeaders[39m[90m([39m[90m)[39m[90m;[39m
    [90m// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }[39m

[32m[1m#### [33mresponse.hasHeader(name)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the header identified by [33mname[39m is currently set in the[0m
[0moutgoing headers. The header name matching is case-insensitive.[0m

    [94mconst[39m [37mhasContentType[39m [93m=[39m [37mresponse[39m[32m.[39m[37mhasHeader[39m[90m([39m[92m'content-type'[39m[90m)[39m[90m;[39m

[32m[1m#### [33mresponse.headersSent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mTrue if headers were sent, false otherwise (read-only).[0m

[32m[1m#### [33mresponse.removeHeader(name)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m

[0mRemoves a header that has been queued for implicit sending.[0m

    [37mresponse[39m[32m.[39m[37mremoveHeader[39m[90m([39m[92m'Content-Encoding'[39m[90m)[39m[90m;[39m

[32m[1m#### [33mresponse.sendDate[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mWhen true, the Date header will be automatically generated and sent in[0m
[0mthe response if it is not already present in the headers. Defaults to true.[0m

[0mThis should only be disabled for testing; HTTP requires the Date header[0m
[0min responses.[0m

[32m[1m#### [33mresponse.setHeader(name, value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0m[33mvalue[39m {string|string[]}[0m

[0mSets a single header value for implicit headers. If this header already exists[0m
[0min the to-be-sent headers, its value will be replaced. Use an array of strings[0m
[0mhere to send multiple headers with the same name.[0m

    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'text/html'[39m[90m)[39m[90m;[39m

[0mor[0m

    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Set-Cookie'[39m[32m,[39m [33m[[39m[92m'type=ninja'[39m[32m,[39m [92m'language=javascript'[39m[33m][39m[90m)[39m[90m;[39m

[0mAttempting to set a header field name or value that contains invalid characters[0m
[0mwill result in a [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m being thrown.[0m

[0mWhen headers have been set with [34m[33mresponse.setHeader()[39m[34m ([34m[4m#http2_response_setheader_name_value[24m[39m[34m)[39m, they will be merged[0m
[0mwith any headers passed to [34m[33mresponse.writeHead()[39m[34m ([34m[4m#http2_response_writehead_statuscode_statusmessage_headers[24m[39m[34m)[39m, with the headers passed[0m
[0mto [34m[33mresponse.writeHead()[39m[34m ([34m[4m#http2_response_writehead_statuscode_statusmessage_headers[24m[39m[34m)[39m given precedence.[0m

    [90m// Returns content-type = text/plain[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'text/html'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'X-Foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'ok'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### [33mresponse.setTimeout(msecs[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {http2.Http2ServerResponse}[0m

[0mSets the [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39m's timeout value to [33mmsecs[39m. If a callback is[0m
[0mprovided, then it is added as a listener on the [33m'timeout'[39m event on[0m
[0mthe response object.[0m

[0mIf no [33m'timeout'[39m listener is added to the request, the response, or[0m
[0mthe server, then [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39ms are destroyed when they time out. If a[0m
[0mhandler is assigned to the request, the response, or the server's [33m'timeout'[39m[0m
[0mevents, timed out sockets must be handled explicitly.[0m

[32m[1m#### [33mresponse.socket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{net.Socket|tls.TLSSocket}[0m

[0mReturns a [33mProxy[39m object that acts as a [33mnet.Socket[39m (or [33mtls.TLSSocket[39m) but[0m
[0mapplies getters, setters, and methods based on HTTP/2 logic.[0m

[0m[33mdestroyed[39m, [33mreadable[39m, and [33mwritable[39m properties will be retrieved from and[0m
[0mset on [33mresponse.stream[39m.[0m

[0m[33mdestroy[39m, [33memit[39m, [33mend[39m, [33mon[39m and [33monce[39m methods will be called on[0m
[0m[33mresponse.stream[39m.[0m

[0m[33msetTimeout[39m method will be called on [33mresponse.stream.session[39m.[0m

[0m[33mpause[39m, [33mread[39m, [33mresume[39m, and [33mwrite[39m will throw an error with code[0m
[0m[33mERR_HTTP2_NO_SOCKET_MANIPULATION[39m. See [34m[33mHttp2Session[39m[34m and Sockets ([34m[4m#http2_http2session_and_sockets[24m[39m[34m)[39m for[0m
[0mmore information.[0m

[0mAll other interactions will be routed directly to the socket.[0m

    [94mconst[39m [37mhttp2[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http2'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mip[39m [93m=[39m [37mreq[39m[32m.[39m[37msocket[39m[32m.[39m[37mremoteAddress[39m[90m;[39m
      [94mconst[39m [37mport[39m [93m=[39m [37mreq[39m[32m.[39m[37msocket[39m[32m.[39m[37mremotePort[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m`Your IP address is ${[37mip[39m} and your source port is ${[37mport[39m}.`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m3000[39m[90m)[39m[90m;[39m

[32m[1m#### [33mresponse.statusCode[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mWhen using implicit headers (not calling [34m[33mresponse.writeHead()[39m[34m ([34m[4m#http2_response_writehead_statuscode_statusmessage_headers[24m[39m[34m)[39m explicitly),[0m
[0mthis property controls the status code that will be sent to the client when[0m
[0mthe headers get flushed.[0m

    [37mresponse[39m[32m.[39m[37mstatusCode[39m [93m=[39m [34m404[39m[90m;[39m

[0mAfter response header was sent to the client, this property indicates the[0m
[0mstatus code which was sent out.[0m

[32m[1m#### [33mresponse.statusMessage[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mStatus message is not supported by HTTP/2 (RFC 7540 8.1.2.4). It returns[0m
[0man empty string.[0m

[32m[1m#### [33mresponse.stream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Http2Stream}[0m

[0mThe [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39m object backing the response.[0m

[32m[1m#### [33mresponse.writableEnded[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m after [34m[33mresponse.end()[39m[34m ([34m[4m#http2_response_end_data_encoding_callback[24m[39m[34m)[39m has been called. This property[0m
[0mdoes not indicate whether the data has been flushed, for this use[0m
[0m[34m[33mwritable.writableFinished[39m[34m ([34m[4mstream.html#stream_writable_writablefinished[24m[39m[34m)[39m instead.[0m

[32m[1m#### [33mresponse.write(chunk[, encoding][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mchunk[39m {string|Buffer}[0m
    * [0m[33mencoding[39m {string}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {boolean}[0m

[0mIf this method is called and [34m[33mresponse.writeHead()[39m[34m ([34m[4m#http2_response_writehead_statuscode_statusmessage_headers[24m[39m[34m)[39m has not been called,[0m
[0mit will switch to implicit header mode and flush the implicit headers.[0m

[0mThis sends a chunk of the response body. This method may[0m
[0mbe called multiple times to provide successive parts of the body.[0m

[0mIn the [33mhttp[39m module, the response body is omitted when the[0m
[0mrequest is a HEAD request. Similarly, the [33m204[39m and [33m304[39m responses[0m
[0m[3mmust not[23m include a message body.[0m

[0m[33mchunk[39m can be a string or a buffer. If [33mchunk[39m is a string,[0m
[0mthe second parameter specifies how to encode it into a byte stream.[0m
[0mBy default the [33mencoding[39m is [33m'utf8'[39m. [33mcallback[39m will be called when this chunk[0m
[0mof data is flushed.[0m

[0mThis is the raw HTTP body and has nothing to do with higher-level multi-part[0m
[0mbody encodings that may be used.[0m

[0mThe first time [34m[33mresponse.write()[39m[34m ([34m[4m#http2_response_write_chunk_encoding_callback[24m[39m[34m)[39m is called, it will send the buffered[0m
[0mheader information and the first chunk of the body to the client. The second[0m
[0mtime [34m[33mresponse.write()[39m[34m ([34m[4m#http2_response_write_chunk_encoding_callback[24m[39m[34m)[39m is called, Node.js assumes data will be streamed,[0m
[0mand sends the new data separately. That is, the response is buffered up to the[0m
[0mfirst chunk of the body.[0m

[0mReturns [33mtrue[39m if the entire data was flushed successfully to the kernel[0m
[0mbuffer. Returns [33mfalse[39m if all or part of the data was queued in user memory.[0m
[0m[33m'drain'[39m will be emitted when the buffer is free again.[0m

[32m[1m#### [33mresponse.writeContinue()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mSends a status [33m100 Continue[39m to the client, indicating that the request body[0m
[0mshould be sent. See the [34m[33m'checkContinue'[39m[34m ([34m[4m#http2_event_checkcontinue[24m[39m[34m)[39m event on [33mHttp2Server[39m and[0m
[0m[33mHttp2SecureServer[39m.[0m

[32m[1m#### [33mresponse.writeHead(statusCode[, statusMessage][, headers])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mchanges:[39m
[90m  - version: v11.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25974[39m
[90m    description: Return `this` from `writeHead()` to allow chaining with[39m
[90m                 `end()`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstatusCode[39m {number}[0m
    * [0m[33mstatusMessage[39m {string}[0m
    * [0m[33mheaders[39m {Object}[0m
    * [0mReturns: {http2.Http2ServerResponse}[0m

[0mSends a response header to the request. The status code is a 3-digit HTTP[0m
[0mstatus code, like [33m404[39m. The last argument, [33mheaders[39m, are the response headers.[0m

[0mReturns a reference to the [33mHttp2ServerResponse[39m, so that calls can be chained.[0m

[0mFor compatibility with [34mHTTP/1 ([34m[4mhttp.html[24m[39m[34m)[39m, a human-readable [33mstatusMessage[39m may be[0m
[0mpassed as the second argument. However, because the [33mstatusMessage[39m has no[0m
[0mmeaning within HTTP/2, the argument will have no effect and a process warning[0m
[0mwill be emitted.[0m

    [94mconst[39m [37mbody[39m [93m=[39m [92m'hello world'[39m[90m;[39m
    [37mresponse[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m
      [32m'Content-Length'[39m[93m:[39m [37mBuffer[39m[32m.[39m[37mbyteLength[39m[90m([39m[37mbody[39m[90m)[39m[32m,[39m
      [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[90m)[39m[90m;[39m

[0m[33mContent-Length[39m is given in bytes not characters. The[0m
[0m[33mBuffer.byteLength()[39m API may be used to determine the number of bytes in a[0m
[0mgiven encoding. On outbound messages, Node.js does not check if Content-Length[0m
[0mand the length of the body being transmitted are equal or not. However, when[0m
[0mreceiving messages, Node.js will automatically reject messages when the[0m
[0m[33mContent-Length[39m does not match the actual payload size.[0m

[0mThis method may be called at most one time on a message before[0m
[0m[34m[33mresponse.end()[39m[34m ([34m[4m#http2_response_end_data_encoding_callback[24m[39m[34m)[39m is called.[0m

[0mIf [34m[33mresponse.write()[39m[34m ([34m[4m#http2_response_write_chunk_encoding_callback[24m[39m[34m)[39m or [34m[33mresponse.end()[39m[34m ([34m[4m#http2_response_end_data_encoding_callback[24m[39m[34m)[39m are called before calling[0m
[0mthis, the implicit/mutable headers will be calculated and call this function.[0m

[0mWhen headers have been set with [34m[33mresponse.setHeader()[39m[34m ([34m[4m#http2_response_setheader_name_value[24m[39m[34m)[39m, they will be merged[0m
[0mwith any headers passed to [34m[33mresponse.writeHead()[39m[34m ([34m[4m#http2_response_writehead_statuscode_statusmessage_headers[24m[39m[34m)[39m, with the headers passed[0m
[0mto [34m[33mresponse.writeHead()[39m[34m ([34m[4m#http2_response_writehead_statuscode_statusmessage_headers[24m[39m[34m)[39m given precedence.[0m

    [90m// Returns content-type = text/plain[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp2[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'text/html'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'X-Foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'ok'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mAttempting to set a header field name or value that contains invalid characters[0m
[0mwill result in a [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m being thrown.[0m

[32m[1m#### [33mresponse.createPushResponse(headers, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mheaders[39m {HTTP/2 Headers Object} An object describing the headers[0m
    * [0m[33mcallback[39m {Function} Called once [33mhttp2stream.pushStream()[39m is finished,[0m
      [0mor either when the attempt to create the pushed [33mHttp2Stream[39m has failed or[0m
      [0mhas been rejected, or the state of [33mHttp2ServerRequest[39m is closed prior to[0m
      [0mcalling the [33mhttp2stream.pushStream()[39m method
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mstream[39m {ServerHttp2Stream} The newly-created [33mServerHttp2Stream[39m object[0m[0m[0m

[0mCall [34m[33mhttp2stream.pushStream()[39m[34m ([34m[4m#http2_http2stream_pushstream_headers_options_callback[24m[39m[34m)[39m with the given headers, and wrap the[0m
[0mgiven [34m[33mHttp2Stream[39m[34m ([34m[4m#http2_class_http2stream[24m[39m[34m)[39m on a newly created [33mHttp2ServerResponse[39m as the callback[0m
[0mparameter if successful. When [33mHttp2ServerRequest[39m is closed, the callback is[0m
[0mcalled with an error [33mERR_HTTP2_INVALID_STREAM[39m.[0m

[32m[1m## Collecting HTTP/2 Performance Metrics[22m[39m

[0mThe [34mPerformance Observer ([34m[4mperf_hooks.html[24m[39m[34m)[39m API can be used to collect basic performance[0m
[0mmetrics for each [33mHttp2Session[39m and [33mHttp2Stream[39m instance.[0m

    [94mconst[39m [33m{[39m [37mPerformanceObserver[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/perf_hooks'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobs[39m [93m=[39m [31mnew[39m [37mPerformanceObserver[39m[90m([39m[90m([39m[37mitems[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mentry[39m [93m=[39m [37mitems[39m[32m.[39m[37mgetEntries[39m[90m([39m[90m)[39m[33m[[39m[34m0[39m[33m][39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mentry[39m[32m.[39m[37mentryType[39m[90m)[39m[90m;[39m  [90m// prints 'http2'[39m
      [94mif[39m [90m([39m[37mentry[39m[32m.[39m[37mname[39m [93m===[39m [92m'Http2Session'[39m[90m)[39m [33m{[39m
        [90m// Entry contains statistics about the Http2Session[39m
      [33m}[39m [94melse[39m [94mif[39m [90m([39m[37mentry[39m[32m.[39m[37mname[39m [93m===[39m [92m'Http2Stream'[39m[90m)[39m [33m{[39m
        [90m// Entry contains statistics about the Http2Stream[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mobs[39m[32m.[39m[37mobserve[39m[90m([39m[33m{[39m [37mentryTypes[39m[93m:[39m [33m[[39m[92m'http2'[39m[33m][39m [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mentryType[39m property of the [33mPerformanceEntry[39m will be equal to [33m'http2'[39m.[0m

[0mThe [33mname[39m property of the [33mPerformanceEntry[39m will be equal to either[0m
[0m[33m'Http2Stream'[39m or [33m'Http2Session'[39m.[0m

[0mIf [33mname[39m is equal to [33mHttp2Stream[39m, the [33mPerformanceEntry[39m will contain the[0m
[0mfollowing additional properties:[0m

    * [0m[33mbytesRead[39m {number} The number of [33mDATA[39m frame bytes received for this[0m
      [0m[33mHttp2Stream[39m.[0m
    * [0m[33mbytesWritten[39m {number} The number of [33mDATA[39m frame bytes sent for this[0m
      [0m[33mHttp2Stream[39m.[0m
    * [0m[33mid[39m {number} The identifier of the associated [33mHttp2Stream[39m[0m
    * [0m[33mtimeToFirstByte[39m {number} The number of milliseconds elapsed between the[0m
      [0m[33mPerformanceEntry[39m [33mstartTime[39m and the reception of the first [33mDATA[39m frame.[0m
    * [0m[33mtimeToFirstByteSent[39m {number} The number of milliseconds elapsed between[0m
      [0mthe [33mPerformanceEntry[39m [33mstartTime[39m and sending of the first [33mDATA[39m frame.[0m
    * [0m[33mtimeToFirstHeader[39m {number} The number of milliseconds elapsed between the[0m
      [0m[33mPerformanceEntry[39m [33mstartTime[39m and the reception of the first header.[0m

[0mIf [33mname[39m is equal to [33mHttp2Session[39m, the [33mPerformanceEntry[39m will contain the[0m
[0mfollowing additional properties:[0m

    * [0m[33mbytesRead[39m {number} The number of bytes received for this [33mHttp2Session[39m.[0m
    * [0m[33mbytesWritten[39m {number} The number of bytes sent for this [33mHttp2Session[39m.[0m
    * [0m[33mframesReceived[39m {number} The number of HTTP/2 frames received by the[0m
      [0m[33mHttp2Session[39m.[0m
    * [0m[33mframesSent[39m {number} The number of HTTP/2 frames sent by the [33mHttp2Session[39m.[0m
    * [0m[33mmaxConcurrentStreams[39m {number} The maximum number of streams concurrently[0m
      [0mopen during the lifetime of the [33mHttp2Session[39m.[0m
    * [0m[33mpingRTT[39m {number} The number of milliseconds elapsed since the transmission[0m
      [0mof a [33mPING[39m frame and the reception of its acknowledgment. Only present if[0m
      [0ma [33mPING[39m frame has been sent on the [33mHttp2Session[39m.[0m
    * [0m[33mstreamAverageDuration[39m {number} The average duration (in milliseconds) for[0m
      [0mall [33mHttp2Stream[39m instances.[0m
    * [0m[33mstreamCount[39m {number} The number of [33mHttp2Stream[39m instances processed by[0m
      [0mthe [33mHttp2Session[39m.[0m
    * [0m[33mtype[39m {string} Either [33m'server'[39m or [33m'client'[39m to identify the type of[0m
      [0m[33mHttp2Session[39m.[0m

