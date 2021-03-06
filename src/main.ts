/**
 * TODO:
 *  - create logger class
 *  - create exceptions class
 *  - create message center, where all message text would be written perhaps??
 *  - have commands be constants, actually enumerated types!! haha
 *  - // TBD: Implement pretty errors in options.ts

 * COMMANDS:
 * -- Query
 * -- Execute Anonymous
 * -- Create class (DONE)
 * -- Save query updateable objects
 * -- Save PhantomJS files
 */

/**
 * Require
 */
import options from './utilities/options';
import { Init } from './commands/init';
import { Create } from './commands/create';
import { Query } from './commands/query';

/**
 * Define options
 */
const optionDefinitions = [
  { name: 'init', alias: 'i', type: Number },
  { name: 'showpassword', alias: 's', type: Boolean },
  { name: 'create-class', alias: 'c', type: String },
  { name: 'query', alias: 'q', type: String },
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'timeout', alias: 't', type: Number }
];

/**
 * Register and retrieve options
 */
options.register(optionDefinitions);
const parsedOptions = options.getOptions();
// console.log(JSON.stringify(parsedOptions, null, 2));

/**
 * Determine command
 */
let commandToExecute;

if (parsedOptions.hasOwnProperty('init')) {
  commandToExecute = Init;
}
else if (parsedOptions.hasOwnProperty('create-class')) {
  commandToExecute = Create;
}
else if (parsedOptions.hasOwnProperty('query')) {
  commandToExecute = Query;
}

/**
 * Execute command
 */
if (commandToExecute) {
  commandToExecute = new commandToExecute(parsedOptions);
  commandToExecute.start();
}
else {
  console.log('unknown command');
}
