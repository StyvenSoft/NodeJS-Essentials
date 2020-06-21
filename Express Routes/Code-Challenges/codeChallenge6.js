const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const pastas = ['agnolotti', 'cavatelli', 'gemelli', 'tortellini'];

app.get('/pastas', (req, res, next) => {
  res.send(pastas);
});

const sauceRouter = express.Router();
// Add your code here:
app.use('/sauces', sauceRouter)


const sauces = ['carbonara', 'primavera', 'bolognese', 'puttanesca', 'fra diavolo']

sauceRouter.get('/', (req, res, next) => {
  res.send(sauces);
});