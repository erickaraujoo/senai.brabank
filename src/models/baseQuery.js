const conexao = require('./../config/conexao-db')

// Função que retorna uma promessa
module.exports = (sql, params) => {
    return new Promise((resolve, reject) => {

        conexao.query(sql, params || '', (erro, retorno) => {
            
            return erro ? reject(erro) : resolve(retorno)
        })
    })
}