const express = require('express');

const IndexController = require('./controllers/IndexController');
const RespostaController = require('./controllers/ResposaController');

const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const indexController = new IndexController();

app.get('/', (req, res) => {
    indexController.index(req, res);
});

app.get('/resposta', (req, res) => {
    respostaController.resposta(req, res);
});
app.post('/resposta', (req, res) => {
    respostaController.resposta(req, res);
});

app.get('*', function naoEncontrado(request, response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Não encontrado!\n')
    response.end();
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
