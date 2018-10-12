console.log('hello world');
console.log('__filename: ' + __filename);
console.log('__dirname : ' + __dirname);
console.log('process.argv : ' + process.argv);
function opposite(x) {
    if (x === void 0) { x = { hello: { world: 'hi' } }; }
    return x.hello.world;
}
