/* 
Reference: 
https://vonheikemen.github.io/devlog/web-development/learn-fp/composition-techniques/
*/

const Result = {};

Result.Ok = function (value) {
  return {
    map: (fn) => Result.Ok(fn(value)),
    catchMap: () => Result.Ok(value),
    flatMap: (fn) => fn(value),
    cata: (error, success) => success(value),
  };
};

Result.Err = function (value) {
  return {
    map: () => Result.Err(value),
    catchMap: (fn) => Result.Err(fn(value)),
    flatMap: () => Result.Err(value),
    cata: (error, success) => error(value),
  };
};

Result.MakeSafe = function (fn) {
  return function (...args) {
    try {
      return Result.Ok(fn(...args));
    } catch (err) {
      return Result.Err(err);
    }
  };
};

const Maybe = function (value) {
  if (value == null) {
    return Maybe.Nothing();
  }

  return Maybe.Just(value);
};

Maybe.Just = function (value) {
  return {
    map: (fn) => Maybe.Just(fn(value)),
    catchMap: () => Maybe.Just(value),
    flatMap: (fn) => fn(value),
    cata: (nothing, just) => just(value),
  };
};

Maybe.Nothing = function () {
  return {
    map: () => Maybe.Nothing(),
    catchMap: (fn) => fn(),
    flatMap: () => Maybe.Nothing(),
    cata: (nothing, just) => nothing(),
  };
};

Maybe.WrapFun = function (fn) {
  return function (...args) {
    return Maybe(fn(...args));
  };
};

const chain = (fn) => (m) => m.flatMap(fn);
const unWrapOr = (fallback) => (fm) =>
  fm.cata(
    () => fallback,
    (value) => value
  );

module.exports = {
  Result,
  Maybe,
  chain,
  unWrapOr,
};
