const fs = require('fs');

// Lee asincrónicamente todo el contenido de un archivo

//fs.readFile(path[, options], callback)

fs.readFile('./text.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});