const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const battlefields = {
  fortSumter: {
    state: 'SC',
  },
  manassas: {
    state: 'VA',
  },
  gettysburg: {
    state: 'PA',
  },
  antietam: {
    state: 'MD',
  }
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Your code here!
app.get('/battlefields/:name', (req, res, next) => {
  const battlefieldName = req.params.name;
  const battlefield = battlefields[battlefieldName];
  if (battlefield){
    res.send(battlefield);
  } else {
    res.status(404).send();
  }
});