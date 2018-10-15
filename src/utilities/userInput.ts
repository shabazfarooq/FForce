/**
 * Require(s)
 */
const readline = require('readline');

/**
 * Define and export module
 */
module.exports = (() => {
  

  /**
   * Ask user function
   */
  const askUser = async (question: string) => {
    console.log(question + ':');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.stdoutMuted = true;

    rl._writeToOutput = function _writeToOutput(stringToWrite: string) {
      if (rl.stdoutMuted)
        rl.output.write("*");
      else
        rl.output.write(stringToWrite);
    };



    const askUserAsync = () => {
      return new Promise((resolve: Function) => { 
        rl.question((answer: string) => {
          rl.close();
          console.log('\n');
          resolve(answer);
        });
      });
    }

    return await askUserAsync();
  }

  return {
    askUser
  }
})();