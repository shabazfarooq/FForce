/**
 * Require(s)
 */
const fs = require('fs');
const constants = require('../constants/constants');

/**
 * Define and export module
 */
module.exports = (() => {

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
    mkdir('src2');
    const textToWrite = constants.getPackageXml();
    await writeToFile('src2/package.xml', textToWrite);
  }

  const createExecuteAnonFile = async () => {
    await writeToFile('executeAnonymous.apex', '');
  }

  const createQueryFile = async () => {
    await writeToFile('query.soql', '');
  }

  return {
    createBuildPropertiesFile,
    createBuildXmlFile,
    createPackageXmlFile,
    createExecuteAnonFile,
    createQueryFile
  }

})();