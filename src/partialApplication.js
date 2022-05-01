function bind(fn, ...firstArgs) {
  return (...rest) => fn(...firstArgs, ...rest);
}

module.exports = { bind };
