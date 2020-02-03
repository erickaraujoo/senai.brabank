// Importar o codigo (modulo) no meu codigo
const http = require('http'); // modulo http

// Função que espera um callback de requisição e resposta
const server = http.createServer((req, res) => {
    // Inserindo na resposta da requisição

    // res.end('<h1>Chamando doutor Han Chucrutes</h1>')
});

// Executando na porta 3000
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});