const serve = require('electron-serve');
console.log('Type of serve:', typeof serve);
console.log('serve:', serve);
if (typeof serve === 'object' && serve.default) {
    console.log('Type of serve.default:', typeof serve.default);
}
