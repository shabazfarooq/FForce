// console.log('__filename: ' + __filename);
// console.log('__dirname : ' + __dirname);
// console.log('process.argv : ' + process.argv);

// todo: create the package.xml file as well as the build.properties file now
// create credentials and all that create-force-login stuff
// todo: add a --hidePassword parameter



/**
 * Require(s)
 */
const Command = require('./Command');
const userInput = require('../utilities/userInput');
const readlineSync = require('readline-sync');

/**
 * Define and export module
 */
module.exports = class Init extends Command {
  _username: string;
  _password: string;
  _instanceType: string;

  start(): void {

    // Wait for user's response. 
    this._username = readlineSync.question('Enter username: ');
    this._password = readlineSync.question('Enter password: ');
    this._instanceType = readlineSync.question('Enter instance type(test/login): ');

    // Handle the secret text (e.g. password). 
    // var favFood = readlineSync.question('What is your favorite food? ', {
    //   hideEchoBack: true // The typed text on screen is hidden by `*` (default). 
    // });
    // console.log('Oh, ' + userName + ' loves ' + favFood + '!');



    // userInput.askUser('Enter username')
    //   .then((username: string): void => {
    //     // console.log('--------------->username: ' + username + '\n');

    //     return userInput.askUser('Enter password');
    //   })
    //   .then((password: string): void => {
    //     // console.log('--------------->password: ' + password + '\n');

    //     return userInput.askUser('Enter instance type(test/login)');
    //   })
    //   .catch((error: string): void => {
    //     // console.log('error: ' + error);
    //   });



    // const response = userInput.askUser('hi: ');

    // console.log('**********: ' + response);
    // console.log('well hello thre ');


    // const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

    // const startAsync = async callback: any => {
    //   await wait(1000);
    //   console.log('Hello');
    //   await wait(1000);
    //   console.log('And Welcome');
    //   await wait(1000);
    //   console.log('To Async Await Using TypeScript');
    // };

    // startAsync();


    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });

    // rl.question('What do you think of Node.js? ', (answer: string) => {
    //   // TODO: Log the answer in a database
    //   console.log(`Thank you for your valuable feedback: ${answer}`);

    //   rl.close();
    // });
  }

  // captureUsrename
}
