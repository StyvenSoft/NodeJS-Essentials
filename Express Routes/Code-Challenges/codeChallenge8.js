const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const mountains = ['denali', 'olympus', 'kilimanjaro', 'matterhorn'];
const mountainRanges = ['alps', 'andes', 'himalayas', 'rockies'];

// Your code here
const mountainsRouter = express.Router();
const mountainRangesRouter = express.Router();

mountainsRouter.get('/', (req, res, next) => {
  res.send(mountains)
})

mountainRangesRouter.get('/', (req, res, next) => {
  res.send(mountainRanges)
})

app.use('/mountains', mountainsRouter)
app.use('/mountain-ranges', mountainRangesRouter)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});