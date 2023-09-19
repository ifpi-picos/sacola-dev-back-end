require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const port = 5000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());


const connectDB = require('./db/conn');
connectDB();

const routes = require('./routes/router');
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});