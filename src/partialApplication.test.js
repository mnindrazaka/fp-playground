const { bind } = require("./partialApplication");

function take(count, items) {
  return items.slice(0, count);
}

test("partial application", () => {
  const takeTwo = take.bind(null, 2);
  const takeTwoWithBindUtils = bind(take, 2);
  const items = ["first", "second", "third"];
  expect(takeTwo(items)).toStrictEqual(takeTwoWithBindUtils(items));
});
