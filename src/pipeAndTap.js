/*
Reference : 
https://vonheikemen.github.io/devlog/web-development/learn-fp/dealing-with-side-effects-and-pure-functions/
*/

/*
Pipe is used for composing function
*/
function pipe(...fns) {
  return function _piped(...args) {
    let currentValue = fns[0](...args);

    for (let i = 1; i < fns.length; i++) {
      currentValue = fns[i](currentValue);
    }

    return currentValue;
  };
}

/*
Tap is used for perform a side effect inside pipe
*/
function tap(fn) {
  return function (arg) {
    fn(arg);
    return arg;
  };
}

module.exports = {
  pipe,
  tap,
};
