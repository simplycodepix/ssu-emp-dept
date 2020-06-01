const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();
const port = 8048;

require('./db');

app.use(cors({ origin: ['http://localhost:3002', 'http://empdept.god-development.com'], credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Welcome on board');
});

app.server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;