const Joi =  require('joi');
const express = require('express');
const { func } = require('joi');
const app = express();

//Faz o express aceitar objetos JSON.
app.use(express.json());

const genres = [
  { id:1, name: 'Action'},
  { id:2, name: 'Horror'},
  { id:3, name: 'Romance'},
  { id:4, name: 'Drama'}
]

//Lista todos os generos disponíveis.
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

//Adiciona dados
//Faz a validação da entrada (validateGenre)
app.post('/api/genres', (req,res) => {
  const { error } = validateGenre(req.body);
  if ( error ) return res.status(400).send(error.details[0].message);

  const genre = {
    id:genres.length+1,
    name: req.body.name
  }
  genres.push(genre);
  res.send(genre);
});

//Atualiza um registro
app.put('api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if ( !genre ) return res.status(400).send("The data was not found.");

  genre.name = req.body.name;
  res.send(genre);
});

//Deletando um dado
app.delete('api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if ( !genre ) return res.status(400).send("The data was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

//PEgando informações de um dado específico
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});


//Função que utiliza o Joi para fazer a validação dos dados
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validateAsync(genre, schema);
}


//Inicializa o server na porta 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));