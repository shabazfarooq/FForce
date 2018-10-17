/**
 * Import(s) / Require(s)
 */
const commandLineArgs = require('command-line-args');

/**
 * Define and export Options
 */
export default (() => {
  let options;

  const register = (options: object): void => {
    try {
      this.options = commandLineArgs(options);
      validateOptions();
    }
    catch (exception) {
      handleRegisterException(exception);
    }
  }

  const handleRegisterException = (exception: object): void => {
    // if (exception.Name == 'UNKNOWN_OPTION') {}
    
    console.log(JSON.stringify(exception));
    process.exit(1);
  }

  const validateOptions = (): void => {
    // if (this.options && Object.keys(this.options).length > 1) {
    //   throw 'More than one option present, only one allowed';
    // }
  }

  const getOptions = (): object => {
    return this.options;
  }

  return {
    register,
    getOptions
  }
})();