[35m[4m[1m# Diagnostic Report[22m[24m[39m

[90m<!--introduced_in=v11.8.0-->[39m
[90m[39m[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[90m<!-- name=report -->[39m
[90m[39m
[90m[39m[0mDelivers a JSON-formatted diagnostic summary, written to a file.[0m

[0mThe report is intended for development, test and production use, to capture[0m
[0mand preserve information for problem determination. It includes JavaScript[0m
[0mand native stack traces, heap statistics, platform information, resource[0m
[0musage etc. With the report option enabled, diagnostic reports can be triggered[0m
[0mon unhandled exceptions, fatal errors and user signals, in addition to[0m
[0mtriggering programmatically through API calls.[0m

[0mA complete example report that was generated on an uncaught exception[0m
[0mis provided below for reference.[0m

    [33m{[39m
    [33m  "header": {[39m
    [33m    "reportVersion": 1,[39m
    [33m    "event": "exception",[39m
    [33m    "trigger": "Exception",[39m
    [33m    "filename": "report.20181221.005011.8974.0.001.json",[39m
    [33m    "dumpEventTime": "2018-12-21T00:50:11Z",[39m
    [33m    "dumpEventTimeStamp": "1545371411331",[39m
    [33m    "processId": 8974,[39m
    [33m    "cwd": "/home/nodeuser/project/node",[39m
    [33m    "commandLine": [[39m
    [33m      "/home/nodeuser/project/node/out/Release/node",[39m
    [33m      "--report-uncaught-exception",[39m
    [33m      "/home/nodeuser/project/node/test/report/test-exception.js",[39m
    [33m      "child"[39m
    [33m    ],[39m
    [33m    "nodejsVersion": "v12.0.0-pre",[39m
    [33m    "glibcVersionRuntime": "2.17",[39m
    [33m    "glibcVersionCompiler": "2.17",[39m
    [33m    "wordSize": "64 bit",[39m
    [33m    "arch": "x64",[39m
    [33m    "platform": "linux",[39m
    [33m    "componentVersions": {[39m
    [33m      "node": "12.0.0-pre",[39m
    [33m      "v8": "7.1.302.28-node.5",[39m
    [33m      "uv": "1.24.1",[39m
    [33m      "zlib": "1.2.11",[39m
    [33m      "ares": "1.15.0",[39m
    [33m      "modules": "68",[39m
    [33m      "nghttp2": "1.34.0",[39m
    [33m      "napi": "3",[39m
    [33m      "llhttp": "1.0.1",[39m
    [33m      "openssl": "1.1.0j"[39m
    [33m    },[39m
    [33m    "release": {[39m
    [33m      "name": "node"[39m
    [33m    },[39m
    [33m    "osName": "Linux",[39m
    [33m    "osRelease": "3.10.0-862.el7.x86_64",[39m
    [33m    "osVersion": "#1 SMP Wed Mar 21 18:14:51 EDT 2018",[39m
    [33m    "osMachine": "x86_64",[39m
    [33m    "cpus": [[39m
    [33m      {[39m
    [33m        "model": "Intel(R) Core(TM) i7-6820HQ CPU @ 2.70GHz",[39m
    [33m        "speed": 2700,[39m
    [33m        "user": 88902660,[39m
    [33m        "nice": 0,[39m
    [33m        "sys": 50902570,[39m
    [33m        "idle": 241732220,[39m
    [33m        "irq": 0[39m
    [33m      },[39m
    [33m      {[39m
    [33m        "model": "Intel(R) Core(TM) i7-6820HQ CPU @ 2.70GHz",[39m
    [33m        "speed": 2700,[39m
    [33m        "user": 88902660,[39m
    [33m        "nice": 0,[39m
    [33m        "sys": 50902570,[39m
    [33m        "idle": 241732220,[39m
    [33m        "irq": 0[39m
    [33m      }[39m
    [33m    ],[39m
    [33m    "networkInterfaces": [[39m
    [33m      {[39m
    [33m        "name": "en0",[39m
    [33m        "internal": false,[39m
    [33m        "mac": "13:10:de:ad:be:ef",[39m
    [33m        "address": "10.0.0.37",[39m
    [33m        "netmask": "255.255.255.0",[39m
    [33m        "family": "IPv4"[39m
    [33m      }[39m
    [33m    ],[39m
    [33m    "host": "test_machine"[39m
    [33m  },[39m
    [33m  "javascriptStack": {[39m
    [33m    "message": "Error: *** test-exception.js: throwing uncaught Error",[39m
    [33m    "stack": [[39m
    [33m      "at myException (/home/nodeuser/project/node/test/report/test-exception.js:9:11)",[39m
    [33m      "at Object.<anonymous> (/home/nodeuser/project/node/test/report/test-exception.js:12:3)",[39m
    [33m      "at Module._compile (internal/modules/cjs/loader.js:718:30)",[39m
    [33m      "at Object.Module._extensions..js (internal/modules/cjs/loader.js:729:10)",[39m
    [33m      "at Module.load (internal/modules/cjs/loader.js:617:32)",[39m
    [33m      "at tryModuleLoad (internal/modules/cjs/loader.js:560:12)",[39m
    [33m      "at Function.Module._load (internal/modules/cjs/loader.js:552:3)",[39m
    [33m      "at Function.Module.runMain (internal/modules/cjs/loader.js:771:12)",[39m
    [33m      "at executeUserCode (internal/bootstrap/node.js:332:15)"[39m
    [33m    ][39m
    [33m  },[39m
    [33m  "nativeStack": [[39m
    [33m    {[39m
    [33m      "pc": "0x000055b57f07a9ef",[39m
    [33m      "symbol": "report::GetNodeReport(v8::Isolate*, node::Environment*, char const*, char const*, v8::Local<v8::String>, std::ostream&) [./node]"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "pc": "0x000055b57f07cf03",[39m
    [33m      "symbol": "report::GetReport(v8::FunctionCallbackInfo<v8::Value> const&) [./node]"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "pc": "0x000055b57f1bccfd",[39m
    [33m      "symbol": " [./node]"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "pc": "0x000055b57f1be048",[39m
    [33m      "symbol": "v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*) [./node]"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "pc": "0x000055b57feeda0e",[39m
    [33m      "symbol": " [./node]"[39m
    [33m    }[39m
    [33m  ],[39m
    [33m  "javascriptHeap": {[39m
    [33m    "totalMemory": 6127616,[39m
    [33m    "totalCommittedMemory": 4357352,[39m
    [33m    "usedMemory": 3221136,[39m
    [33m    "availableMemory": 1521370240,[39m
    [33m    "memoryLimit": 1526909922,[39m
    [33m    "heapSpaces": {[39m
    [33m      "read_only_space": {[39m
    [33m        "memorySize": 524288,[39m
    [33m        "committedMemory": 39208,[39m
    [33m        "capacity": 515584,[39m
    [33m        "used": 30504,[39m
    [33m        "available": 485080[39m
    [33m      },[39m
    [33m      "new_space": {[39m
    [33m        "memorySize": 2097152,[39m
    [33m        "committedMemory": 2019312,[39m
    [33m        "capacity": 1031168,[39m
    [33m        "used": 985496,[39m
    [33m        "available": 45672[39m
    [33m      },[39m
    [33m      "old_space": {[39m
    [33m        "memorySize": 2273280,[39m
    [33m        "committedMemory": 1769008,[39m
    [33m        "capacity": 1974640,[39m
    [33m        "used": 1725488,[39m
    [33m        "available": 249152[39m
    [33m      },[39m
    [33m      "code_space": {[39m
    [33m        "memorySize": 696320,[39m
    [33m        "committedMemory": 184896,[39m
    [33m        "capacity": 152128,[39m
    [33m        "used": 152128,[39m
    [33m        "available": 0[39m
    [33m      },[39m
    [33m      "map_space": {[39m
    [33m        "memorySize": 536576,[39m
    [33m        "committedMemory": 344928,[39m
    [33m        "capacity": 327520,[39m
    [33m        "used": 327520,[39m
    [33m        "available": 0[39m
    [33m      },[39m
    [33m      "large_object_space": {[39m
    [33m        "memorySize": 0,[39m
    [33m        "committedMemory": 0,[39m
    [33m        "capacity": 1520590336,[39m
    [33m        "used": 0,[39m
    [33m        "available": 1520590336[39m
    [33m      },[39m
    [33m      "new_large_object_space": {[39m
    [33m        "memorySize": 0,[39m
    [33m        "committedMemory": 0,[39m
    [33m        "capacity": 0,[39m
    [33m        "used": 0,[39m
    [33m        "available": 0[39m
    [33m      }[39m
    [33m    }[39m
    [33m  },[39m
    [33m  "resourceUsage": {[39m
    [33m    "userCpuSeconds": 0.069595,[39m
    [33m    "kernelCpuSeconds": 0.019163,[39m
    [33m    "cpuConsumptionPercent": 0.000000,[39m
    [33m    "maxRss": 18079744,[39m
    [33m    "pageFaults": {[39m
    [33m      "IORequired": 0,[39m
    [33m      "IONotRequired": 4610[39m
    [33m    },[39m
    [33m    "fsActivity": {[39m
    [33m      "reads": 0,[39m
    [33m      "writes": 0[39m
    [33m    }[39m
    [33m  },[39m
    [33m  "uvthreadResourceUsage": {[39m
    [33m    "userCpuSeconds": 0.068457,[39m
    [33m    "kernelCpuSeconds": 0.019127,[39m
    [33m    "cpuConsumptionPercent": 0.000000,[39m
    [33m    "fsActivity": {[39m
    [33m      "reads": 0,[39m
    [33m      "writes": 0[39m
    [33m    }[39m
    [33m  },[39m
    [33m  "libuv": [[39m
    [33m    {[39m
    [33m      "type": "async",[39m
    [33m      "is_active": true,[39m
    [33m      "is_referenced": false,[39m
    [33m      "address": "0x0000000102910900",[39m
    [33m      "details": ""[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "timer",[39m
    [33m      "is_active": false,[39m
    [33m      "is_referenced": false,[39m
    [33m      "address": "0x00007fff5fbfeab0",[39m
    [33m      "repeat": 0,[39m
    [33m      "firesInMsFromNow": 94403548320796,[39m
    [33m      "expired": true[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "check",[39m
    [33m      "is_active": true,[39m
    [33m      "is_referenced": false,[39m
    [33m      "address": "0x00007fff5fbfeb48"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "idle",[39m
    [33m      "is_active": false,[39m
    [33m      "is_referenced": true,[39m
    [33m      "address": "0x00007fff5fbfebc0"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "prepare",[39m
    [33m      "is_active": false,[39m
    [33m      "is_referenced": false,[39m
    [33m      "address": "0x00007fff5fbfec38"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "check",[39m
    [33m      "is_active": false,[39m
    [33m      "is_referenced": false,[39m
    [33m      "address": "0x00007fff5fbfecb0"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "async",[39m
    [33m      "is_active": true,[39m
    [33m      "is_referenced": false,[39m
    [33m      "address": "0x000000010188f2e0"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "tty",[39m
    [33m      "is_active": false,[39m
    [33m      "is_referenced": true,[39m
    [33m      "address": "0x000055b581db0e18",[39m
    [33m      "width": 204,[39m
    [33m      "height": 55,[39m
    [33m      "fd": 17,[39m
    [33m      "writeQueueSize": 0,[39m
    [33m      "readable": true,[39m
    [33m      "writable": true[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "signal",[39m
    [33m      "is_active": true,[39m
    [33m      "is_referenced": false,[39m
    [33m      "address": "0x000055b581d80010",[39m
    [33m      "signum": 28,[39m
    [33m      "signal": "SIGWINCH"[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "tty",[39m
    [33m      "is_active": true,[39m
    [33m      "is_referenced": true,[39m
    [33m      "address": "0x000055b581df59f8",[39m
    [33m      "width": 204,[39m
    [33m      "height": 55,[39m
    [33m      "fd": 19,[39m
    [33m      "writeQueueSize": 0,[39m
    [33m      "readable": true,[39m
    [33m      "writable": true[39m
    [33m    },[39m
    [33m    {[39m
    [33m      "type": "loop",[39m
    [33m      "is_active": true,[39m
    [33m      "address": "0x000055fc7b2cb180"[39m
    [33m    }[39m
    [33m  ],[39m
    [33m  "workers": [],[39m
    [33m  "environmentVariables": {[39m
    [33m    "REMOTEHOST": "REMOVED",[39m
    [33m    "MANPATH": "/opt/rh/devtoolset-3/root/usr/share/man:",[39m
    [33m    "XDG_SESSION_ID": "66126",[39m
    [33m    "HOSTNAME": "test_machine",[39m
    [33m    "HOST": "test_machine",[39m
    [33m    "TERM": "xterm-256color",[39m
    [33m    "SHELL": "/bin/csh",[39m
    [33m    "SSH_CLIENT": "REMOVED",[39m
    [33m    "PERL5LIB": "/opt/rh/devtoolset-3/root//usr/lib64/perl5/vendor_perl:/opt/rh/devtoolset-3/root/usr/lib/perl5:/opt/rh/devtoolset-3/root//usr/share/perl5/vendor_perl",[39m
    [33m    "OLDPWD": "/home/nodeuser/project/node/src",[39m
    [33m    "JAVACONFDIRS": "/opt/rh/devtoolset-3/root/etc/java:/etc/java",[39m
    [33m    "SSH_TTY": "/dev/pts/0",[39m
    [33m    "PCP_DIR": "/opt/rh/devtoolset-3/root",[39m
    [33m    "GROUP": "normaluser",[39m
    [33m    "USER": "nodeuser",[39m
    [33m    "LD_LIBRARY_PATH": "/opt/rh/devtoolset-3/root/usr/lib64:/opt/rh/devtoolset-3/root/usr/lib",[39m
    [33m    "HOSTTYPE": "x86_64-linux",[39m
    [33m    "XDG_CONFIG_DIRS": "/opt/rh/devtoolset-3/root/etc/xdg:/etc/xdg",[39m
    [33m    "MAIL": "/var/spool/mail/nodeuser",[39m
    [33m    "PATH": "/home/nodeuser/project/node:/opt/rh/devtoolset-3/root/usr/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin",[39m
    [33m    "PWD": "/home/nodeuser/project/node",[39m
    [33m    "LANG": "en_US.UTF-8",[39m
    [33m    "PS1": "\\u@\\h : \\[\\e[31m\\]\\w\\[\\e[m\\] >  ",[39m
    [33m    "SHLVL": "2",[39m
    [33m    "HOME": "/home/nodeuser",[39m
    [33m    "OSTYPE": "linux",[39m
    [33m    "VENDOR": "unknown",[39m
    [33m    "PYTHONPATH": "/opt/rh/devtoolset-3/root/usr/lib64/python2.7/site-packages:/opt/rh/devtoolset-3/root/usr/lib/python2.7/site-packages",[39m
    [33m    "MACHTYPE": "x86_64",[39m
    [33m    "LOGNAME": "nodeuser",[39m
    [33m    "XDG_DATA_DIRS": "/opt/rh/devtoolset-3/root/usr/share:/usr/local/share:/usr/share",[39m
    [33m    "LESSOPEN": "||/usr/bin/lesspipe.sh %s",[39m
    [33m    "INFOPATH": "/opt/rh/devtoolset-3/root/usr/share/info",[39m
    [33m    "XDG_RUNTIME_DIR": "/run/user/50141",[39m
    [33m    "_": "./node"[39m
    [33m  },[39m
    [33m  "userLimits": {[39m
    [33m    "core_file_size_blocks": {[39m
    [33m      "soft": "",[39m
    [33m      "hard": "unlimited"[39m
    [33m    },[39m
    [33m    "data_seg_size_kbytes": {[39m
    [33m      "soft": "unlimited",[39m
    [33m      "hard": "unlimited"[39m
    [33m    },[39m
    [33m    "file_size_blocks": {[39m
    [33m      "soft": "unlimited",[39m
    [33m      "hard": "unlimited"[39m
    [33m    },[39m
    [33m    "max_locked_memory_bytes": {[39m
    [33m      "soft": "unlimited",[39m
    [33m      "hard": 65536[39m
    [33m    },[39m
    [33m    "max_memory_size_kbytes": {[39m
    [33m      "soft": "unlimited",[39m
    [33m      "hard": "unlimited"[39m
    [33m    },[39m
    [33m    "open_files": {[39m
    [33m      "soft": "unlimited",[39m
    [33m      "hard": 4096[39m
    [33m    },[39m
    [33m    "stack_size_bytes": {[39m
    [33m      "soft": "unlimited",[39m
    [33m      "hard": "unlimited"[39m
    [33m    },[39m
    [33m    "cpu_time_seconds": {[39m
    [33m      "soft": "unlimited",[39m
    [33m      "hard": "unlimited"[39m
    [33m    },[39m
    [33m    "max_user_processes": {[39m
    [33m      "soft": "unlimited",[39m
    [33m      "hard": 4127290[39m
    [33m    },[39m
    [33m    "virtual_memory_kbytes": {[39m
    [33m      "soft": "unlimited",[39m
    [33m      "hard": "unlimited"[39m
    [33m    }[39m
    [33m  },[39m
    [33m  "sharedObjects": [[39m
    [33m    "/lib64/libdl.so.2",[39m
    [33m    "/lib64/librt.so.1",[39m
    [33m    "/lib64/libstdc++.so.6",[39m
    [33m    "/lib64/libm.so.6",[39m
    [33m    "/lib64/libgcc_s.so.1",[39m
    [33m    "/lib64/libpthread.so.0",[39m
    [33m    "/lib64/libc.so.6",[39m
    [33m    "/lib64/ld-linux-x86-64.so.2"[39m
    [33m  ][39m
    [33m}[39m

[32m[1m## Usage[22m[39m

    [33mnode --report-uncaught-exception --report-on-signal \[39m
    [33m--report-on-fatalerror app.js[39m

    * [0m[0m[0m[33m--report-uncaught-exception[39m Enables report to be generated on[0m[0m[0m
      [0m[0m[0mun-caught exceptions. Useful when inspecting JavaScript stack in conjunction[0m[0m[0m
      [0m[0m[0mwith native stack and other runtime environment data.[0m[0m[0m
    * [0m[0m[0m[33m--report-on-signal[39m Enables report to be generated upon receiving[0m[0m[0m
      [0m[0m[0mthe specified (or predefined) signal to the running Node.js process. (See below[0m[0m[0m
      [0m[0m[0mon how to modify the signal that triggers the report.) Default signal is [33mSIGUSR2[39m.[0m[0m[0m
      [0m[0m[0mUseful when a report needs to be triggered from another program.[0m[0m[0m
      [0m[0m[0mApplication monitors may leverage this feature to collect report at regular[0m[0m[0m
      [0m[0m[0mintervals and plot rich set of internal runtime data to their views.[0m[0m[0m

[0mSignal based report generation is not supported in Windows.[0m

[0mUnder normal circumstances, there is no need to modify the report triggering[0m
[0msignal. However, if [33mSIGUSR2[39m is already used for other purposes, then this[0m
[0mflag helps to change the signal for report generation and preserve the original[0m
[0mmeaning of [33mSIGUSR2[39m for the said purposes.[0m

    * [0m[0m[0m[33m--report-on-fatalerror[39m Enables the report to be triggered on[0m[0m[0m
      [0m[0m[0mfatal errors (internal errors within the Node.js runtime, such as out of memory)[0m[0m[0m
      [0m[0m[0mthat leads to termination of the application. Useful to inspect various[0m[0m[0m
      [0m[0m[0mdiagnostic data elements such as heap, stack, event loop state, resource[0m[0m[0m
      [0m[0m[0mconsumption etc. to reason about the fatal error.[0m[0m[0m
    * [0m[0m[0m[33m--report-compact[39m Write reports in a compact format, single-line JSON, more[0m[0m[0m
      [0m[0m[0measily consumable by log processing systems than the default multi-line format[0m[0m[0m
      [0m[0m[0mdesigned for human consumption.[0m[0m[0m
    * [0m[0m[0m[33m--report-directory[39m Location at which the report will be[0m[0m[0m
      [0m[0m[0mgenerated.[0m[0m[0m
    * [0m[0m[0m[33m--report-filename[39m Name of the file to which the report will be[0m[0m[0m
      [0m[0m[0mwritten.[0m[0m[0m
    * [0m[0m[0m[33m--report-signal[39m Sets or resets the signal for report generation[0m[0m[0m
      [0m[0m[0m(not supported on Windows). Default signal is [33mSIGUSR2[39m.[0m[0m[0m

[0mA report can also be triggered via an API call from a JavaScript application:[0m

    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mwriteReport[39m[90m([39m[90m)[39m[90m;[39m

[0mThis function takes an optional additional argument [33mfilename[39m, which is[0m
[0mthe name of a file into which the report is written.[0m

    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mwriteReport[39m[90m([39m[92m'./foo.json'[39m[90m)[39m[90m;[39m

[0mThis function takes an optional additional argument [33merr[39m which is an [33mError[39m[0m
[0mobject that will be used as the context for the JavaScript stack printed in the[0m
[0mreport. When using report to handle errors in a callback or an exception[0m
[0mhandler, this allows the report to include the location of the original error as[0m
[0mwell as where it was handled.[0m

    [36mtry[39m [33m{[39m
      [37mprocess[39m[32m.[39m[37mchdir[39m[90m([39m[92m'/non-existent-path'[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mwriteReport[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
    [33m}[39m
    [90m// Any other code[39m

[0mIf both filename and error object are passed to [33mwriteReport()[39m the[0m
[0merror object must be the second parameter.[0m

    [36mtry[39m [33m{[39m
      [37mprocess[39m[32m.[39m[37mchdir[39m[90m([39m[92m'/non-existent-path'[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mwriteReport[39m[90m([39m[37mfilename[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
    [33m}[39m
    [90m// Any other code[39m

[0mThe content of the diagnostic report can be returned as a JavaScript Object[0m
[0mvia an API call from a JavaScript application:[0m

    [94mconst[39m [37mreport[39m [93m=[39m [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mgetReport[39m[90m([39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[94mtypeof[39m [37mreport[39m [93m===[39m [92m'object'[39m[90m)[39m[90m;[39m [90m// true[39m
    
    [90m// Similar to process.report.writeReport() output[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37mreport[39m[32m,[39m [90mnull[39m[32m,[39m [34m2[39m[90m)[39m[90m)[39m[90m;[39m

[0mThis function takes an optional additional argument [33merr[39m, which is an [33mError[39m[0m
[0mobject that will be used as the context for the JavaScript stack printed in the[0m
[0mreport.[0m

    [94mconst[39m [37mreport[39m [93m=[39m [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mgetReport[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'custom error'[39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[94mtypeof[39m [37mreport[39m [93m===[39m [92m'object'[39m[90m)[39m[90m;[39m [90m// true[39m

[0mThe API versions are useful when inspecting the runtime state from within[0m
[0mthe application, in expectation of self-adjusting the resource consumption,[0m
[0mload balancing, monitoring etc.[0m

[0mThe content of the report consists of a header section containing the event[0m
[0mtype, date, time, PID and Node.js version, sections containing JavaScript and[0m
[0mnative stack traces, a section containing V8 heap information, a section[0m
[0mcontaining [33mlibuv[39m handle information and an OS platform information section[0m
[0mshowing CPU and memory usage and system limits. An example report can be[0m
[0mtriggered using the Node.js REPL:[0m

    [33m$ node[39m
    [33m> process.report.writeReport();[39m
    [33mWriting Node.js report to file: report.20181126.091102.8480.0.001.json[39m
    [33mNode.js report completed[39m
    [33m>[39m

[0mWhen a report is written, start and end messages are issued to stderr[0m
[0mand the filename of the report is returned to the caller. The default filename[0m
[0mincludes the date, time, PID and a sequence number. The sequence number helps[0m
[0min associating the report dump with the runtime state if generated multiple[0m
[0mtimes for the same Node.js process.[0m

[32m[1m## Configuration[22m[39m

[0mAdditional runtime configuration of report generation is available via[0m
[0mthe following properties of [33mprocess.report[39m:[0m

[0m[33mreportOnFatalError[39m triggers diagnostic reporting on fatal errors when [33mtrue[39m.[0m
[0mDefaults to [33mfalse[39m.[0m

[0m[33mreportOnSignal[39m triggers diagnostic reporting on signal when [33mtrue[39m. This is[0m
[0mnot supported on Windows. Defaults to [33mfalse[39m.[0m

[0m[33mreportOnUncaughtException[39m triggers diagnostic reporting on uncaught exception[0m
[0mwhen [33mtrue[39m. Defaults to [33mfalse[39m.[0m

[0m[33msignal[39m specifies the POSIX signal identifier that will be used[0m
[0mto intercept external triggers for report generation. Defaults to[0m
[0m[33m'SIGUSR2'[39m.[0m

[0m[33mfilename[39m specifies the name of the output file in the file system.[0m
[0mSpecial meaning is attached to [33mstdout[39m and [33mstderr[39m. Usage of these[0m
[0mwill result in report being written to the associated standard streams.[0m
[0mIn cases where standard streams are used, the value in [33mdirectory[39m is ignored.[0m
[0mURLs are not supported. Defaults to a composite filename that contains[0m
[0mtimestamp, PID and sequence number.[0m

[0m[33mdirectory[39m specifies the filesystem directory where the report will be written.[0m
[0mURLs are not supported. Defaults to the current working directory of the[0m
[0mNode.js process.[0m

    [90m// Trigger report only on uncaught exceptions.[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnFatalError[39m [93m=[39m [91mfalse[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnSignal[39m [93m=[39m [91mfalse[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnUncaughtException[39m [93m=[39m [91mtrue[39m[90m;[39m
    
    [90m// Trigger report for both internal errors as well as external signal.[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnFatalError[39m [93m=[39m [91mtrue[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnSignal[39m [93m=[39m [91mtrue[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnUncaughtException[39m [93m=[39m [91mfalse[39m[90m;[39m
    
    [90m// Change the default signal to 'SIGQUIT' and enable it.[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnFatalError[39m [93m=[39m [91mfalse[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnUncaughtException[39m [93m=[39m [91mfalse[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37mreportOnSignal[39m [93m=[39m [91mtrue[39m[90m;[39m
    [37mprocess[39m[32m.[39m[37mreport[39m[32m.[39m[37msignal[39m [93m=[39m [92m'SIGQUIT'[39m[90m;[39m

[0mConfiguration on module initialization is also available via[0m
[0menvironment variables:[0m

    [33mNODE_OPTIONS="--report-uncaught-exception \[39m
    [33m  --report-on-fatalerror --report-on-signal \[39m
    [33m  --report-signal=SIGUSR2  --report-filename=./report.json \[39m
    [33m  --report-directory=/home/nodeuser"[39m

[0mSpecific API documentation can be found under[0m
[0m[34m[33mprocess API documentation[39m[34m ([34m[4mprocess.html[24m[39m[34m)[39m section.[0m

[32m[1m## Interaction with Workers[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v13.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31386[39m
[90m    description: Workers are now included in the report.[39m
[90m-->[39m
[90m[39m
[90m[39m[0m[34m[33mWorker[39m[34m ([34m[4mworker_threads.html[24m[39m[34m)[39m threads can create reports in the same way that the main thread[0m
[0mdoes.[0m

[0mReports will include information on any Workers that are children of the current[0m
[0mthread as part of the [33mworkers[39m section, with each Worker generating a report[0m
[0min the standard report format.[0m

[0mThe thread which is generating the report will wait for the reports from Worker[0m
[0mthreads to finish. However, the latency for this will usually be low, as both[0m
[0mrunning JavaScript and the event loop are interrupted to generate the report.[0m

