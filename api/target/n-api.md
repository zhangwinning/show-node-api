[35m[4m[1m# N-API[22m[24m[39m

[90m<!--introduced_in=v8.0.0-->[39m
[90m[39m[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mN-API (pronounced N as in the letter, followed by API)[0m
[0mis an API for building native Addons. It is independent from[0m
[0mthe underlying JavaScript runtime (for example, V8) and is maintained as part of[0m
[0mNode.js itself. This API will be Application Binary Interface (ABI) stable[0m
[0macross versions of Node.js. It is intended to insulate Addons from[0m
[0mchanges in the underlying JavaScript engine and allow modules[0m
[0mcompiled for one major version to run on later major versions of Node.js without[0m
[0mrecompilation. The [ABI Stability][] guide provides a more in-depth explanation.[0m

[0mAddons are built/packaged with the same approach/tools outlined in the section[0m
[0mtitled [C++ Addons][]. The only difference is the set of APIs that are used by[0m
[0mthe native code. Instead of using the V8 or [Native Abstractions for Node.js][][0m
[0mAPIs, the functions available in the N-API are used.[0m

[0mAPIs exposed by N-API are generally used to create and manipulate[0m
[0mJavaScript values. Concepts and operations generally map to ideas specified[0m
[0min the ECMA-262 Language Specification. The APIs have the following[0m
[0mproperties:[0m

    * [0mAll N-API calls return a status code of type [33mnapi_status[39m. This[0m
      [0mstatus indicates whether the API call succeeded or failed.[0m
    * [0mThe API's return value is passed via an out parameter.[0m
    * [0mAll JavaScript values are abstracted behind an opaque type named[0m
      [0m[33mnapi_value[39m.[0m
    * [0mIn case of an error status code, additional information can be obtained[0m
      [0musing [33mnapi_get_last_error_info[39m. More information can be found in the error[0m
      [0mhandling section [Error Handling][].[0m

[0mThe N-API is a C API that ensures ABI stability across Node.js versions[0m
[0mand different compiler levels. A C++ API can be easier to use.[0m
[0mTo support using C++, the project maintains a[0m
[0mC++ wrapper module called [node-addon-api][].[0m
[0mThis wrapper provides an inlineable C++ API. Binaries built[0m
[0mwith [33mnode-addon-api[39m will depend on the symbols for the N-API C-based[0m
[0mfunctions exported by Node.js. [33mnode-addon-api[39m is a more[0m
[0mefficient way to write code that calls N-API. Take, for example, the[0m
[0mfollowing [33mnode-addon-api[39m code. The first section shows the[0m
[0m[33mnode-addon-api[39m code and the second section shows what actually gets[0m
[0mused in the addon.[0m

    [33mObject obj = Object::New(env);[39m
    [33mobj["foo"] = String::New(env, "bar");[39m

    [33mnapi_status status;[39m
    [33mnapi_value object, string;[39m
    [33mstatus = napi_create_object(env, &object);[39m
    [33mif (status != napi_ok) {[39m
    [33m  napi_throw_error(env, ...);[39m
    [33m  return;[39m
    [33m}[39m
    [33m[39m
    [33mstatus = napi_create_string_utf8(env, "bar", NAPI_AUTO_LENGTH, &string);[39m
    [33mif (status != napi_ok) {[39m
    [33m  napi_throw_error(env, ...);[39m
    [33m  return;[39m
    [33m}[39m
    [33m[39m
    [33mstatus = napi_set_named_property(env, object, "foo", string);[39m
    [33mif (status != napi_ok) {[39m
    [33m  napi_throw_error(env, ...);[39m
    [33m  return;[39m
    [33m}[39m

[0mThe end result is that the addon only uses the exported C APIs. As a result,[0m
[0mit still gets the benefits of the ABI stability provided by the C API.[0m

[0mWhen using [33mnode-addon-api[39m instead of the C APIs, start with the API [docs][][0m
[0mfor [33mnode-addon-api[39m.[0m

[32m[1m## Implications of ABI Stability[22m[39m

[0mAlthough N-API provides an ABI stability guarantee, other parts of Node.js do[0m
[0mnot, and any external libraries used from the addon may not. In particular,[0m
[0mnone of the following APIs provide an ABI stability guarantee across major[0m
[0mversions:[0m

    * [0m[0m[0mthe Node.js C++ APIs available via any of[0m[0m[0m
      [0m[0m
      [0m    [33m  #include <node.h>[39m[0m
      [0m    [33m  #include <node_buffer.h>[39m[0m
      [0m    [33m  #include <node_version.h>[39m[0m
      [0m    [33m  #include <node_object_wrap.h>[39m[0m
    * [0m[0m[0mthe libuv APIs which are also included with Node.js and available via[0m[0m[0m
      [0m[0m
      [0m    [33m  #include <uv.h>[39m[0m
    * [0m[0m[0mthe V8 API available via[0m[0m[0m
      [0m[0m
      [0m    [33m  #include <v8.h>[39m[0m

[0mThus, for an addon to remain ABI-compatible across Node.js major versions, it[0m
[0mmust make use exclusively of N-API by restricting itself to using[0m

    [33m#include <node_api.h>[39m

[0mand by checking, for all external libraries that it uses, that the external[0m
[0mlibrary makes ABI stability guarantees similar to N-API.[0m

[32m[1m## Building[22m[39m

[0mUnlike modules written in JavaScript, developing and deploying Node.js[0m
[0mnative addons using N-API requires an additional set of tools. Besides the[0m
[0mbasic tools required to develop for Node.js, the native addon developer[0m
[0mrequires a toolchain that can compile C and C++ code into a binary. In[0m
[0maddition, depending upon how the native addon is deployed, the [3muser[23m of[0m
[0mthe native addon will also need to have a C/C++ toolchain installed.[0m

[0mFor Linux developers, the necessary C/C++ toolchain packages are readily[0m
[0mavailable. [GCC][] is widely used in the Node.js community to build and[0m
[0mtest across a variety of plarforms. For many developers, the [LLVM][][0m
[0mcompiler infrastructure is also a good choice.[0m

[0mFor Mac developers, [Xcode][] offers all the required compiler tools.[0m
[0mHowever, it is not necessary to install the entire Xcode IDE. The following[0m
[0mcommand installs the necessary toolchain:[0m

    [33mxcode-select --install[39m

[0mFor Windows developers, [Visual Studio][] offers all the required compiler[0m
[0mtools. However, it is not necessary to install the entire Visual Studio[0m
[0mIDE. The following command installs the necessary toolchain:[0m

    [33mnpm install --global --production windows-build-tools[39m

[0mThe sections below describe the additional tools available for developing[0m
[0mand deploying Node.js native addons.[0m

[32m[1m### Build tools[22m[39m

[0mBoth the tools listed here require that [3musers[23m of the native[0m
[0maddon have a C/C++ toolchain installed in order to successfully install[0m
[0mthe native addon.[0m

[32m[1m#### node-gyp[22m[39m

[0m[node-gyp][] is a build system based on Google's [GYP][] tool and comes[0m
[0mbundled with npm. GYP, and therefore node-gyp, requires that Python be[0m
[0minstalled.[0m

[0mHistorically, node-gyp has been the tool of choice for building native[0m
[0maddons. It has widespread adoption and documentation. However, some[0m
[0mdevelopers have run into limitations in node-gyp.[0m

[32m[1m#### CMake.js[22m[39m

[0m[CMake.js][] is an alternative build system based on [CMake][].[0m

[0mCMake.js is a good choice for projects that already use CMake or for[0m
[0mdevelopers affected by limitations in node-gyp.[0m

[32m[1m### Uploading precompiled binaries[22m[39m

[0mThe three tools listed here permit native addon developers and maintainers[0m
[0mto create and upload binaries to public or private servers. These tools are[0m
[0mtypically integrated with CI/CD build systems like [Travis CI][] and[0m
[0m[AppVeyor][] to build and upload binaries for a variety of platforms and[0m
[0marchitectures. These binaries are then available for download by users who[0m
[0mdo not need to have a C/C++ toolchain installed.[0m

[32m[1m#### node-pre-gyp[22m[39m

[0m[node-pre-gyp][] is a tool based on node-gyp that adds the ability to[0m
[0mupload binaries to a server of the developer's choice. node-pre-gyp has[0m
[0mparticularly good support for uploading binaries to Amazon S3.[0m

[32m[1m#### prebuild[22m[39m

[0m[prebuild][] is a tool that supports builds using either node-gyp or[0m
[0mCMake.js. Unlike node-pre-gyp which supports a variety of servers, prebuild[0m
[0muploads binaries only to [GitHub releases][]. prebuild is a good choice for[0m
[0mGitHub projects using CMake.js.[0m

[32m[1m#### prebuildify[22m[39m

[0m[prebuildify][] is tool based on node-gyp. The advantage of prebuildify is[0m
[0mthat the built binaries are bundled with the native module when it's[0m
[0muploaded to npm. The binaries are downloaded from npm and are immediately[0m
[0mavailable to the module user when the native module is installed.[0m

[32m[1m## Usage[22m[39m

[0mIn order to use the N-API functions, include the file [[33mnode_api.h[39m][] which is[0m
[0mlocated in the src directory in the node development tree:[0m

    [33m#include <node_api.h>[39m

[0mThis will opt into the default [33mNAPI_VERSION[39m for the given release of Node.js.[0m
[0mIn order to ensure compatibility with specific versions of N-API, the version[0m
[0mcan be specified explicitly when including the header:[0m

    [33m#define NAPI_VERSION 3[39m
    [33m#include <node_api.h>[39m

[0mThis restricts the N-API surface to just the functionality that was available in[0m
[0mthe specified (and earlier) versions.[0m

[0mSome of the N-API surface is considered experimental and requires explicit[0m
[0mopt-in to access those APIs:[0m

    [33m#define NAPI_EXPERIMENTAL[39m
    [33m#include <node_api.h>[39m

[0mIn this case the entire API surface, including any experimental APIs, will be[0m
[0mavailable to the module code.[0m

[32m[1m## N-API Version Matrix[22m[39m

[0mN-API versions are additive and versioned independently from Node.js.[0m
[0mVersion 4 is an extension to version 3 in that it has all of the APIs[0m
[0mfrom version 3 with some additions. This means that it is not necessary[0m
[0mto recompile for new versions of Node.js which are[0m
[0mlisted as supporting a later version.[0m

[0m┌───────┬─────────┬──────────┬──────────┬──────────┬──────────┐[0m
[0m│       │ 1       │ 2        │ 3        │ 4        │ 5        │[0m
[0m├───────┼─────────┼──────────┼──────────┼──────────┼──────────┤[0m
[0m│ v6.x  │         │          │ v6.14.2* │          │          │[0m
[0m├───────┼─────────┼──────────┼──────────┼──────────┼──────────┤[0m
[0m│ v8.x  │ v8.0.0* │ v8.10.0* │ v8.11.2  │ v8.16.0  │          │[0m
[0m├───────┼─────────┼──────────┼──────────┼──────────┼──────────┤[0m
[0m│ v9.x  │ v9.0.0* │ v9.3.0*  │ v9.11.0* │          │          │[0m
[0m├───────┼─────────┼──────────┼──────────┼──────────┼──────────┤[0m
[0m│ v10.x │ v10.0.0 │ v10.0.0  │ v10.0.0  │ v10.16.0 │ v10.17.0 │[0m
[0m├───────┼─────────┼──────────┼──────────┼──────────┼──────────┤[0m
[0m│ v11.x │ v11.0.0 │ v11.0.0  │ v11.0.0  │ v11.8.0  │          │[0m
[0m├───────┼─────────┼──────────┼──────────┼──────────┼──────────┤[0m
[0m│ v12.x │ v12.0.0 │ v12.0.0  │ v12.0.0  │ v12.0.0  │ v12.11.0 │[0m
[0m├───────┼─────────┼──────────┼──────────┼──────────┼──────────┤[0m
[0m│ v13.x │ v13.0.0 │ v13.0.0  │ v13.0.0  │ v13.0.0  │ v13.0.0  │[0m
[0m└───────┴─────────┴──────────┴──────────┴──────────┴──────────┘[0m

[0m* Indicates that the N-API version was released as experimental[0m

[0mThe N-APIs associated strictly with accessing ECMAScript features from native[0m
[0mcode can be found separately in [33mjs_native_api.h[39m and [33mjs_native_api_types.h[39m.[0m
[0mThe APIs defined in these headers are included in [33mnode_api.h[39m and[0m
[0m[33mnode_api_types.h[39m. The headers are structured in this way in order to allow[0m
[0mimplementations of N-API outside of Node.js. For those implementations the[0m
[0mNode.js specific APIs may not be applicable.[0m

[0mThe Node.js-specific parts of an addon can be separated from the code that[0m
[0mexposes the actual functionality to the JavaScript environment so that the[0m
[0mlatter may be used with multiple implementations of N-API. In the example below,[0m
[0m[33maddon.c[39m and [33maddon.h[39m refer only to [33mjs_native_api.h[39m. This ensures that[0m
[0m[33maddon.c[39m can be reused to compile against either the Node.js implementation of[0m
[0mN-API or any implementation of N-API outside of Node.js.[0m

[0m[33maddon_node.c[39m is a separate file that contains the Node.js specific entry point[0m
[0mto the addon and which instantiates the addon by calling into [33maddon.c[39m when the[0m
[0maddon is loaded into a Node.js environment.[0m

    [33m// addon.h[39m
    [33m#ifndef _ADDON_H_[39m
    [33m#define _ADDON_H_[39m
    [33m#include <js_native_api.h>[39m
    [33mnapi_value create_addon(napi_env env);[39m
    [33m#endif  // _ADDON_H_[39m

    [33m// addon.c[39m
    [33m#include "addon.h"[39m
    [33m[39m
    [33m#define NAPI_CALL(env, call)                                      \[39m
    [33m  do {                                                            \[39m
    [33m    napi_status status = (call);                                  \[39m
    [33m    if (status != napi_ok) {                                      \[39m
    [33m      const napi_extended_error_info* error_info = NULL;          \[39m
    [33m      napi_get_last_error_info((env), &error_info);               \[39m
    [33m      bool is_pending;                                            \[39m
    [33m      napi_is_exception_pending((env), &is_pending);              \[39m
    [33m      if (!is_pending) {                                          \[39m
    [33m        const char* message = (error_info->error_message == NULL) \[39m
    [33m            ? "empty error message"                               \[39m
    [33m            : error_info->error_message;                          \[39m
    [33m        napi_throw_error((env), NULL, message);                   \[39m
    [33m        return NULL;                                              \[39m
    [33m      }                                                           \[39m
    [33m    }                                                             \[39m
    [33m  } while(0)[39m
    [33m[39m
    [33mstatic napi_value[39m
    [33mDoSomethingUseful(napi_env env, napi_callback_info info) {[39m
    [33m  // Do something useful.[39m
    [33m  return NULL;[39m
    [33m}[39m
    [33m[39m
    [33mnapi_value create_addon(napi_env env) {[39m
    [33m  napi_value result;[39m
    [33m  NAPI_CALL(env, napi_create_object(env, &result));[39m
    [33m[39m
    [33m  napi_value exported_function;[39m
    [33m  NAPI_CALL(env, napi_create_function(env,[39m
    [33m                                      "doSomethingUseful",[39m
    [33m                                      NAPI_AUTO_LENGTH,[39m
    [33m                                      DoSomethingUseful,[39m
    [33m                                      NULL,[39m
    [33m                                      &exported_function));[39m
    [33m[39m
    [33m  NAPI_CALL(env, napi_set_named_property(env,[39m
    [33m                                         result,[39m
    [33m                                         "doSomethingUseful",[39m
    [33m                                         exported_function));[39m
    [33m[39m
    [33m  return result;[39m
    [33m}[39m

    [33m// addon_node.c[39m
    [33m#include <node_api.h>[39m
    [33m#include "addon.h"[39m
    [33m[39m
    [33mNAPI_MODULE_INIT() {[39m
    [33m  // This function body is expected to return a `napi_value`.[39m
    [33m  // The variables `napi_env env` and `napi_value exports` may be used within[39m
    [33m  // the body, as they are provided by the definition of `NAPI_MODULE_INIT()`.[39m
    [33m  return create_addon(env);[39m
    [33m}[39m

[32m[1m## Environment Life Cycle APIs[22m[39m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0m[Section 8.7][] of the [ECMAScript Language Specification][] defines the concept[0m
[0mof an "Agent" as a self-contained environment in which JavaScript code runs.[0m
[0mMultiple such Agents may be started and terminated either concurrently or in[0m
[0msequence by the process.[0m

[0mA Node.js environment corresponds to an ECMAScript Agent. In the main process,[0m
[0man environment is created at startup, and additional environments can be created[0m
[0mon separate threads to serve as [worker threads][]. When Node.js is embedded in[0m
[0manother application, the main thread of the application may also construct and[0m
[0mdestroy a Node.js environment multiple times during the life cycle of the[0m
[0mapplication process such that each Node.js environment created by the[0m
[0mapplication may, in turn, during its life cycle create and destroy additional[0m
[0menvironments as worker threads.[0m

[0mFrom the perspective of a native addon this means that the bindings it provides[0m
[0mmay be called multiple times, from multiple contexts, and even concurrently from[0m
[0mmultiple threads.[0m

[0mNative addons may need to allocate global state of which they make use during[0m
[0mtheir entire life cycle such that the state must be unique to each instance of[0m
[0mthe addon.[0m

[0mTo this env, N-API provides a way to allocate data such that its life cycle is[0m
[0mtied to the life cycle of the Agent.[0m

[32m[1m### napi_set_instance_data[22m[39m

[90m<!-- YAML[39m
[90madded: v12.8.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_set_instance_data(napi_env env,[39m
    [33m                                   void* data,[39m
    [33m                                   napi_finalize finalize_cb,[39m
    [33m                                   void* finalize_hint);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] data[39m: The data item to make available to bindings of this instance.[0m
    * [0m[33m[in] finalize_cb[39m: The function to call when the environment is being torn[0m
      [0mdown. The function receives [33mdata[39m so that it might free it.[0m
    * [0m[33m[in] finalize_hint[39m: Optional hint to pass to the finalize callback during[0m
      [0mcollection.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API associates [33mdata[39m with the currently running Agent. [33mdata[39m can later[0m
[0mbe retrieved using [33mnapi_get_instance_data()[39m. Any existing data associated with[0m
[0mthe currently running Agent which was set by means of a previous call to[0m
[0m[33mnapi_set_instance_data()[39m will be overwritten. If a [33mfinalize_cb[39m was provided[0m
[0mby the previous call, it will not be called.[0m

[32m[1m### napi_get_instance_data[22m[39m

[90m<!-- YAML[39m
[90madded: v12.8.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_instance_data(napi_env env,[39m
    [33m                                   void** data);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[out] data[39m: The data item that was previously associated with the currently[0m
      [0mrunning Agent by a call to [33mnapi_set_instance_data()[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API retrieves data that was previously associated with the currently[0m
[0mrunning Agent via [33mnapi_set_instance_data()[39m. If no data is set, the call will[0m
[0msucceed and [33mdata[39m will be set to [33mNULL[39m.[0m

[32m[1m## Basic N-API Data Types[22m[39m

[0mN-API exposes the following fundamental datatypes as abstractions that are[0m
[0mconsumed by the various APIs. These APIs should be treated as opaque,[0m
[0mintrospectable only with other N-API calls.[0m

[32m[1m### napi_status[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m[0mIntegral status code indicating the success or failure of a N-API call.[0m
[0mCurrently, the following status codes are supported.[0m

    [33mtypedef enum {[39m
    [33m  napi_ok,[39m
    [33m  napi_invalid_arg,[39m
    [33m  napi_object_expected,[39m
    [33m  napi_string_expected,[39m
    [33m  napi_name_expected,[39m
    [33m  napi_function_expected,[39m
    [33m  napi_number_expected,[39m
    [33m  napi_boolean_expected,[39m
    [33m  napi_array_expected,[39m
    [33m  napi_generic_failure,[39m
    [33m  napi_pending_exception,[39m
    [33m  napi_cancelled,[39m
    [33m  napi_escape_called_twice,[39m
    [33m  napi_handle_scope_mismatch,[39m
    [33m  napi_callback_scope_mismatch,[39m
    [33m  napi_queue_full,[39m
    [33m  napi_closing,[39m
    [33m  napi_bigint_expected,[39m
    [33m  napi_date_expected,[39m
    [33m  napi_arraybuffer_expected,[39m
    [33m  napi_detachable_arraybuffer_expected,[39m
    [33m} napi_status;[39m

[0mIf additional information is required upon an API returning a failed status,[0m
[0mit can be obtained by calling [33mnapi_get_last_error_info[39m.[0m

[32m[1m### napi_extended_error_info[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mtypedef struct {[39m
    [33m  const char* error_message;[39m
    [33m  void* engine_reserved;[39m
    [33m  uint32_t engine_error_code;[39m
    [33m  napi_status error_code;[39m
    [33m} napi_extended_error_info;[39m

    * [0m[33merror_message[39m: UTF8-encoded string containing a VM-neutral description of[0m
      [0mthe error.[0m
    * [0m[33mengine_reserved[39m: Reserved for VM-specific error details. This is currently[0m
      [0mnot implemented for any VM.[0m
    * [0m[33mengine_error_code[39m: VM-specific error code. This is currently[0m
      [0mnot implemented for any VM.[0m
    * [0m[33merror_code[39m: The N-API status code that originated with the last error.[0m

[0mSee the [Error Handling][] section for additional information.[0m

[32m[1m### napi_env[22m[39m

[0m[33mnapi_env[39m is used to represent a context that the underlying N-API[0m
[0mimplementation can use to persist VM-specific state. This structure is passed[0m
[0mto native functions when they're invoked, and it must be passed back when[0m
[0mmaking N-API calls. Specifically, the same [33mnapi_env[39m that was passed in when[0m
[0mthe initial native function was called must be passed to any subsequent[0m
[0mnested N-API calls. Caching the [33mnapi_env[39m for the purpose of general reuse,[0m
[0mand passing the [33mnapi_env[39m between instances of the same addon running on[0m
[0mdifferent [[33mWorker[39m][] threads is not allowed. The [33mnapi_env[39m becomes invalid[0m
[0mwhen an instance of a native addon is unloaded. Notification of this event is[0m
[0mdelivered through the callbacks given to [[33mnapi_add_env_cleanup_hook[39m][] and[0m
[0m[[33mnapi_set_instance_data[39m][].[0m

[32m[1m### napi_value[22m[39m

[0mThis is an opaque pointer that is used to represent a JavaScript value.[0m

[32m[1m### napi_threadsafe_function[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis is an opaque pointer that represents a JavaScript function which can be[0m
[0mcalled asynchronously from multiple threads via[0m
[0m[33mnapi_call_threadsafe_function()[39m.[0m

[32m[1m### napi_threadsafe_function_release_mode[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA value to be given to [33mnapi_release_threadsafe_function()[39m to indicate whether[0m
[0mthe thread-safe function is to be closed immediately ([33mnapi_tsfn_abort[39m) or[0m
[0mmerely released ([33mnapi_tsfn_release[39m) and thus available for subsequent use via[0m
[0m[33mnapi_acquire_threadsafe_function()[39m and [33mnapi_call_threadsafe_function()[39m.[0m

    [33mtypedef enum {[39m
    [33m  napi_tsfn_release,[39m
    [33m  napi_tsfn_abort[39m
    [33m} napi_threadsafe_function_release_mode;[39m

[32m[1m### napi_threadsafe_function_call_mode[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA value to be given to [33mnapi_call_threadsafe_function()[39m to indicate whether[0m
[0mthe call should block whenever the queue associated with the thread-safe[0m
[0mfunction is full.[0m

    [33mtypedef enum {[39m
    [33m  napi_tsfn_nonblocking,[39m
    [33m  napi_tsfn_blocking[39m
    [33m} napi_threadsafe_function_call_mode;[39m

[32m[1m### N-API Memory Management types[22m[39m

[32m[1m#### napi_handle_scope[22m[39m

[0mThis is an abstraction used to control and modify the lifetime of objects[0m
[0mcreated within a particular scope. In general, N-API values are created within[0m
[0mthe context of a handle scope. When a native method is called from[0m
[0mJavaScript, a default handle scope will exist. If the user does not explicitly[0m
[0mcreate a new handle scope, N-API values will be created in the default handle[0m
[0mscope. For any invocations of code outside the execution of a native method[0m
[0m(for instance, during a libuv callback invocation), the module is required to[0m
[0mcreate a scope before invoking any functions that can result in the creation[0m
[0mof JavaScript values.[0m

[0mHandle scopes are created using [[33mnapi_open_handle_scope[39m][] and are destroyed[0m
[0musing [[33mnapi_close_handle_scope[39m][]. Closing the scope can indicate to the GC[0m
[0mthat all [33mnapi_value[39ms created during the lifetime of the handle scope are no[0m
[0mlonger referenced from the current stack frame.[0m

[0mFor more details, review the [Object Lifetime Management][].[0m

[32m[1m#### napi_escapable_handle_scope[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m[0mEscapable handle scopes are a special type of handle scope to return values[0m
[0mcreated within a particular handle scope to a parent scope.[0m

[32m[1m#### napi_ref[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m[0mThis is the abstraction to use to reference a [33mnapi_value[39m. This allows for[0m
[0musers to manage the lifetimes of JavaScript values, including defining their[0m
[0mminimum lifetimes explicitly.[0m

[0mFor more details, review the [Object Lifetime Management][].[0m

[32m[1m### N-API Callback types[22m[39m

[32m[1m#### napi_callback_info[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m[0mOpaque datatype that is passed to a callback function. It can be used for[0m
[0mgetting additional information about the context in which the callback was[0m
[0minvoked.[0m

[32m[1m#### napi_callback[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m[0mFunction pointer type for user-provided native functions which are to be[0m
[0mexposed to JavaScript via N-API. Callback functions should satisfy the[0m
[0mfollowing signature:[0m

    [33mtypedef napi_value (*napi_callback)(napi_env, napi_callback_info);[39m

[32m[1m#### napi_finalize[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m[0mFunction pointer type for add-on provided functions that allow the user to be[0m
[0mnotified when externally-owned data is ready to be cleaned up because the[0m
[0mobject with which it was associated with, has been garbage-collected. The user[0m
[0mmust provide a function satisfying the following signature which would get[0m
[0mcalled upon the object's collection. Currently, [33mnapi_finalize[39m can be used for[0m
[0mfinding out when objects that have external data are collected.[0m

    [33mtypedef void (*napi_finalize)(napi_env env,[39m
    [33m                              void* finalize_data,[39m
    [33m                              void* finalize_hint);[39m

[32m[1m#### napi_async_execute_callback[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m[0mFunction pointer used with functions that support asynchronous[0m
[0moperations. Callback functions must satisfy the following signature:[0m

    [33mtypedef void (*napi_async_execute_callback)(napi_env env, void* data);[39m

[0mImplementations of this function must avoid making N-API calls[0m
[0mthat execute JavaScript or interact with[0m
[0mJavaScript objects.  N-API[0m
[0mcalls should be in the [33mnapi_async_complete_callback[39m instead.[0m
[0mDo not use the [33mnapi_env[39m parameter as it will likely[0m
[0mresult in execution of JavaScript.[0m

[32m[1m#### napi_async_complete_callback[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m[0mFunction pointer used with functions that support asynchronous[0m
[0moperations. Callback functions must satisfy the following signature:[0m

    [33mtypedef void (*napi_async_complete_callback)(napi_env env,[39m
    [33m                                             napi_status status,[39m
    [33m                                             void* data);[39m

[32m[1m#### napi_threadsafe_function_call_js[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mFunction pointer used with asynchronous thread-safe function calls. The callback[0m
[0mwill be called on the main thread. Its purpose is to use a data item arriving[0m
[0mvia the queue from one of the secondary threads to construct the parameters[0m
[0mnecessary for a call into JavaScript, usually via [33mnapi_call_function[39m, and then[0m
[0mmake the call into JavaScript.[0m

[0mThe data arriving from the secondary thread via the queue is given in the [33mdata[39m[0m
[0mparameter and the JavaScript function to call is given in the [33mjs_callback[39m[0m
[0mparameter.[0m

[0mN-API sets up the environment prior to calling this callback, so it is[0m
[0msufficient to call the JavaScript function via [33mnapi_call_function[39m rather than[0m
[0mvia [33mnapi_make_callback[39m.[0m

[0mCallback functions must satisfy the following signature:[0m

    [33mtypedef void (*napi_threadsafe_function_call_js)(napi_env env,[39m
    [33m                                                 napi_value js_callback,[39m
    [33m                                                 void* context,[39m
    [33m                                                 void* data);[39m

    * [0m[33m[in] env[39m: The environment to use for API calls, or [33mNULL[39m if the thread-safe[0m
      [0mfunction is being torn down and [33mdata[39m may need to be freed.[0m
    * [0m[33m[in] js_callback[39m: The JavaScript function to call, or [33mNULL[39m if the[0m
      [0mthread-safe function is being torn down and [33mdata[39m may need to be freed. It[0m
      [0mmay also be [33mNULL[39m if the thread-safe function was created without[0m
      [0m[33mjs_callback[39m.[0m
    * [0m[33m[in] context[39m: The optional data with which the thread-safe function was[0m
      [0mcreated.[0m
    * [0m[33m[in] data[39m: Data created by the secondary thread. It is the responsibility of[0m
      [0mthe callback to convert this native data to JavaScript values (with N-API[0m
      [0mfunctions) that can be passed as parameters when [33mjs_callback[39m is invoked.[0m
      [0mThis pointer is managed entirely by the threads and this callback. Thus this[0m
      [0mcallback should free the data.[0m

[32m[1m## Error Handling[22m[39m

[0mN-API uses both return values and JavaScript exceptions for error handling.[0m
[0mThe following sections explain the approach for each case.[0m

[32m[1m### Return values[22m[39m

[0mAll of the N-API functions share the same error handling pattern. The[0m
[0mreturn type of all API functions is [33mnapi_status[39m.[0m

[0mThe return value will be [33mnapi_ok[39m if the request was successful and[0m
[0mno uncaught JavaScript exception was thrown. If an error occurred AND[0m
[0man exception was thrown, the [33mnapi_status[39m value for the error[0m
[0mwill be returned. If an exception was thrown, and no error occurred,[0m
[0m[33mnapi_pending_exception[39m will be returned.[0m

[0mIn cases where a return value other than [33mnapi_ok[39m or[0m
[0m[33mnapi_pending_exception[39m is returned, [[33mnapi_is_exception_pending[39m][][0m
[0mmust be called to check if an exception is pending.[0m
[0mSee the section on exceptions for more details.[0m

[0mThe full set of possible [33mnapi_status[39m values is defined[0m
[0min [33mnapi_api_types.h[39m.[0m

[0mThe [33mnapi_status[39m return value provides a VM-independent representation of[0m
[0mthe error which occurred. In some cases it is useful to be able to get[0m
[0mmore detailed information, including a string representing the error as well as[0m
[0mVM (engine)-specific information.[0m

[0mIn order to retrieve this information [[33mnapi_get_last_error_info[39m][][0m
[0mis provided which returns a [33mnapi_extended_error_info[39m structure.[0m
[0mThe format of the [33mnapi_extended_error_info[39m structure is as follows:[0m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mtypedef struct napi_extended_error_info {[39m
    [33m  const char* error_message;[39m
    [33m  void* engine_reserved;[39m
    [33m  uint32_t engine_error_code;[39m
    [33m  napi_status error_code;[39m
    [33m};[39m

    * [0m[33merror_message[39m: Textual representation of the error that occurred.[0m
    * [0m[33mengine_reserved[39m: Opaque handle reserved for engine use only.[0m
    * [0m[33mengine_error_code[39m: VM specific error code.[0m
    * [0m[33merror_code[39m: n-api status code for the last error.[0m

[0m[[33mnapi_get_last_error_info[39m][] returns the information for the last[0m
[0mN-API call that was made.[0m

[0mDo not rely on the content or format of any of the extended information as it[0m
[0mis not subject to SemVer and may change at any time. It is intended only for[0m
[0mlogging purposes.[0m

[32m[1m#### napi_get_last_error_info[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status[39m
    [33mnapi_get_last_error_info(napi_env env,[39m
    [33m                         const napi_extended_error_info** result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: The [33mnapi_extended_error_info[39m structure with more[0m
      [0minformation about the error.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API retrieves a [33mnapi_extended_error_info[39m structure with information[0m
[0mabout the last error that occurred.[0m

[0mThe content of the [33mnapi_extended_error_info[39m returned is only valid up until[0m
[0man n-api function is called on the same [33menv[39m.[0m

[0mDo not rely on the content or format of any of the extended information as it[0m
[0mis not subject to SemVer and may change at any time. It is intended only for[0m
[0mlogging purposes.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m### Exceptions[22m[39m

[0mAny N-API function call may result in a pending JavaScript exception. This is[0m
[0mthe case for any of the API functions, even those that may not cause the[0m
[0mexecution of JavaScript.[0m

[0mIf the [33mnapi_status[39m returned by a function is [33mnapi_ok[39m then no[0m
[0mexception is pending and no additional action is required. If the[0m
[0m[33mnapi_status[39m returned is anything other than [33mnapi_ok[39m or[0m
[0m[33mnapi_pending_exception[39m, in order to try to recover and continue[0m
[0minstead of simply returning immediately, [[33mnapi_is_exception_pending[39m][][0m
[0mmust be called in order to determine if an exception is pending or not.[0m

[0mIn many cases when an N-API function is called and an exception is[0m
[0malready pending, the function will return immediately with a[0m
[0m[33mnapi_status[39m of [33mnapi_pending_exception[39m. However, this is not the case[0m
[0mfor all functions. N-API allows a subset of the functions to be[0m
[0mcalled to allow for some minimal cleanup before returning to JavaScript.[0m
[0mIn that case, [33mnapi_status[39m will reflect the status for the function. It[0m
[0mwill not reflect previous pending exceptions. To avoid confusion, check[0m
[0mthe error status after every function call.[0m

[0mWhen an exception is pending one of two approaches can be employed.[0m

[0mThe first approach is to do any appropriate cleanup and then return so that[0m
[0mexecution will return to JavaScript. As part of the transition back to[0m
[0mJavaScript, the exception will be thrown at the point in the JavaScript[0m
[0mcode where the native method was invoked. The behavior of most N-API calls[0m
[0mis unspecified while an exception is pending, and many will simply return[0m
[0m[33mnapi_pending_exception[39m, so do as little as possible and then return to[0m
[0mJavaScript where the exception can be handled.[0m

[0mThe second approach is to try to handle the exception. There will be cases[0m
[0mwhere the native code can catch the exception, take the appropriate action,[0m
[0mand then continue. This is only recommended in specific cases[0m
[0mwhere it is known that the exception can be safely handled. In these[0m
[0mcases [[33mnapi_get_and_clear_last_exception[39m][] can be used to get and[0m
[0mclear the exception. On success, result will contain the handle to[0m
[0mthe last JavaScript [33mObject[39m thrown. If it is determined, after[0m
[0mretrieving the exception, the exception cannot be handled after all[0m
[0mit can be re-thrown it with [[33mnapi_throw[39m][] where error is the[0m
[0mJavaScript [33mError[39m object to be thrown.[0m

[0mThe following utility functions are also available in case native code[0m
[0mneeds to throw an exception or determine if a [33mnapi_value[39m is an instance[0m
[0mof a JavaScript [33mError[39m object: [[33mnapi_throw_error[39m][],[0m
[0m[[33mnapi_throw_type_error[39m][], [[33mnapi_throw_range_error[39m][] and[0m
[0m[[33mnapi_is_error[39m][].[0m

[0mThe following utility functions are also available in case native[0m
[0mcode needs to create an [33mError[39m object: [[33mnapi_create_error[39m][],[0m
[0m[[33mnapi_create_type_error[39m][], and [[33mnapi_create_range_error[39m][],[0m
[0mwhere result is the [33mnapi_value[39m that refers to the newly created[0m
[0mJavaScript [33mError[39m object.[0m

[0mThe Node.js project is adding error codes to all of the errors[0m
[0mgenerated internally. The goal is for applications to use these[0m
[0merror codes for all error checking. The associated error messages[0m
[0mwill remain, but will only be meant to be used for logging and[0m
[0mdisplay with the expectation that the message can change without[0m
[0mSemVer applying. In order to support this model with N-API, both[0m
[0min internal functionality and for module specific functionality[0m
[0m(as its good practice), the [33mthrow_[39m and [33mcreate_[39m functions[0m
[0mtake an optional code parameter which is the string for the code[0m
[0mto be added to the error object. If the optional parameter is NULL[0m
[0mthen no code will be associated with the error. If a code is provided,[0m
[0mthe name associated with the error is also updated to be:[0m

    [33moriginalName [code][39m

[0mwhere [33moriginalName[39m is the original name associated with the error[0m
[0mand [33mcode[39m is the code that was provided. For example, if the code[0m
[0mis [33m'ERR_ERROR_1'[39m and a [33mTypeError[39m is being created the name will be:[0m

    [33mTypeError [ERR_ERROR_1][39m

[32m[1m#### napi_throw[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_throw(napi_env env, napi_value error);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] error[39m: The JavaScript value to be thrown.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API throws the JavaScript value provided.[0m

[32m[1m#### napi_throw_error[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_throw_error(napi_env env,[39m
    [33m                                         const char* code,[39m
    [33m                                         const char* msg);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] code[39m: Optional error code to be set on the error.[0m
    * [0m[33m[in] msg[39m: C string representing the text to be associated with the error.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API throws a JavaScript [33mError[39m with the text provided.[0m

[32m[1m#### napi_throw_type_error[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_throw_type_error(napi_env env,[39m
    [33m                                              const char* code,[39m
    [33m                                              const char* msg);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] code[39m: Optional error code to be set on the error.[0m
    * [0m[33m[in] msg[39m: C string representing the text to be associated with the error.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API throws a JavaScript [33mTypeError[39m with the text provided.[0m

[32m[1m#### napi_throw_range_error[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_throw_range_error(napi_env env,[39m
    [33m                                               const char* code,[39m
    [33m                                               const char* msg);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] code[39m: Optional error code to be set on the error.[0m
    * [0m[33m[in] msg[39m: C string representing the text to be associated with the error.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API throws a JavaScript [33mRangeError[39m with the text provided.[0m

[32m[1m#### napi_is_error[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_is_error(napi_env env,[39m
    [33m                                      napi_value value,[39m
    [33m                                      bool* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The [33mnapi_value[39m to be checked.[0m
    * [0m[33m[out] result[39m: Boolean value that is set to true if [33mnapi_value[39m represents[0m
      [0man error, false otherwise.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API queries a [33mnapi_value[39m to check if it represents an error object.[0m

[32m[1m#### napi_create_error[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_create_error(napi_env env,[39m
    [33m                                          napi_value code,[39m
    [33m                                          napi_value msg,[39m
    [33m                                          napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] code[39m: Optional [33mnapi_value[39m with the string for the error code to be[0m
      [0massociated with the error.[0m
    * [0m[33m[in] msg[39m: [33mnapi_value[39m that references a JavaScript [33mString[39m to be used as[0m
      [0mthe message for the [33mError[39m.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the error created.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns a JavaScript [33mError[39m with the text provided.[0m

[32m[1m#### napi_create_type_error[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_create_type_error(napi_env env,[39m
    [33m                                               napi_value code,[39m
    [33m                                               napi_value msg,[39m
    [33m                                               napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] code[39m: Optional [33mnapi_value[39m with the string for the error code to be[0m
      [0massociated with the error.[0m
    * [0m[33m[in] msg[39m: [33mnapi_value[39m that references a JavaScript [33mString[39m to be used as[0m
      [0mthe message for the [33mError[39m.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the error created.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns a JavaScript [33mTypeError[39m with the text provided.[0m

[32m[1m#### napi_create_range_error[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_create_range_error(napi_env env,[39m
    [33m                                                napi_value code,[39m
    [33m                                                napi_value msg,[39m
    [33m                                                napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] code[39m: Optional [33mnapi_value[39m with the string for the error code to be[0m
      [0massociated with the error.[0m
    * [0m[33m[in] msg[39m: [33mnapi_value[39m that references a JavaScript [33mString[39m to be used as[0m
      [0mthe message for the [33mError[39m.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the error created.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns a JavaScript [33mRangeError[39m with the text provided.[0m

[32m[1m#### napi_get_and_clear_last_exception[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_and_clear_last_exception(napi_env env,[39m
    [33m                                              napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: The exception if one is pending, NULL otherwise.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m#### napi_is_exception_pending[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_is_exception_pending(napi_env env, bool* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: Boolean value that is set to true if an exception is pending.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m#### napi_fatal_exception[22m[39m

[90m<!-- YAML[39m
[90madded: v9.10.0[39m
[90mnapiVersion: 3[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_fatal_exception(napi_env env, napi_value err);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] err[39m: The error that is passed to [33m'uncaughtException'[39m.[0m

[0mTrigger an [33m'uncaughtException'[39m in JavaScript. Useful if an async[0m
[0mcallback throws an exception with no way to recover.[0m

[32m[1m### Fatal Errors[22m[39m

[0mIn the event of an unrecoverable error in a native module, a fatal error can be[0m
[0mthrown to immediately terminate the process.[0m

[32m[1m#### napi_fatal_error[22m[39m

[90m<!-- YAML[39m
[90madded: v8.2.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_NO_RETURN void napi_fatal_error(const char* location,[39m
    [33m                                                 size_t location_len,[39m
    [33m                                                 const char* message,[39m
    [33m                                                 size_t message_len);[39m

    * [0m[33m[in] location[39m: Optional location at which the error occurred.[0m
    * [0m[33m[in] location_len[39m: The length of the location in bytes, or[0m
      [0m[33mNAPI_AUTO_LENGTH[39m if it is null-terminated.[0m
    * [0m[33m[in] message[39m: The message associated with the error.[0m
    * [0m[33m[in] message_len[39m: The length of the message in bytes, or [33mNAPI_AUTO_LENGTH[39m[0m
      [0mif it is null-terminated.[0m

[0mThe function call does not return, the process will be terminated.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m## Object Lifetime management[22m[39m

[0mAs N-API calls are made, handles to objects in the heap for the underlying[0m
[0mVM may be returned as [33mnapi_values[39m. These handles must hold the[0m
[0mobjects 'live' until they are no longer required by the native code,[0m
[0motherwise the objects could be collected before the native code was[0m
[0mfinished using them.[0m

[0mAs object handles are returned they are associated with a[0m
[0m'scope'. The lifespan for the default scope is tied to the lifespan[0m
[0mof the native method call. The result is that, by default, handles[0m
[0mremain valid and the objects associated with these handles will be[0m
[0mheld live for the lifespan of the native method call.[0m

[0mIn many cases, however, it is necessary that the handles remain valid for[0m
[0meither a shorter or longer lifespan than that of the native method.[0m
[0mThe sections which follow describe the N-API functions that can be used[0m
[0mto change the handle lifespan from the default.[0m

[32m[1m### Making handle lifespan shorter than that of the native method[22m[39m

[0mIt is often necessary to make the lifespan of handles shorter than[0m
[0mthe lifespan of a native method. For example, consider a native method[0m
[0mthat has a loop which iterates through the elements in a large array:[0m

    [33mfor (int i = 0; i < 1000000; i++) {[39m
    [33m  napi_value result;[39m
    [33m  napi_status status = napi_get_element(env, object, i, &result);[39m
    [33m  if (status != napi_ok) {[39m
    [33m    break;[39m
    [33m  }[39m
    [33m  // do something with element[39m
    [33m}[39m

[0mThis would result in a large number of handles being created, consuming[0m
[0msubstantial resources. In addition, even though the native code could only[0m
[0muse the most recent handle, all of the associated objects would also be[0m
[0mkept alive since they all share the same scope.[0m

[0mTo handle this case, N-API provides the ability to establish a new 'scope' to[0m
[0mwhich newly created handles will be associated. Once those handles[0m
[0mare no longer required, the scope can be 'closed' and any handles associated[0m
[0mwith the scope are invalidated. The methods available to open/close scopes are[0m
[0m[[33mnapi_open_handle_scope[39m][] and [[33mnapi_close_handle_scope[39m][].[0m

[0mN-API only supports a single nested hierarchy of scopes. There is only one[0m
[0mactive scope at any time, and all new handles will be associated with that[0m
[0mscope while it is active. Scopes must be closed in the reverse order from[0m
[0mwhich they are opened. In addition, all scopes created within a native method[0m
[0mmust be closed before returning from that method.[0m

[0mTaking the earlier example, adding calls to [[33mnapi_open_handle_scope[39m][] and[0m
[0m[[33mnapi_close_handle_scope[39m][] would ensure that at most a single handle[0m
[0mis valid throughout the execution of the loop:[0m

    [33mfor (int i = 0; i < 1000000; i++) {[39m
    [33m  napi_handle_scope scope;[39m
    [33m  napi_status status = napi_open_handle_scope(env, &scope);[39m
    [33m  if (status != napi_ok) {[39m
    [33m    break;[39m
    [33m  }[39m
    [33m  napi_value result;[39m
    [33m  status = napi_get_element(env, object, i, &result);[39m
    [33m  if (status != napi_ok) {[39m
    [33m    break;[39m
    [33m  }[39m
    [33m  // do something with element[39m
    [33m  status = napi_close_handle_scope(env, scope);[39m
    [33m  if (status != napi_ok) {[39m
    [33m    break;[39m
    [33m  }[39m
    [33m}[39m

[0mWhen nesting scopes, there are cases where a handle from an[0m
[0minner scope needs to live beyond the lifespan of that scope. N-API supports an[0m
[0m'escapable scope' in order to support this case. An escapable scope[0m
[0mallows one handle to be 'promoted' so that it 'escapes' the[0m
[0mcurrent scope and the lifespan of the handle changes from the current[0m
[0mscope to that of the outer scope.[0m

[0mThe methods available to open/close escapable scopes are[0m
[0m[[33mnapi_open_escapable_handle_scope[39m][] and[0m
[0m[[33mnapi_close_escapable_handle_scope[39m][].[0m

[0mThe request to promote a handle is made through [[33mnapi_escape_handle[39m][] which[0m
[0mcan only be called once.[0m

[32m[1m#### napi_open_handle_scope[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_open_handle_scope(napi_env env,[39m
    [33m                                               napi_handle_scope* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the new scope.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API open a new scope.[0m

[32m[1m#### napi_close_handle_scope[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_close_handle_scope(napi_env env,[39m
    [33m                                                napi_handle_scope scope);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] scope[39m: [33mnapi_value[39m representing the scope to be closed.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API closes the scope passed in. Scopes must be closed in the[0m
[0mreverse order from which they were created.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m#### napi_open_escapable_handle_scope[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status[39m
    [33m    napi_open_escapable_handle_scope(napi_env env,[39m
    [33m                                     napi_handle_scope* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the new scope.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API open a new scope from which one object can be promoted[0m
[0mto the outer scope.[0m

[32m[1m#### napi_close_escapable_handle_scope[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status[39m
    [33m    napi_close_escapable_handle_scope(napi_env env,[39m
    [33m                                      napi_handle_scope scope);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] scope[39m: [33mnapi_value[39m representing the scope to be closed.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API closes the scope passed in. Scopes must be closed in the[0m
[0mreverse order from which they were created.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m#### napi_escape_handle[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_escape_handle(napi_env env,[39m
    [33m                               napi_escapable_handle_scope scope,[39m
    [33m                               napi_value escapee,[39m
    [33m                               napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] scope[39m: [33mnapi_value[39m representing the current scope.[0m
    * [0m[33m[in] escapee[39m: [33mnapi_value[39m representing the JavaScript [33mObject[39m to be[0m
      [0mescaped.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the handle to the escaped [33mObject[39m[0m
      [0min the outer scope.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API promotes the handle to the JavaScript object so that it is valid[0m
[0mfor the lifetime of the outer scope. It can only be called once per scope.[0m
[0mIf it is called more than once an error will be returned.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m### References to objects with a lifespan longer than that of the native method[22m[39m

[0mIn some cases an addon will need to be able to create and reference objects[0m
[0mwith a lifespan longer than that of a single native method invocation. For[0m
[0mexample, to create a constructor and later use that constructor[0m
[0min a request to creates instances, it must be possible to reference[0m
[0mthe constructor object across many different instance creation requests. This[0m
[0mwould not be possible with a normal handle returned as a [33mnapi_value[39m as[0m
[0mdescribed in the earlier section. The lifespan of a normal handle is[0m
[0mmanaged by scopes and all scopes must be closed before the end of a native[0m
[0mmethod.[0m

[0mN-API provides methods to create persistent references to an object.[0m
[0mEach persistent reference has an associated count with a value of 0[0m
[0mor higher. The count determines if the reference will keep[0m
[0mthe corresponding object live. References with a count of 0 do not[0m
[0mprevent the object from being collected and are often called 'weak'[0m
[0mreferences. Any count greater than 0 will prevent the object[0m
[0mfrom being collected.[0m

[0mReferences can be created with an initial reference count. The count can[0m
[0mthen be modified through [[33mnapi_reference_ref[39m][] and[0m
[0m[[33mnapi_reference_unref[39m][]. If an object is collected while the count[0m
[0mfor a reference is 0, all subsequent calls to[0m
[0mget the object associated with the reference [[33mnapi_get_reference_value[39m][][0m
[0mwill return NULL for the returned [33mnapi_value[39m. An attempt to call[0m
[0m[[33mnapi_reference_ref[39m][] for a reference whose object has been collected[0m
[0mwill result in an error.[0m

[0mReferences must be deleted once they are no longer required by the addon. When[0m
[0ma reference is deleted it will no longer prevent the corresponding object from[0m
[0mbeing collected. Failure to delete a persistent reference will result in[0m
[0ma 'memory leak' with both the native memory for the persistent reference and[0m
[0mthe corresponding object on the heap being retained forever.[0m

[0mThere can be multiple persistent references created which refer to the same[0m
[0mobject, each of which will either keep the object live or not based on its[0m
[0mindividual count.[0m

[32m[1m#### napi_create_reference[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_create_reference(napi_env env,[39m
    [33m                                              napi_value value,[39m
    [33m                                              uint32_t initial_refcount,[39m
    [33m                                              napi_ref* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing the [33mObject[39m to which we want a[0m
      [0mreference.[0m
    * [0m[33m[in] initial_refcount[39m: Initial reference count for the new reference.[0m
    * [0m[33m[out] result[39m: [33mnapi_ref[39m pointing to the new reference.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API create a new reference with the specified reference count[0m
[0mto the [33mObject[39m passed in.[0m

[32m[1m#### napi_delete_reference[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_delete_reference(napi_env env, napi_ref ref);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] ref[39m: [33mnapi_ref[39m to be deleted.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API deletes the reference passed in.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m#### napi_reference_ref[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_reference_ref(napi_env env,[39m
    [33m                                           napi_ref ref,[39m
    [33m                                           uint32_t* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] ref[39m: [33mnapi_ref[39m for which the reference count will be incremented.[0m
    * [0m[33m[out] result[39m: The new reference count.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API increments the reference count for the reference[0m
[0mpassed in and returns the resulting reference count.[0m

[32m[1m#### napi_reference_unref[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_reference_unref(napi_env env,[39m
    [33m                                             napi_ref ref,[39m
    [33m                                             uint32_t* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] ref[39m: [33mnapi_ref[39m for which the reference count will be decremented.[0m
    * [0m[33m[out] result[39m: The new reference count.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API decrements the reference count for the reference[0m
[0mpassed in and returns the resulting reference count.[0m

[32m[1m#### napi_get_reference_value[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_get_reference_value(napi_env env,[39m
    [33m                                                 napi_ref ref,[39m
    [33m                                                 napi_value* result);[39m

[0mthe [33mnapi_value passed[39m in or out of these methods is a handle to the[0m
[0mobject to which the reference is related.[0m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] ref[39m: [33mnapi_ref[39m for which we requesting the corresponding [33mObject[39m.[0m
    * [0m[33m[out] result[39m: The [33mnapi_value[39m for the [33mObject[39m referenced by the[0m
      [0m[33mnapi_ref[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mIf still valid, this API returns the [33mnapi_value[39m representing the[0m
[0mJavaScript [33mObject[39m associated with the [33mnapi_ref[39m. Otherwise, result[0m
[0mwill be NULL.[0m

[32m[1m### Cleanup on exit of the current Node.js instance[22m[39m

[0mWhile a Node.js process typically releases all its resources when exiting,[0m
[0membedders of Node.js, or future Worker support, may require addons to register[0m
[0mclean-up hooks that will be run once the current Node.js instance exits.[0m

[0mN-API provides functions for registering and un-registering such callbacks.[0m
[0mWhen those callbacks are run, all resources that are being held by the addon[0m
[0mshould be freed up.[0m

[32m[1m#### napi_add_env_cleanup_hook[22m[39m

[90m<!-- YAML[39m
[90madded: v10.2.0[39m
[90mnapiVersion: 3[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNODE_EXTERN napi_status napi_add_env_cleanup_hook(napi_env env,[39m
    [33m                                                  void (*fun)(void* arg),[39m
    [33m                                                  void* arg);[39m

[0mRegisters [33mfun[39m as a function to be run with the [33marg[39m parameter once the[0m
[0mcurrent Node.js environment exits.[0m

[0mA function can safely be specified multiple times with different[0m
[0m[33marg[39m values. In that case, it will be called multiple times as well.[0m
[0mProviding the same [33mfun[39m and [33marg[39m values multiple times is not allowed[0m
[0mand will lead the process to abort.[0m

[0mThe hooks will be called in reverse order, i.e. the most recently added one[0m
[0mwill be called first.[0m

[0mRemoving this hook can be done by using [33mnapi_remove_env_cleanup_hook[39m.[0m
[0mTypically, that happens when the resource for which this hook was added[0m
[0mis being torn down anyway.[0m

[32m[1m#### napi_remove_env_cleanup_hook[22m[39m

[90m<!-- YAML[39m
[90madded: v10.2.0[39m
[90mnapiVersion: 3[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_remove_env_cleanup_hook(napi_env env,[39m
    [33m                                                     void (*fun)(void* arg),[39m
    [33m                                                     void* arg);[39m

[0mUnregisters [33mfun[39m as a function to be run with the [33marg[39m parameter once the[0m
[0mcurrent Node.js environment exits. Both the argument and the function value[0m
[0mneed to be exact matches.[0m

[0mThe function must have originally been registered[0m
[0mwith [33mnapi_add_env_cleanup_hook[39m, otherwise the process will abort.[0m

[32m[1m## Module registration[22m[39m

[0mN-API modules are registered in a manner similar to other modules[0m
[0mexcept that instead of using the [33mNODE_MODULE[39m macro the following[0m
[0mis used:[0m

    [33mNAPI_MODULE(NODE_GYP_MODULE_NAME, Init)[39m

[0mThe next difference is the signature for the [33mInit[39m method. For a N-API[0m
[0mmodule it is as follows:[0m

    [33mnapi_value Init(napi_env env, napi_value exports);[39m

[0mThe return value from [33mInit[39m is treated as the [33mexports[39m object for the module.[0m
[0mThe [33mInit[39m method is passed an empty object via the [33mexports[39m parameter as a[0m
[0mconvenience. If [33mInit[39m returns NULL, the parameter passed as [33mexports[39m is[0m
[0mexported by the module. N-API modules cannot modify the [33mmodule[39m object but can[0m
[0mspecify anything as the [33mexports[39m property of the module.[0m

[0mTo add the method [33mhello[39m as a function so that it can be called as a method[0m
[0mprovided by the addon:[0m

    [33mnapi_value Init(napi_env env, napi_value exports) {[39m
    [33m  napi_status status;[39m
    [33m  napi_property_descriptor desc =[39m
    [33m    {"hello", NULL, Method, NULL, NULL, NULL, napi_default, NULL};[39m
    [33m  status = napi_define_properties(env, exports, 1, &desc);[39m
    [33m  if (status != napi_ok) return NULL;[39m
    [33m  return exports;[39m
    [33m}[39m

[0mTo set a function to be returned by the [33mrequire()[39m for the addon:[0m

    [33mnapi_value Init(napi_env env, napi_value exports) {[39m
    [33m  napi_value method;[39m
    [33m  napi_status status;[39m
    [33m  status = napi_create_function(env, "exports", NAPI_AUTO_LENGTH, Method, NULL, &method);[39m
    [33m  if (status != napi_ok) return NULL;[39m
    [33m  return method;[39m
    [33m}[39m

[0mTo define a class so that new instances can be created (often used with[0m
[0m[Object Wrap][]):[0m

    [33m// NOTE: partial example, not all referenced code is included[39m
    [33mnapi_value Init(napi_env env, napi_value exports) {[39m
    [33m  napi_status status;[39m
    [33m  napi_property_descriptor properties[] = {[39m
    [33m    { "value", NULL, NULL, GetValue, SetValue, NULL, napi_default, NULL },[39m
    [33m    DECLARE_NAPI_METHOD("plusOne", PlusOne),[39m
    [33m    DECLARE_NAPI_METHOD("multiply", Multiply),[39m
    [33m  };[39m
    [33m[39m
    [33m  napi_value cons;[39m
    [33m  status =[39m
    [33m      napi_define_class(env, "MyObject", New, NULL, 3, properties, &cons);[39m
    [33m  if (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m  status = napi_create_reference(env, cons, 1, &constructor);[39m
    [33m  if (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m  status = napi_set_named_property(env, exports, "MyObject", cons);[39m
    [33m  if (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m  return exports;[39m
    [33m}[39m

[0mIf the module will be loaded multiple times during the lifetime of the Node.js[0m
[0mprocess, use the [33mNAPI_MODULE_INIT[39m macro to initialize the module:[0m

    [33mNAPI_MODULE_INIT() {[39m
    [33m  napi_value answer;[39m
    [33m  napi_status result;[39m
    [33m[39m
    [33m  status = napi_create_int64(env, 42, &answer);[39m
    [33m  if (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m  status = napi_set_named_property(env, exports, "answer", answer);[39m
    [33m  if (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m  return exports;[39m
    [33m}[39m

[0mThis macro includes [33mNAPI_MODULE[39m, and declares an [33mInit[39m function with a[0m
[0mspecial name and with visibility beyond the addon. This will allow Node.js to[0m
[0minitialize the module even if it is loaded multiple times.[0m

[0mThere are a few design considerations when declaring a module that may be loaded[0m
[0mmultiple times. The documentation of [context-aware addons][] provides more[0m
[0mdetails.[0m

[0mThe variables [33menv[39m and [33mexports[39m will be available inside the function body[0m
[0mfollowing the macro invocation.[0m

[0mFor more details on setting properties on objects, see the section on[0m
[0m[Working with JavaScript Properties][].[0m

[0mFor more details on building addon modules in general, refer to the existing[0m
[0mAPI.[0m

[32m[1m## Working with JavaScript Values[22m[39m

[0mN-API exposes a set of APIs to create all types of JavaScript values.[0m
[0mSome of these types are documented under [Section 6][][0m
[0mof the [ECMAScript Language Specification][].[0m

[0mFundamentally, these APIs are used to do one of the following:[0m

    1. [0mCreate a new JavaScript object[0m
    2. [0mConvert from a primitive C type to an N-API value[0m
    3. [0mConvert from N-API value to a primitive C type[0m
    4. [0mGet global instances including [33mundefined[39m and [33mnull[39m[0m

[0mN-API values are represented by the type [33mnapi_value[39m.[0m
[0mAny N-API call that requires a JavaScript value takes in a [33mnapi_value[39m.[0m
[0mIn some cases, the API does check the type of the [33mnapi_value[39m up-front.[0m
[0mHowever, for better performance, it's better for the caller to make sure that[0m
[0mthe [33mnapi_value[39m in question is of the JavaScript type expected by the API.[0m

[32m[1m### Enum types[22m[39m

[32m[1m#### napi_key_collection_mode[22m[39m

[90m<!-- YAML[39m
[90madded: v13.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mtypedef enum {[39m
    [33m  napi_key_include_prototypes,[39m
    [33m  napi_key_own_only[39m
    [33m} napi_key_collection_mode;[39m

[0mDescribes the [33mKeys/Properties[39m filter enums:[0m

[0m[33mnapi_key_collection_mode[39m limits the range of collected properties.[0m

[0m[33mnapi_key_own_only[39m limits the collected properties to the given[0m
[0mobject only. [33mnapi_key_include_prototypes[39m will include all keys[0m
[0mof the objects's prototype chain as well.[0m

[32m[1m#### napi_key_filter[22m[39m

[90m<!-- YAML[39m
[90madded: v13.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mtypedef enum {[39m
    [33m  napi_key_all_properties = 0,[39m
    [33m  napi_key_writable = 1,[39m
    [33m  napi_key_enumerable = 1 << 1,[39m
    [33m  napi_key_configurable = 1 << 2,[39m
    [33m  napi_key_skip_strings = 1 << 3,[39m
    [33m  napi_key_skip_symbols = 1 << 4[39m
    [33m} napi_key_filter;[39m

[0mProperty filter bits. They can be or'ed to build a composite filter.[0m

[32m[1m#### napi_key_conversion[22m[39m

[90m<!-- YAML[39m
[90madded: v13.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mtypedef enum {[39m
    [33m  napi_key_keep_numbers,[39m
    [33m  napi_key_numbers_to_strings[39m
    [33m} napi_key_conversion;[39m

[0m[33mnapi_key_numbers_to_strings[39m will convert integer indices to[0m
[0mstrings. [33mnapi_key_keep_numbers[39m will return numbers for integer[0m
[0mindices.[0m

[32m[1m#### napi_valuetype[22m[39m

    [33mtypedef enum {[39m
    [33m  // ES6 types (corresponds to typeof)[39m
    [33m  napi_undefined,[39m
    [33m  napi_null,[39m
    [33m  napi_boolean,[39m
    [33m  napi_number,[39m
    [33m  napi_string,[39m
    [33m  napi_symbol,[39m
    [33m  napi_object,[39m
    [33m  napi_function,[39m
    [33m  napi_external,[39m
    [33m  napi_bigint,[39m
    [33m} napi_valuetype;[39m

[0mDescribes the type of a [33mnapi_value[39m. This generally corresponds to the types[0m
[0mdescribed in [Section 6.1][] of the ECMAScript Language Specification.[0m
[0mIn addition to types in that section, [33mnapi_valuetype[39m can also represent[0m
[0m[33mFunction[39ms and [33mObject[39ms with external data.[0m

[0mA JavaScript value of type [33mnapi_external[39m appears in JavaScript as a plain[0m
[0mobject such that no properties can be set on it, and no prototype.[0m

[32m[1m#### napi_typedarray_type[22m[39m

    [33mtypedef enum {[39m
    [33m  napi_int8_array,[39m
    [33m  napi_uint8_array,[39m
    [33m  napi_uint8_clamped_array,[39m
    [33m  napi_int16_array,[39m
    [33m  napi_uint16_array,[39m
    [33m  napi_int32_array,[39m
    [33m  napi_uint32_array,[39m
    [33m  napi_float32_array,[39m
    [33m  napi_float64_array,[39m
    [33m  napi_bigint64_array,[39m
    [33m  napi_biguint64_array,[39m
    [33m} napi_typedarray_type;[39m

[0mThis represents the underlying binary scalar datatype of the [33mTypedArray[39m.[0m
[0mElements of this enum correspond to[0m
[0m[Section 22.2][] of the [ECMAScript Language Specification][].[0m

[32m[1m### Object Creation Functions[22m[39m

[32m[1m#### napi_create_array[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_array(napi_env env, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mArray[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns an N-API value corresponding to a JavaScript [33mArray[39m type.[0m
[0mJavaScript arrays are described in[0m
[0m[Section 22.1][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_array_with_length[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_array_with_length(napi_env env,[39m
    [33m                                          size_t length,[39m
    [33m                                          napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] length[39m: The initial length of the [33mArray[39m.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mArray[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns an N-API value corresponding to a JavaScript [33mArray[39m type.[0m
[0mThe [33mArray[39m's length property is set to the passed-in length parameter.[0m
[0mHowever, the underlying buffer is not guaranteed to be pre-allocated by the VM[0m
[0mwhen the array is created. That behavior is left to the underlying VM[0m
[0mimplementation. If the buffer must be a contiguous block of memory that can be[0m
[0mdirectly read and/or written via C, consider using[0m
[0m[[33mnapi_create_external_arraybuffer[39m][].[0m

[0mJavaScript arrays are described in[0m
[0m[Section 22.1][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_arraybuffer[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_arraybuffer(napi_env env,[39m
    [33m                                    size_t byte_length,[39m
    [33m                                    void** data,[39m
    [33m                                    napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] length[39m: The length in bytes of the array buffer to create.[0m
    * [0m[33m[out] data[39m: Pointer to the underlying byte buffer of the [33mArrayBuffer[39m.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mArrayBuffer[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns an N-API value corresponding to a JavaScript [33mArrayBuffer[39m.[0m
[0m[33mArrayBuffer[39ms are used to represent fixed-length binary data buffers. They are[0m
[0mnormally used as a backing-buffer for [33mTypedArray[39m objects.[0m
[0mThe [33mArrayBuffer[39m allocated will have an underlying byte buffer whose size is[0m
[0mdetermined by the [33mlength[39m parameter that's passed in.[0m
[0mThe underlying buffer is optionally returned back to the caller in case the[0m
[0mcaller wants to directly manipulate the buffer. This buffer can only be[0m
[0mwritten to directly from native code. To write to this buffer from JavaScript,[0m
[0ma typed array or [33mDataView[39m object would need to be created.[0m

[0mJavaScript [33mArrayBuffer[39m objects are described in[0m
[0m[Section 24.1][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_buffer[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_buffer(napi_env env,[39m
    [33m                               size_t size,[39m
    [33m                               void** data,[39m
    [33m                               napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] size[39m: Size in bytes of the underlying buffer.[0m
    * [0m[33m[out] data[39m: Raw pointer to the underlying buffer.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a [33mnode::Buffer[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API allocates a [33mnode::Buffer[39m object. While this is still a[0m
[0mfully-supported data structure, in most cases using a [33mTypedArray[39m will suffice.[0m

[32m[1m#### napi_create_buffer_copy[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_buffer_copy(napi_env env,[39m
    [33m                                    size_t length,[39m
    [33m                                    const void* data,[39m
    [33m                                    void** result_data,[39m
    [33m                                    napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] size[39m: Size in bytes of the input buffer (should be the same as the size[0m
      [0mof the new buffer).[0m
    * [0m[33m[in] data[39m: Raw pointer to the underlying buffer to copy from.[0m
    * [0m[33m[out] result_data[39m: Pointer to the new [33mBuffer[39m's underlying data buffer.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a [33mnode::Buffer[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API allocates a [33mnode::Buffer[39m object and initializes it with data copied[0m
[0mfrom the passed-in buffer. While this is still a fully-supported data[0m
[0mstructure, in most cases using a [33mTypedArray[39m will suffice.[0m

[32m[1m#### napi_create_date[22m[39m

[90m<!-- YAML[39m
[90madded: v11.11.0[39m
[90mnapiVersion: 5[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_date(napi_env env,[39m
    [33m                             double time,[39m
    [33m                             napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] time[39m: ECMAScript time value in milliseconds since 01 January, 1970 UTC.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mDate[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API does not observe leap seconds; they are ignored, as[0m
[0mECMAScript aligns with POSIX time specification.[0m

[0mThis API allocates a JavaScript [33mDate[39m object.[0m

[0mJavaScript [33mDate[39m objects are described in[0m
[0m[Section 20.3][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_external[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_external(napi_env env,[39m
    [33m                                 void* data,[39m
    [33m                                 napi_finalize finalize_cb,[39m
    [33m                                 void* finalize_hint,[39m
    [33m                                 napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] data[39m: Raw pointer to the external data.[0m
    * [0m[33m[in] finalize_cb[39m: Optional callback to call when the external value is being[0m
      [0mcollected.[0m
    * [0m[33m[in] finalize_hint[39m: Optional hint to pass t[0m

[0mo the finalize callback during[0m
[0m  collection.[0m

    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing an external value.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API allocates a JavaScript value with external data attached to it. This[0m
[0mis used to pass external data through JavaScript code, so it can be retrieved[0m
[0mlater by native code using [[33mnapi_get_value_external[39m][].[0m

[0mThe API adds a [33mnapi_finalize[39m callback which will be called when the JavaScript[0m
[0mobject just created is ready for garbage collection. It is similar to[0m
[0m[33mnapi_wrap()[39m except that:[0m

    * [0mthe native data cannot be retrieved later using [33mnapi_unwrap()[39m,[0m
    * [0mnor can it be removed later using [33mnapi_remove_wrap()[39m, and[0m
    * [0mthe object created by the API can be used with [33mnapi_wrap()[39m.[0m

[0mThe created value is not an object, and therefore does not support additional[0m
[0mproperties. It is considered a distinct value type: calling [33mnapi_typeof()[39m with[0m
[0man external value yields [33mnapi_external[39m.[0m

[32m[1m#### napi_create_external_arraybuffer[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status[39m
    [33mnapi_create_external_arraybuffer(napi_env env,[39m
    [33m                                 void* external_data,[39m
    [33m                                 size_t byte_length,[39m
    [33m                                 napi_finalize finalize_cb,[39m
    [33m                                 void* finalize_hint,[39m
    [33m                                 napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] external_data[39m: Pointer to the underlying byte buffer of the[0m
      [0m[33mArrayBuffer[39m.[0m
    * [0m[33m[in] byte_length[39m: The length in bytes of the underlying buffer.[0m
    * [0m[33m[in] finalize_cb[39m: Optional callback to call when the [33mArrayBuffer[39m is being[0m
      [0mcollected.[0m
    * [0m[33m[in] finalize_hint[39m: Optional hint to pass to the finalize callback during[0m
      [0mcollection.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mArrayBuffer[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns an N-API value corresponding to a JavaScript [33mArrayBuffer[39m.[0m
[0mThe underlying byte buffer of the [33mArrayBuffer[39m is externally allocated and[0m
[0mmanaged. The caller must ensure that the byte buffer remains valid until the[0m
[0mfinalize callback is called.[0m

[0mThe API adds a [33mnapi_finalize[39m callback which will be called when the JavaScript[0m
[0mobject just created is ready for garbage collection. It is similar to[0m
[0m[33mnapi_wrap()[39m except that:[0m

    * [0mthe native data cannot be retrieved later using [33mnapi_unwrap()[39m,[0m
    * [0mnor can it be removed later using [33mnapi_remove_wrap()[39m, and[0m
    * [0mthe object created by the API can be used with [33mnapi_wrap()[39m.[0m

[0mJavaScript [33mArrayBuffer[39ms are described in[0m
[0m[Section 24.1][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_external_buffer[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_external_buffer(napi_env env,[39m
    [33m                                        size_t length,[39m
    [33m                                        void* data,[39m
    [33m                                        napi_finalize finalize_cb,[39m
    [33m                                        void* finalize_hint,[39m
    [33m                                        napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] length[39m: Size in bytes of the input buffer (should be the same as the[0m
      [0msize of the new buffer).[0m
    * [0m[33m[in] data[39m: Raw pointer to the underlying buffer to copy from.[0m
    * [0m[33m[in] finalize_cb[39m: Optional callback to call when the [33mArrayBuffer[39m is being[0m
      [0mcollected.[0m
    * [0m[33m[in] finalize_hint[39m: Optional hint to pass to the finalize callback during[0m
      [0mcollection.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a [33mnode::Buffer[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API allocates a [33mnode::Buffer[39m object and initializes it with data[0m
[0mbacked by the passed in buffer. While this is still a fully-supported data[0m
[0mstructure, in most cases using a [33mTypedArray[39m will suffice.[0m

[0mThe API adds a [33mnapi_finalize[39m callback which will be called when the JavaScript[0m
[0mobject just created is ready for garbage collection. It is similar to[0m
[0m[33mnapi_wrap()[39m except that:[0m

    * [0mthe native data cannot be retrieved later using [33mnapi_unwrap()[39m,[0m
    * [0mnor can it be removed later using [33mnapi_remove_wrap()[39m, and[0m
    * [0mthe object created by the API can be used with [33mnapi_wrap()[39m.[0m

[0mFor Node.js >=4 [33mBuffers[39m are [33mUint8Array[39ms.[0m

[32m[1m#### napi_create_object[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_object(napi_env env, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mObject[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API allocates a default JavaScript [33mObject[39m.[0m
[0mIt is the equivalent of doing [33mnew Object()[39m in JavaScript.[0m

[0mThe JavaScript [33mObject[39m type is described in [Section 6.1.7][] of the[0m
[0mECMAScript Language Specification.[0m

[32m[1m#### napi_create_symbol[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_symbol(napi_env env,[39m
    [33m                               napi_value description,[39m
    [33m                               napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] description[39m: Optional [33mnapi_value[39m which refers to a JavaScript[0m
      [0m[33mString[39m to be set as the description for the symbol.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mSymbol[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API creates a JavaScript [33mSymbol[39m object from a UTF8-encoded C string.[0m

[0mThe JavaScript [33mSymbol[39m type is described in [Section 19.4][][0m
[0mof the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_typedarray[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_typedarray(napi_env env,[39m
    [33m                                   napi_typedarray_type type,[39m
    [33m                                   size_t length,[39m
    [33m                                   napi_value arraybuffer,[39m
    [33m                                   size_t byte_offset,[39m
    [33m                                   napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] type[39m: Scalar datatype of the elements within the [33mTypedArray[39m.[0m
    * [0m[33m[in] length[39m: Number of elements in the [33mTypedArray[39m.[0m
    * [0m[33m[in] arraybuffer[39m: [33mArrayBuffer[39m underlying the typed array.[0m
    * [0m[33m[in] byte_offset[39m: The byte offset within the [33mArrayBuffer[39m from which to[0m
      [0mstart projecting the [33mTypedArray[39m.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mTypedArray[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API creates a JavaScript [33mTypedArray[39m object over an existing[0m
[0m[33mArrayBuffer[39m. [33mTypedArray[39m objects provide an array-like view over an[0m
[0munderlying data buffer where each element has the same underlying binary scalar[0m
[0mdatatype.[0m

[0mIt's required that [33m(length * size_of_element) + byte_offset[39m should[0m
[0mbe <= the size in bytes of the array passed in. If not, a [33mRangeError[39m exception[0m
[0mis raised.[0m

[0mJavaScript [33mTypedArray[39m objects are described in[0m
[0m[Section 22.2][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_dataview[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_dataview(napi_env env,[39m
    [33m                                 size_t byte_length,[39m
    [33m                                 napi_value arraybuffer,[39m
    [33m                                 size_t byte_offset,[39m
    [33m                                 napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] length[39m: Number of elements in the [33mDataView[39m.[0m
    * [0m[33m[in] arraybuffer[39m: [33mArrayBuffer[39m underlying the [33mDataView[39m.[0m
    * [0m[33m[in] byte_offset[39m: The byte offset within the [33mArrayBuffer[39m from which to[0m
      [0mstart projecting the [33mDataView[39m.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mDataView[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API creates a JavaScript [33mDataView[39m object over an existing [33mArrayBuffer[39m.[0m
[0m[33mDataView[39m objects provide an array-like view over an underlying data buffer,[0m
[0mbut one which allows items of different size and type in the [33mArrayBuffer[39m.[0m

[0mIt is required that [33mbyte_length + byte_offset[39m is less than or equal to the[0m
[0msize in bytes of the array passed in. If not, a [33mRangeError[39m exception is[0m
[0mraised.[0m

[0mJavaScript [33mDataView[39m objects are described in[0m
[0m[Section 24.3][] of the ECMAScript Language Specification.[0m

[32m[1m### Functions to convert from C types to N-API[22m[39m

[32m[1m#### napi_create_int32[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_int32(napi_env env, int32_t value, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: Integer value to be represented in JavaScript.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mNumber[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API is used to convert from the C [33mint32_t[39m type to the JavaScript[0m
[0m[33mNumber[39m type.[0m

[0mThe JavaScript [33mNumber[39m type is described in[0m
[0m[Section 6.1.6][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_uint32[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_uint32(napi_env env, uint32_t value, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: Unsigned integer value to be represented in JavaScript.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mNumber[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API is used to convert from the C [33muint32_t[39m type to the JavaScript[0m
[0m[33mNumber[39m type.[0m

[0mThe JavaScript [33mNumber[39m type is described in[0m
[0m[Section 6.1.6][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_int64[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_int64(napi_env env, int64_t value, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: Integer value to be represented in JavaScript.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mNumber[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API is used to convert from the C [33mint64_t[39m type to the JavaScript[0m
[0m[33mNumber[39m type.[0m

[0mThe JavaScript [33mNumber[39m type is described in [Section 6.1.6][][0m
[0mof the ECMAScript Language Specification. Note the complete range of [33mint64_t[39m[0m
[0mcannot be represented with full precision in JavaScript. Integer values[0m
[0moutside the range of [[33mNumber.MIN_SAFE_INTEGER[39m][] [33m-(2^53 - 1)[39m -[0m
[0m[[33mNumber.MAX_SAFE_INTEGER[39m][] [33m(2^53 - 1)[39m will lose precision.[0m

[32m[1m#### napi_create_double[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_double(napi_env env, double value, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: Double-precision value to be represented in JavaScript.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mNumber[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API is used to convert from the C [33mdouble[39m type to the JavaScript[0m
[0m[33mNumber[39m type.[0m

[0mThe JavaScript [33mNumber[39m type is described in[0m
[0m[Section 6.1.6][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_bigint_int64[22m[39m

[90m<!-- YAML[39m
[90madded: v10.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_bigint_int64(napi_env env,[39m
    [33m                                     int64_t value,[39m
    [33m                                     napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: Integer value to be represented in JavaScript.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mBigInt[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API converts the C [33mint64_t[39m type to the JavaScript [33mBigInt[39m type.[0m

[32m[1m#### napi_create_bigint_uint64[22m[39m

[90m<!-- YAML[39m
[90madded: v10.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_bigint_uint64(napi_env env,[39m
    [33m                                      uint64_t value,[39m
    [33m                                      napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: Unsigned integer value to be represented in JavaScript.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mBigInt[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API converts the C [33muint64_t[39m type to the JavaScript [33mBigInt[39m type.[0m

[32m[1m#### napi_create_bigint_words[22m[39m

[90m<!-- YAML[39m
[90madded: v10.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_bigint_words(napi_env env,[39m
    [33m                                     int sign_bit,[39m
    [33m                                     size_t word_count,[39m
    [33m                                     const uint64_t* words,[39m
    [33m                                     napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] sign_bit[39m: Determines if the resulting [33mBigInt[39m will be positive or[0m
      [0mnegative.[0m
    * [0m[33m[in] word_count[39m: The length of the [33mwords[39m array.[0m
    * [0m[33m[in] words[39m: An array of [33muint64_t[39m little-endian 64-bit words.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mBigInt[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API converts an array of unsigned 64-bit words into a single [33mBigInt[39m[0m
[0mvalue.[0m

[0mThe resulting [33mBigInt[39m is calculated as: (–1)[90m<sup>[39m[33msign_bit[39m[90m</sup>[39m ([33mwords[0][39m[0m
[0m× (2[90m<sup>[39m64[90m</sup>[39m)[90m<sup>[39m0[90m</sup>[39m + [33mwords[1][39m × (2[90m<sup>[39m64[90m</sup>[39m)[90m<sup>[39m1[90m</sup>[39m + …)[0m

[32m[1m#### napi_create_string_latin1[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_string_latin1(napi_env env,[39m
    [33m                                      const char* str,[39m
    [33m                                      size_t length,[39m
    [33m                                      napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] str[39m: Character buffer representing an ISO-8859-1-encoded string.[0m
    * [0m[33m[in] length[39m: The length of the string in bytes, or [33mNAPI_AUTO_LENGTH[39m if it[0m
      [0mis null-terminated.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mString[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API creates a JavaScript [33mString[39m object from an ISO-8859-1-encoded C[0m
[0mstring. The native string is copied.[0m

[0mThe JavaScript [33mString[39m type is described in[0m
[0m[Section 6.1.4][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_string_utf16[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_string_utf16(napi_env env,[39m
    [33m                                     const char16_t* str,[39m
    [33m                                     size_t length,[39m
    [33m                                     napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] str[39m: Character buffer representing a UTF16-LE-encoded string.[0m
    * [0m[33m[in] length[39m: The length of the string in two-byte code units, or[0m
      [0m[33mNAPI_AUTO_LENGTH[39m if it is null-terminated.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mString[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API creates a JavaScript [33mString[39m object from a UTF16-LE-encoded C string.[0m
[0mThe native string is copied.[0m

[0mThe JavaScript [33mString[39m type is described in[0m
[0m[Section 6.1.4][] of the ECMAScript Language Specification.[0m

[32m[1m#### napi_create_string_utf8[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_string_utf8(napi_env env,[39m
    [33m                                    const char* str,[39m
    [33m                                    size_t length,[39m
    [33m                                    napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] str[39m: Character buffer representing a UTF8-encoded string.[0m
    * [0m[33m[in] length[39m: The length of the string in bytes, or [33mNAPI_AUTO_LENGTH[39m if it[0m
      [0mis null-terminated.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing a JavaScript [33mString[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API creates a JavaScript [33mString[39m object from a UTF8-encoded C string.[0m
[0mThe native string is copied.[0m

[0mThe JavaScript [33mString[39m type is described in[0m
[0m[Section 6.1.4][] of the ECMAScript Language Specification.[0m

[32m[1m### Functions to convert from N-API to C types[22m[39m

[32m[1m#### napi_get_array_length[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_array_length(napi_env env,[39m
    [33m                                  napi_value value,[39m
    [33m                                  uint32_t* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing the JavaScript [33mArray[39m whose length is[0m
      [0mbeing queried.[0m
    * [0m[33m[out] result[39m: [33muint32[39m representing length of the array.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns the length of an array.[0m

[0m[33mArray[39m length is described in [Section 22.1.4.1][] of the ECMAScript Language[0m
[0mSpecification.[0m

[32m[1m#### napi_get_arraybuffer_info[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_arraybuffer_info(napi_env env,[39m
    [33m                                      napi_value arraybuffer,[39m
    [33m                                      void** data,[39m
    [33m                                      size_t* byte_length)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] arraybuffer[39m: [33mnapi_value[39m representing the [33mArrayBuffer[39m being queried.[0m
    * [0m[33m[out] data[39m: The underlying data buffer of the [33mArrayBuffer[39m. If byte_length[0m
      [0mis [33m0[39m, this may be [33mNULL[39m or any other pointer value.[0m
    * [0m[33m[out] byte_length[39m: Length in bytes of the underlying data buffer.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API is used to retrieve the underlying data buffer of an [33mArrayBuffer[39m and[0m
[0mits length.[0m

[0m[3mWARNING[23m: Use caution while using this API. The lifetime of the underlying data[0m
[0mbuffer is managed by the [33mArrayBuffer[39m even after it's returned. A[0m
[0mpossible safe way to use this API is in conjunction with[0m
[0m[[33mnapi_create_reference[39m][], which can be used to guarantee control over the[0m
[0mlifetime of the [33mArrayBuffer[39m. It's also safe to use the returned data buffer[0m
[0mwithin the same callback as long as there are no calls to other APIs that might[0m
[0mtrigger a GC.[0m

[32m[1m#### napi_get_buffer_info[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_buffer_info(napi_env env,[39m
    [33m                                 napi_value value,[39m
    [33m                                 void** data,[39m
    [33m                                 size_t* length)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing the [33mnode::Buffer[39m being queried.[0m
    * [0m[33m[out] data[39m: The underlying data buffer of the [33mnode::Buffer[39m.[0m
      [0mIf length is [33m0[39m, this may be [33mNULL[39m or any other pointer value.[0m
    * [0m[33m[out] length[39m: Length in bytes of the underlying data buffer.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API is used to retrieve the underlying data buffer of a [33mnode::Buffer[39m[0m
[0mand it's length.[0m

[0m[3mWarning[23m: Use caution while using this API since the underlying data buffer's[0m
[0mlifetime is not guaranteed if it's managed by the VM.[0m

[32m[1m#### napi_get_prototype[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_prototype(napi_env env,[39m
    [33m                               napi_value object,[39m
    [33m                               napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] object[39m: [33mnapi_value[39m representing JavaScript [33mObject[39m whose prototype[0m
      [0mto return. This returns the equivalent of [33mObject.getPrototypeOf[39m (which is[0m
      [0mnot the same as the function's [33mprototype[39m property).[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing prototype of the given object.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[32m[1m#### napi_get_typedarray_info[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_typedarray_info(napi_env env,[39m
    [33m                                     napi_value typedarray,[39m
    [33m                                     napi_typedarray_type* type,[39m
    [33m                                     size_t* length,[39m
    [33m                                     void** data,[39m
    [33m                                     napi_value* arraybuffer,[39m
    [33m                                     size_t* byte_offset)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] typedarray[39m: [33mnapi_value[39m representing the [33mTypedArray[39m whose[0m
      [0mproperties to query.[0m
    * [0m[33m[out] type[39m: Scalar datatype of the elements within the [33mTypedArray[39m.[0m
    * [0m[33m[out] length[39m: The number of elements in the [33mTypedArray[39m.[0m
    * [0m[33m[out] data[39m: The data buffer underlying the [33mTypedArray[39m adjusted by[0m
      [0mthe [33mbyte_offset[39m value so that it points to the first element in the[0m
      [0m[33mTypedArray[39m. If the length of the array is [33m0[39m, this may be [33mNULL[39m or[0m
      [0many other pointer value.[0m
    * [0m[33m[out] arraybuffer[39m: The [33mArrayBuffer[39m underlying the [33mTypedArray[39m.[0m
    * [0m[33m[out] byte_offset[39m: The byte offset within the underlying native array[0m
      [0mat which the first element of the arrays is located. The value for the data[0m
      [0mparameter has already been adjusted so that data points to the first element[0m
      [0min the array. Therefore, the first byte of the native array would be at[0m
      [0m[33mdata - byte_offset[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns various properties of a typed array.[0m

[0m[3mWarning[23m: Use caution while using this API since the underlying data buffer[0m
[0mis managed by the VM.[0m

[32m[1m#### napi_get_dataview_info[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_dataview_info(napi_env env,[39m
    [33m                                   napi_value dataview,[39m
    [33m                                   size_t* byte_length,[39m
    [33m                                   void** data,[39m
    [33m                                   napi_value* arraybuffer,[39m
    [33m                                   size_t* byte_offset)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] dataview[39m: [33mnapi_value[39m representing the [33mDataView[39m whose[0m
      [0mproperties to query.[0m
    * [0m[33m[out] byte_length[39m: [33mNumber[39m of bytes in the [33mDataView[39m.[0m
    * [0m[33m[out] data[39m: The data buffer underlying the [33mDataView[39m.[0m
      [0mIf byte_length is [33m0[39m, this may be [33mNULL[39m or any other pointer value.[0m
    * [0m[33m[out] arraybuffer[39m: [33mArrayBuffer[39m underlying the [33mDataView[39m.[0m
    * [0m[33m[out] byte_offset[39m: The byte offset within the data buffer from which[0m
      [0mto start projecting the [33mDataView[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns various properties of a [33mDataView[39m.[0m

[32m[1m#### napi_get_date_value[22m[39m

[90m<!-- YAML[39m
[90madded: v11.11.0[39m
[90mnapiVersion: 5[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_date_value(napi_env env,[39m
    [33m                                napi_value value,[39m
    [33m                                double* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing a JavaScript [33mDate[39m.[0m
    * [0m[33m[out] result[39m: Time value as a [33mdouble[39m represented as milliseconds since[0m
      [0mmidnight at the beginning of 01 January, 1970 UTC.[0m

[0mThis API does not observe leap seconds; they are ignored, as[0m
[0mECMAScript aligns with POSIX time specification.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-date [33mnapi_value[39m is passed[0m
[0min it returns [33mnapi_date_expected[39m.[0m

[0mThis API returns the C double primitive of time value for the given JavaScript[0m
[0m[33mDate[39m.[0m

[32m[1m#### napi_get_value_bool[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_bool(napi_env env, napi_value value, bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript [33mBoolean[39m.[0m
    * [0m[33m[out] result[39m: C boolean primitive equivalent of the given JavaScript[0m
      [0m[33mBoolean[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-boolean [33mnapi_value[39m is[0m
[0mpassed in it returns [33mnapi_boolean_expected[39m.[0m

[0mThis API returns the C boolean primitive equivalent of the given JavaScript[0m
[0m[33mBoolean[39m.[0m

[32m[1m#### napi_get_value_double[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_double(napi_env env,[39m
    [33m                                  napi_value value,[39m
    [33m                                  double* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript [33mNumber[39m.[0m
    * [0m[33m[out] result[39m: C double primitive equivalent of the given JavaScript[0m
      [0m[33mNumber[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-number [33mnapi_value[39m is passed[0m
[0min it returns [33mnapi_number_expected[39m.[0m

[0mThis API returns the C double primitive equivalent of the given JavaScript[0m
[0m[33mNumber[39m.[0m

[32m[1m#### napi_get_value_bigint_int64[22m[39m

[90m<!-- YAML[39m
[90madded: v10.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_bigint_int64(napi_env env,[39m
    [33m                                        napi_value value,[39m
    [33m                                        int64_t* result,[39m
    [33m                                        bool* lossless);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript [33mBigInt[39m.[0m
    * [0m[33m[out] result[39m: C [33mint64_t[39m primitive equivalent of the given JavaScript[0m
      [0m[33mBigInt[39m.[0m
    * [0m[33m[out] lossless[39m: Indicates whether the [33mBigInt[39m value was converted[0m
      [0mlosslessly.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-[33mBigInt[39m is passed in it[0m
[0mreturns [33mnapi_bigint_expected[39m.[0m

[0mThis API returns the C [33mint64_t[39m primitive equivalent of the given JavaScript[0m
[0m[33mBigInt[39m. If needed it will truncate the value, setting [33mlossless[39m to [33mfalse[39m.[0m

[32m[1m#### napi_get_value_bigint_uint64[22m[39m

[90m<!-- YAML[39m
[90madded: v10.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_bigint_uint64(napi_env env,[39m
    [33m                                        napi_value value,[39m
    [33m                                        uint64_t* result,[39m
    [33m                                        bool* lossless);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript [33mBigInt[39m.[0m
    * [0m[33m[out] result[39m: C [33muint64_t[39m primitive equivalent of the given JavaScript[0m
      [0m[33mBigInt[39m.[0m
    * [0m[33m[out] lossless[39m: Indicates whether the [33mBigInt[39m value was converted[0m
      [0mlosslessly.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-[33mBigInt[39m is passed in it[0m
[0mreturns [33mnapi_bigint_expected[39m.[0m

[0mThis API returns the C [33muint64_t[39m primitive equivalent of the given JavaScript[0m
[0m[33mBigInt[39m. If needed it will truncate the value, setting [33mlossless[39m to [33mfalse[39m.[0m

[32m[1m#### napi_get_value_bigint_words[22m[39m

[90m<!-- YAML[39m
[90madded: v10.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_bigint_words(napi_env env,[39m
    [33m                                        napi_value value,[39m
    [33m                                        int* sign_bit,[39m
    [33m                                        size_t* word_count,[39m
    [33m                                        uint64_t* words);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript [33mBigInt[39m.[0m
    * [0m[33m[out] sign_bit[39m: Integer representing if the JavaScript [33mBigInt[39m is positive[0m
      [0m or negative.[0m
    * [0m[33m[in/out] word_count[39m: Must be initialized to the length of the [33mwords[39m[0m
      [0m array. Upon return, it will be set to the actual number of words that[0m
      [0m would be needed to store this [33mBigInt[39m.[0m
    * [0m[33m[out] words[39m: Pointer to a pre-allocated 64-bit word array.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API converts a single [33mBigInt[39m value into a sign bit, 64-bit little-endian[0m
[0marray, and the number of elements in the array. [33msign_bit[39m and [33mwords[39m may be[0m
[0mboth set to [33mNULL[39m, in order to get only [33mword_count[39m.[0m

[32m[1m#### napi_get_value_external[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_external(napi_env env,[39m
    [33m                                    napi_value value,[39m
    [33m                                    void** result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript external value.[0m
    * [0m[33m[out] result[39m: Pointer to the data wrapped by the JavaScript external value.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-external [33mnapi_value[39m is[0m
[0mpassed in it returns [33mnapi_invalid_arg[39m.[0m

[0mThis API retrieves the external data pointer that was previously passed to[0m
[0m[33mnapi_create_external()[39m.[0m

[32m[1m#### napi_get_value_int32[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_int32(napi_env env,[39m
    [33m                                 napi_value value,[39m
    [33m                                 int32_t* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript [33mNumber[39m.[0m
    * [0m[33m[out] result[39m: C [33mint32[39m primitive equivalent of the given JavaScript[0m
      [0m[33mNumber[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-number [33mnapi_value[39m[0m
[0mis passed in [33mnapi_number_expected[39m.[0m

[0mThis API returns the C [33mint32[39m primitive equivalent[0m
[0mof the given JavaScript [33mNumber[39m.[0m

[0mIf the number exceeds the range of the 32 bit integer, then the result is[0m
[0mtruncated to the equivalent of the bottom 32 bits. This can result in a large[0m
[0mpositive number becoming a negative number if the value is > 2^31 -1.[0m

[0mNon-finite number values ([33mNaN[39m, [33m+Infinity[39m, or [33m-Infinity[39m) set the[0m
[0mresult to zero.[0m

[32m[1m#### napi_get_value_int64[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_int64(napi_env env,[39m
    [33m                                 napi_value value,[39m
    [33m                                 int64_t* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript [33mNumber[39m.[0m
    * [0m[33m[out] result[39m: C [33mint64[39m primitive equivalent of the given JavaScript[0m
      [0m[33mNumber[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-number [33mnapi_value[39m[0m
[0mis passed in it returns [33mnapi_number_expected[39m.[0m

[0mThis API returns the C [33mint64[39m primitive equivalent of the given JavaScript[0m
[0m[33mNumber[39m.[0m

[0m[33mNumber[39m values outside the range of [[33mNumber.MIN_SAFE_INTEGER[39m][][0m
[0m[33m-(2^53 - 1)[39m - [[33mNumber.MAX_SAFE_INTEGER[39m][] [33m(2^53 - 1)[39m will lose precision.[0m

[0mNon-finite number values ([33mNaN[39m, [33m+Infinity[39m, or [33m-Infinity[39m) set the[0m
[0mresult to zero.[0m

[32m[1m#### napi_get_value_string_latin1[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_string_latin1(napi_env env,[39m
    [33m                                         napi_value value,[39m
    [33m                                         char* buf,[39m
    [33m                                         size_t bufsize,[39m
    [33m                                         size_t* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript string.[0m
    * [0m[33m[in] buf[39m: Buffer to write the ISO-8859-1-encoded string into. If NULL is[0m
      [0mpassed in, the length of the string (in bytes) is returned.[0m
    * [0m[33m[in] bufsize[39m: Size of the destination buffer. When this value is[0m
      [0minsufficient, the returned string will be truncated.[0m
    * [0m[33m[out] result[39m: Number of bytes copied into the buffer, excluding the null[0m
      [0mterminator.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-[33mString[39m [33mnapi_value[39m[0m
[0mis passed in it returns [33mnapi_string_expected[39m.[0m

[0mThis API returns the ISO-8859-1-encoded string corresponding the value passed[0m
[0min.[0m

[32m[1m#### napi_get_value_string_utf8[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_string_utf8(napi_env env,[39m
    [33m                                       napi_value value,[39m
    [33m                                       char* buf,[39m
    [33m                                       size_t bufsize,[39m
    [33m                                       size_t* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript string.[0m
    * [0m[33m[in] buf[39m: Buffer to write the UTF8-encoded string into. If NULL is passed[0m
      [0min, the length of the string (in bytes) is returned.[0m
    * [0m[33m[in] bufsize[39m: Size of the destination buffer. When this value is[0m
      [0minsufficient, the returned string will be truncated.[0m
    * [0m[33m[out] result[39m: Number of bytes copied into the buffer, excluding the null[0m
      [0mterminator.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-[33mString[39m [33mnapi_value[39m[0m
[0mis passed in it returns [33mnapi_string_expected[39m.[0m

[0mThis API returns the UTF8-encoded string corresponding the value passed in.[0m

[32m[1m#### napi_get_value_string_utf16[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_string_utf16(napi_env env,[39m
    [33m                                        napi_value value,[39m
    [33m                                        char16_t* buf,[39m
    [33m                                        size_t bufsize,[39m
    [33m                                        size_t* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript string.[0m
    * [0m[33m[in] buf[39m: Buffer to write the UTF16-LE-encoded string into. If NULL is[0m
      [0mpassed in, the length of the string (in 2-byte code units) is returned.[0m
    * [0m[33m[in] bufsize[39m: Size of the destination buffer. When this value is[0m
      [0minsufficient, the returned string will be truncated.[0m
    * [0m[33m[out] result[39m: Number of 2-byte code units copied into the buffer, excluding[0m
      [0mthe null terminator.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-[33mString[39m [33mnapi_value[39m[0m
[0mis passed in it returns [33mnapi_string_expected[39m.[0m

[0mThis API returns the UTF16-encoded string corresponding the value passed in.[0m

[32m[1m#### napi_get_value_uint32[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_value_uint32(napi_env env,[39m
    [33m                                  napi_value value,[39m
    [33m                                  uint32_t* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: [33mnapi_value[39m representing JavaScript [33mNumber[39m.[0m
    * [0m[33m[out] result[39m: C primitive equivalent of the given [33mnapi_value[39m as a[0m
      [0m[33muint32_t[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-number [33mnapi_value[39m[0m
[0mis passed in it returns [33mnapi_number_expected[39m.[0m

[0mThis API returns the C primitive equivalent of the given [33mnapi_value[39m as a[0m
[0m[33muint32_t[39m.[0m

[32m[1m### Functions to get global instances[22m[39m

[32m[1m#### napi_get_boolean[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_boolean(napi_env env, bool value, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The value of the boolean to retrieve.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing JavaScript [33mBoolean[39m singleton to[0m
      [0mretrieve.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API is used to return the JavaScript singleton object that is used to[0m
[0mrepresent the given boolean value.[0m

[32m[1m#### napi_get_global[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_global(napi_env env, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing JavaScript [33mglobal[39m object.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns the [33mglobal[39m object.[0m

[32m[1m#### napi_get_null[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_null(napi_env env, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing JavaScript [33mnull[39m object.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns the [33mnull[39m object.[0m

[32m[1m#### napi_get_undefined[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_undefined(napi_env env, napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing JavaScript Undefined value.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns the Undefined object.[0m

[32m[1m## Working with JavaScript Values and Abstract Operations[22m[39m

[0mN-API exposes a set of APIs to perform some abstract operations on JavaScript[0m
[0mvalues. Some of these operations are documented under [Section 7][][0m
[0mof the [ECMAScript Language Specification][].[0m

[0mThese APIs support doing one of the following:[0m

    1. [0mCoerce JavaScript values to specific JavaScript types (such as [33mNumber[39m or[0m
       [0m[33mString[39m).[0m
    2. [0mCheck the type of a JavaScript value.[0m
    3. [0mCheck for equality between two JavaScript values.[0m

[32m[1m### napi_coerce_to_bool[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_coerce_to_bool(napi_env env,[39m
    [33m                                napi_value value,[39m
    [33m                                napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to coerce.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the coerced JavaScript [33mBoolean[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API implements the abstract operation [33mToBoolean()[39m as defined in[0m
[0m[Section 7.1.2][] of the ECMAScript Language Specification.[0m
[0mThis API can be re-entrant if getters are defined on the passed-in [33mObject[39m.[0m

[32m[1m### napi_coerce_to_number[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_coerce_to_number(napi_env env,[39m
    [33m                                  napi_value value,[39m
    [33m                                  napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to coerce.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the coerced JavaScript [33mNumber[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API implements the abstract operation [33mToNumber()[39m as defined in[0m
[0m[Section 7.1.3][] of the ECMAScript Language Specification.[0m
[0mThis API can be re-entrant if getters are defined on the passed-in [33mObject[39m.[0m

[32m[1m### napi_coerce_to_object[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_coerce_to_object(napi_env env,[39m
    [33m                                  napi_value value,[39m
    [33m                                  napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to coerce.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the coerced JavaScript [33mObject[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API implements the abstract operation [33mToObject()[39m as defined in[0m
[0m[Section 7.1.13][] of the ECMAScript Language Specification.[0m
[0mThis API can be re-entrant if getters are defined on the passed-in [33mObject[39m.[0m

[32m[1m### napi_coerce_to_string[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_coerce_to_string(napi_env env,[39m
    [33m                                  napi_value value,[39m
    [33m                                  napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to coerce.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the coerced JavaScript [33mString[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API implements the abstract operation [33mToString()[39m as defined in[0m
[0m[Section 7.1.13][] of the ECMAScript Language Specification.[0m
[0mThis API can be re-entrant if getters are defined on the passed-in [33mObject[39m.[0m

[32m[1m### napi_typeof[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_typeof(napi_env env, napi_value value, napi_valuetype* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value whose type to query.[0m
    * [0m[33m[out] result[39m: The type of the JavaScript value.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

    * [0m[33mnapi_invalid_arg[39m if the type of [33mvalue[39m is not a known ECMAScript type and[0m
      [0m[33mvalue[39m is not an External value.[0m

[0mThis API represents behavior similar to invoking the [33mtypeof[39m Operator on[0m
[0mthe object as defined in [Section 12.5.5][] of the ECMAScript Language[0m
[0mSpecification. However, it has support for detecting an External value.[0m
[0mIf [33mvalue[39m has a type that is invalid, an error is returned.[0m

[32m[1m### napi_instanceof[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_instanceof(napi_env env,[39m
    [33m                            napi_value object,[39m
    [33m                            napi_value constructor,[39m
    [33m                            bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] object[39m: The JavaScript value to check.[0m
    * [0m[33m[in] constructor[39m: The JavaScript function object of the constructor function[0m
      [0mto check against.[0m
    * [0m[33m[out] result[39m: Boolean that is set to true if [33mobject instanceof constructor[39m[0m
      [0mis true.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API represents invoking the [33minstanceof[39m Operator on the object as[0m
[0mdefined in [Section 12.10.4][] of the ECMAScript Language Specification.[0m

[32m[1m### napi_is_array[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_is_array(napi_env env, napi_value value, bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to check.[0m
    * [0m[33m[out] result[39m: Whether the given object is an array.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API represents invoking the [33mIsArray[39m operation on the object[0m
[0mas defined in [Section 7.2.2][] of the ECMAScript Language Specification.[0m

[32m[1m### napi_is_arraybuffer[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_is_arraybuffer(napi_env env, napi_value value, bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to check.[0m
    * [0m[33m[out] result[39m: Whether the given object is an [33mArrayBuffer[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API checks if the [33mObject[39m passed in is an array buffer.[0m

[32m[1m### napi_is_buffer[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_is_buffer(napi_env env, napi_value value, bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to check.[0m
    * [0m[33m[out] result[39m: Whether the given [33mnapi_value[39m represents a [33mnode::Buffer[39m[0m
      [0mobject.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API checks if the [33mObject[39m passed in is a buffer.[0m

[32m[1m### napi_is_date[22m[39m

[90m<!-- YAML[39m
[90madded: v11.11.0[39m
[90mnapiVersion: 5[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_is_date(napi_env env, napi_value value, bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to check.[0m
    * [0m[33m[out] result[39m: Whether the given [33mnapi_value[39m represents a JavaScript [33mDate[39m[0m
      [0mobject.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API checks if the [33mObject[39m passed in is a date.[0m

[32m[1m### napi_is_error[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_is_error(napi_env env, napi_value value, bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to check.[0m
    * [0m[33m[out] result[39m: Whether the given [33mnapi_value[39m represents an [33mError[39m object.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API checks if the [33mObject[39m passed in is an [33mError[39m.[0m

[32m[1m### napi_is_typedarray[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_is_typedarray(napi_env env, napi_value value, bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to check.[0m
    * [0m[33m[out] result[39m: Whether the given [33mnapi_value[39m represents a [33mTypedArray[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API checks if the [33mObject[39m passed in is a typed array.[0m

[32m[1m### napi_is_dataview[22m[39m

[90m<!-- YAML[39m
[90madded: v8.3.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_is_dataview(napi_env env, napi_value value, bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The JavaScript value to check.[0m
    * [0m[33m[out] result[39m: Whether the given [33mnapi_value[39m represents a [33mDataView[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API checks if the [33mObject[39m passed in is a [33mDataView[39m.[0m

[32m[1m### napi_strict_equals[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_strict_equals(napi_env env,[39m
    [33m                               napi_value lhs,[39m
    [33m                               napi_value rhs,[39m
    [33m                               bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] lhs[39m: The JavaScript value to check.[0m
    * [0m[33m[in] rhs[39m: The JavaScript value to check against.[0m
    * [0m[33m[out] result[39m: Whether the two [33mnapi_value[39m objects are equal.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API represents the invocation of the Strict Equality algorithm as[0m
[0mdefined in [Section 7.2.14][] of the ECMAScript Language Specification.[0m

[32m[1m### napi_detach_arraybuffer[22m[39m

[90m<!-- YAML[39m
[90madded: v13.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

    [33mnapi_status napi_detach_arraybuffer(napi_env env,[39m
    [33m                                    napi_value arraybuffer)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] arraybuffer[39m: The JavaScript [33mArrayBuffer[39m to be detached.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded. If a non-detachable [33mArrayBuffer[39m is[0m
[0mpassed in it returns [33mnapi_detachable_arraybuffer_expected[39m.[0m

[0mGenerally, an [33mArrayBuffer[39m is non-detachable if it has been detached before.[0m
[0mThe engine may impose additional conditions on whether an [33mArrayBuffer[39m is[0m
[0mdetachable. For example, V8 requires that the [33mArrayBuffer[39m be external,[0m
[0mthat is, created with [[33mnapi_create_external_arraybuffer[39m][].[0m

[0mThis API represents the invocation of the [33mArrayBuffer[39m detach operation as[0m
[0mdefined in [Section 24.1.1.3][] of the ECMAScript Language Specification.[0m

[32m[1m### napi_is_detached_arraybuffer[22m[39m

[90m<!-- YAML[39m
[90madded: v13.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

    [33mnapi_status napi_is_detached_arraybuffer(napi_env env,[39m
    [33m                                         napi_value arraybuffer,[39m
    [33m                                         bool* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] arraybuffer[39m: The JavaScript [33mArrayBuffer[39m to be checked.[0m
    * [0m[33m[out] result[39m: Whether the [33marraybuffer[39m is detached.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThe [33mArrayBuffer[39m is considered detached if its internal data is [33mnull[39m.[0m

[0mThis API represents the invocation of the [33mArrayBuffer[39m [33mIsDetachedBuffer[39m[0m
[0moperation as defined in [Section 24.1.1.2][] of the ECMAScript Language[0m
[0mSpecification.[0m

[32m[1m## Working with JavaScript Properties[22m[39m

[0mN-API exposes a set of APIs to get and set properties on JavaScript[0m
[0mobjects. Some of these types are documented under [Section 7][] of the[0m
[0m[ECMAScript Language Specification][].[0m

[0mProperties in JavaScript are represented as a tuple of a key and a value.[0m
[0mFundamentally, all property keys in N-API can be represented in one of the[0m
[0mfollowing forms:[0m

    * [0mNamed: a simple UTF8-encoded string[0m
    * [0mInteger-Indexed: an index value represented by [33muint32_t[39m[0m
    * [0mJavaScript value: these are represented in N-API by [33mnapi_value[39m. This can[0m
      [0mbe a [33mnapi_value[39m representing a [33mString[39m, [33mNumber[39m, or [33mSymbol[39m.[0m

[0mN-API values are represented by the type [33mnapi_value[39m.[0m
[0mAny N-API call that requires a JavaScript value takes in a [33mnapi_value[39m.[0m
[0mHowever, it's the caller's responsibility to make sure that the[0m
[0m[33mnapi_value[39m in question is of the JavaScript type expected by the API.[0m

[0mThe APIs documented in this section provide a simple interface to[0m
[0mget and set properties on arbitrary JavaScript objects represented by[0m
[0m[33mnapi_value[39m.[0m

[0mFor instance, consider the following JavaScript code snippet:[0m

    [94mconst[39m [37mobj[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [37mobj[39m[32m.[39m[37mmyProp[39m [93m=[39m [34m123[39m[90m;[39m

[0mThe equivalent can be done using N-API values with the following snippet:[0m

    [33mnapi_status status = napi_generic_failure;[39m
    [33m[39m
    [33m// const obj = {}[39m
    [33mnapi_value obj, value;[39m
    [33mstatus = napi_create_object(env, &obj);[39m
    [33mif (status != napi_ok) return status;[39m
    [33m[39m
    [33m// Create a napi_value for 123[39m
    [33mstatus = napi_create_int32(env, 123, &value);[39m
    [33mif (status != napi_ok) return status;[39m
    [33m[39m
    [33m// obj.myProp = 123[39m
    [33mstatus = napi_set_named_property(env, obj, "myProp", value);[39m
    [33mif (status != napi_ok) return status;[39m

[0mIndexed properties can be set in a similar manner. Consider the following[0m
[0mJavaScript snippet:[0m

    [94mconst[39m [37marr[39m [93m=[39m [33m[[39m[33m][39m[90m;[39m
    [37marr[39m[33m[[39m[34m123[39m[33m][39m [93m=[39m [92m'hello'[39m[90m;[39m

[0mThe equivalent can be done using N-API values with the following snippet:[0m

    [33mnapi_status status = napi_generic_failure;[39m
    [33m[39m
    [33m// const arr = [];[39m
    [33mnapi_value arr, value;[39m
    [33mstatus = napi_create_array(env, &arr);[39m
    [33mif (status != napi_ok) return status;[39m
    [33m[39m
    [33m// Create a napi_value for 'hello'[39m
    [33mstatus = napi_create_string_utf8(env, "hello", NAPI_AUTO_LENGTH, &value);[39m
    [33mif (status != napi_ok) return status;[39m
    [33m[39m
    [33m// arr[123] = 'hello';[39m
    [33mstatus = napi_set_element(env, arr, 123, value);[39m
    [33mif (status != napi_ok) return status;[39m

[0mProperties can be retrieved using the APIs described in this section.[0m
[0mConsider the following JavaScript snippet:[0m

    [94mconst[39m [37marr[39m [93m=[39m [33m[[39m[33m][39m[90m;[39m
    [94mconst[39m [37mvalue[39m [93m=[39m [37marr[39m[33m[[39m[34m123[39m[33m][39m[90m;[39m

[0mThe following is the approximate equivalent of the N-API counterpart:[0m

    [33mnapi_status status = napi_generic_failure;[39m
    [33m[39m
    [33m// const arr = [][39m
    [33mnapi_value arr, value;[39m
    [33mstatus = napi_create_array(env, &arr);[39m
    [33mif (status != napi_ok) return status;[39m
    [33m[39m
    [33m// const value = arr[123][39m
    [33mstatus = napi_get_element(env, arr, 123, &value);[39m
    [33mif (status != napi_ok) return status;[39m

[0mFinally, multiple properties can also be defined on an object for performance[0m
[0mreasons. Consider the following JavaScript:[0m

    [94mconst[39m [37mobj[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [37mObject[39m[32m.[39m[37mdefineProperties[39m[90m([39m[37mobj[39m[32m,[39m [33m{[39m
      [32m'foo'[39m[93m:[39m [33m{[39m [37mvalue[39m[93m:[39m [34m123[39m[32m,[39m [37mwritable[39m[93m:[39m [91mtrue[39m[32m,[39m [37mconfigurable[39m[93m:[39m [91mtrue[39m[32m,[39m [37menumerable[39m[93m:[39m [91mtrue[39m [33m}[39m[32m,[39m
      [32m'bar'[39m[93m:[39m [33m{[39m [37mvalue[39m[93m:[39m [34m456[39m[32m,[39m [37mwritable[39m[93m:[39m [91mtrue[39m[32m,[39m [37mconfigurable[39m[93m:[39m [91mtrue[39m[32m,[39m [37menumerable[39m[93m:[39m [91mtrue[39m [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe following is the approximate equivalent of the N-API counterpart:[0m

    [33mnapi_status status = napi_status_generic_failure;[39m
    [33m[39m
    [33m// const obj = {};[39m
    [33mnapi_value obj;[39m
    [33mstatus = napi_create_object(env, &obj);[39m
    [33mif (status != napi_ok) return status;[39m
    [33m[39m
    [33m// Create napi_values for 123 and 456[39m
    [33mnapi_value fooValue, barValue;[39m
    [33mstatus = napi_create_int32(env, 123, &fooValue);[39m
    [33mif (status != napi_ok) return status;[39m
    [33mstatus = napi_create_int32(env, 456, &barValue);[39m
    [33mif (status != napi_ok) return status;[39m
    [33m[39m
    [33m// Set the properties[39m
    [33mnapi_property_descriptor descriptors[] = {[39m
    [33m  { "foo", NULL, NULL, NULL, NULL, fooValue, napi_default, NULL },[39m
    [33m  { "bar", NULL, NULL, NULL, NULL, barValue, napi_default, NULL }[39m
    [33m}[39m
    [33mstatus = napi_define_properties(env,[39m
    [33m                                obj,[39m
    [33m                                sizeof(descriptors) / sizeof(descriptors[0]),[39m
    [33m                                descriptors);[39m
    [33mif (status != napi_ok) return status;[39m

[32m[1m### Structures[22m[39m

[32m[1m#### napi_property_attributes[22m[39m

    [33mtypedef enum {[39m
    [33m  napi_default = 0,[39m
    [33m  napi_writable = 1 << 0,[39m
    [33m  napi_enumerable = 1 << 1,[39m
    [33m  napi_configurable = 1 << 2,[39m
    [33m[39m
    [33m  // Used with napi_define_class to distinguish static properties[39m
    [33m  // from instance properties. Ignored by napi_define_properties.[39m
    [33m  napi_static = 1 << 10,[39m
    [33m} napi_property_attributes;[39m

[0m[33mnapi_property_attributes[39m are flags used to control the behavior of properties[0m
[0mset on a JavaScript object. Other than [33mnapi_static[39m they correspond to the[0m
[0mattributes listed in [Section 6.1.7.1][][0m
[0mof the [ECMAScript Language Specification][].[0m
[0mThey can be one or more of the following bitflags:[0m

    * [0m[33mnapi_default[39m: No explicit attributes are set on the property. By default, a[0m
      [0mproperty is read only, not enumerable and not configurable.[0m
    * [0m[33mnapi_writable[39m: The property is writable.[0m
    * [0m[33mnapi_enumerable[39m: The property is enumerable.[0m
    * [0m[33mnapi_configurable[39m: The property is configurable as defined in[0m
      [0m[Section 6.1.7.1][] of the [ECMAScript Language Specification][].[0m
    * [0m[33mnapi_static[39m: The property will be defined as a static property on a class as[0m
      [0mopposed to an instance property, which is the default. This is used only by[0m
      [0m[[33mnapi_define_class[39m][]. It is ignored by [33mnapi_define_properties[39m.[0m

[32m[1m#### napi_property_descriptor[22m[39m

    [33mtypedef struct {[39m
    [33m  // One of utf8name or name should be NULL.[39m
    [33m  const char* utf8name;[39m
    [33m  napi_value name;[39m
    [33m[39m
    [33m  napi_callback method;[39m
    [33m  napi_callback getter;[39m
    [33m  napi_callback setter;[39m
    [33m  napi_value value;[39m
    [33m[39m
    [33m  napi_property_attributes attributes;[39m
    [33m  void* data;[39m
    [33m} napi_property_descriptor;[39m

    * [0m[33mutf8name[39m: Optional [33mString[39m describing the key for the property,[0m
      [0mencoded as UTF8. One of [33mutf8name[39m or [33mname[39m must be provided for the[0m
      [0mproperty.[0m
    * [0m[33mname[39m: Optional [33mnapi_value[39m that points to a JavaScript string or symbol[0m
      [0mto be used as the key for the property. One of [33mutf8name[39m or [33mname[39m must[0m
      [0mbe provided for the property.[0m
    * [0m[33mvalue[39m: The value that's retrieved by a get access of the property if the[0m
      [0mproperty is a data property. If this is passed in, set [33mgetter[39m, [33msetter[39m,[0m
      [0m[33mmethod[39m and [33mdata[39m to [33mNULL[39m (since these members won't be used).[0m
    * [0m[33mgetter[39m: A function to call when a get access of the property is performed.[0m
      [0mIf this is passed in, set [33mvalue[39m and [33mmethod[39m to [33mNULL[39m (since these members[0m
      [0mwon't be used). The given function is called implicitly by the runtime when[0m
      [0mthe property is accessed from JavaScript code (or if a get on the property is[0m
      [0mperformed using a N-API call).[0m
    * [0m[33msetter[39m: A function to call when a set access of the property is performed.[0m
      [0mIf this is passed in, set [33mvalue[39m and [33mmethod[39m to [33mNULL[39m (since these members[0m
      [0mwon't be used). The given function is called implicitly by the runtime when[0m
      [0mthe property is set from JavaScript code (or if a set on the property is[0m
      [0mperformed using a N-API call).[0m
    * [0m[33mmethod[39m: Set this to make the property descriptor object's [33mvalue[39m[0m
      [0mproperty to be a JavaScript function represented by [33mmethod[39m. If this is[0m
      [0mpassed in, set [33mvalue[39m, [33mgetter[39m and [33msetter[39m to [33mNULL[39m (since these members[0m
      [0mwon't be used).[0m
    * [0m[33mattributes[39m: The attributes associated with the particular property. See[0m
      [0m[[33mnapi_property_attributes[39m][].[0m
    * [0m[33mdata[39m: The callback data passed into [33mmethod[39m, [33mgetter[39m and [33msetter[39m if this[0m
      [0mfunction is invoked.[0m

[32m[1m### Functions[22m[39m

[32m[1m#### napi_get_property_names[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_property_names(napi_env env,[39m
    [33m                                    napi_value object,[39m
    [33m                                    napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object from which to retrieve the properties.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing an array of JavaScript values[0m
      [0mthat represent the property names of the object. The API can be used to[0m
      [0miterate over [33mresult[39m using [[33mnapi_get_array_length[39m][][0m
      [0mand [[33mnapi_get_element[39m][].[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns the names of the enumerable properties of [33mobject[39m as an array[0m
[0mof strings. The properties of [33mobject[39m whose key is a symbol will not be[0m
[0mincluded.[0m

[32m[1m#### napi_get_all_property_names[22m[39m

[90m<!-- YAML[39m
[90madded: v13.7.0[39m
[90mnapiVersion: 6[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_get_all_property_names(napi_env env,[39m
    [33m                            napi_value object,[39m
    [33m                            napi_key_collection_mode key_mode,[39m
    [33m                            napi_key_filter key_filter,[39m
    [33m                            napi_key_conversion key_conversion,[39m
    [33m                            napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object from which to retrieve the properties.[0m
    * [0m[33m[in] key_mode[39m: Whether to retrieve prototype properties as well.[0m
    * [0m[33m[in] key_filter[39m: Which properties to retrieve[0m
      [0m(enumerable/readable/writable).[0m
    * [0m[33m[in] key_conversion[39m: Whether to convert numbered property keys to strings.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing an array of JavaScript values[0m
      [0mthat represent the property names of the object. [[33mnapi_get_array_length[39m][] and[0m
      [0m[[33mnapi_get_element[39m][] can be used to iterate over [33mresult[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns an array containing the names of the available properties[0m
[0mof this object.[0m

[32m[1m#### napi_set_property[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_set_property(napi_env env,[39m
    [33m                              napi_value object,[39m
    [33m                              napi_value key,[39m
    [33m                              napi_value value);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object on which to set the property.[0m
    * [0m[33m[in] key[39m: The name of the property to set.[0m
    * [0m[33m[in] value[39m: The property value.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API set a property on the [33mObject[39m passed in.[0m

[32m[1m#### napi_get_property[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_property(napi_env env,[39m
    [33m                              napi_value object,[39m
    [33m                              napi_value key,[39m
    [33m                              napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object from which to retrieve the property.[0m
    * [0m[33m[in] key[39m: The name of the property to retrieve.[0m
    * [0m[33m[out] result[39m: The value of the property.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API gets the requested property from the [33mObject[39m passed in.[0m

[32m[1m#### napi_has_property[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_has_property(napi_env env,[39m
    [33m                              napi_value object,[39m
    [33m                              napi_value key,[39m
    [33m                              bool* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object to query.[0m
    * [0m[33m[in] key[39m: The name of the property whose existence to check.[0m
    * [0m[33m[out] result[39m: Whether the property exists on the object or not.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API checks if the [33mObject[39m passed in has the named property.[0m

[32m[1m#### napi_delete_property[22m[39m

[90m<!-- YAML[39m
[90madded: v8.2.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_delete_property(napi_env env,[39m
    [33m                                 napi_value object,[39m
    [33m                                 napi_value key,[39m
    [33m                                 bool* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object to query.[0m
    * [0m[33m[in] key[39m: The name of the property to delete.[0m
    * [0m[33m[out] result[39m: Whether the property deletion succeeded or not. [33mresult[39m can[0m
      [0moptionally be ignored by passing [33mNULL[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API attempts to delete the [33mkey[39m own property from [33mobject[39m.[0m

[32m[1m#### napi_has_own_property[22m[39m

[90m<!-- YAML[39m
[90madded: v8.2.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_has_own_property(napi_env env,[39m
    [33m                                  napi_value object,[39m
    [33m                                  napi_value key,[39m
    [33m                                  bool* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object to query.[0m
    * [0m[33m[in] key[39m: The name of the own property whose existence to check.[0m
    * [0m[33m[out] result[39m: Whether the own property exists on the object or not.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API checks if the [33mObject[39m passed in has the named own property. [33mkey[39m must[0m
[0mbe a string or a [33mSymbol[39m, or an error will be thrown. N-API will not perform[0m
[0many conversion between data types.[0m

[32m[1m#### napi_set_named_property[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_set_named_property(napi_env env,[39m
    [33m                                    napi_value object,[39m
    [33m                                    const char* utf8Name,[39m
    [33m                                    napi_value value);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object on which to set the property.[0m
    * [0m[33m[in] utf8Name[39m: The name of the property to set.[0m
    * [0m[33m[in] value[39m: The property value.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis method is equivalent to calling [[33mnapi_set_property[39m][] with a [33mnapi_value[39m[0m
[0mcreated from the string passed in as [33mutf8Name[39m.[0m

[32m[1m#### napi_get_named_property[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_named_property(napi_env env,[39m
    [33m                                    napi_value object,[39m
    [33m                                    const char* utf8Name,[39m
    [33m                                    napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object from which to retrieve the property.[0m
    * [0m[33m[in] utf8Name[39m: The name of the property to get.[0m
    * [0m[33m[out] result[39m: The value of the property.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis method is equivalent to calling [[33mnapi_get_property[39m][] with a [33mnapi_value[39m[0m
[0mcreated from the string passed in as [33mutf8Name[39m.[0m

[32m[1m#### napi_has_named_property[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_has_named_property(napi_env env,[39m
    [33m                                    napi_value object,[39m
    [33m                                    const char* utf8Name,[39m
    [33m                                    bool* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object to query.[0m
    * [0m[33m[in] utf8Name[39m: The name of the property whose existence to check.[0m
    * [0m[33m[out] result[39m: Whether the property exists on the object or not.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis method is equivalent to calling [[33mnapi_has_property[39m][] with a [33mnapi_value[39m[0m
[0mcreated from the string passed in as [33mutf8Name[39m.[0m

[32m[1m#### napi_set_element[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_set_element(napi_env env,[39m
    [33m                             napi_value object,[39m
    [33m                             uint32_t index,[39m
    [33m                             napi_value value);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object from which to set the properties.[0m
    * [0m[33m[in] index[39m: The index of the property to set.[0m
    * [0m[33m[in] value[39m: The property value.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API sets and element on the [33mObject[39m passed in.[0m

[32m[1m#### napi_get_element[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_element(napi_env env,[39m
    [33m                             napi_value object,[39m
    [33m                             uint32_t index,[39m
    [33m                             napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object from which to retrieve the property.[0m
    * [0m[33m[in] index[39m: The index of the property to get.[0m
    * [0m[33m[out] result[39m: The value of the property.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API gets the element at the requested index.[0m

[32m[1m#### napi_has_element[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_has_element(napi_env env,[39m
    [33m                             napi_value object,[39m
    [33m                             uint32_t index,[39m
    [33m                             bool* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object to query.[0m
    * [0m[33m[in] index[39m: The index of the property whose existence to check.[0m
    * [0m[33m[out] result[39m: Whether the property exists on the object or not.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns if the [33mObject[39m passed in has an element at the[0m
[0mrequested index.[0m

[32m[1m#### napi_delete_element[22m[39m

[90m<!-- YAML[39m
[90madded: v8.2.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_delete_element(napi_env env,[39m
    [33m                                napi_value object,[39m
    [33m                                uint32_t index,[39m
    [33m                                bool* result);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object to query.[0m
    * [0m[33m[in] index[39m: The index of the property to delete.[0m
    * [0m[33m[out] result[39m: Whether the element deletion succeeded or not. [33mresult[39m can[0m
      [0moptionally be ignored by passing [33mNULL[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API attempts to delete the specified [33mindex[39m from [33mobject[39m.[0m

[32m[1m#### napi_define_properties[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_define_properties(napi_env env,[39m
    [33m                                   napi_value object,[39m
    [33m                                   size_t property_count,[39m
    [33m                                   const napi_property_descriptor* properties);[39m

    * [0m[33m[in] env[39m: The environment that the N-API call is invoked under.[0m
    * [0m[33m[in] object[39m: The object from which to retrieve the properties.[0m
    * [0m[33m[in] property_count[39m: The number of elements in the [33mproperties[39m array.[0m
    * [0m[33m[in] properties[39m: The array of property descriptors.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis method allows the efficient definition of multiple properties on a given[0m
[0mobject. The properties are defined using property descriptors (see[0m
[0m[[33mnapi_property_descriptor[39m][]). Given an array of such property descriptors,[0m
[0mthis API will set the properties on the object one at a time, as defined by[0m
[0m[33mDefineOwnProperty()[39m (described in [Section 9.1.6][] of the ECMA-262[0m
[0mspecification).[0m

[32m[1m## Working with JavaScript Functions[22m[39m

[0mN-API provides a set of APIs that allow JavaScript code to[0m
[0mcall back into native code. N-API APIs that support calling back[0m
[0minto native code take in a callback functions represented by[0m
[0mthe [33mnapi_callback[39m type. When the JavaScript VM calls back to[0m
[0mnative code, the [33mnapi_callback[39m function provided is invoked. The APIs[0m
[0mdocumented in this section allow the callback function to do the[0m
[0mfollowing:[0m

    * [0mGet information about the context in which the callback was invoked.[0m
    * [0mGet the arguments passed into the callback.[0m
    * [0mReturn a [33mnapi_value[39m back from the callback.[0m

[0mAdditionally, N-API provides a set of functions which allow calling[0m
[0mJavaScript functions from native code. One can either call a function[0m
[0mlike a regular JavaScript function call, or as a constructor[0m
[0mfunction.[0m

[0mAny non-[33mNULL[39m data which is passed to this API via the [33mdata[39m field of the[0m
[0m[33mnapi_property_descriptor[39m items can be associated with [33mobject[39m and freed[0m
[0mwhenever [33mobject[39m is garbage-collected by passing both [33mobject[39m and the data to[0m
[0m[[33mnapi_add_finalizer[39m][].[0m

[32m[1m### napi_call_function[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_call_function(napi_env env,[39m
    [33m                                           napi_value recv,[39m
    [33m                                           napi_value func,[39m
    [33m                                           size_t argc,[39m
    [33m                                           const napi_value* argv,[39m
    [33m                                           napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] recv[39m: The [33mthis[39m object passed to the called function.[0m
    * [0m[33m[in] func[39m: [33mnapi_value[39m representing the JavaScript function to be invoked.[0m
    * [0m[33m[in] argc[39m: The count of elements in the [33margv[39m array.[0m
    * [0m[33m[in] argv[39m: Array of [33mnapi_values[39m representing JavaScript values passed in[0m
      [0mas arguments to the function.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the JavaScript object returned.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis method allows a JavaScript function object to be called from a native[0m
[0madd-on. This is the primary mechanism of calling back [3mfrom[23m the add-on's[0m
[0mnative code [3minto[23m JavaScript. For the special case of calling into JavaScript[0m
[0mafter an async operation, see [[33mnapi_make_callback[39m][].[0m

[0mA sample use case might look as follows. Consider the following JavaScript[0m
[0msnippet:[0m

    [94mfunction[39m [37mAddTwo[39m[90m([39m[37mnum[39m[90m)[39m [33m{[39m
      [31mreturn[39m [37mnum[39m [93m+[39m [34m2[39m[90m;[39m
    [33m}[39m

[0mThen, the above function can be invoked from a native add-on using the[0m
[0mfollowing code:[0m

[0m```C[0m
[0m// Get the function named "AddTwo" on the global object[0m
[0mnapi_value global, add_two, arg;[0m
[0mnapi_status status = napi_get_global(env, &global);[0m
[0mif (status != napi_ok) return;[0m

[0mstatus = napi_get_named_property(env, global, "AddTwo", &add_two);[0m
[0mif (status != napi_ok) return;[0m

[0m// const arg = 1337[0m
[0mstatus = napi_create_int32(env, 1337, &arg);[0m
[0mif (status != napi_ok) return;[0m

[0mnapi_value* argv = &arg;[0m
[0msize_t argc = 1;[0m

[0m// AddTwo(arg);[0m
[0mnapi_value return_val;[0m
[0mstatus = napi_call_function(env, global, add_two, argc, argv, &return_val);[0m
[0mif (status != napi_ok) return;[0m

[0m// Con[0m

[0mvert the result back to a native type[0m
[0mint32_t result;[0m
[0mstatus = napi_get_value_int32(env, return_val, &result);[0m
[0mif (status != napi_ok) return;[0m

    [33m[39m
    [33m### napi_create_function[39m
    [33m<!-- YAML[39m
    [33madded: v8.0.0[39m
    [33mnapiVersion: 1[39m
    [33m-->[39m
    [33m[39m
    [33m```C[39m
    [33mnapi_status napi_create_function(napi_env env,[39m
    [33m                                 const char* utf8name,[39m
    [33m                                 size_t length,[39m
    [33m                                 napi_callback cb,[39m
    [33m                                 void* data,[39m
    [33m                                 napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] utf8Name[39m: The name of the function encoded as UTF8. This is visible[0m
      [0mwithin JavaScript as the new function object's [33mname[39m property.[0m
    * [0m[33m[in] length[39m: The length of the [33mutf8name[39m in bytes, or [33mNAPI_AUTO_LENGTH[39m if[0m
      [0mit is null-terminated.[0m
    * [0m[33m[in] cb[39m: The native function which should be called when this function[0m
      [0mobject is invoked.[0m
    * [0m[33m[in] data[39m: User-provided data context. This will be passed back into the[0m
      [0mfunction when invoked later.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the JavaScript function object for[0m
      [0mthe newly created function.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API allows an add-on author to create a function object in native code.[0m
[0mThis is the primary mechanism to allow calling [3minto[23m the add-on's native code[0m
[0m[3mfrom[23m JavaScript.[0m

[0mThe newly created function is not automatically visible from script after this[0m
[0mcall. Instead, a property must be explicitly set on any object that is visible[0m
[0mto JavaScript, in order for the function to be accessible from script.[0m

[0mIn order to expose a function as part of the[0m
[0madd-on's module exports, set the newly created function on the exports[0m
[0mobject. A sample module might look as follows:[0m

    [33mnapi_value SayHello(napi_env env, napi_callback_info info) {[39m
    [33m  printf("Hello\n");[39m
    [33m  return NULL;[39m
    [33m}[39m
    [33m[39m
    [33mnapi_value Init(napi_env env, napi_value exports) {[39m
    [33m  napi_status status;[39m
    [33m[39m
    [33m  napi_value fn;[39m
    [33m  status = napi_create_function(env, NULL, 0, SayHello, NULL, &fn);[39m
    [33m  if (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m  status = napi_set_named_property(env, exports, "sayHello", fn);[39m
    [33m  if (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m  return exports;[39m
    [33m}[39m
    [33m[39m
    [33mNAPI_MODULE(NODE_GYP_MODULE_NAME, Init)[39m

[0mGiven the above code, the add-on can be used from JavaScript as follows:[0m

    [94mconst[39m [37mmyaddon[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./addon'[39m[90m)[39m[90m;[39m
    [37mmyaddon[39m[32m.[39m[37msayHello[39m[90m([39m[90m)[39m[90m;[39m

[0mThe string passed to [33mrequire()[39m is the name of the target in [33mbinding.gyp[39m[0m
[0mresponsible for creating the [33m.node[39m file.[0m

[0mAny non-[33mNULL[39m data which is passed to this API via the [33mdata[39m parameter can[0m
[0mbe associated with the resulting JavaScript function (which is returned in the[0m
[0m[33mresult[39m parameter) and freed whenever the function is garbage-collected by[0m
[0mpassing both the JavaScript function and the data to [[33mnapi_add_finalizer[39m][].[0m

[0mJavaScript [33mFunction[39ms are described in [Section 19.2][] of the ECMAScript[0m
[0mLanguage Specification.[0m

[32m[1m### napi_get_cb_info[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_cb_info(napi_env env,[39m
    [33m                             napi_callback_info cbinfo,[39m
    [33m                             size_t* argc,[39m
    [33m                             napi_value* argv,[39m
    [33m                             napi_value* thisArg,[39m
    [33m                             void** data)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] cbinfo[39m: The callback info passed into the callback function.[0m
    * [0m[33m[in-out] argc[39m: Specifies the size of the provided [33margv[39m array and receives[0m
      [0mthe actual count of arguments.[0m
    * [0m[33m[out] argv[39m: Buffer to which the [33mnapi_value[39m representing the arguments are[0m
      [0mcopied. If there are more arguments than the provided count, only the[0m
      [0mrequested number of arguments are copied. If there are fewer arguments[0m
      [0mprovided than claimed, the rest of [33margv[39m is filled with [33mnapi_value[39m values[0m
      [0mthat represent [33mundefined[39m.[0m
    * [0m[33m[out] this[39m: Receives the JavaScript [33mthis[39m argument for the call.[0m
    * [0m[33m[out] data[39m: Receives the data pointer for the callback.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis method is used within a callback function to retrieve details about the[0m
[0mcall like the arguments and the [33mthis[39m pointer from a given callback info.[0m

[32m[1m### napi_get_new_target[22m[39m

[90m<!-- YAML[39m
[90madded: v8.6.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_new_target(napi_env env,[39m
    [33m                                napi_callback_info cbinfo,[39m
    [33m                                napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] cbinfo[39m: The callback info passed into the callback function.[0m
    * [0m[33m[out] result[39m: The [33mnew.target[39m of the constructor call.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns the [33mnew.target[39m of the constructor call. If the current[0m
[0mcallback is not a constructor call, the result is [33mNULL[39m.[0m

[32m[1m### napi_new_instance[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_new_instance(napi_env env,[39m
    [33m                              napi_value cons,[39m
    [33m                              size_t argc,[39m
    [33m                              napi_value* argv,[39m
    [33m                              napi_value* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] cons[39m: [33mnapi_value[39m representing the JavaScript function to be invoked[0m
      [0mas a constructor.[0m
    * [0m[33m[in] argc[39m: The count of elements in the [33margv[39m array.[0m
    * [0m[33m[in] argv[39m: Array of JavaScript values as [33mnapi_value[39m representing the[0m
      [0marguments to the constructor.[0m
    * [0m[33m[out] result[39m: [33mnapi_value[39m representing the JavaScript object returned,[0m
      [0mwhich in this case is the constructed object.[0m

[0mThis method is used to instantiate a new JavaScript value using a given[0m
[0m[33mnapi_value[39m that represents the constructor for the object. For example,[0m
[0mconsider the following snippet:[0m

    [94mfunction[39m [37mMyObject[39m[90m([39m[37mparam[39m[90m)[39m [33m{[39m
      [91mthis[39m[32m.[39m[37mparam[39m [93m=[39m [37mparam[39m[90m;[39m
    [33m}[39m
    
    [94mconst[39m [37marg[39m [93m=[39m [92m'hello'[39m[90m;[39m
    [94mconst[39m [37mvalue[39m [93m=[39m [31mnew[39m [37mMyObject[39m[90m([39m[37marg[39m[90m)[39m[90m;[39m

[0mThe following can be approximated in N-API using the following snippet:[0m

    [33m// Get the constructor function MyObject[39m
    [33mnapi_value global, constructor, arg, value;[39m
    [33mnapi_status status = napi_get_global(env, &global);[39m
    [33mif (status != napi_ok) return;[39m
    [33m[39m
    [33mstatus = napi_get_named_property(env, global, "MyObject", &constructor);[39m
    [33mif (status != napi_ok) return;[39m
    [33m[39m
    [33m// const arg = "hello"[39m
    [33mstatus = napi_create_string_utf8(env, "hello", NAPI_AUTO_LENGTH, &arg);[39m
    [33mif (status != napi_ok) return;[39m
    [33m[39m
    [33mnapi_value* argv = &arg;[39m
    [33msize_t argc = 1;[39m
    [33m[39m
    [33m// const value = new MyObject(arg)[39m
    [33mstatus = napi_new_instance(env, constructor, argc, argv, &value);[39m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[32m[1m## Object Wrap[22m[39m

[0mN-API offers a way to "wrap" C++ classes and instances so that the class[0m
[0mconstructor and methods can be called from JavaScript.[0m

    1. [0mThe [[33mnapi_define_class[39m][] API defines a JavaScript class with constructor,[0m
       [0m static properties and methods, and instance properties and methods that[0m
       [0m correspond to the C++ class.[0m
    2. [0mWhen JavaScript code invokes the constructor, the constructor callback[0m
       [0m uses [[33mnapi_wrap[39m][] to wrap a new C++ instance in a JavaScript object,[0m
       [0m then returns the wrapper object.[0m
    3. [0mWhen JavaScript code invokes a method or property accessor on the class,[0m
       [0m the corresponding [33mnapi_callback[39m C++ function is invoked. For an instance[0m
       [0m callback, [[33mnapi_unwrap[39m][] obtains the C++ instance that is the target of[0m
       [0m the call.[0m

[0mFor wrapped objects it may be difficult to distinguish between a function[0m
[0mcalled on a class prototype and a function called on an instance of a class.[0m
[0mA common pattern used to address this problem is to save a persistent[0m
[0mreference to the class constructor for later [33minstanceof[39m checks.[0m

    [33mnapi_value MyClass_constructor = NULL;[39m
    [33mstatus = napi_get_reference_value(env, MyClass::es_constructor, &MyClass_constructor);[39m
    [33massert(napi_ok == status);[39m
    [33mbool is_instance = false;[39m
    [33mstatus = napi_instanceof(env, es_this, MyClass_constructor, &is_instance);[39m
    [33massert(napi_ok == status);[39m
    [33mif (is_instance) {[39m
    [33m  // napi_unwrap() ...[39m
    [33m} else {[39m
    [33m  // otherwise...[39m
    [33m}[39m

[0mThe reference must be freed once it is no longer needed.[0m

[32m[1m### napi_define_class[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_define_class(napi_env env,[39m
    [33m                              const char* utf8name,[39m
    [33m                              size_t length,[39m
    [33m                              napi_callback constructor,[39m
    [33m                              void* data,[39m
    [33m                              size_t property_count,[39m
    [33m                              const napi_property_descriptor* properties,[39m
    [33m                              napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] utf8name[39m: Name of the JavaScript constructor function; this is[0m
      [0mnot required to be the same as the C++ class name, though it is recommended[0m
      [0mfor clarity.[0m
    * [0m[33m[in] length[39m: The length of the [33mutf8name[39m in bytes, or [33mNAPI_AUTO_LENGTH[39m[0m
      [0mif it is null-terminated.[0m
    * [0m[33m[in] constructor[39m: Callback function that handles constructing instances[0m
      [0mof the class. (This should be a static method on the class, not an actual[0m
      [0mC++ constructor function.)[0m
    * [0m[33m[in] data[39m: Optional data to be passed to the constructor callback as[0m
      [0mthe [33mdata[39m property of the callback info.[0m
    * [0m[33m[in] property_count[39m: Number of items in the [33mproperties[39m array argument.[0m
    * [0m[33m[in] properties[39m: Array of property descriptors describing static and[0m
      [0minstance data properties, accessors, and methods on the class[0m
      [0mSee [33mnapi_property_descriptor[39m.[0m
    * [0m[33m[out] result[39m: A [33mnapi_value[39m representing the constructor function for[0m
      [0mthe class.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mDefines a JavaScript class that corresponds to a C++ class, including:[0m

    * [0mA JavaScript constructor function that has the class name and invokes the[0m
      [0mprovided C++ constructor callback.[0m
    * [0mProperties on the constructor function corresponding to [3mstatic[23m data[0m
      [0mproperties, accessors, and methods of the C++ class (defined by[0m
      [0mproperty descriptors with the [33mnapi_static[39m attribute).[0m
    * [0mProperties on the constructor function's [33mprototype[39m object corresponding to[0m
      [0m[3mnon-static[23m data properties, accessors, and methods of the C++ class[0m
      [0m(defined by property descriptors without the [33mnapi_static[39m attribute).[0m

[0mThe C++ constructor callback should be a static method on the class that calls[0m
[0mthe actual class constructor, then wraps the new C++ instance in a JavaScript[0m
[0mobject, and returns the wrapper object. See [33mnapi_wrap()[39m for details.[0m

[0mThe JavaScript constructor function returned from [[33mnapi_define_class[39m][] is[0m
[0moften saved and used later, to construct new instances of the class from native[0m
[0mcode, and/or check whether provided values are instances of the class. In that[0m
[0mcase, to prevent the function value from being garbage-collected, create a[0m
[0mpersistent reference to it using [[33mnapi_create_reference[39m][] and ensure the[0m
[0mreference count is kept >= 1.[0m

[0mAny non-[33mNULL[39m data which is passed to this API via the [33mdata[39m parameter or via[0m
[0mthe [33mdata[39m field of the [33mnapi_property_descriptor[39m array items can be associated[0m
[0mwith the resulting JavaScript constructor (which is returned in the [33mresult[39m[0m
[0mparameter) and freed whenever the class is garbage-collected by passing both[0m
[0mthe JavaScript function and the data to [[33mnapi_add_finalizer[39m][].[0m

[32m[1m### napi_wrap[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_wrap(napi_env env,[39m
    [33m                      napi_value js_object,[39m
    [33m                      void* native_object,[39m
    [33m                      napi_finalize finalize_cb,[39m
    [33m                      void* finalize_hint,[39m
    [33m                      napi_ref* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] js_object[39m: The JavaScript object that will be the wrapper for the[0m
      [0mnative object.[0m
    * [0m[33m[in] native_object[39m: The native instance that will be wrapped in the[0m
      [0mJavaScript object.[0m
    * [0m[33m[in] finalize_cb[39m: Optional native callback that can be used to free the[0m
      [0mnative instance when the JavaScript object is ready for garbage-collection.[0m
    * [0m[33m[in] finalize_hint[39m: Optional contextual hint that is passed to the[0m
      [0mfinalize callback.[0m
    * [0m[33m[out] result[39m: Optional reference to the wrapped object.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mWraps a native instance in a JavaScript object. The native instance can be[0m
[0mretrieved later using [33mnapi_unwrap()[39m.[0m

[0mWhen JavaScript code invokes a constructor for a class that was defined using[0m
[0m[33mnapi_define_class()[39m, the [33mnapi_callback[39m for the constructor is invoked.[0m
[0mAfter constructing an instance of the native class, the callback must then call[0m
[0m[33mnapi_wrap()[39m to wrap the newly constructed instance in the already-created[0m
[0mJavaScript object that is the [33mthis[39m argument to the constructor callback.[0m
[0m(That [33mthis[39m object was created from the constructor function's [33mprototype[39m,[0m
[0mso it already has definitions of all the instance properties and methods.)[0m

[0mTypically when wrapping a class instance, a finalize callback should be[0m
[0mprovided that simply deletes the native instance that is received as the [33mdata[39m[0m
[0margument to the finalize callback.[0m

[0mThe optional returned reference is initially a weak reference, meaning it[0m
[0mhas a reference count of 0. Typically this reference count would be incremented[0m
[0mtemporarily during async operations that require the instance to remain valid.[0m

[0m[3mCaution[23m: The optional returned reference (if obtained) should be deleted via[0m
[0m[[33mnapi_delete_reference[39m][] ONLY in response to the finalize callback[0m
[0minvocation. If it is deleted before then, then the finalize callback may never[0m
[0mbe invoked. Therefore, when obtaining a reference a finalize callback is also[0m
[0mrequired in order to enable correct disposal of the reference.[0m

[0mCalling [33mnapi_wrap()[39m a second time on an object will return an error. To[0m
[0massociate another native instance with the object, use [33mnapi_remove_wrap()[39m[0m
[0mfirst.[0m

[32m[1m### napi_unwrap[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_unwrap(napi_env env,[39m
    [33m                        napi_value js_object,[39m
    [33m                        void** result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] js_object[39m: The object associated with the native instance.[0m
    * [0m[33m[out] result[39m: Pointer to the wrapped native instance.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mRetrieves a native instance that was previously wrapped in a JavaScript[0m
[0mobject using [33mnapi_wrap()[39m.[0m

[0mWhen JavaScript code invokes a method or property accessor on the class, the[0m
[0mcorresponding [33mnapi_callback[39m is invoked. If the callback is for an instance[0m
[0mmethod or accessor, then the [33mthis[39m argument to the callback is the wrapper[0m
[0mobject; the wrapped C++ instance that is the target of the call can be obtained[0m
[0mthen by calling [33mnapi_unwrap()[39m on the wrapper object.[0m

[32m[1m### napi_remove_wrap[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_remove_wrap(napi_env env,[39m
    [33m                             napi_value js_object,[39m
    [33m                             void** result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] js_object[39m: The object associated with the native instance.[0m
    * [0m[33m[out] result[39m: Pointer to the wrapped native instance.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mRetrieves a native instance that was previously wrapped in the JavaScript[0m
[0mobject [33mjs_object[39m using [33mnapi_wrap()[39m and removes the wrapping. If a finalize[0m
[0mcallback was associated with the wrapping, it will no longer be called when the[0m
[0mJavaScript object becomes garbage-collected.[0m

[32m[1m### napi_add_finalizer[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 5[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_add_finalizer(napi_env env,[39m
    [33m                               napi_value js_object,[39m
    [33m                               void* native_object,[39m
    [33m                               napi_finalize finalize_cb,[39m
    [33m                               void* finalize_hint,[39m
    [33m                               napi_ref* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] js_object[39m: The JavaScript object to which the native data will be[0m
      [0mattached.[0m
    * [0m[33m[in] native_object[39m: The native data that will be attached to the JavaScript[0m
      [0mobject.[0m
    * [0m[33m[in] finalize_cb[39m: Native callback that will be used to free the[0m
      [0mnative data when the JavaScript object is ready for garbage-collection.[0m
    * [0m[33m[in] finalize_hint[39m: Optional contextual hint that is passed to the[0m
      [0mfinalize callback.[0m
    * [0m[33m[out] result[39m: Optional reference to the JavaScript object.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mAdds a [33mnapi_finalize[39m callback which will be called when the JavaScript object[0m
[0min [33mjs_object[39m is ready for garbage collection. This API is similar to[0m
[0m[33mnapi_wrap()[39m except that:[0m

    * [0mthe native data cannot be retrieved later using [33mnapi_unwrap()[39m,[0m
    * [0mnor can it be removed later using [33mnapi_remove_wrap()[39m, and[0m
    * [0mthe API can be called multiple times with different data items in order to[0m
      [0mattach each of them to the JavaScript object, and[0m
    * [0mthe object manipulated by the API can be used with [33mnapi_wrap()[39m.[0m

[0m[3mCaution[23m: The optional returned reference (if obtained) should be deleted via[0m
[0m[[33mnapi_delete_reference[39m][] ONLY in response to the finalize callback[0m
[0minvocation. If it is deleted before then, then the finalize callback may never[0m
[0mbe invoked. Therefore, when obtaining a reference a finalize callback is also[0m
[0mrequired in order to enable correct disposal of the reference.[0m

[32m[1m## Simple Asynchronous Operations[22m[39m

[0mAddon modules often need to leverage async helpers from libuv as part of their[0m
[0mimplementation. This allows them to schedule work to be executed asynchronously[0m
[0mso that their methods can return in advance of the work being completed. This[0m
[0mallows them to avoid blocking overall execution of the Node.js application.[0m

[0mN-API provides an ABI-stable interface for these[0m
[0msupporting functions which covers the most common asynchronous use cases.[0m

[0mN-API defines the [33mnapi_async_work[39m structure which is used to manage[0m
[0masynchronous workers. Instances are created/deleted with[0m
[0m[[33mnapi_create_async_work[39m][] and [[33mnapi_delete_async_work[39m][].[0m

[0mThe [33mexecute[39m and [33mcomplete[39m callbacks are functions that will be[0m
[0minvoked when the executor is ready to execute and when it completes its[0m
[0mtask respectively.[0m

[0mThe [33mexecute[39m function should avoid making any N-API calls[0m
[0mthat could result in the execution of JavaScript or interaction with[0m
[0mJavaScript objects. Most often, any code that needs to make N-API[0m
[0mcalls should be made in [33mcomplete[39m callback instead.[0m
[0mAvoid using the [33mnapi_env[39m parameter in the execute callback as[0m
[0mit will likely execute JavaScript.[0m

[0mThese functions implement the following interfaces:[0m

    [33mtypedef void (*napi_async_execute_callback)(napi_env env,[39m
    [33m                                            void* data);[39m
    [33mtypedef void (*napi_async_complete_callback)(napi_env env,[39m
    [33m                                             napi_status status,[39m
    [33m                                             void* data);[39m

[0mWhen these methods are invoked, the [33mdata[39m parameter passed will be the[0m
[0maddon-provided [33mvoid*[39m data that was passed into the[0m
[0m[33mnapi_create_async_work[39m call.[0m

[0mOnce created the async worker can be queued[0m
[0mfor execution using the [[33mnapi_queue_async_work[39m][] function:[0m

    [33mnapi_status napi_queue_async_work(napi_env env,[39m
    [33m                                  napi_async_work work);[39m

[0m[[33mnapi_cancel_async_work[39m][] can be used if the work needs[0m
[0mto be cancelled before the work has started execution.[0m

[0mAfter calling [[33mnapi_cancel_async_work[39m][], the [33mcomplete[39m callback[0m
[0mwill be invoked with a status value of [33mnapi_cancelled[39m.[0m
[0mThe work should not be deleted before the [33mcomplete[39m[0m
[0mcallback invocation, even when it was cancelled.[0m

[32m[1m### napi_create_async_work[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90mchanges:[39m
[90m  - version: v8.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14697[39m
[90m    description: Added `async_resource` and `async_resource_name` parameters.[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_async_work(napi_env env,[39m
    [33m                                   napi_value async_resource,[39m
    [33m                                   napi_value async_resource_name,[39m
    [33m                                   napi_async_execute_callback execute,[39m
    [33m                                   napi_async_complete_callback complete,[39m
    [33m                                   void* data,[39m
    [33m                                   napi_async_work* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] async_resource[39m: An optional object associated with the async work[0m
      [0mthat will be passed to possible [33masync_hooks[39m [[33minit[39m hooks][].[0m
    * [0m[33m[in] async_resource_name[39m: Identifier for the kind of resource that is being[0m
      [0mprovided for diagnostic information exposed by the [33masync_hooks[39m API.[0m
    * [0m[33m[in] execute[39m: The native function which should be called to execute the[0m
      [0mlogic asynchronously. The given function is called from a worker pool thread[0m
      [0mand can execute in parallel with the main event loop thread.[0m
    * [0m[33m[in] complete[39m: The native function which will be called when the[0m
      [0masynchronous logic is completed or is cancelled. The given function is called[0m
      [0mfrom the main event loop thread.[0m
    * [0m[33m[in] data[39m: User-provided data context. This will be passed back into the[0m
      [0mexecute and complete functions.[0m
    * [0m[33m[out] result[39m: [33mnapi_async_work*[39m which is the handle to the newly created[0m
      [0masync work.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API allocates a work object that is used to execute logic asynchronously.[0m
[0mIt should be freed using [[33mnapi_delete_async_work[39m][] once the work is no longer[0m
[0mrequired.[0m

[0m[33masync_resource_name[39m should be a null-terminated, UTF-8-encoded string.[0m

[0mThe [33masync_resource_name[39m identifier is provided by the user and should be[0m
[0mrepresentative of the type of async work being performed. It is also recommended[0m
[0mto apply namespacing to the identifier, e.g. by including the module name. See[0m
[0mthe [[33masync_hooks[39m documentation][async_hooks [33mtype[39m] for more information.[0m

[32m[1m### napi_delete_async_work[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_delete_async_work(napi_env env,[39m
    [33m                                   napi_async_work work);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] work[39m: The handle returned by the call to [33mnapi_create_async_work[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API frees a previously allocated work object.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m### napi_queue_async_work[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_queue_async_work(napi_env env,[39m
    [33m                                  napi_async_work work);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] work[39m: The handle returned by the call to [33mnapi_create_async_work[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API requests that the previously allocated work be scheduled[0m
[0mfor execution. Once it returns successfully, this API must not be called again[0m
[0mwith the same [33mnapi_async_work[39m item or the result will be undefined.[0m

[32m[1m### napi_cancel_async_work[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_cancel_async_work(napi_env env,[39m
    [33m                                   napi_async_work work);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] work[39m: The handle returned by the call to [33mnapi_create_async_work[39m.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API cancels queued work if it has not yet[0m
[0mbeen started. If it has already started executing, it cannot be[0m
[0mcancelled and [33mnapi_generic_failure[39m will be returned. If successful,[0m
[0mthe [33mcomplete[39m callback will be invoked with a status value of[0m
[0m[33mnapi_cancelled[39m. The work should not be deleted before the [33mcomplete[39m[0m
[0mcallback invocation, even if it has been successfully cancelled.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m## Custom Asynchronous Operations[22m[39m

[0mThe simple asynchronous work APIs above may not be appropriate for every[0m
[0mscenario. When using any other asynchronous mechanism, the following APIs[0m
[0mare necessary to ensure an asynchronous operation is properly tracked by[0m
[0mthe runtime.[0m

[32m[1m### napi_async_init[22m[39m

[90m<!-- YAML[39m
[90madded: v8.6.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_async_init(napi_env env,[39m
    [33m                            napi_value async_resource,[39m
    [33m                            napi_value async_resource_name,[39m
    [33m                            napi_async_context* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] async_resource[39m: An optional object associated with the async work[0m
      [0mthat will be passed to possible [33masync_hooks[39m [[33minit[39m hooks][].[0m
    * [0m[33m[in] async_resource_name[39m: Identifier for the kind of resource[0m
      [0mthat is being provided for diagnostic information exposed by the[0m
      [0m[33masync_hooks[39m API.[0m
    * [0m[33m[out] result[39m: The initialized async context.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[32m[1m### napi_async_destroy[22m[39m

[90m<!-- YAML[39m
[90madded: v8.6.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_async_destroy(napi_env env,[39m
    [33m                               napi_async_context async_context);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] async_context[39m: The async context to be destroyed.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m### napi_make_callback[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90mchanges:[39m
[90m  - version: v8.6.0[39m
[90m    description: Added `async_context` parameter.[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_make_callback(napi_env env,[39m
    [33m                                           napi_async_context async_context,[39m
    [33m                                           napi_value recv,[39m

    [33m  napi_value func,[39m
    [33m                                       size_t argc,[39m
    [33m                                       const napi_value* argv,[39m
    [33m                                       napi_value* result);[39m

    [33m[39m
    [33m* `[in] env`: The environment that the API is invoked under.[39m
    [33m* `[in] async_context`: Context for the async operation that is[39m
    [33m   invoking the callback. This should normally be a value previously[39m
    [33m   obtained from [`napi_async_init`][]. However `NULL` is also allowed,[39m
    [33m   which indicates the current async context (if any) is to be used[39m
    [33m   for the callback.[39m
    [33m* `[in] recv`: The `this` object passed to the called function.[39m
    [33m* `[in] func`: `napi_value` representing the JavaScript function to be invoked.[39m
    [33m* `[in] argc`: The count of elements in the `argv` array.[39m
    [33m* `[in] argv`: Array of JavaScript values as `napi_value` representing the[39m
    [33m  arguments to the function.[39m
    [33m* `[out] result`: `napi_value` representing the JavaScript object returned.[39m
    [33m[39m
    [33mReturns `napi_ok` if the API succeeded.[39m
    [33m[39m
    [33mThis method allows a JavaScript function object to be called from a native[39m
    [33madd-on. This API is similar to `napi_call_function`. However, it is used to call[39m
    [33m*from* native code back *into* JavaScript *after* returning from an async[39m
    [33moperation (when there is no other script on the stack). It is a fairly simple[39m
    [33mwrapper around `node::MakeCallback`.[39m
    [33m[39m
    [33mNote it is *not* necessary to use `napi_make_callback` from within a[39m
    [33m`napi_async_complete_callback`; in that situation the callback's async[39m
    [33mcontext has already been set up, so a direct call to `napi_call_function`[39m
    [33mis sufficient and appropriate. Use of the `napi_make_callback` function[39m
    [33mmay be required when implementing custom async behavior that does not use[39m
    [33m`napi_create_async_work`.[39m
    [33m[39m
    [33m### napi_open_callback_scope[39m
    [33m<!-- YAML[39m
    [33madded: v9.6.0[39m
    [33mnapiVersion: 3[39m
    [33m-->[39m
    [33m[39m
    [33m```C[39m
    [33mNAPI_EXTERN napi_status napi_open_callback_scope(napi_env env,[39m
    [33m                                                 napi_value resource_object,[39m
    [33m                                                 napi_async_context context,[39m
    [33m                                                 napi_callback_scope* result)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] resource_object[39m: An object associated with the async work[0m
      [0mthat will be passed to possible [33masync_hooks[39m [[33minit[39m hooks][].[0m
    * [0m[33m[in] context[39m: Context for the async operation that is invoking the callback.[0m
      [0mThis should be a value previously obtained from [[33mnapi_async_init[39m][].[0m
    * [0m[33m[out] result[39m: The newly created scope.[0m

[0mThere are cases (for example, resolving promises) where it is[0m
[0mnecessary to have the equivalent of the scope associated with a callback[0m
[0min place when making certain N-API calls. If there is no other script on[0m
[0mthe stack the [[33mnapi_open_callback_scope[39m][] and[0m
[0m[[33mnapi_close_callback_scope[39m][] functions can be used to open/close[0m
[0mthe required scope.[0m

[32m[1m### napi_close_callback_scope[22m[39m

[90m<!-- YAML[39m
[90madded: v9.6.0[39m
[90mnapiVersion: 3[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_close_callback_scope(napi_env env,[39m
    [33m                                                  napi_callback_scope scope)[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] scope[39m: The scope to be closed.[0m

[0mThis API can be called even if there is a pending JavaScript exception.[0m

[32m[1m## Version Management[22m[39m

[32m[1m### napi_get_node_version[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mtypedef struct {[39m
    [33m  uint32_t major;[39m
    [33m  uint32_t minor;[39m
    [33m  uint32_t patch;[39m
    [33m  const char* release;[39m
    [33m} napi_node_version;[39m
    [33m[39m
    [33mnapi_status napi_get_node_version(napi_env env,[39m
    [33m                                  const napi_node_version** version);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] version[39m: A pointer to version information for Node.js itself.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis function fills the [33mversion[39m struct with the major, minor, and patch[0m
[0mversion of Node.js that is currently running, and the [33mrelease[39m field with the[0m
[0mvalue of [[33mprocess.release.name[39m][[33mprocess.release[39m].[0m

[0mThe returned buffer is statically allocated and does not need to be freed.[0m

[32m[1m### napi_get_version[22m[39m

[90m<!-- YAML[39m
[90madded: v8.0.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_get_version(napi_env env,[39m
    [33m                             uint32_t* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] result[39m: The highest version of N-API supported.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API returns the highest N-API version supported by the[0m
[0mNode.js runtime. N-API is planned to be additive such that[0m
[0mnewer releases of Node.js may support additional API functions.[0m
[0mIn order to allow an addon to use a newer function when running with[0m
[0mversions of Node.js that support it, while providing[0m
[0mfallback behavior when running with Node.js versions that don't[0m
[0msupport it:[0m

    * [0mCall [33mnapi_get_version()[39m to determine if the API is available.[0m
    * [0mIf available, dynamically load a pointer to the function using [33muv_dlsym()[39m.[0m
    * [0mUse the dynamically loaded pointer to invoke the function.[0m
    * [0mIf the function is not available, provide an alternate implementation[0m
      [0mthat does not use the function.[0m

[32m[1m## Memory Management[22m[39m

[32m[1m### napi_adjust_external_memory[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_adjust_external_memory(napi_env env,[39m
    [33m                                                    int64_t change_in_bytes,[39m
    [33m                                                    int64_t* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] change_in_bytes[39m: The change in externally allocated memory that is kept[0m
      [0malive by JavaScript objects.[0m
    * [0m[33m[out] result[39m: The adjusted value[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis function gives V8 an indication of the amount of externally allocated[0m
[0mmemory that is kept alive by JavaScript objects (i.e. a JavaScript object[0m
[0mthat points to its own memory allocated by a native module). Registering[0m
[0mexternally allocated memory will trigger global garbage collections more[0m
[0moften than it would otherwise.[0m

[32m[1m## Promises[22m[39m

[0mN-API provides facilities for creating [33mPromise[39m objects as described in[0m
[0m[Section 25.4][] of the ECMA specification. It implements promises as a pair of[0m
[0mobjects. When a promise is created by [33mnapi_create_promise()[39m, a "deferred"[0m
[0mobject is created and returned alongside the [33mPromise[39m. The deferred object is[0m
[0mbound to the created [33mPromise[39m and is the only means to resolve or reject the[0m
[0m[33mPromise[39m using [33mnapi_resolve_deferred()[39m or [33mnapi_reject_deferred()[39m. The[0m
[0mdeferred object that is created by [33mnapi_create_promise()[39m is freed by[0m
[0m[33mnapi_resolve_deferred()[39m or [33mnapi_reject_deferred()[39m. The [33mPromise[39m object may[0m
[0mbe returned to JavaScript where it can be used in the usual fashion.[0m

[0mFor example, to create a promise and pass it to an asynchronous worker:[0m

    [33mnapi_deferred deferred;[39m
    [33mnapi_value promise;[39m
    [33mnapi_status status;[39m
    [33m[39m
    [33m// Create the promise.[39m
    [33mstatus = napi_create_promise(env, &deferred, &promise);[39m
    [33mif (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m// Pass the deferred to a function that performs an asynchronous action.[39m
    [33mdo_something_asynchronous(deferred);[39m
    [33m[39m
    [33m// Return the promise to JS[39m
    [33mreturn promise;[39m

[0mThe above function [33mdo_something_asynchronous()[39m would perform its asynchronous[0m
[0maction and then it would resolve or reject the deferred, thereby concluding the[0m
[0mpromise and freeing the deferred:[0m

    [33mnapi_deferred deferred;[39m
    [33mnapi_value undefined;[39m
    [33mnapi_status status;[39m
    [33m[39m
    [33m// Create a value with which to conclude the deferred.[39m
    [33mstatus = napi_get_undefined(env, &undefined);[39m
    [33mif (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m// Resolve or reject the promise associated with the deferred depending on[39m
    [33m// whether the asynchronous action succeeded.[39m
    [33mif (asynchronous_action_succeeded) {[39m
    [33m  status = napi_resolve_deferred(env, deferred, undefined);[39m
    [33m} else {[39m
    [33m  status = napi_reject_deferred(env, deferred, undefined);[39m
    [33m}[39m
    [33mif (status != napi_ok) return NULL;[39m
    [33m[39m
    [33m// At this point the deferred has been freed, so we should assign NULL to it.[39m
    [33mdeferred = NULL;[39m

[32m[1m### napi_create_promise[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_create_promise(napi_env env,[39m
    [33m                                napi_deferred* deferred,[39m
    [33m                                napi_value* promise);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] deferred[39m: A newly created deferred object which can later be passed to[0m
      [0m[33mnapi_resolve_deferred()[39m or [33mnapi_reject_deferred()[39m to resolve resp. reject[0m
      [0mthe associated promise.[0m
    * [0m[33m[out] promise[39m: The JavaScript promise associated with the deferred object.[0m

[0mReturns [33mnapi_ok[39m if the API succeeded.[0m

[0mThis API creates a deferred object and a JavaScript promise.[0m

[32m[1m### napi_resolve_deferred[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_resolve_deferred(napi_env env,[39m
    [33m                                  napi_deferred deferred,[39m
    [33m                                  napi_value resolution);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] deferred[39m: The deferred object whose associated promise to resolve.[0m
    * [0m[33m[in] resolution[39m: The value with which to resolve the promise.[0m

[0mThis API resolves a JavaScript promise by way of the deferred object[0m
[0mwith which it is associated. Thus, it can only be used to resolve JavaScript[0m
[0mpromises for which the corresponding deferred object is available. This[0m
[0meffectively means that the promise must have been created using[0m
[0m[33mnapi_create_promise()[39m and the deferred object returned from that call must[0m
[0mhave been retained in order to be passed to this API.[0m

[0mThe deferred object is freed upon successful completion.[0m

[32m[1m### napi_reject_deferred[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_reject_deferred(napi_env env,[39m
    [33m                                 napi_deferred deferred,[39m
    [33m                                 napi_value rejection);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] deferred[39m: The deferred object whose associated promise to resolve.[0m
    * [0m[33m[in] rejection[39m: The value with which to reject the promise.[0m

[0mThis API rejects a JavaScript promise by way of the deferred object[0m
[0mwith which it is associated. Thus, it can only be used to reject JavaScript[0m
[0mpromises for which the corresponding deferred object is available. This[0m
[0meffectively means that the promise must have been created using[0m
[0m[33mnapi_create_promise()[39m and the deferred object returned from that call must[0m
[0mhave been retained in order to be passed to this API.[0m

[0mThe deferred object is freed upon successful completion.[0m

[32m[1m### napi_is_promise[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mnapi_status napi_is_promise(napi_env env,[39m
    [33m                            napi_value value,[39m
    [33m                            bool* is_promise);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] value[39m: The value to examine[0m
    * [0m[33m[out] is_promise[39m: Flag indicating whether [33mpromise[39m is a native promise[0m
      [0mobject (that is, a promise object created by the underlying engine).[0m

[32m[1m## Script execution[22m[39m

[0mN-API provides an API for executing a string containing JavaScript using the[0m
[0munderlying JavaScript engine.[0m

[32m[1m### napi_run_script[22m[39m

[90m<!-- YAML[39m
[90madded: v8.5.0[39m
[90mnapiVersion: 1[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_run_script(napi_env env,[39m
    [33m                                        napi_value script,[39m
    [33m                                        napi_value* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] script[39m: A JavaScript string containing the script to execute.[0m
    * [0m[33m[out] result[39m: The value resulting from having executed the script.[0m

[0mThis function executes a string of JavaScript code and returns its result with[0m
[0mthe following caveats:[0m

    * [0mUnlike [33meval[39m, this function does not allow the script to access the current[0m
      [0mlexical scope, and therefore also does not allow to access the[0m
      [0m[module scope][], meaning that pseudo-globals such as [33mrequire[39m will not be[0m
      [0mavailable.[0m
    * [0mThe script can access the [global scope][]. Function and [33mvar[39m declarations[0m
      [0min the script will be added to the [[33mglobal[39m][] object. Variable declarations[0m
      [0mmade using [33mlet[39m and [33mconst[39m will be visible globally, but will not be added[0m
      [0mto the [[33mglobal[39m][] object.[0m
    * [0mThe value of [33mthis[39m is [[33mglobal[39m][] within the script.[0m

[32m[1m## libuv event loop[22m[39m

[0mN-API provides a function for getting the current event loop associated with[0m
[0ma specific [33mnapi_env[39m.[0m

[32m[1m### napi_get_uv_event_loop[22m[39m

[90m<!-- YAML[39m
[90madded:[39m
[90m  - v8.10.0[39m
[90m  - v9.3.0[39m
[90mnapiVersion: 2[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status napi_get_uv_event_loop(napi_env env,[39m
    [33m                                               struct uv_loop_s** loop);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[out] loop[39m: The current libuv loop instance.[0m

[32m[1m## [22m[39m

[0mAsynchronous Thread-safe Function Calls[0m

[0mJavaScript functions can normally only be called from a native addon's main[0m
[0mthread. If an addon creates additional threads, then N-API functions that[0m
[0mrequire a [33mnapi_env[39m, [33mnapi_value[39m, or [33mnapi_ref[39m must not be called from those[0m
[0mthreads.[0m

[0mWhen an addon has additional threads and JavaScript functions need to be invoked[0m
[0mbased on the processing completed by those threads, those threads must[0m
[0mcommunicate with the addon's main thread so that the main thread can invoke the[0m
[0mJavaScript function on their behalf. The thread-safe function APIs provide an[0m
[0measy way to do this.[0m

[0mThese APIs provide the type [33mnapi_threadsafe_function[39m as well as APIs to[0m
[0mcreate, destroy, and call objects of this type.[0m
[0m[33mnapi_create_threadsafe_function()[39m creates a persistent reference to a[0m
[0m[33mnapi_value[39m that holds a JavaScript function which can be called from multiple[0m
[0mthreads. The calls happen asynchronously. This means that values with which the[0m
[0mJavaScript callback is to be called will be placed in a queue, and, for each[0m
[0mvalue in the queue, a call will eventually be made to the JavaScript function.[0m

[0mUpon creation of a [33mnapi_threadsafe_function[39m a [33mnapi_finalize[39m callback can be[0m
[0mprovided. This callback will be invoked on the main thread when the thread-safe[0m
[0mfunction is about to be destroyed. It receives the context and the finalize data[0m
[0mgiven during construction, and provides an opportunity for cleaning up after the[0m
[0mthreads e.g. by calling [33muv_thread_join()[39m. [1mAside from the main loop thread,[22m[0m
[0m[1mno threads should be using the thread-safe function after the finalize callback[22m[0m
[0m[1mcompletes.[22m[0m

[0mThe [33mcontext[39m given during the call to [33mnapi_create_threadsafe_function()[39m can[0m
[0mbe retrieved from any thread with a call to[0m
[0m[33mnapi_get_threadsafe_function_context()[39m.[0m

[0m[33mnapi_call_threadsafe_function()[39m can then be used for initiating a call into[0m
[0mJavaScript. [33mnapi_call_threadsafe_function()[39m accepts a parameter which controls[0m
[0mwhether the API behaves blockingly. If set to [33mnapi_tsfn_nonblocking[39m, the API[0m
[0mbehaves non-blockingly, returning [33mnapi_queue_full[39m if the queue was full,[0m
[0mpreventing data from being successfully added to the queue. If set to[0m
[0m[33mnapi_tsfn_blocking[39m, the API blocks until space becomes available in the queue.[0m
[0m[33mnapi_call_threadsafe_function()[39m never blocks if the thread-safe function was[0m
[0mcreated with a maximum queue size of 0.[0m

[0mThe actual call into JavaScript is controlled by the callback given via the[0m
[0m[33mcall_js_cb[39m parameter. [33mcall_js_cb[39m is invoked on the main thread once for each[0m
[0mvalue that was placed into the queue by a successful call to[0m
[0m[33mnapi_call_threadsafe_function()[39m. If such a callback is not given, a default[0m
[0mcallback will be used, and the resulting JavaScript call will have no arguments.[0m
[0mThe [33mcall_js_cb[39m callback receives the JavaScript function to call as a[0m
[0m[33mnapi_value[39m in its parameters, as well as the [33mvoid*[39m context pointer used when[0m
[0mcreating the [33mnapi_threadsafe_function[39m, and the next data pointer that was[0m
[0mcreated by one of the secondary threads. The callback can then use an API such[0m
[0mas [33mnapi_call_function()[39m to call into JavaScript.[0m

[0mThe callback may also be invoked with [33menv[39m and [33mcall_js_cb[39m both set to [33mNULL[39m[0m
[0mto indicate that calls into JavaScript are no longer possible, while items[0m
[0mremain in the queue that may need to be freed. This normally occurs when the[0m
[0mNode.js process exits while there is a thread-safe function still active.[0m

[0mIt is not necessary to call into JavaScript via [33mnapi_make_callback()[39m because[0m
[0mN-API runs [33mcall_js_cb[39m in a context appropriate for callbacks.[0m

[0mThreads can be added to and removed from a [33mnapi_threadsafe_function[39m object[0m
[0mduring its existence. Thus, in addition to specifying an initial number of[0m
[0mthreads upon creation, [33mnapi_acquire_threadsafe_function[39m can be called to[0m
[0mindicate that a new thread will start making use of the thread-safe function.[0m
[0mSimilarly, [33mnapi_release_threadsafe_function[39m can be called to indicate that an[0m
[0mexisting thread will stop making use of the thread-safe function.[0m

[0m[33mnapi_threadsafe_function[39m objects are destroyed when every thread which uses[0m
[0mthe object has called [33mnapi_release_threadsafe_function()[39m or has received a[0m
[0mreturn status of [33mnapi_closing[39m in response to a call to[0m
[0m[33mnapi_call_threadsafe_function[39m. The queue is emptied before the[0m
[0m[33mnapi_threadsafe_function[39m is destroyed. [33mnapi_release_threadsafe_function()[39m[0m
[0mshould be the last API call made in conjunction with a given[0m
[0m[33mnapi_threadsafe_function[39m, because after the call completes, there is no[0m
[0mguarantee that the [33mnapi_threadsafe_function[39m is still allocated. For the same[0m
[0mreason, do not make use of a thread-safe function[0m
[0mafter receiving a return value of [33mnapi_closing[39m in response to a call to[0m
[0m[33mnapi_call_threadsafe_function[39m. Data associated with the[0m
[0m[33mnapi_threadsafe_function[39m can be freed in its [33mnapi_finalize[39m callback which[0m
[0mwas passed to [33mnapi_create_threadsafe_function()[39m.[0m

[0mOnce the number of threads making use of a [33mnapi_threadsafe_function[39m reaches[0m
[0mzero, no further threads can start making use of it by calling[0m
[0m[33mnapi_acquire_threadsafe_function()[39m. In fact, all subsequent API calls[0m
[0massociated with it, except [33mnapi_release_threadsafe_function()[39m, will return an[0m
[0merror value of [33mnapi_closing[39m.[0m

[0mThe thread-safe function can be "aborted" by giving a value of [33mnapi_tsfn_abort[39m[0m
[0mto [33mnapi_release_threadsafe_function()[39m. This will cause all subsequent APIs[0m
[0massociated with the thread-safe function except[0m
[0m[33mnapi_release_threadsafe_function()[39m to return [33mnapi_closing[39m even before its[0m
[0mreference count reaches zero. In particular, [33mnapi_call_threadsafe_function()[39m[0m
[0mwill return [33mnapi_closing[39m, thus informing the threads that it is no longer[0m
[0mpossible to make asynchronous calls to the thread-safe function. This can be[0m
[0mused as a criterion for terminating the thread. [1mUpon receiving a return value[22m[0m
[0m[1mof [33mnapi_closing[39m from [33mnapi_call_threadsafe_function()[39m a thread must make no[22m[0m
[0m[1mfurther use of the thread-safe function because it is no longer guaranteed to[22m[0m
[0m[1mbe allocated.[22m[0m

[0mSimilarly to libuv handles, thread-safe functions can be "referenced" and[0m
[0m"unreferenced". A "referenced" thread-safe function will cause the event loop on[0m
[0mthe thread on which it is created to remain alive until the thread-safe function[0m
[0mis destroyed. In contrast, an "unreferenced" thread-safe function will not[0m
[0mprevent the event loop from exiting. The APIs [33mnapi_ref_threadsafe_function[39m and[0m
[0m[33mnapi_unref_threadsafe_function[39m exist for this purpose.[0m

[32m[1m### napi_create_threadsafe_function[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90mchanges:[39m
[90m  - version: v12.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27791[39m
[90m    description: Made `func` parameter optional with custom `call_js_cb`.[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status[39m
    [33mnapi_create_threadsafe_function(napi_env env,[39m
    [33m                                napi_value func,[39m
    [33m                                napi_value async_resource,[39m
    [33m                                napi_value async_resource_name,[39m
    [33m                                size_t max_queue_size,[39m
    [33m                                size_t initial_thread_count,[39m
    [33m                                void* thread_finalize_data,[39m
    [33m                                napi_finalize thread_finalize_cb,[39m
    [33m                                void* context,[39m
    [33m                                napi_threadsafe_function_call_js call_js_cb,[39m
    [33m                                napi_threadsafe_function* result);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] func[39m: An optional JavaScript function to call from another thread. It[0m
      [0mmust be provided if [33mNULL[39m is passed to [33mcall_js_cb[39m.[0m
    * [0m[33m[in] async_resource[39m: An optional object associated with the async work that[0m
      [0mwill be passed to possible [33masync_hooks[39m [34m[33minit[39m[34m hooks ([34m[4masync_hooks.html#async_hooks_init_asyncid_type_triggerasyncid_resource[24m[39m[34m)[39m.[0m
    * [0m[33m[in] async_resource_name[39m: A JavaScript string to provide an identifier for[0m
      [0mthe kind of resource that is being provided for diagnostic information exposed[0m
      [0mby the [33masync_hooks[39m API.[0m
    * [0m[33m[in] max_queue_size[39m: Maximum size of the queue. [33m0[39m for no limit.[0m
    * [0m[33m[in] initial_thread_count[39m: The initial number of threads, including the main[0m
      [0mthread, which will be making use of this function.[0m
    * [0m[33m[in] thread_finalize_data[39m: Optional data to be passed to [33mthread_finalize_cb[39m.[0m
    * [0m[33m[in] thread_finalize_cb[39m: Optional function to call when the[0m
      [0m[33mnapi_threadsafe_function[39m is being destroyed.[0m
    * [0m[33m[in] context[39m: Optional data to attach to the resulting[0m
      [0m[33mnapi_threadsafe_function[39m.[0m
    * [0m[33m[in] call_js_cb[39m: Optional callback which calls the JavaScript function in[0m
      [0mresponse to a call on a different thread. This callback will be called on the[0m
      [0mmain thread. If not given, the JavaScript function will be called with no[0m
      [0mparameters and with [33mundefined[39m as its [33mthis[39m value.[0m
    * [0m[33m[out] result[39m: The asynchronous thread-safe JavaScript function.[0m

[32m[1m### napi_get_threadsafe_function_context[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status[39m
    [33mnapi_get_threadsafe_function_context(napi_threadsafe_function func,[39m
    [33m                                     void** result);[39m

    * [0m[33m[in] func[39m: The thread-safe function for which to retrieve the context.[0m
    * [0m[33m[out] result[39m: The location where to store the context.[0m

[0mThis API may be called from any thread which makes use of [33mfunc[39m.[0m

[32m[1m### napi_call_threadsafe_function[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status[39m
    [33mnapi_call_threadsafe_function(napi_threadsafe_function func,[39m
    [33m                              void* data,[39m
    [33m                              napi_threadsafe_function_call_mode is_blocking);[39m

    * [0m[33m[in] func[39m: The asynchronous thread-safe JavaScript function to invoke.[0m
    * [0m[33m[in] data[39m: Data to send into JavaScript via the callback [33mcall_js_cb[39m[0m
      [0mprovided during the creation of the thread-safe JavaScript function.[0m
    * [0m[33m[in] is_blocking[39m: Flag whose value can be either [33mnapi_tsfn_blocking[39m to[0m
      [0mindicate that the call should block if the queue is full or[0m
      [0m[33mnapi_tsfn_nonblocking[39m to indicate that the call should return immediately[0m
      [0mwith a status of [33mnapi_queue_full[39m whenever the queue is full.[0m

[0mThis API will return [33mnapi_closing[39m if [33mnapi_release_threadsafe_function()[39m was[0m
[0mcalled with [33mabort[39m set to [33mnapi_tsfn_abort[39m from any thread. The value is only[0m
[0madded to the queue if the API returns [33mnapi_ok[39m.[0m

[0mThis API may be called from any thread which makes use of [33mfunc[39m.[0m

[32m[1m### napi_acquire_threadsafe_function[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status[39m
    [33mnapi_acquire_threadsafe_function(napi_threadsafe_function func);[39m

    * [0m[33m[in] func[39m: The asynchronous thread-safe JavaScript function to start making[0m
      [0muse of.[0m

[0mA thread should call this API before passing [33mfunc[39m to any other thread-safe[0m
[0mfunction APIs to indicate that it will be making use of [33mfunc[39m. This prevents[0m
[0m[33mfunc[39m from being destroyed when all other threads have stopped making use of[0m
[0mit.[0m

[0mThis API may be called from any thread which will start making use of [33mfunc[39m.[0m

[32m[1m### napi_release_threadsafe_function[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status[39m
    [33mnapi_release_threadsafe_function(napi_threadsafe_function func,[39m
    [33m                                 napi_threadsafe_function_release_mode mode);[39m

    * [0m[33m[in] func[39m: The asynchronous thread-safe JavaScript function whose reference[0m
      [0mcount to decrement.[0m
    * [0m[33m[in] mode[39m: Flag whose value can be either [33mnapi_tsfn_release[39m to indicate[0m
      [0mthat the current thread will make no further calls to the thread-safe[0m
      [0mfunction, or [33mnapi_tsfn_abort[39m to indicate that in addition to the current[0m
      [0mthread, no other thread should make any further calls to the thread-safe[0m
      [0mfunction. If set to [33mnapi_tsfn_abort[39m, further calls to[0m
      [0m[33mnapi_call_threadsafe_function()[39m will return [33mnapi_closing[39m, and no further[0m
      [0mvalues will be placed in the queue.[0m

[0mA thread should call this API when it stops making use of [33mfunc[39m. Passing [33mfunc[39m[0m
[0mto any thread-safe APIs after having called this API has undefined results, as[0m
[0m[33mfunc[39m may have been destroyed.[0m

[0mThis API may be called from any thread which will stop making use of [33mfunc[39m.[0m

[32m[1m### napi_ref_threadsafe_function[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status[39m
    [33mnapi_ref_threadsafe_function(napi_env env, napi_threadsafe_function func);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] func[39m: The thread-safe function to reference.[0m

[0mThis API is used to indicate that the event loop running on the main thread[0m
[0mshould not exit until [33mfunc[39m has been destroyed. Similar to [34m[33muv_ref[39m[34m ([34m[4mhttp://docs.libuv.org/en/v1.x/handle.html#c.uv_ref[24m[39m[34m)[39m it is[0m
[0malso idempotent.[0m

[0mThis API may only be called from the main thread.[0m

[32m[1m### napi_unref_threadsafe_function[22m[39m

[90m<!-- YAML[39m
[90madded: v10.6.0[39m
[90mnapiVersion: 4[39m
[90m-->[39m
[90m[39m
[90m[39m    [33mNAPI_EXTERN napi_status[39m
    [33mnapi_unref_threadsafe_function(napi_env env, napi_threadsafe_function func);[39m

    * [0m[33m[in] env[39m: The environment that the API is invoked under.[0m
    * [0m[33m[in] func[39m: The thread-safe function to unreference.[0m

[0mThis API is used to indicate that the event loop running on the main thread[0m
[0mmay exit before [33mfunc[39m is destroyed. Similar to [34m[33muv_unref[39m[34m ([34m[4mhttp://docs.libuv.org/en/v1.x/handle.html#c.uv_unref[24m[39m[34m)[39m it is also[0m
[0midempotent.[0m

[0mThis API may only be called from the main thread.[0m

