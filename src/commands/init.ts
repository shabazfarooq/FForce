// todo: use version returned from login
// todo: use URL (in build properties defined by login response)

/**
 * Import(s) / Require(s)
 */
import { Command } from './Command';
import userInput from '../utilities/userInput';
import jsforceUtilities from '../utilities/jsforceUtilities';
import filesystemUtilities from '../utilities/filesystemUtilities';

/**
 * Define and export Init class
 */
export class Init extends Command {
  // Declare class properties
  _username: string;
  _password: string;
  _instanceUrl: string;

  /**
   * Start
   */
  async start() {
    try {
      // Capture user credentials
      this.captureSetValidateCredentials();
      
      // Authenticate with SFDC
      let authenticatedCredentials = await jsforceUtilities.getAuthenticatedCredentials(
        this._username,
        this._password,
        this._instanceUrl
      );

      // Create local files if credentials authenticated
      if (authenticatedCredentials) {
        this.createLocalFilesAndDirectories();
      }
    }
    catch (error) {
      console.log('failed..' + error);
      process.exit(1);
    }
  }

  /**
   * Capture user credentials
   */
  captureSetValidateCredentials(): void {
    const hidePassword = super.hasOption('showpassword') === false;

    // Capture user credentials
    this._username = userInput.askUser('Enter username');
    this._password = userInput.askUser('Enter password', hidePassword);
    this._instanceUrl = userInput.askUser('Enter instance type(test/login/full URL)');
    
    // Finalize instance URL
    if (this._instanceUrl === 'test' || this._instanceUrl === 'login') {
      this._instanceUrl = 'https://' + this._instanceUrl + '.salesforce.com';
    }

    // Validate user credentials
    if (!this._username || !this._password || !this._instanceUrl) {
      throw 'Missing username/password/instance type';
    }
  }

  /**
   * Create local files and directories
   */
  createLocalFilesAndDirectories(): void {
    filesystemUtilities.createBuildPropertiesFile(
      this._username, this._password, this._instanceUrl
    );
    filesystemUtilities.createBuildXmlFile();
    filesystemUtilities.createPackageXmlFile();
    filesystemUtilities.createExecuteAnonFile();
    filesystemUtilities.createQueryFile();
  }
}
