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
const fs = require('fs');


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
          const textToWrite = `org = src
sf.username = ${this._username}
sf.password = ${this._password}
sf.serverurl = ${this._instanceType}
sf.maxPoll = 20`;

      await this.createBuildPropertiesFile('build.properties', textToWrite);
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

  /**
   * 
   */
  createBuildPropertiesFile(filename: string, textToWrite: string) {
    return new Promise((resolve, reject) => {
      fs.writeFile('build.properties', textToWrite, function (err: string) {
        // if (err: string) throw err;
        console.log('Replaced!');
        resolve(1);
      });
    });
  }

}
