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
  async start() {
    this.captureSetValidateCredentials();
    let authenticatedCredentials = await this.getAuthenticatedCredentials();
    console.log(authenticatedCredentials);
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
   * Authenticate credentials with SFDC
   // Now you can get the access token and instance URL information.
   // Save them to establish connection next time.
   // console.log(conn.accessToken);
   // console.log(conn.instanceUrl);
   // // logged in user property
   // console.log("User ID: " + userInfo.id);
   // console.log("Org ID: " + userInfo.organizationId);
   // ...
   */
  getAuthenticatedCredentials() {
    const conn = new jsforce.Connection({ loginUrl: this._instanceType });
    
    return new Promise((resolve, reject) => {
      conn.login(this._username, this._password,
        (error: string, userInfo: any) => {
          if (error) {
            console.error('ERROR: ' + JSON.stringify(error));
            process.exit(1);
          }

          if (userInfo && userInfo.id) {
            resolve(userInfo);
          }
          else {
            reject(error);
          }
        })
    });
  }
}
