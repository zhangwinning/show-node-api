[35m[4m[1m# String Decoder[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mstring_decoder[39m module provides an API for decoding [33mBuffer[39m objects into[0m
[0mstrings in a manner that preserves encoded multi-byte UTF-8 and UTF-16[0m
[0mcharacters. It can be accessed using:[0m

    [94mconst[39m [33m{[39m [37mStringDecoder[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/string_decoder'[39m[90m)[39m[90m;[39m

[0mThe following example shows the basic use of the [33mStringDecoder[39m class.[0m

    [94mconst[39m [33m{[39m [37mStringDecoder[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/string_decoder'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mdecoder[39m [93m=[39m [31mnew[39m [37mStringDecoder[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcent[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0xC2[39m[32m,[39m [34m0xA2[39m[33m][39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdecoder[39m[32m.[39m[37mwrite[39m[90m([39m[37mcent[39m[90m)[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37meuro[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0xE2[39m[32m,[39m [34m0x82[39m[32m,[39m [34m0xAC[39m[33m][39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdecoder[39m[32m.[39m[37mwrite[39m[90m([39m[37meuro[39m[90m)[39m[90m)[39m[90m;[39m

[0mWhen a [33mBuffer[39m instance is written to the [33mStringDecoder[39m instance, an[0m
[0minternal buffer is used to ensure that the decoded string does not contain[0m
[0many incomplete multibyte characters. These are held in the buffer until the[0m
[0mnext call to [33mstringDecoder.write()[39m or until [33mstringDecoder.end()[39m is called.[0m

[0mIn the following example, the three UTF-8 encoded bytes of the European Euro[0m
[0msymbol ([33m€[39m) are written over three separate operations:[0m

    [94mconst[39m [33m{[39m [37mStringDecoder[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/string_decoder'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mdecoder[39m [93m=[39m [31mnew[39m [37mStringDecoder[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
    
    [37mdecoder[39m[32m.[39m[37mwrite[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0xE2[39m[33m][39m[90m)[39m[90m)[39m[90m;[39m
    [37mdecoder[39m[32m.[39m[37mwrite[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0x82[39m[33m][39m[90m)[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdecoder[39m[32m.[39m[37mend[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[33m[[39m[34m0xAC[39m[33m][39m[90m)[39m[90m)[39m[90m)[39m[90m;[39m

[32m[1m## Class: [33mStringDecoder[39m[32m[22m[39m

[32m[1m### [33mnew StringDecoder([encoding])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mencoding[39m {string} The character [34mencoding ([34m[4mbuffer.html#buffer_buffers_and_character_encodings[24m[39m[34m)[39m the [33mStringDecoder[39m will use.[0m
      [0m[1mDefault:[22m [33m'utf8'[39m.[0m

[0mCreates a new [33mStringDecoder[39m instance.[0m

[32m[1m### [33mstringDecoder.end([buffer])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView} A [33mBuffer[39m, or [33mTypedArray[39m, or[0m
      [0m[33mDataView[39m containing the bytes to decode.[0m
    * [0mReturns: {string}[0m

[0mReturns any remaining input stored in the internal buffer as a string. Bytes[0m
[0mrepresenting incomplete UTF-8 and UTF-16 characters will be replaced with[0m
[0msubstitution characters appropriate for the character encoding.[0m

[0mIf the [33mbuffer[39m argument is provided, one final call to [33mstringDecoder.write()[39m[0m
[0mis performed before returning the remaining input.[0m

[32m[1m### [33mstringDecoder.write(buffer)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.99[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/9618[39m
[90m    description: Each invalid character is now replaced by a single replacement[39m
[90m                 character instead of one for each individual byte.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView} A [33mBuffer[39m, or [33mTypedArray[39m, or[0m
      [0m[33mDataView[39m containing the bytes to decode.[0m
    * [0mReturns: {string}[0m

[0mReturns a decoded string, ensuring that any incomplete multibyte characters at[0m
[0m the end of the [33mBuffer[39m, or [33mTypedArray[39m, or [33mDataView[39m are omitted from the[0m
[0m returned string and stored in an internal buffer for the next call to[0m
[0m [33mstringDecoder.write()[39m or [33mstringDecoder.end()[39m.[0m

