const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
    mystery: {
        number: 4
    },
    lemon: {
        number: 5
    },
    rootBeer: {
        number: 25
    },
    cherry: {
        number: 3
    },
    licorice: {
        number: 1
    }
};

// Add your logging function here:
// const logRequest = verb => {
//     console.log(`${verb} Request Received`);
// }

app.use(morgan('tiny'));

app.use('/beans/:beanName', (req, res, next) => {
    const beanName = req.params.beanName;
    if (!jellybeanBag[beanName]) {
        console.log('Response Sent');
        return res.status(404).send('Bean with that name does not exist');
    }
    req.bean = jellybeanBag[beanName];
    req.beanName = beanName;
    next();
});

const bodyParser = (req, res, next) => {
    let queryData = '';
    req.on('data', (data) => {
        data = data.toString();
        queryData += data;
    });
    req.on('end', () => {
        if (queryData) {
            req.body = JSON.parse(queryData);
        }
        next();
    });
};

app.get('/beans/', (req, res, next) => {
    res.send(jellybeanBag);
});

app.post('/beans/', bodyParser, (req, res, next) => {
    console.log('POST Request Received');
    const body = req.body;
    const beanName = body.name;
    if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
        return res.status(400).send('Bag with that name already exists!');
    }
    const numberOfBeans = Number(body.number) || 0;
    jellybeanBag[beanName] = {
        number: numberOfBeans
    };
    res.send(jellybeanBag[beanName]);
});

app.get('/beans/:beanName', (req, res, next) => {
    console.log('GET Request Received');
    res.send(jellybeanBag[beanName]);
});


app.post('/beans/:beanName/add', bodyParser, (req, res, next) => {
    console.log('POST Request Received');
    const numberOfBeans = Number(req.body.number) || 0;
    req.bean.number += numberOfBeans;
    res.send(req.bean);
});

app.post('/beans/:beanName/remove', bodyParser, (req, res, next) => {
    console.log('POST Request Received');
    const numberOfBeans = Number(req.body.number) || 0;
    if (req.bean.number < numberOfBeans) {
        return res.status(400).send('Not enough beans in the jar to remove!');
    }
    req.bean.number -= numberOfBeans;
    res.send(req.bean);
});

app.delete('/beans/:beanName', (req, res, next) => {
    const beanName = req.beanName;
    jellybeanBag[beanName] = null;
    res.status(204).send();
});

app.put('/beans/:beanName/name', (req, res, next) => {
    const beanName = req.beanName;
    const newName = req.body.name;
    jellybeanBag[newName] = req.bean;
    jellybeanBag[beanName] = null;
    res.send(jellybeanBag[newName]);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});