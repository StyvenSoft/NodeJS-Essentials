const fs = require('fs');

// escribe datos asincrónicamente en el archivo, reemplazando el archivo si ya existe. 
//Los datos pueden ser una cadena o un búfer.

const data = new Uint8Array(Buffer.from('Hello Node.js'));

// fs.writeFile(file, data[, options], callback)

fs.writeFile('./message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

fs.writeFile('./text.txt', 'Linea de ejemplo', function (err) {
   if (err) {
       console.log(err);
   } 
   console.log('Create File!');
});

console.log('Ultima ejecución de código');

