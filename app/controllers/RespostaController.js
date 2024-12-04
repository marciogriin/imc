const Resposta = require('../lib/Resposta');
const jwt = require('jsonwebtoken');

class RespostaController {
    constructor(pessoasStore) {
        this.pessoasStore = pessoasStore;
    }
