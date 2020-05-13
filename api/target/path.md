[35m[4m[1m# Path[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mpath[39m module provides utilities for working with file and directory paths.[0m
[0mIt can be accessed using:[0m

    [94mconst[39m [37mpath[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/path'[39m[90m)[39m[90m;[39m

[32m[1m## Windows vs. POSIX[22m[39m

[0mThe default operation of the [33mpath[39m module varies based on the operating system[0m
[0mon which a Node.js application is running. Specifically, when running on a[0m
[0mWindows operating system, the [33mpath[39m module will assume that Windows-style[0m
[0mpaths are being used.[0m

[0mSo using [33mpath.basename()[39m might yield different results on POSIX and Windows:[0m

[0mOn POSIX:[0m

    [37mpath[39m[32m.[39m[37mbasename[39m[90m([39m[92m'C:\\temp\\myfile.html'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'C:\\temp\\myfile.html'[39m

[0mOn Windows:[0m

    [37mpath[39m[32m.[39m[37mbasename[39m[90m([39m[92m'C:\\temp\\myfile.html'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'myfile.html'[39m

[0mTo achieve consistent results when working with Windows file paths on any[0m
[0moperating system, use [34m[33mpath.win32[39m[34m ([34m[4m#path_path_win32[24m[39m[34m)[39m:[0m

[0mOn POSIX and Windows:[0m

    [37mpath[39m[32m.[39m[37mwin32[39m[32m.[39m[37mbasename[39m[90m([39m[92m'C:\\temp\\myfile.html'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'myfile.html'[39m

[0mTo achieve consistent results when working with POSIX file paths on any[0m
[0moperating system, use [34m[33mpath.posix[39m[34m ([34m[4m#path_path_posix[24m[39m[34m)[39m:[0m

[0mOn POSIX and Windows:[0m

    [37mpath[39m[32m.[39m[37mposix[39m[32m.[39m[37mbasename[39m[90m([39m[92m'/tmp/myfile.html'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'myfile.html'[39m

[0mOn Windows Node.js follows the concept of per-drive working directory.[0m
[0mThis behavior can be observed when using a drive path without a backslash. For[0m
[0mexample, [33mpath.resolve('C:\\')[39m can potentially return a different result than[0m
[0m[33mpath.resolve('C:')[39m. For more information, see[0m
[0m[34mthis MSDN page ([34m[4mhttps://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#fully-qualified-vs-relative-paths[24m[39m[34m)[39m.[0m

[32m[1m## [33mpath.basename(path[, ext])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.25[39m
[90mchanges:[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5348[39m
[90m    description: Passing a non-string as the `path` argument will throw now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string}[0m
    * [0m[33mext[39m {string} An optional file extension[0m
    * [0mReturns: {string}[0m

[0mThe [33mpath.basename()[39m methods returns the last portion of a [33mpath[39m, similar to[0m
[0mthe Unix [33mbasename[39m command. Trailing directory separators are ignored, see[0m
[0m[34m[33mpath.sep[39m[34m ([34m[4m#path_path_sep[24m[39m[34m)[39m.[0m

    [37mpath[39m[32m.[39m[37mbasename[39m[90m([39m[92m'/foo/bar/baz/asdf/quux.html'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'quux.html'[39m
    
    [37mpath[39m[32m.[39m[37mbasename[39m[90m([39m[92m'/foo/bar/baz/asdf/quux.html'[39m[32m,[39m [92m'.html'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'quux'[39m

[0mA [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m is thrown if [33mpath[39m is not a string or if [33mext[39m is given[0m
[0mand is not a string.[0m

[32m[1m## [33mpath.delimiter[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mProvides the platform-specific path delimiter:[0m

    * [0m[33m;[39m for Windows[0m
    * [0m[33m:[39m for POSIX[0m

[0mFor example, on POSIX:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mPATH[39m[90m)[39m[90m;[39m
    [90m// Prints: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'[39m
    
    [37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mPATH[39m[32m.[39m[37msplit[39m[90m([39m[37mpath[39m[32m.[39m[37mdelimiter[39m[90m)[39m[90m;[39m
    [90m// Returns: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin'][39m

[0mOn Windows:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mPATH[39m[90m)[39m[90m;[39m
    [90m// Prints: 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'[39m
    
    [37mprocess[39m[32m.[39m[37menv[39m[32m.[39m[37mPATH[39m[32m.[39m[37msplit[39m[90m([39m[37mpath[39m[32m.[39m[37mdelimiter[39m[90m)[39m[90m;[39m
    [90m// Returns ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\'][39m

[32m[1m## [33mpath.dirname(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90mchanges:[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5348[39m
[90m    description: Passing a non-string as the `path` argument will throw now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string}[0m
    * [0mReturns: {string}[0m

[0mThe [33mpath.dirname()[39m method returns the directory name of a [33mpath[39m, similar to[0m
[0mthe Unix [33mdirname[39m command. Trailing directory separators are ignored, see[0m
[0m[34m[33mpath.sep[39m[34m ([34m[4m#path_path_sep[24m[39m[34m)[39m.[0m

    [37mpath[39m[32m.[39m[37mdirname[39m[90m([39m[92m'/foo/bar/baz/asdf/quux'[39m[90m)[39m[90m;[39m
    [90m// Returns: '/foo/bar/baz/asdf'[39m

[0mA [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m is thrown if [33mpath[39m is not a string.[0m

[32m[1m## [33mpath.extname(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.25[39m
[90mchanges:[39m
[90m  - version: v6.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5348[39m
[90m    description: Passing a non-string as the `path` argument will throw now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string}[0m
    * [0mReturns: {string}[0m

[0mThe [33mpath.extname()[39m method returns the extension of the [33mpath[39m, from the last[0m
[0moccurrence of the [33m.[39m (period) character to end of string in the last portion of[0m
[0mthe [33mpath[39m. If there is no [33m.[39m in the last portion of the [33mpath[39m, or if[0m
[0mthere are no [33m.[39m characters other than the first character of[0m
[0mthe basename of [33mpath[39m (see [33mpath.basename()[39m) , an empty string is returned.[0m

    [37mpath[39m[32m.[39m[37mextname[39m[90m([39m[92m'index.html'[39m[90m)[39m[90m;[39m
    [90m// Returns: '.html'[39m
    
    [37mpath[39m[32m.[39m[37mextname[39m[90m([39m[92m'index.coffee.md'[39m[90m)[39m[90m;[39m
    [90m// Returns: '.md'[39m
    
    [37mpath[39m[32m.[39m[37mextname[39m[90m([39m[92m'index.'[39m[90m)[39m[90m;[39m
    [90m// Returns: '.'[39m
    
    [37mpath[39m[32m.[39m[37mextname[39m[90m([39m[92m'index'[39m[90m)[39m[90m;[39m
    [90m// Returns: ''[39m
    
    [37mpath[39m[32m.[39m[37mextname[39m[90m([39m[92m'.index'[39m[90m)[39m[90m;[39m
    [90m// Returns: ''[39m
    
    [37mpath[39m[32m.[39m[37mextname[39m[90m([39m[92m'.index.md'[39m[90m)[39m[90m;[39m
    [90m// Returns: '.md'[39m

[0mA [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m is thrown if [33mpath[39m is not a string.[0m

[32m[1m## [33mpath.format(pathObject)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpathObject[39m {Object}
        * [0m[0m[33mdir[39m {string}[0m[0m[0m
      [0m
        * [0m[0m[33mroot[39m {string}[0m[0m[0m
      [0m
        * [0m[0m[33mbase[39m {string}[0m[0m[0m
      [0m
        * [0m[0m[33mname[39m {string}[0m[0m[0m
      [0m
        * [0m[0m[33mext[39m {string}[0m[0m[0m
    * [0mReturns: {string}[0m

[0mThe [33mpath.format()[39m method returns a path string from an object. This is the[0m
[0mopposite of [34m[33mpath.parse()[39m[34m ([34m[4m#path_path_parse_path[24m[39m[34m)[39m.[0m

[0mWhen providing properties to the [33mpathObject[39m remember that there are[0m
[0mcombinations where one property has priority over another:[0m

    * [0m[33mpathObject.root[39m is ignored if [33mpathObject.dir[39m is provided[0m
    * [0m[33mpathObject.ext[39m and [33mpathObject.name[39m are ignored if [33mpathObject.base[39m exists[0m

[0mFor example, on POSIX:[0m

    [90m// If `dir`, `root` and `base` are provided,[39m
    [90m// `${dir}${path.sep}${base}`[39m
    [90m// will be returned. `root` is ignored.[39m
    [37mpath[39m[32m.[39m[37mformat[39m[90m([39m[33m{[39m
      [37mroot[39m[93m:[39m [92m'/ignored'[39m[32m,[39m
      [37mdir[39m[93m:[39m [92m'/home/user/dir'[39m[32m,[39m
      [37mbase[39m[93m:[39m [92m'file.txt'[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: '/home/user/dir/file.txt'[39m
    
    [90m// `root` will be used if `dir` is not specified.[39m
    [90m// If only `root` is provided or `dir` is equal to `root` then the[39m
    [90m// platform separator will not be included. `ext` will be ignored.[39m
    [37mpath[39m[32m.[39m[37mformat[39m[90m([39m[33m{[39m
      [37mroot[39m[93m:[39m [92m'/'[39m[32m,[39m
      [37mbase[39m[93m:[39m [92m'file.txt'[39m[32m,[39m
      [37mext[39m[93m:[39m [92m'ignored'[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: '/file.txt'[39m
    
    [90m// `name` + `ext` will be used if `base` is not specified.[39m
    [37mpath[39m[32m.[39m[37mformat[39m[90m([39m[33m{[39m
      [37mroot[39m[93m:[39m [92m'/'[39m[32m,[39m
      [37mname[39m[93m:[39m [92m'file'[39m[32m,[39m
      [37mext[39m[93m:[39m [92m'.txt'[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: '/file.txt'[39m

[0mOn Windows:[0m

    [37mpath[39m[32m.[39m[37mformat[39m[90m([39m[33m{[39m
      [37mdir[39m[93m:[39m [92m'C:\\path\\dir'[39m[32m,[39m
      [37mbase[39m[93m:[39m [92m'file.txt'[39m
    [33m}[39m[90m)[39m[90m;[39m
    [90m// Returns: 'C:\\path\\dir\\file.txt'[39m

[32m[1m## [33mpath.isAbsolute(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string}[0m
    * [0mReturns: {boolean}[0m

[0mThe [33mpath.isAbsolute()[39m method determines if [33mpath[39m is an absolute path.[0m

[0mIf the given [33mpath[39m is a zero-length string, [33mfalse[39m will be returned.[0m

[0mFor example, on POSIX:[0m

    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'/foo/bar'[39m[90m)[39m[90m;[39m [90m// true[39m
    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'/baz/..'[39m[90m)[39m[90m;[39m  [90m// true[39m
    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'qux/'[39m[90m)[39m[90m;[39m     [90m// false[39m
    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'.'[39m[90m)[39m[90m;[39m        [90m// false[39m

[0mOn Windows:[0m

    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'//server'[39m[90m)[39m[90m;[39m    [90m// true[39m
    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'\\\\server'[39m[90m)[39m[90m;[39m  [90m// true[39m
    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'C:/foo/..'[39m[90m)[39m[90m;[39m   [90m// true[39m
    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'C:\\foo\\..'[39m[90m)[39m[90m;[39m [90m// true[39m
    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'bar\\baz'[39m[90m)[39m[90m;[39m    [90m// false[39m
    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'bar/baz'[39m[90m)[39m[90m;[39m     [90m// false[39m
    [37mpath[39m[32m.[39m[37misAbsolute[39m[90m([39m[92m'.'[39m[90m)[39m[90m;[39m           [90m// false[39m

[0mA [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m is thrown if [33mpath[39m is not a string.[0m

[32m[1m## [33mpath.join([...paths])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33m...paths[39m {string} A sequence of path segments[0m
    * [0mReturns: {string}[0m

[0mThe [33mpath.join()[39m method joins all given [33mpath[39m segments together using the[0m
[0mplatform-specific separator as a delimiter, then normalizes the resulting path.[0m

[0mZero-length [33mpath[39m segments are ignored. If the joined path string is a[0m
[0mzero-length string then [33m'.'[39m will be returned, representing the current[0m
[0mworking directory.[0m

    [37mpath[39m[32m.[39m[37mjoin[39m[90m([39m[92m'/foo'[39m[32m,[39m [92m'bar'[39m[32m,[39m [92m'baz/asdf'[39m[32m,[39m [92m'quux'[39m[32m,[39m [92m'..'[39m[90m)[39m[90m;[39m
    [90m// Returns: '/foo/bar/baz/asdf'[39m
    
    [37mpath[39m[32m.[39m[37mjoin[39m[90m([39m[92m'foo'[39m[32m,[39m [33m{[39m[33m}[39m[32m,[39m [92m'bar'[39m[90m)[39m[90m;[39m
    [90m// Throws 'TypeError: Path must be a string. Received {}'[39m

[0mA [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m is thrown if any of the path segments is not a string.[0m

[32m[1m## [33mpath.normalize(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.23[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string}[0m
    * [0mReturns: {string}[0m

[0mThe [33mpath.normalize()[39m method normalizes the given [33mpath[39m, resolving [33m'..'[39m and[0m
[0m[33m'.'[39m segments.[0m

[0mWhen multiple, sequential path segment separation characters are found (e.g.[0m
[0m[33m/[39m on POSIX and either [33m\[39m or [33m/[39m on Windows), they are replaced by a single[0m
[0minstance of the platform-specific path segment separator ([33m/[39m on POSIX and[0m
[0m[33m\[39m on Windows). Trailing separators are preserved.[0m

[0mIf the [33mpath[39m is a zero-length string, [33m'.'[39m is returned, representing the[0m
[0mcurrent working directory.[0m

[0mFor example, on POSIX:[0m

    [37mpath[39m[32m.[39m[37mnormalize[39m[90m([39m[92m'/foo/bar//baz/asdf/quux/..'[39m[90m)[39m[90m;[39m
    [90m// Returns: '/foo/bar/baz/asdf'[39m

[0mOn Windows:[0m

    [37mpath[39m[32m.[39m[37mnormalize[39m[90m([39m[92m'C:\\temp\\\\foo\\bar\\..\\'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'C:\\temp\\foo\\'[39m

[0mSince Windows recognizes multiple path separators, both separators will be[0m
[0mreplaced by instances of the Windows preferred separator ([33m\[39m):[0m

    [37mpath[39m[32m.[39m[37mwin32[39m[32m.[39m[37mnormalize[39m[90m([39m[92m'C:////temp\\\\/\\/\\/foo/bar'[39m[90m)[39m[90m;[39m
    [90m// Returns: 'C:\\temp\\foo\\bar'[39m

[0mA [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m is thrown if [33mpath[39m is not a string.[0m

[32m[1m## [33mpath.parse(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string}[0m
    * [0mReturns: {Object}[0m

[0mThe [33mpath.parse()[39m method returns an object whose properties represent[0m
[0msignificant elements of the [33mpath[39m. Trailing directory separators are ignored,[0m
[0msee [34m[33mpath.sep[39m[34m ([34m[4m#path_path_sep[24m[39m[34m)[39m.[0m

[0mThe returned object will have the following properties:[0m

    * [0m[33mdir[39m {string}[0m
    * [0m[33mroot[39m {string}[0m
    * [0m[33mbase[39m {string}[0m
    * [0m[33mname[39m {string}[0m
    * [0m[33mext[39m {string}[0m

[0mFor example, on POSIX:[0m

    [37mpath[39m[32m.[39m[37mparse[39m[90m([39m[92m'/home/user/dir/file.txt'[39m[90m)[39m[90m;[39m
    [90m// Returns:[39m
    [90m// { root: '/',[39m
    [90m//   dir: '/home/user/dir',[39m
    [90m//   base: 'file.txt',[39m
    [90m//   ext: '.txt',[39m
    [90m//   name: 'file' }[39m

    [33m┌─────────────────────┬────────────┐[39m
    [33m│          dir        │    base    │[39m
    [33m├──────┬              ├──────┬─────┤[39m
    [33m│ root │              │ name │ ext │[39m
    [33m"  /    home/user/dir / file  .txt "[39m
    [33m└──────┴──────────────┴──────┴─────┘[39m
    [33m(All spaces in the "" line should be ignored. They are purely for formatting.)[39m

[0mOn Windows:[0m

    [37mpath[39m[32m.[39m[37mparse[39m[90m([39m[92m'C:\\path\\dir\\file.txt'[39m[90m)[39m[90m;[39m
    [90m// Returns:[39m
    [90m// { root: 'C:\\',[39m
    [90m//   dir: 'C:\\path\\dir',[39m
    [90m//   base: 'file.txt',[39m
    [90m//   ext: '.txt',[39m
    [90m//   name: 'file' }[39m

    [33m┌─────────────────────┬────────────┐[39m
    [33m│          dir        │    base    │[39m
    [33m├──────┬              ├──────┬─────┤[39m
    [33m│ root │              │ name │ ext │[39m
    [33m" C:\      path\dir   \ file  .txt "[39m
    [33m└──────┴──────────────┴──────┴─────┘[39m
    [33m(All spaces in the "" line should be ignored. They are purely for formatting.)[39m

[0mA [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m is thrown if [33mpath[39m is not a string.[0m

[32m[1m## [33mpath.posix[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe [33mpath.posix[39m property provides access to POSIX specific implementations[0m
[0mof the [33mpath[39m methods.[0m

[32m[1m## [33mpath.relative(from, to)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90mchanges:[39m
[90m  - version: v6.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8523[39m
[90m    description: On Windows, the leading slashes for UNC paths are now included[39m
[90m                 in the return value.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfrom[39m {string}[0m
    * [0m[33mto[39m {string}[0m
    * [0mReturns: {string}[0m

[0mThe [33mpath.relative()[39m method returns the relative path from [33mfrom[39m to [33mto[39m based[0m
[0mon the current working directory. If [33mfrom[39m and [33mto[39m each resolve to the same[0m
[0mpath (after calling [33mpath.resolve()[39m on each), a zero-length string is returned.[0m

[0mIf a zero-length string is passed as [33mfrom[39m or [33mto[39m, the current working[0m
[0mdirectory will be used instead of the zero-length strings.[0m

[0mFor example, on POSIX:[0m

    [37mpath[39m[32m.[39m[37mrelative[39m[90m([39m[92m'/data/orandea/test/aaa'[39m[32m,[39m [92m'/data/orandea/impl/bbb'[39m[90m)[39m[90m;[39m
    [90m// Returns: '../../impl/bbb'[39m

[0mOn Windows:[0m

    [37mpath[39m[32m.[39m[37mrelative[39m[90m([39m[92m'C:\\orandea\\test\\aaa'[39m[32m,[39m [92m'C:\\orandea\\impl\\bbb'[39m[90m)[39m[90m;[39m
    [90m// Returns: '..\\..\\impl\\bbb'[39m

[0mA [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m is thrown if either [33mfrom[39m or [33mto[39m is not a string.[0m

[32m[1m## [33mpath.resolve([...paths])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33m...paths[39m {string} A sequence of paths or path segments[0m
    * [0mReturns: {string}[0m

[0mThe [33mpath.resolve()[39m method resolves a sequence of paths or path segments into[0m
[0man absolute path.[0m

[0mThe given sequence of paths is processed from right to left, with each[0m
[0msubsequent [33mpath[39m prepended until an absolute path is constructed.[0m
[0mFor instance, given the sequence of path segments: [33m/foo[39m, [33m/bar[39m, [33mbaz[39m,[0m
[0mcalling [33mpath.resolve('/foo', '/bar', 'baz')[39m would return [33m/bar/baz[39m[0m
[0mbecause [33m'baz'[39m is not an absolute path but [33m'/bar' + '/' + 'baz'[39m is.[0m

[0mIf after processing all given [33mpath[39m segments an absolute path has not yet[0m
[0mbeen generated, the current working directory is used.[0m

[0mThe resulting path is normalized and trailing slashes are removed unless the[0m
[0mpath is resolved to the root directory.[0m

[0mZero-length [33mpath[39m segments are ignored.[0m

[0mIf no [33mpath[39m segments are passed, [33mpath.resolve()[39m will return the absolute path[0m
[0mof the current working directory.[0m

    [37mpath[39m[32m.[39m[37mresolve[39m[90m([39m[92m'/foo/bar'[39m[32m,[39m [92m'./baz'[39m[90m)[39m[90m;[39m
    [90m// Returns: '/foo/bar/baz'[39m
    
    [37mpath[39m[32m.[39m[37mresolve[39m[90m([39m[92m'/foo/bar'[39m[32m,[39m [92m'/tmp/file/'[39m[90m)[39m[90m;[39m
    [90m// Returns: '/tmp/file'[39m
    
    [37mpath[39m[32m.[39m[37mresolve[39m[90m([39m[92m'wwwroot'[39m[32m,[39m [92m'static_files/png/'[39m[32m,[39m [92m'../gif/image.gif'[39m[90m)[39m[90m;[39m
    [90m// If the current working directory is /home/myself/node,[39m
    [90m// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'[39m

[0mA [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m is thrown if any of the arguments is not a string.[0m

[32m[1m## [33mpath.sep[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mProvides the platform-specific path segment separator:[0m

    * [0m[33m\[39m on Windows[0m
    * [0m[33m/[39m on POSIX[0m

[0mFor example, on POSIX:[0m

    [92m'foo/bar/baz'[39m[32m.[39m[37msplit[39m[90m([39m[37mpath[39m[32m.[39m[37msep[39m[90m)[39m[90m;[39m
    [90m// Returns: ['foo', 'bar', 'baz'][39m

[0mOn Windows:[0m

    [92m'foo\\bar\\baz'[39m[32m.[39m[37msplit[39m[90m([39m[37mpath[39m[32m.[39m[37msep[39m[90m)[39m[90m;[39m
    [90m// Returns: ['foo', 'bar', 'baz'][39m

[0mOn Windows, both the forward slash ([33m/[39m) and backward slash ([33m\[39m) are accepted[0m
[0mas path segment separators; however, the [33mpath[39m methods only add backward[0m
[0mslashes ([33m\[39m).[0m

[32m[1m## [33mpath.toNamespacedPath(path)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string}[0m
    * [0mReturns: {string}[0m

[0mOn Windows systems only, returns an equivalent [34mnamespace-prefixed path ([34m[4mhttps://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#namespaces[24m[39m[34m)[39m for[0m
[0mthe given [33mpath[39m. If [33mpath[39m is not a string, [33mpath[39m will be returned without[0m
[0mmodifications.[0m

[0mThis method is meaningful only on Windows system. On POSIX systems, the[0m
[0mmethod is non-operational and always returns [33mpath[39m without modifications.[0m

[32m[1m## [33mpath.win32[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.15[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe [33mpath.win32[39m property provides access to Windows-specific implementations[0m
[0mof the [33mpath[39m methods.[0m

