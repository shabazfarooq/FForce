/**
 * Require(s)
 */
const readlineSync = require('readline-sync');

/**
 * Define and export module
 */
module.exports = (() => {

  const askUser = (question: string, isPassword = false): string => {
    let response;

    while (!response) {
      response = readlineSync.question(question + ': ', { hideEchoBack: isPassword });
    }
    
    return response;
  }

  return {
    askUser
  }

})();
