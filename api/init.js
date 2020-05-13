let marked = require("marked");
let fs = require("fs");
let path = require("path");
let through2 = require("through2");
let TerminalRenderer = require("marked-terminal");

let { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder("utf8");

/**
 * setting marked options
 */
marked.setOptions({
  renderer: new TerminalRenderer(),
});

function getFileList(dir) {
  const list = fs.readdirSync(dir);
  return list.reduce((acc, cur) => {
    if (/.md/.test(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);
}

function getsourcePath(file) {
  return path.join("", "source", file);
}

function gettargetPath(file) {
  return path.join("", "target", file);
}

function main() {
  const fileList = getFileList("./source");
  for (let file of fileList) {
    const filePath = getsourcePath(file);
    const targetPath = gettargetPath(file);
    fs.createReadStream(filePath)
      // todo use transform rewrite
      .pipe(
        through2(function (chunk, encoding, cb) {
          const data = marked(decoder.write(chunk));
          this.push(data);
          cb();
        })
      )
      .pipe(fs.createWriteStream(targetPath));
  }
}

main();
