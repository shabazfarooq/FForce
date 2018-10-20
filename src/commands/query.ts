/**
 * TODO:
 *   Have support for printing different formats (JSON or console friendly)
 *   Have support to query tooling api or not tooling
 *
 */


/**
 * Import(s) / Require(s)
 */
import { Command } from './Command';
import jsforceUtilities from '../utilities/jsforceUtilities';

/**
 * Define and export Create class
 */
export class Query extends Command {

  /**
   * Start
   */
  async start() {
    const queryStr = this._options.query;

    this.executeQuery(queryStr);
  }

  executeQuery(queryStr: string) {
    // Generate SFDC connection
    const authenticatedConnection = jsforceUtilities.getAuthenticatedConnection();

    // Login
    authenticatedConnection.login
      // Create Class
      .then((result: any) => {
        console.log('Login Successful');

        return authenticatedConnection.conn.query(queryStr);
      })
      // Create local files
      .then((result: any) => {
        this.printResults(result.records);
      })
      .catch((error: any) => {
        console.log('error while running query: ' + queryStr + '\n' + error);
      });
  }

  printResults(queryResults: Array<object>) {
    if (!queryResults || !queryResults.length) {
      console.log('no results');
      return;
    }

    /**
     * Determine max field length
     */
    let fieldNameToLength: { [index:string] : any } = {};

    queryResults.forEach((record: { [index:string] : any }) => {
      const recordFields = Object.getOwnPropertyNames(record);

      recordFields.forEach((field) => {
        // Skip the attributes field
        if (field === 'attributes') {
          return;
        }

        // Set the base field length to that of the field name
        if (!fieldNameToLength.hasOwnProperty(field)) {
          fieldNameToLength[field] = field.length;
        }

        // Update max length to current field value, if greater
        const fieldValueLength = record[field].length;

        if (fieldValueLength > fieldNameToLength[field]) {
          fieldNameToLength[field] = fieldValueLength;
        }
      });

    });

    /**
     * Print
     */
    // Print headers
    console.log('\n');

    const fieldNames = Object.getOwnPropertyNames(fieldNameToLength);
    let separatingLineLength = 0;

    fieldNames.forEach((fieldName: string) => {
      const totalFieldLength = fieldNameToLength[fieldName];
      const fillLength = totalFieldLength - fieldName.length
      process.stdout.write(fieldName + (' ').repeat(fillLength) + ' | ');

      separatingLineLength += totalFieldLength;
    });

    // Print separating line
    const fillerLength = (fieldNames.length * 2) + 1;
    console.log('\n' + '-'.repeat(separatingLineLength + fillerLength));
 
    // Print field values
    queryResults.forEach((record: { [index:string] : any }) => {
      fieldNames.forEach((fieldName: string) => {
        const fieldValue = record.hasOwnProperty(fieldName) ? record[fieldName] : '';
        const totalFieldLength = fieldNameToLength[fieldName];
        const fillLength = totalFieldLength - fieldValue.length;
        process.stdout.write(fieldValue + (' ').repeat(fillLength) + ' | ');
      });
      console.log('');
    });


    // queryResults.forEach((record: { [index:string] : any }) => {

    // });
    // console.log('fieldNameToLength: ' + JSON.stringify(fieldNameToLength, null, 2));
  }



}