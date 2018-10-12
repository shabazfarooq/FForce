const commandLineArgs = require('command-line-args');
const command_init = require('./commands/init');
const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'timeout', alias: 't', type: Number },

  { name: 'init', alias: 'i', type: Number }
];
const options = commandLineArgs(optionDefinitions);

console.log(
  JSON.stringify(options, null, 2)
);

// console.log('__filename: ' + __filename);
// console.log('__dirname : ' + __dirname);
// console.log('process.argv : ' + process.argv);

// function opposite(x={hello:{world:'hi'}}){
//   return x.hello.world;
// }