const conexao = require('./../config/conexao-db')

class Usuarios {

    lista(){
        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM usuarios";

            conexao.query(sql, (erro, retorno) => {

                if(erro){
                    reject("Erro ao consultar: "  + erro)
                    return
                } 

                console.log("Consultado com sucesso")
                resolve(retorno)
            })
        })
    }

    insere(usuario){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO usuarios SET ?"

            conexao.query(sql, usuario, (erro, retorno) => {

                // Mostrando ID do usuario inserido 
                // console.log("Id do usuario: " + retorno.insertId)

                // Caso de erro, mostrar na tela
                erro ? reject("Erro ao inserir: " + erro) : resolve({id:retorno.insertId, ...usuario})
            })
        })
    }

    buscarPorEmail(email){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM usuarios WHERE email = ?"

            conexao.query(sql, email, (erro, retorno) => {
                
                if(erro){
                    reject("Erro ao consulta: " + erro)
                } else {
                    const usuario = retorno[0]
                    resolve(usuario)
                    // if(usuario){
                    //     console.log("Usuário encontrado")
                    //     resolve(usuario)
                    // } else {
                    //     console.log("Usuario não encontrado")
                    //     reject({erro: 'Usuario não encontrado'})
                    // }
                }

                erro ? reject("Erro ao consultar: " + erro) : resolve(retorno)
            })
        }) 
    }
}
 
module.exports = new Usuarios()