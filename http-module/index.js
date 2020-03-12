const http = require('http');
const colors = require('colors')
// http.createServer([options][, requestListener])

const handleServer = function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write('<h1>First test message!</h1>');
    res.end();
}

const server = http.createServer(handleServer);

server.listen(3000, function () {
   console.log('Server on port 3000'.green);
});