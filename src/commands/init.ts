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
const jsforceUtilities = require('../utilities/jsforceUtilities');
const filesystemUtilities = require('../utilities/filesystemUtilities');

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
  async start() {
    

    this.captureSetValidateCredentials();
    let authenticatedCredentials = await jsforceUtilities.getAuthenticatedCredentials(
      this._username,
      this._password,
      this._instanceType
    );

    if (authenticatedCredentials) {
      filesystemUtilities.createBuildPropertiesFile();
      filesystemUtilities.createBuildXmlFile();
      filesystemUtilities.createPackageXmlFile();

      // package.xml
      // Execute Anonymous file
      // Force query file
    }
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
    
    // Finalize instance URL
    if (this._instanceType === 'test' || this._instanceType === 'login') {
      this._instanceType = 'https://' + this._instanceType + '.salesforce.com';
    }

    // Validate user credentials
    if (!this._username || !this._password || !this._instanceType) {
      console.log('Missing username/password/instance type');
      process.exit(1);
    }
  }

}
