[35m[4m[1m# Child Process[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mchild_process[39m module provides the ability to spawn child processes in[0m
[0ma manner that is similar, but not identical, to popen(3). This capability[0m
[0mis primarily provided by the [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m function:[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mls[39m [93m=[39m [37mspawn[39m[90m([39m[92m'ls'[39m[32m,[39m [33m[[39m[92m'-lh'[39m[32m,[39m [92m'/usr'[39m[33m][39m[90m)[39m[90m;[39m
    
    [37mls[39m[32m.[39m[37mstdout[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`stdout: ${[37mdata[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mls[39m[32m.[39m[37mstderr[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`stderr: ${[37mdata[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mls[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`child process exited with code ${[37mcode[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mBy default, pipes for [33mstdin[39m, [33mstdout[39m, and [33mstderr[39m are established between[0m
[0mthe parent Node.js process and the spawned child. These pipes have[0m
[0mlimited (and platform-specific) capacity. If the child process writes to[0m
[0mstdout in excess of that limit without the output being captured, the child[0m
[0mprocess will block waiting for the pipe buffer to accept more data. This is[0m
[0midentical to the behavior of pipes in the shell. Use the [33m{ stdio: 'ignore' }[39m[0m
[0moption if the output will not be consumed.[0m

[0mThe command lookup will be performed using [33moptions.env.PATH[39m environment[0m
[0mvariable if passed in [33moptions[39m object, otherwise [33mprocess.env.PATH[39m will be[0m
[0mused. To account for the fact that Windows environment variables are[0m
[0mcase-insensitive Node.js will lexicographically sort all [33menv[39m keys and choose[0m
[0mthe first one case-insensitively matching [33mPATH[39m to perform command lookup.[0m
[0mThis may lead to issues on Windows when passing objects to [33menv[39m option that[0m
[0mhave multiple variants of [33mPATH[39m variable.[0m

[0mThe [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m method spawns the child process asynchronously,[0m
[0mwithout blocking the Node.js event loop. The [34m[33mchild_process.spawnSync()[39m[34m ([34m[4m#child_process_child_process_spawnsync_command_args_options[24m[39m[34m)[39m[0m
[0mfunction provides equivalent functionality in a synchronous manner that blocks[0m
[0mthe event loop until the spawned process either exits or is terminated.[0m

[0mFor convenience, the [33mchild_process[39m module provides a handful of synchronous[0m
[0mand asynchronous alternatives to [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m and[0m
[0m[34m[33mchild_process.spawnSync()[39m[34m ([34m[4m#child_process_child_process_spawnsync_command_args_options[24m[39m[34m)[39m. Each of these alternatives are implemented on[0m
[0mtop of [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m or [34m[33mchild_process.spawnSync()[39m[34m ([34m[4m#child_process_child_process_spawnsync_command_args_options[24m[39m[34m)[39m.[0m

    * [0m[34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m: spawns a shell and runs a command within that[0m
      [0mshell, passing the [33mstdout[39m and [33mstderr[39m to a callback function when[0m
      [0mcomplete.[0m
    * [0m[34m[33mchild_process.execFile()[39m[34m ([34m[4m#child_process_child_process_execfile_file_args_options_callback[24m[39m[34m)[39m: similar to [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m except[0m
      [0mthat it spawns the command directly without first spawning a shell by[0m
      [0mdefault.[0m
    * [0m[34m[33mchild_process.fork()[39m[34m ([34m[4m#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m: spawns a new Node.js process and invokes a[0m
      [0mspecified module with an IPC communication channel established that allows[0m
      [0msending messages between parent and child.[0m
    * [0m[34m[33mchild_process.execSync()[39m[34m ([34m[4m#child_process_child_process_execsync_command_options[24m[39m[34m)[39m: a synchronous version of[0m
      [0m[34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m that will block the Node.js event loop.[0m
    * [0m[34m[33mchild_process.execFileSync()[39m[34m ([34m[4m#child_process_child_process_execfilesync_file_args_options[24m[39m[34m)[39m: a synchronous version of[0m
      [0m[34m[33mchild_process.execFile()[39m[34m ([34m[4m#child_process_child_process_execfile_file_args_options_callback[24m[39m[34m)[39m that will block the Node.js event loop.[0m

[0mFor certain use cases, such as automating shell scripts, the[0m
[0m[34msynchronous counterparts ([34m[4m#child_process_synchronous_process_creation[24m[39m[34m)[39m may be more convenient. In many cases, however,[0m
[0mthe synchronous methods can have significant impact on performance due to[0m
[0mstalling the event loop while spawned processes complete.[0m

[32m[1m## Asynchronous Process Creation[22m[39m

[0mThe [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m, [34m[33mchild_process.fork()[39m[34m ([34m[4m#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m, [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m,[0m
[0mand [34m[33mchild_process.execFile()[39m[34m ([34m[4m#child_process_child_process_execfile_file_args_options_callback[24m[39m[34m)[39m methods all follow the idiomatic asynchronous[0m
[0mprogramming pattern typical of other Node.js APIs.[0m

[0mEach of the methods returns a [34m[33mChildProcess[39m[34m ([34m[4m#child_process_child_process[24m[39m[34m)[39m instance. These objects[0m
[0mimplement the Node.js [34m[33mEventEmitter[39m[34m ([34m[4mevents.html#events_class_eventemitter[24m[39m[34m)[39m API, allowing the parent process to[0m
[0mregister listener functions that are called when certain events occur during[0m
[0mthe life cycle of the child process.[0m

[0mThe [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m and [34m[33mchild_process.execFile()[39m[34m ([34m[4m#child_process_child_process_execfile_file_args_options_callback[24m[39m[34m)[39m methods[0m
[0madditionally allow for an optional [33mcallback[39m function to be specified that is[0m
[0minvoked when the child process terminates.[0m

[32m[1m### Spawning [33m.bat[39m[32m and [33m.cmd[39m[32m files on Windows[22m[39m

[0mThe importance of the distinction between [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m and[0m
[0m[34m[33mchild_process.execFile()[39m[34m ([34m[4m#child_process_child_process_execfile_file_args_options_callback[24m[39m[34m)[39m can vary based on platform. On Unix-type[0m
[0moperating systems (Unix, Linux, macOS) [34m[33mchild_process.execFile()[39m[34m ([34m[4m#child_process_child_process_execfile_file_args_options_callback[24m[39m[34m)[39m can be[0m
[0mmore efficient because it does not spawn a shell by default. On Windows,[0m
[0mhowever, [33m.bat[39m and [33m.cmd[39m files are not executable on their own without a[0m
[0mterminal, and therefore cannot be launched using [34m[33mchild_process.execFile()[39m[34m ([34m[4m#child_process_child_process_execfile_file_args_options_callback[24m[39m[34m)[39m.[0m
[0mWhen running on Windows, [33m.bat[39m and [33m.cmd[39m files can be invoked using[0m
[0m[34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m with the [33mshell[39m option set, with[0m
[0m[34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m, or by spawning [33mcmd.exe[39m and passing the [33m.bat[39m or[0m
[0m[33m.cmd[39m file as an argument (which is what the [33mshell[39m option and[0m
[0m[34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m do). In any case, if the script filename contains[0m
[0mspaces it needs to be quoted.[0m

    [90m// On Windows Only...[39m
    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mbat[39m [93m=[39m [37mspawn[39m[90m([39m[92m'cmd.exe'[39m[32m,[39m [33m[[39m[92m'/c'[39m[32m,[39m [92m'my.bat'[39m[33m][39m[90m)[39m[90m;[39m
    
    [37mbat[39m[32m.[39m[37mstdout[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdata[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mbat[39m[32m.[39m[37mstderr[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37mdata[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mbat[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Child exited with code ${[37mcode[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

    [90m// OR...[39m
    [94mconst[39m [33m{[39m [37mexec[39m[32m,[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [37mexec[39m[90m([39m[92m'my.bat'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mstdout[39m[32m,[39m [37mstderr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mstdout[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Script with spaces in the filename:[39m
    [94mconst[39m [37mbat[39m [93m=[39m [37mspawn[39m[90m([39m[92m'"my script.cmd"'[39m[32m,[39m [33m[[39m[92m'a'[39m[32m,[39m [92m'b'[39m[33m][39m[32m,[39m [33m{[39m [37mshell[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// or:[39m
    [37mexec[39m[90m([39m[92m'"my script.cmd" a b'[39m[32m,[39m [90m([39m[37merr[39m[32m,[39m [37mstdout[39m[32m,[39m [37mstderr[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mchild_process.exec(command[, options][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90mchanges:[39m
[90m  - version: v8.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15380[39m
[90m    description: The `windowsHide` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcommand[39m {string} The command to run, with space-separated arguments.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mcwd[39m {string} Current working directory of the child process.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mnull[39m.[0m[0m[0m
      [0m
        * [0m[0m[33menv[39m {Object} Environment key-value pairs. [1mDefault:[22m [33mprocess.env[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mshell[39m {string} Shell to execute the command with. See[0m[0m[0m
      [0m      [0m[0m[34mShell Requirements ([34m[4m#child_process_shell_requirements[24m[39m[34m)[39m and [34mDefault Windows Shell ([34m[4m#child_process_default_windows_shell[24m[39m[34m)[39m. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m'/bin/sh'[39m on Unix, [33mprocess.env.ComSpec[39m on Windows.[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {number} [1mDefault:[22m [33m0[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmaxBuffer[39m {number} Largest amount of data in bytes allowed on stdout or[0m[0m[0m
      [0m      [0m[0mstderr. If exceeded, the child process is terminated and any output is[0m[0m[0m
      [0m      [0m[0mtruncated. See caveat at [34m[33mmaxBuffer[39m[34m and Unicode ([34m[4m#child_process_maxbuffer_and_unicode[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m1024 * 1024[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mkillSignal[39m {string|integer} [1mDefault:[22m [33m'SIGTERM'[39m[0m[0m[0m
      [0m
        * [0m[0m[33muid[39m {number} Sets the user identity of the process (see setuid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mgid[39m {number} Sets the group identity of the process (see setgid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsHide[39m {boolean} Hide the subprocess console window that would[0m[0m[0m
      [0m      [0m[0mnormally be created on Windows systems. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function} called with the output when process terminates.
        * [0m[0m[33merror[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mstdout[39m {string|Buffer}[0m[0m[0m
      [0m
        * [0m[0m[33mstderr[39m {string|Buffer}[0m[0m[0m
    * [0mReturns: {ChildProcess}[0m

[0mSpawns a shell then executes the [33mcommand[39m within that shell, buffering any[0m
[0mgenerated output. The [33mcommand[39m string passed to the exec function is processed[0m
[0mdirectly by the shell and special characters (vary based on[0m
[0m[34mshell ([34m[4mhttps://en.wikipedia.org/wiki/List_of_command-line_interpreters[24m[39m[34m)[39m)[0m
[0mneed to be dealt with accordingly:[0m

    [37mexec[39m[90m([39m[92m'"/path/to/test file/test.sh" arg1 arg2'[39m[90m)[39m[90m;[39m
    [90m// Double quotes are used so that the space in the path is not interpreted as[39m
    [90m// a delimiter of multiple arguments.[39m
    
    [37mexec[39m[90m([39m[92m'echo "The \\$HOME variable is $HOME"'[39m[90m)[39m[90m;[39m
    [90m// The $HOME variable is escaped in the first instance, but not in the second.[39m

[0m[1mNever pass unsanitized user input to this function. Any input containing shell[22m[0m
[0m[1mmetacharacters may be used to trigger arbitrary command execution.[22m[0m

[0mIf a [33mcallback[39m function is provided, it is called with the arguments[0m
[0m[33m(error, stdout, stderr)[39m. On success, [33merror[39m will be [33mnull[39m. On error,[0m
[0m[33merror[39m will be an instance of [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m. The [33merror.code[39m property will be[0m
[0mthe exit code of the child process while [33merror.signal[39m will be set to the[0m
[0msignal that terminated the process. Any exit code other than [33m0[39m is considered[0m
[0mto be an error.[0m

[0mThe [33mstdout[39m and [33mstderr[39m arguments passed to the callback will contain the[0m
[0mstdout and stderr output of the child process. By default, Node.js will decode[0m
[0mthe output as UTF-8 and pass strings to the callback. The [33mencoding[39m option[0m
[0mcan be used to specify the character encoding used to decode the stdout and[0m
[0mstderr output. If [33mencoding[39m is [33m'buffer'[39m, or an unrecognized character[0m
[0mencoding, [33mBuffer[39m objects will be passed to the callback instead.[0m

    [94mconst[39m [33m{[39m [37mexec[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [37mexec[39m[90m([39m[92m'cat *.js missing_file | wc -l'[39m[32m,[39m [90m([39m[91merror[39m[32m,[39m [37mstdout[39m[32m,[39m [37mstderr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[91merror[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`exec error: ${[91merror[39m}`[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`stdout: ${[37mstdout[39m}`[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`stderr: ${[37mstderr[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mIf [33mtimeout[39m is greater than [33m0[39m, the parent will send the signal[0m
[0midentified by the [33mkillSignal[39m property (the default is [33m'SIGTERM'[39m) if the[0m
[0mchild runs longer than [33mtimeout[39m milliseconds.[0m

[0mUnlike the exec(3) POSIX system call, [33mchild_process.exec()[39m does not replace[0m
[0mthe existing process and uses a shell to execute the command.[0m

[0mIf this method is invoked as its [34m[33mutil.promisify()[39m[34m ([34m[4mutil.html#util_util_promisify_original[24m[39m[34m)[39med version, it returns[0m
[0ma [33mPromise[39m for an [33mObject[39m with [33mstdout[39m and [33mstderr[39m properties. The returned[0m
[0m[33mChildProcess[39m instance is attached to the [33mPromise[39m as a [33mchild[39m property. In[0m
[0mcase of an error (including any error resulting in an exit code other than 0), a[0m
[0mrejected promise is returned, with the same [33merror[39m object given in the[0m
[0mcallback, but with two additional properties [33mstdout[39m and [33mstderr[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mexec[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[32m.[39m[37mexec[39m[90m)[39m[90m;[39m
    
    [37masync[39m [94mfunction[39m [37mlsExample[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [33m{[39m [37mstdout[39m[32m,[39m [37mstderr[39m [33m}[39m [93m=[39m [37mawait[39m [37mexec[39m[90m([39m[92m'ls'[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'stdout:'[39m[32m,[39m [37mstdout[39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'stderr:'[39m[32m,[39m [37mstderr[39m[90m)[39m[90m;[39m
    [33m}[39m
    [37mlsExample[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33mchild_process.execFile(file[, args][, options][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.91[39m
[90mchanges:[39m
[90m  - version: v8.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15380[39m
[90m    description: The `windowsHide` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfile[39m {string} The name or path of the executable file to run.[0m
    * [0m[33margs[39m {string[]} List of string arguments.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mcwd[39m {string} Current working directory of the child process.[0m[0m[0m
      [0m
        * [0m[0m[33menv[39m {Object} Environment key-value pairs. [1mDefault:[22m [33mprocess.env[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mencoding[39m {string} [1mDefault:[22m [33m'utf8'[39m[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {number} [1mDefault:[22m [33m0[39m[0m[0m[0m
      [0m
        * [0m[0m[33mmaxBuffer[39m {number} Largest amount of data in bytes allowed on stdout or[0m[0m[0m
      [0m      [0m[0mstderr. If exceeded, the child process is terminated and any output is[0m[0m[0m
      [0m      [0m[0mtruncated. See caveat at [34m[33mmaxBuffer[39m[34m and Unicode ([34m[4m#child_process_maxbuffer_and_unicode[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m1024 * 1024[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mkillSignal[39m {string|integer} [1mDefault:[22m [33m'SIGTERM'[39m[0m[0m[0m
      [0m
        * [0m[0m[33muid[39m {number} Sets the user identity of the process (see setuid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mgid[39m {number} Sets the group identity of the process (see setgid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsHide[39m {boolean} Hide the subprocess console window that would[0m[0m[0m
      [0m      [0m[0mnormally be created on Windows systems. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsVerbatimArguments[39m {boolean} No quoting or escaping of arguments is[0m[0m[0m
      [0m      [0m[0mdone on Windows. Ignored on Unix. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mshell[39m {boolean|string} If [33mtrue[39m, runs [33mcommand[39m inside of a shell. Uses[0m[0m[0m
      [0m      [0m[0m[33m'/bin/sh'[39m on Unix, and [33mprocess.env.ComSpec[39m on Windows. A different[0m[0m[0m
      [0m      [0m[0mshell can be specified as a string. See [34mShell Requirements ([34m[4m#child_process_shell_requirements[24m[39m[34m)[39m and[0m[0m[0m
      [0m      [0m[0m[34mDefault Windows Shell ([34m[4m#child_process_default_windows_shell[24m[39m[34m)[39m. [1mDefault:[22m [33mfalse[39m (no shell).[0m[0m[0m
    * [0m[33mcallback[39m {Function} Called with the output when process terminates.
        * [0m[0m[33merror[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33mstdout[39m {string|Buffer}[0m[0m[0m
      [0m
        * [0m[0m[33mstderr[39m {string|Buffer}[0m[0m[0m
    * [0mReturns: {ChildProcess}[0m

[0mThe [33mchild_process.execFile()[39m function is similar to [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m[0m
[0mexcept that it does not spawn a shell by default. Rather, the specified[0m
[0mexecutable [33mfile[39m is spawned directly as a new process making it slightly more[0m
[0mefficient than [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m.[0m

[0mThe same options as [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m are supported. Since a shell is[0m
[0mnot spawned, behaviors such as I/O redirection and file globbing are not[0m
[0msupported.[0m

    [94mconst[39m [33m{[39m [37mexecFile[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mchild[39m [93m=[39m [37mexecFile[39m[90m([39m[92m'node'[39m[32m,[39m [33m[[39m[92m'--version'[39m[33m][39m[32m,[39m [90m([39m[91merror[39m[32m,[39m [37mstdout[39m[32m,[39m [37mstderr[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[91merror[39m[90m)[39m [33m{[39m
        [94mthrow[39m [91merror[39m[90m;[39m
      [33m}[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mstdout[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe [33mstdout[39m and [33mstderr[39m arguments passed to the callback will contain the[0m
[0mstdout and stderr output of the child process. By default, Node.js will decode[0m
[0mthe output as UTF-8 and pass strings to the callback. The [33mencoding[39m option[0m
[0mcan be used to specify the character encoding used to decode the stdout and[0m
[0mstderr output. If [33mencoding[39m is [33m'buffer'[39m, or an unrecognized character[0m
[0mencoding, [33mBuffer[39m objects will be passed to the callback instead.[0m

[0mIf this method is invoked as its [34m[33mutil.promisify()[39m[34m ([34m[4mutil.html#util_util_promisify_original[24m[39m[34m)[39med version, it returns[0m
[0ma [33mPromise[39m for an [33mObject[39m with [33mstdout[39m and [33mstderr[39m properties. The returned[0m
[0m[33mChildProcess[39m instance is attached to the [33mPromise[39m as a [33mchild[39m property. In[0m
[0mcase of an error (including any error resulting in an exit code other than 0), a[0m
[0mrejected promise is returned, with the same [33merror[39m object given in the[0m
[0mcallback, but with two additional properties [33mstdout[39m and [33mstderr[39m.[0m

    [94mconst[39m [37mutil[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/util'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mexecFile[39m [93m=[39m [37mutil[39m[32m.[39m[37mpromisify[39m[90m([39m[37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[32m.[39m[37mexecFile[39m[90m)[39m[90m;[39m
    [37masync[39m [94mfunction[39m [37mgetVersion[39m[90m([39m[90m)[39m [33m{[39m
      [94mconst[39m [33m{[39m [37mstdout[39m [33m}[39m [93m=[39m [37mawait[39m [37mexecFile[39m[90m([39m[92m'node'[39m[32m,[39m [33m[[39m[92m'--version'[39m[33m][39m[90m)[39m[90m;[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mstdout[39m[90m)[39m[90m;[39m
    [33m}[39m
    [37mgetVersion[39m[90m([39m[90m)[39m[90m;[39m

[0m[1mIf the [33mshell[39m option is enabled, do not pass unsanitized user input to this[22m[0m
[0m[1mfunction. Any input containing shell metacharacters may be used to trigger[22m[0m
[0m[1marbitrary command execution.[22m[0m

[32m[1m### [33mchild_process.fork(modulePath[, args][, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.0[39m
[90mchanges:[39m
[90m  - version: v13.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30162[39m
[90m    description: The `serialization` option is supported now.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10866[39m
[90m    description: The `stdio` option can now be a string.[39m
[90m  - version: v6.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7811[39m
[90m    description: The `stdio` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmodulePath[39m {string} The module to run in the child.[0m
    * [0m[33margs[39m {string[]} List of string arguments.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mcwd[39m {string} Current working directory of the child process.[0m[0m[0m
      [0m
        * [0m[0m[33mdetached[39m {boolean} Prepare child to run independently of its parent[0m[0m[0m
      [0m      [0m[0mprocess. Specific behavior depends on the platform, see[0m[0m[0m
      [0m      [0m[0m[34m[33moptions.detached[39m[34m ([34m[4m#child_process_options_detached[24m[39m[34m)[39m).[0m[0m[0m
      [0m
        * [0m[0m[33menv[39m {Object} Environment key-value pairs.  [1mDefault:[22m [33mprocess.env[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mexecPath[39m {string} Executable used to create the child process.[0m[0m[0m
      [0m
        * [0m[0m[33mexecArgv[39m {string[]} List of string arguments passed to the executable.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mprocess.execArgv[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mserialization[39m {string} Specify the kind of serialization used for sending[0m[0m[0m
      [0m      [0m[0mmessages between processes. Possible values are [33m'json'[39m and [33m'advanced'[39m.[0m[0m[0m
      [0m      [0m[0mSee [34mAdvanced Serialization ([34m[4m#child_process_advanced_serialization[24m[39m[34m)[39m for more details. [1mDefault:[22m [33m'json'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msilent[39m {boolean} If [33mtrue[39m, stdin, stdout, and stderr of the child will be[0m[0m[0m
      [0m      [0m[0mpiped to the parent, otherwise they will be inherited from the parent, see[0m[0m[0m
      [0m      [0m[0mthe [33m'pipe'[39m and [33m'inherit'[39m options for [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m's[0m[0m[0m
      [0m      [0m[0m[34m[33mstdio[39m[34m ([34m[4m#child_process_options_stdio[24m[39m[34m)[39m for more details. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mstdio[39m {Array|string} See [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m's [34m[33mstdio[39m[34m ([34m[4m#child_process_options_stdio[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0mWhen this option is provided, it overrides [33msilent[39m. If the array variant[0m[0m[0m
      [0m      [0m[0mis used, it must contain exactly one item with value [33m'ipc'[39m or an error[0m[0m[0m
      [0m      [0m[0mwill be thrown. For instance [33m[0, 1, 2, 'ipc'][39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsVerbatimArguments[39m {boolean} No quoting or escaping of arguments is[0m[0m[0m
      [0m      [0m[0mdone on Windows. Ignored on Unix. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33muid[39m {number} Sets the user identity of the process (see setuid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mgid[39m {number} Sets the group identity of the process (see setgid(2)).[0m[0m[0m
    * [0mReturns: {ChildProcess}[0m

[0mThe [33mchild_process.fork()[39m method is a special case of[0m
[0m[34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m used specifically to spawn new Node.js processes.[0m
[0mLike [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m, a [34m[33mChildProcess[39m[34m ([34m[4m#child_process_child_process[24m[39m[34m)[39m object is returned. The[0m
[0mreturned [34m[33mChildProcess[39m[34m ([34m[4m#child_process_child_process[24m[39m[34m)[39m will have an additional communication channel[0m
[0mbuilt-in that allows messages to be passed back and forth between the parent and[0m
[0mchild. See [34m[33msubprocess.send()[39m[34m ([34m[4m#child_process_subprocess_send_message_sendhandle_options_callback[24m[39m[34m)[39m for details.[0m

[0mKeep in mind that spawned Node.js child processes are[0m
[0mindependent of the parent with exception of the IPC communication channel[0m
[0mthat is established between the two. Each process has its own memory, with[0m
[0mtheir own V8 instances. Because of the additional resource allocations[0m
[0mrequired, spawning a large number of child Node.js processes is not[0m
[0mrecommended.[0m

[0mBy default, [33mchild_process.fork()[39m will spawn new Node.js instances using the[0m
[0m[34m[33mprocess.execPath[39m[34m ([34m[4mprocess.html#process_process_execpath[24m[39m[34m)[39m of the parent process. The [33mexecPath[39m property in the[0m
[0m[33moptions[39m object allows for an alternative execution path to be used.[0m

[0mNode.js processes launched with a custom [33mexecPath[39m will communicate with the[0m
[0mparent process using the file descriptor (fd) identified using the[0m
[0menvironment variable [33mNODE_CHANNEL_FD[39m on the child process.[0m

[0mUnlike the fork(2) POSIX system call, [33mchild_process.fork()[39m does not clone the[0m
[0mcurrent process.[0m

[0mThe [33mshell[39m option available in [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m is not supported by[0m
[0m[33mchild_process.fork()[39m and will be ignored if set.[0m

[32m[1m### [33mchild_process.spawn(command[, args][, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90mchanges:[39m
[90m  - version: v13.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30162[39m
[90m    description: The `serialization` option is supported now.[39m
[90m  - version: v8.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15380[39m
[90m    description: The `windowsHide` option is supported now.[39m
[90m  - version: v6.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/7696[39m
[90m    description: The `argv0` option is supported now.[39m
[90m  - version: v5.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4598[39m
[90m    description: The `shell` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcommand[39m {string} The command to run.[0m
    * [0m[33margs[39m {string[]} List of string arguments.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mcwd[39m {string} Current working directory of the child process.[0m[0m[0m
      [0m
        * [0m[0m[33menv[39m {Object} Environment key-value pairs. [1mDefault:[22m [33mprocess.env[39m.[0m[0m[0m
      [0m
        * [0m[0m[33margv0[39m {string} Explicitly set the value of [33margv[0][39m sent to the child[0m[0m[0m
      [0m      [0m[0mprocess. This will be set to [33mcommand[39m if not specified.[0m[0m[0m
      [0m
        * [0m[0m[33mstdio[39m {Array|string} Child's stdio configuration (see[0m[0m[0m
      [0m      [0m[0m[34m[33moptions.stdio[39m[34m ([34m[4m#child_process_options_stdio[24m[39m[34m)[39m).[0m[0m[0m
      [0m
        * [0m[0m[33mdetached[39m {boolean} Prepare child to run independently of its parent[0m[0m[0m
      [0m      [0m[0mprocess. Specific behavior depends on the platform, see[0m[0m[0m
      [0m      [0m[0m[34m[33moptions.detached[39m[34m ([34m[4m#child_process_options_detached[24m[39m[34m)[39m).[0m[0m[0m
      [0m
        * [0m[0m[33muid[39m {number} Sets the user identity of the process (see setuid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mgid[39m {number} Sets the group identity of the process (see setgid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mserialization[39m {string} Specify the kind of serialization used for sending[0m[0m[0m
      [0m      [0m[0mmessages between processes. Possible values are [33m'json'[39m and [33m'advanced'[39m.[0m[0m[0m
      [0m      [0m[0mSee [34mAdvanced Serialization ([34m[4m#child_process_advanced_serialization[24m[39m[34m)[39m for more details. [1mDefault:[22m [33m'json'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mshell[39m {boolean|string} If [33mtrue[39m, runs [33mcommand[39m inside of a shell. Uses[0m[0m[0m
      [0m      [0m[0m[33m'/bin/sh'[39m on Unix, and [33mprocess.env.ComSpec[39m on Windows. A different[0m[0m[0m
      [0m      [0m[0mshell can be specified as a string. See [34mShell Requirements ([34m[4m#child_process_shell_requirements[24m[39m[34m)[39m and[0m[0m[0m
      [0m      [0m[0m[34mDefault Windows Shell ([34m[4m#child_process_default_windows_shell[24m[39m[34m)[39m. [1mDefault:[22m [33mfalse[39m (no shell).[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsVerbatimArguments[39m {boolean} No quoting or escaping of arguments is[0m[0m[0m
      [0m      [0m[0mdone on Windows. Ignored on Unix. This is set to [33mtrue[39m automatically[0m[0m[0m
      [0m      [0m[0mwhen [33mshell[39m is specified and is CMD. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsHide[39m {boolean} Hide the subprocess console window that would[0m[0m[0m
      [0m      [0m[0mnormally be created on Windows systems. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {ChildProcess}[0m

[0mThe [33mchild_process.spawn()[39m method spawns a new process using the given[0m
[0m[33mcommand[39m, with command line arguments in [33margs[39m. If omitted, [33margs[39m defaults[0m
[0mto an empty array.[0m

[0m[1mIf the [33mshell[39m option is enabled, do not pass unsanitized user input to this[22m[0m
[0m[1mfunction. Any input containing shell metacharacters may be used to trigger[22m[0m
[0m[1marbitrary command execution.[22m[0m

[0mA third argument may be used to specify additional options, with these defaults:[0m

    [94mconst[39m [37mdefaults[39m [93m=[39m [33m{[39m
      [37mcwd[39m[93m:[39m [90mundefined[39m[32m,[39m
      [37menv[39m[93m:[39m [37mprocess[39m[32m.[39m[37menv[39m
    [33m}[39m[90m;[39m

[0mUse [33mcwd[39m to specify the working directory from which the process is spawned.[0m
[0mIf not given, the default is to inherit the current working directory.[0m

[0mUse [33menv[39m to specify environment variables that will be visible to the new[0m
[0mprocess, the default is [34m[33mprocess.env[39m[34m ([34m[4mprocess.html#process_process_env[24m[39m[34m)[39m.[0m

[0m[33mundefined[39m values in [33menv[39m will be ignored.[0m

[0mExample of running [33mls -lh /usr[39m, capturing [33mstdout[39m, [33mstderr[39m, and the[0m
[0mexit code:[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mls[39m [93m=[39m [37mspawn[39m[90m([39m[92m'ls'[39m[32m,[39m [33m[[39m[92m'-lh'[39m[32m,[39m [92m'/usr'[39m[33m][39m[90m)[39m[90m;[39m
    
    [37mls[39m[32m.[39m[37mstdout[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`stdout: ${[37mdata[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mls[39m[32m.[39m[37mstderr[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`stderr: ${[37mdata[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mls[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`child process exited with code ${[37mcode[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mExample: A very elaborate way to run [33mps ax | grep ssh[39m[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mps[39m [93m=[39m [37mspawn[39m[90m([39m[92m'ps'[39m[32m,[39m [33m[[39m[92m'ax'[39m[33m][39m[90m)[39m[90m;[39m
    [94mconst[39m [37mgrep[39m [93m=[39m [37mspawn[39m[90m([39m[92m'grep'[39m[32m,[39m [33m[[39m[92m'ssh'[39m[33m][39m[90m)[39m[90m;[39m
    
    [37mps[39m[32m.[39m[37mstdout[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mgrep[39m[32m.[39m[37mstdin[39m[32m.[39m[37mwrite[39m[90m([39m[37mdata[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mps[39m[32m.[39m[37mstderr[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`ps stderr: ${[37mdata[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mps[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mcode[39m [93m!==[39m [34m0[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`ps process exited with code ${[37mcode[39m}`[90m)[39m[90m;[39m
      [33m}[39m
      [37mgrep[39m[32m.[39m[37mstdin[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mgrep[39m[32m.[39m[37mstdout[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdata[39m[32m.[39m[37mtoString[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mgrep[39m[32m.[39m[37mstderr[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m`grep stderr: ${[37mdata[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mgrep[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mcode[39m [93m!==[39m [34m0[39m[90m)[39m [33m{[39m
        [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`grep process exited with code ${[37mcode[39m}`[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mExample of checking for failed [33mspawn[39m:[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37msubprocess[39m [93m=[39m [37mspawn[39m[90m([39m[92m'bad_command'[39m[90m)[39m[90m;[39m
    
    [37msubprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'error'[39m[32m,[39m [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[91merror[39m[90m([39m[92m'Failed to start subprocess.'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mCertain platforms (macOS, Linux) will use the value of [33margv[0][39m for the process[0m
[0mtitle while others (Windows, SunOS) will use [33mcommand[39m.[0m

[0mNode.js currently overwrites [33margv[0][39m with [33mprocess.execPath[39m on startup, so[0m
[0m[33mprocess.argv[0][39m in a Node.js child process will not match the [33margv0[39m[0m
[0mparameter passed to [33mspawn[39m from the parent, retrieve it with the[0m
[0m[33mprocess.argv0[39m property instead.[0m

[32m[1m#### [33moptions.detached[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.10[39m
[90m-->[39m
[90m[39m
[90m[39m[0mOn Windows, setting [33moptions.detached[39m to [33mtrue[39m makes it possible for the[0m
[0mchild process to continue running after the parent exits. The child will have[0m
[0mits own console window. Once enabled for a child process, it cannot be[0m
[0mdisabled.[0m

[0mOn non-Windows platforms, if [33moptions.detached[39m is set to [33mtrue[39m, the child[0m
[0mprocess will be made the leader of a new process group and session. Child[0m
[0mprocesses may continue running after the parent exits regardless of whether[0m
[0mthey are detached or not. See setsid(2) for more information.[0m

[0mBy default, the parent will wait for the detached child to exit. To prevent the[0m
[0mparent from waiting for a given [33msubprocess[39m to exit, use the[0m
[0m[33msubprocess.unref()[39m method. Doing so will cause the parent's event loop to not[0m
[0minclude the child in its reference count, allowing the parent to exit[0m
[0mindependently of the child, unless there is an established IPC channel between[0m
[0mthe child and the parent.[0m

[0mWhen using the [33mdetached[39m option to start a long-running process, the process[0m
[0mwill not stay running in the background after the parent exits unless it is[0m
[0mprovided with a [33mstdio[39m configuration that is not connected to the parent.[0m
[0mIf the parent's [33mstdio[39m is inherited, the child will remain attached to the[0m
[0mcontrolling terminal.[0m

[0mExample of a long-running process, by detaching and also ignoring its parent[0m
[0m[33mstdio[39m file descriptors, in order to ignore the parent's termination:[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37msubprocess[39m [93m=[39m [37mspawn[39m[90m([39m[37mprocess[39m[32m.[39m[37margv[39m[33m[[39m[34m0[39m[33m][39m[32m,[39m [33m[[39m[92m'child_program.js'[39m[33m][39m[32m,[39m [33m{[39m
      [37mdetached[39m[93m:[39m [91mtrue[39m[32m,[39m
      [37mstdio[39m[93m:[39m [92m'ignore'[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37msubprocess[39m[32m.[39m[37munref[39m[90m([39m[90m)[39m[90m;[39m

[0mAlternatively one can redirect the child process' output into files:[0m

    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mout[39m [93m=[39m [37mfs[39m[32m.[39m[37mopenSync[39m[90m([39m[92m'./out.log'[39m[32m,[39m [92m'a'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37merr[39m [93m=[39m [37mfs[39m[32m.[39m[37mopenSync[39m[90m([39m[92m'./out.log'[39m[32m,[39m [92m'a'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37msubprocess[39m [93m=[39m [37mspawn[39m[90m([39m[92m'prg'[39m[32m,[39m [33m[[39m[33m][39m[32m,[39m [33m{[39m
      [37mdetached[39m[93m:[39m [91mtrue[39m[32m,[39m
      [37mstdio[39m[93m:[39m [33m[[39m [92m'ignore'[39m[32m,[39m [37mout[39m[32m,[39m [37merr[39m [33m][39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37msubprocess[39m[32m.[39m[37munref[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m#### [33moptions.stdio[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.10[39m
[90mchanges:[39m
[90m  - version: v3.3.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2727[39m
[90m    description: The value `0` is now accepted as a file descriptor.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33moptions.stdio[39m option is used to configure the pipes that are established[0m
[0mbetween the parent and child process. By default, the child's stdin, stdout,[0m
[0mand stderr are redirected to corresponding [34m[33msubprocess.stdin[39m[34m ([34m[4m#child_process_subprocess_stdin[24m[39m[34m)[39m,[0m
[0m[34m[33msubprocess.stdout[39m[34m ([34m[4m#child_process_subprocess_stdout[24m[39m[34m)[39m, and [34m[33msubprocess.stderr[39m[34m ([34m[4m#child_process_subprocess_stderr[24m[39m[34m)[39m streams on the[0m
[0m[34m[33mChildProcess[39m[34m ([34m[4m#child_process_child_process[24m[39m[34m)[39m object. This is equivalent to setting the [33moptions.stdio[39m[0m
[0mequal to [33m['pipe', 'pipe', 'pipe'][39m.[0m

[0mFor convenience, [33moptions.stdio[39m may be one of the following strings:[0m

    * [0m[33m'pipe'[39m: equivalent to [33m['pipe', 'pipe', 'pipe'][39m (the default)[0m
    * [0m[33m'ignore'[39m: equivalent to [33m['ignore', 'ignore', 'ignore'][39m[0m
    * [0m[33m'inherit'[39m: equivalent to [33m['inherit', 'inherit', 'inherit'][39m or [33m[0, 1, 2][39m[0m

[0mOtherwise, the value of [33moptions.stdio[39m is an array where each index corresponds[0m
[0mto an fd in the child. The fds 0, 1, and 2 correspond to stdin, stdout,[0m
[0mand stderr, respectively. Additional fds can be specified to create additional[0m
[0mpipes between the parent and child. The value is one of the following:[0m

    1. [0m[0m[0m[33m'pipe'[39m: Create a pipe between the child process and the parent process.[0m[0m[0m
       [0m[0m[0mThe parent end of the pipe is exposed to the parent as a property on the[0m[0m[0m
       [0m[0m[0m[33mchild_process[39m object as [34m[33msubprocess.stdio[fd][39m[34m ([34m[4m#child_process_subprocess_stdio[24m[39m[34m)[39m. Pipes[0m[0m[0m
       [0m[0m[0mcreated for fds 0, 1, and 2 are also available as [34m[33msubprocess.stdin[39m[34m ([34m[4m#child_process_subprocess_stdin[24m[39m[34m)[39m,[0m[0m[0m
       [0m[0m[0m[34m[33msubprocess.stdout[39m[34m ([34m[4m#child_process_subprocess_stdout[24m[39m[34m)[39m and [34m[33msubprocess.stderr[39m[34m ([34m[4m#child_process_subprocess_stderr[24m[39m[34m)[39m, respectively.[0m[0m[0m
    2. [0m[0m[0m[33m'ipc'[39m: Create an IPC channel for passing messages/file descriptors[0m[0m[0m
       [0m[0m[0mbetween parent and child. A [34m[33mChildProcess[39m[34m ([34m[4m#child_process_child_process[24m[39m[34m)[39m may have at most one IPC[0m[0m[0m
       [0m[0m[0mstdio file descriptor. Setting this option enables the[0m[0m[0m
       [0m[0m[0m[34m[33msubprocess.send()[39m[34m ([34m[4m#child_process_subprocess_send_message_sendhandle_options_callback[24m[39m[34m)[39m method. If the child is a Node.js process, the[0m[0m[0m
       [0m[0m[0mpresence of an IPC channel will enable [34m[33mprocess.send()[39m[34m ([34m[4mprocess.html#process_process_send_message_sendhandle_options_callback[24m[39m[34m)[39m and[0m[0m[0m
       [0m[0m[0m[34m[33mprocess.disconnect()[39m[34m ([34m[4mprocess.html#process_process_disconnect[24m[39m[34m)[39m methods, as well as [34m[33m'disconnect'[39m[34m ([34m[4mprocess.html#process_event_disconnect[24m[39m[34m)[39m and[0m[0m[0m
       [0m[0m[0m[34m[33m'message'[39m[34m ([34m[4mprocess.html#process_event_message[24m[39m[34m)[39m events within the child.[0m[0m[0m
       [0m[0m
       [0m[0m[0mAccessing the IPC channel fd in any way other than [34m[33mprocess.send()[39m[34m ([34m[4mprocess.html#process_process_send_message_sendhandle_options_callback[24m[39m[34m)[39m[0m[0m[0m
       [0m[0m[0mor using the IPC channel with a child process that is not a Node.js instance[0m[0m[0m
       [0m[0m[0mis not supported.[0m[0m[0m
    3. [0m[0m[0m[33m'ignore'[39m: Instructs Node.js to ignore the fd in the child. While Node.js[0m[0m[0m
       [0m[0m[0mwill always open fds 0, 1, and 2 for the processes it spawns, setting the fd[0m[0m[0m
       [0m[0m[0mto [33m'ignore'[39m will cause Node.js to open [33m/dev/null[39m and attach it to the[0m[0m[0m
       [0m[0m[0mchild's fd.[0m[0m[0m
    4. [0m[0m[0m[33m'inherit'[39m: Pass through the corresponding stdio stream to/from the[0m[0m[0m
       [0m[0m[0mparent process. In the first three positions, this is equivalent to[0m[0m[0m
       [0m[0m[0m[33mprocess.stdin[39m, [33mprocess.stdout[39m, and [33mprocess.stderr[39m, respectively. In[0m[0m[0m
       [0m[0m[0many other position, equivalent to [33m'ignore'[39m.[0m[0m[0m
    5. [0m[0m[0m{Stream} object: Share a readable or writable stream that refers to a tty,[0m[0m[0m
       [0m[0m[0mfile, socket, or a pipe with the child process. The stream's underlying[0m[0m[0m
       [0m[0m[0mfile descriptor is duplicated in the child process to the fd that[0m[0m[0m
       [0m[0m[0mcorresponds to the index in the [33mstdio[39m array. The stream must have an[0m[0m[0m
       [0m[0m[0munderlying descriptor (file streams do not until the [33m'open'[39m event has[0m[0m[0m
       [0m[0m[0moccurred).[0m[0m[0m
    6. [0m[0m[0mPositive integer: The integer value is interpreted as a file descriptor[0m[0m[0m
       [0m[0m[0mthat is currently open in the parent process. It is shared with the child[0m[0m[0m
       [0m[0m[0mprocess, similar to how {Stream} objects can be shared. Passing sockets[0m[0m[0m
       [0m[0m[0mis not supported on Windows.[0m[0m[0m
    7. [0m[0m[0m[33mnull[39m, [33mundefined[39m: Use default value. For stdio fds 0, 1, and 2 (in other[0m[0m[0m
       [0m[0m[0mwords, stdin, stdout, and stderr) a pipe is created. For fd 3 and up, the[0m[0m[0m
       [0m[0m[0mdefault is [33m'ignore'[39m.[0m[0m[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    
    [90m// Child will use parent's stdios.[39m
    [37mspawn[39m[90m([39m[92m'prg'[39m[32m,[39m [33m[[39m[33m][39m[32m,[39m [33m{[39m [37mstdio[39m[93m:[39m [92m'inherit'[39m [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Spawn child sharing only stderr.[39m
    [37mspawn[39m[90m([39m[92m'prg'[39m[32m,[39m [33m[[39m[33m][39m[32m,[39m [33m{[39m [37mstdio[39m[93m:[39m [33m[[39m[92m'pipe'[39m[32m,[39m [92m'pipe'[39m[32m,[39m [37mprocess[39m[32m.[39m[37mstderr[39m[33m][39m [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Open an extra fd=4, to interact with programs presenting a[39m
    [90m// startd-style interface.[39m
    [37mspawn[39m[90m([39m[92m'prg'[39m[32m,[39m [33m[[39m[33m][39m[32m,[39m [33m{[39m [37mstdio[39m[93m:[39m [33m[[39m[92m'pipe'[39m[32m,[39m [90mnull[39m[32m,[39m [90mnull[39m[32m,[39m [90mnull[39m[32m,[39m [92m'pipe'[39m[33m][39m [33m}[39m[90m)[39m[90m;[39m

[0m[3mIt is worth noting that when an IPC channel is established between the[23m[0m
[0m[3mparent and child processes, and the child is a Node.js process, the child[23m[0m
[0m[3mis launched with the IPC channel unreferenced (using [33munref()[39m) until the[23m[0m
[0m[3mchild registers an event handler for the [34m[33m'disconnect'[39m[34m ([34m[4mprocess.html#process_event_disconnect[24m[39m[34m)[39m event[23m[0m
[0m[3mor the [34m[33m'message'[39m[34m ([34m[4mprocess.html#process_event_message[24m[39m[34m)[39m event. This allows the child to exit[23m[0m
[0m[3mnormally without the process being held open by the open IPC channel.[23m[0m

[0mOn Unix-like operating systems, the [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m method[0m
[0mperforms memory operations synchronously before decoupling the event loop[0m
[0mfrom the child. Applications with a large memory footprint may find frequent[0m
[0m[34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m calls to be a bottleneck. For more information,[0m
[0msee [34mV8 issue 7381 ([34m[4mhttps://bugs.chromium.org/p/v8/issues/detail?id=7381[24m[39m[34m)[39m.[0m

[0mSee also: [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m and [34m[33mchild_process.fork()[39m[34m ([34m[4m#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m.[0m

[32m[1m## Synchronous Process Creation[22m[39m

[0mThe [34m[33mchild_process.spawnSync()[39m[34m ([34m[4m#child_process_child_process_spawnsync_command_args_options[24m[39m[34m)[39m, [34m[33mchild_process.execSync()[39m[34m ([34m[4m#child_process_child_process_execsync_command_options[24m[39m[34m)[39m, and[0m
[0m[34m[33mchild_process.execFileSync()[39m[34m ([34m[4m#child_process_child_process_execfilesync_file_args_options[24m[39m[34m)[39m methods are synchronous and will block the[0m
[0mNode.js event loop, pausing execution of any additional code until the spawned[0m
[0mprocess exits.[0m

[0mBlocking calls like these are mostly useful for simplifying general-purpose[0m
[0mscripting tasks and for simplifying the loading/processing of application[0m
[0mconfiguration at startup.[0m

[32m[1m### [33mchild_process.execFileSync(file[, args][, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22409[39m
[90m    description: The `input` option can now be any `TypedArray` or a[39m
[90m                 `DataView`.[39m
[90m  - version: v8.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15380[39m
[90m    description: The `windowsHide` option is supported now.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10653[39m
[90m    description: The `input` option can now be a `Uint8Array`.[39m
[90m  - version: v6.2.1, v4.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6939[39m
[90m    description: The `encoding` option can now explicitly be set to `buffer`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfile[39m {string} The name or path of the executable file to run.[0m
    * [0m[33margs[39m {string[]} List of string arguments.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mcwd[39m {string} Current working directory of the child process.[0m[0m[0m
      [0m
        * [0m[0m[33minput[39m {string|Buffer|TypedArray|DataView} The value which will be passed[0m[0m[0m
      [0m      [0m[0mas stdin to the spawned process. Supplying this value will override[0m[0m[0m
      [0m      [0m[0m[33mstdio[0][39m.[0m[0m[0m
      [0m
        * [0m[0m[33mstdio[39m {string|Array} Child's stdio configuration. [33mstderr[39m by default will[0m[0m[0m
      [0m      [0m[0mbe output to the parent process' stderr unless [33mstdio[39m is specified.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'pipe'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33menv[39m {Object} Environment key-value pairs.  [1mDefault:[22m [33mprocess.env[39m.[0m[0m[0m
      [0m
        * [0m[0m[33muid[39m {number} Sets the user identity of the process (see setuid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mgid[39m {number} Sets the group identity of the process (see setgid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {number} In milliseconds the maximum amount of time the process[0m[0m[0m
      [0m      [0m[0mis allowed to run. [1mDefault:[22m [33mundefined[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mkillSignal[39m {string|integer} The signal value to be used when the spawned[0m[0m[0m
      [0m      [0m[0mprocess will be killed. [1mDefault:[22m [33m'SIGTERM'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxBuffer[39m {number} Largest amount of data in bytes allowed on stdout or[0m[0m[0m
      [0m      [0m[0mstderr. If exceeded, the child process is terminated. See caveat at[0m[0m[0m
      [0m      [0m[0m[34m[33mmaxBuffer[39m[34m and Unicode ([34m[4m#child_process_maxbuffer_and_unicode[24m[39m[34m)[39m. [1mDefault:[22m [33m1024 * 1024[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mencoding[39m {string} The encoding used for all stdio inputs and outputs.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'buffer'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsHide[39m {boolean} Hide the subprocess console window that would[0m[0m[0m
      [0m      [0m[0mnormally be created on Windows systems. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mshell[39m {boolean|string} If [33mtrue[39m, runs [33mcommand[39m inside of a shell. Uses[0m[0m[0m
      [0m      [0m[0m[33m'/bin/sh'[39m on Unix, and [33mprocess.env.ComSpec[39m on Windows. A different[0m[0m[0m
      [0m      [0m[0mshell can be specified as a string. See [34mShell Requirements ([34m[4m#child_process_shell_requirements[24m[39m[34m)[39m and[0m[0m[0m
      [0m      [0m[0m[34mDefault Windows Shell ([34m[4m#child_process_default_windows_shell[24m[39m[34m)[39m. [1mDefault:[22m [33mfalse[39m (no shell).[0m[0m[0m
    * [0mReturns: {Buffer|string} The stdout from the command.[0m

[0mThe [33mchild_process.execFileSync()[39m method is generally identical to[0m
[0m[34m[33mchild_process.execFile()[39m[34m ([34m[4m#child_process_child_process_execfile_file_args_options_callback[24m[39m[34m)[39m with the exception that the method will not[0m
[0mreturn until the child process has fully closed. When a timeout has been[0m
[0mencountered and [33mkillSignal[39m is sent, the method won't return until the process[0m
[0mhas completely exited.[0m

[0mIf the child process intercepts and handles the [33mSIGTERM[39m signal and[0m
[0mdoes not exit, the parent process will still wait until the child process has[0m
[0mexited.[0m

[0mIf the process times out or has a non-zero exit code, this method will throw an[0m
[0m[34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m that will include the full result of the underlying[0m
[0m[34m[33mchild_process.spawnSync()[39m[34m ([34m[4m#child_process_child_process_spawnsync_command_args_options[24m[39m[34m)[39m.[0m

[0m[1mIf the [33mshell[39m option is enabled, do not pass unsanitized user input to this[22m[0m
[0m[1mfunction. Any input containing shell metacharacters may be used to trigger[22m[0m
[0m[1marbitrary command execution.[22m[0m

[32m[1m### [33mchild_process.execSync(command[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22409[39m
[90m    description: The `input` option can now be any `TypedArray` or a[39m
[90m                 `DataView`.[39m
[90m  - version: v8.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15380[39m
[90m    description: The `windowsHide` option is supported now.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10653[39m
[90m    description: The `input` option can now be a `Uint8Array`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcommand[39m {string} The command to run.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mcwd[39m {string} Current working directory of the child process.[0m[0m[0m
      [0m
        * [0m[0m[33minput[39m {string|Buffer|TypedArray|DataView} The value which will be passed[0m[0m[0m
      [0m      [0m[0mas stdin to the spawned process. Supplying this value will override[0m[0m[0m
      [0m      [0m[0m[33mstdio[0][39m.[0m[0m[0m
      [0m
        * [0m[0m[33mstdio[39m {string|Array} Child's stdio configuration. [33mstderr[39m by default will[0m[0m[0m
      [0m      [0m[0mbe output to the parent process' stderr unless [33mstdio[39m is specified.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'pipe'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33menv[39m {Object} Environment key-value pairs. [1mDefault:[22m [33mprocess.env[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mshell[39m {string} Shell to execute the command with. See[0m[0m[0m
      [0m      [0m[0m[34mShell Requirements ([34m[4m#child_process_shell_requirements[24m[39m[34m)[39m and [34mDefault Windows Shell ([34m[4m#child_process_default_windows_shell[24m[39m[34m)[39m. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m'/bin/sh'[39m on Unix, [33mprocess.env.ComSpec[39m on Windows.[0m[0m[0m
      [0m
        * [0m[0m[33muid[39m {number} Sets the user identity of the process. (See setuid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mgid[39m {number} Sets the group identity of the process. (See setgid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {number} In milliseconds the maximum amount of time the process[0m[0m[0m
      [0m      [0m[0mis allowed to run. [1mDefault:[22m [33mundefined[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mkillSignal[39m {string|integer} The signal value to be used when the spawned[0m[0m[0m
      [0m      [0m[0mprocess will be killed. [1mDefault:[22m [33m'SIGTERM'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxBuffer[39m {number} Largest amount of data in bytes allowed on stdout or[0m[0m[0m
      [0m      [0m[0mstderr. If exceeded, the child process is terminated and any output is[0m[0m[0m
      [0m      [0m[0mtruncated. See caveat at [34m[33mmaxBuffer[39m[34m and Unicode ([34m[4m#child_process_maxbuffer_and_unicode[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m1024 * 1024[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mencoding[39m {string} The encoding used for all stdio inputs and outputs.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'buffer'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsHide[39m {boolean} Hide the subprocess console window that would[0m[0m[0m
      [0m      [0m[0mnormally be created on Windows systems. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {Buffer|string} The stdout from the command.[0m

[0mThe [33mchild_process.execSync()[39m method is generally identical to[0m
[0m[34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m with the exception that the method will not return[0m
[0muntil the child process has fully closed. When a timeout has been encountered[0m
[0mand [33mkillSignal[39m is sent, the method won't return until the process has[0m
[0mcompletely exited. If the child process intercepts and handles the [33mSIGTERM[39m[0m
[0msignal and doesn't exit, the parent process will wait until the child process[0m
[0mhas exited.[0m

[0mIf the process times out or has a non-zero exit code, this method will throw.[0m
[0mThe [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object will contain the entire result from[0m
[0m[34m[33mchild_process.spawnSync()[39m[34m ([34m[4m#child_process_child_process_spawnsync_command_args_options[24m[39m[34m)[39m.[0m

[0m[1mNever pass unsanitized user input to this function. Any input containing shell[22m[0m
[0m[1mmetacharacters may be used to trigger arbitrary command execution.[22m[0m

[32m[1m### [33mchild_process.spawnSync(command[, args][, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.12[39m
[90mchanges:[39m
[90m  - version: v10.10.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/22409[39m
[90m    description: The `input` option can now be any `TypedArray` or a[39m
[90m                 `DataView`.[39m
[90m  - version: v8.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15380[39m
[90m    description: The `windowsHide` option is supported now.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10653[39m
[90m    description: The `input` option can now be a `Uint8Array`.[39m
[90m  - version: v6.2.1, v4.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6939[39m
[90m    description: The `encoding` option can now explicitly be set to `buffer`.[39m
[90m  - version: v5.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4598[39m
[90m    description: The `shell` option is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcommand[39m {string} The command to run.[0m
    * [0m[33margs[39m {string[]} List of string arguments.[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33mcwd[39m {string} Current working directory of the child process.[0m[0m[0m
      [0m
        * [0m[0m[33minput[39m {string|Buffer|TypedArray|DataView} The value which will be passed[0m[0m[0m
      [0m      [0m[0mas stdin to the spawned process. Supplying this value will override[0m[0m[0m
      [0m      [0m[0m[33mstdio[0][39m.[0m[0m[0m
      [0m
        * [0m[0m[33margv0[39m {string} Explicitly set the value of [33margv[0][39m sent to the child[0m[0m[0m
      [0m      [0m[0mprocess. This will be set to [33mcommand[39m if not specified.[0m[0m[0m
      [0m
        * [0m[0m[33mstdio[39m {string|Array} Child's stdio configuration.[0m[0m[0m
      [0m
        * [0m[0m[33menv[39m {Object} Environment key-value pairs.  [1mDefault:[22m [33mprocess.env[39m.[0m[0m[0m
      [0m
        * [0m[0m[33muid[39m {number} Sets the user identity of the process (see setuid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mgid[39m {number} Sets the group identity of the process (see setgid(2)).[0m[0m[0m
      [0m
        * [0m[0m[33mtimeout[39m {number} In milliseconds the maximum amount of time the process[0m[0m[0m
      [0m      [0m[0mis allowed to run. [1mDefault:[22m [33mundefined[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mkillSignal[39m {string|integer} The signal value to be used when the spawned[0m[0m[0m
      [0m      [0m[0mprocess will be killed. [1mDefault:[22m [33m'SIGTERM'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxBuffer[39m {number} Largest amount of data in bytes allowed on stdout or[0m[0m[0m
      [0m      [0m[0mstderr. If exceeded, the child process is terminated and any output is[0m[0m[0m
      [0m      [0m[0mtruncated. See caveat at [34m[33mmaxBuffer[39m[34m and Unicode ([34m[4m#child_process_maxbuffer_and_unicode[24m[39m[34m)[39m.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m1024 * 1024[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mencoding[39m {string} The encoding used for all stdio inputs and outputs.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m'buffer'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mshell[39m {boolean|string} If [33mtrue[39m, runs [33mcommand[39m inside of a shell. Uses[0m[0m[0m
      [0m      [0m[0m[33m'/bin/sh'[39m on Unix, and [33mprocess.env.ComSpec[39m on Windows. A different[0m[0m[0m
      [0m      [0m[0mshell can be specified as a string. See [34mShell Requirements ([34m[4m#child_process_shell_requirements[24m[39m[34m)[39m and[0m[0m[0m
      [0m      [0m[0m[34mDefault Windows Shell ([34m[4m#child_process_default_windows_shell[24m[39m[34m)[39m. [1mDefault:[22m [33mfalse[39m (no shell).[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsVerbatimArguments[39m {boolean} No quoting or escaping of arguments is[0m[0m[0m
      [0m      [0m[0mdone on Windows. Ignored on Unix. This is set to [33mtrue[39m automatically[0m[0m[0m
      [0m      [0m[0mwhen [33mshell[39m is specified and is CMD. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mwindowsHide[39m {boolean} Hide the subprocess console window that would[0m[0m[0m
      [0m      [0m[0mnormally be created on Windows systems. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0mReturns: {Object}
        * [0m[0m[33mpid[39m {number} Pid of the child process.[0m[0m[0m
      [0m
        * [0m[0m[33moutput[39m {Array} Array of results from stdio output.[0m[0m[0m
      [0m
        * [0m[0m[33mstdout[39m {Buffer|string} The contents of [33moutput[1][39m.[0m[0m[0m
      [0m
        * [0m[0m[33mstderr[39m {Buffer|string} The contents of [33moutput[2][39m.[0m[0m[0m
      [0m
        * [0m[0m[33mstatus[39m {number|null} The exit code of the subprocess, or [33mnull[39m if the[0m[0m[0m
      [0m      [0m[0msubprocess terminated due to a signal.[0m[0m[0m
      [0m
        * [0m[0m[33msignal[39m {string|null} The signal used to kill the subprocess, or [33mnull[39m if[0m[0m[0m
      [0m      [0m[0mthe subprocess did not terminate due to a signal.[0m[0m[0m
      [0m
        * [0m[0m[33merror[39m {Error} The error object if the child process failed or timed out.[0m[0m[0m

[0mThe [33mchild_process.spawnSync()[39m method is generally identical to[0m
[0m[34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m with the exception that the function will not return[0m
[0muntil the child process has fully closed. When a timeout has been encountered[0m
[0mand [33mkillSignal[39m is sent, the method won't return until the process has[0m
[0mcompletely exited. If the process intercepts and handles the [33mSIGTERM[39m signal[0m
[0mand doesn't exit, the parent process will wait until the child process has[0m
[0mexited.[0m

[0m[1mIf the [33mshell[39m option is enabled, do not pass unsanitized user input to this[22m[0m
[0m[1mfunction. Any input containing shell metacharacters may be used to trigger[22m[0m
[0m[1marbitrary command execution.[22m[0m

[32m[1m## Class: [33mChildProcess[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v2.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {EventEmitter}[0m

[0mInstances of the [33mChildProcess[39m represent spawned child processes.[0m

[0mInstances of [33mChildProcess[39m are not intended to be created directly. Rather,[0m
[0muse the [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m, [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m,[0m
[0m[34m[33mchild_process.execFile()[39m[34m ([34m[4m#child_process_child_process_execfile_file_args_options_callback[24m[39m[34m)[39m, or [34m[33mchild_process.fork()[39m[34m ([34m[4m#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m methods to create[0m
[0minstances of [33mChildProcess[39m.[0m

[32m[1m### Event: [33m'close'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.7[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {number} The exit code if the child exited on its own.[0m
    * [0m[33msignal[39m {string} The signal by which the child process was terminated.[0m

[0mThe [33m'close'[39m event is emitted when the stdio streams of a child process have[0m
[0mbeen closed. This is distinct from the [34m[33m'exit'[39m[34m ([34m[4m#child_process_event_exit[24m[39m[34m)[39m event, since multiple[0m
[0mprocesses might share the same stdio streams.[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mls[39m [93m=[39m [37mspawn[39m[90m([39m[92m'ls'[39m[32m,[39m [33m[[39m[92m'-lh'[39m[32m,[39m [92m'/usr'[39m[33m][39m[90m)[39m[90m;[39m
    
    [37mls[39m[32m.[39m[37mstdout[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`stdout: ${[37mdata[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mls[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`child process close all stdio with code ${[37mcode[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mls[39m[32m.[39m[37mon[39m[90m([39m[92m'exit'[39m[32m,[39m [90m([39m[37mcode[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`child process exited with code ${[37mcode[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'disconnect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'disconnect'[39m event is emitted after calling the[0m
[0m[34m[33msubprocess.disconnect()[39m[34m ([34m[4m#child_process_subprocess_disconnect[24m[39m[34m)[39m method in parent process or[0m
[0m[34m[33mprocess.disconnect()[39m[34m ([34m[4mprocess.html#process_process_disconnect[24m[39m[34m)[39m in child process. After disconnecting it is no longer[0m
[0mpossible to send or receive messages, and the [34m[33msubprocess.connected[39m[34m ([34m[4m#child_process_subprocess_connected[24m[39m[34m)[39m[0m
[0mproperty is [33mfalse[39m.[0m

[32m[1m### Event: [33m'error'[39m[32m[22m[39m

    * [0m[33merr[39m {Error} The error.[0m

[0mThe [33m'error'[39m event is emitted whenever:[0m

    1. [0mThe process could not be spawned, or[0m
    2. [0mThe process could not be killed, or[0m
    3. [0mSending a message to the child process failed.[0m

[0mThe [33m'exit'[39m event may or may not fire after an error has occurred. When[0m
[0mlistening to both the [33m'exit'[39m and [33m'error'[39m events, guard[0m
[0magainst accidentally invoking handler functions multiple times.[0m

[0mSee also [34m[33msubprocess.kill()[39m[34m ([34m[4m#child_process_subprocess_kill_signal[24m[39m[34m)[39m and [34m[33msubprocess.send()[39m[34m ([34m[4m#child_process_subprocess_send_message_sendhandle_options_callback[24m[39m[34m)[39m.[0m

[32m[1m### Event: [33m'exit'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcode[39m {number} The exit code if the child exited on its own.[0m
    * [0m[33msignal[39m {string} The signal by which the child process was terminated.[0m

[0mThe [33m'exit'[39m event is emitted after the child process ends. If the process[0m
[0mexited, [33mcode[39m is the final exit code of the process, otherwise [33mnull[39m. If the[0m
[0mprocess terminated due to receipt of a signal, [33msignal[39m is the string name of[0m
[0mthe signal, otherwise [33mnull[39m. One of the two will always be non-[33mnull[39m.[0m

[0mWhen the [33m'exit'[39m event is triggered, child process stdio streams might still be[0m
[0mopen.[0m

[0mNode.js establishes signal handlers for [33mSIGINT[39m and [33mSIGTERM[39m and Node.js[0m
[0mprocesses will not terminate immediately due to receipt of those signals.[0m
[0mRather, Node.js will perform a sequence of cleanup actions and then will[0m
[0mre-raise the handled signal.[0m

[0mSee waitpid(2).[0m

[32m[1m### Event: [33m'message'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmessage[39m {Object} A parsed JSON object or primitive value.[0m
    * [0m[33msendHandle[39m {Handle} A [34m[33mnet.Socket[39m[34m ([34m[4mnet.html#net_class_net_socket[24m[39m[34m)[39m or [34m[33mnet.Server[39m[34m ([34m[4mnet.html#net_class_net_server[24m[39m[34m)[39m object, or[0m
      [0mundefined.[0m

[0mThe [33m'message'[39m event is triggered when a child process uses[0m
[0m[34m[33mprocess.send()[39m[34m ([34m[4mprocess.html#process_process_send_message_sendhandle_options_callback[24m[39m[34m)[39m to send messages.[0m

[0mThe message goes through serialization and parsing. The resulting[0m
[0mmessage might not be the same as what is originally sent.[0m

[0mIf the [33mserialization[39m option was set to [33m'advanced'[39m used when spawning the[0m
[0mchild process, the [33mmessage[39m argument can contain data that JSON is not able[0m
[0mto represent.[0m
[0mSee [34mAdvanced Serialization ([34m[4m#child_process_advanced_serialization[24m[39m[34m)[39m for more details.[0m

[32m[1m### [33msubprocess.channel[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.1.0[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30165[39m
[90m    description: The object no longer accidentally exposes native C++ bindings.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Object} A pipe representing the IPC channel to the child process.[0m

[0mThe [33msubprocess.channel[39m property is a reference to the child's IPC channel. If[0m
[0mno IPC channel currently exists, this property is [33mundefined[39m.[0m

[32m[1m#### [33msubprocess.channel.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis method makes the IPC channel keep the event loop of the parent process[0m
[0mrunning if [33m.unref()[39m has been called before.[0m

[32m[1m#### [33msubprocess.channel.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v7.1.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThis method makes the IPC channel not keep the event loop of the parent process[0m
[0mrunning, and lets it finish even while the channel is open.[0m

[32m[1m### [33msubprocess.connected[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean} Set to [33mfalse[39m after [33msubprocess.disconnect()[39m is called.[0m

[0mThe [33msubprocess.connected[39m property indicates whether it is still possible to[0m
[0msend and receive messages from a child process. When [33msubprocess.connected[39m is[0m
[0m[33mfalse[39m, it is no longer possible to send or receive messages.[0m

[32m[1m### [33msubprocess.disconnect()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCloses the IPC channel between parent and child, allowing the child to exit[0m
[0mgracefully once there are no other connections keeping it alive. After calling[0m
[0mthis method the [33msubprocess.connected[39m and [33mprocess.connected[39m properties in[0m
[0mboth the parent and child (respectively) will be set to [33mfalse[39m, and it will be[0m
[0mno longer possible to pass messages between the processes.[0m

[0mThe [33m'disconnect'[39m event will be emitted when there are no messages in the[0m
[0mprocess of being received. This will most often be triggered immediately after[0m
[0mcalling [33msubprocess.disconnect()[39m.[0m

[0mWhen the child process is a Node.js instance (e.g. spawned using[0m
[0m[34m[33mchild_process.fork()[39m[34m ([34m[4m#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m), the [33mprocess.disconnect()[39m method can be invoked[0m
[0mwithin the child process to close the IPC channel as well.[0m

[32m[1m### [33msubprocess.exitCode[39m[32m[22m[39m

    * [0m{integer}[0m

[0mThe [33msubprocess.exitCode[39m property indicates the exit code of the child process.[0m
[0mIf the child process is still running, the field will be [33mnull[39m.[0m

[32m[1m### [33msubprocess.kill([signal])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msignal[39m {number|string}[0m
    * [0mReturns: {boolean}[0m

[0mThe [33msubprocess.kill()[39m method sends a signal to the child process. If no[0m
[0margument is given, the process will be sent the [33m'SIGTERM'[39m signal. See[0m
[0msignal(7) for a list of available signals. This function returns [33mtrue[39m if[0m
[0mkill(2) succeeds, and [33mfalse[39m otherwise.[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mgrep[39m [93m=[39m [37mspawn[39m[90m([39m[92m'grep'[39m[32m,[39m [33m[[39m[92m'ssh'[39m[33m][39m[90m)[39m[90m;[39m
    
    [37mgrep[39m[32m.[39m[37mon[39m[90m([39m[92m'close'[39m[32m,[39m [90m([39m[37mcode[39m[32m,[39m [37msignal[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m
        `child process terminated due to receipt of signal ${[37msignal[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Send SIGHUP to process.[39m
    [37mgrep[39m[32m.[39m[37mkill[39m[90m([39m[92m'SIGHUP'[39m[90m)[39m[90m;[39m

[0mThe [34m[33mChildProcess[39m[34m ([34m[4m#child_process_child_process[24m[39m[34m)[39m object may emit an [34m[33m'error'[39m[34m ([34m[4m#child_process_event_error[24m[39m[34m)[39m event if the signal[0m
[0mcannot be delivered. Sending a signal to a child process that has already exited[0m
[0mis not an error but may have unforeseen consequences. Specifically, if the[0m
[0mprocess identifier (PID) has been reassigned to another process, the signal will[0m
[0mbe delivered to that process instead which can have unexpected results.[0m

[0mWhile the function is called [33mkill[39m, the signal delivered to the child process[0m
[0mmay not actually terminate the process.[0m

[0mSee kill(2) for reference.[0m

[0mOn Linux, child processes of child processes will not be terminated[0m
[0mwhen attempting to kill their parent. This is likely to happen when running a[0m
[0mnew process in a shell or with the use of the [33mshell[39m option of [33mChildProcess[39m:[0m

    [92m'use strict'[39m[90m;[39m
    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37msubprocess[39m [93m=[39m [37mspawn[39m[90m([39m
      [92m'sh'[39m[32m,[39m
      [33m[[39m
        [92m'-c'[39m[32m,[39m
        `node -e "setInterval(() => {
          console.log(process.pid, 'is alive')
        }, 500);"`
      [33m][39m[32m,[39m [33m{[39m
        [37mstdio[39m[93m:[39m [33m[[39m[92m'inherit'[39m[32m,[39m [92m'inherit'[39m[32m,[39m [92m'inherit'[39m[33m][39m
      [33m}[39m
    [90m)[39m[90m;[39m
    
    [37msetTimeout[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37msubprocess[39m[32m.[39m[37mkill[39m[90m([39m[90m)[39m[90m;[39m [90m// Does not terminate the Node.js process in the shell.[39m
    [33m}[39m[32m,[39m [34m2000[39m[90m)[39m[90m;[39m

[32m[1m### [33msubprocess.killed[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{boolean} Set to [33mtrue[39m after [33msubprocess.kill()[39m is used to successfully[0m
      [0msend a signal to the child process.[0m

[0mThe [33msubprocess.killed[39m property indicates whether the child process[0m
[0msuccessfully received a signal from [33msubprocess.kill()[39m. The [33mkilled[39m property[0m
[0mdoes not indicate that the child process has been terminated.[0m

[32m[1m### [33msubprocess.pid[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{integer}[0m

[0mReturns the process identifier (PID) of the child process.[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mgrep[39m [93m=[39m [37mspawn[39m[90m([39m[92m'grep'[39m[32m,[39m [33m[[39m[92m'ssh'[39m[33m][39m[90m)[39m[90m;[39m
    
    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Spawned child pid: ${[37mgrep[39m[32m.[39m[37mpid[39m}`[90m)[39m[90m;[39m
    [37mgrep[39m[32m.[39m[37mstdin[39m[32m.[39m[37mend[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33msubprocess.ref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.10[39m
[90m-->[39m
[90m[39m
[90m[39m[0mCalling [33msubprocess.ref()[39m after making a call to [33msubprocess.unref()[39m will[0m
[0mrestore the removed reference count for the child process, forcing the parent[0m
[0mto wait for the child to exit before exiting itself.[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37msubprocess[39m [93m=[39m [37mspawn[39m[90m([39m[37mprocess[39m[32m.[39m[37margv[39m[33m[[39m[34m0[39m[33m][39m[32m,[39m [33m[[39m[92m'child_program.js'[39m[33m][39m[32m,[39m [33m{[39m
      [37mdetached[39m[93m:[39m [91mtrue[39m[32m,[39m
      [37mstdio[39m[93m:[39m [92m'ignore'[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37msubprocess[39m[32m.[39m[37munref[39m[90m([39m[90m)[39m[90m;[39m
    [37msubprocess[39m[32m.[39m[37mref[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m### [33msubprocess.send(message[, sendHandle[, options]][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90mchanges:[39m
[90m  - version: v5.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5283[39m
[90m    description: The `options` parameter, and the `keepOpen` option[39m
[90m                 in particular, is supported now.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3516[39m
[90m    description: This method returns a boolean for flow control now.[39m
[90m  - version: v4.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2620[39m
[90m    description: The `callback` parameter is supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmessage[39m {Object}[0m
    * [0m[33msendHandle[39m {Handle}[0m
    * [0m[33moptions[39m {Object} The [33moptions[39m argument, if present, is an object used to[0m
      [0mparameterize the sending of certain types of handles. [33moptions[39m supports[0m
      [0mthe following properties:
        * [0m[0m[33mkeepOpen[39m {boolean} A value that can be used when passing instances of[0m[0m[0m
      [0m      [0m[0m[33mnet.Socket[39m. When [33mtrue[39m, the socket is kept open in the sending process.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {boolean}[0m

[0mWhen an IPC channel has been established between the parent and child ([0m
[0mi.e. when using [34m[33mchild_process.fork()[39m[34m ([34m[4m#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m), the [33msubprocess.send()[39m method can[0m
[0mbe used to send messages to the child process. When the child process is a[0m
[0mNode.js instance, these messages can be received via the [34m[33m'message'[39m[34m ([34m[4mprocess.html#process_event_message[24m[39m[34m)[39m event.[0m

[0mThe message goes through serialization and parsing. The resulting[0m
[0mmessage might not be the same as what is originally sent.[0m

[0mFor example, in the parent script:[0m

    [94mconst[39m [37mcp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mn[39m [93m=[39m [37mcp[39m[32m.[39m[37mfork[39m[90m([39m`${[37m__dirname[39m}/sub.js`[90m)[39m[90m;[39m
    
    [37mn[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mm[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'PARENT got message:'[39m[32m,[39m [37mm[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Causes the child to print: CHILD got message: { hello: 'world' }[39m
    [37mn[39m[32m.[39m[37msend[39m[90m([39m[33m{[39m [37mhello[39m[93m:[39m [92m'world'[39m [33m}[39m[90m)[39m[90m;[39m

[0mAnd then the child script, [33m'sub.js'[39m might look like this:[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mm[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'CHILD got message:'[39m[32m,[39m [37mm[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Causes the parent to print: PARENT got message: { foo: 'bar', baz: null }[39m
    [37mprocess[39m[32m.[39m[37msend[39m[90m([39m[33m{[39m [37mfoo[39m[93m:[39m [92m'bar'[39m[32m,[39m [37mbaz[39m[93m:[39m [37mNaN[39m [33m}[39m[90m)[39m[90m;[39m

[0mChild Node.js processes will have a [34m[33mprocess.send()[39m[34m ([34m[4mprocess.html#process_process_send_message_sendhandle_options_callback[24m[39m[34m)[39m method of their own[0m
[0mthat allows the child to send messages back to the parent.[0m

[0mThere is a special case when sending a [33m{cmd: 'NODE_foo'}[39m message. Messages[0m
[0mcontaining a [33mNODE_[39m prefix in the [33mcmd[39m property are reserved for use within[0m
[0mNode.js core and will not be emitted in the child's [34m[33m'message'[39m[34m ([34m[4mprocess.html#process_event_message[24m[39m[34m)[39m[0m
[0mevent. Rather, such messages are emitted using the[0m
[0m[33m'internalMessage'[39m event and are consumed internally by Node.js.[0m
[0mApplications should avoid using such messages or listening for[0m
[0m[33m'internalMessage'[39m events as it is subject to change without notice.[0m

[0mThe optional [33msendHandle[39m argument that may be passed to [33msubprocess.send()[39m is[0m
[0mfor passing a TCP server or socket object to the child process. The child will[0m
[0mreceive the object as the second argument passed to the callback function[0m
[0mregistered on the [34m[33m'message'[39m[34m ([34m[4mprocess.html#process_event_message[24m[39m[34m)[39m event. Any data that is received[0m
[0mand buffered in the socket will not be sent to the child.[0m

[0mThe optional [33mcallback[39m is a function that is invoked after the message is[0m
[0msent but before the child may have received it. The function is called with a[0m
[0msingle argument: [33mnull[39m on success, or an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m object on failure.[0m

[0mIf no [33mcallback[39m function is provided and the message cannot be sent, an[0m
[0m[33m'error'[39m event will be emitted by the [34m[33mChildProcess[39m[34m ([34m[4m#child_process_child_process[24m[39m[34m)[39m object. This can[0m
[0mhappen, for instance, when the child process has already exited.[0m

[0m[33msubprocess.send()[39m will return [33mfalse[39m if the channel has closed or when the[0m
[0mbacklog of unsent messages exceeds a threshold that makes it unwise to send[0m
[0mmore. Otherwise, the method returns [33mtrue[39m. The [33mcallback[39m function can be[0m
[0mused to implement flow control.[0m

[32m[1m#### Example: sending a server object[22m[39m

[0mThe [33msendHandle[39m argument can be used, for instance, to pass the handle of[0m
[0ma TCP server object to the child process as illustrated in the example below:[0m

    [94mconst[39m [37msubprocess[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[32m.[39m[37mfork[39m[90m([39m[92m'subprocess.js'[39m[90m)[39m[90m;[39m
    
    [90m// Open up the server object and send the handle.[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'connection'[39m[32m,[39m [90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [37msocket[39m[32m.[39m[37mend[39m[90m([39m[92m'handled by parent'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37msubprocess[39m[32m.[39m[37msend[39m[90m([39m[92m'server'[39m[32m,[39m [37mserver[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe child would then receive the server object as:[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mm[39m[32m,[39m [37mserver[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mm[39m [93m===[39m [92m'server'[39m[90m)[39m [33m{[39m
        [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'connection'[39m[32m,[39m [90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
          [37msocket[39m[32m.[39m[37mend[39m[90m([39m[92m'handled by child'[39m[90m)[39m[90m;[39m
        [33m}[39m[90m)[39m[90m;[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOnce the server is now shared between the parent and child, some connections[0m
[0mcan be handled by the parent and some by the child.[0m

[0mWhile the example above uses a server created using the [33mnet[39m module, [33mdgram[39m[0m
[0mmodule servers use exactly the same workflow with the exceptions of listening on[0m
[0ma [33m'message'[39m event instead of [33m'connection'[39m and using [33mserver.bind()[39m instead[0m
[0mof [33mserver.listen()[39m. This is, however, currently only supported on Unix[0m
[0mplatforms.[0m

[32m[1m#### Example: sending a socket object[22m[39m

[0mSimilarly, the [33msendHandler[39m argument can be used to pass the handle of a[0m
[0msocket to the child process. The example below spawns two children that each[0m
[0mhandle connections with "normal" or "special" priority:[0m

    [94mconst[39m [33m{[39m [37mfork[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mnormal[39m [93m=[39m [37mfork[39m[90m([39m[92m'subprocess.js'[39m[32m,[39m [33m[[39m[92m'normal'[39m[33m][39m[90m)[39m[90m;[39m
    [94mconst[39m [37mspecial[39m [93m=[39m [37mfork[39m[90m([39m[92m'subprocess.js'[39m[32m,[39m [33m[[39m[92m'special'[39m[33m][39m[90m)[39m[90m;[39m
    
    [90m// Open up the server and send sockets to child. Use pauseOnConnect to prevent[39m
    [90m// the sockets from being read before they are sent to the child process.[39m
    [94mconst[39m [37mserver[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/net'[39m[90m)[39m[32m.[39m[37mcreateServer[39m[90m([39m[33m{[39m [37mpauseOnConnect[39m[93m:[39m [91mtrue[39m [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'connection'[39m[32m,[39m [90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
    
      [90m// If this is special priority...[39m
      [94mif[39m [90m([39m[37msocket[39m[32m.[39m[37mremoteAddress[39m [93m===[39m [92m'74.125.127.100'[39m[90m)[39m [33m{[39m
        [37mspecial[39m[32m.[39m[37msend[39m[90m([39m[92m'socket'[39m[32m,[39m [37msocket[39m[90m)[39m[90m;[39m
        [31mreturn[39m[90m;[39m
      [33m}[39m
      [90m// This is normal priority.[39m
      [37mnormal[39m[32m.[39m[37msend[39m[90m([39m[92m'socket'[39m[32m,[39m [37msocket[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m1337[39m[90m)[39m[90m;[39m

[0mThe [33msubprocess.js[39m would receive the socket handle as the second argument[0m
[0mpassed to the event callback function:[0m

    [37mprocess[39m[32m.[39m[37mon[39m[90m([39m[92m'message'[39m[32m,[39m [90m([39m[37mm[39m[32m,[39m [37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mm[39m [93m===[39m [92m'socket'[39m[90m)[39m [33m{[39m
        [94mif[39m [90m([39m[37msocket[39m[90m)[39m [33m{[39m
          [90m// Check that the client socket exists.[39m
          [90m// It is possible for the socket to be closed between the time it is[39m
          [90m// sent and the time it is received in the child process.[39m
          [37msocket[39m[32m.[39m[37mend[39m[90m([39m`Request handled with ${[37mprocess[39m[32m.[39m[37margv[39m[33m[[39m[34m2[39m[33m][39m} priority`[90m)[39m[90m;[39m
        [33m}[39m
      [33m}[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mOnce a socket has been passed to a child, the parent is no longer capable of[0m
[0mtracking when the socket is destroyed. To indicate this, the [33m.connections[39m[0m
[0mproperty becomes [33mnull[39m. It is recommended not to use [33m.maxConnections[39m when[0m
[0mthis occurs.[0m

[0mIt is also recommended that any [33m'message'[39m handlers in the child process[0m
[0mverify that [33msocket[39m exists, as the connection may have been closed during the[0m
[0mtime it takes to send the connection to the child.[0m

[32m[1m### [33msubprocess.signalCode[39m[32m[22m[39m

    * [0m{integer}[0m

[0mThe [33msubprocess.signalCode[39m property indicates the signal number received by[0m
[0mthe child process if any, else [33mnull[39m.[0m

[32m[1m### [33msubprocess.spawnargs[39m[32m[22m[39m

    * [0m{Array}[0m

[0mThe [33msubprocess.spawnargs[39m property represents the full list of command line[0m
[0marguments the child process was launched with.[0m

[32m[1m### [33msubprocess.spawnfile[39m[32m[22m[39m

    * [0m{string}[0m

[0mThe [33msubprocess.spawnfile[39m property indicates the executable file name of[0m
[0mthe child process that is launched.[0m

[0mFor [34m[33mchild_process.fork()[39m[34m ([34m[4m#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m, its value will be equal to[0m
[0m[34m[33mprocess.execPath[39m[34m ([34m[4mprocess.html#process_process_execpath[24m[39m[34m)[39m.[0m
[0mFor [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m, its value will be the name of[0m
[0mthe executable file.[0m
[0mFor [34m[33mchild_process.exec()[39m[34m ([34m[4m#child_process_child_process_exec_command_options_callback[24m[39m[34m)[39m,  its value will be the name of the shell[0m
[0min which the child process is launched.[0m

[32m[1m### [33msubprocess.stderr[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{stream.Readable}[0m

[0mA [33mReadable Stream[39m that represents the child process's [33mstderr[39m.[0m

[0mIf the child was spawned with [33mstdio[2][39m set to anything other than [33m'pipe'[39m,[0m
[0mthen this will be [33mnull[39m.[0m

[0m[33msubprocess.stderr[39m is an alias for [33msubprocess.stdio[2][39m. Both properties will[0m
[0mrefer to the same value.[0m

[32m[1m### [33msubprocess.stdin[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{stream.Writable}[0m

[0mA [33mWritable Stream[39m that represents the child process's [33mstdin[39m.[0m

[0mIf a child process waits to read all of its input, the child will not continue[0m
[0muntil this stream has been closed via [33mend()[39m.[0m

[0mIf the child was spawned with [33mstdio[0][39m set to anything other than [33m'pipe'[39m,[0m
[0mthen this will be [33mnull[39m.[0m

[0m[33msubprocess.stdin[39m is an alias for [33msubprocess.stdio[0][39m. Both properties will[0m
[0mrefer to the same value.[0m

[32m[1m### [33msubprocess.stdio[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.10[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Array}[0m

[0mA sparse array of pipes to the child process, corresponding with positions in[0m
[0mthe [34m[33mstdio[39m[34m ([34m[4m#child_process_options_stdio[24m[39m[34m)[39m option passed to [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m that have been set[0m
[0mto the value [33m'pipe'[39m. [33msubprocess.stdio[0][39m, [33msubprocess.stdio[1][39m, and[0m
[0m[33msubprocess.stdio[2][39m are also available as [33msubprocess.stdin[39m,[0m
[0m[33msubprocess.stdout[39m, and [33msubprocess.stderr[39m, respectively.[0m

[0mIn the following example, only the child's fd [33m1[39m (stdout) is configured as a[0m
[0mpipe, so only the parent's [33msubprocess.stdio[1][39m is a stream, all other values[0m
[0min the array are [33mnull[39m.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mchild_process[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37msubprocess[39m [93m=[39m [37mchild_process[39m[32m.[39m[37mspawn[39m[90m([39m[92m'ls'[39m[32m,[39m [33m{[39m
      [37mstdio[39m[93m:[39m [33m[[39m
        [34m0[39m[32m,[39m [90m// Use parent's stdin for child.[39m
        [92m'pipe'[39m[32m,[39m [90m// Pipe child's stdout to parent.[39m
        [37mfs[39m[32m.[39m[37mopenSync[39m[90m([39m[92m'err.out'[39m[32m,[39m [92m'w'[39m[90m)[39m [90m// Direct child's stderr to a file.[39m
      [33m][39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37msubprocess[39m[32m.[39m[37mstdio[39m[33m[[39m[34m0[39m[33m][39m[32m,[39m [90mnull[39m[90m)[39m[90m;[39m
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37msubprocess[39m[32m.[39m[37mstdio[39m[33m[[39m[34m0[39m[33m][39m[32m,[39m [37msubprocess[39m[32m.[39m[37mstdin[39m[90m)[39m[90m;[39m
    
    [37massert[39m[90m([39m[37msubprocess[39m[32m.[39m[37mstdout[39m[90m)[39m[90m;[39m
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37msubprocess[39m[32m.[39m[37mstdio[39m[33m[[39m[34m1[39m[33m][39m[32m,[39m [37msubprocess[39m[32m.[39m[37mstdout[39m[90m)[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37msubprocess[39m[32m.[39m[37mstdio[39m[33m[[39m[34m2[39m[33m][39m[32m,[39m [90mnull[39m[90m)[39m[90m;[39m
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37msubprocess[39m[32m.[39m[37mstdio[39m[33m[[39m[34m2[39m[33m][39m[32m,[39m [37msubprocess[39m[32m.[39m[37mstderr[39m[90m)[39m[90m;[39m

[32m[1m### [33msubprocess.stdout[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.90[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{stream.Readable}[0m

[0mA [33mReadable Stream[39m that represents the child process's [33mstdout[39m.[0m

[0mIf the child was spawned with [33mstdio[1][39m set to anything other than [33m'pipe'[39m,[0m
[0mthen this will be [33mnull[39m.[0m

[0m[33msubprocess.stdout[39m is an alias for [33msubprocess.stdio[1][39m. Both properties will[0m
[0mrefer to the same value.[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37msubprocess[39m [93m=[39m [37mspawn[39m[90m([39m[92m'ls'[39m[90m)[39m[90m;[39m
    
    [37msubprocess[39m[32m.[39m[37mstdout[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Received chunk ${[37mdata[39m}`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33msubprocess.unref()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.7.10[39m
[90m-->[39m
[90m[39m
[90m[39m[0mBy default, the parent will wait for the detached child to exit. To prevent the[0m
[0mparent from waiting for a given [33msubprocess[39m to exit, use the[0m
[0m[33msubprocess.unref()[39m method. Doing so will cause the parent's event loop to not[0m
[0minclude the child in its reference count, allowing the parent to exit[0m
[0mindependently of the child, unless there is an established IPC channel between[0m
[0mthe child and the parent.[0m

    [94mconst[39m [33m{[39m [37mspawn[39m [33m}[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/child_process'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37msubprocess[39m [93m=[39m [37mspawn[39m[90m([39m[37mprocess[39m[32m.[39m[37margv[39m[33m[[39m[34m0[39m[33m][39m[32m,[39m [33m[[39m[92m'child_program.js'[39m[33m][39m[32m,[39m [33m{[39m
      [37mdetached[39m[93m:[39m [91mtrue[39m[32m,[39m
      [37mstdio[39m[93m:[39m [92m'ignore'[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37msubprocess[39m[32m.[39m[37munref[39m[90m([39m[90m)[39m[90m;[39m

[32m[1m## [33mmaxBuffer[39m[32m and Unicode[22m[39m

[0mThe [33mmaxBuffer[39m option specifies the largest number of bytes allowed on [33mstdout[39m[0m
[0mor [33mstderr[39m. If this value is exceeded, then the child process is terminated.[0m
[0mThis impacts output that includes multibyte character encodings such as UTF-8 or[0m
[0mUTF-16. For instance, [33mconsole.log('中文测试')[39m will send 13 UTF-8 encoded bytes[0m
[0mto [33mstdout[39m although there are only 4 characters.[0m

[32m[1m## Shell Requirements[22m[39m

[0mThe shell should understand the [33m-c[39m switch. If the shell is [33m'cmd.exe'[39m, it[0m
[0mshould understand the [33m/d /s /c[39m switches and command line parsing should be[0m
[0mcompatible.[0m

[32m[1m## Default Windows Shell[22m[39m

[0mAlthough Microsoft specifies [33m%COMSPEC%[39m must contain the path to[0m
[0m[33m'cmd.exe'[39m in the root environment, child processes are not always subject to[0m
[0mthe same requirement. Thus, in [33mchild_process[39m functions where a shell can be[0m
[0mspawned, [33m'cmd.exe'[39m is used as a fallback if [33mprocess.env.ComSpec[39m is[0m
[0munavailable.[0m

[32m[1m## Advanced Serialization[22m[39m

[90m<!-- YAML[39m
[90madded: v13.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mChild processes support a serialization mechanism for IPC that is based on the[0m
[0m[34mserialization API of the [33mv8[39m[34m module ([34m[4mv8.html#v8_serialization_api[24m[39m[34m)[39m, based on the[0m
[0m[34mHTML structured clone algorithm ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm[24m[39m[34m)[39m. This is generally more powerful and[0m
[0msupports more built-in JavaScript object types, such as [33mBigInt[39m, [33mMap[39m[0m
[0mand [33mSet[39m, [33mArrayBuffer[39m and [33mTypedArray[39m, [33mBuffer[39m, [33mError[39m, [33mRegExp[39m etc.[0m

[0mHowever, this format is not a full superset of JSON, and e.g. properties set on[0m
[0mobjects of such built-in types will not be passed on through the serialization[0m
[0mstep. Additionally, performance may not be equivalent to that of JSON, depending[0m
[0mon the structure of the passed data.[0m
[0mTherefore, this feature requires opting in by setting the[0m
[0m[33mserialization[39m option to [33m'advanced'[39m when calling [34m[33mchild_process.spawn()[39m[34m ([34m[4m#child_process_child_process_spawn_command_args_options[24m[39m[34m)[39m[0m
[0mor [34m[33mchild_process.fork()[39m[34m ([34m[4m#child_process_child_process_fork_modulepath_args_options[24m[39m[34m)[39m.[0m

