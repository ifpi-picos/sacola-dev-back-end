require('dotenv').config();
const helmet = require('helmet');
const routes = require('./routes/router');
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conn');
const compression = require('compression');
const middlewareFb = require('./middlewares/firebase/decodeToken.js');


const port = 5000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

connectDB();

app.use(middlewareFb.decodeToken);
app.use('/api', routes);

app.get('/', (req, res) => {
    console.log(req.uid);
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});