[35m[4m[1m# OS[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mos[39m module provides operating system-related utility methods and[0m
[0mproperties. It can be accessed using:[0m

    [94mconst[39m [37mos[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/os'[39m[90m)[39m[90m;[39m

[32m[1m## [33mos.EOL[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe operating system-specific end-of-line marker.[0m

    * [0m[33m\n[39m on POSIX[0m
    * [0m[33m\r\n[39m on Windows[0m

[32m[1m## [33mos.arch()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string}[0m

[0mReturns the operating system CPU architecture for which the Node.js binary was[0m
[0mcompiled. Possible values are [33m'arm'[39m, [33m'arm64'[39m, [33m'ia32'[39m, [33m'mips'[39m,[0m
[0m[33m'mipsel'[39m, [33m'ppc'[39m, [33m'ppc64'[39m, [33m's390'[39m, [33m's390x'[39m, [33m'x32'[39m, and [33m'x64'[39m.[0m

[0mThe return value is equivalent to [34m[33mprocess.arch[39m[34m ([34m[4mprocess.html#process_process_arch[24m[39m[34m)[39m.[0m

[32m[1m## [33mos.constants[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mContains commonly used operating system-specific constants for error codes,[0m
[0mprocess signals, and so on. The specific constants defined are described in[0m
[0m[34mOS Constants ([34m[4m#os_os_constants_1[24m[39m[34m)[39m.[0m

[32m[1m## [33mos.cpus()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object[]}[0m

[0mReturns an array of objects containing information about each logical CPU core.[0m

[0mThe properties included on each object include:[0m

    * [0m[33mmodel[39m {string}[0m
    * [0m[33mspeed[39m {number} (in MHz)[0m
    * [0m[33mtimes[39m {Object}
        * [0m[0m[33muser[39m {number} The number of milliseconds the CPU has spent in user mode.[0m[0m[0m
      [0m
        * [0m[0m[33mnice[39m {number} The number of milliseconds the CPU has spent in nice mode.[0m[0m[0m
      [0m
        * [0m[0m[33msys[39m {number} The number of milliseconds the CPU has spent in sys mode.[0m[0m[0m
      [0m
        * [0m[0m[33midle[39m {number} The number of milliseconds the CPU has spent in idle mode.[0m[0m[0m
      [0m
        * [0m[0m[33mirq[39m {number} The number of milliseconds the CPU has spent in irq mode.[0m[0m[0m

[90m<!-- eslint-disable semi -->[39m
[90m[39m    [33m[[39m
      [33m{[39m
        [37mmodel[39m[93m:[39m [92m'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz'[39m[32m,[39m
        [37mspeed[39m[93m:[39m [34m2926[39m[32m,[39m
        [37mtimes[39m[93m:[39m [33m{[39m
          [37muser[39m[93m:[39m [34m252020[39m[32m,[39m
          [37mnice[39m[93m:[39m [34m0[39m[32m,[39m
          [37msys[39m[93m:[39m [34m30340[39m[32m,[39m
          [37midle[39m[93m:[39m [34m1070356870[39m[32m,[39m
          [37mirq[39m[93m:[39m [34m0[39m
        [33m}[39m
      [33m}[39m[32m,[39m
      [33m{[39m
        [37mmodel[39m[93m:[39m [92m'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz'[39m[32m,[39m
        [37mspeed[39m[93m:[39m [34m2926[39m[32m,[39m
        [37mtimes[39m[93m:[39m [33m{[39m
          [37muser[39m[93m:[39m [34m306960[39m[32m,[39m
          [37mnice[39m[93m:[39m [34m0[39m[32m,[39m
          [37msys[39m[93m:[39m [34m26980[39m[32m,[39m
          [37midle[39m[93m:[39m [34m1071569080[39m[32m,[39m
          [37mirq[39m[93m:[39m [34m0[39m
        [33m}[39m
      [33m}[39m[32m,[39m
      [33m{[39m
        [37mmodel[39m[93m:[39m [92m'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz'[39m[32m,[39m
        [37mspeed[39m[93m:[39m [34m2926[39m[32m,[39m
        [37mtimes[39m[93m:[39m [33m{[39m
          [37muser[39m[93m:[39m [34m248450[39m[32m,[39m
          [37mnice[39m[93m:[39m [34m0[39m[32m,[39m
          [37msys[39m[93m:[39m [34m21750[39m[32m,[39m
          [37midle[39m[93m:[39m [34m1070919370[39m[32m,[39m
          [37mirq[39m[93m:[39m [34m0[39m
        [33m}[39m
      [33m}[39m[32m,[39m
      [33m{[39m
        [37mmodel[39m[93m:[39m [92m'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz'[39m[32m,[39m
        [37mspeed[39m[93m:[39m [34m2926[39m[32m,[39m
        [37mtimes[39m[93m:[39m [33m{[39m
          [37muser[39m[93m:[39m [34m256880[39m[32m,[39m
          [37mnice[39m[93m:[39m [34m0[39m[32m,[39m
          [37msys[39m[93m:[39m [34m19430[39m[32m,[39m
          [37midle[39m[93m:[39m [34m1070905480[39m[32m,[39m
          [37mirq[39m[93m:[39m [34m20[39m
        [33m}[39m
      [33m}[39m
    [33m][39m

[0m[33mnice[39m values are POSIX-only. On Windows, the [33mnice[39m values of all processors[0m
[0mare always 0.[0m

[32m[1m## [33mos.endianness()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string}[0m

[0mReturns a string identifying the endianness of the CPU for which the Node.js[0m
[0mbinary was compiled.[0m

[0mPossible values are [33m'BE'[39m for big endian and [33m'LE'[39m for little endian.[0m

[32m[1m## [33mos.freemem()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {integer}[0m

[0mReturns the amount of free system memory in bytes as an integer.[0m

[32m[1m## [33mos.getPriority([pid])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpid[39m {integer} The process ID to retrieve scheduling priority for.[0m
      [0m[1mDefault[22m [33m0[39m.[0m
    * [0mReturns: {integer}[0m

[0mReturns the scheduling priority for the process specified by [33mpid[39m. If [33mpid[39m is[0m
[0mnot provided or is [33m0[39m, the priority of the current process is returned.[0m

[32m[1m## [33mos.homedir()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v2.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string}[0m

[0mReturns the string path of the current user's home directory.[0m

[0mOn POSIX, it uses the [33m$HOME[39m environment variable if defined. Otherwise it[0m
[0muses the [34meffective UID ([34m[4mhttps://en.wikipedia.org/wiki/User_identifier#Effective_user_ID[24m[39m[34m)[39m to look up the user's home directory.[0m

[0mOn Windows, it uses the [33mUSERPROFILE[39m environment variable if defined.[0m
[0mOtherwise it uses the path to the profile directory of the current user.[0m

[32m[1m## [33mos.hostname()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string}[0m

[0mReturns the host name of the operating system as a string.[0m

[32m[1m## [33mos.loadavg()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {number[]}[0m

[0mReturns an array containing the 1, 5, and 15 minute load averages.[0m

[0mThe load average is a measure of system activity calculated by the operating[0m
[0msystem and expressed as a fractional number.[0m

[0mThe load average is a Unix-specific concept. On Windows, the return value is[0m
[0malways [33m[0, 0, 0][39m.[0m

[32m[1m## [33mos.networkInterfaces()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns an object containing network interfaces that have been assigned a[0m
[0mnetwork address.[0m

[0mEach key on the returned object identifies a network interface. The associated[0m
[0mvalue is an array of objects that each describe an assigned network address.[0m

[0mThe properties available on the assigned network address object include:[0m

    * [0m[33maddress[39m {string} The assigned IPv4 or IPv6 address[0m
    * [0m[33mnetmask[39m {string} The IPv4 or IPv6 network mask[0m
    * [0m[33mfamily[39m {string} Either [33mIPv4[39m or [33mIPv6[39m[0m
    * [0m[33mmac[39m {string} The MAC address of the network interface[0m
    * [0m[33minternal[39m {boolean} [33mtrue[39m if the network interface is a loopback or[0m
      [0msimilar interface that is not remotely accessible; otherwise [33mfalse[39m[0m
    * [0m[33mscopeid[39m {number} The numeric IPv6 scope ID (only specified when [33mfamily[39m[0m
      [0mis [33mIPv6[39m)[0m
    * [0m[33mcidr[39m {string} The assigned IPv4 or IPv6 address with the routing prefix[0m
      [0min CIDR notation. If the [33mnetmask[39m is invalid, this property is set[0m
      [0mto [33mnull[39m.[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mlo[39m[93m:[39m [33m[[39m
        [33m{[39m
          [37maddress[39m[93m:[39m [92m'127.0.0.1'[39m[32m,[39m
          [37mnetmask[39m[93m:[39m [92m'255.0.0.0'[39m[32m,[39m
          [37mfamily[39m[93m:[39m [92m'IPv4'[39m[32m,[39m
          [37mmac[39m[93m:[39m [92m'00:00:00:00:00:00'[39m[32m,[39m
          [37minternal[39m[93m:[39m [91mtrue[39m[32m,[39m
          [37mcidr[39m[93m:[39m [92m'127.0.0.1/8'[39m
        [33m}[39m[32m,[39m
        [33m{[39m
          [37maddress[39m[93m:[39m [92m'::1'[39m[32m,[39m
          [37mnetmask[39m[93m:[39m [92m'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'[39m[32m,[39m
          [37mfamily[39m[93m:[39m [92m'IPv6'[39m[32m,[39m
          [37mmac[39m[93m:[39m [92m'00:00:00:00:00:00'[39m[32m,[39m
          [37mscopeid[39m[93m:[39m [34m0[39m[32m,[39m
          [37minternal[39m[93m:[39m [91mtrue[39m[32m,[39m
          [37mcidr[39m[93m:[39m [92m'::1/128'[39m
        [33m}[39m
      [33m][39m[32m,[39m
      [37meth0[39m[93m:[39m [33m[[39m
        [33m{[39m
          [37maddress[39m[93m:[39m [92m'192.168.1.108'[39m[32m,[39m
          [37mnetmask[39m[93m:[39m [92m'255.255.255.0'[39m[32m,[39m
          [37mfamily[39m[93m:[39m [92m'IPv4'[39m[32m,[39m
          [37mmac[39m[93m:[39m [92m'01:02:03:0a:0b:0c'[39m[32m,[39m
          [37minternal[39m[93m:[39m [91mfalse[39m[32m,[39m
          [37mcidr[39m[93m:[39m [92m'192.168.1.108/24'[39m
        [33m}[39m[32m,[39m
        [33m{[39m
          [37maddress[39m[93m:[39m [92m'fe80::a00:27ff:fe4e:66a1'[39m[32m,[39m
          [37mnetmask[39m[93m:[39m [92m'ffff:ffff:ffff:ffff::'[39m[32m,[39m
          [37mfamily[39m[93m:[39m [92m'IPv6'[39m[32m,[39m
          [37mmac[39m[93m:[39m [92m'01:02:03:0a:0b:0c'[39m[32m,[39m
          [37mscopeid[39m[93m:[39m [34m1[39m[32m,[39m
          [37minternal[39m[93m:[39m [91mfalse[39m[32m,[39m
          [37mcidr[39m[93m:[39m [92m'fe80::a00:27ff:fe4e:66a1/64'[39m
        [33m}[39m
      [33m][39m
    [33m}[39m

[32m[1m## [33mos.platform()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string}[0m

[0mReturns a string identifying the operating system platform. The value is set[0m
[0mat compile time. Possible values are [33m'aix'[39m, [33m'darwin'[39m, [33m'freebsd'[39m,[0m
[0m[33m'linux'[39m, [33m'openbsd'[39m, [33m'sunos'[39m, and [33m'win32'[39m.[0m

[0mThe return value is equivalent to [34m[33mprocess.platform[39m[34m ([34m[4mprocess.html#process_process_platform[24m[39m[34m)[39m.[0m

[0mThe value [33m'android'[39m may also be returned if Node.js is built on the Android[0m
[0moperating system. [34mAndroid support is experimental ([34m[4mhttps://github.com/nodejs/node/blob/master/BUILDING.md#androidandroid-based-devices-eg-firefox-os[24m[39m[34m)[39m.[0m

[32m[1m## [33mos.release()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string}[0m

[0mReturns the operating system as a string.[0m

[0mOn POSIX systems, the operating system release is determined by calling[0m
[0m[34muname(3) ([34m[4mhttps://linux.die.net/man/3/uname[24m[39m[34m)[39m. On Windows, [33mGetVersionExW()[39m is used. See[0m
[0m[34m[34m[4mhttps://en.wikipedia.org/wiki/Uname#Examples[24m[39m[34m[39m for more information.[0m

[32m[1m## [33mos.setPriority([pid, ]priority)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpid[39m {integer} The process ID to set scheduling priority for.[0m
      [0m[1mDefault[22m [33m0[39m.[0m
    * [0m[33mpriority[39m {integer} The scheduling priority to assign to the process.[0m

[0mAttempts to set the scheduling priority for the process specified by [33mpid[39m. If[0m
[0m[33mpid[39m is not provided or is [33m0[39m, the process ID of the current process is used.[0m

[0mThe [33mpriority[39m input must be an integer between [33m-20[39m (high priority) and [33m19[39m[0m
[0m(low priority). Due to differences between Unix priority levels and Windows[0m
[0mpriority classes, [33mpriority[39m is mapped to one of six priority constants in[0m
[0m[33mos.constants.priority[39m. When retrieving a process priority level, this range[0m
[0mmapping may cause the return value to be slightly different on Windows. To avoid[0m
[0mconfusion, set [33mpriority[39m to one of the priority constants.[0m

[0mOn Windows, setting priority to [33mPRIORITY_HIGHEST[39m requires elevated user[0m
[0mprivileges. Otherwise the set priority will be silently reduced to[0m
[0m[33mPRIORITY_HIGH[39m.[0m

[32m[1m## [33mos.tmpdir()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.9[39m
[90mchanges:[39m
[90m  - version: v2.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/747[39m
[90m    description: This function is now cross-platform consistent and no longer[39m
[90m                 returns a path with a trailing slash on any platform[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string}[0m

[0mReturns the operating system's default directory for temporary files as a[0m
[0mstring.[0m

[32m[1m## [33mos.totalmem()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {integer}[0m

[0mReturns the total amount of system memory in bytes as an integer.[0m

[32m[1m## [33mos.type()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string}[0m

[0mReturns the operating system name as returned by [34muname(3) ([34m[4mhttps://linux.die.net/man/3/uname[24m[39m[34m)[39m. For example, it[0m
[0mreturns [33m'Linux'[39m on Linux, [33m'Darwin'[39m on macOS, and [33m'Windows_NT'[39m on Windows.[0m

[0mSee [34m[34m[4mhttps://en.wikipedia.org/wiki/Uname#Examples[24m[39m[34m[39m for additional information[0m
[0mabout the output of running [34muname(3) ([34m[4mhttps://linux.die.net/man/3/uname[24m[39m[34m)[39m on various operating systems.[0m

[32m[1m## [33mos.uptime()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.3[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20129[39m
[90m    description: The result of this function no longer contains a fraction[39m
[90m                 component on Windows.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {integer}[0m

[0mReturns the system uptime in number of seconds.[0m

[32m[1m## [33mos.userInfo([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mencoding[39m {string} Character encoding used to interpret resulting strings.[0m[0m[0m
      [0m      [0m[0mIf [33mencoding[39m is set to [33m'buffer'[39m, the [33musername[39m, [33mshell[39m, and [33mhomedir[39m[0m[0m[0m
      [0m      [0m[0mvalues will be [33mBuffer[39m instances. [1mDefault:[22m [33m'utf8'[39m.[0m[0m[0m
    * [0mReturns: {Object}[0m

[0mReturns information about the currently effective user. On POSIX platforms,[0m
[0mthis is typically a subset of the password file. The returned object includes[0m
[0mthe [33musername[39m, [33muid[39m, [33mgid[39m, [33mshell[39m, and [33mhomedir[39m. On Windows, the [33muid[39m and[0m
[0m[33mgid[39m fields are [33m-1[39m, and [33mshell[39m is [33mnull[39m.[0m

[0mThe value of [33mhomedir[39m returned by [33mos.userInfo()[39m is provided by the operating[0m
[0msystem. This differs from the result of [33mos.homedir()[39m, which queries[0m
[0menvironment variables for the home directory before falling back to the[0m
[0moperating system response.[0m

[0mThrows a [34m[33mSystemError[39m[34m ([34m[4merrors.html#errors_class_systemerror[24m[39m[34m)[39m if a user has no [33musername[39m or [33mhomedir[39m.[0m

[0m## [33mos.version()[39m[0m

[90m<!-- YAML[39m
[90madded: v13.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns {string}[0m

[0mReturns a string identifying the kernel version.[0m

[0mOn POSIX systems, the operating system release is determined by calling[0m
[0m[34muname(3) ([34m[4mhttps://linux.die.net/man/3/uname[24m[39m[34m)[39m. On Windows, [33mRtlGetVersion()[39m is used, and if it is not available,[0m
[0m[33mGetVersionExW()[39m will be used. See[0m
[0m[34m[34m[4mhttps://en.wikipedia.org/wiki/Uname#Examples[24m[39m[34m[39m for more information.[0m

[32m[1m## OS Constants[22m[39m

[0mThe following constants are exported by [33mos.constants[39m.[0m

[0mNot all constants will be available on every operating system.[0m

[32m[1m### Signal Constants[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v5.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6093[39m
[90m    description: Added support for `SIGINFO`.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe following signal constants are exported by [33mos.constants.signals[39m.[0m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGHUP</code></td>[39m
[90m    <td>Sent to indicate when a controlling terminal is closed or a parent[39m
[90m    process exits.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGINT</code></td>[39m
[90m    <td>Sent to indicate when a user wishes to interrupt a process[39m
[90m    (<code>(Ctrl+C)</code>).</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGQUIT</code></td>[39m
[90m    <td>Sent to indicate when a user wishes to terminate a process and perform a[39m
[90m    core dump.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGILL</code></td>[39m
[90m    <td>Sent to a process to notify that it has attempted to perform an illegal,[39m
[90m    malformed, unknown, or privileged instruction.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGTRAP</code></td>[39m
[90m    <td>Sent to a process when an exception has occurred.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGABRT</code></td>[39m
[90m    <td>Sent to a process to request that it abort.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGIOT</code></td>[39m
[90m    <td>Synonym for <code>SIGABRT</code></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGBUS</code></td>[39m
[90m    <td>Sent to a process to notify that it has caused a bus error.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGFPE</code></td>[39m
[90m    <td>Sent to a process to notify that it has performed an illegal arithmetic[39m
[90m    operation.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGKILL</code></td>[39m
[90m    <td>Sent to a process to terminate it immediately.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGUSR1</code> <code>SIGUSR2</code></td>[39m
[90m    <td>Sent to a process to identify user-defined conditions.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGSEGV</code></td>[39m
[90m    <td>Sent to a process to notify of a segmentation fault.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGPIPE</code></td>[39m
[90m    <td>Sent to a process when it has attempted to write to a disconnected[39m
[90m    pipe.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGALRM</code></td>[39m
[90m    <td>Sent to a process when a system timer elapses.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGTERM</code></td>[39m
[90m    <td>Sent to a process to request termination.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGCHLD</code></td>[39m
[90m    <td>Sent to a process when a child process terminates.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGSTKFLT</code></td>[39m
[90m    <td>Sent to a process to indicate a stack fault on a coprocessor.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGCONT</code></td>[39m
[90m    <td>Sent to instruct the operating system to continue a paused process.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGSTOP</code></td>[39m
[90m    <td>Sent to instruct the operating system to halt a process.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGTSTP</code></td>[39m
[90m    <td>Sent to a process to request it to stop.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGBREAK</code></td>[39m
[90m    <td>Sent to indicate when a user wishes to interrupt a process.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGTTIN</code></td>[39m
[90m    <td>Sent to a process when it reads from the TTY while in the[39m
[90m    background.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGTTOU</code></td>[39m
[90m    <td>Sent to a process when it writes to the TTY while in the[39m
[90m    background.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGURG</code></td>[39m
[90m    <td>Sent to a process when a socket has urgent data to read.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGXCPU</code></td>[39m
[90m    <td>Sent to a process when it has exceeded its limit on CPU usage.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGXFSZ</code></td>[39m
[90m    <td>Sent to a process when it grows a file larger than the maximum[39m
[90m    allowed.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGVTALRM</code></td>[39m
[90m    <td>Sent to a process when a virtual timer has elapsed.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGPROF</code></td>[39m
[90m    <td>Sent to a process when a system timer has elapsed.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGWINCH</code></td>[39m
[90m    <td>Sent to a process when the controlling terminal has changed its[39m
[90m    size.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGIO</code></td>[39m
[90m    <td>Sent to a process when I/O is available.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGPOLL</code></td>[39m
[90m    <td>Synonym for <code>SIGIO</code></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGLOST</code></td>[39m
[90m    <td>Sent to a process when a file lock has been lost.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGPWR</code></td>[39m
[90m    <td>Sent to a process to notify of a power failure.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGINFO</code></td>[39m
[90m    <td>Synonym for <code>SIGPWR</code></td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGSYS</code></td>[39m
[90m    <td>Sent to a process to notify of a bad argument.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>SIGUNUSED</code></td>[39m
[90m    <td>Synonym for <code>SIGSYS</code></td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m[32m[1m### Error Constants[22m[39m

[0mThe following error constants are exported by [33mos.constants.errno[39m.[0m

[32m[1m#### POSIX Error Constants[22m[39m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>E2BIG</code></td>[39m
[90m    <td>Indicates that the list of arguments is longer than expected.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EACCES</code></td>[39m
[90m    <td>Indicates that the operation did not have sufficient permissions.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EADDRINUSE</code></td>[39m
[90m    <td>Indicates that the network address is already in use.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EADDRNOTAVAIL</code></td>[39m
[90m    <td>Indicates that the network address is currently unavailable for[39m
[90m    use.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EAFNOSUPPORT</code></td>[39m
[90m    <td>Indicates that the network address family is not supported.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EAGAIN</code></td>[39m
[90m    <td>Indicates that there is no data available and to try the[39m
[90m    operation again later.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EALREADY</code></td>[39m
[90m    <td>Indicates that the socket already has a pending connection in[39m
[90m    progress.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EBADF</code></td>[39m
[90m    <td>Indicates that a file descriptor is not valid.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EBADMSG</code></td>[39m
[90m    <td>Indicates an invalid data message.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EBUSY</code></td>[39m
[90m    <td>Indicates that a device or resource is busy.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ECANCELED</code></td>[39m
[90m    <td>Indicates that an operation was canceled.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ECHILD</code></td>[39m
[90m    <td>Indicates that there are no child processes.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ECONNABORTED</code></td>[39m
[90m    <td>Indicates that the network connection has been aborted.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ECONNREFUSED</code></td>[39m
[90m    <td>Indicates that the network connection has been refused.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ECONNRESET</code></td>[39m
[90m    <td>Indicates that the network connection has been reset.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EDEADLK</code></td>[39m
[90m    <td>Indicates that a resource deadlock has been avoided.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EDESTADDRREQ</code></td>[39m
[90m    <td>Indicates that a destination address is required.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EDOM</code></td>[39m
[90m    <td>Indicates that an argument is out of the domain of the function.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EDQUOT</code></td>[39m
[90m    <td>Indicates that the disk quota has been exceeded.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EEXIST</code></td>[39m
[90m    <td>Indicates that the file already exists.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EFAULT</code></td>[39m
[90m    <td>Indicates an invalid pointer address.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EFBIG</code></td>[39m
[90m    <td>Indicates that the file is too large.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EHOSTUNREACH</code></td>[39m
[90m    <td>Indicates that the host is unreachable.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EIDRM</code></td>[39m
[90m    <td>Indicates that the identifier has been removed.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EILSEQ</code></td>[39m
[90m    <td>Indicates an illegal byte sequence.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EINPROGRESS</code></td>[39m
[90m    <td>Indicates that an operation is already in progress.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EINTR</code></td>[39m
[90m    <td>Indicates that a function call was interrupted.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EINVAL</code></td>[39m
[90m    <td>Indicates that an invalid argument was provided.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EIO</code></td>[39m
[90m    <td>Indicates an otherwise unspecified I/O error.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EISCONN</code></td>[39m
[90m    <td>Indicates that the socket is connected.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EISDIR</code></td>[39m
[90m    <td>Indicates that the path is a directory.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ELOOP</code></td>[39m
[90m    <td>Indicates too many levels of symbolic links in a path.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EMFILE</code></td>[39m
[90m    <td>Indicates that there are too many open files.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EMLINK</code></td>[39m
[90m    <td>Indicates that there are too many hard links to a file.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EMSGSIZE</code></td>[39m
[90m    <td>Indicates that the provided message is too long.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EMULTIHOP</code></td>[39m
[90m    <td>Indicates that a multihop was attempted.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENAMETOOLONG</code></td>[39m
[90m    <td>Indicates that the filename is too long.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENETDOWN</code></td>[39m
[90m    <td>Indicates that the network is down.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENETRESET</code></td>[39m
[90m    <td>Indicates that the connection has been aborted by the network.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENETUNREACH</code></td>[39m
[90m    <td>Indicates that the network is unreachable.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENFILE</code></td>[39m
[90m    <td>Indicates too many open files in the system.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOBUFS</code></td>[39m
[90m    <td>Indicates that no buffer space is available.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENODATA</code></td>[39m
[90m    <td>Indicates that no message is available on the stream head read[39m
[90m    queue.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENODEV</code></td>[39m
[90m    <td>Indicates that there is no such device.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOENT</code></td>[39m
[90m    <td>Indicates that there is no such file or directory.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOEXEC</code></td>[39m
[90m    <td>Indicates an exec format error.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOLCK</code></td>[39m
[90m    <td>Indicates that there are no locks available.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOLINK</code></td>[39m
[90m    <td>Indications that a link has been severed.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOMEM</code></td>[39m
[90m    <td>Indicates that there is not enough space.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOMSG</code></td>[39m
[90m    <td>Indicates that there is no message of the desired type.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOPROTOOPT</code></td>[39m
[90m    <td>Indicates that a given protocol is not available.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOSPC</code></td>[39m
[90m    <td>Indicates that there is no space available on the device.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOSR</code></td>[39m
[90m    <td>Indicates that there are no stream resources available.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOSTR</code></td>[39m
[90m    <td>Indicates that a given resource is not a stream.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOSYS</code></td>[39m
[90m    <td>Indicates that a function has not been implemented.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOTCONN</code></td>[39m
[90m    <td>Indicates that the socket is not connected.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOTDIR</code></td>[39m
[90m    <td>Indicates that the path is not a directory.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOTEMPTY</code></td>[39m
[90m    <td>Indicates that the directory is not empty.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOTSOCK</code></td>[39m
[90m    <td>Indicates that the given item is not a socket.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOTSUP</code></td>[39m
[90m    <td>Indicates that a given operation is not supported.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENOTTY</code></td>[39m
[90m    <td>Indicates an inappropriate I/O control operation.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ENXIO</code></td>[39m
[90m    <td>Indicates no such device or address.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EOPNOTSUPP</code></td>[39m
[90m    <td>Indicates that an operation is not supported on the socket. Although[39m
[90m    <code>ENOTSUP</code> and <code>EOPNOTSUPP</code> have the same value[39m
[90m    on Linux, according to POSIX.1 these error values should be distinct.)</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EOVERFLOW</code></td>[39m
[90m    <td>Indicates that a value is too large to be stored in a given data[39m
[90m    type.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EPERM</code></td>[39m
[90m    <td>Indicates that the operation is not permitted.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EPIPE</code></td>[39m
[90m    <td>Indicates a broken pipe.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EPROTO</code></td>[39m
[90m    <td>Indicates a protocol error.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EPROTONOSUPPORT</code></td>[39m
[90m    <td>Indicates that a protocol is not supported.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EPROTOTYPE</code></td>[39m
[90m    <td>Indicates the wrong type of protocol for a socket.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ERANGE</code></td>[39m
[90m    <td>Indicates that the results are too large.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EROFS</code></td>[39m
[90m    <td>Indicates that the file system is read only.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ESPIPE</code></td>[39m
[90m    <td>Indicates an invalid seek operation.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ESRCH</code></td>[39m
[90m    <td>Indicates that there is no such process.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ESTALE</code></td>[39m
[90m    <td>Indicates that the file handle is stale.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ETIME</code></td>[39m
[90m    <td>Indicates an expired timer.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ETIMEDOUT</code></td>[39m
[90m    <td>Indicates that the connection timed out.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>ETXTBSY</code></td>[39m
[90m    <td>Indicates that a text file is busy.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EWOULDBLOCK</code></td>[39m
[90m    <td>Indicates that the operation would block.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>EXDEV</code></td>[39m
[90m    <td>Indicates an improper link.[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m[32m[1m#### Windows Specific Error Constants[22m[39m

[0mThe following error codes are specific to the Windows operating system.[0m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEINTR</code></td>[39m
[90m    <td>Indicates an interrupted function call.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEBADF</code></td>[39m
[90m    <td>Indicates an invalid file handle.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEACCES</code></td>[39m
[90m    <td>Indicates insufficient permissions to complete the operation.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEFAULT</code></td>[39m
[90m    <td>Indicates an invalid pointer address.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEINVAL</code></td>[39m
[90m    <td>Indicates that an invalid argument was passed.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEMFILE</code></td>[39m
[90m    <td>Indicates that there are too many open files.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEWOULDBLOCK</code></td>[39m
[90m    <td>Indicates that a resource is temporarily unavailable.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEINPROGRESS</code></td>[39m
[90m    <td>Indicates that an operation is currently in progress.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEALREADY</code></td>[39m
[90m    <td>Indicates that an operation is already in progress.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENOTSOCK</code></td>[39m
[90m    <td>Indicates that the resource is not a socket.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEDESTADDRREQ</code></td>[39m
[90m    <td>Indicates that a destination address is required.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEMSGSIZE</code></td>[39m
[90m    <td>Indicates that the message size is too long.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEPROTOTYPE</code></td>[39m
[90m    <td>Indicates the wrong protocol type for the socket.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENOPROTOOPT</code></td>[39m
[90m    <td>Indicates a bad protocol option.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEPROTONOSUPPORT</code></td>[39m
[90m    <td>Indicates that the protocol is not supported.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAESOCKTNOSUPPORT</code></td>[39m
[90m    <td>Indicates that the socket type is not supported.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEOPNOTSUPP</code></td>[39m
[90m    <td>Indicates that the operation is not supported.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEPFNOSUPPORT</code></td>[39m
[90m    <td>Indicates that the protocol family is not supported.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEAFNOSUPPORT</code></td>[39m
[90m    <td>Indicates that the address family is not supported.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEADDRINUSE</code></td>[39m
[90m    <td>Indicates that the network address is already in use.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEADDRNOTAVAIL</code></td>[39m
[90m    <td>Indicates that the network address is not available.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENETDOWN</code></td>[39m
[90m    <td>Indicates that the network is down.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENETUNREACH</code></td>[39m
[90m    <td>Indicates that the network is unreachable.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENETRESET</code></td>[39m
[90m    <td>Indicates that the network connection has been reset.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAECONNABORTED</code></td>[39m
[90m    <td>Indicates that the connection has been aborted.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAECONNRESET</code></td>[39m
[90m    <td>Indicates that the connection has been reset by the peer.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENOBUFS</code></td>[39m
[90m    <td>Indicates that there is no buffer space available.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEISCONN</code></td>[39m
[90m    <td>Indicates that the socket is already connected.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENOTCONN</code></td>[39m
[90m    <td>Indicates that the socket is not connected.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAESHUTDOWN</code></td>[39m
[90m    <td>Indicates that data cannot be sent after the socket has been[39m
[90m    shutdown.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAETOOMANYREFS</code></td>[39m
[90m    <td>Indicates that there are too many references.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAETIMEDOUT</code></td>[39m
[90m    <td>Indicates that the connection has timed out.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAECONNREFUSED</code></td>[39m
[90m    <td>Indicates that the connection has been refused.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAELOOP</code></td>[39m
[90m    <td>Indicates that a name cannot be translated.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENAMETOOLONG</code></td>[39m
[90m    <td>Indicates that a name was too long.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEHOSTDOWN</code></td>[39m
[90m    <td>Indicates that a network host is down.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEHOSTUNREACH</code></td>[39m
[90m    <td>Indicates that there is no route to a network host.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENOTEMPTY</code></td>[39m
[90m    <td>Indicates that the directory is not empty.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEPROCLIM</code></td>[39m
[90m    <td>Indicates that there are too many processes.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEUSERS</code></td>[39m
[90m    <td>Indicates that the user quota has been exceeded.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEDQUOT</code></td>[39m
[90m    <td>Indicates that the disk quota has been exceeded.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAESTALE</code></td>[39m
[90m    <td>Indicates a stale file handle reference.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEREMOTE</code></td>[39m
[90m    <td>Indicates that the item is remote.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSASYSNOTREADY</code></td>[39m
[90m    <td>Indicates that the network subsystem is not ready.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAVERNOTSUPPORTED</code></td>[39m
[90m    <td>Indicates that the <code>winsock.dll</code> version is out of[39m
[90m    range.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSANOTINITIALISED</code></td>[39m
[90m    <td>Indicates that successful WSAStartup has not yet been performed.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEDISCON</code></td>[39m
[90m    <td>Indicates that a graceful shutdown is in progress.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAENOMORE</code></td>[39m
[90m    <td>Indicates that there are no more results.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAECANCELLED</code></td>[39m
[90m    <td>Indicates that an operation has been canceled.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEINVALIDPROCTABLE</code></td>[39m
[90m    <td>Indicates that the procedure call table is invalid.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEINVALIDPROVIDER</code></td>[39m
[90m    <td>Indicates an invalid service provider.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEPROVIDERFAILEDINIT</code></td>[39m
[90m    <td>Indicates that the service provider failed to initialized.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSASYSCALLFAILURE</code></td>[39m
[90m    <td>Indicates a system call failure.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSASERVICE_NOT_FOUND</code></td>[39m
[90m    <td>Indicates that a service was not found.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSATYPE_NOT_FOUND</code></td>[39m
[90m    <td>Indicates that a class type was not found.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSA_E_NO_MORE</code></td>[39m
[90m    <td>Indicates that there are no more results.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSA_E_CANCELLED</code></td>[39m
[90m    <td>Indicates that the call was canceled.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>WSAEREFUSED</code></td>[39m
[90m    <td>Indicates that a database query was refused.</td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m[32m[1m### dlopen Constants[22m[39m

[0mIf available on the operating system, the following constants[0m
[0mare exported in [33mos.constants.dlopen[39m. See dlopen(3) for detailed[0m
[0minformation.[0m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>RTLD_LAZY</code></td>[39m
[90m    <td>Perform lazy binding. Node.js sets this flag by default.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>RTLD_NOW</code></td>[39m
[90m    <td>Resolve all undefined symbols in the library before dlopen(3)[39m
[90m    returns.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>RTLD_GLOBAL</code></td>[39m
[90m    <td>Symbols defined by the library will be made available for symbol[39m
[90m    resolution of subsequently loaded libraries.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>RTLD_LOCAL</code></td>[39m
[90m    <td>The converse of <code>RTLD_GLOBAL</code>. This is the default behavior[39m
[90m    if neither flag is specified.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>RTLD_DEEPBIND</code></td>[39m
[90m    <td>Make a self-contained library use its own symbols in preference to[39m
[90m    symbols from previously loaded libraries.</td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m[32m[1m### Priority Constants[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe following process scheduling constants are exported by[0m
[0m[33mos.constants.priority[39m.[0m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>PRIORITY_LOW</code></td>[39m
[90m    <td>The lowest process scheduling priority. This corresponds to[39m
[90m    <code>IDLE_PRIORITY_CLASS</code> on Windows, and a nice value of[39m
[90m    <code>19</code> on all other platforms.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>PRIORITY_BELOW_NORMAL</code></td>[39m
[90m    <td>The process scheduling priority above <code>PRIORITY_LOW</code> and[39m
[90m    below <code>PRIORITY_NORMAL</code>. This corresponds to[39m
[90m    <code>BELOW_NORMAL_PRIORITY_CLASS</code> on Windows, and a nice value of[39m
[90m    <code>10</code> on all other platforms.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>PRIORITY_NORMAL</code></td>[39m
[90m    <td>The default process scheduling priority. This corresponds to[39m
[90m    <code>NORMAL_PRIORITY_CLASS</code> on Windows, and a nice value of[39m
[90m    <code>0</code> on all other platforms.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>PRIORITY_ABOVE_NORMAL</code></td>[39m
[90m    <td>The process scheduling priority above <code>PRIORITY_NORMAL</code> and[39m
[90m    below <code>PRIORITY_HIGH</code>. This corresponds to[39m
[90m    <code>ABOVE_NORMAL_PRIORITY_CLASS</code> on Windows, and a nice value of[39m
[90m    <code>-7</code> on all other platforms.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>PRIORITY_HIGH</code></td>[39m
[90m    <td>The process scheduling priority above <code>PRIORITY_ABOVE_NORMAL</code>[39m
[90m    and below <code>PRIORITY_HIGHEST</code>. This corresponds to[39m
[90m    <code>HIGH_PRIORITY_CLASS</code> on Windows, and a nice value of[39m
[90m    <code>-14</code> on all other platforms.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>PRIORITY_HIGHEST</code></td>[39m
[90m    <td>The highest process scheduling priority. This corresponds to[39m
[90m    <code>REALTIME_PRIORITY_CLASS</code> on Windows, and a nice value of[39m
[90m    <code>-20</code> on all other platforms.</td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m[32m[1m### libuv Constants[22m[39m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>UV_UDP_REUSEADDR</code></td>[39m
[90m    <td></td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m