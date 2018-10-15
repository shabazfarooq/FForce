// console.log('__filename: ' + __filename);
// console.log('__dirname : ' + __dirname);
// console.log('process.argv : ' + process.argv);

// todo: create the package.xml file as well as the build.properties file now
// create credentials and all that create-force-login stuff

/**
 * Require(s)
 */
const Command = require('./Command');

/**
 * Define and export module
 */
module.exports = class Init extends Command {

  start(): void {
    console.log('**** executing init ****');
  }
}
