// /controllers/RespostaController.js
class RespostaController {
    constructor(pessoasStore) {
        this.pessoasStore = pessoasStore;
    }

    resposta(req, res) {
        let { peso, altura } = req.body;

        // Convertendo para números de ponto flutuante (float)
        peso = parseFloat(peso); 
        altura = parseFloat(altura);

        // Validando os dados
        if (isNaN(peso) || isNaN(altura)) {
            return res.status(400).send('Peso e altura devem ser números válidos.');
        }
        if (peso <= 0 || altura <= 0) {
            return res.status(400).send('Peso e altura devem ser positivos.');
        }

        // Calculando o IMC
        const imc = peso / (altura * altura);
        let classificacao;

        if (imc < 18.5) classificacao = 'Abaixo do peso';
        else if (imc < 24.9) classificacao = 'Peso normal';
        else if (imc < 29.9) classificacao = 'Sobrepeso';
        else classificacao = 'Obesidade';

        // Renderizando a página resposta.ejs com os dados do IMC
        res.render('resposta', {
            peso,
            altura,
            imc: imc.toFixed(2),
            classificacao
        });
    }
}

module.exports = RespostaController;
