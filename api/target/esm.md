[35m[4m[1m# ECMAScript Modules[22m[24m[39m

[90m<!--introduced_in=v8.5.0-->[39m
[90m[39m[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[32m[1m## Introduction[22m[39m

[90m<!--name=esm-->[39m
[90m[39m
[90m[39m[0mECMAScript modules are [34mthe official standard format ([34m[4mhttps://tc39.github.io/ecma262/#sec-modules[24m[39m[34m)[39m to package JavaScript[0m
[0mcode for reuse. Modules are defined using a variety of [34m[33mimport[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import[24m[39m[34m)[39m and[0m
[0m[34m[33mexport[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export[24m[39m[34m)[39m statements.[0m

[0mNode.js fully supports ECMAScript modules as they are currently specified and[0m
[0mprovides limited interoperability between them and the existing module format,[0m
[0m[34mCommonJS ([34m[4mmodules.html[24m[39m[34m)[39m.[0m

[0mNode.js contains support for ES Modules based upon the[0m
[0m[34mNode.js EP for ES Modules ([34m[4mhttps://github.com/nodejs/node-eps/blob/master/002-es-modules.md[24m[39m[34m)[39m and the [34mECMAScript-modules implementation ([34m[4mhttps://github.com/nodejs/modules/blob/master/doc/plan-for-new-modules-implementation.md[24m[39m[34m)[39m.[0m

[0mExpect major changes in the implementation including interoperability support,[0m
[0mspecifier resolution, and default behavior.[0m

[32m[1m## Enabling[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mExperimental support for ECMAScript modules is enabled by default.[0m
[0mNode.js will treat the following as ES modules when passed to [33mnode[39m as the[0m
[0minitial input, or when referenced by [33mimport[39m statements within ES module code:[0m

    * [0m[0m[0mFiles ending in [33m.mjs[39m.[0m[0m[0m
    * [0m[0m[0mFiles ending in [33m.js[39m when the nearest parent [33mpackage.json[39m file contains a[0m[0m[0m
      [0m[0m[0mtop-level field [33m"type"[39m with a value of [33m"module"[39m.[0m[0m[0m
    * [0m[0m[0mStrings passed in as an argument to [33m--eval[39m or [33m--print[39m, or piped to[0m[0m[0m
      [0m[0m[0m[33mnode[39m via [33mSTDIN[39m, with the flag [33m--input-type=module[39m.[0m[0m[0m

[0mNode.js will treat as CommonJS all other forms of input, such as [33m.js[39m files[0m
[0mwhere the nearest parent [33mpackage.json[39m file contains no top-level [33m"type"[39m[0m
[0mfield, or string input without the flag [33m--input-type[39m. This behavior is to[0m
[0mpreserve backward compatibility. However, now that Node.js supports both[0m
[0mCommonJS and ES modules, it is best to be explicit whenever possible. Node.js[0m
[0mwill treat the following as CommonJS when passed to [33mnode[39m as the initial input,[0m
[0mor when referenced by [33mimport[39m statements within ES module code:[0m

    * [0m[0m[0mFiles ending in [33m.cjs[39m.[0m[0m[0m
    * [0m[0m[0mFiles ending in [33m.js[39m when the nearest parent [33mpackage.json[39m file contains a[0m[0m[0m
      [0m[0m[0mtop-level field [33m"type"[39m with a value of [33m"commonjs"[39m.[0m[0m[0m
    * [0m[0m[0mStrings passed in as an argument to [33m--eval[39m or [33m--print[39m, or piped to[0m[0m[0m
      [0m[0m[0m[33mnode[39m via [33mSTDIN[39m, with the flag [33m--input-type=commonjs[39m.[0m[0m[0m

[32m[1m### [33mpackage.json[39m[32m [33m"type"[39m[32m field[22m[39m

[0mFiles ending with [33m.js[39m will be loaded as ES modules when the nearest parent[0m
[0m[33mpackage.json[39m file contains a top-level field [33m"type"[39m with a value of[0m
[0m[33m"module"[39m.[0m

[0mThe nearest parent [33mpackage.json[39m is defined as the first [33mpackage.json[39m found[0m
[0mwhen searching in the current folder, that folder’s parent, and so on up[0m
[0muntil the root of the volume is reached.[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [90m// package.json[39m
    [33m{[39m
      [32m"type"[39m[93m:[39m [92m"module"[39m
    [33m}[39m

    [33m# In same folder as above package.json[39m
    [33mnode my-app.js # Runs as ES module[39m

[0mIf the nearest parent [33mpackage.json[39m lacks a [33m"type"[39m field, or contains[0m
[0m[33m"type": "commonjs"[39m, [33m.js[39m files are treated as CommonJS. If the volume root is[0m
[0mreached and no [33mpackage.json[39m is found, Node.js defers to the default, a[0m
[0m[33mpackage.json[39m with no [33m"type"[39m field.[0m

[0m[33mimport[39m statements of [33m.js[39m files are treated as ES modules if the nearest[0m
[0mparent [33mpackage.json[39m contains [33m"type": "module"[39m.[0m

    [90m// my-app.js, part of the same example as above[39m
    [94mimport[39m [92m'./startup.js'[39m[90m;[39m [90m// Loaded as ES module because of package.json[39m

[0mPackage authors should include the [33m"type"[39m field, even in packages where all[0m
[0msources are CommonJS. Being explicit about the [33mtype[39m of the package will[0m
[0mfuture-proof the package in case the default type of Node.js ever changes, and[0m
[0mit will also make things easier for build tools and loaders to determine how the[0m
[0mfiles in the package should be interpreted.[0m

[0mRegardless of the value of the [33m"type"[39m field, [33m.mjs[39m files are always treated[0m
[0mas ES modules and [33m.cjs[39m files are always treated as CommonJS.[0m

[32m[1m### Package Scope and File Extensions[22m[39m

[0mA folder containing a [33mpackage.json[39m file, and all subfolders below that folder[0m
[0mdown until the next folder containing another [33mpackage.json[39m, is considered a[0m
[0m[3mpackage scope[23m. The [33m"type"[39m field defines how [33m.js[39m files should be treated[0m
[0mwithin a particular [33mpackage.json[39m file’s package scope. Every package in a[0m
[0mproject’s [33mnode_modules[39m folder contains its own [33mpackage.json[39m file, so each[0m
[0mproject’s dependencies have their own package scopes. A [33mpackage.json[39m lacking a[0m
[0m[33m"type"[39m field is treated as if it contained [33m"type": "commonjs"[39m.[0m

[0mThe package scope applies not only to initial entry points ([33mnode my-app.js[39m)[0m
[0mbut also to files referenced by [33mimport[39m statements and [33mimport()[39m expressions.[0m

    [90m// my-app.js, in an ES module package scope because there is a package.json[39m
    [90m// file in the same folder with "type": "module".[39m
    
    [94mimport[39m [92m'./startup/init.js'[39m[90m;[39m
    [90m// Loaded as ES module since ./startup contains no package.json file,[39m
    [90m// and therefore inherits the ES module package scope from one level up.[39m
    
    [94mimport[39m [92m'commonjs-package'[39m[90m;[39m
    [90m// Loaded as CommonJS since ./node_modules/commonjs-package/package.json[39m
    [90m// lacks a "type" field or contains "type": "commonjs".[39m
    
    [94mimport[39m [92m'./node_modules/commonjs-package/index.js'[39m[90m;[39m
    [90m// Loaded as CommonJS since ./node_modules/commonjs-package/package.json[39m
    [90m// lacks a "type" field or contains "type": "commonjs".[39m

[0mFiles ending with [33m.mjs[39m are always loaded as ES modules regardless of package[0m
[0mscope.[0m

[0mFiles ending with [33m.cjs[39m are always loaded as CommonJS regardless of package[0m
[0mscope.[0m

    [94mimport[39m [92m'./legacy-file.cjs'[39m[90m;[39m
    [90m// Loaded as CommonJS since .cjs is always loaded as CommonJS.[39m
    
    [94mimport[39m [92m'commonjs-package/src/index.mjs'[39m[90m;[39m
    [90m// Loaded as ES module since .mjs is always loaded as ES module.[39m

[0mThe [33m.mjs[39m and [33m.cjs[39m extensions may be used to mix types within the same[0m
[0mpackage scope:[0m

    * [0m[0m[0mWithin a [33m"type": "module"[39m package scope, Node.js can be instructed to[0m[0m[0m
      [0m[0m[0minterpret a particular file as CommonJS by naming it with a [33m.cjs[39m extension[0m[0m[0m
      [0m[0m[0m(since both [33m.js[39m and [33m.mjs[39m files are treated as ES modules within a[0m[0m[0m
      [0m[0m[0m[33m"module"[39m package scope).[0m[0m[0m
    * [0m[0m[0mWithin a [33m"type": "commonjs"[39m package scope, Node.js can be instructed to[0m[0m[0m
      [0m[0m[0minterpret a particular file as an ES module by naming it with an [33m.mjs[39m[0m[0m[0m
      [0m[0m[0mextension (since both [33m.js[39m and [33m.cjs[39m files are treated as CommonJS within a[0m[0m[0m
      [0m[0m[0m[33m"commonjs"[39m package scope).[0m[0m[0m

[32m[1m### [33m--input-type[39m[32m flag[22m[39m

[0mStrings passed in as an argument to [33m--eval[39m or [33m--print[39m (or [33m-e[39m or [33m-p[39m), or[0m
[0mpiped to [33mnode[39m via [33mSTDIN[39m, will be treated as ES modules when the[0m
[0m[33m--input-type=module[39m flag is set.[0m

    [33mnode --input-type=module --eval "import { sep } from 'path'; console.log(sep);"[39m
    [33m[39m
    [33mecho "import { sep } from 'path'; console.log(sep);" | node --input-type=module[39m

[0mFor completeness there is also [33m--input-type=commonjs[39m, for explicitly running[0m
[0mstring input as CommonJS. This is the default behavior if [33m--input-type[39m is[0m
[0munspecified.[0m

[32m[1m## Packages[22m[39m

[32m[1m### Package Entry Points[22m[39m

[0mIn a package’s [33mpackage.json[39m file, two fields can define entry points for a[0m
[0mpackage: [33m"main"[39m and [33m"exports"[39m. The [33m"main"[39m field is supported in all[0m
[0mversions of Node.js, but its capabilities are limited: it only defines the main[0m
[0mentry point of the package.[0m

[0mThe [33m"exports"[39m field provides an alternative to [33m"main"[39m where the package[0m
[0mmain entry point can be defined while also encapsulating the package, preventing[0m
[0many other entry points besides those defined in [33m"exports"[39m. If package entry[0m
[0mpoints are defined in both [33m"main"[39m and [33m"exports"[39m, the latter takes precedence[0m
[0min versions of Node.js that support [33m"exports"[39m. [34mConditional Exports ([34m[4m#esm_conditional_exports[24m[39m[34m)[39m can[0m
[0malso be used within [33m"exports"[39m to define different package entry points per[0m
[0menvironment, including whether the package is referenced via [33mrequire[39m or via[0m
[0m[33mimport[39m.[0m

[0mIf both [33m"exports"[39m and [33m"main"[39m are defined, the [33m"exports"[39m field takes[0m
[0mprecedence over [33m"main"[39m.[0m

[0mBoth [33m"main"[39m and [33m"exports"[39m entry points are not specific to ES modules or[0m
[0mCommonJS; [33m"main"[39m will be overridden by [33m"exports"[39m in a [33mrequire[39m so it is[0m
[0mnot a CommonJS fallback.[0m

[0mThis is important with regard to [33mrequire[39m, since [33mrequire[39m of ES module files[0m
[0mthrows an error in all versions of Node.js. To create a package that works both[0m
[0min modern Node.js via [33mimport[39m and [33mrequire[39m and also legacy Node.js versions,[0m
[0msee [34mthe dual CommonJS/ES module packages section ([34m[4m#esm_dual_commonjs_es_module_packages[24m[39m[34m)[39m.[0m

[32m[1m#### Main Entry Point Export[22m[39m

[0mTo set the main entry point for a package, it is advisable to define both[0m
[0m[33m"exports"[39m and [33m"main"[39m in the package’s [33mpackage.json[39m file:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [32m"main"[39m[93m:[39m [92m"./main.js"[39m[32m,[39m
      [32m"exports"[39m[93m:[39m [92m"./main.js"[39m
    [33m}[39m

[0mThe benefit of doing this is that when using the [33m"exports"[39m field all[0m
[0msubpaths of the package will no longer be available to importers under[0m
[0m[33mrequire('pkg/subpath.js')[39m, and instead they will get a new error,[0m
[0m[33mERR_PACKAGE_PATH_NOT_EXPORTED[39m.[0m

[0mThis encapsulation of exports provides more reliable guarantees[0m
[0mabout package interfaces for tools and when handling semver upgrades for a[0m
[0mpackage. It is not a strong encapsulation since a direct require of any[0m
[0mabsolute subpath of the package such as[0m
[0m[33mrequire('/path/to/node_modules/pkg/subpath.js')[39m will still load [33msubpath.js[39m.[0m

[32m[1m#### Subpath Exports[22m[39m

[0mWhen using the [33m"exports"[39m field, custom subpaths can be defined along[0m
[0mwith the main entry point by treating the main entry point as the[0m
[0m[33m"."[39m subpath:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [32m"main"[39m[93m:[39m [92m"./main.js"[39m[32m,[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"."[39m[93m:[39m [92m"./main.js"[39m[32m,[39m
        [32m"./submodule"[39m[93m:[39m [92m"./src/submodule.js"[39m
      [33m}[39m
    [33m}[39m

[0mNow only the defined subpath in [33m"exports"[39m can be imported by a[0m
[0mconsumer:[0m

    [94mimport[39m [37msubmodule[39m [37mfrom[39m [92m'es-module-package/submodule'[39m[90m;[39m
    [90m// Loads ./node_modules/es-module-package/src/submodule.js[39m

[0mWhile other subpaths will error:[0m

    [94mimport[39m [37msubmodule[39m [37mfrom[39m [92m'es-module-package/private-module.js'[39m[90m;[39m
    [90m// Throws ERR_PACKAGE_PATH_NOT_EXPORTED[39m

[0mEntire folders can also be mapped with package exports:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [90m// ./node_modules/es-module-package/package.json[39m
    [33m{[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"./features/"[39m[93m:[39m [92m"./src/features/"[39m
      [33m}[39m
    [33m}[39m

[0mWith the above, all modules within the [33m./src/features/[39m folder[0m
[0mare exposed deeply to [33mimport[39m and [33mrequire[39m:[0m

    [94mimport[39m [37mfeature[39m [37mfrom[39m [92m'es-module-package/features/x.js'[39m[90m;[39m
    [90m// Loads ./node_modules/es-module-package/src/features/x.js[39m

[0mWhen using folder mappings, ensure that you do want to expose every[0m
[0mmodule inside the subfolder. Any modules which are not public[0m
[0mshould be moved to another folder to retain the encapsulation[0m
[0mbenefits of exports.[0m

[32m[1m#### Package Exports Fallbacks[22m[39m

[0mFor possible new specifier support in future, array fallbacks are[0m
[0msupported for all invalid specifiers:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"./submodule"[39m[93m:[39m [33m[[39m[92m"not:valid"[39m[32m,[39m [92m"./submodule.js"[39m[33m][39m
      [33m}[39m
    [33m}[39m

[0mSince [33m"not:valid"[39m is not a valid specifier, [33m"./submodule.js"[39m is used[0m
[0minstead as the fallback, as if it were the only target.[0m

[32m[1m#### Exports Sugar[22m[39m

[0mIf the [33m"."[39m export is the only export, the [33m"exports"[39m field provides sugar[0m
[0mfor this case being the direct [33m"exports"[39m field value.[0m

[0mIf the [33m"."[39m export has a fallback array or string value, then the [33m"exports"[39m[0m
[0mfield can be set to this value directly.[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"."[39m[93m:[39m [92m"./main.js"[39m
      [33m}[39m
    [33m}[39m

[0mcan be written:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [32m"exports"[39m[93m:[39m [92m"./main.js"[39m
    [33m}[39m

[32m[1m#### Conditional Exports[22m[39m

[0mConditional exports provide a way to map to different paths depending on[0m
[0mcertain conditions. They are supported for both CommonJS and ES module imports.[0m

[0mFor example, a package that wants to provide different ES module exports for[0m
[0m[33mrequire()[39m and [33mimport[39m can be written:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [90m// package.json[39m
    [33m{[39m
      [32m"main"[39m[93m:[39m [92m"./main-require.cjs"[39m[32m,[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"import"[39m[93m:[39m [92m"./main-module.js"[39m[32m,[39m
        [32m"require"[39m[93m:[39m [92m"./main-require.cjs"[39m
      [33m}[39m[32m,[39m
      [32m"type"[39m[93m:[39m [92m"module"[39m
    [33m}[39m

[0mNode.js supports the following conditions:[0m

    * [0m[33m"import"[39m - matched when the package is loaded via [33mimport[39m or[0m
      [0m [33mimport()[39m. Can reference either an ES module or CommonJS file, as both[0m
      [0m [33mimport[39m and [33mimport()[39m can load either ES module or CommonJS sources.[0m
    * [0m[33m"require"[39m - matched when the package is loaded via [33mrequire()[39m.[0m
      [0m As [33mrequire()[39m only supports CommonJS, the referenced file must be CommonJS.[0m
    * [0m[33m"node"[39m - matched for any Node.js environment. Can be a CommonJS or ES[0m
      [0m module file. _This condition should always come after [33m"import"[39m or[0m
      [0m [33m"require"[39m._[0m
    * [0m[33m"default"[39m - the generic fallback that will always match. Can be a CommonJS[0m
      [0m or ES module file. [3mThis condition should always come last.[23m[0m

[0mCondition matching is applied in object order from first to last within the[0m
[0m[33m"exports"[39m object. [3mThe general rule is that conditions should be used[23m[0m
[0m[3mfrom most specific to least specific in object order.[23m[0m

[0mOther conditions such as [33m"browser"[39m, [33m"electron"[39m, [33m"deno"[39m, [33m"react-native"[39m,[0m
[0metc. are ignored by Node.js but may be used by other runtimes or tools.[0m
[0mFurther restrictions, definitions or guidance on condition names may be[0m
[0mprovided in the future.[0m

[0mUsing the [33m"import"[39m and [33m"require"[39m conditions can lead to some hazards,[0m
[0mwhich are explained further in[0m
[0m[34mthe dual CommonJS/ES module packages section ([34m[4m#esm_dual_commonjs_es_module_packages[24m[39m[34m)[39m.[0m

[0mConditional exports can also be extended to exports subpaths, for example:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [32m"main"[39m[93m:[39m [92m"./main.js"[39m[32m,[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"."[39m[93m:[39m [92m"./main.js"[39m[32m,[39m
        [32m"./feature"[39m[93m:[39m [33m{[39m
          [32m"browser"[39m[93m:[39m [92m"./feature-browser.js"[39m[32m,[39m
          [32m"default"[39m[93m:[39m [92m"./feature.js"[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m

[0mDefines a package where [33mrequire('pkg/feature')[39m and [33mimport 'pkg/feature'[39m[0m
[0mcould provide different implementations between the browser and Node.js,[0m
[0mgiven third-party tool support for a [33m"browser"[39m condition.[0m

[32m[1m#### Nested conditions[22m[39m

[0mIn addition to direct mappings, Node.js also supports nested condition objects.[0m

[0mFor example, to define a package that only has dual mode entry points for[0m
[0muse in Node.js but not the browser:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [33m{[39m
      [32m"main"[39m[93m:[39m [92m"./main.js"[39m[32m,[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"browser"[39m[93m:[39m [92m"./feature-browser.mjs"[39m[32m,[39m
        [32m"node"[39m[93m:[39m [33m{[39m
          [32m"import"[39m[93m:[39m [92m"./feature-node.mjs"[39m[32m,[39m
          [32m"require"[39m[93m:[39m [92m"./feature-node.cjs"[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m

[0mConditions continue to be matched in order as with flat conditions. If[0m
[0ma nested conditional does not have any mapping it will continue checking[0m
[0mthe remaining conditions of the parent condition. In this way nested[0m
[0mconditions behave analogously to nested JavaScript [33mif[39m statements.[0m

[32m[1m#### Self-referencing a package using its name[22m[39m

[0mWithin a package, the values defined in the package’s[0m
[0m[33mpackage.json[39m [33m"exports"[39m field can be referenced via the package’s name.[0m
[0mFor example, assuming the [33mpackage.json[39m is:[0m

    [33m// package.json[39m
    [33m{[39m
    [33m  "name": "a-package",[39m
    [33m  "exports": {[39m
    [33m    ".": "./main.mjs",[39m
    [33m    "./foo": "./foo.js"[39m
    [33m  }[39m
    [33m}[39m

[0mThen any module [3min that package[23m can reference an export in the package itself:[0m

    [90m// ./a-module.mjs[39m
    [94mimport[39m [33m{[39m [37msomething[39m [33m}[39m [37mfrom[39m [92m'a-package'[39m[90m;[39m [90m// Imports "something" from ./main.mjs.[39m

[0mSelf-referencing is available only if [33mpackage.json[39m has [33mexports[39m, and will[0m
[0mallow importing only what that [33mexports[39m (in the [33mpackage.json[39m) allows.[0m
[0mSo the code below, given the package above, will generate a runtime error:[0m

    [90m// ./another-module.mjs[39m
    
    [90m// Imports "another" from ./m.mjs. Fails because[39m
    [90m// the "package.json" "exports" field[39m
    [90m// does not provide an export named "./m.mjs".[39m
    [94mimport[39m [33m{[39m [37manother[39m [33m}[39m [37mfrom[39m [92m'a-package/m.mjs'[39m[90m;[39m

[0mSelf-referencing is also available when using [33mrequire[39m, both in an ES module,[0m
[0mand in a CommonJS one. For example, this code will also work:[0m

    [90m// ./a-module.js[39m
    [94mconst[39m [33m{[39m [37msomething[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'a-package/foo'[39m[90m)[39m[90m;[39m [90m// Loads from ./foo.js.[39m

[32m[1m### Dual CommonJS/ES Module Packages[22m[39m

[0mPrior to the introduction of support for ES modules in Node.js, it was a common[0m
[0mpattern for package authors to include both CommonJS and ES module JavaScript[0m
[0msources in their package, with [33mpackage.json[39m [33m"main"[39m specifying the CommonJS[0m
[0mentry point and [33mpackage.json[39m [33m"module"[39m specifying the ES module entry point.[0m
[0mThis enabled Node.js to run the CommonJS entry point while build tools such as[0m
[0mbundlers used the ES module entry point, since Node.js ignored (and still[0m
[0mignores) the top-level [33m"module"[39m field.[0m

[0mNode.js can now run ES module entry points, and a package can contain both[0m
[0mCommonJS and ES module entry points (either via separate specifiers such as[0m
[0m[33m'pkg'[39m and [33m'pkg/es-module'[39m, or both at the same specifier via [34mConditional[39m[0m
[0m[34mExports ([34m[4m#esm_conditional_exports[24m[39m[34m)[39m). Unlike in the scenario where [33m"module"[39m is only used by bundlers,[0m
[0mor ES module files are transpiled into CommonJS on the fly before evaluation by[0m
[0mNode.js, the files referenced by the ES module entry point are evaluated as ES[0m
[0mmodules.[0m

[32m[1m#### Dual Package Hazard[22m[39m

[0mWhen an application is using a package that provides both CommonJS and ES module[0m
[0msources, there is a risk of certain bugs if both versions of the package get[0m
[0mloaded. This potential comes from the fact that the [33mpkgInstance[39m created by[0m
[0m[33mconst pkgInstance = require('pkg')[39m is not the same as the [33mpkgInstance[39m[0m
[0mcreated by [33mimport pkgInstance from 'pkg'[39m (or an alternative main path like[0m
[0m[33m'pkg/module'[39m). This is the “dual package hazard,” where two versions of the[0m
[0msame package can be loaded within the same runtime environment. While it is[0m
[0munlikely that an application or package would intentionally load both versions[0m
[0mdirectly, it is common for an application to load one version while a dependency[0m
[0mof the application loads the other version. This hazard can happen because[0m
[0mNode.js supports intermixing CommonJS and ES modules, and can lead to unexpected[0m
[0mbehavior.[0m

[0mIf the package main export is a constructor, an [33minstanceof[39m comparison of[0m
[0minstances created by the two versions returns [33mfalse[39m, and if the export is an[0m
[0mobject, properties added to one (like [33mpkgInstance.foo = 3[39m) are not present on[0m
[0mthe other. This differs from how [33mimport[39m and [33mrequire[39m statements work in[0m
[0mall-CommonJS or all-ES module environments, respectively, and therefore is[0m
[0msurprising to users. It also differs from the behavior users are familiar with[0m
[0mwhen using transpilation via tools like [34mBabel ([34m[4mhttps://babeljs.io/[24m[39m[34m)[39m or [34m[33mesm[39m[34m ([34m[4mhttps://github.com/standard-things/esm#readme[24m[39m[34m)[39m.[0m

[32m[1m#### Writing Dual Packages While Avoiding or Minimizing Hazards[22m[39m

[0mFirst, the hazard described in the previous section occurs when a package[0m
[0mcontains both CommonJS and ES module sources and both sources are provided for[0m
[0muse in Node.js, either via separate main entry points or exported paths. A[0m
[0mpackage could instead be written where any version of Node.js receives only[0m
[0mCommonJS sources, and any separate ES module sources the package may contain[0m
[0mcould be intended only for other environments such as browsers. Such a package[0m
[0mwould be usable by any version of Node.js, since [33mimport[39m can refer to CommonJS[0m
[0mfiles; but it would not provide any of the advantages of using ES module syntax.[0m

[0mA package could also switch from CommonJS to ES module syntax in a breaking[0m
[0mchange version bump. This has the disadvantage that the newest version[0m
[0mof the package would only be usable in ES module-supporting versions of Node.js.[0m

[0mEvery pattern has tradeoffs, but there are two broad approaches that satisfy the[0m
[0mfollowing conditions:[0m

    1. [0mThe package is usable via both [33mrequire[39m and [33mimport[39m.[0m
    2. [0mThe package is usable in both current Node.js and older versions of Node.js[0m
       [0mthat lack support for ES modules.[0m
    3. [0mThe package main entry point, e.g. [33m'pkg'[39m can be used by both [33mrequire[39m to[0m
       [0mresolve to a CommonJS file and by [33mimport[39m to resolve to an ES module file.[0m
       [0m(And likewise for exported paths, e.g. [33m'pkg/feature'[39m.)[0m
    4. [0mThe package provides named exports, e.g. [33mimport { name } from 'pkg'[39m rather[0m
       [0mthan [33mimport pkg from 'pkg'; pkg.name[39m.[0m
    5. [0mThe package is potentially usable in other ES module environments such as[0m
       [0mbrowsers.[0m
    6. [0mThe hazards described in the previous section are avoided or minimized.[0m

[32m[1m##### Approach #1: Use an ES Module Wrapper[22m[39m

[0mWrite the package in CommonJS or transpile ES module sources into CommonJS, and[0m
[0mcreate an ES module wrapper file that defines the named exports. Using[0m
[0m[34mConditional Exports ([34m[4m#esm_conditional_exports[24m[39m[34m)[39m, the ES module wrapper is used for [33mimport[39m and the[0m
[0mCommonJS entry point for [33mrequire[39m.[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [90m// ./node_modules/pkg/package.json[39m
    [33m{[39m
      [32m"type"[39m[93m:[39m [92m"module"[39m[32m,[39m
      [32m"main"[39m[93m:[39m [92m"./index.cjs"[39m[32m,[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"import"[39m[93m:[39m [92m"./wrapper.mjs"[39m[32m,[39m
        [32m"require"[39m[93m:[39m [92m"./index.cjs"[39m
      [33m}[39m
    [33m}[39m

    [90m// ./node_modules/pkg/index.cjs[39m
    [37mexports[39m[32m.[39m[37mname[39m [93m=[39m [92m'value'[39m[90m;[39m

    [90m// ./node_modules/pkg/wrapper.mjs[39m
    [94mimport[39m [37mcjsModule[39m [37mfrom[39m [92m'./index.cjs'[39m[90m;[39m
    [94mexport[39m [94mconst[39m [37mname[39m [93m=[39m [37mcjsModule[39m[32m.[39m[37mname[39m[90m;[39m

[0mIn this example, the [33mname[39m from [33mimport { name } from 'pkg'[39m is the same[0m
[0msingleton as the [33mname[39m from [33mconst { name } = require('pkg')[39m. Therefore [33m===[39m[0m
[0mreturns [33mtrue[39m when comparing the two [33mname[39ms and the divergent specifier hazard[0m
[0mis avoided.[0m

[0mIf the module is not simply a list of named exports, but rather contains a[0m
[0munique function or object export like [33mmodule.exports = function () { ... }[39m,[0m
[0mor if support in the wrapper for the [33mimport pkg from 'pkg'[39m pattern is desired,[0m
[0mthen the wrapper would instead be written to export the default optionally[0m
[0malong with any named exports as well:[0m

    [94mimport[39m [37mcjsModule[39m [37mfrom[39m [92m'./index.cjs'[39m[90m;[39m
    [94mexport[39m [94mconst[39m [37mname[39m [93m=[39m [37mcjsModule[39m[32m.[39m[37mname[39m[90m;[39m
    [94mexport[39m [94mdefault[39m [37mcjsModule[39m[90m;[39m

[0mThis approach is appropriate for any of the following use cases:[0m

    * [0mThe package is currently written in CommonJS and the author would prefer not[0m
      [0mto refactor it into ES module syntax, but wishes to provide named exports for[0m
      [0mES module consumers.[0m
    * [0mThe package has other packages that depend on it, and the end user might[0m
      [0minstall both this package and those other packages. For example a [33mutilities[39m[0m
      [0mpackage is used directly in an application, and a [33mutilities-plus[39m package[0m
      [0madds a few more functions to [33mutilities[39m. Because the wrapper exports[0m
      [0munderlying CommonJS files, it doesn’t matter if [33mutilities-plus[39m is written in[0m
      [0mCommonJS or ES module syntax; it will work either way.[0m
    * [0mThe package stores internal state, and the package author would prefer not to[0m
      [0mrefactor the package to isolate its state management. See the next section.[0m

[0mA variant of this approach not requiring conditional exports for consumers could[0m
[0mbe to add an export, e.g. [33m"./module"[39m, to point to an all-ES module-syntax[0m
[0mversion of the package. This could be used via [33mimport 'pkg/module'[39m by users[0m
[0mwho are certain that the CommonJS version will not be loaded anywhere in the[0m
[0mapplication, such as by dependencies; or if the CommonJS version can be loaded[0m
[0mbut doesn’t affect the ES module version (for example, because the package is[0m
[0mstateless):[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [90m// ./node_modules/pkg/package.json[39m
    [33m{[39m
      [32m"type"[39m[93m:[39m [92m"module"[39m[32m,[39m
      [32m"main"[39m[93m:[39m [92m"./index.cjs"[39m[32m,[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"."[39m[93m:[39m [92m"./index.cjs"[39m[32m,[39m
        [32m"./module"[39m[93m:[39m [92m"./wrapper.mjs"[39m
      [33m}[39m
    [33m}[39m

[32m[1m##### Approach #2: Isolate State[22m[39m

[0mA [33mpackage.json[39m file can define the separate CommonJS and ES module entry[0m
[0mpoints directly:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [90m// ./node_modules/pkg/package.json[39m
    [33m{[39m
      [32m"type"[39m[93m:[39m [92m"module"[39m[32m,[39m
      [32m"main"[39m[93m:[39m [92m"./index.cjs"[39m[32m,[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"import"[39m[93m:[39m [92m"./index.mjs"[39m[32m,[39m
        [32m"require"[39m[93m:[39m [92m"./index.cjs"[39m
      [33m}[39m
    [33m}[39m

[0mThis can be done if both the CommonJS and ES module versions of the package are[0m
[0mequivalent, for example because one is the transpiled output of the other; and[0m
[0mthe package’s management of state is carefully isolated (or the package is[0m
[0mstateless).[0m

[0mThe reason that state is an issue is because both the CommonJS and ES module[0m
[0mversions of the package may get used within an application; for example, the[0m
[0muser’s application code could [33mimport[39m the ES module version while a dependency[0m
[0m[33mrequire[39ms the CommonJS version. If that were to occur, two copies of the[0m
[0mpackage would be loaded in memory and therefore two separate states would be[0m
[0mpresent. This would likely cause hard-to-troubleshoot bugs.[0m

[0mAside from writing a stateless package (if JavaScript’s [33mMath[39m were a package,[0m
[0mfor example, it would be stateless as all of its methods are static), there are[0m
[0msome ways to isolate state so that it’s shared between the potentially loaded[0m
[0mCommonJS and ES module instances of the package:[0m

    1. [0m[0m[0mIf possible, contain all state within an instantiated object. JavaScript’s[0m[0m[0m
       [0m[0m[0m[33mDate[39m, for example, needs to be instantiated to contain state; if it were a[0m[0m[0m
       [0m[0m[0mpackage, it would be used like this:[0m[0m[0m
       [0m[0m
       [0m     [94mimport[39m [37mDate[39m [37mfrom[39m [92m'date'[39m[90m;[39m[0m
       [0m     [94mconst[39m [37msomeDate[39m [93m=[39m [31mnew[39m [37mDate[39m[90m([39m[90m)[39m[90m;[39m[0m
       [0m     [90m// someDate contains state; Date does not[39m[0m
       [0m[0m
       [0m[0m[0mThe [33mnew[39m keyword isn’t required; a package’s function can return a new[0m[0m[0m
       [0m[0m[0mobject, or modify a passed-in object, to keep the state external to the[0m[0m[0m
       [0m[0m[0mpackage.[0m[0m[0m
    2. [0m[0m[0mIsolate the state in one or more CommonJS files that are shared between the[0m[0m[0m
       [0m[0m[0mCommonJS and ES module versions of the package. For example, if the CommonJS[0m[0m[0m
       [0m[0m[0mand ES module entry points are [33mindex.cjs[39m and [33mindex.mjs[39m, respectively:[0m[0m[0m
       [0m[0m
       [0m     [90m// ./node_modules/pkg/index.cjs[39m[0m
       [0m     [94mconst[39m [37mstate[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./state.cjs'[39m[90m)[39m[90m;[39m[0m
       [0m     [37mmodule[39m[32m.[39m[37mexports[39m[32m.[39m[37mstate[39m [93m=[39m [37mstate[39m[90m;[39m[0m
       [0m[0m
       [0m     [90m// ./node_modules/pkg/index.mjs[39m[0m
       [0m     [94mimport[39m [37mstate[39m [37mfrom[39m [92m'./state.cjs'[39m[90m;[39m[0m
       [0m     [94mexport[39m [33m{[39m[0m
       [0m       [37mstate[39m[0m
       [0m     [33m}[39m[90m;[39m[0m
       [0m[0m
       [0m[0m[0mEven if [33mpkg[39m is used via both [33mrequire[39m and [33mimport[39m in an application (for[0m[0m[0m
       [0m[0m[0mexample, via [33mimport[39m in application code and via [33mrequire[39m by a dependency)[0m[0m[0m
       [0m[0m[0meach reference of [33mpkg[39m will contain the same state; and modifying that[0m[0m[0m
       [0m[0m[0mstate from either module system will apply to both.[0m[0m[0m

[0mAny plugins that attach to the package’s singleton would need to separately[0m
[0mattach to both the CommonJS and ES module singletons.[0m

[0mThis approach is appropriate for any of the following use cases:[0m

    * [0mThe package is currently written in ES module syntax and the package author[0m
      [0mwants that version to be used wherever such syntax is supported.[0m
    * [0mThe package is stateless or its state can be isolated without too much[0m
      [0mdifficulty.[0m
    * [0mThe package is unlikely to have other public packages that depend on it, or if[0m
      [0mit does, the package is stateless or has state that need not be shared between[0m
      [0mdependencies or with the overall application.[0m

[0mEven with isolated state, there is still the cost of possible extra code[0m
[0mexecution between the CommonJS and ES module versions of a package.[0m

[0mAs with the previous approach, a variant of this approach not requiring[0m
[0mconditional exports for consumers could be to add an export, e.g.[0m
[0m[33m"./module"[39m, to point to an all-ES module-syntax version of the package:[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [90m// ./node_modules/pkg/package.json[39m
    [33m{[39m
      [32m"type"[39m[93m:[39m [92m"module"[39m[32m,[39m
      [32m"main"[39m[93m:[39m [92m"./index.cjs"[39m[32m,[39m
      [32m"exports"[39m[93m:[39m [33m{[39m
        [32m"."[39m[93m:[39m [92m"./index.cjs"[39m[32m,[39m
        [32m"./module"[39m[93m:[39m [92m"./index.mjs"[39m
      [33m}[39m
    [33m}[39m

[32m[1m## [33mimport[39m[32m Specifiers[22m[39m

[32m[1m### Terminology[22m[39m

[0mThe [3mspecifier[23m of an [33mimport[39m statement is the string after the [33mfrom[39m keyword,[0m
[0me.g. [33m'path'[39m in [33mimport { sep } from 'path'[39m. Specifiers are also used in[0m
[0m[33mexport from[39m statements, and as the argument to an [33mimport()[39m expression.[0m

[0mThere are four types of specifiers:[0m

    * [0m[0m[0m[3mBare specifiers[23m like [33m'some-package'[39m. They refer to an entry point of a[0m[0m[0m
      [0m[0m[0mpackage by the package name.[0m[0m[0m
    * [0m[0m[0m[3mDeep import specifiers[23m like [33m'some-package/lib/shuffle.mjs'[39m. They refer to[0m[0m[0m
      [0m[0m[0ma path within a package prefixed by the package name.[0m[0m[0m
    * [0m[0m[0m[3mRelative specifiers[23m like [33m'./startup.js'[39m or [33m'../config.mjs'[39m. They refer[0m[0m[0m
      [0m[0m[0mto a path relative to the location of the importing file.[0m[0m[0m
    * [0m[0m[0m[3mAbsolute specifiers[23m like [33m'file:///opt/nodejs/config.js'[39m. They refer[0m[0m[0m
      [0m[0m[0mdirectly and explicitly to a full path.[0m[0m[0m

[0mBare specifiers, and the bare specifier portion of deep import specifiers, are[0m
[0mstrings; but everything else in a specifier is a URL.[0m

[0mOnly [33mfile:[39m and [33mdata:[39m URLs are supported. A specifier like[0m
[0m[33m'https://example.com/app.js'[39m may be supported by browsers but it is not[0m
[0msupported in Node.js.[0m

[0mSpecifiers may not begin with [33m/[39m or [33m//[39m. These are reserved for potential[0m
[0mfuture use. The root of the current volume may be referenced via [33mfile:///[39m.[0m

[32m[1m#### [33mdata:[39m[32m Imports[22m[39m

[90m<!-- YAML[39m
[90madded: v12.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0m[34m[33mdata:[39m[34m URLs ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs[24m[39m[34m)[39m are supported for importing with the following MIME types:[0m

    * [0m[33mtext/javascript[39m for ES Modules[0m
    * [0m[33mapplication/json[39m for JSON[0m
    * [0m[33mapplication/wasm[39m for WASM.[0m

[0m[33mdata:[39m URLs only resolve [34m[3mBare specifiers[23m ([34m[4m#esm_terminology[24m[39m[34m)[39m for builtin modules[0m
[0mand [34m[3mAbsolute specifiers[23m ([34m[4m#esm_terminology[24m[39m[34m)[39m. Resolving[0m
[0m[34m[3mRelative specifiers[23m ([34m[4m#esm_terminology[24m[39m[34m)[39m will not work because [33mdata:[39m is not a[0m
[0m[34mspecial scheme ([34m[4mhttps://url.spec.whatwg.org/#special-scheme[24m[39m[34m)[39m. For example, attempting to load [33m./foo[39m[0m
[0mfrom [33mdata:text/javascript,import "./foo";[39m will fail to resolve since there[0m
[0mis no concept of relative resolution for [33mdata:[39m URLs. An example of a [33mdata:[39m[0m
[0mURLs being used is:[0m

    [94mimport[39m [92m'data:text/javascript,console.log("hello!");'[39m[90m;[39m
    [94mimport[39m [37m_[39m [37mfrom[39m [92m'data:application/json,"world!"'[39m[90m;[39m

[32m[1m## [33mimport.meta[39m[32m[22m[39m

    * [0m{Object}[0m

[0mThe [33mimport.meta[39m metaproperty is an [33mObject[39m that contains the following[0m
[0mproperty:[0m

    * [0m[33murl[39m {string} The absolute [33mfile:[39m URL of the module.[0m

[32m[1m## Differences Between ES Modules and CommonJS[22m[39m

[32m[1m### Mandatory file extensions[22m[39m

[0mA file extension must be provided when using the [33mimport[39m keyword. Directory[0m
[0mindexes (e.g. [33m'./startup/index.js'[39m) must also be fully specified.[0m

[0mThis behavior matches how [33mimport[39m behaves in browser environments, assuming a[0m
[0mtypically configured server.[0m

[32m[1m### No [33mNODE_PATH[39m[32m[22m[39m

[0m[33mNODE_PATH[39m is not part of resolving [33mimport[39m specifiers. Please use symlinks[0m
[0mif this behavior is desired.[0m

[32m[1m### No [33mrequire[39m[32m, [33mexports[39m[32m, [33mmodule.exports[39m[32m, [33m__filename[39m[32m, [33m__dirname[39m[32m[22m[39m

[0mThese CommonJS variables are not available in ES modules.[0m

[0m[33mrequire[39m can be imported into an ES module using [34m[33mmodule.createRequire()[39m[34m ([34m[4mmodules.html#modules_module_createrequire_filename[24m[39m[34m)[39m.[0m

[0mEquivalents of [33m__filename[39m and [33m__dirname[39m can be created inside of each file[0m
[0mvia [34m[33mimport.meta.url[39m[34m ([34m[4m#esm_import_meta[24m[39m[34m)[39m.[0m

    [94mimport[39m [33m{[39m [37mfileURLToPath[39m [33m}[39m [37mfrom[39m [92m'api/source/url'[39m[90m;[39m
    [94mimport[39m [33m{[39m [37mdirname[39m [33m}[39m [37mfrom[39m [92m'api/source/path'[39m[90m;[39m
    
    [94mconst[39m [37m__filename[39m [93m=[39m [37mfileURLToPath[39m[90m([39m[94mimport[39m[32m.[39m[37mmeta[39m[32m.[39m[37murl[39m[90m)[39m[90m;[39m
    [94mconst[39m [37m__dirname[39m [93m=[39m [37mdirname[39m[90m([39m[37m__filename[39m[90m)[39m[90m;[39m

[32m[1m### No [33mrequire.resolve[39m[32m[22m[39m

[0mFormer use cases relying on [33mrequire.resolve[39m to determine the resolved path[0m
[0mof a module can be supported via [33mimport.meta.resolve[39m, which is experimental[0m
[0mand supported via the [33m--experimental-import-meta-resolve[39m flag:[0m

    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [94mconst[39m [37mdependencyAsset[39m [93m=[39m [37mawait[39m [94mimport[39m[32m.[39m[37mmeta[39m[32m.[39m[37mresolve[39m[90m([39m[92m'component-lib/asset.css'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[0m[33mimport.meta.resolve[39m also accepts a second argument which is the parent module[0m
[0mfrom which to resolve from:[0m

    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// Equivalent to import.meta.resolve('./dep')[39m
      [37mawait[39m [94mimport[39m[32m.[39m[37mmeta[39m[32m.[39m[37mresolve[39m[90m([39m[92m'./dep'[39m[32m,[39m [94mimport[39m[32m.[39m[37mmeta[39m[32m.[39m[37murl[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[0mThis function is asynchronous since the ES module resolver in Node.js is[0m
[0masynchronous. With the introduction of [34mTop-Level Await ([34m[4mhttps://github.com/tc39/proposal-top-level-await[24m[39m[34m)[39m, these use cases[0m
[0mwill be easier as they won't require an async function wrapper.[0m

[32m[1m### No [33mrequire.extensions[39m[32m[22m[39m

[0m[33mrequire.extensions[39m is not used by [33mimport[39m. The expectation is that loader[0m
[0mhooks can provide this workflow in the future.[0m

[32m[1m### No [33mrequire.cache[39m[32m[22m[39m

[0m[33mrequire.cache[39m is not used by [33mimport[39m. It has a separate cache.[0m

[32m[1m### URL-based paths[22m[39m

[0mES modules are resolved and cached based upon[0m
[0m[34mURL ([34m[4mhttps://url.spec.whatwg.org/[24m[39m[34m)[39m semantics. This means that files containing[0m
[0mspecial characters such as [33m#[39m and [33m?[39m need to be escaped.[0m

[0mModules will be loaded multiple times if the [33mimport[39m specifier used to resolve[0m
[0mthem have a different query or fragment.[0m

    [94mimport[39m [92m'./foo.mjs?query=1'[39m[90m;[39m [90m// loads ./foo.mjs with query of "?query=1"[39m
    [94mimport[39m [92m'./foo.mjs?query=2'[39m[90m;[39m [90m// loads ./foo.mjs with query of "?query=2"[39m

[0mFor now, only modules using the [33mfile:[39m protocol can be loaded.[0m

[32m[1m## Interoperability with CommonJS[22m[39m

[32m[1m### [33mrequire[39m[32m[22m[39m

[0m[33mrequire[39m always treats the files it references as CommonJS. This applies[0m
[0mwhether [33mrequire[39m is used the traditional way within a CommonJS environment, or[0m
[0min an ES module environment using [34m[33mmodule.createRequire()[39m[34m ([34m[4mmodules.html#modules_module_createrequire_filename[24m[39m[34m)[39m.[0m

[0mTo include an ES module into CommonJS, use [34m[33mimport()[39m[34m ([34m[4m#esm_import_expressions[24m[39m[34m)[39m.[0m

[32m[1m### [33mimport[39m[32m statements[22m[39m

[0mAn [33mimport[39m statement can reference an ES module or a CommonJS module. Other[0m
[0mfile types such as JSON or Native modules are not supported. For those, use[0m
[0m[34m[33mmodule.createRequire()[39m[34m ([34m[4mmodules.html#modules_module_createrequire_filename[24m[39m[34m)[39m.[0m

[0m[33mimport[39m statements are permitted only in ES modules. For similar functionality[0m
[0min CommonJS, see [34m[33mimport()[39m[34m ([34m[4m#esm_import_expressions[24m[39m[34m)[39m.[0m

[0mThe [3mspecifier[23m of an [33mimport[39m statement (the string after the [33mfrom[39m keyword)[0m
[0mcan either be an URL-style relative path like [33m'./file.mjs'[39m or a package name[0m
[0mlike [33m'fs'[39m.[0m

[0mLike in CommonJS, files within packages can be accessed by appending a path to[0m
[0mthe package name; unless the package’s [33mpackage.json[39m contains an [33m"exports"[39m[0m
[0mfield, in which case files within packages need to be accessed via the path[0m
[0mdefined in [33m"exports"[39m.[0m

    [94mimport[39m [33m{[39m [37msin[39m[32m,[39m [37mcos[39m [33m}[39m [37mfrom[39m [92m'geometry/trigonometry-functions.mjs'[39m[90m;[39m

[0mOnly the “default export” is supported for CommonJS files or packages:[0m

[90m<!-- eslint-disable no-duplicate-imports -->[39m
[90m[39m    [94mimport[39m [37mpackageMain[39m [37mfrom[39m [92m'commonjs-package'[39m[90m;[39m [90m// Works[39m
    
    [94mimport[39m [33m{[39m [37mmethod[39m [33m}[39m [37mfrom[39m [92m'commonjs-package'[39m[90m;[39m [90m// Errors[39m

[0mIt is also possible to[0m
[0m[34mimport an ES or CommonJS module for its side effects only ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Import_a_module_for_its_side_effects_only[24m[39m[34m)[39m.[0m

[32m[1m### [33mimport()[39m[32m expressions[22m[39m

[0m[34mDynamic [33mimport()[39m[34m ([34m[4mhttps://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports[24m[39m[34m)[39m is supported in both CommonJS and ES modules. It can be[0m
[0mused to include ES module files from CommonJS code.[0m

[32m[1m## CommonJS, JSON, and Native Modules[22m[39m

[0mCommonJS, JSON, and Native modules can be used with[0m
[0m[34m[33mmodule.createRequire()[39m[34m ([34m[4mmodules.html#modules_module_createrequire_filename[24m[39m[34m)[39m.[0m

    [90m// cjs.cjs[39m
    [37mmodule[39m[32m.[39m[37mexports[39m [93m=[39m [92m'cjs'[39m[90m;[39m
    
    [90m// esm.mjs[39m
    [94mimport[39m [33m{[39m [37mcreateRequire[39m [33m}[39m [37mfrom[39m [92m'module'[39m[90m;[39m
    
    [94mconst[39m [37mrequire[39m [93m=[39m [37mcreateRequire[39m[90m([39m[94mimport[39m[32m.[39m[37mmeta[39m[32m.[39m[37murl[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mcjs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./cjs.cjs'[39m[90m)[39m[90m;[39m
    [37mcjs[39m [93m===[39m [92m'cjs'[39m[90m;[39m [90m// true[39m

[32m[1m## Builtin modules[22m[39m

[0mBuiltin modules will provide named exports of their public API. A[0m
[0mdefault export is also provided which is the value of the CommonJS exports.[0m
[0mThe default export can be used for, among other things, modifying the named[0m
[0mexports. Named exports of builtin modules are updated only by calling[0m
[0m[34m[33mmodule.syncBuiltinESMExports()[39m[34m ([34m[4mmodules.html#modules_module_syncbuiltinesmexports[24m[39m[34m)[39m.[0m

    [94mimport[39m [37mEventEmitter[39m [37mfrom[39m [92m'api/source/events'[39m[90m;[39m
    [94mconst[39m [37me[39m [93m=[39m [31mnew[39m [37mEventEmitter[39m[90m([39m[90m)[39m[90m;[39m

    [94mimport[39m [33m{[39m [37mreadFile[39m [33m}[39m [37mfrom[39m [92m'api/source/fs'[39m[90m;[39m
    [37mreadFile[39m[90m([39m[92m'./foo.txt'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37msource[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
      [33m}[39m [94melse[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37msource[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

    [94mimport[39m [37mfs[39m[32m,[39m [33m{[39m [37mreadFileSync[39m [33m}[39m [37mfrom[39m [92m'api/source/fs'[39m[90m;[39m
    [94mimport[39m [33m{[39m [37msyncBuiltinESMExports[39m [33m}[39m [37mfrom[39m [92m'module'[39m[90m;[39m
    
    [37mfs[39m[32m.[39m[37mreadFileSync[39m [93m=[39m [90m([39m[90m)[39m [93m=>[39m [37mBuffer[39m[32m.[39m[37mfrom[39m[90m([39m[92m'Hello, ESM'[39m[90m)[39m[90m;[39m
    [37msyncBuiltinESMExports[39m[90m([39m[90m)[39m[90m;[39m
    
    [37mfs[39m[32m.[39m[37mreadFileSync[39m [93m===[39m [37mreadFileSync[39m[90m;[39m

[32m[1m## Experimental JSON Modules[22m[39m

[0mCurrently importing JSON modules are only supported in the [33mcommonjs[39m mode[0m
[0mand are loaded using the CJS loader. [34mWHATWG JSON modules specification ([34m[4mhttps://html.spec.whatwg.org/#creating-a-json-module-script[24m[39m[34m)[39m are[0m
[0mstill being standardized, and are experimentally supported by including the[0m
[0madditional flag [33m--experimental-json-modules[39m when running Node.js.[0m

[0mWhen the [33m--experimental-json-modules[39m flag is included both the[0m
[0m[33mcommonjs[39m and [33mmodule[39m mode will use the new experimental JSON[0m
[0mloader. The imported JSON only exposes a [33mdefault[39m, there is no[0m
[0msupport for named exports. A cache entry is created in the CommonJS[0m
[0mcache, to avoid duplication. The same object will be returned in[0m
[0mCommonJS if the JSON module has already been imported from the[0m
[0msame path.[0m

[0mAssuming an [33mindex.mjs[39m with[0m

[90m<!-- eslint-skip -->[39m
[90m[39m    [94mimport[39m [37mpackageConfig[39m [37mfrom[39m [92m'./package.json'[39m[90m;[39m

[0mThe [33m--experimental-json-modules[39m flag is needed for the module[0m
[0mto work.[0m

    [33mnode index.mjs # fails[39m
    [33mnode --experimental-json-modules index.mjs # works[39m

[32m[1m## Experimental Wasm Modules[22m[39m

[0mImporting Web Assembly modules is supported under the[0m
[0m[33m--experimental-wasm-modules[39m flag, allowing any [33m.wasm[39m files to be[0m
[0mimported as normal modules while also supporting their module imports.[0m

[0mThis integration is in line with the[0m
[0m[34mES Module Integration Proposal for Web Assembly ([34m[4mhttps://github.com/webassembly/esm-integration[24m[39m[34m)[39m.[0m

[0mFor example, an [33mindex.mjs[39m containing:[0m

    [94mimport[39m [93m*[39m [37mas[39m [37mM[39m [37mfrom[39m [92m'./module.wasm'[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mM[39m[90m)[39m[90m;[39m

[0mexecuted under:[0m

    [33mnode --experimental-wasm-modules index.mjs[39m

[0mwould provide the exports interface for the instantiation of [33mmodule.wasm[39m.[0m

[32m[1m## Experimental Loaders[22m[39m

[0m[1mNote: This API is currently being redesigned and will still change.[22m[0m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mTo customize the default module resolution, loader hooks can optionally be[0m
[0mprovided via a [33m--experimental-loader ./loader-name.mjs[39m argument to Node.js.[0m

[0mWhen hooks are used they only apply to ES module loading and not to any[0m
[0mCommonJS modules loaded.[0m

[32m[1m### Hooks[22m[39m

[32m[1m#### [90m<code>[39m[32mresolve[90m</code>[39m[32m hook[22m[39m

[90m[3m    [0mNote: The loaders API is being redesigned. This hook may disappear or its[0m[23m[39m
[90m[3m    [0msignature may change. Do not rely on the API described below.[0m[23m[39m

[0mThe [33mresolve[39m hook returns the resolved file URL for a given module specifier[0m
[0mand parent URL. The module specifier is the string in an [33mimport[39m statement or[0m
[0m[33mimport()[39m expression, and the parent URL is the URL of the module that imported[0m
[0mthis one, or [33mundefined[39m if this is the main entry point for the application.[0m

[0mThe [33mconditions[39m property on the [33mcontext[39m is an array of conditions for[0m
[0m[34mConditional Exports ([34m[4m#esm_conditional_exports[24m[39m[34m)[39m that apply to this resolution request. They can be used[0m
[0mfor looking up conditional mappings elsewhere or to modify the list when calling[0m
[0mthe default resolution logic.[0m

[0mThe [34mcurrent set of Node.js default conditions ([34m[4m#esm_conditional_exports[24m[39m[34m)[39m will always[0m
[0mbe in the [33mcontext.conditions[39m list passed to the hook. If the hook wants to[0m
[0mensure Node.js-compatible resolution logic, all items from this default[0m
[0mcondition list [1mmust[22m be passed through to the [33mdefaultResolve[39m function.[0m

    [90m/**
     * @param {string} specifier
     * @param {object} context
     * @param {string} context.parentURL
     * @param {string[]} context.conditions
     * @param {function} defaultResolve
     * @returns {object} response
     * @returns {string} response.url
     */[39m
    [94mexport[39m [37masync[39m [94mfunction[39m [37mresolve[39m[90m([39m[37mspecifier[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultResolve[39m[90m)[39m [33m{[39m
      [94mconst[39m [33m{[39m [37mparentURL[39m [93m=[39m [90mnull[39m [33m}[39m [93m=[39m [37mcontext[39m[90m;[39m
      [94mif[39m [90m([39m[37msomeCondition[39m[90m)[39m [33m{[39m
        [90m// For some or all specifiers, do some custom logic for resolving.[39m
        [90m// Always return an object of the form {url: <string>}[39m
        [31mreturn[39m [33m{[39m
          [37murl[39m[93m:[39m [90m([39m[37mparentURL[39m[90m)[39m [93m?[39m
            [31mnew[39m [37mURL[39m[90m([39m[37mspecifier[39m[32m,[39m [37mparentURL[39m[90m)[39m[32m.[39m[37mhref[39m [93m:[39m [31mnew[39m [37mURL[39m[90m([39m[37mspecifier[39m[90m)[39m[32m.[39m[37mhref[39m
        [33m}[39m[90m;[39m
      [33m}[39m
      [94mif[39m [90m([39m[37manotherCondition[39m[90m)[39m [33m{[39m
        [90m// When calling the defaultResolve, the arguments can be modified. In this[39m
        [90m// case it's adding another value for matching conditional exports.[39m
        [31mreturn[39m [37mdefaultResolve[39m[90m([39m[37mspecifier[39m[32m,[39m [33m{[39m
          [93m...[39m[37mcontext[39m[32m,[39m
          [37mconditions[39m[93m:[39m [33m[[39m[93m...[39m[37mcontext[39m[32m.[39m[37mconditions[39m[32m,[39m [92m'another-condition'[39m[33m][39m[32m,[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m
      [90m// Defer to Node.js for all other specifiers.[39m
      [31mreturn[39m [37mdefaultResolve[39m[90m([39m[37mspecifier[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultResolve[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m#### [90m<code>[39m[32mgetFormat[90m</code>[39m[32m hook[22m[39m

[90m[3m    [0mNote: The loaders API is being redesigned. This hook may disappear or its[0m[23m[39m
[90m[3m    [0msignature may change. Do not rely on the API described below.[0m[23m[39m

[0mThe [33mgetFormat[39m hook provides a way to define a custom method of determining how[0m
[0ma URL should be interpreted. This can be one of the following:[0m

[0m┌────────────┬─────────────────────────────────────────────────────────────────────────┐[0m
[0m│ [33mformat[39m     │ Description                                                             │[0m
[0m├────────────┼─────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'builtin'[39m  │ Load a Node.js builtin module                                           │[0m
[0m├────────────┼─────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'commonjs'[39m │ Load a Node.js CommonJS module                                          │[0m
[0m├────────────┼─────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'dynamic'[39m  │ Use a [34mdynamic instantiate hook ([34m[4m#esm_code_dynamicinstantiate_code_hook[24m[39m[34m)[39m │[0m
[0m├────────────┼─────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'json'[39m     │ Load a JSON file                                                        │[0m
[0m├────────────┼─────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'module'[39m   │ Load a standard JavaScript module (ES module)                           │[0m
[0m├────────────┼─────────────────────────────────────────────────────────────────────────┤[0m
[0m│ [33m'wasm'[39m     │ Load a WebAssembly module                                               │[0m
[0m└────────────┴─────────────────────────────────────────────────────────────────────────┘[0m

    [90m/**
     * @param {string} url
     * @param {object} context (currently empty)
     * @param {function} defaultGetFormat
     * @returns {object} response
     * @returns {string} response.format
     */[39m
    [94mexport[39m [37masync[39m [94mfunction[39m [37mgetFormat[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetFormat[39m[90m)[39m [33m{[39m
      [94mif[39m [90m([39m[37msomeCondition[39m[90m)[39m [33m{[39m
        [90m// For some or all URLs, do some custom logic for determining format.[39m
        [90m// Always return an object of the form {format: <string>}, where the[39m
        [90m// format is one of the strings in the table above.[39m
        [31mreturn[39m [33m{[39m
          [37mformat[39m[93m:[39m [92m'module'[39m
        [33m}[39m[90m;[39m
      [33m}[39m
      [90m// Defer to Node.js for all other URLs.[39m
      [31mreturn[39m [37mdefaultGetFormat[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetFormat[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m#### [90m<code>[39m[32mgetSource[90m</code>[39m[32m hook[22m[39m

[90m[3m    [0mNote: The loaders API is being redesigned. This hook may disappear or its[0m[23m[39m
[90m[3m    [0msignature may change. Do not rely on the API described below.[0m[23m[39m

[0mThe [33mgetSource[39m hook provides a way to define a custom method for retrieving[0m
[0mthe source code of an ES module specifier. This would allow a loader to[0m
[0mpotentially avoid reading files from disk.[0m

    [90m/**
     * @param {string} url
     * @param {object} context
     * @param {string} context.format
     * @param {function} defaultGetSource
     * @returns {object} response
     * @returns {string|buffer} response.source
     */[39m
    [94mexport[39m [37masync[39m [94mfunction[39m [37mgetSource[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetSource[39m[90m)[39m [33m{[39m
      [94mconst[39m [33m{[39m [37mformat[39m [33m}[39m [93m=[39m [37mcontext[39m[90m;[39m
      [94mif[39m [90m([39m[37msomeCondition[39m[90m)[39m [33m{[39m
        [90m// For some or all URLs, do some custom logic for retrieving the source.[39m
        [90m// Always return an object of the form {source: <string|buffer>}.[39m
        [31mreturn[39m [33m{[39m
          [37msource[39m[93m:[39m [92m'...'[39m
        [33m}[39m[90m;[39m
      [33m}[39m
      [90m// Defer to Node.js for all other URLs.[39m
      [31mreturn[39m [37mdefaultGetSource[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetSource[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m#### [90m<code>[39m[32mtransformSource[90m</code>[39m[32m hook[22m[39m

[90m[3m    [0mNote: The loaders API is being redesigned. This hook may disappear or its[0m[23m[39m
[90m[3m    [0msignature may change. Do not rely on the API described below.[0m[23m[39m

[0mThe [33mtransformSource[39m hook provides a way to modify the source code of a loaded[0m
[0mES module file after the source string has been loaded but before Node.js has[0m
[0mdone anything with it.[0m

[0mIf this hook is used to convert unknown-to-Node.js file types into executable[0m
[0mJavaScript, a resolve hook is also necessary in order to register any[0m
[0munknown-to-Node.js file extensions. See the [34mtranspiler loader example ([34m[4m#esm_transpiler_loader[24m[39m[34m)[39m below.[0m

    [90m/**
     * @param {string|buffer} source
     * @param {object} context
     * @param {string} context.url
     * @param {string} context.format
     * @param {function} defaultTransformSource
     * @returns {object} response
     * @returns {string|buffer} response.source
     */[39m
    [94mexport[39m [37masync[39m [94mfunction[39m [37mtransformSource[39m[90m([39m[37msource[39m[32m,[39m
                                          [37mcontext[39m[32m,[39m
                                          [37mdefaultTransformSource[39m[90m)[39m [33m{[39m
      [94mconst[39m [33m{[39m [37murl[39m[32m,[39m [37mformat[39m [33m}[39m [93m=[39m [37mcontext[39m[90m;[39m
      [94mif[39m [90m([39m[37msomeCondition[39m[90m)[39m [33m{[39m
        [90m// For some or all URLs, do some custom logic for modifying the source.[39m
        [90m// Always return an object of the form {source: <string|buffer>}.[39m
        [31mreturn[39m [33m{[39m
          [37msource[39m[93m:[39m [92m'...'[39m
        [33m}[39m[90m;[39m
      [33m}[39m
      [90m// Defer to Node.js for all other sources.[39m
      [31mreturn[39m [37mdefaultTransformSource[39m[90m([39m
        [37msource[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultTransformSource[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m#### [90m<code>[39m[32mgetGlobalPreloadCode[90m</code>[39m[32m hook[22m[39m

[90m[3m    [0mNote: The loaders API is being redesigned. This hook may disappear or its[0m[23m[39m
[90m[3m    [0msignature may change. Do not rely on the API described below.[0m[23m[39m

[0mSometimes it can be necessary to run some code inside of the same global scope[0m
[0mthat the application will run in. This hook allows to return a string that will[0m
[0mbe ran as sloppy-mode script on startup.[0m

[0mSimilar to how CommonJS wrappers work, the code runs in an implicit function[0m
[0mscope. The only argument is a [33mrequire[39m-like function that can be used to load[0m
[0mbuiltins like "fs": [33mgetBuiltin(request: string)[39m.[0m

[0mIf the code needs more advanced [33mrequire[39m features, it will have to construct[0m
[0mits own [33mrequire[39m using  [33mmodule.createRequire()[39m.[0m

    [90m/**
     * @returns {string} Code to run before application startup
     */[39m
    [94mexport[39m [94mfunction[39m [37mgetGlobalPreloadCode[39m[90m([39m[90m)[39m [33m{[39m
      [31mreturn[39m `\
    globalThis.someInjectedProperty = 42;
    console.log('I just set some globals!');
    
    const { createRequire } = getBuiltin('module');
    
    const require = createRequire(process.cwd + '/<preload>');
    // [...]
    `[90m;[39m
    [33m}[39m

[32m[1m#### [90m<code>[39m[32mdynamicInstantiate[90m</code>[39m[32m hook[22m[39m

[90m[3m    [0mNote: The loaders API is being redesigned. This hook may disappear or its[0m[23m[39m
[90m[3m    [0msignature may change. Do not rely on the API described below.[0m[23m[39m

[0mTo create a custom dynamic module that doesn't correspond to one of the[0m
[0mexisting [33mformat[39m interpretations, the [33mdynamicInstantiate[39m hook can be used.[0m
[0mThis hook is called only for modules that return [33mformat: 'dynamic'[39m from[0m
[0mthe [34m[33mgetFormat[39m[34m hook ([34m[4m#esm_code_getformat_code_hook[24m[39m[34m)[39m.[0m

    [90m/**
     * @param {string} url
     * @returns {object} response
     * @returns {array} response.exports
     * @returns {function} response.execute
     */[39m
    [94mexport[39m [37masync[39m [94mfunction[39m [37mdynamicInstantiate[39m[90m([39m[37murl[39m[90m)[39m [33m{[39m
      [31mreturn[39m [33m{[39m
        [37mexports[39m[93m:[39m [33m[[39m[92m'customExportName'[39m[33m][39m[32m,[39m
        [37mexecute[39m[93m:[39m [90m([39m[37mexports[39m[90m)[39m [93m=>[39m [33m{[39m
          [90m// Get and set functions provided for pre-allocated export names[39m
          [37mexports[39m[32m.[39m[37mcustomExportName[39m[32m.[39m[37mset[39m[90m([39m[92m'value'[39m[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m[90m;[39m
    [33m}[39m

[0mWith the list of module exports provided upfront, the [33mexecute[39m function will[0m
[0mthen be called at the exact point of module evaluation order for that module[0m
[0min the import tree.[0m

[32m[1m### Examples[22m[39m

[0mThe various loader hooks can be used together to accomplish wide-ranging[0m
[0mcustomizations of Node.js’ code loading and evaluation behaviors.[0m

[32m[1m#### HTTPS loader[22m[39m

[0mIn current Node.js, specifiers starting with [33mhttps://[39m are unsupported. The[0m
[0mloader below registers hooks to enable rudimentary support for such specifiers.[0m
[0mWhile this may seem like a significant improvement to Node.js core[0m
[0mfunctionality, there are substantial downsides to actually using this loader:[0m
[0mperformance is much slower than loading files from disk, there is no caching,[0m
[0mand there is no security.[0m

    [90m// https-loader.mjs[39m
    [94mimport[39m [33m{[39m [37mget[39m [33m}[39m [37mfrom[39m [92m'api/source/https'[39m[90m;[39m
    
    [94mexport[39m [94mfunction[39m [37mresolve[39m[90m([39m[37mspecifier[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultResolve[39m[90m)[39m [33m{[39m
      [94mconst[39m [33m{[39m [37mparentURL[39m [93m=[39m [90mnull[39m [33m}[39m [93m=[39m [37mcontext[39m[90m;[39m
    
      [90m// Normally Node.js would error on specifiers starting with 'https://', so[39m
      [90m// this hook intercepts them and converts them into absolute URLs to be[39m
      [90m// passed along to the later hooks below.[39m
      [94mif[39m [90m([39m[37mspecifier[39m[32m.[39m[37mstartsWith[39m[90m([39m[92m'https://'[39m[90m)[39m[90m)[39m [33m{[39m
        [31mreturn[39m [33m{[39m
          [37murl[39m[93m:[39m [37mspecifier[39m
        [33m}[39m[90m;[39m
      [33m}[39m [94melse[39m [94mif[39m [90m([39m[37mparentURL[39m [93m&&[39m [37mparentURL[39m[32m.[39m[37mstartsWith[39m[90m([39m[92m'https://'[39m[90m)[39m[90m)[39m [33m{[39m
        [31mreturn[39m [33m{[39m
          [37murl[39m[93m:[39m [31mnew[39m [37mURL[39m[90m([39m[37mspecifier[39m[32m,[39m [37mparentURL[39m[90m)[39m[32m.[39m[37mhref[39m
        [33m}[39m[90m;[39m
      [33m}[39m
    
      [90m// Let Node.js handle all other specifiers.[39m
      [31mreturn[39m [37mdefaultResolve[39m[90m([39m[37mspecifier[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultResolve[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mexport[39m [94mfunction[39m [37mgetFormat[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetFormat[39m[90m)[39m [33m{[39m
      [90m// This loader assumes all network-provided JavaScript is ES module code.[39m
      [94mif[39m [90m([39m[37murl[39m[32m.[39m[37mstartsWith[39m[90m([39m[92m'https://'[39m[90m)[39m[90m)[39m [33m{[39m
        [31mreturn[39m [33m{[39m
          [37mformat[39m[93m:[39m [92m'module'[39m
        [33m}[39m[90m;[39m
      [33m}[39m
    
      [90m// Let Node.js handle all other URLs.[39m
      [31mreturn[39m [37mdefaultGetFormat[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetFormat[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mexport[39m [94mfunction[39m [37mgetSource[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetSource[39m[90m)[39m [33m{[39m
      [90m// For JavaScript to be loaded over the network, we need to fetch and[39m
      [90m// return it.[39m
      [94mif[39m [90m([39m[37murl[39m[32m.[39m[37mstartsWith[39m[90m([39m[92m'https://'[39m[90m)[39m[90m)[39m [33m{[39m
        [31mreturn[39m [31mnew[39m [37mPromise[39m[90m([39m[90m([39m[37mresolve[39m[32m,[39m [37mreject[39m[90m)[39m [93m=>[39m [33m{[39m
          [37mget[39m[90m([39m[37murl[39m[32m,[39m [90m([39m[37mres[39m[90m)[39m [93m=>[39m [33m{[39m
            [94mlet[39m [37mdata[39m [93m=[39m [92m''[39m[90m;[39m
            [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mchunk[39m[90m)[39m [93m=>[39m [37mdata[39m [93m+=[39m [37mchunk[39m[90m)[39m[90m;[39m
            [37mres[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [37mresolve[39m[90m([39m[33m{[39m [37msource[39m[93m:[39m [37mdata[39m [33m}[39m[90m)[39m[90m)[39m[90m;[39m
          [33m}[39m[90m)[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [37mreject[39m[90m([39m[37merr[39m[90m)[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m
    
      [90m// Let Node.js handle all other URLs.[39m
      [31mreturn[39m [37mdefaultGetSource[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetSource[39m[90m)[39m[90m;[39m
    [33m}[39m

    [90m// main.mjs[39m
    [94mimport[39m [33m{[39m [37mVERSION[39m [33m}[39m [37mfrom[39m [92m'https://coffeescript.org/browser-compiler-modern/coffeescript.js'[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mVERSION[39m[90m)[39m[90m;[39m

[0mWith this loader, running:[0m

    [33mnode --experimental-loader ./https-loader.mjs ./main.js[39m

[0mWill print the current version of CoffeeScript per the module at the URL in[0m
[0m[33mmain.mjs[39m.[0m

[32m[1m#### Transpiler loader[22m[39m

[0mSources that are in formats Node.js doesn’t understand can be converted into[0m
[0mJavaScript using the [34m[33mtransformSource[39m[34m hook ([34m[4m#esm_code_transformsource_code_hook[24m[39m[34m)[39m. Before that hook gets called,[0m
[0mhowever, other hooks need to tell Node.js not to throw an error on unknown file[0m
[0mtypes; and to tell Node.js how to load this new file type.[0m

[0mThis is less performant than transpiling source files before running[0m
[0mNode.js; a transpiler loader should only be used for development and testing[0m
[0mpurposes.[0m

    [90m// coffeescript-loader.mjs[39m
    [94mimport[39m [33m{[39m [37mURL[39m[32m,[39m [37mpathToFileURL[39m [33m}[39m [37mfrom[39m [92m'api/source/url'[39m[90m;[39m
    [94mimport[39m [37mCoffeeScript[39m [37mfrom[39m [92m'coffeescript'[39m[90m;[39m
    
    [94mconst[39m [37mbaseURL[39m [93m=[39m [37mpathToFileURL[39m[90m([39m`${[37mprocess[39m[32m.[39m[37mcwd[39m[90m([39m[90m)[39m}/`[90m)[39m[32m.[39m[37mhref[39m[90m;[39m
    
    [90m// CoffeeScript files end in .coffee, .litcoffee or .coffee.md.[39m
    [94mconst[39m [37mextensionsRegex[39m [93m=[39m /\.coffee$|\.litcoffee$|\.coffee\.md$/[90m;[39m
    
    [94mexport[39m [94mfunction[39m [37mresolve[39m[90m([39m[37mspecifier[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultResolve[39m[90m)[39m [33m{[39m
      [94mconst[39m [33m{[39m [37mparentURL[39m [93m=[39m [37mbaseURL[39m [33m}[39m [93m=[39m [37mcontext[39m[90m;[39m
    
      [90m// Node.js normally errors on unknown file extensions, so return a URL for[39m
      [90m// specifiers ending in the CoffeeScript file extensions.[39m
      [94mif[39m [90m([39m[37mextensionsRegex[39m[32m.[39m[37mtest[39m[90m([39m[37mspecifier[39m[90m)[39m[90m)[39m [33m{[39m
        [31mreturn[39m [33m{[39m
          [37murl[39m[93m:[39m [31mnew[39m [37mURL[39m[90m([39m[37mspecifier[39m[32m,[39m [37mparentURL[39m[90m)[39m[32m.[39m[37mhref[39m
        [33m}[39m[90m;[39m
      [33m}[39m
    
      [90m// Let Node.js handle all other specifiers.[39m
      [31mreturn[39m [37mdefaultResolve[39m[90m([39m[37mspecifier[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultResolve[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mexport[39m [94mfunction[39m [37mgetFormat[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetFormat[39m[90m)[39m [33m{[39m
      [90m// Now that we patched resolve to let CoffeeScript URLs through, we need to[39m
      [90m// tell Node.js what format such URLs should be interpreted as. For the[39m
      [90m// purposes of this loader, all CoffeeScript URLs are ES modules.[39m
      [94mif[39m [90m([39m[37mextensionsRegex[39m[32m.[39m[37mtest[39m[90m([39m[37murl[39m[90m)[39m[90m)[39m [33m{[39m
        [31mreturn[39m [33m{[39m
          [37mformat[39m[93m:[39m [92m'module'[39m
        [33m}[39m[90m;[39m
      [33m}[39m
    
      [90m// Let Node.js handle all other URLs.[39m
      [31mreturn[39m [37mdefaultGetFormat[39m[90m([39m[37murl[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultGetFormat[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mexport[39m [94mfunction[39m [37mtransformSource[39m[90m([39m[37msource[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultTransformSource[39m[90m)[39m [33m{[39m
      [94mconst[39m [33m{[39m [37murl[39m[32m,[39m [37mformat[39m [33m}[39m [93m=[39m [37mcontext[39m[90m;[39m
    
      [94mif[39m [90m([39m[37mextensionsRegex[39m[32m.[39m[37mtest[39m[90m([39m[37murl[39m[90m)[39m[90m)[39m [33m{[39m
        [31mreturn[39m [33m{[39m
          [37msource[39m[93m:[39m [37mCoffeeScript[39m[32m.[39m[37mcompile[39m[90m([39m[37msource[39m[32m,[39m [33m{[39m [37mbare[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m
        [33m}[39m[90m;[39m
      [33m}[39m
    
      [90m// Let Node.js handle all other sources.[39m
      [31mreturn[39m [37mdefaultTransformSource[39m[90m([39m[37msource[39m[32m,[39m [37mcontext[39m[32m,[39m [37mdefaultTransformSource[39m[90m)[39m[90m;[39m
    [33m}[39m

    [33m# main.coffee[39m
    [33mimport { scream } from './scream.coffee'[39m
    [33mconsole.log scream 'hello, world'[39m
    [33m[39m
    [33mimport { version } from 'api/source/process'[39m
    [33mconsole.log "Brought to you by Node.js version #{version}"[39m

    [33m# scream.coffee[39m
    [33mexport scream = (str) -> str.toUpperCase()[39m

[0mWith this loader, running:[0m

    [33mnode --experimental-loader ./coffeescript-loader.mjs main.coffee[39m

[0mWill cause [33mmain.coffee[39m to be turned into JavaScript after its source code is[0m
[0mloaded from disk but before Node.js executes it; and so on for any [33m.coffee[39m,[0m
[0m[33m.litcoffee[39m or [33m.coffee.md[39m files referenced via [33mimport[39m statements of any[0m
[0mloaded file.[0m

[32m[1m## Resolution Algorithm[22m[39m

[32m[1m### Features[22m[39m

[0mThe resolver has the following properties:[0m

    * [0mFileURL-based resolution as is used by ES modules[0m
    * [0mSupport for builtin module loading[0m
    * [0mRelative and absolute URL resolution[0m
    * [0mNo default extensions[0m
    * [0mNo folder mains[0m
    * [0mBare specifier package resolution lookup through node_modules[0m

[32m[1m### Resolver Algorithm[22m[39m

[0mThe algorithm to load an ES module specifier is given through the[0m
[0m[1mESM_RESOLVE[22m method below. It returns the resolved URL for a[0m
[0mmodule specifier relative to a parentURL.[0m

[0mThe algorithm to determine the module format of a resolved URL is[0m
[0mprovided by [1mESM_FORMAT[22m, which returns the unique module[0m
[0mformat for any file. The [3m"module"[23m format is returned for an ECMAScript[0m
[0mModule, while the [3m"commonjs"[23m format is used to indicate loading through the[0m
[0mlegacy CommonJS loader. Additional formats such as [3m"addon"[23m can be extended in[0m
[0mfuture updates.[0m

[0mIn the following algorithms, all subroutine errors are propagated as errors[0m
[0mof these top-level routines unless stated otherwise.[0m

[0m[3mdefaultEnv[23m is the conditional environment name priority array,[0m
[0m[33m["node", "import"][39m.[0m

[0mThe resolver can throw the following errors:[0m

    * [0m[3mInvalid Module Specifier[23m: Module specifier is an invalid URL, package name[0m
      [0mor package subpath specifier.[0m
    * [0m[3mInvalid Package Configuration[23m: package.json configuration is invalid or[0m
      [0mcontains an invalid configuration.[0m
    * [0m[3mInvalid Package Target[23m: Package exports define a target module within the[0m
      [0mpackage that is an invalid type or string target.[0m
    * [0m[3mPackage Path Not Exported[23m: Package exports do not define or permit a target[0m
      [0msubpath in the package for the given module.[0m
    * [0m[3mModule Not Found[23m: The package or module requested does not exist.[0m

[90m<details>[39m
[90m<summary>Resolver algorithm specification</summary>[39m
[90m[39m
[90m[39m[0m[1mESM_RESOLVE[22m([3mspecifier_, _parentURL[23m)[0m

[90m[3m    1. [0mLet [3mresolvedURL[23m[3m be [1mundefined[22m.[0m[23m[39m
[90m[3m        2. [0mIf [3mspecifier[23m[3m is a valid URL, then[23m[39m
[90m[3m            1. [0m[0mSet [3mresolvedURL[23m[3m to the result of parsing and reserializing[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[3mspecifier[23m[3m as a URL.[0m[0m[0m[23m[39m
[90m[3m        3. [0mOtherwise, if [3mspecifier[23m[3m starts with _"/"_, then[23m[39m
[90m[3m            1. [0m[0mThrow an [3mInvalid Module Specifier[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        4. [0mOtherwise, if [3mspecifier[23m[3m starts with [3m"./"[23m[3m or _"../"_, then[23m[39m
[90m[3m            1. [0m[0mSet [3mresolvedURL[23m[3m to the URL resolution of [3mspecifier[23m[3m relative to[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[3mparentURL[23m[3m.[0m[0m[0m[23m[39m
[90m[3m        5. [0mOtherwise,[23m[39m
[90m[3m            1. [0m[0mNote: [3mspecifier[23m[3m is now a bare specifier.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mSet [3mresolvedURL[23m[3m the result of[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[1mPACKAGE_RESOLVE[22m([3mspecifier_, _parentURL[23m[3m).[0m[0m[0m[23m[39m
[90m[3m        6. [0mIf [3mresolvedURL[23m[3m contains any percent encodings of [3m"/"[23m[3m or [3m"\"[23m[3m ([3m"%2f"[23m[3m[0m[23m[39m
[90m[3m           [0mand [3m"%5C"[23m[3m respectively), then[23m[39m
[90m[3m            1. [0m[0mThrow an [3mInvalid Module Specifier[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        7. [0mIf [3mresolvedURL[23m[3m does not end with a trailing [3m"/"[23m[3m and the file at[0m[23m[39m
[90m[3m           [0m[3mresolvedURL[23m[3m does not exist, then[23m[39m
[90m[3m            1. [0m[0mThrow a [3mModule Not Found[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        8. [0mSet [3mresolvedURL[23m[3m to the real path of [3mresolvedURL[23m[3m.[0m[23m[39m
[90m[3m        9. [0mLet [3mformat[23m[3m be the result of [1mESM_FORMAT[22m([3mresolvedURL[23m[3m).[0m[23m[39m
[90m[3m        10. [0mLoad [3mresolvedURL[23m[3m as module format, [3mformat[23m[3m.[0m[23m[39m
[90m[3m        11. [0mReturn [3mresolvedURL[23m[3m.[0m[23m[39m

[0m[1mPACKAGE_RESOLVE[22m([3mpackageSpecifier_, _parentURL[23m)[0m

[90m[3m    1. [0mLet [3mpackageName[23m[3m be [3mundefined[23m[3m.[0m[23m[39m
[90m[3m        2. [0mLet [3mpackageSubpath[23m[3m be [3mundefined[23m[3m.[0m[23m[39m
[90m[3m        3. [0mIf [3mpackageSpecifier[23m[3m is an empty string, then[23m[39m
[90m[3m            1. [0m[0mThrow an [3mInvalid Module Specifier[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        4. [0mOtherwise,[23m[39m
[90m[3m            1. [0m[0mIf [3mpackageSpecifier[23m[3m does not contain a [3m"/"[23m[3m separator, then[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mThrow an [3mInvalid Module Specifier[23m[3m error.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mSet [3mpackageName[23m[3m to the substring of [3mpackageSpecifier[23m[3m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0muntil the second [3m"/"[23m[3m separator or the end of the string.[0m[0m[0m[23m[39m
[90m[3m        5. [0mIf [3mpackageName[23m[3m starts with [3m"."[23m[3m or contains [3m"\"[23m[3m or _"%"_, then[23m[39m
[90m[3m            1. [0m[0mThrow an [3mInvalid Module Specifier[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        6. [0mLet [3mpackageSubpath[23m[3m be [3mundefined[23m[3m.[0m[23m[39m
[90m[3m        7. [0mIf the length of [3mpackageSpecifier[23m[3m is greater than the length of[0m[23m[39m
[90m[3m           [0m_packageName_, then[23m[39m
[90m[3m            1. [0m[0mSet [3mpackageSubpath[23m[3m to [3m"."[23m[3m concatenated with the substring of[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[3mpackageSpecifier[23m[3m from the position at the length of [3mpackageName[23m[3m.[0m[0m[0m[23m[39m
[90m[3m        8. [0mIf [3mpackageSubpath[23m[3m contains any [3m"."[23m[3m or [3m".."[23m[3m segments or percent[0m[23m[39m
[90m[3m           [0mencoded strings for [3m"/"[23m[3m or _"\"_, then[23m[39m
[90m[3m            1. [0m[0mThrow an [3mInvalid Module Specifier[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        9. [0mSet [3mselfUrl[23m[3m to the result of[0m[23m[39m
[90m[3m           [0m[1mSELF_REFERENCE_RESOLVE[22m([3mpackageName_, _packageSubpath_, _parentURL[23m[3m).[0m[23m[39m
[90m[3m        10. [0mIf [3mselfUrl[23m[3m isn't empty, return [3mselfUrl[23m[3m.[0m[23m[39m
[90m[3m        11. [0mIf [3mpackageSubpath[23m[3m is [3mundefined[23m[3m and [3mpackageName[23m[3m is a Node.js builtin[0m[23m[39m
[90m[3m            [0mmodule, then[23m[39m
[90m[3m            1. [0m[0mReturn the string [3m"nodejs:"[23m[3m concatenated with [3mpackageSpecifier[23m[3m.[0m[0m[0m[23m[39m
[90m[3m        12. [0mWhile [3mparentURL[23m[3m is not the file system root,[23m[39m
[90m[3m            1. [0m[0mLet [3mpackageURL[23m[3m be the URL resolution of [3m"node_modules/"[23m[3m[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0mconcatenated with [3mpackageSpecifier_, relative to _parentURL[23m[3m.[0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m            2. [0m[0mSet [3mparentURL[23m[3m to the parent folder URL of [3mparentURL[23m[3m.[0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m            3. [0m[0mIf the folder at [3mpackageURL[23m[3m does not exist, then[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mSet [3mparentURL[23m[3m to the parent URL path of [3mparentURL[23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m                2. [0m[0m[0m[0mContinue the next loop iteration.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m            4. [0m[0mLet [3mpjson[23m[3m be the result of [1mREAD_PACKAGE_JSON[22m([3mpackageURL[23m[3m).[0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m            5. [0m[0mIf [3mpackageSubpath[23m[3m is equal to _"./"_, then[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mReturn [3mpackageURL[23m[3m + [3m"/"[23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m            6. [0m[0mIf [3mpackageSubpath[23m[3m is _undefined__, then[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mReturn the result of [1mPACKAGE_MAIN_RESOLVE[22m(_packageURL_,[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0m       [0m[0m[0m[0m[3mpjson[23m[3m).[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m            7. [0m[0mOtherwise,[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mIf [3mpjson[23m[3m is not [1mnull[22m and [3mpjson[23m[3m has an [3m"exports"[23m[3m key, then[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m                    1. [0m[0m[0m[0m[0m[0m[0m[0mLet [3mexports[23m[3m be [3mpjson.exports[23m[3m.[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0m       [0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m                    2. [0m[0m[0m[0m[0m[0m[0m[0mIf [3mexports[23m[3m is not [1mnull[22m or [1mundefined[22m, then[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0m       [0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m                        1. [0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0mReturn [1mPACKAGE_EXPORTS_RESOLVE[22m(_packageURL_,[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0m       [0m[0m[0m[0m       [0m[0m[0m[0m[0m[0m[0m[0m       [0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[3mpackageSubpath_, _pjson.exports[23m[3m).[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m            [0m       [0m[0m[0m[23m[39m
[90m[3m            [0m[23m[39m
[90m[3m                2. [0m[0m[0m[0mReturn the URL resolution of [3mpackageSubpath[23m[3m in [3mpackageURL[23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m        13. [0mThrow a [3mModule Not Found[23m[3m error.[0m[23m[39m

[0m[1mSELF_REFERENCE_RESOLVE[22m([3mpackageName_, _packageSubpath_, _parentURL[23m)[0m

[90m[3m    1. [0mLet [3mpackageURL[23m[3m be the result of [1mREAD_PACKAGE_SCOPE[22m([3mparentURL[23m[3m).[0m[23m[39m
[90m[3m        2. [0mIf [3mpackageURL[23m[3m is [1mnull[22m, then[23m[39m
[90m[3m            1. [0m[0mReturn [1mundefined[22m.[0m[0m[0m[23m[39m
[90m[3m        3. [0mLet [3mpjson[23m[3m be the result of [1mREAD_PACKAGE_JSON[22m([3mpackageURL[23m[3m).[0m[23m[39m
[90m[3m        4. [0mIf [3mpjson[23m[3m does not include an [3m"exports"[23m[3m property, then[23m[39m
[90m[3m            1. [0m[0mReturn [1mundefined[22m.[0m[0m[0m[23m[39m
[90m[3m        5. [0mIf [3mpjson.name[23m[3m is equal to _packageName_, then[23m[39m
[90m[3m            1. [0m[0mIf [3mpackageSubpath[23m[3m is equal to _"./"_, then[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mReturn [3mpackageURL[23m[3m + [3m"/"[23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mIf [3mpackageSubpath[23m[3m is _undefined_, then[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mReturn the result of [1mPACKAGE_MAIN_RESOLVE[22m([3mpackageURL_, _pjson[23m[3m).[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            3. [0m[0mOtherwise,[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mIf [3mpjson[23m[3m is not [1mnull[22m and [3mpjson[23m[3m has an [3m"exports"[23m[3m key, then[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                    1. [0m[0m[0m[0m[0m[0m[0m[0mLet [3mexports[23m[3m be [3mpjson.exports[23m[3m.[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                    2. [0m[0m[0m[0m[0m[0m[0m[0mIf [3mexports[23m[3m is not [1mnull[22m or [1mundefined[22m, then[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                        1. [0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0mReturn [1mPACKAGE_EXPORTS_RESOLVE[22m(_packageURL_, _subpath_,[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m       [0m[0m[0m[0m[0m[0m[0m[0m       [0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[3mpjson.exports[23m[3m).[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                2. [0m[0m[0m[0mReturn the URL resolution of [3msubpath[23m[3m in [3mpackageURL[23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m        6. [0mOtherwise, return [1mundefined[22m.[0m[23m[39m

[0m[1mPACKAGE_MAIN_RESOLVE[22m([3mpackageURL_, _pjson[23m)[0m

[90m[3m    1. [0mIf [3mpjson[23m[3m is [1mnull[22m, then[23m[39m
[90m[3m            1. [0m[0mThrow a [3mModule Not Found[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        2. [0mIf [3mpjson.exports[23m[3m is not [1mnull[22m or [1mundefined[22m, then[23m[39m
[90m[3m            1. [0m[0mIf [3mexports[23m[3m is an Object with both a key starting with [3m"."[23m[3m and a key[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0mnot starting with [3m"."_, throw an _Invalid Package Configuration[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mIf [3mpjson.exports[23m[3m is a String or Array, or an Object containing no[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0mkeys starting with _"."_, then[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mReturn [1mPACKAGE_EXPORTS_TARGET_RESOLVE[22m(_packageURL_,[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[3mpjson.exports_, _""[23m[3m).[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            3. [0m[0mIf [3mpjson.exports[23m[3m is an Object containing a [3m"."[23m[3m property, then[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mLet [3mmainExport[23m[3m be the [3m"."[23m[3m property in [3mpjson.exports[23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                2. [0m[0m[0m[0mReturn [1mPACKAGE_EXPORTS_TARGET_RESOLVE[22m(_packageURL_,[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[3mmainExport_, _""[23m[3m).[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            4. [0m[0mThrow a [3mPackage Path Not Exported[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        3. [0mIf [3mpjson.main[23m[3m is a String, then[23m[39m
[90m[3m            1. [0m[0mLet [3mresolvedMain[23m[3m be the URL resolution of _packageURL_, "/", and[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[3mpjson.main[23m[3m.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mIf the file at [3mresolvedMain[23m[3m exists, then[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mReturn [3mresolvedMain[23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m        4. [0mIf [3mpjson.type[23m[3m is equal to _"module"_, then[23m[39m
[90m[3m            1. [0m[0mThrow a [3mModule Not Found[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        5. [0mLet [3mlegacyMainURL[23m[3m be the result applying the legacy[0m[23m[39m
[90m[3m           [0m[1mLOAD_AS_DIRECTORY[22m CommonJS resolver to _packageURL_, throwing a[0m[23m[39m
[90m[3m           [0m[3mModule Not Found[23m[3m error for no resolution.[0m[23m[39m
[90m[3m        6. [0mReturn [3mlegacyMainURL[23m[3m.[0m[23m[39m

[0m[1mPACKAGE_EXPORTS_RESOLVE[22m([3mpackageURL_, _packagePath_, _exports[23m)[0m

[90m[3m    1. [0mIf [3mexports[23m[3m is an Object with both a key starting with [3m"."[23m[3m and a key not[0m[23m[39m
[90m[3m           [0mstarting with [3m"."_, throw an _Invalid Package Configuration[23m[3m error.[0m[23m[39m
[90m[3m        2. [0mIf [3mexports[23m[3m is an Object and all keys of [3mexports[23m[3m start with _"."_, then[23m[39m
[90m[3m            1. [0m[0mSet [3mpackagePath[23m[3m to [3m"./"[23m[3m concatenated with [3mpackagePath[23m[3m.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mIf [3mpackagePath[23m[3m is a key of _exports_, then[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mLet [3mtarget[23m[3m be the value of [3mexports[packagePath][23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                2. [0m[0m[0m[0mReturn [1mPACKAGE_EXPORTS_TARGET_RESOLVE[22m(_packageURL_, _target_,[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[3m""_, _defaultEnv[23m[3m).[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            3. [0m[0mLet [3mdirectoryKeys[23m[3m be the list of keys of [3mexports[23m[3m ending in[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m_"/"_, sorted by length descending.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            4. [0m[0mFor each key [3mdirectory[23m[3m in _directoryKeys_, do[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mIf [3mpackagePath[23m[3m starts with _directory_, then[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                    1. [0m[0m[0m[0m[0m[0m[0m[0mLet [3mtarget[23m[3m be the value of [3mexports[directory][23m[3m.[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                    2. [0m[0m[0m[0m[0m[0m[0m[0mLet [3msubpath[23m[3m be the substring of [3mtarget[23m[3m starting at the index[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m       [0m[0m[0m[0m[0m[0m[0m[0mof the length of [3mdirectory[23m[3m.[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                    3. [0m[0m[0m[0m[0m[0m[0m[0mReturn [1mPACKAGE_EXPORTS_TARGET_RESOLVE[22m(_packageURL_, _target_,[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m       [0m[0m[0m[0m[0m[0m[0m[0m[3msubpath_, _defaultEnv[23m[3m).[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m        3. [0mThrow a [3mPackage Path Not Exported[23m[3m error.[0m[23m[39m

[0m[1mPACKAGE_EXPORTS_TARGET_RESOLVE[22m([3mpackageURL_, _target_, _subpath_, _env[23m)[0m

[90m[3m    1. [0mIf [3mtarget[23m[3m is a String, then[23m[39m
[90m[3m            1. [0m[0mIf [3mtarget[23m[3m does not start with [3m"./"[23m[3m or contains any [3m"node_modules"[23m[3m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0msegments including [3m"node_modules"[23m[3m percent-encoding, throw an[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[3mInvalid Package Target[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mLet [3mresolvedTarget[23m[3m be the URL resolution of the concatenation of[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[3mpackageURL[23m[3m and [3mtarget[23m[3m.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            3. [0m[0mIf [3mresolvedTarget[23m[3m is not contained in _packageURL_, throw an[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[3mInvalid Package Target[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            4. [0m[0mIf [3msubpath[23m[3m has non-zero length and [3mtarget[23m[3m does not end with _"/"_,[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0mthrow an [3mInvalid Module Specifier[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            5. [0m[0mLet [3mresolved[23m[3m be the URL resolution of the concatenation of[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[3msubpath[23m[3m and [3mresolvedTarget[23m[3m.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            6. [0m[0mIf [3mresolved[23m[3m is not contained in _resolvedTarget_, throw an[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[3mInvalid Module Specifier[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            7. [0m[0mReturn [3mresolved[23m[3m.[0m[0m[0m[23m[39m
[90m[3m        2. [0mOtherwise, if [3mtarget[23m[3m is a non-null Object, then[23m[39m
[90m[3m            1. [0m[0mIf [3mexports[23m[3m contains any index property keys, as defined in ECMA-262[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[34m6.1.7 Array Index ([34m[4mhttps://tc39.es/ecma262/#integer-index[24m[39m[90m[34m)[39m[90m, throw an [3mInvalid Package Configuration[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mFor each property [3mp[23m[3m of _target_, in object insertion order as,[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mIf [3mp[23m[3m equals [3m"default"[23m[3m or [3menv[23m[3m contains an entry for [3mp[23m[3m, then[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                    1. [0m[0m[0m[0m[0m[0m[0m[0mLet [3mtargetValue[23m[3m be the value of the [3mp[23m[3m property in [3mtarget[23m[3m.[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                    2. [0m[0m[0m[0m[0m[0m[0m[0mReturn the result of [1mPACKAGE_EXPORTS_TARGET_RESOLVE[22m([0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m       [0m[0m[0m[0m[0m[0m[0m[0m[3mpackageURL_, _targetValue_, _subpath_, _env[23m[3m), continuing the[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m       [0m[0m[0m[0m[0m[0m[0m[0mloop on any [3mPackage Path Not Exported[23m[3m error.[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            3. [0m[0mThrow a [3mPackage Path Not Exported[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        3. [0mOtherwise, if [3mtarget[23m[3m is an Array, then[23m[39m
[90m[3m            1. [0m[0mIf [3mtarget.length is zero, throw an _Invalid Package Target[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mFor each item [3mtargetValue[23m[3m in _target_, do[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mIf [3mtargetValue[23m[3m is an Array, continue the loop.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                2. [0m[0m[0m[0mReturn the result of [1mPACKAGE_EXPORTS_TARGET_RESOLVE[22m(_packageURL_,[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[3mtargetValue_, _subpath_, _env[23m[3m), continuing the loop on any[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m       [0m[0m       [0m[0m[0m[0m[3mPackage Path Not Exported[23m[3m or [3mInvalid Package Target[23m[3m error.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            3. [0m[0mThrow the last fallback resolution error.[0m[0m[0m[23m[39m
[90m[3m        4. [0mOtherwise throw an [3mInvalid Package Target[23m[3m error.[0m[23m[39m

[0m[1mESM_FORMAT[22m([3murl[23m)[0m

[90m[3m    1. [0mAssert: [3murl[23m[3m corresponds to an existing file.[0m[23m[39m
[90m[3m        2. [0mLet [3mpjson[23m[3m be the result of [1mREAD_PACKAGE_SCOPE[22m([3murl[23m[3m).[0m[23m[39m
[90m[3m        3. [0mIf [3murl[23m[3m ends in _".mjs"_, then[23m[39m
[90m[3m            1. [0m[0mReturn [3m"module"[23m[3m.[0m[0m[0m[23m[39m
[90m[3m        4. [0mIf [3murl[23m[3m ends in _".cjs"_, then[23m[39m
[90m[3m            1. [0m[0mReturn [3m"commonjs"[23m[3m.[0m[0m[0m[23m[39m
[90m[3m        5. [0mIf [3mpjson?.type[23m[3m exists and is _"module"_, then[23m[39m
[90m[3m            1. [0m[0mIf [3murl[23m[3m ends in _".js"_, then[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mReturn [3m"module"[23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mThrow an [3mUnsupported File Extension[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        6. [0mOtherwise,[23m[39m
[90m[3m            1. [0m[0mThrow an [3mUnsupported File Extension[23m[3m error.[0m[0m[0m[23m[39m

[0m[1mREAD_PACKAGE_SCOPE[22m([3murl[23m)[0m

[90m[3m    1. [0mLet [3mscopeURL[23m[3m be [3murl[23m[3m.[0m[23m[39m
[90m[3m        2. [0mWhile [3mscopeURL[23m[3m is not the file system root,[23m[39m
[90m[3m            1. [0m[0mIf [3mscopeURL[23m[3m ends in a [3m"node_modules"[23m[3m path segment, return [1mnull[22m.[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            2. [0m[0mLet [3mpjson[23m[3m be the result of [1mREAD_PACKAGE_JSON[22m([3mscopeURL[23m[3m).[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            3. [0m[0mIf [3mpjson[23m[3m is not [1mnull[22m, then[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m                1. [0m[0m[0m[0mReturn [3mpjson[23m[3m.[0m[0m[0m[0m[0m[0m[0m[23m[39m
[90m[3m           [0m[23m[39m
[90m[3m            4. [0m[0mSet [3mscopeURL[23m[3m to the parent URL of [3mscopeURL[23m[3m.[0m[0m[0m[23m[39m
[90m[3m        3. [0mReturn [1mnull[22m.[0m[23m[39m

[0m[1mREAD_PACKAGE_JSON[22m([3mpackageURL[23m)[0m

[90m[3m    1. [0mLet [3mpjsonURL[23m[3m be the resolution of [3m"package.json"[23m[3m within [3mpackageURL[23m[3m.[0m[23m[39m
[90m[3m        2. [0mIf the file at [3mpjsonURL[23m[3m does not exist, then[23m[39m
[90m[3m            1. [0m[0mReturn [1mnull[22m.[0m[0m[0m[23m[39m
[90m[3m        3. [0mIf the file at [3mpackageURL[23m[3m does not parse as valid JSON, then[23m[39m
[90m[3m            1. [0m[0mThrow an [3mInvalid Package Configuration[23m[3m error.[0m[0m[0m[23m[39m
[90m[3m        4. [0mReturn the parsed JSON source of the file at [3mpjsonURL[23m[3m.[0m[23m[39m

[90m</details>[39m
[90m[39m
[90m[39m[32m[1m### Customizing ESM specifier resolution algorithm[22m[39m

[0mThe current specifier resolution does not support all default behavior of[0m
[0mthe CommonJS loader. One of the behavior differences is automatic resolution[0m
[0mof file extensions and the ability to import directories that have an index[0m
[0mfile.[0m

[0mThe [33m--experimental-specifier-resolution=[mode][39m flag can be used to customize[0m
[0mthe extension resolution algorithm. The default mode is [33mexplicit[39m, which[0m
[0mrequires the full path to a module be provided to the loader. To enable the[0m
[0mautomatic extension resolution and importing from directories that include an[0m
[0mindex file use the [33mnode[39m mode.[0m

    [33m$ node index.mjs[39m
    [33msuccess![39m
    [33m$ node index # Failure![39m
    [33mError: Cannot find module[39m
    [33m$ node --experimental-specifier-resolution=node index[39m
    [33msuccess![39m

