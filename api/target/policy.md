[35m[4m[1m# Policies[22m[24m[39m

[90m<!--introduced_in=v11.8.0-->[39m
[90m[39m[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[90m<!-- name=policy -->[39m
[90m[39m
[90m[39m[0mNode.js contains experimental support for creating policies on loading code.[0m

[0mPolicies are a security feature intended to allow guarantees[0m
[0mabout what code Node.js is able to load. The use of policies assumes[0m
[0msafe practices for the policy files such as ensuring that policy[0m
[0mfiles cannot be overwritten by the Node.js application by using[0m
[0mfile permissions.[0m

[0mA best practice would be to ensure that the policy manifest is read only for[0m
[0mthe running Node.js application, and that the file cannot be changed[0m
[0mby the running Node.js application in any way. A typical setup would be to[0m
[0mcreate the policy file as a different user id than the one running Node.js[0m
[0mand granting read permissions to the user id running Node.js.[0m

[32m[1m## Enabling[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mThe [33m--experimental-policy[39m flag can be used to enable features for policies[0m
[0mwhen loading modules.[0m

[0mOnce this has been set, all modules must conform to a policy manifest file[0m
[0mpassed to the flag:[0m

    [33mnode --experimental-policy=policy.json app.js[39m

[0mThe policy manifest will be used to enforce constraints on code loaded by[0m
[0mNode.js.[0m

[0mTo mitigate tampering with policy files on disk, an integrity for[0m
[0mthe policy file itself may be provided via [33m--policy-integrity[39m.[0m
[0mThis allows running [33mnode[39m and asserting the policy file contents[0m
[0meven if the file is changed on disk.[0m

    [33mnode --experimental-policy=policy.json --policy-integrity="sha384-SggXRQHwCG8g+DktYYzxkXRIkTiEYWBHqev0xnpCxYlqMBufKZHAHQM3/boDaI/0" app.js[39m

[32m[1m## Features[22m[39m

[32m[1m### Error Behavior[22m[39m

[0mWhen a policy check fails, Node.js by default will throw an error.[0m
[0mIt is possible to change the error behavior to one of a few possibilities[0m
[0mby defining an "onerror" field in a policy manifest. The following values are[0m
[0mavailable to change the behavior:[0m

    * [0m[33m"exit"[39m: will exit the process immediately.[0m
      [0m  No cleanup code will be allowed to run.[0m
    * [0m[33m"log"[39m: will log the error at the site of the failure.[0m
    * [0m[33m"throw"[39m: will throw a JS error at the site of the failure. This is the[0m
      [0mdefault.[0m

    [33m{[39m
    [33m  "onerror": "log",[39m
    [33m  "resources": {[39m
    [33m    "./app/checked.js": {[39m
    [33m      "integrity": "sha384-SggXRQHwCG8g+DktYYzxkXRIkTiEYWBHqev0xnpCxYlqMBufKZHAHQM3/boDaI/0"[39m
    [33m    }[39m
    [33m  }[39m
    [33m}[39m

[32m[1m### Integrity Checks[22m[39m

[0mPolicy files must use integrity checks with Subresource Integrity strings[0m
[0mcompatible with the browser[0m
[0m[34mintegrity attribute ([34m[4mhttps://www.w3.org/TR/SRI/#the-integrity-attribute[24m[39m[34m)[39m[0m
[0massociated with absolute URLs.[0m

[0mWhen using [33mrequire()[39m all resources involved in loading are checked for[0m
[0mintegrity if a policy manifest has been specified. If a resource does not match[0m
[0mthe integrity listed in the manifest, an error will be thrown.[0m

[0mAn example policy file that would allow loading a file [33mchecked.js[39m:[0m

    [33m{[39m
    [33m  "resources": {[39m
    [33m    "./app/checked.js": {[39m
    [33m      "integrity": "sha384-SggXRQHwCG8g+DktYYzxkXRIkTiEYWBHqev0xnpCxYlqMBufKZHAHQM3/boDaI/0"[39m
    [33m    }[39m
    [33m  }[39m
    [33m}[39m

[0mEach resource listed in the policy manifest can be of one the following[0m
[0mformats to determine its location:[0m

    1. [0mA [34mrelative url string ([34m[4mhttps://url.spec.whatwg.org/#relative-url-with-fragment-string[24m[39m[34m)[39m to a resource from the manifest such as [33m./resource.js[39m, [33m../resource.js[39m, or [33m/resource.js[39m.[0m
    2. [0mA complete url string to a resource such as [33mfile:///resource.js[39m.[0m

[0mWhen loading resources the entire URL must match including search parameters[0m
[0mand hash fragment. [33m./a.js?b[39m will not be used when attempting to load[0m
[0m[33m./a.js[39m and vice versa.[0m

[0mTo generate integrity strings, a script such as[0m
[0m[33mprintf "sha384-$(cat checked.js | openssl dgst -sha384 -binary | base64)"[39m[0m
[0mcan be used.[0m

[0mIntegrity can be specified as the boolean value [33mtrue[39m to accept any[0m
[0mbody for the resource which can be useful for local development. It is not[0m
[0mrecommended in production since it would allow unexpected alteration of[0m
[0mresources to be considered valid.[0m

[32m[1m### Dependency Redirection[22m[39m

[0mAn application may need to ship patched versions of modules or to prevent[0m
[0mmodules from allowing all modules access to all other modules. Redirection[0m
[0mcan be used by intercepting attempts to load the modules wishing to be[0m
[0mreplaced.[0m

    [33m{[39m
    [33m  "builtins": [],[39m
    [33m  "resources": {[39m
    [33m    "./app/checked.js": {[39m
    [33m      "dependencies": {[39m
    [33m        "fs": true,[39m
    [33m        "os": "./app/node_modules/alt-os"[39m
    [33m      }[39m
    [33m    }[39m
    [33m  }[39m
    [33m}[39m

[0mThe dependencies are keyed by the requested string specifier and have values[0m
[0mof either [33mtrue[39m or a string pointing to a module that will be resolved.[0m

[0mThe specifier string does not perform any searching and must match exactly[0m
[0mwhat is provided to the [33mrequire()[39m. Therefore, multiple specifiers may be[0m
[0mneeded in the policy if [33mrequire()[39m uses multiple different strings to point[0m
[0mto the same module (such as excluding the extension).[0m

[0mIf the value of the redirection is [33mtrue[39m the default searching algorithms will[0m
[0mbe used to find the module.[0m

[0mIf the value of the redirection is a string, it will be resolved relative to[0m
[0mthe manifest and then immediately be used without searching.[0m

[0mAny specifier string that is [33mrequire()[39med and not listed in the dependencies[0m
[0mwill result in an error according to the policy.[0m

[0mRedirection will not prevent access to APIs through means such as direct access[0m
[0mto [33mrequire.cache[39m and/or through [33mmodule.constructor[39m which allow access to[0m
[0mloading modules. Policy redirection only affect specifiers to [33mrequire()[39m.[0m
[0mOther means such as to prevent undesired access to APIs through variables are[0m
[0mnecessary to lock down that path of loading modules.[0m

[0mA boolean value of [33mtrue[39m for the dependencies map can be specified to allow a[0m
[0mmodule to load any specifier without redirection. This can be useful for local[0m
[0mdevelopment and may have some valid usage in production, but should be used[0m
[0monly with care after auditing a module to ensure its behavior is valid.[0m

[32m[1m#### Example: Patched Dependency[22m[39m

[0mRedirected dependencies can provide attenuated or modified functionality as fits[0m
[0mthe application. For example, log data about timing of function durations by[0m
[0mwrapping the original:[0m

    [94mconst[39m [37moriginal[39m [93m=[39m [37mrequire[39m[90m([39m[92m'fn'[39m[90m)[39m[90m;[39m
    [37mmodule[39m[32m.[39m[37mexports[39m [93m=[39m [94mfunction[39m [37mfn[39m[90m([39m[93m...[39m[37margs[39m[90m)[39m [33m{[39m
      [34mconsole[39m[32m.[39m[37mtime[39m[90m([39m[90m)[39m[90m;[39m
      [36mtry[39m [33m{[39m
        [31mreturn[39m [31mnew[39m[32m.[39m[37mtarget[39m [93m?[39m
          [37mReflect[39m[32m.[39m[37mconstruct[39m[90m([39m[37moriginal[39m[32m,[39m [37margs[39m[90m)[39m [93m:[39m
          [37mReflect[39m[32m.[39m[37mapply[39m[90m([39m[37moriginal[39m[32m,[39m [91mthis[39m[32m,[39m [37margs[39m[90m)[39m[90m;[39m
      [33m}[39m [36mfinally[39m [33m{[39m
        [34mconsole[39m[32m.[39m[37mtimeEnd[39m[90m([39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m;[39m

