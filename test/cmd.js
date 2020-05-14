let path = require("path");
let spawn = require("child_process").spawn;
let should = require("should");

let PKG_PATH = path.resolve(__dirname, "..", "package.json");
let BIN_PATH = path.resolve(
  path.dirname(PKG_PATH),
  require(PKG_PATH)["bin"]["node-docs"]
);

const SUCCESSCODE = 0;
const FAILCODE = 1;
const HELPOPTIONLENGHT = 160;
const moduleNums = 54;
describe("node-docs-cli-test", function () {
  this.timeout(30000);
  describe("option-test", function () {
    it("test-using-option-h", function (done) {
      runRaw(["-h"], function (err, code, stdout, stderr) {
        if (err) return done(err);
        code.should.equal(SUCCESSCODE);
        stdout.length.should.equal(HELPOPTIONLENGHT);
        done();
      });
    });
    it("test-using-option-help", function (done) {
      runRaw(["--help"], function (err, code, stdout, stderr) {
        if (err) return done(err);
        code.should.equal(SUCCESSCODE);
        stdout.length.should.equal(HELPOPTIONLENGHT);
        done();
      });
    });
    it("test-using-option-l", function (done) {
      runRaw(["-l"], function (err, code, stdout, stderr) {
        if (err) return done(err);
        code.should.equal(SUCCESSCODE);
        stdout.split("\n").length.should.equal(moduleNums + 1);
        done();
      });
    });
    it("test-using-option-list", function (done) {
      runRaw(["--list"], function (err, code, stdout, stderr) {
        if (err) return done(err);
        code.should.equal(SUCCESSCODE);
        stdout.split("\n").length.should.equal(moduleNums + 1);
        done();
      });
    });
    it("test-using-option-help", function (done) {
      runRaw(["--list"], function (err, code, stdout, stderr) {
        if (err) return done(err);
        code.should.equal(SUCCESSCODE);
        stdout.split("\n").length.should.equal(moduleNums + 1);
        done();
      });
    });
    it("test-using-option-(-fdsaf)", function (done) {
      runRaw(["-fdsaf"], function (err, code, stdout, stderr) {
        if (err) return done(err);
        code.should.equal(FAILCODE);
        stderr.should.equal("error: unknown option '-fdsaf'\n");
        done();
      });
    });
  });

  // todo this test not friendly
  describe("module-test", function () {
    it("not found corresponding module", function (done) {
      runRaw(["A"], function (err, code, stdout, stderr) {
        if (err) return done(err);
        code.should.equal(SUCCESSCODE);
        stdout.should.equal("not find of a module, please retype attempt...\n");
        done();
      });
    });
    it("show 'net' module", function (done) {
      runRaw(["net"], function (err, code, stdout, stderr) {
        if (err) return done(err);
        code.should.equal(SUCCESSCODE);
        stderr.should.equal("");
        done();
      });
    });
    it("show 'fs' module", function (done) {
      runRaw(["net"], function (err, code, stdout, stderr) {
        if (err) return done(err);
        code.should.equal(SUCCESSCODE);
        stderr.should.equal("");
        done();
      });
    });
  });
});

/**
 * run raw cli
 */
function runRaw(args, callback) {
  let argv = [BIN_PATH].concat(args);
  let binp = process.argv[0];
  let stderr = "";
  let stdout = "";

  var child = spawn(binp, argv, {
    cwd: ".",
  });

  child.stdout.setEncoding("utf8");
  child.stdout.on("data", function ondata(str) {
    stdout += str;
  });
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", function ondata(str) {
    stderr += str;
  });

  child.on("close", onclose);
  child.on("error", callback);

  function onclose(code) {
    callback(null, code, stdout, stderr);
  }
}
