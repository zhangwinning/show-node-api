#!/usr/bin/env node

let spawn = require("child_process").spawn;
let path = require("path");
let fs = require("fs");
let program = require("commander");
const VERSION = require("../package").version;

program
  .name("node-docs")
  .version(VERSION, "    --version")
  .usage("[moduleName]")
  .option("-l, --list", "supported modules")
  .parse(process.argv);

function getPath(moduleName) {
  return path.join(__dirname, "..", "api", "target", moduleName + ".md");
}

function showList(content) {
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
      if (index) {
        item += "\n";
      }
      item += cur.replace(".md", "");
      acc.push(item);
    }
    return acc;
  }, []);
}
function showContent(moduleName) {
  const filePath = getPath(moduleName);
  spawn(`cat ${filePath} | less -r`, {
    stdio: "inherit", // use the current shell for stdio
    shell: true,
  });
}

function main() {
  const moduleName = program.args.shift();
  // diff conditions
  console.log("==>", program.args, program.list);
  if (program.list) {
    const fileNames = getFileList(path.join(__dirname, "..", "api", "target"));
    showList(fileNames);
  } else if (moduleName) {
    showContent(moduleName);
  }
}

main();
