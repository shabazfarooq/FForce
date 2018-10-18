/**
 * Import(s) / Require(s)
 */
const jsforce = require('jsforce');
import constants from '../constants/constants';
import filesystemUtilities from '../utilities/filesystemUtilities';

/**
 * Define and export Jsforce Utilities
 */
export default (() => {

  const getAuthenticatedConnection = () => {
    // Read build properties file to get credentials
    const buildPropertiesObj: { [index:string] : any } = 
      filesystemUtilities.getBuildPropertiesObj();
    
    // Extract credentials from build properties object
    const username = buildPropertiesObj[constants.buildPropertiesKeys.username];
    const password = buildPropertiesObj[constants.buildPropertiesKeys.password];
    const serverurl = buildPropertiesObj[constants.buildPropertiesKeys.serverurl];
    
    // Establish JSforce connection
    const conn = new jsforce.Connection({ loginUrl: serverurl });

    // Return connection, and login
    return {
      conn: conn,
      login: conn.login(username, password)
    };
  }

  const getAuthenticatedCredentials = (username: string, password: string, loginUrl: string) => {
    const conn = new jsforce.Connection({ loginUrl });
    
    return new Promise((resolve, reject) => {
      conn.login(username, password, (error: string, userInfo: any) => {
        if (userInfo && userInfo.id) {
          resolve({
            accessToken: conn.accessToken,
            instanceUrl: conn.instanceUrl,
            userId: userInfo.id,
            organizationId: userInfo.organizationId
          });
        }
        else {
          reject(error);
        }
      })
    });
  }

  return {
    getAuthenticatedConnection,
    getAuthenticatedCredentials
  }

})();