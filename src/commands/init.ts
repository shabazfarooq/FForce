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
const readlineSync = require('readline-sync');

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
    const hidePassword = super.hasOption('hidePassword');
    while (!this._username) {
      this._username = readlineSync.question('Enter username: ');
    }
    
    this._password = readlineSync.question('Enter password: ', { hideEchoBack: hidePassword });
    this._instanceType = readlineSync.question('Enter instance type(test/login): ');
  }

  // captureUsrename
}
