const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const connectDB = require('./db/conn');
connectDB();

const routes = require('./routes/router');


app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});