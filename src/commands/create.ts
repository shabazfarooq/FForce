/**
 * Import(s) / Require(s)
 */
import { Command } from './Command';
import jsforceUtilities from '../utilities/jsforceUtilities';
import constants from '../constants/constants';
import filesystemUtilities from '../utilities/filesystemUtilities';

/**
 * Define and export Create class
 */
export class Create extends Command {
  

  /**
   * Start
   */
  async start() {
    try {
      // validate input(s)

      // Implement stuff..

      // capture extension

      // use constants to create class/trigger/etc classes && meta.xml

      // connect to SFDC and push that stuff

      // wait for response and then save locally or retrieve and move locally
      const classToCreate: string = this._options['create-class'];
      this.createClass(classToCreate);
    }
    catch (error) {
      console.log('failed..\n' + error);
      process.exit(1);
    }
  }


  createClass(name: string) {
    /**
     * USE AN INTERFACE+CLASS TO REPRESENT AN SFDC OBJECT
     */
    const apexClass = constants.getApexClass(name);

    // Generate SFDC connection
    const authenticatedConnection = jsforceUtilities.getAuthenticatedConnection();

    // Login
    authenticatedConnection.login
      // Create Class
      .then((result: any) => {
        console.log('Login Successful');

        return authenticatedConnection.conn.tooling
          .sobject('ApexClass')
          .create({body: apexClass.fileBody});
      })
      // Create local files
      .then((result: any) => {
        console.log('Created Class in SFDC');
        filesystemUtilities.createSfdcFile(apexClass);
        console.log('Created local files');
      })
      .catch((error: any) => {
        console.log('error while creating: ' + apexClass.fileName + '\n' + error);
      });
  }
}
