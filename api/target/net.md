[35m[4m[1m# Net[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m[90m<!--lint disable maximum-line-length-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mnet[39m module provides an asynchronous network API for creating stream-based[0m
[0mTCP or [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m servers ([34m[33mnet.createServer()[39m[34m ([34m[4m#net_net_createserver_options_connectionlistener[24m[39m[34m)[39m) and clients[0m
[0m([34m[33mnet.createConnection()[39m[34m ([34m[4m#net_net_createconnection[24m[39m[34m)[39m).[0m

[0mIt can be accessed using:[0m

    [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m

[32m[1m## IPC Support[22m[39m

[0mThe [33mnet[39m module supports IPC with named pipes on Windows, and Unix domain[0m
[0msockets on other operating systems.[0m

[32m[1m### Identifying paths for IPC connections[22m[39m

[0m[34m[33mnet.connect()[39m[34m ([34m[4m#net_net_connect[24m[39m[34m)[39m, [34m[33mnet.createConnection()[39m[34m ([34m[4m#net_net_createconnection[24m[39m[34m)[39m, [34m[33mserver.listen()[39m[34m ([34m[4m#net_server_listen[24m[39m[34m)[39m and[0m
[0m[34m[33msocket.connect()[39m[34m ([34m[4m#net_socket_connect[24m[39m[34m)[39m take a [33mpath[39m parameter to identify IPC endpoints.[0m

[0mOn Unix, the local domain is also known as the Unix domain. The path is a[0m
[0mfilesystem pathname. It gets truncated to an OS-dependent length of[0m
[0m[33msizeof(sockaddr_un.sun_path) - 1[39m. Typical values are 107 bytes on Linux and[0m
[0m103 bytes on macOS. If a Node.js API abstraction creates the Unix domain socket,[0m
[0mit will unlink the Unix domain socket as well. For example,[0m
[0m[34m[33mnet.createServer()[39m[34m ([34m[4m#net_net_createserver_options_connectionlistener[24m[39m[34m)[39m may create a Unix domain socket and[0m
[0m[34m[33mserver.close()[39m[34m ([34m[4m#net_server_close_callback[24m[39m[34m)[39m will unlink it. But if a user creates the Unix domain[0m
[0msocket outside of these abstractions, the user will need to remove it. The same[0m
[0mapplies when a Node.js API creates a Unix domain socket but the program then[0m
[0mcrashes. In short, a Unix domain socket will be visible in the filesystem and[0m
[0mwill persist until unlinked.[0m

[0mOn Windows, the local domain is implemented using a named pipe. The path [3mmust[23m[0m
[0mrefer to an entry in [33m\\?\pipe\[39m or [33m\\.\pipe\[39m. Any characters are permitted,[0m
[0mbut the latter may do some processing of pipe names, such as resolving [33m..[39m[0m
[0msequences. Despite how it might look, the pipe namespace is flat. Pipes will[0m
[0m[3mnot persist[23m. They are removed when the last reference to them is closed.[0m
[0mUnlike Unix domain sockets, Windows will close and remove the pipe when the[0m
[0mowning process exits.[0m

[0mJavaScript string escaping requires paths to be specified with extra backslash[0m
[0mescaping such as:[0m

    [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m
      [37mpath[39m[32m.[39m[37mjoin[39m[90m([39m[92m'\\\\?\\pipe'[39m[32m,[39m [37mprocess[39m[32m.[39m[37mcwd[39m[90m([39m[90m)[39m[32m,[39m [92m'myctl'[39m[90m)[39m[90m)[39m[90m;[39m

[32m[1m## Class: [33mnet.Server[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {EventEmitter}[0m

[0mThis class is used to create a TCP or [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m server.[0m

[32m[1m### [33mnew net.Server([options][, connectionListener])[39m[32m[22m[39m

    * [0m[33moptions[39m {Object} See[0m
      [0m[34m[33mnet.createServer([options][, connectionListener])[39m[34m ([34m[4m#net_net_createserver_options_connectionlistener[24m[39m[34m)[39m.[0m
    * [0m[33mconnectionListener[39m {Function} Automatically set as a listener for the[0m
      [0m[34m[33m'connection'[39m[34m ([34m[4m#net_event_connection[24m[39m[34m)[39m event.[0m
    * [0mReturns: {net.Server}[0m

[0m[33mnet.Server[39m is an [34m[33mEventEmitter[39m[34m ([34m[4mevents.html#events_class_eventemitter[24m[39m[34m)[39m with the following events:[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the server closes. If connections exist, this[0m
[0mevent is not emitted until all connections are ended.[0m

[32m[1m### Event: [33m'connection'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{net.Socket} The connection object[0m

[0mEmitted when a new connection is made. [33msocket[39m is an instance of[0m
[0m[33mnet.Socket[39m.[0m

[32m[1m### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Error}[0m

[0mEmitted when an error occurs. Unlike [34m[33mnet.Socket[39m[34m ([34m[4m#net_class_net_socket[24m[39m[34m)[39m, the [34m[33m'close'[39m[34m ([34m[4m#net_event_close[24m[39m[34m)[39m[0m
[0mevent will [1mnot[22m be emitted directly following this event unless[0m
[0m[34m[33mserver.close()[39m[34m ([34m[4m#net_server_close_callback[24m[39m[34m)[39m is manually called. See the example in discussion of[0m
[0m[34m[33mserver.listen()[39m[34m ([34m[4m#net_server_listen[24m[39m[34m)[39m.[0m

[32m[1m### Event: [33m'listening'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the server has been bound after calling [34m[33mserver.listen()[39m[34m ([34m[4m#net_server_listen[24m[39m[34m)[39m.[0m

[32m[1m### [33mserver.address()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object|string|null}[0m

[0mReturns the bound [33maddress[39m, the address [33mfamily[39m name, and [33mport[39m of the server[0m
[0mas reported by the operating system if listening on an IP socket[0m
[0m(useful to find which port was assigned when getting an OS-assigned address):[0m
[0m[33m{ port: 12346, family: 'IPv4', address: '127.0.0.1' }[39m.[0m

[0mFor a server listening on a pipe or Unix domain socket, the name is returned[0m
[0mas a string.[0m

    [94mconst[39m [37mserver[39m [93m=[39m [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [37msocket[39m[32m.[39m[37mend[39m[90m([39m[92m'goodbye\n'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Handle errors here.[39m
      [94mthrow[39m [37merr[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Grab an arbitrary unused port.[39m
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'opened server on'[39m[32m,[39m [37mserver[39m[32m.[39m[37maddress[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[33mserver.address()[39m returns [33mnull[39m before the [33m'listening'[39m event has been[0m
[0memitted or after calling [33mserver.close()[39m.[0m

[32m[1m### [33mserver.close([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} Called when the server is closed.[0m
    * [0mReturns: {net.Server}[0m

[0mStops the server from accepting new connections and keeps existing[0m
[0mconnections. This function is asynchronous, the server is finally closed[0m
[0mwhen all connections are ended and the server emits a [34m[33m'close'[39m[34m ([34m[4m#net_event_close[24m[39m[34m)[39m event.[0m
[0mThe optional [33mcallback[39m will be called once the [33m'close'[39m event occurs. Unlike[0m
[0mthat event, it will be called with an [33mError[39m as its only argument if the server[0m
[0mwas not open when it was closed.[0m

[32m[1m### [33mserver.connections[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.2.0[39m
[90mdeprecated: v0.9.7[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mserver.getConnections()[39m[90m[34m ([34m[4m#net_server_getconnections_callback[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m{integer|null}[0m

[0mThe number of concurrent connections on the server.[0m

[0mThis becomes [33mnull[39m when sending a socket to a child with[0m
[0m[34m[33mchild_process.fork()[39m[34m ([34m[4mchild_process.html#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m. To poll forks and get current number of active[0m
[0mconnections, use asynchronous [34m[33mserver.getConnections()[39m[34m ([34m[4m#net_server_getconnections_callback[24m[39m[34m)[39m instead.[0m

[32m[1m### [33mserver.getConnections(callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {net.Server}[0m

[0mAsynchronously get the number of concurrent connections on the server. Works[0m
[0mwhen sockets were sent to forks.[0m

[0mCallback should take two arguments [33merr[39m and [33mcount[39m.[0m

[32m[1m### [33mserver.listen()[39m[32m[22m[39m

[0mStart a server listening for connections. A [33mnet.Server[39m can be a TCP or[0m
[0man [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m server depending on what it listens to.[0m

[0mPossible signatures:[0m

    * [0m[34m[33mserver.listen(handle[, backlog][, callback])[39m[34m ([34m[4m#net_server_listen_handle_backlog_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mserver.listen(options[, callback])[39m[34m ([34m[4m#net_server_listen_options_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mserver.listen(path[, backlog][, callback])[39m[34m ([34m[4m#net_server_listen_path_backlog_callback[24m[39m[34m)[39m[0m
      [0mfor [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m servers[0m
    * [0m[90m<a href="#net_server_listen_port_host_backlog_callback">[39m[0m
      [0m[90m<code>server.listen([port[, host[, backlog]]][, callback])</code></a>[39m[0m
      [0m[90mfor TCP servers[39m[0m
      [0m[90m[39m[0m
      [0m[90m[39m[0m

[0mThis function is asynchronous. When the server starts listening, the[0m
[0m[34m[33m'listening'[39m[34m ([34m[4m#net_event_listening[24m[39m[34m)[39m event will be emitted. The last parameter [33mcallback[39m[0m
[0mwill be added as a listener for the [34m[33m'listening'[39m[34m ([34m[4m#net_event_listening[24m[39m[34m)[39m event.[0m

[0mAll [33mlisten()[39m methods can take a [33mbacklog[39m parameter to specify the maximum[0m
[0mlength of the queue of pending connections. The actual length will be determined[0m
[0mby the OS through sysctl settings such as [33mtcp_max_syn_backlog[39m and [33msomaxconn[39m[0m
[0mon Linux. The default value of this parameter is 511 (not 512).[0m

[0mAll [34m[33mnet.Socket[39m[34m ([34m[4m#net_class_net_socket[24m[39m[34m)[39m are set to [33mSO_REUSEADDR[39m (see [34m[33msocket(7)[39m[34m ([34m[4mhttp://man7.org/linux/man-pages/man7/socket.7.html[24m[39m[34m)[39m for[0m
[0mdetails).[0m

[0mThe [33mserver.listen()[39m method can be called again if and only if there was an[0m
[0merror during the first [33mserver.listen()[39m call or [33mserver.close()[39m has been[0m
[0mcalled. Otherwise, an [33mERR_SERVER_ALREADY_LISTEN[39m error will be thrown.[0m

[0mOne of the most common errors raised when listening is [33mEADDRINUSE[39m.[0m
[0mThis happens when another server is already listening on the requested[0m
[0m[33mport[39m/[33mpath[39m/[33mhandle[39m. One way to handle this would be to retry[0m
[0mafter a certain amount of time:[0m

    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37me[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37me[39m[32m.[39m[37mcode[39m [93m===[39m [92m'EADDRINUSE'[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Address in use, retrying...'[39m[90m)[39m[90m;[39m
        [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [37mserver[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
          [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[37mPORT[39m[32m,[39m [37mHOST[39m[90m)[39m[90m;[39m
        [33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### [33mserver.listen(handle[, backlog][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhandle[39m {Object}[0m
    * [0m[33mbacklog[39m {number} Common parameter of [34m[33mserver.listen()[39m[34m ([34m[4m#net_server_listen[24m[39m[34m)[39m functions[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {net.Server}[0m

[0mStart a server listening for connections on a given [33mhandle[39m that has[0m
[0malready been bound to a port, a Unix domain socket, or a Windows named pipe.[0m

[0mThe [33mhandle[39m object can be either a server, a socket (anything with an[0m
[0munderlying [33m_handle[39m member), or an object with an [33mfd[39m member that is a[0m
[0mvalid file descriptor.[0m

[0mListening on a file descriptor is not supported on Windows.[0m

[32m[1m#### [33mserver.listen(options[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.14[39m
[90mchanges:[39m
[90m  - version: v11.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23798[39m
[90m    description: The `ipv6Only` option is supported.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} Required. Supports the following properties:
        * [0m[0m[33mport[39m {number}[0m[0m[0m
      [0m
        * [0m[0m[33mhost[39m {string}[0m[0m[0m
      [0m
        * [0m[0m[33mpath[39m {string} Will be ignored if [33mport[39m is specified. See[0m[0m[0m
      [0m      [0m[0m[34mIdentifying paths for IPC connections ([34m[4m#net_identifying_paths_for_ipc_connections[24m[39m[34m)[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mbacklog[39m {number} Common parameter of [34m[33mserver.listen()[39m[34m ([34m[4m#net_server_listen[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mfunctions.[0m[0m[0m
      [0m
        * [0m[0m[33mexclusive[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
      [0m
        * [0m[0m[33mreadableAll[39m {boolean} For IPC servers makes the pipe readable[0m[0m[0m
      [0m      [0m[0mfor all users. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwritableAll[39m {boolean} For IPC servers makes the pipe writable[0m[0m[0m
      [0m      [0m[0mfor all users. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mipv6Only[39m {boolean} For TCP servers, setting [33mipv6Only[39m to [33mtrue[39m will[0m[0m[0m
      [0m      [0m[0mdisable dual-stack support, i.e., binding to host [33m::[39m won't make[0m[0m[0m
      [0m      [0m[0m[33m0.0.0.0[39m be bound. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}[0m
      [0mfunctions.[0m
    * [0mReturns: {net.Server}[0m

[0mIf [33mport[39m is specified, it behaves the same as[0m
[0m[90m<a href="#net_server_listen_port_host_backlog_callback">[39m[0m
[0m[90m<code>[39mserver.listen([port[, host[, backlog]]][, callback])[90m</code>[39m[90m</a>[39m.[0m
[0mOtherwise, if [33mpath[39m is specified, it behaves the same as[0m
[0m[34m[33mserver.listen(path[, backlog][, callback])[39m[34m ([34m[4m#net_server_listen_path_backlog_callback[24m[39m[34m)[39m.[0m
[0mIf none of them is specified, an error will be thrown.[0m

[0mIf [33mexclusive[39m is [33mfalse[39m (default), then cluster workers will use the same[0m
[0munderlying handle, allowing connection handling duties to be shared. When[0m
[0m[33mexclusive[39m is [33mtrue[39m, the handle is not shared, and attempted port sharing[0m
[0mresults in an error. An example which listens on an exclusive port is[0m
[0mshown below.[0m

    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[33m{[39m
      [37mhost[39m[93m:[39m [92m'localhost'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m80[39m[32m,[39m
      [37mexclusive[39m[93m:[39m [91mtrue[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mStarting an IPC server as root may cause the server path to be inaccessible for[0m
[0munprivileged users. Using [33mreadableAll[39m and [33mwritableAll[39m will make the server[0m
[0maccessible for all users.[0m

[32m[1m#### [33mserver.listen(path[, backlog][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string} Path the server should listen to. See[0m
      [0m[34mIdentifying paths for IPC connections ([34m[4m#net_identifying_paths_for_ipc_connections[24m[39m[34m)[39m.[0m
    * [0m[33mbacklog[39m {number} Common parameter of [34m[33mserver.listen()[39m[34m ([34m[4m#net_server_listen[24m[39m[34m)[39m functions.[0m
    * [0m[33mcallback[39m {Function}.[0m
    * [0mReturns: {net.Server}[0m

[0mStart an [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m server listening for connections on the given [33mpath[39m.[0m

[32m[1m#### [33mserver.listen([port[, host[, backlog]]][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mport[39m {number}[0m
    * [0m[33mhost[39m {string}[0m
    * [0m[33mbacklog[39m {number} Common parameter of [34m[33mserver.listen()[39m[34m ([34m[4m#net_server_listen[24m[39m[34m)[39m functions.[0m
    * [0m[33mcallback[39m {Function}.[0m
    * [0mReturns: {net.Server}[0m

[0mStart a TCP server listening for connections on the given [33mport[39m and [33mhost[39m.[0m

[0mIf [33mport[39m is omitted or is 0, the operating system will assign an arbitrary[0m
[0munused port, which can be retrieved by using [33mserver.address().port[39m[0m
[0mafter the [34m[33m'listening'[39m[34m ([34m[4m#net_event_listening[24m[39m[34m)[39m event has been emitted.[0m

[0mIf [33mhost[39m is omitted, the server will accept connections on the[0m
[0m[34munspecified IPv6 address ([34m[4mhttps://en.wikipedia.org/wiki/IPv6_address#Unspecified_address[24m[39m[34m)[39m ([33m::[39m) when IPv6 is available, or the[0m
[0m[34munspecified IPv4 address ([34m[4mhttps://en.wikipedia.org/wiki/0.0.0.0[24m[39m[34m)[39m ([33m0.0.0.0[39m) otherwise.[0m

[0mIn most operating systems, listening to the [34munspecified IPv6 address ([34m[4mhttps://en.wikipedia.org/wiki/IPv6_address#Unspecified_address[24m[39m[34m)[39m ([33m::[39m)[0m
[0mmay cause the [33mnet.Server[39m to also listen on the [34munspecified IPv4 address ([34m[4mhttps://en.wikipedia.org/wiki/0.0.0.0[24m[39m[34m)[39m[0m
[0m([33m0.0.0.0[39m).[0m

[32m[1m### [33mserver.listening[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean} Indicates whether or not the server is listening for connections.[0m

[32m[1m### [33mserver.maxConnections[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mSet this property to reject connections when the server's connection count gets[0m
[0mhigh.[0m

[0mIt is not recommended to use this option once a socket has been sent to a child[0m
[0mwith [34m[33mchild_process.fork()[39m[34m ([34m[4mchild_process.html#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m.[0m

[32m[1m### [33mserver.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {net.Server}[0m

[0mOpposite of [33munref()[39m, calling [33mref()[39m on a previously [33munref[39med server will[0m
[0m[3mnot[23m let the program exit if it's the only server left (the default behavior).[0m
[0mIf the server is [33mref[39med calling [33mref()[39m again will have no effect.[0m

[32m[1m### [33mserver.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {net.Server}[0m

[0mCalling [33munref()[39m on a server will allow the program to exit if this is the only[0m
[0mactive server in the event system. If the server is already [33munref[39med calling[0m
[0m[33munref()[39m again will have no effect.[0m

[32m[1m## Class: [33mnet.Socket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {stream.Duplex}[0m

[0mThis class is an abstraction of a TCP socket or a streaming [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m endpoint[0m
[0m(uses named pipes on Windows, and Unix domain sockets otherwise). It is also[0m
[0man [34m[33mEventEmitter[39m[34m ([34m[4mevents.html#events_class_eventemitter[24m[39m[34m)[39m.[0m

[0mA [33mnet.Socket[39m can be created by the user and used directly to interact with[0m
[0ma server. For example, it is returned by [34m[33mnet.createConnection()[39m[34m ([34m[4m#net_net_createconnection[24m[39m[34m)[39m,[0m
[0mso the user can use it to talk to the server.[0m

[0mIt can also be created by Node.js and passed to the user when a connection[0m
[0mis received. For example, it is passed to the listeners of a[0m
[0m[34m[33m'connection'[39m[34m ([34m[4m#net_event_connection[24m[39m[34m)[39m event emitted on a [34m[33mnet.Server[39m[34m ([34m[4m#net_class_net_server[24m[39m[34m)[39m, so the user can use[0m
[0mit to interact with the client.[0m

[32m[1m### [33mnew net.Socket([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} Available options are:
        * [0m[0m[33mfd[39m {number} If specified, wrap around an existing socket with[0m[0m[0m
      [0m      [0m[0mthe given file descriptor, otherwise a new socket will be created.[0m[0m[0m
      [0m
        * [0m[0m[33mallowHalfOpen[39m {boolean} Indicates whether half-opened TCP connections[0m[0m[0m
      [0m      [0m[0mare allowed. See [34m[33mnet.createServer()[39m[34m ([34m[4m#net_net_createserver_options_connectionlistener[24m[39m[34m)[39m and the [34m[33m'end'[39m[34m ([34m[4m#net_event_end[24m[39m[34m)[39m event[0m[0m[0m
      [0m      [0m[0mfor details. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mreadable[39m {boolean} Allow reads on the socket when an [33mfd[39m is passed,[0m[0m[0m
      [0m      [0m[0motherwise ignored. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwritable[39m {boolean} Allow writes on the socket when an [33mfd[39m is passed,[0m[0m[0m
      [0m      [0m[0motherwise ignored. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {net.Socket}[0m

[0mCreates a new socket object.[0m

[0mThe newly created socket can be either a TCP socket or a streaming [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m[0m
[0mendpoint, depending on what it [34m[33mconnect()[39m[34m ([34m[4m#net_socket_connect[24m[39m[34m)[39m to.[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhadError[39m {boolean} [33mtrue[39m if the socket had a transmission error.[0m

[0mEmitted once the socket is fully closed. The argument [33mhadError[39m is a boolean[0m
[0mwhich says if the socket was closed due to a transmission error.[0m

[32m[1m### Event: [33m'connect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when a socket connection is successfully established.[0m
[0mSee [34m[33mnet.createConnection()[39m[34m ([34m[4m#net_net_createconnection[24m[39m[34m)[39m.[0m

[32m[1m### Event: [33m'data'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Buffer|string}[0m

[0mEmitted when data is received. The argument [33mdata[39m will be a [33mBuffer[39m or[0m
[0m[33mString[39m. Encoding of data is set by [34m[33msocket.setEncoding()[39m[34m ([34m[4m#net_socket_setencoding_encoding[24m[39m[34m)[39m.[0m

[0mThe data will be lost if there is no listener when a [33mSocket[39m[0m
[0memits a [33m'data'[39m event.[0m

[32m[1m### Event: [33m'drain'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the write buffer becomes empty. Can be used to throttle uploads.[0m

[0mSee also: the return values of [33msocket.write()[39m.[0m

[32m[1m### Event: [33m'end'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the other end of the socket sends a FIN packet, thus ending the[0m
[0mreadable side of the socket.[0m

[0mBy default ([33mallowHalfOpen[39m is [33mfalse[39m) the socket will send a FIN packet[0m
[0mback and destroy its file descriptor once it has written out its pending[0m
[0mwrite queue. However, if [33mallowHalfOpen[39m is set to [33mtrue[39m, the socket will[0m
[0mnot automatically [34m[33mend()[39m[34m ([34m[4m#net_socket_end_data_encoding_callback[24m[39m[34m)[39m its writable side, allowing the[0m
[0muser to write arbitrary amounts of data. The user must call[0m
[0m[34m[33mend()[39m[34m ([34m[4m#net_socket_end_data_encoding_callback[24m[39m[34m)[39m explicitly to close the connection (i.e. sending a[0m
[0mFIN packet back).[0m

[32m[1m### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Error}[0m

[0mEmitted when an error occurs. The [33m'close'[39m event will be called directly[0m
[0mfollowing this event.[0m

[32m[1m### Event: [33m'lookup'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.3[39m
[90mchanges:[39m
[90m  - version: v5.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5598[39m
[90m    description: The `host` parameter is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted after resolving the host name but before connecting.[0m
[0mNot applicable to Unix sockets.[0m

    * [0m[33merr[39m {Error|null} The error object. See [34m[33mdns.lookup()[39m[34m ([34m[4mdns.html#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m.[0m
    * [0m[33maddress[39m {string} The IP address.[0m
    * [0m[33mfamily[39m {string|null} The address type. See [34m[33mdns.lookup()[39m[34m ([34m[4mdns.html#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m.[0m
    * [0m[33mhost[39m {string} The host name.[0m

[32m[1m### Event: [33m'ready'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when a socket is ready to be used.[0m

[0mTriggered immediately after [33m'connect'[39m.[0m

[32m[1m### Event: [33m'timeout'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted if the socket times out from inactivity. This is only to notify that[0m
[0mthe socket has been idle. The user must manually close the connection.[0m

[0mSee also: [34m[33msocket.setTimeout()[39m[34m ([34m[4m#net_socket_settimeout_timeout_callback[24m[39m[34m)[39m.[0m

[32m[1m### [33msocket.address()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns the bound [33maddress[39m, the address [33mfamily[39m name and [33mport[39m of the[0m
[0msocket as reported by the operating system:[0m
[0m[33m{ port: 12346, family: 'IPv4', address: '127.0.0.1' }[39m[0m

[32m[1m### [33msocket.bufferSize[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mThis property shows the number of characters buffered for writing. The buffer[0m
[0mmay contain strings whose length after encoding is not yet known. So this number[0m
[0mis only an approximation of the number of bytes in the buffer.[0m

[0m[33mnet.Socket[39m has the property that [33msocket.write()[39m always works. This is to[0m
[0mhelp users get up and running quickly. The computer cannot always keep up[0m
[0mwith the amount of data that is written to a socket. The network connection[0m
[0msimply might be too slow. Node.js will internally queue up the data written to a[0m
[0msocket and send it out over the wire when it is possible.[0m

[0mThe consequence of this internal buffering is that memory may grow.[0m
[0mUsers who experience large or growing [33mbufferSize[39m should attempt to[0m
[0m"throttle" the data flows in their program with[0m
[0m[34m[33msocket.pause()[39m[34m ([34m[4m#net_socket_pause[24m[39m[34m)[39m and [34m[33msocket.resume()[39m[34m ([34m[4m#net_socket_resume[24m[39m[34m)[39m.[0m

[32m[1m### [33msocket.bytesRead[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mThe amount of received bytes.[0m

[32m[1m### [33msocket.bytesWritten[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mThe amount of bytes sent.[0m

[32m[1m### [33msocket.connect()[39m[32m[22m[39m

[0mInitiate a connection on a given socket.[0m

[0mPossible signatures:[0m

    * [0m[34m[33msocket.connect(options[, connectListener])[39m[34m ([34m[4m#net_socket_connect_options_connectlistener[24m[39m[34m)[39m[0m
    * [0m[34m[33msocket.connect(path[, connectListener])[39m[34m ([34m[4m#net_socket_connect_path_connectlistener[24m[39m[34m)[39m[0m
      [0mfor [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m connections.[0m
    * [0m[34m[33msocket.connect(port[, host][, connectListener])[39m[34m ([34m[4m#net_socket_connect_port_host_connectlistener[24m[39m[34m)[39m[0m
      [0mfor TCP connections.[0m
    * [0mReturns: {net.Socket} The socket itself.[0m

[0mThis function is asynchronous. When the connection is established, the[0m
[0m[34m[33m'connect'[39m[34m ([34m[4m#net_event_connect[24m[39m[34m)[39m event will be emitted. If there is a problem connecting,[0m
[0minstead of a [34m[33m'connect'[39m[34m ([34m[4m#net_event_connect[24m[39m[34m)[39m event, an [34m[33m'error'[39m[34m ([34m[4m#net_event_error_1[24m[39m[34m)[39m event will be emitted with[0m
[0mthe error passed to the [34m[33m'error'[39m[34m ([34m[4m#net_event_error_1[24m[39m[34m)[39m listener.[0m
[0mThe last parameter [33mconnectListener[39m, if supplied, will be added as a listener[0m
[0mfor the [34m[33m'connect'[39m[34m ([34m[4m#net_event_connect[24m[39m[34m)[39m event [1monce[22m.[0m

[32m[1m#### [33msocket.connect(options[, connectListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90mchanges:[39m
[90m  - version: v12.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25436[39m
[90m    description: Added `onread` option.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6021[39m
[90m    description: The `hints` option defaults to `0` in all cases now.[39m
[90m                 Previously, in the absence of the `family` option it would[39m
[90m                 default to `dns.ADDRCONFIG | dns.V4MAPPED`.[39m
[90m  - version: v5.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6000[39m
[90m    description: The `hints` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}[0m
    * [0m[33mconnectListener[39m {Function} Common parameter of [34m[33msocket.connect()[39m[34m ([34m[4m#net_socket_connect[24m[39m[34m)[39m[0m
      [0mmethods. Will be added as a listener for the [34m[33m'connect'[39m[34m ([34m[4m#net_event_connect[24m[39m[34m)[39m event once.[0m
    * [0mReturns: {net.Socket} The socket itself.[0m

[0mInitiate a connection on a given socket. Normally this method is not needed,[0m
[0mthe socket should be created and opened with [34m[33mnet.createConnection()[39m[34m ([34m[4m#net_net_createconnection[24m[39m[34m)[39m. Use[0m
[0mthis only when implementing a custom Socket.[0m

[0mFor TCP connections, available [33moptions[39m are:[0m

    * [0m[33mport[39m {number} Required. Port the socket should connect to.[0m
    * [0m[33mhost[39m {string} Host the socket should connect to. [1mDefault:[22m [33m'localhost'[39m.[0m
    * [0m[33mlocalAddress[39m {string} Local address the socket should connect from.[0m
    * [0m[33mlocalPort[39m {number} Local port the socket should connect from.[0m
    * [0m[33mfamily[39m {number}: Version of IP stack. Must be [33m4[39m, [33m6[39m, or [33m0[39m. The value[0m
      [0m[33m0[39m indicates that both IPv4 and IPv6 addresses are allowed. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mhints[39m {number} Optional [34m[33mdns.lookup()[39m[34m hints ([34m[4mdns.html#dns_supported_getaddrinfo_flags[24m[39m[34m)[39m.[0m
    * [0m[33mlookup[39m {Function} Custom lookup function. [1mDefault:[22m [34m[33mdns.lookup()[39m[34m ([34m[4mdns.html#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m.[0m

[0mFor [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m connections, available [33moptions[39m are:[0m

    * [0m[33mpath[39m {string} Required. Path the client should connect to.[0m
      [0mSee [34mIdentifying paths for IPC connections ([34m[4m#net_identifying_paths_for_ipc_connections[24m[39m[34m)[39m. If provided, the TCP-specific[0m
      [0moptions above are ignored.[0m

[0mFor both types, available [33moptions[39m include:[0m

    * [0m[33monread[39m {Object} If specified, incoming data is stored in a single [33mbuffer[39m[0m
      [0mand passed to the supplied [33mcallback[39m when data arrives on the socket.[0m
      [0mThis will cause the streaming functionality to not provide any data.[0m
      [0mThe socket will emit events like [33m'error'[39m, [33m'end'[39m, and [33m'close'[39m[0m
      [0mas usual. Methods like [33mpause()[39m and [33mresume()[39m will also behave as[0m
      [0mexpected.
        * [0m[0m[33mbuffer[39m {Buffer|Uint8Array|Function} Either a reusable chunk of memory to[0m[0m[0m
      [0m      [0m[0muse for storing incoming data or a function that returns such.[0m[0m[0m
      [0m
        * [0m[0m[33mcallback[39m {Function} This function is called for every chunk of incoming[0m[0m[0m
      [0m      [0m[0mdata. Two arguments are passed to it: the number of bytes written to[0m[0m[0m
      [0m      [0m[0m[33mbuffer[39m and a reference to [33mbuffer[39m. Return [33mfalse[39m from this function to[0m[0m[0m
      [0m      [0m[0mimplicitly [33mpause()[39m the socket. This function will be executed in the[0m[0m[0m
      [0m      [0m[0mglobal context.[0m[0m[0m

[0mFollowing is an example of a client using the [33monread[39m option:[0m

    [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m
    [37mnet[39m[32m.[39m[37mconnect[39m[90m([39m[33m{[39m
      [37mport[39m[93m:[39m [34m80[39m[32m,[39m
      [37monread[39m[93m:[39m [33m{[39m
        [90m// Reuses a 4KiB Buffer for every read from the socket.[39m
        [37mbuffer[39m[93m:[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m4[39m [93m*[39m [34m1024[39m[90m)[39m[32m,[39m
        [37mcallback[39m[93m:[39m [94mfunction[39m[90m([39m[37mnread[39m[32m,[39m [37mbuf[39m[90m)[39m [33m{[39m
          [90m// Received data is available in `buf` from 0 to `nread`.[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mtoString[39m[90m([39m[92m'utf8'[39m[32m,[39m [34m0[39m[32m,[39m [37mnread[39m[90m)[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m#### [33msocket.connect(path[, connectListener])[39m[32m[22m[39m

    * [0m[33mpath[39m {string} Path the client should connect to. See[0m
      [0m[34mIdentifying paths for IPC connections ([34m[4m#net_identifying_paths_for_ipc_connections[24m[39m[34m)[39m.[0m
    * [0m[33mconnectListener[39m {Function} Common parameter of [34m[33msocket.connect()[39m[34m ([34m[4m#net_socket_connect[24m[39m[34m)[39m[0m
      [0mmethods. Will be added as a listener for the [34m[33m'connect'[39m[34m ([34m[4m#net_event_connect[24m[39m[34m)[39m event once.[0m
    * [0mReturns: {net.Socket} The socket itself.[0m

[0mInitiate an [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m connection on the given socket.[0m

[0mAlias to[0m
[0m[34m[33msocket.connect(options[, connectListener])[39m[34m ([34m[4m#net_socket_connect_options_connectlistener[24m[39m[34m)[39m[0m
[0mcalled with [33m{ path: path }[39m as [33moptions[39m.[0m

[32m[1m#### [33msocket.connect(port[, host][, connectListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mport[39m {number} Port the client should connect to.[0m
    * [0m[33mhost[39m {string} Host the client should connect to.[0m
    * [0m[33mconnectListener[39m {Function} Common parameter of [34m[33msocket.connect()[39m[34m ([34m[4m#net_socket_connect[24m[39m[34m)[39m[0m
      [0mmethods. Will be added as a listener for the [34m[33m'connect'[39m[34m ([34m[4m#net_event_connect[24m[39m[34m)[39m event once.[0m
    * [0mReturns: {net.Socket} The socket itself.[0m

[0mInitiate a TCP connection on the given socket.[0m

[0mAlias to[0m
[0m[34m[33msocket.connect(options[, connectListener])[39m[34m ([34m[4m#net_socket_connect_options_connectlistener[24m[39m[34m)[39m[0m
[0mcalled with [33m{port: port, host: host}[39m as [33moptions[39m.[0m

[32m[1m### [33msocket.connecting[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mIf [33mtrue[39m,[0m
[0m[34m[33msocket.connect(options[, connectListener])[39m[34m ([34m[4m#net_socket_connect_options_connectlistener[24m[39m[34m)[39m was[0m
[0mcalled and has not yet finished. It will stay [33mtrue[39m until the socket becomes[0m
[0mconnected, then it is set to [33mfalse[39m and the [33m'connect'[39m event is emitted.  Note[0m
[0mthat the[0m
[0m[34m[33msocket.connect(options[, connectListener])[39m[34m ([34m[4m#net_socket_connect_options_connectlistener[24m[39m[34m)[39m[0m
[0mcallback is a listener for the [33m'connect'[39m event.[0m

[32m[1m### [33msocket.destroy([exception])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mexception[39m {Object}[0m
    * [0mReturns: {net.Socket}[0m

[0mEnsures that no more I/O activity happens on this socket. Only necessary in[0m
[0mcase of errors (parse error or so).[0m

[0mIf [33mexception[39m is specified, an [34m[33m'error'[39m[34m ([34m[4m#net_event_error_1[24m[39m[34m)[39m event will be emitted and any[0m
[0mlisteners for that event will receive [33mexception[39m as an argument.[0m

[32m[1m### [33msocket.destroyed[39m[32m[22m[39m

    * [0m{boolean} Indicates if the connection is destroyed or not. Once a[0m
      [0mconnection is destroyed no further data can be transferred using it.[0m

[32m[1m### [33msocket.end([data[, encoding]][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {string|Buffer|Uint8Array}[0m
    * [0m[33mencoding[39m {string} Only used when data is [33mstring[39m. [1mDefault:[22m [33m'utf8'[39m.[0m
    * [0m[33mcallback[39m {Function} Optional callback for when the socket is finished.[0m
    * [0mReturns: {net.Socket} The socket itself.[0m

[0mHalf-closes the socket. i.e., it sends a FIN packet. It is possible the[0m
[0mserver will still send some data.[0m

[0mIf [33mdata[39m is specified, it is equivalent to calling[0m
[0m[33msocket.write(data, encoding)[39m followed by [34m[33msocket.end()[39m[34m ([34m[4m#net_socket_end_data_encoding_callback[24m[39m[34m)[39m.[0m

[32m[1m### [33msocket.localAddress[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe string representation of the local IP address the remote client is[0m
[0mconnecting on. For example, in a server listening on [33m'0.0.0.0'[39m, if a client[0m
[0mconnects on [33m'192.168.1.1'[39m, the value of [33msocket.localAddress[39m would be[0m
[0m[33m'192.168.1.1'[39m.[0m

[32m[1m### [33msocket.localPort[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mThe numeric representation of the local port. For example, [33m80[39m or [33m21[39m.[0m

[32m[1m### [33msocket.pause()[39m[32m[22m[39m

    * [0mReturns: {net.Socket} The socket itself.[0m

[0mPauses the reading of data. That is, [34m[33m'data'[39m[34m ([34m[4m#net_event_data[24m[39m[34m)[39m events will not be emitted.[0m
[0mUseful to throttle back an upload.[0m

[32m[1m### [33msocket.pending[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThis is [33mtrue[39m if the socket is not connected yet, either because [33m.connect()[39m[0m
[0mhas not yet been called or because it is still in the process of connecting[0m
[0m(see [34m[33msocket.connecting[39m[34m ([34m[4m#net_socket_connecting[24m[39m[34m)[39m).[0m

[32m[1m### [33msocket.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {net.Socket} The socket itself.[0m

[0mOpposite of [33munref()[39m, calling [33mref()[39m on a previously [33munref[39med socket will[0m
[0m[3mnot[23m let the program exit if it's the only socket left (the default behavior).[0m
[0mIf the socket is [33mref[39med calling [33mref[39m again will have no effect.[0m

[32m[1m### [33msocket.remoteAddress[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe string representation of the remote IP address. For example,[0m
[0m[33m'74.125.127.100'[39m or [33m'2001:4860:a005::68'[39m. Value may be [33mundefined[39m if[0m
[0mthe socket is destroyed (for example, if the client disconnected).[0m

[32m[1m### [33msocket.remoteFamily[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.14[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe string representation of the remote IP family. [33m'IPv4'[39m or [33m'IPv6'[39m.[0m

[32m[1m### [33msocket.remotePort[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mThe numeric representation of the remote port. For example, [33m80[39m or [33m21[39m.[0m

[32m[1m### [33msocket.resume()[39m[32m[22m[39m

    * [0mReturns: {net.Socket} The socket itself.[0m

[0mResumes reading after a call to [34m[33msocket.pause()[39m[34m ([34m[4m#net_socket_pause[24m[39m[34m)[39m.[0m

[32m[1m### [33msocket.setEncoding([encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mencoding[39m {string}[0m
    * [0mReturns: {net.Socket} The socket itself.[0m

[0mSet the encoding for the socket as a [34mReadable Stream ([34m[4mstream.html#stream_class_stream_readable[24m[39m[34m)[39m. See[0m
[0m[34m[33mreadable.setEncoding()[39m[34m ([34m[4mstream.html#stream_readable_setencoding_encoding[24m[39m[34m)[39m for more information.[0m

[32m[1m### [33msocket.setKeepAlive([enable][, initialDelay])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.92[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33menable[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m
    * [0m[33minitialDelay[39m {number} [1mDefault:[22m [33m0[39m[0m
    * [0mReturns: {net.Socket} The socket itself.[0m

[0mEnable/disable keep-alive functionality, and optionally set the initial[0m
[0mdelay before the first keepalive probe is sent on an idle socket.[0m

[0mSet [33minitialDelay[39m (in milliseconds) to set the delay between the last[0m
[0mdata packet received and the first keepalive probe. Setting [33m0[39m for[0m
[0m[33minitialDelay[39m will leave the value unchanged from the default[0m
[0m(or previous) setting.[0m

[32m[1m### [33msocket.setNoDelay([noDelay])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mnoDelay[39m {boolean} [1mDefault:[22m [33mtrue[39m[0m
    * [0mReturns: {net.Socket} The socket itself.[0m

[0mEnable/disable the use of Nagle's algorithm.[0m

[0mWhen a TCP connection is created, it will have Nagle's algorithm enabled.[0m

[0mNagle's algorithm delays data before it is sent via the network. It attempts[0m
[0mto optimize throughput at the expense of latency.[0m

[0mPassing [33mtrue[39m for [33mnoDelay[39m or not passing an argument will disable Nagle's[0m
[0malgorithm for the socket. Passing [33mfalse[39m for [33mnoDelay[39m will enable Nagle's[0m
[0malgorithm.[0m

[32m[1m### [33msocket.setTimeout(timeout[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtimeout[39m {number}[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {net.Socket} The socket itself.[0m

[0mSets the socket to timeout after [33mtimeout[39m milliseconds of inactivity on[0m
[0mthe socket. By default [33mnet.Socket[39m do not have a timeout.[0m

[0mWhen an idle timeout is triggered the socket will receive a [34m[33m'timeout'[39m[34m ([34m[4m#net_event_timeout[24m[39m[34m)[39m[0m
[0mevent but the connection will not be severed. The user must manually call[0m
[0m[34m[33msocket.end()[39m[34m ([34m[4m#net_socket_end_data_encoding_callback[24m[39m[34m)[39m or [34m[33msocket.destroy()[39m[34m ([34m[4m#net_socket_destroy_exception[24m[39m[34m)[39m to end the connection.[0m

    [37msocket[39m[32m.[39m[37msetTimeout[39m[90m([39m[34m3000[39m[90m)[39m[90m;[39m
    [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'timeout'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'socket timeout'[39m[90m)[39m[90m;[39m
      [37msocket[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf [33mtimeout[39m is 0, then the existing idle timeout is disabled.[0m

[0mThe optional [33mcallback[39m parameter will be added as a one-time listener for the[0m
[0m[34m[33m'timeout'[39m[34m ([34m[4m#net_event_timeout[24m[39m[34m)[39m event.[0m

[32m[1m### [33msocket.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {net.Socket} The socket itself.[0m

[0mCalling [33munref()[39m on a socket will allow the program to exit if this is the only[0m
[0mactive socket in the event system. If the socket is already [33munref[39med calling[0m
[0m[33munref()[39m again will have no effect.[0m

[32m[1m### [33msocket.write(data[, encoding][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {string|Buffer|Uint8Array}[0m
    * [0m[33mencoding[39m {string} Only used when data is [33mstring[39m. [1mDefault:[22m [33mutf8[39m.[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {boolean}[0m

[0mSends data on the socket. The second parameter specifies the encoding in the[0m
[0mcase of a string. It defaults to UTF8 encoding.[0m

[0mReturns [33mtrue[39m if the entire data was flushed successfully to the kernel[0m
[0mbuffer. Returns [33mfalse[39m if all or part of the data was queued in user memory.[0m
[0m[34m[33m'drain'[39m[34m ([34m[4m#net_event_drain[24m[39m[34m)[39m will be emitted when the buffer is again free.[0m

[0mThe optional [33mcallback[39m parameter will be executed when the data is finally[0m
[0mwritten out, which may not be immediately.[0m

[0mSee [33mWritable[39m stream [34m[33mwrite()[39m[34m ([34m[4mstream.html#stream_writable_write_chunk_encoding_callback[24m[39m[34m)[39m method for more[0m
[0minformation.[0m

[32m[1m## [33mnet.connect()[39m[32m[22m[39m

[0mAliases to[0m
[0m[34m[33mnet.createConnection()[39m[34m ([34m[4m#net_net_createconnection[24m[39m[34m)[39m.[0m

[0mPossible signatures:[0m

    * [0m[34m[33mnet.connect(options[, connectListener])[39m[34m ([34m[4m#net_net_connect_options_connectlistener[24m[39m[34m)[39m[0m
    * [0m[34m[33mnet.connect(path[, connectListener])[39m[34m ([34m[4m#net_net_connect_path_connectlistener[24m[39m[34m)[39m for [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m[0m
      [0mconnections.[0m
    * [0m[34m[33mnet.connect(port[, host][, connectListener])[39m[34m ([34m[4m#net_net_connect_port_host_connectlistener[24m[39m[34m)[39m[0m
      [0mfor TCP connections.[0m

[32m[1m### [33mnet.connect(options[, connectListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}[0m
    * [0m[33mconnectListener[39m {Function}[0m
    * [0mReturns: {net.Socket}[0m

[0mAlias to[0m
[0m[34m[33mnet.createConnection(options[, connectListener])[39m[34m ([34m[4m#net_net_createconnection_options_connectlistener[24m[39m[34m)[39m.[0m

[32m[1m### [33mnet.connect(path[, connectListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string}[0m
    * [0m[33mconnectListener[39m {Function}[0m
    * [0mReturns: {net.Socket}[0m

[0mAlias to[0m
[0m[34m[33mnet.createConnection(path[, connectListener])[39m[34m ([34m[4m#net_net_createconnection_path_connectlistener[24m[39m[34m)[39m.[0m

[32m[1m### [33mnet.connect(port[, host][, connectListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mport[39m {number}[0m
    * [0m[33mhost[39m {string}[0m
    * [0m[33mconnectListener[39m {Function}[0m
    * [0mReturns: {net.Socket}[0m

[0mAlias to[0m
[0m[34m[33mnet.createConnection(port[, host][, connectListener])[39m[34m ([34m[4m#net_net_createconnection_port_host_connectlistener[24m[39m[34m)[39m.[0m

[32m[1m## [33mnet.createConnection()[39m[32m[22m[39m

[0mA factory function, which creates a new [34m[33mnet.Socket[39m[34m ([34m[4m#net_class_net_socket[24m[39m[34m)[39m,[0m
[0mimmediately initiates connection with [34m[33msocket.connect()[39m[34m ([34m[4m#net_socket_connect[24m[39m[34m)[39m,[0m
[0mthen returns the [33mnet.Socket[39m that starts the connection.[0m

[0mWhen the connection is established, a [34m[33m'connect'[39m[34m ([34m[4m#net_event_connect[24m[39m[34m)[39m event will be emitted[0m
[0mon the returned socket. The last parameter [33mconnectListener[39m, if supplied,[0m
[0mwill be added as a listener for the [34m[33m'connect'[39m[34m ([34m[4m#net_event_connect[24m[39m[34m)[39m event [1monce[22m.[0m

[0mPossible signatures:[0m

    * [0m[34m[33mnet.createConnection(options[, connectListener])[39m[34m ([34m[4m#net_net_createconnection_options_connectlistener[24m[39m[34m)[39m[0m
    * [0m[34m[33mnet.createConnection(path[, connectListener])[39m[34m ([34m[4m#net_net_createconnection_path_connectlistener[24m[39m[34m)[39m[0m
      [0mfor [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m connections.[0m
    * [0m[34m[33mnet.createConnection(port[, host][, connectListener])[39m[34m ([34m[4m#net_net_createconnection_port_host_connectlistener[24m[39m[34m)[39m[0m
      [0mfor TCP connections.[0m

[0mThe [34m[33mnet.connect()[39m[34m ([34m[4m#net_net_connect[24m[39m[34m)[39m function is an alias to this function.[0m

[32m[1m### [33mnet.createConnection(options[, connectListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} Required. Will be passed to both the[0m
      [0m[34m[33mnew net.Socket([options])[39m[34m ([34m[4m#net_new_net_socket_options[24m[39m[34m)[39m call and the[0m
      [0m[34m[33msocket.connect(options[, connectListener])[39m[34m ([34m[4m#net_socket_connect_options_connectlistener[24m[39m[34m)[39m[0m
      [0mmethod.[0m
    * [0m[33mconnectListener[39m {Function} Common parameter of the[0m
      [0m[34m[33mnet.createConnection()[39m[34m ([34m[4m#net_net_createconnection[24m[39m[34m)[39m functions. If supplied, will be added as[0m
      [0ma listener for the [34m[33m'connect'[39m[34m ([34m[4m#net_event_connect[24m[39m[34m)[39m event on the returned socket once.[0m
    * [0mReturns: {net.Socket} The newly created socket used to start the connection.[0m

[0mFor available options, see[0m
[0m[34m[33mnew net.Socket([options])[39m[34m ([34m[4m#net_new_net_socket_options[24m[39m[34m)[39m[0m
[0mand [34m[33msocket.connect(options[, connectListener])[39m[34m ([34m[4m#net_socket_connect_options_connectlistener[24m[39m[34m)[39m.[0m

[0mAdditional options:[0m

    * [0m[33mtimeout[39m {number} If set, will be used to call[0m
      [0m[34m[33msocket.setTimeout(timeout)[39m[34m ([34m[4m#net_socket_settimeout_timeout_callback[24m[39m[34m)[39m after the socket is created, but before[0m
      [0mit starts the connection.[0m

[0mFollowing is an example of a client of the echo server described[0m
[0min the [34m[33mnet.createServer()[39m[34m ([34m[4m#net_net_createserver_options_connectionlistener[24m[39m[34m)[39m section:[0m

    [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mclient[39m [93m=[39m [37mnet[39m[32m.[39m[37mcreateConnection[39m[90m([39m[33m{[39m [37mport[39m[93m:[39m [34m8124[39m [33m}[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// 'connect' listener.[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'connected to server!'[39m[90m)[39m[90m;[39m
      [37mclient[39m[32m.[39m[37mwrite[39m[90m([39m[92m'world!\r\n'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mclient[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdata[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
      [37mclient[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mclient[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'disconnected from server'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mTo connect on the socket [33m/tmp/echo.sock[39m:[0m

    [94mconst[39m [37mclient[39m [93m=[39m [37mnet[39m[32m.[39m[37mcreateConnection[39m[90m([39m[33m{[39m [37mpath[39m[93m:[39m [92m'/tmp/echo.sock'[39m [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mnet.createConnection(path[, connectListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string} Path the socket should connect to. Will be passed to[0m
      [0m[34m[33msocket.connect(path[, connectListener])[39m[34m ([34m[4m#net_socket_connect_path_connectlistener[24m[39m[34m)[39m.[0m
      [0mSee [34mIdentifying paths for IPC connections ([34m[4m#net_identifying_paths_for_ipc_connections[24m[39m[34m)[39m.[0m
    * [0m[33mconnectListener[39m {Function} Common parameter of the[0m
      [0m[34m[33mnet.createConnection()[39m[34m ([34m[4m#net_net_createconnection[24m[39m[34m)[39m functions, an "once" listener for the[0m
      [0m[33m'connect'[39m event on the initiating socket. Will be passed to[0m
      [0m[34m[33msocket.connect(path[, connectListener])[39m[34m ([34m[4m#net_socket_connect_path_connectlistener[24m[39m[34m)[39m.[0m
    * [0mReturns: {net.Socket} The newly created socket used to start the connection.[0m

[0mInitiates an [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m connection.[0m

[0mThis function creates a new [34m[33mnet.Socket[39m[34m ([34m[4m#net_class_net_socket[24m[39m[34m)[39m with all options set to default,[0m
[0mimmediately initiates connection with[0m
[0m[34m[33msocket.connect(path[, connectListener])[39m[34m ([34m[4m#net_socket_connect_path_connectlistener[24m[39m[34m)[39m,[0m
[0mthen returns the [33mnet.Socket[39m that starts the connection.[0m

[32m[1m### [33mnet.createConnection(port[, host][, connectListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mport[39m {number} Port the socket should connect to. Will be passed to[0m
      [0m[34m[33msocket.connect(port[, host][, connectListener])[39m[34m ([34m[4m#net_socket_connect_port_host_connectlistener[24m[39m[34m)[39m.[0m
    * [0m[33mhost[39m {string} Host the socket should connect to. Will be passed to[0m
      [0m[34m[33msocket.connect(port[, host][, connectListener])[39m[34m ([34m[4m#net_socket_connect_port_host_connectlistener[24m[39m[34m)[39m.[0m
      [0m [1mDefault:[22m [33m'localhost'[39m.[0m
    * [0m[33mconnectListener[39m {Function} Common parameter of the[0m
      [0m[34m[33mnet.createConnection()[39m[34m ([34m[4m#net_net_createconnection[24m[39m[34m)[39m functions, an "once" listener for the[0m
      [0m[33m'connect'[39m event on the initiating socket. Will be passed to[0m
      [0m[34m[33msocket.connect(port[, host][, connectListener])[39m[34m ([34m[4m#net_socket_connect_port_host_connectlistener[24m[39m[34m)[39m.[0m
    * [0mReturns: {net.Socket} The newly created socket used to start the connection.[0m

[0mInitiates a TCP connection.[0m

[0mThis function creates a new [34m[33mnet.Socket[39m[34m ([34m[4m#net_class_net_socket[24m[39m[34m)[39m with all options set to default,[0m
[0mimmediately initiates connection with[0m
[0m[34m[33msocket.connect(port[, host][, connectListener])[39m[34m ([34m[4m#net_socket_connect_port_host_connectlistener[24m[39m[34m)[39m,[0m
[0mthen returns the [33mnet.Socket[39m that starts the connection.[0m

[32m[1m## [33mnet.createServer([options][, connectionListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mallowHalfOpen[39m {boolean} Indicates whether half-opened TCP[0m[0m[0m
      [0m      [0m[0mconnections are allowed. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mpauseOnConnect[39m {boolean} Indicates whether the socket should be[0m[0m[0m
      [0m      [0m[0mpaused on incoming connections. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0m[33mconnectionListener[39m {Function} Automatically set as a listener for the[0m
      [0m[34m[33m'connection'[39m[34m ([34m[4m#net_event_connection[24m[39m[34m)[39m event.[0m
    * [0mReturns: {net.Server}[0m

[0mCreates a new TCP or [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m server.[0m

[0mIf [33mallowHalfOpen[39m is set to [33mtrue[39m, when the other end of the socket[0m
[0msends a FIN packet, the server will only send a FIN packet back when[0m
[0m[34m[33msocket.end()[39m[34m ([34m[4m#net_socket_end_data_encoding_callback[24m[39m[34m)[39m is explicitly called, until then the connection is[0m
[0mhalf-closed (non-readable but still writable). See [34m[33m'end'[39m[34m ([34m[4m#net_event_end[24m[39m[34m)[39m event[0m
[0mand [34mRFC 1122 ([34m[4mhttps://tools.ietf.org/html/rfc1122[24m[39m[34m)[39m (section 4.2.2.13) for more information.[0m

[0mIf [33mpauseOnConnect[39m is set to [33mtrue[39m, then the socket associated with each[0m
[0mincoming connection will be paused, and no data will be read from its handle.[0m
[0mThis allows connections to be passed between processes without any data being[0m
[0mread by the original process. To begin reading data from a paused socket, call[0m
[0m[34m[33msocket.resume()[39m[34m ([34m[4m#net_socket_resume[24m[39m[34m)[39m.[0m

[0mThe server can be a TCP server or an [34mIPC ([34m[4m#net_ipc_support[24m[39m[34m)[39m server, depending on what it[0m
[0m[34m[33mlisten()[39m[34m ([34m[4m#net_server_listen[24m[39m[34m)[39m to.[0m

[0mHere is an example of an TCP echo server which listens for connections[0m
[0mon port 8124:[0m

    [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mc[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// 'connection' listener.[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'client connected'[39m[90m)[39m[90m;[39m
      [37mc[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'client disconnected'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
      [37mc[39m[32m.[39m[37mwrite[39m[90m([39m[92m'hello\r\n'[39m[90m)[39m[90m;[39m
      [37mc[39m[32m.[39m[37mpipe[39m[90m([39m[37mc[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mthrow[39m [37merr[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m8124[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'server bound'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mTest this by using [33mtelnet[39m:[0m

    [33m$ telnet localhost 8124[39m

[0mTo listen on the socket [33m/tmp/echo.sock[39m:[0m

    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[92m'/tmp/echo.sock'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'server bound'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mUse [33mnc[39m to connect to a Unix domain socket server:[0m

    [33m$ nc -U /tmp/echo.sock[39m

[32m[1m## [33mnet.isIP(input)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33minput[39m {string}[0m
    * [0mReturns: {integer}[0m

[0mTests if input is an IP address. Returns [33m0[39m for invalid strings,[0m
[0mreturns [33m4[39m for IP version 4 addresses, and returns [33m6[39m for IP version 6[0m
[0maddresses.[0m

[32m[1m## [33mnet.isIPv4(input)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33minput[39m {string}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if input is a version 4 IP address, otherwise returns [33mfalse[39m.[0m

[32m[1m## [33mnet.isIPv6(input)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33minput[39m {string}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if input is a version 6 IP address, otherwise returns [33mfalse[39m.[0m

