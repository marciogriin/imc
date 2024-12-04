const http = require('http'); 

const PORT = 3000;
const server = http.createServer(function processaRequisicao(request, response) {
    const url = request.url;

    if (url == '/index' || url == '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(`
            <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculo de IMC</title>
</head>
<body>
    <h1>Problema: Calcular o Índice de Massa Corporal (IMC)</h1>
    <form action="/calcular-imc" method="post">
        <label>
            <span>Peso (kg):</span>
            <input name="peso" type="number" step="0.1" required />
        </label>
        <br>
        <label>
            <span>Altura (m):</span>
            <input name="altura" type="number" step="0.01" required />
        </label>
        <br>
        <button type="submit">Calcular</button>
    </form>
</body>
</html>
        `);
        response.end();
    } else if (url == '/calcular-imc' && request.method === 'POST') {
        let rawBody = '';
        request.on('data', (chunk) => {
            rawBody += chunk;
        });
        request.on('end', () => {
            const body = urlDecode(rawBody);
            const peso = parseFloat(body.peso);
            const altura = parseFloat(body.altura);
            const imc = peso / (altura * altura);

            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(`
                <html>
                <head>
                    <title>Resultado do Cálculo do IMC</title>
                </head>
                <body>
                    <h1>Problema: Calcular o Índice de Massa Corporal (IMC)</h1>
                    <p><strong>Enunciado:</strong> Dado o peso (em kg) e a altura (em metros) de uma pessoa, calcule o IMC.</p>
                    <p><strong>Cálculo:</strong> IMC = Peso (${peso} kg) / (Altura (${altura} m)²)</p>
                    <p><strong>Resposta:</strong> O IMC calculado é ${imc.toFixed(2)}.</p>
                    <a href="/index">Voltar ao formulário</a>
                </body>
                </html>
            `);
            response.end();
        });
    } else if (url == '/autor') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(`
            <html>
            <head>
                <title>Autor</title>
            </head>
            <body>
                <h1>Informações do Autor</h1>
                <p><strong>Nome:</strong> Marcio Teixeira</p>
                <h2>Formações Acadêmicas</h2>
                <ul>
                    <li>Estudante, IFCE</li>
                </ul>
                <h2>Experiências Profissionais</h2>
                <ul>
                    <li>Nenhuma experiência profissional</li>
                </ul>
                <a href="/index">Voltar ao início</a>
            </body>
            </html>
        `);
        response.end();
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('Não encontrado!\n');
        response.end();
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

function urlDecode(urlEncoded) {
    let json = {};
    for (let variaveis of urlEncoded.split('&')) {
        let [variavel, valor] = variaveis.split('=');
        json[variavel] = decodeURIComponent(valor);
    }
    return json;
}
