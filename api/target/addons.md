[35m[4m[1m# C++ Addons[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mAddons are dynamically-linked shared objects written in C++. The[0m
[0m[34m[33mrequire()[39m[34m ([34m[4mmodules.html#modules_require_id[24m[39m[34m)[39m function can load Addons as ordinary Node.js modules.[0m
[0mAddons provide an interface between JavaScript and C/C++ libraries.[0m

[0mThere are three options for implementing Addons: N-API, nan, or direct[0m
[0muse of internal V8, libuv and Node.js libraries. Unless there is a need for[0m
[0mdirect access to functionality which is not exposed by N-API, use N-API.[0m
[0mRefer to [34mC/C++ Addons with N-API ([34m[4mn-api.html[24m[39m[34m)[39m for more information on N-API.[0m

[0mWhen not using N-API, implementing Addons is complicated,[0m
[0minvolving knowledge of several components and APIs:[0m

    * [0m[0m[0mV8: the C++ library Node.js currently uses to provide the[0m[0m[0m
      [0m[0m[0mJavaScript implementation. V8 provides the mechanisms for creating objects,[0m[0m[0m
      [0m[0m[0mcalling functions, etc. V8's API is documented mostly in the[0m[0m[0m
      [0m[0m[0m[33mv8.h[39m header file ([33mdeps/v8/include/v8.h[39m in the Node.js source[0m[0m[0m
      [0m[0m[0mtree), which is also available [34monline ([34m[4mhttps://v8docs.nodesource.com/[24m[39m[34m)[39m.[0m[0m[0m
    * [0m[0m[0m[34mlibuv ([34m[4mhttps://github.com/libuv/libuv[24m[39m[34m)[39m: The C library that implements the Node.js event loop, its worker[0m[0m[0m
      [0m[0m[0mthreads and all of the asynchronous behaviors of the platform. It also[0m[0m[0m
      [0m[0m[0mserves as a cross-platform abstraction library, giving easy, POSIX-like[0m[0m[0m
      [0m[0m[0maccess across all major operating systems to many common system tasks, such[0m[0m[0m
      [0m[0m[0mas interacting with the filesystem, sockets, timers, and system events. libuv[0m[0m[0m
      [0m[0m[0malso provides a pthreads-like threading abstraction that may be used to[0m[0m[0m
      [0m[0m[0mpower more sophisticated asynchronous Addons that need to move beyond the[0m[0m[0m
      [0m[0m[0mstandard event loop. Addon authors are encouraged to think about how to[0m[0m[0m
      [0m[0m[0mavoid blocking the event loop with I/O or other time-intensive tasks by[0m[0m[0m
      [0m[0m[0moff-loading work via libuv to non-blocking system operations, worker threads[0m[0m[0m
      [0m[0m[0mor a custom use of libuv's threads.[0m[0m[0m
    * [0m[0m[0mInternal Node.js libraries. Node.js itself exports C++ APIs that Addons can[0m[0m[0m
      [0m[0m[0muse, the most important of which is the [33mnode::ObjectWrap[39m class.[0m[0m[0m
    * [0m[0m[0mNode.js includes other statically linked libraries including OpenSSL. These[0m[0m[0m
      [0m[0m[0mother libraries are located in the [33mdeps/[39m directory in the Node.js source[0m[0m[0m
      [0m[0m[0mtree. Only the libuv, OpenSSL, V8 and zlib symbols are purposefully[0m[0m[0m
      [0m[0m[0mre-exported by Node.js and may be used to various extents by Addons. See[0m[0m[0m
      [0m[0m[0m[34mLinking to libraries included with Node.js ([34m[4m#addons_linking_to_libraries_included_with_node_js[24m[39m[34m)[39m for additional information.[0m[0m[0m

[0mAll of the following examples are available for [34mdownload ([34m[4mhttps://github.com/nodejs/node-addon-examples[24m[39m[34m)[39m and may[0m
[0mbe used as the starting-point for an Addon.[0m

[32m[1m## Hello world[22m[39m

[0mThis "Hello world" example is a simple Addon, written in C++, that is the[0m
[0mequivalent of the following JavaScript code:[0m

    [37mmodule[39m[32m.[39m[37mexports[39m[32m.[39m[37mhello[39m [93m=[39m [90m([39m[90m)[39m [93m=>[39m [92m'world'[39m[90m;[39m

[0mFirst, create the file [33mhello.cc[39m:[0m

    [33m// hello.cc[39m
    [33m#include <node.h>[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::NewStringType;[39m
    [33musing v8::Object;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33mvoid Method(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m  args.GetReturnValue().Set(String::NewFromUtf8([39m
    [33m      isolate, "world", NewStringType::kNormal).ToLocalChecked());[39m
    [33m}[39m
    [33m[39m
    [33mvoid Initialize(Local<Object> exports) {[39m
    [33m  NODE_SET_METHOD(exports, "hello", Method);[39m
    [33m}[39m
    [33m[39m
    [33mNODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mAll Node.js Addons must export an initialization function following[0m
[0mthe pattern:[0m

    [33mvoid Initialize(Local<Object> exports);[39m
    [33mNODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)[39m

[0mThere is no semi-colon after [33mNODE_MODULE[39m as it's not a function (see[0m
[0m[33mnode.h[39m).[0m

[0mThe [33mmodule_name[39m must match the filename of the final binary (excluding[0m
[0mthe [33m.node[39m suffix).[0m

[0mIn the [33mhello.cc[39m example, then, the initialization function is [33mInitialize[39m[0m
[0mand the addon module name is [33maddon[39m.[0m

[0mWhen building addons with [33mnode-gyp[39m, using the macro [33mNODE_GYP_MODULE_NAME[39m as[0m
[0mthe first parameter of [33mNODE_MODULE()[39m will ensure that the name of the final[0m
[0mbinary will be passed to [33mNODE_MODULE()[39m.[0m

[32m[1m### Context-aware addons[22m[39m

[0mThere are environments in which Node.js addons may need to be loaded multiple[0m
[0mtimes in multiple contexts. For example, the [34mElectron ([34m[4mhttps://electronjs.org/[24m[39m[34m)[39m runtime runs multiple[0m
[0minstances of Node.js in a single process. Each instance will have its own[0m
[0m[33mrequire()[39m cache, and thus each instance will need a native addon to behave[0m
[0mcorrectly when loaded via [33mrequire()[39m. From the addon's perspective, this means[0m
[0mthat it must support multiple initializations.[0m

[0mA context-aware addon can be constructed by using the macro[0m
[0m[33mNODE_MODULE_INITIALIZER[39m, which expands to the name of a function which Node.js[0m
[0mwill expect to find when it loads an addon. An addon can thus be initialized as[0m
[0min the following example:[0m

    [33musing namespace v8;[39m
    [33m[39m
    [33mextern "C" NODE_MODULE_EXPORT void[39m
    [33mNODE_MODULE_INITIALIZER(Local<Object> exports,[39m
    [33m                        Local<Value> module,[39m
    [33m                        Local<Context> context) {[39m
    [33m  /* Perform addon initialization steps here. */[39m
    [33m}[39m

[0mAnother option is to use the macro [33mNODE_MODULE_INIT()[39m, which will also[0m
[0mconstruct a context-aware addon. Unlike [33mNODE_MODULE()[39m, which is used to[0m
[0mconstruct an addon around a given addon initializer function,[0m
[0m[33mNODE_MODULE_INIT()[39m serves as the declaration of such an initializer to be[0m
[0mfollowed by a function body.[0m

[0mThe following three variables may be used inside the function body following an[0m
[0minvocation of [33mNODE_MODULE_INIT()[39m:[0m

    * [0m[33mLocal<Object> exports[39m,[0m
    * [0m[33mLocal<Value> module[39m, and[0m
    * [0m[33mLocal<Context> context[39m[0m

[0mThe choice to build a context-aware addon carries with it the responsibility of[0m
[0mcarefully managing global static data. Since the addon may be loaded multiple[0m
[0mtimes, potentially even from different threads, any global static data stored[0m
[0min the addon must be properly protected, and must not contain any persistent[0m
[0mreferences to JavaScript objects. The reason for this is that JavaScript[0m
[0mobjects are only valid in one context, and will likely cause a crash when[0m
[0maccessed from the wrong context or from a different thread than the one on which[0m
[0mthey were created.[0m

[0mThe context-aware addon can be structured to avoid global static data by[0m
[0mperforming the following steps:[0m

    * [0mDefine a class which will hold per-addon-instance data and which has a static[0m
      [0mmember of the form    [33m  static void DeleteInstance(void* data) {[39m[0m
      [0m    [33m    // Cast `data` to an instance of the class and delete it.[39m[0m
      [0m    [33m  }[39m[0m
    * [0mHeap-allocate an instance of this class in the addon initializer. This can be[0m
      [0maccomplished using the [33mnew[39m keyword.[0m
    * [0mCall [33mnode::AddEnvironmentCleanupHook()[39m, passing it the above-created[0m
      [0minstance and a pointer to [33mDeleteInstance()[39m. This will ensure the instance is[0m
      [0mdeleted when the environment is torn down.[0m
    * [0mStore the instance of the class in a [33mv8::External[39m, and[0m
    * [0mPass the [33mv8::External[39m to all methods exposed to JavaScript by passing it[0m
      [0mto [33mv8::FunctionTemplate::New()[39m or [33mv8::Function::New()[39m which creates the[0m
      [0mnative-backed JavaScript functions. The third parameter of[0m
      [0m[33mv8::FunctionTemplate::New()[39m or [33mv8::Function::New()[39m  accepts the[0m
      [0m[33mv8::External[39m and makes it available in the native callback using the[0m
      [0m[33mv8::FunctionCallbackInfo::Data()[39m method.[0m

[0mThis will ensure that the per-addon-instance data reaches each binding that can[0m
[0mbe called from JavaScript. The per-addon-instance data must also be passed into[0m
[0many asynchronous callbacks the addon may create.[0m

[0mThe following example illustrates the implementation of a context-aware addon:[0m

    [33m#include <node.h>[39m
    [33m[39m
    [33musing namespace v8;[39m
    [33m[39m
    [33mclass AddonData {[39m
    [33m public:[39m
    [33m  explicit AddonData(Isolate* isolate):[39m
    [33m      call_count(0) {[39m
    [33m    // Ensure this per-addon-instance data is deleted at environment cleanup.[39m
    [33m    node::AddEnvironmentCleanupHook(isolate, DeleteInstance, this);[39m
    [33m  }[39m
    [33m[39m
    [33m  // Per-addon data.[39m
    [33m  int call_count;[39m
    [33m[39m
    [33m  static void DeleteInstance(void* data) {[39m
    [33m    delete static_cast<AddonData*>(data);[39m
    [33m  }[39m
    [33m};[39m
    [33m[39m
    [33mstatic void Method(const v8::FunctionCallbackInfo<v8::Value>& info) {[39m
    [33m  // Retrieve the per-addon-instance data.[39m
    [33m  AddonData* data =[39m
    [33m      reinterpret_cast<AddonData*>(info.Data().As<External>()->Value());[39m
    [33m  data->call_count++;[39m
    [33m  info.GetReturnValue().Set((double)data->call_count);[39m
    [33m}[39m
    [33m[39m
    [33m// Initialize this addon to be context-aware.[39m
    [33mNODE_MODULE_INIT(/* exports, module, context */) {[39m
    [33m  Isolate* isolate = context->GetIsolate();[39m
    [33m[39m
    [33m  // Create a new instance of `AddonData` for this instance of the addon and[39m
    [33m  // tie its life cycle to that of the Node.js environment.[39m
    [33m  AddonData* data = new AddonData(isolate);[39m
    [33m[39m
    [33m  // Wrap the data in a `v8::External` so we can pass it to the method we[39m
    [33m  // expose.[39m
    [33m  Local<External> external = External::New(isolate, data);[39m
    [33m[39m
    [33m  // Expose the method `Method` to JavaScript, and make sure it receives the[39m
    [33m  // per-addon-instance data we created above by passing `external` as the[39m
    [33m  // third parameter to the `FunctionTemplate` constructor.[39m
    [33m  exports->Set(context,[39m
    [33m               String::NewFromUtf8(isolate, "method", NewStringType::kNormal)[39m
    [33m                  .ToLocalChecked(),[39m
    [33m               FunctionTemplate::New(isolate, Method, external)[39m
    [33m                  ->GetFunction(context).ToLocalChecked()).FromJust();[39m
    [33m}[39m

[32m[1m#### Worker support[22m[39m

[0mIn order to be loaded from multiple Node.js environments,[0m
[0msuch as a main thread and a Worker thread, an add-on needs to either:[0m

    * [0mBe an N-API addon, or[0m
    * [0mBe declared as context-aware using [33mNODE_MODULE_INIT()[39m as described above[0m

[0mIn order to support [34m[33mWorker[39m[34m ([34m[4mworker_threads.html#worker_threads_class_worker[24m[39m[34m)[39m threads, addons need to clean up any resources[0m
[0mthey may have allocated when such a thread exists. This can be achieved through[0m
[0mthe usage of the [33mAddEnvironmentCleanupHook()[39m function:[0m

    [33mvoid AddEnvironmentCleanupHook(v8::Isolate* isolate,[39m
    [33m                               void (*fun)(void* arg),[39m
    [33m                               void* arg);[39m

[0mThis function adds a hook that will run before a given Node.js instance shuts[0m
[0mdown. If necessary, such hooks can be removed using[0m
[0m[33mRemoveEnvironmentCleanupHook()[39m before they are run, which has the same[0m
[0msignature. Callbacks are run in last-in first-out order.[0m

[0mThe following [33maddon.cc[39m uses [33mAddEnvironmentCleanupHook[39m:[0m

    [33m// addon.cc[39m
    [33m#include <assert.h>[39m
    [33m#include <stdlib.h>[39m
    [33m#include <node.h>[39m
    [33m[39m
    [33musing node::AddEnvironmentCleanupHook;[39m
    [33musing v8::HandleScope;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::Object;[39m
    [33m[39m
    [33m// Note: In a real-world application, do not rely on static/global data.[39m
    [33mstatic char cookie[] = "yum yum";[39m
    [33mstatic int cleanup_cb1_called = 0;[39m
    [33mstatic int cleanup_cb2_called = 0;[39m
    [33m[39m
    [33mstatic void cleanup_cb1(void* arg) {[39m
    [33m  Isolate* isolate = static_cast<Isolate*>(arg);[39m
    [33m  HandleScope scope(isolate);[39m
    [33m  Local<Object> obj = Object::New(isolate);[39m
    [33m  assert(!obj.IsEmpty());  // assert VM is still alive[39m
    [33m  assert(obj->IsObject());[39m
    [33m  cleanup_cb1_called++;[39m
    [33m}[39m
    [33m[39m
    [33mstatic void cleanup_cb2(void* arg) {[39m
    [33m  assert(arg == static_cast<void*>(cookie));[39m
    [33m  cleanup_cb2_called++;[39m
    [33m}[39m
    [33m[39m
    [33mstatic void sanity_check(void*) {[39m
    [33m  assert(cleanup_cb1_called == 1);[39m
    [33m  assert(cleanup_cb2_called == 1);[39m
    [33m}[39m
    [33m[39m
    [33m// Initialize this addon to be context-aware.[39m
    [33mNODE_MODULE_INIT(/* exports, module, context */) {[39m
    [33m  Isolate* isolate = context->GetIsolate();[39m
    [33m[39m
    [33m  AddEnvironmentCleanupHook(isolate, sanity_check, nullptr);[39m
    [33m  AddEnvironmentCleanupHook(isolate, cleanup_cb2, cookie);[39m
    [33m  AddEnvironmentCleanupHook(isolate, cleanup_cb1, isolate);[39m
    [33m}[39m

[0mTest in JavaScript by running:[0m

    [90m// test.js[39m
    [37mrequire[39m[90m([39m[92m'./build/Release/addon'[39m[90m)[39m[90m;[39m

[32m[1m### Building[22m[39m

[0mOnce the source code has been written, it must be compiled into the binary[0m
[0m[33maddon.node[39m file. To do so, create a file called [33mbinding.gyp[39m in the[0m
[0mtop-level of the project describing the build configuration of the module[0m
[0musing a JSON-like format. This file is used by [34mnode-gyp ([34m[4mhttps://github.com/nodejs/node-gyp[24m[39m[34m)[39m, a tool written[0m
[0mspecifically to compile Node.js Addons.[0m

    [33m{[39m
    [33m  "targets": [[39m
    [33m    {[39m
    [33m      "target_name": "addon",[39m
    [33m      "sources": [ "hello.cc" ][39m
    [33m    }[39m
    [33m  ][39m
    [33m}[39m

[0mA version of the [33mnode-gyp[39m utility is bundled and distributed with[0m
[0mNode.js as part of [33mnpm[39m. This version is not made directly available for[0m
[0mdevelopers to use and is intended only to support the ability to use the[0m
[0m[33mnpm install[39m command to compile and install Addons. Developers who wish to[0m
[0muse [33mnode-gyp[39m directly can install it using the command[0m
[0m[33mnpm install -g node-gyp[39m. See the [33mnode-gyp[39m [34minstallation instructions ([34m[4mhttps://github.com/nodejs/node-gyp#installation[24m[39m[34m)[39m for[0m
[0mmore information, including platform-specific requirements.[0m

[0mOnce the [33mbinding.gyp[39m file has been created, use [33mnode-gyp configure[39m to[0m
[0mgenerate the appropriate project build files for the current platform. This[0m
[0mwill generate either a [33mMakefile[39m (on Unix platforms) or a [33mvcxproj[39m file[0m
[0m(on Windows) in the [33mbuild/[39m directory.[0m

[0mNext, invoke the [33mnode-gyp build[39m command to generate the compiled [33maddon.node[39m[0m
[0mfile. This will be put into the [33mbuild/Release/[39m directory.[0m

[0mWhen using [33mnpm install[39m to install a Node.js Addon, npm uses its own bundled[0m
[0mversion of [33mnode-gyp[39m to perform this same set of actions, generating a[0m
[0mcompiled version of the Addon for the user's platform on demand.[0m

[0mOnce built, the binary Addon can be used from within Node.js by pointing[0m
[0m[34m[33mrequire()[39m[34m ([34m[4mmodules.html#modules_require_id[24m[39m[34m)[39m to the built [33maddon.node[39m module:[0m

    [90m// hello.js[39m
    [94mconst[39m [37maddon[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./build/Release/addon'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37maddon[39m[32m.[39m[37mhello[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 'world'[39m

[0mBecause the exact path to the compiled Addon binary can vary depending on how[0m
[0mit is compiled (i.e. sometimes it may be in [33m./build/Debug/[39m), Addons can use[0m
[0mthe [34mbindings ([34m[4mhttps://github.com/TooTallNate/node-bindings[24m[39m[34m)[39m package to load the compiled module.[0m

[0mWhile the [33mbindings[39m package implementation is more sophisticated in how it[0m
[0mlocates Addon modules, it is essentially using a [33mtry…catch[39m pattern similar to:[0m

    [36mtry[39m [33m{[39m
      [31mreturn[39m [37mrequire[39m[90m([39m[92m'./build/Release/addon.node'[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [31mreturn[39m [37mrequire[39m[90m([39m[92m'./build/Debug/addon.node'[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m### Linking to libraries included with Node.js[22m[39m

[0mNode.js uses statically linked libraries such as V8, libuv and OpenSSL. All[0m
[0mAddons are required to link to V8 and may link to any of the other dependencies[0m
[0mas well. Typically, this is as simple as including the appropriate[0m
[0m[33m#include <...>[39m statements (e.g. [33m#include <v8.h>[39m) and [33mnode-gyp[39m will locate[0m
[0mthe appropriate headers automatically. However, there are a few caveats to be[0m
[0maware of:[0m

    * [0m[0m[0mWhen [33mnode-gyp[39m runs, it will detect the specific release version of Node.js[0m[0m[0m
      [0m[0m[0mand download either the full source tarball or just the headers. If the full[0m[0m[0m
      [0m[0m[0msource is downloaded, Addons will have complete access to the full set of[0m[0m[0m
      [0m[0m[0mNode.js dependencies. However, if only the Node.js headers are downloaded, then[0m[0m[0m
      [0m[0m[0monly the symbols exported by Node.js will be available.[0m[0m[0m
    * [0m[0m[0m[33mnode-gyp[39m can be run using the [33m--nodedir[39m flag pointing at a local Node.js[0m[0m[0m
      [0m[0m[0msource image. Using this option, the Addon will have access to the full set of[0m[0m[0m
      [0m[0m[0mdependencies.[0m[0m[0m

[32m[1m### Loading Addons using [33mrequire()[39m[32m[22m[39m

[0mThe filename extension of the compiled Addon binary is [33m.node[39m (as opposed[0m
[0mto [33m.dll[39m or [33m.so[39m). The [34m[33mrequire()[39m[34m ([34m[4mmodules.html#modules_require_id[24m[39m[34m)[39m function is written to look for[0m
[0mfiles with the [33m.node[39m file extension and initialize those as dynamically-linked[0m
[0mlibraries.[0m

[0mWhen calling [34m[33mrequire()[39m[34m ([34m[4mmodules.html#modules_require_id[24m[39m[34m)[39m, the [33m.node[39m extension can usually be[0m
[0momitted and Node.js will still find and initialize the Addon. One caveat,[0m
[0mhowever, is that Node.js will first attempt to locate and load modules or[0m
[0mJavaScript files that happen to share the same base name. For instance, if[0m
[0mthere is a file [33maddon.js[39m in the same directory as the binary [33maddon.node[39m,[0m
[0mthen [34m[33mrequire('addon')[39m[34m ([34m[4mmodules.html#modules_require_id[24m[39m[34m)[39m will give precedence to the [33maddon.js[39m file[0m
[0mand load it instead.[0m

[32m[1m## Native Abstractions for Node.js[22m[39m

[0mEach of the examples illustrated in this document make direct use of the[0m
[0mNode.js and V8 APIs for implementing Addons. The V8 API can, and has, changed[0m
[0mdramatically from one V8 release to the next (and one major Node.js release to[0m
[0mthe next). With each change, Addons may need to be updated and recompiled in[0m
[0morder to continue functioning. The Node.js release schedule is designed to[0m
[0mminimize the frequency and impact of such changes but there is little that[0m
[0mNode.js can do currently to ensure stability of the V8 APIs.[0m

[0mThe [34mNative Abstractions for Node.js ([34m[4mhttps://github.com/nodejs/nan[24m[39m[34m)[39m (or [33mnan[39m) provide a set of tools that[0m
[0mAddon developers are recommended to use to keep compatibility between past and[0m
[0mfuture releases of V8 and Node.js. See the [33mnan[39m [34mexamples ([34m[4mhttps://github.com/nodejs/nan/tree/master/examples/[24m[39m[34m)[39m for an[0m
[0millustration of how it can be used.[0m

[32m[1m## N-API[22m[39m

[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mN-API is an API for building native Addons. It is independent from[0m
[0mthe underlying JavaScript runtime (e.g. V8) and is maintained as part of[0m
[0mNode.js itself. This API will be Application Binary Interface (ABI) stable[0m
[0macross versions of Node.js. It is intended to insulate Addons from[0m
[0mchanges in the underlying JavaScript engine and allow modules[0m
[0mcompiled for one version to run on later versions of Node.js without[0m
[0mrecompilation. Addons are built/packaged with the same approach/tools[0m
[0moutlined in this document (node-gyp, etc.). The only difference is the[0m
[0mset of APIs that are used by the native code. Instead of using the V8[0m
[0mor [34mNative Abstractions for Node.js ([34m[4mhttps://github.com/nodejs/nan[24m[39m[34m)[39m APIs, the functions available[0m
[0min the N-API are used.[0m

[0mCreating and maintaining an addon that benefits from the ABI stability[0m
[0mprovided by N-API carries with it certain[0m
[0m[34mimplementation considerations ([34m[4mn-api.html#n_api_implications_of_abi_stability[24m[39m[34m)[39m.[0m

[0mTo use N-API in the above "Hello world" example, replace the content of[0m
[0m[33mhello.cc[39m with the following. All other instructions remain the same.[0m

    [33m// hello.cc using N-API[39m
    [33m#include <node_api.h>[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33mnapi_value Method(napi_env env, napi_callback_info args) {[39m
    [33m  napi_value greeting;[39m
    [33m  napi_status status;[39m
    [33m[39m
    [33m  status = napi_create_string_utf8(env, "world", NAPI_AUTO_LENGTH, &greeting);[39m
    [33m  if (status != napi_ok) return nullptr;[39m
    [33m  return greeting;[39m
    [33m}[39m
    [33m[39m
    [33mnapi_value init(napi_env env, napi_value exports) {[39m
    [33m  napi_status status;[39m
    [33m  napi_value fn;[39m
    [33m[39m
    [33m  status = napi_create_function(env, nullptr, 0, Method, nullptr, &fn);[39m
    [33m  if (status != napi_ok) return nullptr;[39m
    [33m[39m
    [33m  status = napi_set_named_property(env, exports, "hello", fn);[39m
    [33m  if (status != napi_ok) return nullptr;[39m
    [33m  return exports;[39m
    [33m}[39m
    [33m[39m
    [33mNAPI_MODULE(NODE_GYP_MODULE_NAME, init)[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mThe functions available and how to use them are documented in[0m
[0m[34mC/C++ Addons with N-API ([34m[4mn-api.html[24m[39m[34m)[39m.[0m

[32m[1m## Addon examples[22m[39m

[0mFollowing are some example Addons intended to help developers get started. The[0m
[0mexamples make use of the V8 APIs. Refer to the online [34mV8 reference ([34m[4mhttps://v8docs.nodesource.com/[24m[39m[34m)[39m[0m
[0mfor help with the various V8 calls, and V8's [34mEmbedder's Guide ([34m[4mhttps://github.com/v8/v8/wiki/Embedder's%20Guide[24m[39m[34m)[39m for an[0m
[0mexplanation of several concepts used such as handles, scopes, function[0m
[0mtemplates, etc.[0m

[0mEach of these examples using the following [33mbinding.gyp[39m file:[0m

    [33m{[39m
    [33m  "targets": [[39m
    [33m    {[39m
    [33m      "target_name": "addon",[39m
    [33m      "sources": [ "addon.cc" ][39m
    [33m    }[39m
    [33m  ][39m
    [33m}[39m

[0mIn cases where there is more than one [33m.cc[39m file, simply add the additional[0m
[0mfilename to the [33msources[39m array:[0m

    [33m"sources": ["addon.cc", "myexample.cc"][39m

[0mOnce the [33mbinding.gyp[39m file is ready, the example Addons can be configured and[0m
[0mbuilt using [33mnode-gyp[39m:[0m

    [33m$ node-gyp configure build[39m

[32m[1m### Function arguments[22m[39m

[0mAddons will typically expose objects and functions that can be accessed from[0m
[0mJavaScript running within Node.js. When functions are invoked from JavaScript,[0m
[0mthe input arguments and return value must be mapped to and from the C/C++[0m
[0mcode.[0m

[0mThe following example illustrates how to read function arguments passed from[0m
[0mJavaScript and how to return a result:[0m

    [33m// addon.cc[39m
    [33m#include <node.h>[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing v8::Exception;[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::NewStringType;[39m
    [33musing v8::Number;[39m
    [33musing v8::Object;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33m// This is the implementation of the "add" method[39m
    [33m// Input arguments are passed using the[39m
    [33m// const FunctionCallbackInfo<Value>& args struct[39m
    [33mvoid Add(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m[39m
    [33m  // Check the number of arguments passed.[39m
    [33m  if (args.Length() < 2) {[39m
    [33m    // Throw an Error that is passed back to JavaScript[39m
    [33m    isolate->ThrowException(Exception::TypeError([39m
    [33m        String::NewFromUtf8(isolate,[39m
    [33m                            "Wrong number of arguments",[39m
    [33m                            NewStringType::kNormal).ToLocalChecked()));[39m
    [33m    return;[39m
    [33m  }[39m
    [33m[39m
    [33m  // Check the argument types[39m
    [33m  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {[39m
    [33m    isolate->ThrowException(Exception::TypeError([39m
    [33m        String::NewFromUtf8(isolate,[39m
    [33m                            "Wrong arguments",[39m
    [33m                            NewStringType::kNormal).ToLocalChecked()));[39m
    [33m    return;[39m
    [33m  }[39m
    [33m[39m
    [33m  // Perform the operation[39m
    [33m  double value =[39m
    [33m      args[0].As<Number>()->Value() + args[1].As<Number>()->Value();[39m
    [33m  Local<Number> num = Number::New(isolate, value);[39m
    [33m[39m
    [33m  // Set the return value (using the passed in[39m
    [33m  // FunctionCallbackInfo<Value>&)[39m
    [33m  args.GetReturnValue().Set(num);[39m
    [33m}[39m
    [33m[39m
    [33mvoid Init(Local<Object> exports) {[39m
    [33m  NODE_SET_METHOD(exports, "add", Add);[39m
    [33m}[39m
    [33m[39m
    [33mNODE_MODULE(NODE_GYP_MODULE_NAME, Init)[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mOnce compiled, the example Addon can be required and used from within Node.js:[0m

    [90m// test.js[39m
    [94mconst[39m [37maddon[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./build/Release/addon'[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'This should be eight:'[39m[32m,[39m [37maddon[39m[32m.[39m[37madd[39m[90m([39m[34m3[39m[32m,[39m [34m5[39m[90m)[39m[90m)[39m[90m;[39m

[32m[1m### Callbacks[22m[39m

[0mIt is common practice within Addons to pass JavaScript functions to a C++[0m
[0mfunction and execute them from there. The following example illustrates how[0m
[0mto invoke such callbacks:[0m

    [33m// addon.cc[39m
    [33m#include <node.h>[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing v8::Context;[39m
    [33musing v8::Function;[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::NewStringType;[39m
    [33musing v8::Null;[39m
    [33musing v8::Object;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33mvoid RunCallback(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m  Local<Function> cb = Local<Function>::Cast(args[0]);[39m
    [33m  const unsigned argc = 1;[39m
    [33m  Local<Value> argv[argc] = {[39m
    [33m      String::NewFromUtf8(isolate,[39m
    [33m                          "hello world",[39m
    [33m                          NewStringType::kNormal).ToLocalChecked() };[39m
    [33m  cb->Call(context, Null(isolate), argc, argv).ToLocalChecked();[39m
    [33m}[39m
    [33m[39m
    [33mvoid Init(Local<Object> exports, Local<Object> module) {[39m
    [33m  NODE_SET_METHOD(module, "exports", RunCallback);[39m
    [33m}[39m
    [33m[39m
    [33mNODE_MODULE(NODE_GYP_MODULE_NAME, Init)[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mThis example uses a two-argument form of [33mInit()[39m that receives the full[0m
[0m[33mmodule[39m object as the second argument. This allows the Addon to completely[0m
[0moverwrite [33mexports[39m with a single function instead of adding the function as a[0m
[0mproperty of [33mexports[39m.[0m

[0mTo test it, run the following JavaScript:[0m

    [90m// test.js[39m
    [94mconst[39m [37maddon[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./build/Release/addon'[39m[90m)[39m[90m;[39m
    
    [37maddon[39m[90m([39m[90m([39m[37mmsg[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mmsg[39m[90m)[39m[90m;[39m
    [90m// Prints: 'hello world'[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIn this example, the callback function is invoked synchronously.[0m

[32m[1m### Object factory[22m[39m

[0mAddons can create and return new objects from within a C++ function as[0m
[0millustrated in the following example. An object is created and returned with a[0m
[0mproperty [33mmsg[39m that echoes the string passed to [33mcreateObject()[39m:[0m

    [33m// addon.cc[39m
    [33m#include <node.h>[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing v8::Context;[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::NewStringType;[39m
    [33musing v8::Object;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33mvoid CreateObject(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m[39m
    [33m  Local<Object> obj = Object::New(isolate);[39m
    [33m  obj->Set(context,[39m
    [33m           String::NewFromUtf8(isolate,[39m
    [33m                               "msg",[39m
    [33m                               NewStringType::kNormal).ToLocalChecked(),[39m
    [33m                               args[0]->ToString(context).ToLocalChecked())[39m
    [33m           .FromJust();[39m
    [33m[39m
    [33m  args.GetReturnValue().Set(obj);[39m
    [33m}[39m
    [33m[39m
    [33mvoid Init(Local<Object> exports, Local<Object> module) {[39m
    [33m  NODE_SET_METHOD(module, "exports", CreateObject);[39m
    [33m}[39m
    [33m[39m
    [33mNODE_MODULE(NODE_GYP_MODULE_NAME, Init)[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mTo test it in JavaScript:[0m

    [90m// test.js[39m
    [94mconst[39m [37maddon[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./build/Release/addon'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobj1[39m [93m=[39m [37maddon[39m[90m([39m[92m'hello'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mobj2[39m [93m=[39m [37maddon[39m[90m([39m[92m'world'[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj1[39m[32m.[39m[37mmsg[39m[32m,[39m [37mobj2[39m[32m.[39m[37mmsg[39m[90m)[39m[90m;[39m
    [90m// Prints: 'hello world'[39m

[32m[1m### Function factory[22m[39m

[0mAnother common scenario is creating JavaScript functions that wrap C++[0m
[0mfunctions and returning those back to JavaScript:[0m

    [33m// addon.cc[39m
    [33m#include <node.h>[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing v8::Context;[39m
    [33musing v8::Function;[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::FunctionTemplate;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::NewStringType;[39m
    [33musing v8::Object;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33mvoid MyFunction(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m  args.GetReturnValue().Set(String::NewFromUtf8([39m
    [33m      isolate, "hello world", NewStringType::kNormal).ToLocalChecked());[39m
    [33m}[39m
    [33m[39m
    [33mvoid CreateFunction(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, MyFunction);[39m
    [33m  Local<Function> fn = tpl->GetFunction(context).ToLocalChecked();[39m
    [33m[39m
    [33m  // omit this to make it anonymous[39m
    [33m  fn->SetName(String::NewFromUtf8([39m
    [33m      isolate, "theFunction", NewStringType::kNormal).ToLocalChecked());[39m
    [33m[39m
    [33m  args.GetReturnValue().Set(fn);[39m
    [33m}[39m
    [33m[39m
    [33mvoid Init(Local<Object> exports, Local<Object> module) {[39m
    [33m  NODE_SET_METHOD(module, "exports", CreateFunction);[39m
    [33m}[39m
    [33m[39m
    [33mNODE_MODULE(NODE_GYP_MODULE_NAME, Init)[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mTo test:[0m

    [90m// test.js[39m
    [94mconst[39m [37maddon[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./build/Release/addon'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mfn[39m [93m=[39m [37maddon[39m[90m([39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mfn[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 'hello world'[39m

[32m[1m### Wrapping C++ objects[22m[39m

[0mIt is also possible to wrap C++ objects/classes in a way that allows new[0m
[0minstances to be created using the JavaScript [33mnew[39m operator:[0m

    [33m// addon.cc[39m
    [33m#include <node.h>[39m
    [33m#include "myobject.h"[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing v8::Local;[39m
    [33musing v8::Object;[39m
    [33m[39m
    [33mvoid InitAll(Local<Object> exports) {[39m
    [33m  MyObject::Init(exports);[39m
    [33m}[39m
    [33m[39m
    [33mNODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mThen, in [33mmyobject.h[39m, the wrapper class inherits from [33mnode::ObjectWrap[39m:[0m

    [33m// myobject.h[39m
    [33m#ifndef MYOBJECT_H[39m
    [33m#define MYOBJECT_H[39m
    [33m[39m
    [33m#include <node.h>[39m
    [33m#include <node_object_wrap.h>[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33mclass MyObject : public node::ObjectWrap {[39m
    [33m public:[39m
    [33m  static void Init(v8::Local<v8::Object> exports);[39m
    [33m[39m
    [33m private:[39m
    [33m  explicit MyObject(double value = 0);[39m
    [33m  ~MyObject();[39m
    [33m[39m
    [33m  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);[39m
    [33m  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);[39m
    [33m[39m
    [33m  double value_;[39m
    [33m};[39m
    [33m[39m
    [33m}  // namespace demo[39m
    [33m[39m
    [33m#endif[39m

[0mIn [33mmyobject.cc[39m, implement the various methods that are to be exposed.[0m
[0mBelow, the method [33mplusOne()[39m is exposed by adding it to the constructor's[0m
[0mprototype:[0m

    [33m// myobject.cc[39m
    [33m#include "myobject.h"[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing v8::Context;[39m
    [33musing v8::Function;[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::FunctionTemplate;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::NewStringType;[39m
    [33musing v8::Number;[39m
    [33musing v8::Object;[39m
    [33musing v8::ObjectTemplate;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33mMyObject::MyObject(double value) : value_(value) {[39m
    [33m}[39m
    [33m[39m
    [33mMyObject::~MyObject() {[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::Init(Local<Object> exports) {[39m
    [33m  Isolate* isolate = exports->GetIsolate();[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m[39m
    [33m  Local<ObjectTemplate> addon_data_tpl = ObjectTemplate::New(isolate);[39m
    [33m  addon_data_tpl->SetInternalFieldCount(1);  // 1 field for the MyObject::New()[39m
    [33m  Local<Object> addon_data =[39m
    [33m      addon_data_tpl->NewInstance(context).ToLocalChecked();[39m
    [33m[39m
    [33m  // Prepare constructor template[39m
    [33m  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New, addon_data);[39m
    [33m  tpl->SetClassName(String::NewFromUtf8([39m
    [33m      isolate, "MyObject", NewStringType::kNormal).ToLocalChecked());[39m
    [33m  tpl->InstanceTemplate()->SetInternalFieldCount(1);[39m
    [33m[39m
    [33m  // Prototype[39m
    [33m  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);[39m
    [33m[39m
    [33m  Local<Function> constructor = tpl->GetFunction(context).ToLocalChecked();[39m
    [33m  addon_data->SetInternalField(0, constructor);[39m
    [33m  exports->Set(context, String::NewFromUtf8([39m
    [33m      isolate, "MyObject", NewStringType::kNormal).ToLocalChecked(),[39m
    [33m               constructor).FromJust();[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::New(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m[39m
    [33m  if (args.IsConstructCall()) {[39m
    [33m    // Invoked as constructor: `new MyObject(...)`[39m
    [33m    double value = args[0]->IsUndefined() ?[39m
    [33m        0 : args[0]->NumberValue(context).FromMaybe(0);[39m
    [33m    MyObject* obj = new MyObject(value);[39m
    [33m    obj->Wrap(args.This());[39m
    [33m    args.GetReturnValue().Set(args.This());[39m
    [33m  } else {[39m
    [33m    // Invoked as plain function `MyObject(...)`, turn into construct call.[39m
    [33m    const int argc = 1;[39m
    [33m    Local<Value> argv[argc] = { args[0] };[39m
    [33m    Local<Function> cons =[39m
    [33m        args.Data().As<Object>()->GetInternalField(0).As<Function>();[39m
    [33m    Local<Object> result =[39m
    [33m        cons->NewInstance(context, argc, argv).ToLocalChecked();[39m
    [33m    args.GetReturnValue().Set(result);[39m
    [33m  }[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m[39m
    [33m  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.Holder());[39m
    [33m  obj->value_ += 1;[39m
    [33m[39m
    [33m  args.GetReturnValue().Set(Number::New(isolate, obj->value_));[39m
    [33m}[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mTo build this example, the [33mmyobject.cc[39m file must be added to the[0m
[0m[33mbinding.gyp[39m:[0m

    [33m{[39m
    [33m  "targets": [[39m
    [33m    {[39m
    [33m      "target_name": "addon",[39m
    [33m      "sources": [[39m
    [33m        "addon.cc",[39m
    [33m        "myobject.cc"[39m
    [33m      ][39m
    [33m    }[39m
    [33m  ][39m
    [33m}[39m

[0mTest it with:[0m

    [90m// test.js[39m
    [94mconst[39m [37maddon[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./build/Release/addon'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobj[39m [93m=[39m [31mnew[39m [37maddon[39m[32m.[39m[37mMyObject[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj[39m[32m.[39m[37mplusOne[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 11[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj[39m[32m.[39m[37mplusOne[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 12[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj[39m[32m.[39m[37mplusOne[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 13[39m

[0mThe destructor for a wrapper object will run when the object is[0m
[0mgarbage-collected. For destructor testing, there are command-line flags that[0m
[0mcan be used to make it possible to force garbage collection. These flags are[0m
[0mprovided by the underlying V8 JavaScript engine. They are subject to change[0m
[0mor removal at any time. They are not documented by Node.js or V8, and they[0m
[0mshould never be used outside of testing.[0m

[32m[1m### Factory of wrapped objects[22m[39m

[0mAlternatively, it is possible to use a factory pattern to avoid explicitly[0m
[0mcreating object instances using the JavaScript [33mnew[39m operator:[0m

    [94mconst[39m [37mobj[39m [93m=[39m [37maddon[39m[32m.[39m[37mcreateObject[39m[90m([39m[90m)[39m[90m;[39m
    [90m// instead of:[39m
    [90m// const obj = new addon.Object();[39m

[0mFirst, the [33mcreateObject()[39m method is implemented in [33maddon.cc[39m:[0m

    [33m// addon.cc[39m
    [33m#include <node.h>[39m
    [33m#include "myobject.h"[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::Object;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33mvoid CreateObject(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  MyObject::NewInstance(args);[39m
    [33m}[39m
    [33m[39m
    [33mvoid InitAll(Local<Object> exports, Local<Object> module) {[39m
    [33m  MyObject::Init(exports->GetIsolate());[39m
    [33m[39m
    [33m  NODE_SET_METHOD(module, "exports", CreateObject);[39m
    [33m}[39m
    [33m[39m
    [33mNODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mIn [33mmyobject.h[39m, the static method [33mNewInstance()[39m is added to handle[0m
[0minstantiating the object. This method takes the place of using [33mnew[39m in[0m
[0mJavaScript:[0m

    [33m// myobject.h[39m
    [33m#ifndef MYOBJECT_H[39m
    [33m#define MYOBJECT_H[39m
    [33m[39m
    [33m#include <node.h>[39m
    [33m#include <node_object_wrap.h>[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33mclass MyObject : public node::ObjectWrap {[39m
    [33m public:[39m
    [33m  static void Init(v8::Isolate* isolate);[39m
    [33m  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);[39m
    [33m[39m
    [33m private:[39m
    [33m  explicit MyObject(double value = 0);[39m
    [33m  ~MyObject();[39m
    [33m[39m
    [33m  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);[39m
    [33m  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);[39m
    [33m  static v8::Global<v8::Function> constructor;[39m
    [33m  double value_;[39m
    [33m};[39m
    [33m[39m
    [33m}  // namespace demo[39m
    [33m[39m
    [33m#endif[39m

[0mThe implementation in [33mmyobject.cc[39m is similar to the previous example:[0m

    [33m// myobject.cc[39m
    [33m#include <node.h>[39m
    [33m#include "myobject.h"[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing node::AddEnvironmentCleanupHook;[39m
    [33musing v8::Context;[39m
    [33musing v8::Function;[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::FunctionTemplate;[39m
    [33musing v8::Global;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::NewStringType;[39m
    [33musing v8::Number;[39m
    [33musing v8::Object;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33m// Warning! This is not thread-safe, this addon cannot be used for worker[39m
    [33m// threads.[39m
    [33mGlobal<Function> MyObject::constructor;[39m
    [33m[39m
    [33mMyObject::MyObject(double value) : value_(value) {[39m
    [33m}[39m
    [33m[39m
    [33mMyObject::~MyObject() {[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::Init(Isolate* isolate) {[39m
    [33m  // Prepare constructor template[39m
    [33m  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);[39m
    [33m  tpl->SetClassName(String::NewFromUtf8([39m
    [33m      isolate, "MyObject", NewStringType::kNormal).ToLocalChecked());[39m
    [33m  tpl->InstanceTemplate()->SetInternalFieldCount(1);[39m
    [33m[39m
    [33m  // Prototype[39m
    [33m  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);[39m
    [33m[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m  constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());[39m
    [33m[39m
    [33m  AddEnvironmentCleanupHook(isolate, [](void*) {[39m
    [33m    constructor.Reset();[39m
    [33m  }, nullptr);[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::New(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m[39m
    [33m  if (args.IsConstructCall()) {[39m
    [33m    // Invoked as constructor: `new MyObject(...)`[39m
    [33m    double value = args[0]->IsUndefined() ?[39m
    [33m        0 : args[0]->NumberValue(context).FromMaybe(0);[39m
    [33m    MyObject* obj = new MyObject(value);[39m
    [33m    obj->Wrap(args.This());[39m
    [33m    args.GetReturnValue().Set(args.This());[39m
    [33m  } else {[39m
    [33m    // Invoked as plain function `MyObject(...)`, turn into construct call.[39m
    [33m    const int argc = 1;[39m
    [33m    Local<Value> argv[argc] = { args[0] };[39m
    [33m    Local<Function> cons = Local<Function>::New(isolate, constructor);[39m
    [33m    Local<Object> instance =[39m
    [33m        cons->NewInstance(context, argc, argv).ToLocalChecked();[39m
    [33m    args.GetReturnValue().Set(instance);[39m
    [33m  }[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m[39m
    [33m  const unsigned argc = 1;[39m
    [33m  Local<Value> argv[argc] = { args[0] };[39m
    [33m  Local<Function> cons = Local<Function>::New(isolate, constructor);[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m  Local<Object> instance =[39m
    [33m      cons->NewInstance(context, argc, argv).ToLocalChecked();[39m
    [33m[39m
    [33m  args.GetReturnValue().Set(instance);[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m[39m
    [33m  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.Holder());[39m
    [33m  obj->value_ += 1;[39m
    [33m[39m
    [33m  args.GetReturnValue().Set(Number::New(isolate, obj->value_));[39m
    [33m}[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mOnce again, to build this example, the [33mmyobject.cc[39m file must be added to the[0m
[0m[33mbinding.gyp[39m:[0m

    [33m{[39m
    [33m  "targets": [[39m
    [33m    {[39m
    [33m      "target_name": "addon",[39m
    [33m      "sources": [[39m
    [33m        "addon.cc",[39m
    [33m        "myobject.cc"[39m
    [33m      ][39m
    [33m    }[39m
    [33m  ][39m
    [33m}[39m

[0mTest it with:[0m

    [90m// test.js[39m
    [94mconst[39m [37mcreateObject[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./build/Release/addon'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobj[39m [93m=[39m [37mcreateObject[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj[39m[32m.[39m[37mplusOne[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 11[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj[39m[32m.[39m[37mplusOne[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 12[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj[39m[32m.[39m[37mplusOne[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 13[39m
    
    [94mconst[39m [37mobj2[39m [93m=[39m [37mcreateObject[39m[90m([39m[34m20[39m[90m)[39m[90m;[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj2[39m[32m.[39m[37mplusOne[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 21[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj2[39m[32m.[39m[37mplusOne[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 22[39m
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mobj2[39m[32m.[39m[37mplusOne[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// Prints: 23[39m

[32m[1m### Passing wrapped objects around[22m[39m

[0mIn addition to wrapping and returning C++ objects, it is possible to pass[0m
[0mwrapped objects around by unwrapping them with the Node.js helper function[0m
[0m[33mnode::ObjectWrap::Unwrap[39m. The following examples shows a function [33madd()[39m[0m
[0mthat can take two [33mMyObject[39m objects as input arguments:[0m

    [33m// addon.cc[39m
    [33m#include <node.h>[39m
    [33m#include <node_object_wrap.h>[39m
    [33m#include "myobject.h"[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing v8::Context;[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::Number;[39m
    [33musing v8::Object;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33mvoid CreateObject(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  MyObject::NewInstance(args);[39m
    [33m}[39m
    [33m[39m
    [33mvoid Add(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m[39m
    [33m  MyObject* obj1 = node::ObjectWrap::Unwrap<MyObject>([39m
    [33m      args[0]->ToObject(context).ToLocalChecked());[39m
    [33m  MyObject* obj2 = node::ObjectWrap::Unwrap<MyObject>([39m
    [33m      args[1]->ToObject(context).ToLocalChecked());[39m
    [33m[39m
    [33m  double sum = obj1->value() + obj2->value();[39m
    [33m  args.GetReturnValue().Set(Number::New(isolate, sum));[39m
    [33m}[39m
    [33m[39m
    [33mvoid InitAll(Local<Object> exports) {[39m
    [33m  MyObject::Init(exports->GetIsolate());[39m
    [33m[39m
    [33m  NODE_SET_METHOD(exports, "createObject", CreateObject);[39m
    [33m  NODE_SET_METHOD(exports, "add", Add);[39m
    [33m}[39m
    [33m[39m
    [33mNODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mIn [33mmyobject.h[39m, a new public method is added to allow access to private values[0m
[0mafter unwrapping the object.[0m

    [33m// myobject.h[39m
    [33m#ifndef MYOBJECT_H[39m
    [33m#define MYOBJECT_H[39m
    [33m[39m
    [33m#include <node.h>[39m
    [33m#include <node_object_wrap.h>[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33mclass MyObject : public node::ObjectWrap {[39m
    [33m public:[39m
    [33m  static void Init(v8::Isolate* isolate);[39m
    [33m  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);[39m
    [33m  inline double value() const { return value_; }[39m
    [33m[39m
    [33m private:[39m
    [33m  explicit MyObject(double value = 0);[39m
    [33m  ~MyObject();[39m
    [33m[39m
    [33m  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);[39m
    [33m  static v8::Global<v8::Function> constructor;[39m
    [33m  double value_;[39m
    [33m};[39m
    [33m[39m
    [33m}  // namespace demo[39m
    [33m[39m
    [33m#endif[39m

[0mThe implementation of [33mmyobject.cc[39m is similar to before:[0m

    [33m// myobject.cc[39m
    [33m#include <node.h>[39m
    [33m#include "myobject.h"[39m
    [33m[39m
    [33mnamespace demo {[39m
    [33m[39m
    [33musing node::AddEnvironmentCleanupHook;[39m
    [33musing v8::Context;[39m
    [33musing v8::Function;[39m
    [33musing v8::FunctionCallbackInfo;[39m
    [33musing v8::FunctionTemplate;[39m
    [33musing v8::Global;[39m
    [33musing v8::Isolate;[39m
    [33musing v8::Local;[39m
    [33musing v8::NewStringType;[39m
    [33musing v8::Object;[39m
    [33musing v8::String;[39m
    [33musing v8::Value;[39m
    [33m[39m
    [33m// Warning! This is not thread-safe, this addon cannot be used for worker[39m
    [33m// threads.[39m
    [33mGlobal<Function> MyObject::constructor;[39m
    [33m[39m
    [33mMyObject::MyObject(double value) : value_(value) {[39m
    [33m}[39m
    [33m[39m
    [33mMyObject::~MyObject() {[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::Init(Isolate* isolate) {[39m
    [33m  // Prepare constructor template[39m
    [33m  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);[39m
    [33m  tpl->SetClassName(String::NewFromUtf8([39m
    [33m      isolate, "MyObject", NewStringType::kNormal).ToLocalChecked());[39m
    [33m  tpl->InstanceTemplate()->SetInternalFieldCount(1);[39m
    [33m[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m  constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());[39m
    [33m[39m
    [33m  AddEnvironmentCleanupHook(isolate, [](void*) {[39m
    [33m    constructor.Reset();[39m
    [33m  }, nullptr);[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::New(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m[39m
    [33m  if (args.IsConstructCall()) {[39m
    [33m    // Invoked as constructor: `new MyObject(...)`[39m
    [33m    double value = args[0]->IsUndefined() ?[39m
    [33m        0 : args[0]->NumberValue(context).FromMaybe(0);[39m
    [33m    MyObject* obj = new MyObject(value);[39m
    [33m    obj->Wrap(args.This());[39m
    [33m    args.GetReturnValue().Set(args.This());[39m
    [33m  } else {[39m
    [33m    // Invoked as plain function `MyObject(...)`, turn into construct call.[39m
    [33m    const int argc = 1;[39m
    [33m    Local<Value> argv[argc] = { args[0] };[39m
    [33m    Local<Function> cons = Local<Function>::New(isolate, constructor);[39m
    [33m    Local<Object> instance =[39m
    [33m        cons->NewInstance(context, argc, argv).ToLocalChecked();[39m
    [33m    args.GetReturnValue().Set(instance);[39m
    [33m  }[39m
    [33m}[39m
    [33m[39m
    [33mvoid MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {[39m
    [33m  Isolate* isolate = args.GetIsolate();[39m
    [33m[39m
    [33m  const unsigned argc = 1;[39m
    [33m  Local<Value> argv[argc] = { args[0] };[39m
    [33m  Local<Function> cons = Local<Function>::New(isolate, constructor);[39m
    [33m  Local<Context> context = isolate->GetCurrentContext();[39m
    [33m  Local<Object> instance =[39m
    [33m      cons->NewInstance(context, argc, argv).ToLocalChecked();[39m
    [33m[39m
    [33m  args.GetReturnValue().Set(instance);[39m
    [33m}[39m
    [33m[39m
    [33m}  // namespace demo[39m

[0mTest it with:[0m

    [90m// test.js[39m
    [94mconst[39m [37maddon[39m [93m=[39m [37mrequire[39m[90m([39m[92m'./build/Release/addon'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobj1[39m [93m=[39m [37maddon[39m[32m.[39m[37mcreateObject[39m[90m([39m[34m10[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mobj2[39m [93m=[39m [37maddon[39m[32m.[39m[37mcreateObject[39m[90m([39m[34m20[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mresult[39m [93m=[39m [37maddon[39m[32m.[39m[37madd[39m[90m([39m[37mobj1[39m[32m,[39m [37mobj2[39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mresult[39m[90m)[39m[90m;[39m
    [90m// Prints: 30[39m

