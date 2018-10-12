/**
 * Require
 */
const command_init = require('./commands/init');
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

console.log(
  JSON.stringify(parsedOptions, null, 2)
);

// console.log('__filename: ' + __filename);
// console.log('__dirname : ' + __dirname);
// console.log('process.argv : ' + process.argv);

// function opposite(x={hello:{world:'hi'}}){
//   return x.hello.world;
// }