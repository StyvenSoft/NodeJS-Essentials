const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

// Open a call to `app.get()` below:
app.get('/expressions', (req, res, next) => {
  // console.log(req);
  res.send(expressions);
});

app.get('/expressions/:id', (req, res, next) => {
    const foundExpression = getElementById(req.params.id, expressions);
    if (foundExpression) {
      res.send(foundExpression);
    } else {
      res.status(404).send('Expression not found');
    }
});

app.put('/expressions/:id', (req, res, next) =>{
  
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});