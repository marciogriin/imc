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
    <form>
        <label>
            <span>Nome</span>
            <input name="nome" />
        </label>
        <label>
            <span>Altura</span>
            <input name="altura" type="number" />
        </label>
        <label></label>
            <span>Peso</span>
            <input name="peso" type="number" />
        </label>
        <button>Enviar</button>
    </form>
</body>
</html>
        `);
        response.end();
    }
    else if (url == '/idade') {
        let rawBody = '';
        request.on('data', (chunk) => {
            rawBody += chunk;
        });
        request.on('end', () => {
            console.log('raw', rawBody);
            let body = urlDecode(rawBody);
            console.log('parsed', body);

            let ano = parseInt(body.ano);
            let idade = 2024 - ano;

            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write(`Olá, ${body.nome}! Você nasceu em ${body.ano}. Tem ${idade} anos!\n`)
            response.end();
        });
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('Não encontrado!\n')
        response.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

function urlDecode(urlEncoded) {
    let json = {};
    for (let variaveis of urlEncoded.split('&')) {
        let [variavel, valor] = variaveis.split('=');
        json[variavel] = valor;
    }
    return json;
}