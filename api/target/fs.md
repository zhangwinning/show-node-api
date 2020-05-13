[35m[4m[1m# File System[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[90m<!--name=fs-->[39m
[90m[39m
[90m[39m[0mThe [33mfs[39m module provides an API for interacting with the file system in a[0m
[0mmanner closely modeled around standard POSIX functions.[0m

[0mTo use this module:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m

[0mAll file system operations have synchronous and asynchronous forms.[0m

[0mThe asynchronous form always takes a completion callback as its last argument.[0m
[0mThe arguments passed to the completion callback depend on the method, but the[0m
[0mfirst argument is always reserved for an exception. If the operation was[0m
[0mcompleted successfully, then the first argument will be [33mnull[39m or [33mundefined[39m.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [37mfs[39m[32m.[39m[37munlink[39m[90m([39m[92m'/tmp/hello'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'successfully deleted /tmp/hello'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mExceptions that occur using synchronous operations are thrown immediately and[0m
[0mmay be handled using [33mtry…catch[39m, or may be allowed to bubble up.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [36mtry[39m [33m{[39m
      [37mfs[39m[32m.[39m[37munlinkSync[39m[90m([39m[92m'/tmp/hello'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'successfully deleted /tmp/hello'[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [90m// handle the error[39m
    [33m}[39m

[0mThere is no guaranteed ordering when using asynchronous methods. So the[0m
[0mfollowing is prone to error because the [33mfs.stat()[39m operation may complete[0m
[0mbefore the [33mfs.rename()[39m operation:[0m

    [37mfs[39m[32m.[39m[37mrename[39m[90m([39m[92m'/tmp/hello'[39m[32m,[39m [92m'/tmp/world'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'renamed complete'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mfs[39m[32m.[39m[37mstat[39m[90m([39m[92m'/tmp/world'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mstats[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`stats: ${[37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37mstats[39m[90m)[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mTo correctly order the operations, move the [33mfs.stat()[39m call into the callback[0m
[0mof the [33mfs.rename()[39m operation:[0m

    [37mfs[39m[32m.[39m[37mrename[39m[90m([39m[92m'/tmp/hello'[39m[32m,[39m [92m'/tmp/world'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [37mfs[39m[32m.[39m[37mstat[39m[90m([39m[92m'/tmp/world'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mstats[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`stats: ${[37mJSON[39m[32m.[39m[37mstringify[39m[90m([39m[37mstats[39m[90m)[39m}`[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIn busy processes, use the asynchronous versions of these calls. The synchronous[0m
[0mversions will block the entire process until they complete, halting all[0m
[0mconnections.[0m

[0mWhile it is not recommended, most fs functions allow the callback argument to[0m
[0mbe omitted, in which case a default callback is used that rethrows errors. To[0m
[0mget a trace to the original call site, set the [33mNODE_DEBUG[39m environment[0m
[0mvariable:[0m

[0mOmitting the callback function on asynchronous fs functions is deprecated and[0m
[0mmay result in an error being thrown in the future.[0m

    [33m$ cat script.js[39m
    [33mfunction bad() {[39m
    [33m  require('fs').readFile('/');[39m
    [33m}[39m
    [33mbad();[39m
    [33m[39m
    [33m$ env NODE_DEBUG=fs node script.js[39m
    [33mfs.js:88[39m
    [33m        throw backtrace;[39m
    [33m        ^[39m
    [33mError: EISDIR: illegal operation on a directory, read[39m
    [33m    <stack trace.>[39m

[32m[1m## File paths[22m[39m

[0mMost [33mfs[39m operations accept filepaths that may be specified in the form of[0m
[0ma string, a [[33mBuffer[39m][], or a [[33mURL[39m][] object using the [33mfile:[39m protocol.[0m

[0mString form paths are interpreted as UTF-8 character sequences identifying[0m
[0mthe absolute or relative filename. Relative paths will be resolved relative[0m
[0mto the current working directory as specified by [33mprocess.cwd()[39m.[0m

[0mExample using an absolute path on POSIX:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'/open/some/file.txt'[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [37mfs[39m[32m.[39m[37mclose[39m[90m([39m[37mfd[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mExample using a relative path on POSIX (relative to [33mprocess.cwd()[39m):[0m

    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'file.txt'[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [37mfs[39m[32m.[39m[37mclose[39m[90m([39m[37mfd[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mPaths specified using a [[33mBuffer[39m][] are useful primarily on certain POSIX[0m
[0moperating systems that treat file paths as opaque byte sequences. On such[0m
[0msystems, it is possible for a single file path to contain sub-sequences that[0m
[0muse multiple character encodings. As with string paths, [33mBuffer[39m paths may[0m
[0mbe relative or absolute:[0m

[0mExample using an absolute path on POSIX:[0m

    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'/open/some/file.txt'[39m[90m)[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [37mfs[39m[32m.[39m[37mclose[39m[90m([39m[37mfd[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOn Windows, Node.js follows the concept of per-drive working directory. This[0m
[0mbehavior can be observed when using a drive path without a backslash. For[0m
[0mexample [33mfs.readdirSync('C:\\')[39m can potentially return a different result than[0m
[0m[33mfs.readdirSync('C:')[39m. For more information, see[0m
[0m[this MSDN page][MSDN-Rel-Path].[0m

[32m[1m### URL object support[22m[39m

[90m<!-- YAML[39m
[90madded: v7.6.0[39m
[90m-->[39m
[90m[39m[0mFor most [33mfs[39m module functions, the [33mpath[39m or [33mfilename[39m argument may be passed[0m
[0mas a WHATWG [[33mURL[39m][] object. Only [[33mURL[39m][] objects using the [33mfile:[39m protocol[0m
[0mare supported.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfileUrl[39m [93m=[39m [31mnew[39m [37mURL[39m[90m([39m[92m'file:///tmp/hello'[39m[90m)[39m[90m;[39m
    
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[37mfileUrl[39m[90m)[39m[90m;[39m

[0m[33mfile:[39m URLs are always absolute paths.[0m

[0mUsing WHATWG [[33mURL[39m][] objects might introduce platform-specific behaviors.[0m

[0mOn Windows, [33mfile:[39m URLs with a host name convert to UNC paths, while [33mfile:[39m[0m
[0mURLs with drive letters convert to local absolute paths. [33mfile:[39m URLs without a[0m
[0mhost name nor a drive letter will result in a throw:[0m

    [90m// On Windows :[39m
    
    [90m// - WHATWG file URLs with hostname convert to UNC path[39m
    [90m// file://hostname/p/a/t/h/file => \\hostname\p\a\t\h\file[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file://hostname/p/a/t/h/file'[39m[90m)[39m[90m)[39m[90m;[39m
    
    [90m// - WHATWG file URLs with drive letters convert to absolute path[39m
    [90m// file:///C:/tmp/hello => C:\tmp\hello[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///C:/tmp/hello'[39m[90m)[39m[90m)[39m[90m;[39m
    
    [90m// - WHATWG file URLs without hostname must have a drive letters[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///notdriveletter/p/a/t/h/file'[39m[90m)[39m[90m)[39m[90m;[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///c/p/a/t/h/file'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must be absolute[39m

[0m[33mfile:[39m URLs with drive letters must use [33m:[39m as a separator just after[0m
[0mthe drive letter. Using another separator will result in a throw.[0m

[0mOn all other platforms, [33mfile:[39m URLs with a host name are unsupported and will[0m
[0mresult in a throw:[0m

    [90m// On other platforms:[39m
    
    [90m// - WHATWG file URLs with hostname are unsupported[39m
    [90m// file://hostname/p/a/t/h/file => throw![39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file://hostname/p/a/t/h/file'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// TypeError [ERR_INVALID_FILE_URL_PATH]: must be absolute[39m
    
    [90m// - WHATWG file URLs convert to absolute path[39m
    [90m// file:///tmp/hello => /tmp/hello[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///tmp/hello'[39m[90m)[39m[90m)[39m[90m;[39m

[0mA [33mfile:[39m URL having encoded slash characters will result in a throw on all[0m
[0mplatforms:[0m

    [90m// On Windows[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///C:/p/a/t/h/%2F'[39m[90m)[39m[90m)[39m[90m;[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///C:/p/a/t/h/%2f'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
    \ or / characters */[39m
    
    [90m// On POSIX[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///p/a/t/h/%2F'[39m[90m)[39m[90m)[39m[90m;[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///p/a/t/h/%2f'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
    / characters */[39m

[0mOn Windows, [33mfile:[39m URLs having encoded backslash will result in a throw:[0m

    [90m// On Windows[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///C:/path/%5C'[39m[90m)[39m[90m)[39m[90m;[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[31mnew[39m [37mURL[39m[90m([39m[92m'file:///C:/path/%5c'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
    \ or / characters */[39m

[32m[1m## File Descriptors[22m[39m

[0mOn POSIX systems, for every process, the kernel maintains a table of currently[0m
[0mopen files and resources. Each open file is assigned a simple numeric[0m
[0midentifier called a [3mfile descriptor[23m. At the system-level, all file system[0m
[0moperations use these file descriptors to identify and track each specific[0m
[0mfile. Windows systems use a different but conceptually similar mechanism for[0m
[0mtracking resources. To simplify things for users, Node.js abstracts away the[0m
[0mspecific differences between operating systems and assigns all open files a[0m
[0mnumeric file descriptor.[0m

[0mThe [33mfs.open()[39m method is used to allocate a new file descriptor. Once[0m
[0mallocated, the file descriptor may be used to read data from, write data to,[0m
[0mor request information about the file.[0m

    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'/open/some/file.txt'[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [37mfs[39m[32m.[39m[37mfstat[39m[90m([39m[37mfd[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mstat[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
        [90m// use stat[39m
    
        [90m// always close the file descriptor![39m
        [37mfs[39m[32m.[39m[37mclose[39m[90m([39m[37mfd[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
          [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mMost operating systems limit the number of file descriptors that may be open[0m
[0mat any given time so it is critical to close the descriptor when operations[0m
[0mare completed. Failure to do so will result in a memory leak that will[0m
[0meventually cause an application to crash.[0m

[32m[1m## Threadpool Usage[22m[39m

[0mAll file system APIs except [33mfs.FSWatcher()[39m and those that are explicitly[0m
[0msynchronous use libuv's threadpool, which can have surprising and negative[0m
[0mperformance implications for some applications. See the[0m
[0m[[33mUV_THREADPOOL_SIZE[39m][] documentation for more information.[0m

[32m[1m## Class [33mfs.Dir[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA class representing a directory stream.[0m

[0mCreated by [[33mfs.opendir()[39m][], [[33mfs.opendirSync()[39m][], or[0m
[0m[[33mfsPromises.opendir()[39m][].[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mprint[39m[90m([39m[37mpath[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mdir[39m [93m=[39m [37mawait[39m [37mfs[39m[32m.[39m[37mpromises[39m[32m.[39m[37mopendir[39m[90m([39m[37mpath[39m[90m)[39m[90m;[39m
      [94mfor[39m [37mawait[39m [90m([39m[94mconst[39m [37mdirent[39m [37mof[39m [37mdir[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdirent[39m[32m.[39m[37mname[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    [37mprint[39m[90m([39m[92m'./'[39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m

[32m[1m### [33mdir.close()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Promise}[0m

[0mAsynchronously close the directory's underlying resource handle.[0m
[0mSubsequent reads will result in errors.[0m

[0mA [33mPromise[39m is returned that will be resolved after the resource has been[0m
[0mclosed.[0m

[32m[1m### [33mdir.close(callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronously close the directory's underlying resource handle.[0m
[0mSubsequent reads will result in errors.[0m

[0mThe [33mcallback[39m will be called after the resource handle has been closed.[0m

[32m[1m### [33mdir.closeSync()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mSynchronously close the directory's underlying resource handle.[0m
[0mSubsequent reads will result in errors.[0m

[32m[1m### [33mdir.path[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe read-only path of this directory as was provided to [[33mfs.opendir()[39m][],[0m
[0m[[33mfs.opendirSync()[39m][], or [[33mfsPromises.opendir()[39m][].[0m

[32m[1m### [33mdir.read()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Promise} containing {fs.Dirent|null}[0m

[0mAsynchronously read the next directory entry via readdir(3) as an[0m
[0m[[33mfs.Dirent[39m][].[0m

[0mAfter the read is completed, a [33mPromise[39m is returned that will be resolved with[0m
[0man [[33mfs.Dirent[39m][], or [33mnull[39m if there are no more directory entries to read.[0m

[0mDirectory entries returned by this function are in no particular order as[0m
[0mprovided by the operating system's underlying directory mechanisms.[0m
[0mEntries added or removed while iterating over the directory may or may not be[0m
[0mincluded in the iteration results.[0m

[32m[1m### [33mdir.read(callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mdirent[39m {fs.Dirent|null}[0m[0m[0m

[0mAsynchronously read the next directory entry via readdir(3) as an[0m
[0m[[33mfs.Dirent[39m][].[0m

[0mAfter the read is completed, the [33mcallback[39m will be called with an[0m
[0m[[33mfs.Dirent[39m][], or [33mnull[39m if there are no more directory entries to read.[0m

[0mDirectory entries returned by this function are in no particular order as[0m
[0mprovided by the operating system's underlying directory mechanisms.[0m
[0mEntries added or removed while iterating over the directory may or may not be[0m
[0mincluded in the iteration results.[0m

[32m[1m### [33mdir.readSync()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {fs.Dirent|null}[0m

[0mSynchronously read the next directory entry via readdir(3) as an[0m
[0m[[33mfs.Dirent[39m][].[0m

[0mIf there are no more directory entries to read, [33mnull[39m will be returned.[0m

[0mDirectory entries returned by this function are in no particular order as[0m
[0mprovided by the operating system's underlying directory mechanisms.[0m
[0mEntries added or removed while iterating over the directory may or may not be[0m
[0mincluded in the iteration results.[0m

[32m[1m### [33mdir[Symbol.asyncIterator]()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {AsyncIterator} of {fs.Dirent}[0m

[0mAsynchronously iterates over the directory via readdir(3) until all entries have[0m
[0mbeen read.[0m

[0mEntries returned by the async iterator are always an [[33mfs.Dirent[39m][].[0m
[0mThe [33mnull[39m case from [33mdir.read()[39m is handled internally.[0m

[0mSee [[33mfs.Dir[39m][] for an example.[0m

[0mDirectory entries returned by this iterator are in no particular order as[0m
[0mprovided by the operating system's underlying directory mechanisms.[0m
[0mEntries added or removed while iterating over the directory may or may not be[0m
[0mincluded in the iteration results.[0m

[32m[1m## Class: [33mfs.Dirent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA representation of a directory entry, as returned by reading from an[0m
[0m[[33mfs.Dir[39m][].[0m

[0mAdditionally, when [[33mfs.readdir()[39m][] or [[33mfs.readdirSync()[39m][] is called with[0m
[0mthe [33mwithFileTypes[39m option set to [33mtrue[39m, the resulting array is filled with[0m
[0m[33mfs.Dirent[39m objects, rather than strings or [33mBuffers[39m.[0m

[32m[1m### [33mdirent.isBlockDevice()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Dirent[39m object describes a block device.[0m

[32m[1m### [33mdirent.isCharacterDevice()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Dirent[39m object describes a character device.[0m

[32m[1m### [33mdirent.isDirectory()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Dirent[39m object describes a file system[0m
[0mdirectory.[0m

[32m[1m### [33mdirent.isFIFO()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Dirent[39m object describes a first-in-first-out[0m
[0m(FIFO) pipe.[0m

[32m[1m### [33mdirent.isFile()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Dirent[39m object describes a regular file.[0m

[32m[1m### [33mdirent.isSocket()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Dirent[39m object describes a socket.[0m

[32m[1m### [33mdirent.isSymbolicLink()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Dirent[39m object describes a symbolic link.[0m

[32m[1m### [33mdirent.name[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string|Buffer}[0m

[0mThe file name that this [33mfs.Dirent[39m object refers to. The type of this[0m
[0mvalue is determined by the [33moptions.encoding[39m passed to [[33mfs.readdir()[39m][] or[0m
[0m[[33mfs.readdirSync()[39m][].[0m

[32m[1m## Class: [33mfs.FSWatcher[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends {EventEmitter}[0m

[0mA successful call to [[33mfs.watch()[39m][] method will return a new [33mfs.FSWatcher[39m[0m
[0mobject.[0m

[0mAll [33mfs.FSWatcher[39m objects emit a [33m'change'[39m event whenever a specific watched[0m
[0mfile is modified.[0m

[32m[1m### Event: [33m'change'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33meventType[39m {string} The type of change event that has occurred[0m
    * [0m[33mfilename[39m {string|Buffer} The filename that changed (if relevant/available)[0m

[0mEmitted when something changes in a watched directory or file.[0m
[0mSee more details in [[33mfs.watch()[39m][].[0m

[0mThe [33mfilename[39m argument may not be provided depending on operating system[0m
[0msupport. If [33mfilename[39m is provided, it will be provided as a [33mBuffer[39m if[0m
[0m[33mfs.watch()[39m is called with its [33mencoding[39m option set to [33m'buffer'[39m, otherwise[0m
[0m[33mfilename[39m will be a UTF-8 string.[0m

    [90m// Example when handled through fs.watch() listener[39m
    [37mfs[39m[32m.[39m[37mwatch[39m[90m([39m[92m'./tmp'[39m[32m,[39m [33m{[39m [37mencoding[39m[93m:[39m [92m'buffer'[39m [33m}[39m[32m,[39m [90m([39m[37meventType[39m[32m,[39m [37mfilename[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mfilename[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfilename[39m[90m)[39m[90m;[39m
        [90m// Prints: <Buffer ...>[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the watcher stops watching for changes. The closed[0m
[0m[33mfs.FSWatcher[39m object is no longer usable in the event handler.[0m

[32m[1m### Event: [33m'error'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33merror[39m {Error}[0m

[0mEmitted when an error occurs while watching the file. The errored[0m
[0m[33mfs.FSWatcher[39m object is no longer usable in the event handler.[0m

[32m[1m### [33mwatcher.close()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.8[39m
[90m-->[39m
[90m[39m
[90m[39m[0mStop watching for changes on the given [33mfs.FSWatcher[39m. Once stopped, the[0m
[0m[33mfs.FSWatcher[39m object is no longer usable.[0m

[32m[1m## Class: [33mfs.ReadStream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.93[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {stream.Readable}[0m

[0mA successful call to [33mfs.createReadStream()[39m will return a new [33mfs.ReadStream[39m[0m
[0mobject.[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.93[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the [33mfs.ReadStream[39m's underlying file descriptor has been closed.[0m

[32m[1m### Event: [33m'open'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.93[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer} Integer file descriptor used by the [33mReadStream[39m.[0m

[0mEmitted when the [33mfs.ReadStream[39m's file descriptor has been opened.[0m

[32m[1m### Event: [33m'ready'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the [33mfs.ReadStream[39m is ready to be used.[0m

[0mFires immediately after [33m'open'[39m.[0m

[32m[1m### [33mreadStream.bytesRead[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mThe number of bytes that have been read so far.[0m

[32m[1m### [33mreadStream.path[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.93[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string|Buffer}[0m

[0mThe path to the file the stream is reading from as specified in the first[0m
[0margument to [33mfs.createReadStream()[39m. If [33mpath[39m is passed as a string, then[0m
[0m[33mreadStream.path[39m will be a string. If [33mpath[39m is passed as a [33mBuffer[39m, then[0m
[0m[33mreadStream.path[39m will be a [33mBuffer[39m.[0m

[32m[1m### [33mreadStream.pending[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThis property is [33mtrue[39m if the underlying file has not been opened yet,[0m
[0mi.e. before the [33m'ready'[39m event is emitted.[0m

[32m[1m## Class: [33mfs.Stats[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v8.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13173[39m
[90m    description: Added times as numbers.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA [33mfs.Stats[39m object provides information about a file.[0m

[0mObjects returned from [[33mfs.stat()[39m][], [[33mfs.lstat()[39m][] and [[33mfs.fstat()[39m][] and[0m
[0mtheir synchronous counterparts are of this type.[0m
[0mIf [33mbigint[39m in the [33moptions[39m passed to those methods is true, the numeric values[0m
[0mwill be [33mbigint[39m instead of [33mnumber[39m, and the object will contain additional[0m
[0mnanosecond-precision properties suffixed with [33mNs[39m.[0m

    [33mStats {[39m
    [33m  dev: 2114,[39m
    [33m  ino: 48064969,[39m
    [33m  mode: 33188,[39m
    [33m  nlink: 1,[39m
    [33m  uid: 85,[39m
    [33m  gid: 100,[39m
    [33m  rdev: 0,[39m
    [33m  size: 527,[39m
    [33m  blksize: 4096,[39m
    [33m  blocks: 8,[39m
    [33m  atimeMs: 1318289051000.1,[39m
    [33m  mtimeMs: 1318289051000.1,[39m
    [33m  ctimeMs: 1318289051000.1,[39m
    [33m  birthtimeMs: 1318289051000.1,[39m
    [33m  atime: Mon, 10 Oct 2011 23:24:11 GMT,[39m
    [33m  mtime: Mon, 10 Oct 2011 23:24:11 GMT,[39m
    [33m  ctime: Mon, 10 Oct 2011 23:24:11 GMT,[39m
    [33m  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }[39m

[0m[33mbigint[39m version:[0m

    [33mBigIntStats {[39m
    [33m  dev: 2114n,[39m
    [33m  ino: 48064969n,[39m
    [33m  mode: 33188n,[39m
    [33m  nlink: 1n,[39m
    [33m  uid: 85n,[39m
    [33m  gid: 100n,[39m
    [33m  rdev: 0n,[39m
    [33m  size: 527n,[39m
    [33m  blksize: 4096n,[39m
    [33m  blocks: 8n,[39m
    [33m  atimeMs: 1318289051000n,[39m
    [33m  mtimeMs: 1318289051000n,[39m
    [33m  ctimeMs: 1318289051000n,[39m
    [33m  birthtimeMs: 1318289051000n,[39m
    [33m  atimeNs: 1318289051000000000n,[39m
    [33m  mtimeNs: 1318289051000000000n,[39m
    [33m  ctimeNs: 1318289051000000000n,[39m
    [33m  birthtimeNs: 1318289051000000000n,[39m
    [33m  atime: Mon, 10 Oct 2011 23:24:11 GMT,[39m
    [33m  mtime: Mon, 10 Oct 2011 23:24:11 GMT,[39m
    [33m  ctime: Mon, 10 Oct 2011 23:24:11 GMT,[39m
    [33m  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }[39m

[32m[1m### [33mstats.isBlockDevice()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Stats[39m object describes a block device.[0m

[32m[1m### [33mstats.isCharacterDevice()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Stats[39m object describes a character device.[0m

[32m[1m### [33mstats.isDirectory()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Stats[39m object describes a file system directory.[0m

[32m[1m### [33mstats.isFIFO()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Stats[39m object describes a first-in-first-out (FIFO)[0m
[0mpipe.[0m

[32m[1m### [33mstats.isFile()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Stats[39m object describes a regular file.[0m

[32m[1m### [33mstats.isSocket()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Stats[39m object describes a socket.[0m

[32m[1m### [33mstats.isSymbolicLink()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the [33mfs.Stats[39m object describes a symbolic link.[0m

[0mThis method is only valid when using [[33mfs.lstat()[39m][].[0m

[32m[1m### [33mstats.dev[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mThe numeric identifier of the device containing the file.[0m

[32m[1m### [33mstats.ino[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mThe file system specific "Inode" number for the file.[0m

[32m[1m### [33mstats.mode[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mA bit-field describing the file type and mode.[0m

[32m[1m### [33mstats.nlink[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mThe number of hard-links that exist for the file.[0m

[32m[1m### [33mstats.uid[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mThe numeric user identifier of the user that owns the file (POSIX).[0m

[32m[1m### [33mstats.gid[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mThe numeric group identifier of the group that owns the file (POSIX).[0m

[32m[1m### [33mstats.rdev[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mA numeric device identifier if the file is considered "special".[0m

[32m[1m### [33mstats.size[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mThe size of the file in bytes.[0m

[32m[1m### [33mstats.blksize[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mThe file system block size for i/o operations.[0m

[32m[1m### [33mstats.blocks[39m[32m[22m[39m

    * [0m{number|bigint}[0m

[0mThe number of blocks allocated for this file.[0m

[32m[1m### [33mstats.atimeMs[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number|bigint}[0m

[0mThe timestamp indicating the last time this file was accessed expressed in[0m
[0mmilliseconds since the POSIX Epoch.[0m

[32m[1m### [33mstats.mtimeMs[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number|bigint}[0m

[0mThe timestamp indicating the last time this file was modified expressed in[0m
[0mmilliseconds since the POSIX Epoch.[0m

[32m[1m### [33mstats.ctimeMs[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number|bigint}[0m

[0mThe timestamp indicating the last time the file status was changed expressed[0m
[0min milliseconds since the POSIX Epoch.[0m

[32m[1m### [33mstats.birthtimeMs[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number|bigint}[0m

[0mThe timestamp indicating the creation time of this file expressed in[0m
[0mmilliseconds since the POSIX Epoch.[0m

[32m[1m### [33mstats.atimeNs[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{bigint}[0m

[0mOnly present when [33mbigint: true[39m is passed into the method that generates[0m
[0mthe object.[0m
[0mThe timestamp indicating the last time this file was accessed expressed in[0m
[0mnanoseconds since the POSIX Epoch.[0m

[32m[1m### [33mstats.mtimeNs[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{bigint}[0m

[0mOnly present when [33mbigint: true[39m is passed into the method that generates[0m
[0mthe object.[0m
[0mThe timestamp indicating the last time this file was modified expressed in[0m
[0mnanoseconds since the POSIX Epoch.[0m

[32m[1m### [33mstats.ctimeNs[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{bigint}[0m

[0mOnly present when [33mbigint: true[39m is passed into the method that generates[0m
[0mthe object.[0m
[0mThe timestamp indicating the last time the file status was changed expressed[0m
[0min nanoseconds since the POSIX Epoch.[0m

[32m[1m### [33mstats.birthtimeNs[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{bigint}[0m

[0mOnly present when [33mbigint: true[39m is passed into the method that generates[0m
[0mthe object.[0m
[0mThe timestamp indicating the creation time of this file expressed in[0m
[0mnanoseconds since the POSIX Epoch.[0m

[32m[1m### [33mstats.atime[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Date}[0m

[0mThe timestamp indicating the last time this file was accessed.[0m

[32m[1m### [33mstats.mtime[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Date}[0m

[0mThe timestamp indicating the last time this file was modified.[0m

[32m[1m### [33mstats.ctime[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Date}[0m

[0mThe timestamp indicating the last time the file status was changed.[0m

[32m[1m### [33mstats.birthtime[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Date}[0m

[0mThe timestamp indicating the creation time of this file.[0m

[32m[1m### Stat Time Values[22m[39m

[0mThe [33matimeMs[39m, [33mmtimeMs[39m, [33mctimeMs[39m, [33mbirthtimeMs[39m properties are[0m
[0mnumeric values that hold the corresponding times in milliseconds. Their[0m
[0mprecision is platform specific. When [33mbigint: true[39m is passed into the[0m
[0mmethod that generates the object, the properties will be [bigints][],[0m
[0motherwise they will be [numbers][MDN-Number].[0m

[0mThe [33matimeNs[39m, [33mmtimeNs[39m, [33mctimeNs[39m, [33mbirthtimeNs[39m properties are[0m
[0m[bigints][] that hold the corresponding times in nanoseconds. They are[0m
[0monly present when [33mbigint: true[39m is passed into the method that generates[0m
[0mthe object. Their precision is platform specific.[0m

[0m[33matime[39m, [33mmtime[39m, [33mctime[39m, and [33mbirthtime[39m are[0m
[0m[[33mDate[39m][MDN-Date] object alternate representations of the various times. The[0m
[0m[33mDate[39m and number values are not connected. Assigning a new number value, or[0m
[0mmutating the [33mDate[39m value, will not be reflected in the corresponding alternate[0m
[0mrepresentation.[0m

[0mThe times in the stat object have the following semantics:[0m

    * [0m[33matime[39m "Access Time": Time when file data last accessed. Changed[0m
      [0mby the mknod(2), utimes(2), and read(2) system calls.[0m
    * [0m[33mmtime[39m "Modified Time": Time when file data last modified.[0m
      [0mChanged by the mknod(2), utimes(2), and write(2) system calls.[0m
    * [0m[33mctime[39m "Change Time": Time when file status was last changed[0m
      [0m(inode data modification). Changed by the chmod(2), chown(2),[0m
      [0mlink(2), mknod(2), rename(2), unlink(2), utimes(2),[0m
      [0mread(2), and write(2) system calls.[0m
    * [0m[33mbirthtime[39m "Birth Time": Time of file creation. Set once when the[0m
      [0mfile is created. On filesystems where birthtime is not available,[0m
      [0mthis field may instead hold either the [33mctime[39m or[0m
      [0m[33m1970-01-01T00:00Z[39m (ie, Unix epoch timestamp [33m0[39m). This value may be greater[0m
      [0mthan [33matime[39m or [33mmtime[39m in this case. On Darwin and other FreeBSD variants,[0m
      [0malso set if the [33matime[39m is explicitly set to an earlier value than the current[0m
      [0m[33mbirthtime[39m using the utimes(2) system call.[0m

[0mPrior to Node.js 0.12, the [33mctime[39m held the [33mbirthtime[39m on Windows systems. As[0m
[0mof 0.12, [33mctime[39m is not "creation time", and on Unix systems, it never was.[0m

[32m[1m## Class: [33mfs.WriteStream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.93[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends {stream.Writable}[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.93[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the [33mWriteStream[39m's underlying file descriptor has been closed.[0m

[32m[1m### Event: [33m'open'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.93[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer} Integer file descriptor used by the [33mWriteStream[39m.[0m

[0mEmitted when the [33mWriteStream[39m's file is opened.[0m

[32m[1m### Event: [33m'ready'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mEmitted when the [33mfs.WriteStream[39m is ready to be used.[0m

[0mFires immediately after [33m'open'[39m.[0m

[32m[1m### [33mwriteStream.bytesWritten[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.7[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe number of bytes written so far. Does not include data that is still queued[0m
[0mfor writing.[0m

[32m[1m### [33mwriteStream.path[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.93[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe path to the file the stream is writing to as specified in the first[0m
[0margument to [[33mfs.createWriteStream()[39m][]. If [33mpath[39m is passed as a string, then[0m
[0m[33mwriteStream.path[39m will be a string. If [33mpath[39m is passed as a [33mBuffer[39m, then[0m
[0m[33mwriteStream.path[39m will be a [33mBuffer[39m.[0m

[32m[1m### [33mwriteStream.pending[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mThis property is [33mtrue[39m if the underlying file has not been opened yet,[0m
[0mi.e. before the [33m'ready'[39m event is emitted.[0m

[32m[1m## [33mfs.access(path[, mode], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v6.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6534[39m
[90m    description: The constants like `fs.R_OK`, etc which were present directly[39m
[90m                 on `fs` were moved into `fs.constants` as a soft deprecation.[39m
[90m                 Thus for Node.js `< v6.3.0` use `fs`[39m
[90m                 to access those constants, or[39m
[90m                 do something like `(fs.constants || fs).R_OK` to work with all[39m
[90m                 versions.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mmode[39m {integer} [1mDefault:[22m [33mfs.constants.F_OK[39m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mTests a user's permissions for the file or directory specified by [33mpath[39m.[0m
[0mThe [33mmode[39m argument is an optional integer that specifies the accessibility[0m
[0mchecks to be performed. Check [File Access Constants][] for possible values[0m
[0mof [33mmode[39m. It is possible to create a mask consisting of the bitwise OR of[0m
[0mtwo or more values (e.g. [33mfs.constants.W_OK | fs.constants.R_OK[39m).[0m

[0mThe final argument, [33mcallback[39m, is a callback function that is invoked with[0m
[0ma possible error argument. If any of the accessibility checks fail, the error[0m
[0margument will be an [33mError[39m object. The following examples check if[0m
[0m[33mpackage.json[39m exists, and if it is readable or writable.[0m

    [94mconst[39m [37mfile[39m [93m=[39m [92m'package.json'[39m[90m;[39m
    
    [90m// Check if the file exists in the current directory.[39m
    [37mfs[39m[32m.[39m[37maccess[39m[90m([39m[37mfile[39m[32m,[39m [37mfs[39m[32m.[39m[37mconstants[39m[32m.[39m[37mF_OK[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mfile[39m} ${[37merr[39m [93m?[39m [32m'does not exist'[39m [93m:[39m [92m'exists'[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Check if the file is readable.[39m
    [37mfs[39m[32m.[39m[37maccess[39m[90m([39m[37mfile[39m[32m,[39m [37mfs[39m[32m.[39m[37mconstants[39m[32m.[39m[37mR_OK[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mfile[39m} ${[37merr[39m [93m?[39m [32m'is not readable'[39m [93m:[39m [92m'is readable'[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Check if the file is writable.[39m
    [37mfs[39m[32m.[39m[37maccess[39m[90m([39m[37mfile[39m[32m,[39m [37mfs[39m[32m.[39m[37mconstants[39m[32m.[39m[37mW_OK[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mfile[39m} ${[37merr[39m [93m?[39m [32m'is not writable'[39m [93m:[39m [92m'is writable'[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Check if the file exists in the current directory, and if it is writable.[39m
    [37mfs[39m[32m.[39m[37maccess[39m[90m([39m[37mfile[39m[32m,[39m [37mfs[39m[32m.[39m[37mconstants[39m[32m.[39m[37mF_OK[39m [93m|[39m [37mfs[39m[32m.[39m[37mconstants[39m[32m.[39m[37mW_OK[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m
          `${[37mfile[39m} ${[37merr[39m[32m.[39m[37mcode[39m [93m===[39m [92m'ENOENT'[39m [93m?[39m [32m'does not exist'[39m [93m:[39m [92m'is read-only'[39m}`[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`${[37mfile[39m} exists, and it is writable`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mUsing [33mfs.access()[39m to check for the accessibility of a file before calling[0m
[0m[33mfs.open()[39m, [33mfs.readFile()[39m or [33mfs.writeFile()[39m is not recommended. Doing[0m
[0mso introduces a race condition, since other processes may change the file's[0m
[0mstate between the two calls. Instead, user code should open/read/write the[0m
[0mfile directly and handle the error raised if the file is not accessible.[0m

[0m[1mwrite (NOT RECOMMENDED)[22m[0m

    [37mfs[39m[32m.[39m[37maccess[39m[90m([39m[92m'myfile'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[93m![39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'myfile already exists'[39m[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
    
      [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'myfile'[39m[32m,[39m [92m'wx'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
        [37mwriteMyData[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[1mwrite (RECOMMENDED)[22m[0m

    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'myfile'[39m[32m,[39m [92m'wx'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[32m.[39m[37mcode[39m [93m===[39m [92m'EEXIST'[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'myfile already exists'[39m[90m)[39m[90m;[39m
          [31mreturn[39m[90m;[39m
        [33m}[39m
    
        [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m
    
      [37mwriteMyData[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[1mread (NOT RECOMMENDED)[22m[0m

    [37mfs[39m[32m.[39m[37maccess[39m[90m([39m[92m'myfile'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[32m.[39m[37mcode[39m [93m===[39m [92m'ENOENT'[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'myfile does not exist'[39m[90m)[39m[90m;[39m
          [31mreturn[39m[90m;[39m
        [33m}[39m
    
        [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m
    
      [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'myfile'[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
        [37mreadMyData[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[1mread (RECOMMENDED)[22m[0m

    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'myfile'[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[32m.[39m[37mcode[39m [93m===[39m [92m'ENOENT'[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'myfile does not exist'[39m[90m)[39m[90m;[39m
          [31mreturn[39m[90m;[39m
        [33m}[39m
    
        [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m
    
      [37mreadMyData[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe "not recommended" examples above check for accessibility and then use the[0m
[0mfile; the "recommended" examples are better because they use the file directly[0m
[0mand handle the error, if any.[0m

[0mIn general, check for the accessibility of a file only if the file will not be[0m
[0mused directly, for example when its accessibility is a signal from another[0m
[0mprocess.[0m

[0mOn Windows, access-control policies (ACLs) on a directory may limit access to[0m
[0ma file or directory. The [33mfs.access()[39m function, however, does not check the[0m
[0mACL and therefore may report that a path is accessible even if the ACL restricts[0m
[0mthe user from reading or writing to it.[0m

[32m[1m## [33mfs.accessSync(path[, mode])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mmode[39m {integer} [1mDefault:[22m [33mfs.constants.F_OK[39m[0m

[0mSynchronously tests a user's permissions for the file or directory specified[0m
[0mby [33mpath[39m. The [33mmode[39m argument is an optional integer that specifies the[0m
[0maccessibility checks to be performed. Check [File Access Constants][] for[0m
[0mpossible values of [33mmode[39m. It is possible to create a mask consisting of[0m
[0mthe bitwise OR of two or more values[0m
[0m(e.g. [33mfs.constants.W_OK | fs.constants.R_OK[39m).[0m

[0mIf any of the accessibility checks fail, an [33mError[39m will be thrown. Otherwise,[0m
[0mthe method will return [33mundefined[39m.[0m

    [36mtry[39m [33m{[39m
      [37mfs[39m[32m.[39m[37maccessSync[39m[90m([39m[92m'etc/passwd'[39m[32m,[39m [37mfs[39m[32m.[39m[37mconstants[39m[32m.[39m[37mR_OK[39m [93m|[39m [37mfs[39m[32m.[39m[37mconstants[39m[32m.[39m[37mW_OK[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'can read/write'[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'no access!'[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## [33mfs.appendFile(path, data[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.7[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7831[39m
[90m    description: The passed `options` object will never be modified.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3163[39m
[90m    description: The `file` parameter can be a file descriptor now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL|number} filename or file descriptor[0m
    * [0m[33mdata[39m {string|Buffer}[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {integer} [1mDefault:[22m [33m0o666[39m[0m[0m[0m
      [0m
        * [0m[0m[33mflag[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m [33m'a'[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronously append data to a file, creating the file if it does not yet[0m
[0mexist. [33mdata[39m can be a string or a [[33mBuffer[39m][].[0m

    [37mfs[39m[32m.[39m[37mappendFile[39m[90m([39m[92m'message.txt'[39m[32m,[39m [92m'data to append'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'The "data to append" was appended to file!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf [33moptions[39m is a string, then it specifies the encoding:[0m

    [37mfs[39m[32m.[39m[37mappendFile[39m[90m([39m[92m'message.txt'[39m[32m,[39m [92m'data to append'[39m[32m,[39m [92m'utf8'[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m

[0mThe [33mpath[39m may be specified as a numeric file descriptor that has been opened[0m
[0mfor appending (using [33mfs.open()[39m or [33mfs.openSync()[39m). The file descriptor will[0m
[0mnot be closed automatically.[0m

    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'message.txt'[39m[32m,[39m [92m'a'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [37mfs[39m[32m.[39m[37mappendFile[39m[90m([39m[37mfd[39m[32m,[39m [92m'data to append'[39m[32m,[39m [92m'utf8'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [37mfs[39m[32m.[39m[37mclose[39m[90m([39m[37mfd[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
          [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
        [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mfs.appendFileSync(path, data[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.7[39m
[90mchanges:[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7831[39m
[90m    description: The passed `options` object will never be modified.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3163[39m
[90m    description: The `file` parameter can be a file descriptor now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL|number} filename or file descriptor[0m
    * [0m[33mdata[39m {string|Buffer}[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {integer} [1mDefault:[22m [33m0o666[39m[0m[0m[0m
      [0m
        * [0m[0m[33mflag[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m [33m'a'[39m.[0m[0m[0m

[0mSynchronously append data to a file, creating the file if it does not yet[0m
[0mexist. [33mdata[39m can be a string or a [[33mBuffer[39m][].[0m

    [36mtry[39m [33m{[39m
      [37mfs[39m[32m.[39m[37mappendFileSync[39m[90m([39m[92m'message.txt'[39m[32m,[39m [92m'data to append'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'The "data to append" was appended to file!'[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [90m/* Handle the error */[39m
    [33m}[39m

[0mIf [33moptions[39m is a string, then it specifies the encoding:[0m

    [37mfs[39m[32m.[39m[37mappendFileSync[39m[90m([39m[92m'message.txt'[39m[32m,[39m [92m'data to append'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m;[39m

[0mThe [33mpath[39m may be specified as a numeric file descriptor that has been opened[0m
[0mfor appending (using [33mfs.open()[39m or [33mfs.openSync()[39m). The file descriptor will[0m
[0mnot be closed automatically.[0m

    [94mlet[39m [37mfd[39m[90m;[39m
    
    [36mtry[39m [33m{[39m
      [37mfd[39m [93m=[39m [37mfs[39m[32m.[39m[37mopenSync[39m[90m([39m[92m'message.txt'[39m[32m,[39m [92m'a'[39m[90m)[39m[90m;[39m
      [37mfs[39m[32m.[39m[37mappendFileSync[39m[90m([39m[37mfd[39m[32m,[39m [92m'data to append'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [90m/* Handle the error */[39m
    [33m}[39m [36mfinally[39m [33m{[39m
      [94mif[39m [90m([39m[37mfd[39m [93m!==[39m [90mundefined[39m[90m)[39m
        [37mfs[39m[32m.[39m[37mcloseSync[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## [33mfs.chmod(path, mode, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.30[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mmode[39m {string|integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronously changes the permissions of a file. No arguments other than a[0m
[0mpossible exception are given to the completion callback.[0m

[0mSee also: chmod(2).[0m

    [37mfs[39m[32m.[39m[37mchmod[39m[90m([39m[92m'my_file.txt'[39m[32m,[39m [34m0o775[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'The permissions for file "my_file.txt" have been changed!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### File modes[22m[39m

[0mThe [33mmode[39m argument used in both the [33mfs.chmod()[39m and [33mfs.chmodSync()[39m[0m
[0mmethods is a numeric bitmask created using a logical OR of the following[0m
[0mconstants:[0m

[0m┌──────────────────────┬───────┬──────────────────────────┐[0m
[0m│ Constant             │ Octal │ Description              │[0m
[0m├──────────────────────┼───────┼──────────────────────────┤[0m
[0m│ [33mfs.constants.S_IRUSR[39m │ [33m0o400[39m │ read by owner            │[0m
[0m├──────────────────────┼───────┼──────────────────────────┤[0m
[0m│ [33mfs.constants.S_IWUSR[39m │ [33m0o200[39m │ write by owner           │[0m
[0m├──────────────────────┼───────┼──────────────────────────┤[0m
[0m│ [33mfs.constants.S_IXUSR[39m │ [33m0o100[39m │ execute/search by owner  │[0m
[0m├──────────────────────┼───────┼──────────────────────────┤[0m
[0m│ [33mfs.constants.S_IRGRP[39m │ [33m0o40[39m  │ read by group            │[0m
[0m├──────────────────────┼───────┼──────────────────────────┤[0m
[0m│ [33mfs.constants.S_IWGRP[39m │ [33m0o20[39m  │ write by group           │[0m
[0m├──────────────────────┼───────┼──────────────────────────┤[0m
[0m│ [33mfs.constants.S_IXGRP[39m │ [33m0o10[39m  │ execute/search by group  │[0m
[0m├──────────────────────┼───────┼──────────────────────────┤[0m
[0m│ [33mfs.constants.S_IROTH[39m │ [33m0o4[39m   │ read by others           │[0m
[0m├──────────────────────┼───────┼──────────────────────────┤[0m
[0m│ [33mfs.constants.S_IWOTH[39m │ [33m0o2[39m   │ write by others          │[0m
[0m├──────────────────────┼───────┼──────────────────────────┤[0m
[0m│ [33mfs.constants.S_IXOTH[39m │ [33m0o1[39m   │ execute/search by others │[0m
[0m└──────────────────────┴───────┴──────────────────────────┘[0m

[0mAn easier method of constructing the [33mmode[39m is to use a sequence of three[0m
[0moctal digits (e.g. [33m765[39m). The left-most digit ([33m7[39m in the example), specifies[0m
[0mthe permissions for the file owner. The middle digit ([33m6[39m in the example),[0m
[0mspecifies permissions for the group. The right-most digit ([33m5[39m in the example),[0m
[0mspecifies the permissions for others.[0m

[0m┌────────┬──────────────────────────┐[0m
[0m│ Number │ Description              │[0m
[0m├────────┼──────────────────────────┤[0m
[0m│ [33m7[39m      │ read, write, and execute │[0m
[0m├────────┼──────────────────────────┤[0m
[0m│ [33m6[39m      │ read and write           │[0m
[0m├────────┼──────────────────────────┤[0m
[0m│ [33m5[39m      │ read and execute         │[0m
[0m├────────┼──────────────────────────┤[0m
[0m│ [33m4[39m      │ read only                │[0m
[0m├────────┼──────────────────────────┤[0m
[0m│ [33m3[39m      │ write and execute        │[0m
[0m├────────┼──────────────────────────┤[0m
[0m│ [33m2[39m      │ write only               │[0m
[0m├────────┼──────────────────────────┤[0m
[0m│ [33m1[39m      │ execute only             │[0m
[0m├────────┼──────────────────────────┤[0m
[0m│ [33m0[39m      │ no permission            │[0m
[0m└────────┴──────────────────────────┘[0m

[0mFor example, the octal value [33m0o765[39m means:[0m

    * [0mThe owner may read, write and execute the file.[0m
    * [0mThe group may read and write the file.[0m
    * [0mOthers may read and execute the file.[0m

[0mWhen using raw numbers where file modes are expected, any value larger than[0m
[0m[33m0o777[39m may result in platform-specific behaviors that are not supported to work[0m
[0mconsistently. Therefore constants like [33mS_ISVTX[39m, [33mS_ISGID[39m or [33mS_ISUID[39m are not[0m
[0mexposed in [33mfs.constants[39m.[0m

[0mCaveats: on Windows only the write permission can be changed, and the[0m
[0mdistinction among the permissions of group, owner or others is not[0m
[0mimplemented.[0m

[32m[1m## [33mfs.chmodSync(path, mode)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.7[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mmode[39m {string|integer}[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.chmod()[39m][].[0m

[0mSee also: chmod(2).[0m

[32m[1m## [33mfs.chown(path, uid, gid, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.97[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33muid[39m {integer}[0m
    * [0m[33mgid[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronously changes owner and group of a file. No arguments other than a[0m
[0mpossible exception are given to the completion callback.[0m

[0mSee also: chown(2).[0m

[32m[1m## [33mfs.chownSync(path, uid, gid)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.97[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33muid[39m {integer}[0m
    * [0m[33mgid[39m {integer}[0m

[0mSynchronously changes owner and group of a file. Returns [33mundefined[39m.[0m
[0mThis is the synchronous version of [[33mfs.chown()[39m][].[0m

[0mSee also: chown(2).[0m

[32m[1m## [33mfs.close(fd, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous close(2). No arguments other than a possible exception are given[0m
[0mto the completion callback.[0m

[0mCalling [33mfs.close()[39m on any file descriptor ([33mfd[39m) that is currently in use[0m
[0mthrough any other [33mfs[39m operation may lead to undefined behavior.[0m

[32m[1m## [33mfs.closeSync(fd)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m

[0mSynchronous close(2). Returns [33mundefined[39m.[0m

[0mCalling [33mfs.closeSync()[39m on any file descriptor ([33mfd[39m) that is currently in use[0m
[0mthrough any other [33mfs[39m operation may lead to undefined behavior.[0m

[32m[1m## [33mfs.constants[39m[32m[22m[39m

    * [0m{Object}[0m

[0mReturns an object containing commonly used constants for file system[0m
[0moperations. The specific constants currently defined are described in[0m
[0m[FS Constants][].[0m

[32m[1m## [33mfs.copyFile(src, dest[, mode], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msrc[39m {string|Buffer|URL} source filename to copy[0m
    * [0m[33mdest[39m {string|Buffer|URL} destination filename of the copy operation[0m
    * [0m[33mmode[39m {integer} modifiers for copy operation. [1mDefault:[22m [33m0[39m.[0m
    * [0m[33mcallback[39m {Function}[0m

[0mAsynchronously copies [33msrc[39m to [33mdest[39m. By default, [33mdest[39m is overwritten if it[0m
[0malready exists. No arguments other than a possible exception are given to the[0m
[0mcallback function. Node.js makes no guarantees about the atomicity of the copy[0m
[0moperation. If an error occurs after the destination file has been opened for[0m
[0mwriting, Node.js will attempt to remove the destination.[0m

[0m[33mmode[39m is an optional integer that specifies the behavior[0m
[0mof the copy operation. It is possible to create a mask consisting of the bitwise[0m
[0mOR of two or more values (e.g.[0m
[0m[33mfs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE[39m).[0m

    * [0m[33mfs.constants.COPYFILE_EXCL[39m: The copy operation will fail if [33mdest[39m already[0m
      [0mexists.[0m
    * [0m[33mfs.constants.COPYFILE_FICLONE[39m: The copy operation will attempt to create a[0m
      [0mcopy-on-write reflink. If the platform does not support copy-on-write, then a[0m
      [0mfallback copy mechanism is used.[0m
    * [0m[33mfs.constants.COPYFILE_FICLONE_FORCE[39m: The copy operation will attempt to[0m
      [0mcreate a copy-on-write reflink. If the platform does not support copy-on-write,[0m
      [0mthen the operation will fail.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mCOPYFILE_EXCL[39m [33m}[39m [93m=[39m [37mfs[39m[32m.[39m[37mconstants[39m[90m;[39m
    
    [94mfunction[39m [37mcallback[39m[90m([39m[37merr[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'source.txt was copied to destination.txt'[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [90m// destination.txt will be created or overwritten by default.[39m
    [37mfs[39m[32m.[39m[37mcopyFile[39m[90m([39m[92m'source.txt'[39m[32m,[39m [92m'destination.txt'[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m
    
    [90m// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.[39m
    [37mfs[39m[32m.[39m[37mcopyFile[39m[90m([39m[92m'source.txt'[39m[32m,[39m [92m'destination.txt'[39m[32m,[39m [37mCOPYFILE_EXCL[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m

[32m[1m## [33mfs.copyFileSync(src, dest[, mode])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msrc[39m {string|Buffer|URL} source filename to copy[0m
    * [0m[33mdest[39m {string|Buffer|URL} destination filename of the copy operation[0m
    * [0m[33mmode[39m {integer} modifiers for copy operation. [1mDefault:[22m [33m0[39m.[0m

[0mSynchronously copies [33msrc[39m to [33mdest[39m. By default, [33mdest[39m is overwritten if it[0m
[0malready exists. Returns [33mundefined[39m. Node.js makes no guarantees about the[0m
[0matomicity of the copy operation. If an error occurs after the destination file[0m
[0mhas been opened for writing, Node.js will attempt to remove the destination.[0m

[0m[33mmode[39m is an optional integer that specifies the behavior[0m
[0mof the copy operation. It is possible to create a mask consisting of the bitwise[0m
[0mOR of two or more values (e.g.[0m
[0m[33mfs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE[39m).[0m

    * [0m[33mfs.constants.COPYFILE_EXCL[39m: The copy operation will fail if [33mdest[39m already[0m
      [0mexists.[0m
    * [0m[33mfs.constants.COPYFILE_FICLONE[39m: The copy operation will attempt to create a[0m
      [0mcopy-on-write reflink. If the platform does not support copy-on-write, then a[0m
      [0mfallback copy mechanism is used.[0m
    * [0m[33mfs.constants.COPYFILE_FICLONE_FORCE[39m: The copy operation will attempt to[0m
      [0mcreate a copy-on-write reflink. If the platform does not support copy-on-write,[0m
      [0mthen the operation will fail.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mCOPYFILE_EXCL[39m [33m}[39m [93m=[39m [37mfs[39m[32m.[39m[37mconstants[39m[90m;[39m
    
    [90m// destination.txt will be created or overwritten by default.[39m
    [37mfs[39m[32m.[39m[37mcopyFileSync[39m[90m([39m[92m'source.txt'[39m[32m,[39m [92m'destination.txt'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'source.txt was copied to destination.txt'[39m[90m)[39m[90m;[39m
    
    [90m// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.[39m
    [37mfs[39m[32m.[39m[37mcopyFileSync[39m[90m([39m[92m'source.txt'[39m[32m,[39m [92m'destination.txt'[39m[32m,[39m [37mCOPYFILE_EXCL[39m[90m)[39m[90m;[39m

[32m[1m## [33mfs.createReadStream(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v12.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29212[39m
[90m    description: Enable `emitClose` option.[39m
[90m  - version: v11.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19898[39m
[90m    description: Impose new restrictions on `start` and `end`, throwing[39m
[90m                 more appropriate errors in cases when we cannot reasonably[39m
[90m                 handle the input values.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7831[39m
[90m    description: The passed `options` object will never be modified.[39m
[90m  - version: v2.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/1845[39m
[90m    description: The passed `options` object can be a string now.[39m
[90m  - version: v13.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29083[39m
[90m    description: The `fs` options allow overriding the used `fs`[39m
[90m                 implementation.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mflags[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m'r'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33mnull[39m[0m[0m[0m
      [0m
        * [0m[0m[33mfd[39m {integer} [1mDefault:[22m [33mnull[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {integer} [1mDefault:[22m [33m0o666[39m[0m[0m[0m
      [0m
        * [0m[0m[33mautoClose[39m {boolean} [1mDefault:[22m [33mtrue[39m[0m[0m[0m
      [0m
        * [0m[0m[33memitClose[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
      [0m
        * [0m[0m[33mstart[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mend[39m {integer} [1mDefault:[22m [33mInfinity[39m[0m[0m[0m
      [0m
        * [0m[0m[33mhighWaterMark[39m {integer} [1mDefault:[22m [33m64 * 1024[39m[0m[0m[0m
      [0m
        * [0m[0m[33mfs[39m {Object|null} [1mDefault:[22m [33mnull[39m[0m[0m[0m
    * [0mReturns: {fs.ReadStream} See [Readable Stream][].[0m

[0mUnlike the 16 kb default [33mhighWaterMark[39m for a readable stream, the stream[0m
[0mreturned by this method has a default [33mhighWaterMark[39m of 64 kb.[0m

[0m[33moptions[39m can include [33mstart[39m and [33mend[39m values to read a range of bytes from[0m
[0mthe file instead of the entire file. Both [33mstart[39m and [33mend[39m are inclusive and[0m
[0mstart counting at 0, allowed values are in the[0m
[0m[0, [[33mNumber.MAX_SAFE_INTEGER[39m][]] range. If [33mfd[39m is specified and [33mstart[39m is[0m
[0momitted or [33mundefined[39m, [33mfs.createReadStream()[39m reads sequentially from the[0m
[0mcurrent file position. The [33mencoding[39m can be any one of those accepted by[0m
[0m[[33mBuffer[39m][].[0m

[0mIf [33mfd[39m is specified, [33mReadStream[39m will ignore the [33mpath[39m argument and will use[0m
[0mthe specified file descriptor. This means that no [33m'open'[39m event will be[0m
[0memitted. [33mfd[39m should be blocking; non-blocking [33mfd[39ms should be passed to[0m
[0m[[33mnet.Socket[39m][].[0m

[0mIf [33mfd[39m points to a character device that only supports blocking reads[0m
[0m(such as keyboard or sound card), read operations do not finish until data is[0m
[0mavailable. This can prevent the process from exiting and the stream from[0m
[0mclosing naturally.[0m

[0mBy default, the stream will not emit a [33m'close'[39m event after it has been[0m
[0mdestroyed. This is the opposite of the default for other [33mReadable[39m streams.[0m
[0mSet the [33memitClose[39m option to [33mtrue[39m to change this behavior.[0m

[0mBy providing the [33mfs[39m option, it is possible to override the corresponding [33mfs[39m[0m
[0mimplementations for [33mopen[39m, [33mread[39m, and [33mclose[39m. When providing the [33mfs[39m option,[0m
[0moverrides for [33mopen[39m, [33mread[39m, and [33mclose[39m are required.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [90m// Create a stream from some character device.[39m
    [94mconst[39m [37mstream[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'/dev/input/event0'[39m[90m)[39m[90m;[39m
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mstream[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m [90m// This may not close the stream.[39m
      [90m// Artificially marking end-of-stream, as if the underlying resource had[39m
      [90m// indicated end-of-file by itself, allows the stream to close.[39m
      [90m// This does not cancel pending read operations, and if there is such an[39m
      [90m// operation, the process may still not be able to exit successfully[39m
      [90m// until it finishes.[39m
      [37mstream[39m[32m.[39m[37mpush[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
      [37mstream[39m[32m.[39m[37mread[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [33m}[39m[32m,[39m [34m100[39m[90m)[39m[90m;[39m

[0mIf [33mautoClose[39m is false, then the file descriptor won't be closed, even if[0m
[0mthere's an error. It is the application's responsibility to close it and make[0m
[0msure there's no file descriptor leak. If [33mautoClose[39m is set to true (default[0m
[0mbehavior), on [33m'error'[39m or [33m'end'[39m the file descriptor will be closed[0m
[0mautomatically.[0m

[0m[33mmode[39m sets the file mode (permission and sticky bits), but only if the[0m
[0mfile was created.[0m

[0mAn example to read the last 10 bytes of a file which is 100 bytes long:[0m

    [37mfs[39m[32m.[39m[37mcreateReadStream[39m[90m([39m[92m'sample.txt'[39m[32m,[39m [33m{[39m [37mstart[39m[93m:[39m [34m90[39m[32m,[39m [37mend[39m[93m:[39m [34m99[39m [33m}[39m[90m)[39m[90m;[39m

[0mIf [33moptions[39m is a string, then it specifies the encoding.[0m

[32m[1m## [33mfs.createWriteStream(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v12.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29212[39m
[90m    description: Enable `emitClose` option.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7831[39m
[90m    description: The passed `options` object will never be modified.[39m
[90m  - version: v5.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3679[39m
[90m    description: The `autoClose` option is supported now.[39m
[90m  - version: v2.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/1845[39m
[90m    description: The passed `options` object can be a string now.[39m
[90m  - version: v13.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29083[39m
[90m    description: The `fs` options allow overriding the used `fs`[39m
[90m                 implementation.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mflags[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m'w'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mfd[39m {integer} [1mDefault:[22m [33mnull[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {integer} [1mDefault:[22m [33m0o666[39m[0m[0m[0m
      [0m
        * [0m[0m[33mautoClose[39m {boolean} [1mDefault:[22m [33mtrue[39m[0m[0m[0m
      [0m
        * [0m[0m[33memitClose[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
      [0m
        * [0m[0m[33mstart[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mfs[39m {Object|null} [1mDefault:[22m [33mnull[39m[0m[0m[0m
    * [0mReturns: {fs.WriteStream} See [Writable Stream][].[0m

[0m[33moptions[39m may also include a [33mstart[39m option to allow writing data at some[0m
[0mposition past the beginning of the file, allowed values are in the[0m
[0m[0, [[33mNumber.MAX_SAFE_INTEGER[39m][]] range. Modifying a file rather than replacing[0m
[0mit may require the [33mflags[39m option to be set to [33mr+[39m rather than the default [33mw[39m.[0m
[0mThe [33mencoding[39m can be any one of those accepted by [[33mBuffer[39m][].[0m

[0mIf [33mautoClose[39m is set to true (default behavior) on [33m'error'[39m or [33m'finish'[39m[0m
[0mthe file descriptor will be closed automatically. If [33mautoClose[39m is false,[0m
[0mthen the file descriptor won't be closed, even if there's an error.[0m
[0mIt is the application's responsibility to close it and make sure there's no[0m
[0mfile descriptor leak.[0m

[0mBy default, the stream will not emit a [33m'close'[39m event after it has been[0m
[0mdestroyed. This is the opposite of the default for other [33mWritable[39m streams.[0m
[0mSet the [33memitClose[39m option to [33mtrue[39m to change this behavior.[0m

[0mBy providing the [33mfs[39m option it is possible to override the corresponding [33mfs[39m[0m
[0mimplementations for [33mopen[39m, [33mwrite[39m, [33mwritev[39m and [33mclose[39m. Overriding [33mwrite()[39m[0m
[0mwithout [33mwritev()[39m can reduce performance as some optimizations ([33m_writev()[39m)[0m
[0mwill be disabled. When providing the [33mfs[39m option,  overrides for [33mopen[39m,[0m
[0m[33mclose[39m, and at least one of [33mwrite[39m and [33mwritev[39m are required.[0m

[0mLike [[33mReadStream[39m][], if [33mfd[39m is specified, [[33mWriteStream[39m][] will ignore the[0m
[0m[33mpath[39m argument and will use the specified file descriptor. This means that no[0m
[0m[33m'open'[39m event will be emitted. [33mfd[39m should be blocking; non-blocking [33mfd[39ms[0m
[0mshould be passed to [[33mnet.Socket[39m][].[0m

[0mIf [33moptions[39m is a string, then it specifies the encoding.[0m

[32m[1m## [33mfs.exists(path, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90mdeprecated: v1.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [[33mfs.stat()[39m[90m][] or [[33mfs.access()[39m[90m][] instead.[0m[23m[39m

    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33mexists[39m {boolean}[0m[0m[0m

[0mTest whether or not the given path exists by checking with the file system.[0m
[0mThen call the [33mcallback[39m argument with either true or false:[0m

    [37mfs[39m[32m.[39m[37mexists[39m[90m([39m[92m'/etc/passwd'[39m[32m,[39m [90m([39m[37mexists[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mexists[39m [93m?[39m [32m'it\'s there'[39m [93m:[39m [92m'no passwd!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[1mThe parameters for this callback are not consistent with other Node.js[22m[0m
[0m[1mcallbacks.[22m Normally, the first parameter to a Node.js callback is an [33merr[39m[0m
[0mparameter, optionally followed by other parameters. The [33mfs.exists()[39m callback[0m
[0mhas only one boolean parameter. This is one reason [33mfs.access()[39m is recommended[0m
[0minstead of [33mfs.exists()[39m.[0m

[0mUsing [33mfs.exists()[39m to check for the existence of a file before calling[0m
[0m[33mfs.open()[39m, [33mfs.readFile()[39m or [33mfs.writeFile()[39m is not recommended. Doing[0m
[0mso introduces a race condition, since other processes may change the file's[0m
[0mstate between the two calls. Instead, user code should open/read/write the[0m
[0mfile directly and handle the error raised if the file does not exist.[0m

[0m[1mwrite (NOT RECOMMENDED)[22m[0m

    [37mfs[39m[32m.[39m[37mexists[39m[90m([39m[92m'myfile'[39m[32m,[39m [90m([39m[37mexists[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mexists[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'myfile already exists'[39m[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'myfile'[39m[32m,[39m [92m'wx'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
          [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
          [37mwriteMyData[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[1mwrite (RECOMMENDED)[22m[0m

    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'myfile'[39m[32m,[39m [92m'wx'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[32m.[39m[37mcode[39m [93m===[39m [92m'EEXIST'[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'myfile already exists'[39m[90m)[39m[90m;[39m
          [31mreturn[39m[90m;[39m
        [33m}[39m
    
        [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m
    
      [37mwriteMyData[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[1mread (NOT RECOMMENDED)[22m[0m

    [37mfs[39m[32m.[39m[37mexists[39m[90m([39m[92m'myfile'[39m[32m,[39m [90m([39m[37mexists[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mexists[39m[90m)[39m [33m{[39m
        [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'myfile'[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
          [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
          [37mreadMyData[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'myfile does not exist'[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[1mread (RECOMMENDED)[22m[0m

    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'myfile'[39m[32m,[39m [92m'r'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37merr[39m[32m.[39m[37mcode[39m [93m===[39m [92m'ENOENT'[39m[90m)[39m [33m{[39m
          [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'myfile does not exist'[39m[90m)[39m[90m;[39m
          [31mreturn[39m[90m;[39m
        [33m}[39m
    
        [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m
    
      [37mreadMyData[39m[90m([39m[37mfd[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe "not recommended" examples above check for existence and then use the[0m
[0mfile; the "recommended" examples are better because they use the file directly[0m
[0mand handle the error, if any.[0m

[0mIn general, check for the existence of a file only if the file won’t be[0m
[0mused directly, for example when its existence is a signal from another[0m
[0mprocess.[0m

[32m[1m## [33mfs.existsSync(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the path exists, [33mfalse[39m otherwise.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.exists()[39m][].[0m

[0m[33mfs.exists()[39m is deprecated, but [33mfs.existsSync()[39m is not. The [33mcallback[39m[0m
[0mparameter to [33mfs.exists()[39m accepts parameters that are inconsistent with other[0m
[0mNode.js callbacks. [33mfs.existsSync()[39m does not use a callback.[0m

    [94mif[39m [90m([39m[37mfs[39m[32m.[39m[37mexistsSync[39m[90m([39m[92m'/etc/passwd'[39m[90m)[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'The path exists.'[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## [33mfs.fchmod(fd, mode, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.7[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mmode[39m {string|integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous fchmod(2). No arguments other than a possible exception[0m
[0mare given to the completion callback.[0m

[32m[1m## [33mfs.fchmodSync(fd, mode)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mmode[39m {string|integer}[0m

[0mSynchronous fchmod(2). Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.fchown(fd, uid, gid, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.7[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33muid[39m {integer}[0m
    * [0m[33mgid[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous fchown(2). No arguments other than a possible exception are given[0m
[0mto the completion callback.[0m

[32m[1m## [33mfs.fchownSync(fd, uid, gid)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33muid[39m {integer}[0m
    * [0m[33mgid[39m {integer}[0m

[0mSynchronous fchown(2). Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.fdatasync(fd, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.96[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous fdatasync(2). No arguments other than a possible exception are[0m
[0mgiven to the completion callback.[0m

[32m[1m## [33mfs.fdatasyncSync(fd)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.96[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m

[0mSynchronous fdatasync(2). Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.fstat(fd[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.95[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: Accepts an additional `options` object to specify whether[39m
[90m                 the numeric values returned should be bigint.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} Whether the numeric values in the returned[0m[0m[0m
      [0m      [0m[0m[[33mfs.Stats[39m][] object should be [33mbigint[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mstats[39m {fs.Stats}[0m[0m[0m

[0mAsynchronous fstat(2). The callback gets two arguments [33m(err, stats)[39m where[0m
[0m[33mstats[39m is an [[33mfs.Stats[39m][] object. [33mfstat()[39m is identical to [[33mstat()[39m][],[0m
[0mexcept that the file to be stat-ed is specified by the file descriptor [33mfd[39m.[0m

[32m[1m## [33mfs.fstatSync(fd[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.95[39m
[90mchanges:[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: Accepts an additional `options` object to specify whether[39m
[90m                 the numeric values returned should be bigint.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} Whether the numeric values in the returned[0m[0m[0m
      [0m      [0m[0m[[33mfs.Stats[39m][] object should be [33mbigint[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {fs.Stats}[0m

[0mSynchronous fstat(2).[0m

[32m[1m## [33mfs.fsync(fd, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.96[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous fsync(2). No arguments other than a possible exception are given[0m
[0mto the completion callback.[0m

[32m[1m## [33mfs.fsyncSync(fd)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.96[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m

[0mSynchronous fsync(2). Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.ftruncate(fd[, len], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.6[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mlen[39m {integer} [1mDefault:[22m [33m0[39m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous ftruncate(2). No arguments other than a possible exception are[0m
[0mgiven to the completion callback.[0m

[0mIf the file referred to by the file descriptor was larger than [33mlen[39m bytes, only[0m
[0mthe first [33mlen[39m bytes will be retained in the file.[0m

[0mFor example, the following program retains only the first four bytes of the[0m
[0mfile:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: Node.js[39m
    
    [90m// get the file descriptor of the file to be truncated[39m
    [94mconst[39m [37mfd[39m [93m=[39m [37mfs[39m[32m.[39m[37mopenSync[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'r+'[39m[90m)[39m[90m;[39m
    
    [90m// Truncate the file to first four bytes[39m
    [37mfs[39m[32m.[39m[37mftruncate[39m[90m([39m[37mfd[39m[32m,[39m [34m4[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [37massert[39m[32m.[39m[37mifError[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Prints: Node[39m

[0mIf the file previously was shorter than [33mlen[39m bytes, it is extended, and the[0m
[0mextended part is filled with null bytes ([33m'\0'[39m):[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: Node.js[39m
    
    [90m// get the file descriptor of the file to be truncated[39m
    [94mconst[39m [37mfd[39m [93m=[39m [37mfs[39m[32m.[39m[37mopenSync[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'r+'[39m[90m)[39m[90m;[39m
    
    [90m// Truncate the file to 10 bytes, whereas the actual size is 7 bytes[39m
    [37mfs[39m[32m.[39m[37mftruncate[39m[90m([39m[37mfd[39m[32m,[39m [34m10[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [37massert[39m[32m.[39m[37mifError[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'temp.txt'[39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Prints: <Buffer 4e 6f 64 65 2e 6a 73 00 00 00>[39m
    [90m// ('Node.js\0\0\0' in UTF8)[39m

[0mThe last three bytes are null bytes ([33m'\0'[39m), to compensate the over-truncation.[0m

[32m[1m## [33mfs.ftruncateSync(fd[, len])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mlen[39m {integer} [1mDefault:[22m [33m0[39m[0m

[0mReturns [33mundefined[39m.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.ftruncate()[39m][].[0m

[32m[1m## [33mfs.futimes(fd, atime, mtime, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.2[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v4.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2387[39m
[90m    description: Numeric strings, `NaN` and `Infinity` are now allowed[39m
[90m                 time specifiers.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33matime[39m {number|string|Date}[0m
    * [0m[33mmtime[39m {number|string|Date}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mChange the file system timestamps of the object referenced by the supplied file[0m
[0mdescriptor. See [[33mfs.utimes()[39m][].[0m

[0mThis function does not work on AIX versions before 7.1, it will return the[0m
[0merror [33mUV_ENOSYS[39m.[0m

[32m[1m## [33mfs.futimesSync(fd, atime, mtime)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.2[39m
[90mchanges:[39m
[90m  - version: v4.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2387[39m
[90m    description: Numeric strings, `NaN` and `Infinity` are now allowed[39m
[90m                 time specifiers.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33matime[39m {number|string|Date}[0m
    * [0m[33mmtime[39m {number|string|Date}[0m

[0mSynchronous version of [[33mfs.futimes()[39m][]. Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.lchmod(path, mode, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v0.4.7[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mmode[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous lchmod(2). No arguments other than a possible exception[0m
[0mare given to the completion callback.[0m

[0mOnly available on macOS.[0m

[32m[1m## [33mfs.lchmodSync(path, mode)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v0.4.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mmode[39m {integer}[0m

[0mSynchronous lchmod(2). Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.lchown(path, uid, gid, callback)[39m[32m[22m[39m

[0m<!-- YAML[0m
[0mchanges:[0m

    * [0mversion: v10.6.0[0m
      [0mpr-url: [34m[34m[4mhttps://github.com/nodejs/node/pull/21498[24m[39m[34m[39m[0m
      [0mdescription: This API is no longer depreca[0m

[0mted.[0m

    * [0mversion: v10.0.0[0m
      [0mpr-url: [34m[34m[4mhttps://github.com/nodejs/node/pull/12562[24m[39m[34m[39m[0m
      [0mdescription: The [33mcallback[39m parameter is no longer optional. Not passing    [33m         it will throw a `TypeError` at runtime.[39m[0m
    * [0mversion: v7.0.0[0m
      [0mpr-url: [34m[34m[4mhttps://github.com/nodejs/node/pull/7897[24m[39m[34m[39m[0m
      [0mdescription: The [33mcallback[39m parameter is no longer optional. Not passing    [33m         it will emit a deprecation warning with id DEP0013.[39m[0m
      [0m[0m
      [0m-->[0m

    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33muid[39m {integer}[0m
    * [0m[33mgid[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous lchown(2). No arguments other than a possible exception are given[0m
[0mto the completion callback.[0m

[32m[1m## [33mfs.lchownSync(path, uid, gid)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v10.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21498[39m
[90m    description: This API is no longer deprecated.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33muid[39m {integer}[0m
    * [0m[33mgid[39m {integer}[0m

[0mSynchronous lchown(2). Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.link(existingPath, newPath, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `existingPath` and `newPath` parameters can be WHATWG[39m
[90m                 `URL` objects using `file:` protocol. Support is currently[39m
[90m                 still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mexistingPath[39m {string|Buffer|URL}[0m
    * [0m[33mnewPath[39m {string|Buffer|URL}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous link(2). No arguments other than a possible exception are given to[0m
[0mthe completion callback.[0m

[32m[1m## [33mfs.linkSync(existingPath, newPath)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `existingPath` and `newPath` parameters can be WHATWG[39m
[90m                 `URL` objects using `file:` protocol. Support is currently[39m
[90m                 still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mexistingPath[39m {string|Buffer|URL}[0m
    * [0m[33mnewPath[39m {string|Buffer|URL}[0m

[0mSynchronous link(2). Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.lstat(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.30[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: Accepts an additional `options` object to specify whether[39m
[90m                 the numeric values returned should be bigint.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} Whether the numeric values in the returned[0m[0m[0m
      [0m      [0m[0m[[33mfs.Stats[39m][] object should be [33mbigint[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mstats[39m {fs.Stats}[0m[0m[0m

[0mAsynchronous lstat(2). The callback gets two arguments [33m(err, stats)[39m where[0m
[0m[33mstats[39m is a [[33mfs.Stats[39m][] object. [33mlstat()[39m is identical to [33mstat()[39m,[0m
[0mexcept that if [33mpath[39m is a symbolic link, then the link itself is stat-ed,[0m
[0mnot the file that it refers to.[0m

[32m[1m## [33mfs.lstatSync(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.30[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: Accepts an additional `options` object to specify whether[39m
[90m                 the numeric values returned should be bigint.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} Whether the numeric values in the returned[0m[0m[0m
      [0m      [0m[0m[[33mfs.Stats[39m][] object should be [33mbigint[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {fs.Stats}[0m

[0mSynchronous lstat(2).[0m

[32m[1m## [33mfs.mkdir(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.8[39m
[90mchanges:[39m
[90m  - version: v13.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31530[39m
[90m    description: In `recursive` mode, the callback now receives the first[39m
[90m                 created path as an argument.[39m
[90m  - version: v10.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21875[39m
[90m    description: The second argument can now be an `options` object with[39m
[90m                 `recursive` and `mode` properties.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object|integer}
        * [0m[0m[33mrecursive[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {string|integer} Not supported on Windows. [1mDefault:[22m [33m0o777[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronously creates a directory.[0m

[0mThe callback is given a possible exception and, if [33mrecursive[39m is [33mtrue[39m, the[0m
[0mfirst folder path created, [33m(err, [path])[39m.[0m

[0mThe optional [33moptions[39m argument can be an integer specifying [33mmode[39m (permission[0m
[0mand sticky bits), or an object with a [33mmode[39m property and a [33mrecursive[39m[0m
[0mproperty indicating whether parent folders should be created. Calling[0m
[0m[33mfs.mkdir()[39m when [33mpath[39m is a directory that exists results in an error only[0m
[0mwhen [33mrecursive[39m is false.[0m

    [90m// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.[39m
    [37mfs[39m[32m.[39m[37mmkdir[39m[90m([39m[92m'/tmp/a/apple'[39m[32m,[39m [33m{[39m [37mrecursive[39m[93m:[39m [91mtrue[39m [33m}[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOn Windows, using [33mfs.mkdir()[39m on the root directory even with recursion will[0m
[0mresult in an error:[0m

    [37mfs[39m[32m.[39m[37mmkdir[39m[90m([39m[92m'/'[39m[32m,[39m [33m{[39m [37mrecursive[39m[93m:[39m [91mtrue[39m [33m}[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// => [Error: EPERM: operation not permitted, mkdir 'C:\'][39m
    [33m}[39m[90m)[39m[90m;[39m

[0mSee also: mkdir(2).[0m

[32m[1m## [33mfs.mkdirSync(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v13.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31530[39m
[90m    description: In `recursive` mode, the first created path is returned now.[39m
[90m  - version: v10.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21875[39m
[90m    description: The second argument can now be an `options` object with[39m
[90m                 `recursive` and `mode` properties.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object|integer}
        * [0m[0m[33mrecursive[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {string|integer} Not supported on Windows. [1mDefault:[22m [33m0o777[39m.[0m[0m[0m
    * [0mReturns: {string|undefined}[0m

[0mSynchronously creates a directory. Returns [33mundefined[39m, or if [33mrecursive[39m is[0m
[0m[33mtrue[39m, the first folder path created.[0m
[0mThis is the synchronous version of [[33mfs.mkdir()[39m][].[0m

[0mSee also: mkdir(2).[0m

[32m[1m## [33mfs.mkdtemp(prefix[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v6.2.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6828[39m
[90m    description: The `callback` parameter is optional now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mprefix[39m {string}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mfolder[39m {string}[0m[0m[0m

[0mCreates a unique temporary directory.[0m

[0mGenerates six random characters to be appended behind a required[0m
[0m[33mprefix[39m to create a unique temporary directory. Due to platform[0m
[0minconsistencies, avoid trailing [33mX[39m characters in [33mprefix[39m. Some platforms,[0m
[0mnotably the BSDs, can return more than six random characters, and replace[0m
[0mtrailing [33mX[39m characters in [33mprefix[39m with random characters.[0m

[0mThe created folder path is passed as a string to the callback's second[0m
[0mparameter.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use.[0m

    [37mfs[39m[32m.[39m[37mmkdtemp[39m[90m([39m[37mpath[39m[32m.[39m[37mjoin[39m[90m([39m[37mos[39m[32m.[39m[37mtmpdir[39m[90m([39m[90m)[39m[32m,[39m [92m'foo-'[39m[90m)[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfolder[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfolder[39m[90m)[39m[90m;[39m
      [90m// Prints: /tmp/foo-itXde2 or C:\Users\...\AppData\Local\Temp\foo-itXde2[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mfs.mkdtemp()[39m method will append the six randomly selected characters[0m
[0mdirectly to the [33mprefix[39m string. For instance, given a directory [33m/tmp[39m, if the[0m
[0mintention is to create a temporary directory [3mwithin[23m [33m/tmp[39m, the [33mprefix[39m[0m
[0mmust end with a trailing platform-specific path separator[0m
[0m([33mrequire('path').sep[39m).[0m

    [90m// The parent directory for the new temporary directory[39m
    [94mconst[39m [37mtmpDir[39m [93m=[39m [37mos[39m[32m.[39m[37mtmpdir[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// This method is *INCORRECT*:[39m
    [37mfs[39m[32m.[39m[37mmkdtemp[39m[90m([39m[37mtmpDir[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfolder[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfolder[39m[90m)[39m[90m;[39m
      [90m// Will print something similar to `/tmpabc123`.[39m
      [90m// A new temporary directory is created at the file system root[39m
      [90m// rather than *within* the /tmp directory.[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// This method is *CORRECT*:[39m
    [94mconst[39m [33m{[39m [37msep[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/path'[39m[90m)[39m[90m;[39m
    [37mfs[39m[32m.[39m[37mmkdtemp[39m[90m([39m`${[37mtmpDir[39m}${[37msep[39m}`[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfolder[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfolder[39m[90m)[39m[90m;[39m
      [90m// Will print something similar to `/tmp/abc123`.[39m
      [90m// A new temporary directory is created within[39m
      [90m// the /tmp directory.[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mfs.mkdtempSync(prefix[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mprefix[39m {string}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0mReturns: {string}[0m

[0mReturns the created folder path.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.mkdtemp()[39m][].[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use.[0m

[32m[1m## [33mfs.open(path[, flags[, mode]], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mchanges:[39m
[90m  - version: v11.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23767[39m
[90m    description: The `flags` argument is now optional and defaults to `'r'`.[39m
[90m  - version: v9.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18801[39m
[90m    description: The `as` and `as+` flags are supported now.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mflags[39m {string|number} See [support of file system [33mflags[39m][].[0m
      [0m[1mDefault:[22m [33m'r'[39m.[0m
    * [0m[33mmode[39m {string|integer} [1mDefault:[22m [33m0o666[39m (readable and writable)[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mfd[39m {integer}[0m[0m[0m

[0mAsynchronous file open. See open(2).[0m

[0m[33mmode[39m sets the file mode (permission and sticky bits), but only if the file was[0m
[0mcreated. On Windows, only the write permission can be manipulated; see[0m
[0m[[33mfs.chmod()[39m][].[0m

[0mThe callback gets two arguments [33m(err, fd)[39m.[0m

[0mSome characters ([33m< > : " / \ | ? *[39m) are reserved under Windows as documented[0m
[0mby [Naming Files, Paths, and Namespaces][]. Under NTFS, if the filename contains[0m
[0ma colon, Node.js will open a file system stream, as described by[0m
[0m[this MSDN page][MSDN-Using-Streams].[0m

[0mFunctions based on [33mfs.open()[39m exhibit this behavior as well:[0m
[0m[33mfs.writeFile()[39m, [33mfs.readFile()[39m, etc.[0m

[32m[1m## [33mfs.opendir(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90mchanges:[39m
[90m  - version: v13.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30114[39m
[90m    description: The `bufferSize` option was introduced.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mbufferSize[39m {number} Number of directory entries that are buffered[0m[0m[0m
      [0m      [0m[0minternally when reading from the directory. Higher values lead to better[0m[0m[0m
      [0m      [0m[0mperformance but higher memory usage. [1mDefault:[22m [33m32[39m[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mdir[39m {fs.Dir}[0m[0m[0m

[0mAsynchronously open a directory. See opendir(3).[0m

[0mCreates an [[33mfs.Dir[39m][], which contains all further functions for reading from[0m
[0mand cleaning up the directory.[0m

[0mThe [33mencoding[39m option sets the encoding for the [33mpath[39m while opening the[0m
[0mdirectory and subsequent read operations.[0m

[32m[1m## [33mfs.opendirSync(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90mchanges:[39m
[90m  - version: v13.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30114[39m
[90m    description: The `bufferSize` option was introduced.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mbufferSize[39m {number} Number of directory entries that are buffered[0m[0m[0m
      [0m      [0m[0minternally when reading from the directory. Higher values lead to better[0m[0m[0m
      [0m      [0m[0mperformance but higher memory usage. [1mDefault:[22m [33m32[39m[0m[0m[0m
    * [0mReturns: {fs.Dir}[0m

[0mSynchronously open a directory. See opendir(3).[0m

[0mCreates an [[33mfs.Dir[39m][], which contains all further functions for reading from[0m
[0mand cleaning up the directory.[0m

[0mThe [33mencoding[39m option sets the encoding for the [33mpath[39m while opening the[0m
[0mdirectory and subsequent read operations.[0m

[32m[1m## [33mfs.openSync(path[, flags, mode])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v11.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23767[39m
[90m    description: The `flags` argument is now optional and defaults to `'r'`.[39m
[90m  - version: v9.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18801[39m
[90m    description: The `as` and `as+` flags are supported now.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mflags[39m {string|number} [1mDefault:[22m [33m'r'[39m.[0m
      [0m See [support of file system [33mflags[39m][].[0m
    * [0m[33mmode[39m {string|integer} [1mDefault:[22m [33m0o666[39m[0m
    * [0mReturns: {number}[0m

[0mReturns an integer representing the file descriptor.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.open()[39m][].[0m

[32m[1m## [33mfs.read(fd, buffer, offset, length, position, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mchanges:[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22150[39m
[90m    description: The `buffer` parameter can now be any `TypedArray`, or a[39m
[90m                 `DataView`.[39m
[90m  - version: v7.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10382[39m
[90m    description: The `buffer` parameter can now be a `Uint8Array`.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4518[39m
[90m    description: The `length` parameter can now be `0`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView}[0m
    * [0m[33moffset[39m {integer}[0m
    * [0m[33mlength[39m {integer}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mbytesRead[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mbuffer[39m {Buffer}[0m[0m[0m

[0mRead data from the file specified by [33mfd[39m.[0m

[0m[33mbuffer[39m is the buffer that the data (read from the fd) will be written to.[0m

[0m[33moffset[39m is the offset in the buffer to start writing at.[0m

[0m[33mlength[39m is an integer specifying the number of bytes to read.[0m

[0m[33mposition[39m is an argument specifying where to begin reading from in the file.[0m
[0mIf [33mposition[39m is [33mnull[39m, data will be read from the current file position,[0m
[0mand the file position will be updated.[0m
[0mIf [33mposition[39m is an integer, the file position will remain unchanged.[0m

[0mThe callback is given the three arguments, [33m(err, bytesRead, buffer)[39m.[0m

[0mIf this method is invoked as its [[33mutil.promisify()[39m][]ed version, it returns[0m
[0ma [33mPromise[39m for an [33mObject[39m with [33mbytesRead[39m and [33mbuffer[39m properties.[0m

[32m[1m## [33mfs.read(fd, [options,] callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.11.0[39m
[90mchanges:[39m
[90m  - version: v13.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31402[39m
[90m    description: Options object can be passed in[39m
[90m                 to make Buffer, offset, length and position optional[39m
[90m-->[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbuffer[39m {Buffer|TypedArray|DataView} [1mDefault:[22m [33mBuffer.alloc(16384)[39m[0m[0m[0m
      [0m
        * [0m[0m[33moffset[39m {integer} [1mDefault:[22m [33m0[39m[0m[0m[0m
      [0m
        * [0m[0m[33mlength[39m {integer} [1mDefault:[22m [33mbuffer.length[39m[0m[0m[0m
      [0m
        * [0m[0m[33mposition[39m {integer} [1mDefault:[22m [33mnull[39m[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mbytesRead[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mbuffer[39m {Buffer}[0m[0m[0m

[0mSimilar to the above [33mfs.read[39m function, this version takes an optional [33moptions[39m object.[0m
[0mIf no [33moptions[39m object is specified, it will default with the above values.[0m

[32m[1m## [33mfs.readdir(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.8[39m
[90mchanges:[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22020[39m
[90m    description: New option `withFileTypes` was added.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5616[39m
[90m    description: The `options` parameter was added.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mwithFileTypes[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mfiles[39m {string[]|Buffer[]|fs.Dirent[]}[0m[0m[0m

[0mAsynchronous readdir(3). Reads the contents of a directory.[0m
[0mThe callback gets two arguments [33m(err, files)[39m where [33mfiles[39m is an array of[0m
[0mthe names of the files in the directory excluding [33m'.'[39m and [33m'..'[39m.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe filenames passed to the callback. If the [33mencoding[39m is set to [33m'buffer'[39m,[0m
[0mthe filenames returned will be passed as [33mBuffer[39m objects.[0m

[0mIf [33moptions.withFileTypes[39m is set to [33mtrue[39m, the [33mfiles[39m array will contain[0m
[0m[[33mfs.Dirent[39m][] objects.[0m

[32m[1m## [33mfs.readdirSync(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22020[39m
[90m    description: New option `withFileTypes` was added.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mwithFileTypes[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
    * [0mReturns: {string[]|Buffer[]|fs.Dirent[]}[0m

[0mSynchronous readdir(3).[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe filenames returned. If the [33mencoding[39m is set to [33m'buffer'[39m,[0m
[0mthe filenames returned will be passed as [33mBuffer[39m objects.[0m

[0mIf [33moptions.withFileTypes[39m is set to [33mtrue[39m, the result will contain[0m
[0m[[33mfs.Dirent[39m][] objects.[0m

[32m[1m## [33mfs.readFile(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.29[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v5.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3740[39m
[90m    description: The `callback` will always be called with `null` as the `error`[39m
[90m                 parameter in case of success.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3163[39m
[90m    description: The `path` parameter can be a file descriptor now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL|integer} filename or file descriptor[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33mnull[39m[0m[0m[0m
      [0m
        * [0m[0m[33mflag[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m [33m'r'[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mdata[39m {string|Buffer}[0m[0m[0m

[0mAsynchronously reads the entire contents of a file.[0m

    [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[92m'/etc/passwd'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdata[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe callback is passed two arguments [33m(err, data)[39m, where [33mdata[39m is the[0m
[0mcontents of the file.[0m

[0mIf no encoding is specified, then the raw buffer is returned.[0m

[0mIf [33moptions[39m is a string, then it specifies the encoding:[0m

    [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[92m'/etc/passwd'[39m[32m,[39m [92m'utf8'[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m

[0mWhen the path is a directory, the behavior of [33mfs.readFile()[39m and[0m
[0m[[33mfs.readFileSync()[39m][] is platform-specific. On macOS, Linux, and Windows, an[0m
[0merror will be returned. On FreeBSD, a representation of the directory's contents[0m
[0mwill be returned.[0m

    [90m// macOS, Linux, and Windows[39m
    [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[92m'<directory>'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// => [Error: EISDIR: illegal operation on a directory, read <directory>][39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m//  FreeBSD[39m
    [37mfs[39m[32m.[39m[37mreadFile[39m[90m([39m[92m'<directory>'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// => null, <data>[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mfs.readFile()[39m function buffers the entire file. To minimize memory costs,[0m
[0mwhen possible prefer streaming via [33mfs.createReadStream()[39m.[0m

[32m[1m### File Descriptors[22m[39m

    1. [0mAny specified file descriptor has to support reading.[0m
    2. [0mIf a file descriptor is specified as the [33mpath[39m, it will not be closed[0m
       [0mautomatically.[0m
    3. [0mThe reading will begin at the current position. For example, if the file[0m
       [0malready had [33m'Hello World[39m' and six bytes are read with the file descriptor,[0m
       [0mthe call to [33mfs.readFile()[39m with the same file descriptor, would give[0m
       [0m[33m'World'[39m, rather than [33m'Hello World'[39m.[0m

[32m[1m## [33mfs.readFileSync(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.8[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3163[39m
[90m    description: The `path` parameter can be a file descriptor now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL|integer} filename or file descriptor[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33mnull[39m[0m[0m[0m
      [0m
        * [0m[0m[33mflag[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m [33m'r'[39m.[0m[0m[0m
    * [0mReturns: {string|Buffer}[0m

[0mReturns the contents of the [33mpath[39m.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.readFile()[39m][].[0m

[0mIf the [33mencoding[39m option is specified then this function returns a[0m
[0mstring. Otherwise it returns a buffer.[0m

[0mSimilar to [[33mfs.readFile()[39m][], when the path is a directory, the behavior of[0m
[0m[33mfs.readFileSync()[39m is platform-specific.[0m

    [90m// macOS, Linux, and Windows[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'<directory>'[39m[90m)[39m[90m;[39m
    [90m// => [Error: EISDIR: illegal operation on a directory, read <directory>][39m
    
    [90m//  FreeBSD[39m
    [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'<directory>'[39m[90m)[39m[90m;[39m [90m// => <data>[39m

[32m[1m## [33mfs.readlink(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mlinkString[39m {string|Buffer}[0m[0m[0m

[0mAsynchronous readlink(2). The callback gets two arguments [33m(err,[39m[0m
[0m[33mlinkString)[39m.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe link path passed to the callback. If the [33mencoding[39m is set to [33m'buffer'[39m,[0m
[0mthe link path returned will be passed as a [33mBuffer[39m object.[0m

[32m[1m## [33mfs.readlinkSync(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0mReturns: {string|Buffer}[0m

[0mSynchronous readlink(2). Returns the symbolic link's string value.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe link path returned. If the [33mencoding[39m is set to [33m'buffer'[39m,[0m
[0mthe link path returned will be passed as a [33mBuffer[39m object.[0m

[32m[1m## [33mfs.readSync(fd, buffer, offset, length, position)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22150[39m
[90m    description: The `buffer` parameter can now be any `TypedArray` or a[39m
[90m                 `DataView`.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4518[39m
[90m    description: The `length` parameter can now be `0`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView}[0m
    * [0m[33moffset[39m {integer}[0m
    * [0m[33mlength[39m {integer}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0mReturns: {number}[0m

[0mReturns the number of [33mbytesRead[39m.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.read()[39m][].[0m

[32m[1m## [33mfs.readSync(fd, buffer, [options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: REPLACEME[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/32460[39m
[90m    description: Options object can be passed in[39m
[90m                 to make offset, length and position optional[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33moffset[39m {integer} [1mDefault:[22m [33m0[39m[0m[0m[0m
      [0m
        * [0m[0m[33mlength[39m {integer} [1mDefault:[22m [33mbuffer.length[39m[0m[0m[0m
      [0m
        * [0m[0m[33mposition[39m {integer} [1mDefault:[22m [33mnull[39m[0m[0m[0m
    * [0mReturns: {number}[0m

[0mReturns the number of [33mbytesRead[39m.[0m

[0mSimilar to the above [33mfs.readSync[39m function, this version takes an optional [33moptions[39m object.[0m
[0mIf no [33moptions[39m object is specified, it will default with the above values.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.read()[39m][].[0m

[32m[1m## [33mfs.readv(fd, buffers[, position], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: REPLACEME[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mbuffers[39m {ArrayBufferView[]}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mbytesRead[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mbuffers[39m {ArrayBufferView[]}[0m[0m[0m

[0mRead from a file specified by [33mfd[39m and write to an array of [33mArrayBufferView[39ms[0m
[0musing [33mreadv()[39m.[0m

[0m[33mposition[39m is the offset from the beginning of the file from where data[0m
[0mshould be read. If [33mtypeof position !== 'number'[39m, the data will be read[0m
[0mfrom the current position.[0m

[0mThe callback will be given three arguments: [33merr[39m, [33mbytesRead[39m, and[0m
[0m[33mbuffers[39m. [33mbytesRead[39m is how many bytes were read from the file.[0m

[32m[1m## [33mfs.readvSync(fd, buffers[, position])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: REPLACEME[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mbuffers[39m {ArrayBufferView[]}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0mReturns: {number} The number of bytes read.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.readv()[39m][].[0m

[32m[1m## [33mfs.realpath(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13028[39m
[90m    description: Pipe/Socket resolve support was added.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v6.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7899[39m
[90m    description: Calling `realpath` now works again for various edge cases[39m
[90m                 on Windows.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3594[39m
[90m    description: The `cache` parameter was removed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mresolvedPath[39m {string|Buffer}[0m[0m[0m

[0mAsynchronously computes the canonical pathname by resolving [33m.[39m, [33m..[39m and[0m
[0msymbolic links.[0m

[0mA canonical pathname is not necessarily unique. Hard links and bind mounts can[0m
[0mexpose a file system entity through many pathnames.[0m

[0mThis function behaves like realpath(3), with some exceptions:[0m

    1. [0m[0m[0mNo case conversion is performed on case-insensitive file systems.[0m[0m[0m
    2. [0m[0m[0mThe maximum number of symbolic links is platform-independent and generally[0m[0m[0m
       [0m[0m[0m(much) higher than what the native realpath(3) implementation supports.[0m[0m[0m

[0mThe [33mcallback[39m gets two arguments [33m(err, resolvedPath)[39m. May use [33mprocess.cwd[39m[0m
[0mto resolve relative paths.[0m

[0mOnly paths that can be converted to UTF8 strings are supported.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe path passed to the callback. If the [33mencoding[39m is set to [33m'buffer'[39m,[0m
[0mthe path returned will be passed as a [33mBuffer[39m object.[0m

[0mIf [33mpath[39m resolves to a socket or a pipe, the function will return a system[0m
[0mdependent name for that object.[0m

[32m[1m## [33mfs.realpath.native(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mresolvedPath[39m {string|Buffer}[0m[0m[0m

[0mAsynchronous realpath(3).[0m

[0mThe [33mcallback[39m gets two arguments [33m(err, resolvedPath)[39m.[0m

[0mOnly paths that can be converted to UTF8 strings are supported.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe path passed to the callback. If the [33mencoding[39m is set to [33m'buffer'[39m,[0m
[0mthe path returned will be passed as a [33mBuffer[39m object.[0m

[0mOn Linux, when Node.js is linked against musl libc, the procfs file system must[0m
[0mbe mounted on [33m/proc[39m in order for this function to work. Glibc does not have[0m
[0mthis restriction.[0m

[32m[1m## [33mfs.realpathSync(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/13028[39m
[90m    description: Pipe/Socket resolve support was added.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90m  - version: v6.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7899[39m
[90m    description: Calling `realpathSync` now works again for various edge cases[39m
[90m                 on Windows.[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3594[39m
[90m    description: The `cache` parameter was removed.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0mReturns: {string|Buffer}[0m

[0mReturns the resolved pathname.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.realpath()[39m][].[0m

[32m[1m## [33mfs.realpathSync.native(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0mReturns: {string|Buffer}[0m

[0mSynchronous realpath(3).[0m

[0mOnly paths that can be converted to UTF8 strings are supported.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe path returned. If the [33mencoding[39m is set to [33m'buffer'[39m,[0m
[0mthe path returned will be passed as a [33mBuffer[39m object.[0m

[0mOn Linux, when Node.js is linked against musl libc, the procfs file system must[0m
[0mbe mounted on [33m/proc[39m in order for this function to work. Glibc does not have[0m
[0mthis restriction.[0m

[32m[1m## [33mfs.rename(oldPath, newPath, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `oldPath` and `newPath` parameters can be WHATWG `URL`[39m
[90m                 objects using `file:` protocol. Support is currently still[39m
[90m                 *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moldPath[39m {string|Buffer|URL}[0m
    * [0m[33mnewPath[39m {string|Buffer|URL}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronously rename file at [33moldPath[39m to the pathname provided[0m
[0mas [33mnewPath[39m. In the case that [33mnewPath[39m already exists, it will[0m
[0mbe overwritten. If there is a directory at [33mnewPath[39m, an error will[0m
[0mbe raised instead. No arguments other than a possible exception are[0m
[0mgiven to the completion callback.[0m

[0mSee also: rename(2).[0m

    [37mfs[39m[32m.[39m[37mrename[39m[90m([39m[92m'oldFile.txt'[39m[32m,[39m [92m'newFile.txt'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'Rename complete!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mfs.renameSync(oldPath, newPath)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `oldPath` and `newPath` parameters can be WHATWG `URL`[39m
[90m                 objects using `file:` protocol. Support is currently still[39m
[90m                 *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moldPath[39m {string|Buffer|URL}[0m
    * [0m[33mnewPath[39m {string|Buffer|URL}[0m

[0mSynchronous rename(2). Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.rmdir(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mchanges:[39m
[90m  - version: v13.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30644[39m
[90m    description: The `maxBusyTries` option is renamed to `maxRetries`, and its[39m
[90m                 default is 0. The `emfileWait` option has been removed, and[39m
[90m                 `EMFILE` errors use the same retry logic as other errors. The[39m
[90m                 `retryDelay` option is now supported. `ENFILE` errors are now[39m
[90m                 retried.[39m
[90m  - version: v12.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29168[39m
[90m    description: The `recursive`, `maxBusyTries`, and `emfileWait` options are[39m
[90m                 now supported.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameters can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Recursive removal is experimental.[0m[23m[39m

    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mmaxRetries[39m {integer} If an [33mEBUSY[39m, [33mEMFILE[39m, [33mENFILE[39m, [33mENOTEMPTY[39m, or[0m[0m[0m
      [0m      [0m[0m[33mEPERM[39m error is encountered, Node.js will retry the operation with a linear[0m[0m[0m
      [0m      [0m[0mbackoff wait of [33mretryDelay[39m ms longer on each try. This option represents[0m[0m[0m
      [0m      [0m[0mthe number of retries. This option is ignored if the [33mrecursive[39m option is[0m[0m[0m
      [0m      [0m[0mnot [33mtrue[39m. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mrecursive[39m {boolean} If [33mtrue[39m, perform a recursive directory removal. In[0m[0m[0m
      [0m      [0m[0mrecursive mode, errors are not reported if [33mpath[39m does not exist, and[0m[0m[0m
      [0m      [0m[0moperations are retried on failure. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mretryDelay[39m {integer} The amount of time in milliseconds to wait between[0m[0m[0m
      [0m      [0m[0mretries. This option is ignored if the [33mrecursive[39m option is not [33mtrue[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m100[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous rmdir(2). No arguments other than a possible exception are given[0m
[0mto the completion callback.[0m

[0mUsing [33mfs.rmdir()[39m on a file (not a directory) results in an [33mENOENT[39m error on[0m
[0mWindows and an [33mENOTDIR[39m error on POSIX.[0m

[32m[1m## [33mfs.rmdirSync(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v13.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30644[39m
[90m    description: The `maxBusyTries` option is renamed to `maxRetries`, and its[39m
[90m                 default is 0. The `emfileWait` option has been removed, and[39m
[90m                 `EMFILE` errors use the same retry logic as other errors. The[39m
[90m                 `retryDelay` option is now supported. `ENFILE` errors are now[39m
[90m                 retried.[39m
[90m  - version: v12.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29168[39m
[90m    description: The `recursive`, `maxBusyTries`, and `emfileWait` options are[39m
[90m                 now supported.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameters can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Recursive removal is experimental.[0m[23m[39m

    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mmaxRetries[39m {integer} If an [33mEBUSY[39m, [33mEMFILE[39m, [33mENFILE[39m, [33mENOTEMPTY[39m, or[0m[0m[0m
      [0m      [0m[0m[33mEPERM[39m error is encountered, Node.js will retry the operation with a linear[0m[0m[0m
      [0m      [0m[0mbackoff wait of [33mretryDelay[39m ms longer on each try. This option represents[0m[0m[0m
      [0m      [0m[0mthe number of retries. This option is ignored if the [33mrecursive[39m option is[0m[0m[0m
      [0m      [0m[0mnot [33mtrue[39m. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mrecursive[39m {boolean} If [33mtrue[39m, perform a recursive directory removal. In[0m[0m[0m
      [0m      [0m[0mrecursive mode, errors are not reported if [33mpath[39m does not exist, and[0m[0m[0m
      [0m      [0m[0moperations are retried on failure. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mretryDelay[39m {integer} The amount of time in milliseconds to wait between[0m[0m[0m
      [0m      [0m[0mretries. This option is ignored if the [33mrecursive[39m option is not [33mtrue[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m100[39m.[0m[0m[0m

[0mSynchronous rmdir(2). Returns [33mundefined[39m.[0m

[0mUsing [33mfs.rmdirSync()[39m on a file (not a directory) results in an [33mENOENT[39m error[0m
[0mon Windows and an [33mENOTDIR[39m error on POSIX.[0m

[32m[1m## [33mfs.stat(path[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: Accepts an additional `options` object to specify whether[39m
[90m                 the numeric values returned should be bigint.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} Whether the numeric values in the returned[0m[0m[0m
      [0m      [0m[0m[[33mfs.Stats[39m][] object should be [33mbigint[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mstats[39m {fs.Stats}[0m[0m[0m

[0mAsynchronous stat(2). The callback gets two arguments [33m(err, stats)[39m where[0m
[0m[33mstats[39m is an [[33mfs.Stats[39m][] object.[0m

[0mIn case of an error, the [33merr.code[39m will be one of [Common System Errors][].[0m

[0mUsing [33mfs.stat()[39m to check for the existence of a file before calling[0m
[0m[33mfs.open()[39m, [33mfs.readFile()[39m or [33mfs.writeFile()[39m is not recommended.[0m
[0mInstead, user code should open/read/write the file directly and handle the[0m
[0merror raised if the file is not available.[0m

[0mTo check if a file exists without manipulating it afterwards, [[33mfs.access()[39m][][0m
[0mis recommended.[0m

[0mFor example, given the following folder structure:[0m

    [33m- txtDir[39m
    [33m-- file.txt[39m
    [33m- app.js[39m

[0mThe next program will check for the stats of the given paths:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mpathsToCheck[39m [93m=[39m [33m[[39m[92m'./txtDir'[39m[32m,[39m [92m'./txtDir/file.txt'[39m[33m][39m[90m;[39m
    
    [94mfor[39m [90m([39m[94mlet[39m [37mi[39m [93m=[39m [34m0[39m[90m;[39m [37mi[39m [93m<[39m [37mpathsToCheck[39m[32m.[39m[37mlength[39m[90m;[39m [37mi[39m[93m++[39m[90m)[39m [33m{[39m
      [37mfs[39m[32m.[39m[37mstat[39m[90m([39m[37mpathsToCheck[39m[33m[[39m[37mi[39m[33m][39m[32m,[39m [94mfunction[39m[90m([39m[37merr[39m[32m,[39m [37mstats[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mstats[39m[32m.[39m[37misDirectory[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mstats[39m[90m)[39m[90m;[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m

[0mThe resulting output will resemble:[0m

    [33mtrue[39m
    [33mStats {[39m
    [33m  dev: 16777220,[39m
    [33m  mode: 16877,[39m
    [33m  nlink: 3,[39m
    [33m  uid: 501,[39m
    [33m  gid: 20,[39m
    [33m  rdev: 0,[39m
    [33m  blksize: 4096,[39m
    [33m  ino: 14214262,[39m
    [33m  size: 96,[39m
    [33m  blocks: 0,[39m
    [33m  atimeMs: 1561174653071.963,[39m
    [33m  mtimeMs: 1561174614583.3518,[39m
    [33m  ctimeMs: 1561174626623.5366,[39m
    [33m  birthtimeMs: 1561174126937.2893,[39m
    [33m  atime: 2019-06-22T03:37:33.072Z,[39m
    [33m  mtime: 2019-06-22T03:36:54.583Z,[39m
    [33m  ctime: 2019-06-22T03:37:06.624Z,[39m
    [33m  birthtime: 2019-06-22T03:28:46.937Z[39m
    [33m}[39m
    [33mfalse[39m
    [33mStats {[39m
    [33m  dev: 16777220,[39m
    [33m  mode: 33188,[39m
    [33m  nlink: 1,[39m
    [33m  uid: 501,[39m
    [33m  gid: 20,[39m
    [33m  rdev: 0,[39m
    [33m  blksize: 4096,[39m
    [33m  ino: 14214074,[39m
    [33m  size: 8,[39m
    [33m  blocks: 8,[39m
    [33m  atimeMs: 1561174616618.8555,[39m
    [33m  mtimeMs: 1561174614584,[39m
    [33m  ctimeMs: 1561174614583.8145,[39m
    [33m  birthtimeMs: 1561174007710.7478,[39m
    [33m  atime: 2019-06-22T03:36:56.619Z,[39m
    [33m  mtime: 2019-06-22T03:36:54.584Z,[39m
    [33m  ctime: 2019-06-22T03:36:54.584Z,[39m
    [33m  birthtime: 2019-06-22T03:26:47.711Z[39m
    [33m}[39m

[32m[1m## [33mfs.statSync(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: Accepts an additional `options` object to specify whether[39m
[90m                 the numeric values returned should be bigint.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} Whether the numeric values in the returned[0m[0m[0m
      [0m      [0m[0m[[33mfs.Stats[39m][] object should be [33mbigint[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {fs.Stats}[0m

[0mSynchronous stat(2).[0m

[32m[1m## [33mfs.symlink(target, path[, type], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `target` and `path` parameters can be WHATWG `URL` objects[39m
[90m                 using `file:` protocol. Support is currently still[39m
[90m                 *experimental*.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23724[39m
[90m    description: If the `type` argument is left undefined, Node will autodetect[39m
[90m                 `target` type and automatically select `dir` or `file`[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtarget[39m {string|Buffer|URL}[0m
    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mtype[39m {string}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous symlink(2) which creates the link called [33mpath[39m pointing to[0m
[0m[33mtarget[39m.  No arguments other than a possible exception are given to the[0m
[0mcompletion callback.[0m

[0mThe [33mtype[39m argument is only available on Windows and ignored on other platforms.[0m
[0mIt can be set to [33m'dir'[39m, [33m'file'[39m, or [33m'junction'[39m. If the [33mtype[39m argument is[0m
[0mnot set, Node.js will autodetect [33mtarget[39m type and use [33m'file'[39m or [33m'dir'[39m. If[0m
[0mthe [33mtarget[39m does not exist, [33m'file'[39m will be used. Windows junction points[0m
[0mrequire the destination path to be absolute.  When using [33m'junction'[39m, the[0m
[0m[33mtarget[39m argument will automatically be normalized to absolute path.[0m

[0mRelative targets are relative to the link’s parent directory.[0m

    [37mfs[39m[32m.[39m[37msymlink[39m[90m([39m[92m'./mew'[39m[32m,[39m [92m'./example/mewtwo'[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m

[0mThe above example creates a symbolic link [33mmewtwo[39m in the [33mexample[39m which points[0m
[0mto [33mmew[39m in the same directory:[0m

    [33m$ tree example/[39m
    [33mexample/[39m
    [33m├── mew[39m
    [33m└── mewtwo -> ./mew[39m

[32m[1m## [33mfs.symlinkSync(target, path[, type])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `target` and `path` parameters can be WHATWG `URL` objects[39m
[90m                 using `file:` protocol. Support is currently still[39m
[90m                 *experimental*.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23724[39m
[90m    description: If the `type` argument is left undefined, Node will autodetect[39m
[90m                 `target` type and automatically select `dir` or `file`[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtarget[39m {string|Buffer|URL}[0m
    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mtype[39m {string}[0m

[0mReturns [33mundefined[39m.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.symlink()[39m][].[0m

[32m[1m## [33mfs.truncate(path[, len], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.6[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mlen[39m {integer} [1mDefault:[22m [33m0[39m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronous truncate(2). No arguments other than a possible exception are[0m
[0mgiven to the completion callback. A file descriptor can also be passed as the[0m
[0mfirst argument. In this case, [33mfs.ftruncate()[39m is called.[0m

[0mPassing a file descriptor is deprecated and may result in an error being thrown[0m
[0min the future.[0m

[32m[1m## [33mfs.truncateSync(path[, len])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mlen[39m {integer} [1mDefault:[22m [33m0[39m[0m

[0mSynchronous truncate(2). Returns [33mundefined[39m. A file descriptor can also be[0m
[0mpassed as the first argument. In this case, [33mfs.ftruncateSync()[39m is called.[0m

[0mPassing a file descriptor is deprecated and may result in an error being thrown[0m
[0min the future.[0m

[32m[1m## [33mfs.unlink(path, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mAsynchronously removes a file or symbolic link. No arguments other than a[0m
[0mpossible exception are given to the completion callback.[0m

    [90m// Assuming that 'path/file.txt' is a regular file.[39m
    [37mfs[39m[32m.[39m[37munlink[39m[90m([39m[92m'path/file.txt'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'path/file.txt was deleted'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[33mfs.unlink()[39m will not work on a directory, empty or otherwise. To remove a[0m
[0mdirectory, use [[33mfs.rmdir()[39m][].[0m

[0mSee also: unlink(2).[0m

[32m[1m## [33mfs.unlinkSync(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m

[0mSynchronous unlink(2). Returns [33mundefined[39m.[0m

[32m[1m## [33mfs.unwatchFile(filename[, listener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfilename[39m {string|Buffer|URL}[0m
    * [0m[33mlistener[39m {Function} Optional, a listener previously attached using[0m
      [0m[33mfs.watchFile()[39m[0m

[0mStop watching for changes on [33mfilename[39m. If [33mlistener[39m is specified, only that[0m
[0mparticular listener is removed. Otherwise, [3mall[23m listeners are removed,[0m
[0meffectively stopping watching of [33mfilename[39m.[0m

[0mCalling [33mfs.unwatchFile()[39m with a filename that is not being watched is a[0m
[0mno-op, not an error.[0m

[0mUsing [[33mfs.watch()[39m][] is more efficient than [33mfs.watchFile()[39m and[0m
[0m[33mfs.unwatchFile()[39m. [33mfs.watch()[39m should be used instead of [33mfs.watchFile()[39m[0m
[0mand [33mfs.unwatchFile()[39m when possible.[0m

[32m[1m## [33mfs.utimes(path, atime, mtime, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.2[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11919[39m
[90m    description: "`NaN`, `Infinity`, and `-Infinity` are no longer valid time[39m
[90m                 specifiers."[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v4.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2387[39m
[90m    description: Numeric strings, `NaN` and `Infinity` are now allowed[39m
[90m                 time specifiers.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33matime[39m {number|string|Date}[0m
    * [0m[33mmtime[39m {number|string|Date}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m

[0mChange the file system timestamps of the object referenced by [33mpath[39m.[0m

[0mThe [33matime[39m and [33mmtime[39m arguments follow these rules:[0m

    * [0mValues can be either numbers representing Unix epoch time, [33mDate[39ms, or a[0m
      [0mnumeric string like [33m'123456789.0'[39m.[0m
    * [0mIf the value can not be converted to a number, or is [33mNaN[39m, [33mInfinity[39m or[0m
      [0m[33m-Infinity[39m, an [33mError[39m will be thrown.[0m

[32m[1m## [33mfs.utimesSync(path, atime, mtime)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.2[39m
[90mchanges:[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11919[39m
[90m    description: "`NaN`, `Infinity`, and `-Infinity` are no longer valid time[39m
[90m                 specifiers."[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `path` parameter can be a WHATWG `URL` object using `file:`[39m
[90m                 protocol. Support is currently still *experimental*.[39m
[90m  - version: v4.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2387[39m
[90m    description: Numeric strings, `NaN` and `Infinity` are now allowed[39m
[90m                 time specifiers.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33matime[39m {number|string|Date}[0m
    * [0m[33mmtime[39m {number|string|Date}[0m

[0mReturns [33mundefined[39m.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.utimes()[39m][].[0m

[32m[1m## [33mfs.watch(filename[, options][, listener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.10[39m
[90mchanges:[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `filename` parameter can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7831[39m
[90m    description: The passed `options` object will never be modified.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfilename[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mpersistent[39m {boolean} Indicates whether the process should continue to run[0m[0m[0m
      [0m      [0m[0mas long as files are being watched. [1mDefault:[22m [33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mrecursive[39m {boolean} Indicates whether all subdirectories should be[0m[0m[0m
      [0m      [0m[0mwatched, or only the current directory. This applies when a directory is[0m[0m[0m
      [0m      [0m[0mspecified, and only on supported platforms (See [Caveats][]). [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mencoding[39m {string} Specifies the character encoding to be used for the[0m[0m[0m
      [0m      [0m[0m filename passed to the listener. [1mDefault:[22m [33m'utf8'[39m.[0m[0m[0m
    * [0m[33mlistener[39m {Function|undefined} [1mDefault:[22m [33mundefined[39m
        * [0m[0m[33meventType[39m {string}[0m[0m[0m
      [0m
        * [0m[0m[33mfilename[39m {string|Buffer}[0m[0m[0m
    * [0mReturns: {fs.FSWatcher}[0m

[0mWatch for changes on [33mfilename[39m, where [33mfilename[39m is either a file or a[0m
[0mdirectory.[0m

[0mThe second argument is optional. If [33moptions[39m is provided as a string, it[0m
[0mspecifies the [33mencoding[39m. Otherwise [33moptions[39m should be passed as an object.[0m

[0mThe listener callback gets two arguments [33m(eventType, filename)[39m. [33meventType[39m[0m
[0mis either [33m'rename'[39m or [33m'change'[39m, and [33mfilename[39m is the name of the file[0m
[0mwhich triggered the event.[0m

[0mOn most platforms, [33m'rename'[39m is emitted whenever a filename appears or[0m
[0mdisappears in the directory.[0m

[0mThe listener callback is attached to the [33m'change'[39m event fired by[0m
[0m[[33mfs.FSWatcher[39m][], but it is not the same thing as the [33m'change'[39m value of[0m
[0m[33meventType[39m.[0m

[32m[1m### Caveats[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mThe [33mfs.watch[39m API is not 100% consistent across platforms, and is[0m
[0munavailable in some situations.[0m

[0mThe recursive option is only supported on macOS and Windows.[0m
[0mAn [33mERR_FEATURE_UNAVAILABLE_ON_PLATFORM[39m exception will be thrown[0m
[0mwhen the option is used on a platform that does not support it.[0m

[0mOn Windows, no events will be emitted if the watched directory is moved or[0m
[0mrenamed. An [33mEPERM[39m error is reported when the watched directory is deleted.[0m

[32m[1m#### Availability[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mThis feature depends on the underlying operating system providing a way[0m
[0mto be notified of filesystem changes.[0m

    * [0mOn Linux systems, this uses [[33minotify(7)[39m][].[0m
    * [0mOn BSD systems, this uses [[33mkqueue(2)[39m][].[0m
    * [0mOn macOS, this uses [[33mkqueue(2)[39m][] for files and [[33mFSEvents[39m][] for[0m
      [0mdirectories.[0m
    * [0mOn SunOS systems (including Solaris and SmartOS), this uses [[33mevent ports[39m][].[0m
    * [0mOn Windows systems, this feature depends on [[33mReadDirectoryChangesW[39m][].[0m
    * [0mOn Aix systems, this feature depends on [[33mAHAFS[39m][], which must be enabled.[0m

[0mIf the underlying functionality is not available for some reason, then[0m
[0m[33mfs.watch()[39m will not be able to function and may thrown an exception.[0m
[0mFor example, watching files or directories can be unreliable, and in some[0m
[0mcases impossible, on network file systems (NFS, SMB, etc) or host file systems[0m
[0mwhen using virtualization software such as Vagrant or Docker.[0m

[0mIt is still possible to use [33mfs.watchFile()[39m, which uses stat polling, but[0m
[0mthis method is slower and less reliable.[0m

[32m[1m#### Inodes[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mOn Linux and macOS systems, [33mfs.watch()[39m resolves the path to an [inode][] and[0m
[0mwatches the inode. If the watched path is deleted and recreated, it is assigned[0m
[0ma new inode. The watch will emit an event for the delete but will continue[0m
[0mwatching the [3moriginal[23m inode. Events for the new inode will not be emitted.[0m
[0mThis is expected behavior.[0m

[0mAIX files retain the same inode for the lifetime of a file. Saving and closing a[0m
[0mwatched file on AIX will result in two notifications (one for adding new[0m
[0mcontent, and one for truncation).[0m

[32m[1m#### Filename Argument[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mProviding [33mfilename[39m argument in the callback is only supported on Linux,[0m
[0mmacOS, Windows, and AIX. Even on supported platforms, [33mfilename[39m is not always[0m
[0mguaranteed to be provided. Therefore, don't assume that [33mfilename[39m argument is[0m
[0malways provided in the callback, and have some fallback logic if it is [33mnull[39m.[0m

    [37mfs[39m[32m.[39m[37mwatch[39m[90m([39m[92m'somedir'[39m[32m,[39m [90m([39m[37meventType[39m[32m,[39m [37mfilename[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`event type is: ${[37meventType[39m}`[90m)[39m[90m;[39m
      [94mif[39m [90m([39m[37mfilename[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`filename provided: ${[37mfilename[39m}`[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'filename not provided'[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mfs.watchFile(filename[, options], listener)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.31[39m
[90mchanges:[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: The `bigint` option is now supported.[39m
[90m  - version: v7.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10739[39m
[90m    description: The `filename` parameter can be a WHATWG `URL` object using[39m
[90m                 `file:` protocol. Support is currently still *experimental*.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfilename[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
      [0m
        * [0m[0m[33mpersistent[39m {boolean} [1mDefault:[22m [33mtrue[39m[0m[0m[0m
      [0m
        * [0m[0m[33minterval[39m {integer} [1mDefault:[22m [33m5007[39m[0m[0m[0m
    * [0m[33mlistener[39m {Function}
        * [0m[0m[33mcurrent[39m {fs.Stats}[0m[0m[0m
      [0m
        * [0m[0m[33mprevious[39m {fs.Stats}[0m[0m[0m

[0mWatch for changes on [33mfilename[39m. The callback [33mlistener[39m will be called each[0m
[0mtime the file is accessed.[0m

[0mThe [33moptions[39m argument may be omitted. If provided, it should be an object. The[0m
[0m[33moptions[39m object may contain a boolean named [33mpersistent[39m that indicates[0m
[0mwhether the process should continue to run as long as files are being watched.[0m
[0mThe [33moptions[39m object may specify an [33minterval[39m property indicating how often the[0m
[0mtarget should be polled in milliseconds.[0m

[0mThe [33mlistener[39m gets two arguments the current stat object and the previous[0m
[0mstat object:[0m

    [37mfs[39m[32m.[39m[37mwatchFile[39m[90m([39m[92m'message.text'[39m[32m,[39m [90m([39m[37mcurr[39m[32m,[39m [37mprev[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`the current mtime is: ${[37mcurr[39m[32m.[39m[37mmtime[39m}`[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`the previous mtime was: ${[37mprev[39m[32m.[39m[37mmtime[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThese stat objects are instances of [33mfs.Stat[39m. If the [33mbigint[39m option is [33mtrue[39m,[0m
[0mthe numeric values in these objects are specified as [33mBigInt[39ms.[0m

[0mTo be notified when the file was modified, not just accessed, it is necessary[0m
[0mto compare [33mcurr.mtime[39m and [33mprev.mtime[39m.[0m

[0mWhen an [33mfs.watchFile[39m operation results in an [33mENOENT[39m error, it[0m
[0mwill invoke the listener once, with all the fields zeroed (or, for dates, the[0m
[0mUnix Epoch). If the file is created later on, the listener will be called[0m
[0magain, with the latest stat objects. This is a change in functionality since[0m
[0mv0.10.[0m

[0mUsing [[33mfs.watch()[39m][] is more efficient than [33mfs.watchFile[39m and[0m
[0m[33mfs.unwatchFile[39m. [33mfs.watch[39m should be used instead of [33mfs.watchFile[39m and[0m
[0m[33mfs.unwatchFile[39m when possible.[0m

[0mWhen a file being watched by [33mfs.watchFile()[39m disappears and reappears,[0m
[0mthen the [33mpreviousStat[39m reported in the second callback event (the file's[0m
[0mreappearance) will be the same as the [33mpreviousStat[39m of the first callback[0m
[0mevent (its disappearance).[0m

[0mThis happens when:[0m

    * [0mthe file is deleted, followed by a restore[0m
    * [0mthe file is renamed and then renamed a second time back to its original name[0m

[32m[1m## [33mfs.write(fd, buffer[, offset[, length[, position]]], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.2[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `buffer` parameter won't coerce unsupported input to[39m
[90m                 strings anymore.[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22150[39m
[90m    description: The `buffer` parameter can now be any `TypedArray` or a[39m
[90m                 `DataView`[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10382[39m
[90m    description: The `buffer` parameter can now be a `Uint8Array`.[39m
[90m  - version: v7.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7856[39m
[90m    description: The `offset` and `length` parameters are optional now.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView}[0m
    * [0m[33moffset[39m {integer}[0m
    * [0m[33mlength[39m {integer}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mbytesWritten[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mbuffer[39m {Buffer|TypedArray|DataView}[0m[0m[0m

[0mWrite [33mbuffer[39m to the file specified by [33mfd[39m.[0m

[0m[33moffset[39m determines the part of the buffer to be written, and [33mlength[39m is[0m
[0man integer specifying the number of bytes to write.[0m

[0m[33mposition[39m refers to the offset from the beginning of the file where this data[0m
[0mshould be written. If [33mtypeof position !== 'number'[39m, the data will be written[0m
[0mat the current position. See pwrite(2).[0m

[0mThe callback will be given three arguments [33m(err, bytesWritten, buffer)[39m where[0m
[0m[33mbytesWritten[39m specifies how many [3mbytes[23m were written from [33mbuffer[39m.[0m

[0mIf this method is invoked as its [[33mutil.promisify()[39m][]ed version, it returns[0m
[0ma [33mPromise[39m for an [33mObject[39m with [33mbytesWritten[39m and [33mbuffer[39m properties.[0m

[0mIt is unsafe to use [33mfs.write()[39m multiple times on the same file without waiting[0m
[0mfor the callback. For this scenario, [[33mfs.createWriteStream()[39m][] is[0m
[0mrecommended.[0m

[0mOn Linux, positional writes don't work when the file is opened in append mode.[0m
[0mThe kernel ignores the position argument and always appends the data to[0m
[0mthe end of the file.[0m

[32m[1m## [33mfs.write(fd, string[, position[, encoding]], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `string` parameter won't coerce unsupported input to[39m
[90m                 strings anymore.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7856[39m
[90m    description: The `position` parameter is optional now.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mstring[39m {string}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mwritten[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mstring[39m {string}[0m[0m[0m

[0mWrite [33mstring[39m to the file specified by [33mfd[39m. If [33mstring[39m is not a string, then[0m
[0man exception will be thrown.[0m

[0m[33mposition[39m refers to the offset from the beginning of the file where this data[0m
[0mshould be written. If [33mtypeof position !== 'number'[39m the data will be written at[0m
[0mthe current position. See pwrite(2).[0m

[0m[33mencoding[39m is the expected string encoding.[0m

[0mThe callback will receive the arguments [33m(err, written, string)[39m where [33mwritten[39m[0m
[0mspecifies how many [3mbytes[23m the passed string required to be written. Bytes[0m
[0mwritten is not necessarily the same as string characters written. See[0m
[0m[[33mBuffer.byteLength[39m][].[0m

[0mIt is unsafe to use [33mfs.write()[39m multiple times on the same file without waiting[0m
[0mfor the callback. For this scenario, [[33mfs.createWriteStream()[39m][] is[0m
[0mrecommended.[0m

[0mOn Linux, positional writes don't work when the file is opened in append mode.[0m
[0mThe kernel ignores the position argument and always appends the data to[0m
[0mthe end of the file.[0m

[0mOn Windows, if the file descriptor is connected to the console (e.g. [33mfd == 1[39m[0m
[0mor [33mstdout[39m) a string containing non-ASCII characters will not be rendered[0m
[0mproperly by default, regardless of the encoding used.[0m
[0mIt is possible to configure the console to render UTF-8 properly by changing the[0m
[0mactive codepage with the [33mchcp 65001[39m command. See the [chcp][] docs for more[0m
[0mdetails.[0m

[32m[1m## [33mfs.writeFile(file, data[, options], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.29[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `data` parameter won't coerce unsupported input to[39m
[90m                 strings anymore.[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22150[39m
[90m    description: The `data` parameter can now be any `TypedArray` or a[39m
[90m                 `DataView`.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12562[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will throw a `TypeError` at runtime.[39m
[90m  - version: v7.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10382[39m
[90m    description: The `data` parameter can now be a `Uint8Array`.[39m
[90m  - version: v7.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7897[39m
[90m    description: The `callback` parameter is no longer optional. Not passing[39m
[90m                 it will emit a deprecation warning with id DEP0013.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3163[39m
[90m    description: The `file` parameter can be a file descriptor now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfile[39m {string|Buffer|URL|integer} filename or file descriptor[0m
    * [0m[33mdata[39m {string|Buffer|TypedArray|DataView}[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {strin[0m[0m[0m

[0mg|null} [1mDefault:[22m [33m'utf8'[39m[0m

    * [0m[33mmode[39m {integer} [1mDefault:[22m [33m0o666[39m[0m
    * [0m[33mflag[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m [33m'w'[39m.
        * [0m[0m[33mcallback[39m {Function}[0m[0m[0m
    * [0m[33merr[39m {Error}[0m

[0mWhen [33mfile[39m is a filename, asynchronously writes data to the file, replacing the[0m
[0mfile if it already exists. [33mdata[39m can be a string or a buffer.[0m

[0mWhen [33mfile[39m is a file descriptor, the behavior is similar to calling[0m
[0m[33mfs.write()[39m directly (which is recommended). See the notes below on using[0m
[0ma file descriptor.[0m

[0mThe [33mencoding[39m option is ignored if [33mdata[39m is a buffer.[0m

    [94mconst[39m [37mdata[39m [93m=[39m [31mnew[39m [37mUint8Array[39m[90m([39m[37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'Hello Node.js'[39m[90m)[39m[90m)[39m[90m;[39m
    [37mfs[39m[32m.[39m[37mwriteFile[39m[90m([39m[92m'message.txt'[39m[32m,[39m [37mdata[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [94mthrow[39m [37merr[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'The file has been saved!'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf [33moptions[39m is a string, then it specifies the encoding:[0m

    [37mfs[39m[32m.[39m[37mwriteFile[39m[90m([39m[92m'message.txt'[39m[32m,[39m [92m'Hello Node.js'[39m[32m,[39m [92m'utf8'[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m

[0mIt is unsafe to use [33mfs.writeFile()[39m multiple times on the same file without[0m
[0mwaiting for the callback. For this scenario, [[33mfs.createWriteStream()[39m][] is[0m
[0mrecommended.[0m

[32m[1m### Using [33mfs.writeFile()[39m[32m with File Descriptors[22m[39m

[0mWhen [33mfile[39m is a file descriptor, the behavior is almost identical to directly[0m
[0mcalling [33mfs.write()[39m like:[0m

    [37mfs[39m[32m.[39m[37mwrite[39m[90m([39m[37mfd[39m[32m,[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[37mdata[39m[32m,[39m [37moptions[39m[32m.[39m[37mencoding[39m[90m)[39m[32m,[39m [37mcallback[39m[90m)[39m[90m;[39m

[0mThe difference from directly calling [33mfs.write()[39m is that under some unusual[0m
[0mconditions, [33mfs.write()[39m may write only part of the buffer and will need to be[0m
[0mretried to write the remaining data, whereas [33mfs.writeFile()[39m will retry until[0m
[0mthe data is entirely written (or an error occurs).[0m

[0mThe implications of this are a common source of confusion. In[0m
[0mthe file descriptor case, the file is not replaced! The data is not necessarily[0m
[0mwritten to the beginning of the file, and the file's original data may remain[0m
[0mbefore and/or after the newly written data.[0m

[0mFor example, if [33mfs.writeFile()[39m is called twice in a row, first to write the[0m
[0mstring [33m'Hello'[39m, then to write the string [33m', World'[39m, the file would contain[0m
[0m[33m'Hello, World'[39m, and might contain some of the file's original data (depending[0m
[0mon the size of the original file, and the position of the file descriptor).  If[0m
[0ma file name had been used instead of a descriptor, the file would be guaranteed[0m
[0mto contain only [33m', World'[39m.[0m

[32m[1m## [33mfs.writeFileSync(file, data[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.29[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `data` parameter won't coerce unsupported input to[39m
[90m                 strings anymore.[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22150[39m
[90m    description: The `data` parameter can now be any `TypedArray` or a[39m
[90m                 `DataView`.[39m
[90m  - version: v7.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10382[39m
[90m    description: The `data` parameter can now be a `Uint8Array`.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3163[39m
[90m    description: The `file` parameter can be a file descriptor now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfile[39m {string|Buffer|URL|integer} filename or file descriptor[0m
    * [0m[33mdata[39m {string|Buffer|TypedArray|DataView}[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {integer} [1mDefault:[22m [33m0o666[39m[0m[0m[0m
      [0m
        * [0m[0m[33mflag[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m [33m'w'[39m.[0m[0m[0m

[0mReturns [33mundefined[39m.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.writeFile()[39m][].[0m

[32m[1m## [33mfs.writeSync(fd, buffer[, offset[, length[, position]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `buffer` parameter won't coerce unsupported input to[39m
[90m                 strings anymore.[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22150[39m
[90m    description: The `buffer` parameter can now be any `TypedArray` or a[39m
[90m                 `DataView`.[39m
[90m  - version: v7.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10382[39m
[90m    description: The `buffer` parameter can now be a `Uint8Array`.[39m
[90m  - version: v7.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7856[39m
[90m    description: The `offset` and `length` parameters are optional now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mbuffer[39m {Buffer|TypedArray|DataView}[0m
    * [0m[33moffset[39m {integer}[0m
    * [0m[33mlength[39m {integer}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0mReturns: {number} The number of bytes written.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.write(fd, buffer...)[39m][].[0m

[32m[1m## [33mfs.writeSync(fd, string[, position[, encoding]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.5[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `string` parameter won't coerce unsupported input to[39m
[90m                 strings anymore.[39m
[90m  - version: v7.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7856[39m
[90m    description: The `position` parameter is optional now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mstring[39m {string}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0m[33mencoding[39m {string}[0m
    * [0mReturns: {number} The number of bytes written.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.write(fd, string...)[39m][].[0m

[32m[1m## [33mfs.writev(fd, buffers[, position], callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mbuffers[39m {ArrayBufferView[]}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0m[33mcallback[39m {Function}
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mbytesWritten[39m {integer}[0m[0m[0m
      [0m
        * [0m[0m[33mbuffers[39m {ArrayBufferView[]}[0m[0m[0m

[0mWrite an array of [33mArrayBufferView[39ms to the file specified by [33mfd[39m using[0m
[0m[33mwritev()[39m.[0m

[0m[33mposition[39m is the offset from the beginning of the file where this data[0m
[0mshould be written. If [33mtypeof position !== 'number'[39m, the data will be written[0m
[0mat the current position.[0m

[0mThe callback will be given three arguments: [33merr[39m, [33mbytesWritten[39m, and[0m
[0m[33mbuffers[39m. [33mbytesWritten[39m is how many bytes were written from [33mbuffers[39m.[0m

[0mIf this method is [[33mutil.promisify()[39m][]ed, it returns a [33mPromise[39m for an[0m
[0m[33mObject[39m with [33mbytesWritten[39m and [33mbuffers[39m properties.[0m

[0mIt is unsafe to use [33mfs.writev()[39m multiple times on the same file without[0m
[0mwaiting for the callback. For this scenario, use [[33mfs.createWriteStream()[39m][].[0m

[0mOn Linux, positional writes don't work when the file is opened in append mode.[0m
[0mThe kernel ignores the position argument and always appends the data to[0m
[0mthe end of the file.[0m

[32m[1m## [33mfs.writevSync(fd, buffers[, position])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfd[39m {integer}[0m
    * [0m[33mbuffers[39m {ArrayBufferView[]}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0mReturns: {number} The number of bytes written.[0m

[0mFor detailed information, see the documentation of the asynchronous version of[0m
[0mthis API: [[33mfs.writev()[39m][].[0m

[32m[1m## [33mfs[39m[32m Promises API[22m[39m

[0mThe [33mfs.promises[39m API provides an alternative set of asynchronous file system[0m
[0mmethods that return [33mPromise[39m objects rather than using callbacks. The[0m
[0mAPI is accessible via [33mrequire('fs').promises[39m or [33mrequire('fs/promises')[39m.[0m

[32m[1m### class: [33mFileHandle[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA [33mFileHandle[39m object is a wrapper for a numeric file descriptor.[0m
[0mInstances of [33mFileHandle[39m are distinct from numeric file descriptors[0m
[0min that they provide an object oriented API for working with files.[0m

[0mIf a [33mFileHandle[39m is not closed using the[0m
[0m[33mfilehandle.close()[39m method, it might automatically close the file descriptor[0m
[0mand will emit a process warning, thereby helping to prevent memory leaks.[0m
[0mPlease do not rely on this behavior because it is unreliable and[0m
[0mthe file may not be closed. Instead, always explicitly close [33mFileHandle[39ms.[0m
[0mNode.js may change this behavior in the future.[0m

[0mInstances of the [33mFileHandle[39m object are created internally by the[0m
[0m[33mfsPromises.open()[39m method.[0m

[0mUnlike the callback-based API ([33mfs.fstat()[39m, [33mfs.fchown()[39m, [33mfs.fchmod()[39m, and[0m
[0mso on), a numeric file descriptor is not used by the promise-based API. Instead,[0m
[0mthe promise-based API uses the [33mFileHandle[39m class in order to help avoid[0m
[0maccidental leaking of unclosed file descriptors after a [33mPromise[39m is resolved or[0m
[0mrejected.[0m

[32m[1m#### [33mfilehandle.appendFile(data, options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {string|Buffer}[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mAlias of [[33mfilehandle.writeFile()[39m][].[0m

[0mWhen operating on file handles, the mode cannot be changed from what it was set[0m
[0mto with [[33mfsPromises.open()[39m][]. Therefore, this is equivalent to[0m
[0m[[33mfilehandle.writeFile()[39m][].[0m

[32m[1m#### [33mfilehandle.chmod(mode)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmode[39m {integer}[0m
    * [0mReturns: {Promise}[0m

[0mModifies the permissions on the file. The [33mPromise[39m is resolved with no[0m
[0marguments upon success.[0m

[32m[1m#### [33mfilehandle.chown(uid, gid)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33muid[39m {integer}[0m
    * [0m[33mgid[39m {integer}[0m
    * [0mReturns: {Promise}[0m

[0mChanges the ownership of the file then resolves the [33mPromise[39m with no arguments[0m
[0mupon success.[0m

[32m[1m#### [33mfilehandle.close()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Promise} A [33mPromise[39m that will be resolved once the underlying[0m
      [0mfile descriptor is closed, or will be rejected if an error occurs while[0m
      [0mclosing.[0m

[0mCloses the file descriptor.[0m

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

[32m[1m#### [33mfilehandle.datasync()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Promise}[0m

[0mAsynchronous fdatasync(2). The [33mPromise[39m is resolved with no arguments upon[0m
[0msuccess.[0m

[32m[1m#### [33mfilehandle.fd[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number} The numeric file descriptor managed by the [33mFileHandle[39m object.[0m

[32m[1m#### [33mfilehandle.read(buffer, offset, length, position)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|Uint8Array}[0m
    * [0m[33moffset[39m {integer}[0m
    * [0m[33mlength[39m {integer}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0mReturns: {Promise}[0m

[0mRead data from the file.[0m

[0m[33mbuffer[39m is the buffer that the data will be written to.[0m

[0m[33moffset[39m is the offset in the buffer to start writing at.[0m

[0m[33mlength[39m is an integer specifying the number of bytes to read.[0m

[0m[33mposition[39m is an argument specifying where to begin reading from in the file.[0m
[0mIf [33mposition[39m is [33mnull[39m, data will be read from the current file position,[0m
[0mand the file position will be updated.[0m
[0mIf [33mposition[39m is an integer, the file position will remain unchanged.[0m

[0mFollowing successful read, the [33mPromise[39m is resolved with an object with a[0m
[0m[33mbytesRead[39m property specifying the number of bytes read, and a [33mbuffer[39m[0m
[0mproperty that is a reference to the passed in [33mbuffer[39m argument.[0m

[32m[1m#### [33mfilehandle.read(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.11.0[39m
[90m-->[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbuffer[39m {Buffer|Uint8Array} [1mDefault:[22m [33mBuffer.alloc(16384)[39m[0m[0m[0m
      [0m
        * [0m[0m[33moffset[39m {integer} [1mDefault:[22m [33m0[39m[0m[0m[0m
      [0m
        * [0m[0m[33mlength[39m {integer} [1mDefault:[22m [33mbuffer.length[39m[0m[0m[0m
      [0m
        * [0m[0m[33mposition[39m {integer} [1mDefault:[22m [33mnull[39m[0m[0m[0m
    * [0mReturns: {Promise}[0m

[32m[1m#### [33mfilehandle.readFile(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33mnull[39m[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronously reads the entire contents of a file.[0m

[0mThe [33mPromise[39m is resolved with the contents of the file. If no encoding is[0m
[0mspecified (using [33moptions.encoding[39m), the data is returned as a [33mBuffer[39m[0m
[0mobject. Otherwise, the data will be a string.[0m

[0mIf [33moptions[39m is a string, then it specifies the encoding.[0m

[0mThe [33mFileHandle[39m has to support reading.[0m

[0mIf one or more [33mfilehandle.read()[39m calls are made on a file handle and then a[0m
[0m[33mfilehandle.readFile()[39m call is made, the data will be read from the current[0m
[0mposition till the end of the file. It doesn't always read from the beginning[0m
[0mof the file.[0m

[32m[1m#### [33mfilehandle.readv(buffers[, position])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: REPLACEME[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffers[39m {ArrayBufferView[]}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0mReturns: {Promise}[0m

[0mRead from a file and write to an array of [33mArrayBufferView[39ms[0m

[0mThe [33mPromise[39m is resolved with an object containing a [33mbytesRead[39m property[0m
[0midentifying the number of bytes read, and a [33mbuffers[39m property containing[0m
[0ma reference to the [33mbuffers[39m input.[0m

[0m[33mposition[39m is the offset from the beginning of the file where this data[0m
[0mshould be read from. If [33mtypeof position !== 'number'[39m, the data will be read[0m
[0mfrom the current position.[0m

[32m[1m#### [33mfilehandle.stat([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: Accepts an additional `options` object to specify whether[39m
[90m                 the numeric values returned should be bigint.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} Whether the numeric values in the returned[0m[0m[0m
      [0m      [0m[0m[[33mfs.Stats[39m][] object should be [33mbigint[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mRetrieves the [[33mfs.Stats[39m][] for the file.[0m

[32m[1m#### [33mfilehandle.sync()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Promise}[0m

[0mAsynchronous fsync(2). The [33mPromise[39m is resolved with no arguments upon[0m
[0msuccess.[0m

[32m[1m#### [33mfilehandle.truncate(len)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mlen[39m {integer} [1mDefault:[22m [33m0[39m[0m
    * [0mReturns: {Promise}[0m

[0mTruncates the file then resolves the [33mPromise[39m with no arguments upon success.[0m

[0mIf the file was larger than [33mlen[39m bytes, only the first [33mlen[39m bytes will be[0m
[0mretained in the file.[0m

[0mFor example, the following program retains only the first four bytes of the[0m
[0mfile:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfsPromises[39m [93m=[39m [37mfs[39m[32m.[39m[37mpromises[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: Node.js[39m
    
    [37masync[39m [94mfunction[39m [37mdoTruncate[39m[90m([39m[90m)[39m [33m{[39m
      [94mlet[39m [37mfilehandle[39m [93m=[39m [90mnull[39m[90m;[39m
      [36mtry[39m [33m{[39m
        [37mfilehandle[39m [93m=[39m [37mawait[39m [37mfsPromises[39m[32m.[39m[37mopen[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'r+'[39m[90m)[39m[90m;[39m
        [37mawait[39m [37mfilehandle[39m[32m.[39m[37mtruncate[39m[90m([39m[34m4[39m[90m)[39m[90m;[39m
      [33m}[39m [36mfinally[39m [33m{[39m
        [94mif[39m [90m([39m[37mfilehandle[39m[90m)[39m [33m{[39m
          [90m// Close the file if it is opened.[39m
          [37mawait[39m [37mfilehandle[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m  [90m// Prints: Node[39m
    [33m}[39m
    
    [37mdoTruncate[39m[90m([39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m

[0mIf the file previously was shorter than [33mlen[39m bytes, it is extended, and the[0m
[0mextended part is filled with null bytes ([33m'\0'[39m):[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfsPromises[39m [93m=[39m [37mfs[39m[32m.[39m[37mpromises[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: Node.js[39m
    
    [37masync[39m [94mfunction[39m [37mdoTruncate[39m[90m([39m[90m)[39m [33m{[39m
      [94mlet[39m [37mfilehandle[39m [93m=[39m [90mnull[39m[90m;[39m
      [36mtry[39m [33m{[39m
        [37mfilehandle[39m [93m=[39m [37mawait[39m [37mfsPromises[39m[32m.[39m[37mopen[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'r+'[39m[90m)[39m[90m;[39m
        [37mawait[39m [37mfilehandle[39m[32m.[39m[37mtruncate[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
      [33m}[39m [36mfinally[39m [33m{[39m
        [94mif[39m [90m([39m[37mfilehandle[39m[90m)[39m [33m{[39m
          [90m// Close the file if it is opened.[39m
          [37mawait[39m [37mfilehandle[39m[32m.[39m[37mclose[39m[90m([39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'temp.txt'[39m[32m,[39m [92m'utf8'[39m[90m)[39m[90m)[39m[90m;[39m  [90m// Prints Node.js\0\0\0[39m
    [33m}[39m
    
    [37mdoTruncate[39m[90m([39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m

[0mThe last three bytes are null bytes ([33m'\0'[39m), to compensate the over-truncation.[0m

[32m[1m#### [33mfilehandle.utimes(atime, mtime)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33matime[39m {number|string|Date}[0m
    * [0m[33mmtime[39m {number|string|Date}[0m
    * [0mReturns: {Promise}[0m

[0mChange the file system timestamps of the object referenced by the [33mFileHandle[39m[0m
[0mthen resolves the [33mPromise[39m with no arguments upon success.[0m

[0mThis function does not work on AIX versions before 7.1, it will resolve the[0m
[0m[33mPromise[39m with an error using code [33mUV_ENOSYS[39m.[0m

[32m[1m#### [33mfilehandle.write(buffer[, offset[, length[, position]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `buffer` parameter won't coerce unsupported input to[39m
[90m                 buffers anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffer[39m {Buffer|Uint8Array}[0m
    * [0m[33moffset[39m {integer}[0m
    * [0m[33mlength[39m {integer}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0mReturns: {Promise}[0m

[0mWrite [33mbuffer[39m to the file.[0m

[0mThe [33mPromise[39m is resolved with an object containing a [33mbytesWritten[39m property[0m
[0midentifying the number of bytes written, and a [33mbuffer[39m property containing[0m
[0ma reference to the [33mbuffer[39m written.[0m

[0m[33moffset[39m determines the part of the buffer to be written, and [33mlength[39m is[0m
[0man integer specifying the number of bytes to write.[0m

[0m[33mposition[39m refers to the offset from the beginning of the file where this data[0m
[0mshould be written. If [33mtypeof position !== 'number'[39m, the data will be written[0m
[0mat the current position. See pwrite(2).[0m

[0mIt is unsafe to use [33mfilehandle.write()[39m multiple times on the same file[0m
[0mwithout waiting for the [33mPromise[39m to be resolved (or rejected). For this[0m
[0mscenario, use [[33mfs.createWriteStream()[39m][].[0m

[0mOn Linux, positional writes do not work when the file is opened in append mode.[0m
[0mThe kernel ignores the position argument and always appends the data to[0m
[0mthe end of the file.[0m

[32m[1m#### [33mfilehandle.write(string[, position[, encoding]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `string` parameter won't coerce unsupported input to[39m
[90m                 strings anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstring[39m {string}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m
    * [0mReturns: {Promise}[0m

[0mWrite [33mstring[39m to the file. If [33mstring[39m is not a string, then[0m
[0man exception will be thrown.[0m

[0mThe [33mPromise[39m is resolved with an object containing a [33mbytesWritten[39m property[0m
[0midentifying the number of bytes written, and a [33mbuffer[39m property containing[0m
[0ma reference to the [33mstring[39m written.[0m

[0m[33mposition[39m refers to the offset from the beginning of the file where this data[0m
[0mshould be written. If the type of [33mposition[39m is not a [33mnumber[39m the data[0m
[0mwill be written at the current position. See pwrite(2).[0m

[0m[33mencoding[39m is the expected string encoding.[0m

[0mIt is unsafe to use [33mfilehandle.write()[39m multiple times on the same file[0m
[0mwithout waiting for the [33mPromise[39m to be resolved (or rejected). For this[0m
[0mscenario, use [[33mfs.createWriteStream()[39m][].[0m

[0mOn Linux, positional writes do not work when the file is opened in append mode.[0m
[0mThe kernel ignores the position argument and always appends the data to[0m
[0mthe end of the file.[0m

[32m[1m#### [33mfilehandle.writeFile(data, options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `data` parameter won't coerce unsupported input to[39m
[90m                 strings anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdata[39m {string|Buffer|Uint8Array}[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronously writes data to a file, replacing the file if it already exists.[0m
[0m[33mdata[39m can be a string or a buffer. The [33mPromise[39m will be resolved with no[0m
[0marguments upon success.[0m

[0mThe [33mencoding[39m option is ignored if [33mdata[39m is a buffer.[0m

[0mIf [33moptions[39m is a string, then it specifies the encoding.[0m

[0mThe [33mFileHandle[39m has to support writing.[0m

[0mIt is unsafe to use [33mfilehandle.writeFile()[39m multiple times on the same file[0m
[0mwithout waiting for the [33mPromise[39m to be resolved (or rejected).[0m

[0mIf one or more [33mfilehandle.write()[39m calls are made on a file handle and then a[0m
[0m[33mfilehandle.writeFile()[39m call is made, the data will be written from the[0m
[0mcurrent position till the end of the file. It doesn't always write from the[0m
[0mbeginning of the file.[0m

[32m[1m#### [33mfilehandle.writev(buffers[, position])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mbuffers[39m {ArrayBufferView[]}[0m
    * [0m[33mposition[39m {integer}[0m
    * [0mReturns: {Promise}[0m

[0mWrite an array of [33mArrayBufferView[39ms to the file.[0m

[0mThe [33mPromise[39m is resolved with an object containing a [33mbytesWritten[39m property[0m
[0midentifying the number of bytes written, and a [33mbuffers[39m property containing[0m
[0ma reference to the [33mbuffers[39m input.[0m

[0m[33mposition[39m is the offset from the beginning of the file where this data[0m
[0mshould be written. If [33mtypeof position !== 'number'[39m, the data will be written[0m
[0mat the current position.[0m

[0mIt is unsafe to call [33mwritev()[39m multiple times on the same file without waiting[0m
[0mfor the previous operation to complete.[0m

[0mOn Linux, positional writes don't work when the file is opened in append mode.[0m
[0mThe kernel ignores the position argument and always appends the data to[0m
[0mthe end of the file.[0m

[32m[1m### [33mfsPromises.access(path[, mode])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mmode[39m {integer} [1mDefault:[22m [33mfs.constants.F_OK[39m[0m
    * [0mReturns: {Promise}[0m

[0mTests a user's permissions for the file or directory specified by [33mpath[39m.[0m
[0mThe [33mmode[39m argument is an optional integer that specifies the accessibility[0m
[0mchecks to be performed. Check [File Access Constants][] for possible values[0m
[0mof [33mmode[39m. It is possible to create a mask consisting of the bitwise OR of[0m
[0mtwo or more values (e.g. [33mfs.constants.W_OK | fs.constants.R_OK[39m).[0m

[0mIf the accessibility check is successful, the [33mPromise[39m is resolved with no[0m
[0mvalue. If any of the accessibility checks fail, the [33mPromise[39m is rejected[0m
[0mwith an [33mError[39m object. The following example checks if the file[0m
[0m[33m/etc/passwd[39m can be read and written by the current process.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfsPromises[39m [93m=[39m [37mfs[39m[32m.[39m[37mpromises[39m[90m;[39m
    
    [37mfsPromises[39m[32m.[39m[37maccess[39m[90m([39m[92m'/etc/passwd'[39m[32m,[39m [37mfs[39m[32m.[39m[37mconstants[39m[32m.[39m[37mR_OK[39m [93m|[39m [37mfs[39m[32m.[39m[37mconstants[39m[32m.[39m[37mW_OK[39m[90m)[39m
      [32m.[39m[37mthen[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'can access'[39m[90m)[39m[90m)[39m
      [32m.[39m[36mcatch[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'cannot access'[39m[90m)[39m[90m)[39m[90m;[39m

[0mUsing [33mfsPromises.access()[39m to check for the accessibility of a file before[0m
[0mcalling [33mfsPromises.open()[39m is not recommended. Doing so introduces a race[0m
[0mcondition, since other processes may change the file's state between the two[0m
[0mcalls. Instead, user code should open/read/write the file directly and handle[0m
[0mthe error raised if the file is not accessible.[0m

[32m[1m### [33mfsPromises.appendFile(path, data[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL|FileHandle} filename or [33mFileHandle[39m[0m
    * [0m[33mdata[39m {string|Buffer}[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {integer} [1mDefault:[22m [33m0o666[39m[0m[0m[0m
      [0m
        * [0m[0m[33mflag[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m [33m'a'[39m.[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronously append data to a file, creating the file if it does not yet[0m
[0mexist. [33mdata[39m can be a string or a [[33mBuffer[39m][]. The [33mPromise[39m will be[0m
[0mresolved with no arguments upon success.[0m

[0mIf [33moptions[39m is a string, then it specifies the encoding.[0m

[0mThe [33mpath[39m may be specified as a [33mFileHandle[39m that has been opened[0m
[0mfor appending (using [33mfsPromises.open()[39m).[0m

[32m[1m### [33mfsPromises.chmod(path, mode)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mmode[39m {string|integer}[0m
    * [0mReturns: {Promise}[0m

[0mChanges the permissions of a file then resolves the [33mPromise[39m with no[0m
[0marguments upon succces.[0m

[32m[1m### [33mfsPromises.chown(path, uid, gid)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33muid[39m {integer}[0m
    * [0m[33mgid[39m {integer}[0m
    * [0mReturns: {Promise}[0m

[0mChanges the ownership of a file then resolves the [33mPromise[39m with no arguments[0m
[0mupon success.[0m

[32m[1m### [33mfsPromises.copyFile(src, dest[, mode])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msrc[39m {string|Buffer|URL} source filename to copy[0m
    * [0m[33mdest[39m {string|Buffer|URL} destination filename of the copy operation[0m
    * [0m[33mmode[39m {integer} modifiers for copy operation. [1mDefault:[22m [33m0[39m.[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronously copies [33msrc[39m to [33mdest[39m. By default, [33mdest[39m is overwritten if it[0m
[0malready exists. The [33mPromise[39m will be resolved with no arguments upon success.[0m

[0mNode.js makes no guarantees about the atomicity of the copy operation. If an[0m
[0merror occurs after the destination file has been opened for writing, Node.js[0m
[0mwill attempt to remove the destination.[0m

[0m[33mmode[39m is an optional integer that specifies the behavior[0m
[0mof the copy operation. It is possible to create a mask consisting of the bitwise[0m
[0mOR of two or more values (e.g.[0m
[0m[33mfs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE[39m).[0m

    * [0m[33mfs.constants.COPYFILE_EXCL[39m: The copy operation will fail if [33mdest[39m already[0m
      [0mexists.[0m
    * [0m[33mfs.constants.COPYFILE_FICLONE[39m: The copy operation will attempt to create a[0m
      [0mcopy-on-write reflink. If the platform does not support copy-on-write, then a[0m
      [0mfallback copy mechanism is used.[0m
    * [0m[33mfs.constants.COPYFILE_FICLONE_FORCE[39m: The copy operation will attempt to[0m
      [0mcreate a copy-on-write reflink. If the platform does not support copy-on-write,[0m
      [0mthen the operation will fail.[0m

    [94mconst[39m [33m{[39m
      [37mpromises[39m[93m:[39m [37mfsPromises[39m[32m,[39m
      [37mconstants[39m[93m:[39m [33m{[39m
        [37mCOPYFILE_EXCL[39m
      [33m}[39m
    [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [90m// destination.txt will be created or overwritten by default.[39m
    [37mfsPromises[39m[32m.[39m[37mcopyFile[39m[90m([39m[92m'source.txt'[39m[32m,[39m [92m'destination.txt'[39m[90m)[39m
      [32m.[39m[37mthen[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'source.txt was copied to destination.txt'[39m[90m)[39m[90m)[39m
      [32m.[39m[36mcatch[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'The file could not be copied'[39m[90m)[39m[90m)[39m[90m;[39m
    
    [90m// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.[39m
    [37mfsPromises[39m[32m.[39m[37mcopyFile[39m[90m([39m[92m'source.txt'[39m[32m,[39m [92m'destination.txt'[39m[32m,[39m [37mCOPYFILE_EXCL[39m[90m)[39m
      [32m.[39m[37mthen[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'source.txt was copied to destination.txt'[39m[90m)[39m[90m)[39m
      [32m.[39m[36mcatch[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'The file could not be copied'[39m[90m)[39m[90m)[39m[90m;[39m

[32m[1m### [33mfsPromises.lchmod(path, mode)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90mdeprecated: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mmode[39m {integer}[0m
    * [0mReturns: {Promise}[0m

[0mChanges the permissions on a symbolic link then resolves the [33mPromise[39m with[0m
[0mno arguments upon success. This method is only implemented on macOS.[0m

[32m[1m### [33mfsPromises.lchown(path, uid, gid)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: v10.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/21498[39m
[90m    description: This API is no longer deprecated.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33muid[39m {integer}[0m
    * [0m[33mgid[39m {integer}[0m
    * [0mReturns: {Promise}[0m

[0mChanges the ownership on a symbolic link then resolves the [33mPromise[39m with[0m
[0mno arguments upon success.[0m

[32m[1m### [33mfsPromises.link(existingPath, newPath)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mexistingPath[39m {string|Buffer|URL}[0m
    * [0m[33mnewPath[39m {string|Buffer|URL}[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronous link(2). The [33mPromise[39m is resolved with no arguments upon success.[0m

[32m[1m### [33mfsPromises.lstat(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: Accepts an additional `options` object to specify whether[39m
[90m                 the numeric values returned should be bigint.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} Whether the numeric values in the returned[0m[0m[0m
      [0m      [0m[0m[[33mfs.Stats[39m][] object should be [33mbigint[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronous lstat(2). The [33mPromise[39m is resolved with the [[33mfs.Stats[39m][] object[0m
[0mfor the given symbolic link [33mpath[39m.[0m

[32m[1m### [33mfsPromises.mkdir(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object|integer}
        * [0m[0m[33mrecursive[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {string|integer} Not supported on Windows. [1mDefault:[22m [33m0o777[39m.[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronously creates a directory then resolves the [33mPromise[39m with either no[0m
[0marguments, or the first folder path created if [33mrecursive[39m is [33mtrue[39m.[0m

[0mThe optional [33moptions[39m argument can be an integer specifying [33mmode[39m (permission[0m
[0mand sticky bits), or an object with a [33mmode[39m property and a [33mrecursive[39m[0m
[0mproperty indicating whether parent folders should be created. Calling[0m
[0m[33mfsPromises.mkdir()[39m when [33mpath[39m is a directory that exists results in a[0m
[0mrejection only when [33mrecursive[39m is false.[0m

[32m[1m### [33mfsPromises.mkdtemp(prefix[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mprefix[39m {string}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mCreates a unique temporary directory and resolves the [33mPromise[39m with the created[0m
[0mfolder path. A unique directory name is generated by appending six random[0m
[0mcharacters to the end of the provided [33mprefix[39m. Due to platform[0m
[0minconsistencies, avoid trailing [33mX[39m characters in [33mprefix[39m. Some platforms,[0m
[0mnotably the BSDs, can return more than six random characters, and replace[0m
[0mtrailing [33mX[39m characters in [33mprefix[39m with random characters.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use.[0m

    [37mfsPromises[39m[32m.[39m[37mmkdtemp[39m[90m([39m[37mpath[39m[32m.[39m[37mjoin[39m[90m([39m[37mos[39m[32m.[39m[37mtmpdir[39m[90m([39m[90m)[39m[32m,[39m [92m'foo-'[39m[90m)[39m[90m)[39m
      [32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m

[0mThe [33mfsPromises.mkdtemp()[39m method will append the six randomly selected[0m
[0mcharacters directly to the [33mprefix[39m string. For instance, given a directory[0m
[0m[33m/tmp[39m, if the intention is to create a temporary directory [3mwithin[23m [33m/tmp[39m, the[0m
[0m[33mprefix[39m must end with a trailing platform-specific path separator[0m
[0m([33mrequire('path').sep[39m).[0m

[32m[1m### [33mfsPromises.open(path, flags[, mode])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: v11.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23767[39m
[90m    description: The `flags` argument is now optional and defaults to `'r'`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mflags[39m {string|number} See [support of file system [33mflags[39m][].[0m
      [0m[1mDefault:[22m [33m'r'[39m.[0m
    * [0m[33mmode[39m {string|integer} [1mDefault:[22m [33m0o666[39m (readable and writable)[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronous file open that returns a [33mPromise[39m that, when resolved, yields a[0m
[0m[33mFileHandle[39m object. See open(2).[0m

[0m[33mmode[39m sets the file mode (permission and sticky bits), but only if the file was[0m
[0mcreated.[0m

[0mSome characters ([33m< > : " / \ | ? *[39m) are reserved under Windows as documented[0m
[0mby [Naming Files, Paths, and Namespaces][]. Under NTFS, if the filename contains[0m
[0ma colon, Node.js will open a file system stream, as described by[0m
[0m[this MSDN page][MSDN-Using-Streams].[0m

[32m[1m### [33mfsPromises.opendir(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90mchanges:[39m
[90m  - version: v13.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30114[39m
[90m    description: The `bufferSize` option was introduced.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mbufferSize[39m {number} Number of directory entries that are buffered[0m[0m[0m
      [0m      [0m[0minternally when reading from the directory. Higher values lead to better[0m[0m[0m
      [0m      [0m[0mperformance but higher memory usage. [1mDefault:[22m [33m32[39m[0m[0m[0m
    * [0mReturns: {Promise} containing {fs.Dir}[0m

[0mAsynchronously open a directory. See opendir(3).[0m

[0mCreates an [[33mfs.Dir[39m][], which contains all further functions for reading from[0m
[0mand cleaning up the directory.[0m

[0mThe [33mencoding[39m option sets the encoding for the [33mpath[39m while opening the[0m
[0mdirectory and subsequent read operations.[0m

[0mExample using async iteration:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mprint[39m[90m([39m[37mpath[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mdir[39m [93m=[39m [37mawait[39m [37mfs[39m[32m.[39m[37mpromises[39m[32m.[39m[37mopendir[39m[90m([39m[37mpath[39m[90m)[39m[90m;[39m
      [94mfor[39m [37mawait[39m [90m([39m[94mconst[39m [37mdirent[39m [37mof[39m [37mdir[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdirent[39m[32m.[39m[37mname[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    [37mprint[39m[90m([39m[92m'./'[39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m

[32m[1m### [33mfsPromises.readdir(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: v10.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22020[39m
[90m    description: New option `withFileTypes` was added.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mwithFileTypes[39m {boolean} [1mDefault:[22m [33mfalse[39m[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mReads the contents of a directory then resolves the [33mPromise[39m with an array[0m
[0mof the names of the files in the directory excluding [33m'.'[39m and [33m'..'[39m.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe filenames. If the [33mencoding[39m is set to [33m'buffer'[39m, the filenames returned[0m
[0mwill be passed as [33mBuffer[39m objects.[0m

[0mIf [33moptions.withFileTypes[39m is set to [33mtrue[39m, the resolved array will contain[0m
[0m[[33mfs.Dirent[39m][] objects.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mprint[39m[90m([39m[37mpath[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mfiles[39m [93m=[39m [37mawait[39m [37mfs[39m[32m.[39m[37mpromises[39m[32m.[39m[37mreaddir[39m[90m([39m[37mpath[39m[90m)[39m[90m;[39m
      [94mfor[39m [90m([39m[94mconst[39m [37mfile[39m [37mof[39m [37mfiles[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfile[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m
    [37mprint[39m[90m([39m[92m'./'[39m[90m)[39m[32m.[39m[36mcatch[39m[90m([39m[34mconsole[39m[32m.[39m[91merror[39m[90m)[39m[90m;[39m

[32m[1m### [33mfsPromises.readFile(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL|FileHandle} filename or [33mFileHandle[39m[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33mnull[39m[0m[0m[0m
      [0m
        * [0m[0m[33mflag[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m [33m'r'[39m.[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronously reads the entire contents of a file.[0m

[0mThe [33mPromise[39m is resolved with the contents of the file. If no encoding is[0m
[0mspecified (using [33moptions.encoding[39m), the data is returned as a [33mBuffer[39m[0m
[0mobject. Otherwise, the data will be a string.[0m

[0mIf [33moptions[39m is a string, then it specifies the encoding.[0m

[0mWhen the [33mpath[39m is a directory, the behavior of [33mfsPromises.readFile()[39m is[0m
[0mplatform-specific. On macOS, Linux, and Windows, the promise will be rejected[0m
[0mwith an error. On FreeBSD, a representation of the directory's contents will be[0m
[0mreturned.[0m

[0mAny specified [33mFileHandle[39m has to support reading.[0m

[32m[1m### [33mfsPromises.readlink(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronous readlink(2). The [33mPromise[39m is resolved with the [33mlinkString[39m upon[0m
[0msuccess.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe link path returned. If the [33mencoding[39m is set to [33m'buffer'[39m, the link path[0m
[0mreturned will be passed as a [33mBuffer[39m object.[0m

[32m[1m### [33mfsPromises.realpath(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {string|Object}
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mDetermines the actual location of [33mpath[39m using the same semantics as the[0m
[0m[33mfs.realpath.native()[39m function then resolves the [33mPromise[39m with the resolved[0m
[0mpath.[0m

[0mOnly paths that can be converted to UTF8 strings are supported.[0m

[0mThe optional [33moptions[39m argument can be a string specifying an encoding, or an[0m
[0mobject with an [33mencoding[39m property specifying the character encoding to use for[0m
[0mthe path. If the [33mencoding[39m is set to [33m'buffer'[39m, the path returned will be[0m
[0mpassed as a [33mBuffer[39m object.[0m

[0mOn Linux, when Node.js is linked against musl libc, the procfs file system must[0m
[0mbe mounted on [33m/proc[39m in order for this function to work. Glibc does not have[0m
[0mthis restriction.[0m

[32m[1m### [33mfsPromises.rename(oldPath, newPath)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moldPath[39m {string|Buffer|URL}[0m
    * [0m[33mnewPath[39m {string|Buffer|URL}[0m
    * [0mReturns: {Promise}[0m

[0mRenames [33moldPath[39m to [33mnewPath[39m and resolves the [33mPromise[39m with no arguments[0m
[0mupon success.[0m

[32m[1m### [33mfsPromises.rmdir(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: v13.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30644[39m
[90m    description: The `maxBusyTries` option is renamed to `maxRetries`, and its[39m
[90m                 default is 0. The `emfileWait` option has been removed, and[39m
[90m                 `EMFILE` errors use the same retry logic as other errors. The[39m
[90m                 `retryDelay` option is now supported. `ENFILE` errors are now[39m
[90m                 retried.[39m
[90m  - version: v12.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29168[39m
[90m    description: The `recursive`, `maxBusyTries`, and `emfileWait` options are[39m
[90m                  now supported.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Recursive removal is experimental.[0m[23m[39m

    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mmaxRetries[39m {integer} If an [33mEBUSY[39m, [33mEMFILE[39m, [33mENFILE[39m, [33mENOTEMPTY[39m, or[0m[0m[0m
      [0m      [0m[0m[33mEPERM[39m error is encountered, Node.js will retry the operation with a linear[0m[0m[0m
      [0m      [0m[0mbackoff wait of [33mretryDelay[39m ms longer on each try. This option represents[0m[0m[0m
      [0m      [0m[0mthe number of retries. This option is ignored if the [33mrecursive[39m option is[0m[0m[0m
      [0m      [0m[0mnot [33mtrue[39m. [1mDefault:[22m [33m0[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mrecursive[39m {boolean} If [33mtrue[39m, perform a recursive directory removal. In[0m[0m[0m
      [0m      [0m[0mrecursive mode, errors are not reported if [33mpath[39m does not exist, and[0m[0m[0m
      [0m      [0m[0moperations are retried on failure. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mretryDelay[39m {integer} The amount of time in milliseconds to wait between[0m[0m[0m
      [0m      [0m[0mretries. This option is ignored if the [33mrecursive[39m option is not [33mtrue[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m100[39m.[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mRemoves the directory identified by [33mpath[39m then resolves the [33mPromise[39m with[0m
[0mno arguments upon success.[0m

[0mUsing [33mfsPromises.rmdir()[39m on a file (not a directory) results in the[0m
[0m[33mPromise[39m being rejected with an [33mENOENT[39m error on Windows and an [33mENOTDIR[39m[0m
[0merror on POSIX.[0m

[32m[1m### [33mfsPromises.stat(path[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: v10.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20220[39m
[90m    description: Accepts an additional `options` object to specify whether[39m
[90m                 the numeric values returned should be bigint.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mbigint[39m {boolean} Whether the numeric values in the returned[0m[0m[0m
      [0m      [0m[0m[[33mfs.Stats[39m][] object should be [33mbigint[39m. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mThe [33mPromise[39m is resolved with the [[33mfs.Stats[39m][] object for the given [33mpath[39m.[0m

[32m[1m### [33mfsPromises.symlink(target, path[, type])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mtarget[39m {string|Buffer|URL}[0m
    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mtype[39m {string} [1mDefault:[22m [33m'file'[39m[0m
    * [0mReturns: {Promise}[0m

[0mCreates a symbolic link then resolves the [33mPromise[39m with no arguments upon[0m
[0msuccess.[0m

[0mThe [33mtype[39m argument is only used on Windows platforms and can be one of [33m'dir'[39m,[0m
[0m[33m'file'[39m, or [33m'junction'[39m. Windows junction points require the destination path[0m
[0mto be absolute. When using [33m'junction'[39m, the [33mtarget[39m argument will[0m
[0mautomatically be normalized to absolute path.[0m

[32m[1m### [33mfsPromises.truncate(path[, len])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33mlen[39m {integer} [1mDefault:[22m [33m0[39m[0m
    * [0mReturns: {Promise}[0m

[0mTruncates the [33mpath[39m then resolves the [33mPromise[39m with no arguments upon[0m
[0msuccess. The [33mpath[39m [3mmust[23m be a string or [33mBuffer[39m.[0m

[32m[1m### [33mfsPromises.unlink(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronous unlink(2). The [33mPromise[39m is resolved with no arguments upon[0m
[0msuccess.[0m

[32m[1m### [33mfsPromises.utimes(path, atime, mtime)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string|Buffer|URL}[0m
    * [0m[33matime[39m {number|string|Date}[0m
    * [0m[33mmtime[39m {number|string|Date}[0m
    * [0mReturns: {Promise}[0m

[0mChange the file system timestamps of the object referenced by [33mpath[39m then[0m
[0mresolves the [33mPromise[39m with no arguments upon success.[0m

[0mThe [33matime[39m and [33mmtime[39m arguments follow these rules:[0m

    * [0mValues can be either numbers representing Unix epoch time, [33mDate[39ms, or a[0m
      [0mnumeric string like [33m'123456789.0'[39m.[0m
    * [0mIf the value can not be converted to a number, or is [33mNaN[39m, [33mInfinity[39m or[0m
      [0m[33m-Infinity[39m, an [33mError[39m will be thrown.[0m

[32m[1m### [33mfsPromises.writeFile(file, data[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/31030[39m
[90m    description: The `data` parameter won't coerce unsupported input to[39m
[90m                 strings anymore.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfile[39m {string|Buffer|URL|FileHandle} filename or [33mFileHandle[39m[0m
    * [0m[33mdata[39m {string|Buffer|Uint8Array}[0m
    * [0m[33moptions[39m {Object|string}
        * [0m[0m[33mencoding[39m {string|null} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmode[39m {integer} [1mDefault:[22m [33m0o666[39m[0m[0m[0m
      [0m
        * [0m[0m[33mflag[39m {string} See [support of file system [33mflags[39m][]. [1mDefault:[22m [33m'w'[39m.[0m[0m[0m
    * [0mReturns: {Promise}[0m

[0mAsynchronously writes data to a file, replacing the file if it already exists.[0m
[0m[33mdata[39m can be a string or a buffer. The [33mPromise[39m will be resolved with no[0m
[0marguments upon success.[0m

[0mThe [33mencoding[39m option is ignored if [33mdata[39m is a buffer.[0m

[0mIf [33moptions[39m is a string, then it specifies the encoding.[0m

[0mAny specified [33mFileHandle[39m has to support writing.[0m

[0mIt is unsafe to use [33mfsPromises.writeFile()[39m multiple times on the same file[0m
[0mwithout waiting for the [33mPromise[39m to be resolved (or rejected).[0m

[32m[1m## FS Constants[22m[39m

[0mThe following constants are exported by [33mfs.constants[39m.[0m

[0mNot every constant will be available on every operating system.[0m

[32m[1m### File Access Constants[22m[39m

[0mThe following constants are meant for use with [[33mfs.access()[39m][].[0m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constan[39m[0mt[90m</th>[39m[0m
[0m    [90m<th>[39mDescription[90m</th>[39m[0m
[0m  [90m</tr>[39m[0m
[0m  [90m<tr>[39m[0m
[0m    [90m<td>[39m[90m<code>[39mF_OK[90m</code>[39m[90m</td>[39m[0m
[0m    [90m<td>[39mFlag indicating that the file is visible to the calling process.[0m
[0m     This is useful for determining if a file exists, but says nothing[0m
[0m     about [90m<code>[39mrwx[90m</code>[39m permissions. Default if no mode is specified.[90m</td>[39m[0m
[0m  [90m</tr>[39m[0m
[0m  [90m<tr>[39m[0m
[0m    [90m<td>[39m[90m<code>[39mR_OK[90m</code>[39m[90m</td>[39m[0m
[0m    [90m<td>[39mFlag indicating that the file can be read by the calling process.[90m</td>[39m[0m
[0m  [90m</tr>[39m[0m
[0m  [90m<tr>[39m[0m
[0m    [90m<td>[39m[90m<code>[39mW_OK[90m</code>[39m[90m</td>[39m[0m
[0m    [90m<td>[39mFlag indicating that the file can be written by the calling[0m
[0m    process.[90m</td>[39m[0m
[0m  [90m</tr>[39m[0m
[0m  [90m<tr>[39m[0m
[0m    [90m<td>[39m[90m<code>[39mX_OK[90m</code>[39m[90m</td>[39m[0m
[0m    [90m<td>[39mFlag indicating that the file can be executed by the calling[0m
[0m    process. This has no effect on Windows[0m
[0m    (will behave like [90m<code>[39mfs.constants.F_OK[90m</code>[39m).[90m</td>[39m[0m
[0m  [90m</tr>[39m[0m

[90m</table>[39m
[90m[39m
[90m[39m[32m[1m### File Copy Constants[22m[39m

[0mThe following constants are meant for use with [34m[33mfs.copyFile()[39m[34m ([34m[4m#fs_fs_copyfile_src_dest_mode_callback[24m[39m[34m)[39m.[0m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>COPYFILE_EXCL</code></td>[39m
[90m    <td>If present, the copy operation will fail with an error if the[39m
[90m    destination path already exists.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>COPYFILE_FICLONE</code></td>[39m
[90m    <td>If present, the copy operation will attempt to create a[39m
[90m    copy-on-write reflink. If the underlying platform does not support[39m
[90m    copy-on-write, then a fallback copy mechanism is used.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>COPYFILE_FICLONE_FORCE</code></td>[39m
[90m    <td>If present, the copy operation will attempt to create a[39m
[90m    copy-on-write reflink. If the underlying platform does not support[39m
[90m    copy-on-write, then the operation will fail with an error.</td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m[32m[1m### File Open Constants[22m[39m

[0mThe following constants are meant for use with [33mfs.open()[39m.[0m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_RDONLY</code></td>[39m
[90m    <td>Flag indicating to open a file for read-only access.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_WRONLY</code></td>[39m
[90m    <td>Flag indicating to open a file for write-only access.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_RDWR</code></td>[39m
[90m    <td>Flag indicating to open a file for read-write access.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_CREAT</code></td>[39m
[90m    <td>Flag indicating to create the file if it does not already exist.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_EXCL</code></td>[39m
[90m    <td>Flag indicating that opening a file should fail if the[39m
[90m    <code>O_CREAT</code> flag is set and the file already exists.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_NOCTTY</code></td>[39m
[90m    <td>Flag indicating that if path identifies a terminal device, opening the[39m
[90m    path shall not cause that terminal to become the controlling terminal for[39m
[90m    the process (if the process does not already have one).</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_TRUNC</code></td>[39m
[90m    <td>Flag indicating that if the file exists and is a regular file, and the[39m
[90m    file is opened successfully for write access, its length shall be truncated[39m
[90m    to zero.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_APPEND</code></td>[39m
[90m    <td>Flag indicating that data will be appended to the end of the file.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_DIRECTORY</code></td>[39m
[90m    <td>Flag indicating that the open should fail if the path is not a[39m
[90m    directory.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m  <td><code>O_NOATIME</code></td>[39m
[90m    <td>Flag indicating reading accesses to the file system will no longer[39m
[90m    result in an update to the <code>atime</code> information associated with[39m
[90m    the file. This flag is available on Linux operating systems only.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_NOFOLLOW</code></td>[39m
[90m    <td>Flag indicating that the open should fail if the path is a symbolic[39m
[90m    link.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_SYNC</code></td>[39m
[90m    <td>Flag indicating that the file is opened for synchronized I/O with write[39m
[90m    operations waiting for file integrity.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_DSYNC</code></td>[39m
[90m    <td>Flag indicating that the file is opened for synchronized I/O with write[39m
[90m    operations waiting for data integrity.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_SYMLINK</code></td>[39m
[90m    <td>Flag indicating to open the symbolic link itself rather than the[39m
[90m    resource it is pointing to.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_DIRECT</code></td>[39m
[90m    <td>When set, an attempt will be made to minimize caching effects of file[39m
[90m    I/O.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>O_NONBLOCK</code></td>[39m
[90m    <td>Flag indicating to open the file in nonblocking mode when possible.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>UV_FS_O_FILEMAP</code></td>[39m
[90m    <td>When set, a memory file mapping is used to access the file. This flag[39m
[90m    is available on Windows operating systems only. On other operating systems,[39m
[90m    this flag is ignored.</td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m[32m[1m### File Type Constants[22m[39m

[0mThe following constants are meant for use with the [34m[33mfs.Stats[39m[34m ([34m[4m#fs_class_fs_stats[24m[39m[34m)[39m object's[0m
[0m[33mmode[39m property for determining a file's type.[0m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IFMT</code></td>[39m
[90m    <td>Bit mask used to extract the file type code.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IFREG</code></td>[39m
[90m    <td>File type constant for a regular file.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IFDIR</code></td>[39m
[90m    <td>File type constant for a directory.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IFCHR</code></td>[39m
[90m    <td>File type constant for a character-oriented device file.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IFBLK</code></td>[39m
[90m    <td>File type constant for a block-oriented device file.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IFIFO</code></td>[39m
[90m    <td>File type constant for a FIFO/pipe.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IFLNK</code></td>[39m
[90m    <td>File type constant for a symbolic link.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IFSOCK</code></td>[39m
[90m    <td>File type constant for a socket.</td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m[32m[1m### File Mode Constants[22m[39m

[0mThe following constants are meant for use with the [34m[33mfs.Stats[39m[34m ([34m[4m#fs_class_fs_stats[24m[39m[34m)[39m object's[0m
[0m[33mmode[39m property for determining the access permissions for a file.[0m

[90m<table>[39m
[90m  <tr>[39m
[90m    <th>Constant</th>[39m
[90m    <th>Description</th>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IRWXU</code></td>[39m
[90m    <td>File mode indicating readable, writable, and executable by owner.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IRUSR</code></td>[39m
[90m    <td>File mode indicating readable by owner.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IWUSR</code></td>[39m
[90m    <td>File mode indicating writable by owner.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IXUSR</code></td>[39m
[90m    <td>File mode indicating executable by owner.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IRWXG</code></td>[39m
[90m    <td>File mode indicating readable, writable, and executable by group.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IRGRP</code></td>[39m
[90m    <td>File mode indicating readable by group.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IWGRP</code></td>[39m
[90m    <td>File mode indicating writable by group.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IXGRP</code></td>[39m
[90m    <td>File mode indicating executable by group.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IRWXO</code></td>[39m
[90m    <td>File mode indicating readable, writable, and executable by others.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IROTH</code></td>[39m
[90m    <td>File mode indicating readable by others.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IWOTH</code></td>[39m
[90m    <td>File mode indicating writable by others.</td>[39m
[90m  </tr>[39m
[90m  <tr>[39m
[90m    <td><code>S_IXOTH</code></td>[39m
[90m    <td>File mode indicating executable by others.</td>[39m
[90m  </tr>[39m
[90m</table>[39m
[90m[39m
[90m[39m[32m[1m## File System Flags[22m[39m

[0mThe following flags are available wherever the [33mflag[39m option takes a[0m
[0mstring.[0m

    * [0m[0m[0m[33m'a'[39m: Open file for appending.[0m[0m[0m
      [0m[0m[0mThe file is created if it does not exist.[0m[0m[0m
    * [0m[0m[0m[33m'ax'[39m: Like [33m'a'[39m but fails if the path exists.[0m[0m[0m
    * [0m[0m[0m[33m'a+'[39m: Open file for reading and appending.[0m[0m[0m
      [0m[0m[0mThe file is created if it does not exist.[0m[0m[0m
    * [0m[0m[0m[33m'ax+'[39m: Like [33m'a+'[39m but fails if the path exists.[0m[0m[0m
    * [0m[0m[0m[33m'as'[39m: Open file for appending in synchronous mode.[0m[0m[0m
      [0m[0m[0mThe file is created if it does not exist.[0m[0m[0m
    * [0m[0m[0m[33m'as+'[39m: Open file for reading and appending in synchronous mode.[0m[0m[0m
      [0m[0m[0mThe file is created if it does not exist.[0m[0m[0m
    * [0m[0m[0m[33m'r'[39m: Open file for reading.[0m[0m[0m
      [0m[0m[0mAn exception occurs if the file does not exist.[0m[0m[0m
    * [0m[0m[0m[33m'r+'[39m: Open file for reading and writing.[0m[0m[0m
      [0m[0m[0mAn exception occurs if the file does not exist.[0m[0m[0m
    * [0m[0m[0m[33m'rs+'[39m: Open file for reading and writing in synchronous mode. Instructs[0m[0m[0m
      [0m[0m[0mthe operating system to bypass the local file system cache.[0m[0m[0m
      [0m[0m
      [0m[0m[0mThis is primarily useful for opening files on NFS mounts as it allows[0m[0m[0m
      [0m[0m[0mskipping the potentially stale local cache. It has a very real impact on[0m[0m[0m
      [0m[0m[0mI/O performance so using this flag is not recommended unless it is needed.[0m[0m[0m
      [0m[0m
      [0m[0m[0mThis doesn't turn [33mfs.open()[39m or [33mfsPromises.open()[39m into a synchronous[0m[0m[0m
      [0m[0m[0mblocking call. If synchronous operation is desired, something like[0m[0m[0m
      [0m[0m[0m[33mfs.openSync()[39m should be used.[0m[0m[0m
    * [0m[0m[0m[33m'w'[39m: Open file for writing.[0m[0m[0m
      [0m[0m[0mThe file is created (if it does not exist) or truncated (if it exists).[0m[0m[0m
    * [0m[0m[0m[33m'wx'[39m: Like [33m'w'[39m but fails if the path exists.[0m[0m[0m
    * [0m[0m[0m[33m'w+'[39m: Open file for reading and writing.[0m[0m[0m
      [0m[0m[0mThe file is created (if it does not exist) or truncated (if it exists).[0m[0m[0m
    * [0m[0m[0m[33m'wx+'[39m: Like [33m'w+'[39m but fails if the path exists.[0m[0m[0m

[0m[33mflag[39m can also be a number as documented by open(2); commonly used constants[0m
[0mare available from [33mfs.constants[39m. On Windows, flags are translated to[0m
[0mtheir equivalent ones where applicable, e.g. [33mO_WRONLY[39m to [33mFILE_GENERIC_WRITE[39m,[0m
[0mor [33mO_EXCL|O_CREAT[39m to [33mCREATE_NEW[39m, as accepted by [33mCreateFileW[39m.[0m

[0mThe exclusive flag [33m'x'[39m ([33mO_EXCL[39m flag in open(2)) ensures that path is newly[0m
[0mcreated. On POSIX systems, path is considered to exist even if it is a symlink[0m
[0mto a non-existent file. The exclusive flag may or may not work with network[0m
[0mfile systems.[0m

[0mOn Linux, positional writes don't work when the file is opened in append mode.[0m
[0mThe kernel ignores the position argument and always appends the data to[0m
[0mthe end of the file.[0m

[0mModifying a file rather than replacing it may require the [33mflag[39m option to be[0m
[0mset to [33m'r+'[39m rather than the default [33m'w'[39m.[0m

[0mThe behavior of some flags are platform-specific. As such, opening a directory[0m
[0mon macOS and Linux with the [33m'a+'[39m flag, as in the example below, will return an[0m
[0merror. In contrast, on Windows and FreeBSD, a file descriptor or a [33mFileHandle[39m[0m
[0mwill be returned.[0m

    [90m// macOS and Linux[39m
    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'<directory>'[39m[32m,[39m [92m'a+'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// => [Error: EISDIR: illegal operation on a directory, open <directory>][39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Windows and FreeBSD[39m
    [37mfs[39m[32m.[39m[37mopen[39m[90m([39m[92m'<directory>'[39m[32m,[39m [92m'a+'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mfd[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// => null, <fd>[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOn Windows, opening an existing hidden file using the [33m'w'[39m flag (either[0m
[0mthrough [33mfs.open()[39m or [33mfs.writeFile()[39m or [33mfsPromises.open()[39m) will fail with[0m
[0m[33mEPERM[39m. Existing hidden files can be opened for writing with the [33m'r+'[39m flag.[0m

[0mA call to [33mfs.ftruncate()[39m or [33mfilehandle.truncate()[39m can be used to reset[0m
[0mthe file contents.[0m

