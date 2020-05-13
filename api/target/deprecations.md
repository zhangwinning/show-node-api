[35m[4m[1m# Deprecated APIs[22m[24m[39m

[90m<!--introduced_in=v7.7.0-->[39m
[90m[39m[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mNode.js may deprecate APIs for any of the following reasons:[0m

    * [0mUse of the API is unsafe.[0m
    * [0mAn improved alternative API is available.[0m
    * [0mBreaking changes to the API are expected in a future major release.[0m

[0mNode.js utilizes three kinds of Deprecations:[0m

    * [0mDocumentation-only[0m
    * [0mRuntime[0m
    * [0mEnd-of-Life[0m

[0mA Documentation-only deprecation is one that is expressed only within the[0m
[0mNode.js API docs. These generate no side-effects while running Node.js.[0m
[0mSome Documentation-only deprecations trigger a runtime warning when launched[0m
[0mwith [[33m--pending-deprecation[39m][] flag (or its alternative,[0m
[0m[33mNODE_PENDING_DEPRECATION=1[39m environment variable), similarly to Runtime[0m
[0mdeprecations below. Documentation-only deprecations that support that flag[0m
[0mare explicitly labeled as such in the[0m
[0m[34mlist of Deprecated APIs ([34m[4m#deprecations_list_of_deprecated_apis[24m[39m[34m)[39m.[0m

[0mA Runtime deprecation will, by default, generate a process warning that will[0m
[0mbe printed to [33mstderr[39m the first time the deprecated API is used. When the[0m
[0m[[33m--throw-deprecation[39m][] command-line flag is used, a Runtime deprecation will[0m
[0mcause an error to be thrown.[0m

[0mAn End-of-Life deprecation is used when functionality is or will soon be removed[0m
[0mfrom Node.js.[0m

[32m[1m## Revoking deprecations[22m[39m

[0mOccasionally, the deprecation of an API may be reversed. In such situations,[0m
[0mthis document will be updated with information relevant to the decision.[0m
[0mHowever, the deprecation identifier will not be modified.[0m

[32m[1m## List of Deprecated APIs[22m[39m

[0m[90m<a id="DEP0001">[39m[90m</a>[39m[0m

[32m[1m### DEP0001: [33mhttp.OutgoingMessage.prototype.flush[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31164[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v1.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/1156[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mOutgoingMessage.prototype.flush()[39m has been removed. Use[0m
[0m[33mOutgoingMessage.prototype.flushHeaders()[39m instead.[0m

[0m[90m<a id="DEP0002">[39m[90m</a>[39m[0m

[32m[1m### DEP0002: [33mrequire('_linklist')[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12113[39m
[90m    description: End-of-Life.[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3078[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33m_linklist[39m module is deprecated. Please use a userland alternative.[0m

[0m[90m<a id="DEP0003">[39m[90m</a>[39m[0m

[32m[1m### DEP0003: [33m_writableState.buffer[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31165[39m
[90m    description: End-of-Life[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.15[39m
[90m    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/8826[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33m_writableState.buffer[39m has been removed. Use [33m_writableState.getBuffer()[39m[0m
[0minstead.[0m

[0m[90m<a id="DEP0004">[39m[90m</a>[39m[0m

[32m[1m### DEP0004: [33mCryptoStream.prototype.readyState[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17882[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: 0.4.0[39m
[90m    commit: 9c7f89bf56abd37a796fea621ad2e47dd33d2b82[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mCryptoStream.prototype.readyState[39m property was removed.[0m

[0m[90m<a id="DEP0005">[39m[90m</a>[39m[0m

[32m[1m### DEP0005: [33mBuffer()[39m[32m constructor[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19524[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4682[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime (supports [[33m--pending-deprecation[39m][])[0m

[0mThe [33mBuffer()[39m function and [33mnew Buffer()[39m constructor are deprecated due to[0m
[0mAPI usability issues that can lead to accidental security issues.[0m

[0mAs an alternative, use one of the following methods of constructing [33mBuffer[39m[0m
[0mobjects:[0m

    * [0m[[33mBuffer.alloc(size[, fill[, encoding]])[39m][alloc]: Create a [33mBuffer[39m with[0m
      [0m[3minitialized[23m memory.[0m
    * [0m[[33mBuffer.allocUnsafe(size)[39m][alloc_unsafe_size]: Create a [33mBuffer[39m with[0m
      [0m[3muninitialized[23m memory.[0m
    * [0m[[33mBuffer.allocUnsafeSlow(size)[39m][]: Create a [33mBuffer[39m with [3muninitialized[23m[0m
      [0m memory.[0m
    * [0m[[33mBuffer.from(array)[39m][]: Create a [33mBuffer[39m with a copy of [33marray[39m[0m
    * [0m[[33mBuffer.from(arrayBuffer[, byteOffset[, length]])[39m][from_arraybuffer] -[0m
      [0mCreate a [33mBuffer[39m that wraps the given [33marrayBuffer[39m.[0m
    * [0m[[33mBuffer.from(buffer)[39m][]: Create a [33mBuffer[39m that copies [33mbuffer[39m.[0m
    * [0m[[33mBuffer.from(string[, encoding])[39m][from_string_encoding]: Create a [33mBuffer[39m[0m
      [0mthat copies [33mstring[39m.[0m

[0mWithout [33m--pending-deprecation[39m, runtime warnings occur only for code not in[0m
[0m[33mnode_modules[39m. This means there will not be deprecation warnings for[0m
[0m[33mBuffer()[39m usage in dependencies. With [33m--pending-deprecation[39m, a runtime[0m
[0mwarning results no matter where the [33mBuffer()[39m usage occurs.[0m

[0m[90m<a id="DEP0006">[39m[90m</a>[39m[0m

[32m[1m### DEP0006: [33mchild_process[39m[32m [33moptions.customFds[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25279[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.14[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v0.5.11[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mWithin the [[33mchild_process[39m][] module's [33mspawn()[39m, [33mfork()[39m, and [33mexec()[39m[0m
[0mmethods, the [33moptions.customFds[39m option is deprecated. The [33moptions.stdio[39m[0m
[0moption should be used instead.[0m

[0m[90m<a id="DEP0007">[39m[90m</a>[39m[0m

[32m[1m### DEP0007: Replace [33mcluster[39m[32m [33mworker.suicide[39m[32m with [33mworker.exitedAfterDisconnect[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13702[39m
[90m    description: End-of-Life.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3747[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3743[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mIn an earlier version of the Node.js [33mcluster[39m, a boolean property with the name[0m
[0m[33msuicide[39m was added to the [33mWorker[39m object. The intent of this property was to[0m
[0mprovide an indication of how and why the [33mWorker[39m instance exited. In Node.js[0m
[0m6.0.0, the old property was deprecated and replaced with a new[0m
[0m[[33mworker.exitedAfterDisconnect[39m][] property. The old property name did not[0m
[0mprecisely describe the actual semantics and was unnecessarily emotion-laden.[0m

[0m[90m<a id="DEP0008">[39m[90m</a>[39m[0m

[32m[1m### DEP0008: [33mrequire('constants')[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6534[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [33mconstants[39m module is deprecated. When requiring access to constants[0m
[0mrelevant to specific Node.js builtin modules, developers should instead refer[0m
[0mto the [33mconstants[39m property exposed by the relevant module. For instance,[0m
[0m[33mrequire('fs').constants[39m and [33mrequire('os').constants[39m.[0m

[0m[90m<a id="DEP0009">[39m[90m</a>[39m[0m

[32m[1m### DEP0009: [33mcrypto.pbkdf2[39m[32m without digest[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31166[39m
[90m    description: End-of-Life (for `digest === null`)[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22861[39m
[90m    description: Runtime deprecation (for `digest === null`).[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11305[39m
[90m    description: End-of-Life (for `digest === undefined`).[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4047[39m
[90m    description: Runtime deprecation (for `digest === undefined`).[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mUse of the [[33mcrypto.pbkdf2()[39m][] API without specifying a digest was deprecated[0m
[0min Node.js 6.0 because the method defaulted to using the non-recommended[0m
[0m[33m'SHA1'[39m digest. Previously, a deprecation warning was printed. Starting in[0m
[0mNode.js 8.0.0, calling [33mcrypto.pbkdf2()[39m or [33mcrypto.pbkdf2Sync()[39m with[0m
[0m[33mdigest[39m set to [33mundefined[39m will throw a [33mTypeError[39m.[0m

[0mBeginning in Node.js v11.0.0, calling these functions with [33mdigest[39m set to[0m
[0m[33mnull[39m would print a deprecation warning to align with the behavior when [33mdigest[39m[0m
[0mis [33mundefined[39m.[0m

[0mNow, however, passing either [33mundefined[39m or [33mnull[39m will throw a [33mTypeError[39m.[0m

[0m[90m<a id="DEP0010">[39m[90m</a>[39m[0m

[32m[1m### DEP0010: [33mcrypto.createCredentials[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21153[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.13[39m
[90m    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/7265[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mcrypto.createCredentials()[39m API was removed. Please use[0m
[0m[[33mtls.createSecureContext()[39m][] instead.[0m

[0m[90m<a id="DEP0011">[39m[90m</a>[39m[0m

[32m[1m### DEP0011: [33mcrypto.Credentials[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21153[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.13[39m
[90m    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/7265[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mcrypto.Credentials[39m class was removed. Please use [[33mtls.SecureContext[39m][][0m
[0minstead.[0m

[0m[90m<a id="DEP0012">[39m[90m</a>[39m[0m

[32m[1m### DEP0012: [33mDomain.dispose[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15412[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.7[39m
[90m    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/5021[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mDomain.dispose()[39m has been removed. Recover from failed I/O actions[0m
[0mexplicitly via error event handlers set on the domain instead.[0m

[0m[90m<a id="DEP0013">[39m[90m</a>[39m[0m

[32m[1m### DEP0013: [33mfs[39m[32m asynchronous function without callback[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18668[39m
[90m    description: End-of-Life.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mCalling an asynchronous function without a callback throws a [33mTypeError[39m[0m
[0min Node.js 10.0.0 onwards. See [34m[34m[4mhttps://github.com/nodejs/node/pull/12562[24m[39m[34m[39m.[0m

[0m[90m<a id="DEP0014">[39m[90m</a>[39m[0m

[32m[1m### DEP0014: [33mfs.read[39m[32m legacy String interface[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9683[39m
[90m    description: End-of-Life.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4525[39m
[90m    description: Runtime deprecation.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.1.96[39m
[90m    commit: c93e0aaf062081db3ec40ac45b3e2c979d5759d6[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [[33mfs.read()[39m][] legacy [33mString[39m interface is deprecated. Use the [33mBuffer[39m[0m
[0mAPI as mentioned in the documentation instead.[0m

[0m[90m<a id="DEP0015">[39m[90m</a>[39m[0m

[32m[1m### DEP0015: [33mfs.readSync[39m[32m legacy String interface[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9683[39m
[90m    description: End-of-Life.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4525[39m
[90m    description: Runtime deprecation.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.1.96[39m
[90m    commit: c93e0aaf062081db3ec40ac45b3e2c979d5759d6[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [[33mfs.readSync()[39m][] legacy [33mString[39m interface is deprecated. Use the[0m
[0m[33mBuffer[39m API as mentioned in the documentation instead.[0m

[0m[90m<a id="DEP0016">[39m[90m</a>[39m[0m

[32m[1m### DEP0016: [33mGLOBAL[39m[32m/[33mroot[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31167[39m
[90m    description: End-of-Life[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/1838[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mGLOBAL[39m and [33mroot[39m aliases for the [33mglobal[39m property were deprecated[0m
[0min Node.js 6.0.0 and have since been removed.[0m

[0m[90m<a id="DEP0017">[39m[90m</a>[39m[0m

[32m[1m### DEP0017: [33mIntl.v8BreakIterator[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15238[39m
[90m    description: End-of-Life.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8908[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mIntl.v8BreakIterator[39m was a non-standard extension and has been removed.[0m
[0mSee [34m[33mIntl.Segmenter[39m[34m ([34m[4mhttps://github.com/tc39/proposal-intl-segmenter[24m[39m[34m)[39m.[0m

[0m[90m<a id="DEP0018">[39m[90m</a>[39m[0m

[32m[1m### DEP0018: Unhandled promise rejections[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8217[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mUnhandled promise rejections are deprecated. In the future, promise rejections[0m
[0mthat are not handled will terminate the Node.js process with a non-zero exit[0m
[0mcode.[0m

[0m[90m<a id="DEP0019">[39m[90m</a>[39m[0m

[32m[1m### DEP0019: [33mrequire('.')[39m[32m resolved outside directory[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26973[39m
[90m    description: Removed functionality.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v1.8.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/1363[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mIn certain cases, [33mrequire('.')[39m could resolve outside the package directory.[0m
[0mThis behavior has been removed.[0m

[0m[90m<a id="DEP0020">[39m[90m</a>[39m[0m

[32m[1m### DEP0020: [33mServer.connections[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.9.7[39m
[90m    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/4595[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe [[33mServer.connections[39m][] property is deprecated. Please use the[0m
[0m[[33mServer.getConnections()[39m][] method instead.[0m

[0m[90m<a id="DEP0021">[39m[90m</a>[39m[0m

[32m[1m### DEP0021: [33mServer.listenFD[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27127[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.7.12[39m
[90m    commit: 41421ff9da1288aa241a5e9dcf915b685ade1c23[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mServer.listenFD()[39m method was deprecated and removed. Please use[0m
[0m[[33mServer.listen({fd: <number>})[39m][] instead.[0m

[0m[90m<a id="DEP0022">[39m[90m</a>[39m[0m

[32m[1m### DEP0022: [33mos.tmpDir()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31169[39m
[90m    description: End-of-Life.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6739[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mos.tmpDir()[39m API was deprecated in Node.js 7.0.0 and has since been[0m
[0mremoved. Please use [[33mos.tmpdir()[39m][] instead.[0m

[0m[90m<a id="DEP0023">[39m[90m</a>[39m[0m

[32m[1m### DEP0023: [33mos.getNetworkInterfaces()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25280[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.6.0[39m
[90m    commit: 37bb37d151fb6ee4696730e63ff28bb7a4924f97[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mos.getNetworkInterfaces()[39m method is deprecated. Please use the[0m
[0m[[33mos.networkInterfaces()[39m][] method instead.[0m

[0m[90m<a id="DEP0024">[39m[90m</a>[39m[0m

[32m[1m### DEP0024: [33mREPLServer.prototype.convertToContext()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13434[39m
[90m    description: End-of-Life.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7829[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mREPLServer.prototype.convertToContext()[39m API has been removed.[0m

[0m[90m<a id="DEP0025">[39m[90m</a>[39m[0m

[32m[1m### DEP0025: [33mrequire('sys')[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v1.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/317[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe [33msys[39m module is deprecated. Please use the [[33mutil[39m][] module instead.[0m

[0m[90m<a id="DEP0026">[39m[90m</a>[39m[0m

[32m[1m### DEP0026: [33mutil.print()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25377[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.3[39m
[90m    commit: 896b2aa7074fc886efd7dd0a397d694763cac7ce[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mutil.print()[39m has been removed. Please use [[33mconsole.log()[39m][] instead.[0m

[0m[90m<a id="DEP0027">[39m[90m</a>[39m[0m

[32m[1m### DEP0027: [33mutil.puts()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25377[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.3[39m
[90m    commit: 896b2aa7074fc886efd7dd0a397d694763cac7ce[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mutil.puts()[39m has been removed. Please use [[33mconsole.log()[39m][] instead.[0m

[0m[90m<a id="DEP0028">[39m[90m</a>[39m[0m

[32m[1m### DEP0028: [33mutil.debug()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25377[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.3[39m
[90m    commit: 896b2aa7074fc886efd7dd0a397d694763cac7ce[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mutil.debug()[39m has been removed. Please use [[33mconsole.error()[39m][] instead.[0m

[0m[90m<a id="DEP0029">[39m[90m</a>[39m[0m

[32m[1m### DEP0029: [33mutil.error()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25377[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.3[39m
[90m    commit: 896b2aa7074fc886efd7dd0a397d694763cac7ce[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mutil.error()[39m has been removed. Please use [[33mconsole.error()[39m][] instead.[0m

[0m[90m<a id="DEP0030">[39m[90m</a>[39m[0m

[32m[1m### DEP0030: [33mSlowBuffer[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5833[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mSlowBuffer[39m][] class is deprecated. Please use[0m
[0m[[33mBuffer.allocUnsafeSlow(size)[39m][] instead.[0m

[0m[90m<a id="DEP0031">[39m[90m</a>[39m[0m

[32m[1m### DEP0031: [33mecdh.setPublicKey()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v5.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3511[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mecdh.setPublicKey()[39m][] method is now deprecated as its inclusion in the[0m
[0mAPI is not useful.[0m

[0m[90m<a id="DEP0032">[39m[90m</a>[39m[0m

[32m[1m### DEP0032: [33mdomain[39m[32m module[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v1.4.2[39m
[90m    pr-url: https://github.com/nodejs/node/pull/943[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mdomain[39m][] module is deprecated and should not be used.[0m

[0m[90m<a id="DEP0033">[39m[90m</a>[39m[0m

[32m[1m### DEP0033: [33mEventEmitter.listenerCount()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v3.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2349[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mEventEmitter.listenerCount(emitter, eventName)[39m][] API is[0m
[0mdeprecated. Please use [[33memitter.listenerCount(eventName)[39m][] instead.[0m

[0m[90m<a id="DEP0034">[39m[90m</a>[39m[0m

[32m[1m### DEP0034: [33mfs.exists(path, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v1.0.0[39m
[90m    pr-url: https://github.com/iojs/io.js/pull/166[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mfs.exists(path, callback)[39m][] API is deprecated. Please use[0m
[0m[[33mfs.stat()[39m][] or [[33mfs.access()[39m][] instead.[0m

[0m[90m<a id="DEP0035">[39m[90m</a>[39m[0m

[32m[1m### DEP0035: [33mfs.lchmod(path, mode, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.4.7[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mfs.lchmod(path, mode, callback)[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0036">[39m[90m</a>[39m[0m

[32m[1m### DEP0036: [33mfs.lchmodSync(path, mode)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.4.7[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mfs.lchmodSync(path, mode)[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0037">[39m[90m</a>[39m[0m

[32m[1m### DEP0037: [33mfs.lchown(path, uid, gid, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21498[39m
[90m    description: Deprecation revoked.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.4.7[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Deprecation revoked[0m

[0mThe [[33mfs.lchown(path, uid, gid, callback)[39m][] API was deprecated. The[0m
[0mdeprecation was revoked because the requisite supporting APIs were added in[0m
[0mlibuv.[0m

[0m[90m<a id="DEP0038">[39m[90m</a>[39m[0m

[32m[1m### DEP0038: [33mfs.lchownSync(path, uid, gid)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21498[39m
[90m    description: Deprecation revoked.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.4.7[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Deprecation revoked[0m

[0mThe [[33mfs.lchownSync(path, uid, gid)[39m][] API was deprecated. The deprecation was[0m
[0mrevoked because the requisite supporting APIs were added in libuv.[0m

[0m[90m<a id="DEP0039">[39m[90m</a>[39m[0m

[32m[1m### DEP0039: [33mrequire.extensions[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.10.6[39m
[90m    commit: 7bd8a5a2a60b75266f89f9a32877d55294a3881c[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mrequire.extensions[39m][] property is deprecated.[0m

[0m[90m<a id="DEP0040">[39m[90m</a>[39m[0m

[32m[1m### DEP0040: [33mpunycode[39m[32m module[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7941[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mpunycode[39m][] module is deprecated. Please use a userland alternative[0m
[0minstead.[0m

[0m[90m<a id="DEP0041">[39m[90m</a>[39m[0m

[32m[1m### DEP0041: [33mNODE_REPL_HISTORY_FILE[39m[32m environment variable[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13876[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v3.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2224[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mNODE_REPL_HISTORY_FILE[39m environment variable was removed. Please use[0m
[0m[33mNODE_REPL_HISTORY[39m instead.[0m

[0m[90m<a id="DEP0042">[39m[90m</a>[39m[0m

[32m[1m### DEP0042: [33mtls.CryptoStream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17882[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v0.11.3[39m
[90m    commit: af80e7bc6e6f33c582eb1f7d37c7f5bbe9f910f7[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [[33mtls.CryptoStream[39m][] class was removed. Please use[0m
[0m[[33mtls.TLSSocket[39m][] instead.[0m

[0m[90m<a id="DEP0043">[39m[90m</a>[39m[0m

[32m[1m### DEP0043: [33mtls.SecurePair[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11349[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6063[39m
[90m    description: Documentation-only deprecation.[39m
[90m  - version: v0.11.15[39m
[90m    pr-url:[39m
[90m      - https://github.com/nodejs/node-v0.x-archive/pull/8695[39m
[90m      - https://github.com/nodejs/node-v0.x-archive/pull/8700[39m
[90m    description: Deprecation revoked.[39m
[90m  - version: v0.11.3[39m
[90m    commit: af80e7bc6e6f33c582eb1f7d37c7f5bbe9f910f7[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mtls.SecurePair[39m][] class is deprecated. Please use[0m
[0m[[33mtls.TLSSocket[39m][] instead.[0m

[0m[90m<a id="DEP0044">[39m[90m</a>[39m[0m

[32m[1m### DEP0044: [33mutil.isArray()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isArray()[39m][] API is deprecated. Please use [33mArray.isArray()[39m[0m
[0minstead.[0m

[0m[90m<a id="DEP0045">[39m[90m</a>[39m[0m

[32m[1m### DEP0045: [33mutil.isBoolean()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isBoolean()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0046">[39m[90m</a>[39m[0m

[32m[1m### DEP0046: [33mutil.isBuffer()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isBuffer()[39m][] API is deprecated. Please use[0m
[0m[[33mBuffer.isBuffer()[39m][] instead.[0m

[0m[90m<a id="DEP0047">[39m[90m</a>[39m[0m

[32m[1m### DEP0047: [33mutil.isDate()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isDate()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0048">[39m[90m</a>[39m[0m

[32m[1m### DEP0048: [33mutil.isError()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isError()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0049">[39m[90m</a>[39m[0m

[32m[1m### DEP0049: [33mutil.isFunction()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isFunction()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0050">[39m[90m</a>[39m[0m

[32m[1m### DEP0050: [33mutil.isNull()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isNull()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0051">[39m[90m</a>[39m[0m

[32m[1m### DEP0051: [33mutil.isNullOrUndefined()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isNullOrUndefined()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0052">[39m[90m</a>[39m[0m

[32m[1m### DEP0052: [33mutil.isNumber()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isNumber()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0053">[39m[90m</a>[39m[0m

[32m[1m### DEP0053 [33mutil.isObject()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isObject()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0054">[39m[90m</a>[39m[0m

[32m[1m### DEP0054: [33mutil.isPrimitive()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isPrimitive()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0055">[39m[90m</a>[39m[0m

[32m[1m### DEP0055: [33mutil.isRegExp()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isRegExp()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0056">[39m[90m</a>[39m[0m

[32m[1m### DEP0056: [33mutil.isString()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isString()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0057">[39m[90m</a>[39m[0m

[32m[1m### DEP0057: [33mutil.isSymbol()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isSymbol()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0058">[39m[90m</a>[39m[0m

[32m[1m### DEP0058: [33mutil.isUndefined()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version:[39m
[90m    - v4.8.6[39m
[90m    - v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version:[39m
[90m    - v3.3.1[39m
[90m    - v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2447[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.isUndefined()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0059">[39m[90m</a>[39m[0m

[32m[1m### DEP0059: [33mutil.log()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6161[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil.log()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0060">[39m[90m</a>[39m[0m

[32m[1m### DEP0060: [33mutil._extend()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4903[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mutil._extend()[39m][] API is deprecated.[0m

[0m[90m<a id="DEP0061">[39m[90m</a>[39m[0m

[32m[1m### DEP0061: [33mfs.SyncWriteStream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20735[39m
[90m    description: End-of-Life.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10467[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6749[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mfs.SyncWriteStream[39m class was never intended to be a publicly accessible[0m
[0mAPI and has been removed. No alternative API is available. Please use a userland[0m
[0malternative.[0m

[0m[90m<a id="DEP0062">[39m[90m</a>[39m[0m

[32m[1m### DEP0062: [33mnode --debug[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10970[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25828[39m
[90m    description: End-of-Life.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33m--debug[39m activates the legacy V8 debugger interface, which was removed as[0m
[0mof V8 5.8. It is replaced by Inspector which is activated with [33m--inspect[39m[0m
[0minstead.[0m

[0m[90m<a id="DEP0063">[39m[90m</a>[39m[0m

[32m[1m### DEP0063: [33mServerResponse.prototype.writeHeader()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11355[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [33mhttp[39m module [33mServerResponse.prototype.writeHeader()[39m API is[0m
[0mdeprecated. Please use [33mServerResponse.prototype.writeHead()[39m instead.[0m

[0mThe [33mServerResponse.prototype.writeHeader()[39m method was never documented as an[0m
[0mofficially supported API.[0m

[0m[90m<a id="DEP0064">[39m[90m</a>[39m[0m

[32m[1m### DEP0064: [33mtls.createSecurePair()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11349[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v6.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10116[39m
[90m    description: A deprecation code has been assigned.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6063[39m
[90m    description: Documentation-only deprecation.[39m
[90m  - version: v0.11.15[39m
[90m    pr-url:[39m
[90m      - https://github.com/nodejs/node-v0.x-archive/pull/8695[39m
[90m      - https://github.com/nodejs/node-v0.x-archive/pull/8700[39m
[90m    description: Deprecation revoked.[39m
[90m  - version: v0.11.3[39m
[90m    commit: af80e7bc6e6f33c582eb1f7d37c7f5bbe9f910f7[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe [33mtls.createSecurePair()[39m API was deprecated in documentation in Node.js[0m
[0m0.11.3. Users should use [33mtls.Socket[39m instead.[0m

[0m[90m<a id="DEP0065">[39m[90m</a>[39m[0m

[32m[1m### DEP0065: [33mrepl.REPL_MODE_MAGIC[39m[32m and [33mNODE_REPL_MODE=magic[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19187[39m
[90m    description: End-of-Life.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11599[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mrepl[39m module's [33mREPL_MODE_MAGIC[39m constant, used for [33mreplMode[39m option, has[0m
[0mbeen removed. Its behavior has been functionally identical to that of[0m
[0m[33mREPL_MODE_SLOPPY[39m since Node.js 6.0.0, when V8 5.0 was imported. Please use[0m
[0m[33mREPL_MODE_SLOPPY[39m instead.[0m

[0mThe [33mNODE_REPL_MODE[39m environment variable is used to set the underlying[0m
[0m[33mreplMode[39m of an interactive [33mnode[39m session. Its value, [33mmagic[39m, is also[0m
[0mremoved. Please use [33msloppy[39m instead.[0m

[0m[90m<a id="DEP0066">[39m[90m</a>[39m[0m

[32m[1m### DEP0066: [33mOutgoingMessage.prototype._headers, OutgoingMessage.prototype._headerNames[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24167[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10941[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe [33mhttp[39m module [33mOutgoingMessage.prototype._headers[39m and[0m
[0m[33mOutgoingMessage.prototype._headerNames[39m properties are deprecated. Use one of[0m
[0mthe public methods (e.g. [33mOutgoingMessage.prototype.getHeader()[39m,[0m
[0m[33mOutgoingMessage.prototype.getHeaders()[39m,[0m
[0m[33mOutgoingMessage.prototype.getHeaderNames()[39m,[0m
[0m[33mOutgoingMessage.prototype.hasHeader()[39m,[0m
[0m[33mOutgoingMessage.prototype.removeHeader()[39m,[0m
[0m[33mOutgoingMessage.prototype.setHeader()[39m) for working with outgoing headers.[0m

[0mThe [33mOutgoingMessage.prototype._headers[39m and[0m
[0m[33mOutgoingMessage.prototype._headerNames[39m properties were never documented as[0m
[0mofficially supported properties.[0m

[0m[90m<a id="DEP0067">[39m[90m</a>[39m[0m

[32m[1m### DEP0067: [33mOutgoingMessage.prototype._renderHeaders[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10941[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [33mhttp[39m module [33mOutgoingMessage.prototype._renderHeaders()[39m API is[0m
[0mdeprecated.[0m

[0mThe [33mOutgoingMessage.prototype._renderHeaders[39m property was never documented as[0m
[0man officially supported API.[0m

[0m[90m<a id="DEP0068">[39m[90m</a>[39m[0m

[32m[1m### DEP0068: [33mnode debug[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11441[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mnode debug[39m corresponds to the legacy CLI debugger which has been replaced with[0m
[0ma V8-inspector based CLI debugger available through [33mnode inspect[39m.[0m

[0m[90m<a id="DEP0069">[39m[90m</a>[39m[0m

[32m[1m### DEP0069: [33mvm.runInDebugContext(string)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13295[39m
[90m    description: End-of-Life.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12815[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12243[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mDebugContext has been removed in V8 and is not available in Node.js 10+.[0m

[0mDebugContext was an experimental API.[0m

[0m[90m<a id="DEP0070">[39m[90m</a>[39m[0m

[32m[1m### DEP0070: [33masync_hooks.currentId()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14414[39m
[90m    description: End-of-Life.[39m
[90m  - version: v8.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13490[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33masync_hooks.currentId()[39m was renamed to [33masync_hooks.executionAsyncId()[39m for[0m
[0mclarity.[0m

[0mThis change was made while [33masync_hooks[39m was an experimental API.[0m

[0m[90m<a id="DEP0071">[39m[90m</a>[39m[0m

[32m[1m### DEP0071: [33masync_hooks.triggerId()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14414[39m
[90m    description: End-of-Life.[39m
[90m  - version: v8.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13490[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33masync_hooks.triggerId()[39m was renamed to [33masync_hooks.triggerAsyncId()[39m for[0m
[0mclarity.[0m

[0mThis change was made while [33masync_hooks[39m was an experimental API.[0m

[0m[90m<a id="DEP0072">[39m[90m</a>[39m[0m

[32m[1m### DEP0072: [33masync_hooks.AsyncResource.triggerId()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14414[39m
[90m    description: End-of-Life.[39m
[90m  - version: v8.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13490[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33masync_hooks.AsyncResource.triggerId()[39m was renamed to[0m
[0m[33masync_hooks.AsyncResource.triggerAsyncId()[39m for clarity.[0m

[0mThis change was made while [33masync_hooks[39m was an experimental API.[0m

[0m[90m<a id="DEP0073">[39m[90m</a>[39m[0m

[32m[1m### DEP0073: Several internal properties of [33mnet.Server[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17141[39m
[90m    description: End-of-Life.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14449[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mAccessing several internal, undocumented properties of [33mnet.Server[39m instances[0m
[0mwith inappropriate names is deprecated.[0m

[0mAs the original API was undocumented and not generally useful for non-internal[0m
[0mcode, no replacement API is provided.[0m

[0m[90m<a id="DEP0074">[39m[90m</a>[39m[0m

[32m[1m### DEP0074: [33mREPLServer.bufferedCommand[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13687[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe [33mREPLServer.bufferedCommand[39m property was deprecated in favor of[0m
[0m[[33mREPLServer.clearBufferedCommand()[39m][].[0m

[0m[90m<a id="DEP0075">[39m[90m</a>[39m[0m

[32m[1m### DEP0075: [33mREPLServer.parseREPLKeyword()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14223[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mREPLServer.parseREPLKeyword()[39m was removed from userland visibility.[0m

[0m[90m<a id="DEP0076">[39m[90m</a>[39m[0m

[32m[1m### DEP0076: [33mtls.parseCertString()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14249[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v8.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14245[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mtls.parseCertString()[39m is a trivial parsing helper that was made public by[0m
[0mmistake. This function can usually be replaced with:[0m

    [94mconst[39m [37mquerystring[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/querystring'[39m[90m)[39m[90m;[39m
    [37mquerystring[39m[32m.[39m[37mparse[39m[90m([39m[37mstr[39m[32m,[39m [92m'\n'[39m[32m,[39m [92m'='[39m[90m)[39m[90m;[39m

[0mThis function is not completely equivalent to [33mquerystring.parse()[39m. One[0m
[0mdifference is that [33mquerystring.parse()[39m does url decoding:[0m

    [33m> querystring.parse('%E5%A5%BD=1', '\n', '=');[39m
    [33m{ '好': '1' }[39m
    [33m> tls.parseCertString('%E5%A5%BD=1');[39m
    [33m{ '%E5%A5%BD': '1' }[39m

[0m[90m<a id="DEP0077">[39m[90m</a>[39m[0m

[32m[1m### DEP0077: [33mModule._debug()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13948[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mModule._debug()[39m is deprecated.[0m

[0mThe [33mModule._debug()[39m function was never documented as an officially[0m
[0msupported API.[0m

[0m[90m<a id="DEP0078">[39m[90m</a>[39m[0m

[32m[1m### DEP0078: [33mREPLServer.turnOffEditorMode()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15136[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mREPLServer.turnOffEditorMode()[39m was removed from userland visibility.[0m

[0m[90m<a id="DEP0079">[39m[90m</a>[39m[0m

[32m[1m### DEP0079: Custom inspection function on Objects via [33m.inspect()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20722[39m
[90m    description: End-of-Life.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16393[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v8.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15631[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mUsing a property named [33minspect[39m on an object to specify a custom inspection[0m
[0mfunction for [[33mutil.inspect()[39m][] is deprecated. Use [[33mutil.inspect.custom[39m][][0m
[0minstead. For backward compatibility with Node.js prior to version 6.4.0, both[0m
[0mmay be specified.[0m

[0m[90m<a id="DEP0080">[39m[90m</a>[39m[0m

[32m[1m### DEP0080: [33mpath._makeLong()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14956[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe internal [33mpath._makeLong()[39m was not intended for public use. However,[0m
[0muserland modules have found it useful. The internal API is deprecated[0m
[0mand replaced with an identical, public [33mpath.toNamespacedPath()[39m method.[0m

[0m[90m<a id="DEP0081">[39m[90m</a>[39m[0m

[32m[1m### DEP0081: [33mfs.truncate()[39m[32m using a file descriptor[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15990[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mfs.truncate()[39m [33mfs.truncateSync()[39m usage with a file descriptor is[0m
[0mdeprecated. Please use [33mfs.ftruncate()[39m or [33mfs.ftruncateSync()[39m to work with[0m
[0mfile descriptors.[0m

[0m[90m<a id="DEP0082">[39m[90m</a>[39m[0m

[32m[1m### DEP0082: [33mREPLServer.prototype.memory()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16242[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mREPLServer.prototype.memory()[39m is only necessary for the internal mechanics of[0m
[0mthe [33mREPLServer[39m itself. Do not use this function.[0m

[0m[90m<a id="DEP0083">[39m[90m</a>[39m[0m

[32m[1m### DEP0083: Disabling ECDH by setting [33mecdhCurve[39m[32m to [33mfalse[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19794[39m
[90m    description: End-of-Life.[39m
[90m  - version: v9.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16130[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life.[0m

[0mThe [33mecdhCurve[39m option to [33mtls.createSecureContext()[39m and [33mtls.TLSSocket[39m could[0m
[0mbe set to [33mfalse[39m to disable ECDH entirely on the server only. This mode was[0m
[0mdeprecated in preparation for migrating to OpenSSL 1.1.0 and consistency with[0m
[0mthe client and is now unsupported. Use the [33mciphers[39m parameter instead.[0m

[0m[90m<a id="DEP0084">[39m[90m</a>[39m[0m

[32m[1m### DEP0084: requiring bundled internal dependencies[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25138[39m
[90m    description: This functionality has been removed.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16392[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mSince Node.js versions 4.4.0 and 5.2.0, several modules only intended for[0m
[0minternal usage were mistakenly exposed to user code through [33mrequire()[39m. These[0m
[0mmodules were:[0m

    * [0m[33mv8/tools/codemap[39m[0m
    * [0m[33mv8/tools/consarray[39m[0m
    * [0m[33mv8/tools/csvparser[39m[0m
    * [0m[33mv8/tools/logreader[39m[0m
    * [0m[33mv8/tools/profile_view[39m[0m
    * [0m[33mv8/tools/profile[39m[0m
    * [0m[33mv8/tools/SourceMap[39m[0m
    * [0m[33mv8/tools/splaytree[39m[0m
    * [0m[33mv8/tools/tickprocessor-driver[39m[0m
    * [0m[33mv8/tools/tickprocessor[39m[0m
    * [0m[33mnode-inspect/lib/_inspect[39m (from 7.6.0)[0m
    * [0m[33mnode-inspect/lib/internal/inspect_client[39m (from 7.6.0)[0m
    * [0m[33mnode-inspect/lib/internal/inspect_repl[39m (from 7.6.0)[0m

[0mThe [33mv8/*[39m modules do not have any exports, and if not imported in a specific[0m
[0morder would in fact throw errors. As such there are virtually no legitimate use[0m
[0mcases for importing them through [33mrequire()[39m.[0m

[0mOn the other hand, [33mnode-inspect[39m may be installed locally through a package[0m
[0mmanager, as it is published on the npm registry under the same name. No source[0m
[0mcode modification is necessary if that is done.[0m

[0m[90m<a id="DEP0085">[39m[90m</a>[39m[0m

[32m[1m### DEP0085: AsyncHooks Sensitive API[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: 10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17147[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v8.10.0[39m
[90m    - v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16972[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe AsyncHooks Sensitive API was never documented and had various minor issues.[0m
[0mUse the [33mAsyncResource[39m API instead. See[0m
[0m[34m[34m[4mhttps://github.com/nodejs/node/issues/15572[24m[39m[34m[39m.[0m

[0m[90m<a id="DEP0086">[39m[90m</a>[39m[0m

[32m[1m### DEP0086: Remove [33mrunInAsyncIdScope[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: 10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17147[39m
[90m    description: End-of-Life.[39m
[90m  - version:[39m
[90m    - v8.10.0[39m
[90m    - v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16972[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mrunInAsyncIdScope[39m doesn't emit the [33m'before'[39m or [33m'after'[39m event and can thus[0m
[0mcause a lot of issues. See [34m[34m[4mhttps://github.com/nodejs/node/issues/14328[24m[39m[34m[39m.[0m

[0m[90m<a id="DEP0089">[39m[90m</a>[39m[0m

[32m[1m### DEP0089: [33mrequire('assert')[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28892[39m
[90m    description: Deprecation revoked.[39m
[90m  - version:[39m
[90m      - v9.9.0[39m
[90m      - v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17002[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Deprecation revoked[0m

[0mImporting assert directly was not recommended as the exposed functions use[0m
[0mloose equality checks. The deprecation was revoked because use of the [33massert[39m[0m
[0mmodule is not discouraged, and the deprecation caused end user confusion.[0m

[0m[90m<a id="DEP0090">[39m[90m</a>[39m[0m

[32m[1m### DEP0090: Invalid GCM authentication tag lengths[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17825[39m
[90m    description: End-of-Life.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18017[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mNode.js used to support all GCM authentication tag lengths which are accepted by[0m
[0mOpenSSL when calling [[33mdecipher.setAuthTag()[39m][]. Beginning with Node.js[0m
[0mv11.0.0, only authentication tag lengths of 128, 120, 112, 104, 96, 64, and 32[0m
[0mbits are allowed. Authentication tags of other lengths are invalid per[0m
[0m[NIST SP 800-38D][].[0m

[0m[90m<a id="DEP0091">[39m[90m</a>[39m[0m

[32m[1m### DEP0091: [33mcrypto.DEFAULT_ENCODING[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18333[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe [[33mcrypto.DEFAULT_ENCODING[39m][] property is deprecated.[0m

[0m[90m<a id="DEP0092">[39m[90m</a>[39m[0m

[32m[1m### DEP0092: Top-level [33mthis[39m[32m bound to [33mmodule.exports[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16878[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mAssigning properties to the top-level [33mthis[39m as an alternative[0m
[0mto [33mmodule.exports[39m is deprecated. Developers should use [33mexports[39m[0m
[0mor [33mmodule.exports[39m instead.[0m

[0m[90m<a id="DEP0093">[39m[90m</a>[39m[0m

[32m[1m### DEP0093: [33mcrypto.fips[39m[32m is deprecated and replaced.[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18335[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [[33mcrypto.fips[39m][] property is deprecated. Please use [33mcrypto.setFips()[39m[0m
[0mand [33mcrypto.getFips()[39m instead.[0m

[0m[90m<a id="DEP0094">[39m[90m</a>[39m[0m

[32m[1m### DEP0094: Using [33massert.fail()[39m[32m with more than one argument.[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18418[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mUsing [33massert.fail()[39m with more than one argument is deprecated. Use[0m
[0m[33massert.fail()[39m with only one argument or use a different [33massert[39m module[0m
[0mmethod.[0m

[0m[90m<a id="DEP0095">[39m[90m</a>[39m[0m

[32m[1m### DEP0095: [33mtimers.enroll()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18066[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mtimers.enroll()[39m is deprecated. Please use the publicly documented[0m
[0m[[33msetTimeout()[39m][] or [[33msetInterval()[39m][] instead.[0m

[0m[90m<a id="DEP0096">[39m[90m</a>[39m[0m

[32m[1m### DEP0096: [33mtimers.unenroll()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18066[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mtimers.unenroll()[39m is deprecated. Please use the publicly documented[0m
[0m[[33mclearTimeout()[39m][] or [[33mclearInterval()[39m][] instead.[0m

[0m[90m<a id="DEP0097">[39m[90m</a>[39m[0m

[32m[1m### DEP0097: [33mMakeCallback[39m[32m with [33mdomain[39m[32m property[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17417[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mUsers of [33mMakeCallback[39m that add the [33mdomain[39m property to carry context,[0m
[0mshould start using the [33masync_context[39m variant of [33mMakeCallback[39m or[0m
[0m[33mCallbackScope[39m, or the high-level [33mAsyncResource[39m class.[0m

[0m[90m<a id="DEP0098">[39m[90m</a>[39m[0m

[32m[1m### DEP0098: AsyncHooks Embedder [33mAsyncResource.emitBefore[39m[32m and [33mAsyncResource.emitAfter[39m[32m APIs[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26530[39m
[90m    description: End-of-Life[39m
[90m  - version:[39m
[90m    - v8.12.0[39m
[90m    - v9.6.0[39m
[90m    - v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18632[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe embedded API provided by AsyncHooks exposes [33m.emitBefore()[39m and[0m
[0m[33m.emitAfter()[39m methods which are very easy to use incorrectly which can lead[0m
[0mto unrecoverable errors.[0m

[0mUse [[33masyncResource.runInAsyncScope()[39m][] API instead which provides a much[0m
[0msafer, and more convenient, alternative. See[0m
[0m[34m[34m[4mhttps://github.com/nodejs/node/pull/18513[24m[39m[34m[39m.[0m

[0m[90m<a id="DEP0099">[39m[90m</a>[39m[0m

[32m[1m### DEP0099: async context-unaware [33mnode::MakeCallback[39m[32m C++ APIs[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18632[39m
[90m    description: Compile-time deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Compile-time[0m

[0mCertain versions of [33mnode::MakeCallback[39m APIs available to native modules are[0m
[0mdeprecated. Please use the versions of the API that accept an [33masync_context[39m[0m
[0mparameter.[0m

[0m[90m<a id="DEP0100">[39m[90m</a>[39m[0m

[32m[1m### DEP0100: [33mprocess.assert()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18666[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v0.3.7[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[33mprocess.assert()[39m is deprecated. Please use the [[33massert[39m][] module instead.[0m

[0mThis was never a documented feature.[0m

[0m[90m<a id="DEP0101">[39m[90m</a>[39m[0m

[32m[1m### DEP0101: [33m--with-lttng[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18982[39m
[90m    description: End-of-Life.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33m--with-lttng[39m compile-time option has been removed.[0m

[0m[90m<a id="DEP0102">[39m[90m</a>[39m[0m

[32m[1m### DEP0102: Using [33mnoAssert[39m[32m in [33mBuffer#(read|write)[39m[32m operations.[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: End-of-Life.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mUsing the [33mnoAssert[39m argument has no functionality anymore. All input is going[0m
[0mto be verified, no matter if it is set to true or not. Skipping the verification[0m
[0mcould lead to hard to find errors and crashes.[0m

[0m[90m<a id="DEP0103">[39m[90m</a>[39m[0m

[32m[1m### DEP0103: [33mprocess.binding('util').is[...][39m[32m typechecks[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22004[39m
[90m    description: Superseded by [DEP0111](#DEP0111).[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18415[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only (supports [[33m--pending-deprecation[39m][])[0m

[0mUsing [33mprocess.binding()[39m in general should be avoided. The type checking[0m
[0mmethods in particular can be replaced by using [[33mutil.types[39m][].[0m

[0mThis deprecation has been superseded by the deprecation of the[0m
[0m[33mprocess.binding()[39m API ([34mDEP0111 ([34m[4m#DEP0111[24m[39m[34m)[39m).[0m

[0m[90m<a id="DEP0104">[39m[90m</a>[39m[0m

[32m[1m### DEP0104: [33mprocess.env[39m[32m string coercion[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18990[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only (supports [[33m--pending-deprecation[39m][])[0m

[0mWhen assigning a non-string property to [[33mprocess.env[39m][], the assigned value is[0m
[0mimplicitly converted to a string. This behavior is deprecated if the assigned[0m
[0mvalue is not a string, boolean, or number. In the future, such assignment may[0m
[0mresult in a thrown error. Please convert the property to a string before[0m
[0massigning it to [33mprocess.env[39m.[0m

[0m[90m<a id="DEP0105">[39m[90m</a>[39m[0m

[32m[1m### DEP0105: [33mdecipher.finaltol[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19941[39m
[90m    description: End-of-Life.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19353[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mdecipher.finaltol()[39m has never been documented and was an alias for[0m
[0m[[33mdecipher.final()[39m][]. This API has been removed, and it is recommended to use[0m
[0m[[33mdecipher.final()[39m][] instead.[0m

[0m[90m<a id="DEP0106">[39m[90m</a>[39m[0m

[32m[1m### DEP0106: [33mcrypto.createCipher[39m[32m and [33mcrypto.createDecipher[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22089[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19343[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mUsing [[33mcrypto.createCipher()[39m][] and [[33mcrypto.createDecipher()[39m][] should be[0m
[0mavoided as they use a weak key derivation function (MD5 with no salt) and static[0m
[0minitialization vectors. It is recommended to derive a key using[0m
[0m[[33mcrypto.pbkdf2()[39m][] or [[33mcrypto.scrypt()[39m][] and to use[0m
[0m[[33mcrypto.createCipheriv()[39m][] and [[33mcrypto.createDecipheriv()[39m][] to obtain the[0m
[0m[[33mCipher[39m][] and [[33mDecipher[39m][] objects respectively.[0m

[0m[90m<a id="DEP0107">[39m[90m</a>[39m[0m

[32m[1m### DEP0107: [33mtls.convertNPNProtocols()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20736[39m
[90m    description: End-of-Life.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19403[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThis was an undocumented helper function not intended for use outside Node.js[0m
[0mcore and obsoleted by the removal of NPN (Next Protocol Negotiation) support.[0m

[0m[90m<a id="DEP0108">[39m[90m</a>[39m[0m

[32m[1m### DEP0108: [33mzlib.bytesRead[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23308[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19414[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mDeprecated alias for [[33mzlib.bytesWritten[39m][]. This original name was chosen[0m
[0mbecause it also made sense to interpret the value as the number of bytes[0m
[0mread by the engine, but is inconsistent with other streams in Node.js that[0m
[0mexpose values under these names.[0m

[0m[90m<a id="DEP0109">[39m[90m</a>[39m[0m

[32m[1m### DEP0109: [33mhttp[39m[32m, [33mhttps[39m[32m, and [33mtls[39m[32m support for invalid URLs[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20270[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mSome previously supported (but strictly invalid) URLs were accepted through the[0m
[0m[[33mhttp.request()[39m][], [[33mhttp.get()[39m][], [[33mhttps.request()[39m][],[0m
[0m[[33mhttps.get()[39m][], and [[33mtls.checkServerIdentity()[39m][] APIs because those were[0m
[0maccepted by the legacy [33murl.parse()[39m API. The mentioned APIs now use the WHATWG[0m
[0mURL parser that requires strictly valid URLs. Passing an invalid URL is[0m
[0mdeprecated and support will be removed in the future.[0m

[0m[90m<a id="DEP0110">[39m[90m</a>[39m[0m

[32m[1m### DEP0110: [33mvm.Script[39m[32m cached data[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20300[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [33mproduceCachedData[39m option is deprecated. Use[0m
[0m[[33mscript.createCachedData()[39m][] instead.[0m

[0m[90m<a id="DEP0111">[39m[90m</a>[39m[0m

[32m[1m### DEP0111: [33mprocess.binding()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22004[39m
[90m    description: Documentation-only deprecation.[39m
[90m  - version: v11.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26500[39m
[90m    description: Added support for `--pending-deprecation`.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only (supports [[33m--pending-deprecation[39m][])[0m

[0m[33mprocess.binding()[39m is for use by Node.js internal code only.[0m

[0m[90m<a id="DEP0112">[39m[90m</a>[39m[0m

[32m[1m### DEP0112: [33mdgram[39m[32m private APIs[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22011[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe [33mdgram[39m module previously contained several APIs that were never meant to[0m
[0maccessed outside of Node.js core: [33mSocket.prototype._handle[39m,[0m
[0m[33mSocket.prototype._receiving[39m, [33mSocket.prototype._bindState[39m,[0m
[0m[33mSocket.prototype._queue[39m, [33mSocket.prototype._reuseAddr[39m,[0m
[0m[33mSocket.prototype._healthCheck()[39m, [33mSocket.prototype._stopReceiving()[39m, and[0m
[0m[33mdgram._createSocketHandle()[39m.[0m

[0m[90m<a id="DEP0113">[39m[90m</a>[39m[0m

[32m[1m### DEP0113: [33mCipher.setAuthTag()[39m[32m, [33mDecipher.getAuthTag()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26249[39m
[90m    description: End-of-Life.[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22126[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0m[33mCipher.setAuthTag()[39m and [33mDecipher.getAuthTag()[39m are no longer available. They[0m
[0mwere never documented and would throw when called.[0m

[0m[90m<a id="DEP0114">[39m[90m</a>[39m[0m

[32m[1m### DEP0114: [33mcrypto._toBuf()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25338[39m
[90m    description: End-of-Life.[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22501[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe [33mcrypto._toBuf()[39m function was not designed to be used by modules outside[0m
[0mof Node.js core and was removed.[0m

[0m[90m<a id="DEP0115">[39m[90m</a>[39m[0m

[32m[1m### DEP0115: [33mcrypto.prng()[39m[32m, [33mcrypto.pseudoRandomBytes()[39m[32m, [33mcrypto.rng()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url:[39m
[90m      - https://github.com/nodejs/node/pull/22519[39m
[90m      - https://github.com/nodejs/node/pull/23017[39m
[90m    description: Added documentation-only deprecation[39m
[90m                 with `--pending-deprecation` support.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only (supports [[33m--pending-deprecation[39m][])[0m

[0mIn recent versions of Node.js, there is no difference between[0m
[0m[[33mcrypto.randomBytes()[39m][] and [33mcrypto.pseudoRandomBytes()[39m. The latter is[0m
[0mdeprecated along with the undocumented aliases [33mcrypto.prng()[39m and[0m
[0m[33mcrypto.rng()[39m in favor of [[33mcrypto.randomBytes()[39m][] and may be removed in a[0m
[0mfuture release.[0m

[0m[90m<a id="DEP0116">[39m[90m</a>[39m[0m

[32m[1m### DEP0116: Legacy URL API[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22715[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mThe [Legacy URL API][] is deprecated. This includes [[33murl.format()[39m][],[0m
[0m[[33murl.parse()[39m][], [[33murl.resolve()[39m][], and the [legacy [33murlObject[39m][]. Please[0m
[0muse the [WHATWG URL API][] instead.[0m

[0m[90m<a id="DEP0117">[39m[90m</a>[39m[0m

[32m[1m### DEP0117: Native crypto handles[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27011[39m
[90m    description: End-of-Life.[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22747[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mPrevious versions of Node.js exposed handles to internal native objects through[0m
[0mthe [33m_handle[39m property of the [33mCipher[39m, [33mDecipher[39m, [33mDiffieHellman[39m,[0m
[0m[33mDiffieHellmanGroup[39m, [33mECDH[39m, [33mHash[39m, [33mHmac[39m, [33mSign[39m, and [33mVerify[39m classes.[0m
[0mThe [33m_handle[39m property has been removed because improper use of the native[0m
[0mobject can lead to crashing the application.[0m

[0m[90m<a id="DEP0118">[39m[90m</a>[39m[0m

[32m[1m### DEP0118: [33mdns.lookup()[39m[32m support for a falsy host name[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23173[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mPrevious versions of Node.js supported [33mdns.lookup()[39m with a falsy host name[0m
[0mlike [33mdns.lookup(false)[39m due to backward compatibility.[0m
[0mThis behavior is undocumented and is thought to be unused in real world apps.[0m
[0mIt will become an error in future versions of Node.js.[0m

[0m[90m<a id="DEP0119">[39m[90m</a>[39m[0m

[32m[1m### DEP0119: [33mprocess.binding('uv').errname()[39m[32m private API[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23597[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only (supports [[33m--pending-deprecation[39m][])[0m

[0m[33mprocess.binding('uv').errname()[39m is deprecated. Please use[0m
[0m[[33mutil.getSystemErrorName()[39m][] instead.[0m

[0m[90m<a id="DEP0120">[39m[90m</a>[39m[0m

[32m[1m### DEP0120: Windows Performance Counter Support[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24862[39m
[90m    description: End-of-Life.[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22485[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mWindows Performance Counter support has been removed from Node.js. The[0m
[0mundocumented [33mCOUNTER_NET_SERVER_CONNECTION()[39m,[0m
[0m[33mCOUNTER_NET_SERVER_CONNECTION_CLOSE()[39m, [33mCOUNTER_HTTP_SERVER_REQUEST()[39m,[0m
[0m[33mCOUNTER_HTTP_SERVER_RESPONSE()[39m, [33mCOUNTER_HTTP_CLIENT_REQUEST()[39m, and[0m
[0m[33mCOUNTER_HTTP_CLIENT_RESPONSE()[39m functions have been deprecated.[0m

[0m[90m<a id="DEP0121">[39m[90m</a>[39m[0m

[32m[1m### DEP0121: [33mnet._setSimultaneousAccepts()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23760[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe undocumented [33mnet._setSimultaneousAccepts()[39m function was originally[0m
[0mintended for debugging and performance tuning when using the [33mchild_process[39m[0m
[0mand [33mcluster[39m modules on Windows. The function is not generally useful and[0m
[0mis being removed. See discussion here:[0m
[0m[34m[34m[4mhttps://github.com/[24m[39m[34m[39m[0m

[0mnodejs/node/issues/18391[0m

[0m[90m<a id="DEP0122">[39m[90m</a>[39m[0m

[32m[1m### DEP0122: [33mtls[39m[32m [33mServer.prototype.setOptions()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23820[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mPlease use [33mServer.prototype.setSecureContext()[39m instead.[0m

[0m[90m<a id="DEP0123">[39m[90m</a>[39m[0m

[32m[1m### DEP0123: setting the TLS ServerName to an IP address[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23329[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mSetting the TLS ServerName to an IP address is not permitted by[0m
[0m[34mRFC 6066 ([34m[4mhttps://tools.ietf.org/html/rfc6066#section-3[24m[39m[34m)[39m. This will be ignored in a future version.[0m

[0m[90m<a id="DEP0124">[39m[90m</a>[39m[0m

[32m[1m### DEP0124: using [33mREPLServer.rli[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26260[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThis property is a reference to the instance itself.[0m

[0m[90m<a id="DEP0125">[39m[90m</a>[39m[0m

[32m[1m### DEP0125: [33mrequire('_stream_wrap')[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26245[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe [33m_stream_wrap[39m module is deprecated.[0m

[0m[90m<a id="DEP0126">[39m[90m</a>[39m[0m

[32m[1m### DEP0126: [33mtimers.active()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.14.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26760[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe previously undocumented [33mtimers.active()[39m is deprecated.[0m
[0mPlease use the publicly documented [34m[33mtimeout.refresh()[39m[34m ([34m[4mtimers.html#timers_timeout_refresh[24m[39m[34m)[39m instead.[0m
[0mIf re-referencing the timeout is necessary, [34m[33mtimeout.ref()[39m[34m ([34m[4mtimers.html#timers_timeout_ref[24m[39m[34m)[39m can be used[0m
[0mwith no performance impact since Node.js 10.[0m

[0m[90m<a id="DEP0127">[39m[90m</a>[39m[0m

[32m[1m### DEP0127: [33mtimers._unrefActive()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.14.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26760[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe previously undocumented and "private" [33mtimers._unrefActive()[39m is deprecated.[0m
[0mPlease use the publicly documented [34m[33mtimeout.refresh()[39m[34m ([34m[4mtimers.html#timers_timeout_refresh[24m[39m[34m)[39m instead.[0m
[0mIf unreferencing the timeout is necessary, [34m[33mtimeout.unref()[39m[34m ([34m[4mtimers.html#timers_timeout_unref[24m[39m[34m)[39m can be used[0m
[0mwith no performance impact since Node.js 10.[0m

[0m[90m<a id="DEP0128">[39m[90m</a>[39m[0m

[32m[1m### DEP0128: modules with an invalid [33mmain[39m[32m entry and an [33mindex.js[39m[32m file[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26823[39m
[90m    description: Documentation-only.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only (supports [34m[33m--pending-deprecation[39m[34m ([34m[4mcli.html#cli_pending_deprecation[24m[39m[34m)[39m)[0m

[0mModules that have an invalid [33mmain[39m entry (e.g., [33m./does-not-exist.js[39m) and[0m
[0malso have an [33mindex.js[39m file in the top level directory will resolve the[0m
[0m[33mindex.js[39m file. That is deprecated and is going to throw an error in future[0m
[0mNode.js versions.[0m

[0m[90m<a id="DEP0129">[39m[90m</a>[39m[0m

[32m[1m### DEP0129: [33mChildProcess._channel[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27949[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v11.14.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26982[39m
[90m    description: Documentation-only.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mThe [33m_channel[39m property of child process objects returned by [33mspawn()[39m and[0m
[0msimilar functions is not intended for public use. Use [33mChildProcess.channel[39m[0m
[0minstead.[0m

[0m[90m<a id="DEP0130">[39m[90m</a>[39m[0m

[32m[1m### DEP0130: [33mModule.createRequireFromPath()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27951[39m
[90m    description: Runtime deprecation.[39m
[90m  - version: v12.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27405[39m
[90m    description: Documentation-only.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mModule.createRequireFromPath() is deprecated. Please use[0m
[0m[34m[33mmodule.createRequire()[39m[34m ([34m[4mmodules.html#modules_module_createrequire_filename[24m[39m[34m)[39m instead.[0m

[0m[90m<a id="DEP0131">[39m[90m</a>[39m[0m

[32m[1m### DEP0131: Legacy HTTP parser[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29589[39m
[90m    description: This feature has been removed.[39m
[90m  - version: v12.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27498[39m
[90m    description: Documentation-only.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: End-of-Life[0m

[0mThe legacy HTTP parser, used by default in versions of Node.js prior to 12.0.0,[0m
[0mis deprecated and has been removed in v13.0.0. Prior to v13.0.0, the[0m
[0m[33m--http-parser=legacy[39m command-line flag could be used to revert to using the[0m
[0mlegacy parser.[0m

[0m[90m<a id="DEP0132">[39m[90m</a>[39m[0m

[32m[1m### DEP0132: [33mworker.terminate()[39m[32m with callback[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28021[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mPassing a callback to [34m[33mworker.terminate()[39m[34m ([34m[4mworker_threads.html#worker_threads_worker_terminate[24m[39m[34m)[39m is deprecated. Use the returned[0m
[0m[33mPromise[39m instead, or a listener to the worker’s [33m'exit'[39m event.[0m

[0m[90m<a id="DEP0133">[39m[90m</a>[39m[0m

[32m[1m### DEP0133: [33mhttp[39m[32m [33mconnection[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29015[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0mPrefer [34m[33mresponse.socket[39m[34m ([34m[4mhttp.html#http_response_socket[24m[39m[34m)[39m over [34m[33mresponse.connection[39m[34m ([34m[4mhttp.html#http_response_connection[24m[39m[34m)[39m and[0m
[0m[34m[33mrequest.socket[39m[34m ([34m[4mhttp.html#http_request_socket[24m[39m[34m)[39m over [34m[33mrequest.connection[39m[34m ([34m[4mhttp.html#http_request_connection[24m[39m[34m)[39m.[0m

[0m[90m<a id="DEP0134">[39m[90m</a>[39m[0m

[32m[1m### DEP0134: [33mprocess._tickCallback[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v12.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29781[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m[0mType: Documentation-only (supports [34m[33m--pending-deprecation[39m[34m ([34m[4mcli.html#cli_pending_deprecation[24m[39m[34m)[39m)[0m

[0mThe [33mprocess._tickCallback[39m property was never documented as[0m
[0man officially supported API.[0m

[0m[90m<a id="DEP0135">[39m[90m</a>[39m[0m

[32m[1m### DEP0135: [33mWriteStream.open()[39m[32m and [33mReadStream.open()[39m[32m are internal[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v13.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29061[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0m[34m[33mWriteStream.open()[39m[34m ([34m[4mfs.html#fs_class_fs_writestream[24m[39m[34m)[39m and [34m[33mReadStream.open()[39m[34m ([34m[4mfs.html#fs_class_fs_readstream[24m[39m[34m)[39m are undocumented internal[0m
[0mAPIs that do not make sense to use in userland. File streams should always be[0m
[0mopened through their corresponding factory methods [34m[33mfs.createWriteStream()[39m[34m ([34m[4mfs.html#fs_fs_createwritestream_path_options[24m[39m[34m)[39m[0m
[0mand [34m[33mfs.createReadStream()[39m[34m ([34m[4mfs.html#fs_fs_createreadstream_path_options[24m[39m[34m)[39m) or by passing a file descriptor in options.[0m

[0m[90m<a id="DEP0136">[39m[90m</a>[39m[0m

[32m[1m### DEP0136: [33mhttp[39m[32m [33mfinished[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v13.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28679[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0m[34m[33mresponse.finished[39m[34m ([34m[4m#http_response_finished[24m[39m[34m)[39m indicates whether [34m[33mresponse.end()[39m[34m ([34m[4mhttp.html#http_response_end_data_encoding_callback[24m[39m[34m)[39m has been[0m
[0mcalled, not whether [33m'finish'[39m has been emitted and the underlying data[0m
[0mis flushed.[0m

[0mUse [34m[33mresponse.writableFinished[39m[34m ([34m[4m#http_response_writablefinished[24m[39m[34m)[39m or [34m[33mresponse.writableEnded[39m[34m ([34m[4m#http_response_writableended[24m[39m[34m)[39m[0m
[0maccordingly instead to avoid the ambigiuty.[0m

[0mTo maintain existing behaviour [33mresponse.finished[39m should be replaced with[0m
[0m[33mresponse.writableEnded[39m.[0m

[0m[90m<a id="DEP0137">[39m[90m</a>[39m[0m

[32m[1m### DEP0137: Closing fs.FileHandle on garbage collection[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28396[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mAllowing a [34m[33mfs.FileHandle[39m[34m ([34m[4mfs.html#fs_class_filehandle[24m[39m[34m)[39m object to be closed on garbage collection is[0m
[0mdeprecated. In the future, doing so may result in a thrown error that will[0m
[0mterminate the process.[0m

[0mPlease ensure that all [33mfs.FileHandle[39m objects are explicitly closed using[0m
[0m[33mFileHandle.prototype.close()[39m when the [33mfs.FileHandle[39m is no longer needed:[0m

    [94mconst[39m [37mfsPromises[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[32m.[39m[37mpromises[39m[90m;[39m
    [37masync[39m [94mfunction[39m [37mopenAndClose[39m[90m([39m[90m)[39m [33m{[39m
      [94mlet[39m [37mfilehandle[39m[90m;[39m
      [36mtry[39m [33m{[39m
        [37mfilehandle[39m [93m=[39m [37mawait[39m [37mfsPromises[39m[32m.[39m[37mopen[39m[90m([39m[92m'thefile.txt'[39m[32m,[39m [92m'r'[39m[90m)[39m[90m;[39m
      [33m}[39m [36mfinally[39m [33m{[39m
        [94mif[39m [90m([39m[37mfilehandle[39m [93m!==[39m [90mundefined[39m[90m)[39m
          [37mawait[39m [37mfilehandle[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m

[0m[90m<a id="DEP0138">[39m[90m</a>[39m[0m

[32m[1m### DEP0138: [33mprocess.mainModule[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32232[39m
[90m    description: Documentation-only deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Documentation-only[0m

[0m[34m[33mprocess.mainModule[39m[34m ([34m[4mprocess.html#process_process_mainmodule[24m[39m[34m)[39m is a CommonJS-only feature while [33mprocess[39m global[0m
[0mobject is shared with non-CommonJS environment. Its use within ECMAScript[0m
[0mmodules is unsupported.[0m

[0mIt is deprecated in favor of [34m[33mrequire.main[39m[34m ([34m[4mmodules.html#modules_accessing_the_main_module[24m[39m[34m)[39m, because it serves the same[0m
[0mpurpose and is only available on CommonJS environment.[0m

[0m[90m<a id="DEP0139">[39m[90m</a>[39m[0m

[32m[1m### DEP0139: [33mprocess.umask()[39m[32m with no arguments[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32499[39m
[90m    description: Runtime deprecation.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mType: Runtime[0m

[0mCalling [33mprocess.umask()[39m with no arguments causes the process-wide umask to be[0m
[0mwritten twice. This introduces a race condition between threads, and is a[0m
[0mpotential security vulnerability. There is no safe, cross-platform alternative[0m
[0mAPI.[0m

