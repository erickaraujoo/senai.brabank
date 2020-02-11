// Constante para checar e validar resultado na inserção de dados
const {validationResult} = require('express-validator')
const UsuariosValid = require('./../validator/UsuariosValidator')

const autenticacao = (app) => {

    app.post('/registrar', 
        UsuariosValid.validacoes(), 
            (req, res) => {

        // Pegando o corpo da requisição e inserindo no usuario
        let usuario = req.body

        // Retornando uma lista de erros consultados pelo validationResult caso algum campo esteja vazio
        // Como no caso o nome é obrigatorio no banco, se estiver vazio o validationResult retornara
        // esse erro e mandara a mensagem com withMessage
        const erros = validationResult(req)

        if(!erros.isEmpty()){
            res.status(400).send(erros)
            return
        }
        
        // Instanciando a classe Usuarios
        const usuarioDAO = app.models.Usuarios

        // Inserindo o usuario
        usuarioDAO.insere(usuario)
        .then(retorno => {

            // usuario.id = retorno.insertId

            // Mostrando o erro no terminal
            // console.log(retorno)
            // Mostrando usuario no POST quando status for 201 
            res.status(201).send(retorno)
        })
        .catch(erro => {

            // Mostrando o erro no terminal
            console.log(erro)
            // Mostrando erro no POST quando status for 500
            res.status(500).send(erro)
        })
    })
    
    app.post('/autenticar', (req, res) => {

    })
}

module.exports = autenticacao   