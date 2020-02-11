// Constante para checar e validar resultado na inserção de dados
const {validationResult} = require('express-validator')
// const UsuariosValid = require('../../validator/UsuariosValidator')
const auth = require('./../../config/auth.json')

const usuarioDAO = new (require('./../../models/Usuarios'))()

// Biblioteca de criptografia
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const gerarToken = (params) => jwt.sign(params, auth.secret, { expiresIn: 60 })

module.exports = {

    async registra(req, res) {

        const erros = validationResult(req)

        if(!erros.isEmpty())
            return res.status(400).send(erros)

        let usuario = req.body

        try{
            const hash = await bcrypt.hash(usuario.senha, 10)
            
            usuario.senha = hash

            const resultado = await usuarioDAO.insere(usuario)
            usuario = {id: resultado.insertId, ...usuario}

            res.status(201).send({
                usuario,
                token: gerarToken({
                    id: usuario.id
                })
            })

        } catch(erro) {

            console.log(erro)
            res.status(500).send(erro)
        }
    },

    async autentica(req, res) {
        
        const { email, senha } = req.body

        try{
            let usuario = await usuarioDAO.buscarPorEmail(email)

            usuario = usuario[0]

            if(!usuario)
                return res.status(404).send({erro: 'Usuário e/ou senha inválidos'})
        
            // Comparando as senhas com bcrypt.compare(senha, senha para comparar)
            if(!await bcrypt.compare(senha, usuario.senha))
                return res.status(401).send({erro: "Usuário e/ou senha inválidos"})

            delete usuario.senha

            res.send({ 
                usuario, 
                token: gerarToken({
                    id: usuario.id
                }) 
            })
        }catch(erro){

            console.log(erro)
            res.status(500).send(erro)
        }
    }

}

// const autenticacao = (app) => {

//     app.post('/registrar', 
//         UsuariosValid.validacoes(), 
//             (req, res) => {

//         // Pegando o corpo da requisição e inserindo no usuario
//         let usuario = req.body

//         // Retornando uma lista de erros consultados pelo validationResult caso algum campo esteja vazio
//         // Como no caso o nome é obrigatorio no banco, se estiver vazio o validationResult retornara
//         // esse erro e mandara a mensagem com withMessage
//         const erros = validationResult(req)

//         if(!erros.isEmpty()){
//             res.status(400).send(erros)
//             return
//         }

//         // Salto é um parametro que ele usa para fazer o hash
//         bcrypt.hash(usuario.senha, 10, (erro, hash) => {
//             usuario.senha = hash
            
//             // Instanciando a classe Usuarios
//             const usuarioDAO = app.models.Usuarios
    
//             // Inserindo o usuario
//             usuarioDAO.insere(usuario)
//             .then(retorno => {

//                 // apagando um atributo de dentro do objeto retorno
//                 delete retorno.senha
    
//                 // Mostrando usuario no POST quando status for 201 
//                 res.status(201).send({
//                     retorno,
//                     token: gerarToken({
//                         id: retorno.id
//                     })
//                 })
//             })
//             .catch(erro => {
    
//                 // Mostrando o erro no terminal
//                 console.log(erro)
//                 // Mostrando erro no POST quando status for 500
//                 res.status(500).send(erro)
//             })
//         })
        
        
//     })
    
//     app.post('/autenticar', async (req, res) => {

//         const { email, senha} = req.body
//         usuarioDAO = app.models.Usuarios

//         const usuario = await usuarioDAO.buscarPorEmail(email)

//         if(!usuario)
//             return res.status(404).send({erro: 'Usuário e/ou senha inválidos'})
    
//         // Comparando as senhas com bcrypt.compare(senha, senha para comparar)
//         if(!await bcrypt.compare(senha, usuario.senha))
//             return res.status(401).send({erro: "Usuário e/ou senha inválidos"})

//         delete usuario.senha
//         res.send({ 
//             usuario, 
//             token: gerarToken({
//                 id: usuario.id
//             }) 
//         })
//     })
// }

// module.exports = autenticacao   