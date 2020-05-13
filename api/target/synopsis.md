[35m[4m[1m# Usage & Example[22m[24m[39m

[32m[1m## Usage[22m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m[90m<!--type=misc-->[39m
[90m[39m
[90m[39m[0m[33mnode [options] [V8 options] [script.js | -e "script" | - ] [arguments][39m[0m

[0mPlease see the [34mCommand Line Options ([34m[4mcli.html#cli_command_line_options[24m[39m[34m)[39m document for more information.[0m

[32m[1m## Example[22m[39m

[0mAn example of a [34mweb server ([34m[4mhttp.html[24m[39m[34m)[39m written with Node.js which responds with[0m
[0m[33m'Hello, World!'[39m:[0m

[0mCommands in this document start with [33m$[39m or [33m>[39m to replicate how they would[0m
[0mappear in a user's terminal. Do not include the [33m$[39m and [33m>[39m characters. They are[0m
[0mthere to show the start of each command.[0m

[0mLines that don’t start with [33m$[39m or [33m>[39m character show the output of the previous[0m
[0mcommand.[0m

[0mFirst, make sure to have downloaded and installed Node.js. See [34mthis guide ([34m[4mhttps://nodejs.org/en/download/package-manager/[24m[39m[34m)[39m[0m
[0mfor further install information.[0m

[0mNow, create an empty project folder called [33mprojects[39m, then navigate into it.[0m

[0mLinux and Mac:[0m

    [33m$ mkdir ~/projects[39m
    [33m$ cd ~/projects[39m

[0mWindows CMD:[0m

    [33m> mkdir %USERPROFILE%\projects[39m
    [33m> cd %USERPROFILE%\projects[39m

[0mWindows PowerShell:[0m

    [33m> mkdir $env:USERPROFILE\projects[39m
    [33m> cd $env:USERPROFILE\projects[39m

[0mNext, create a new source file in the [33mprojects[39m[0m
[0m folder and call it [33mhello-world.js[39m.[0m

[0mOpen [33mhello-world.js[39m in any preferred text editor and[0m
[0mpaste in the following content:[0m

    [94mconst[39m [37mhttp[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/http'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mhostname[39m [93m=[39m [92m'127.0.0.1'[39m[90m;[39m
    [94mconst[39m [37mport[39m [93m=[39m [34m3000[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mhttp[39m[32m.[39m[37mcreateServer[39m[90m([39m[90m([39m[37mreq[39m[32m,[39m [37mres[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mres[39m[32m.[39m[37mstatusCode[39m [93m=[39m [34m200[39m[90m;[39m
      [37mres[39m[32m.[39m[37msetHeader[39m[90m([39m[92m'Content-Type'[39m[32m,[39m [92m'text/plain'[39m[90m)[39m[90m;[39m
      [37mres[39m[32m.[39m[37mend[39m[90m([39m[92m'Hello, World!\n'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[37mport[39m[32m,[39m [37mhostname[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m`Server running at http://${[37mhostname[39m}:${[37mport[39m}/`[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mSave the file, go back to the terminal window, and enter the following command:[0m

    [33m$ node hello-world.js[39m

[0mOutput like this should appear in the terminal:[0m

    [33mServer running at http://127.0.0.1:3000/[39m

[0mNow, open any preferred web browser and visit [33mhttp://127.0.0.1:3000[39m.[0m

[0mIf the browser displays the string [33mHello, World![39m, that indicates[0m
[0mthe server is working.[0m

