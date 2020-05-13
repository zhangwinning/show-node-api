[35m[4m[1m# Internationalization Support[22m[24m[39m

[90m<!--introduced_in=v8.2.0-->[39m
[90m[39m[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mNode.js has many features that make it easier to write internationalized[0m
[0mprograms. Some of them are:[0m

    * [0mLocale-sensitive or Unicode-aware functions in the [ECMAScript Language[0m
      [0mSpecification][34mECMA-262 ([34m[4mhttps://tc39.github.io/ecma262/[24m[39m[34m)[39m:
        * [0m[0m[34m[33mString.prototype.normalize()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize[24m[39m[34m)[39m[0m[0m[0m
      [0m
        * [0m[0m[34m[33mString.prototype.toLowerCase()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase[24m[39m[34m)[39m[0m[0m[0m
      [0m
        * [0m[0m[34m[33mString.prototype.toUpperCase()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase[24m[39m[34m)[39m[0m[0m[0m
    * [0mAll functionality described in the [ECMAScript Internationalization API[0m
      [0mSpecification][34mECMA-402 ([34m[4mhttps://tc39.github.io/ecma402/[24m[39m[34m)[39m (aka ECMA-402):
        * [0m[0m[34m[33mIntl[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl[24m[39m[34m)[39m object[0m[0m[0m
      [0m
        * [0m[0mLocale-sensitive methods like [34m[33mString.prototype.localeCompare()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare[24m[39m[34m)[39m and[0m[0m[0m
      [0m      [0m[0m[34m[33mDate.prototype.toLocaleString()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString[24m[39m[34m)[39m[0m[0m[0m
    * [0mThe [34mWHATWG URL parser ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m's [34minternationalized domain names ([34m[4mhttps://en.wikipedia.org/wiki/Internationalized_domain_name[24m[39m[34m)[39m (IDNs) support[0m
    * [0m[34m[33mrequire('buffer').transcode()[39m[34m ([34m[4mbuffer.html#buffer_buffer_transcode_source_fromenc_toenc[24m[39m[34m)[39m[0m
    * [0mMore accurate [34mREPL ([34m[4mrepl.html#repl_repl[24m[39m[34m)[39m line editing[0m
    * [0m[34m[33mrequire('util').TextDecoder[39m[34m ([34m[4mutil.html#util_class_util_textdecoder[24m[39m[34m)[39m[0m
    * [0m[34m[33mRegExp[39m[34m Unicode Property Escapes ([34m[4mhttps://github.com/tc39/proposal-regexp-unicode-property-escapes[24m[39m[34m)[39m[0m

[0mNode.js (and its underlying V8 engine) uses [34mICU ([34m[4mhttp://site.icu-project.org/[24m[39m[34m)[39m to implement these features[0m
[0min native C/C++ code. The full ICU data set is provided by Node.js by default.[0m
[0mHowever, due to the size of the ICU data file, several[0m
[0moptions are provided for customizing the ICU data set either when[0m
[0mbuilding or running Node.js.[0m

[32m[1m## Options for building Node.js[22m[39m

[0mTo control how ICU is used in Node.js, four [33mconfigure[39m options are available[0m
[0mduring compilation. Additional details on how to compile Node.js are documented[0m
[0min [34mBUILDING.md ([34m[4mhttps://github.com/nodejs/node/blob/master/BUILDING.md[24m[39m[34m)[39m.[0m

    * [0m[33m--with-intl=none[39m/[33m--without-intl[39m[0m
    * [0m[33m--with-intl=system-icu[39m[0m
    * [0m[33m--with-intl=small-icu[39m[0m
    * [0m[33m--with-intl=full-icu[39m (default)[0m

[0mAn overview of available Node.js and JavaScript features for each [33mconfigure[39m[0m
[0moption:[0m

[0m┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────────────────────────────┬──────────────────────────────┬────────────────────────┬──────────┐[0m
[0m│                                                                                                                                            │ [33mnone[39m                              │ [33msystem-icu[39m                   │ [33msmall-icu[39m              │ [33mfull-icu[39m │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [34m[33mString.prototype.normalize()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize[24m[39m[34m)[39m           │ none (function is no-op)          │ full                         │ full                   │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [33mString.prototype.to*Case()[39m                                                                                                                 │ full                              │ full                         │ full                   │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [34m[33mIntl[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl[24m[39m[34m)[39m                                               │ none (object does not exist)      │ partial/full (depends on OS) │ partial (English-only) │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [34m[33mString.prototype.localeCompare()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare[24m[39m[34m)[39m   │ partial (not locale-aware)        │ full                         │ full                   │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [33mString.prototype.toLocale*Case()[39m                                                                                                           │ partial (not locale-aware)        │ full                         │ full                   │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [34m[33mNumber.prototype.toLocaleString()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString[24m[39m[34m)[39m │ partial (not locale-aware)        │ partial/full (depends on OS) │ partial (English-only) │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [33mDate.prototype.toLocale*String()[39m                                                                                                           │ partial (not locale-aware)        │ partial/full (depends on OS) │ partial (English-only) │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [34mWHATWG URL Parser ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m                                                                                        │ partial (no IDN support)          │ full                         │ full                   │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [34m[33mrequire('buffer').transcode()[39m[34m ([34m[4mbuffer.html#buffer_buffer_transcode_source_fromenc_toenc[24m[39m[34m)[39m                                                   │ none (function does not exist)    │ full                         │ full                   │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [34mREPL ([34m[4mrepl.html#repl_repl[24m[39m[34m)[39m                                                                                                                 │ partial (inaccurate line editing) │ full                         │ full                   │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [34m[33mrequire('util').TextDecoder[39m[34m ([34m[4mutil.html#util_class_util_textdecoder[24m[39m[34m)[39m                                                                        │ partial (basic encodings support) │ partial/full (depends on OS) │ partial (Unicode-only) │ full     │[0m
[0m├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────┼────────────────────────┼──────────┤[0m
[0m│ [34m[33mRegExp[39m[34m Unicode Property Escapes ([34m[4mhttps://github.com/tc39/proposal-regexp-unicode-property-escapes[24m[39m[34m)[39m                                         │ none (invalid [33mRegExp[39m error)       │ full                         │ full                   │ full     │[0m
[0m└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────────────────────────────┴──────────────────────────────┴────────────────────────┴──────────┘[0m

[0mThe "(not locale-aware)" designation denotes that the function carries out its[0m
[0moperation just like the non-[33mLocale[39m version of the function, if one[0m
[0mexists. For example, under [33mnone[39m mode, [33mDate.prototype.toLocaleString()[39m's[0m
[0moperation is identical to that of [33mDate.prototype.toString()[39m.[0m

[32m[1m### Disable all internationalization features ([33mnone[39m[32m)[22m[39m

[0mIf this option is chosen, ICU is disabled and most internationalization[0m
[0mfeatures mentioned above will be [1munavailable[22m in the resulting [33mnode[39m binary.[0m

[32m[1m### Build with a pre-installed ICU ([33msystem-icu[39m[32m)[22m[39m

[0mNode.js can link against an ICU build already installed on the system. In fact,[0m
[0mmost Linux distributions already come with ICU installed, and this option would[0m
[0mmake it possible to reuse the same set of data used by other components in the[0m
[0mOS.[0m

[0mFunctionalities that only require the ICU library itself, such as[0m
[0m[34m[33mString.prototype.normalize()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize[24m[39m[34m)[39m and the [34mWHATWG URL parser ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m, are fully[0m
[0msupported under [33msystem-icu[39m. Features that require ICU locale data in[0m
[0maddition, such as [34m[33mIntl.DateTimeFormat[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat[24m[39m[34m)[39m [3mmay[23m be fully or partially[0m
[0msupported, depending on the completeness of the ICU data installed on the[0m
[0msystem.[0m

[32m[1m### Embed a limited set of ICU data ([33msmall-icu[39m[32m)[22m[39m

[0mThis option makes the resulting binary link against the ICU library statically,[0m
[0mand includes a subset of ICU data (typically only the English locale) within[0m
[0mthe [33mnode[39m executable.[0m

[0mFunctionalities that only require the ICU library itself, such as[0m
[0m[34m[33mString.prototype.normalize()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize[24m[39m[34m)[39m and the [34mWHATWG URL parser ([34m[4murl.html#url_the_whatwg_url_api[24m[39m[34m)[39m, are fully[0m
[0msupported under [33msmall-icu[39m. Features that require ICU locale data in addition,[0m
[0msuch as [34m[33mIntl.DateTimeFormat[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat[24m[39m[34m)[39m, generally only work with the English locale:[0m

    [94mconst[39m [37mjanuary[39m [93m=[39m [31mnew[39m [37mDate[39m[90m([39m[34m9e8[39m[90m)[39m[90m;[39m
    [94mconst[39m [37menglish[39m [93m=[39m [31mnew[39m [37mIntl[39m[32m.[39m[37mDateTimeFormat[39m[90m([39m[92m'en'[39m[32m,[39m [33m{[39m [37mmonth[39m[93m:[39m [92m'long'[39m [33m}[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mspanish[39m [93m=[39m [31mnew[39m [37mIntl[39m[32m.[39m[37mDateTimeFormat[39m[90m([39m[92m'es'[39m[32m,[39m [33m{[39m [37mmonth[39m[93m:[39m [92m'long'[39m [33m}[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37menglish[39m[32m.[39m[37mformat[39m[90m([39m[37mjanuary[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints "January"[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mspanish[39m[32m.[39m[37mformat[39m[90m([39m[37mjanuary[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints "M01" on small-icu[39m
    [90m// Should print "enero"[39m

[0mThis mode provides a balance between features and binary size.[0m

[32m[1m#### Providing ICU data at runtime[22m[39m

[0mIf the [33msmall-icu[39m option is used, one can still provide additional locale data[0m
[0mat runtime so that the JS methods would work for all ICU locales. Assuming the[0m
[0mdata file is stored at [33m/some/directory[39m, it can be made available to ICU[0m
[0mthrough either:[0m

    * [0m[0m[0mThe [34m[33mNODE_ICU_DATA[39m[34m ([34m[4mcli.html#cli_node_icu_data_file[24m[39m[34m)[39m environment variable:[0m[0m[0m
      [0m[0m
      [0m    [33menv NODE_ICU_DATA=/some/directory node[39m[0m
    * [0m[0m[0mThe [34m[33m--icu-data-dir[39m[34m ([34m[4mcli.html#cli_icu_data_dir_file[24m[39m[34m)[39m CLI parameter:[0m[0m[0m
      [0m[0m
      [0m    [33mnode --icu-data-dir=/some/directory[39m[0m

[0m(If both are specified, the [33m--icu-data-dir[39m CLI parameter takes precedence.)[0m

[0mICU is able to automatically find and load a variety of data formats, but the[0m
[0mdata must be appropriate for the ICU version, and the file correctly named.[0m
[0mThe most common name for the data file is [33micudt6X[bl].dat[39m, where [33m6X[39m denotes[0m
[0mthe intended ICU version, and [33mb[39m or [33ml[39m indicates the system's endianness.[0m
[0mCheck [34m"ICU Data" ([34m[4mhttp://userguide.icu-project.org/icudata[24m[39m[34m)[39m article in the ICU User Guide for other supported formats[0m
[0mand more details on ICU data in general.[0m

[0mThe [34mfull-icu ([34m[4mhttps://www.npmjs.com/package/full-icu[24m[39m[34m)[39m npm module can greatly simplify ICU data installation by[0m
[0mdetecting the ICU version of the running [33mnode[39m executable and downloading the[0m
[0mappropriate data file. After installing the module through [33mnpm i full-icu[39m,[0m
[0mthe data file will be available at [33m./node_modules/full-icu[39m. This path can be[0m
[0mthen passed either to [33mNODE_ICU_DATA[39m or [33m--icu-data-dir[39m as shown above to[0m
[0menable full [33mIntl[39m support.[0m

[32m[1m### Embed the entire ICU ([33mfull-icu[39m[32m)[22m[39m

[0mThis option makes the resulting binary link against ICU statically and include[0m
[0ma full set of ICU data. A binary created this way has no further external[0m
[0mdependencies and supports all locales, but might be rather large. This is[0m
[0mthe default behavior if no [33m--with-intl[39m flag is passed. The official binaries[0m
[0mare also built in this mode.[0m

[32m[1m## Detecting internationalization support[22m[39m

[0mTo verify that ICU is enabled at all ([33msystem-icu[39m, [33msmall-icu[39m, or[0m
[0m[33mfull-icu[39m), simply checking the existence of [33mIntl[39m should suffice:[0m

    [94mconst[39m [37mhasICU[39m [93m=[39m [94mtypeof[39m [37mIntl[39m [93m===[39m [92m'object'[39m[90m;[39m

[0mAlternatively, checking for [33mprocess.versions.icu[39m, a property defined only[0m
[0mwhen ICU is enabled, works too:[0m

    [94mconst[39m [37mhasICU[39m [93m=[39m [94mtypeof[39m [37mprocess[39m[32m.[39m[37mversions[39m[32m.[39m[37micu[39m [93m===[39m [92m'string'[39m[90m;[39m

[0mTo check for support for a non-English locale (i.e. [33mfull-icu[39m or[0m
[0m[33msystem-icu[39m), [34m[33mIntl.DateTimeFormat[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat[24m[39m[34m)[39m can be a good distinguishing factor:[0m

    [94mconst[39m [37mhasFullICU[39m [93m=[39m [90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [36mtry[39m [33m{[39m
        [94mconst[39m [37mjanuary[39m [93m=[39m [31mnew[39m [37mDate[39m[90m([39m[34m9e8[39m[90m)[39m[90m;[39m
        [94mconst[39m [37mspanish[39m [93m=[39m [31mnew[39m [37mIntl[39m[32m.[39m[37mDateTimeFormat[39m[90m([39m[92m'es'[39m[32m,[39m [33m{[39m [37mmonth[39m[93m:[39m [92m'long'[39m [33m}[39m[90m)[39m[90m;[39m
        [31mreturn[39m [37mspanish[39m[32m.[39m[37mformat[39m[90m([39m[37mjanuary[39m[90m)[39m [93m===[39m [92m'enero'[39m[90m;[39m
      [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [31mreturn[39m [91mfalse[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[0mFor more verbose tests for [33mIntl[39m support, the following resources may be found[0m
[0mto be helpful:[0m

    * [0m[34mbtest402 ([34m[4mhttps://github.com/srl295/btest402[24m[39m[34m)[39m: Generally used to check whether Node.js with [33mIntl[39m support is[0m
      [0mbuilt correctly.[0m
    * [0m[34mTest262 ([34m[4mhttps://github.com/tc39/test262/tree/master/test/intl402[24m[39m[34m)[39m: ECMAScript's official conformance test suite includes a section[0m
      [0mdedicated to ECMA-402.[0m

