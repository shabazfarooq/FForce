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
      fs.writeFile('build.properties', textToWrite, function (error: string) {
        if (error) {
          reject(error);
        }
        else {
          resolve(1);
        }
      });
    });
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

  return {
    createBuildPropertiesFile,
    createBuildXmlFile
  }

})();