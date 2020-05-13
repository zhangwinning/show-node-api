[35m[4m[1m# UDP/Datagram Sockets[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[90m<!-- name=dgram -->[39m
[90m[39m
[90m[39m[0mThe [33mdgram[39m module provides an implementation of UDP Datagram sockets.[0m

    [94mconst[39m [37mdgram[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dgram'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mdgram[39m[32m.[39m[37mcreateSocket[39m[90m([39m[92m'udp4'[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`server error:\n${[37merr[39m[32m.[39m[37mstack[39m}`[90m)[39m[90m;[39m
      [37mserver[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmsg[39m[32m,[39m [37mrinfo[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`server got: ${[37mmsg[39m} from ${[37mrinfo[39m[32m.[39m[37maddress[39m}:${[37mrinfo[39m[32m.[39m[37mport[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'listening'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37maddress[39m [93m=[39m [37mserver[39m[32m.[39m[37maddress[39m[90m([39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`server listening ${[37maddress[39m[32m.[39m[37maddress[39m}:${[37maddress[39m[32m.[39m[37mport[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mbind[39m[90m([39m[34m41234[39m[90m)[39m[90m;[39m
    [90m// Prints: server listening 0.0.0.0:41234[39m

[32m[1m## Class: [33mdgram.Socket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {EventEmitter}[0m

[0mEncapsulates the datagram functionality.[0m

[0mNew instances of [33mdgram.Socket[39m are created using [34m[33mdgram.createSocket()[39m[34m ([34m[4m#dgram_dgram_createsocket_options_callback[24m[39m[34m)[39m.[0m
[0mThe [33mnew[39m keyword is not to be used to create [33mdgram.Socket[39m instances.[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'close'[39m event is emitted after a socket is closed with [34m[33mclose()[39m[34m ([34m[4m#dgram_socket_close_callback[24m[39m[34m)[39m.[0m
[0mOnce triggered, no new [33m'message'[39m events will be emitted on this socket.[0m

[32m[1m### Event: [33m'connect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'connect'[39m event is emitted after a socket is associated to a remote[0m
[0maddress as a result of a successful [34m[33mconnect()[39m[34m ([34m[4m#dgram_socket_connect_port_address_callback[24m[39m[34m)[39m call.[0m

[32m[1m### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mexception[39m {Error}[0m

[0mThe [33m'error'[39m event is emitted whenever any error occurs. The event handler[0m
[0mfunction is passed a single [33mError[39m object.[0m

[32m[1m### Event: [33m'listening'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'listening'[39m event is emitted once the [33mdgram.Socket[39m is addressable and[0m
[0mcan receive data. This happens either explicitly with [33msocket.bind()[39m or[0m
[0mimplicitly the first time data is sent using [33msocket.send()[39m.[0m
[0mUntil the [33mdgram.Socket[39m is listening, the underlying system resources do not[0m
[0mexist and calls such as [33msocket.address()[39m and [33msocket.setTTL()[39m will fail.[0m

[32m[1m### Event: [33m'message'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'message'[39m event is emitted when a new datagram is available on a socket.[0m
[0mThe event handler function is passed two arguments: [33mmsg[39m and [33mrinfo[39m.[0m

    * [0m[33mmsg[39m {Buffer} The message.[0m
    * [0m[33mrinfo[39m {Object} Remote address information.
        * [0m[0m[33maddress[39m {string} The sender address.[0m[0m[0m
      [0m
        * [0m[0m[33mfamily[39m {string} The address family ([33m'IPv4'[39m or [33m'IPv6'[39m).[0m[0m[0m
      [0m
        * [0m[0m[33mport[39m {number} The sender port.[0m[0m[0m
      [0m
        * [0m[0m[33msize[39m {number} The message size.[0m[0m[0m

[32m[1m### [33msocket.addMembership(multicastAddress[, multicastInterface])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmulticastAddress[39m {string}[0m
    * [0m[33mmulticastInterface[39m {string}[0m

[0mTells the kernel to join a multicast group at the given [33mmulticastAddress[39m and[0m
[0m[33mmulticastInterface[39m using the [33mIP_ADD_MEMBERSHIP[39m socket option. If the[0m
[0m[33mmulticastInterface[39m argument is not specified, the operating system will choose[0m
[0mone interface and will add membership to it. To add membership to every[0m
[0mavailable interface, call [33maddMembership[39m multiple times, once per interface.[0m

[0mWhen sharing a UDP socket across multiple [33mcluster[39m workers, the[0m
[0m[33msocket.addMembership()[39m function must be called only once or an[0m
[0m[33mEADDRINUSE[39m error will occur:[0m

    [94mconst[39m [37mcluster[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/cluster'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mdgram[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dgram'[39m[90m)[39m[90m;[39m
    [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misMaster[39m[90m)[39m [33m{[39m
      [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m [90m// Works ok.[39m
      [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m [90m// Fails with EADDRINUSE.[39m
    [33m}[39m [94melse[39m [33m{[39m
      [94mconst[39m [37ms[39m [93m=[39m [37mdgram[39m[32m.[39m[37mcreateSocket[39m[90m([39m[92m'udp4'[39m[90m)[39m[90m;[39m
      [37ms[39m[32m.[39m[37mbind[39m[90m([39m[34m1234[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37ms[39m[32m.[39m[37maddMembership[39m[90m([39m[92m'224.0.0.114'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m### [33msocket.addSourceSpecificMembership(sourceAddress, groupAddress[, multicastInterface])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.1.0[39m
[90m-->[39m
[90m[39m    * [0m[33msourceAddress[39m {string}[0m
    * [0m[33mgroupAddress[39m {string}[0m
    * [0m[33mmulticastInterface[39m {string}[0m

[0mTells the kernel to join a source-specific multicast channel at the given[0m
[0m[33msourceAddress[39m and [33mgroupAddress[39m, using the [33mmulticastInterface[39m with the[0m
[0m[33mIP_ADD_SOURCE_MEMBERSHIP[39m socket option. If the [33mmulticastInterface[39m argument[0m
[0mis not specified, the operating system will choose one interface and will add[0m
[0mmembership to it. To add membership to every available interface, call[0m
[0m[33msocket.addSourceSpecificMembership()[39m multiple times, once per interface.[0m

[32m[1m### [33msocket.address()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns an object containing the address information for a socket.[0m
[0mFor UDP sockets, this object will contain [33maddress[39m, [33mfamily[39m and [33mport[39m[0m
[0mproperties.[0m

[32m[1m### [33msocket.bind([port][, address][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90mchanges:[39m
[90m  - version: v0.10[39m
[90m    description: The method was changed to an asynchronous execution model.[39m
[90m                 Legacy code would need to be changed to pass a callback[39m
[90m                 function to the method call.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mport[39m {integer}[0m
    * [0m[33maddress[39m {string}[0m
    * [0m[33mcallback[39m {Function} with no parameters. Called when binding is complete.[0m

[0mFor UDP sockets, causes the [33mdgram.Socket[39m to listen for datagram[0m
[0mmessages on a named [33mport[39m and optional [33maddress[39m. If [33mport[39m is not[0m
[0mspecified or is [33m0[39m, the operating system will attempt to bind to a[0m
[0mrandom port. If [33maddress[39m is not specified, the operating system will[0m
[0mattempt to listen on all addresses. Once binding is complete, a[0m
[0m[33m'listening'[39m event is emitted and the optional [33mcallback[39m function is[0m
[0mcalled.[0m

[0mSpecifying both a [33m'listening'[39m event listener and passing a[0m
[0m[33mcallback[39m to the [33msocket.bind()[39m method is not harmful but not very[0m
[0museful.[0m

[0mA bound datagram socket keeps the Node.js process running to receive[0m
[0mdatagram messages.[0m

[0mIf binding fails, an [33m'error'[39m event is generated. In rare case (e.g.[0m
[0mattempting to bind with a closed socket), an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m may be thrown.[0m

[0mExample of a UDP server listening on port 41234:[0m

    [94mconst[39m [37mdgram[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dgram'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mdgram[39m[32m.[39m[37mcreateSocket[39m[90m([39m[92m'udp4'[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`server error:\n${[37merr[39m[32m.[39m[37mstack[39m}`[90m)[39m[90m;[39m
      [37mserver[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmsg[39m[32m,[39m [37mrinfo[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`server got: ${[37mmsg[39m} from ${[37mrinfo[39m[32m.[39m[37maddress[39m}:${[37mrinfo[39m[32m.[39m[37mport[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'listening'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37maddress[39m [93m=[39m [37mserver[39m[32m.[39m[37maddress[39m[90m([39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`server listening ${[37maddress[39m[32m.[39m[37maddress[39m}:${[37maddress[39m[32m.[39m[37mport[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mbind[39m[90m([39m[34m41234[39m[90m)[39m[90m;[39m
    [90m// Prints: server listening 0.0.0.0:41234[39m

[32m[1m### [33msocket.bind(options[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.14[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} Required. Supports the following properties:
        * [0m[0m[33mport[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33maddress[39m {string}[0m[0m[0m
      [0m
        * [0m[0m[33mexclusive[39m {boolean}[0m[0m[0m
      [0m
        * [0m[0m[33mfd[39m {integer}[0m[0m[0m
    * [0m[33mcallback[39m {Function}[0m

[0mFor UDP sockets, causes the [33mdgram.Socket[39m to listen for datagram[0m
[0mmessages on a named [33mport[39m and optional [33maddress[39m that are passed as[0m
[0mproperties of an [33moptions[39m object passed as the first argument. If[0m
[0m[33mport[39m is not specified or is [33m0[39m, the operating system will attempt[0m
[0mto bind to a random port. If [33maddress[39m is not specified, the operating[0m
[0msystem will attempt to listen on all addresses. Once binding is[0m
[0mcomplete, a [33m'listening'[39m event is emitted and the optional [33mcallback[39m[0m
[0mfunction is called.[0m

[0mThe [33moptions[39m object may contain a [33mfd[39m property. When a [33mfd[39m greater[0m
[0mthan [33m0[39m is set, it will wrap around an existing socket with the given[0m
[0mfile descriptor. In this case, the properties of [33mport[39m and [33maddress[39m[0m
[0mwill be ignored.[0m

[0mSpecifying both a [33m'listening'[39m event listener and passing a[0m
[0m[33mcallback[39m to the [33msocket.bind()[39m method is not harmful but not very[0m
[0museful.[0m

[0mThe [33moptions[39m object may contain an additional [33mexclusive[39m property that is[0m
[0mused when using [33mdgram.Socket[39m objects with the [34m[33mcluster[39m[34m ([34m[4mcluster.html[24m[39m[34m)[39m module. When[0m
[0m[33mexclusive[39m is set to [33mfalse[39m (the default), cluster workers will use the same[0m
[0munderlying socket handle allowing connection handling duties to be shared.[0m
[0mWhen [33mexclusive[39m is [33mtrue[39m, however, the handle is not shared and attempted[0m
[0mport sharing results in an error.[0m

[0mA bound datagram socket keeps the Node.js process running to receive[0m
[0mdatagram messages.[0m

[0mIf binding fails, an [33m'error'[39m event is generated. In rare case (e.g.[0m
[0mattempting to bind with a closed socket), an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m may be thrown.[0m

[0mAn example socket listening on an exclusive port is shown below.[0m

    [37msocket[39m[32m.[39m[37mbind[39m[90m([39m[33m{[39m
      [37maddress[39m[93m:[39m [92m'localhost'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m8000[39m[32m,[39m
      [37mexclusive[39m[93m:[39m [91mtrue[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33msocket.close([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} Called when the socket has been closed.[0m

[0mClose the underlying socket and stop listening for data on it. If a callback is[0m
[0mprovided, it is added as a listener for the [34m[33m'close'[39m[34m ([34m[4m#dgram_event_close[24m[39m[34m)[39m event.[0m

[32m[1m### [33msocket.connect(port[, address][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mport[39m {integer}[0m
    * [0m[33maddress[39m {string}[0m
    * [0m[33mcallback[39m {Function} Called when the connection is completed or on error.[0m

[0mAssociates the [33mdgram.Socket[39m to a remote address and port. Every[0m
[0mmessage sent by this handle is automatically sent to that destination. Also,[0m
[0mthe socket will only receive messages from that remote peer.[0m
[0mTrying to call [33mconnect()[39m on an already connected socket will result[0m
[0min an [34m[33mERR_SOCKET_DGRAM_IS_CONNECTED[39m[34m ([34m[4merrors.html#errors_err_socket_dgram_is_connected[24m[39m[34m)[39m exception. If [33maddress[39m is not[0m
[0mprovided, [33m'127.0.0.1'[39m (for [33mudp4[39m sockets) or [33m'::1'[39m (for [33mudp6[39m sockets)[0m
[0mwill be used by default. Once the connection is complete, a [33m'connect'[39m event[0m
[0mis emitted and the optional [33mcallback[39m function is called. In case of failure,[0m
[0mthe [33mcallback[39m is called or, failing this, an [33m'error'[39m event is emitted.[0m

[32m[1m### [33msocket.disconnect()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA synchronous function that disassociates a connected [33mdgram.Socket[39m from[0m
[0mits remote address. Trying to call [33mdisconnect()[39m on an already disconnected[0m
[0msocket will result in an [34m[33mERR_SOCKET_DGRAM_NOT_CONNECTED[39m[34m ([34m[4merrors.html#errors_err_socket_dgram_not_connected[24m[39m[34m)[39m exception.[0m

[32m[1m### [33msocket.dropMembership(multicastAddress[, multicastInterface])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmulticastAddress[39m {string}[0m
    * [0m[33mmulticastInterface[39m {string}[0m

[0mInstructs the kernel to leave a multicast group at [33mmulticastAddress[39m using the[0m
[0m[33mIP_DROP_MEMBERSHIP[39m socket option. This method is automatically called by the[0m
[0mkernel when the socket is closed or the process terminates, so most apps will[0m
[0mnever have reason to call this.[0m

[0mIf [33mmulticastInterface[39m is not specified, the operating system will attempt to[0m
[0mdrop membership on all valid interfaces.[0m

[32m[1m### [33msocket.dropSourceSpecificMembership(sourceAddress, groupAddress[, multicastInterface])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msourceAddress[39m {string}[0m
    * [0m[33mgroupAddress[39m {string}[0m
    * [0m[33mmulticastInterface[39m {string}[0m

[0mInstructs the kernel to leave a source-specific multicast channel at the given[0m
[0m[33msourceAddress[39m and [33mgroupAddress[39m using the [33mIP_DROP_SOURCE_MEMBERSHIP[39m[0m
[0msocket option. This method is automatically called by the kernel when the[0m
[0msocket is closed or the process terminates, so most apps will never have[0m
[0mreason to call this.[0m

[0mIf [33mmulticastInterface[39m is not specified, the operating system will attempt to[0m
[0mdrop membership on all valid interfaces.[0m

[32m[1m### [33msocket.getRecvBufferSize()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {number} the [33mSO_RCVBUF[39m socket receive buffer size in bytes.[0m

[32m[1m### [33msocket.getSendBufferSize()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {number} the [33mSO_SNDBUF[39m socket send buffer size in bytes.[0m

[32m[1m### [33msocket.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {dgram.Socket}[0m

[0mBy default, binding a socket will cause it to block the Node.js process from[0m
[0mexiting as long as the socket is open. The [33msocket.unref()[39m method can be used[0m
[0mto exclude the socket from the reference counting that keeps the Node.js[0m
[0mprocess active. The [33msocket.ref()[39m method adds the socket back to the reference[0m
[0mcounting and restores the default behavior.[0m

[0mCalling [33msocket.ref()[39m multiples times will have no additional effect.[0m

[0mThe [33msocket.ref()[39m method returns a reference to the socket so calls can be[0m
[0mchained.[0m

[32m[1m### [33msocket.remoteAddress()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns an object containing the [33maddress[39m, [33mfamily[39m, and [33mport[39m of the remote[0m
[0mendpoint. It throws an [34m[33mERR_SOCKET_DGRAM_NOT_CONNECTED[39m[34m ([34m[4merrors.html#errors_err_socket_dgram_not_connected[24m[39m[34m)[39m exception if the[0m
[0msocket is not connected.[0m

[32m[1m### [33msocket.send(msg[, offset, length][, port][, address][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11985[39m
[90m    description: The `msg` parameter can be an `Uint8Array` now.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10473[39m
[90m    description: The `address` parameter is always optional now.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5929[39m
[90m    description: On success, `callback` will now be called with an `error`[39m
[90m                 argument of `null` rather than `0`.[39m
[90m  - version: v5.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4374[39m
[90m    description: The `msg` parameter can be an array now. Also, the `offset`[39m
[90m                 and `length` parameters are optional now.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26871[39m
[90m    description: Added support for sending data on connected sockets.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsg[39m {Buffer|Uint8Array|string|Array} Message to be sent.[0m
    * [0m[33moffset[39m {integer} Offset in the buffer where the message starts.[0m
    * [0m[33mlength[39m {integer} Number of bytes in the message.[0m
    * [0m[33mport[39m {integer} Destination port.[0m
    * [0m[33maddress[39m {string} Destination host name or IP address.[0m
    * [0m[33mcallback[39m {Function} Called when the message has been sent.[0m

[0mBroadcasts a datagram on the socket.[0m
[0mFor connectionless sockets, the destination [33mport[39m and [33maddress[39m must be[0m
[0mspecified. Connected sockets, on the other hand, will use their associated[0m
[0mremote endpoint, so the [33mport[39m and [33maddress[39m arguments must not be set.[0m

[0mThe [33mmsg[39m argument contains the message to be sent.[0m
[0mDepending on its type, different behavior can apply. If [33mmsg[39m is a [33mBuffer[39m[0m
[0mor [33mUint8Array[39m,[0m
[0mthe [33moffset[39m and [33mlength[39m specify the offset within the [33mBuffer[39m where the[0m
[0mmessage begins and the number of bytes in the message, respectively.[0m
[0mIf [33mmsg[39m is a [33mString[39m, then it is automatically converted to a [33mBuffer[39m[0m
[0mwith [33m'utf8'[39m encoding. With messages that[0m
[0mcontain multi-byte characters, [33moffset[39m and [33mlength[39m will be calculated with[0m
[0mrespect to [34mbyte length ([34m[4mbuffer.html#buffer_class_method_buffer_bytelength_string_encoding[24m[39m[34m)[39m and not the character position.[0m
[0mIf [33mmsg[39m is an array, [33moffset[39m and [33mlength[39m must not be specified.[0m

[0mThe [33maddress[39m argument is a string. If the value of [33maddress[39m is a host name,[0m
[0mDNS will be used to resolve the address of the host. If [33maddress[39m is not[0m
[0mprovided or otherwise falsy, [33m'127.0.0.1'[39m (for [33mudp4[39m sockets) or [33m'::1'[39m[0m
[0m(for [33mudp6[39m sockets) will be used by default.[0m

[0mIf the socket has not been previously bound with a call to [33mbind[39m, the socket[0m
[0mis assigned a random port number and is bound to the "all interfaces" address[0m
[0m([33m'0.0.0.0'[39m for [33mudp4[39m sockets, [33m'::0'[39m for [33mudp6[39m sockets.)[0m

[0mAn optional [33mcallback[39m function may be specified to as a way of reporting[0m
[0mDNS errors or for determining when it is safe to reuse the [33mbuf[39m object.[0m
[0mDNS lookups delay the time to send for at least one tick of the[0m
[0mNode.js event loop.[0m

[0mThe only way to know for sure that the datagram has been sent is by using a[0m
[0m[33mcallback[39m. If an error occurs and a [33mcallback[39m is given, the error will be[0m
[0mpassed as the first argument to the [33mcallback[39m. If a [33mcallback[39m is not given,[0m
[0mthe error is emitted as an [33m'error'[39m event on the [33msocket[39m object.[0m

[0mOffset and length are optional but both [3mmust[23m be set if either are used.[0m
[0mThey are supported only when the first argument is a [33mBuffer[39m or [33mUint8Array[39m.[0m

[0mExample of sending a UDP packet to a port on [33mlocalhost[39m;[0m

    [94mconst[39m [37mdgram[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dgram'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmessage[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'Some bytes'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mdgram[39m[32m.[39m[37mcreateSocket[39m[90m([39m[92m'udp4'[39m[90m)[39m[90m;[39m
    [37mclient[39m[32m.[39m[37msend[39m[90m([39m[37mmessage[39m[32m,[39m [34m41234[39m[32m,[39m [92m'localhost'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mclient[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mExample of sending a UDP packet composed of multiple buffers to a port on[0m
[0m[33m127.0.0.1[39m;[0m

    [94mconst[39m [37mdgram[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dgram'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'Some '[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'bytes'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mdgram[39m[32m.[39m[37mcreateSocket[39m[90m([39m[92m'udp4'[39m[90m)[39m[90m;[39m
    [37mclient[39m[32m.[39m[37msend[39m[90m([39m[33m[[39m[37mbuf1[39m[32m,[39m [37mbuf2[39m[33m][39m[32m,[39m [34m41234[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mclient[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mSending multiple buffers might be faster or slower depending on the[0m
[0mapplication and operating system. Run benchmarks to[0m
[0mdetermine the optimal strategy on a case-by-case basis. Generally speaking,[0m
[0mhowever, sending multiple buffers is faster.[0m

[0mExample of sending a UDP packet using a socket connected to a port on[0m
[0m[33mlocalhost[39m:[0m

    [94mconst[39m [37mdgram[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dgram'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmessage[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'Some bytes'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mdgram[39m[32m.[39m[37mcreateSocket[39m[90m([39m[92m'udp4'[39m[90m)[39m[90m;[39m
    [37mclient[39m[32m.[39m[37mconnect[39m[90m([39m[34m41234[39m[32m,[39m [92m'localhost'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mclient[39m[32m.[39m[37msend[39m[90m([39m[37mmessage[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mclient[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Note about UDP datagram size[22m[39m

[0mThe maximum size of an [33mIPv4/v6[39m datagram depends on the [33mMTU[39m[0m
[0m([3mMaximum Transmission Unit[23m) and on the [33mPayload Length[39m field size.[0m

    * [0m[0m[0mThe [33mPayload Length[39m field is [33m16 bits[39m wide, which means that a normal[0m[0m[0m
      [0m[0m[0mpayload exceed 64K octets [3mincluding[23m the internet header and data[0m[0m[0m
      [0m[0m[0m(65,507 bytes = 65,535 − 8 bytes UDP header − 20 bytes IP header);[0m[0m[0m
      [0m[0m[0mthis is generally true for loopback interfaces, but such long datagram[0m[0m[0m
      [0m[0m[0mmessages are impractical for most hosts and networks.[0m[0m[0m
    * [0m[0m[0mThe [33mMTU[39m is the largest size a given link layer technology can support for[0m[0m[0m
      [0m[0m[0mdatagram messages. For any link, [33mIPv4[39m mandates a minimum [33mMTU[39m of [33m68[39m[0m[0m[0m
      [0m[0m[0moctets, while the recommended [33mMTU[39m for IPv4 is [33m576[39m (typically recommended[0m[0m[0m
      [0m[0m[0mas the [33mMTU[39m for dial-up type applications), whether they arrive whole or in[0m[0m[0m
      [0m[0m[0mfragments.[0m[0m[0m
      [0m[0m
      [0m[0m[0mFor [33mIPv6[39m, the minimum [33mMTU[39m is [33m1280[39m octets, however, the mandatory minimum[0m[0m[0m
      [0m[0m[0mfragment reassembly buffer size is [33m1500[39m octets. The value of [33m68[39m octets is[0m[0m[0m
      [0m[0m[0mvery small, since most current link layer technologies, like Ethernet, have a[0m[0m[0m
      [0m[0m[0mminimum [33mMTU[39m of [33m1500[39m.[0m[0m[0m

[0mIt is impossible to know in advance the MTU of each link through which[0m
[0ma packet might travel. Sending a datagram greater than the receiver [33mMTU[39m will[0m
[0mnot work because the packet will get silently dropped without informing the[0m
[0msource that the data did not reach its intended recipient.[0m

[32m[1m### [33msocket.setBroadcast(flag)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mflag[39m {boolean}[0m

[0mSets or clears the [33mSO_BROADCAST[39m socket option. When set to [33mtrue[39m, UDP[0m
[0mpackets may be sent to a local interface's broadcast address.[0m

[32m[1m### [33msocket.setMulticastInterface(multicastInterface)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmulticastInterface[39m {string}[0m

[0m[3mAll references to scope in this section are referring to[23m[0m
[0m[3m[34mIPv6 Zone Indices ([34m[4mhttps://en.wikipedia.org/wiki/IPv6_address#Scoped_literal_IPv6_addresses[24m[39m[34m)[39m, which are defined by [34mRFC 4007 ([34m[4mhttps://tools.ietf.org/html/rfc4007[24m[39m[34m)[39m. In string form, an IP[23m[0m
[0m[3mwith a scope index is written as [33m'IP%scope'[39m where scope is an interface name[23m[0m
[0m[3mor interface number.[23m[0m

[0mSets the default outgoing multicast interface of the socket to a chosen[0m
[0minterface or back to system interface selection. The [33mmulticastInterface[39m must[0m
[0mbe a valid string representation of an IP from the socket's family.[0m

[0mFor IPv4 sockets, this should be the IP configured for the desired physical[0m
[0minterface. All packets sent to multicast on the socket will be sent on the[0m
[0minterface determined by the most recent successful use of this call.[0m

[0mFor IPv6 sockets, [33mmulticastInterface[39m should include a scope to indicate the[0m
[0minterface as in the examples that follow. In IPv6, individual [33msend[39m calls can[0m
[0malso use explicit scope in addresses, so only packets sent to a multicast[0m
[0maddress without specifying an explicit scope are affected by the most recent[0m
[0msuccessful use of this call.[0m

[32m[1m#### Examples: IPv6 Outgoing Multicast Interface[22m[39m

[0mOn most systems, where scope format uses the interface name:[0m

    [94mconst[39m [37msocket[39m [93m=[39m [37mdgram[39m[32m.[39m[37mcreateSocket[39m[90m([39m[92m'udp6'[39m[90m)[39m[90m;[39m
    
    [37msocket[39m[32m.[39m[37mbind[39m[90m([39m[34m1234[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37msocket[39m[32m.[39m[37msetMulticastInterface[39m[90m([39m[92m'::%eth1'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOn Windows, where scope format uses an interface number:[0m

    [94mconst[39m [37msocket[39m [93m=[39m [37mdgram[39m[32m.[39m[37mcreateSocket[39m[90m([39m[92m'udp6'[39m[90m)[39m[90m;[39m
    
    [37msocket[39m[32m.[39m[37mbind[39m[90m([39m[34m1234[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37msocket[39m[32m.[39m[37msetMulticastInterface[39m[90m([39m[92m'::%2'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Example: IPv4 Outgoing Multicast Interface[22m[39m

[0mAll systems use an IP of the host on the desired physical interface:[0m

    [94mconst[39m [37msocket[39m [93m=[39m [37mdgram[39m[32m.[39m[37mcreateSocket[39m[90m([39m[92m'udp4'[39m[90m)[39m[90m;[39m
    
    [37msocket[39m[32m.[39m[37mbind[39m[90m([39m[34m1234[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37msocket[39m[32m.[39m[37msetMulticastInterface[39m[90m([39m[92m'10.0.0.2'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### Call Results[22m[39m

[0mA call on a socket that is not ready to send or no longer open may throw a [3mNot[23m[0m
[0m[3mrunning[23m [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m.[0m

[0mIf [33mmulticastInterface[39m can not be parsed into an IP then an [3mEINVAL[23m[0m
[0m[34m[33mSystem Error[39m[34m ([34m[4merrors.html#errors_class_systemerror[24m[39m[34m)[39m is thrown.[0m

[0mOn IPv4, if [33mmulticastInterface[39m is a valid address but does not match any[0m
[0minterface, or if the address does not match the family then[0m
[0ma [34m[33mSystem Error[39m[34m ([34m[4merrors.html#errors_class_systemerror[24m[39m[34m)[39m such as [33mEADDRNOTAVAIL[39m or [33mEPROTONOSUP[39m is thrown.[0m

[0mOn IPv6, most errors with specifying or omitting scope will result in the socket[0m
[0mcontinuing to use (or returning to) the system's default interface selection.[0m

[0mA socket's address family's ANY address (IPv4 [33m'0.0.0.0'[39m or IPv6 [33m'::'[39m) can be[0m
[0mused to return control of the sockets default outgoing interface to the system[0m
[0mfor future multicast packets.[0m

[32m[1m### [33msocket.setMulticastLoopback(flag)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mflag[39m {boolean}[0m

[0mSets or clears the [33mIP_MULTICAST_LOOP[39m socket option. When set to [33mtrue[39m,[0m
[0mmulticast packets will also be received on the local interface.[0m

[32m[1m### [33msocket.setMulticastTTL(ttl)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mttl[39m {integer}[0m

[0mSets the [33mIP_MULTICAST_TTL[39m socket option. While TTL generally stands for[0m
[0m"Time to Live", in this context it specifies the number of IP hops that a[0m
[0mpacket is allowed to travel through, specifically for multicast traffic. Each[0m
[0mrouter or gateway that forwards a packet decrements the TTL. If the TTL is[0m
[0mdecremented to 0 by a router, it will not be forwarded.[0m

[0mThe [33mttl[39m argument may be between 0 and 255. The default on most systems is [33m1[39m.[0m

[32m[1m### [33msocket.setRecvBufferSize(size)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msize[39m {integer}[0m

[0mSets the [33mSO_RCVBUF[39m socket option. Sets the maximum socket receive buffer[0m
[0min bytes.[0m

[32m[1m### [33msocket.setSendBufferSize(size)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msize[39m {integer}[0m

[0mSets the [33mSO_SNDBUF[39m socket option. Sets the maximum socket send buffer[0m
[0min bytes.[0m

[32m[1m### [33msocket.setTTL(ttl)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.101[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mttl[39m {integer}[0m

[0mSets the [33mIP_TTL[39m socket option. While TTL generally stands for "Time to Live",[0m
[0min this context it specifies the number of IP hops that a packet is allowed to[0m
[0mtravel through. Each router or gateway that forwards a packet decrements the[0m
[0mTTL. If the TTL is decremented to 0 by a router, it will not be forwarded.[0m
[0mChanging TTL values is typically done for network probes or when multicasting.[0m

[0mThe [33mttl[39m argument may be between between 1 and 255. The default on most systems[0m
[0mis 64.[0m

[32m[1m### [33msocket.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {dgram.Socket}[0m

[0mBy default, binding a socket will cause it to block the Node.js process from[0m
[0mexiting as long as the socket is open. The [33msocket.unref()[39m method can be used[0m
[0mto exclude the socket from the reference counting that keeps the Node.js[0m
[0mprocess active, allowing the process to exit even if the socket is still[0m
[0mlistening.[0m

[0mCalling [33msocket.unref()[39m multiple times will have no addition effect.[0m

[0mThe [33msocket.unref()[39m method returns a reference to the socket so calls can be[0m
[0mchained.[0m

[32m[1m## [33mdgram[39m[32m module functions[22m[39m

[32m[1m### [33mdgram.createSocket(options[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90mchanges:[39m
[90m  - version: v8.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14560[39m
[90m    description: The `lookup` option is supported.[39m
[90m  - version: v8.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13623[39m
[90m    description: The `recvBufferSize` and `sendBufferSize` options are[39m
[90m                 supported now.[39m
[90m  - version: v11.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23798[39m
[90m    description: The `ipv6Only` option is supported.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} Available options are:
        * [0m[0m[33mtype[39m {string} The family of socket. Must be either [33m'udp4'[39m or [33m'udp6'[39m.[0m[0m[0m
      [0m      [0m[0mRequired.[0m[0m[0m
      [0m
        * [0m[0m[33mreuseAddr[39m {boolean} When [33mtrue[39m [34m[33msocket.bind()[39m[34m ([34m[4m#dgram_socket_bind_port_address_callback[24m[39m[34m)[39m will reuse the[0m[0m[0m
      [0m      [0m[0maddress, even if another process has already bound a socket on it.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mipv6Only[39m {boolean} Setting [33mipv6Only[39m to [33mtrue[39m will[0m[0m[0m
      [0m      [0m[0mdisable dual-stack support, i.e., binding to address [33m::[39m won't make[0m[0m[0m
      [0m      [0m[0m[33m0.0.0.0[39m be bound. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mrecvBufferSize[39m {number} Sets the [33mSO_RCVBUF[39m socket value.[0m[0m[0m
      [0m
        * [0m[0m[33msendBufferSize[39m {number} Sets the [33mSO_SNDBUF[39m socket value.[0m[0m[0m
      [0m
        * [0m[0m[33mlookup[39m {Function} Custom lookup function. [1mDefault:[22m [34m[33mdns.lookup()[39m[34m ([34m[4mdns.html#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function} Attached as a listener for [33m'message'[39m events. Optional.[0m
    * [0mReturns: {dgram.Socket}[0m

[0mCreates a [33mdgram.Socket[39m object. Once the socket is created, calling[0m
[0m[34m[33msocket.bind()[39m[34m ([34m[4m#dgram_socket_bind_port_address_callback[24m[39m[34m)[39m will instruct the socket to begin listening for datagram[0m
[0mmessages. When [33maddress[39m and [33mport[39m are not passed to [34m[33msocket.bind()[39m[34m ([34m[4m#dgram_socket_bind_port_address_callback[24m[39m[34m)[39m the[0m
[0mmethod will bind the socket to the "all interfaces" address on a random port[0m
[0m(it does the right thing for both [33mudp4[39m and [33mudp6[39m sockets). The bound address[0m
[0mand port can be retrieved using [34m[33msocket.address().address[39m[34m ([34m[4m#dgram_socket_address[24m[39m[34m)[39m and[0m
[0m[34m[33msocket.address().port[39m[34m ([34m[4m#dgram_socket_address[24m[39m[34m)[39m.[0m

[32m[1m### [33mdgram.createSocket(type[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtype[39m {string} Either [33m'udp4'[39m or [33m'udp6'[39m.[0m
    * [0m[33mcallback[39m {Function} Attached as a listener to [33m'message'[39m events.[0m
    * [0mReturns: {dgram.Socket}[0m

[0mCreates a [33mdgram.Socket[39m object of the specified [33mtype[39m.[0m

[0mOnce the socket is created, calling [34m[33msocket.bind()[39m[34m ([34m[4m#dgram_socket_bind_port_address_callback[24m[39m[34m)[39m will instruct the[0m
[0msocket to begin listening for datagram messages. When [33maddress[39m and [33mport[39m are[0m
[0mnot passed to [34m[33msocket.bind()[39m[34m ([34m[4m#dgram_socket_bind_port_address_callback[24m[39m[34m)[39m the method will bind the socket to the "all[0m
[0minterfaces" address on a random port (it does the right thing for both [33mudp4[39m[0m
[0mand [33mudp6[39m sockets). The bound address and port can be retrieved using[0m
[0m[34m[33msocket.address().address[39m[34m ([34m[4m#dgram_socket_address[24m[39m[34m)[39m and [34m[33msocket.address().port[39m[34m ([34m[4m#dgram_socket_address[24m[39m[34m)[39m.[0m

