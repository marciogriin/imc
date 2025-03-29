// /app/app.js
const express = require('express');
const IndexController = require('./controllers/IndexController');
const RespostaController = require('./controllers/RespostaController');
const pessoasStore = require('./models/pessoasStore'); // Exemplo de um modelo de banco de dados

const app = express();
const PORT = 3000;

// Configuração de middlewares
app.use(express.static('public')); // Servir arquivos estáticos
app.set('view engine', 'ejs'); // Configurar o mecanismo de visualização
app.use(express.urlencoded({ extended: true })); // Para formular dados
app.use(express.json()); // Para requisições JSON

// Instanciando controllers
const indexController = new IndexController();
const respostaController = new RespostaController(pessoasStore);

// Rotas principais
app.get('/', (req, res) => indexController.index(req, res));
app.get('/resposta', (req, res) => respostaController.resposta(req, res));
app.post('/resposta', (req, res) => respostaController.resposta(req, res));

// Rota para calcular IMC
app.post('/calcular-imc', (req, res) => {
    let { peso, altura } = req.body;

    // Convertendo para números de ponto flutuante (float)
    peso = parseFloat(peso);  // Garantir que o peso é um número com casas decimais
    altura = parseFloat(altura); // Garantir que a altura é um número com casas decimais

    // Validando os dados
    if (isNaN(peso) || isNaN(altura)) {
        return res.status(400).send('Peso e altura devem ser números válidos.');
    }
    if (peso <= 0 || altura <= 0) {
        return res.status(400).send('Peso e altura devem ser positivos.');
    }

    // Verificando se a altura é razoável
    if (altura < 0.5 || altura > 3) {  // Altura entre 50cm e 3 metros
        return res.status(400).send('A altura deve estar entre 50cm e 3 metros.');
    }

    // Calculando o IMC
    const imc = peso / (altura * altura);
    let classificacao;

    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 24.9) classificacao = 'Peso normal';
    else if (imc < 29.9) classificacao = 'Sobrepeso';
    else classificacao = 'Obesidade';

    // Responder com JSON
    res.json({ imc: imc.toFixed(2), classificacao });
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});



// Rota para páginas não encontradas
app.get('*', (req, res) => {
    res.status(404).send('Página não encontrada!');
});

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
