/**
 * Import(s) / Require(s)
 */
import { Command } from './Command';
import jsforceUtilities from '../utilities/jsforceUtilities';

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
      this.createClass();


    }
    catch (error) {
      console.log('failed..\n' + error);
      process.exit(1);
    }
  }


  createClass() {
    // var apexBody = [
    //   "public class ShabazTest {",
    //   "  public string sayHello() {",
    //   "    return 'Hello';",
    //   "  }",
    //   "}"
    // ].join('\n');

    const authenticatedConnection = jsforceUtilities.getAuthenticatedConnection();

    // Login
    authenticatedConnection.login
      // Query Test Class Id
      .then((result: any) => {
        console.log('Login Successful');

        return authenticatedConnection.conn.tooling.query(`
          SELECT Id
          FROM ApexClass
          limit 2
        `);

        // return conn.tooling.sobject('ApexClass').create({body: apexBody});
      })
      // Create Test Class Queue Item
      .then((result: any) => {
        console.log('worked???: ' + JSON.stringify(result));
        // return conn.tooling.create('ApexTestQueueItem', {ApexClassId: result.records[0].Id});
      })
      .catch((error: any) => {
        console.log('error: ' + error);
      });
  }
}
