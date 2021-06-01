const express = require('express');
const router = express.Route();


const genres = [
  { id:1, name: 'Action'},
  { id:2, name: 'Horror'},
  { id:3, name: 'Romance'},
  { id:4, name: 'Drama'}
]


router.get('/api/genres', (req, res) => {
  res.send(genres);
});

//Adiciona dados
//Faz a validação da entrada (validateGenre)
router.post('/', (req,res) => {
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
router.put('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if ( !genre ) return res.status(400).send("The data was not found.");

  genre.name = req.body.name;
  res.send(genre);
});

//Deletando um dado
router.delete('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if ( !genre ) return res.status(400).send("The data was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

//PEgando informações de um dado específico
router.get('/:id', (req, res) => {
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

module.exports = router;