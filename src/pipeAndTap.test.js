const { pipe, tap } = require("./pipeAndTap");

function getInitialValue() {
  return 1;
}

function increment(val) {
  return val + 1;
}

function decrement(val) {
  return val - 1;
}

test("pipe and tap", () => {
  function mainProcess() {
    const initialValue = getInitialValue();
    const incrementedValue = increment(initialValue);
    console.log(incrementedValue);
    const decrementedValue = decrement(incrementedValue);
    return decrementedValue;
  }

  const mainProcessWithPipe = pipe(
    getInitialValue,
    increment,
    tap(console.log),
    decrement
  );

  expect(mainProcess()).toBe(mainProcessWithPipe());
});
