const Joi =  require('joi');
const express = require('express');
const genres = require('./routes/genres')
const app = express();

//Faz o express aceitar objetos JSON.
app.use(express.json());
app.use('/api/genres', genres)


//Inicializa o server na porta 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));