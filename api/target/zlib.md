[35m[4m[1m# Zlib[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mzlib[39m module provides compression functionality implemented using Gzip,[0m
[0mDeflate/Inflate, and Brotli.[0m

[0mTo access it:[0m

    [94mconst[39m [37mzlib[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/zlib'[39m[90m)[39m[90m;[39m

[0mCompression and decompression are built around the Node.js [34mStreams API ([34m[4mstream.md[24m[39m[34m)[39m.[0m

[0mCompressing or decompressing a stream (such as a file) can be accomplished by[0m
[0mpiping the source stream through a [33mzlib[39m [33mTransform[39m stream into a destination[0m
[0mstream:[0m

    [94mconst[39m [33m{[39m [37mcreateGzip[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/zlib'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mpipeline[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m
      [37mcreateReadStream[39m[32m,[39m
      [37mcreateWriteStream[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mgzip[39m [93m=[39m [37mcreateGzip[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37msource[39m [93m=[39m [37mcreateReadStream[39m[90m([39m[92m'input.txt'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mdestination[39m [93m=[39m [37mcreateWriteStream[39m[90m([39m[92m'input.txt.gz'[39m[90m)[39m[90m;[39m
    
    [37mpipeline[39m[90m([39m[37msource[39m[32m,[39m [37mgzip[39m[32m,[39m [37mdestination[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'An error occurred:'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
        [37mprocess[39m[32m.[39m[37mexitCode[39m [93m=[39m [34m1[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Or, Promisified[39m
    
    [94mconst[39m [33m{[39m [37mpromisify[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mpipe[39m [93m=[39m [37mpromisify[39m[90m([39m[37mpipeline[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mdo_gzip[39m[90m([39m[37minput[39m[32m,[39m [37moutput[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mgzip[39m [93m=[39m [37mcreateGzip[39m[90m([39m[90m)[39m[90m;[39m
      [94mconst[39m [37msource[39m [93m=[39m [37mcreateReadStream[39m[90m([39m[37minput[39m[90m)[39m[90m;[39m
      [94mconst[39m [37mdestination[39m [93m=[39m [37mcreateWriteStream[39m[90m([39m[37moutput[39m[90m)[39m[90m;[39m
      [37mawait[39m [37mpipe[39m[90m([39m[37msource[39m[32m,[39m [37mgzip[39m[32m,[39m [37mdestination[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [37mdo_gzip[39m[90m([39m[92m'input.txt'[39m[32m,[39m [92m'input.txt.gz'[39m[90m)[39m
      [32m.[39m[36mcatch[39m[90m([39m[90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'An error occurred:'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
        [37mprocess[39m[32m.[39m[37mexitCode[39m [93m=[39m [34m1[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m

[0mIt is also possible to compress or decompress data in a single step:[0m

    [94mconst[39m [33m{[39m [37mdeflate[39m[32m,[39m [37munzip[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/zlib'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37minput[39m [93m=[39m [92m'.................................'[39m[90m;[39m
    [37mdeflate[39m[90m([39m[37minput[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mbuffer[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'An error occurred:'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
        [37mprocess[39m[32m.[39m[37mexitCode[39m [93m=[39m [34m1[39m[90m;[39m
      [33m}[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuffer[39m[32m.[39m[37mtoString[39m[90m([39m[92m'base64'[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mbuffer[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'eJzT0yMAAGTvBe8='[39m[32m,[39m [92m'base64'[39m[90m)[39m[90m;[39m
    [37munzip[39m[90m([39m[37mbuffer[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mbuffer[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'An error occurred:'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
        [37mprocess[39m[32m.[39m[37mexitCode[39m [93m=[39m [34m1[39m[90m;[39m
      [33m}[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuffer[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Or, Promisified[39m
    
    [94mconst[39m [33m{[39m [37mpromisify[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mdo_unzip[39m [93m=[39m [37mpromisify[39m[90m([39m[37munzip[39m[90m)[39m[90m;[39m
    
    [37mdo_unzip[39m[90m([39m[37mbuffer[39m[90m)[39m
      [32m.[39m[37mthen[39m[90m([39m[90m([39m[37mbuf[39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuf[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m)[39m
      [32m.[39m[36mcatch[39m[90m([39m[90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'An error occurred:'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
        [37mprocess[39m[32m.[39m[37mexitCode[39m [93m=[39m [34m1[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Threadpool Usage and Performance Considerations[22m[39m

[0mAll [33mzlib[39m APIs, except those that are explicitly synchronous, use the Node.js[0m
[0minternal threadpool. This can lead to surprising effects and performance[0m
[0mlimitations in some applications.[0m

[0mCreating and using a large number of zlib objects simultaneously can cause[0m
[0msignificant memory fragmentation.[0m

    [94mconst[39m [37mzlib[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/zlib'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mpayload[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'This is some data'[39m[90m)[39m[90m;[39m
    
    [90m// WARNING: DO NOT DO THIS![39m
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [34m30000[39m[90m;[39m [93m++[39m[37mi[39m[90m)[39m [33m{[39m
      [37mzlib[39m[32m.[39m[37mdeflate[39m[90m([39m[37mpayload[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mbuffer[39m[90m)[39m [93m=>[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[0mIn the preceding example, 30,000 deflate instances are created concurrently.[0m
[0mBecause of how some operating systems handle memory allocation and[0m
[0mdeallocation, this may lead to to significant memory fragmentation.[0m

[0mIt is strongly recommended that the results of compression[0m
[0moperations be cached to avoid duplication of effort.[0m

[32m[1m## Compressing HTTP requests and responses[22m[39m

[0mThe [33mzlib[39m module can be used to implement support for the [33mgzip[39m, [33mdeflate[39m[0m
[0mand [33mbr[39m content-encoding mechanisms defined by[0m
[0m[34mHTTP ([34m[4mhttps://tools.ietf.org/html/rfc7230#section-4.2[24m[39m[34m)[39m.[0m

[0mThe HTTP [34m[33mAccept-Encoding[39m[34m ([34m[4mhttps://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3[24m[39m[34m)[39m header is used within an http request to identify[0m
[0mthe compression encodings accepted by the client. The [34m[33mContent-Encoding[39m[34m ([34m[4mhttps://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11[24m[39m[34m)[39m[0m
[0mheader is used to identify the compression encodings actually applied to a[0m
[0mmessage.[0m

[0mThe examples given below are drastically simplified to show the basic concept.[0m
[0mUsing [33mzlib[39m encoding can be expensive, and the results ought to be cached.[0m
[0mSee [34mMemory Usage Tuning ([34m[4m#zlib_memory_usage_tuning[24m[39m[34m)[39m for more information on the speed/memory/compression[0m
[0mtradeoffs involved in [33mzlib[39m usage.[0m

    [90m// Client request example[39m
    [94mconst[39m [37mzlib[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/zlib'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mpipeline[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mrequest[39m [93m=[39m [37mhttp[39m[32m.[39m[37mget[39m[90m([39m[33m{[39m [37mhost[39m[93m:[39m [92m'example.com'[39m[32m,[39m
                               [37mpath[39m[93m:[39m [92m'/'[39m[32m,[39m
                               [37mport[39m[93m:[39m [34m80[39m[32m,[39m
                               [37mheaders[39m[93m:[39m [33m{[39m [32m'Accept-Encoding'[39m[93m:[39m [92m'br,gzip,deflate'[39m [33m}[39m [33m}[39m[90m)[39m[90m;[39m
    [37mrequest[39m[32m.[39m[37mon[39m[90m([39m[92m'response'[39m[32m,[39m [90m([39m[37mresponse[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37moutput[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'example.com_index.html'[39m[90m)[39m[90m;[39m
    
      [94mconst[39m [37monError[39m [93m=[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'An error occurred:'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
          [37mprocess[39m[32m.[39m[37mexitCode[39m [93m=[39m [34m1[39m[90m;[39m
        [33m}[39m
      [33m}[39m[90m;[39m
    
      [94mswitch[39m [90m([39m[37mresponse[39m[32m.[39m[37mheaders[39m[33m[[39m[92m'content-encoding'[39m[33m][39m[90m)[39m [33m{[39m
        [94mcase[39m [32m'br'[39m[93m:[39m
          [37mpipeline[39m[90m([39m[37mresponse[39m[32m,[39m [37mzlib[39m[32m.[39m[37mcreateBrotliDecompress[39m[90m([39m[90m)[39m[32m,[39m [37moutput[39m[32m,[39m [37monError[39m[90m)[39m[90m;[39m
          [94mbreak[39m[90m;[39m
        [90m// Or, just use zlib.createUnzip() to handle both of the following cases:[39m
        [94mcase[39m [32m'gzip'[39m[93m:[39m
          [37mpipeline[39m[90m([39m[37mresponse[39m[32m,[39m [37mzlib[39m[32m.[39m[37mcreateGunzip[39m[90m([39m[90m)[39m[32m,[39m [37moutput[39m[32m,[39m [37monError[39m[90m)[39m[90m;[39m
          [94mbreak[39m[90m;[39m
        [94mcase[39m [32m'deflate'[39m[93m:[39m
          [37mpipeline[39m[90m([39m[37mresponse[39m[32m,[39m [37mzlib[39m[32m.[39m[37mcreateInflate[39m[90m([39m[90m)[39m[32m,[39m [37moutout[39m[32m,[39m [37monError[39m[90m)[39m[90m;[39m
          [94mbreak[39m[90m;[39m
        [94mdefault[39m[93m:[39m
          [37mpipeline[39m[90m([39m[37mresponse[39m[32m,[39m [37moutput[39m[32m,[39m [37monError[39m[90m)[39m[90m;[39m
          [94mbreak[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

    [90m// server example[39m
    [90m// Running a gzip operation on every request is quite expensive.[39m
    [90m// It would be much more efficient to cache the compressed buffer.[39m
    [94mconst[39m [37mzlib[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/zlib'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mpipeline[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mrequest[39m[32m,[39m [37mresponse[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mraw[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'index.html'[39m[90m)[39m[90m;[39m
      [90m// Store both a compressed and an uncompressed version of the resource.[39m
      [37mresponse[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Vary'[39m[32m,[39m [92m'Accept-Encoding'[39m[90m)[39m[90m;[39m
      [94mlet[39m [37macceptEncoding[39m [93m=[39m [37mrequest[39m[32m.[39m[37mheaders[39m[33m[[39m[92m'accept-encoding'[39m[33m][39m[90m;[39m
      [94mif[39m [90m([39m[93m![39m[37macceptEncoding[39m[90m)[39m [33m{[39m
        [37macceptEncoding[39m [93m=[39m [92m''[39m[90m;[39m
      [33m}[39m
    
      [94mconst[39m [37monError[39m [93m=[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
          [90m// If an error occurs, there's not much we can do because[39m
          [90m// the server has already sent the 200 response code and[39m
          [90m// some amount of data has already been sent to the client.[39m
          [90m// The best we can do is terminate the response immediately[39m
          [90m// and log the error.[39m
          [37mresponse[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'An error occurred:'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m[90m;[39m
    
      [90m// Note: This is not a conformant accept-encoding parser.[39m
      [90m// See https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3[39m
      [94mif[39m [90m([39m/\bdeflate\b/[32m.[39m[37mtest[39m[90m([39m[37macceptEncoding[39m[90m)[39m[90m)[39m [33m{[39m
        [37mresponse[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Encoding'[39m[93m:[39m [92m'deflate'[39m [33m}[39m[90m)[39m[90m;[39m
        [37mpipeline[39m[90m([39m[37mraw[39m[32m,[39m [37mzlib[39m[32m.[39m[37mcreateDeflate[39m[90m([39m[90m)[39m[32m,[39m [37mresponse[39m[32m,[39m [37monError[39m[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [94mif[39m [90m([39m/\bgzip\b/[32m.[39m[37mtest[39m[90m([39m[37macceptEncoding[39m[90m)[39m[90m)[39m [33m{[39m
        [37mresponse[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Encoding'[39m[93m:[39m [92m'gzip'[39m [33m}[39m[90m)[39m[90m;[39m
        [37mpipeline[39m[90m([39m[37mraw[39m[32m,[39m [37mzlib[39m[32m.[39m[37mcreateGzip[39m[90m([39m[90m)[39m[32m,[39m [37mresponse[39m[32m,[39m [37monError[39m[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [94mif[39m [90m([39m/\bbr\b/[32m.[39m[37mtest[39m[90m([39m[37macceptEncoding[39m[90m)[39m[90m)[39m [33m{[39m
        [37mresponse[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'Content-Encoding'[39m[93m:[39m [92m'br'[39m [33m}[39m[90m)[39m[90m;[39m
        [37mpipeline[39m[90m([39m[37mraw[39m[32m,[39m [37mzlib[39m[32m.[39m[37mcreateBrotliCompress[39m[90m([39m[90m)[39m[32m,[39m [37mresponse[39m[32m,[39m [37monError[39m[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [37mresponse[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m[33m}[39m[90m)[39m[90m;[39m
        [37mpipeline[39m[90m([39m[37mraw[39m[32m,[39m [37mresponse[39m[32m,[39m [37monError[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[90m)[39m[90m;[39m

[0mBy default, the [33mzlib[39m methods will throw an error when decompressing[0m
[0mtruncated data. However, if it is known that the data is incomplete, or[0m
[0mthe desire is to inspect only the beginning of a compressed file, it is[0m
[0mpossible to suppress the default error handling by changing the flushing[0m
[0mmethod that is used to decompress the last chunk of input data:[0m

    [90m// This is a truncated version of the buffer from the above examples[39m
    [94mconst[39m [37mbuffer[39m [93m=[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'eJzT0yMA'[39m[32m,[39m [92m'base64'[39m[90m)[39m[90m;[39m
    
    [37mzlib[39m[32m.[39m[37munzip[39m[90m([39m
      [37mbuffer[39m[32m,[39m
      [90m// For Brotli, the equivalent is zlib.constants.BROTLI_OPERATION_FLUSH.[39m
      [33m{[39m [37mfinishFlush[39m[93m:[39m [37mzlib[39m[32m.[39m[37mconstants[39m[32m.[39m[37mZ_SYNC_FLUSH[39m [33m}[39m[32m,[39m
      [90m([39m[37merr[39m[32m,[39m [37mbuffer[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'An error occurred:'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
          [37mprocess[39m[32m.[39m[37mexitCode[39m [93m=[39m [34m1[39m[90m;[39m
        [33m}[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mbuffer[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m

[0mThis will not change the behavior in other error-throwing situations, e.g.[0m
[0mwhen the input data has an invalid format. Using this method, it will not be[0m
[0mpossible to determine whether the input ended prematurely or lacks the[0m
[0mintegrity checks, making it necessary to manually check that the[0m
[0mdecompressed result is valid.[0m

[32m[1m## Memory Usage Tuning[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[32m[1m### For zlib-based streams[22m[39m

[0mFrom [33mzlib/zconf.h[39m, modified for Node.js usage:[0m

[0mThe memory requirements for deflate are (in bytes):[0m

[90m<!-- eslint-disable semi -->[39m
[90m[39m    [90m([39m[34m1[39m [93m<<[39m [90m([39m[37mwindowBits[39m [93m+[39m [34m2[39m[90m)[39m[90m)[39m [93m+[39m [90m([39m[34m1[39m [93m<<[39m [90m([39m[37mmemLevel[39m [93m+[39m [34m9[39m[90m)[39m[90m)[39m

[0mThat is: 128K for [33mwindowBits[39m = 15 + 128K for [33mmemLevel[39m = 8[0m
[0m(default values) plus a few kilobytes for small objects.[0m

[0mFor example, to reduce the default memory requirements from 256K to 128K, the[0m
[0moptions should be set to:[0m

    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m [37mwindowBits[39m[93m:[39m [34m14[39m[32m,[39m [37mmemLevel[39m[93m:[39m [34m7[39m [33m}[39m[90m;[39m

[0mThis will, however, generally degrade compression.[0m

[0mThe memory requirements for inflate are (in bytes) [33m1 << windowBits[39m.[0m
[0mThat is, 32K for [33mwindowBits[39m = 15 (default value) plus a few kilobytes[0m
[0mfor small objects.[0m

[0mThis is in addition to a single internal output slab buffer of size[0m
[0m[33mchunkSize[39m, which defaults to 16K.[0m

[0mThe speed of [33mzlib[39m compression is affected most dramatically by the[0m
[0m[33mlevel[39m setting. A higher level will result in better compression, but[0m
[0mwill take longer to complete. A lower level will result in less[0m
[0mcompression, but will be much faster.[0m

[0mIn general, greater memory usage options will mean that Node.js has to make[0m
[0mfewer calls to [33mzlib[39m because it will be able to process more data on[0m
[0meach [33mwrite[39m operation. So, this is another factor that affects the[0m
[0mspeed, at the cost of memory usage.[0m

[32m[1m### For Brotli-based streams[22m[39m

[0mThere are equivalents to the zlib options for Brotli-based streams, although[0m
[0mthese options have different ranges than the zlib ones:[0m

    * [0mzlib’s [33mlevel[39m option matches Brotli’s [33mBROTLI_PARAM_QUALITY[39m option.[0m
    * [0mzlib’s [33mwindowBits[39m option matches Brotli’s [33mBROTLI_PARAM_LGWIN[39m option.[0m

[0mSee [34mbelow ([34m[4m#zlib_brotli_constants[24m[39m[34m)[39m for more details on Brotli-specific options.[0m

[32m[1m## Flushing[22m[39m

[0mCalling [34m[33m.flush()[39m[34m ([34m[4m#zlib_zlib_flush_kind_callback[24m[39m[34m)[39m on a compression stream will make [33mzlib[39m return as much[0m
[0moutput as currently possible. This may come at the cost of degraded compression[0m
[0mquality, but can be useful when data needs to be available as soon as possible.[0m

[0mIn the following example, [33mflush()[39m is used to write a compressed partial[0m
[0mHTTP response to the client:[0m

    [94mconst[39m [37mzlib[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/zlib'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mpipeline[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/stream'[39m[90m)[39m[90m;[39m
    
    [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mrequest[39m[32m,[39m [37mresponse[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// For the sake of simplicity, the Accept-Encoding checks are omitted.[39m
      [37mresponse[39m[32m.[39m[37mwriteHead[39m[90m([39m[34m200[39m[32m,[39m [33m{[39m [32m'content-encoding'[39m[93m:[39m [92m'gzip'[39m [33m}[39m[90m)[39m[90m;[39m
      [94mconst[39m [37moutput[39m [93m=[39m [37mzlib[39m[32m.[39m[37mcreateGzip[39m[90m([39m[90m)[39m[90m;[39m
      [94mlet[39m [37mi[39m[90m;[39m
    
      [37mpipeline[39m[90m([39m[37moutput[39m[32m,[39m [37mresponse[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
          [90m// If an error occurs, there's not much we can do because[39m
          [90m// the server has already sent the 200 response code and[39m
          [90m// some amount of data has already been sent to the client.[39m
          [90m// The best we can do is terminate the response immediately[39m
          [90m// and log the error.[39m
          [37mclearInterval[39m[90m([39m[37mi[39m[90m)[39m[90m;[39m
          [37mresponse[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'An error occurred:'[39m[32m,[39m [37merr[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m[90m)[39m[90m;[39m
    
      [37mi[39m [93m=[39m [37msetInterval[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [37moutput[39m[32m.[39m[37mwrite[39m[90m([39m`The current time is ${[37mDate[39m[90m([39m[90m)[39m}\n`[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// The data has been passed to zlib, but the compression algorithm may[39m
          [90m// have decided to buffer the data for more efficient compression.[39m
          [90m// Calling .flush() will make the data available as soon as the client[39m
          [90m// is ready to receive it.[39m
          [37moutput[39m[32m.[39m[37mflush[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[90m)[39m[90m;[39m

[32m[1m## Constants[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[32m[1m### zlib constants[22m[39m

[0mAll of the constants defined in [33mzlib.h[39m are also defined on[0m
[0m[33mrequire('zlib').constants[39m. In the normal course of operations, it will not be[0m
[0mnecessary to use these constants. They are documented so that their presence is[0m
[0mnot surprising. This section is taken almost directly from the[0m
[0m[34mzlib documentation ([34m[4mhttps://zlib.net/manual.html#Constants[24m[39m[34m)[39m.[0m

[0mPreviously, the constants were available directly from [33mrequire('zlib')[39m, for[0m
[0minstance [33mzlib.Z_NO_FLUSH[39m. Accessing the constants directly from the module is[0m
[0mcurrently still possible but is deprecated.[0m

[0mAllowed flush values.[0m

    * [0m[33mzlib.constants.Z_NO_FLUSH[39m[0m
    * [0m[33mzlib.constants.Z_PARTIAL_FLUSH[39m[0m
    * [0m[33mzlib.constants.Z_SYNC_FLUSH[39m[0m
    * [0m[33mzlib.constants.Z_FULL_FLUSH[39m[0m
    * [0m[33mzlib.constants.Z_FINISH[39m[0m
    * [0m[33mzlib.constants.Z_BLOCK[39m[0m
    * [0m[33mzlib.constants.Z_TREES[39m[0m

[0mReturn codes for the compression/decompression functions. Negative[0m
[0mvalues are errors, positive values are used for special but normal[0m
[0mevents.[0m

    * [0m[33mzlib.constants.Z_OK[39m[0m
    * [0m[33mzlib.constants.Z_STREAM_END[39m[0m
    * [0m[33mzlib.constants.Z_NEED_DICT[39m[0m
    * [0m[33mzlib.constants.Z_ERRNO[39m[0m
    * [0m[33mzlib.constants.Z_STREAM_ERROR[39m[0m
    * [0m[33mzlib.constants.Z_DATA_ERROR[39m[0m
    * [0m[33mzlib.constants.Z_MEM_ERROR[39m[0m
    * [0m[33mzlib.constants.Z_BUF_ERROR[39m[0m
    * [0m[33mzlib.constants.Z_VERSION_ERROR[39m[0m

[0mCompression levels.[0m

    * [0m[33mzlib.constants.Z_NO_COMPRESSION[39m[0m
    * [0m[33mzlib.constants.Z_BEST_SPEED[39m[0m
    * [0m[33mzlib.constants.Z_BEST_COMPRESSION[39m[0m
    * [0m[33mzlib.constants.Z_DEFAULT_COMPRESSION[39m[0m

[0mCompression strategy.[0m

    * [0m[33mzlib.constants.Z_FILTERED[39m[0m
    * [0m[33mzlib.constants.Z_HUFFMAN_ONLY[39m[0m
    * [0m[33mzlib.constants.Z_RLE[39m[0m
    * [0m[33mzlib.constants.Z_FIXED[39m[0m
    * [0m[33mzlib.constants.Z_DEFAULT_STRATEGY[39m[0m

[32m[1m### Brotli constants[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThere are several options and other constants available for Brotli-based[0m
[0mstreams:[0m

[32m[1m#### Flush operations[22m[39m

[0mThe following values are valid flush operations for Brotli-based streams:[0m

    * [0m[33mzlib.constants.BROTLI_OPERATION_PROCESS[39m (default for all operations)[0m
    * [0m[33mzlib.constants.BROTLI_OPERATION_FLUSH[39m (default when calling [33m.flush()[39m)[0m
    * [0m[33mzlib.constants.BROTLI_OPERATION_FINISH[39m (default for the last chunk)[0m
    * [0m[33mzlib.constants.BROTLI_OPERATION_EMIT_METADATA[39m
        * [0m[0mThis particular operation may be hard to use in a Node.js context,[0m[0m[0m
      [0m      [0m[0m as the streaming layer makes it hard to know which data will end up[0m[0m[0m
      [0m      [0m[0m in this frame. Also, there is currently no way to consume this data through[0m[0m[0m
      [0m      [0m[0m the Node.js API.[0m[0m[0m

[32m[1m#### Compressor options[22m[39m

[0mThere are several options that can be set on Brotli encoders, affecting[0m
[0mcompression efficiency and speed. Both the keys and the values can be accessed[0m
[0mas properties of the [33mzlib.constants[39m object.[0m

[0mThe most important options are:[0m

    * [0m[33mBROTLI_PARAM_MODE[39m
        * [0m[0m[33mBROTLI_MODE_GENERIC[39m (default)[0m[0m[0m
      [0m
        * [0m[0m[33mBROTLI_MODE_TEXT[39m, adjusted for UTF-8 text[0m[0m[0m
      [0m
        * [0m[0m[33mBROTLI_MODE_FONT[39m, adjusted for WOFF 2.0 fonts[0m[0m[0m
    * [0m[33mBROTLI_PARAM_QUALITY[39m
        * [0m[0mRanges from [33mBROTLI_MIN_QUALITY[39m to [33mBROTLI_MAX_QUALITY[39m,[0m[0m[0m
      [0m      [0m[0mwith a default of [33mBROTLI_DEFAULT_QUALITY[39m.[0m[0m[0m
    * [0m[33mBROTLI_PARAM_SIZE_HINT[39m
        * [0m[0mInteger value representing the expected input size;[0m[0m[0m
      [0m      [0m[0mdefaults to [33m0[39m for an unknown input size.[0m[0m[0m

[0mThe following flags can be set for advanced control over the compression[0m
[0malgorithm and memory usage tuning:[0m

    * [0m[33mBROTLI_PARAM_LGWIN[39m
        * [0m[0mRanges from [33mBROTLI_MIN_WINDOW_BITS[39m to [33mBROTLI_MAX_WINDOW_BITS[39m,[0m[0m[0m
      [0m      [0m[0mwith a default of [33mBROTLI_DEFAULT_WINDOW[39m, or up to[0m[0m[0m
      [0m      [0m[0m[33mBROTLI_LARGE_MAX_WINDOW_BITS[39m if the [33mBROTLI_PARAM_LARGE_WINDOW[39m flag[0m[0m[0m
      [0m      [0m[0mis set.[0m[0m[0m
    * [0m[33mBROTLI_PARAM_LGBLOCK[39m
        * [0m[0mRanges from [33mBROTLI_MIN_INPUT_BLOCK_BITS[39m to [33mBROTLI_MAX_INPUT_BLOCK_BITS[39m.[0m[0m[0m
    * [0m[33mBROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING[39m
        * [0m[0mBoolean flag that decreases compression ratio in favour of[0m[0m[0m
      [0m      [0m[0mdecompression speed.[0m[0m[0m
    * [0m[33mBROTLI_PARAM_LARGE_WINDOW[39m
        * [0m[0mBoolean flag enabling “Large Window Brotli” mode (not compatible with the[0m[0m[0m
      [0m      [0m[0mBrotli format as standardized in [34mRFC 7932 ([34m[4mhttps://www.rfc-editor.org/rfc/rfc7932.txt[24m[39m[34m)[39m).[0m[0m[0m
    * [0m[33mBROTLI_PARAM_NPOSTFIX[39m
        * [0m[0mRanges from [33m0[39m to [33mBROTLI_MAX_NPOSTFIX[39m.[0m[0m[0m
    * [0m[33mBROTLI_PARAM_NDIRECT[39m
        * [0m[0mRanges from [33m0[39m to [33m15 << NPOSTFIX[39m in steps of [33m1 << NPOSTFIX[39m.[0m[0m[0m

[32m[1m#### Decompressor options[22m[39m

[0mThese advanced options are available for controlling decompression:[0m

    * [0m[33mBROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION[39m
        * [0m[0mBoolean flag that affects internal memory allocation patterns.[0m[0m[0m
    * [0m[33mBROTLI_DECODER_PARAM_LARGE_WINDOW[39m
        * [0m[0mBoolean flag enabling “Large Window Brotli” mode (not compatible with the[0m[0m[0m
      [0m      [0m[0mBrotli format as standardized in [34mRFC 7932 ([34m[4mhttps://www.rfc-editor.org/rfc/rfc7932.txt[24m[39m[34m)[39m).[0m[0m[0m

[32m[1m## Class: [33mOptions[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.1[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `dictionary` option can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `dictionary` option can be an `Uint8Array` now.[39m
[90m  - version: v5.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6069[39m
[90m    description: The `finishFlush` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mEach zlib-based class takes an [33moptions[39m object. No options are required.[0m

[0mSome options are only relevant when compressing and are[0m
[0mignored by the decompression classes.[0m

    * [0m[33mflush[39m {integer} [1mDefault:[22m [33mzlib.constants.Z_NO_FLUSH[39m[0m
    * [0m[33mfinishFlush[39m {integer} [1mDefault:[22m [33mzlib.constants.Z_FINISH[39m[0m
    * [0m[33mchunkSize[39m {integer} [1mDefault:[22m [33m16 * 1024[39m[0m
    * [0m[33mwindowBits[39m {integer}[0m
    * [0m[33mlevel[39m {integer} (compression only)[0m
    * [0m[33mmemLevel[39m {integer} (compression only)[0m
    * [0m[33mstrategy[39m {integer} (compression only)[0m
    * [0m[33mdictionary[39m {Buffer|TypedArray|DataView|ArrayBuffer} (deflate/inflate only,[0m
      [0mempty dictionary by default)[0m
    * [0m[33minfo[39m {boolean} (If [33mtrue[39m, returns an object with [33mbuffer[39m and [33mengine[39m.)[0m

[0mSee the [34m[33mdeflateInit2[39m[34m and [33minflateInit2[39m[34m ([34m[4mhttps://zlib.net/manual.html#Advanced[24m[39m[34m)[39m documentation for more[0m
[0minformation.[0m

[32m[1m## Class: [33mBrotliOptions[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mEach Brotli-based class takes an [33moptions[39m object. All options are optional.[0m

    * [0m[33mflush[39m {integer} [1mDefault:[22m [33mzlib.constants.BROTLI_OPERATION_PROCESS[39m[0m
    * [0m[33mfinishFlush[39m {integer} [1mDefault:[22m [33mzlib.constants.BROTLI_OPERATION_FINISH[39m[0m
    * [0m[33mchunkSize[39m {integer} [1mDefault:[22m [33m16 * 1024[39m[0m
    * [0m[33mparams[39m {Object} Key-value object containing indexed [34mBrotli parameters ([34m[4m#zlib_brotli_constants[24m[39m[34m)[39m.[0m

[0mFor example:[0m

    [94mconst[39m [37mstream[39m [93m=[39m [37mzlib[39m[32m.[39m[37mcreateBrotliCompress[39m[90m([39m[33m{[39m
      [37mchunkSize[39m[93m:[39m [34m32[39m [93m*[39m [34m1024[39m[32m,[39m
      [37mparams[39m[93m:[39m [33m{[39m
        [33m[[39m[37mzlib[39m[32m.[39m[37mconstants[39m[32m.[39m[37mBROTLI_PARAM_MODE[39m[33m][39m[93m:[39m [37mzlib[39m[32m.[39m[37mconstants[39m[32m.[39m[37mBROTLI_MODE_TEXT[39m[32m,[39m
        [33m[[39m[37mzlib[39m[32m.[39m[37mconstants[39m[32m.[39m[37mBROTLI_PARAM_QUALITY[39m[33m][39m[93m:[39m [34m4[39m[32m,[39m
        [33m[[39m[37mzlib[39m[32m.[39m[37mconstants[39m[32m.[39m[37mBROTLI_PARAM_SIZE_HINT[39m[33m][39m[93m:[39m [37mfs[39m[32m.[39m[37mstatSync[39m[90m([39m[37minputFile[39m[90m)[39m[32m.[39m[37msize[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Class: [33mzlib.BrotliCompress[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCompress data using the Brotli algorithm.[0m

[32m[1m## Class: [33mzlib.BrotliDecompress[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mDecompress data using the Brotli algorithm.[0m

[32m[1m## Class: [33mzlib.Deflate[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCompress data using deflate.[0m

[32m[1m## Class: [33mzlib.DeflateRaw[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCompress data using deflate, and do not append a [33mzlib[39m header.[0m

[32m[1m## Class: [33mzlib.Gunzip[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90mchanges:[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5883[39m
[90m    description: Trailing garbage at the end of the input stream will now[39m
[90m                 result in an `'error'` event.[39m
[90m  - version: v5.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5120[39m
[90m    description: Multiple concatenated gzip file members are supported now.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2595[39m
[90m    description: A truncated input stream will now result in an `'error'` event.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mDecompress a gzip stream.[0m

[32m[1m## Class: [33mzlib.Gzip[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCompress data using gzip.[0m

[32m[1m## Class: [33mzlib.Inflate[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90mchanges:[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2595[39m
[90m    description: A truncated input stream will now result in an `'error'` event.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mDecompress a deflate stream.[0m

[32m[1m## Class: [33mzlib.InflateRaw[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90mchanges:[39m
[90m  - version: v6.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8512[39m
[90m    description: Custom dictionaries are now supported by `InflateRaw`.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2595[39m
[90m    description: A truncated input stream will now result in an `'error'` event.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mDecompress a raw deflate stream.[0m

[32m[1m## Class: [33mzlib.Unzip[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mDecompress either a Gzip- or Deflate-compressed stream by auto-detecting[0m
[0mthe header.[0m

[32m[1m## Class: [33mzlib.ZlibBase[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90mchanges:[39m
[90m  - version: v11.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24939[39m
[90m    description: This class was renamed from `Zlib` to `ZlibBase`.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mNot exported by the [33mzlib[39m module. It is documented here because it is the base[0m
[0mclass of the compressor/decompressor classes.[0m

[0mThis class inherits from [34m[33mstream.Transform[39m[34m ([34m[4mstream.html#stream_class_stream_transform[24m[39m[34m)[39m, allowing [33mzlib[39m objects to be[0m
[0mused in pipes and similar stream operations.[0m

[32m[1m### [33mzlib.bytesRead[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.1.0[39m
[90mdeprecated: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mzlib.bytesWritten[39m[90m[34m ([34m[4m#zlib_zlib_byteswritten[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m{number}[0m

[0mDeprecated alias for [34m[33mzlib.bytesWritten[39m[34m ([34m[4m#zlib_zlib_byteswritten[24m[39m[34m)[39m. This original name was chosen[0m
[0mbecause it also made sense to interpret the value as the number of bytes[0m
[0mread by the engine, but is inconsistent with other streams in Node.js that[0m
[0mexpose values under these names.[0m

[32m[1m### [33mzlib.bytesWritten[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe [33mzlib.bytesWritten[39m property specifies the number of bytes written to[0m
[0mthe engine, before the bytes are processed (compressed or decompressed,[0m
[0mas appropriate for the derived class).[0m

[32m[1m### [33mzlib.close([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}[0m

[0mClose the underlying handle.[0m

[32m[1m### [33mzlib.flush([kind, ]callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mkind[39m [1mDefault:[22m [33mzlib.constants.Z_FULL_FLUSH[39m for zlib-based streams,[0m
      [0m[33mzlib.constants.BROTLI_OPERATION_FLUSH[39m for Brotli-based streams.[0m
    * [0m[33mcallback[39m {Function}[0m

[0mFlush pending data. Don't call this frivolously, premature flushes negatively[0m
[0mimpact the effectiveness of the compression algorithm.[0m

[0mCalling this only flushes data from the internal [33mzlib[39m state, and does not[0m
[0mperform flushing of any kind on the streams level. Rather, it behaves like a[0m
[0mnormal call to [33m.write()[39m, i.e. it will be queued up behind other pending[0m
[0mwrites and will only produce output when data is being read from the stream.[0m

[32m[1m### [33mzlib.params(level, strategy, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlevel[39m {integer}[0m
    * [0m[33mstrategy[39m {integer}[0m
    * [0m[33mcallback[39m {Function}[0m

[0mThis function is only available for zlib-based streams, i.e. not Brotli.[0m

[0mDynamically update the compression level and compression strategy.[0m
[0mOnly applicable to deflate algorithm.[0m

[32m[1m### [33mzlib.reset()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mReset the compressor/decompressor to factory defaults. Only applicable to[0m
[0mthe inflate and deflate algorithms.[0m

[32m[1m## [33mzlib.constants[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mProvides an object enumerating Zlib-related constants.[0m

[32m[1m## [33mzlib.createBrotliCompress([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {brotli options}[0m

[0mCreates and returns a new [34m[33mBrotliCompress[39m[34m ([34m[4m#zlib_class_zlib_brotlicompress[24m[39m[34m)[39m object.[0m

[32m[1m## [33mzlib.createBrotliDecompress([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {brotli options}[0m

[0mCreates and returns a new [34m[33mBrotliDecompress[39m[34m ([34m[4m#zlib_class_zlib_brotlidecompress[24m[39m[34m)[39m object.[0m

[32m[1m## [33mzlib.createDeflate([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {zlib options}[0m

[0mCreates and returns a new [34m[33mDeflate[39m[34m ([34m[4m#zlib_class_zlib_deflate[24m[39m[34m)[39m object.[0m

[32m[1m## [33mzlib.createDeflateRaw([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {zlib options}[0m

[0mCreates and returns a new [34m[33mDeflateRaw[39m[34m ([34m[4m#zlib_class_zlib_deflateraw[24m[39m[34m)[39m object.[0m

[0mAn upgrade of zlib from 1.2.8 to 1.2.11 changed behavior when [33mwindowBits[39m[0m
[0mis set to 8 for raw deflate streams. zlib would automatically set [33mwindowBits[39m[0m
[0mto 9 if was initially set to 8. Newer versions of zlib will throw an exception,[0m
[0mso Node.js restored the original behavior of upgrading a value of 8 to 9,[0m
[0msince passing [33mwindowBits = 9[39m to zlib actually results in a compressed stream[0m
[0mthat effectively uses an 8-bit window only.[0m

[32m[1m## [33mzlib.createGunzip([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {zlib options}[0m

[0mCreates and returns a new [34m[33mGunzip[39m[34m ([34m[4m#zlib_class_zlib_gunzip[24m[39m[34m)[39m object.[0m

[32m[1m## [33mzlib.createGzip([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {zlib options}[0m

[0mCreates and returns a new [34m[33mGzip[39m[34m ([34m[4m#zlib_class_zlib_gzip[24m[39m[34m)[39m object.[0m
[0mSee [34mexample ([34m[4m#zlib_zlib[24m[39m[34m)[39m.[0m

[32m[1m## [33mzlib.createInflate([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {zlib options}[0m

[0mCreates and returns a new [34m[33mInflate[39m[34m ([34m[4m#zlib_class_zlib_inflate[24m[39m[34m)[39m object.[0m

[32m[1m## [33mzlib.createInflateRaw([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {zlib options}[0m

[0mCreates and returns a new [34m[33mInflateRaw[39m[34m ([34m[4m#zlib_class_zlib_inflateraw[24m[39m[34m)[39m object.[0m

[32m[1m## [33mzlib.createUnzip([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {zlib options}[0m

[0mCreates and returns a new [34m[33mUnzip[39m[34m ([34m[4m#zlib_class_zlib_unzip[24m[39m[34m)[39m object.[0m

[32m[1m## Convenience Methods[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mAll of these take a [34m[33mBuffer[39m[34m ([34m[4mbuffer.html#buffer_class_buffer[24m[39m[34m)[39m, [34m[33mTypedArray[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray[24m[39m[34m)[39m, [34m[33mDataView[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView[24m[39m[34m)[39m,[0m
[0m[34m[33mArrayBuffer[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer[24m[39m[34m)[39m or string as the first argument, an optional second argument[0m
[0mto supply options to the [33mzlib[39m classes and will call the supplied callback[0m
[0mwith [33mcallback(error, result)[39m.[0m

[0mEvery method has a [33m*Sync[39m counterpart, which accept the same arguments, but[0m
[0mwithout a callback.[0m

[32m[1m### [33mzlib.brotliCompress(buffer[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {brotli options}[0m
    * [0m[33mcallback[39m {Function}[0m

[32m[1m### [33mzlib.brotliCompressSync(buffer[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {brotli options}[0m

[0mCompress a chunk of data with [34m[33mBrotliCompress[39m[34m ([34m[4m#zlib_class_zlib_brotlicompress[24m[39m[34m)[39m.[0m

[32m[1m### [33mzlib.brotliDecompress(buffer[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {brotli options}[0m
    * [0m[33mcallback[39m {Function}[0m

[32m[1m### [33mzlib.brotliDecompressSync(buffer[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {brotli options}[0m

[0mDecompress a chunk of data with [34m[33mBrotliDecompress[39m[34m ([34m[4m#zlib_class_zlib_brotlidecompress[24m[39m[34m)[39m.[0m

[32m[1m### [33mzlib.deflate(buffer[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m
    * [0m[33mcallback[39m {Function}[0m

[32m[1m### [33mzlib.deflateSync(buffer[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m

[0mCompress a chunk of data with [34m[33mDeflate[39m[34m ([34m[4m#zlib_class_zlib_deflate[24m[39m[34m)[39m.[0m

[32m[1m### [33mzlib.deflateRaw(buffer[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m
    * [0m[33mcallback[39m {Function}[0m

[32m[1m### [33mzlib.deflateRawSync(buffer[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m

[0mCompress a chunk of data with [34m[33mDeflateRaw[39m[34m ([34m[4m#zlib_class_zlib_deflateraw[24m[39m[34m)[39m.[0m

[32m[1m### [33mzlib.gunzip(buffer[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m
    * [0m[33mcallback[39m {Function}[0m

[32m[1m### [33mzlib.gunzipSync(buffer[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m

[0mDecompress a chunk of data with [34m[33mGunzip[39m[34m ([34m[4m#zlib_class_zlib_gunzip[24m[39m[34m)[39m.[0m

[32m[1m### [33mzlib.gzip(buffer[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m
    * [0m[33mcallback[39m {Function}[0m

[32m[1m### [33mzlib.gzipSync(buffer[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m

[0mCompress a chunk of data with [34m[33mGzip[39m[34m ([34m[4m#zlib_class_zlib_gzip[24m[39m[34m)[39m.[0m

[32m[1m### [33mzlib.inflate(buffer[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m
    * [0m[33mcallback[39m {Function}[0m

[32m[1m### [33mzlib.inflateSync(buffer[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m

[0mDecompress a chunk of data with [34m[33mInflate[39m[34m ([34m[4m#zlib_class_zlib_inflate[24m[39m[34m)[39m.[0m

[32m[1m### [33mzlib.inflateRaw(buffer[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m
    * [0m[33mcallback[39m {Function}[0m

[32m[1m### [33mzlib.inflateRawSync(buffer[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m

[0mDecompress a chunk of data with [34m[33mInflateRaw[39m[34m ([34m[4m#zlib_class_zlib_inflateraw[24m[39m[34m)[39m.[0m

[32m[1m### [33mzlib.unzip(buffer[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m
    * [0m[33mcallback[39m {Function}[0m

[32m[1m### [33mzlib.unzipSync(buffer[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v9.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16042[39m
[90m    description: The `buffer` parameter can be an `ArrayBuffer`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12223[39m
[90m    description: The `buffer` parameter can be any `TypedArray` or `DataView`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12001[39m
[90m    description: The `buffer` parameter can be an `Uint8Array` now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView|ArrayBuffer|string}[0m
    * [0m[33moptions[39m {zlib options}[0m

[0mDecompress a chunk of data with [34m[33mUnzip[39m[34m ([34m[4m#zlib_class_zlib_unzip[24m[39m[34m)[39m.[0m

