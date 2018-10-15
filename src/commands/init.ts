// console.log('__filename: ' + __filename);
// console.log('__dirname : ' + __dirname);
// console.log('process.argv : ' + process.argv);

// todo: create the package.xml file as well as the build.properties file now
// create credentials and all that create-force-login stuff
// todo: add a --hidePassword parameter



/**
 * Require(s)
 */
const Command = require('./Command');
const userInput = require('../utilities/userInput');

/**
 * Define and export module
 */
module.exports = class Init extends Command {
  _username: string;
  _password: string;
  _instanceType: string;

  /**
   * Start
   */
  start(): void {
    this.captureAndSetUserCredentials();
  }

  /**
   * Capture user credentials
   */
  captureAndSetUserCredentials(): void {
    this._username = userInput.askUser('Enter username');
    this._password = userInput.askUser('Enter password', super.hasOption('hidePassword'));
    this._instanceType = userInput.askUser('Enter instance type(test/login)');
  }
}
