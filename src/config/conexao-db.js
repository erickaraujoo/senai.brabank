const mysql = require('mysql')

// Fazendo a conexão no mysql
const conexao = mysql.createConnection({
    host: '18.212.49.21',
    port: 3306,
    user: 'erick',
    password: 'bcd127',
    database: 'brabank'
})

module.exports = conexao