/**
 * TODO: Switch to write file sync
 */

/**
 * Import(s) / Require(s)
 */
const fs = require('fs');
import constants from '../constants/constants';

/**
 * Define and export File System Utilities
 */
export default (() => {

  /**
   * Write methods
   */
  const writeToFile = (filename: string, textToWrite: string) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, textToWrite, function (error: string) {
        if (error) {
          reject(error);
        }
        else {
          resolve(1);
        }
      });
    });
  }

  const mkdir = (dirName: string) => {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
  }

  const createBuildPropertiesFile = async (username: string,
                                           password: string,
                                           serverurl: string) => {
    const textToWrite = constants.getBuildProperties(username, password, serverurl);
    await writeToFile('build.properties', textToWrite);
  }

  const createBuildXmlFile = async () => {
    const textToWrite = constants.getBuildXml();
    await writeToFile('build.xml', textToWrite);
  }

  const createPackageXmlFile = async () => {
    mkdir(constants.srcFolder);
    const textToWrite = constants.getPackageXml();
    await writeToFile(constants.srcFolder + '/package.xml', textToWrite);
  }

  const createExecuteAnonFile = async () => {
    await writeToFile('executeAnonymous.apex', '');
  }

  const createQueryFile = async () => {
    await writeToFile('query.soql', '');
  }

  /**
   * Read methods
   */
  const readFromFile = (filename: string) => {
    return fs.readFileSync(filename, 'utf8');
  }

  const parsePropertiesFile = (contents: string): object => {
    let obj: { [index:string] : any } = {};

    const splitByLines: Array<string> = contents.split('\n');

    splitByLines.forEach((line: string) => {
      const splitByEquals: Array<string> = line.split(' = ');
      if (splitByEquals.length !== 2) {
        throw 'Property line unparseable, expecting the following format per line:\n'
              + '  someProperty = someValue\n'
              + 'found:\n'
              + '  ' + line;
      }
      obj[splitByEquals[0]] = splitByEquals[1];
    });

    return obj;
  }

  const getBuildPropertiesObj = () => {
    const buildProperties = readFromFile('./build.properties');
    return parsePropertiesFile(buildProperties);
  }

  return {
    createBuildPropertiesFile,
    createBuildXmlFile,
    createPackageXmlFile,
    createExecuteAnonFile,
    createQueryFile,
    getBuildPropertiesObj
  }

})();