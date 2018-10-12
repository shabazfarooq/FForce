/**
 * Require(s)
 */
const commandLineArgs = require('command-line-args');

/**
 * Define and export module
 */
module.exports = (() => {
  let options;

  const register = (options: object): void => {
    this.options = commandLineArgs(options);
  }

  const getOptions = (): object => {
    return this.options;
  }

  return {
    register,
    getOptions
  }
})();