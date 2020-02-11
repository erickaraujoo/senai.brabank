const router = require('express').Router()

const categoriaController = require('./../controllers/categorias')

// Definindo rotas, para cada coisa seu determinado controller
router.get('/', categoriaController.lista)
router.post('/', categoriaController.insere)

module.exports = router