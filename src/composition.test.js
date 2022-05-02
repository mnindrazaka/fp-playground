const { Result, Maybe } = require("./composition");
const { bind } = require("./partialApplication");
const fs = require("fs");

function cat(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

function grep(pattern, content) {
  const exp = new RegExp(pattern);
  const lines = content.split("\n");
  return lines.find((line) => exp.test(line));
}

function cut({ delimiter, fields }, str) {
  return str.split(delimiter)[fields - 1];
}

test("composition", () => {
  const host = cut({ delimiter: "=", fields: 2 }, grep("^HOST=", cat(".env")));

  const saferCat = Result.MakeSafe(cat);
  const maybeHost = Maybe.WrapFun(bind(grep, "^HOST="));
  const maybeValue = Maybe.WrapFun(bind(cut, { delimiter: "=", fields: 2 }));

  saferCat(".env")
    .flatMap(maybeHost)
    .flatMap(maybeValue)
    .map((value) => expect(value).toBe(host))
    .catchMap(() => console.log("what?"));
});
