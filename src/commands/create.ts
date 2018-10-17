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
      // this.createClass();


    }
    catch (error) {
      console.log('failed..' + error);
      process.exit(1);
    }
  }


  createClass() {

  }
}
