[35m[4m[1m# URL[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33murl[39m module provides utilities for URL resolution and parsing. It can be[0m
[0maccessed using:[0m

    [94mconst[39m [37murl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/url'[39m[90m)[39m[90m;[39m

[32m[1m## URL Strings and URL Objects[22m[39m

[0mA URL string is a structured string containing multiple meaningful components.[0m
[0mWhen parsed, a URL object is returned containing properties for each of these[0m
[0mcomponents.[0m

[0mThe [33murl[39m module provides two APIs for working with URLs: a legacy API that is[0m
[0mNode.js specific, and a newer API that implements the same[0m
[0m[34mWHATWG URL Standard ([34m[4mhttps://url.spec.whatwg.org/[24m[39m[34m)[39m used by web browsers.[0m

[0mA comparison between the WHATWG and Legacy APIs is provided below. Above the URL[0m
[0m[33m'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'[39m, properties[0m
[0mof an object returned by the legacy [33murl.parse()[39m are shown. Below it are[0m
[0mproperties of a WHATWG [33mURL[39m object.[0m

[0mWHATWG URL's [33morigin[39m property includes [33mprotocol[39m and [33mhost[39m, but not[0m
[0m[33musername[39m or [33mpassword[39m.[0m

    [33m┌────────────────────────────────────────────────────────────────────────────────────────────────┐[39m
    [33m│                                              href                                              │[39m
    [33m├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤[39m
    [33m│ protocol │  │        auth         │          host          │           path            │ hash  │[39m
    [33m│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │[39m
    [33m│          │  │                     │    hostname     │ port │ pathname │     search     │       │[39m
    [33m│          │  │                     │                 │      │          ├─┬──────────────┤       │[39m
    [33m│          │  │                     │                 │      │          │ │    query     │       │[39m
    [33m"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "[39m
    [33m│          │  │          │          │    hostname     │ port │          │                │       │[39m
    [33m│          │  │          │          ├─────────────────┴──────┤          │                │       │[39m
    [33m│ protocol │  │ username │ password │          host          │          │                │       │[39m
    [33m├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │[39m
    [33m│   origin    │                     │         origin         │ pathname │     search     │ hash  │[39m
    [33m├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤[39m
    [33m│                                              href                                              │[39m
    [33m└────────────────────────────────────────────────────────────────────────────────────────────────┘[39m
    [33m(All spaces in the "" line should be ignored. They are purely for formatting.)[39m

[0mParsing the URL string using the WHATWG API:[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m
      [31mnew[39m [37mURL[39m[90m([39m[92m'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'[39m[90m)[39m[90m;[39m

[0mParsing the URL string using the Legacy API:[0m

    [94mconst[39m [37murl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/url'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmyURL[39m [93m=[39m
      [37murl[39m[32m.[39m[37mparse[39m[90m([39m[92m'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'[39m[90m)[39m[90m;[39m

[32m[1m## The WHATWG URL API[22m[39m

[32m[1m### Class: [33mURL[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v7.0.0[39m
[90m  - v6.13.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18281[39m
[90m    description: The class is now available on the global object.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mBrowser-compatible [33mURL[39m class, implemented by following the WHATWG URL[0m
[0mStandard. [34mExamples of parsed URLs ([34m[4mhttps://url.spec.whatwg.org/#example-url-parsing[24m[39m[34m)[39m may be found in the Standard itself.[0m
[0mThe [33mURL[39m class is also available on the global object.[0m

[0mIn accordance with browser conventions, all properties of [33mURL[39m objects[0m
[0mare implemented as getters and setters on the class prototype, rather than as[0m
[0mdata properties on the object itself. Thus, unlike [34mlegacy [33murlObject[39m[34m ([34m[4m#url_legacy_urlobject[24m[39m[34m)[39ms,[0m
[0musing the [33mdelete[39m keyword on any properties of [33mURL[39m objects (e.g. [33mdelete[39m[0m
[0m[33mmyURL.protocol[39m, [33mdelete myURL.pathname[39m, etc) has no effect but will still[0m
[0mreturn [33mtrue[39m.[0m

[32m[1m#### Constructor: [33mnew URL(input[, base])[39m[32m[22m[39m

    * [0m[33minput[39m {string} The absolute or relative input URL to parse. If [33minput[39m[0m
      [0mis relative, then [33mbase[39m is required. If [33minput[39m is absolute, the [33mbase[39m[0m
      [0mis ignored.[0m
    * [0m[33mbase[39m {string|URL} The base URL to resolve against if the [33minput[39m is not[0m
      [0mabsolute.[0m

[0mCreates a new [33mURL[39m object by parsing the [33minput[39m relative to the [33mbase[39m. If[0m
[0m[33mbase[39m is passed as a string, it will be parsed equivalent to [33mnew URL(base)[39m.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'/foo'[39m[32m,[39m [92m'https://example.org/'[39m[90m)[39m[90m;[39m
    [90m// https://example.org/foo[39m

[0mA [33mTypeError[39m will be thrown if the [33minput[39m or [33mbase[39m are not valid URLs. Note[0m
[0mthat an effort will be made to coerce the given values into strings. For[0m
[0minstance:[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[33m{[39m [37mtoString[39m[93m:[39m [90m([39m[90m)[39m [93m=>[39m [92m'https://example.org/'[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// https://example.org/[39m

[0mUnicode characters appearing within the host name of [33minput[39m will be[0m
[0mautomatically converted to ASCII using the [34mPunycode ([34m[4mhttps://tools.ietf.org/html/rfc5891#section-4.4[24m[39m[34m)[39m algorithm.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://測試'[39m[90m)[39m[90m;[39m
    [90m// https://xn--g6w251d/[39m

[0mThis feature is only available if the [33mnode[39m executable was compiled with[0m
[0m[34mICU ([34m[4mintl.html#intl_options_for_building_node_js[24m[39m[34m)[39m enabled. If not, the domain names are passed through unchanged.[0m

[0mIn cases where it is not known in advance if [33minput[39m is an absolute URL[0m
[0mand a [33mbase[39m is provided, it is advised to validate that the [33morigin[39m of[0m
[0mthe [33mURL[39m object is what is expected.[0m

    [94mlet[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'http://Example.com/'[39m[32m,[39m [92m'https://example.org/'[39m[90m)[39m[90m;[39m
    [90m// http://example.com/[39m
    
    [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://Example.com/'[39m[32m,[39m [92m'https://example.org/'[39m[90m)[39m[90m;[39m
    [90m// https://example.com/[39m
    
    [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'foo://Example.com/'[39m[32m,[39m [92m'https://example.org/'[39m[90m)[39m[90m;[39m
    [90m// foo://Example.com/[39m
    
    [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'http:Example.com/'[39m[32m,[39m [92m'https://example.org/'[39m[90m)[39m[90m;[39m
    [90m// http://example.com/[39m
    
    [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https:Example.com/'[39m[32m,[39m [92m'https://example.org/'[39m[90m)[39m[90m;[39m
    [90m// https://example.org/Example.com/[39m
    
    [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'foo:Example.com/'[39m[32m,[39m [92m'https://example.org/'[39m[90m)[39m[90m;[39m
    [90m// foo:Example.com/[39m

[32m[1m#### [33murl.hash[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the fragment portion of the URL.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org/foo#bar'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhash[39m[90m)[39m[90m;[39m
    [90m// Prints #bar[39m
    
    [37mmyURL[39m[32m.[39m[37mhash[39m [93m=[39m [92m'baz'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/foo#baz[39m

[0mInvalid URL characters included in the value assigned to the [33mhash[39m property[0m
[0mare [34mpercent-encoded ([34m[4m#whatwg-percent-encoding[24m[39m[34m)[39m. The selection of which characters to[0m
[0mpercent-encode may vary somewhat from what the [34m[33murl.parse()[39m[34m ([34m[4m#url_url_parse_urlstring_parsequerystring_slashesdenotehost[24m[39m[34m)[39m and[0m
[0m[34m[33murl.format()[39m[34m ([34m[4m#url_url_format_urlobject[24m[39m[34m)[39m methods would produce.[0m

[32m[1m#### [33murl.host[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the host portion of the URL.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org:81/foo'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhost[39m[90m)[39m[90m;[39m
    [90m// Prints example.org:81[39m
    
    [37mmyURL[39m[32m.[39m[37mhost[39m [93m=[39m [92m'example.com:82'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.com:82/foo[39m

[0mInvalid host values assigned to the [33mhost[39m property are ignored.[0m

[32m[1m#### [33murl.hostname[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the host name portion of the URL. The key difference between[0m
[0m[33murl.host[39m and [33murl.hostname[39m is that [33murl.hostname[39m does [3mnot[23m include the[0m
[0mport.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org:81/foo'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhostname[39m[90m)[39m[90m;[39m
    [90m// Prints example.org[39m
    
    [37mmyURL[39m[32m.[39m[37mhostname[39m [93m=[39m [92m'example.com:82'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.com:81/foo[39m

[0mInvalid host name values assigned to the [33mhostname[39m property are ignored.[0m

[32m[1m#### [33murl.href[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the serialized URL.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org/foo'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/foo[39m
    
    [37mmyURL[39m[32m.[39m[37mhref[39m [93m=[39m [92m'https://example.com/bar'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.com/bar[39m

[0mGetting the value of the [33mhref[39m property is equivalent to calling[0m
[0m[34m[33murl.toString()[39m[34m ([34m[4m#url_url_tostring[24m[39m[34m)[39m.[0m

[0mSetting the value of this property to a new value is equivalent to creating a[0m
[0mnew [33mURL[39m object using [34m[33mnew URL(value)[39m[34m ([34m[4m#url_constructor_new_url_input_base[24m[39m[34m)[39m. Each of the [33mURL[39m[0m
[0mobject's properties will be modified.[0m

[0mIf the value assigned to the [33mhref[39m property is not a valid URL, a [33mTypeError[39m[0m
[0mwill be thrown.[0m

[32m[1m#### [33murl.origin[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets the read-only serialization of the URL's origin.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org/foo/bar?baz'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37morigin[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org[39m

    [94mconst[39m [37midnURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://測試'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37midnURL[39m[32m.[39m[37morigin[39m[90m)[39m[90m;[39m
    [90m// Prints https://xn--g6w251d[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37midnURL[39m[32m.[39m[37mhostname[39m[90m)[39m[90m;[39m
    [90m// Prints xn--g6w251d[39m

[32m[1m#### [33murl.password[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the password portion of the URL.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://abc:xyz@example.com'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mpassword[39m[90m)[39m[90m;[39m
    [90m// Prints xyz[39m
    
    [37mmyURL[39m[32m.[39m[37mpassword[39m [93m=[39m [92m'123'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://abc:123@example.com[39m

[0mInvalid URL characters included in the value assigned to the [33mpassword[39m property[0m
[0mare [34mpercent-encoded ([34m[4m#whatwg-percent-encoding[24m[39m[34m)[39m. The selection of which characters to[0m
[0mpercent-encode may vary somewhat from what the [34m[33murl.parse()[39m[34m ([34m[4m#url_url_parse_urlstring_parsequerystring_slashesdenotehost[24m[39m[34m)[39m and[0m
[0m[34m[33murl.format()[39m[34m ([34m[4m#url_url_format_urlobject[24m[39m[34m)[39m methods would produce.[0m

[32m[1m#### [33murl.pathname[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the path portion of the URL.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org/abc/xyz?123'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mpathname[39m[90m)[39m[90m;[39m
    [90m// Prints /abc/xyz[39m
    
    [37mmyURL[39m[32m.[39m[37mpathname[39m [93m=[39m [92m'/abcdef'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/abcdef?123[39m

[0mInvalid URL characters included in the value assigned to the [33mpathname[39m[0m
[0mproperty are [34mpercent-encoded ([34m[4m#whatwg-percent-encoding[24m[39m[34m)[39m. The selection of which characters[0m
[0mto percent-encode may vary somewhat from what the [34m[33murl.parse()[39m[34m ([34m[4m#url_url_parse_urlstring_parsequerystring_slashesdenotehost[24m[39m[34m)[39m and[0m
[0m[34m[33murl.format()[39m[34m ([34m[4m#url_url_format_urlobject[24m[39m[34m)[39m methods would produce.[0m

[32m[1m#### [33murl.port[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the port portion of the URL.[0m

[0mThe port value may be a number or a string containing a number in the range[0m
[0m[33m0[39m to [33m65535[39m (inclusive). Setting the value to the default port of the[0m
[0m[33mURL[39m objects given [33mprotocol[39m will result in the [33mport[39m value becoming[0m
[0mthe empty string ([33m''[39m).[0m

[0mThe port value can be an empty string in which case the port depends on[0m
[0mthe protocol/scheme:[0m

[0m┌──────────┬──────┐[0m
[0m│ protocol │ port │[0m
[0m├──────────┼──────┤[0m
[0m│ "ftp"    │ 21   │[0m
[0m├──────────┼──────┤[0m
[0m│ "file"   │      │[0m
[0m├──────────┼──────┤[0m
[0m│ "gopher" │ 70   │[0m
[0m├──────────┼──────┤[0m
[0m│ "http"   │ 80   │[0m
[0m├──────────┼──────┤[0m
[0m│ "https"  │ 443  │[0m
[0m├──────────┼──────┤[0m
[0m│ "ws"     │ 80   │[0m
[0m├──────────┼──────┤[0m
[0m│ "wss"    │ 443  │[0m
[0m└──────────┴──────┘[0m

[0mUpon assigning a value to the port, the value will first be converted to a[0m
[0mstring using [33m.toString()[39m.[0m

[0mIf that string is invalid but it begins with a number, the leading number is[0m
[0massigned to [33mport[39m.[0m
[0mIf the number lies outside the range denoted above, it is ignored.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org:8888'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mport[39m[90m)[39m[90m;[39m
    [90m// Prints 8888[39m
    
    [90m// Default ports are automatically transformed to the empty string[39m
    [90m// (HTTPS protocol's default port is 443)[39m
    [37mmyURL[39m[32m.[39m[37mport[39m [93m=[39m [92m'443'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mport[39m[90m)[39m[90m;[39m
    [90m// Prints the empty string[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/[39m
    
    [37mmyURL[39m[32m.[39m[37mport[39m [93m=[39m [34m1234[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mport[39m[90m)[39m[90m;[39m
    [90m// Prints 1234[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org:1234/[39m
    
    [90m// Completely invalid port strings are ignored[39m
    [37mmyURL[39m[32m.[39m[37mport[39m [93m=[39m [92m'abcd'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mport[39m[90m)[39m[90m;[39m
    [90m// Prints 1234[39m
    
    [90m// Leading numbers are treated as a port number[39m
    [37mmyURL[39m[32m.[39m[37mport[39m [93m=[39m [92m'5678abcd'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mport[39m[90m)[39m[90m;[39m
    [90m// Prints 5678[39m
    
    [90m// Non-integers are truncated[39m
    [37mmyURL[39m[32m.[39m[37mport[39m [93m=[39m [34m1234.5678[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mport[39m[90m)[39m[90m;[39m
    [90m// Prints 1234[39m
    
    [90m// Out-of-range numbers which are not represented in scientific notation[39m
    [90m// will be ignored.[39m
    [37mmyURL[39m[32m.[39m[37mport[39m [93m=[39m [34m1e10[39m[90m;[39m [90m// 10000000000, will be range-checked as described below[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mport[39m[90m)[39m[90m;[39m
    [90m// Prints 1234[39m

[0mNumbers which contain a decimal point,[0m
[0msuch as floating-point numbers or numbers in scientific notation,[0m
[0mare not an exception to this rule.[0m
[0mLeading numbers up to the decimal point will be set as the URL's port,[0m
[0massuming they are valid:[0m

    [37mmyURL[39m[32m.[39m[37mport[39m [93m=[39m [34m4.567e21[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mport[39m[90m)[39m[90m;[39m
    [90m// Prints 4 (because it is the leading number in the string '4.567e21')[39m

[32m[1m#### [33murl.protocol[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the protocol portion of the URL.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mprotocol[39m[90m)[39m[90m;[39m
    [90m// Prints https:[39m
    
    [37mmyURL[39m[32m.[39m[37mprotocol[39m [93m=[39m [92m'ftp'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints ftp://example.org/[39m

[0mInvalid URL protocol values assigned to the [33mprotocol[39m property are ignored.[0m

[32m[1m##### Special Schemes[22m[39m

[0mThe [34mWHATWG URL Standard ([34m[4mhttps://url.spec.whatwg.org/[24m[39m[34m)[39m considers a handful of URL protocol schemes to be[0m
[0m[3mspecial[23m in terms of how they are parsed and serialized. When a URL is[0m
[0mparsed using one of these special protocols, the [33murl.protocol[39m property[0m
[0mmay be changed to another special protocol but cannot be changed to a[0m
[0mnon-special protocol, and vice versa.[0m

[0mFor instance, changing from [33mhttp[39m to [33mhttps[39m works:[0m

    [94mconst[39m [37mu[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'http://example.org'[39m[90m)[39m[90m;[39m
    [37mu[39m[32m.[39m[37mprotocol[39m [93m=[39m [92m'https'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mu[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// https://example.org[39m

[0mHowever, changing from [33mhttp[39m to a hypothetical [33mfish[39m protocol does not[0m
[0mbecause the new protocol is not special.[0m

    [94mconst[39m [37mu[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'http://example.org'[39m[90m)[39m[90m;[39m
    [37mu[39m[32m.[39m[37mprotocol[39m [93m=[39m [92m'fish'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mu[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// http://example.org[39m

[0mLikewise, changing from a non-special protocol to a special protocol is also[0m
[0mnot permitted:[0m

    [94mconst[39m [37mu[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'fish://example.org'[39m[90m)[39m[90m;[39m
    [37mu[39m[32m.[39m[37mprotocol[39m [93m=[39m [92m'http'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mu[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// fish://example.org[39m

[0mAccording to the WHATWG URL Standard, special protocol schemes are [33mftp[39m,[0m
[0m[33mfile[39m, [33mgopher[39m, [33mhttp[39m, [33mhttps[39m, [33mws[39m, and [33mwss[39m.[0m

[32m[1m#### [33murl.search[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the serialized query portion of the URL.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org/abc?123'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37msearch[39m[90m)[39m[90m;[39m
    [90m// Prints ?123[39m
    
    [37mmyURL[39m[32m.[39m[37msearch[39m [93m=[39m [92m'abc=xyz'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/abc?abc=xyz[39m

[0mAny invalid URL characters appearing in the value assigned the [33msearch[39m[0m
[0mproperty will be [34mpercent-encoded ([34m[4m#whatwg-percent-encoding[24m[39m[34m)[39m. The selection of which[0m
[0mcharacters to percent-encode may vary somewhat from what the [34m[33murl.parse()[39m[34m ([34m[4m#url_url_parse_urlstring_parsequerystring_slashesdenotehost[24m[39m[34m)[39m[0m
[0mand [34m[33murl.format()[39m[34m ([34m[4m#url_url_format_urlobject[24m[39m[34m)[39m methods would produce.[0m

[32m[1m#### [33murl.searchParams[39m[32m[22m[39m

    * [0m{URLSearchParams}[0m

[0mGets the [34m[33mURLSearchParams[39m[34m ([34m[4m#url_class_urlsearchparams[24m[39m[34m)[39m object representing the query parameters of the[0m
[0mURL. This property is read-only; to replace the entirety of query parameters of[0m
[0mthe URL, use the [34m[33murl.search[39m[34m ([34m[4m#url_url_search[24m[39m[34m)[39m setter. See [34m[33mURLSearchParams[39m[34m ([34m[4m#url_class_urlsearchparams[24m[39m[34m)[39m[0m
[0mdocumentation for details.[0m

[32m[1m#### [33murl.username[39m[32m[22m[39m

    * [0m{string}[0m

[0mGets and sets the username portion of the URL.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://abc:xyz@example.com'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37musername[39m[90m)[39m[90m;[39m
    [90m// Prints abc[39m
    
    [37mmyURL[39m[32m.[39m[37musername[39m [93m=[39m [92m'123'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://123:xyz@example.com/[39m

[0mAny invalid URL characters appearing in the value assigned the [33musername[39m[0m
[0mproperty will be [34mpercent-encoded ([34m[4m#whatwg-percent-encoding[24m[39m[34m)[39m. The selection of which[0m
[0mcharacters to percent-encode may vary somewhat from what the [34m[33murl.parse()[39m[34m ([34m[4m#url_url_parse_urlstring_parsequerystring_slashesdenotehost[24m[39m[34m)[39m[0m
[0mand [34m[33murl.format()[39m[34m ([34m[4m#url_url_format_urlobject[24m[39m[34m)[39m methods would produce.[0m

[32m[1m#### [33murl.toString()[39m[32m[22m[39m

    * [0mReturns: {string}[0m

[0mThe [33mtoString()[39m method on the [33mURL[39m object returns the serialized URL. The[0m
[0mvalue returned is equivalent to that of [34m[33murl.href[39m[34m ([34m[4m#url_url_href[24m[39m[34m)[39m and [34m[33murl.toJSON()[39m[34m ([34m[4m#url_url_tojson[24m[39m[34m)[39m.[0m

[0mBecause of the need for standard compliance, this method does not allow users[0m
[0mto customize the serialization process of the URL. For more flexibility,[0m
[0m[34m[33mrequire('url').format()[39m[34m ([34m[4m#url_url_format_url_options[24m[39m[34m)[39m method might be of interest.[0m

[32m[1m#### [33murl.toJSON()[39m[32m[22m[39m

    * [0mReturns: {string}[0m

[0mThe [33mtoJSON()[39m method on the [33mURL[39m object returns the serialized URL. The[0m
[0mvalue returned is equivalent to that of [34m[33murl.href[39m[34m ([34m[4m#url_url_href[24m[39m[34m)[39m and[0m
[0m[34m[33murl.toString()[39m[34m ([34m[4m#url_url_tostring[24m[39m[34m)[39m.[0m

[0mThis method is automatically called when an [33mURL[39m object is serialized[0m
[0mwith [34m[33mJSON.stringify()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify[24m[39m[34m)[39m.[0m

    [94mconst[39m [37mmyURLs[39m [93m=[39m [33m[[39m
      [31mnew[39m [37mURL[39m[90m([39m[92m'https://www.example.com'[39m[90m)[39m[32m,[39m
      [31mnew[39m [37mURL[39m[90m([39m[92m'https://test.example.org'[39m[90m)[39m
    [33m][39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37mmyURLs[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints ["https://www.example.com/","https://test.example.org/"][39m

[32m[1m### Class: [33mURLSearchParams[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v7.5.0[39m
[90m  - v6.13.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18281[39m
[90m    description: The class is now available on the global object.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mURLSearchParams[39m API provides read and write access to the query of a[0m
[0m[33mURL[39m. The [33mURLSearchParams[39m class can also be used standalone with one of the[0m
[0mfour following constructors.[0m
[0mThe [33mURLSearchParams[39m class is also available on the global object.[0m

[0mThe WHATWG [33mURLSearchParams[39m interface and the [34m[33mquerystring[39m[34m ([34m[4mquerystring.html[24m[39m[34m)[39m module have[0m
[0msimilar purpose, but the purpose of the [34m[33mquerystring[39m[34m ([34m[4mquerystring.html[24m[39m[34m)[39m module is more[0m
[0mgeneral, as it allows the customization of delimiter characters ([33m&[39m and [33m=[39m).[0m
[0mOn the other hand, this API is designed purely for URL query strings.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org/?abc=123'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37msearchParams[39m[32m.[39m[37mget[39m[90m([39m[92m'abc'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 123[39m
    
    [37mmyURL[39m[32m.[39m[37msearchParams[39m[32m.[39m[37mappend[39m[90m([39m[92m'abc'[39m[32m,[39m [92m'xyz'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/?abc=123&abc=xyz[39m
    
    [37mmyURL[39m[32m.[39m[37msearchParams[39m[32m.[39m[31mdelete[39m[90m([39m[92m'abc'[39m[90m)[39m[90m;[39m
    [37mmyURL[39m[32m.[39m[37msearchParams[39m[32m.[39m[37mset[39m[90m([39m[92m'a'[39m[32m,[39m [92m'b'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/?a=b[39m
    
    [94mconst[39m [37mnewSearchParams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[37mmyURL[39m[32m.[39m[37msearchParams[39m[90m)[39m[90m;[39m
    [90m// The above is equivalent to[39m
    [90m// const newSearchParams = new URLSearchParams(myURL.search);[39m
    
    [37mnewSearchParams[39m[32m.[39m[37mappend[39m[90m([39m[92m'a'[39m[32m,[39m [92m'c'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/?a=b[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mnewSearchParams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints a=b&a=c[39m
    
    [90m// newSearchParams.toString() is implicitly called[39m
    [37mmyURL[39m[32m.[39m[37msearch[39m [93m=[39m [37mnewSearchParams[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/?a=b&a=c[39m
    [37mnewSearchParams[39m[32m.[39m[31mdelete[39m[90m([39m[92m'a'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://example.org/?a=b&a=c[39m

[32m[1m#### Constructor: [33mnew URLSearchParams()[39m[32m[22m[39m

[0mInstantiate a new empty [33mURLSearchParams[39m object.[0m

[32m[1m#### Constructor: [33mnew URLSearchParams(string)[39m[32m[22m[39m

    * [0m[33mstring[39m {string} A query string[0m

[0mParse the [33mstring[39m as a query string, and use it to instantiate a new[0m
[0m[33mURLSearchParams[39m object. A leading [33m'?'[39m, if present, is ignored.[0m

    [94mlet[39m [37mparams[39m[90m;[39m
    
    [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[92m'user=abc&query=xyz'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mget[39m[90m([39m[92m'user'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 'abc'[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 'user=abc&query=xyz'[39m
    
    [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[92m'?user=abc&query=xyz'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 'user=abc&query=xyz'[39m

[32m[1m#### Constructor: [33mnew URLSearchParams(obj)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v7.10.0[39m
[90m  - v6.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mobj[39m {Object} An object representing a collection of key-value pairs[0m

[0mInstantiate a new [33mURLSearchParams[39m object with a query hash map. The key and[0m
[0mvalue of each property of [33mobj[39m are always coerced to strings.[0m

[0mUnlike [34m[33mquerystring[39m[34m ([34m[4mquerystring.html[24m[39m[34m)[39m module, duplicate keys in the form of array values are[0m
[0mnot allowed. Arrays are stringified using [34m[33marray.toString()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString[24m[39m[34m)[39m, which simply[0m
[0mjoins all array elements with commas.[0m

    [94mconst[39m [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[33m{[39m
      [37muser[39m[93m:[39m [92m'abc'[39m[32m,[39m
      [37mquery[39m[93m:[39m [33m[[39m[92m'first'[39m[32m,[39m [92m'second'[39m[33m][39m
    [33m}[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mgetAll[39m[90m([39m[92m'query'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints [ 'first,second' ][39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 'user=abc&query=first%2Csecond'[39m

[32m[1m#### Constructor: [33mnew URLSearchParams(iterable)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v7.10.0[39m
[90m  - v6.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33miterable[39m {Iterable} An iterable object whose elements are key-value pairs[0m

[0mInstantiate a new [33mURLSearchParams[39m object with an iterable map in a way that[0m
[0mis similar to [34m[33mMap[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map[24m[39m[34m)[39m's constructor. [33miterable[39m can be an [33mArray[39m or any[0m
[0miterable object. That means [33miterable[39m can be another [33mURLSearchParams[39m, in[0m
[0mwhich case the constructor will simply create a clone of the provided[0m
[0m[33mURLSearchParams[39m. Elements of [33miterable[39m are key-value pairs, and can[0m
[0mthemselves be any iterable object.[0m

[0mDuplicate keys are allowed.[0m

    [94mlet[39m [37mparams[39m[90m;[39m
    
    [90m// Using an array[39m
    [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[33m[[39m
      [33m[[39m[92m'user'[39m[32m,[39m [92m'abc'[39m[33m][39m[32m,[39m
      [33m[[39m[92m'query'[39m[32m,[39m [92m'first'[39m[33m][39m[32m,[39m
      [33m[[39m[92m'query'[39m[32m,[39m [92m'second'[39m[33m][39m
    [33m][39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 'user=abc&query=first&query=second'[39m
    
    [90m// Using a Map object[39m
    [94mconst[39m [37mmap[39m [93m=[39m [31mnew[39m [37mMap[39m[90m([39m[90m)[39m[90m;[39m
    [37mmap[39m[32m.[39m[37mset[39m[90m([39m[92m'user'[39m[32m,[39m [92m'abc'[39m[90m)[39m[90m;[39m
    [37mmap[39m[32m.[39m[37mset[39m[90m([39m[92m'query'[39m[32m,[39m [92m'xyz'[39m[90m)[39m[90m;[39m
    [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[37mmap[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 'user=abc&query=xyz'[39m
    
    [90m// Using a generator function[39m
    [94mfunction[39m[93m*[39m [37mgetQueryPairs[39m[90m([39m[90m)[39m [33m{[39m
      [94myield[39m [33m[[39m[92m'user'[39m[32m,[39m [92m'abc'[39m[33m][39m[90m;[39m
      [94myield[39m [33m[[39m[92m'query'[39m[32m,[39m [92m'first'[39m[33m][39m[90m;[39m
      [94myield[39m [33m[[39m[92m'query'[39m[32m,[39m [92m'second'[39m[33m][39m[90m;[39m
    [33m}[39m
    [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[37mgetQueryPairs[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 'user=abc&query=first&query=second'[39m
    
    [90m// Each key-value pair must have exactly two elements[39m
    [31mnew[39m [37mURLSearchParams[39m[90m([39m[33m[[39m
      [33m[[39m[92m'user'[39m[32m,[39m [92m'abc'[39m[32m,[39m [92m'error'[39m[33m][39m
    [33m][39m[90m)[39m[90m;[39m
    [90m// Throws TypeError [ERR_INVALID_TUPLE]:[39m
    [90m//        Each query pair must be an iterable [name, value] tuple[39m

[32m[1m#### [33murlSearchParams.append(name, value)[39m[32m[22m[39m

    * [0m[33mname[39m {string}[0m
    * [0m[33mvalue[39m {string}[0m

[0mAppend a new name-value pair to the query string.[0m

[32m[1m#### [33murlSearchParams.delete(name)[39m[32m[22m[39m

    * [0m[33mname[39m {string}[0m

[0mRemove all name-value pairs whose name is [33mname[39m.[0m

[32m[1m#### [33murlSearchParams.entries()[39m[32m[22m[39m

    * [0mReturns: {Iterator}[0m

[0mReturns an ES6 [33mIterator[39m over each of the name-value pairs in the query.[0m
[0mEach item of the iterator is a JavaScript [33mArray[39m. The first item of the [33mArray[39m[0m
[0mis the [33mname[39m, the second item of the [33mArray[39m is the [33mvalue[39m.[0m

[0mAlias for [34m[33murlSearchParams[@@iterator]()[39m[34m ([34m[4m#url_urlsearchparams_symbol_iterator[24m[39m[34m)[39m.[0m

[32m[1m#### [33murlSearchParams.forEach(fn[, thisArg])[39m[32m[22m[39m

    * [0m[33mfn[39m {Function} Invoked for each name-value pair in the query[0m
    * [0m[33mthisArg[39m {Object} To be used as [33mthis[39m value for when [33mfn[39m is called[0m

[0mIterates over each name-value pair in the query and invokes the given function.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://example.org/?a=b&c=d'[39m[90m)[39m[90m;[39m
    [37mmyURL[39m[32m.[39m[37msearchParams[39m[32m.[39m[37mforEach[39m[90m([39m[90m([39m[37mvalue[39m[32m,[39m [37mname[39m[32m,[39m [37msearchParams[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mname[39m[32m,[39m [37mvalue[39m[32m,[39m [37mmyURL[39m[32m.[39m[37msearchParams[39m [93m===[39m [37msearchParams[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Prints:[39m
    [90m//   a b true[39m
    [90m//   c d true[39m

[32m[1m#### [33murlSearchParams.get(name)[39m[32m[22m[39m

    * [0m[33mname[39m {string}[0m
    * [0mReturns: {string} or [33mnull[39m if there is no name-value pair with the given[0m
      [0m[33mname[39m.[0m

[0mReturns the value of the first name-value pair whose name is [33mname[39m. If there[0m
[0mare no such pairs, [33mnull[39m is returned.[0m

[32m[1m#### [33murlSearchParams.getAll(name)[39m[32m[22m[39m

    * [0m[33mname[39m {string}[0m
    * [0mReturns: {string[]}[0m

[0mReturns the values of all name-value pairs whose name is [33mname[39m. If there are[0m
[0mno such pairs, an empty array is returned.[0m

[32m[1m#### [33murlSearchParams.has(name)[39m[32m[22m[39m

    * [0m[33mname[39m {string}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if there is at least one name-value pair whose name is [33mname[39m.[0m

[32m[1m#### [33murlSearchParams.keys()[39m[32m[22m[39m

    * [0mReturns: {Iterator}[0m

[0mReturns an ES6 [33mIterator[39m over the names of each name-value pair.[0m

    [94mconst[39m [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[92m'foo=bar&foo=baz'[39m[90m)[39m[90m;[39m
    [94mfor[39m [90m([39m[94mconst[39m [37mname[39m [37mof[39m [37mparams[39m[32m.[39m[37mkeys[39m[90m([39m[90m)[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mname[39m[90m)[39m[90m;[39m
    [33m}[39m
    [90m// Prints:[39m
    [90m//   foo[39m
    [90m//   foo[39m

[32m[1m#### [33murlSearchParams.set(name, value)[39m[32m[22m[39m

    * [0m[33mname[39m {string}[0m
    * [0m[33mvalue[39m {string}[0m

[0mSets the value in the [33mURLSearchParams[39m object associated with [33mname[39m to[0m
[0m[33mvalue[39m. If there are any pre-existing name-value pairs whose names are [33mname[39m,[0m
[0mset the first such pair's value to [33mvalue[39m and remove all others. If not,[0m
[0mappend the name-value pair to the query string.[0m

    [94mconst[39m [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[90m)[39m[90m;[39m
    [37mparams[39m[32m.[39m[37mappend[39m[90m([39m[92m'foo'[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
    [37mparams[39m[32m.[39m[37mappend[39m[90m([39m[92m'foo'[39m[32m,[39m [92m'baz'[39m[90m)[39m[90m;[39m
    [37mparams[39m[32m.[39m[37mappend[39m[90m([39m[92m'abc'[39m[32m,[39m [92m'def'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints foo=bar&foo=baz&abc=def[39m
    
    [37mparams[39m[32m.[39m[37mset[39m[90m([39m[92m'foo'[39m[32m,[39m [92m'def'[39m[90m)[39m[90m;[39m
    [37mparams[39m[32m.[39m[37mset[39m[90m([39m[92m'xyz'[39m[32m,[39m [92m'opq'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints foo=def&abc=def&xyz=opq[39m

[32m[1m#### [33murlSearchParams.sort()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v7.7.0[39m
[90m  - v6.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mSort all existing name-value pairs in-place by their names. Sorting is done[0m
[0mwith a [34mstable sorting algorithm ([34m[4mhttps://en.wikipedia.org/wiki/Sorting_algorithm#Stability[24m[39m[34m)[39m, so relative order between name-value pairs[0m
[0mwith the same name is preserved.[0m

[0mThis method can be used, in particular, to increase cache hits.[0m

    [94mconst[39m [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[92m'query[]=abc&type=search&query[]=123'[39m[90m)[39m[90m;[39m
    [37mparams[39m[32m.[39m[37msort[39m[90m([39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mparams[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints query%5B%5D=abc&query%5B%5D=123&type=search[39m

[32m[1m#### [33murlSearchParams.toString()[39m[32m[22m[39m

    * [0mReturns: {string}[0m

[0mReturns the search parameters serialized as a string, with characters[0m
[0mpercent-encoded where necessary.[0m

[32m[1m#### [33murlSearchParams.values()[39m[32m[22m[39m

    * [0mReturns: {Iterator}[0m

[0mReturns an ES6 [33mIterator[39m over the values of each name-value pair.[0m

[32m[1m#### [33murlSearchParams[Symbol.iterator]()[39m[32m[22m[39m

    * [0mReturns: {Iterator}[0m

[0mReturns an ES6 [33mIterator[39m over each of the name-value pairs in the query string.[0m
[0mEach item of the iterator is a JavaScript [33mArray[39m. The first item of the [33mArray[39m[0m
[0mis the [33mname[39m, the second item of the [33mArray[39m is the [33mvalue[39m.[0m

[0mAlias for [34m[33murlSearchParams.entries()[39m[34m ([34m[4m#url_urlsearchparams_entries[24m[39m[34m)[39m.[0m

    [94mconst[39m [37mparams[39m [93m=[39m [31mnew[39m [37mURLSearchParams[39m[90m([39m[92m'foo=bar&xyz=baz'[39m[90m)[39m[90m;[39m
    [94mfor[39m [90m([39m[94mconst[39m [33m[[39m[37mname[39m[32m,[39m [37mvalue[39m[33m][39m [37mof[39m [37mparams[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mname[39m[32m,[39m [37mvalue[39m[90m)[39m[90m;[39m
    [33m}[39m
    [90m// Prints:[39m
    [90m//   foo bar[39m
    [90m//   xyz baz[39m

[32m[1m### [33murl.domainToASCII(domain)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v7.4.0[39m
[90m  - v6.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdomain[39m {string}[0m
    * [0mReturns: {string}[0m

[0mReturns the [34mPunycode ([34m[4mhttps://tools.ietf.org/html/rfc5891#section-4.4[24m[39m[34m)[39m ASCII serialization of the [33mdomain[39m. If [33mdomain[39m is an[0m
[0minvalid domain, the empty string is returned.[0m

[0mIt performs the inverse operation to [34m[33murl.domainToUnicode()[39m[34m ([34m[4m#url_url_domaintounicode_domain[24m[39m[34m)[39m.[0m

    [94mconst[39m [37murl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/url'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37murl[39m[32m.[39m[37mdomainToASCII[39m[90m([39m[92m'español.com'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints xn--espaol-zwa.com[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37murl[39m[32m.[39m[37mdomainToASCII[39m[90m([39m[92m'中文.com'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints xn--fiq228c.com[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37murl[39m[32m.[39m[37mdomainToASCII[39m[90m([39m[92m'xn--iñvalid.com'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints an empty string[39m

[32m[1m### [33murl.domainToUnicode(domain)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v7.4.0[39m
[90m  - v6.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdomain[39m {string}[0m
    * [0mReturns: {string}[0m

[0mReturns the Unicode serialization of the [33mdomain[39m. If [33mdomain[39m is an invalid[0m
[0mdomain, the empty string is returned.[0m

[0mIt performs the inverse operation to [34m[33murl.domainToASCII()[39m[34m ([34m[4m#url_url_domaintoascii_domain[24m[39m[34m)[39m.[0m

    [94mconst[39m [37murl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/url'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37murl[39m[32m.[39m[37mdomainToUnicode[39m[90m([39m[92m'xn--espaol-zwa.com'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints español.com[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37murl[39m[32m.[39m[37mdomainToUnicode[39m[90m([39m[92m'xn--fiq228c.com'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 中文.com[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37murl[39m[32m.[39m[37mdomainToUnicode[39m[90m([39m[92m'xn--iñvalid.com'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints an empty string[39m

[32m[1m### [33murl.fileURLToPath(url)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33murl[39m {URL | string} The file URL string or URL object to convert to a path.[0m
    * [0mReturns: {string} The fully-resolved platform-specific Node.js file path.[0m

[0mThis function ensures the correct decodings of percent-encoded characters as[0m
[0mwell as ensuring a cross-platform valid absolute path string.[0m

    [31mnew[39m [37mURL[39m[90m([39m[92m'file:///C:/path/'[39m[90m)[39m[32m.[39m[37mpathname[39m[90m;[39m    [90m// Incorrect: /C:/path/[39m
    [37mfileURLToPath[39m[90m([39m[92m'file:///C:/path/'[39m[90m)[39m[90m;[39m       [90m// Correct:   C:\path\ (Windows)[39m
    
    [31mnew[39m [37mURL[39m[90m([39m[92m'file://nas/foo.txt'[39m[90m)[39m[32m.[39m[37mpathname[39m[90m;[39m  [90m// Incorrect: /foo.txt[39m
    [37mfileURLToPath[39m[90m([39m[92m'file://nas/foo.txt'[39m[90m)[39m[90m;[39m     [90m// Correct:   \\nas\foo.txt (Windows)[39m
    
    [31mnew[39m [37mURL[39m[90m([39m[92m'file:///你好.txt'[39m[90m)[39m[32m.[39m[37mpathname[39m[90m;[39m    [90m// Incorrect: /%E4%BD%A0%E5%A5%BD.txt[39m
    [37mfileURLToPath[39m[90m([39m[92m'file:///你好.txt'[39m[90m)[39m[90m;[39m       [90m// Correct:   /你好.txt (POSIX)[39m
    
    [31mnew[39m [37mURL[39m[90m([39m[92m'file:///hello world'[39m[90m)[39m[32m.[39m[37mpathname[39m[90m;[39m [90m// Incorrect: /hello%20world[39m
    [37mfileURLToPath[39m[90m([39m[92m'file:///hello world'[39m[90m)[39m[90m;[39m    [90m// Correct:   /hello world (POSIX)[39m

[32m[1m### [33murl.format(URL[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mURL[39m {URL} A [34mWHATWG URL ([34m[4m#url_the_whatwg_url_api[24m[39m[34m)[39m object[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mauth[39m {boolean} [33mtrue[39m if the serialized URL string should include the[0m[0m[0m
      [0m      [0m[0musername and password, [33mfalse[39m otherwise. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mfragment[39m {boolean} [33mtrue[39m if the serialized URL string should include the[0m[0m[0m
      [0m      [0m[0mfragment, [33mfalse[39m otherwise. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msearch[39m {boolean} [33mtrue[39m if the serialized URL string should include the[0m[0m[0m
      [0m      [0m[0msearch query, [33mfalse[39m otherwise. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33municode[39m {boolean} [33mtrue[39m if Unicode characters appearing in the host[0m[0m[0m
      [0m      [0m[0mcomponent of the URL string should be encoded directly as opposed to being[0m[0m[0m
      [0m      [0m[0mPunycode encoded. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {string}[0m

[0mReturns a customizable serialization of a URL [33mString[39m representation of a[0m
[0m[34mWHATWG URL ([34m[4m#url_the_whatwg_url_api[24m[39m[34m)[39m object.[0m

[0mThe URL object has both a [33mtoString()[39m method and [33mhref[39m property that return[0m
[0mstring serializations of the URL. These are not, however, customizable in[0m
[0many way. The [33murl.format(URL[, options])[39m method allows for basic customization[0m
[0mof the output.[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://a:b@測試?abc#foo'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://a:b@xn--g6w251d/?abc#foo[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints https://a:b@xn--g6w251d/?abc#foo[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37murl[39m[32m.[39m[37mformat[39m[90m([39m[37mmyURL[39m[32m,[39m [33m{[39m [37mfragment[39m[93m:[39m [91mfalse[39m[32m,[39m [37municode[39m[93m:[39m [91mtrue[39m[32m,[39m [37mauth[39m[93m:[39m [91mfalse[39m [33m}[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints 'https://測試/?abc'[39m

[32m[1m### [33murl.pathToFileURL(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string} The path to convert to a File URL.[0m
    * [0mReturns: {URL} The file URL object.[0m

[0mThis function ensures that [33mpath[39m is resolved absolutely, and that the URL[0m
[0mcontrol characters are correctly encoded when converting into a File URL.[0m

    [31mnew[39m [37mURL[39m[90m([39m[37m__filename[39m[90m)[39m[90m;[39m                [90m// Incorrect: throws (POSIX)[39m
    [31mnew[39m [37mURL[39m[90m([39m[37m__filename[39m[90m)[39m[90m;[39m                [90m// Incorrect: C:\... (Windows)[39m
    [37mpathToFileURL[39m[90m([39m[37m__filename[39m[90m)[39m[90m;[39m          [90m// Correct:   file:///... (POSIX)[39m
    [37mpathToFileURL[39m[90m([39m[37m__filename[39m[90m)[39m[90m;[39m          [90m// Correct:   file:///C:/... (Windows)[39m
    
    [31mnew[39m [37mURL[39m[90m([39m[92m'/foo#1'[39m[32m,[39m [92m'file:'[39m[90m)[39m[90m;[39m         [90m// Incorrect: file:///foo#1[39m
    [37mpathToFileURL[39m[90m([39m[92m'/foo#1'[39m[90m)[39m[90m;[39m            [90m// Correct:   file:///foo%231 (POSIX)[39m
    
    [31mnew[39m [37mURL[39m[90m([39m[92m'/some/path%.js'[39m[32m,[39m [92m'file:'[39m[90m)[39m[90m;[39m [90m// Incorrect: file:///some/path%[39m
    [37mpathToFileURL[39m[90m([39m[92m'/some/path%.js'[39m[90m)[39m[90m;[39m    [90m// Correct:   file:///some/path%25 (POSIX)[39m

[32m[1m## Legacy URL API[22m[39m

[90m[3m    [0mStability: 0 - Deprecated: Use the WHATWG URL API instead.[0m[23m[39m

[32m[1m### Legacy [33murlObject[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22715[39m
[90m    description: The Legacy URL API is deprecated. Use the WHATWG URL API.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe legacy [33murlObject[39m ([33mrequire('url').Url[39m) is created and returned by the[0m
[0m[33murl.parse()[39m function.[0m

[32m[1m#### [33murlObject.auth[39m[32m[22m[39m

[0mThe [33mauth[39m property is the username and password portion of the URL, also[0m
[0mreferred to as [3muserinfo[23m. This string subset follows the [33mprotocol[39m and[0m
[0mdouble slashes (if present) and precedes the [33mhost[39m component, delimited by [33m@[39m.[0m
[0mThe string is either the username, or it is the username and password separated[0m
[0mby [33m:[39m.[0m

[0mFor example: [33m'user:pass'[39m.[0m

[32m[1m#### [33murlObject.hash[39m[32m[22m[39m

[0mThe [33mhash[39m property is the fragment identifier portion of the URL including the[0m
[0mleading [33m#[39m character.[0m

[0mFor example: [33m'#hash'[39m.[0m

[32m[1m#### [33murlObject.host[39m[32m[22m[39m

[0mThe [33mhost[39m property is the full lower-cased host portion of the URL, including[0m
[0mthe [33mport[39m if specified.[0m

[0mFor example: [33m'sub.example.com:8080'[39m.[0m

[32m[1m#### [33murlObject.hostname[39m[32m[22m[39m

[0mThe [33mhostname[39m property is the lower-cased host name portion of the [33mhost[39m[0m
[0mcomponent [3mwithout[23m the [33mport[39m included.[0m

[0mFor example: [33m'sub.example.com'[39m.[0m

[32m[1m#### [33murlObject.href[39m[32m[22m[39m

[0mThe [33mhref[39m property is the full URL string that was parsed with both the[0m
[0m[33mprotocol[39m and [33mhost[39m components converted to lower-case.[0m

[0mFor example: [33m'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'[39m.[0m

[32m[1m#### [33murlObject.path[39m[32m[22m[39m

[0mThe [33mpath[39m property is a concatenation of the [33mpathname[39m and [33msearch[39m[0m
[0mcomponents.[0m

[0mFor example: [33m'/p/a/t/h?query=string'[39m.[0m

[0mNo decoding of the [33mpath[39m is performed.[0m

[32m[1m#### [33murlObject.pathname[39m[32m[22m[39m

[0mThe [33mpathname[39m property consists of the entire path section of the URL. This[0m
[0mis everything following the [33mhost[39m (including the [33mport[39m) and before the start[0m
[0mof the [33mquery[39m or [33mhash[39m components, delimited by either the ASCII question[0m
[0mmark ([33m?[39m) or hash ([33m#[39m) characters.[0m

[0mFor example: [33m'/p/a/t/h'[39m.[0m

[0mNo decoding of the path string is performed.[0m

[32m[1m#### [33murlObject.port[39m[32m[22m[39m

[0mThe [33mport[39m property is the numeric port portion of the [33mhost[39m component.[0m

[0mFor example: [33m'8080'[39m.[0m

[32m[1m#### [33murlObject.protocol[39m[32m[22m[39m

[0mThe [33mprotocol[39m property identifies the URL's lower-cased protocol scheme.[0m

[0mFor example: [33m'http:'[39m.[0m

[32m[1m#### [33murlObject.query[39m[32m[22m[39m

[0mThe [33mquery[39m property is either the query string without the leading ASCII[0m
[0mquestion mark ([33m?[39m), or an object returned by the [34m[33mquerystring[39m[34m ([34m[4mquerystring.html[24m[39m[34m)[39m module's[0m
[0m[33mparse()[39m method. Whether the [33mquery[39m property is a string or object is[0m
[0mdetermined by the [33mparseQueryString[39m argument passed to [33murl.parse()[39m.[0m

[0mFor example: [33m'query=string'[39m or [33m{'query': 'string'}[39m.[0m

[0mIf returned as a string, no decoding of the query string is performed. If[0m
[0mreturned as an object, both keys and values are decoded.[0m

[32m[1m#### [33murlObject.search[39m[32m[22m[39m

[0mThe [33msearch[39m property consists of the entire "query string" portion of the[0m
[0mURL, including the leading ASCII question mark ([33m?[39m) character.[0m

[0mFor example: [33m'?query=string'[39m.[0m

[0mNo decoding of the query string is performed.[0m

[32m[1m#### [33murlObject.slashes[39m[32m[22m[39m

[0mThe [33mslashes[39m property is a [33mboolean[39m with a value of [33mtrue[39m if two ASCII[0m
[0mforward-slash characters ([33m/[39m) are required following the colon in the[0m
[0m[33mprotocol[39m.[0m

[32m[1m### [33murl.format(urlObject)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.25[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22715[39m
[90m    description: The Legacy URL API is deprecated. Use the WHATWG URL API.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7234[39m
[90m    description: URLs with a `file:` scheme will now always use the correct[39m
[90m                 number of slashes regardless of `slashes` option. A false-y[39m
[90m                 `slashes` option with no protocol is now also respected at all[39m
[90m                 times.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33murlObject[39m {Object|string} A URL object (as returned by [33murl.parse()[39m or[0m
      [0mconstructed otherwise). If a string, it is converted to an object by passing[0m
      [0mit to [33murl.parse()[39m.[0m

[0mThe [33murl.format()[39m method returns a formatted URL string derived from[0m
[0m[33murlObject[39m.[0m

    [37murl[39m[32m.[39m[37mformat[39m[90m([39m[33m{[39m
      [37mprotocol[39m[93m:[39m [92m'https'[39m[32m,[39m
      [37mhostname[39m[93m:[39m [92m'example.com'[39m[32m,[39m
      [37mpathname[39m[93m:[39m [92m'/some/path'[39m[32m,[39m
      [37mquery[39m[93m:[39m [33m{[39m
        [37mpage[39m[93m:[39m [34m1[39m[32m,[39m
        [37mformat[39m[93m:[39m [92m'json'[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// => 'https://example.com/some/path?page=1&format=json'[39m

[0mIf [33murlObject[39m is not an object or a string, [33murl.format()[39m will throw a[0m
[0m[34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m.[0m

[0mThe formatting process operates as follows:[0m

    * [0mA new empty string [33mresult[39m is created.[0m
    * [0mIf [33murlObject.protocol[39m is a string, it is appended as-is to [33mresult[39m.[0m
    * [0mOtherwise, if [33murlObject.protocol[39m is not [33mundefined[39m and is not a string, an[0m
      [0m[34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m is thrown.[0m
    * [0mFor all string values of [33murlObject.protocol[39m that [3mdo not end[23m with an ASCII[0m
      [0mcolon ([33m:[39m) character, the literal string [33m:[39m will be appended to [33mresult[39m.[0m
    * [0mIf either of the following conditions is true, then the literal string [33m//[39m[0m
      [0mwill be appended to [33mresult[39m:
        * [0m[0m[33murlObject.slashes[39m property is true;[0m[0m[0m
      [0m
        * [0m[0m[33murlObject.protocol[39m begins with [33mhttp[39m, [33mhttps[39m, [33mftp[39m, [33mgopher[39m, or[0m[0m[0m
      [0m      [0m[0m[33mfile[39m;[0m[0m[0m
    * [0mIf the value of the [33murlObject.auth[39m property is truthy, and either[0m
      [0m[33murlObject.host[39m or [33murlObject.hostname[39m are not [33mundefined[39m, the value of[0m
      [0m[33murlObject.auth[39m will be coerced into a string and appended to [33mresult[39m[0m
      [0m followed by the literal string [33m@[39m.[0m
    * [0mIf the [33murlObject.host[39m property is [33mundefined[39m then:
        * [0m[0mIf the [33murlObject.hostname[39m is a string, it is appended to [33mresult[39m.[0m[0m[0m
      [0m
        * [0m[0mOtherwise, if [33murlObject.hostname[39m is not [33mundefined[39m and is not a string,[0m[0m[0m
      [0m      [0m[0man [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m is thrown.[0m[0m[0m
      [0m
        * [0m[0mIf the [33murlObject.port[39m property value is truthy, and [33murlObject.hostname[39m[0m[0m[0m
      [0m      [0m[0mis not [33mundefined[39m:[0m
      [0m
            * [0m[0m[0m[0mThe literal string [33m:[39m is appended to [33mresult[39m, and[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0mThe value of [33murlObject.port[39m is coerced to a string and appended to[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0m[33mresult[39m.[0m[0m[0m[0m[0m[0m[0m
    * [0mOtherwise, if the [33murlObject.host[39m property value is truthy, the value of[0m
      [0m[33murlObject.host[39m is coerced to a string and appended to [33mresult[39m.[0m
    * [0mIf the [33murlObject.pathname[39m property is a string that is not an empty string:
        * [0m[0mIf the [33murlObject.pathname[39m [3mdoes not start[23m with an ASCII forward slash[0m[0m[0m
      [0m      [0m[0m([33m/[39m), then the literal string [33m'/'[39m is appended to [33mresult[39m.[0m[0m[0m
      [0m
        * [0m[0mThe value of [33murlObject.pathname[39m is appended to [33mresult[39m.[0m[0m[0m
    * [0mOtherwise, if [33murlObject.pathname[39m is not [33mundefined[39m and is not a string, an[0m
      [0m[34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m is thrown.[0m
    * [0mIf the [33murlObject.search[39m property is [33mundefined[39m and if the [33murlObject.query[39m[0m
      [0mproperty is an [33mObject[39m, the literal string [33m?[39m is appended to [33mresult[39m[0m
      [0mfollowed by the output of calling the [34m[33mquerystring[39m[34m ([34m[4mquerystring.html[24m[39m[34m)[39m module's [33mstringify()[39m[0m
      [0mmethod passing the value of [33murlObject.query[39m.[0m
    * [0mOtherwise, if [33murlObject.search[39m is a string:
        * [0m[0mIf the value of [33murlObject.search[39m [3mdoes not start[23m with the ASCII question[0m[0m[0m
      [0m      [0m[0mmark ([33m?[39m) character, the literal string [33m?[39m is appended to [33mresult[39m.[0m[0m[0m
      [0m
        * [0m[0mThe value of [33murlObject.search[39m is appended to [33mresult[39m.[0m[0m[0m
    * [0mOtherwise, if [33murlObject.search[39m is not [33mundefined[39m and is not a string, an[0m
      [0m[34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m is thrown.[0m
    * [0mIf the [33murlObject.hash[39m property is a string:
        * [0m[0mIf the value of [33murlObject.hash[39m [3mdoes not start[23m with the ASCII hash ([33m#[39m)[0m[0m[0m
      [0m      [0m[0mcharacter, the literal string [33m#[39m is appended to [33mresult[39m.[0m[0m[0m
      [0m
        * [0m[0mThe value of [33murlObject.hash[39m is appended to [33mresult[39m.[0m[0m[0m
    * [0mOtherwise, if the [33murlObject.hash[39m property is not [33mundefined[39m and is not a[0m
      [0mstring, an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m is thrown.[0m
    * [0m[33mresult[39m is returned.[0m

[32m[1m### [33murl.parse(urlString[, parseQueryString[, slashesDenoteHost]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.25[39m
[90mchanges:[39m
[90m  - version: v11.14.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26941[39m
[90m    description: The `pathname` property on the returned URL object is now `/`[39m
[90m                 when there is no path and the protocol scheme is `ws:` or[39m
[90m                 `wss:`.[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22715[39m
[90m    description: The Legacy URL API is deprecated. Use the WHATWG URL API.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13606[39m
[90m    description: The `search` property on the returned URL object is now `null`[39m
[90m                 when no query string is present.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33murlString[39m {string} The URL string to parse.[0m
    * [0m[33mparseQueryString[39m {boolean} If [33mtrue[39m, the [33mquery[39m property will always[0m
      [0mbe set to an object returned by the [34m[33mquerystring[39m[34m ([34m[4mquerystring.html[24m[39m[34m)[39m module's [33mparse()[39m[0m
      [0mmethod. If [33mfalse[39m, the [33mquery[39m property on the returned URL object will be an[0m
      [0munparsed, undecoded string. [1mDefault:[22m [33mfalse[39m.[0m
    * [0m[33mslashesDenoteHost[39m {boolean} If [33mtrue[39m, the first token after the literal[0m
      [0mstring [33m//[39m and preceding the next [33m/[39m will be interpreted as the [33mhost[39m.[0m
      [0mFor instance, given [33m//foo/bar[39m, the result would be[0m
      [0m[33m{host: 'foo', pathname: '/bar'}[39m rather than [33m{pathname: '//foo/bar'}[39m.[0m
      [0m[1mDefault:[22m [33mfalse[39m.[0m

[0mThe [33murl.parse()[39m method takes a URL string, parses it, and returns a URL[0m
[0mobject.[0m

[0mA [33mTypeError[39m is thrown if [33murlString[39m is not a string.[0m

[0mA [33mURIError[39m is thrown if the [33mauth[39m property is present but cannot be decoded.[0m

[32m[1m### [33murl.resolve(from, to)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.25[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22715[39m
[90m    description: The Legacy URL API is deprecated. Use the WHATWG URL API.[39m
[90m  - version: v6.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8215[39m
[90m    description: The `auth` fields are now kept intact when `from` and `to`[39m
[90m                 refer to the same host.[39m
[90m  - version: v6.5.0, v4.6.2[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8214[39m
[90m    description: The `port` field is copied correctly now.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/1480[39m
[90m    description: The `auth` fields is cleared now the `to` parameter[39m
[90m                 contains a hostname.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfrom[39m {string} The Base URL being resolved against.[0m
    * [0m[33mto[39m {string} The HREF URL being resolved.[0m

[0mThe [33murl.resolve()[39m method resolves a target URL relative to a base URL in a[0m
[0mmanner similar to that of a Web browser resolving an anchor tag HREF.[0m

    [94mconst[39m [37murl[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/url'[39m[90m)[39m[90m;[39m
    [37murl[39m[32m.[39m[37mresolve[39m[90m([39m[92m'/one/two/three'[39m[32m,[39m [92m'four'[39m[90m)[39m[90m;[39m         [90m// '/one/two/four'[39m
    [37murl[39m[32m.[39m[37mresolve[39m[90m([39m[92m'http://example.com/'[39m[32m,[39m [92m'/one'[39m[90m)[39m[90m;[39m    [90m// 'http://example.com/one'[39m
    [37murl[39m[32m.[39m[37mresolve[39m[90m([39m[92m'http://example.com/one'[39m[32m,[39m [92m'/two'[39m[90m)[39m[90m;[39m [90m// 'http://example.com/two'[39m

[0m[90m<a id="whatwg-percent-encoding">[39m[90m</a>[39m[0m

[32m[1m## Percent-Encoding in URLs[22m[39m

[0mURLs are permitted to only contain a certain range of characters. Any character[0m
[0mfalling outside of that range must be encoded. How such characters are encoded,[0m
[0mand which characters to encode depends entirely on where the character is[0m
[0mlocated within the structure of the URL.[0m

[32m[1m### Legacy API[22m[39m

[0mWithin the Legacy API, spaces ([33m' '[39m) and the following characters will be[0m
[0mautomatically escaped in the properties of URL objects:[0m

    [33m< > " ` \r \n \t { } | \ ^ '[39m

[0mFor example, the ASCII space character ([33m' '[39m) is encoded as [33m%20[39m. The ASCII[0m
[0mforward slash ([33m/[39m) character is encoded as [33m%3C[39m.[0m

[32m[1m### WHATWG API[22m[39m

[0mThe [34mWHATWG URL Standard ([34m[4mhttps://url.spec.whatwg.org/[24m[39m[34m)[39m uses a more selective and fine grained approach to[0m
[0mselecting encoded characters than that used by the Legacy API.[0m

[0mThe WHATWG algorithm defines four "percent-encode sets" that describe ranges[0m
[0mof characters that must be percent-encoded:[0m

    * [0m[0m[0mThe [3mC0 control percent-encode set[23m includes code points in range U+0000 to[0m[0m[0m
      [0m[0m[0mU+001F (inclusive) and all code points greater than U+007E.[0m[0m[0m
    * [0m[0m[0mThe [3mfragment percent-encode set[23m includes the [3mC0 control percent-encode set[23m[0m[0m[0m
      [0m[0m[0mand code points U+0020, U+0022, U+003C, U+003E, and U+0060.[0m[0m[0m
    * [0m[0m[0mThe [3mpath percent-encode set[23m includes the [3mC0 control percent-encode set[23m[0m[0m[0m
      [0m[0m[0mand code points U+0020, U+0022, U+0023, U+003C, U+003E, U+003F, U+0060,[0m[0m[0m
      [0m[0m[0mU+007B, and U+007D.[0m[0m[0m
    * [0m[0m[0mThe [3muserinfo encode set[23m includes the [3mpath percent-encode set[23m and code[0m[0m[0m
      [0m[0m[0mpoints U+002F, U+003A, U+003B, U+003D, U+0040, U+005B, U+005C, U+005D,[0m[0m[0m
      [0m[0m[0mU+005E, and U+007C.[0m[0m[0m

[0mThe [3muserinfo percent-encode set[23m is used exclusively for username and[0m
[0mpasswords encoded within the URL. The [3mpath percent-encode set[23m is used for the[0m
[0mpath of most URLs. The [3mfragment percent-encode set[23m is used for URL fragments.[0m
[0mThe [3mC0 control percent-encode set[23m is used for host and path under certain[0m
[0mspecific conditions, in addition to all other cases.[0m

[0mWhen non-ASCII characters appear within a host name, the host name is encoded[0m
[0musing the [34mPunycode ([34m[4mhttps://tools.ietf.org/html/rfc5891#section-4.4[24m[39m[34m)[39m algorithm. Note, however, that a host name [3mmay[23m contain[0m
[0m[3mboth[23m Punycode encoded and percent-encoded characters:[0m

    [94mconst[39m [37mmyURL[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'https://%CF%80.example.com/foo'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37mhref[39m[90m)[39m[90m;[39m
    [90m// Prints https://xn--1xa.example.com/foo[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmyURL[39m[32m.[39m[37morigin[39m[90m)[39m[90m;[39m
    [90m// Prints https://xn--1xa.example.com[39m

