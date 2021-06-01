//A custom middleware function
const startupDebugger = require('debug')('app:startup'); //import do debugger
const dbDebugger = require('debug')('app:db'); //import do debugger
const morgan = require('morgan') // Log no console
const express = require('express');
const app = express();



//Condiciona o uso do morgan somente no ambiente de desenvolvimento
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
//console.log('Morgan em funcionamento.');
//Substituimos o console log pela função de debugger.
  startupDebugger('Morgan em funcionamento.');
}


//Quando o DB em funcionamento...
dbDebugger("Connected to Database...")

//Inicializa o server na porta 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));""