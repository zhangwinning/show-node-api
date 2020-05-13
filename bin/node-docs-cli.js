#!/usr/bin/env node

let spawn = require("child_process").spawn;
let path = require("path");
let fs = require("fs");
let program = require("commander");
const VERSION = require("../package").version;

before(program, "unknownOption", function () {
  // allow unknown options if help was shown, to prevent trailing error
  this._allowUnknownOption = this._helpShown;

  // show help if not yet shown
  if (!this._helpShown) {
    program.outputHelp();
  }
});

/**
 * Install a before function; AOP.
 */
function before(obj, method, fn) {
  var old = obj[method];

  obj[method] = function () {
    fn.call(this);
    old.apply(this, arguments);
  };
}

program
  .name("node-docs")
  .version(VERSION, "    --version")
  .usage("[moduleName]")
  .option("-l, --list", "supported modules")
  .parse(process.argv);

function getPath(moduleName) {
  return path.join(__dirname, "..", "api", "target", moduleName + ".md");
}

function showContent(content) {
  spawn(`cat <<< "${content}" | less -r`, {
    stdio: "inherit", // use the current shell for stdio
    shell: true,
  });
}

function getFileList(dir) {
  const list = fs.readdirSync(dir);
  return list.reduce((acc, cur, index) => {
    if (/.md/.test(cur)) {
      let item = "";
      item += cur.replace(".md", "");
      acc.push(item);
    }
    return acc;
  }, []);
}
function showFileContent(moduleName) {
  const filePath = getPath(moduleName);
  spawn(`cat ${filePath} | less -r`, {
    stdio: "inherit", // use the current shell for stdio
    shell: true,
  });
}

function formatModuleName(pathName) {
  return path
    .basename(pathName)
    .replace(/[^A-Za-z0-9.-]+/g, "-")
    .replace(/^[-_.]+|-+$/g, "")
    .toLowerCase();
}

function main() {
  let moduleName = program.args.shift();

  moduleName = formatModuleName(moduleName);
  // diff conditions
  const fileNames = getFileList(path.join(__dirname, "..", "api", "target"));
  if (program.list) {
    showContent(fileNames.join("\n"));
  } else if (moduleName && fileNames.indexOf(moduleName) >= 0) {
    showFileContent(moduleName);
  } else {
    showContent(`not find of ${moduleName} module, please retype attempt...`);
  }
}

main();
