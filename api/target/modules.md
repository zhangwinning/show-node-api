[35m[4m[1m# Modules[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[90m<!--name=module-->[39m
[90m[39m
[90m[39m[0mIn the Node.js module system, each file is treated as a separate module. For[0m
[0mexample, consider a file named [33mfoo.js[39m:[0m

    [94mconst[39m [37mcircle[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./circle.js'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`The area of a circle of radius 4 is ${[37mcircle[39m[32m.[39m[37marea[39m[90m([39m[34m4[39m[90m)[39m}`[90m)[39m[90m;[39m

[0mOn the first line, [33mfoo.js[39m loads the module [33mcircle.js[39m that is in the same[0m
[0mdirectory as [33mfoo.js[39m.[0m

[0mHere are the contents of [33mcircle.js[39m:[0m

    [94mconst[39m [33m{[39m [37mPI[39m [33m}[39m [93m=[39m [37mMath[39m[90m;[39m
    
    [37mexports[39m[32m.[39m[37marea[39m [93m=[39m [90m([39m[37mr[39m[90m)[39m [93m=>[39m [37mPI[39m [93m*[39m [37mr[39m [93m**[39m [34m2[39m[90m;[39m
    
    [37mexports[39m[32m.[39m[37mcircumference[39m [93m=[39m [90m([39m[37mr[39m[90m)[39m [93m=>[39m [34m2[39m [93m*[39m [37mPI[39m [93m*[39m [37mr[39m[90m;[39m

[0mThe module [33mcircle.js[39m has exported the functions [33marea()[39m and[0m
[0m[33mcircumference()[39m. Functions and objects are added to the root of a module[0m
[0mby specifying additional properties on the special [33mexports[39m object.[0m

[0mVariables local to the module will be private, because the module is wrapped[0m
[0min a function by Node.js (see [34mmodule wrapper ([34m[4m#modules_the_module_wrapper[24m[39m[34m)[39m).[0m
[0mIn this example, the variable [33mPI[39m is private to [33mcircle.js[39m.[0m

[0mThe [33mmodule.exports[39m property can be assigned a new value (such as a function[0m
[0mor object).[0m

[0mBelow, [33mbar.js[39m makes use of the [33msquare[39m module, which exports a Square class:[0m

    [94mconst[39m [37mSquare[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./square.js'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mmySquare[39m [93m=[39m [31mnew[39m [37mSquare[39m[90m([39m[34m2[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`The area of mySquare is ${[37mmySquare[39m[32m.[39m[37marea[39m[90m([39m[90m)[39m}`[90m)[39m[90m;[39m

[0mThe [33msquare[39m module is defined in [33msquare.js[39m:[0m

    [90m// Assigning to exports will not modify module, must use module.exports[39m
    [37mmodule[39m[32m.[39m[37mexports[39m [93m=[39m [94mclass[39m [37mSquare[39m [33m{[39m
      [37mconstructor[39m[90m([39m[37mwidth[39m[90m)[39m [33m{[39m
        [91mthis[39m[32m.[39m[37mwidth[39m [93m=[39m [37mwidth[39m[90m;[39m
      [33m}[39m
    
      [37marea[39m[90m([39m[90m)[39m [33m{[39m
        [31mreturn[39m [91mthis[39m[32m.[39m[37mwidth[39m [93m**[39m [34m2[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m;[39m

[0mThe module system is implemented in the [33mrequire('module')[39m module.[0m

[32m[1m## Accessing the main module[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mWhen a file is run directly from Node.js, [33mrequire.main[39m is set to its[0m
[0m[33mmodule[39m. That means that it is possible to determine whether a file has been[0m
[0mrun directly by testing [33mrequire.main === module[39m.[0m

[0mFor a file [33mfoo.js[39m, this will be [33mtrue[39m if run via [33mnode foo.js[39m, but[0m
[0m[33mfalse[39m if run by [33mrequire('./foo')[39m.[0m

[0mBecause [33mmodule[39m provides a [33mfilename[39m property (normally equivalent to[0m
[0m[33m__filename[39m), the entry point of the current application can be obtained[0m
[0mby checking [33mrequire.main.filename[39m.[0m

[32m[1m## Addenda: Package Manager Tips[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mThe semantics of the Node.js [33mrequire()[39m function were designed to be general[0m
[0menough to support reasonable directory structures. Package manager programs[0m
[0msuch as [33mdpkg[39m, [33mrpm[39m, and [33mnpm[39m will hopefully find it possible to build[0m
[0mnative packages from Node.js modules without modification.[0m

[0mBelow we give a suggested directory structure that could work:[0m

[0mLet's say that we wanted to have the folder at[0m
[0m[33m/usr/lib/node/<some-package>/<some-version>[39m hold the contents of a[0m
[0mspecific version of a package.[0m

[0mPackages can depend on one another. In order to install package [33mfoo[39m, it[0m
[0mmay be necessary to install a specific version of package [33mbar[39m. The [33mbar[39m[0m
[0mpackage may itself have dependencies, and in some cases, these may even collide[0m
[0mor form cyclic dependencies.[0m

[0mSince Node.js looks up the [33mrealpath[39m of any modules it loads (that is,[0m
[0mresolves symlinks), and then looks for their dependencies in the [33mnode_modules[39m[0m
[0mfolders as described [34mhere ([34m[4m#modules_loading_from_node_modules_folders[24m[39m[34m)[39m, this[0m
[0msituation is very simple to resolve with the following architecture:[0m

    * [0m[33m/usr/lib/node/foo/1.2.3/[39m: Contents of the [33mfoo[39m package, version 1.2.3.[0m
    * [0m[33m/usr/lib/node/bar/4.3.2/[39m: Contents of the [33mbar[39m package that [33mfoo[39m depends[0m
      [0mon.[0m
    * [0m[33m/usr/lib/node/foo/1.2.3/node_modules/bar[39m: Symbolic link to[0m
      [0m[33m/usr/lib/node/bar/4.3.2/[39m.[0m
    * [0m[33m/usr/lib/node/bar/4.3.2/node_modules/*[39m: Symbolic links to the packages that[0m
      [0m[33mbar[39m depends on.[0m

[0mThus, even if a cycle is encountered, or if there are dependency[0m
[0mconflicts, every module will be able to get a version of its dependency[0m
[0mthat it can use.[0m

[0mWhen the code in the [33mfoo[39m package does [33mrequire('bar')[39m, it will get the[0m
[0mversion that is symlinked into [33m/usr/lib/node/foo/1.2.3/node_modules/bar[39m.[0m
[0mThen, when the code in the [33mbar[39m package calls [33mrequire('quux')[39m, it'll get[0m
[0mthe version that is symlinked into[0m
[0m[33m/usr/lib/node/bar/4.3.2/node_modules/quux[39m.[0m

[0mFurthermore, to make the module lookup process even more optimal, rather[0m
[0mthan putting packages directly in [33m/usr/lib/node[39m, we could put them in[0m
[0m[33m/usr/lib/node_modules/<name>/<version>[39m. Then Node.js will not bother[0m
[0mlooking for missing dependencies in [33m/usr/node_modules[39m or [33m/node_modules[39m.[0m

[0mIn order to make modules available to the Node.js REPL, it might be useful to[0m
[0malso add the [33m/usr/lib/node_modules[39m folder to the [33m$NODE_PATH[39m environment[0m
[0mvariable. Since the module lookups using [33mnode_modules[39m folders are all[0m
[0mrelative, and based on the real path of the files making the calls to[0m
[0m[33mrequire()[39m, the packages themselves can be anywhere.[0m

[32m[1m## Addenda: The [33m.mjs[39m[32m extension[22m[39m

[0mIt is not possible to [33mrequire()[39m files that have the [33m.mjs[39m extension.[0m
[0mAttempting to do so will throw [34man error ([34m[4merrors.html#errors_err_require_esm[24m[39m[34m)[39m. The [33m.mjs[39m extension is[0m
[0mreserved for [34mECMAScript Modules ([34m[4mesm.html[24m[39m[34m)[39m which cannot be loaded via [33mrequire()[39m.[0m
[0mSee [34mECMAScript Modules ([34m[4mesm.html[24m[39m[34m)[39m for more details.[0m

[32m[1m## All Together...[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mTo get the exact filename that will be loaded when [33mrequire()[39m is called, use[0m
[0mthe [33mrequire.resolve()[39m function.[0m

[0mPutting together all of the above, here is the high-level algorithm[0m
[0min pseudocode of what [33mrequire()[39m does:[0m

    [33mrequire(X) from module at path Y[39m
    [33m1. If X is a core module,[39m
    [33m   a. return the core module[39m
    [33m   b. STOP[39m
    [33m2. If X begins with '/'[39m
    [33m   a. set Y to be the filesystem root[39m
    [33m3. If X begins with './' or '/' or '../'[39m
    [33m   a. LOAD_AS_FILE(Y + X)[39m
    [33m   b. LOAD_AS_DIRECTORY(Y + X)[39m
    [33m   c. THROW "not found"[39m
    [33m4. LOAD_SELF_REFERENCE(X, dirname(Y))[39m
    [33m5. LOAD_NODE_MODULES(X, dirname(Y))[39m
    [33m6. THROW "not found"[39m
    [33m[39m
    [33mLOAD_AS_FILE(X)[39m
    [33m1. If X is a file, load X as its file extension format.  STOP[39m
    [33m2. If X.js is a file, load X.js as JavaScript text.  STOP[39m
    [33m3. If X.json is a file, parse X.json to a JavaScript Object.  STOP[39m
    [33m4. If X.node is a file, load X.node as binary addon.  STOP[39m
    [33m[39m
    [33mLOAD_INDEX(X)[39m
    [33m1. If X/index.js is a file, load X/index.js as JavaScript text.  STOP[39m
    [33m2. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP[39m
    [33m3. If X/index.node is a file, load X/index.node as binary addon.  STOP[39m
    [33m[39m
    [33mLOAD_AS_DIRECTORY(X)[39m
    [33m1. If X/package.json is a file,[39m
    [33m   a. Parse X/package.json, and look for "main" field.[39m
    [33m   b. If "main" is a falsy value, GOTO 2.[39m
    [33m   c. let M = X + (json main field)[39m
    [33m   d. LOAD_AS_FILE(M)[39m
    [33m   e. LOAD_INDEX(M)[39m
    [33m   f. LOAD_INDEX(X) DEPRECATED[39m
    [33m   g. THROW "not found"[39m
    [33m2. LOAD_INDEX(X)[39m
    [33m[39m
    [33mLOAD_NODE_MODULES(X, START)[39m
    [33m1. let DIRS = NODE_MODULES_PATHS(START)[39m
    [33m2. for each DIR in DIRS:[39m
    [33m   a. LOAD_PACKAGE_EXPORTS(DIR, X)[39m
    [33m   b. LOAD_AS_FILE(DIR/X)[39m
    [33m   c. LOAD_AS_DIRECTORY(DIR/X)[39m
    [33m[39m
    [33mNODE_MODULES_PATHS(START)[39m
    [33m1. let PARTS = path split(START)[39m
    [33m2. let I = count of PARTS - 1[39m
    [33m3. let DIRS = [GLOBAL_FOLDERS][39m
    [33m4. while I >= 0,[39m
    [33m   a. if PARTS[I] = "node_modules" CONTINUE[39m
    [33m   b. DIR = path join(PARTS[0 .. I] + "node_modules")[39m
    [33m   c. DIRS = DIRS + DIR[39m
    [33m   d. let I = I - 1[39m
    [33m5. return DIRS[39m
    [33m[39m
    [33mLOAD_SELF_REFERENCE(X, START)[39m
    [33m1. Find the closest package scope to START.[39m
    [33m2. If no scope was found, return.[39m
    [33m3. If the `package.json` has no "exports", return.[39m
    [33m4. If the name in `package.json` isn't a prefix of X, throw "not found".[39m
    [33m5. Otherwise, load the remainder of X relative to this package as if it[39m
    [33m  was loaded via `LOAD_NODE_MODULES` with a name in `package.json`.[39m
    [33m[39m
    [33mLOAD_PACKAGE_EXPORTS(DIR, X)[39m
    [33m1. Try to interpret X as a combination of name and subpath where the name[39m
    [33m   may have a @scope/ prefix and the subpath begins with a slash (`/`).[39m
    [33m2. If X does not match this pattern or DIR/name/package.json is not a file,[39m
    [33m   return.[39m
    [33m3. Parse DIR/name/package.json, and look for "exports" field.[39m
    [33m4. If "exports" is null or undefined, return.[39m
    [33m5. If "exports" is an object with some keys starting with "." and some keys[39m
    [33m  not starting with ".", throw "invalid config".[39m
    [33m6. If "exports" is a string, or object with no keys starting with ".", treat[39m
    [33m  it as having that value as its "." object property.[39m
    [33m7. If subpath is "." and "exports" does not have a "." entry, return.[39m
    [33m8. Find the longest key in "exports" that the subpath starts with.[39m
    [33m9. If no such key can be found, throw "not found".[39m
    [33m10. let RESOLVED =[39m
    [33m    fileURLToPath(PACKAGE_EXPORTS_TARGET_RESOLVE(pathToFileURL(DIR/name),[39m
    [33m    exports[key], subpath.slice(key.length), ["node", "require"])), as defined[39m
    [33m    in the ESM resolver.[39m
    [33m11. If key ends with "/":[39m
    [33m    a. LOAD_AS_FILE(RESOLVED)[39m
    [33m    b. LOAD_AS_DIRECTORY(RESOLVED)[39m
    [33m12. Otherwise[39m
    [33m   a. If RESOLVED is a file, load it as its file extension format.  STOP[39m
    [33m13. Throw "not found"[39m

[32m[1m## Caching[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mModules are cached after the first time they are loaded. This means (among other[0m
[0mthings) that every call to [33mrequire('foo')[39m will get exactly the same object[0m
[0mreturned, if it would resolve to the same file.[0m

[0mProvided [33mrequire.cache[39m is not modified, multiple calls to [33mrequire('foo')[39m[0m
[0mwill not cause the module code to be executed multiple times. This is an[0m
[0mimportant feature. With it, "partially done" objects can be returned, thus[0m
[0mallowing transitive dependencies to be loaded even when they would cause cycles.[0m

[0mTo have a module execute code multiple times, export a function, and call that[0m
[0mfunction.[0m

[32m[1m### Module Caching Caveats[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mModules are cached based on their resolved filename. Since modules may resolve[0m
[0mto a different filename based on the location of the calling module (loading[0m
[0mfrom [33mnode_modules[39m folders), it is not a [3mguarantee[23m that [33mrequire('foo')[39m will[0m
[0malways return the exact same object, if it would resolve to different files.[0m

[0mAdditionally, on case-insensitive file systems or operating systems, different[0m
[0mresolved filenames can point to the same file, but the cache will still treat[0m
[0mthem as different modules and will reload the file multiple times. For example,[0m
[0m[33mrequire('./foo')[39m and [33mrequire('./FOO')[39m return two different objects,[0m
[0mirrespective of whether or not [33m./foo[39m and [33m./FOO[39m are the same file.[0m

[32m[1m## Core Modules[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mNode.js has several modules compiled into the binary. These modules are[0m
[0mdescribed in greater detail elsewhere in this documentation.[0m

[0mThe core modules are defined within the Node.js source and are located in the[0m
[0m[33mlib/[39m folder.[0m

[0mCore modules are always preferentially loaded if their identifier is[0m
[0mpassed to [33mrequire()[39m. For instance, [33mrequire('http')[39m will always[0m
[0mreturn the built in HTTP module, even if there is a file by that name.[0m

[32m[1m## Cycles[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mWhen there are circular [33mrequire()[39m calls, a module might not have finished[0m
[0mexecuting when it is returned.[0m

[0mConsider this situation:[0m

[0m[33ma.js[39m:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'a starting'[39m[90m)[39m[90m;[39m
    [37mexports[39m[32m.[39m[37mdone[39m [93m=[39m [91mfalse[39m[90m;[39m
    [94mconst[39m [37mb[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./b.js'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'in a, b.done = %j'[39m[32m,[39m [37mb[39m[32m.[39m[37mdone[39m[90m)[39m[90m;[39m
    [37mexports[39m[32m.[39m[37mdone[39m [93m=[39m [91mtrue[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'a done'[39m[90m)[39m[90m;[39m

[0m[33mb.js[39m:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'b starting'[39m[90m)[39m[90m;[39m
    [37mexports[39m[32m.[39m[37mdone[39m [93m=[39m [91mfalse[39m[90m;[39m
    [94mconst[39m [37ma[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./a.js'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'in b, a.done = %j'[39m[32m,[39m [37ma[39m[32m.[39m[37mdone[39m[90m)[39m[90m;[39m
    [37mexports[39m[32m.[39m[37mdone[39m [93m=[39m [91mtrue[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'b done'[39m[90m)[39m[90m;[39m

[0m[33mmain.js[39m:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'main starting'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37ma[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./a.js'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mb[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./b.js'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'in main, a.done = %j, b.done = %j'[39m[32m,[39m [37ma[39m[32m.[39m[37mdone[39m[32m,[39m [37mb[39m[32m.[39m[37mdone[39m[90m)[39m[90m;[39m

[0mWhen [33mmain.js[39m loads [33ma.js[39m, then [33ma.js[39m in turn loads [33mb.js[39m. At that[0m
[0mpoint, [33mb.js[39m tries to load [33ma.js[39m. In order to prevent an infinite[0m
[0mloop, an [1munfinished copy[22m of the [33ma.js[39m exports object is returned to the[0m
[0m[33mb.js[39m module. [33mb.js[39m then finishes loading, and its [33mexports[39m object is[0m
[0mprovided to the [33ma.js[39m module.[0m

[0mBy the time [33mmain.js[39m has loaded both modules, they're both finished.[0m
[0mThe output of this program would thus be:[0m

    [33m$ node main.js[39m
    [33mmain starting[39m
    [33ma starting[39m
    [33mb starting[39m
    [33min b, a.done = false[39m
    [33mb done[39m
    [33min a, b.done = true[39m
    [33ma done[39m
    [33min main, a.done = true, b.done = true[39m

[0mCareful planning is required to allow cyclic module dependencies to work[0m
[0mcorrectly within an application.[0m

[32m[1m## File Modules[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mIf the exact filename is not found, then Node.js will attempt to load the[0m
[0mrequired filename with the added extensions: [33m.js[39m, [33m.json[39m, and finally[0m
[0m[33m.node[39m.[0m

[0m[33m.js[39m files are interpreted as JavaScript text files, and [33m.json[39m files are[0m
[0mparsed as JSON text files. [33m.node[39m files are interpreted as compiled addon[0m
[0mmodules loaded with [33mprocess.dlopen()[39m.[0m

[0mA required module prefixed with [33m'/'[39m is an absolute path to the file. For[0m
[0mexample, [33mrequire('/home/marco/foo.js')[39m will load the file at[0m
[0m[33m/home/marco/foo.js[39m.[0m

[0mA required module prefixed with [33m'./'[39m is relative to the file calling[0m
[0m[33mrequire()[39m. That is, [33mcircle.js[39m must be in the same directory as [33mfoo.js[39m for[0m
[0m[33mrequire('./circle')[39m to find it.[0m

[0mWithout a leading [33m'/'[39m, [33m'./'[39m, or [33m'../'[39m to indicate a file, the module must[0m
[0meither be a core module or is loaded from a [33mnode_modules[39m folder.[0m

[0mIf the given path does not exist, [33mrequire()[39m will throw an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m with its[0m
[0m[33mcode[39m property set to [33m'MODULE_NOT_FOUND'[39m.[0m

[32m[1m## Folders as Modules[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mIt is convenient to organize programs and libraries into self-contained[0m
[0mdirectories, and then provide a single entry point to those directories.[0m
[0mThere are three ways in which a folder may be passed to [33mrequire()[39m as[0m
[0man argument.[0m

[0mThe first is to create a [33mpackage.json[39m file in the root of the folder,[0m
[0mwhich specifies a [33mmain[39m module. An example [33mpackage.json[39m file might[0m
[0mlook like this:[0m

    [33m{ "name" : "some-library",[39m
    [33m  "main" : "./lib/some-library.js" }[39m

[0mIf this was in a folder at [33m./some-library[39m, then[0m
[0m[33mrequire('./some-library')[39m would attempt to load[0m
[0m[33m./some-library/lib/some-library.js[39m.[0m

[0mThis is the extent of the awareness of [33mpackage.json[39m files within Node.js.[0m

[0mIf there is no [33mpackage.json[39m file present in the directory, or if the[0m
[0m[33m'main'[39m entry is missing or cannot be resolved, then Node.js[0m
[0mwill attempt to load an [33mindex.js[39m or [33mindex.node[39m file out of that[0m
[0mdirectory. For example, if there was no [33mpackage.json[39m file in the above[0m
[0mexample, then [33mrequire('./some-library')[39m would attempt to load:[0m

    * [0m[33m./some-library/index.js[39m[0m
    * [0m[33m./some-library/index.node[39m[0m

[0mIf these attempts fail, then Node.js will report the entire module as missing[0m
[0mwith the default error:[0m

    [33mError: Cannot find module 'some-library'[39m

[32m[1m## Loading from [33mnode_modules[39m[32m Folders[22m[39m

[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0mIf the module identifier passed to [33mrequire()[39m is not a[0m
[0m[34mcore ([34m[4m#modules_core_modules[24m[39m[34m)[39m module, and does not begin with [33m'/'[39m, [33m'../'[39m, or[0m
[0m[33m'./'[39m, then Node.js starts at the parent directory of the current module, and[0m
[0madds [33m/node_modules[39m, and attempts to load the module from that location.[0m
[0mNode.js will not append [33mnode_modules[39m to a path already ending in[0m
[0m[33mnode_modules[39m.[0m

[0mIf it is not found there, then it moves to the parent directory, and so[0m
[0mon, until the root of the file system is reached.[0m

[0mFor example, if the file at [33m'/home/ry/projects/foo.js'[39m called[0m
[0m[33mrequire('bar.js')[39m, then Node.js would look in the following locations, in[0m
[0mthis order:[0m

    * [0m[33m/home/ry/projects/node_modules/bar.js[39m[0m
    * [0m[33m/home/ry/node_modules/bar.js[39m[0m
    * [0m[33m/home/node_modules/bar.js[39m[0m
    * [0m[33m/node_modules/bar.js[39m[0m

[0mThis allows programs to localize their dependencies, so that they do not[0m
[0mclash.[0m

[0mIt is possible to require specific files or sub modules distributed with a[0m
[0mmodule by including a path suffix after the module name. For instance[0m
[0m[33mrequire('example-module/path/to/file')[39m would resolve [33mpath/to/file[39m[0m
[0mrelative to where [33mexample-module[39m is located. The suffixed path follows the[0m
[0msame module resolution semantics.[0m

[32m[1m## Loading from the global folders[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mIf the [33mNODE_PATH[39m environment variable is set to a colon-delimited list[0m
[0mof absolute paths, then Node.js will search those paths for modules if they[0m
[0mare not found elsewhere.[0m

[0mOn Windows, [33mNODE_PATH[39m is delimited by semicolons ([33m;[39m) instead of colons.[0m

[0m[33mNODE_PATH[39m was originally created to support loading modules from[0m
[0mvarying paths before the current [34mmodule resolution ([34m[4m#modules_all_together[24m[39m[34m)[39m algorithm was defined.[0m

[0m[33mNODE_PATH[39m is still supported, but is less necessary now that the Node.js[0m
[0mecosystem has settled on a convention for locating dependent modules.[0m
[0mSometimes deployments that rely on [33mNODE_PATH[39m show surprising behavior[0m
[0mwhen people are unaware that [33mNODE_PATH[39m must be set. Sometimes a[0m
[0mmodule's dependencies change, causing a different version (or even a[0m
[0mdifferent module) to be loaded as the [33mNODE_PATH[39m is searched.[0m

[0mAdditionally, Node.js will search in the following list of GLOBAL_FOLDERS:[0m

    * [0m1: [33m$HOME/.node_modules[39m[0m
    * [0m2: [33m$HOME/.node_libraries[39m[0m
    * [0m3: [33m$PREFIX/lib/node[39m[0m

[0mWhere [33m$HOME[39m is the user's home directory, and [33m$PREFIX[39m is the Node.js[0m
[0mconfigured [33mnode_prefix[39m.[0m

[0mThese are mostly for historic reasons.[0m

[0mIt is strongly encouraged to place dependencies in the local [33mnode_modules[39m[0m
[0mfolder. These will be loaded faster, and more reliably.[0m

[32m[1m## The module wrapper[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mBefore a module's code is executed, Node.js will wrap it with a function[0m
[0mwrapper that looks like the following:[0m

    [90m([39m[94mfunction[39m[90m([39m[37mexports[39m[32m,[39m [37mrequire[39m[32m,[39m [37mmodule[39m[32m,[39m [37m__filename[39m[32m,[39m [37m__dirname[39m[90m)[39m [33m{[39m
    [90m// Module code actually lives in here[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mBy doing this, Node.js achieves a few things:[0m

    * [0mIt keeps top-level variables (defined with [33mvar[39m, [33mconst[39m or [33mlet[39m) scoped to[0m
      [0mthe module rather than the global object.[0m
    * [0mIt helps to provide some global-looking variables that are actually specific[0m
      [0mto the module, such as:
        * [0m[0mThe [33mmodule[39m and [33mexports[39m objects that the implementor can use to export[0m[0m[0m
      [0m      [0m[0mvalues from the module.[0m[0m[0m
      [0m
        * [0m[0mThe convenience variables [33m__filename[39m and [33m__dirname[39m, containing the[0m[0m[0m
      [0m      [0m[0mmodule's absolute filename and directory path.[0m[0m[0m

[32m[1m## The module scope[22m[39m

[32m[1m### [33m__dirname[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.27[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=var -->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe directory name of the current module. This is the same as the[0m
[0m[34m[33mpath.dirname()[39m[34m ([34m[4mpath.html#path_path_dirname_path[24m[39m[34m)[39m of the [34m[33m__filename[39m[34m ([34m[4m#modules_filename[24m[39m[34m)[39m.[0m

[0mExample: running [33mnode example.js[39m from [33m/Users/mjr[39m[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37m__dirname[39m[90m)[39m[90m;[39m
    [90m// Prints: /Users/mjr[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mpath[39m[32m.[39m[37mdirname[39m[90m([39m[37m__filename[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: /Users/mjr[39m

[32m[1m### [33m__filename[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.0.1[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=var -->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe file name of the current module. This is the current module file's absolute[0m
[0mpath with symlinks resolved.[0m

[0mFor a main program this is not necessarily the same as the file name used in the[0m
[0mcommand line.[0m

[0mSee [34m[33m__dirname[39m[34m ([34m[4m#modules_dirname[24m[39m[34m)[39m for the directory name of the current module.[0m

[0mExamples:[0m

[0mRunning [33mnode example.js[39m from [33m/Users/mjr[39m[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37m__filename[39m[90m)[39m[90m;[39m
    [90m// Prints: /Users/mjr/example.js[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37m__dirname[39m[90m)[39m[90m;[39m
    [90m// Prints: /Users/mjr[39m

[0mGiven two modules: [33ma[39m and [33mb[39m, where [33mb[39m is a dependency of[0m
[0m[33ma[39m and there is a directory structure of:[0m

    * [0m[33m/Users/mjr/app/a.js[39m[0m
    * [0m[33m/Users/mjr/app/node_modules/b/b.js[39m[0m

[0mReferences to [33m__filename[39m within [33mb.js[39m will return[0m
[0m[33m/Users/mjr/app/node_modules/b/b.js[39m while references to [33m__filename[39m within[0m
[0m[33ma.js[39m will return [33m/Users/mjr/app/a.js[39m.[0m

[32m[1m### [33mexports[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.12[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=var -->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mA reference to the [33mmodule.exports[39m that is shorter to type.[0m
[0mSee the section about the [34mexports shortcut ([34m[4m#modules_exports_shortcut[24m[39m[34m)[39m for details on when to use[0m
[0m[33mexports[39m and when to use [33mmodule.exports[39m.[0m

[32m[1m### [33mmodule[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=var -->[39m
[90m[39m
[90m[39m    * [0m{module}[0m

[0mA reference to the current module, see the section about the[0m
[0m[34m[33mmodule[39m[34m object ([34m[4m#modules_the_module_object[24m[39m[34m)[39m. In particular, [33mmodule.exports[39m is used for defining what[0m
[0ma module exports and makes available through [33mrequire()[39m.[0m

[32m[1m### [33mrequire(id)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.13[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=var -->[39m
[90m[39m
[90m[39m    * [0m[33mid[39m {string} module name or path[0m
    * [0mReturns: {any} exported module content[0m

[0mUsed to import modules, [33mJSON[39m, and local files. Modules can be imported[0m
[0mfrom [33mnode_modules[39m. Local modules and JSON files can be imported using[0m
[0ma relative path (e.g. [33m./[39m, [33m./foo[39m, [33m./bar/baz[39m, [33m../foo[39m) that will be[0m
[0mresolved against the directory named by [34m[33m__dirname[39m[34m ([34m[4m#modules_dirname[24m[39m[34m)[39m (if defined) or[0m
[0mthe current working directory. The relative paths of POSIX style are resolved[0m
[0min an OS independent fashion, meaning that the examples above will work on[0m
[0mWindows in the same way they would on Unix systems.[0m

    [90m// Importing a local module with a path relative to the `__dirname` or current[39m
    [90m// working directory. (On Windows, this would resolve to .\path\myLocalModule.)[39m
    [94mconst[39m [37mmyLocalModule[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./path/myLocalModule'[39m[90m)[39m[90m;[39m
    
    [90m// Importing a JSON file:[39m
    [94mconst[39m [37mjsonData[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./path/filename.json'[39m[90m)[39m[90m;[39m
    
    [90m// Importing a module from node_modules or Node.js built-in module:[39m
    [94mconst[39m [37mcrypto[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/crypto'[39m[90m)[39m[90m;[39m

[32m[1m#### [33mrequire.cache[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mModules are cached in this object when they are required. By deleting a key[0m
[0mvalue from this object, the next [33mrequire[39m will reload the module.[0m
[0mThis does not apply to [34mnative addons ([34m[4maddons.html[24m[39m[34m)[39m, for which reloading will result in an[0m
[0merror.[0m

[0mAdding or replacing entries is also possible. This cache is checked before[0m
[0mnative modules and if a name matching a native module is added to the cache,[0m
[0mno require call is[0m
[0mgoing to receive the native module anymore. Use with care![0m

[32m[1m#### [33mrequire.extensions[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90mdeprecated: v0.10.6[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated[0m[23m[39m

    * [0m{Object}[0m

[0mInstruct [33mrequire[39m on how to handle certain file extensions.[0m

[0mProcess files with the extension [33m.sjs[39m as [33m.js[39m:[0m

    [37mrequire[39m[32m.[39m[37mextensions[39m[33m[[39m[92m'.sjs'[39m[33m][39m [93m=[39m [37mrequire[39m[32m.[39m[37mextensions[39m[33m[[39m[92m'.js'[39m[33m][39m[90m;[39m

[0m[1mDeprecated.[22m In the past, this list has been used to load non-JavaScript[0m
[0mmodules into Node.js by compiling them on-demand. However, in practice, there[0m
[0mare much better ways to do this, such as loading modules via some other Node.js[0m
[0mprogram, or compiling them to JavaScript ahead of time.[0m

[0mAvoid using [33mrequire.extensions[39m. Use could cause subtle bugs and resolving the[0m
[0mextensions gets slower with each registered extension.[0m

[32m[1m#### [33mrequire.main[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.17[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{module}[0m

[0mThe [33mModule[39m object representing the entry script loaded when the Node.js[0m
[0mprocess launched.[0m
[0mSee [34m"Accessing the main module" ([34m[4m#modules_accessing_the_main_module[24m[39m[34m)[39m.[0m

[0mIn [33mentry.js[39m script:[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mrequire[39m[32m.[39m[37mmain[39m[90m)[39m[90m;[39m

    [33mnode entry.js[39m

[90m<!-- eslint-skip -->[39m
[90m[39m    [37mModule[39m [33m{[39m
      [37mid[39m[93m:[39m [92m'.'[39m[32m,[39m
      [37mexports[39m[93m:[39m [33m{[39m[33m}[39m[32m,[39m
      [37mparent[39m[93m:[39m [90mnull[39m[32m,[39m
      [37mfilename[39m[93m:[39m [92m'/absolute/path/to/entry.js'[39m[32m,[39m
      [37mloaded[39m[93m:[39m [91mfalse[39m[32m,[39m
      [37mchildren[39m[93m:[39m [33m[[39m[33m][39m[32m,[39m
      [37mpaths[39m[93m:[39m
       [33m[[39m [92m'/absolute/path/to/node_modules'[39m[32m,[39m
         [92m'/absolute/path/node_modules'[39m[32m,[39m
         [92m'/absolute/node_modules'[39m[32m,[39m
         [92m'/node_modules'[39m [33m][39m [33m}[39m

[32m[1m#### [33mrequire.resolve(request[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.0[39m
[90mchanges:[39m
[90m  - version: v8.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16397[39m
[90m    description: The `paths` option is now supported.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {string} The module path to resolve.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mpaths[39m {string[]} Paths to resolve module location from. If present, these[0m[0m[0m
      [0m      [0m[0mpaths are used instead of the default resolution paths, with the exception[0m[0m[0m
      [0m      [0m[0mof [34mGLOBAL_FOLDERS ([34m[4m#modules_loading_from_the_global_folders[24m[39m[34m)[39m like [33m$HOME/.node_modules[39m, which are always[0m[0m[0m
      [0m      [0m[0mincluded. Each of these paths is used as a starting point for[0m[0m[0m
      [0m      [0m[0mthe module resolution algorithm, meaning that the [33mnode_modules[39m hierarchy[0m[0m[0m
      [0m      [0m[0mis checked from this location.[0m[0m[0m
    * [0mReturns: {string}[0m

[0mUse the internal [33mrequire()[39m machinery to look up the location of a module,[0m
[0mbut rather than loading the module, just return the resolved filename.[0m

[0mIf the module can not be found, a [33mMODULE_NOT_FOUND[39m error is thrown.[0m

[32m[1m##### [33mrequire.resolve.paths(request)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mrequest[39m {string} The module path whose lookup paths are being retrieved.[0m
    * [0mReturns: {string[]|null}[0m

[0mReturns an array containing the paths searched during resolution of [33mrequest[39m or[0m
[0m[33mnull[39m if the [33mrequest[39m string references a core module, for example [33mhttp[39m or[0m
[0m[33mfs[39m.[0m

[32m[1m## The [33mmodule[39m[32m Object[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m[90m<!-- type=var -->[39m
[90m[39m[90m<!-- name=module -->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mIn each module, the [33mmodule[39m free variable is a reference to the object[0m
[0mrepresenting the current module. For convenience, [33mmodule.exports[39m is[0m
[0malso accessible via the [33mexports[39m module-global. [33mmodule[39m is not actually[0m
[0ma global but rather local to each module.[0m

[32m[1m### [33mmodule.children[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{module[]}[0m

[0mThe module objects required for the first time by this one.[0m

[32m[1m### [33mmodule.exports[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mThe [33mmodule.exports[39m object is created by the [33mModule[39m system. Sometimes this is[0m
[0mnot acceptable; many want their module to be an instance of some class. To do[0m
[0mthis, assign the desired export object to [33mmodule.exports[39m. Assigning[0m
[0mthe desired object to [33mexports[39m will simply rebind the local [33mexports[39m variable,[0m
[0mwhich is probably not what is desired.[0m

[0mFor example, suppose we were making a module called [33ma.js[39m:[0m

    [94mconst[39m [37mEventEmitter[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/events'[39m[90m)[39m[90m;[39m
    
    [37mmodule[39m[32m.[39m[37mexports[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m// Do some work, and after some time emit[39m
    [90m// the 'ready' event from the module itself.[39m
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mmodule[39m[32m.[39m[37mexports[39m[32m.[39m[37memit[39m[90m([39m[92m'ready'[39m[90m)[39m[90m;[39m
    [33m}[39m[32m,[39m [34m1000[39m[90m)[39m[90m;[39m

[0mThen in another file we could do:[0m

    [94mconst[39m [37ma[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./a'[39m[90m)[39m[90m;[39m
    [37ma[39m[32m.[39m[37mon[39m[90m([39m[92m'ready'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'module "a" is ready'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mAssignment to [33mmodule.exports[39m must be done immediately. It cannot be[0m
[0mdone in any callbacks. This does not work:[0m

[0m[33mx.js[39m:[0m

    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mmodule[39m[32m.[39m[37mexports[39m [93m=[39m [33m{[39m [37ma[39m[93m:[39m [92m'hello'[39m [33m}[39m[90m;[39m
    [33m}[39m[32m,[39m [34m0[39m[90m)[39m[90m;[39m

[0m[33my.js[39m:[0m

    [94mconst[39m [37mx[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./x'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mx[39m[32m.[39m[37ma[39m[90m)[39m[90m;[39m

[32m[1m#### [33mexports[39m[32m shortcut[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mexports[39m variable is available within a module's file-level scope, and is[0m
[0massigned the value of [33mmodule.exports[39m before the module is evaluated.[0m

[0mIt allows a shortcut, so that [33mmodule.exports.f = ...[39m can be written more[0m
[0msuccinctly as [33mexports.f = ...[39m. However, be aware that like any variable, if a[0m
[0mnew value is assigned to [33mexports[39m, it is no longer bound to [33mmodule.exports[39m:[0m

    [37mmodule[39m[32m.[39m[37mexports[39m[32m.[39m[37mhello[39m [93m=[39m [91mtrue[39m[90m;[39m [90m// Exported from require of module[39m
    [37mexports[39m [93m=[39m [33m{[39m [37mhello[39m[93m:[39m [91mfalse[39m [33m}[39m[90m;[39m  [90m// Not exported, only available in the module[39m

[0mWhen the [33mmodule.exports[39m property is being completely replaced by a new[0m
[0mobject, it is common to also reassign [33mexports[39m:[0m

[90m<!-- eslint-disable func-name-matching -->[39m
[90m[39m    [37mmodule[39m[32m.[39m[37mexports[39m [93m=[39m [37mexports[39m [93m=[39m [94mfunction[39m [37mConstructor[39m[90m([39m[90m)[39m [33m{[39m
      [90m// ... etc.[39m
    [33m}[39m[90m;[39m

[0mTo illustrate the behavior, imagine this hypothetical implementation of[0m
[0m[33mrequire()[39m, which is quite similar to what is actually done by [33mrequire()[39m:[0m

    [94mfunction[39m [37mrequire[39m[90m([39m[90m/* ... */[39m[90m)[39m [33m{[39m
      [94mconst[39m [37mmodule[39m [93m=[39m [33m{[39m [37mexports[39m[93m:[39m [33m{[39m[33m}[39m [33m}[39m[90m;[39m
      [90m([39m[90m([39m[37mmodule[39m[32m,[39m [37mexports[39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// Module code here. In this example, define a function.[39m
        [94mfunction[39m [37msomeFunc[39m[90m([39m[90m)[39m [33m{[39m[33m}[39m
        [37mexports[39m [93m=[39m [37msomeFunc[39m[90m;[39m
        [90m// At this point, exports is no longer a shortcut to module.exports, and[39m
        [90m// this module will still export an empty default object.[39m
        [37mmodule[39m[32m.[39m[37mexports[39m [93m=[39m [37msomeFunc[39m[90m;[39m
        [90m// At this point, the module will now export someFunc, instead of the[39m
        [90m// default object.[39m
      [33m}[39m[90m)[39m[90m([39m[37mmodule[39m[32m,[39m [37mmodule[39m[32m.[39m[37mexports[39m[90m)[39m[90m;[39m
      [31mreturn[39m [37mmodule[39m[32m.[39m[37mexports[39m[90m;[39m
    [33m}[39m

[32m[1m### [33mmodule.filename[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe fully resolved filename of the module.[0m

[32m[1m### [33mmodule.id[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mThe identifier for the module. Typically this is the fully resolved[0m
[0mfilename.[0m

[32m[1m### [33mmodule.loaded[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean}[0m

[0mWhether or not the module is done loading, or is in the process of[0m
[0mloading.[0m

[32m[1m### [33mmodule.parent[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.16[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{module}[0m

[0mThe module that first required this one.[0m

[32m[1m### [33mmodule.paths[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]}[0m

[0mThe search paths for the module.[0m

[32m[1m### [33mmodule.require(id)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.1[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mid[39m {string}[0m
    * [0mReturns: {any} exported module content[0m

[0mThe [33mmodule.require()[39m method provides a way to load a module as if[0m
[0m[33mrequire()[39m was called from the original module.[0m

[0mIn order to do this, it is necessary to get a reference to the [33mmodule[39m object.[0m
[0mSince [33mrequire()[39m returns the [33mmodule.exports[39m, and the [33mmodule[39m is typically[0m
[0m[3monly[23m available within a specific module's code, it must be explicitly exported[0m
[0min order to be used.[0m

[32m[1m## The [33mModule[39m[32m Object[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object}[0m

[0mProvides general utility methods when interacting with instances of[0m
[0m[33mModule[39m, the [33mmodule[39m variable often seen in file modules. Accessed[0m
[0mvia [33mrequire('module')[39m.[0m

[32m[1m### [33mmodule.builtinModules[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v9.3.0[39m
[90m  - v8.10.0[39m
[90m  - v6.13.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]}[0m

[0mA list of the names of all modules provided by Node.js. Can be used to verify[0m
[0mif a module is maintained by a third party or not.[0m

[0m[33mmodule[39m in this context isn't the same object that's provided[0m
[0mby the [34mmodule wrapper ([34m[4m#modules_the_module_wrapper[24m[39m[34m)[39m. To access it, require the [33mModule[39m module:[0m

    [94mconst[39m [37mbuiltin[39m [93m=[39m [37mrequire[39m[90m([39m[92m'module'[39m[90m)[39m[32m.[39m[37mbuiltinModules[39m[90m;[39m

[32m[1m### [33mmodule.createRequire(filename)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfilename[39m {string|URL} Filename to be used to construct the require[0m
      [0mfunction. Must be a file URL object, file URL string, or absolute path[0m
      [0mstring.[0m
    * [0mReturns: {require} Require function[0m

    [94mimport[39m [33m{[39m [37mcreateRequire[39m [33m}[39m [37mfrom[39m [92m'module'[39m[90m;[39m
    [94mconst[39m [37mrequire[39m [93m=[39m [37mcreateRequire[39m[90m([39m[94mimport[39m[32m.[39m[37mmeta[39m[32m.[39m[37murl[39m[90m)[39m[90m;[39m
    
    [90m// sibling-module.js is a CommonJS module.[39m
    [94mconst[39m [37msiblingModule[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./sibling-module'[39m[90m)[39m[90m;[39m

[32m[1m### [33mmodule.createRequireFromPath(filename)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.12.0[39m
[90mdeprecated: v12.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Please use [34m[33mcreateRequire()[39m[90m[34m ([34m[4m#modules_module_createrequire_filename[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m[33mfilename[39m {string} Filename to be used to construct the relative require[0m
      [0mfunction.[0m
    * [0mReturns: {require} Require function[0m

    [94mconst[39m [33m{[39m [37mcreateRequireFromPath[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'module'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mrequireUtil[39m [93m=[39m [37mcreateRequireFromPath[39m[90m([39m[92m'../src/utils/'[39m[90m)[39m[90m;[39m
    
    [90m// Require `../src/utils/some-tool`[39m
    [37mrequireUtil[39m[90m([39m[92m'./some-tool'[39m[90m)[39m[90m;[39m

[32m[1m### [33mmodule.syncBuiltinESMExports()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.12.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mmodule.syncBuiltinESMExports()[39m method updates all the live bindings for[0m
[0mbuiltin ES Modules to match the properties of the CommonJS exports. It does[0m
[0mnot add or remove exported names from the ES Modules.[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37msyncBuiltinESMExports[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'module'[39m[90m)[39m[90m;[39m
    
    [37mfs[39m[32m.[39m[37mreadFile[39m [93m=[39m [90mnull[39m[90m;[39m
    
    [31mdelete[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m;[39m
    
    [37mfs[39m[32m.[39m[37mnewAPI[39m [93m=[39m [94mfunction[39m [37mnewAPI[39m[90m([39m[90m)[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m[90m;[39m
    
    [37msyncBuiltinESMExports[39m[90m([39m[90m)[39m[90m;[39m
    
    [94mimport[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[37mesmFS[39m[90m)[39m [93m=>[39m [33m{[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37mesmFS[39m[32m.[39m[37mreadFile[39m[32m,[39m [90mnull[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[92m'readFileSync'[39m [94min[39m [37mfs[39m[32m,[39m [91mtrue[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37mesmFS[39m[32m.[39m[37mnewAPI[39m[32m,[39m [90mundefined[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## Source Map V3 Support[22m[39m

[90m<!-- YAML[39m
[90madded: v13.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mHelpers for for interacting with the source map cache. This cache is[0m
[0mpopulated when source map parsing is enabled and[0m
[0m[34msource map include directives ([34m[4mhttps://sourcemaps.info/spec.html#h.lmz475t4mvbx[24m[39m[34m)[39m are found in a modules' footer.[0m

[0mTo enable source map parsing, Node.js must be run with the flag[0m
[0m[34m[33m--enable-source-maps[39m[34m ([34m[4mcli.html#cli_enable_source_maps[24m[39m[34m)[39m, or with code coverage enabled by setting[0m
[0m[34m[33mNODE_V8_COVERAGE=dir[39m[34m ([34m[4mcli.html#cli_node_v8_coverage_dir[24m[39m[34m)[39m.[0m

    [94mconst[39m [33m{[39m [37mfindSourceMap[39m[32m,[39m [37mSourceMap[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'module'[39m[90m)[39m[90m;[39m

[32m[1m### [33mmodule.findSourceMap(path[, error])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string}[0m
    * [0m[33merror[39m {Error}[0m
    * [0mReturns: {module.SourceMap}[0m

[0m[33mpath[39m is the resolved path for the file for which a corresponding source map[0m
[0mshould be fetched.[0m

[0mThe [33merror[39m instance should be passed as the second parameter to [33mfindSourceMap[39m[0m
[0min exceptional flows, e.g., when an overridden[0m
[0m[34m[33mError.prepareStackTrace(error, trace)[39m[34m ([34m[4mhttps://v8.dev/docs/stack-trace-api#customizing-stack-traces[24m[39m[34m)[39m is invoked. Modules are not added to[0m
[0mthe module cache until they are successfully loaded, in these cases source maps[0m
[0mwill be associated with the [33merror[39m instance along with the [33mpath[39m.[0m

[32m[1m### Class: [33mmodule.SourceMap[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m[32m[1m#### [33mnew SourceMap(payload)[39m[32m[22m[39m

    * [0m[33mpayload[39m {Object}[0m

[0mCreates a new [33msourceMap[39m instance.[0m

[0m[33mpayload[39m is an object with keys matching the [34mSource Map V3 format ([34m[4mhttps://sourcemaps.info/spec.html#h.mofvlxcwqzej[24m[39m[34m)[39m:[0m

    * [0m[33mfile[39m: {string}[0m
    * [0m[33mversion[39m: {number}[0m
    * [0m[33msources[39m: {string[]}[0m
    * [0m[33msourcesContent[39m: {string[]}[0m
    * [0m[33mnames[39m: {string[]}[0m
    * [0m[33mmappings[39m: {string}[0m
    * [0m[33msourceRoot[39m: {string}[0m

[32m[1m#### [33msourceMap.payload[39m[32m[22m[39m

    * [0mReturns: {Object}[0m

[0mGetter for the payload used to construct the [34m[33mSourceMap[39m[34m ([34m[4mmodules.html#modules_class_module_sourcemap[24m[39m[34m)[39m instance.[0m

[32m[1m#### [33msourceMap.findEntry(lineNumber, columnNumber)[39m[32m[22m[39m

    * [0m[33mlineNumber[39m {number}[0m
    * [0m[33mcolumnNumber[39m {number}[0m
    * [0mReturns: {Object}[0m

[0mGiven a line number and column number in the generated source file, returns[0m
[0man object representing the position in the original file. The object returned[0m
[0mconsists of the following keys:[0m

    * [0mgeneratedLine: {number}[0m
    * [0mgeneratedColumn: {number}[0m
    * [0moriginalSource: {string}[0m
    * [0moriginalLine: {number}[0m
    * [0moriginalColumn: {number}[0m

