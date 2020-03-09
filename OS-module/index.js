// El osmódulo proporciona métodos y propiedades de utilidad relacionados con el sistema operativo

const os = require('os');

console.log(os.platform());
console.log(os.release());
console.log('Free memory: ', os.freemem(), 'bytes');
console.log('Total memory: ', os.totalmem(), 'bytes');
console.log(os.cpus());



