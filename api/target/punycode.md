[35m[4m[1m# Punycode[22m[24m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7941[39m
[90m    description: Accessing this module will now emit a deprecation warning.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated[0m[23m[39m

[0m[1mThe version of the punycode module bundled in Node.js is being deprecated[22m.[0m
[0mIn a future major version of Node.js this module will be removed. Users[0m
[0mcurrently depending on the [33mpunycode[39m module should switch to using the[0m
[0muserland-provided [34mPunycode.js ([34m[4mhttps://github.com/bestiejs/punycode.js[24m[39m[34m)[39m module instead.[0m

[0mThe [33mpunycode[39m module is a bundled version of the [34mPunycode.js ([34m[4mhttps://github.com/bestiejs/punycode.js[24m[39m[34m)[39m module. It[0m
[0mcan be accessed using:[0m

    [94mconst[39m [37mpunycode[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/punycode'[39m[90m)[39m[90m;[39m

[0m[34mPunycode ([34m[4mhttps://tools.ietf.org/html/rfc3492[24m[39m[34m)[39m is a character encoding scheme defined by RFC 3492 that is[0m
[0mprimarily intended for use in Internationalized Domain Names. Because host[0m
[0mnames in URLs are limited to ASCII characters only, Domain Names that contain[0m
[0mnon-ASCII characters must be converted into ASCII using the Punycode scheme.[0m
[0mFor instance, the Japanese character that translates into the English word,[0m
[0m[33m'example'[39m is [33m'例'[39m. The Internationalized Domain Name, [33m'例.com'[39m (equivalent[0m
[0mto [33m'example.com'[39m) is represented by Punycode as the ASCII string[0m
[0m[33m'xn--fsq.com'[39m.[0m

[0mThe [33mpunycode[39m module provides a simple implementation of the Punycode standard.[0m

[0mThe [33mpunycode[39m module is a third-party dependency used by Node.js and[0m
[0mmade available to developers as a convenience. Fixes or other modifications to[0m
[0mthe module must be directed to the [34mPunycode.js ([34m[4mhttps://github.com/bestiejs/punycode.js[24m[39m[34m)[39m project.[0m

[32m[1m## [33mpunycode.decode(string)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstring[39m {string}[0m

[0mThe [33mpunycode.decode()[39m method converts a [34mPunycode ([34m[4mhttps://tools.ietf.org/html/rfc3492[24m[39m[34m)[39m string of ASCII-only[0m
[0mcharacters to the equivalent string of Unicode codepoints.[0m

    [37mpunycode[39m[32m.[39m[37mdecode[39m[90m([39m[92m'maana-pta'[39m[90m)[39m[90m;[39m [90m// 'mañana'[39m
    [37mpunycode[39m[32m.[39m[37mdecode[39m[90m([39m[92m'--dqo34k'[39m[90m)[39m[90m;[39m [90m// '☃-⌘'[39m

[32m[1m## [33mpunycode.encode(string)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstring[39m {string}[0m

[0mThe [33mpunycode.encode()[39m method converts a string of Unicode codepoints to a[0m
[0m[34mPunycode ([34m[4mhttps://tools.ietf.org/html/rfc3492[24m[39m[34m)[39m string of ASCII-only characters.[0m

    [37mpunycode[39m[32m.[39m[37mencode[39m[90m([39m[92m'mañana'[39m[90m)[39m[90m;[39m [90m// 'maana-pta'[39m
    [37mpunycode[39m[32m.[39m[37mencode[39m[90m([39m[92m'☃-⌘'[39m[90m)[39m[90m;[39m [90m// '--dqo34k'[39m

[32m[1m## [33mpunycode.toASCII(domain)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdomain[39m {string}[0m

[0mThe [33mpunycode.toASCII()[39m method converts a Unicode string representing an[0m
[0mInternationalized Domain Name to [34mPunycode ([34m[4mhttps://tools.ietf.org/html/rfc3492[24m[39m[34m)[39m. Only the non-ASCII parts of the[0m
[0mdomain name will be converted. Calling [33mpunycode.toASCII()[39m on a string that[0m
[0malready only contains ASCII characters will have no effect.[0m

    [90m// encode domain names[39m
    [37mpunycode[39m[32m.[39m[37mtoASCII[39m[90m([39m[92m'mañana.com'[39m[90m)[39m[90m;[39m  [90m// 'xn--maana-pta.com'[39m
    [37mpunycode[39m[32m.[39m[37mtoASCII[39m[90m([39m[92m'☃-⌘.com'[39m[90m)[39m[90m;[39m   [90m// 'xn----dqo34k.com'[39m
    [37mpunycode[39m[32m.[39m[37mtoASCII[39m[90m([39m[92m'example.com'[39m[90m)[39m[90m;[39m [90m// 'example.com'[39m

[32m[1m## [33mpunycode.toUnicode(domain)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdomain[39m {string}[0m

[0mThe [33mpunycode.toUnicode()[39m method converts a string representing a domain name[0m
[0mcontaining [34mPunycode ([34m[4mhttps://tools.ietf.org/html/rfc3492[24m[39m[34m)[39m encoded characters into Unicode. Only the [34mPunycode ([34m[4mhttps://tools.ietf.org/html/rfc3492[24m[39m[34m)[39m[0m
[0mencoded parts of the domain name are be converted.[0m

    [90m// decode domain names[39m
    [37mpunycode[39m[32m.[39m[37mtoUnicode[39m[90m([39m[92m'xn--maana-pta.com'[39m[90m)[39m[90m;[39m [90m// 'mañana.com'[39m
    [37mpunycode[39m[32m.[39m[37mtoUnicode[39m[90m([39m[92m'xn----dqo34k.com'[39m[90m)[39m[90m;[39m  [90m// '☃-⌘.com'[39m
    [37mpunycode[39m[32m.[39m[37mtoUnicode[39m[90m([39m[92m'example.com'[39m[90m)[39m[90m;[39m       [90m// 'example.com'[39m

[32m[1m## [33mpunycode.ucs2[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[32m[1m### [33mpunycode.ucs2.decode(string)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstring[39m {string}[0m

[0mThe [33mpunycode.ucs2.decode()[39m method returns an array containing the numeric[0m
[0mcodepoint values of each Unicode symbol in the string.[0m

    [37mpunycode[39m[32m.[39m[37mucs2[39m[32m.[39m[37mdecode[39m[90m([39m[92m'abc'[39m[90m)[39m[90m;[39m [90m// [0x61, 0x62, 0x63][39m
    [90m// surrogate pair for U+1D306 tetragram for centre:[39m
    [37mpunycode[39m[32m.[39m[37mucs2[39m[32m.[39m[37mdecode[39m[90m([39m[92m'\uD834\uDF06'[39m[90m)[39m[90m;[39m [90m// [0x1D306][39m

[32m[1m### [33mpunycode.ucs2.encode(codePoints)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcodePoints[39m {integer[]}[0m

[0mThe [33mpunycode.ucs2.encode()[39m method returns a string based on an array of[0m
[0mnumeric code point values.[0m

    [37mpunycode[39m[32m.[39m[37mucs2[39m[32m.[39m[37mencode[39m[90m([39m[33m[[39m[34m0x61[39m[32m,[39m [34m0x62[39m[32m,[39m [34m0x63[39m[33m][39m[90m)[39m[90m;[39m [90m// 'abc'[39m
    [37mpunycode[39m[32m.[39m[37mucs2[39m[32m.[39m[37mencode[39m[90m([39m[33m[[39m[34m0x1D306[39m[33m][39m[90m)[39m[90m;[39m [90m// '\uD834\uDF06'[39m

[32m[1m## [33mpunycode.version[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mReturns a string identifying the current [34mPunycode.js ([34m[4mhttps://github.com/bestiejs/punycode.js[24m[39m[34m)[39m version number.[0m

