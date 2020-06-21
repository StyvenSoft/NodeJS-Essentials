const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const currencies = {
  diram: {
    countries: ['UAE', 'Morocco'],
  },
  real: {
    countries: ['Brazil'],
  },
  dinar: {
    countries: ['Algeria', 'Bahrain', 'Jordan', 'Kuwait'],
  },
  vatu: {
    countries: ['Vanuatu'],
  },
  shilling: {
    countries: ['Tanzania', 'Uganda', 'Somalia', 'Kenya'],
  },
};

// Your code here!
app.put('/currencies/:name/countries', (req, res, next) => {
  const currencyName = req.params.name;
  const countries = req.query;
  currencies[currencyName] = countries;
  res.send(currencies[currencyName]);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});