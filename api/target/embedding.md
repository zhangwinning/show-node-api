[35m[4m[1m# C++ Embedder API[22m[24m[39m

[90m<!--introduced_in=REPLACEME-->[39m
[90m[39m
[90m[39m[0mNode.js provides a number of C++ APIs that can be used to execute JavaScript[0m
[0min a Node.js environment from other C++ software.[0m

[0mThe documentation for these APIs can be found in [34msrc/node.h ([34m[4mhttps://github.com/nodejs/node/blob/master/src/node.h[24m[39m[34m)[39m in the Node.js[0m
[0msource tree. In addition to the APIs exposed by Node.js, some required concepts[0m
[0mare provided by the V8 embedder API.[0m

[0mBecause using Node.js as an embedded library is different from writing code[0m
[0mthat is executed by Node.js, breaking changes do not follow typical Node.js[0m
[0m[34mdeprecation policy ([34m[4mdeprecations.html[24m[39m[34m)[39m and may occur on each semver-major release without prior[0m
[0mwarning.[0m

[32m[1m## Example embedding application[22m[39m

[0mThe following sections will provide an overview over how to use these APIs[0m
[0mto create an application from scratch that will perform the equivalent of[0m
[0m[33mnode -e <code>[39m, i.e. that will take a piece of JavaScript and run it in[0m
[0ma Node.js-specific environment.[0m

[0mThe full code can be found [34min the Node.js source tree ([34m[4mhttps://github.com/nodejs/node/blob/master/test/embedding/embedtest.cc[24m[39m[34m)[39m.[0m

[32m[1m### Setting up per-process state[22m[39m

[0mNode.js requires some per-process state management in order to run:[0m

    * [0mArguments parsing for Node.js [34mCLI options ([34m[4mcli.html[24m[39m[34m)[39m,[0m
    * [0mV8 per-process requirements, such as a [33mv8::Platform[39m instance.[0m

[0mThe following example shows how these can be set up. Some class names are from[0m
[0mthe [33mnode[39m and [33mv8[39m C++ namespaces, respectively.[0m

    [33mint main(int argc, char** argv) {[39m
    [33m  std::vector<std::string> args(argv, argv + argc);[39m
    [33m  std::vector<std::string> exec_args;[39m
    [33m  std::vector<std::string> errors;[39m
    [33m  // Parse Node.js CLI options, and print any errors that have occurred while[39m
    [33m  // trying to parse them.[39m
    [33m  int exit_code = node::InitializeNodeWithArgs(&args, &exec_args, &errors);[39m
    [33m  for (const std::string& error : errors)[39m
    [33m    fprintf(stderr, "%s: %s\n", args[0].c_str(), error.c_str());[39m
    [33m  if (exit_code != 0) {[39m
    [33m    return exit_code;[39m
    [33m  }[39m
    [33m[39m
    [33m  // Create a v8::Platform instance. `MultiIsolatePlatform::Create()` is a way[39m
    [33m  // to create a v8::Platform instance that Node.js can use when creating[39m
    [33m  // Worker threads. When no `MultiIsolatePlatform` instance is present,[39m
    [33m  // Worker threads are disabled.[39m
    [33m  std::unique_ptr<MultiIsolatePlatform> platform =[39m
    [33m      MultiIsolatePlatform::Create(4);[39m
    [33m  V8::InitializePlatform(platform.get());[39m
    [33m  V8::Initialize();[39m
    [33m[39m
    [33m  // See below for the contents of this function.[39m
    [33m  int ret = RunNodeInstance(platform.get(), args, exec_args);[39m
    [33m[39m
    [33m  V8::Dispose();[39m
    [33m  V8::ShutdownPlatform();[39m
    [33m  return ret;[39m
    [33m}[39m

[32m[1m### Per-instance state[22m[39m

[0mNode.js has a concept of a “Node.js instance”, that is commonly being referred[0m
[0mto as [33mnode::Environment[39m. Each [33mnode::Environment[39m is associated with:[0m

    * [0mExactly one [33mv8::Isolate[39m, i.e. one JS Engine instance,[0m
    * [0mExactly one [33muv_loop_t[39m, i.e. one event loop, and[0m
    * [0mA number of [33mv8::Context[39ms, but exactly one main [33mv8::Context[39m.[0m
    * [0mOne [33mnode::IsolateData[39m instance that contains information that could be[0m
      [0mshared by multiple [33mnode::Environment[39ms that use the same [33mv8::Isolate[39m.[0m
      [0mCurrently, no testing if performed for this scenario.[0m

[0mIn order to set up a [33mv8::Isolate[39m, an [33mv8::ArrayBuffer::Allocator[39m needs[0m
[0mto be provided. One possible choice is the default Node.js allocator, which[0m
[0mcan be created through [33mnode::ArrayBufferAllocator::Create()[39m. Using the Node.js[0m
[0mallocator allows minor performance optimizations when addons use the Node.js[0m
[0mC++ [33mBuffer[39m API, and is required in order to track [33mArrayBuffer[39m memory in[0m
[0m[34m[33mprocess.memoryUsage()[39m[34m ([34m[4mprocess.html#process_process_memoryusage[24m[39m[34m)[39m.[0m

[0mAdditionally, each [33mv8::Isolate[39m that is used for a Node.js instance needs to[0m
[0mbe registered and unregistered with the [33mMultiIsolatePlatform[39m instance, if one[0m
[0mis being used, in order for the platform to know which event loop to use[0m
[0mfor tasks scheduled by the [33mv8::Isolate[39m.[0m

[0mThe [33mnode::NewIsolate()[39m helper function creates a [33mv8::Isolate[39m,[0m
[0msets it up with some Node.js-specific hooks (e.g. the Node.js error handler),[0m
[0mand registers it with the platform automatically.[0m

    [33mint RunNodeInstance(MultiIsolatePlatform* platform,[39m
    [33m                    const std::vector<std::string>& args,[39m
    [33m                    const std::vector<std::string>& exec_args) {[39m
    [33m  int exit_code = 0;[39m
    [33m  // Set up a libuv event loop.[39m
    [33m  uv_loop_t loop;[39m
    [33m  int ret = uv_loop_init(&loop);[39m
    [33m  if (ret != 0) {[39m
    [33m    fprintf(stderr, "%s: Failed to initialize loop: %s\n",[39m
    [33m            args[0].c_str(),[39m
    [33m            uv_err_name(ret));[39m
    [33m    return 1;[39m
    [33m  }[39m
    [33m[39m
    [33m  std::shared_ptr<ArrayBufferAllocator> allocator =[39m
    [33m      ArrayBufferAllocator::Create();[39m
    [33m[39m
    [33m  Isolate* isolate = NewIsolate(allocator, &loop, platform);[39m
    [33m  if (isolate == nullptr) {[39m
    [33m    fprintf(stderr, "%s: Failed to initialize V8 Isolate\n", args[0].c_str());[39m
    [33m    return 1;[39m
    [33m  }[39m
    [33m[39m
    [33m  {[39m
    [33m    Locker locker(isolate);[39m
    [33m    Isolate::Scope isolate_scope(isolate);[39m
    [33m[39m
    [33m    // Create a node::IsolateData instance that will later be released using[39m
    [33m    // node::FreeIsolateData().[39m
    [33m    std::unique_ptr<IsolateData, decltype(&node::FreeIsolateData)> isolate_data([39m
    [33m        node::CreateIsolateData(isolate, &loop, platform, allocator.get()),[39m
    [33m        node::FreeIsolateData);[39m
    [33m[39m
    [33m    // Set up a new v8::Context.[39m
    [33m    HandleScope handle_scope(isolate);[39m
    [33m    Local<Context> context = node::NewContext(isolate);[39m
    [33m    if (context.IsEmpty()) {[39m
    [33m      fprintf(stderr, "%s: Failed to initialize V8 Context\n", args[0].c_str());[39m
    [33m      return 1;[39m
    [33m    }[39m
    [33m[39m
    [33m    // The v8::Context needs to be entered when node::CreateEnvironment() and[39m
    [33m    // node::LoadEnvironment() are being called.[39m
    [33m    Context::Scope context_scope(context);[39m
    [33m[39m
    [33m    // Create a node::Environment instance that will later be released using[39m
    [33m    // node::FreeEnvironment().[39m
    [33m    std::unique_ptr<Environment, decltype(&node::FreeEnvironment)> env([39m
    [33m        node::CreateEnvironment(isolate_data.get(), context, args, exec_args),[39m
    [33m        node::FreeEnvironment);[39m
    [33m[39m
    [33m    // Set up the Node.js instance for execution, and run code inside of it.[39m
    [33m    // There is also a variant that takes a callback and provides it with[39m
    [33m    // the `require` and `process` objects, so that it can manually compile[39m
    [33m    // and run scripts as needed.[39m
    [33m    // The `require` function inside this script does *not* access the file[39m
    [33m    // system, and can only load built-in Node.js modules.[39m
    [33m    // `module.createRequire()` is being used to create one that is able to[39m
    [33m    // load files from the disk, and uses the standard CommonJS file loader[39m
    [33m    // instead of the internal-only `require` function.[39m
    [33m    MaybeLocal<Value> loadenv_ret = node::LoadEnvironment([39m
    [33m        env.get(),[39m
    [33m        "const publicRequire ="[39m
    [33m        "  require('module').createRequire(process.cwd() + '/');"[39m
    [33m        "globalThis.require = publicRequire;"[39m
    [33m        "require('vm').runInThisContext(process.argv[1]);");[39m
    [33m[39m
    [33m    if (loadenv_ret.IsEmpty())  // There has been a JS exception.[39m
    [33m      return 1;[39m
    [33m[39m
    [33m    {[39m
    [33m      // SealHandleScope protects against handle leaks from callbacks.[39m
    [33m      SealHandleScope seal(isolate);[39m
    [33m      bool more;[39m
    [33m      do {[39m
    [33m        uv_run(&loop, UV_RUN_DEFAULT);[39m
    [33m[39m
    [33m        // V8 tasks on background threads may end up scheduling new tasks in the[39m
    [33m        // foreground, which in turn can keep the event loop going. For example,[39m
    [33m        // WebAssembly.compile() may do so.[39m
    [33m        platform->DrainTasks(isolate);[39m
    [33m[39m
    [33m        // If there are new tasks, continue.[39m
    [33m        more = uv_loop_alive(&loop);[39m
    [33m        if (more) continue;[39m
    [33m[39m
    [33m        // node::EmitBeforeExit() is used to emit the 'beforeExit' event on[39m
    [33m        // the `process` object.[39m
    [33m        node::EmitBeforeExit(env.get());[39m
    [33m[39m
    [33m        // 'beforeExit' can also schedule new work that keeps the event loop[39m
    [33m        // running.[39m
    [33m        more = uv_loop_alive(&loop);[39m
    [33m      } while (more == true);[39m
    [33m    }[39m
    [33m[39m
    [33m    // node::EmitExit() returns the current exit code.[39m
    [33m    exit_code = node::EmitExit(env.get());[39m
    [33m[39m
    [33m    // node::Stop() can be used to explicitly stop the event loop and keep[39m
    [33m    // further JavaScript from running. It can be called from any thread,[39m
    [33m    // and will act like worker.terminate() if called from another thread.[39m
    [33m    node::Stop(env.get());[39m
    [33m  }[39m
    [33m[39m
    [33m  // Unregister the Isolate with the platform and add a listener that is called[39m
    [33m  // when the Platform is done cleaning up any state it had associated with[39m
    [33m  // the Isolate.[39m
    [33m  bool platform_finished = false;[39m
    [33m  platform->AddIsolateFinishedCallback(isolate, [](void* data) {[39m
    [33m    *static_cast<bool*>(data) = true;[39m
    [33m  }, &platform_finished);[39m
    [33m  platform->UnregisterIsolate(isolate);[39m
    [33m  isolate->Dispose();[39m
    [33m[39m
    [33m  // Wait until the platform has cleaned up all relevant resources.[39m
    [33m  while (!platform_finished)[39m
    [33m    uv_run(&loop, UV_RUN_ONCE);[39m
    [33m  int err = uv_loop_close(&loop);[39m
    [33m  assert(err == 0);[39m
    [33m[39m
    [33m  return exit_code;[39m
    [33m}[39m

