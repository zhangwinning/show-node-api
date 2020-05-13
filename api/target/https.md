[35m[4m[1m# HTTPS[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mHTTPS is the HTTP protocol over TLS/SSL. In Node.js this is implemented as a[0m
[0mseparate module.[0m

[32m[1m## Class: [33mhttps.Agent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.5[39m
[90mchanges:[39m
[90m  - version: v2.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2228[39m
[90m    description: parameter `maxCachedSessions` added to `options` for TLS[39m
[90m                 sessions reuse.[39m
[90m  - version: v5.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4252[39m
[90m    description: support `0` `maxCachedSessions` to disable TLS session caching.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAn [34m[33mAgent[39m[34m ([34m[4m#https_class_https_agent[24m[39m[34m)[39m object for HTTPS similar to [34m[33mhttp.Agent[39m[34m ([34m[4mhttp.html#http_class_http_agent[24m[39m[34m)[39m. See[0m
[0m[34m[33mhttps.request()[39m[34m ([34m[4m#https_https_request_options_callback[24m[39m[34m)[39m for more information.[0m

[32m[1m### [33mnew Agent([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28209[39m
[90m    description: do not automatically set servername if the target host was[39m
[90m                 specified using an IP address.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[0m[0m[33moptions[39m {Object} Set of configurable options to set on the agent.[0m[0m[0m
      [0m[0m[0mCan have the same fields as for [34m[33mhttp.Agent(options)[39m[34m ([34m[4mhttp.html#http_new_agent_options[24m[39m[34m)[39m, and[0m[0m[0m
      [0m[0m
      [0m
        * [0m[0m[0m[0m[0m[0m[33mmaxCachedSessions[39m {number} maximum number of TLS cached sessions.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m[0m[0m[0mUse [33m0[39m to disable TLS session caching. [1mDefault:[22m [33m100[39m.[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[0m[0m[0m[0m[33mservername[39m {string} the value of[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m[0m[0m[0m[34mServer Name Indication extension ([34m[4mhttps://en.wikipedia.org/wiki/Server_Name_Indication[24m[39m[34m)[39m to be sent to the server. Use[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m[0m[0m[0mempty string [33m''[39m to disable sending the extension.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m[0m[0m[0m[1mDefault:[22m host name of the target server, unless the target server[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m[0m[0m[0mis specified using an IP address, in which case the default is [33m''[39m (no[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m[0m[0m[0mextension).[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m[0m[0m
      [0m      [0m[0m[0m[0m[0m[0mSee [34m[33mSession Resumption[39m[34m ([34m[4mtls.html#tls_session_resumption[24m[39m[34m)[39m for information about TLS session reuse.[0m[0m[0m[0m[0m[0m[0m

[32m[1m#### Event: [33m'keylog'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mline[39m {Buffer} Line of ASCII text, in NSS [33mSSLKEYLOGFILE[39m format.[0m
    * [0m[33mtlsSocket[39m {tls.TLSSocket} The [33mtls.TLSSocket[39m instance on which it was[0m
      [0mgenerated.[0m

[0mThe [33mkeylog[39m event is emitted when key material is generated or received by a[0m
[0mconnection managed by this agent (typically before handshake has completed, but[0m
[0mnot necessarily). This keying material can be stored for debugging, as it[0m
[0mallows captured TLS traffic to be decrypted. It may be emitted multiple times[0m
[0mfor each socket.[0m

[0mA typical use case is to append received lines to a common text file, which is[0m
[0mlater used by software (such as Wireshark) to decrypt the traffic:[0m

    [90m// ...[39m
    [37mhttps[39m[32m.[39m[37mglobalAgent[39m[32m.[39m[37mon[39m[90m([39m[92m'keylog'[39m[32m,[39m [90m([39m[37mline[39m[32m,[39m [37mtlsSocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mfs[39m[32m.[39m[37mappendFileSync[39m[90m([39m[92m'/tmp/ssl-keys.log'[39m[32m,[39m [37mline[39m[32m,[39m [33m{[39m [37mmode[39m[93m:[39m [34m0o600[39m [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Class: [33mhttps.Server[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {tls.Server}[0m

[0mSee [34m[33mhttp.Server[39m[34m ([34m[4mhttp.html#http_class_http_server[24m[39m[34m)[39m for more information.[0m

[32m[1m### [33mserver.close([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {https.Server}[0m

[0mSee [34m[33mserver.close()[39m[34m ([34m[4mhttp.html#http_server_close_callback[24m[39m[34m)[39m from the HTTP module for details.[0m

[32m[1m### [33mserver.headersTimeout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} [1mDefault:[22m [33m60000[39m[0m

[0mSee [34m[33mhttp.Server#headersTimeout[39m[34m ([34m[4mhttp.html#http_server_headerstimeout[24m[39m[34m)[39m.[0m

[32m[1m### [33mserver.listen()[39m[32m[22m[39m

[0mStarts the HTTPS server listening for encrypted connections.[0m
[0mThis method is identical to [34m[33mserver.listen()[39m[34m ([34m[4mnet.html#net_server_listen[24m[39m[34m)[39m from [34m[33mnet.Server[39m[34m ([34m[4mnet.html#net_class_net_server[24m[39m[34m)[39m.[0m

[32m[1m### [33mserver.maxHeadersCount[39m[32m[22m[39m

    * [0m{number} [1mDefault:[22m [33m2000[39m[0m

[0mSee [34m[33mhttp.Server#maxHeadersCount[39m[34m ([34m[4mhttp.html#http_server_maxheaderscount[24m[39m[34m)[39m.[0m

[32m[1m### [33mserver.setTimeout([msecs][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmsecs[39m {number} [1mDefault:[22m [33m120000[39m (2 minutes)[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {https.Server}[0m

[0mSee [34m[33mhttp.Server#setTimeout()[39m[34m ([34m[4mhttp.html#http_server_settimeout_msecs_callback[24m[39m[34m)[39m.[0m

[32m[1m### [33mserver.timeout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.2[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27558[39m
[90m    description: The default timeout changed from 120s to 0 (no timeout).[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} [1mDefault:[22m 0 (no timeout)[0m

[0mSee [34m[33mhttp.Server#timeout[39m[34m ([34m[4mhttp.html#http_server_timeout[24m[39m[34m)[39m.[0m

[32m[1m### [33mserver.keepAliveTimeout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} [1mDefault:[22m [33m5000[39m (5 seconds)[0m

[0mSee [34m[33mhttp.Server#keepAliveTimeout[39m[34m ([34m[4mhttp.html#http_server_keepalivetimeout[24m[39m[34m)[39m.[0m

[32m[1m## [33mhttps.createServer([options][, requestListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} Accepts [33moptions[39m from [34m[33mtls.createServer()[39m[34m ([34m[4mtls.html#tls_tls_createserver_options_secureconnectionlistener[24m[39m[34m)[39m,[0m
      [0m[34m[33mtls.createSecureContext()[39m[34m ([34m[4mtls.html#tls_tls_createsecurecontext_options[24m[39m[34m)[39m and [34m[33mhttp.createServer()[39m[34m ([34m[4mhttp.html#http_http_createserver_options_requestlistener[24m[39m[34m)[39m.[0m
    * [0m[33mrequestListener[39m {Function} A listener to be added to the [33m'request'[39m event.[0m
    * [0mReturns: {https.Server}[0m

    [90m// curl -k https://localhost:8000/[39m
    [94mconst[39m [37mhttps[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/https'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mkey[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'test/fixtures/keys/agent2-key.pem'[39m[90m)[39m[32m,[39m
      [37mcert[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'test/fixtures/keys/agent2-cert.pem'[39m[90m)[39m
    [33m}[39m[90m;[39m
    
    [37mhttps[39m[32m.[39m[37mcreateServer[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'hello world\n'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m8000[39m[90m)[39m[90m;[39m

[0mOr[0m

    [94mconst[39m [37mhttps[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/https'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mpfx[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'test/fixtures/test_cert.pfx'[39m[90m)[39m[32m,[39m
      [37mpassphrase[39m[93m:[39m [92m'sample'[39m
    [33m}[39m[90m;[39m
    
    [37mhttps[39m[32m.[39m[37mcreateServer[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'hello world\n'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m8000[39m[90m)[39m[90m;[39m

[32m[1m## [33mhttps.get(options[, callback])[39m[32m[22m[39m

[32m[1m## [33mhttps.get(url[, options][, callback])[39m[32m[22m[39m

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
    * [0m[33moptions[39m {Object | string | URL} Accepts the same [33moptions[39m as[0m
      [0m[34m[33mhttps.request()[39m[34m ([34m[4m#https_https_request_options_callback[24m[39m[34m)[39m, with the [33mmethod[39m always set to [33mGET[39m.[0m
    * [0m[33mcallback[39m {Function}[0m

[0mLike [34m[33mhttp.get()[39m[34m ([34m[4mhttp.html#http_http_get_options_callback[24m[39m[34m)[39m but for HTTPS.[0m

[0m[33moptions[39m can be an object, a string, or a [34m[33mURL[39m[34m ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m object. If [33moptions[39m is a[0m
[0mstring, it is automatically parsed with [34m[33mnew URL()[39m[34m ([34m[4murl.html#url_constructor_new_url_input_base[24m[39m[34m)[39m. If it is a [34m[33mURL[39m[34m ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m[0m
[0mobject, it will be automatically converted to an ordinary [33moptions[39m object.[0m

    [94mconst[39m [37mhttps[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/https'[39m[90m)[39m[90m;[39m
    
    [37mhttps[39m[32m.[39m[37mget[39m[90m([39m[92m'https://encrypted.google.com/'[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'statusCode:'[39m[32m,[39m [37mres[39m[32m.[39m[37mstatusCode[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'headers:'[39m[32m,[39m [37mres[39m[32m.[39m[37mheaders[39m[90m)[39m[90m;[39m
    
      [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37md[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mwrite[39m[90m([39m[37md[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    
    [33m}[39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37me[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37me[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mhttps.globalAgent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90m-->[39m
[90m[39m
[90m[39m[0mGlobal instance of [34m[33mhttps.Agent[39m[34m ([34m[4m#https_class_https_agent[24m[39m[34m)[39m for all HTTPS client requests.[0m

[32m[1m## [33mhttps.request(options[, callback])[39m[32m[22m[39m

[32m[1m## [33mhttps.request(url[, options][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.6[39m
[90mchanges:[39m
[90m  - version: v10.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21616[39m
[90m    description: The `url` parameter can now be passed along with a separate[39m
[90m                 `options` object.[39m
[90m  - version: v9.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14903[39m
[90m    description: The `options` parameter can now include `clientCertEngine`.[39m
[90m  - version: v7.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10638[39m
[90m    description: The `options` parameter can be a WHATWG `URL` object.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33murl[39m {string | URL}[0m
    * [0m[33moptions[39m {Object | string | URL} Accepts all [33moptions[39m from[0m
      [0m[34m[33mhttp.request()[39m[34m ([34m[4mhttp.html#http_http_request_options_callback[24m[39m[34m)[39m, with some differences in default values:
        * [0m[0m[33mprotocol[39m [1mDefault:[22m [33m'https:'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mport[39m [1mDefault:[22m [33m443[39m[0m[0m[0m
      [0m
        * [0m[0m[33magent[39m [1mDefault:[22m [33mhttps.globalAgent[39m[0m[0m[0m
    * [0m[33mcallback[39m {Function}[0m

[0mMakes a request to a secure web server.[0m

[0mThe following additional [33moptions[39m from [34m[33mtls.connect()[39m[34m ([34m[4mtls.html#tls_tls_connect_options_callback[24m[39m[34m)[39m are also accepted:[0m
[0m[33mca[39m, [33mcert[39m, [33mciphers[39m, [33mclientCertEngine[39m, [33mcrl[39m, [33mdhparam[39m, [33mecdhCurve[39m,[0m
[0m[33mhonorCipherOrder[39m, [33mkey[39m, [33mpassphrase[39m, [33mpfx[39m, [33mrejectUnauthorized[39m,[0m
[0m[33msecureOptions[39m, [33msecureProtocol[39m, [33mservername[39m, [33msessionIdContext[39m.[0m

[0m[33moptions[39m can be an object, a string, or a [34m[33mURL[39m[34m ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m object. If [33moptions[39m is a[0m
[0mstring, it is automatically parsed with [34m[33mnew URL()[39m[34m ([34m[4murl.html#url_constructor_new_url_input_base[24m[39m[34m)[39m. If it is a [34m[33mURL[39m[34m ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m[0m
[0mobject, it will be automatically converted to an ordinary [33moptions[39m object.[0m

    [94mconst[39m [37mhttps[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/https'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mhostname[39m[93m:[39m [92m'encrypted.google.com'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m443[39m[32m,[39m
      [37mpath[39m[93m:[39m [92m'/'[39m[32m,[39m
      [37mmethod[39m[93m:[39m [92m'GET'[39m
    [33m}[39m[90m;[39m
    
    [94mconst[39m [37mreq[39m [93m=[39m [37mhttps[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'statusCode:'[39m[32m,[39m [37mres[39m[32m.[39m[37mstatusCode[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'headers:'[39m[32m,[39m [37mres[39m[32m.[39m[37mheaders[39m[90m)[39m[90m;[39m
    
      [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37md[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mwrite[39m[90m([39m[37md[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37me[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37me[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m

[0mExample using options from [34m[33mtls.connect()[39m[34m ([34m[4mtls.html#tls_tls_connect_options_callback[24m[39m[34m)[39m:[0m

    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mhostname[39m[93m:[39m [92m'encrypted.google.com'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m443[39m[32m,[39m
      [37mpath[39m[93m:[39m [92m'/'[39m[32m,[39m
      [37mmethod[39m[93m:[39m [92m'GET'[39m[32m,[39m
      [37mkey[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'test/fixtures/keys/agent2-key.pem'[39m[90m)[39m[32m,[39m
      [37mcert[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'test/fixtures/keys/agent2-cert.pem'[39m[90m)[39m
    [33m}[39m[90m;[39m
    [37moptions[39m[32m.[39m[37magent[39m [93m=[39m [31mnew[39m [37mhttps[39m[32m.[39m[37mAgent[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mreq[39m [93m=[39m [37mhttps[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mAlternatively, opt out of connection pooling by not using an [34m[33mAgent[39m[34m ([34m[4m#https_class_https_agent[24m[39m[34m)[39m.[0m

    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mhostname[39m[93m:[39m [92m'encrypted.google.com'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m443[39m[32m,[39m
      [37mpath[39m[93m:[39m [92m'/'[39m[32m,[39m
      [37mmethod[39m[93m:[39m [92m'GET'[39m[32m,[39m
      [37mkey[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'test/fixtures/keys/agent2-key.pem'[39m[90m)[39m[32m,[39m
      [37mcert[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'test/fixtures/keys/agent2-cert.pem'[39m[90m)[39m[32m,[39m
      [37magent[39m[93m:[39m [91mfalse[39m
    [33m}[39m[90m;[39m
    
    [94mconst[39m [37mreq[39m [93m=[39m [37mhttps[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mExample using a [34m[33mURL[39m[34m ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m as [33moptions[39m:[0m

    [94mconst[39m [37moptions[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://abc:xyz@example.com'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mreq[39m [93m=[39m [37mhttps[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mExample pinning on certificate fingerprint, or the public key (similar to[0m
[0m[33mpin-sha256[39m):[0m

    [94mconst[39m [37mtls[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/tls'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhttps[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/https'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mcrypto[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/crypto'[39m[90m)[39m[90m;[39m
    
    [94mfunction[39m [37msha256[39m[90m([39m[37ms[39m[90m)[39m [33m{[39m
      [31mreturn[39m [37mcrypto[39m[32m.[39m[37mcreateHash[39m[90m([39m[92m'sha256'[39m[90m)[39m[32m.[39m[37mupdate[39m[90m([39m[37ms[39m[90m)[39m[32m.[39m[37mdigest[39m[90m([39m[92m'base64'[39m[90m)[39m[90m;[39m
    [33m}[39m
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mhostname[39m[93m:[39m [92m'github.com'[39m[32m,[39m
      [37mport[39m[93m:[39m [34m443[39m[32m,[39m
      [37mpath[39m[93m:[39m [92m'/'[39m[32m,[39m
      [37mmethod[39m[93m:[39m [92m'GET'[39m[32m,[39m
      [37mcheckServerIdentity[39m[93m:[39m [94mfunction[39m[90m([39m[37mhost[39m[32m,[39m [37mcert[39m[90m)[39m [33m{[39m
        [90m// Make sure the certificate is issued to the host we are connected to[39m
        [94mconst[39m [37merr[39m [93m=[39m [37mtls[39m[32m.[39m[37mcheckServerIdentity[39m[90m([39m[37mhost[39m[32m,[39m [37mcert[39m[90m)[39m[90m;[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
          [31mreturn[39m [37merr[39m[90m;[39m
        [33m}[39m
    
        [90m// Pin the public key, similar to HPKP pin-sha25 pinning[39m
        [94mconst[39m [37mpubkey256[39m [93m=[39m [92m'pL1+qb9HTMRZJmuC/bB/ZI9d302BYrrqiVuRyW+DGrU='[39m[90m;[39m
        [94mif[39m [90m([39m[37msha256[39m[90m([39m[37mcert[39m[32m.[39m[37mpubkey[39m[90m)[39m [93m!==[39m [37mpubkey256[39m[90m)[39m [33m{[39m
          [94mconst[39m [37mmsg[39m [93m=[39m [92m'Certificate verification error: '[39m [93m+[39m
            `The public key of '${[37mcert[39m[32m.[39m[37msubject[39m[32m.[39m[37mCN[39m}' ` [93m+[39m
            [92m'does not match our pinned fingerprint'[39m[90m;[39m
          [31mreturn[39m [31mnew[39m [37mError[39m[90m([39m[37mmsg[39m[90m)[39m[90m;[39m
        [33m}[39m
    
        [90m// Pin the exact certificate, rather than the pub key[39m
        [94mconst[39m [37mcert256[39m [93m=[39m [92m'25:FE:39:32:D9:63:8C:8A:FC:A1:9A:29:87:'[39m [93m+[39m
          [92m'D8:3E:4C:1D:98:DB:71:E4:1A:48:03:98:EA:22:6A:BD:8B:93:16'[39m[90m;[39m
        [94mif[39m [90m([39m[37mcert[39m[32m.[39m[37mfingerprint256[39m [93m!==[39m [37mcert256[39m[90m)[39m [33m{[39m
          [94mconst[39m [37mmsg[39m [93m=[39m [92m'Certificate verification error: '[39m [93m+[39m
            `The certificate of '${[37mcert[39m[32m.[39m[37msubject[39m[32m.[39m[37mCN[39m}' ` [93m+[39m
            [92m'does not match our pinned fingerprint'[39m[90m;[39m
          [31mreturn[39m [31mnew[39m [37mError[39m[90m([39m[37mmsg[39m[90m)[39m[90m;[39m
        [33m}[39m
    
        [90m// This loop is informational only.[39m
        [90m// Print the certificate and public key fingerprints of all certs in the[39m
        [90m// chain. Its common to pin the public key of the issuer on the public[39m
        [90m// internet, while pinning the public key of the service in sensitive[39m
        [90m// environments.[39m
        [94mdo[39m [33m{[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Subject Common Name:'[39m[32m,[39m [37mcert[39m[32m.[39m[37msubject[39m[32m.[39m[37mCN[39m[90m)[39m[90m;[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'  Certificate SHA256 fingerprint:'[39m[32m,[39m [37mcert[39m[32m.[39m[37mfingerprint256[39m[90m)[39m[90m;[39m
    
          [37mhash[39m [93m=[39m [37mcrypto[39m[32m.[39m[37mcreateHash[39m[90m([39m[92m'sha256'[39m[90m)[39m[90m;[39m
          [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'  Public key ping-sha256:'[39m[32m,[39m [37msha256[39m[90m([39m[37mcert[39m[32m.[39m[37mpubkey[39m[90m)[39m[90m)[39m[90m;[39m
    
          [37mlastprint256[39m [93m=[39m [37mcert[39m[32m.[39m[37mfingerprint256[39m[90m;[39m
          [37mcert[39m [93m=[39m [37mcert[39m[32m.[39m[37missuerCertificate[39m[90m;[39m
        [33m}[39m [94mwhile[39m [90m([39m[37mcert[39m[32m.[39m[37mfingerprint256[39m [93m!==[39m [37mlastprint256[39m[90m)[39m[90m;[39m
    
      [33m}[39m[32m,[39m
    [33m}[39m[90m;[39m
    
    [37moptions[39m[32m.[39m[37magent[39m [93m=[39m [31mnew[39m [37mhttps[39m[32m.[39m[37mAgent[39m[90m([39m[37moptions[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mreq[39m [93m=[39m [37mhttps[39m[32m.[39m[37mrequest[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'All OK. Server matched our pinned cert or public key'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'statusCode:'[39m[32m,[39m [37mres[39m[32m.[39m[37mstatusCode[39m[90m)[39m[90m;[39m
      [90m// Print the HPKP values[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'headers:'[39m[32m,[39m [37mres[39m[32m.[39m[37mheaders[39m[33m[[39m[92m'public-key-pins'[39m[33m][39m[90m)[39m[90m;[39m
    
      [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37md[39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mreq[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37me[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37me[39m[32m.[39m[37mmessage[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mreq[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m

[0mOutputs for example:[0m

    [33mSubject Common Name: github.com[39m
    [33m  Certificate SHA256 fingerprint: 25:FE:39:32:D9:63:8C:8A:FC:A1:9A:29:87:D8:3E:4C:1D:98:DB:71:E4:1A:48:03:98:EA:22:6A:BD:8B:93:16[39m
    [33m  Public key ping-sha256: pL1+qb9HTMRZJmuC/bB/ZI9d302BYrrqiVuRyW+DGrU=[39m
    [33mSubject Common Name: DigiCert SHA2 Extended Validation Server CA[39m
    [33m  Certificate SHA256 fingerprint: 40:3E:06:2A:26:53:05:91:13:28:5B:AF:80:A0:D4:AE:42:2C:84:8C:9F:78:FA:D0:1F:C9:4B:C5:B8:7F:EF:1A[39m
    [33m  Public key ping-sha256: RRM1dGqnDFsCJXBTHky16vi1obOlCgFFn/yOhI/y+ho=[39m
    [33mSubject Common Name: DigiCert High Assurance EV Root CA[39m
    [33m  Certificate SHA256 fingerprint: 74:31:E5:F4:C3:C1:CE:46:90:77:4F:0B:61:E0:54:40:88:3B:A9:A0:1E:D0:0B:A6:AB:D7:80:6E:D3:B1:18:CF[39m
    [33m  Public key ping-sha256: WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18=[39m
    [33mAll OK. Server matched our pinned cert or public key[39m
    [33mstatusCode: 200[39m
    [33mheaders: max-age=0; pin-sha256="WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18="; pin-sha256="RRM1dGqnDFsCJXBTHky16vi1obOlCgFFn/yOhI/y+ho="; pin-sha256="k2v657xBsOVe1PQRwOsHsw3bsGT2VzIqz5K+59sNQws="; pin-sha256="K87oWBWM9UZfyddvDfoxL+8lpNyoUB2ptGtn0fv6G2Q="; pin-sha256="IQBnNBEiFuhj+8x6X8XLgh01V9Ic5/V3IRQLNFFc7v4="; pin-sha256="iie1VXtL7HzAMF+/PVPR9xzT80kQxdZeJ+zduCB3uj0="; pin-sha256="LvRiGEjRqfzurezaWuj8Wie2gyHMrW5Q06LspMnox7A="; includeSubDomains[39m

