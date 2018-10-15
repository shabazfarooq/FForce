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
const jsforce = require('jsforce');

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
    this.captureSetValidateCredentials();
    this.authenticateCredentials();
  }

  /**
   * Capture user credentials
   */
  captureSetValidateCredentials(): void {
    // Capture user credentials
    const hidePassword = super.hasOption('showpassword') == false;

    this._username = userInput.askUser('Enter username');
    this._password = userInput.askUser('Enter password', hidePassword);
    this._instanceType = userInput.askUser('Enter instance type(test/login/custom)');
    if (this._instanceType === 'test' || this._instanceType === 'login') {
      this._instanceType = 'https://' + this._instanceType + '.salesforce.com';
    }

    // Validate user credentials
    if (!this._username || !this._password || !this._instanceType) {
      console.log('Missing username/password/instance type');
      process.exit(1);
    }
  }

  /**
   * Authenticate credentials with SFDC
   */
  authenticateCredentials(): boolean {
    console.log(this._instanceType);
    // var conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      // loginUrl : 'https://test.salesforce.com'
    // });

    return true;
  }
}
