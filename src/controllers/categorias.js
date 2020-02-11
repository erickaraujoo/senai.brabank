const { validationResult } = require('express-validator')
const categoriaDAO = new (require('./../models/Categorias'))()

module.exports = {

    async lista(req, res){

        try{

            const categorias = await categoriaDAO.lista()

            // Caso não tenha categorias, retorna o erro
            if(categorias.length == 0)
                return res.status(404).send({erro: 'Lista vazia!'})

            // Senão retorna a categoria
            res.send(categorias)

        // Caso dê erro, retorna o erro para o usuario e para o Dev
        } catch(erro) {

            console.log(erro)
            res.status(500).send(erro)
        }
    },

    async insere(req, res){

        const erros = validationResult(req)

        if(!erros.isEmpty())
            return res.status(400).send(erros)

        let categoria = req.body

        try{

            const resultado = await categoriaDAO.insere(categoria)
            categoria = {id: resultado.insertId, ...categoria}

            res.status(201).send(categoria)

        } catch(erro) {

            console.log(erro)
            res.status(500).send(erro)

        }
    }
}