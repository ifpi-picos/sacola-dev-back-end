require('dotenv').config();
const helmet = require('helmet');
const routes = require('./routes/router');
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conn');
const compression = require('compression');
const middlewareFb = require('./middlewares/firebase/decodeToken.js');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require('./swagger.json')


const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center">Api Online!!!</h1> <h2 style="text-align: center">Acesse a documentação em /api-docs</h2>');
});

app.use(middlewareFb.decodeToken);

app.use('/api/v1', routes);

app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${port}`);
});