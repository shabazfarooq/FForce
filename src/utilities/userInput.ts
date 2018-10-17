/**
 * Import(s) / Require(s)
 */
const readlineSync = require('readline-sync');

/**
 * Define and export User Input
 */
export default (() => {

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
