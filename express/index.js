const express = require('express');
const server = express();
const colors = require('colors');

server.get('/', (req, res) => {
    res.send('<h1>Express and NodeJS</h1>');
    res.end();
})

server.listen(4000, () => {
    console.log('Server on port 4000'.red);  
})