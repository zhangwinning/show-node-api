[35m[4m[1m# Buffer[22m[24m[39m

[90m<!--introduced_in=v0.1.90-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mIn Node.js, [33mBuffer[39m objects are used to represent binary data in the form[0m
[0mof a sequence of bytes. Many Node.js APIs, for example streams and file system[0m
[0moperations, support [33mBuffer[39ms, as interactions with the operating system or[0m
[0mother processes generally always happen in terms of binary data.[0m

[0mThe [33mBuffer[39m class is a subclass of the [[33mUint8Array[39m][] class that is built[0m
[0minto the JavaScript language. A number of additional methods are supported[0m
[0mthat cover additional use cases. Node.js APIs accept plain [[33mUint8Array[39m][]s[0m
[0mwherever [33mBuffer[39ms are supported as well.[0m

[0mInstances of the [33mBuffer[39m class, and [[33mUint8Array[39m][]s in general,[0m
[0mare similar to arrays of integers from [33m0[39m to [33m255[39m, but correspond to[0m
[0mfixed-sized blocks of memory and cannot contain any other values.[0m
[0mThe size of a [33mBuffer[39m is established when it is created and cannot be changed.[0m

[0mThe [33mBuffer[39m class is within the global scope, making it unlikely that one[0m
[0mwould need to ever use [33mrequire('buffer').Buffer[39m.[0m

    [90m// Creates a zero-filled Buffer of length 10.[39m
    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    
    [90m// Creates a Buffer of length 10,[39m
    [90m// filled with bytes which all have the value `1`.[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m10[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
    
    [90m// Creates an uninitialized buffer of length 10.[39m
    [90m// This is faster than calling Buffer.alloc() but the returned[39m
    [90m// Buffer instance might contain old data that needs to be[39m
    [90m// overwritten using fill(), write(), or other functions that fill the Buffer's[39m
    [90m// contents.[39m
    [94mconst[39m [37mbuf3[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    
    [90m// Creates a Buffer containing the bytes [1, 2, 3].[39m
    [94mconst[39m [37mbuf4[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[33m][39m[90m)[39m[90m;[39m
    
    [90m// Creates a Buffer containing the bytes [1, 1, 1, 1] – the entries[39m
    [90m// are all truncated using `(value & 255)` to fit into the range 0–255.[39m
    [94mconst[39m [37mbuf5[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m257[39m[32m,[39m [34m257.5[39m[32m,[39m [93m-[39m[34m255[39m[32m,[39m [92m'1'[39m[33m][39m[90m)[39m[90m;[39m
    
    [90m// Creates a Buffer containing the UTF-8-encoded bytes for the string 'tést':[39m
    [90m// [0x74, 0xc3, 0xa9, 0x73, 0x74] (in hexadecimal notation)[39m
    [90m// [116, 195, 169, 115, 116] (in decimal notation)[39m
    [94mconst[39m [37mbuf6[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'tést'[39m[90m)[39m[90m;[39m
    
    [90m// Creates a Buffer containing the Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].[39m
    [94mconst[39m [37mbuf7[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'tést'[39m[32m,[39m [92m'latin1'[39m[90m)[39m[90m;[39m

[32m[1m## Buffers and Character Encodings[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v6.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7111[39m
[90m    description: Introduced `latin1` as an alias for `binary`.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2859[39m
[90m    description: Removed the deprecated `raw` and `raws` encodings.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mWhen converting between [33mBuffer[39ms and strings, a character encoding may be[0m
[0mspecified. If no character encoding is specified, UTF-8 will be used as the[0m
[0mdefault.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'hello world'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mtoString[39m[90m([39m[92m'hex'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 68656c6c6f20776f726c64[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mtoString[39m[90m([39m[92m'base64'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: aGVsbG8gd29ybGQ=[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'fhqwhgads'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 66 68 71 77 68 67 61 64 73>[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'fhqwhgads'[39m[32m,[39m [92m'utf16le'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>[39m

[0mThe character encodings currently supported by Node.js are the following:[0m

    * [0m[0m[0m[33m'utf8'[39m: Multi-byte encoded Unicode characters. Many web pages and other[0m[0m[0m
      [0m[0m[0mdocument formats use [UTF-8][]. This is the default character encoding.[0m[0m[0m
      [0m[0m[0mWhen decoding a [33mBuffer[39m into a string that does not exclusively contain[0m[0m[0m
      [0m[0m[0mvalid UTF-8 data, the Unicode replacement character [33mU+FFFD[39m � will be used[0m[0m[0m
      [0m[0m[0mto represent those errors.[0m[0m[0m
    * [0m[0m[0m[33m'utf16le'[39m: Multi-byte encoded Unicode characters. Unlike [33m'utf8'[39m, each[0m[0m[0m
      [0m[0m[0mcharacter in the string will be encoded using either 2 or 4 bytes.[0m[0m[0m
      [0m[0m[0mNode.js only supports the [little-endian][endianness] variant of [UTF-16][].[0m[0m[0m
    * [0m[0m[0m[33m'latin1'[39m: Latin-1 stands for [ISO-8859-1][]. This character encoding only[0m[0m[0m
      [0m[0m[0msupports the Unicode characters from [33mU+0000[39m to [33mU+00FF[39m. Each character is[0m[0m[0m
      [0m[0m[0mencoded using a single byte. Characters that do not fit into that range are[0m[0m[0m
      [0m[0m[0mtruncated and will be mapped to characters in that range.[0m[0m[0m

[0mConverting a [33mBuffer[39m into a string using one of the above is referred to as[0m
[0mdecoding, and converting a string into a [33mBuffer[39m is referred to as encoding.[0m

[0mNode.js also supports the following two binary-to-text encodings. For[0m
[0mbinary-to-text encodings, the naming convention is reversed: Converting a[0m
[0m[33mBuffer[39m into a string is typically referred to as encoding, and converting a[0m
[0mstring into a [33mBuffer[39m as decoding.[0m

    * [0m[0m[0m[33m'base64'[39m: [Base64][] encoding. When creating a [33mBuffer[39m from a string,[0m[0m[0m
      [0m[0m[0mthis encoding will also correctly accept "URL and Filename Safe Alphabet" as[0m[0m[0m
      [0m[0m[0mspecified in [RFC 4648, Section 5][].[0m[0m[0m
    * [0m[0m[0m[33m'hex'[39m: Encode each byte as two hexadecimal characters. Data truncation[0m[0m[0m
      [0m[0m[0mmay occur when decoding string that do exclusively contain valid hexadecimal[0m[0m[0m
      [0m[0m[0mcharacters. See below for an example.[0m[0m[0m

[0mThe following legacy character encodings are also supported:[0m

    * [0m[0m[0m[33m'ascii'[39m: For 7-bit [ASCII][] data only. When encoding a string into a[0m[0m[0m
      [0m[0m[0m[33mBuffer[39m, this is equivalent to using [33m'latin1'[39m. When decoding a [33mBuffer[39m[0m[0m[0m
      [0m[0m[0minto a string, using encoding this will additionally unset the highest bit of[0m[0m[0m
      [0m[0m[0meach byte before decoding as [33m'latin1'[39m.[0m[0m[0m
      [0m[0m[0mGenerally, there should be no reason to use this encoding, as [33m'utf8'[39m[0m[0m[0m
      [0m[0m[0m(or, if the data is known to always be ASCII-only, [33m'latin1'[39m) will be a[0m[0m[0m
      [0m[0m[0mbetter choice when encoding or decoding ASCII-only text. It is only provided[0m[0m[0m
      [0m[0m[0mfor legacy compatibility.[0m[0m[0m
    * [0m[0m[0m[33m'binary'[39m: Alias for [33m'latin1'[39m. See [binary strings][] for more background[0m[0m[0m
      [0m[0m[0mon this topic. The name of this encoding can be very misleading, as all of the[0m[0m[0m
      [0m[0m[0mencodings listed here convert between strings and binary data. For converting[0m[0m[0m
      [0m[0m[0mbetween strings and [33mBuffer[39ms, typically [33m'utf-8'[39m is the right choice.[0m[0m[0m
    * [0m[0m[0m[33m'ucs2'[39m: Alias of [33m'utf16le'[39m. UCS-2 used to refer to a variant of UTF-16[0m[0m[0m
      [0m[0m[0mthat did not support characters that had code points larger than U+FFFF.[0m[0m[0m
      [0m[0m[0mIn Node.js, these code points are always supported.[0m[0m[0m

    [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'1ag'[39m[32m,[39m [92m'hex'[39m[90m)[39m[90m;[39m
    [90m// Prints <Buffer 1a>, data truncated when first non-hexadecimal value[39m
    [90m// ('g') encountered.[39m
    
    [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'1a7g'[39m[32m,[39m [92m'hex'[39m[90m)[39m[90m;[39m
    [90m// Prints <Buffer 1a>, data truncated when data ends in single digit ('7').[39m
    
    [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'1634'[39m[32m,[39m [92m'hex'[39m[90m)[39m[90m;[39m
    [90m// Prints <Buffer 16 34>, all data represented.[39m

[0mModern Web browsers follow the [WHATWG Encoding Standard][] which aliases[0m
[0mboth [33m'latin1'[39m and [33m'ISO-8859-1'[39m to [33m'win-1252'[39m. This means that while doing[0m
[0msomething like [33mhttp.get()[39m, if the returned charset is one of those listed in[0m
[0mthe WHATWG specification it is possible that the server actually returned[0m
[0m[33m'win-1252'[39m-encoded data, and using [33m'latin1'[39m encoding may incorrectly decode[0m
[0mthe characters.[0m

[32m[1m## Buffers and TypedArrays[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v3.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2002[39m
[90m    description: The `Buffer`s class now inherits from `Uint8Array`.[39m
[90m-->[39m
[90m[39m
[90m[39m[0m[33mBuffer[39m instances are also [[33mUint8Array[39m][] instances, which is the language’s[0m
[0mbuilt-in class for working with binary data. [[33mUint8Array[39m][] in turn is a[0m
[0msubclass of [[33mTypedArray[39m][]. Therefore, all [[33mTypedArray[39m][] methods are also[0m
[0mavailable on [33mBuffer[39ms. However, there are subtle incompatibilities between[0m
[0mthe [33mBuffer[39m API and the [[33mTypedArray[39m][] API.[0m

[0mIn particular:[0m

    * [0mWhile [[33mTypedArray#slice()[39m][] creates a copy of part of the [33mTypedArray[39m,[0m
      [0m[[33mBuffer#slice()[39m][[33mbuf.slice()[39m] creates a view over the existing [33mBuffer[39m[0m
      [0mwithout copying. This behavior can be surprising, and only exists for legacy[0m
      [0mcompatibility. [[33mTypedArray#subarray()[39m][] can be used to achieve the behavior[0m
      [0mof [[33mBuffer#slice()[39m][[33mbuf.slice()[39m] on both [33mBuffer[39ms and other[0m
      [0m[33mTypedArray[39ms.[0m
    * [0m[[33mbuf.toString()[39m][] is incompatible with its [33mTypedArray[39m equivalent.[0m
    * [0mA number of methods, e.g. [[33mbuf.indexOf()[39m][], support additional arguments.[0m

[0mThere are two ways to create new [[33mTypedArray[39m][] instances from a [33mBuffer[39m.[0m

[0mWhen passing a [33mBuffer[39m to a [[33mTypedArray[39m][] constructor, the [33mBuffer[39m’s[0m
[0melements will be copied, interpreted as an array of integers, and not as a byte[0m
[0marray of the target type. For example,[0m
[0m[33mnew Uint32Array(Buffer.from([1, 2, 3, 4]))[39m creates a 4-element[0m
[0m[[33mUint32Array[39m][] with elements [33m[1, 2, 3, 4][39m, rather than a[0m
[0m[[33mUint32Array[39m][] with a single element [33m[0x1020304][39m or [33m[0x4030201][39m.[0m

[0mIn order to create a [[33mTypedArray[39m][] that shares its memory with the [33mBuffer[39m,[0m
[0mthe underlying [[33mArrayBuffer[39m][] can be passed to the [[33mTypedArray[39m][][0m
[0mconstructor instead:[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'hello'[39m[32m,[39m [92m'utf16le'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37muint16arr[39m [93m=[39m [31mnew[39m [37mUint16Array[39m[90m([39m
      [37mbuf[39m[32m.[39m[37mbuffer[39m[32m,[39m [37mbuf[39m[32m.[39m[37mbyteOffset[39m[32m,[39m [37mbuf[39m[32m.[39m[37mlength[39m [93m/[39m [37mUint16Array[39m[32m.[39m[37mBYTES_PER_ELEMENT[39m[90m)[39m[90m;[39m

[0mIt is also possible to create a new [33mBuffer[39m that shares the same allocated[0m
[0mmemory as a [[33mTypedArray[39m][] instance by using the [33mTypedArray[39m object’s[0m
[0m[33m.buffer[39m property in the same way. [[33mBuffer.from()[39m][[33mBuffer.from(arrayBuf)[39m][0m
[0mbehaves like [33mnew Uint8Array()[39m in this context.[0m

    [94mconst[39m [37marr[39m [93m=[39m [31mnew[39m [37mUint16Array[39m[90m([39m[34m2[39m[90m)[39m[90m;[39m
    
    [37marr[39m[33m[[39m[34m0[39m[33m][39m [93m=[39m [34m5000[39m[90m;[39m
    [37marr[39m[33m[[39m[34m1[39m[33m][39m [93m=[39m [34m4000[39m[90m;[39m
    
    [90m// Copies the contents of `arr`.[39m
    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37marr[39m[90m)[39m[90m;[39m
    [90m// Shares memory with `arr`.[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37marr[39m[32m.[39m[37mbuffer[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 88 a0>[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 88 13 a0 0f>[39m
    
    [37marr[39m[33m[[39m[34m1[39m[33m][39m [93m=[39m [34m6000[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 88 a0>[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 88 13 70 17>[39m

[0mWhen creating a [33mBuffer[39m using a [[33mTypedArray[39m][]'s [33m.buffer[39m, it is[0m
[0mpossible to use only a portion of the underlying [[33mArrayBuffer[39m][] by passing in[0m
[0m[33mbyteOffset[39m and [33mlength[39m parameters.[0m

    [94mconst[39m [37marr[39m [93m=[39m [31mnew[39m [37mUint16Array[39m[90m([39m[34m20[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37marr[39m[32m.[39m[37mbuffer[39m[32m,[39m [34m0[39m[32m,[39m [34m16[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlength[39m[90m)[39m[90m;[39m
    [90m// Prints: 16[39m

[0mThe [33mBuffer.from()[39m and [[33mTypedArray.from()[39m][] have different signatures and[0m
[0mimplementations. Specifically, the [[33mTypedArray[39m][] variants accept a second[0m
[0margument that is a mapping function that is invoked on every element of the[0m
[0mtyped array:[0m

    * [0m[33mTypedArray.from(source[, mapFn[, thisArg]])[39m[0m

[0mThe [33mBuffer.from()[39m method, however, does not support the use of a mapping[0m
[0mfunction:[0m

    * [0m[[33mBuffer.from(array)[39m][][0m
    * [0m[[33mBuffer.from(buffer)[39m][][0m
    * [0m[[33mBuffer.from(arrayBuffer[, byteOffset[, length]])[39m][[33mBuffer.from(arrayBuf)[39m][0m
    * [0m[[33mBuffer.from(string[, encoding])[39m][[33mBuffer.from(string)[39m][0m

[32m[1m## Buffers and iteration[22m[39m

[0m[33mBuffer[39m instances can be iterated over using [33mfor..of[39m syntax:[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[33m][39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mconst[39m [37mb[39m [37mof[39m [37mbuf[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[90m)[39m[90m;[39m
    [33m}[39m
    [90m// Prints:[39m
    [90m//   1[39m
    [90m//   2[39m
    [90m//   3[39m

[0mAdditionally, the [[33mbuf.values()[39m][], [[33mbuf.keys()[39m][], and[0m
[0m[[33mbuf.entries()[39m][] methods can be used to create iterators.[0m

[32m[1m## Class: [33mBuffer[39m[32m[22m[39m

[0mThe [33mBuffer[39m class is a global type for dealing with binary data directly.[0m
[0mIt can be constructed in a variety of ways.[0m

[32m[1m### Class Method: [33mBuffer.alloc(size[, fill[, encoding]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18129[39m
[90m    description: Attempting to fill a non-zero length buffer with a zero length[39m
[90m                 buffer triggers a thrown exception.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17427[39m
[90m    description: Specifying an invalid string for `fill` triggers a thrown[39m
[90m                 exception.[39m
[90m  - version: v8.9.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17428[39m
[90m    description: Specifying an invalid string for `fill` now results in a[39m
[90m                 zero-filled buffer.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msize[39m {integer} The desired length of the new [33mBuffer[39m.[0m
    * [0m[33mfill[39m {string|Buffer|Uint8Array|integer} A value to pre-fill the new [33mBuffer[39m[0m
      [0mwith. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mencoding[39m {string} If [33mfill[39m is a string, this is its encoding.[0m
      [0m[1mDefault:[22m [33m'utf8'[39m.[0m

[0mAllocates a new [33mBuffer[39m of [33msize[39m bytes. If [33mfill[39m is [33mundefined[39m, the[0m
[0m[33mBuffer[39m will be zero-filled.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m5[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 00 00 00 00 00>[39m

[0mIf [33msize[39m is larger than[0m
[0m[[33mbuffer.constants.MAX_LENGTH[39m][] or smaller than 0, [[33mERR_INVALID_OPT_VALUE[39m][][0m
[0mis thrown.[0m

[0mIf [33mfill[39m is specified, the allocated [33mBuffer[39m will be initialized by calling[0m
[0m[[33mbuf.fill(fill)[39m][[33mbuf.fill()[39m].[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m5[39m[32m,[39m [92m'a'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 61 61 61 61 61>[39m

[0mIf both [33mfill[39m and [33mencoding[39m are specified, the allocated [33mBuffer[39m will be[0m
[0minitialized by calling [[33mbuf.fill(fill, encoding)[39m][[33mbuf.fill()[39m].[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m11[39m[32m,[39m [92m'aGVsbG8gd29ybGQ='[39m[32m,[39m [92m'base64'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>[39m

[0mCalling [[33mBuffer.alloc()[39m][] can be measurably slower than the alternative[0m
[0m[[33mBuffer.allocUnsafe()[39m][] but ensures that the newly created [33mBuffer[39m instance[0m
[0mcontents will never contain sensitive data from previous allocations, including[0m
[0mdata that might not have been allocated for [33mBuffer[39ms.[0m

[0mA [33mTypeError[39m will be thrown if [33msize[39m is not a number.[0m

[32m[1m### Class Method: [33mBuffer.allocUnsafe(size)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90mchanges:[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7079[39m
[90m    description: Passing a negative `size` will now throw an error.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msize[39m {integer} The desired length of the new [33mBuffer[39m.[0m

[0mAllocates a new [33mBuffer[39m of [33msize[39m bytes. If [33msize[39m is larger than[0m
[0m[[33mbuffer.constants.MAX_LENGTH[39m][] or smaller than 0, [[33mERR_INVALID_OPT_VALUE[39m][][0m
[0mis thrown.[0m

[0mThe underlying memory for [33mBuffer[39m instances created in this way is [3mnot[23m[0m
[0m[3minitialized*. The contents of the newly created [33mBuffer[39m are unknown and[23m[0m
[0m[3m*may contain sensitive data[23m. Use [[33mBuffer.alloc()[39m][] instead to initialize[0m
[0m[33mBuffer[39m instances with zeroes.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints (contents may vary): <Buffer a0 8b 28 3f 01 00 00 00 50 32>[39m
    
    [37mbuf[39m[32m.[39m[37mfill[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 00 00 00 00 00 00 00 00 00 00>[39m

[0mA [33mTypeError[39m will be thrown if [33msize[39m is not a number.[0m

[0mThe [33mBuffer[39m module pre-allocates an internal [33mBuffer[39m instance of[0m
[0msize [[33mBuffer.poolSize[39m][] that is used as a pool for the fast allocation of new[0m
[0m[33mBuffer[39m instances created using [[33mBuffer.allocUnsafe()[39m][] and the deprecated[0m
[0m[33mnew Buffer(size)[39m constructor only when [33msize[39m is less than or equal to[0m
[0m[33mBuffer.poolSize >> 1[39m (floor of [[33mBuffer.poolSize[39m][] divided by two).[0m

[0mUse of this pre-allocated internal memory pool is a key difference between[0m
[0mcalling [33mBuffer.alloc(size, fill)[39m vs. [33mBuffer.allocUnsafe(size).fill(fill)[39m.[0m
[0mSpecifically, [33mBuffer.alloc(size, fill)[39m will [3mnever[23m use the internal [33mBuffer[39m[0m
[0mpool, while [33mBuffer.allocUnsafe(size).fill(fill)[39m [3mwill[23m use the internal[0m
[0m[33mBuffer[39m pool if [33msize[39m is less than or equal to half [[33mBuffer.poolSize[39m][]. The[0m
[0mdifference is subtle but can be important when an application requires the[0m
[0madditional performance that [[33mBuffer.allocUnsafe()[39m][] provides.[0m

[32m[1m### Class Method: [33mBuffer.allocUnsafeSlow(size)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msize[39m {integer} The desired length of the new [33mBuffer[39m.[0m

[0mAllocates a new [33mBuffer[39m of [33msize[39m bytes. If [33msize[39m is larger than[0m
[0m[[33mbuffer.constants.MAX_LENGTH[39m][] or smaller than 0, [[33mERR_INVALID_OPT_VALUE[39m][][0m
[0mis thrown. A zero-length [33mBuffer[39m is created if [33msize[39m is 0.[0m

[0mThe underlying memory for [33mBuffer[39m instances created in this way is [3mnot[23m[0m
[0m[3minitialized*. The contents of the newly created [33mBuffer[39m are unknown and[23m[0m
[0m[3m*may contain sensitive data[23m. Use [[33mbuf.fill(0)[39m][[33mbuf.fill()[39m] to initialize[0m
[0msuch [33mBuffer[39m instances with zeroes.[0m

[0mWhen using [[33mBuffer.allocUnsafe()[39m][] to allocate new [33mBuffer[39m instances,[0m
[0mallocations under 4KB are sliced from a single pre-allocated [33mBuffer[39m. This[0m
[0mallows applications to avoid the garbage collection overhead of creating many[0m
[0mindividually allocated [33mBuffer[39m instances. This approach improves both[0m
[0mperformance and memory usage by eliminating the need to track and clean up as[0m
[0mmany individual [33mArrayBuffer[39m objects.[0m

[0mHowever, in the case where a developer may need to retain a small chunk of[0m
[0mmemory from a pool for an indeterminate amount of time, it may be appropriate[0m
[0mto create an un-pooled [33mBuffer[39m instance using [33mBuffer.allocUnsafeSlow()[39m and[0m
[0mthen copying out the relevant bits.[0m

    [90m// Need to keep around a few small chunks of memory.[39m
    [94mconst[39m [37mstore[39m [93m=[39m [33m[[39m[33m][39m[90m;[39m
    
    [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'readable'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mlet[39m [37mdata[39m[90m;[39m
      [94mwhile[39m [90m([39m[90mnull[39m [93m!==[39m [90m([39m[37mdata[39m [93m=[39m [37mreadable[39m[32m.[39m[37mread[39m[90m([39m[90m)[39m[90m)[39m[90m)[39m [33m{[39m
        [90m// Allocate for retained data.[39m
        [94mconst[39m [37msb[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafeSlow[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    
        [90m// Copy the data into the new allocation.[39m
        [37mdata[39m[32m.[39m[37mcopy[39m[90m([39m[37msb[39m[32m,[39m [34m0[39m[32m,[39m [34m0[39m[32m,[39m [34m10[39m[90m)[39m[90m;[39m
    
        [37mstore[39m[32m.[39m[37mpush[39m[90m([39m[37msb[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mA [33mTypeError[39m will be thrown if [33msize[39m is not a number.[0m

[32m[1m### Class Method: [33mBuffer.byteLength(string[, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90mchanges:[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8946[39m
[90m    description: Passing invalid input will now throw an error.[39m
[90m  - version: v5.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5255[39m
[90m    description: The `string` parameter can now be any `TypedArray`, `DataView`[39m
[90m                 or `ArrayBuffer`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstring[39m {string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer} A[0m
      [0mvalue to calculate the length of.[0m
    * [0m[33mencoding[39m {string} If [33mstring[39m is a string, this is its encoding.[0m
      [0m[1mDefault:[22m [33m'utf8'[39m.[0m
    * [0mReturns: {integer} The number of bytes contained within [33mstring[39m.[0m

[0mReturns the byte length of a string when encoded using [33mencoding[39m.[0m
[0mThis is not the same as [[33mString.prototype.length[39m][], which does not account[0m
[0mfor the encoding that is used to convert the string into bytes.[0m

[0mFor [33m'base64'[39m and [33m'hex'[39m, this function assumes valid input. For strings that[0m
[0mcontain non-base64/hex-encoded data (e.g. whitespace), the return value might be[0m
[0mgreater than the length of a [33mBuffer[39m created from the string.[0m

    [94mconst[39m [37mstr[39m [93m=[39m [92m'\u00bd + \u00bc = \u00be'[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mstr[39m}: ${[37mstr[39m[32m.[39m[37mlength[39m} characters, ` [93m+[39m
                `${[37mBuffer[39m[32m.[39m[37mbyteLength[39m[90m([39m[37mstr[39m[32m,[39m [92m'utf8'[39m[90m)[39m} bytes`[90m)[39m[90m;[39m
    [90m// Prints: ½ + ¼ = ¾: 9 characters, 12 bytes[39m

[0mWhen [33mstring[39m is a [33mBuffer[39m/[[33mDataView[39m][]/[[33mTypedArray[39m][]/[[33mArrayBuffer[39m][]/[0m
[0m[[33mSharedArrayBuffer[39m][], the byte length as reported by [33m.byteLength[39m[0m
[0mis returned.[0m

[32m[1m### Class Method: [33mBuffer.compare(buf1, buf2)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10236[39m
[90m    description: The arguments can now be `Uint8Array`s.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuf1[39m {Buffer|Uint8Array}[0m
    * [0m[33mbuf2[39m {Buffer|Uint8Array}[0m
    * [0mReturns: {integer} Either [33m-1[39m, [33m0[39m, or [33m1[39m, depending on the result of the[0m
      [0mcomparison. See [[33mbuf.compare()[39m][] for details.[0m

[0mCompares [33mbuf1[39m to [33mbuf2[39m, typically for the purpose of sorting arrays of[0m
[0m[33mBuffer[39m instances. This is equivalent to calling[0m
[0m[[33mbuf1.compare(buf2)[39m][[33mbuf.compare()[39m].[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'1234'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'0123'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37marr[39m [93m=[39m [33m[[39m[37mbuf1[39m[32m,[39m [37mbuf2[39m[33m][39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37marr[39m[32m.[39m[37msort[39m[90m([39m[37mBuffer[39m[32m.[39m[37mcompare[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ][39m
    [90m// (This result is equal to: [buf2, buf1].)[39m

[32m[1m### Class Method: [33mBuffer.concat(list[, totalLength])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.11[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10236[39m
[90m    description: The elements of `list` can now be `Uint8Array`s.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlist[39m {Buffer[] | Uint8Array[]} List of [33mBuffer[39m or [[33mUint8Array[39m][][0m
      [0minstances to concatenate.[0m
    * [0m[33mtotalLength[39m {integer} Total length of the [33mBuffer[39m instances in [33mlist[39m[0m
      [0mwhen concatenated.[0m
    * [0mReturns: {Buffer}[0m

[0mReturns a new [33mBuffer[39m which is the result of concatenating all the [33mBuffer[39m[0m
[0minstances in the [33mlist[39m together.[0m

[0mIf the list has no items, or if the [33mtotalLength[39m is 0, then a new zero-length[0m
[0m[33mBuffer[39m is returned.[0m

[0mIf [33mtotalLength[39m is not provided, it is calculated from the [33mBuffer[39m instances[0m
[0min [33mlist[39m by adding their lengths.[0m

[0mIf [33mtotalLength[39m is provided, it is coerced to an unsigned integer. If the[0m
[0mcombined length of the [33mBuffer[39ms in [33mlist[39m exceeds [33mtotalLength[39m, the result is[0m
[0mtruncated to [33mtotalLength[39m.[0m

    [90m// Create a single `Buffer` from a list of three `Buffer` instances.[39m
    
    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m14[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf3[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m18[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mtotalLength[39m [93m=[39m [37mbuf1[39m[32m.[39m[37mlength[39m [93m+[39m [37mbuf2[39m[32m.[39m[37mlength[39m [93m+[39m [37mbuf3[39m[32m.[39m[37mlength[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mtotalLength[39m[90m)[39m[90m;[39m
    [90m// Prints: 42[39m
    
    [94mconst[39m [37mbufA[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mconcat[39m[90m([39m[33m[[39m[37mbuf1[39m[32m,[39m [37mbuf2[39m[32m,[39m [37mbuf3[39m[33m][39m[32m,[39m [37mtotalLength[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbufA[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 00 00 00 00 ...>[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbufA[39m[32m.[39m[37mlength[39m[90m)[39m[90m;[39m
    [90m// Prints: 42[39m

[32m[1m### Class Method: [33mBuffer.from(array)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33marray[39m {integer[]}[0m

[0mAllocates a new [33mBuffer[39m using an [33marray[39m of bytes in the range [33m0[39m – [33m255[39m.[0m
[0mArray entries outside that range will be truncated to fit into it.[0m

    [90m// Creates a new Buffer containing the UTF-8 bytes of the string 'buffer'.[39m
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x62[39m[32m,[39m [34m0x75[39m[32m,[39m [34m0x66[39m[32m,[39m [34m0x66[39m[32m,[39m [34m0x65[39m[32m,[39m [34m0x72[39m[33m][39m[90m)[39m[90m;[39m

[0mA [33mTypeError[39m will be thrown if [33marray[39m is not an [33mArray[39m or other type[0m
[0mappropriate for [33mBuffer.from()[39m variants.[0m

[32m[1m### Class Method: [33mBuffer.from(arrayBuffer[, byteOffset[, length]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33marrayBuffer[39m {ArrayBuffer|SharedArrayBuffer} An [[33mArrayBuffer[39m][],[0m
      [0m[[33mSharedArrayBuffer[39m][], for example the [33m.buffer[39m property of a[0m
      [0m[[33mTypedArray[39m][].[0m
    * [0m[33mbyteOffset[39m {integer} Index of first byte to expose. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mlength[39m {integer} Number of bytes to expose.[0m
      [0m[1mDefault:[22m [33marrayBuffer.byteLength - byteOffset[39m.[0m

[0mThis creates a view of the [[33mArrayBuffer[39m][] without copying the underlying[0m
[0mmemory. For example, when passed a reference to the [33m.buffer[39m property of a[0m
[0m[[33mTypedArray[39m][] instance, the newly created [33mBuffer[39m will share the same[0m
[0mallocated memory as the [[33mTypedArray[39m][].[0m

    [94mconst[39m [37marr[39m [93m=[39m [31mnew[39m [37mUint16Array[39m[90m([39m[34m2[39m[90m)[39m[90m;[39m
    
    [37marr[39m[33m[[39m[34m0[39m[33m][39m [93m=[39m [34m5000[39m[90m;[39m
    [37marr[39m[33m[[39m[34m1[39m[33m][39m [93m=[39m [34m4000[39m[90m;[39m
    
    [90m// Shares memory with `arr`.[39m
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37marr[39m[32m.[39m[37mbuffer[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 88 13 a0 0f>[39m
    
    [90m// Changing the original Uint16Array changes the Buffer also.[39m
    [37marr[39m[33m[[39m[34m1[39m[33m][39m [93m=[39m [34m6000[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 88 13 70 17>[39m

[0mThe optional [33mbyteOffset[39m and [33mlength[39m arguments specify a memory range within[0m
[0mthe [33marrayBuffer[39m that will be shared by the [33mBuffer[39m.[0m

    [94mconst[39m [37mab[39m [93m=[39m [31mnew[39m [37mArrayBuffer[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37mab[39m[32m,[39m [34m0[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlength[39m[90m)[39m[90m;[39m
    [90m// Prints: 2[39m

[0mA [33mTypeError[39m will be thrown if [33marrayBuffer[39m is not an [[33mArrayBuffer[39m][] or a[0m
[0m[[33mSharedArrayBuffer[39m][] or other type appropriate for [33mBuffer.from()[39m variants.[0m

[32m[1m### Class Method: [33mBuffer.from(buffer)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|Uint8Array} An existing [33mBuffer[39m or [[33mUint8Array[39m][] from[0m
      [0mwhich to copy data.[0m

[0mCopies the passed [33mbuffer[39m data onto a new [33mBuffer[39m instance.[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'buffer'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37mbuf1[39m[90m)[39m[90m;[39m
    
    [37mbuf1[39m[33m[[39m[34m0[39m[33m][39m [93m=[39m [34m0x61[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: auffer[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: buffer[39m

[0mA [33mTypeError[39m will be thrown if [33mbuffer[39m is not a [33mBuffer[39m or other type[0m
[0mappropriate for [33mBuffer.from()[39m variants.[0m

[32m[1m### Class Method: [33mBuffer.from(object[, offsetOrEncoding[, length]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mobject[39m {Object} An object supporting [33mSymbol.toPrimitive[39m or [33mvalueOf()[39m.[0m
    * [0m[33moffsetOrEncoding[39m {integer|string} A byte-offset or encoding, depending on[0m
      [0mthe value returned either by [33mobject.valueOf()[39m or[0m
      [0m[33mobject[Symbol.toPrimitive]()[39m.[0m
    * [0m[33mlength[39m {integer} A length, depending on the value returned either by[0m
      [0m[33mobject.valueOf()[39m or [33mobject[Symbol.toPrimitive]()[39m.[0m

[0mFor objects whose [33mvalueOf()[39m function returns a value not strictly equal to[0m
[0m[33mobject[39m, returns [33mBuffer.from(object.valueOf(), offsetOrEncoding, length)[39m.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[31mnew[39m [37mString[39m[90m([39m[92m'this is a test'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>[39m

[0mFor objects that support [33mSymbol.toPrimitive[39m, returns[0m
[0m[33mBuffer.from(object[Symbol.toPrimitive](), offsetOrEncoding, length)[39m.[0m

    [94mclass[39m [37mFoo[39m [33m{[39m
      [33m[[39m[37mSymbol[39m[32m.[39m[37mtoPrimitive[39m[33m][39m[90m([39m[90m)[39m [33m{[39m
        [31mreturn[39m [92m'this is a test'[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[31mnew[39m [37mFoo[39m[90m([39m[90m)[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>[39m

[0mA [33mTypeError[39m will be thrown if [33mobject[39m has not mentioned methods or is not of[0m
[0mother type appropriate for [33mBuffer.from()[39m variants.[0m

[32m[1m### Class Method: [33mBuffer.from(string[, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstring[39m {string} A string to encode.[0m
    * [0m[33mencoding[39m {string} The encoding of [33mstring[39m. [1mDefault:[22m [33m'utf8'[39m.[0m

[0mCreates a new [33mBuffer[39m containing [33mstring[39m. The [33mencoding[39m parameter identifies[0m
[0mthe character encoding to be used when converting [33mstring[39m into bytes.[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'this is a tést'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'7468697320697320612074c3a97374'[39m[32m,[39m [92m'hex'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: this is a tést[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: this is a tést[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mtoString[39m[90m([39m[92m'latin1'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: this is a tÃ©st[39m

[0mA [33mTypeError[39m will be thrown if [33mstring[39m is not a string or other type[0m
[0mappropriate for [33mBuffer.from()[39m variants.[0m

[32m[1m### Class Method: [33mBuffer.isBuffer(obj)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.101[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mobj[39m {Object}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if [33mobj[39m is a [33mBuffer[39m, [33mfalse[39m otherwise.[0m

[32m[1m### Class Method: [33mBuffer.isEncoding(encoding)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mencoding[39m {string} A character encoding name to check.[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if [33mencoding[39m is the name of a supported character encoding,[0m
[0mor [33mfalse[39m otherwise.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mBuffer[39m[32m.[39m[37misEncoding[39m[90m([39m[92m'utf-8'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: true[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mBuffer[39m[32m.[39m[37misEncoding[39m[90m([39m[92m'hex'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: true[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mBuffer[39m[32m.[39m[37misEncoding[39m[90m([39m[92m'utf/8'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: false[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mBuffer[39m[32m.[39m[37misEncoding[39m[90m([39m[92m''[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: false[39m

[32m[1m### Class Property: [33mBuffer.poolSize[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer} [1mDefault:[22m [33m8192[39m[0m

[0mThis is the size (in bytes) of pre-allocated internal [33mBuffer[39m instances used[0m
[0mfor pooling. This value may be modified.[0m

[32m[1m### [33mbuf[index][39m[32m[22m[39m

[90m<!-- YAML[39m
[90mtype: property[39m
[90mname: [index][39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mindex[39m {integer}[0m

[0mThe index operator [33m[index][39m can be used to get and set the octet at position[0m
[0m[33mindex[39m in [33mbuf[39m. The values refer to individual bytes, so the legal value[0m
[0mrange is between [33m0x00[39m and [33m0xFF[39m (hex) or [33m0[39m and [33m255[39m (decimal).[0m

[0mThis operator is inherited from [33mUint8Array[39m, so its behavior on out-of-bounds[0m
[0maccess is the same as [33mUint8Array[39m. In other words, [33mbuf[index][39m returns[0m
[0m[33mundefined[39m when [33mindex[39m is negative or [33m>= buf.length[39m, and[0m
[0m[33mbuf[index] = value[39m does not modify the buffer if [33mindex[39m is negative or[0m
[0m[33m>= buf.length[39m.[0m

    [90m// Copy an ASCII string into a `Buffer` one byte at a time.[39m
    [90m// (This only works for ASCII-only strings. In general, one should use[39m
    [90m// `Buffer.from()` to perform this conversion.)[39m
    
    [94mconst[39m [37mstr[39m [93m=[39m [92m'Node.js'[39m[90m;[39m
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[37mstr[39m[32m.[39m[37mlength[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [37mstr[39m[32m.[39m[37mlength[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
      [37mbuf[39m[33m[[39m[37mi[39m[33m][39m [93m=[39m [37mstr[39m[32m.[39m[37mcharCodeAt[39m[90m([39m[37mi[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mtoString[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: Node.js[39m

[32m[1m### [33mbuf.buffer[39m[32m[22m[39m

    * [0m{ArrayBuffer} The underlying [33mArrayBuffer[39m object based on[0m
      [0mwhich this [33mBuffer[39m object is created.[0m

[0mThis [33mArrayBuffer[39m is not guaranteed to correspond exactly to the original[0m
[0m[33mBuffer[39m. See the notes on [33mbuf.byteOffset[39m for details.[0m

    [94mconst[39m [37marrayBuffer[39m [93m=[39m [31mnew[39m [37mArrayBuffer[39m[90m([39m[34m16[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuffer[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37marrayBuffer[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuffer[39m[32m.[39m[37mbuffer[39m [93m===[39m [37marrayBuffer[39m[90m)[39m[90m;[39m
    [90m// Prints: true[39m

[32m[1m### [33mbuf.byteOffset[39m[32m[22m[39m

    * [0m{integer} The [33mbyteOffset[39m on the underlying [33mArrayBuffer[39m object based on[0m
      [0mwhich this [33mBuffer[39m object is created.[0m

[0mWhen setting [33mbyteOffset[39m in [33mBuffer.from(ArrayBuffer, byteOffset, length)[39m,[0m
[0mor sometimes when allocating a buffer smaller than [33mBuffer.poolSize[39m, the[0m
[0mbuffer doesn't start from a zero offset on the underlying [33mArrayBuffer[39m.[0m

[0mThis can cause problems when accessing the underlying [33mArrayBuffer[39m directly[0m
[0musing [33mbuf.buffer[39m, as other parts of the [33mArrayBuffer[39m may be unrelated[0m
[0mto the [33mbuf[39m object itself.[0m

[0mA common issue when creating a [33mTypedArray[39m object that shares its memory with[0m
[0ma [33mBuffer[39m is that in this case one needs to specify the [33mbyteOffset[39m correctly:[0m

    [90m// Create a buffer smaller than `Buffer.poolSize`.[39m
    [94mconst[39m [37mnodeBuffer[39m [93m=[39m [31mnew[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0[39m[32m,[39m [34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m4[39m[32m,[39m [34m5[39m[32m,[39m [34m6[39m[32m,[39m [34m7[39m[32m,[39m [34m8[39m[32m,[39m [34m9[39m[33m][39m[90m)[39m[90m;[39m
    
    [90m// When casting the Node.js Buffer to an Int8Array, use the byteOffset[39m
    [90m// to refer only to the part of `nodeBuffer.buffer` that contains the memory[39m
    [90m// for `nodeBuffer`.[39m
    [31mnew[39m [37mInt8Array[39m[90m([39m[37mnodeBuffer[39m[32m.[39m[37mbuffer[39m[32m,[39m [37mnodeBuffer[39m[32m.[39m[37mbyteOffset[39m[32m,[39m [37mnodeBuffer[39m[32m.[39m[37mlength[39m[90m)[39m[90m;[39m

[32m[1m### [33mbuf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10236[39m
[90m    description: The `target` parameter can now be a `Uint8Array`.[39m
[90m  - version: v5.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5880[39m
[90m    description: Additional parameters for specifying offsets are supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtarget[39m {Buffer|Uint8Array} A [33mBuffer[39m or [[33mUint8Array[39m][] with which to[0m
      [0mcompare [33mbuf[39m.[0m
    * [0m[33mtargetStart[39m {integer} The offset within [33mtarget[39m at which to begin[0m
      [0mcomparison. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mtargetEnd[39m {integer} The offset within [33mtarget[39m at which to end comparison[0m
      [0m(not inclusive). [1mDefault:[22m [33mtarget.length[39m.[0m
    * [0m[33msourceStart[39m {integer} The offset within [33mbuf[39m at which to begin comparison.[0m
      [0m[1mDefault:[22m [33m0[39m.[0m
    * [0m[33msourceEnd[39m {integer} The offset within [33mbuf[39m at which to end comparison[0m
      [0m(not inclusive). [1mDefault:[22m [[33mbuf.length[39m][].[0m
    * [0mReturns: {integer}[0m

[0mCompares [33mbuf[39m with [33mtarget[39m and returns a number indicating whether [33mbuf[39m[0m
[0mcomes before, after, or is the same as [33mtarget[39m in sort order.[0m
[0mComparison is based on the actual sequence of bytes in each [33mBuffer[39m.[0m

    * [0m[33m0[39m is returned if [33mtarget[39m is the same as [33mbuf[39m[0m
    * [0m[33m1[39m is returned if [33mtarget[39m should come [3mbefore[23m [33mbuf[39m when sorted.[0m
    * [0m[33m-1[39m is returned if [33mtarget[39m should come [3mafter[23m [33mbuf[39m when sorted.[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'ABC'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'BCD'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf3[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'ABCD'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mcompare[39m[90m([39m[37mbuf1[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 0[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mcompare[39m[90m([39m[37mbuf2[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: -1[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mcompare[39m[90m([39m[37mbuf3[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: -1[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mcompare[39m[90m([39m[37mbuf1[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 1[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mcompare[39m[90m([39m[37mbuf3[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 1[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[33m[[39m[37mbuf1[39m[32m,[39m [37mbuf2[39m[32m,[39m [37mbuf3[39m[33m][39m[32m.[39m[37msort[39m[90m([39m[37mBuffer[39m[32m.[39m[37mcompare[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: [ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ][39m
    [90m// (This result is equal to: [buf1, buf3, buf2].)[39m

[0mThe optional [33mtargetStart[39m, [33mtargetEnd[39m, [33msourceStart[39m, and [33msourceEnd[39m[0m
[0marguments can be used to limit the comparison to specific ranges within [33mtarget[39m[0m
[0mand [33mbuf[39m respectively.[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m4[39m[32m,[39m [34m5[39m[32m,[39m [34m6[39m[32m,[39m [34m7[39m[32m,[39m [34m8[39m[32m,[39m [34m9[39m[33m][39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m5[39m[32m,[39m [34m6[39m[32m,[39m [34m7[39m[32m,[39m [34m8[39m[32m,[39m [34m9[39m[32m,[39m [34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m4[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mcompare[39m[90m([39m[37mbuf2[39m[32m,[39m [34m5[39m[32m,[39m [34m9[39m[32m,[39m [34m0[39m[32m,[39m [34m4[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 0[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mcompare[39m[90m([39m[37mbuf2[39m[32m,[39m [34m0[39m[32m,[39m [34m6[39m[32m,[39m [34m4[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: -1[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mcompare[39m[90m([39m[37mbuf2[39m[32m,[39m [34m5[39m[32m,[39m [34m6[39m[32m,[39m [34m5[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 1[39m

[0m[[33mERR_OUT_OF_RANGE[39m][] is thrown if [33mtargetStart < 0[39m, [33msourceStart < 0[39m,[0m
[0m[33mtargetEnd > target.byteLength[39m, or [33msourceEnd > source.byteLength[39m.[0m

[32m[1m### [33mbuf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtarget[39m {Buffer|Uint8Array} A [33mBuffer[39m or [[33mUint8Array[39m][] to copy into.[0m
    * [0m[33mtargetStart[39m {integer} The offset within [33mtarget[39m at which to begin[0m
      [0mwriting. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33msourceStart[39m {integer} The offset within [33mbuf[39m from which to begin copying.[0m
      [0m[1mDefault:[22m [33m0[39m.[0m
    * [0m[33msourceEnd[39m {integer} The offset within [33mbuf[39m at which to stop copying (not[0m
      [0minclusive). [1mDefault:[22m [[33mbuf.length[39m][].[0m
    * [0mReturns: {integer} The number of bytes copied.[0m

[0mCopies data from a region of [33mbuf[39m to a region in [33mtarget[39m, even if the [33mtarget[39m[0m
[0mmemory region overlaps with [33mbuf[39m.[0m

[0m[[33mTypedArray#set()[39m][] performs the same operation, and is available for all[0m
[0mTypedArrays, including Node.js [33mBuffer[39ms, although it takes different[0m
[0mfunction arguments.[0m

    [90m// Create two `Buffer` instances.[39m
    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m26[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m26[39m[90m)[39m[32m.[39m[37mfill[39m[90m([39m[92m'!'[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m26[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
      [90m// 97 is the decimal ASCII value for 'a'.[39m
      [37mbuf1[39m[33m[[39m[37mi[39m[33m][39m [93m=[39m [37mi[39m [93m+[39m [34m97[39m[90m;[39m
    [33m}[39m
    
    [90m// Copy `buf1` bytes 16 through 19 into `buf2` starting at byte 8 of `buf2`.[39m
    [37mbuf1[39m[32m.[39m[37mcopy[39m[90m([39m[37mbuf2[39m[32m,[39m [34m8[39m[32m,[39m [34m16[39m[32m,[39m [34m20[39m[90m)[39m[90m;[39m
    [90m// This is equivalent to:[39m
    [90m// buf2.set(buf1.subarray(16, 20), 8);[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mtoString[39m[90m([39m[92m'ascii'[39m[32m,[39m [34m0[39m[32m,[39m [34m25[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: !!!!!!!!qrst!!!!!!!!!!!!![39m

    [90m// Create a `Buffer` and copy data from one region to an overlapping region[39m
    [90m// within the same `Buffer`.[39m
    
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m26[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m26[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
      [90m// 97 is the decimal ASCII value for 'a'.[39m
      [37mbuf[39m[33m[[39m[37mi[39m[33m][39m [93m=[39m [37mi[39m [93m+[39m [34m97[39m[90m;[39m
    [33m}[39m
    
    [37mbuf[39m[32m.[39m[37mcopy[39m[90m([39m[37mbuf[39m[32m,[39m [34m0[39m[32m,[39m [34m4[39m[32m,[39m [34m10[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: efghijghijklmnopqrstuvwxyz[39m

[32m[1m### [33mbuf.entries()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Iterator}[0m

[0mCreates and returns an [iterator][] of [33m[index, byte][39m pairs from the contents[0m
[0mof [33mbuf[39m.[0m

    [90m// Log the entire contents of a `Buffer`.[39m
    
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'buffer'[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mconst[39m [37mpair[39m [37mof[39m [37mbuf[39m[32m.[39m[37mentries[39m[90m([39m[90m)[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mpair[39m[90m)[39m[90m;[39m
    [33m}[39m
    [90m// Prints:[39m
    [90m//   [0, 98][39m
    [90m//   [1, 117][39m
    [90m//   [2, 102][39m
    [90m//   [3, 102][39m
    [90m//   [4, 101][39m
    [90m//   [5, 114][39m

[32m[1m### [33mbuf.equals(otherBuffer)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10236[39m
[90m    description: The arguments can now be `Uint8Array`s.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33motherBuffer[39m {Buffer|Uint8Array} A [33mBuffer[39m or [[33mUint8Array[39m][] with which to[0m
      [0mcompare [33mbuf[39m.[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if both [33mbuf[39m and [33motherBuffer[39m have exactly the same bytes,[0m
[0m[33mfalse[39m otherwise. Equivalent to[0m
[0m[[33mbuf.compare(otherBuffer) === 0[39m][[33mbuf.compare()[39m].[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'ABC'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'414243'[39m[32m,[39m [92m'hex'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbuf3[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'ABCD'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mequals[39m[90m([39m[37mbuf2[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: true[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mequals[39m[90m([39m[37mbuf3[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: false[39m

[32m[1m### [33mbuf.fill(value[, offset[, end]][, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90mchanges:[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22969[39m
[90m    description: Throws `ERR_OUT_OF_RANGE` instead of `ERR_INDEX_OUT_OF_RANGE`.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18790[39m
[90m    description: Negative `end` values throw an `ERR_INDEX_OUT_OF_RANGE` error.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18129[39m
[90m    description: Attempting to fill a non-zero length buffer with a zero length[39m
[90m                 buffer triggers a thrown exception.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17427[39m
[90m    description: Specifying an invalid string for `value` triggers a thrown[39m
[90m                 exception.[39m
[90m  - version: v5.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4935[39m
[90m    description: The `encoding` parameter is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {string|Buffer|Uint8Array|integer} The value with which to fill [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to fill [33mbuf[39m.[0m
      [0m[1mDefault:[22m [33m0[39m.[0m
    * [0m[33mend[39m {integer} Where to stop filling [33mbuf[39m (not inclusive). [1mDefault:[22m[0m
      [0m[[33mbuf.length[39m][].[0m
    * [0m[33mencoding[39m {string} The encoding for [33mvalue[39m if [33mvalue[39m is a string.[0m
      [0m[1mDefault:[22m [33m'utf8'[39m.[0m
    * [0mReturns: {Buffer} A reference to [33mbuf[39m.[0m

[0mFills [33mbuf[39m with the specified [33mvalue[39m. If the [33moffset[39m and [33mend[39m are not given,[0m
[0mthe entire [33mbuf[39m will be filled:[0m

    [90m// Fill a `Buffer` with the ASCII character 'h'.[39m
    
    [94mconst[39m [37mb[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m50[39m[90m)[39m[32m.[39m[37mfill[39m[90m([39m[92m'h'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh[39m

[0m[33mvalue[39m is coerced to a [33muint32[39m value if it is not a string, [33mBuffer[39m, or[0m
[0minteger. If the resulting integer is greater than [33m255[39m (decimal), [33mbuf[39m will be[0m
[0mfilled with [33mvalue & 255[39m.[0m

[0mIf the final write of a [33mfill()[39m operation falls on a multi-byte character,[0m
[0mthen only the bytes of that character that fit into [33mbuf[39m are written:[0m

    [90m// Fill a `Buffer` with character that takes up two bytes in UTF-8.[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m5[39m[90m)[39m[32m.[39m[37mfill[39m[90m([39m[92m'\u0222'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer c8 a2 c8 a2 c8>[39m

[0mIf [33mvalue[39m contains invalid characters, it is truncated; if no valid[0m
[0mfill data remains, an exception is thrown:[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m5[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mfill[39m[90m([39m[92m'a'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 61 61 61 61 61>[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mfill[39m[90m([39m[92m'aazz'[39m[32m,[39m [92m'hex'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer aa aa aa aa aa>[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mfill[39m[90m([39m[92m'zz'[39m[32m,[39m [92m'hex'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws an exception.[39m

[32m[1m### [33mbuf.includes(value[, byteOffset][, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {string|Buffer|Uint8Array|integer} What to search for.[0m
    * [0m[33mbyteOffset[39m {integer} Where to begin searching in [33mbuf[39m. If negative, then[0m
      [0moffset is calculated from the end of [33mbuf[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mencoding[39m {string} If [33mvalue[39m is a string, this is its encoding.[0m
      [0m[1mDefault:[22m [33m'utf8'[39m.[0m
    * [0mReturns: {boolean} [33mtrue[39m if [33mvalue[39m was found in [33mbuf[39m, [33mfalse[39m otherwise.[0m

[0mEquivalent to [[33mbuf.indexOf() !== -1[39m][[33mbuf.indexOf()[39m].[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'this is a buffer'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mincludes[39m[90m([39m[92m'this'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: true[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mincludes[39m[90m([39m[92m'is'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: true[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mincludes[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'a buffer'[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: true[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mincludes[39m[90m([39m[34m97[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: true (97 is the decimal ASCII value for 'a')[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mincludes[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'a buffer example'[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: false[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mincludes[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'a buffer example'[39m[90m)[39m[32m.[39m[37mslice[39m[90m([39m[34m0[39m[32m,[39m [34m8[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: true[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mincludes[39m[90m([39m[92m'this'[39m[32m,[39m [34m4[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: false[39m

[32m[1m### [33mbuf.indexOf(value[, byteOffset][, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.5.0[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10236[39m
[90m    description: The `value` can now be a `Uint8Array`.[39m
[90m  - version: v5.7.0, v4.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4803[39m
[90m    description: When `encoding` is being passed, the `byteOffset` parameter[39m
[90m                 is no longer required.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {string|Buffer|Uint8Array|integer} What to search for.[0m
    * [0m[33mbyteOffset[39m {integer} Where to begin searching in [33mbuf[39m. If negative, then[0m
      [0moffset is calculated from the end of [33mbuf[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mencoding[39m {string} If [33mvalue[39m is a string, this is the encoding used to[0m
      [0mdetermine the binary representation of the string that will be searched for in[0m
      [0m[33mbuf[39m. [1mDefault:[22m [33m'utf8'[39m.[0m
    * [0mReturns: {integer} The index of the first occurrence of [33mvalue[39m in [33mbuf[39m, or[0m
      [0m[33m-1[39m if [33mbuf[39m does not contain [33mvalue[39m.[0m

[0mIf [33mvalue[39m is:[0m

    * [0ma string, [33mvalue[39m is interpreted according to the character encoding in[0m
      [0m[33mencoding[39m.[0m
    * [0ma [33mBuffer[39m or [[33mUint8Array[39m][], [33mvalue[39m will be used in its entirety.[0m
      [0mTo compare a partial [33mBuffer[39m, use [[33mbuf.slice()[39m][].[0m
    * [0ma number, [33mvalue[39m will be interpreted as an unsigned 8-bit integer[0m
      [0mvalue between [33m0[39m and [33m255[39m.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'this is a buffer'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'this'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 0[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'is'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 2[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mindexOf[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'a buffer'[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 8[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mindexOf[39m[90m([39m[34m97[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 8 (97 is the decimal ASCII value for 'a')[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mindexOf[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'a buffer example'[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: -1[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mindexOf[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'a buffer example'[39m[90m)[39m[32m.[39m[37mslice[39m[90m([39m[34m0[39m[32m,[39m [34m8[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 8[39m
    
    [94mconst[39m [37mutf16Buffer[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'\u039a\u0391\u03a3\u03a3\u0395'[39m[32m,[39m [92m'utf16le'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mutf16Buffer[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'\u03a3'[39m[32m,[39m [34m0[39m[32m,[39m [92m'utf16le'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 4[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mutf16Buffer[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'\u03a3'[39m[32m,[39m [93m-[39m[34m4[39m[32m,[39m [92m'utf16le'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 6[39m

[0mIf [33mvalue[39m is not a string, number, or [33mBuffer[39m, this method will throw a[0m
[0m[33mTypeError[39m. If [33mvalue[39m is a number, it will be coerced to a valid byte value,[0m
[0man integer between 0 and 255.[0m

[0mIf [33mbyteOffset[39m is not a number, it will be coerced to a number. If the result[0m
[0mof coercion is [33mNaN[39m or [33m0[39m, then the entire buffer will be searched. This[0m
[0mbehavior matches [[33mString#indexOf()[39m][].[0m

    [94mconst[39m [37mb[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'abcdef'[39m[90m)[39m[90m;[39m
    
    [90m// Passing a value that's a number, but not a valid byte.[39m
    [90m// Prints: 2, equivalent to searching for 99 or 'c'.[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mindexOf[39m[90m([39m[34m99.9[39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mindexOf[39m[90m([39m[34m256[39m [93m+[39m [34m99[39m[90m)[39m[90m)[39m[90m;[39m
    
    [90m// Passing a byteOffset that coerces to NaN or 0.[39m
    [90m// Prints: 1, searching the whole buffer.[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'b'[39m[32m,[39m [90mundefined[39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'b'[39m[32m,[39m [33m{[39m[33m}[39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'b'[39m[32m,[39m [90mnull[39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mindexOf[39m[90m([39m[92m'b'[39m[32m,[39m [33m[[39m[33m][39m[90m)[39m[90m)[39m[90m;[39m

[0mIf [33mvalue[39m is an empty string or empty [33mBuffer[39m and [33mbyteOffset[39m is less[0m
[0mthan [33mbuf.length[39m, [33mbyteOffset[39m will be returned. If [33mvalue[39m is empty and[0m
[0m[33mbyteOffset[39m is at least [33mbuf.length[39m, [33mbuf.length[39m will be returned.[0m

[32m[1m### [33mbuf.keys()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Iterator}[0m

[0mCreates and returns an [iterator][] of [33mbuf[39m keys (indices).[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'buffer'[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mconst[39m [37mkey[39m [37mof[39m [37mbuf[39m[32m.[39m[37mkeys[39m[90m([39m[90m)[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mkey[39m[90m)[39m[90m;[39m
    [33m}[39m
    [90m// Prints:[39m
    [90m//   0[39m
    [90m//   1[39m
    [90m//   2[39m
    [90m//   3[39m
    [90m//   4[39m
    [90m//   5[39m

[32m[1m### [33mbuf.lastIndexOf(value[, byteOffset][, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10236[39m
[90m    description: The `value` can now be a `Uint8Array`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {string|Buffer|Uint8Array|integer} What to search for.[0m
    * [0m[33mbyteOffset[39m {integer} Where to begin searching in [33mbuf[39m. If negative, then[0m
      [0moffset is calculated from the end of [33mbuf[39m. [1mDefault:[22m[0m
      [0m[33mbuf.length - 1[39m.[0m
    * [0m[33mencoding[39m {string} If [33mvalue[39m is a string, this is the encoding used to[0m
      [0mdetermine the binary representation of the string that will be searched for in[0m
      [0m[33mbuf[39m. [1mDefault:[22m [33m'utf8'[39m.[0m
    * [0mReturns: {integer} The index of the last occurrence of [33mvalue[39m in [33mbuf[39m, or[0m
      [0m[33m-1[39m if [33mbuf[39m does not contain [33mvalue[39m.[0m

[0mIdentical to [[33mbuf.indexOf()[39m][], except the last occurrence of [33mvalue[39m is found[0m
[0mrather than the first occurrence.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'this buffer is a buffer'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'this'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 0[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'buffer'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 17[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'buffer'[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 17[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[34m97[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 15 (97 is the decimal ASCII value for 'a')[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'yolo'[39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: -1[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'buffer'[39m[32m,[39m [34m5[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 5[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'buffer'[39m[32m,[39m [34m4[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: -1[39m
    
    [94mconst[39m [37mutf16Buffer[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'\u039a\u0391\u03a3\u03a3\u0395'[39m[32m,[39m [92m'utf16le'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mutf16Buffer[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'\u03a3'[39m[32m,[39m [90mundefined[39m[32m,[39m [92m'utf16le'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 6[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mutf16Buffer[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'\u03a3'[39m[32m,[39m [93m-[39m[34m5[39m[32m,[39m [92m'utf16le'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 4[39m

[0mIf [33mvalue[39m is not a string, number, or [33mBuffer[39m, this method will throw a[0m
[0m[33mTypeError[39m. If [33mvalue[39m is a number, it will be coerced to a valid byte value,[0m
[0man integer between 0 and 255.[0m

[0mIf [33mbyteOffset[39m is not a number, it will be coerced to a number. Any arguments[0m
[0mthat coerce to [33mNaN[39m, like [33m{}[39m or [33mundefined[39m, will search the whole buffer.[0m
[0mThis behavior matches [[33mString#lastIndexOf()[39m][].[0m

    [94mconst[39m [37mb[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'abcdef'[39m[90m)[39m[90m;[39m
    
    [90m// Passing a value that's a number, but not a valid byte.[39m
    [90m// Prints: 2, equivalent to searching for 99 or 'c'.[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[34m99.9[39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[34m256[39m [93m+[39m [34m99[39m[90m)[39m[90m)[39m[90m;[39m
    
    [90m// Passing a byteOffset that coerces to NaN.[39m
    [90m// Prints: 1, searching the whole buffer.[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'b'[39m[32m,[39m [90mundefined[39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'b'[39m[32m,[39m [33m{[39m[33m}[39m[90m)[39m[90m)[39m[90m;[39m
    
    [90m// Passing a byteOffset that coerces to 0.[39m
    [90m// Prints: -1, equivalent to passing 0.[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'b'[39m[32m,[39m [90mnull[39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mb[39m[32m.[39m[37mlastIndexOf[39m[90m([39m[92m'b'[39m[32m,[39m [33m[[39m[33m][39m[90m)[39m[90m)[39m[90m;[39m

[0mIf [33mvalue[39m is an empty string or empty [33mBuffer[39m, [33mbyteOffset[39m will be returned.[0m

[32m[1m### [33mbuf.length[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mReturns the number of bytes in [33mbuf[39m.[0m

    [90m// Create a `Buffer` and write a shorter string to it using UTF-8.[39m
    
    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m1234[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlength[39m[90m)[39m[90m;[39m
    [90m// Prints: 1234[39m
    
    [37mbuf[39m[32m.[39m[37mwrite[39m[90m([39m[92m'some string'[39m[32m,[39m [34m0[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mlength[39m[90m)[39m[90m;[39m
    [90m// Prints: 1234[39m

[32m[1m### [33mbuf.parent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v8.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [[33mbuf.buffer[39m[90m][] instead.[0m[23m[39m

[0mThe [33mbuf.parent[39m property is a deprecated alias for [33mbuf.buffer[39m.[0m

[32m[1m### [33mbuf.readBigInt64BE([offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.readBigInt64LE([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy: [33m0 <= offset <= buf.length - 8[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {bigint}[0m

[0mReads a signed 64-bit integer from [33mbuf[39m at the specified [33moffset[39m with[0m
[0mthe specified [endianness][] ([33mreadBigInt64BE()[39m reads as big endian,[0m
[0m[33mreadBigInt64LE()[39m reads as little endian).[0m

[0mIntegers read from a [33mBuffer[39m are interpreted as two's complement signed values.[0m

[32m[1m### [33mbuf.readBigUInt64BE([offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.readBigUInt64LE([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy: [33m0 <= offset <= buf.length - 8[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {bigint}[0m

[0mReads an unsigned 64-bit integer from [33mbuf[39m at the specified [33moffset[39m with[0m
[0mthe specified [endianness][] ([33mreadBigUInt64BE()[39m reads as big endian,[0m
[0m[33mreadBigUInt64LE()[39m reads as little endian).[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x00[39m[32m,[39m [34m0x00[39m[32m,[39m [34m0x00[39m[32m,[39m [34m0x00[39m[32m,[39m [34m0xff[39m[32m,[39m [34m0xff[39m[32m,[39m [34m0xff[39m[32m,[39m [34m0xff[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadBigUInt64BE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 4294967295n[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadBigUInt64LE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 18446744069414584320n[39m

[32m[1m### [33mbuf.readDoubleBE([offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.readDoubleLE([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 8[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {number}[0m

[0mReads a 64-bit double from [33mbuf[39m at the specified [33moffset[39m with the specified[0m
[0m[endianness][] ([33mreadDoubleBE()[39m reads as big endian, [33mreadDoubleLE()[39m reads as[0m
[0mlittle endian).[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m4[39m[32m,[39m [34m5[39m[32m,[39m [34m6[39m[32m,[39m [34m7[39m[32m,[39m [34m8[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadDoubleBE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 8.20788039913184e-304[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadDoubleLE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 5.447603722011605e-270[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadDoubleLE[39m[90m([39m[34m1[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.readFloatBE([offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.readFloatLE([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 4[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {number}[0m

[0mReads a 32-bit float from [33mbuf[39m at the specified [33moffset[39m with the specified[0m
[0m[endianness][] ([33mreadFloatBE()[39m reads as big endian, [33mreadFloatLE()[39m reads as[0m
[0mlittle endian).[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[32m,[39m [34m4[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadFloatBE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 2.387939260590663e-38[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadFloatLE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 1.539989614439558e-36[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadFloatLE[39m[90m([39m[34m1[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.readInt8([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 1[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer}[0m

[0mReads a signed 8-bit integer from [33mbuf[39m at the specified [33moffset[39m.[0m

[0mIntegers read from a [33mBuffer[39m are interpreted as two's complement signed values.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[93m-[39m[34m1[39m[32m,[39m [34m5[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadInt8[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: -1[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadInt8[39m[90m([39m[34m1[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 5[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadInt8[39m[90m([39m[34m2[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.readInt16BE([offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.readInt16LE([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.5[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 2[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer}[0m

[0mReads a signed 16-bit integer from [33mbuf[39m at the specified [33moffset[39m with[0m
[0mthe specified [endianness][] ([33mreadInt16BE()[39m reads as big endian,[0m
[0m[33mreadInt16LE()[39m reads as little endian).[0m

[0mIntegers read from a [33mBuffer[39m are interpreted as two's complement signed values.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0[39m[32m,[39m [34m5[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadInt16BE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 5[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadInt16LE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 1280[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadInt16LE[39m[90m([39m[34m1[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.readInt32BE([offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.readInt32LE([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.5[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 4[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer}[0m

[0mReads a signed 32-bit integer from [33mbuf[39m at the specified [33moffset[39m with[0m
[0mthe specified [endianness][] ([33mreadInt32BE()[39m reads as big endian,[0m
[0m[33mreadInt32LE()[39m reads as little endian).[0m

[0mIntegers read from a [33mBuffer[39m are interpreted as two's complement signed values.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0[39m[32m,[39m [34m0[39m[32m,[39m [34m0[39m[32m,[39m [34m5[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadInt32BE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 5[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadInt32LE[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 83886080[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadInt32LE[39m[90m([39m[34m1[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.readIntBE(offset, byteLength)[39m[32m[22m[39m

[32m[1m### [33mbuf.readIntLE(offset, byteLength)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 and `byteLength` to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - byteLength[39m.[0m
    * [0m[33mbyteLength[39m {integer} Number of bytes to read. Must satisfy[0m
      [0m[33m0 < byteLength <= 6[39m.[0m
    * [0mReturns: {integer}[0m

[0mReads [33mbyteLength[39m number of bytes from [33mbuf[39m at the specified [33moffset[39m[0m
[0mand interprets the result as a two's complement signed value. Supports up to 48[0m
[0mbits of accuracy.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x12[39m[32m,[39m [34m0x34[39m[32m,[39m [34m0x56[39m[32m,[39m [34m0x78[39m[32m,[39m [34m0x90[39m[32m,[39m [34m0xab[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadIntLE[39m[90m([39m[34m0[39m[32m,[39m [34m6[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: -546f87a9cbee[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadIntBE[39m[90m([39m[34m0[39m[32m,[39m [34m6[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 1234567890ab[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadIntBE[39m[90m([39m[34m1[39m[32m,[39m [34m6[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadIntBE[39m[90m([39m[34m1[39m[32m,[39m [34m0[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.readUInt8([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 1[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer}[0m

[0mReads an unsigned 8-bit integer from [33mbuf[39m at the specified [33moffset[39m.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m1[39m[32m,[39m [93m-[39m[34m2[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt8[39m[90m([39m[34m0[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 1[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt8[39m[90m([39m[34m1[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 254[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt8[39m[90m([39m[34m2[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.readUInt16BE([offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.readUInt16LE([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.5[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 2[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer}[0m

[0mReads an unsigned 16-bit integer from [33mbuf[39m at the specified [33moffset[39m with[0m
[0mthe specified [endianness][] ([33mreadUInt16BE()[39m reads as big endian, [33mreadUInt16LE()[39m[0m
[0mreads as little endian).[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x12[39m[32m,[39m [34m0x34[39m[32m,[39m [34m0x56[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt16BE[39m[90m([39m[34m0[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 1234[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt16LE[39m[90m([39m[34m0[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 3412[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt16BE[39m[90m([39m[34m1[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 3456[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt16LE[39m[90m([39m[34m1[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 5634[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt16LE[39m[90m([39m[34m2[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.readUInt32BE([offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.readUInt32LE([offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.5[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 4[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer}[0m

[0mReads an unsigned 32-bit integer from [33mbuf[39m at the specified [33moffset[39m with[0m
[0mthe specified [endianness][] ([33mreadUInt32BE()[39m reads as big endian,[0m
[0m[33mreadUInt32LE()[39m reads as little endian).[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x12[39m[32m,[39m [34m0x34[39m[32m,[39m [34m0x56[39m[32m,[39m [34m0x78[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt32BE[39m[90m([39m[34m0[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 12345678[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt32LE[39m[90m([39m[34m0[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 78563412[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUInt32LE[39m[90m([39m[34m1[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.readUIntBE(offset, byteLength)[39m[32m[22m[39m

[32m[1m### [33mbuf.readUIntLE(offset, byteLength)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 and `byteLength` to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to read. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - byteLength[39m.[0m
    * [0m[33mbyteLength[39m {integer} Number of bytes to read. Must satisfy[0m
      [0m[33m0 < byteLength <= 6[39m.[0m
    * [0mReturns: {integer}[0m

[0mReads [33mbyteLength[39m number of bytes from [33mbuf[39m at the specified [33moffset[39m[0m
[0mand interprets the result as an unsigned integer. Supports up to 48[0m
[0mbits of accuracy.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x12[39m[32m,[39m [34m0x34[39m[32m,[39m [34m0x56[39m[32m,[39m [34m0x78[39m[32m,[39m [34m0x90[39m[32m,[39m [34m0xab[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUIntBE[39m[90m([39m[34m0[39m[32m,[39m [34m6[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 1234567890ab[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUIntLE[39m[90m([39m[34m0[39m[32m,[39m [34m6[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: ab9078563412[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mreadUIntBE[39m[90m([39m[34m1[39m[32m,[39m [34m6[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[34m16[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Throws ERR_OUT_OF_RANGE.[39m

[32m[1m### [33mbuf.subarray([start[, end]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v3.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstart[39m {integer} Where the new [33mBuffer[39m will start. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mend[39m {integer} Where the new [33mBuffer[39m will end (not inclusive).[0m
      [0m[1mDefault:[22m [[33mbuf.length[39m][].[0m
    * [0mReturns: {Buffer}[0m

[0mReturns a new [33mBuffer[39m that references the same memory as the original, but[0m
[0moffset and cropped by the [33mstart[39m and [33mend[39m indices.[0m

[0mSpecifying [33mend[39m greater than [[33mbuf.length[39m][] will return the same result as[0m
[0mthat of [33mend[39m equal to [[33mbuf.length[39m][].[0m

[0mThis method is inherited from [[33mTypedArray#subarray()[39m][].[0m

[0mModifying the new [33mBuffer[39m slice will modify the memory in the original [33mBuffer[39m[0m
[0mbecause the allocated memory of the two objects overlap.[0m

    [90m// Create a `Buffer` with the ASCII alphabet, take a slice, and modify one byte[39m
    [90m// from the original `Buffer`.[39m
    
    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m26[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m26[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
      [90m// 97 is the decimal ASCII value for 'a'.[39m
      [37mbuf1[39m[33m[[39m[37mi[39m[33m][39m [93m=[39m [37mi[39m [93m+[39m [34m97[39m[90m;[39m
    [33m}[39m
    
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mbuf1[39m[32m.[39m[37msubarray[39m[90m([39m[34m0[39m[32m,[39m [34m3[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mtoString[39m[90m([39m[92m'ascii'[39m[32m,[39m [34m0[39m[32m,[39m [37mbuf2[39m[32m.[39m[37mlength[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: abc[39m
    
    [37mbuf1[39m[33m[[39m[34m0[39m[33m][39m [93m=[39m [34m33[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mtoString[39m[90m([39m[92m'ascii'[39m[32m,[39m [34m0[39m[32m,[39m [37mbuf2[39m[32m.[39m[37mlength[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: !bc[39m

[0mSpecifying negative indexes causes the slice to be generated relative to the[0m
[0mend of [33mbuf[39m rather than the beginning.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'buffer'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37msubarray[39m[90m([39m[93m-[39m[34m6[39m[32m,[39m [93m-[39m[34m1[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: buffe[39m
    [90m// (Equivalent to buf.subarray(0, 5).)[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37msubarray[39m[90m([39m[93m-[39m[34m6[39m[32m,[39m [93m-[39m[34m2[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: buff[39m
    [90m// (Equivalent to buf.subarray(0, 4).)[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37msubarray[39m[90m([39m[93m-[39m[34m5[39m[32m,[39m [93m-[39m[34m2[39m[90m)[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: uff[39m
    [90m// (Equivalent to buf.subarray(1, 4).)[39m

[32m[1m### [33mbuf.slice([start[, end]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90mchanges:[39m
[90m  - version: v7.1.0, v6.9.2[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9341[39m
[90m    description: Coercing the offsets to integers now handles values outside[39m
[90m                 the 32-bit integer range properly.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9101[39m
[90m    description: All offsets are now coerced to integers before doing any[39m
[90m                 calculations with them.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstart[39m {integer} Where the new [33mBuffer[39m will start. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mend[39m {integer} Where the new [33mBuffer[39m will end (not inclusive).[0m
      [0m[1mDefault:[22m [[33mbuf.length[39m][].[0m
    * [0mReturns: {Buffer}[0m

[0mReturns a new [33mBuffer[39m that references the same memory as the original, but[0m
[0moffset and cropped by the [33mstart[39m and [33mend[39m indices.[0m

[0mThis is the same behavior as [33mbuf.subarray()[39m.[0m

[0mThis method is not compatible with the [33mUint8Array.prototype.slice()[39m,[0m
[0mwhich is a superclass of [33mBuffer[39m. To copy the slice, use[0m
[0m[33mUint8Array.prototype.slice()[39m.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'buffer'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcopiedBuf[39m [93m=[39m [37mUint8Array[39m[32m.[39m[37mprototype[39m[32m.[39m[37mslice[39m[32m.[39m[37mcall[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [37mcopiedBuf[39m[33m[[39m[34m0[39m[33m][39m[93m++[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mcopiedBuf[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: cuffer[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: buffer[39m

[32m[1m### [33mbuf.swap16()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Buffer} A reference to [33mbuf[39m.[0m

[0mInterprets [33mbuf[39m as an array of unsigned 16-bit integers and swaps the[0m
[0mbyte order [3min-place[23m. Throws [[33mERR_INVALID_BUFFER_SIZE[39m][] if [[33mbuf.length[39m][][0m
[0mis not a multiple of 2.[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x1[39m[32m,[39m [34m0x2[39m[32m,[39m [34m0x3[39m[32m,[39m [34m0x4[39m[32m,[39m [34m0x5[39m[32m,[39m [34m0x6[39m[32m,[39m [34m0x7[39m[32m,[39m [34m0x8[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 01 02 03 04 05 06 07 08>[39m
    
    [37mbuf1[39m[32m.[39m[37mswap16[39m[90m([39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 02 01 04 03 06 05 08 07>[39m
    
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x1[39m[32m,[39m [34m0x2[39m[32m,[39m [34m0x3[39m[33m][39m[90m)[39m[90m;[39m
    
    [37mbuf2[39m[32m.[39m[37mswap16[39m[90m([39m[90m)[39m[90m;[39m
    [90m// Throws ERR_INVALID_BUFFER_SIZE.[39m

[0mOne convenient use of [33mbuf.swap16()[39m is to perform a fast in-place conversion[0m
[0mbetween UTF-16 little-endian and UTF-16 big-endian:[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'This is little-endian UTF-16'[39m[32m,[39m [92m'utf16le'[39m[90m)[39m[90m;[39m
    [37mbuf[39m[32m.[39m[37mswap16[39m[90m([39m[90m)[39m[90m;[39m [90m// Convert to big-endian UTF-16 text.[39m

[32m[1m### [33mbuf.swap32()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Buffer} A reference to [33mbuf[39m.[0m

[0mInterprets [33mbuf[39m as an array of unsigned 32-bit integers and swaps the[0m
[0mbyte order [3min-place[23m. Throws [[33mERR_INVALID_BUFFER_SIZE[39m][] if [[33mbuf.length[39m][][0m
[0mis not a multiple of 4.[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x1[39m[32m,[39m [34m0x2[39m[32m,[39m [34m0x3[39m[32m,[39m [34m0x4[39m[32m,[39m [34m0x5[39m[32m,[39m [34m0x6[39m[32m,[39m [34m0x7[39m[32m,[39m [34m0x8[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 01 02 03 04 05 06 07 08>[39m
    
    [37mbuf1[39m[32m.[39m[37mswap32[39m[90m([39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 04 03 02 01 08 07 06 05>[39m
    
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x1[39m[32m,[39m [34m0x2[39m[32m,[39m [34m0x3[39m[33m][39m[90m)[39m[90m;[39m
    
    [37mbuf2[39m[32m.[39m[37mswap32[39m[90m([39m[90m)[39m[90m;[39m
    [90m// Throws ERR_INVALID_BUFFER_SIZE.[39m

[32m[1m### [33mbuf.swap64()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Buffer} A reference to [33mbuf[39m.[0m

[0mInterprets [33mbuf[39m as an array of 64-bit numbers and swaps byte order [3min-place[23m.[0m
[0mThrows [[33mERR_INVALID_BUFFER_SIZE[39m][] if [[33mbuf.length[39m][] is not a multiple of 8.[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x1[39m[32m,[39m [34m0x2[39m[32m,[39m [34m0x3[39m[32m,[39m [34m0x4[39m[32m,[39m [34m0x5[39m[32m,[39m [34m0x6[39m[32m,[39m [34m0x7[39m[32m,[39m [34m0x8[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 01 02 03 04 05 06 07 08>[39m
    
    [37mbuf1[39m[32m.[39m[37mswap64[39m[90m([39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 08 07 06 05 04 03 02 01>[39m
    
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x1[39m[32m,[39m [34m0x2[39m[32m,[39m [34m0x3[39m[33m][39m[90m)[39m[90m;[39m
    
    [37mbuf2[39m[32m.[39m[37mswap64[39m[90m([39m[90m)[39m[90m;[39m
    [90m// Throws ERR_INVALID_BUFFER_SIZE.[39m

[32m[1m### [33mbuf.toJSON()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns a JSON representation of [33mbuf[39m. [[33mJSON.stringify()[39m][] implicitly calls[0m
[0mthis function when stringifying a [33mBuffer[39m instance.[0m

[0m[33mBuffer.from()[39m accepts objects in the format returned from this method.[0m
[0mIn particular, [33mBuffer.from(buf.toJSON())[39m works like [33mBuffer.from(buf)[39m.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x1[39m[32m,[39m [34m0x2[39m[32m,[39m [34m0x3[39m[32m,[39m [34m0x4[39m[32m,[39m [34m0x5[39m[33m][39m[90m)[39m[90m;[39m
    [94mconst[39m [37mjson[39m [93m=[39m [37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mjson[39m[90m)[39m[90m;[39m
    [90m// Prints: {"type":"Buffer","data":[1,2,3,4,5]}[39m
    
    [94mconst[39m [37mcopy[39m [93m=[39m [37mJSON[39m[32m.[39m[37mparse[39m[90m([39m[37mjson[39m[32m,[39m [90m([39m[37mkey[39m[32m,[39m [37mvalue[39m[90m)[39m [93m=>[39m [33m{[39m
      [31mreturn[39m [37mvalue[39m [93m&&[39m [37mvalue[39m[32m.[39m[37mtype[39m [93m===[39m [92m'Buffer'[39m [93m?[39m
        [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37mvalue[39m[90m)[39m [93m:[39m
        [37mvalue[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mcopy[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 01 02 03 04 05>[39m

[32m[1m### [33mbuf.toString([encoding[, start[, end]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mencoding[39m {string} The character encoding to use. [1mDefault:[22m [33m'utf8'[39m.[0m
    * [0m[33mstart[39m {integer} The byte offset to start decoding at. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mend[39m {integer} The byte offset to stop decoding at (not inclusive).[0m
      [0m[1mDefault:[22m [[33mbuf.length[39m][].[0m
    * [0mReturns: {string}[0m

[0mDecodes [33mbuf[39m to a string according to the specified character encoding in[0m
[0m[33mencoding[39m. [33mstart[39m and [33mend[39m may be passed to decode only a subset of [33mbuf[39m.[0m

[0mIf [33mencoding[39m is [33m'utf8'[39m and a byte sequence in the input is not valid UTF-8,[0m
[0mthen each invalid byte is replaced with the replacement character [33mU+FFFD[39m.[0m

[0mThe maximum length of a string instance (in UTF-16 code units) is available[0m
[0mas [[33mbuffer.constants.MAX_STRING_LENGTH[39m][].[0m

    [94mconst[39m [37mbuf1[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m26[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m26[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
      [90m// 97 is the decimal ASCII value for 'a'.[39m
      [37mbuf1[39m[33m[[39m[37mi[39m[33m][39m [93m=[39m [37mi[39m [93m+[39m [34m97[39m[90m;[39m
    [33m}[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mtoString[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: abcdefghijklmnopqrstuvwxyz[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf1[39m[32m.[39m[37mtoString[39m[90m([39m[92m'utf8'[39m[32m,[39m [34m0[39m[32m,[39m [34m5[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: abcde[39m
    
    [94mconst[39m [37mbuf2[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'tést'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mtoString[39m[90m([39m[92m'hex'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 74c3a97374[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mtoString[39m[90m([39m[92m'utf8'[39m[32m,[39m [34m0[39m[32m,[39m [34m3[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: té[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf2[39m[32m.[39m[37mtoString[39m[90m([39m[90mundefined[39m[32m,[39m [34m0[39m[32m,[39m [34m3[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: té[39m

[32m[1m### [33mbuf.values()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Iterator}[0m

[0mCreates and returns an [iterator][] for [33mbuf[39m values (bytes). This function is[0m
[0mcalled automatically when a [33mBuffer[39m is used in a [33mfor..of[39m statement.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'buffer'[39m[90m)[39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mconst[39m [37mvalue[39m [37mof[39m [37mbuf[39m[32m.[39m[37mvalues[39m[90m([39m[90m)[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mvalue[39m[90m)[39m[90m;[39m
    [33m}[39m
    [90m// Prints:[39m
    [90m//   98[39m
    [90m//   117[39m
    [90m//   102[39m
    [90m//   102[39m
    [90m//   101[39m
    [90m//   114[39m
    
    [94mfor[39m [90m([39m[94mconst[39m [37mvalue[39m [37mof[39m [37mbuf[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mvalue[39m[90m)[39m[90m;[39m
    [33m}[39m
    [90m// Prints:[39m
    [90m//   98[39m
    [90m//   117[39m
    [90m//   102[39m
    [90m//   102[39m
    [90m//   101[39m
    [90m//   114[39m

[32m[1m### [33mbuf.write(string[, offset[, length]][, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstring[39m {string} String to write to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write [33mstring[39m.[0m
      [0m[1mDefault:[22m [33m0[39m.[0m
    * [0m[33mlength[39m {integer} Maximum number of bytes to write (written bytes will not[0m
      [0mexceed [33mbuf.length - offset[39m). [1mDefault:[22m [33mbuf.length - offset[39m.[0m
    * [0m[33mencoding[39m {string} The character encoding of [33mstring[39m. [1mDefault:[22m [33m'utf8'[39m.[0m
    * [0mReturns: {integer} Number of bytes written.[0m

[0mWrites [33mstring[39m to [33mbuf[39m at [33moffset[39m according to the character encoding in[0m
[0m[33mencoding[39m. The [33mlength[39m parameter is the number of bytes to write. If [33mbuf[39m did[0m
[0mnot contain enough space to fit the entire string, only part of [33mstring[39m will be[0m
[0mwritten. However, partially encoded characters will not be written.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m256[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mlen[39m [93m=[39m [37mbuf[39m[32m.[39m[37mwrite[39m[90m([39m[92m'\u00bd + \u00bc = \u00be'[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mlen[39m} bytes: ${[37mbuf[39m[32m.[39m[37mtoString[39m[90m([39m[92m'utf8'[39m[32m,[39m [34m0[39m[32m,[39m [37mlen[39m[90m)[39m}`[90m)[39m[90m;[39m
    [90m// Prints: 12 bytes: ½ + ¼ = ¾[39m
    
    [94mconst[39m [37mbuffer[39m [93m=[39m [37mBuffer[39m[32m.[39m[37malloc[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mlength[39m [93m=[39m [37mbuffer[39m[32m.[39m[37mwrite[39m[90m([39m[92m'abcd'[39m[32m,[39m [34m8[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mlength[39m} bytes: ${[37mbuffer[39m[32m.[39m[37mtoString[39m[90m([39m[92m'utf8'[39m[32m,[39m [34m8[39m[32m,[39m [34m10[39m[90m)[39m}`[90m)[39m[90m;[39m
    [90m// Prints: 2 bytes : ab[39m

[32m[1m### [33mbuf.writeBigInt64BE(value[, offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.writeBigInt64LE(value[, offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {bigint} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy: [33m0 <= offset <= buf.length - 8[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m with the specified[0m
[0m[endianness][] ([33mwriteBigInt64BE()[39m writes as big endian, [33mwriteBigInt64LE()[39m[0m
[0mwrites as little endian).[0m

[0m[33mvalue[39m is interpreted and written as a two's complement signed integer.[0m

    [33mconst buf = Buffer.allocUnsafe(8);[39m
    [33m[39m
    [33mbuf.writeBigInt64BE(0x0102030405060708n, 0);[39m
    [33m[39m
    [33mconsole.log(buf);[39m
    [33m// Prints: <Buffer 01 02 03 04 05 06 07 08>[39m

[32m[1m### [33mbuf.writeBigUInt64BE(value[, offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.writeBigUInt64LE(value[, offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {bigint} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy: [33m0 <= offset <= buf.length - 8[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m with specified [endianness][][0m
[0m([33mwriteBigUInt64BE()[39m writes as big endian, [33mwriteBigUInt64LE()[39m writes as[0m
[0mlittle endian).[0m

    [33mconst buf = Buffer.allocUnsafe(8);[39m
    [33m[39m
    [33mbuf.writeBigUInt64LE(0xdecafafecacefaden, 0);[39m
    [33m[39m
    [33mconsole.log(buf);[39m
    [33m// Prints: <Buffer de fa ce ca fe fa ca de>[39m

[32m[1m### [33mbuf.writeDoubleBE(value[, offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.writeDoubleLE(value[, offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {number} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 8[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m with the specified[0m
[0m[endianness][] ([33mwriteDoubleBE()[39m writes as big endian, [33mwriteDoubleLE()[39m writes[0m
[0mas little endian). [33mvalue[39m must be a JavaScript number. Behavior is undefined[0m
[0mwhen [33mvalue[39m is anything other than a JavaScript number.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m8[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteDoubleBE[39m[90m([39m[34m123.456[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 40 5e dd 2f 1a 9f be 77>[39m
    
    [37mbuf[39m[32m.[39m[37mwriteDoubleLE[39m[90m([39m[34m123.456[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 77 be 9f 1a 2f dd 5e 40>[39m

[32m[1m### [33mbuf.writeFloatBE(value[, offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.writeFloatLE(value[, offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {number} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 4[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m with specified [endianness][][0m
[0m([33mwriteFloatBE()[39m writes as big endian, [33mwriteFloatLE()[39m writes as little[0m
[0mendian). [33mvalue[39m must be a JavaScript number. Behavior is undefined when[0m
[0m[33mvalue[39m is anything other than a JavaScript number.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m4[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteFloatBE[39m[90m([39m[34m0xcafebabe[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 4f 4a fe bb>[39m
    
    [37mbuf[39m[32m.[39m[37mwriteFloatLE[39m[90m([39m[34m0xcafebabe[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer bb fe 4a 4f>[39m

[0m##[0m

[35m[4m[1m# [33mbuf.writeInt8(value[, offset])[39m[35m[22m[24m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {integer} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 1[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m. [33mvalue[39m must be a valid[0m
[0msigned 8-bit integer. Behavior is undefined when [33mvalue[39m is anything other than[0m
[0ma signed 8-bit integer.[0m

[0m[33mvalue[39m is interpreted and written as a two's complement signed integer.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m2[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteInt8[39m[90m([39m[34m2[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    [37mbuf[39m[32m.[39m[37mwriteInt8[39m[90m([39m[93m-[39m[34m2[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 02 fe>[39m

[32m[1m### [33mbuf.writeInt16BE(value[, offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.writeInt16LE(value[, offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.5[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {integer} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 2[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m with the specified[0m
[0m[34mendianness ([34m[4mhttps://en.wikipedia.org/wiki/Endianness[24m[39m[34m)[39m ([33mwriteInt16BE()[39m writes as big endian, [33mwriteInt16LE()[39m writes[0m
[0mas little endian). [33mvalue[39m must be a valid signed 16-bit integer. Behavior is[0m
[0mundefined when [33mvalue[39m is anything other than a signed 16-bit integer.[0m

[0m[33mvalue[39m is interpreted and written as a two's complement signed integer.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m4[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteInt16BE[39m[90m([39m[34m0x0102[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    [37mbuf[39m[32m.[39m[37mwriteInt16LE[39m[90m([39m[34m0x0304[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 01 02 04 03>[39m

[32m[1m### [33mbuf.writeInt32BE(value[, offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.writeInt32LE(value[, offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.5[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {integer} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 4[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m with the specified[0m
[0m[34mendianness ([34m[4mhttps://en.wikipedia.org/wiki/Endianness[24m[39m[34m)[39m ([33mwriteInt32BE()[39m writes aS big endian, [33mwriteInt32LE()[39m writes[0m
[0mas little endian). [33mvalue[39m must be a valid signed 32-bit integer. Behavior is[0m
[0mundefined when [33mvalue[39m is anything other than a signed 32-bit integer.[0m

[0m[33mvalue[39m is interpreted and written as a two's complement signed integer.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m8[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteInt32BE[39m[90m([39m[34m0x01020304[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    [37mbuf[39m[32m.[39m[37mwriteInt32LE[39m[90m([39m[34m0x05060708[39m[32m,[39m [34m4[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 01 02 03 04 08 07 06 05>[39m

[32m[1m### [33mbuf.writeIntBE(value, offset, byteLength)[39m[32m[22m[39m

[32m[1m### [33mbuf.writeIntLE(value, offset, byteLength)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 and `byteLength` to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {integer} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - byteLength[39m.[0m
    * [0m[33mbyteLength[39m {integer} Number of bytes to write. Must satisfy[0m
      [0m[33m0 < byteLength <= 6[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mbyteLength[39m bytes of [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m.[0m
[0mSupports up to 48 bits of accuracy. Behavior is undefined when [33mvalue[39m is[0m
[0manything other than a signed integer.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m6[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteIntBE[39m[90m([39m[34m0x1234567890ab[39m[32m,[39m [34m0[39m[32m,[39m [34m6[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 12 34 56 78 90 ab>[39m
    
    [37mbuf[39m[32m.[39m[37mwriteIntLE[39m[90m([39m[34m0x1234567890ab[39m[32m,[39m [34m0[39m[32m,[39m [34m6[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer ab 90 78 56 34 12>[39m

[32m[1m### [33mbuf.writeUInt8(value[, offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {integer} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 1[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m. [33mvalue[39m must be a[0m
[0mvalid unsigned 8-bit integer. Behavior is undefined when [33mvalue[39m is anything[0m
[0mother than an unsigned 8-bit integer.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m4[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteUInt8[39m[90m([39m[34m0x3[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    [37mbuf[39m[32m.[39m[37mwriteUInt8[39m[90m([39m[34m0x4[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
    [37mbuf[39m[32m.[39m[37mwriteUInt8[39m[90m([39m[34m0x23[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    [37mbuf[39m[32m.[39m[37mwriteUInt8[39m[90m([39m[34m0x42[39m[32m,[39m [34m3[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 03 04 23 42>[39m

[32m[1m### [33mbuf.writeUInt16BE(value[, offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.writeUInt16LE(value[, offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.5[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {integer} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 2[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m with the specified[0m
[0m[34mendianness ([34m[4mhttps://en.wikipedia.org/wiki/Endianness[24m[39m[34m)[39m ([33mwriteUInt16BE()[39m writes as big endian, [33mwriteUInt16LE()[39m writes[0m
[0mas little endian). [33mvalue[39m must be a valid unsigned 16-bit integer. Behavior is[0m
[0mundefined when [33mvalue[39m is anything other than an unsigned 16-bit integer.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m4[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteUInt16BE[39m[90m([39m[34m0xdead[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    [37mbuf[39m[32m.[39m[37mwriteUInt16BE[39m[90m([39m[34m0xbeef[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer de ad be ef>[39m
    
    [37mbuf[39m[32m.[39m[37mwriteUInt16LE[39m[90m([39m[34m0xdead[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    [37mbuf[39m[32m.[39m[37mwriteUInt16LE[39m[90m([39m[34m0xbeef[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer ad de ef be>[39m

[32m[1m### [33mbuf.writeUInt32BE(value[, offset])[39m[32m[22m[39m

[32m[1m### [33mbuf.writeUInt32LE(value[, offset])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.5[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {integer} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - 4[39m. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m with the specified[0m
[0m[34mendianness ([34m[4mhttps://en.wikipedia.org/wiki/Endianness[24m[39m[34m)[39m ([33mwriteUInt32BE()[39m writes as big endian, [33mwriteUInt32LE()[39m writes[0m
[0mas little endian). [33mvalue[39m must be a valid unsigned 32-bit integer. Behavior is[0m
[0mundefined when [33mvalue[39m is anything other than an unsigned 32-bit integer.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m4[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteUInt32BE[39m[90m([39m[34m0xfeedface[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer fe ed fa ce>[39m
    
    [37mbuf[39m[32m.[39m[37mwriteUInt32LE[39m[90m([39m[34m0xfeedface[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer ce fa ed fe>[39m

[32m[1m### [33mbuf.writeUIntBE(value, offset, byteLength)[39m[32m[22m[39m

[32m[1m### [33mbuf.writeUIntLE(value, offset, byteLength)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.5[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18395[39m
[90m    description: Removed `noAssert` and no implicit coercion of the offset[39m
[90m                 and `byteLength` to `uint32` anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {integer} Number to be written to [33mbuf[39m.[0m
    * [0m[33moffset[39m {integer} Number of bytes to skip before starting to write. Must[0m
      [0msatisfy [33m0 <= offset <= buf.length - byteLength[39m.[0m
    * [0m[33mbyteLength[39m {integer} Number of bytes to write. Must satisfy[0m
      [0m[33m0 < byteLength <= 6[39m.[0m
    * [0mReturns: {integer} [33moffset[39m plus the number of bytes written.[0m

[0mWrites [33mbyteLength[39m bytes of [33mvalue[39m to [33mbuf[39m at the specified [33moffset[39m.[0m
[0mSupports up to 48 bits of accuracy. Behavior is undefined when [33mvalue[39m is[0m
[0manything other than an unsigned integer.[0m

    [94mconst[39m [37mbuf[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mallocUnsafe[39m[90m([39m[34m6[39m[90m)[39m[90m;[39m
    
    [37mbuf[39m[32m.[39m[37mwriteUIntBE[39m[90m([39m[34m0x1234567890ab[39m[32m,[39m [34m0[39m[32m,[39m [34m6[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 12 34 56 78 90 ab>[39m
    
    [37mbuf[39m[32m.[39m[37mwriteUIntLE[39m[90m([39m[34m0x1234567890ab[39m[32m,[39m [34m0[39m[32m,[39m [34m6[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer ab 90 78 56 34 12>[39m

[32m[1m### [33mnew Buffer(array)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v6.0.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19524[39m
[90m    description: Calling this constructor emits a deprecation warning when[39m
[90m                 run from code outside the `node_modules` directory.[39m
[90m  - version: v7.2.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9529[39m
[90m    description: Calling this constructor no longer emits a deprecation warning.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8169[39m
[90m    description: Calling this constructor emits a deprecation warning now.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mBuffer.from(array)[39m[90m[34m ([34m[4m#buffer_class_method_buffer_from_array[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m[33marray[39m {integer[]} An array of bytes to copy from.[0m

[0mSee [34m[33mBuffer.from(array)[39m[34m ([34m[4m#buffer_class_method_buffer_from_array[24m[39m[34m)[39m.[0m

[32m[1m### [33mnew Buffer(arrayBuffer[, byteOffset[, length]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v3.0.0[39m
[90mdeprecated: v6.0.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19524[39m
[90m    description: Calling this constructor emits a deprecation warning when[39m
[90m                 run from code outside the `node_modules` directory.[39m
[90m  - version: v7.2.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9529[39m
[90m    description: Calling this constructor no longer emits a deprecation warning.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8169[39m
[90m    description: Calling this constructor emits a deprecation warning now.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4682[39m
[90m    description: The `byteOffset` and `length` parameters are supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use[0m[23m[39m
[90m[3m    [0m[34m[33mBuffer.from(arrayBuffer[, byteOffset[, length]])[39m[90m[34m ([34m[4m#buffer_class_method_buffer_from_arraybuffer_byteoffset_length[24m[39m[90m[34m)[39m[90m[0m[23m[39m
[90m[3m    [0minstead.[0m[23m[39m

    * [0m[33marrayBuffer[39m {ArrayBuffer|SharedArrayBuffer} An [34m[33mArrayBuffer[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer[24m[39m[34m)[39m,[0m
      [0m[34m[33mSharedArrayBuffer[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer[24m[39m[34m)[39m or the [33m.buffer[39m property of a [34m[33mTypedArray[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray[24m[39m[34m)[39m.[0m
    * [0m[33mbyteOffset[39m {integer} Index of first byte to expose. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mlength[39m {integer} Number of bytes to expose.[0m
      [0m[1mDefault:[22m [33marrayBuffer.byteLength - byteOffset[39m.[0m

[0mSee[0m
[0m[34m[33mBuffer.from(arrayBuffer[, byteOffset[, length]])[39m[34m ([34m[4m#buffer_class_method_buffer_from_arraybuffer_byteoffset_length[24m[39m[34m)[39m.[0m

[32m[1m### [33mnew Buffer(buffer)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v6.0.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19524[39m
[90m    description: Calling this constructor emits a deprecation warning when[39m
[90m                 run from code outside the `node_modules` directory.[39m
[90m  - version: v7.2.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9529[39m
[90m    description: Calling this constructor no longer emits a deprecation warning.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8169[39m
[90m    description: Calling this constructor emits a deprecation warning now.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mBuffer.from(buffer)[39m[90m[34m ([34m[4m#buffer_class_method_buffer_from_buffer[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m[33mbuffer[39m {Buffer|Uint8Array} An existing [33mBuffer[39m or [34m[33mUint8Array[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array[24m[39m[34m)[39m from[0m
      [0mwhich to copy data.[0m

[0mSee [34m[33mBuffer.from(buffer)[39m[34m ([34m[4m#buffer_class_method_buffer_from_buffer[24m[39m[34m)[39m.[0m

[32m[1m### [33mnew Buffer(size)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v6.0.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19524[39m
[90m    description: Calling this constructor emits a deprecation warning when[39m
[90m                 run from code outside the `node_modules` directory.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12141[39m
[90m    description: The `new Buffer(size)` will return zero-filled memory by[39m
[90m                 default.[39m
[90m  - version: v7.2.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9529[39m
[90m    description: Calling this constructor no longer emits a deprecation warning.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8169[39m
[90m    description: Calling this constructor emits a deprecation warning now.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mBuffer.alloc()[39m[90m[34m ([34m[4m#buffer_class_method_buffer_alloc_size_fill_encoding[24m[39m[90m[34m)[39m[90m instead (also see[0m[23m[39m
[90m[3m    [0m[34m[33mBuffer.allocUnsafe()[39m[90m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[90m[34m)[39m[90m).[0m[23m[39m

    * [0m[33msize[39m {integer} The desired length of the new [33mBuffer[39m.[0m

[0mSee [34m[33mBuffer.alloc()[39m[34m ([34m[4m#buffer_class_method_buffer_alloc_size_fill_encoding[24m[39m[34m)[39m and [34m[33mBuffer.allocUnsafe()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m. This variant of the[0m
[0mconstructor is equivalent to [34m[33mBuffer.allocUnsafe()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m, although using[0m
[0m[34m[33mBuffer.alloc()[39m[34m ([34m[4m#buffer_class_method_buffer_alloc_size_fill_encoding[24m[39m[34m)[39m is recommended in code paths that are not critical to[0m
[0mperformance.[0m

[32m[1m### [33mnew Buffer(string[, encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v6.0.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19524[39m
[90m    description: Calling this constructor emits a deprecation warning when[39m
[90m                 run from code outside the `node_modules` directory.[39m
[90m  - version: v7.2.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9529[39m
[90m    description: Calling this constructor no longer emits a deprecation warning.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8169[39m
[90m    description: Calling this constructor emits a deprecation warning now.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated:[0m[23m[39m
[90m[3m    [0mUse [34m[33mBuffer.from(string[, encoding])[39m[90m[34m ([34m[4m#buffer_class_method_buffer_from_string_encoding[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m[33mstring[39m {string} String to encode.[0m
    * [0m[33mencoding[39m {string} The encoding of [33mstring[39m. [1mDefault:[22m [33m'utf8'[39m.[0m

[0mSee [34m[33mBuffer.from(string[, encoding])[39m[34m ([34m[4m#buffer_class_method_buffer_from_string_encoding[24m[39m[34m)[39m.[0m

[32m[1m## [33mbuffer.INSPECT_MAX_BYTES[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer} [1mDefault:[22m [33m50[39m[0m

[0mReturns the maximum number of bytes that will be returned when[0m
[0m[33mbuf.inspect()[39m is called. This can be overridden by user modules. See[0m
[0m[34m[33mutil.inspect()[39m[34m ([34m[4mutil.html#util_util_inspect_object_options[24m[39m[34m)[39m for more details on [33mbuf.inspect()[39m behavior.[0m

[0mThis is a property on the [33mbuffer[39m module returned by[0m
[0m[33mrequire('buffer')[39m, not on the [33mBuffer[39m global or a [33mBuffer[39m instance.[0m

[32m[1m## [33mbuffer.kMaxLength[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v3.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer} The largest size allowed for a single [33mBuffer[39m instance.[0m

[0mAn alias for [34m[33mbuffer.constants.MAX_LENGTH[39m[34m ([34m[4m#buffer_buffer_constants_max_length[24m[39m[34m)[39m.[0m

[0mThis is a property on the [33mbuffer[39m module returned by[0m
[0m[33mrequire('buffer')[39m, not on the [33mBuffer[39m global or a [33mBuffer[39m instance.[0m

[32m[1m## [33mbuffer.transcode(source, fromEnc, toEnc)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.1.0[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10236[39m
[90m    description: The `source` parameter can now be a `Uint8Array`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msource[39m {Buffer|Uint8Array} A [33mBuffer[39m or [33mUint8Array[39m instance.[0m
    * [0m[33mfromEnc[39m {string} The current encoding.[0m
    * [0m[33mtoEnc[39m {string} To target encoding.[0m
    * [0mReturns: {Buffer}[0m

[0mRe-encodes the given [33mBuffer[39m or [33mUint8Array[39m instance from one character[0m
[0mencoding to another. Returns a new [33mBuffer[39m instance.[0m

[0mThrows if the [33mfromEnc[39m or [33mtoEnc[39m specify invalid character encodings or if[0m
[0mconversion from [33mfromEnc[39m to [33mtoEnc[39m is not permitted.[0m

[0mEncodings supported by [33mbuffer.transcode()[39m are: [33m'ascii'[39m, [33m'utf8'[39m,[0m
[0m[33m'utf16le'[39m, [33m'ucs2'[39m, [33m'latin1'[39m, and [33m'binary'[39m.[0m

[0mThe transcoding process will use substitution characters if a given byte[0m
[0msequence cannot be adequately represented in the target encoding. For instance:[0m

    [94mconst[39m [37mbuffer[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/buffer'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mnewBuf[39m [93m=[39m [37mbuffer[39m[32m.[39m[37mtranscode[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'€'[39m[90m)[39m[32m,[39m [92m'utf8'[39m[32m,[39m [92m'ascii'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mnewBuf[39m[32m.[39m[37mtoString[39m[90m([39m[92m'ascii'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: '?'[39m

[0mBecause the Euro ([33m€[39m) sign is not representable in US-ASCII, it is replaced[0m
[0mwith [33m?[39m in the transcoded [33mBuffer[39m.[0m

[0mThis is a property on the [33mbuffer[39m module returned by[0m
[0m[33mrequire('buffer')[39m, not on the [33mBuffer[39m global or a [33mBuffer[39m instance.[0m

[32m[1m## Class: [33mSlowBuffer[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mBuffer.allocUnsafeSlow()[39m[90m[34m ([34m[4m#buffer_class_method_buffer_allocunsafeslow_size[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

[0mSee [34m[33mBuffer.allocUnsafeSlow()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafeslow_size[24m[39m[34m)[39m. This was never a class in the sense that[0m
[0mthe constructor always returned a [33mBuffer[39m instance, rather than a [33mSlowBuffer[39m[0m
[0minstance.[0m

[32m[1m### [33mnew SlowBuffer(size)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mBuffer.allocUnsafeSlow()[39m[90m[34m ([34m[4m#buffer_class_method_buffer_allocunsafeslow_size[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m[33msize[39m {integer} The desired length of the new [33mSlowBuffer[39m.[0m

[0mSee [34m[33mBuffer.allocUnsafeSlow()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafeslow_size[24m[39m[34m)[39m.[0m

[32m[1m## Buffer Constants[22m[39m

[90m<!-- YAML[39m
[90madded: v8.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0m[33mbuffer.constants[39m is a property on the [33mbuffer[39m module returned by[0m
[0m[33mrequire('buffer')[39m, not on the [33mBuffer[39m global or a [33mBuffer[39m instance.[0m

[32m[1m### [33mbuffer.constants.MAX_LENGTH[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer} The largest size allowed for a single [33mBuffer[39m instance.[0m

[0mOn 32-bit architectures, this value currently is [33m(2^30)-1[39m ([2m[90m[9m1GB).[29m[39m[22m[0m
[0m[2m[90m[9mOn 64-bit architectures, this value currently is [33m(2^31)-1[39m[90m ([29m[39m[22m2GB).[0m

[0mThis value is also available as [34m[33mbuffer.kMaxLength[39m[34m ([34m[4m#buffer_buffer_kmaxlength[24m[39m[34m)[39m.[0m

[32m[1m### [33mbuffer.constants.MAX_STRING_LENGTH[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer} The largest length allowed for a single [33mstring[39m instance.[0m

[0mRepresents the largest [33mlength[39m that a [33mstring[39m primitive can have, counted[0m
[0min UTF-16 code units.[0m

[0mThis value may depend on the JS engine that is being used.[0m

[32m[1m## [33mBuffer.from()[39m[32m, [33mBuffer.alloc()[39m[32m, and [33mBuffer.allocUnsafe()[39m[32m[22m[39m

[0mIn versions of Node.js prior to 6.0.0, [33mBuffer[39m instances were created using the[0m
[0m[33mBuffer[39m constructor function, which allocates the returned [33mBuffer[39m[0m
[0mdifferently based on what arguments are provided:[0m

    * [0mPassing a number as the first argument to [33mBuffer()[39m (e.g. [33mnew Buffer(10)[39m)[0m
      [0mallocates a new [33mBuffer[39m object of the specified size. Prior to Node.js 8.0.0,[0m
      [0mthe memory allocated for such [33mBuffer[39m instances is [3mnot[23m initialized and[0m
      [0m[3mcan contain sensitive data*. Such [33mBuffer[39m instances *must[23m be subsequently[0m
      [0minitialized by using either [34m[33mbuf.fill(0)[39m[34m ([34m[4m#buffer_buf_fill_value_offset_end_encoding[24m[39m[34m)[39m or by writing to the[0m
      [0mentire [33mBuffer[39m before reading data from the [33mBuffer[39m.[0m
      [0mWhile this behavior is [3mintentional[23m to improve performance,[0m
      [0mdevelopment experience has demonstrated that a more explicit distinction is[0m
      [0mrequired between creating a fast-but-uninitialized [33mBuffer[39m versus creating a[0m
      [0mslower-but-safer [33mBuffer[39m. Since Node.js 8.0.0, [33mBuffer(num)[39m and `new[0m
      [0mBuffer(num)[33mreturn a[39mBuffer` with initialized memory.[0m
    * [0mPassing a string, array, or [33mBuffer[39m as the first argument copies the[0m
      [0mpassed object's data into the [33mBuffer[39m.[0m
    * [0mPassing an [34m[33mArrayBuffer[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer[24m[39m[34m)[39m or a [34m[33mSharedArrayBuffer[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer[24m[39m[34m)[39m returns a [33mBuffer[39m[0m
      [0mthat shares allocated memory with the given array buffer.[0m

[0mBecause the behavior of [33mnew Buffer()[39m is different depending on the type of the[0m
[0mfirst argument, security and reliability issues can be inadvertently introduced[0m
[0minto applications when argument validation or [33mBuffer[39m initialization is not[0m
[0mperformed.[0m

[0mFor example, if an attacker can cause an application to receive a number where[0m
[0ma string is expected, the application may call [33mnew Buffer(100)[39m[0m
[0minstead of [33mnew Buffer("100")[39m, leading it to allocate a 100 byte buffer instead[0m
[0mof allocating a 3 byte buffer with content [33m"100"[39m. This is commonly possible[0m
[0musing JSON API calls. Since JSON distinguishes between numeric and string types,[0m
[0mit allows injection of numbers where a naively written application that does not[0m
[0mvalidate its input sufficiently might expect to always receive a string.[0m
[0mBefore Node.js 8.0.0, the 100 byte buffer might contain[0m
[0marbitrary pre-existing in-memory data, so may be used to expose in-memory[0m
[0msecrets to a remote attacker.  Since Node.js 8.0.0, exposure of memory cannot[0m
[0moccur because the data is zero-filled. However, other attacks are still[0m
[0mpossible, such as causing very large buffers to be allocated by the server,[0m
[0mleading to performance degradation or crashing on memory exhaustion.[0m

[0mTo make the creation of [33mBuffer[39m instances more reliable and less error-prone,[0m
[0mthe various forms of the [33mnew Buffer()[39m constructor have been [1mdeprecated[22m[0m
[0mand replaced by separate [33mBuffer.from()[39m, [34m[33mBuffer.alloc()[39m[34m ([34m[4m#buffer_class_method_buffer_alloc_size_fill_encoding[24m[39m[34m)[39m, and[0m
[0m[34m[33mBuffer.allocUnsafe()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m methods.[0m

[0m[3mDevelopers should migrate all existing uses of the [33mnew Buffer()[39m constructors[23m[0m
[0m[3mto one of these new APIs.[23m[0m

    * [0m[34m[33mBuffer.from(array)[39m[34m ([34m[4m#buffer_class_method_buffer_from_array[24m[39m[34m)[39m returns a new [33mBuffer[39m that [3mcontains a copy[23m of the[0m
      [0mprovided octets.[0m
    * [0m[34m[33mBuffer.from(arrayBuffer[, byteOffset[, length]])[39m[34m ([34m[4m#buffer_class_method_buffer_from_arraybuffer_byteoffset_length[24m[39m[34m)[39m[0m
      [0mreturns a new [33mBuffer[39m that [3mshares the same allocated memory[23m as the given[0m
      [0m[34m[33mArrayBuffer[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer[24m[39m[34m)[39m.[0m
    * [0m[34m[33mBuffer.from(buffer)[39m[34m ([34m[4m#buffer_class_method_buffer_from_buffer[24m[39m[34m)[39m returns a new [33mBuffer[39m that [3mcontains a copy[23m of the[0m
      [0mcontents of the given [33mBuffer[39m.[0m
    * [0m[34m[33mBuffer.from(string[, encoding])[39m[34m ([34m[4m#buffer_class_method_buffer_from_string_encoding[24m[39m[34m)[39m returns a new[0m
      [0m[33mBuffer[39m that [3mcontains a copy[23m of the provided string.[0m
    * [0m[34m[33mBuffer.alloc(size[, fill[, encoding]])[39m[34m ([34m[4m#buffer_class_method_buffer_alloc_size_fill_encoding[24m[39m[34m)[39m returns a new[0m
      [0minitialized [33mBuffer[39m of the specified size. This method is slower than[0m
      [0m[34m[33mBuffer.allocUnsafe(size)[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m but guarantees that newly[0m
      [0mcreated [33mBuffer[39m instances never contain old data that is potentially[0m
      [0msensitive. A [33mTypeError[39m will be thrown if [33msize[39m is not a number.[0m
    * [0m[34m[33mBuffer.allocUnsafe(size)[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m and[0m
      [0m[34m[33mBuffer.allocUnsafeSlow(size)[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafeslow_size[24m[39m[34m)[39m each return a[0m
      [0mnew uninitialized [33mBuffer[39m of the specified [33msize[39m. Because the [33mBuffer[39m is[0m
      [0muninitialized, the allocated segment of memory might contain old data that is[0m
      [0mpotentially sensitive.[0m

[0m[33mBuffer[39m instances returned by [34m[33mBuffer.allocUnsafe()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m [3mmay[23m be allocated off[0m
[0ma shared internal memory pool if [33msize[39m is less than or equal to half[0m
[0m[34m[33mBuffer.poolSize[39m[34m ([34m[4m#buffer_class_property_buffer_poolsize[24m[39m[34m)[39m. Instances returned by [34m[33mBuffer.allocUnsafeSlow()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafeslow_size[24m[39m[34m)[39m[0m
[0m[3mnever[23m use the shared internal memory pool.[0m

[32m[1m### The [33m--zero-fill-buffers[39m[32m command line option[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mNode.js can be started using the [33m--zero-fill-buffers[39m command line option to[0m
[0mcause all newly-allocated [33mBuffer[39m instances to be zero-filled upon creation by[0m
[0mdefault. Without the option, buffers created with [34m[33mBuffer.allocUnsafe()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m,[0m
[0m[34m[33mBuffer.allocUnsafeSlow()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafeslow_size[24m[39m[34m)[39m, and [33mnew SlowBuffer(size)[39m are not zero-filled.[0m
[0mUse of this flag can have a measurable negative impact on performance. Use the[0m
[0m[33m--zero-fill-buffers[39m option only when necessary to enforce that newly allocated[0m
[0m[33mBuffer[39m instances cannot contain old data that is potentially sensitive.[0m

    [33m$ node --zero-fill-buffers[39m
    [33m> Buffer.allocUnsafe(5);[39m
    [33m<Buffer 00 00 00 00 00>[39m

[32m[1m### What makes [33mBuffer.allocUnsafe()[39m[32m and [33mBuffer.allocUnsafeSlow()[39m[32m "unsafe"?[22m[39m

[0mWhen calling [34m[33mBuffer.allocUnsafe()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m and [34m[33mBuffer.allocUnsafeSlow()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafeslow_size[24m[39m[34m)[39m, the[0m
[0msegment of allocated memory is [3muninitialized[23m (it is not zeroed-out). While[0m
[0mthis design makes the allocation of memory quite fast, the allocated segment of[0m
[0mmemory might contain old data that is potentially sensitive. Using a [33mBuffer[39m[0m
[0mcreated by [34m[33mBuffer.allocUnsafe()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m without [3mcompletely[23m overwriting the[0m
[0mmemory can allow this old data to be leaked when the [33mBuffer[39m memory is read.[0m

[0mWhile there are clear performance advantages to using[0m
[0m[34m[33mBuffer.allocUnsafe()[39m[34m ([34m[4m#buffer_class_method_buffer_allocunsafe_size[24m[39m[34m)[39m, extra care [3mmust[23m be taken in order to avoid[0m
[0mintroducing security vulnerabilities into an application.[0m

