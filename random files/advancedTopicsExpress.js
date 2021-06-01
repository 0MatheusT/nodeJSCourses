//A custom middleware function
const config = require('config') //import das configurações
const helmet = require('helmet') //pacote de segurança.
const morgan = require('morgan') // Log no console
const Joi = require('joi'); 
const express = require('express');
const importedMiddlware = require('./middlewareImported')
const app = express();


app.use(express.json());

//urlenconder permite concaternar na string url as info passadas em um form
//extended permite passa arrays e objetos complexos na url
app.use(express.urlencoded( { extended: true }));

//middleware que faz acessarmos uma pasta statica no root da aplicação.
//Quando digitamos a url com o nome do arquivo, já vai direto. O middleware se encarrega de buscar a info.
app.use(express.static('public'));
app.use(helmet());


//Configuração
console.log('Nome da Aplicação: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Server: ' + config.get('mail.password'));


//Condiciona o uso do morgan somente no ambiente de desenvolvimento
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan em funcionamento.')
}


//Aqui está nosso middleware customizado.
//O param next, na função, significa o próximo middleware direcionável.
app.use(function(req, res, next) {
  console.log("Logging...") 

  next(); // Chama o próximo middlware do pípeline, se não colocar next... a função para nesse middleware.
});

//Nosso segundo middleware customizado.""
app.use(importedMiddlware);


//Rota raiz
app.get('/', (req, res) =>{
  res.send("Connected.")
});

//Retorna a variável de ambiente, que no caso ainda não foi setada. (Undefined)
console.log(`Node_ENV: ${process.env.NODE_ENV}`);
//Por padrão, o node seta a variável de ambiente para Undefined.
console.log(`Express ENV: ${app.get('env')}`)

//Inicializa o server na porta 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));""