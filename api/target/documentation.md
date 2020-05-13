[35m[4m[1m# About this Documentation[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mWelcome to the official API reference documentation for Node.js![0m

[0mNode.js is a JavaScript runtime built on the [34mV8 JavaScript engine ([34m[4mhttps://v8.dev/[24m[39m[34m)[39m.[0m

[32m[1m## Contributing[22m[39m

[0mReport errors in this documentation in [34mthe issue tracker ([34m[4mhttps://github.com/nodejs/node/issues/new[24m[39m[34m)[39m. See[0m
[0m[34mthe contributing guide ([34m[4mhttps://github.com/nodejs/node/blob/master/CONTRIBUTING.md[24m[39m[34m)[39m for directions on how to submit pull requests.[0m

[32m[1m## Stability Index[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mThroughout the documentation are indications of a section's stability. Some APIs[0m
[0mare so proven and so relied upon that they are unlikely to ever change at all.[0m
[0mOthers are brand new and experimental, or known to be hazardous.[0m

[0mThe stability indices are as follows:[0m

[90m[3m    [0mStability: 0 - Deprecated. The feature may emit warnings. Backward[0m[23m[39m
[90m[3m    [0mcompatibility is not guaranteed.[0m[23m[39m

[90m<!-- separator -->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental. The feature is not subject to[0m[23m[39m
[90m[3m    [0m[34mSemantic Versioning ([34m[4mhttps://semver.org/[24m[39m[90m[34m)[39m[90m rules. Non-backward compatible changes or removal may[0m[23m[39m
[90m[3m    [0moccur in any future release. Use of the feature is not recommended in[0m[23m[39m
[90m[3m    [0mproduction environments.[0m[23m[39m

[90m<!-- separator -->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable. Compatibility with the npm ecosystem is a high[0m[23m[39m
[90m[3m    [0mpriority.[0m[23m[39m

[0mUse caution when making use of Experimental features, particularly within[0m
[0mmodules. End users may not be aware that experimental features are being used.[0m
[0mBugs or behavior changes may surprise end users when Experimental API[0m
[0mmodifications occur. To avoid surprises, use of an Experimental feature may need[0m
[0ma command-line flag. Experimental features may also emit a [34mwarning ([34m[4mprocess.html#process_event_warning[24m[39m[34m)[39m.[0m

[32m[1m## JSON Output[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.12[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEvery [33m.html[39m document has a corresponding [33m.json[39m document. This is for IDEs[0m
[0mand other utilities that consume the documentation.[0m

[32m[1m## System calls and man pages[22m[39m

[0mNode.js functions which wrap a system call will document that. The docs link[0m
[0mto the corresponding man pages which describe how the system call works.[0m

[0mMost Unix system calls have Windows analogues. Still, behavior differences may[0m
[0mbe unavoidable.[0m

