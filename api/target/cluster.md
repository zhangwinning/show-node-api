[35m[4m[1m# Cluster[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mA single instance of Node.js runs in a single thread. To take advantage of[0m
[0mmulti-core systems, the user will sometimes want to launch a cluster of Node.js[0m
[0mprocesses to handle the load.[0m

[0mThe cluster module allows easy creation of child processes that all share[0m
[0mserver ports.[0m

    [94mconst[39m [37mcluster[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/cluster'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mnumCPUs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/os'[39m[90m)[39m[32m.[39m[37mcpus[39m[90m([39m[90m)[39m[32m.[39m[37mlength[39m[90m;[39m
    
    [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misMaster[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Master ${[37mprocess[39m[32m.[39m[37mpid[39m} is running`[90m)[39m[90m;[39m
    
      [90m// Fork workers.[39m
      [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [37mnumCPUs[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
        [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mworker[39m[32m,[39m [37mcode[39m[32m,[39m [37msignal[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`worker ${[37mworker[39m[32m.[39m[37mprocess[39m[32m.[39m[37mpid[39m} died`[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m [94melse[39m [33m{[39m
      [90m// Workers can share any TCP connection[39m
      [90m// In this case it is an HTTP server[39m
      [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[90m)[39m[90m;[39m
        [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'hello world\n'[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m8000[39m[90m)[39m[90m;[39m
    
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Worker ${[37mprocess[39m[32m.[39m[37mpid[39m} started`[90m)[39m[90m;[39m
    [33m}[39m

[0mRunning Node.js will now share port 8000 between the workers:[0m

    [33m$ node server.js[39m
    [33mMaster 3596 is running[39m
    [33mWorker 4324 started[39m
    [33mWorker 4520 started[39m
    [33mWorker 6056 started[39m
    [33mWorker 5644 started[39m

[0mOn Windows, it is not yet possible to set up a named pipe server in a worker.[0m

[32m[1m## How It Works[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mThe worker processes are spawned using the [34m[33mchild_process.fork()[39m[34m ([34m[4mchild_process.html#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m method,[0m
[0mso that they can communicate with the parent via IPC and pass server[0m
[0mhandles back and forth.[0m

[0mThe cluster module supports two methods of distributing incoming[0m
[0mconnections.[0m

[0mThe first one (and the default one on all platforms except Windows),[0m
[0mis the round-robin approach, where the master process listens on a[0m
[0mport, accepts new connections and distributes them across the workers[0m
[0min a round-robin fashion, with some built-in smarts to avoid[0m
[0moverloading a worker process.[0m

[0mThe second approach is where the master process creates the listen[0m
[0msocket and sends it to interested workers. The workers then accept[0m
[0mincoming connections directly.[0m

[0mThe second approach should, in theory, give the best performance.[0m
[0mIn practice however, distribution tends to be very unbalanced due[0m
[0mto operating system scheduler vagaries. Loads have been observed[0m
[0mwhere over 70% of all connections ended up in just two processes,[0m
[0mout of a total of eight.[0m

[0mBecause [33mserver.listen()[39m hands off most of the work to the master[0m
[0mprocess, there are three cases where the behavior between a normal[0m
[0mNode.js process and a cluster worker differs:[0m

    1. [0m[33mserver.listen({fd: 7})[39m Because the message is passed to the master,[0m
       [0mfile descriptor 7 [1min the parent[22m will be listened on, and the[0m
       [0mhandle passed to the worker, rather than listening to the worker's[0m
       [0midea of what the number 7 file descriptor references.[0m
    2. [0m[33mserver.listen(handle)[39m Listening on handles explicitly will cause[0m
       [0mthe worker to use the supplied handle, rather than talk to the master[0m
       [0mprocess.[0m
    3. [0m[33mserver.listen(0)[39m Normally, this will cause servers to listen on a[0m
       [0mrandom port. However, in a cluster, each worker will receive the[0m
       [0msame "random" port each time they do [33mlisten(0)[39m. In essence, the[0m
       [0mport is random the first time, but predictable thereafter. To listen[0m
       [0mon a unique port, generate a port number based on the cluster worker ID.[0m

[0mNode.js does not provide routing logic. It is, therefore important to design an[0m
[0mapplication such that it does not rely too heavily on in-memory data objects for[0m
[0mthings like sessions and login.[0m

[0mBecause workers are all separate processes, they can be killed or[0m
[0mre-spawned depending on a program's needs, without affecting other[0m
[0mworkers. As long as there are some workers still alive, the server will[0m
[0mcontinue to accept connections. If no workers are alive, existing connections[0m
[0mwill be dropped and new connections will be refused. Node.js does not[0m
[0mautomatically manage the number of workers, however. It is the application's[0m
[0mresponsibility to manage the worker pool based on its own needs.[0m

[0mAlthough a primary use case for the [33mcluster[39m module is networking, it can[0m
[0malso be used for other use cases requiring worker processes.[0m

[32m[1m## Class: [33mWorker[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {EventEmitter}[0m

[0mA [33mWorker[39m object contains all public information and method about a worker.[0m
[0mIn the master it can be obtained using [33mcluster.workers[39m. In a worker[0m
[0mit can be obtained using [33mcluster.worker[39m.[0m

[32m[1m### Event: [33m'disconnect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m[0mSimilar to the [33mcluster.on('disconnect')[39m event, but specific to this worker.[0m

    [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'disconnect'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Worker has disconnected[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.3[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis event is the same as the one provided by [34m[33mchild_process.fork()[39m[34m ([34m[4mchild_process.html#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m.[0m

[0mWithin a worker, [33mprocess.on('error')[39m may also be used.[0m

[32m[1m### Event: [33m'exit'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {number} The exit code, if it exited normally.[0m
    * [0m[33msignal[39m {string} The name of the signal (e.g. [33m'SIGHUP'[39m) that caused[0m
      [0mthe process to be killed.[0m

[0mSimilar to the [33mcluster.on('exit')[39m event, but specific to this worker.[0m

    [94mconst[39m [37mworker[39m [93m=[39m [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
    [37mworker[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mcode[39m[32m,[39m [37msignal[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37msignal[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`worker was killed by signal: ${[37msignal[39m}`[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [94mif[39m [90m([39m[37mcode[39m [93m!==[39m [34m0[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`worker exited with error code: ${[37mcode[39m}`[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'worker success!'[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'listening'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33maddress[39m {Object}[0m

[0mSimilar to the [33mcluster.on('listening')[39m event, but specific to this worker.[0m

    [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'listening'[39m[32m,[39m [90m([39m[37maddress[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Worker is listening[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIt is not emitted in the worker.[0m

[32m[1m### Event: [33m'message'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmessage[39m {Object}[0m
    * [0m[33mhandle[39m {undefined|Object}[0m

[0mSimilar to the [33m'message'[39m event of [33mcluster[39m, but specific to this worker.[0m

[0mWithin a worker, [33mprocess.on('message')[39m may also be used.[0m

[0mSee [34m[33mprocess[39m[34m event: [33m'message'[39m[34m ([34m[4mprocess.html#process_event_message[24m[39m[34m)[39m.[0m

[0mHere is an example using the message system. It keeps a count in the master[0m
[0mprocess of the number of HTTP requests received by the workers:[0m

    [94mconst[39m [37mcluster[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/cluster'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    
    [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misMaster[39m[90m)[39m [33m{[39m
    
      [90m// Keep track of http requests[39m
      [94mlet[39m [37mnumReqs[39m [93m=[39m [34m0[39m[90m;[39m
      [37msetInterval[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`numReqs = ${[37mnumReqs[39m}`[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m
    
      [90m// Count requests[39m
      [94mfunction[39m [37mmessageHandler[39m[90m([39m[37mmsg[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37mmsg[39m[32m.[39m[37mcmd[39m [93m&&[39m [37mmsg[39m[32m.[39m[37mcmd[39m [93m===[39m [92m'notifyRequest'[39m[90m)[39m [33m{[39m
          [37mnumReqs[39m [93m+=[39m [34m1[39m[90m;[39m
        [33m}[39m
      [33m}[39m
    
      [90m// Start workers and listen for messages containing notifyRequest[39m
      [94mconst[39m [37mnumCPUs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/os'[39m[90m)[39m[32m.[39m[37mcpus[39m[90m([39m[90m)[39m[32m.[39m[37mlength[39m[90m;[39m
      [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [37mnumCPUs[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
        [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [94mfor[39m [90m([39m[94mconst[39m [37mid[39m [94min[39m [37mcluster[39m[32m.[39m[37mworkers[39m[90m)[39m [33m{[39m
        [37mcluster[39m[32m.[39m[37mworkers[39m[33m[[39m[37mid[39m[33m][39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [37mmessageHandler[39m[90m)[39m[90m;[39m
      [33m}[39m
    
    [33m}[39m [94melse[39m [33m{[39m
    
      [90m// Worker processes have a http server.[39m
      [37mhttp[39m[32m.[39m[37mServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[90m)[39m[90m;[39m
        [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'hello world\n'[39m[90m)[39m[90m;[39m
    
        [90m// Notify master about the request[39m
        [37mprocess[39m[32m.[39m[37msend[39m[90m([39m[33m{[39m [37mcmd[39m[93m:[39m [92m'notifyRequest'[39m [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m8000[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m### Event: [33m'online'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mSimilar to the [33mcluster.on('online')[39m event, but specific to this worker.[0m

    [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'online'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Worker is online[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIt is not emitted in the worker.[0m

[32m[1m### [33mworker.disconnect()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90mchanges:[39m
[90m  - version: v7.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10019[39m
[90m    description: This method now returns a reference to `worker`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {cluster.Worker} A reference to [33mworker[39m.[0m

[0mIn a worker, this function will close all servers, wait for the [33m'close'[39m event[0m
[0mon those servers, and then disconnect the IPC channel.[0m

[0mIn the master, an internal message is sent to the worker causing it to call[0m
[0m[33m.disconnect()[39m on itself.[0m

[0mCauses [33m.exitedAfterDisconnect[39m to be set.[0m

[0mAfter a server is closed, it will no longer accept new connections,[0m
[0mbut connections may be accepted by any other listening worker. Existing[0m
[0mconnections will be allowed to close as usual. When no more connections exist,[0m
[0msee [34m[33mserver.close()[39m[34m ([34m[4mnet.html#net_event_close[24m[39m[34m)[39m, the IPC channel to the worker will close allowing it[0m
[0mto die gracefully.[0m

[0mThe above applies [3monly[23m to server connections, client connections are not[0m
[0mautomatically closed by workers, and disconnect does not wait for them to close[0m
[0mbefore exiting.[0m

[0mIn a worker, [33mprocess.disconnect[39m exists, but it is not this function;[0m
[0mit is [34m[33mdisconnect()[39m[34m ([34m[4mchild_process.html#child_process_subprocess_disconnect[24m[39m[34m)[39m.[0m

[0mBecause long living server connections may block workers from disconnecting, it[0m
[0mmay be useful to send a message, so application specific actions may be taken to[0m
[0mclose them. It also may be useful to implement a timeout, killing a worker if[0m
[0mthe [33m'disconnect'[39m event has not been emitted after some time.[0m

    [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misMaster[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mworker[39m [93m=[39m [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
      [94mlet[39m [37mtimeout[39m[90m;[39m
    
      [37mworker[39m[32m.[39m[37mon[39m[90m([39m[92m'listening'[39m[32m,[39m [90m([39m[37maddress[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mworker[39m[32m.[39m[37msend[39m[90m([39m[92m'shutdown'[39m[90m)[39m[90m;[39m
        [37mworker[39m[32m.[39m[37mdisconnect[39m[90m([39m[90m)[39m[90m;[39m
        [37mtimeout[39m [93m=[39m [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [37mworker[39m[32m.[39m[37mkill[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m[32m,[39m [34m2000[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [37mworker[39m[32m.[39m[37mon[39m[90m([39m[92m'disconnect'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37mclearTimeout[39m[90m([39m[37mtimeout[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
    [33m}[39m [94melse[39m [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misWorker[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mnet[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[90m;[39m
      [94mconst[39m [37mserver[39m [93m=[39m [37mnet[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// Connections never end[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m8000[39m[90m)[39m[90m;[39m
    
      [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmsg[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37mmsg[39m [93m===[39m [92m'shutdown'[39m[90m)[39m [33m{[39m
          [90m// Initiate graceful close of any connections to server[39m
        [33m}[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m### [33mworker.exitedAfterDisconnect[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThis property is [33mtrue[39m if the worker exited due to [33m.kill()[39m or[0m
[0m[33m.disconnect()[39m. If the worker exited any other way, it is [33mfalse[39m. If the[0m
[0mworker has not exited, it is [33mundefined[39m.[0m

[0mThe boolean [34m[33mworker.exitedAfterDisconnect[39m[34m ([34m[4m#cluster_worker_exitedafterdisconnect[24m[39m[34m)[39m allows distinguishing between[0m
[0mvoluntary and accidental exit, the master may choose not to respawn a worker[0m
[0mbased on this value.[0m

    [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mworker[39m[32m,[39m [37mcode[39m[32m,[39m [37msignal[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mworker[39m[32m.[39m[37mexitedAfterDisconnect[39m [93m===[39m [91mtrue[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Oh, it was just voluntary – no need to worry'[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// kill worker[39m
    [37mworker[39m[32m.[39m[37mkill[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33mworker.id[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mEach new worker is given its own unique id, this id is stored in the[0m
[0m[33mid[39m.[0m

[0mWhile a worker is alive, this is the key that indexes it in[0m
[0m[33mcluster.workers[39m.[0m

[32m[1m### [33mworker.isConnected()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.14[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis function returns [33mtrue[39m if the worker is connected to its master via its[0m
[0mIPC channel, [33mfalse[39m otherwise. A worker is connected to its master after it[0m
[0mhas been created. It is disconnected after the [33m'disconnect'[39m event is emitted.[0m

[32m[1m### [33mworker.isDead()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.14[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis function returns [33mtrue[39m if the worker's process has terminated (either[0m
[0mbecause of exiting or being signaled). Otherwise, it returns [33mfalse[39m.[0m

    [94mconst[39m [37mcluster[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/cluster'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mnumCPUs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/os'[39m[90m)[39m[32m.[39m[37mcpus[39m[90m([39m[90m)[39m[32m.[39m[37mlength[39m[90m;[39m
    
    [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misMaster[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Master ${[37mprocess[39m[32m.[39m[37mpid[39m} is running`[90m)[39m[90m;[39m
    
      [90m// Fork workers.[39m
      [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [37mnumCPUs[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
        [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'fork'[39m[32m,[39m [90m([39m[37mworker[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'worker is dead:'[39m[32m,[39m [37mworker[39m[32m.[39m[37misDead[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mworker[39m[32m,[39m [37mcode[39m[32m,[39m [37msignal[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'worker is dead:'[39m[32m,[39m [37mworker[39m[32m.[39m[37misDead[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m [94melse[39m [33m{[39m
      [90m// Workers can share any TCP connection. In this case, it is an HTTP server.[39m
      [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[90m)[39m[90m;[39m
        [37mres[39m[32m.[39m[37mend[39m[90m([39m`Current process\n ${[37mprocess[39m[32m.[39m[37mpid[39m}`[90m)[39m[90m;[39m
        [37mprocess[39m[32m.[39m[37mkill[39m[90m([39m[37mprocess[39m[32m.[39m[37mpid[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m8000[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m### [33mworker.kill([signal='SIGTERM'])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.12[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msignal[39m {string} Name of the kill signal to send to the worker[0m
      [0mprocess.[0m

[0mThis function will kill the worker. In the master, it does this by disconnecting[0m
[0mthe [33mworker.process[39m, and once disconnected, killing with [33msignal[39m. In the[0m
[0mworker, it does it by disconnecting the channel, and then exiting with code [33m0[39m.[0m

[0mBecause [33mkill()[39m attempts to gracefully disconnect the worker process, it is[0m
[0msusceptible to waiting indefinitely for the disconnect to complete. For example,[0m
[0mif the worker enters an infinite loop, a graceful disconnect will never occur.[0m
[0mIf the graceful disconnect behavior is not needed, use [33mworker.process.kill()[39m.[0m

[0mCauses [33m.exitedAfterDisconnect[39m to be set.[0m

[0mThis method is aliased as [33mworker.destroy()[39m for backwards compatibility.[0m

[0mIn a worker, [33mprocess.kill()[39m exists, but it is not this function;[0m
[0mit is [34m[33mkill()[39m[34m ([34m[4mprocess.html#process_process_kill_pid_signal[24m[39m[34m)[39m.[0m

[32m[1m### [33mworker.process[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{ChildProcess}[0m

[0mAll workers are created using [34m[33mchild_process.fork()[39m[34m ([34m[4mchild_process.html#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m, the returned object[0m
[0mfrom this function is stored as [33m.process[39m. In a worker, the global [33mprocess[39m[0m
[0mis stored.[0m

[0mSee: [34mChild Process module ([34m[4mchild_process.html#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m.[0m

[0mWorkers will call [33mprocess.exit(0)[39m if the [33m'disconnect'[39m event occurs[0m
[0mon [33mprocess[39m and [33m.exitedAfterDisconnect[39m is not [33mtrue[39m. This protects against[0m
[0maccidental disconnection.[0m

[32m[1m### [33mworker.send(message[, sendHandle[, options]][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90mchanges:[39m
[90m  - version: v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2620[39m
[90m    description: The `callback` parameter is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmessage[39m {Object}[0m
    * [0m[33msendHandle[39m {Handle}[0m
    * [0m[33moptions[39m {Object} The [33moptions[39m argument, if present, is an object used to[0m
      [0mparameterize the sending of certain types of handles. [33moptions[39m supports[0m
      [0mthe following properties:
        * [0m[0m[33mkeepOpen[39m {boolean} A value that can be used when passing instances of[0m[0m[0m
      [0m      [0m[0m[33mnet.Socket[39m. When [33mtrue[39m, the socket is kept open in the sending process.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {boolean}[0m

[0mSend a message to a worker or master, optionally with a handle.[0m

[0mIn the master this sends a message to a specific worker. It is identical to[0m
[0m[34m[33mChildProcess.send()[39m[34m ([34m[4mchild_process.html#child_process_subprocess_send_message_sendhandle_options_callback[24m[39m[34m)[39m.[0m

[0mIn a worker this sends a message to the master. It is identical to[0m
[0m[33mprocess.send()[39m.[0m

[0mThis example will echo back all messages from the master:[0m

    [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misMaster[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mworker[39m [93m=[39m [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
      [37mworker[39m[32m.[39m[37msend[39m[90m([39m[92m'hi there'[39m[90m)[39m[90m;[39m
    
    [33m}[39m [94melse[39m [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misWorker[39m[90m)[39m [33m{[39m
      [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mmsg[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37msend[39m[90m([39m[37mmsg[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## Event: [33m'disconnect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mworker[39m {cluster.Worker}[0m

[0mEmitted after the worker IPC channel has disconnected. This can occur when a[0m
[0mworker exits gracefully, is killed, or is disconnected manually (such as with[0m
[0m[33mworker.disconnect()[39m).[0m

[0mThere may be a delay between the [33m'disconnect'[39m and [33m'exit'[39m events. These[0m
[0mevents can be used to detect if the process is stuck in a cleanup or if there[0m
[0mare long-living connections.[0m

    [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'disconnect'[39m[32m,[39m [90m([39m[37mworker[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`The worker #${[37mworker[39m[32m.[39m[37mid[39m} has disconnected`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Event: [33m'exit'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mworker[39m {cluster.Worker}[0m
    * [0m[33mcode[39m {number} The exit code, if it exited normally.[0m
    * [0m[33msignal[39m {string} The name of the signal (e.g. [33m'SIGHUP'[39m) that caused[0m
      [0mthe process to be killed.[0m

[0mWhen any of the workers die the cluster module will emit the [33m'exit'[39m event.[0m

[0mThis can be used to restart the worker by calling [34m[33m.fork()[39m[34m ([34m[4m#cluster_cluster_fork_env[24m[39m[34m)[39m again.[0m

    [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mworker[39m[32m,[39m [37mcode[39m[32m,[39m [37msignal[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'worker %d died (%s). restarting...'[39m[32m,[39m
                  [37mworker[39m[32m.[39m[37mprocess[39m[32m.[39m[37mpid[39m[32m,[39m [37msignal[39m [93m||[39m [37mcode[39m[90m)[39m[90m;[39m
      [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mSee [34m[33mchild_process[39m[34m event: [33m'exit'[39m[34m ([34m[4mchild_process.html#child_process_event_exit[24m[39m[34m)[39m.[0m

[32m[1m## Event: [33m'fork'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mworker[39m {cluster.Worker}[0m

[0mWhen a new worker is forked the cluster module will emit a [33m'fork'[39m event.[0m
[0mThis can be used to log worker activity, and create a custom timeout.[0m

    [94mconst[39m [37mtimeouts[39m [93m=[39m [33m[[39m[33m][39m[90m;[39m
    [94mfunction[39m [37merrorMsg[39m[90m([39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'Something must be wrong with the connection ...'[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'fork'[39m[32m,[39m [90m([39m[37mworker[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mtimeouts[39m[33m[[39m[37mworker[39m[32m.[39m[37mid[39m[33m][39m [93m=[39m [37msetTimeout[39m[90m([39m[37merrorMsg[39m[32m,[39m [34m2000[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'listening'[39m[32m,[39m [90m([39m[37mworker[39m[32m,[39m [37maddress[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mclearTimeout[39m[90m([39m[37mtimeouts[39m[33m[[39m[37mworker[39m[32m.[39m[37mid[39m[33m][39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mworker[39m[32m,[39m [37mcode[39m[32m,[39m [37msignal[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mclearTimeout[39m[90m([39m[37mtimeouts[39m[33m[[39m[37mworker[39m[32m.[39m[37mid[39m[33m][39m[90m)[39m[90m;[39m
      [37merrorMsg[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Event: [33m'listening'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mworker[39m {cluster.Worker}[0m
    * [0m[33maddress[39m {Object}[0m

[0mAfter calling [33mlisten()[39m from a worker, when the [33m'listening'[39m event is emitted[0m
[0mon the server a [33m'listening'[39m event will also be emitted on [33mcluster[39m in the[0m
[0mmaster.[0m

[0mThe event handler is executed with two arguments, the [33mworker[39m contains the[0m
[0mworker object and the [33maddress[39m object contains the following connection[0m
[0mproperties: [33maddress[39m, [33mport[39m and [33maddressType[39m. This is very useful if the[0m
[0mworker is listening on more than one address.[0m

    [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'listening'[39m[32m,[39m [90m([39m[37mworker[39m[32m,[39m [37maddress[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m
        `A worker is now connected to ${[37maddress[39m[32m.[39m[37maddress[39m}:${[37maddress[39m[32m.[39m[37mport[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33maddressType[39m is one of:[0m

    * [0m[33m4[39m (TCPv4)[0m
    * [0m[33m6[39m (TCPv6)[0m
    * [0m[33m-1[39m (Unix domain socket)[0m
    * [0m[33m'udp4'[39m or [33m'udp6'[39m (UDP v4 or v6)[0m

[32m[1m## Event: [33m'message'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v2.5.0[39m
[90mchanges:[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5361[39m
[90m    description: The `worker` parameter is passed now; see below for details.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mworker[39m {cluster.Worker}[0m
    * [0m[33mmessage[39m {Object}[0m
    * [0m[33mhandle[39m {undefined|Object}[0m

[0mEmitted when the cluster master receives a message from any worker.[0m

[0mSee [34m[33mchild_process[39m[34m event: [33m'message'[39m[34m ([34m[4mchild_process.html#child_process_event_message[24m[39m[34m)[39m.[0m

[32m[1m## Event: [33m'online'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mworker[39m {cluster.Worker}[0m

[0mAfter forking a new worker, the worker should respond with an online message.[0m
[0mWhen the master receives an online message it will emit this event.[0m
[0mThe difference between [33m'fork'[39m and [33m'online'[39m is that fork is emitted when the[0m
[0mmaster forks a worker, and [33m'online'[39m is emitted when the worker is running.[0m

    [37mcluster[39m[32m.[39m[37mon[39m[90m([39m[92m'online'[39m[32m,[39m [90m([39m[37mworker[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Yay, the worker responded after it was forked'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Event: [33m'setup'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msettings[39m {Object}[0m

[0mEmitted every time [34m[33m.setupMaster()[39m[34m ([34m[4m#cluster_cluster_setupmaster_settings[24m[39m[34m)[39m is called.[0m

[0mThe [33msettings[39m object is the [33mcluster.settings[39m object at the time[0m
[0m[34m[33m.setupMaster()[39m[34m ([34m[4m#cluster_cluster_setupmaster_settings[24m[39m[34m)[39m was called and is advisory only, since multiple calls to[0m
[0m[34m[33m.setupMaster()[39m[34m ([34m[4m#cluster_cluster_setupmaster_settings[24m[39m[34m)[39m can be made in a single tick.[0m

[0mIf accuracy is important, use [33mcluster.settings[39m.[0m

[32m[1m## [33mcluster.disconnect([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} Called when all workers are disconnected and handles are[0m
      [0mclosed.[0m

[0mCalls [33m.disconnect()[39m on each worker in [33mcluster.workers[39m.[0m

[0mWhen they are disconnected all internal handles will be closed, allowing the[0m
[0mmaster process to die gracefully if no other event is waiting.[0m

[0mThe method takes an optional callback argument which will be called when[0m
[0mfinished.[0m

[0mThis can only be called from the master process.[0m

[32m[1m## [33mcluster.fork([env])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33menv[39m {Object} Key/value pairs to add to worker process environment.[0m
    * [0mReturns: {cluster.Worker}[0m

[0mSpawn a new worker process.[0m

[0mThis can only be called from the master process.[0m

[32m[1m## [33mcluster.isMaster[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mTrue if the process is a master. This is determined[0m
[0mby the [33mprocess.env.NODE_UNIQUE_ID[39m. If [33mprocess.env.NODE_UNIQUE_ID[39m is[0m
[0mundefined, then [33misMaster[39m is [33mtrue[39m.[0m

[32m[1m## [33mcluster.isWorker[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mTrue if the process is not a master (it is the negation of [33mcluster.isMaster[39m).[0m

[32m[1m## [33mcluster.schedulingPolicy[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe scheduling policy, either [33mcluster.SCHED_RR[39m for round-robin or[0m
[0m[33mcluster.SCHED_NONE[39m to leave it to the operating system. This is a[0m
[0mglobal setting and effectively frozen once either the first worker is spawned,[0m
[0mor [34m[33m.setupMaster()[39m[34m ([34m[4m#cluster_cluster_setupmaster_settings[24m[39m[34m)[39m is called, whichever comes first.[0m

[0m[33mSCHED_RR[39m is the default on all operating systems except Windows.[0m
[0mWindows will change to [33mSCHED_RR[39m once libuv is able to effectively[0m
[0mdistribute IOCP handles without incurring a large performance hit.[0m

[0m[33mcluster.schedulingPolicy[39m can also be set through the[0m
[0m[33mNODE_CLUSTER_SCHED_POLICY[39m environment variable. Valid[0m
[0mvalues are [33m'rr'[39m and [33m'none'[39m.[0m

[32m[1m## [33mcluster.settings[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.1[39m
[90mchanges:[39m
[90m  - version: v13.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30162[39m
[90m    description: The `serialization` option is supported now.[39m
[90m  - version: v9.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18399[39m
[90m    description: The `cwd` option is supported now.[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17412[39m
[90m    description: The `windowsHide` option is supported now.[39m
[90m  - version: v8.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14140[39m
[90m    description: The `inspectPort` option is supported now.[39m
[90m  - version: v6.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7838[39m
[90m    description: The `stdio` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}
        * [0m[0m[33mexecArgv[39m {string[]} List of string arguments passed to the Node.js[0m[0m[0m
      [0m      [0m[0mexecutable. [1mDefault:[22m [33mprocess.execArgv[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mexec[39m {string} File path to worker file. [1mDefault:[22m [33mprocess.argv[1][39m.[0m[0m[0m
      [0m
        * [0m[0m[33margs[39m {string[]} String arguments passed to worker.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mprocess.argv.slice(2)[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mcwd[39m {string} Current working directory of the worker process. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mundefined[39m (inherits from parent process).[0m[0m[0m
      [0m
        * [0m[0m[33mserialization[39m {string} Specify the kind of serialization used for sending[0m[0m[0m
      [0m      [0m[0mmessages between processes. Possible values are [33m'json'[39m and [33m'advanced'[39m.[0m[0m[0m
      [0m      [0m[0mSee [34mAdvanced Serialization for [33mchild_process[39m[34m ([34m[4mchild_process.html#child_process_advanced_serialization[24m[39m[34m)[39m for more details.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msilent[39m {boolean} Whether or not to send output to parent's stdio.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mstdio[39m {Array} Configures the stdio of forked processes. Because the[0m[0m[0m
      [0m      [0m[0mcluster module relies on IPC to function, this configuration must contain an[0m[0m[0m
      [0m      [0m[0m[33m'ipc'[39m entry. When this option is provided, it overrides [33msilent[39m.[0m[0m[0m
      [0m
        * [0m[0m[33muid[39m {number} Sets the user identity of the process. (See setuid(2).)[0m[0m[0m
      [0m
        * [0m[0m[33mgid[39m {number} Sets the group identity of the process. (See setgid(2).)[0m[0m[0m
      [0m
        * [0m[0m[33minspectPort[39m {number|Function} Sets inspector port of worker.[0m[0m[0m
      [0m      [0m[0mThis can be a number, or a function that takes no arguments and returns a[0m[0m[0m
      [0m      [0m[0mnumber. By default each worker gets its own port, incremented from the[0m[0m[0m
      [0m      [0m[0mmaster's [33mprocess.debugPort[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsHide[39m {boolean} Hide the forked processes console window that would[0m[0m[0m
      [0m      [0m[0mnormally be created on Windows systems. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m

[0mAfter calling [34m[33m.setupMaster()[39m[34m ([34m[4m#cluster_cluster_setupmaster_settings[24m[39m[34m)[39m (or [34m[33m.fork()[39m[34m ([34m[4m#cluster_cluster_fork_env[24m[39m[34m)[39m) this settings object will[0m
[0mcontain the settings, including the default values.[0m

[0mThis object is not intended to be changed or set manually.[0m

[32m[1m## [33mcluster.setupMaster([settings])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.1[39m
[90mchanges:[39m
[90m  - version: v6.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7838[39m
[90m    description: The `stdio` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msettings[39m {Object} See [34m[33mcluster.settings[39m[34m ([34m[4m#cluster_cluster_settings[24m[39m[34m)[39m.[0m

[0m[33msetupMaster[39m is used to change the default 'fork' behavior. Once called,[0m
[0mthe settings will be present in [33mcluster.settings[39m.[0m

[0mAny settings changes only affect future calls to [34m[33m.fork()[39m[34m ([34m[4m#cluster_cluster_fork_env[24m[39m[34m)[39m and have no[0m
[0meffect on workers that are already running.[0m

[0mThe only attribute of a worker that cannot be set via [33m.setupMaster()[39m is[0m
[0mthe [33menv[39m passed to [34m[33m.fork()[39m[34m ([34m[4m#cluster_cluster_fork_env[24m[39m[34m)[39m.[0m

[0mThe defaults above apply to the first call only; the defaults for later[0m
[0mcalls are the current values at the time of [33mcluster.setupMaster()[39m is called.[0m

    [94mconst[39m [37mcluster[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/cluster'[39m[90m)[39m[90m;[39m
    [37mcluster[39m[32m.[39m[37msetupMaster[39m[90m([39m[33m{[39m
      [37mexec[39m[93m:[39m [92m'worker.js'[39m[32m,[39m
      [37margs[39m[93m:[39m [33m[[39m[92m'--use'[39m[32m,[39m [92m'https'[39m[33m][39m[32m,[39m
      [37msilent[39m[93m:[39m [91mtrue[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m [90m// https worker[39m
    [37mcluster[39m[32m.[39m[37msetupMaster[39m[90m([39m[33m{[39m
      [37mexec[39m[93m:[39m [92m'worker.js'[39m[32m,[39m
      [37margs[39m[93m:[39m [33m[[39m[92m'--use'[39m[32m,[39m [92m'http'[39m[33m][39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m [90m// http worker[39m

[0mThis can only be called from the master process.[0m

[32m[1m## [33mcluster.worker[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mA reference to the current worker object. Not available in the master process.[0m

    [94mconst[39m [37mcluster[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/cluster'[39m[90m)[39m[90m;[39m
    
    [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misMaster[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'I am master'[39m[90m)[39m[90m;[39m
      [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
      [37mcluster[39m[32m.[39m[37mfork[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m [94melse[39m [94mif[39m [90m([39m[37mcluster[39m[32m.[39m[37misWorker[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`I am worker #${[37mcluster[39m[32m.[39m[37mworker[39m[32m.[39m[37mid[39m}`[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## [33mcluster.workers[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mA hash that stores the active worker objects, keyed by [33mid[39m field. Makes it[0m
[0measy to loop through all the workers. It is only available in the master[0m
[0mprocess.[0m

[0mA worker is removed from [33mcluster.workers[39m after the worker has disconnected[0m
[0m[3mand[23m exited. The order between these two events cannot be determined in[0m
[0madvance. However, it is guaranteed that the removal from the [33mcluster.workers[39m[0m
[0mlist happens before last [33m'disconnect'[39m or [33m'exit'[39m event is emitted.[0m

    [90m// Go through all workers[39m
    [94mfunction[39m [37meachWorker[39m[90m([39m[37mcallback[39m[90m)[39m [33m{[39m
      [94mfor[39m [90m([39m[94mconst[39m [37mid[39m [94min[39m [37mcluster[39m[32m.[39m[37mworkers[39m[90m)[39m [33m{[39m
        [37mcallback[39m[90m([39m[37mcluster[39m[32m.[39m[37mworkers[39m[33m[[39m[37mid[39m[33m][39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    [37meachWorker[39m[90m([39m[90m([39m[37mworker[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mworker[39m[32m.[39m[37msend[39m[90m([39m[92m'big announcement to all workers'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mUsing the worker's unique id is the easiest way to locate the worker.[0m

    [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mid[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mworker[39m [93m=[39m [37mcluster[39m[32m.[39m[37mworkers[39m[33m[[39m[37mid[39m[33m][39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

