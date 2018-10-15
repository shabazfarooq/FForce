/**
 * TODO:
 *  - create logger class
 *  - create exceptions class
 *  - create message center, where all message text would be written perhaps??
 *  - have commands be constants, actually enumerated types!! haha
 *  - // TBD: Implement pretty errors in options.ts
 */

/**
 * Require
 */
const CommandClass = require('./commands/Command');
const execute_init = require('./commands/init');
const options = require('./utilities/options');

/**
 * Define options
 */
const optionDefinitions = [
  { name: 'init', alias: 'i', type: Number },
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'timeout', alias: 't', type: Number }
];

/**
 * Register and retrieve options
 */
options.register(optionDefinitions);
const parsedOptions = options.getOptions();

/**
 * Call command
 */
let commandToExecute;

if (parsedOptions.hasOwnProperty('init')) {
  commandToExecute = execute_init;
}

if (commandToExecute) {
  commandToExecute = new commandToExecute(parsedOptions);
  commandToExecute.start();
}
else {
  console.log('unknown command');
}


// console.log(
//   JSON.stringify(parsedOptions, null, 2)
// );
