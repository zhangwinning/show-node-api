[35m[4m[1m# HTTP[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mTo use the HTTP server and client one must [33mrequire('http')[39m.[0m

[0mThe HTTP interfaces in Node.js are designed to support many features[0m
[0mof the protocol which have been traditionally difficult to use.[0m
[0mIn particular, large, possibly chunk-encoded, messages. The interface is[0m
[0mcareful to never buffer entire requests or responses, so the[0m
[0muser is able to stream data.[0m

[0mHTTP message headers are represented by an object like this:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m [32m'content-length'[39m[93m:[39m [92m'123'[39m[32m,[39m
      [32m'content-type'[39m[93m:[39m [92m'text/plain'[39m[32m,[39m
      [32m'connection'[39m[93m:[39m [92m'keep-alive'[39m[32m,[39m
      [32m'host'[39m[93m:[39m [92m'mysite.com'[39m[32m,[39m
      [32m'accept'[39m[93m:[39m [92m'*/*'[39m [33m}[39m

[0mKeys are lowercased. Values are not modified.[0m

[0mIn order to support the full spectrum of possible HTTP applications, the Node.js[0m
[0mHTTP API is very low-level. It deals with stream handling and message[0m
[0mparsing only. It parses a message into headers and body but it does not[0m
[0mparse the actual headers or the body.[0m

[0mSee [[33mmessage.headers[39m][] for details on how duplicate headers are handled.[0m

[0mThe raw headers as they were received are retained in the [33mrawHeaders[39m[0m
[0mproperty, which is an array of [33m[key, value, key2, value2, ...][39m. For[0m
[0mexample, the previous message header object might have a [33mrawHeaders[39m[0m
[0mlist like the following:[0m

[90m<!-- eslint-disable semi -->[39m
[90m[39m    [33m[[39m [92m'ConTent-Length'[39m[32m,[39m [92m'123456'[39m[32m,[39m
      [92m'content-LENGTH'[39m[32m,[39m [92m'123'[39m[32m,[39m
      [92m'content-type'[39m[32m,[39m [92m'text/plain'[39m[32m,[39m
      [92m'CONNECTION'[39m[32m,[39m [92m'keep-alive'[39m[32m,[39m
      [92m'Host'[39m[32m,[39m [92m'mysite.com'[39m[32m,[39m
      [92m'accepT'[39m[32m,[39m [92m'*/*'[39m [33m][39m

[32m[1m## Class: [33mhttp.Agent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn [33mAgent[39m is responsible for managing connection persistence[0m
[0mand reuse for HTTP clients. It maintains a queue of pending requests[0m
[0mfor a given host and port, reusing a single socket connection for each[0m
[0muntil the queue is empty, at which time the socket is either destroyed[0m
[0mor put into a pool where it is kept to be used again for requests to the[0m
[0msame host and port. Whether it is destroyed or pooled depends on the[0m
[0m[33mkeepAlive[39m [34moption ([34m[4m#http_new_agent_options[24m[39m[34m)[39m.[0m

[0mPooled connections have TCP Keep-Alive enabled for them, but servers may[0m
[0mstill close idle connections, in which case they will be removed from the[0m
[0mpool and a new connection will be made when a new HTTP request is made for[0m
[0mthat host and port. Servers may also refuse to allow multiple requests[0m
[0mover the same connection, in which case the connection will have to be[0m
[0mremade for every request and cannot be pooled. The [33mAgent[39m will still make[0m
[0mthe requests to that server, but each one will occur over a new connection.[0m

[0mWhen a connection is closed by the client or the server, it is removed[0m
[0mfrom the pool. Any unused sockets in the pool will be unrefed so as not[0m
[0mto keep the Node.js process running when there are no outstanding requests.[0m
[0m(see [[33msocket.unref()[39m][]).[0m

[0mIt is good practice, to [[33mdestroy()[39m][] an [33mAgent[39m instance when it is no[0m
[0mlonger in use, because unused sockets consume OS resources.[0m

[0mSockets are removed from an agent when the socket emits either[0m
[0ma [33m'close'[39m event or an [33m'agentRemove'[39m event. When intending to keep one[0m
[0mHTTP request open for a long time without keeping it in the agent, something[0m
[0mlike the following may be done:[0m

    [37mhttp[39m[32m.[39m[37mget[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Do stuff[39m
    [33m}[39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'socket'[39m[32m,[39m [90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [37msocket[39m[32m.[39m[37memit[39m[90m([39m[92m'agentRemove'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mAn agent may also be used for an individual request. By providing[0m
[0m[33m{agent: false}[39m as an option to the [33mhttp.get()[39m or [33mhttp.request()[39m[0m
[0mfunctions, a one-time use [33mAgent[39m with default options will be used[0m
[0mfor the client connection.[0m

[0m[33magent:false[39m:[0m

    [37mhttp[39m[32m.[39m[37mget[39m[90m([39m[33m{[39m
      [37mhostname[39m[93m:[39m [92m'localhost'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m80[39m[32m,[39m
      [37mpath[39m[93m:[39m [92m'/'[39m[32m,[39m
      [37magent[39m[93m:[39m [91mfalse[39m  [90m// Create a new agent just for this one request[39m
    [33m}[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Do stuff with response[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mnew Agent([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} Set of configurable options to set on the agent.[0m
      [0mCan have the following fields:
        * [0m[0m[33mkeepAlive[39m {boolean} Keep sockets around even when there are no[0m[0m[0m
      [0m      [0m[0moutstanding requests, so they can be used for future requests without[0m[0m[0m
      [0m      [0m[0mhaving to reestablish a TCP connection. Not to be confused with the[0m[0m[0m
      [0m      [0m[0m[33mkeep-alive[39m value of the [33mConnection[39m header. The [33mConnection: keep-alive[39m[0m[0m[0m
      [0m      [0m[0mheader is always sent when using an agent except when the [33mConnection[39m[0m[0m[0m
      [0m      [0m[0mheader is explicitly specified or when the [33mkeepAlive[39m and [33mmaxSockets[39m[0m[0m[0m
      [0m      [0m[0moptions are respectively set to [33mfalse[39m and [33mInfinity[39m, in which case[0m[0m[0m
      [0m      [0m[0m[33mConnection: close[39m will be used. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mkeepAliveMsecs[39m {number} When using the [33mkeepAlive[39m option, specifies[0m[0m[0m
      [0m      [0m[0mthe [34minitial delay ([34m[4mnet.html#net_socket_setkeepalive_enable_initialdelay[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mfor TCP Keep-Alive packets. Ignored when the[0m[0m[0m
      [0m      [0m[0m[33mkeepAlive[39m option is [33mfalse[39m or [33mundefined[39m. [1mDefault:[22m [33m1000[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxSockets[39m {number} Maximum number of sockets to allow per[0m[0m[0m
      [0m      [0m[0mhost. Each request will use a new socket until the maximum is reached.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mInfinity[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxFreeSockets[39m {number} Maximum number of sockets to leave open[0m[0m[0m
      [0m      [0m[0min a free state. Only relevant if [33mkeepAlive[39m is set to [33mtrue[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m256[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {number} Socket timeout in milliseconds.[0m[0m[0m
      [0m      [0m[0mThis will set the timeout when the socket is created.[0m[0m[0m

[0m[33moptions[39m in [[33msocket.connect()[39m][] are also supported.[0m

[0mThe default [[33mhttp.globalAgent[39m][] that is used by [[33mhttp.request()[39m][] has all[0m
[0mof these values set to their respective defaults.[0m

[0mTo configure any of them, a custom [[33mhttp.Agent[39m][] instance must be created.[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mkeepAliveAgent[39m [93m=[39m [31mnew[39m [37mhttp[39m[32m.[39m[37mAgent[39m[90m([39m[33m{[39m [37mkeepAlive[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    [37moptions[39m[32m.[39m[37magent[39m [93m=[39m [37mkeepAliveAgent[39m[90m;[39m
    [37mhttp[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[32m,[39m [37monResponseCallback[39m[90m)[39m[90m;[39m

[32m[1m### [33magent.createConnection(options[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} Options containing connection details. Check[0m
      [0m[[33mnet.createConnection()[39m][] for the format of the options[0m
    * [0m[33mcallback[39m {Function} Callback function that receives the created socket[0m
    * [0mReturns: {stream.Duplex}[0m

[0mProduces a socket/stream to be used for HTTP requests.[0m

[0mBy default, this function is the same as [[33mnet.createConnection()[39m][]. However,[0m
[0mcustom agents may override this method in case greater flexibility is desired.[0m

[0mA socket/stream can be supplied in one of two ways: by returning the[0m
[0msocket/stream from this function, or by passing the socket/stream to [33mcallback[39m.[0m

[0mThis method is guaranteed to return an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specifies a socket[0m
[0mtype other than {net.Socket}.[0m

[0m[33mcallback[39m has a signature of [33m(err, stream)[39m.[0m

[32m[1m### [33magent.keepSocketAlive(socket)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msocket[39m {stream.Duplex}[0m

[0mCalled when [33msocket[39m is detached from a request and could be persisted by the[0m
[0m[33mAgent[39m. Default behavior is to:[0m

    [37msocket[39m[32m.[39m[37msetKeepAlive[39m[90m([39m[91mtrue[39m[32m,[39m [91mthis[39m[32m.[39m[37mkeepAliveMsecs[39m[90m)[39m[90m;[39m
    [37msocket[39m[32m.[39m[37munref[39m[90m([39m[90m)[39m[90m;[39m
    [31mreturn[39m [91mtrue[39m[90m;[39m

[0mThis method can be overridden by a particular [33mAgent[39m subclass. If this[0m
[0mmethod returns a falsy value, the socket will be destroyed instead of persisting[0m
[0mit for use with the next request.[0m

[0mThe [33msocket[39m argument can be an instance of {net.Socket}, a subclass of[0m
[0m{stream.Duplex}.[0m

[32m[1m### [33magent.reuseSocket(socket, request)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msocket[39m {stream.Duplex}[0m
    * [0m[33mrequest[39m {http.ClientRequest}[0m

[0mCalled when [33msocket[39m is attached to [33mrequest[39m after being persisted because of[0m
[0mthe keep-alive options. Default behavior is to:[0m

    [37msocket[39m[32m.[39m[37mref[39m[90m([39m[90m)[39m[90m;[39m

[0mThis method can be overridden by a particular [33mAgent[39m subclass.[0m

[0mThe [33msocket[39m argument can be an instance of {net.Socket}, a subclass of[0m
[0m{stream.Duplex}.[0m

[32m[1m### [33magent.destroy()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mDestroy any sockets that are currently in use by the agent.[0m

[0mIt is usually not necessary to do this. However, if using an[0m
[0magent with [33mkeepAlive[39m enabled, then it is best to explicitly shut down[0m
[0mthe agent when it will no longer be used. Otherwise,[0m
[0msockets may hang open for quite a long time before the server[0m
[0mterminates them.[0m

[32m[1m### [33magent.freeSockets[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mAn object which contains arrays of sockets currently awaiting use by[0m
[0mthe agent when [33mkeepAlive[39m is enabled. Do not modify.[0m

[0mSockets in the [33mfreeSockets[39m list will be automatically destroyed and[0m
[0mremoved from the array on [33m'timeout'[39m.[0m

[32m[1m### [33magent.getName(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} A set of options providing information for name generation
        * [0m[0m[33mhost[39m {string} A domain name or IP address of the server to issue the[0m[0m[0m
      [0m      [0m[0mrequest to[0m[0m[0m
      [0m
        * [0m[0m[33mport[39m {number} Port of remote server[0m[0m[0m
      [0m
        * [0m[0m[33mlocalAddress[39m {string} Local interface to bind for network connections[0m[0m[0m
      [0m      [0m[0mwhen issuing the request[0m[0m[0m
      [0m
        * [0m[0m[33mfamily[39m {integer} Must be 4 or 6 if this doesn't equal [33mundefined[39m.[0m[0m[0m
    * [0mReturns: {string}[0m

[0mGet a unique name for a set of request options, to determine whether a[0m
[0mconnection can be reused. For an HTTP agent, this returns[0m
[0m[33mhost:port:localAddress[39m or [33mhost:port:localAddress:family[39m. For an HTTPS agent,[0m
[0mthe name includes the CA, cert, ciphers, and other HTTPS/TLS-specific options[0m
[0mthat determine socket reusability.[0m

[32m[1m### [33magent.maxFreeSockets[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mBy default set to 256. For agents with [33mkeepAlive[39m enabled, this[0m
[0msets the maximum number of sockets that will be left open in the free[0m
[0mstate.[0m

[32m[1m### [33magent.maxSockets[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mBy default set to [33mInfinity[39m. Determines how many concurrent sockets the agent[0m
[0mcan have open per origin. Origin is the returned value of [[33magent.getName()[39m][].[0m

[32m[1m### [33magent.requests[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mAn object which contains queues of requests that have not yet been assigned to[0m
[0msockets. Do not modify.[0m

[32m[1m### [33magent.sockets[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mAn object which contains arrays of sockets currently in use by the[0m
[0magent. Do not modify.[0m

[32m[1m## Class: [33mhttp.ClientRequest[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.17[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {Stream}[0m

[0mThis object is created internally and returned from [[33mhttp.request()[39m][]. It[0m
[0mrepresents an [3min-progress[23m request whose header has already been queued. The[0m
[0mheader is still mutable using the [[33msetHeader(name, value)[39m][],[0m
[0m [[33mgetHeader(name)[39m][], [[33mremoveHeader(name)[39m][] API. The actual header will[0m
[0mbe sent along with the first data chunk or when calling [[33mrequest.end()[39m][].[0m

[0mTo get the response, add a listener for [[33m'response'[39m][] to the request object.[0m
[0m[[33m'response'[39m][] will be emitted from the request object when the response[0m
[0mheaders have been received. The [[33m'response'[39m][] event is executed with one[0m
[0margument which is an instance of [[33mhttp.IncomingMessage[39m][].[0m

[0mDuring the [[33m'response'[39m][] event, one can add listeners to the[0m
[0mresponse object; particularly to listen for the [33m'data'[39m event.[0m

[0mIf no [[33m'response'[39m][] handler is added, then the response will be[0m
[0mentirely discarded. However, if a [[33m'response'[39m][] event handler is added,[0m
[0mthen the data from the response object [1mmust[22m be consumed, either by[0m
[0mcalling [33mresponse.read()[39m whenever there is a [33m'readable'[39m event, or[0m
[0mby adding a [33m'data'[39m handler, or by calling the [33m.resume()[39m method.[0m
[0mUntil the data is consumed, the [33m'end'[39m event will not fire. Also, until[0m
[0mthe data is read it will consume memory that can eventually lead to a[0m
[0m'process out of memory' error.[0m

[0mUnlike the [33mrequest[39m object, if the response closes prematurely, the[0m
[0m[33mresponse[39m object does not emit an [33m'error'[39m event but instead emits the[0m
[0m[33m'aborted'[39m event.[0m

[0mNode.js does not check whether Content-Length and the length of the[0m
[0mbody which has been transmitted are equal or not.[0m

[32m[1m### Event: [33m'abort'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.4.1[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the request has been aborted by the client. This event is only[0m
[0memitted on the first call to [33mabort()[39m.[0m

[32m[1m### Event: [33m'connect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mresponse[39m {http.IncomingMessage}[0m
    * [0m[33msocket[39m {stream.Duplex}[0m
    * [0m[33mhead[39m {Buffer}[0m

[0mEmitted each time a server responds to a request with a [33mCONNECT[39m method. If[0m
[0mthis event is not being listened for, clients receiving a [33mCONNECT[39m method will[0m
[0mhave their connections closed.[0m

[0mThis event is guaranteed to be passed an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specifies a socket[0m
[0mtype other than {net.Socket}.[0m

[0mA client and server pair demonstrating how to listen for the [33m'connect'[39m event:[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mURL[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/url'[39m[90m)[39m[90m;[39m
    
    [90m// Create an HTTP tunneling proxy[39m
    [94mconst[39m [37mproxy[39m [93m=[39m [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'okay'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mproxy[39m[32m.[39m[37mon[39m[90m([39m[92m'connect'[39m[32m,[39m [90m([39m[37mreq[39m[32m,[39m [37mclientSocket[39m[32m,[39m [37mhead[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Connect to an origin server[39m
      [94mconst[39m [33m{[39m [37mport[39m[32m,[39m [37mhostname[39m [33m}[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m`http://${[37mreq[39m[32m.[39m[37murl[39m}`[90m)[39m[90m;[39m
      [94mconst[39m [37mserverSocket[39m [93m=[39m [37mnet[39m[32m.[39m[37mconnect[39m[90m([39m[37mport[39m [93m||[39m [34m80[39m[32m,[39m [37mhostname[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mclientSocket[39m[32m.[39m[37mwrite[39m[90m([39m[92m'HTTP/1.1 200 Connection Established\r\n'[39m [93m+[39m
                        [92m'Proxy-agent: Node.js-Proxy\r\n'[39m [93m+[39m
                        [92m'\r\n'[39m[90m)[39m[90m;[39m
        [37mserverSocket[39m[32m.[39m[37mwrite[39m[90m([39m[37mhead[39m[90m)[39m[90m;[39m
        [37mserverSocket[39m[32m.[39m[37mpipe[39m[90m([39m[37mclientSocket[39m[90m)[39m[90m;[39m
        [37mclientSocket[39m[32m.[39m[37mpipe[39m[90m([39m[37mserverSocket[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Now that proxy is running[39m
    [37mproxy[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[32m,[39m [92m'127.0.0.1'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
    
      [90m// Make a request to a tunneling proxy[39m
      [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
        [37mport[39m[93m:[39m [34m1337[39m[32m,[39m
        [37mhost[39m[93m:[39m [92m'127.0.0.1'[39m[32m,[39m
        [37mmethod[39m[93m:[39m [92m'CONNECT'[39m[32m,[39m
        [37mpath[39m[93m:[39m [92m'www.google.com:80'[39m
      [33m}[39m[90m;[39m
    
      [94mconst[39m [37mreq[39m [93m=[39m [37mhttp[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
      [37mreq[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    
      [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'connect'[39m[32m,[39m [90m([39m[37mres[39m[32m,[39m [37msocket[39m[32m,[39m [37mhead[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'got connected!'[39m[90m)[39m[90m;[39m
    
        [90m// Make a request over an HTTP tunnel[39m
        [37msocket[39m[32m.[39m[37mwrite[39m[90m([39m[92m'GET / HTTP/1.1\r\n'[39m [93m+[39m
                     [92m'Host: www.google.com:80\r\n'[39m [93m+[39m
                     [92m'Connection: close\r\n'[39m [93m+[39m
                     [92m'\r\n'[39m[90m)[39m[90m;[39m
        [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mchunk[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
        [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [37mproxy[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'continue'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the server sends a '100 Continue' HTTP response, usually because[0m
[0mthe request contained 'Expect: 100-continue'. This is an instruction that[0m
[0mthe client should send the request body.[0m

[32m[1m### Event: [33m'information'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33minfo[39m {Object}
        * [0m[0m[33mhttpVersion[39m {string}[0m[0m[0m
      [0m
        * [0m[0m[33mhttpVersionMajor[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mhttpVersionMinor[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mstatusCode[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mstatusMessage[39m {string}[0m[0m[0m
      [0m
        * [0m[0m[33mheaders[39m {Object}[0m[0m[0m
      [0m
        * [0m[0m[33mrawHeaders[39m {string[]}[0m[0m[0m

[0mEmitted when the server sends a 1xx intermediate response (excluding 101[0m
[0mUpgrade). The listeners of this event will receive an object containing the[0m
[0mHTTP version, status code, status message, key-value headers object,[0m
[0mand array with the raw header names followed by their respective values.[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mhost[39m[93m:[39m [92m'127.0.0.1'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m8080[39m[32m,[39m
      [37mpath[39m[93m:[39m [92m'/length_request'[39m
    [33m}[39m[90m;[39m
    
    [90m// Make a request[39m
    [94mconst[39m [37mreq[39m [93m=[39m [37mhttp[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'information'[39m[32m,[39m [90m([39m[37minfo[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Got information prior to main response: ${[37minfo[39m[32m.[39m[37mstatusCode[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m101 Upgrade statuses do not fire this event due to their break from the[0m
[0mtraditional HTTP request/response chain, such as web sockets, in-place TLS[0m
[0mupgrades, or HTTP 2.0. To be notified of 101 Upgrade notices, listen for the[0m
[0m[[33m'upgrade'[39m][] event instead.[0m

[32m[1m### Event: [33m'response'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mresponse[39m {http.IncomingMessage}[0m

[0mEmitted when a response is received to this request. This event is emitted only[0m
[0monce.[0m

[32m[1m### Event: [33m'socket'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msocket[39m {stream.Duplex}[0m

[0mThis event is guaranteed to be passed an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specifies a socket[0m
[0mtype other than {net.Socket}.[0m

[32m[1m### Event: [33m'timeout'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the underlying socket times out from inactivity. This only notifies[0m
[0mthat the socket has been idle. The request must be aborted manually.[0m

[0mSee also: [[33mrequest.setTimeout()[39m][].[0m

[32m[1m### Event: [33m'upgrade'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.94[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mresponse[39m {http.IncomingMessage}[0m
    * [0m[33msocket[39m {stream.Duplex}[0m
    * [0m[33mhead[39m {Buffer}[0m

[0mEmitted each time a server responds to a request with an upgrade. If this[0m
[0mevent is not being listened for and the response status code is 101 Switching[0m
[0mProtocols, clients receiving an upgrade header will have their connections[0m
[0mclosed.[0m

[0mThis event is guaranteed to be passed an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specifies a socket[0m
[0mtype other than {net.Socket}.[0m

[0mA client server pair demonstrating how to listen for the [33m'upgrade'[39m event.[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    
    [90m// Create an HTTP server[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'okay'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'upgrade'[39m[32m,[39m [90m([39m[37mreq[39m[32m,[39m [37msocket[39m[32m,[39m [37mhead[39m[90m)[39m [93m=>[39m [33m{[39m
      [37msocket[39m[32m.[39m[37mwrite[39m[90m([39m[92m'HTTP/1.1 101 Web Socket Protocol Handshake\r\n'[39m [93m+[39m
                   [92m'Upgrade: WebSocket\r\n'[39m [93m+[39m
                   [92m'Connection: Upgrade\r\n'[39m [93m+[39m
                   [92m'\r\n'[39m[90m)[39m[90m;[39m
    
      [37msocket[39m[32m.[39m[37mpipe[39m[90m([39m[37msocket[39m[90m)[39m[90m;[39m [90m// echo back[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Now that server is running[39m
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[32m,[39m [92m'127.0.0.1'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
    
      [90m// make a request[39m
      [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
        [37mport[39m[93m:[39m [34m1337[39m[32m,[39m
        [37mhost[39m[93m:[39m [92m'127.0.0.1'[39m[32m,[39m
        [37mheaders[39m[93m:[39m [33m{[39m
          [32m'Connection'[39m[93m:[39m [92m'Upgrade'[39m[32m,[39m
          [32m'Upgrade'[39m[93m:[39m [92m'websocket'[39m
        [33m}[39m
      [33m}[39m[90m;[39m
    
      [94mconst[39m [37mreq[39m [93m=[39m [37mhttp[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
      [37mreq[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    
      [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'upgrade'[39m[32m,[39m [90m([39m[37mres[39m[32m,[39m [37msocket[39m[32m,[39m [37mupgradeHead[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'got upgraded!'[39m[90m)[39m[90m;[39m
        [37msocket[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
        [37mprocess[39m[32m.[39m[37mexit[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mrequest.abort()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mMarks the request as aborting. Calling this will cause remaining data[0m
[0min the response to be dropped and the socket to be destroyed.[0m

[32m[1m### [33mrequest.aborted[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.14[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20230[39m
[90m    description: The `aborted` property is no longer a timestamp number.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThe [33mrequest.aborted[39m property will be [33mtrue[39m if the request has[0m
[0mbeen aborted.[0m

[32m[1m### [33mrequest.connection[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90mdeprecated: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated. Use [[33mrequest.socket[39m[90m][].[0m[23m[39m

    * [0m{stream.Duplex}[0m

[0mSee [[33mrequest.socket[39m][].[0m

[32m[1m### [33mrequest.end([data[, encoding]][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18780[39m
[90m    description: This method now returns a reference to `ClientRequest`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {string|Buffer}[0m
    * [0m[33mencoding[39m {string}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {this}[0m

[0mFinishes sending the request. If any parts of the body are[0m
[0munsent, it will flush them to the stream. If the request is[0m
[0mchunked, this will send the terminating [33m'0\r\n\r\n'[39m.[0m

[0mIf [33mdata[39m is specified, it is equivalent to calling[0m
[0m[[33mrequest.write(data, encoding)[39m][] followed by [33mrequest.end(callback)[39m.[0m

[0mIf [33mcallback[39m is specified, it will be called when the request stream[0m
[0mis finished.[0m

[32m[1m### [33mrequest.finished[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90mdeprecated: v13.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated. Use [[33mrequest.writableEnded[39m[90m][].[0m[23m[39m

    * [0m{boolean}[0m

[0mThe [33mrequest.finished[39m property will be [33mtrue[39m if [[33mrequest.end()[39m][][0m
[0mhas been called. [33mrequest.end()[39m will automatically be called if the[0m
[0mrequest was initiated via [[33mhttp.get()[39m][].[0m

[32m[1m### [33mrequest.flushHeaders()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mFlushes the request headers.[0m

[0mFor efficiency reasons, Node.js normally buffers the request headers until[0m
[0m[33mrequest.end()[39m is called or the first chunk of request data is written. It[0m
[0mthen tries to pack the request headers and data into a single TCP packet.[0m

[0mThat's usually desired (it saves a TCP round-trip), but not when the first[0m
[0mdata is not sent until possibly much later. [33mrequest.flushHeaders()[39m bypasses[0m
[0mthe optimization and kickstarts the request.[0m

[32m[1m### [33mrequest.getHeader(name)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0mReturns: {any}[0m

[0mReads out a header on the request. The name is case-insensitive.[0m
[0mThe type of the return value depends on the arguments provided to[0m
[0m[[33mrequest.setHeader()[39m][].[0m

    [37mrequest[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'content-type'[39m[32m,[39m [92m'text/html'[39m[90m)[39m[90m;[39m
    [37mrequest[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Length'[39m[32m,[39m [37mBuffer[39m[32m.[39m[37mbyteLength[39m[90m([39m[37mbody[39m[90m)[39m[90m)[39m[90m;[39m
    [37mrequest[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Cookie'[39m[32m,[39m [33m[[39m[92m'type=ninja'[39m[32m,[39m [92m'language=javascript'[39m[33m][39m[90m)[39m[90m;[39m
    [94mconst[39m [37mcontentType[39m [93m=[39m [37mrequest[39m[32m.[39m[37mgetHeader[39m[90m([39m[92m'Content-Type'[39m[90m)[39m[90m;[39m
    [90m// 'contentType' is 'text/html'[39m
    [94mconst[39m [37mcontentLength[39m [93m=[39m [37mrequest[39m[32m.[39m[37mgetHeader[39m[90m([39m[92m'Content-Length'[39m[90m)[39m[90m;[39m
    [90m// 'contentLength' is of type number[39m
    [94mconst[39m [37mcookie[39m [93m=[39m [37mrequest[39m[32m.[39m[37mgetHeader[39m[90m([39m[92m'Cookie'[39m[90m)[39m[90m;[39m
    [90m// 'cookie' is of type string[][39m

[32m[1m### [33mrequest.maxHeadersCount[39m[32m[22m[39m

    * [0m{number} [1mDefault:[22m [33m2000[39m[0m

[0mLimits maximum response headers count. If set to 0, no limit will be applied.[0m

[32m[1m### [33mrequest.path[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string} The request path.[0m

[32m[1m### [33mrequest.removeHeader(name)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m

[0mRemoves a header that's already defined into headers object.[0m

    [37mrequest[39m[32m.[39m[37mremoveHeader[39m[90m([39m[92m'Content-Type'[39m[90m)[39m[90m;[39m

[32m[1m### [33mrequest.reusedSocket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean} Whether the request is send through a reused socket.[0m

[0mWhen sending request through a keep-alive enabled agent, the underlying socket[0m
[0mmight be reused. But if server closes connection at unfortunate time, client[0m
[0mmay run into a 'ECONNRESET' error.[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    
    [90m// Server has a 5 seconds keep-alive timeout by default[39m
    [37mhttp[39m
      [32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mres[39m[32m.[39m[37mwrite[39m[90m([39m[92m'hello\n'[39m[90m)[39m[90m;[39m
        [37mres[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m
      [32m.[39m[37mlisten[39m[90m([39m[34m3000[39m[90m)[39m[90m;[39m
    
    [37msetInterval[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Adapting a keep-alive agent[39m
      [37mhttp[39m[32m.[39m[37mget[39m[90m([39m[92m'http://localhost:3000'[39m[32m,[39m [33m{[39m [37magent[39m [33m}[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// Do nothing[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[32m,[39m [34m5000[39m[90m)[39m[90m;[39m [90m// Sending request on 5s interval so it's easy to hit idle timeout[39m

[0mBy marking a request whether it reused socket or not, we can do[0m
[0mautomatic error retry base on it.[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37magent[39m [93m=[39m [31mnew[39m [37mhttp[39m[32m.[39m[37mAgent[39m[90m([39m[33m{[39m [37mkeepAlive[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37mretriableRequest[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [37mreq[39m [93m=[39m [37mhttp[39m
        [32m.[39m[37mget[39m[90m([39m[92m'http://localhost:3000'[39m[32m,[39m [33m{[39m [37magent[39m [33m}[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// ...[39m
        [33m}[39m[90m)[39m
        [32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// Check if retry is needed[39m
          [94mif[39m [90m([39m[37mreq[39m[32m.[39m[37mreusedSocket[39m [93m&&[39m [37merr[39m[32m.[39m[37mcode[39m [93m===[39m [92m'ECONNRESET'[39m[90m)[39m [33m{[39m
            [37mretriableRequest[39m[90m([39m[90m)[39m[90m;[39m
          [33m}[39m
        [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mretriableRequest[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33mrequest.setHeader(name, value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0m[33mvalue[39m {any}[0m

[0mSets a single header value for headers object. If this header already exists in[0m
[0mthe to-be-sent headers, its value will be replaced. Use an array of strings[0m
[0mhere to send multiple headers with the same name. Non-string values will be[0m
[0mstored without modification. Therefore, [[33mrequest.getHeader()[39m][] may return[0m
[0mnon-string values. However, the non-string values will be converted to strings[0m
[0mfor network transmission.[0m

    [37mrequest[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'application/json'[39m[90m)[39m[90m;[39m

[0mor[0m

    [37mrequest[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Cookie'[39m[32m,[39m [33m[[39m[92m'type=ninja'[39m[32m,[39m [92m'language=javascript'[39m[33m][39m[90m)[39m[90m;[39m

[32m[1m### [33mrequest.setNoDelay([noDelay])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mnoDelay[39m {boolean}[0m

[0mOnce a socket is assigned to this request and is connected[0m
[0m[[33msocket.setNoDelay()[39m][] will be called.[0m

[32m[1m### [33mrequest.setSocketKeepAlive([enable][, initialDelay])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33menable[39m {boolean}[0m
    * [0m[33minitialDelay[39m {number}[0m

[0mOnce a socket is assigned to this request and is connected[0m
[0m[[33msocket.setKeepAlive()[39m][] will be called.[0m

[32m[1m### [33mrequest.setTimeout(timeout[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8895[39m
[90m    description: Consistently set socket timeout only when the socket connects.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtimeout[39m {number} Milliseconds before a request times out.[0m
    * [0m[33mcallback[39m {Function} Optional function to be called when a timeout occurs.[0m
      [0mSame as binding to the [33m'timeout'[39m event.[0m
    * [0mReturns: {http.ClientRequest}[0m

[0mOnce a socket is assigned to this request and is connected[0m
[0m[[33msocket.setTimeout()[39m][] will be called.[0m

[32m[1m### [33mrequest.socket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{stream.Duplex}[0m

[0mReference to the underlying socket. Usually users will not want to access[0m
[0mthis property. In particular, the socket will not emit [33m'readable'[39m events[0m
[0mbecause of how the protocol parser attaches to the socket. The [33msocket[39m[0m
[0mmay also be accessed via [33mrequest.connection[39m.[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mhost[39m[93m:[39m [92m'www.google.com'[39m[32m,[39m
    [33m}[39m[90m;[39m
    [94mconst[39m [37mreq[39m [93m=[39m [37mhttp[39m[32m.[39m[37mget[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37monce[39m[90m([39m[92m'response'[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mip[39m [93m=[39m [37mreq[39m[32m.[39m[37msocket[39m[32m.[39m[37mlocalAddress[39m[90m;[39m
      [94mconst[39m [37mport[39m [93m=[39m [37mreq[39m[32m.[39m[37msocket[39m[32m.[39m[37mlocalPort[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Your IP address is ${[37mip[39m} and your source port is ${[37mport[39m}.`[90m)[39m[90m;[39m
      [90m// Consume response object[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThis property is guaranteed to be an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specified a socket[0m
[0mtype other than {net.Socket}.[0m

[32m[1m### [33mrequest.writableEnded[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m after [[33mrequest.end()[39m][] has been called. This property[0m
[0mdoes not indicate whether the data has been flushed, for this use[0m
[0m[[33mrequest.writableFinished[39m][] instead.[0m

[32m[1m### [33mrequest.writableFinished[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m if all data has been flushed to the underlying system, immediately[0m
[0mbefore the [[33m'finish'[39m][] event is emitted.[0m

[32m[1m### [33mrequest.write(chunk[, encoding][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.29[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mchunk[39m {string|Buffer}[0m
    * [0m[33mencoding[39m {string}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {boolean}[0m

[0mSends a chunk of the body. By calling this method[0m
[0mmany times, a request body can be sent to a[0m
[0mserver. In that case, it is suggested to use the[0m
[0m[33m['Transfer-Encoding', 'chunked'][39m header line when[0m
[0mcreating the request.[0m

[0mThe [33mencoding[39m argument is optional and only applies when [33mchunk[39m is a string.[0m
[0mDefaults to [33m'utf8'[39m.[0m

[0mThe [33mcallback[39m argument is optional and will be called when this chunk of data[0m
[0mis flushed, but only if the chunk is non-empty.[0m

[0mReturns [33mtrue[39m if the entire data was flushed successfully to the kernel[0m
[0mbuffer. Returns [33mfalse[39m if all or part of the data was queued in user memory.[0m
[0m[33m'drain'[39m will be emitted when the buffer is free again.[0m

[0mWhen [33mwrite[39m function is called with empty string or buffer, it does[0m
[0mnothing and waits for more input.[0m

[32m[1m## Class: [33mhttp.Server[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.17[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {net.Server}[0m

[32m[1m### Event: [33m'checkContinue'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {http.IncomingMessage}[0m
    * [0m[33mresponse[39m {http.ServerResponse}[0m

[0mEmitted each time a request with an HTTP [33mExpect: 100-continue[39m is received.[0m
[0mIf this event is not listened for, the server will automatically respond[0m
[0mwith a [33m100 Continue[39m as appropriate.[0m

[0mHandling this event involves calling [[33mresponse.writeContinue()[39m][] if the[0m
[0mclient should continue to send the request body, or generating an appropriate[0m
[0mHTTP response (e.g. 400 Bad Request) if the client should not continue to send[0m
[0mthe request body.[0m

[0mWhen this event is emitted and handled, the [[33m'request'[39m][] event will[0m
[0mnot be emitted.[0m

[32m[1m### Event: [33m'checkExpectation'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {http.IncomingMessage}[0m
    * [0m[33mresponse[39m {http.ServerResponse}[0m

[0mEmitted each time a request with an HTTP [33mExpect[39m header is received, where the[0m
[0mvalue is not [33m100-continue[39m. If this event is not listened for, the server will[0m
[0mautomatically respond with a [33m417 Expectation Failed[39m as appropriate.[0m

[0mWhen this event is emitted and handled, the [[33m'request'[39m][] event will[0m
[0mnot be emitted.[0m

[32m[1m### Event: [33m'clientError'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.94[39m
[90mchanges:[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4557[39m
[90m    description: The default action of calling `.destroy()` on the `socket`[39m
[90m                 will no longer take place if there are listeners attached[39m
[90m                 for `'clientError'`.[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17672[39m
[90m    description: The `rawPacket` is the current buffer that just parsed. Adding[39m
[90m                 this buffer to the error object of `'clientError'` event is to[39m
[90m                 make it possible that developers can log the broken packet.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25605[39m
[90m    description: The default behavior will return a 431 Request Header[39m
[90m                 Fields Too Large if a HPE_HEADER_OVERFLOW error occurs.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mexception[39m {Error}[0m
    * [0m[33msocket[39m {stream.Duplex}[0m

[0mIf a client connection emits an [33m'error'[39m event, it will be forwarded here.[0m
[0mListener of this event is responsible for closing/destroying the underlying[0m
[0msocket. For example, one may wish to more gracefully close the socket with a[0m
[0mcustom HTTP response instead of abruptly severing the connection.[0m

[0mThis event is guaranteed to be passed an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specifies a socket[0m
[0mtype other than {net.Socket}.[0m

[0mDefault behavior is to try close the socket with a HTTP '400 Bad Request',[0m
[0mor a HTTP '431 Request Header Fields Too Large' in the case of a[0m
[0m[[33mHPE_HEADER_OVERFLOW[39m][] error. If the socket is not writable it is[0m
[0mimmediately destroyed.[0m

[0m[33msocket[39m is the [[33mnet.Socket[39m][] object that the error originated from.[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'clientError'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [37msocket[39m[32m.[39m[37mend[39m[90m([39m[92m'HTTP/1.1 400 Bad Request\r\n\r\n'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m8000[39m[90m)[39m[90m;[39m

[0mWhen the [33m'clientError'[39m event occurs, there is no [33mrequest[39m or [33mresponse[39m[0m
[0mobject, so any HTTP response sent, including response headers and payload,[0m
[0m[3mmust[23m be written directly to the [33msocket[39m object. Care must be taken to[0m
[0mensure the response is a properly formatted HTTP response message.[0m

[0m[33merr[39m is an instance of [33mError[39m with two extra columns:[0m

    * [0m[33mbytesParsed[39m: the bytes count of request packet that Node.js may have parsed[0m
      [0mcorrectly;[0m
    * [0m[33mrawPacket[39m: the raw packet of current request.[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the server closes.[0m

[32m[1m### Event: [33m'connect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {http.IncomingMessage} Arguments for the HTTP request, as it is in[0m
      [0mthe [[33m'request'[39m][] event[0m
    * [0m[33msocket[39m {stream.Duplex} Network socket between the server and client[0m
    * [0m[33mhead[39m {Buffer} The first packet of the tunneling stream (may be empty)[0m

[0mEmitted each time a client requests an HTTP [33mCONNECT[39m method. If this event is[0m
[0mnot listened for, then clients requesting a [33mCONNECT[39m method will have their[0m
[0mconnections closed.[0m

[0mThis event is guaranteed to be passed an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specifies a socket[0m
[0mtype other than {net.Socket}.[0m

[0mAfter this event is emitted, the request's socket will not have a [33m'data'[39m[0m
[0mevent listener, meaning it will need to be bound in order to handle data[0m
[0msent to the server on that socket.[0m

[32m[1m### Event: [33m'connection'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msocket[39m {stream.Duplex}[0m

[0mThis event is emitted when a new TCP stream is established. [33msocket[39m is[0m
[0mtypically an object of type [[33mnet.Socket[39m][]. Usually users will not want to[0m
[0maccess this event. In particular, the socket will not emit [33m'readable'[39m events[0m
[0mbecause of how the protocol parser attaches to the socket. The [33msocket[39m can[0m
[0malso be accessed at [33mrequest.connection[39m.[0m

[0mThis event can also be explicitly emitted by users to inject connections[0m
[0minto the HTTP server. In that case, any [[33mDuplex[39m][] stream can be passed.[0m

[0mIf [33msocket.setTimeout()[39m is called here, the timeout will be replaced with[0m
[0m[33mserver.keepAliveTimeout[39m when the socket has served a request (if[0m
[0m[33mserver.keepAliveTimeout[39m is non-zero).[0m

[0mThis event is guaranteed to be passed an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specifies a socket[0m
[0mtype other than {net.Socket}.[0m

[32m[1m### Event: [33m'request'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {http.IncomingMessage}[0m
    * [0m[33mresponse[39m {http.ServerResponse}[0m

[0mEmitted each time there is a request. There may be multiple requests[0m
[0mper connection (in the case of HTTP Keep-Alive connections).[0m

[32m[1m### Event: [33m'upgrade'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.94[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: v10.0.0[39m
[90m    description: Not listening to this event no longer causes the socket[39m
[90m                 to be destroyed if a client sends an Upgrade header.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {http.IncomingMessage} Arguments for the HTTP request, as it is in[0m
      [0mthe [[33m'request'[39m][] event[0m
    * [0m[33msocket[39m {stream.Duplex} Network socket between the server and client[0m
    * [0m[33mhead[39m {Buffer} The first packet of the upgraded stream (may be empty)[0m

[0mEmitted each time a client requests an HTTP upgrade. Listening to this event[0m
[0mis optional and clients cannot insist on a protocol change.[0m

[0mAfter this event is emitted, the request's socket will not have a [33m'data'[39m[0m
[0mevent listener, meaning it will need to be bound in order to handle data[0m
[0msent to the server on that socket.[0m

[0mThis event is guaranteed to be passed an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specifies a socket[0m
[0mtype other than {net.Socket}.[0m

[32m[1m### [33mserver.close([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m

[0mStops the server from accepting new connections. See [[33mnet.Server.close()[39m][].[0m

[32m[1m### [33mserver.headersTimeout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} [1mDefault:[22m [33m60000[39m[0m

[0mLimit the amount of time the parser will wait to receive the complete HTTP[0m
[0mheaders.[0m

[0mIn case of inactivity, the rules defined in [[33mserver.timeout[39m][] apply. However,[0m
[0mthat inactivity based timeout would still allow the connection to be kept open[0m
[0mif the headers are being sent very slowly (by default, up to a byte per 2[0m
[0mminutes). In order to prevent this, whenever header data arrives an additional[0m
[0mcheck is made that more than [33mserver.headersTimeout[39m milliseconds has not[0m
[0mpassed since the connection was established. If the check fails, a [33m'timeout'[39m[0m
[0mevent is emitted on the server object, and (by default) the socket is destroyed.[0m
[0mSee [[33mserver.timeout[39m][] for more information on how timeout behavior can be[0m
[0mcustomized.[0m

[32m[1m### [33mserver.listen()[39m[32m[22m[39m

[0mStarts the HTTP server listening for connections.[0m
[0mThis method is identical to [[33mserver.listen()[39m][] from [[33mnet.Server[39m][].[0m

[32m[1m### [33mserver.listening[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean} Indicates whether or not the server is listening for connections.[0m

[32m[1m### [33mserver.maxHeadersCount[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} [1mDefault:[22m [33m2000[39m[0m

[0mLimits maximum incoming headers count. If set to 0, no limit will be applied.[0m

[32m[1m### [33mserver.setTimeout([msecs][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.12[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27558[39m
[90m    description: The default timeout changed from 120s to 0 (no timeout).[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number} [1mDefault:[22m 0 (no timeout)[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {http.Server}[0m

[0mSets the timeout value for sockets, and emits a [33m'timeout'[39m event on[0m
[0mthe Server object, passing the socket as an argument, if a timeout[0m
[0moccurs.[0m

[0mIf there is a [33m'timeout'[39m event listener on the Server object, then it[0m
[0mwill be called with the timed-out socket as an argument.[0m

[0mBy default, the Server does not timeout sockets. However, if a callback[0m
[0mis assigned to the Server's [33m'timeout'[39m event, timeouts must be handled[0m
[0mexplicitly.[0m

[32m[1m### [33mserver.timeout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.12[39m
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

[32m[1m### [33mserver.keepAliveTimeout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} Timeout in milliseconds. [1mDefault:[22m [33m5000[39m (5 seconds).[0m

[0mThe number of milliseconds of inactivity a server needs to wait for additional[0m
[0mincoming data, after it has finished writing the last response, before a socket[0m
[0mwill be destroyed. If the server receives new data before the keep-alive[0m
[0mtimeout has fired, it will reset the regular inactivity timeout, i.e.,[0m
[0m[[33mserver.timeout[39m][].[0m

[0mA value of [33m0[39m will disable the keep-alive timeout behavior on incoming[0m
[0mconnections.[0m
[0mA value of [33m0[39m makes the http server behave similarly to Node.js versions prior[0m
[0mto 8.0.0, which did not have a keep-alive timeout.[0m

[0mThe socket timeout logic is set up on connection, so changing this value only[0m
[0maffects new connections to the server, not any existing connections.[0m

[32m[1m## Class: [33mhttp.ServerResponse[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.17[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {Stream}[0m

[0mThis object is created internally by an HTTP server, not by the user. It is[0m
[0mpassed as the second parameter to the [[33m'request'[39m][] event.[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.7[39m
[90m-->[39m
[90m[39m
[90m[39m[0mIndicates that the underlying connection was terminated.[0m

[32m[1m### Event: [33m'finish'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.6[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the response has been sent. More specifically, this event is[0m
[0memitted when the last segment of the response headers and body have been[0m
[0mhanded off to the operating system for transmission over the network. It[0m
[0mdoes not imply that the client has received anything yet.[0m

[32m[1m### [33mresponse.addTrailers(headers)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mheaders[39m {Object}[0m

[0mThis method adds HTTP trailing headers (a header but at the end of the[0m
[0mmessage) to the response.[0m

[0mTrailers will [1monly[22m be emitted if chunked encoding is used for the[0m
[0mresponse; if it is not (e.g. if the request was HTTP/1.0), they will[0m
[0mbe silently discarded.[0m

[0mHTTP requires the [33mTrailer[39m header to be sent in order to[0m
[0memit trailers, with a list of the header fields in its value. E.g.,[0m

    [37mresponse[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m[32m,[39m
                              [32m'Trailer'[39m[93m:[39m [92m'Content-MD5'[39m [33m}[39m[90m)[39m[90m;[39m
    [37mresponse[39m[32m.[39m[37mwrite[39m[90m([39m[37mfileData[39m[90m)[39m[90m;[39m
    [37mresponse[39m[32m.[39m[37maddTrailers[39m[90m([39m[33m{[39m [32m'Content-MD5'[39m[93m:[39m [92m'7895bf4b8828b55ceaf47747b4bca667'[39m [33m}[39m[90m)[39m[90m;[39m
    [37mresponse[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m

[0mAttempting to set a header field name or value that contains invalid characters[0m
[0mwill result in a [[33mTypeError[39m][] being thrown.[0m

[32m[1m### [33mresponse.connection[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90mdeprecated: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated. Use [[33mresponse.socket[39m[90m][].[0m[23m[39m

    * [0m{stream.Duplex}[0m

[0mSee [[33mresponse.socket[39m][].[0m

[32m[1m### [33mresponse.cork()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mSee [[33mwritable.cork()[39m][].[0m

[32m[1m### [33mresponse.end([data[, encoding]][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
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

[0mIf [33mdata[39m is specified, it is similar in effect to calling[0m
[0m[[33mresponse.write(data, encoding)[39m][] followed by [33mresponse.end(callback)[39m.[0m

[0mIf [33mcallback[39m is specified, it will be called when the response stream[0m
[0mis finished.[0m

[32m[1m### [33mresponse.finished[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mdeprecated: v13.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated. Use [[33mresponse.writableEnded[39m[90m][].[0m[23m[39m

    * [0m{boolean}[0m

[0mThe [33mresponse.finished[39m property will be [33mtrue[39m if [[33mresponse.end()[39m][][0m
[0mhas been called.[0m

[32m[1m### [33mresponse.flushHeaders()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mFlushes the response headers. See also: [[33mrequest.flushHeaders()[39m][].[0m

[32m[1m### [33mresponse.getHeader(name)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0mReturns: {any}[0m

[0mReads out a header that's already been queued but not sent to the client.[0m
[0mThe name is case-insensitive. The type of the return value depends[0m
[0mon the arguments provided to [[33mresponse.setHeader()[39m][].[0m

    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'text/html'[39m[90m)[39m[90m;[39m
    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Length'[39m[32m,[39m [37mBuffer[39m[32m.[39m[37mbyteLength[39m[90m([39m[37mbody[39m[90m)[39m[90m)[39m[90m;[39m
    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Set-Cookie'[39m[32m,[39m [33m[[39m[92m'type=ninja'[39m[32m,[39m [92m'language=javascript'[39m[33m][39m[90m)[39m[90m;[39m
    [94mconst[39m [37mcontentType[39m [93m=[39m [37mresponse[39m[32m.[39m[37mgetHeader[39m[90m([39m[92m'content-type'[39m[90m)[39m[90m;[39m
    [90m// contentType is 'text/html'[39m
    [94mconst[39m [37mcontentLength[39m [93m=[39m [37mresponse[39m[32m.[39m[37mgetHeader[39m[90m([39m[92m'Content-Length'[39m[90m)[39m[90m;[39m
    [90m// contentLength is of type number[39m
    [94mconst[39m [37msetCookie[39m [93m=[39m [37mresponse[39m[32m.[39m[37mgetHeader[39m[90m([39m[92m'set-cookie'[39m[90m)[39m[90m;[39m
    [90m// setCookie is of type string[][39m

[32m[1m### [33mresponse.getHeaderNames()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string[]}[0m

[0mReturns an array containing the unique names of the current outgoing headers.[0m
[0mAll header names are lowercase.[0m

    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Set-Cookie'[39m[32m,[39m [33m[[39m[92m'foo=bar'[39m[32m,[39m [92m'bar=baz'[39m[33m][39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mheaderNames[39m [93m=[39m [37mresponse[39m[32m.[39m[37mgetHeaderNames[39m[90m([39m[90m)[39m[90m;[39m
    [90m// headerNames === ['foo', 'set-cookie'][39m

[32m[1m### [33mresponse.getHeaders()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.7.0[39m
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

[32m[1m### [33mresponse.hasHeader(name)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the header identified by [33mname[39m is currently set in the[0m
[0moutgoing headers. The header name matching is case-insensitive.[0m

    [94mconst[39m [37mhasContentType[39m [93m=[39m [37mresponse[39m[32m.[39m[37mhasHeader[39m[90m([39m[92m'content-type'[39m[90m)[39m[90m;[39m

[32m[1m### [33mresponse.headersSent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mBoolean (read-only). True if headers were sent, false otherwise.[0m

[32m[1m### [33mresponse.removeHeader(name)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m

[0mRemoves a header that's queued for implicit sending.[0m

    [37mresponse[39m[32m.[39m[37mremoveHeader[39m[90m([39m[92m'Content-Encoding'[39m[90m)[39m[90m;[39m

[32m[1m### [33mresponse.sendDate[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.5[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mWhen true, the Date header will be automatically generated and sent in[0m
[0mthe response if it is not already present in the headers. Defaults to true.[0m

[0mThis should only be disabled for testing; HTTP requires the Date header[0m
[0min responses.[0m

[32m[1m### [33mresponse.setHeader(name, value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mname[39m {string}[0m
    * [0m[33mvalue[39m {any}[0m

[0mSets a single header value for implicit headers. If this header already exists[0m
[0min the to-be-sent headers, its value will be replaced. Use an array of strings[0m
[0mhere to send multiple headers with the same name. Non-string values will be[0m
[0mstored without modification. Therefore, [[33mresponse.getHeader()[39m][] may return[0m
[0mnon-string values. However, the non-string values will be converted to strings[0m
[0mfor network transmission.[0m

    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'text/html'[39m[90m)[39m[90m;[39m

[0mor[0m

    [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Set-Cookie'[39m[32m,[39m [33m[[39m[92m'type=ninja'[39m[32m,[39m [92m'language=javascript'[39m[33m][39m[90m)[39m[90m;[39m

[0mAttempting to set a header field name or value that contains invalid characters[0m
[0mwill result in a [[33mTypeError[39m][] being thrown.[0m

[0mWhen headers have been set with [[33mresponse.setHeader()[39m][], they will be merged[0m
[0mwith any headers passed to [[33mresponse.writeHead()[39m][], with the headers passed[0m
[0mto [[33mresponse.writeHead()[39m][] given precedence.[0m

    [90m// Returns content-type = text/plain[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'text/html'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'X-Foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'ok'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf [[33mresponse.writeHead()[39m][] method is called and this method has not been[0m
[0mcalled, it will directly write the supplied header values onto the network[0m
[0mchannel without caching internally, and the [[33mresponse.getHeader()[39m][] on the[0m
[0mheader will not yield the expected result. If progressive population of headers[0m
[0mis desired with potential future retrieval and modification, use[0m
[0m[[33mresponse.setHeader()[39m][] instead of [[33mresponse.writeHead()[39m][].[0m

[32m[1m### [33mresponse.setTimeout(msecs[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.12[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {http.ServerResponse}[0m

[0mSets the Socket's timeout value to [33mmsecs[39m. If a callback is[0m
[0mprovided, then it is added as a listener on the [33m'timeout'[39m event on[0m
[0mthe response object.[0m

[0mIf no [33m'timeout'[39m listener is added to the request, the response, or[0m
[0mthe server, then sockets are destroyed when they time out. If a handler is[0m
[0massigned to the request, the response, or the server's [33m'timeout'[39m events,[0m
[0mtimed out sockets must be handled explicitly.[0m

[32m[1m### [33mresponse.socket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{stream.Duplex}[0m

[0mReference to the underlying socket. Usually users will not want to access[0m
[0mthis property. In particular, the socket will not emit [33m'readable'[39m events[0m
[0mbecause of how the protocol parser attaches to the socket. After[0m
[0m[33mresponse.end()[39m, the property is nulled. The [33msocket[39m may also be accessed[0m
[0mvia [33mresponse.connection[39m.[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mip[39m [93m=[39m [37mres[39m[32m.[39m[37msocket[39m[32m.[39m[37mremoteAddress[39m[90m;[39m
      [94mconst[39m [37mport[39m [93m=[39m [37mres[39m[32m.[39m[37msocket[39m[32m.[39m[37mremotePort[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m`Your IP address is ${[37mip[39m} and your source port is ${[37mport[39m}.`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m3000[39m[90m)[39m[90m;[39m

[0mThis property is guaranteed to be an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specified a socket[0m
[0mtype other than {net.Socket}.[0m

[32m[1m### [33mresponse.statusCode[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} [1mDefault:[22m [33m200[39m[0m

[0mWhen using implicit headers (not calling [[33mresponse.writeHead()[39m][] explicitly),[0m
[0mthis property controls the status code that will be sent to the client when[0m
[0mthe headers get flushed.[0m

    [37mresponse[39m[32m.[39m[37mstatusCode[39m [93m=[39m [34m404[39m[90m;[39m

[0mAfter response header was sent to the client, this property indicates the[0m
[0mstatus code which was sent out.[0m

[32m[1m### [33mresponse.statusMessage[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mWhen using implicit headers (not calling [[33mresponse.writeHead()[39m][] explicitly),[0m
[0mthis property controls the status message that will be sent to the client when[0m
[0mthe headers get flushed. If this is left as [33mundefined[39m then the standard[0m
[0mmessage for the status code will be used.[0m

    [37mresponse[39m[32m.[39m[37mstatusMessage[39m [93m=[39m [92m'Not found'[39m[90m;[39m

[0mAfter response header was sent to the client, this property indicates the[0m
[0mstatus message which was sent out.[0m

[32m[1m### [33mresponse.uncork()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mSee [[33mwritable.uncork()[39m][].[0m

[32m[1m### [33mresponse.writableEnded[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m after [[33mresponse.end()[39m][] has been called. This property[0m
[0mdoes not indicate whether the data has been flushed, for this use[0m
[0m[[33mresponse.writableFinished[39m][] instead.[0m

[32m[1m### [33mresponse.writableFinished[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIs [33mtrue[39m if all data has been flushed to the underlying system, immediately[0m
[0mbefore the [[33m'finish'[39m][] event is emitted.[0m

[32m[1m### [33mresponse.write(chunk[, encoding][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.29[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mchunk[39m {string|Buffer}[0m
    * [0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {boolean}[0m

[0mIf this method is called and [[33mresponse.writeHead()[39m][] has not been called,[0m
[0mit will switch to implicit header mode and flush the implicit headers.[0m

[0mThis sends a chunk of the response body. This method may[0m
[0mbe called multiple times to provide successive parts of the body.[0m

[0mIn the [33mhttp[39m module, the response body is omitted when the[0m
[0mrequest is a HEAD request. Similarly, the [33m204[39m and [33m304[39m responses[0m
[0m[3mmust not[23m include a message body.[0m

[0m[33mchunk[39m can be a string or a buffer. If [33mchunk[39m is a string,[0m
[0mthe second parameter specifies how to encode it into a byte stream.[0m
[0m[33mcallback[39m will be called when this chunk of data is flushed.[0m

[0mThis is the raw HTTP body and has nothing to do with higher-level multi-part[0m
[0mbody encodings that may be used.[0m

[0mThe first time [[33mresponse.write()[39m][] is called, it will send the buffered[0m
[0mheader information and the first chunk of the body to the client. The second[0m
[0mtime [[33mresponse.write()[39m][] is called, Node.js assumes data will be streamed,[0m
[0mand sends the new data separately. That is, the response is buffered up to the[0m
[0mfirst chunk of the body.[0m

[0mReturns [33mtrue[39m if the entire data was flushed successfully to the kernel[0m
[0mbuffer. Returns [33mfalse[39m if all or part of the data was queued in user memory.[0m
[0m[33m'drain'[39m will be emitted when the buffer is free again.[0m

[32m[1m### [33mresponse.writeContinue()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mSends a HTTP/1.1 100 Continue message to the client, indicating that[0m
[0mthe request body should be sent. See the [[33m'checkContinue'[39m][] event on[0m
[0m[33mServer[39m.[0m

[32m[1m### [33mresponse.writeHead(statusCode[, statusMessage][, headers])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.30[39m
[90mchanges:[39m
[90m  - version: v11.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25974[39m
[90m    description: Return `this` from `writeHead()` to allow chaining with[39m
[90m                 `end()`.[39m
[90m  - version: v5.11.0, v4.4.5[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6291[39m
[90m    description: A `RangeError` is thrown if `statusCode` is not a number in[39m
[90m                 the range `[100, 999]`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstatusCode[39m {number}[0m
    * [0m[33mstatusMessage[39m {string}[0m
    * [0m[33mheaders[39m {Object}[0m
    * [0mReturns: {http.ServerResponse}[0m

[0mSends a response header to the request. The status code is a 3-digit HTTP[0m
[0mstatus code, like [33m404[39m. The last argument, [33mheaders[39m, are the response headers.[0m
[0mOptionally one can give a human-readable [33mstatusMessage[39m as the second[0m
[0margument.[0m

[0mReturns a reference to the [33mServerResponse[39m, so that calls can be chained.[0m

    [94mconst[39m [37mbody[39m [93m=[39m [92m'hello world'[39m[90m;[39m
    [37mresponse[39m
      [32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m
        [32m'Content-Length'[39m[93m:[39m [37mBuffer[39m[32m.[39m[37mbyteLength[39m[90m([39m[37mbody[39m[90m)[39m[32m,[39m
        [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m
      [33m}[39m[90m)[39m
      [32m.[39m[37mend[39m[90m([39m[37mbody[39m[90m)[39m[90m;[39m

[0mThis method must only be called once on a message and it must[0m
[0mbe called before [[33mresponse.end()[39m][] is called.[0m

[0mIf [[33mresponse.write()[39m][] or [[33mresponse.end()[39m][] are called before calling[0m
[0mthis, the implicit/mutable headers will be calculated and call this function.[0m

[0mWhen headers have been set with [[33mresponse.setHeader()[39m][], they will be merged[0m
[0mwith any headers passed to [[33mresponse.writeHead()[39m][], with the headers passed[0m
[0mto [[33mresponse.writeHead()[39m][] given precedence.[0m

[0mIf this method is called and [[33mresponse.setHeader()[39m][] has not been called,[0m
[0mit will directly write the supplied header values onto the network channel[0m
[0mwithout caching internally, and the [[33mresponse.getHeader()[39m][] on the header[0m
[0mwill not yield the expected result. If progressive population of headers is[0m
[0mdesired with potential future retrieval and modification, use[0m
[0m[[33mresponse.setHeader()[39m][] instead.[0m

    [90m// Returns content-type = text/plain[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'text/html'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'X-Foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Type'[39m[93m:[39m [92m'text/plain'[39m [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'ok'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[33mContent-Length[39m is given in bytes not characters. The above example[0m
[0mworks because the string [33m'hello world'[39m contains only single byte characters.[0m
[0mIf the body contains higher coded characters then [33mBuffer.byteLength()[39m[0m
[0mshould be used to determine the number of bytes in a given encoding.[0m
[0mAnd Node.js does not check whether [33mContent-Length[39m and the length of the body[0m
[0mwhich has been transmitted are equal or not.[0m

[0mAttempting to set a header field name or value that contains invalid characters[0m
[0mwill result in a [[33mTypeError[39m][] being thrown.[0m

[32m[1m### [33mresponse.writeProcessing()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mSends a HTTP/1.1 102 Processing message to the client, indicating that[0m
[0mthe request body should be sent.[0m

[32m[1m## Class: [33mhttp.IncomingMessage[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.17[39m
[90mchanges:[39m
[90m  - version: v13.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30135[39m
[90m    description: The `readableHighWaterMark` value mirrors that of the socket.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {stream.Readable}[0m

[0mAn [33mIncomingMessage[39m object is created by [[33mhttp.Server[39m][] or[0m
[0m[[33mhttp.ClientRequest[39m][] and passed as the first argument to the [[33m'request'[39m][][0m
[0mand [[33m'response'[39m][] event respectively. It may be used to access response[0m
[0mstatus, headers and data.[0m

[32m[1m### Event: [33m'aborted'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the request has been aborted.[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mIndicates that the underlying connection was closed.[0m

[32m[1m### [33mmessage.aborted[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThe [33mmessage.aborted[39m property will be [33mtrue[39m if the request has[0m
[0mbeen aborted.[0m

[32m[1m### [33mmessage.complete[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThe [33mmessage.complete[39m property will be [33mtrue[39m if a complete HTTP message has[0m
[0mbeen received and successfully parsed.[0m

[0mThis property is particularly useful as a means of determining if a client or[0m
[0mserver fully transmitted a message before a connection was terminated:[0m

    [94mconst[39m [37mreq[39m [93m=[39m [37mhttp[39m[32m.[39m[37mrequest[39m[90m([39m[33m{[39m
      [37mhost[39m[93m:[39m [92m'127.0.0.1'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m8080[39m[32m,[39m
      [37mmethod[39m[93m:[39m [92m'POST'[39m
    [33m}[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[93m![39m[37mres[39m[32m.[39m[37mcomplete[39m[90m)[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m
            [92m'The connection was terminated while the message was still being sent'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mmessage.destroy([error])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merror[39m {Error}[0m

[0mCalls [33mdestroy()[39m on the socket that received the [33mIncomingMessage[39m. If [33merror[39m[0m
[0mis provided, an [33m'error'[39m event is emitted on the socket and [33merror[39m is passed[0m
[0mas an argument to any listeners on the event.[0m

[32m[1m### [33mmessage.headers[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.5[39m
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

[0mDuplicates in raw headers are handled in the following ways, depending on the[0m
[0mheader name:[0m

    * [0mDuplicates of [33mage[39m, [33mauthorization[39m, [33mcontent-length[39m, [33mcontent-type[39m,[0m
      [0m[33metag[39m, [33mexpires[39m, [33mfrom[39m, [33mhost[39m, [33mif-modified-since[39m, [33mif-unmodified-since[39m,[0m
      [0m[33mlast-modified[39m, [33mlocation[39m, [33mmax-forwards[39m, [33mproxy-authorization[39m, [33mreferer[39m,[0m
      [0m[33mretry-after[39m, [33mserver[39m, or [33muser-agent[39m are discarded.[0m
    * [0m[33mset-cookie[39m is always an array. Duplicates are added to the array.[0m
    * [0mFor duplicate [33mcookie[39m headers, the values are joined together with '; '.[0m
    * [0mFor all other headers, the values are joined together with ', '.[0m

[32m[1m### [33mmessage.httpVersion[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mIn case of server request, the HTTP version sent by the client. In the case of[0m
[0mclient response, the HTTP version of the connected-to server.[0m
[0mProbably either [33m'1.1'[39m or [33m'1.0'[39m.[0m

[0mAlso [33mmessage.httpVersionMajor[39m is the first integer and[0m
[0m[33mmessage.httpVersionMinor[39m is the second.[0m

[32m[1m### [33mmessage.method[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0m[1mOnly valid for request obtained from [[33mhttp.Server[39m][].[22m[0m

[0mThe request method as a string. Read only. Examples: [33m'GET'[39m, [33m'DELETE'[39m.[0m

[32m[1m### [33mmessage.rawHeaders[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.6[39m
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

[32m[1m### [33mmessage.rawTrailers[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]}[0m

[0mThe raw request/response trailer keys and values exactly as they were[0m
[0mreceived. Only populated at the [33m'end'[39m event.[0m

[32m[1m### [33mmessage.setTimeout(msecs[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {http.IncomingMessage}[0m

[0mCalls [33mmessage.connection.setTimeout(msecs, callback)[39m.[0m

[32m[1m### [33mmessage.socket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{stream.Duplex}[0m

[0mThe [[33mnet.Socket[39m][] object associated with the connection.[0m

[0mWith HTTPS support, use [[33mrequest.socket.getPeerCertificate()[39m][] to obtain the[0m
[0mclient's authentication details.[0m

[0mThis property is guaranteed to be an instance of the {net.Socket} class,[0m
[0ma subclass of {stream.Duplex}, unless the user specified a socket[0m
[0mtype other than {net.Socket}.[0m

[32m[1m### [33mmessage.statusCode[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0m[1mOnly valid for response obtained from [[33mhttp.ClientRequest[39m][].[22m[0m

[0mThe 3-digit HTTP response status code. E.G. [33m404[39m.[0m

[32m[1m### [33mmessage.statusMessage[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0m[1mOnly valid for response obtained from [[33mhttp.ClientRequest[39m][].[22m[0m

[0mThe HTTP response status message (reason phrase). E.G. [33mOK[39m or [33mInternal Server[39m[0m
[0m[33mError[39m.[0m

[32m[1m### [33mmessage.trailers[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe request/response trailers object. Only populated at the [33m'end'[39m event.[0m

[32m[1m### [33mmessage.url[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0m[1mOnly valid for request obtained from [[33mhttp.Server[39m][].[22m[0m

[0mRequest URL string. This contains only the URL that is[0m
[0mpresent in the actual HTTP request. If the request is:[0m

    [33mGET /status?name=ryan HTTP/1.1\r\n[39m
    [33mAccept: text/plain\r\n[39m
    [33m\r\n[39m

[0mTo parse the URL into its parts:[0m

    [31mnew[39m [37mURL[39m[90m([39m[37mrequest[39m[32m.[39m[37murl[39m[32m,[39m `http://${[37mrequest[39m[32m.[39m[37mheaders[39m[32m.[39m[37mhost[39m}`[90m)[39m[90m;[39m

[0mWhen [33mrequest.url[39m is [33m'/status?name=ryan'[39m and[0m
[0m[33mrequest.headers.host[39m is [33m'localhost:3000'[39m:[0m

    [33m$ node[39m
    [33m> new URL(request.url, `http://${request.headers.host}`)[39m
    [33mURL {[39m
    [33m  href: 'http://localhost:3000/status?name=ryan',[39m
    [33m  origin: 'http://localhost:3000',[39m
    [33m  protocol: 'http:',[39m
    [33m  username: '',[39m
    [33m  password: '',[39m
    [33m  host: 'localhost:3000',[39m
    [33m  hostname: 'localhost',[39m
    [33m  port: '3000',[39m
    [33m  pathname: '/status',[39m
    [33m  search: '?name=ryan',[39m
    [33m  searchParams: URLSearchParams { 'name' => 'ryan' },[39m
    [33m  hash: ''[39m
    [33m}[39m

[32m[1m## [33mhttp.METHODS[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]}[0m

[0mA list of the HTTP methods that are supported by the parser.[0m

[32m[1m## [33mhttp.STATUS_CODES[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.22[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mA collection of all the standard HTTP response status codes, and the[0m
[0mshort description of each. For example, [33mhttp.STATUS_CODES[404] === 'Not[39m[0m
[0m[33mFound'[39m.[0m

[32m[1m## [33mhttp.createServer([options][, requestListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.13[39m
[90mchanges:[39m
[90m  - version: v13.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31448[39m
[90m    description: The `insecureHTTPParser` option is supported now.[39m
[90m  - version: v13.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30570[39m
[90m    description: The `maxHeaderSize` option is supported now.[39m
[90m  - version: v9.6.0, v8.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15752[39m
[90m    description: The `options` argument is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[0m[0m[33moptions[39m {Object}[0m[0m[0m
      [0m[0m
      [0m
        * [0m[0m[33mIncomingMessage[39m {http.IncomingMessage} Specifies the [33mIncomingMessage[39m[0m[0m[0m
      [0m      [0m[0mclass to be used. Useful for extending the original [33mIncomingMessage[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mIncomingMessage[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mServerResponse[39m {http.ServerResponse} Specifies the [33mServerResponse[39m class[0m[0m[0m
      [0m      [0m[0mto be used. Useful for extending the original [33mServerResponse[39m. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mServerResponse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33minsecureHTTPParser[39m {boolean} Use an insecure HTTP parser that accepts[0m[0m[0m
      [0m      [0m[0minvalid HTTP headers when [33mtrue[39m. Using the insecure parser should be[0m[0m[0m
      [0m      [0m[0mavoided. See [[33m--insecure-http-parser[39m][] for more information.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmaxHeaderSize[39m {number} Optionally overrides the value of[0m[0m[0m
      [0m      [0m[0m[[33m--max-http-header-size[39m][] for requests received by this server, i.e.[0m[0m[0m
      [0m      [0m[0mthe maximum length of request headers in bytes.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m 16384 (16KB).[0m[0m[0m
    * [0m[0m[0m[33mrequestListener[39m {Function}[0m[0m[0m
    * [0m[0m[0mReturns: {http.Server}[0m[0m[0m

[0mReturns a new instance of [[33mhttp.Server[39m][].[0m

[0mThe [33mrequestListener[39m is a function which is automatically[0m
[0madded to the [[33m'request'[39m][] event.[0m

[32m[1m## [33mhttp.get(options[, callback])[39m[32m[22m[39m

[32m[1m## [33mhttp.get(url[, options][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.6[39m
[90mchanges:[39m
[90m  - version: v10.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21616[39m
[90m    description: The `url` parameter can now be passed along with a separate[39m
[90m                 `options` object.[39m
[90m  - version: v7.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10638[39m
[90m    description: The `options` parameter can be a WHATWG `URL` object.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33murl[39m {string | URL}[0m
    * [0m[33moptions[39m {Object} Accepts the same [33moptions[39m as[0m
      [0m[[33mhttp.request()[39m][], with the [33mmethod[39m always set to [33mGET[39m.[0m
      [0mProperties that are inherited from the prototype are ignored.[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {http.ClientRequest}[0m

[0mSince most requests are GET requests without bodies, Node.js provides this[0m
[0mconvenience method. The only difference between this method and[0m
[0m[[33mhttp.request()[39m][] is that it sets the method to GET and calls [33mreq.end()[39m[0m
[0mautomatically. The callback must take care to consume the response[0m
[0mdata for reasons stated in [[33mhttp.ClientRequest[39m][] section.[0m

[0mThe [33mcallback[39m is invoked with a single argument that is an instance of[0m
[0m[[33mhttp.IncomingMessage[39m][].[0m

[0mJSON fetching example:[0m

    [37mhttp[39m[32m.[39m[37mget[39m[90m([39m[92m'http://nodejs.org/dist/index.json'[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [33m{[39m [37mstatusCode[39m [33m}[39m [93m=[39m [37mres[39m[90m;[39m
      [94mconst[39m [37mcontentType[39m [93m=[39m [37mres[39m[32m.[39m[37mheaders[39m[33m[[39m[92m'content-type'[39m[33m][39m[90m;[39m
    
      [94mlet[39m [91merror[39m[90m;[39m
      [94mif[39m [90m([39m[37mstatusCode[39m [93m!==[39m [34m200[39m[90m)[39m [33m{[39m
        [91merror[39m [93m=[39m [31mnew[39m [37mError[39m[90m([39m[92m'Request Failed.\n'[39m [93m+[39m
                          `Status Code: ${[37mstatusCode[39m}`[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [94mif[39m [90m([39m[93m![39m/^application\/json/[32m.[39m[37mtest[39m[90m([39m[37mcontentType[39m[90m)[39m[90m)[39m [33m{[39m
        [91merror[39m [93m=[39m [31mnew[39m [37mError[39m[90m([39m[92m'Invalid content-type.\n'[39m [93m+[39m
                          `Expected application/json but received ${[37mcontentType[39m}`[90m)[39m[90m;[39m
      [33m}[39m
      [94mif[39m [90m([39m[91merror[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[91merror[39m[32m.[39m[37mmessage[39m[90m)[39m[90m;[39m
        [90m// Consume response data to free up memory[39m
        [37mres[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
    
      [37mres[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
      [94mlet[39m [37mrawData[39m [93m=[39m [92m''[39m[90m;[39m
      [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m [37mrawData[39m [93m+=[39m [37mchunk[39m[90m;[39m [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [36mtry[39m [33m{[39m
          [94mconst[39m [37mparsedData[39m [93m=[39m [37mJSON[39m[32m.[39m[37mparse[39m[90m([39m[37mrawData[39m[90m)[39m[90m;[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparsedData[39m[90m)[39m[90m;[39m
        [33m}[39m [36mcatch[39m [90m([39m[37me[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37me[39m[32m.[39m[37mmessage[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37me[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`Got error: ${[37me[39m[32m.[39m[37mmessage[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mhttp.globalAgent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{http.Agent}[0m

[0mGlobal instance of [33mAgent[39m which is used as the default for all HTTP client[0m
[0mrequests.[0m

[32m[1m## [33mhttp.maxHeaderSize[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mRead-only property specifying the maximum allowed size of HTTP headers in bytes.[0m
[0mDefaults to 8KB. Configurable using the [[33m--max-http-header-size[39m][] CLI option.[0m

[0mThis can be overridden for servers and client requests by passing the[0m
[0m[33mmaxHeaderSize[39m option.[0m

[32m[1m## [33mhttp.request(options[, callback])[39m[32m[22m[39m

[32m[1m## [33mhttp.request(url[, options][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.6[39m
[90mchanges:[39m
[90m  - version: v13.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31448[39m
[90m    description: The `insecureHTTPParser` option is supported now.[39m
[90m  - version: v13.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30570[39m
[90m    description: The `maxHeaderSize` option is supported now.[39m
[90m  - version: v10.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21616[39m
[90m    description: The `url` parameter can now be passed along with a separate[39m
[90m                 `options` object.[39m
[90m  - version: v7.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10638[39m
[90m    description: The `options` parameter can be a WHATWG `URL` object.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33murl[39m {string | URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33magent[39m {http.Agent | boolean} Controls [[33mAgent[39m][] behavior. Possible[0m[0m[0m
      [0m      [0m[0mvalues:[0m
      [0m
            * [0m[0m[0m[0m[33mundefined[39m (default): use [[33mhttp.globalAgent[39m][] for this host and port.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mAgent[39m object: explicitly use the passed in [33mAgent[39m.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0m[33mfalse[39m: causes a new [33mAgent[39m with default values to be used.[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[33mauth[39m {string} Basic authentication i.e. [33m'user:password'[39m to compute an[0m[0m[0m
      [0m      [0m[0mAuthorization header.[0m[0m[0m
      [0m
        * [0m[0m[33mcreateConnection[39m {Function} A function that produces a socket/stream to[0m[0m[0m
      [0m      [0m[0muse for the request when the [33magent[39m option is not used. This can be used to[0m[0m[0m
      [0m      [0m[0mavoid creating a custom [33mAgent[39m class just to override the default[0m[0m[0m
      [0m      [0m[0m[33mcreateConnection[39m function. See [[33magent.createConnection()[39m][] for more[0m[0m[0m
      [0m      [0m[0mdetails. Any [[33mDuplex[39m][] stream is a valid return value.[0m[0m[0m
      [0m
        * [0m[0m[33mdefaultPort[39m {number} Default port for the protocol. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33magent.defaultPort[39m if an [33mAgent[39m is used, else [33mundefined[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mfamily[39m {number} IP address family to use when resolving [33mhost[39m or[0m[0m[0m
      [0m      [0m[0m[33mhostname[39m. Valid values are [33m4[39m or [33m6[39m. When unspecified, both IP v4 and[0m[0m[0m
      [0m      [0m[0mv6 will be used.[0m[0m[0m
      [0m
        * [0m[0m[33mheaders[39m {Object} An object containing request headers.[0m[0m[0m
      [0m
        * [0m[0m[33mhost[39m {string} A domain name or IP address of the server to issue the[0m[0m[0m
      [0m      [0m[0mrequest to. [1mDefault:[22m [33m'localhost'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mhostname[39m {string} Alias for [33mhost[39m. To support [[33murl.parse()[39m][],[0m[0m[0m
      [0m      [0m[0m[33mhostname[39m will be used if both [33mhost[39m and [33mhostname[39m are specified.[0m[0m[0m
      [0m
        * [0m[0m[33minsecureHTTPParser[39m {boolean} Use an insecure HTTP parser that accepts[0m[0m[0m
      [0m      [0m[0minvalid HTTP headers when [33mtrue[39m. Using the insecure parser should be[0m[0m[0m
      [0m      [0m[0mavoided. See [[33m--insecure-http-parser[39m][] for more information.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m[0m[0m[0m
      [0m
        * [0m[0m[33mlocalAddress[39m {string} Local interface to bind for network connections.[0m[0m[0m
      [0m
        * [0m[0m[33mlookup[39m {Function} Custom lookup function. [1mDefault:[22m [[33mdns.lookup()[39m][].[0m[0m[0m
      [0m
        * [0m[0m[33mmaxHeaderSize[39m {number} Optionally overrides the value of[0m[0m[0m
      [0m      [0m[0m[[33m--max-http-header-size[39m][] for requests received from the server, i.e.[0m[0m[0m
      [0m      [0m[0mthe maximum length of response headers in bytes.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m 16384 (16KB).[0m[0m[0m
      [0m
        * [0m[0m[33mmethod[39m {string} A string specifying the HTTP request method. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m'GET'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mpath[39m {string} Request path. Should include query string if any.[0m[0m[0m
      [0m      [0m[0mE.G. [33m'/index.html?page=12'[39m. An exception is thrown when the request path[0m[0m[0m
      [0m      [0m[0mcontains illegal characters. Currently, only spaces are rejected but that[0m[0m[0m
      [0m      [0m[0mmay change in the future. [1mDefault:[22m [33m'/'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mport[39m {number} Port of remote server. [1mDefault:[22m [33mdefaultPort[39m if set,[0m[0m[0m
      [0m      [0m[0melse [33m80[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mprotocol[39m {string} Protocol to use. [1mDefault:[22m [33m'http:'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msetHost[39m {boolean}: Specifies whether or not to automatically add the[0m[0m[0m
      [0m      [0m[0m[33mHost[39m header. Defaults to [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msocketPath[39m {string} Unix Domain Socket (cannot be used if one of [33mhost[39m[0m[0m[0m
      [0m      [0m[0m or [33mport[39m is specified, those specify a TCP Socket).[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {number}: A number specifying the socket timeout in milliseconds.[0m[0m[0m
      [0m      [0m[0mThis will set the timeout before the socket is connected.[0m[0m[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {http.ClientRequest}[0m

[0mNode.js maintains several connections per server to make HTTP requests.[0m
[0mThis function allows one to transpa[0m

[0mrently issue requests.[0m

[0m[33murl[39m can be a string or a [34m[33mURL[39m[34m ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m object. If [33murl[39m is a[0m
[0mstring, it is automatically parsed with [34m[33mnew URL()[39m[34m ([34m[4murl.html#url_constructor_new_url_input_base[24m[39m[34m)[39m. If it is a [34m[33mURL[39m[34m ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m[0m
[0mobject, it will be automatically converted to an ordinary [33moptions[39m object.[0m

[0mIf both [33murl[39m and [33moptions[39m are specified, the objects are merged, with the[0m
[0m[33moptions[39m properties taking precedence.[0m

[0mThe optional [33mcallback[39m parameter will be added as a one-time listener for[0m
[0mthe [34m[33m'response'[39m[34m ([34m[4m#http_event_response[24m[39m[34m)[39m event.[0m

[0m[33mhttp.request()[39m returns an instance of the [34m[33mhttp.ClientRequest[39m[34m ([34m[4m#http_class_http_clientrequest[24m[39m[34m)[39m[0m
[0mclass. The [33mClientRequest[39m instance is a writable stream. If one needs to[0m
[0mupload a file with a POST request, then write to the [33mClientRequest[39m object.[0m

    [94mconst[39m [37mpostData[39m [93m=[39m [37mquerystring[39m[32m.[39m[37mstringify[39m[90m([39m[33m{[39m
      [32m'msg'[39m[93m:[39m [92m'Hello World!'[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mhostname[39m[93m:[39m [92m'www.google.com'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m80[39m[32m,[39m
      [37mpath[39m[93m:[39m [92m'/upload'[39m[32m,[39m
      [37mmethod[39m[93m:[39m [92m'POST'[39m[32m,[39m
      [37mheaders[39m[93m:[39m [33m{[39m
        [32m'Content-Type'[39m[93m:[39m [92m'application/x-www-form-urlencoded'[39m[32m,[39m
        [32m'Content-Length'[39m[93m:[39m [37mBuffer[39m[32m.[39m[37mbyteLength[39m[90m([39m[37mpostData[39m[90m)[39m
      [33m}[39m
    [33m}[39m[90m;[39m
    
    [94mconst[39m [37mreq[39m [93m=[39m [37mhttp[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`STATUS: ${[37mres[39m[32m.[39m[37mstatusCode[39m}`[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`HEADERS: ${[37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37mres[39m[32m.[39m[37mheaders[39m[90m)[39m}`[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`BODY: ${[37mchunk[39m}`[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'No more data in response.'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37me[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`problem with request: ${[37me[39m[32m.[39m[37mmessage[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Write data to request body[39m
    [37mreq[39m[32m.[39m[37mwrite[39m[90m([39m[37mpostData[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m

[0mIn the example [33mreq.end()[39m was called. With [33mhttp.request()[39m one[0m
[0mmust always call [33mreq.end()[39m to signify the end of the request -[0m
[0meven if there is no data being written to the request body.[0m

[0mIf any error is encountered during the request (be that with DNS resolution,[0m
[0mTCP level errors, or actual HTTP parse errors) an [33m'error'[39m event is emitted[0m
[0mon the returned request object. As with all [33m'error'[39m events, if no listeners[0m
[0mare registered the error will be thrown.[0m

[0mThere are a few special headers that should be noted.[0m

    * [0m[0m[0mSending a 'Connection: keep-alive' will notify Node.js that the connection to[0m[0m[0m
      [0m[0m[0mthe server should be persisted until the next request.[0m[0m[0m
    * [0m[0m[0mSending a 'Content-Length' header will disable the default chunked encoding.[0m[0m[0m
    * [0m[0m[0mSending an 'Expect' header will immediately send the request headers.[0m[0m[0m
      [0m[0m[0mUsually, when sending 'Expect: 100-continue', both a timeout and a listener[0m[0m[0m
      [0m[0m[0mfor the [33m'continue'[39m event should be set. See RFC 2616 Section 8.2.3 for more[0m[0m[0m
      [0m[0m[0minformation.[0m[0m[0m
    * [0m[0m[0mSending an Authorization header will override using the [33mauth[39m option[0m[0m[0m
      [0m[0m[0mto compute basic authentication.[0m[0m[0m

[0mExample using a [34m[33mURL[39m[34m ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m as [33moptions[39m:[0m

    [94mconst[39m [37moptions[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'http://abc:xyz@example.com'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mreq[39m [93m=[39m [37mhttp[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIn a successful request, the following events will be emitted in the following[0m
[0morder:[0m

    * [0m[33m'socket'[39m[0m
    * [0m[33m'response'[39m
        * [0m[0m[33m'data'[39m any number of times, on the [33mres[39m object[0m[0m[0m
      [0m      [0m[0m([33m'data'[39m will not be emitted at all if the response body is empty, for[0m[0m[0m
      [0m      [0m[0minstance, in most redirects)[0m[0m[0m
      [0m
        * [0m[0m[33m'end'[39m on the [33mres[39m object[0m[0m[0m
    * [0m[33m'close'[39m[0m

[0mIn the case of a connection error, the following events will be emitted:[0m

    * [0m[33m'socket'[39m[0m
    * [0m[33m'error'[39m[0m
    * [0m[33m'close'[39m[0m

[0mIn the case of a premature connection close before the response is received,[0m
[0mthe following events will be emitted in the following order:[0m

    * [0m[33m'socket'[39m[0m
    * [0m[33m'error'[39m with an error with message [33m'Error: socket hang up'[39m and code[0m
      [0m[33m'ECONNRESET'[39m[0m
    * [0m[33m'close'[39m[0m

[0mIn the case of a premature connection close after the response is received,[0m
[0mthe following events will be emitted in the following order:[0m

    * [0m[33m'socket'[39m[0m
    * [0m[33m'response'[39m
        * [0m[0m[33m'data'[39m any number of times, on the [33mres[39m object[0m[0m[0m
    * [0m(connection closed here)[0m
    * [0m[33m'aborted'[39m on the [33mres[39m object[0m
    * [0m[33m'close'[39m[0m
    * [0m[33m'close'[39m on the [33mres[39m object[0m

[0mIf [33mreq.abort()[39m is called before the connection succeeds, the following events[0m
[0mwill be emitted in the following order:[0m

    * [0m[33m'socket'[39m[0m
    * [0m([33mreq.abort()[39m called here)[0m
    * [0m[33m'abort'[39m[0m
    * [0m[33m'error'[39m with an error with message [33m'Error: socket hang up'[39m and code[0m
      [0m[33m'ECONNRESET'[39m[0m
    * [0m[33m'close'[39m[0m

[0mIf [33mreq.abort()[39m is called after the response is received, the following events[0m
[0mwill be emitted in the following order:[0m

    * [0m[33m'socket'[39m[0m
    * [0m[33m'response'[39m
        * [0m[0m[33m'data'[39m any number of times, on the [33mres[39m object[0m[0m[0m
    * [0m([33mreq.abort()[39m called here)[0m
    * [0m[33m'abort'[39m[0m
    * [0m[33m'aborted'[39m on the [33mres[39m object[0m
    * [0m[33m'close'[39m[0m
    * [0m[33m'close'[39m on the [33mres[39m object[0m

[0mSetting the [33mtimeout[39m option or using the [33msetTimeout()[39m function will[0m
[0mnot abort the request or do anything besides add a [33m'timeout'[39m event.[0m

