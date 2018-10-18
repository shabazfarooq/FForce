/**
 * Import(s) / Require(s)
 */
import { Command } from './Command';
import jsforceUtilities from '../utilities/jsforceUtilities';
const fs = require('fs');

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
            // var zipStream = fs.createReadStream("./src2/package.xml");
        // return authenticatedConnection.conn.metadata.deploy(zipStream, {})
        //   .complete(function(err: any, result: any) {
        //     if (err) { console.error(err); }
        //     // console.log('done ? :' + result.done);
        //     // console.log('success ? : ' + result.true);
        //     // console.log('state : ' + result.state);
        //     // console.log('component errors: ' + result.numberComponentErrors);
        //     // console.log('components deployed: ' + result.numberComponentsDeployed);
        //     // console.log('tests completed: ' + result.numberTestsCompleted);
        //   });








    const authenticatedConnection = jsforceUtilities.getAuthenticatedConnection();

    var apexBody = [
      "public class ShabazTest {",
      "  public string sayHello() {",
      "    return 'Hello';",
      "  }",
      "}"
    ].join('\n');

    // Login
    authenticatedConnection.login
      .then((result: any) => {
        console.log('Login Successful');

        return authenticatedConnection.conn.tooling
          .sobject('ApexClass')
          .create({body: apexBody});
      })
      .then((result: any) => {
        console.log(JSON.stringify(result, null, 2));
      })
      .catch((error: any) => {
        console.log('error: ' + error);
      });







    // var apexBody = [
    //   "public class ShabazTest {",
    //   "  public string sayHello() {",
    //   "    return 'Hello';",
    //   "  }",
    //   "}"
    // ].join('\n');

    // const authenticatedConnection = jsforceUtilities.getAuthenticatedConnection();

    // // Login
    // authenticatedConnection.login
    //   .then((result: any) => {
    //     console.log('Login Successful');




    //     const retrieveObj = {
    //         apiVersion: '38.0',
    //         singlePackage: true,
    //         unpackaged: {
    //           types: [{
    //             'members': ['ShabazTest'],
    //             'name': 'ApexClass'
    //           }]
    //         }
    //       };

    //     return authenticatedConnection.conn.metadata
    //       .retrieve(retrieveObj)
    //       .stream()
    //       .pipe(fs.createWriteStream("./src_hidden/blah.zip"));

    //     // return authenticatedConnection.conn.tooling.query(`
    //     //   SELECT Id
    //     //   FROM ApexClass
    //     //   WHERE Name = 'ShabazTest'
    //     //   limit 1
    //     // `);

    //     // return authenticatedConnection.conn.tooling.sobject('ApexClass').create({body: apexBody});
    //   })
    //   .then((result: any) => {
    //     console.log(JSON.stringify(result, null, 2));
    //   })
    //   .catch((error: any) => {
    //     console.log('error: ' + error);
    //   });
  }
}
