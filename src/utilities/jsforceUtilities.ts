/**
 * Require(s)
 */
const jsforce = require('jsforce');

/**
 * Define and export module
 */
module.exports = (() => {

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
    getAuthenticatedCredentials
  }

})();