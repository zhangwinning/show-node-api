[35m[4m[1m# DNS[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mdns[39m module enables name resolution. For example, use it to look up IP[0m
[0maddresses of host names.[0m

[0mAlthough named for the [34mDomain Name System (DNS) ([34m[4mhttps://en.wikipedia.org/wiki/Domain_Name_System[24m[39m[34m)[39m, it does not always use the[0m
[0mDNS protocol for lookups. [34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m uses the operating system[0m
[0mfacilities to perform name resolution. It may not need to perform any network[0m
[0mcommunication. Developers looking to perform name resolution in the same way[0m
[0mthat other applications on the same operating system behave should use[0m
[0m[34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m.[0m

    [94mconst[39m [37mdns[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dns'[39m[90m)[39m[90m;[39m
    
    [37mdns[39m[32m.[39m[37mlookup[39m[90m([39m[92m'example.org'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37maddress[39m[32m,[39m [37mfamily[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'address: %j family: IPv%s'[39m[32m,[39m [37maddress[39m[32m,[39m [37mfamily[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// address: "93.184.216.34" family: IPv4[39m

[0mAll other functions in the [33mdns[39m module connect to an actual DNS server to[0m
[0mperform name resolution. They will always use the network to perform DNS[0m
[0mqueries. These functions do not use the same set of configuration files used by[0m
[0m[34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m (e.g. [33m/etc/hosts[39m). These functions should be used by[0m
[0mdevelopers who do not want to use the underlying operating system's[0m
[0mfacilities for name resolution, and instead want to always perform DNS queries.[0m

    [94mconst[39m [37mdns[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dns'[39m[90m)[39m[90m;[39m
    
    [37mdns[39m[32m.[39m[37mresolve4[39m[90m([39m[92m'archive.org'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37maddresses[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
    
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`addresses: ${[37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37maddresses[39m[90m)[39m}`[90m)[39m[90m;[39m
    
      [37maddresses[39m[32m.[39m[37mforEach[39m[90m([39m[90m([39m[37ma[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mdns[39m[32m.[39m[37mreverse[39m[90m([39m[37ma[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mhostnames[39m[90m)[39m [93m=>[39m [33m{[39m
          [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
            [94mthrow[39m [37merr[39m[90m;[39m
          [33m}[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`reverse for ${[37ma[39m}: ${[37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37mhostnames[39m[90m)[39m}`[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mSee the [34mImplementation considerations section ([34m[4m#dns_implementation_considerations[24m[39m[34m)[39m for more information.[0m

[32m[1m## Class: [33mdns.Resolver[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn independent resolver for DNS requests.[0m

[0mCreating a new resolver uses the default server settings. Setting[0m
[0mthe servers used for a resolver using[0m
[0m[34m[33mresolver.setServers()[39m[34m ([34m[4m#dns_dns_setservers_servers[24m[39m[34m)[39m does not affect[0m
[0mother resolvers:[0m

    [94mconst[39m [33m{[39m [37mResolver[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dns'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mresolver[39m [93m=[39m [31mnew[39m [37mResolver[39m[90m([39m[90m)[39m[90m;[39m
    [37mresolver[39m[32m.[39m[37msetServers[39m[90m([39m[33m[[39m[92m'4.4.4.4'[39m[33m][39m[90m)[39m[90m;[39m
    
    [90m// This request will use the server at 4.4.4.4, independent of global settings.[39m
    [37mresolver[39m[32m.[39m[37mresolve4[39m[90m([39m[92m'example.org'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37maddresses[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe following methods from the [33mdns[39m module are available:[0m

    * [0m[34m[33mresolver.getServers()[39m[34m ([34m[4m#dns_dns_getservers[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolve()[39m[34m ([34m[4m#dns_dns_resolve_hostname_rrtype_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolve4()[39m[34m ([34m[4m#dns_dns_resolve4_hostname_options_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolve6()[39m[34m ([34m[4m#dns_dns_resolve6_hostname_options_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveAny()[39m[34m ([34m[4m#dns_dns_resolveany_hostname_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveCname()[39m[34m ([34m[4m#dns_dns_resolvecname_hostname_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveMx()[39m[34m ([34m[4m#dns_dns_resolvemx_hostname_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveNaptr()[39m[34m ([34m[4m#dns_dns_resolvenaptr_hostname_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveNs()[39m[34m ([34m[4m#dns_dns_resolvens_hostname_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolvePtr()[39m[34m ([34m[4m#dns_dns_resolveptr_hostname_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveSoa()[39m[34m ([34m[4m#dns_dns_resolvesoa_hostname_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveSrv()[39m[34m ([34m[4m#dns_dns_resolvesrv_hostname_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveTxt()[39m[34m ([34m[4m#dns_dns_resolvetxt_hostname_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.reverse()[39m[34m ([34m[4m#dns_dns_reverse_ip_callback[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.setServers()[39m[34m ([34m[4m#dns_dns_setservers_servers[24m[39m[34m)[39m[0m

[32m[1m### [33mresolver.cancel()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCancel all outstanding DNS queries made by this resolver. The corresponding[0m
[0mcallbacks will be called with an error with code [33mECANCELLED[39m.[0m

[32m[1m## [33mdns.getServers()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string[]}[0m

[0mReturns an array of IP address strings, formatted according to [34mRFC 5952 ([34m[4mhttps://tools.ietf.org/html/rfc5952#section-6[24m[39m[34m)[39m,[0m
[0mthat are currently configured for DNS resolution. A string will include a port[0m
[0msection if a custom port is used.[0m

[90m<!-- eslint-disable semi-->[39m
[90m[39m    [33m[[39m
      [92m'4.4.4.4'[39m[32m,[39m
      [92m'2001:4860:4860::8888'[39m[32m,[39m
      [92m'4.4.4.4:1053'[39m[32m,[39m
      [92m'[2001:4860:4860::8888]:1053'[39m
    [33m][39m

[32m[1m## [33mdns.lookup(hostname[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90mchanges:[39m
[90m  - version: v8.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14731[39m
[90m    description: The `verbatim` option is supported now.[39m
[90m  - version: v1.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/744[39m
[90m    description: The `all` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33moptions[39m {integer | Object}
        * [0m[0m[33mfamily[39m {integer} The record family. Must be [33m4[39m, [33m6[39m, or [33m0[39m. The value[0m[0m[0m
      [0m      [0m[0m[33m0[39m indicates that IPv4 and IPv6 addresses are both returned. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mhints[39m {number} One or more [34msupported [33mgetaddrinfo[39m[34m flags ([34m[4m#dns_supported_getaddrinfo_flags[24m[39m[34m)[39m. Multiple[0m[0m[0m
      [0m      [0m[0mflags may be passed by bitwise [33mOR[39ming their values.[0m[0m[0m
      [0m
        * [0m[0m[33mall[39m {boolean} When [33mtrue[39m, the callback returns all resolved addresses in[0m[0m[0m
      [0m      [0m[0man array. Otherwise, returns a single address. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mverbatim[39m {boolean} When [33mtrue[39m, the callback receives IPv4 and IPv6[0m[0m[0m
      [0m      [0m[0maddresses in the order the DNS resolver returned them. When [33mfalse[39m,[0m[0m[0m
      [0m      [0m[0mIPv4 addresses are placed before IPv6 addresses.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m currently [33mfalse[39m (addresses are reordered) but this is[0m[0m[0m
      [0m      [0m[0mexpected to change in the not too distant future.[0m[0m[0m
      [0m      [0m[0mNew code should use [33m{ verbatim: true }[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddress[39m {string} A string representation of an IPv4 or IPv6 address.[0m[0m[0m
      [0m
        * [0m[0m[33mfamily[39m {integer} [33m4[39m or [33m6[39m, denoting the family of [33maddress[39m, or [33m0[39m if[0m[0m[0m
      [0m      [0m[0mthe address is not an IPv4 or IPv6 address. [33m0[39m is a likely indicator of a[0m[0m[0m
      [0m      [0m[0mbug in the name resolution service used by the operating system.[0m[0m[0m

[0mResolves a host name (e.g. [33m'nodejs.org'[39m) into the first found A (IPv4) or[0m
[0mAAAA (IPv6) record. All [33moption[39m properties are optional. If [33moptions[39m is an[0m
[0minteger, then it must be [33m4[39m or [33m6[39m – if [33moptions[39m is not provided, then IPv4[0m
[0mand IPv6 addresses are both returned if found.[0m

[0mWith the [33mall[39m option set to [33mtrue[39m, the arguments for [33mcallback[39m change to[0m
[0m[33m(err, addresses)[39m, with [33maddresses[39m being an array of objects with the[0m
[0mproperties [33maddress[39m and [33mfamily[39m.[0m

[0mOn error, [33merr[39m is an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object, where [33merr.code[39m is the error code.[0m
[0mKeep in mind that [33merr.code[39m will be set to [33m'ENOTFOUND'[39m not only when[0m
[0mthe host name does not exist but also when the lookup fails in other ways[0m
[0msuch as no available file descriptors.[0m

[0m[33mdns.lookup()[39m does not necessarily have anything to do with the DNS protocol.[0m
[0mThe implementation uses an operating system facility that can associate names[0m
[0mwith addresses, and vice versa. This implementation can have subtle but[0m
[0mimportant consequences on the behavior of any Node.js program. Please take some[0m
[0mtime to consult the [34mImplementation considerations section ([34m[4m#dns_implementation_considerations[24m[39m[34m)[39m before using[0m
[0m[33mdns.lookup()[39m.[0m

[0mExample usage:[0m

    [94mconst[39m [37mdns[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dns'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mfamily[39m[93m:[39m [34m6[39m[32m,[39m
      [37mhints[39m[93m:[39m [37mdns[39m[32m.[39m[37mADDRCONFIG[39m [93m|[39m [37mdns[39m[32m.[39m[37mV4MAPPED[39m[32m,[39m
    [33m}[39m[90m;[39m
    [37mdns[39m[32m.[39m[37mlookup[39m[90m([39m[92m'example.com'[39m[32m,[39m [37moptions[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37maddress[39m[32m,[39m [37mfamily[39m[90m)[39m [93m=>[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'address: %j family: IPv%s'[39m[32m,[39m [37maddress[39m[32m,[39m [37mfamily[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// address: "2606:2800:220:1:248:1893:25c8:1946" family: IPv6[39m
    
    [90m// When options.all is true, the result will be an Array.[39m
    [37moptions[39m[32m.[39m[37mall[39m [93m=[39m [91mtrue[39m[90m;[39m
    [37mdns[39m[32m.[39m[37mlookup[39m[90m([39m[92m'example.com'[39m[32m,[39m [37moptions[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37maddresses[39m[90m)[39m [93m=>[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'addresses: %j'[39m[32m,[39m [37maddresses[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// addresses: [{"address":"2606:2800:220:1:248:1893:25c8:1946","family":6}][39m

[0mIf this method is invoked as its [34m[33mutil.promisify()[39m[34m ([34m[4mutil.html#util_util_promisify_original[24m[39m[34m)[39med version, and [33mall[39m[0m
[0mis not set to [33mtrue[39m, it returns a [33mPromise[39m for an [33mObject[39m with [33maddress[39m and[0m
[0m[33mfamily[39m properties.[0m

[32m[1m### Supported getaddrinfo flags[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32183[39m
[90m    description: Added support for the `dns.ALL` flag.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe following flags can be passed as hints to [34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m.[0m

    * [0m[33mdns.ADDRCONFIG[39m: Returned address types are determined by the types[0m
      [0mof addresses supported by the current system. For example, IPv4 addresses[0m
      [0mare only returned if the current system has at least one IPv4 address[0m
      [0mconfigured. Loopback addresses are not considered.[0m
    * [0m[33mdns.V4MAPPED[39m: If the IPv6 family was specified, but no IPv6 addresses were[0m
      [0mfound, then return IPv4 mapped IPv6 addresses. It is not supported[0m
      [0mon some operating systems (e.g FreeBSD 10.1).[0m
    * [0m[33mdns.ALL[39m: If [33mdns.V4MAPPED[39m is specified, return resolved IPv6 addresses as[0m
      [0mwell as IPv4 mapped IPv6 addresses.[0m

[32m[1m## [33mdns.lookupService(address, port, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.14[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33maddress[39m {string}[0m
    * [0m[33mport[39m {number}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mhostname[39m {string} e.g. [33mexample.com[39m[0m[0m[0m
      [0m
        * [0m[0m[33mservice[39m {string} e.g. [33mhttp[39m[0m[0m[0m

[0mResolves the given [33maddress[39m and [33mport[39m into a host name and service using[0m
[0mthe operating system's underlying [33mgetnameinfo[39m implementation.[0m

[0mIf [33maddress[39m is not a valid IP address, a [33mTypeError[39m will be thrown.[0m
[0mThe [33mport[39m will be coerced to a number. If it is not a legal port, a [33mTypeError[39m[0m
[0mwill be thrown.[0m

[0mOn an error, [33merr[39m is an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object, where [33merr.code[39m is the error code.[0m

    [94mconst[39m [37mdns[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dns'[39m[90m)[39m[90m;[39m
    [37mdns[39m[32m.[39m[37mlookupService[39m[90m([39m[92m'127.0.0.1'[39m[32m,[39m [34m22[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mhostname[39m[32m,[39m [37mservice[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mhostname[39m[32m,[39m [37mservice[39m[90m)[39m[90m;[39m
      [90m// Prints: localhost ssh[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf this method is invoked as its [34m[33mutil.promisify()[39m[34m ([34m[4mutil.html#util_util_promisify_original[24m[39m[34m)[39med version, it returns a[0m
[0m[33mPromise[39m for an [33mObject[39m with [33mhostname[39m and [33mservice[39m properties.[0m

[32m[1m## [33mdns.resolve(hostname[, rrtype], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.27[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string} Host name to resolve.[0m
    * [0m[33mrrtype[39m {string} Resource record type. [1mDefault:[22m [33m'A'[39m.[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mrecords[39m {string[] | Object[] | Object}[0m[0m[0m

[0mUses the DNS protocol to resolve a host name (e.g. [33m'nodejs.org'[39m) into an array[0m
[0mof the resource records. The [33mcallback[39m function has arguments[0m
[0m[33m(err, records)[39m. When successful, [33mrecords[39m will be an array of resource[0m
[0mrecords. The type and structure of individual results varies based on [33mrrtype[39m:[0m

[0m┌─────────┬────────────────────────────────┬─────────────┬──────────────────────────────────────────────────────────────┐[0m
[0m│ [33mrrtype[39m  │ [33mrecords[39m contains               │ Result type │ Shorthand method                                             │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'A'[39m     │ IPv4 addresses (default)       │ {string}    │ [34m[33mdns.resolve4()[39m[34m ([34m[4m#dns_dns_resolve4_hostname_options_callback[24m[39m[34m)[39m │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'AAAA'[39m  │ IPv6 addresses                 │ {string}    │ [34m[33mdns.resolve6()[39m[34m ([34m[4m#dns_dns_resolve6_hostname_options_callback[24m[39m[34m)[39m │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'ANY'[39m   │ any records                    │ {Object}    │ [34m[33mdns.resolveAny()[39m[34m ([34m[4m#dns_dns_resolveany_hostname_callback[24m[39m[34m)[39m     │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'CNAME'[39m │ canonical name records         │ {string}    │ [34m[33mdns.resolveCname()[39m[34m ([34m[4m#dns_dns_resolvecname_hostname_callback[24m[39m[34m)[39m │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'MX'[39m    │ mail exchange records          │ {Object}    │ [34m[33mdns.resolveMx()[39m[34m ([34m[4m#dns_dns_resolvemx_hostname_callback[24m[39m[34m)[39m       │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'NAPTR'[39m │ name authority pointer records │ {Object}    │ [34m[33mdns.resolveNaptr()[39m[34m ([34m[4m#dns_dns_resolvenaptr_hostname_callback[24m[39m[34m)[39m │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'NS'[39m    │ name server records            │ {string}    │ [34m[33mdns.resolveNs()[39m[34m ([34m[4m#dns_dns_resolvens_hostname_callback[24m[39m[34m)[39m       │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'PTR'[39m   │ pointer records                │ {string}    │ [34m[33mdns.resolvePtr()[39m[34m ([34m[4m#dns_dns_resolveptr_hostname_callback[24m[39m[34m)[39m     │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'SOA'[39m   │ start of authority records     │ {Object}    │ [34m[33mdns.resolveSoa()[39m[34m ([34m[4m#dns_dns_resolvesoa_hostname_callback[24m[39m[34m)[39m     │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'SRV'[39m   │ service records                │ {Object}    │ [34m[33mdns.resolveSrv()[39m[34m ([34m[4m#dns_dns_resolvesrv_hostname_callback[24m[39m[34m)[39m     │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼──────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'TXT'[39m   │ text records                   │ {string[]}  │ [34m[33mdns.resolveTxt()[39m[34m ([34m[4m#dns_dns_resolvetxt_hostname_callback[24m[39m[34m)[39m     │[0m
[0m└─────────┴────────────────────────────────┴─────────────┴──────────────────────────────────────────────────────────────┘[0m

[0mOn error, [33merr[39m is an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object, where [33merr.code[39m is one of the[0m
[0m[34mDNS error codes ([34m[4m#dns_error_codes[24m[39m[34m)[39m.[0m

[32m[1m## [33mdns.resolve4(hostname[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90mchanges:[39m
[90m  - version: v7.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9296[39m
[90m    description: This method now supports passing `options`,[39m
[90m                 specifically `options.ttl`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string} Host name to resolve.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mttl[39m {boolean} Retrieve the Time-To-Live value (TTL) of each record.[0m[0m[0m
      [0m      [0m[0mWhen [33mtrue[39m, the callback receives an array of[0m[0m[0m
      [0m      [0m[0m[33m{ address: '1.2.3.4', ttl: 60 }[39m objects rather than an array of strings,[0m[0m[0m
      [0m      [0m[0mwith the TTL expressed in seconds.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddresses[39m {string[] | Object[]}[0m[0m[0m

[0mUses the DNS protocol to resolve a IPv4 addresses ([33mA[39m records) for the[0m
[0m[33mhostname[39m. The [33maddresses[39m argument passed to the [33mcallback[39m function[0m
[0mwill contain an array of IPv4 addresses (e.g.[0m
[0m[33m['74.125.79.104', '74.125.79.105', '74.125.79.106'][39m).[0m

[32m[1m## [33mdns.resolve6(hostname[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90mchanges:[39m
[90m  - version: v7.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9296[39m
[90m    description: This method now supports passing `options`,[39m
[90m                 specifically `options.ttl`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string} Host name to resolve.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mttl[39m {boolean} Retrieve the Time-To-Live value (TTL) of each record.[0m[0m[0m
      [0m      [0m[0mWhen [33mtrue[39m, the callback receives an array of[0m[0m[0m
      [0m      [0m[0m[33m{ address: '0:1: 2:3: 4:5: 6:7', ttl: 60 }[39m objects rather than an array of[0m[0m[0m
      [0m      [0m[0mstrings, with the TTL expressed in seconds.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddresses[39m {string[] | Object[]}[0m[0m[0m

[0mUses the DNS protocol to resolve a IPv6 addresses ([33mAAAA[39m records) for the[0m
[0m[33mhostname[39m. The [33maddresses[39m argument passed to the [33mcallback[39m function[0m
[0mwill contain an array of IPv6 addresses.[0m

[32m[1m## [33mdns.resolveAny(hostname, callback)[39m[32m[22m[39m

    * [0m[33mhostname[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mret[39m {Object[]}[0m[0m[0m

[0mUses the DNS protocol to resolve all records (also known as [33mANY[39m or [33m*[39m query).[0m
[0mThe [33mret[39m argument passed to the [33mcallback[39m function will be an array containing[0m
[0mvarious types of records. Each object has a property [33mtype[39m that indicates the[0m
[0mtype of the current record. And depending on the [33mtype[39m, additional properties[0m
[0mwill be present on the object:[0m

[0m┌─────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐[0m
[0m│ Type    │ Properties                                                                                                                                                                     │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'A'[39m     │ [33maddress[39m/[33mttl[39m                                                                                                                                                                    │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'AAAA'[39m  │ [33maddress[39m/[33mttl[39m                                                                                                                                                                    │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'CNAME'[39m │ [33mvalue[39m                                                                                                                                                                          │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'MX'[39m    │ Refer to [34m[33mdns.resolveMx()[39m[34m ([34m[4m#dns_dns_resolvemx_hostname_callback[24m[39m[34m)[39m                                                                                                                │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'NAPTR'[39m │ Refer to [34m[33mdns.resolveNaptr()[39m[34m ([34m[4m#dns_dns_resolvenaptr_hostname_callback[24m[39m[34m)[39m                                                                                                          │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'NS'[39m    │ [33mvalue[39m                                                                                                                                                                          │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'PTR'[39m   │ [33mvalue[39m                                                                                                                                                                          │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'SOA'[39m   │ Refer to [34m[33mdns.resolveSoa()[39m[34m ([34m[4m#dns_dns_resolvesoa_hostname_callback[24m[39m[34m)[39m                                                                                                              │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'SRV'[39m   │ Refer to [34m[33mdns.resolveSrv()[39m[34m ([34m[4m#dns_dns_resolvesrv_hostname_callback[24m[39m[34m)[39m                                                                                                              │[0m
[0m├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'TXT'[39m   │ This type of record contains an array property called [33mentries[39m which refers to [34m[33mdns.resolveTxt()[39m[34m ([34m[4m#dns_dns_resolvetxt_hostname_callback[24m[39m[34m)[39m, e.g. [33m{ entries: ['...'], type: 'TXT' }[39m │[0m
[0m└─────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘[0m

[0mHere is an example of the [33mret[39m object passed to the callback:[0m

[90m<!-- eslint-disable semi -->[39m
[90m[39m    [33m[[39m [33m{[39m [37mtype[39m[93m:[39m [92m'A'[39m[32m,[39m [37maddress[39m[93m:[39m [92m'127.0.0.1'[39m[32m,[39m [37mttl[39m[93m:[39m [34m299[39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'CNAME'[39m[32m,[39m [37mvalue[39m[93m:[39m [92m'example.com'[39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'MX'[39m[32m,[39m [37mexchange[39m[93m:[39m [92m'alt4.aspmx.l.example.com'[39m[32m,[39m [37mpriority[39m[93m:[39m [34m50[39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'NS'[39m[32m,[39m [37mvalue[39m[93m:[39m [92m'ns1.example.com'[39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'TXT'[39m[32m,[39m [37mentries[39m[93m:[39m [33m[[39m [92m'v=spf1 include:_spf.example.com ~all'[39m [33m][39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'SOA'[39m[32m,[39m
        [37mnsname[39m[93m:[39m [92m'ns1.example.com'[39m[32m,[39m
        [37mhostmaster[39m[93m:[39m [92m'admin.example.com'[39m[32m,[39m
        [37mserial[39m[93m:[39m [34m156696742[39m[32m,[39m
        [37mrefresh[39m[93m:[39m [34m900[39m[32m,[39m
        [37mretry[39m[93m:[39m [34m900[39m[32m,[39m
        [37mexpire[39m[93m:[39m [34m1800[39m[32m,[39m
        [37mminttl[39m[93m:[39m [34m60[39m [33m}[39m [33m][39m

[0mDNS server operators may choose not to respond to [33mANY[39m[0m
[0mqueries. It may be better to call individual methods like [34m[33mdns.resolve4()[39m[34m ([34m[4m#dns_dns_resolve4_hostname_options_callback[24m[39m[34m)[39m,[0m
[0m[34m[33mdns.resolveMx()[39m[34m ([34m[4m#dns_dns_resolvemx_hostname_callback[24m[39m[34m)[39m, and so on. For more details, see [34mRFC 8482 ([34m[4mhttps://tools.ietf.org/html/rfc8482[24m[39m[34m)[39m.[0m

[32m[1m## [33mdns.resolveCname(hostname, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddresses[39m {string[]}[0m[0m[0m

[0mUses the DNS protocol to resolve [33mCNAME[39m records for the [33mhostname[39m. The[0m
[0m[33maddresses[39m argument passed to the [33mcallback[39m function[0m
[0mwill contain an array of canonical name records available for the [33mhostname[39m[0m
[0m(e.g. [33m['bar.example.com'][39m).[0m

[32m[1m## [33mdns.resolveMx(hostname, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.27[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddresses[39m {Object[]}[0m[0m[0m

[0mUses the DNS protocol to resolve mail exchange records ([33mMX[39m records) for the[0m
[0m[33mhostname[39m. The [33maddresses[39m argument passed to the [33mcallback[39m function will[0m
[0mcontain an array of objects containing both a [33mpriority[39m and [33mexchange[39m[0m
[0mproperty (e.g. [33m[{priority: 10, exchange: 'mx.example.com'}, ...][39m).[0m

[32m[1m## [33mdns.resolveNaptr(hostname, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.12[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddresses[39m {Object[]}[0m[0m[0m

[0mUses the DNS protocol to resolve regular expression based records ([33mNAPTR[39m[0m
[0mrecords) for the [33mhostname[39m. The [33maddresses[39m argument passed to the [33mcallback[39m[0m
[0mfunction will contain an array of objects with the following properties:[0m

    * [0m[33mflags[39m[0m
    * [0m[33mservice[39m[0m
    * [0m[33mregexp[39m[0m
    * [0m[33mreplacement[39m[0m
    * [0m[33morder[39m[0m
    * [0m[33mpreference[39m[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mflags[39m[93m:[39m [92m's'[39m[32m,[39m
      [37mservice[39m[93m:[39m [92m'SIP+D2U'[39m[32m,[39m
      [37mregexp[39m[93m:[39m [92m''[39m[32m,[39m
      [37mreplacement[39m[93m:[39m [92m'_sip._udp.example.com'[39m[32m,[39m
      [37morder[39m[93m:[39m [34m30[39m[32m,[39m
      [37mpreference[39m[93m:[39m [34m100[39m
    [33m}[39m

[32m[1m## [33mdns.resolveNs(hostname, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddresses[39m {string[]}[0m[0m[0m

[0mUses the DNS protocol to resolve name server records ([33mNS[39m records) for the[0m
[0m[33mhostname[39m. The [33maddresses[39m argument passed to the [33mcallback[39m function will[0m
[0mcontain an array of name server records available for [33mhostname[39m[0m
[0m(e.g. [33m['ns1.example.com', 'ns2.example.com'][39m).[0m

[32m[1m## [33mdns.resolvePtr(hostname, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddresses[39m {string[]}[0m[0m[0m

[0mUses the DNS protocol to resolve pointer records ([33mPTR[39m records) for the[0m
[0m[33mhostname[39m. The [33maddresses[39m argument passed to the [33mcallback[39m function will[0m
[0mbe an array of strings containing the reply records.[0m

[32m[1m## [33mdns.resolveSoa(hostname, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddress[39m {Object}[0m[0m[0m

[0mUses the DNS protocol to resolve a start of authority record ([33mSOA[39m record) for[0m
[0mthe [33mhostname[39m. The [33maddress[39m argument passed to the [33mcallback[39m function will[0m
[0mbe an object with the following properties:[0m

    * [0m[33mnsname[39m[0m
    * [0m[33mhostmaster[39m[0m
    * [0m[33mserial[39m[0m
    * [0m[33mrefresh[39m[0m
    * [0m[33mretry[39m[0m
    * [0m[33mexpire[39m[0m
    * [0m[33mminttl[39m[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mnsname[39m[93m:[39m [92m'ns.example.com'[39m[32m,[39m
      [37mhostmaster[39m[93m:[39m [92m'root.example.com'[39m[32m,[39m
      [37mserial[39m[93m:[39m [34m2013101809[39m[32m,[39m
      [37mrefresh[39m[93m:[39m [34m10000[39m[32m,[39m
      [37mretry[39m[93m:[39m [34m2400[39m[32m,[39m
      [37mexpire[39m[93m:[39m [34m604800[39m[32m,[39m
      [37mminttl[39m[93m:[39m [34m3600[39m
    [33m}[39m

[32m[1m## [33mdns.resolveSrv(hostname, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.27[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33maddresses[39m {Object[]}[0m[0m[0m

[0mUses the DNS protocol to resolve service records ([33mSRV[39m records) for the[0m
[0m[33mhostname[39m. The [33maddresses[39m argument passed to the [33mcallback[39m function will[0m
[0mbe an array of objects with the following properties:[0m

    * [0m[33mpriority[39m[0m
    * [0m[33mweight[39m[0m
    * [0m[33mport[39m[0m
    * [0m[33mname[39m[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mpriority[39m[93m:[39m [34m10[39m[32m,[39m
      [37mweight[39m[93m:[39m [34m5[39m[32m,[39m
      [37mport[39m[93m:[39m [34m21223[39m[32m,[39m
      [37mname[39m[93m:[39m [92m'service.example.com'[39m
    [33m}[39m

[32m[1m## [33mdns.resolveTxt(hostname, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.27[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mrecords[39m [90m<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type" class="type">[39m<string[][]>[90m</a>[39m[0m[0m[0m

[0mUses the DNS protocol to resolve text queries ([33mTXT[39m records) for the[0m
[0m[33mhostname[39m. The [33mrecords[39m argument passed to the [33mcallback[39m function is a[0m
[0mtwo-dimensional array of the text records available for [33mhostname[39m (e.g.[0m
[0m[33m[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ][39m). Each sub-array contains TXT chunks of[0m
[0mone record. Depending on the use case, these could be either joined together or[0m
[0mtreated separately.[0m

[32m[1m## [33mdns.reverse(ip, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mip[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mhostnames[39m {string[]}[0m[0m[0m

[0mPerforms a reverse DNS query that resolves an IPv4 or IPv6 address to an[0m
[0marray of host names.[0m

[0mOn error, [33merr[39m is an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object, where [33merr.code[39m is[0m
[0mone of the [34mDNS error codes ([34m[4m#dns_error_codes[24m[39m[34m)[39m.[0m

[32m[1m## [33mdns.setServers(servers)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mservers[39m {string[]} array of [34mRFC 5952 ([34m[4mhttps://tools.ietf.org/html/rfc5952#section-6[24m[39m[34m)[39m formatted addresses[0m

[0mSets the IP address and port of servers to be used when performing DNS[0m
[0mresolution. The [33mservers[39m argument is an array of [34mRFC 5952 ([34m[4mhttps://tools.ietf.org/html/rfc5952#section-6[24m[39m[34m)[39m formatted[0m
[0maddresses. If the port is the IANA default DNS port (53) it can be omitted.[0m

    [37mdns[39m[32m.[39m[37msetServers[39m[90m([39m[33m[[39m
      [92m'4.4.4.4'[39m[32m,[39m
      [92m'[2001:4860:4860::8888]'[39m[32m,[39m
      [92m'4.4.4.4:1053'[39m[32m,[39m
      [92m'[2001:4860:4860::8888]:1053'[39m
    [33m][39m[90m)[39m[90m;[39m

[0mAn error will be thrown if an invalid address is provided.[0m

[0mThe [33mdns.setServers()[39m method must not be called while a DNS query is in[0m
[0mprogress.[0m

[0mThe [34m[33mdns.setServers()[39m[34m ([34m[4m#dns_dns_setservers_servers[24m[39m[34m)[39m method affects only [34m[33mdns.resolve()[39m[34m ([34m[4m#dns_dns_resolve_hostname_rrtype_callback[24m[39m[34m)[39m,[0m
[0m[33mdns.resolve*()[39m and [34m[33mdns.reverse()[39m[34m ([34m[4m#dns_dns_reverse_ip_callback[24m[39m[34m)[39m (and specifically [3mnot[23m[0m
[0m[34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m).[0m

[0mThis method works much like[0m
[0m[34mresolve.conf ([34m[4mhttp://man7.org/linux/man-pages/man5/resolv.conf.5.html[24m[39m[34m)[39m.[0m
[0mThat is, if attempting to resolve with the first server provided results in a[0m
[0m[33mNOTFOUND[39m error, the [33mresolve()[39m method will [3mnot[23m attempt to resolve with[0m
[0msubsequent servers provided. Fallback DNS servers will only be used if the[0m
[0mearlier ones time out or result in some other error.[0m

[32m[1m## DNS Promises API[22m[39m

[0mThe [33mdns.promises[39m API provides an alternative set of asynchronous DNS methods[0m
[0mthat return [33mPromise[39m objects rather than using callbacks. The API is accessible[0m
[0mvia [33mrequire('dns').promises[39m.[0m

[32m[1m### Class: [33mdnsPromises.Resolver[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn independent resolver for DNS requests.[0m

[0mCreating a new resolver uses the default server settings. Setting[0m
[0mthe servers used for a resolver using[0m
[0m[34m[33mresolver.setServers()[39m[34m ([34m[4m#dns_dnspromises_setservers_servers[24m[39m[34m)[39m does not affect[0m
[0mother resolvers:[0m

    [94mconst[39m [33m{[39m [37mResolver[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dns'[39m[90m)[39m[32m.[39m[37mpromises[39m[90m;[39m
    [94mconst[39m [37mresolver[39m [93m=[39m [31mnew[39m [37mResolver[39m[90m([39m[90m)[39m[90m;[39m
    [37mresolver[39m[32m.[39m[37msetServers[39m[90m([39m[33m[[39m[92m'4.4.4.4'[39m[33m][39m[90m)[39m[90m;[39m
    
    [90m// This request will use the server at 4.4.4.4, independent of global settings.[39m
    [37mresolver[39m[32m.[39m[37mresolve4[39m[90m([39m[92m'example.org'[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37maddresses[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Alternatively, the same code can be written using async-await style.[39m
    [90m([39m[37masync[39m [94mfunction[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [37maddresses[39m [93m=[39m [37mawait[39m [37mresolver[39m[32m.[39m[37mresolve4[39m[90m([39m[92m'example.org'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[0mThe following methods from the [33mdnsPromises[39m API are available:[0m

    * [0m[34m[33mresolver.getServers()[39m[34m ([34m[4m#dns_dnspromises_getservers[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolve()[39m[34m ([34m[4m#dns_dnspromises_resolve_hostname_rrtype[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolve4()[39m[34m ([34m[4m#dns_dnspromises_resolve4_hostname_options[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolve6()[39m[34m ([34m[4m#dns_dnspromises_resolve6_hostname_options[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveAny()[39m[34m ([34m[4m#dns_dnspromises_resolveany_hostname[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveCname()[39m[34m ([34m[4m#dns_dnspromises_resolvecname_hostname[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveMx()[39m[34m ([34m[4m#dns_dnspromises_resolvemx_hostname[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveNaptr()[39m[34m ([34m[4m#dns_dnspromises_resolvenaptr_hostname[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveNs()[39m[34m ([34m[4m#dns_dnspromises_resolvens_hostname[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolvePtr()[39m[34m ([34m[4m#dns_dnspromises_resolveptr_hostname[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveSoa()[39m[34m ([34m[4m#dns_dnspromises_resolvesoa_hostname[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveSrv()[39m[34m ([34m[4m#dns_dnspromises_resolvesrv_hostname[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.resolveTxt()[39m[34m ([34m[4m#dns_dnspromises_resolvetxt_hostname[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.reverse()[39m[34m ([34m[4m#dns_dnspromises_reverse_ip[24m[39m[34m)[39m[0m
    * [0m[34m[33mresolver.setServers()[39m[34m ([34m[4m#dns_dnspromises_setservers_servers[24m[39m[34m)[39m[0m

[32m[1m### [33mdnsPromises.getServers()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string[]}[0m

[0mReturns an array of IP address strings, formatted according to [34mRFC 5952 ([34m[4mhttps://tools.ietf.org/html/rfc5952#section-6[24m[39m[34m)[39m,[0m
[0mthat are currently configured for DNS resolution. A string will include a port[0m
[0msection if a custom port is used.[0m

[90m<!-- eslint-disable semi-->[39m
[90m[39m    [33m[[39m
      [92m'4.4.4.4'[39m[32m,[39m
      [92m'2001:4860:4860::8888'[39m[32m,[39m
      [92m'4.4.4.4:1053'[39m[32m,[39m
      [92m'[2001:4860:4860::8888]:1053'[39m
    [33m][39m

[32m[1m### [33mdnsPromises.lookup(hostname[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m
    * [0m[33moptions[39m {integer | Object}
        * [0m[0m[33mfamily[39m {integer} The record family. Must be [33m4[39m, [33m6[39m, or [33m0[39m. The value[0m[0m[0m
      [0m      [0m[0m[33m0[39m indicates that IPv4 and IPv6 addresses are both returned. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mhints[39m {number} One or more [34msupported [33mgetaddrinfo[39m[34m flags ([34m[4m#dns_supported_getaddrinfo_flags[24m[39m[34m)[39m. Multiple[0m[0m[0m
      [0m      [0m[0mflags may be passed by bitwise [33mOR[39ming their values.[0m[0m[0m
      [0m
        * [0m[0m[33mall[39m {boolean} When [33mtrue[39m, the [33mPromise[39m is resolved with all addresses in[0m[0m[0m
      [0m      [0m[0man array. Otherwise, returns a single address. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mverbatim[39m {boolean} When [33mtrue[39m, the [33mPromise[39m is resolved with IPv4 and[0m[0m[0m
      [0m      [0m[0mIPv6 addresses in the order the DNS resolver returned them. When [33mfalse[39m,[0m[0m[0m
      [0m      [0m[0mIPv4 addresses are placed before IPv6 addresses.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m currently [33mfalse[39m (addresses are reordered) but this is[0m[0m[0m
      [0m      [0m[0mexpected to change in the not too distant future.[0m[0m[0m
      [0m      [0m[0mNew code should use [33m{ verbatim: true }[39m.[0m[0m[0m

[0mResolves a host name (e.g. [33m'nodejs.org'[39m) into the first found A (IPv4) or[0m
[0mAAAA (IPv6) record. All [33moption[39m properties are optional. If [33moptions[39m is an[0m
[0minteger, then it must be [33m4[39m or [33m6[39m – if [33moptions[39m is not provided, then IPv4[0m
[0mand IPv6 addresses are both returned if found.[0m

[0mWith the [33mall[39m option set to [33mtrue[39m, the [33mPromise[39m is resolved with [33maddresses[39m[0m
[0mbeing an array of objects with the properties [33maddress[39m and [33mfamily[39m.[0m

[0mOn error, the [33mPromise[39m is rejected with an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object, where [33merr.code[39m[0m
[0mis the error code.[0m
[0mKeep in mind that [33merr.code[39m will be set to [33m'ENOTFOUND'[39m not only when[0m
[0mthe host name does not exist but also when the lookup fails in other ways[0m
[0msuch as no available file descriptors.[0m

[0m[34m[33mdnsPromises.lookup()[39m[34m ([34m[4m#dns_dnspromises_lookup_hostname_options[24m[39m[34m)[39m does not necessarily have anything to do with the DNS[0m
[0mprotocol. The implementation uses an operating system facility that can[0m
[0massociate names with addresses, and vice versa. This implementation can have[0m
[0msubtle but important consequences on the behavior of any Node.js program. Please[0m
[0mtake some time to consult the [34mImplementation considerations section ([34m[4m#dns_implementation_considerations[24m[39m[34m)[39m before[0m
[0musing [33mdnsPromises.lookup()[39m.[0m

[0mExample usage:[0m

    [94mconst[39m [37mdns[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dns'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mdnsPromises[39m [93m=[39m [37mdns[39m[32m.[39m[37mpromises[39m[90m;[39m
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mfamily[39m[93m:[39m [34m6[39m[32m,[39m
      [37mhints[39m[93m:[39m [37mdns[39m[32m.[39m[37mADDRCONFIG[39m [93m|[39m [37mdns[39m[32m.[39m[37mV4MAPPED[39m[32m,[39m
    [33m}[39m[90m;[39m
    
    [37mdnsPromises[39m[32m.[39m[37mlookup[39m[90m([39m[92m'example.com'[39m[32m,[39m [37moptions[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37mresult[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'address: %j family: IPv%s'[39m[32m,[39m [37mresult[39m[32m.[39m[37maddress[39m[32m,[39m [37mresult[39m[32m.[39m[37mfamily[39m[90m)[39m[90m;[39m
      [90m// address: "2606:2800:220:1:248:1893:25c8:1946" family: IPv6[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// When options.all is true, the result will be an Array.[39m
    [37moptions[39m[32m.[39m[37mall[39m [93m=[39m [91mtrue[39m[90m;[39m
    [37mdnsPromises[39m[32m.[39m[37mlookup[39m[90m([39m[92m'example.com'[39m[32m,[39m [37moptions[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37mresult[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'addresses: %j'[39m[32m,[39m [37mresult[39m[90m)[39m[90m;[39m
      [90m// addresses: [{"address":"2606:2800:220:1:248:1893:25c8:1946","family":6}][39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mdnsPromises.lookupService(address, port)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33maddress[39m {string}[0m
    * [0m[33mport[39m {number}[0m

[0mResolves the given [33maddress[39m and [33mport[39m into a host name and service using[0m
[0mthe operating system's underlying [33mgetnameinfo[39m implementation.[0m

[0mIf [33maddress[39m is not a valid IP address, a [33mTypeError[39m will be thrown.[0m
[0mThe [33mport[39m will be coerced to a number. If it is not a legal port, a [33mTypeError[39m[0m
[0mwill be thrown.[0m

[0mOn error, the [33mPromise[39m is rejected with an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object, where [33merr.code[39m[0m
[0mis the error code.[0m

    [94mconst[39m [37mdnsPromises[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/dns'[39m[90m)[39m[32m.[39m[37mpromises[39m[90m;[39m
    [37mdnsPromises[39m[32m.[39m[37mlookupService[39m[90m([39m[92m'127.0.0.1'[39m[32m,[39m [34m22[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37mresult[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mresult[39m[32m.[39m[37mhostname[39m[32m,[39m [37mresult[39m[32m.[39m[37mservice[39m[90m)[39m[90m;[39m
      [90m// Prints: localhost ssh[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mdnsPromises.resolve(hostname[, rrtype])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string} Host name to resolve.[0m
    * [0m[33mrrtype[39m {string} Resource record type. [1mDefault:[22m [33m'A'[39m.[0m

[0mUses the DNS protocol to resolve a host name (e.g. [33m'nodejs.org'[39m) into an array[0m
[0mof the resource records. When successful, the [33mPromise[39m is resolved with an[0m
[0marray of resource records. The type and structure of individual results vary[0m
[0mbased on [33mrrtype[39m:[0m

[0m┌─────────┬────────────────────────────────┬─────────────┬─────────────────────────────────────────────────────────────────────┐[0m
[0m│ [33mrrtype[39m  │ [33mrecords[39m contains               │ Result type │ Shorthand method                                                    │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'A'[39m     │ IPv4 addresses (default)       │ {string}    │ [34m[33mdnsPromises.resolve4()[39m[34m ([34m[4m#dns_dnspromises_resolve4_hostname_options[24m[39m[34m)[39m │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'AAAA'[39m  │ IPv6 addresses                 │ {string}    │ [34m[33mdnsPromises.resolve6()[39m[34m ([34m[4m#dns_dnspromises_resolve6_hostname_options[24m[39m[34m)[39m │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'ANY'[39m   │ any records                    │ {Object}    │ [34m[33mdnsPromises.resolveAny()[39m[34m ([34m[4m#dns_dnspromises_resolveany_hostname[24m[39m[34m)[39m     │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'CNAME'[39m │ canonical name records         │ {string}    │ [34m[33mdnsPromises.resolveCname()[39m[34m ([34m[4m#dns_dnspromises_resolvecname_hostname[24m[39m[34m)[39m │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'MX'[39m    │ mail exchange records          │ {Object}    │ [34m[33mdnsPromises.resolveMx()[39m[34m ([34m[4m#dns_dnspromises_resolvemx_hostname[24m[39m[34m)[39m       │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'NAPTR'[39m │ name authority pointer records │ {Object}    │ [34m[33mdnsPromises.resolveNaptr()[39m[34m ([34m[4m#dns_dnspromises_resolvenaptr_hostname[24m[39m[34m)[39m │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'NS'[39m    │ name server records            │ {string}    │ [34m[33mdnsPromises.resolveNs()[39m[34m ([34m[4m#dns_dnspromises_resolvens_hostname[24m[39m[34m)[39m       │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'PTR'[39m   │ pointer records                │ {string}    │ [34m[33mdnsPromises.resolvePtr()[39m[34m ([34m[4m#dns_dnspromises_resolveptr_hostname[24m[39m[34m)[39m     │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'SOA'[39m   │ start of authority records     │ {Object}    │ [34m[33mdnsPromises.resolveSoa()[39m[34m ([34m[4m#dns_dnspromises_resolvesoa_hostname[24m[39m[34m)[39m     │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'SRV'[39m   │ service records                │ {Object}    │ [34m[33mdnsPromises.resolveSrv()[39m[34m ([34m[4m#dns_dnspromises_resolvesrv_hostname[24m[39m[34m)[39m     │[0m
[0m├─────────┼────────────────────────────────┼─────────────┼─────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'TXT'[39m   │ text records                   │ {string[]}  │ [34m[33mdnsPromises.resolveTxt()[39m[34m ([34m[4m#dns_dnspromises_resolvetxt_hostname[24m[39m[34m)[39m     │[0m
[0m└─────────┴────────────────────────────────┴─────────────┴─────────────────────────────────────────────────────────────────────┘[0m

[0mOn error, the [33mPromise[39m is rejected with an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object, where [33merr.code[39m[0m
[0mis one of the [34mDNS error codes ([34m[4m#dns_error_codes[24m[39m[34m)[39m.[0m

[32m[1m### [33mdnsPromises.resolve4(hostname[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string} Host name to resolve.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mttl[39m {boolean} Retrieve the Time-To-Live value (TTL) of each record.[0m[0m[0m
      [0m      [0m[0mWhen [33mtrue[39m, the [33mPromise[39m is resolved with an array of[0m[0m[0m
      [0m      [0m[0m[33m{ address: '1.2.3.4', ttl: 60 }[39m objects rather than an array of strings,[0m[0m[0m
      [0m      [0m[0mwith the TTL expressed in seconds.[0m[0m[0m

[0mUses the DNS protocol to resolve IPv4 addresses ([33mA[39m records) for the[0m
[0m[33mhostname[39m. On success, the [33mPromise[39m is resolved with an array of IPv4[0m
[0maddresses (e.g. [33m['74.125.79.104', '74.125.79.105', '74.125.79.106'][39m).[0m

[32m[1m### [33mdnsPromises.resolve6(hostname[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string} Host name to resolve.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mttl[39m {boolean} Retrieve the Time-To-Live value (TTL) of each record.[0m[0m[0m
      [0m      [0m[0mWhen [33mtrue[39m, the [33mPromise[39m is resolved with an array of[0m[0m[0m
      [0m      [0m[0m[33m{ address: '0:1: 2:3: 4:5: 6:7', ttl: 60 }[39m objects rather than an array of[0m[0m[0m
      [0m      [0m[0mstrings, with the TTL expressed in seconds.[0m[0m[0m

[0mUses the DNS protocol to resolve IPv6 addresses ([33mAAAA[39m records) for the[0m
[0m[33mhostname[39m. On success, the [33mPromise[39m is resolved with an array of IPv6[0m
[0maddresses.[0m

[32m[1m### [33mdnsPromises.resolveAny(hostname)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m

[0mUses the DNS protocol to resolve all records (also known as [33mANY[39m or [33m*[39m query).[0m
[0mOn success, the [33mPromise[39m is resolved with an array containing various types of[0m
[0mrecords. Each object has a property [33mtype[39m that indicates the type of the[0m
[0mcurrent record. And depending on the [33mtype[39m, additional properties will be[0m
[0mpresent on the object:[0m

[0m┌─────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐[0m
[0m│ Type    │ Properties                                                                                                                                                                            │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'A'[39m     │ [33maddress[39m/[33mttl[39m                                                                                                                                                                           │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'AAAA'[39m  │ [33maddress[39m/[33mttl[39m                                                                                                                                                                           │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'CNAME'[39m │ [33mvalue[39m                                                                                                                                                                                 │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'MX'[39m    │ Refer to [34m[33mdnsPromises.resolveMx()[39m[34m ([34m[4m#dns_dnspromises_resolvemx_hostname[24m[39m[34m)[39m                                                                                                                │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'NAPTR'[39m │ Refer to [34m[33mdnsPromises.resolveNaptr()[39m[34m ([34m[4m#dns_dnspromises_resolvenaptr_hostname[24m[39m[34m)[39m                                                                                                          │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'NS'[39m    │ [33mvalue[39m                                                                                                                                                                                 │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'PTR'[39m   │ [33mvalue[39m                                                                                                                                                                                 │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'SOA'[39m   │ Refer to [34m[33mdnsPromises.resolveSoa()[39m[34m ([34m[4m#dns_dnspromises_resolvesoa_hostname[24m[39m[34m)[39m                                                                                                              │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'SRV'[39m   │ Refer to [34m[33mdnsPromises.resolveSrv()[39m[34m ([34m[4m#dns_dnspromises_resolvesrv_hostname[24m[39m[34m)[39m                                                                                                              │[0m
[0m├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'TXT'[39m   │ This type of record contains an array property called [33mentries[39m which refers to [34m[33mdnsPromises.resolveTxt()[39m[34m ([34m[4m#dns_dnspromises_resolvetxt_hostname[24m[39m[34m)[39m, e.g. [33m{ entries: ['...'], type: 'TXT' }[39m │[0m
[0m└─────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘[0m

[0mHere is an example of the result object:[0m

[90m<!-- eslint-disable semi -->[39m
[90m[39m    [33m[[39m [33m{[39m [37mtype[39m[93m:[39m [92m'A'[39m[32m,[39m [37maddress[39m[93m:[39m [92m'127.0.0.1'[39m[32m,[39m [37mttl[39m[93m:[39m [34m299[39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'CNAME'[39m[32m,[39m [37mvalue[39m[93m:[39m [92m'example.com'[39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'MX'[39m[32m,[39m [37mexchange[39m[93m:[39m [92m'alt4.aspmx.l.example.com'[39m[32m,[39m [37mpriority[39m[93m:[39m [34m50[39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'NS'[39m[32m,[39m [37mvalue[39m[93m:[39m [92m'ns1.example.com'[39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'TXT'[39m[32m,[39m [37mentries[39m[93m:[39m [33m[[39m [92m'v=spf1 include:_spf.example.com ~all'[39m [33m][39m [33m}[39m[32m,[39m
      [33m{[39m [37mtype[39m[93m:[39m [92m'SOA'[39m[32m,[39m
        [37mnsname[39m[93m:[39m [92m'ns1.example.com'[39m[32m,[39m
        [37mhostmaster[39m[93m:[39m [92m'admin.example.com'[39m[32m,[39m
        [37mserial[39m[93m:[39m [34m156696742[39m[32m,[39m
        [37mrefresh[39m[93m:[39m [34m900[39m[32m,[39m
        [37mretry[39m[93m:[39m [34m900[39m[32m,[39m
        [37mexpire[39m[93m:[39m [34m1800[39m[32m,[39m
        [37mminttl[39m[93m:[39m [34m60[39m [33m}[39m [33m][39m

[32m[1m### [33mdnsPromises.resolveCname(hostname)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m

[0mUses the DNS protocol to resolve [33mCNAME[39m records for the [33mhostname[39m. On success,[0m
[0mthe [33mPromise[39m is resolved with an array of canonical name records available for[0m
[0mthe [33mhostname[39m (e.g. [33m['bar.example.com'][39m).[0m

[32m[1m### [33mdnsPromises.resolveMx(hostname)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m

[0mUses the DNS protocol to resolve mail exchange records ([33mMX[39m records) for the[0m
[0m[33mhostname[39m. On success, the [33mPromise[39m is resolved with an array of objects[0m
[0mcontaining both a [33mpriority[39m and [33mexchange[39m property (e.g.[0m
[0m[33m[{priority: 10, exchange: 'mx.example.com'}, ...][39m).[0m

[32m[1m### [33mdnsPromises.resolveNaptr(hostname)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m

[0mUses the DNS protocol to resolve regular expression based records ([33mNAPTR[39m[0m
[0mrecords) for the [33mhostname[39m. On success, the [33mPromise[39m is resolved with an array[0m
[0mof objects with the following properties:[0m

    * [0m[33mflags[39m[0m
    * [0m[33mservice[39m[0m
    * [0m[33mregexp[39m[0m
    * [0m[33mreplacement[39m[0m
    * [0m[33morder[39m[0m
    * [0m[33mpreference[39m[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mflags[39m[93m:[39m [92m's'[39m[32m,[39m
      [37mservice[39m[93m:[39m [92m'SIP+D2U'[39m[32m,[39m
      [37mregexp[39m[93m:[39m [92m''[39m[32m,[39m
      [37mreplacement[39m[93m:[39m [92m'_sip._udp.example.com'[39m[32m,[39m
      [37morder[39m[93m:[39m [34m30[39m[32m,[39m
      [37mpreference[39m[93m:[39m [34m100[39m
    [33m}[39m

[32m[1m### [33mdnsPromises.resolveNs(hostname)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m

[0mUses the DNS protocol to resolve name server records ([33mNS[39m records) for the[0m
[0m[33mhostname[39m. On success, the [33mPromise[39m is resolved with an array of name server[0m
[0mrecords available for [33mhostname[39m (e.g.[0m
[0m[33m['ns1.example.com', 'ns2.example.com'][39m).[0m

[32m[1m### [33mdnsPromises.resolvePtr(hostname)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m

[0mUses the DNS protocol to resolve pointer records ([33mPTR[39m records) for the[0m
[0m[33mhostname[39m. On success, the [33mPromise[39m is resolved with an array of strings[0m
[0mcontaining the reply records.[0m

[32m[1m### [33mdnsPromises.resolveSoa(hostname)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m

[0mUses the DNS protocol to resolve a start of authority record ([33mSOA[39m record) for[0m
[0mthe [33mhostname[39m. On success, the [33mPromise[39m is resolved with an object with the[0m
[0mfollowing properties:[0m

    * [0m[33mnsname[39m[0m
    * [0m[33mhostmaster[39m[0m
    * [0m[33mserial[39m[0m
    * [0m[33mrefresh[39m[0m
    * [0m[33mretry[39m[0m
    * [0m[33mexpire[39m[0m
    * [0m[33mminttl[39m[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mnsname[39m[93m:[39m [92m'ns.example.com'[39m[32m,[39m
      [37mhostmaster[39m[93m:[39m [92m'root.example.com'[39m[32m,[39m
      [37mserial[39m[93m:[39m [34m2013101809[39m[32m,[39m
      [37mrefresh[39m[93m:[39m [34m10000[39m[32m,[39m
      [37mretry[39m[93m:[39m [34m2400[39m[32m,[39m
      [37mexpire[39m[93m:[39m [34m604800[39m[32m,[39m
      [37mminttl[39m[93m:[39m [34m3600[39m
    [33m}[39m

[32m[1m### [33mdnsPromises.resolveSrv(hostname)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m

[0mUses the DNS protocol to resolve service records ([33mSRV[39m records) for the[0m
[0m[33mhostname[39m. On success, the [33mPromise[39m is resolved with an array of objects with[0m
[0mthe following properties:[0m

    * [0m[33mpriority[39m[0m
    * [0m[33mweight[39m[0m
    * [0m[33mport[39m[0m
    * [0m[33mname[39m[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [37mpriority[39m[93m:[39m [34m10[39m[32m,[39m
      [37mweight[39m[93m:[39m [34m5[39m[32m,[39m
      [37mport[39m[93m:[39m [34m21223[39m[32m,[39m
      [37mname[39m[93m:[39m [92m'service.example.com'[39m
    [33m}[39m

[32m[1m### [33mdnsPromises.resolveTxt(hostname)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string}[0m

[0mUses the DNS protocol to resolve text queries ([33mTXT[39m records) for the[0m
[0m[33mhostname[39m. On success, the [33mPromise[39m is resolved with a two-dimensional array[0m
[0mof the text records available for [33mhostname[39m (e.g.[0m
[0m[33m[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ][39m). Each sub-array contains TXT chunks of[0m
[0mone record. Depending on the use case, these could be either joined together or[0m
[0mtreated separately.[0m

[32m[1m### [33mdnsPromises.reverse(ip)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mip[39m {string}[0m

[0mPerforms a reverse DNS query that resolves an IPv4 or IPv6 address to an[0m
[0marray of host names.[0m

[0mOn error, the [33mPromise[39m is rejected with an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object, where [33merr.code[39m[0m
[0mis one of the [34mDNS error codes ([34m[4m#dns_error_codes[24m[39m[34m)[39m.[0m

[32m[1m### [33mdnsPromises.setServers(servers)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mservers[39m {string[]} array of [34mRFC 5952 ([34m[4mhttps://tools.ietf.org/html/rfc5952#section-6[24m[39m[34m)[39m formatted addresses[0m

[0mSets the IP address and port of servers to be used when performing DNS[0m
[0mresolution. The [33mservers[39m argument is an array of [34mRFC 5952 ([34m[4mhttps://tools.ietf.org/html/rfc5952#section-6[24m[39m[34m)[39m formatted[0m
[0maddresses. If the port is the IANA default DNS port (53) it can be omitted.[0m

    [37mdnsPromises[39m[32m.[39m[37msetServers[39m[90m([39m[33m[[39m
      [92m'4.4.4.4'[39m[32m,[39m
      [92m'[2001:4860:4860::8888]'[39m[32m,[39m
      [92m'4.4.4.4:1053'[39m[32m,[39m
      [92m'[2001:4860:4860::8888]:1053'[39m
    [33m][39m[90m)[39m[90m;[39m

[0mAn error will be thrown if an invalid address is provided.[0m

[0mThe [33mdnsPromises.setServers()[39m method must not be called while a DNS query is in[0m
[0mprogress.[0m

[0mThis method works much like[0m
[0m[34mresolve.conf ([34m[4mhttp://man7.org/linux/man-pages/man5/resolv.conf.5.html[24m[39m[34m)[39m.[0m
[0mThat is, if attempting to resolve with the first server provided results in a[0m
[0m[33mNOTFOUND[39m error, the [33mresolve()[39m method will [3mnot[23m attempt to resolve with[0m
[0msubsequent servers provided. Fallback DNS servers will only be used if the[0m
[0mearlier ones time out or result in some other error.[0m

[32m[1m## Error codes[22m[39m

[0mEach DNS query can return one of the following error codes:[0m

    * [0m[33mdns.NODATA[39m: DNS server returned answer with no data.[0m
    * [0m[33mdns.FORMERR[39m: DNS server claims query was misformatted.[0m
    * [0m[33mdns.SERVFAIL[39m: DNS server returned general failure.[0m
    * [0m[33mdns.NOTFOUND[39m: Domain name not found.[0m
    * [0m[33mdns.NOTIMP[39m: DNS server does not implement requested operation.[0m
    * [0m[33mdns.REFUSED[39m: DNS server refused query.[0m
    * [0m[33mdns.BADQUERY[39m: Misformatted DNS query.[0m
    * [0m[33mdns.BADNAME[39m: Misformatted host name.[0m
    * [0m[33mdns.BADFAMILY[39m: Unsupported address family.[0m
    * [0m[33mdns.BADRESP[39m: Misformatted DNS reply.[0m
    * [0m[33mdns.CONNREFUSED[39m: Could not contact DNS servers.[0m
    * [0m[33mdns.TIMEOUT[39m: Timeout while contacting DNS servers.[0m
    * [0m[33mdns.EOF[39m: End of file.[0m
    * [0m[33mdns.FILE[39m: Error reading file.[0m
    * [0m[33mdns.NOMEM[39m: Out of memory.[0m
    * [0m[33mdns.DESTRUCTION[39m: Channel is being destroyed.[0m
    * [0m[33mdns.BADSTR[39m: Misformatted string.[0m
    * [0m[33mdns.BADFLAGS[39m: Illegal flags specified.[0m
    * [0m[33mdns.NONAME[39m: Given host name is not numeric.[0m
    * [0m[33mdns.BADHINTS[39m: Illegal hints flags specified.[0m
    * [0m[33mdns.NOTINITIALIZED[39m: c-ares library initialization not yet performed.[0m
    * [0m[33mdns.LOADIPHLPAPI[39m: Error loading [33miphlpapi.dll[39m.[0m
    * [0m[33mdns.ADDRGETNETWORKPARAMS[39m: Could not find [33mGetNetworkParams[39m function.[0m
    * [0m[33mdns.CANCELLED[39m: DNS query cancelled.[0m

[32m[1m## Implementation considerations[22m[39m

[0mAlthough [34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m and the various [33mdns.resolve*()/dns.reverse()[39m[0m
[0mfunctions have the same goal of associating a network name with a network[0m
[0maddress (or vice versa), their behavior is quite different. These differences[0m
[0mcan have subtle but significant consequences on the behavior of Node.js[0m
[0mprograms.[0m

[32m[1m### [33mdns.lookup()[39m[32m[22m[39m

[0mUnder the hood, [34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m uses the same operating system facilities[0m
[0mas most other programs. For instance, [34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m will almost always[0m
[0mresolve a given name the same way as the [33mping[39m command. On most POSIX-like[0m
[0moperating systems, the behavior of the [34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m function can be[0m
[0mmodified by changing settings in nsswitch.conf(5) and/or resolv.conf(5),[0m
[0mbut changing these files will change the behavior of all other[0m
[0mprograms running on the same operating system.[0m

[0mThough the call to [33mdns.lookup()[39m will be asynchronous from JavaScript's[0m
[0mperspective, it is implemented as a synchronous call to getaddrinfo(3) that runs[0m
[0mon libuv's threadpool. This can have surprising negative performance[0m
[0mimplications for some applications, see the [34m[33mUV_THREADPOOL_SIZE[39m[34m ([34m[4mcli.html#cli_uv_threadpool_size_size[24m[39m[34m)[39m[0m
[0mdocumentation for more information.[0m

[0mVarious networking APIs will call [33mdns.lookup()[39m internally to resolve[0m
[0mhost names. If that is an issue, consider resolving the host name to an address[0m
[0musing [33mdns.resolve()[39m and using the address instead of a host name. Also, some[0m
[0mnetworking APIs (such as [34m[33msocket.connect()[39m[34m ([34m[4mnet.html#net_socket_connect_options_connectlistener[24m[39m[34m)[39m and [34m[33mdgram.createSocket()[39m[34m ([34m[4mdgram.html#dgram_dgram_createsocket_options_callback[24m[39m[34m)[39m)[0m
[0mallow the default resolver, [33mdns.lookup()[39m, to be replaced.[0m

[32m[1m### [33mdns.resolve()[39m[32m, [33mdns.resolve*()[39m[32m and [33mdns.reverse()[39m[32m[22m[39m

[0mThese functions are implemented quite differently than [34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m. They[0m
[0mdo not use getaddrinfo(3) and they [3malways[23m perform a DNS query on the[0m
[0mnetwork. This network communication is always done asynchronously, and does not[0m
[0muse libuv's threadpool.[0m

[0mAs a result, these functions cannot have the same negative impact on other[0m
[0mprocessing that happens on libuv's threadpool that [34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m can have.[0m

[0mThey do not use the same set of configuration files than what [34m[33mdns.lookup()[39m[34m ([34m[4m#dns_dns_lookup_hostname_options_callback[24m[39m[34m)[39m[0m
[0muses. For instance, [3mthey do not use the configuration from [33m/etc/hosts[39m[23m.[0m

