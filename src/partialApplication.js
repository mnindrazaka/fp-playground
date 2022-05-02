/*
Reference : 
https://vonheikemen.github.io/devlog/web-development/learn-fp/partial-application/
*/

function bind(fn, ...firstArgs) {
  return (...rest) => fn(...firstArgs, ...rest);
}

module.exports = { bind };
