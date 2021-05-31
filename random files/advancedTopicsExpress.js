//A custom middleware function

const Joi = require('joi');
const express = require('express');
const importedMiddlware = require('./middlewareImported')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express();


app.use(express.json());

//urlenconder permite concaternar na string url as info passadas em um form
//extended permite passa arrays e objetos complexos na url
app.use(express.urlencoded( { extended: true }));

//middleware que faz acessarmos uma pasta statica no root da aplicação.
//Quando digitamos a url com o nome do arquivo, já vai direto. O middleware se encarrega de buscar a info.
app.use(express.static('public'));


app.use(helmet());
app.use(morgan('tiny'));


//Aqui está nosso middleware customizado.
//O param next, na função, significa o próximo middleware direcionável.
app.use(function(req, res, next) {
  console.log("Logging...")

  next(); // Chama o próximo middlware do pípeline, se não colocar next... a função para nesse middleware.
});

//Nosso segundo middleware customizado.""
app.use(importedMiddlware);




//Inicializa o server na porta 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));""