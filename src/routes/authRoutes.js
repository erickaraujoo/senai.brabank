const router = require('express').Router()
const authController = require('./../controllers/public/autenticacao')
const usuarioValidator = require('./../validator/UsuariosValidator')

router.post('/registrar', usuarioValidator.validacoes(), authController.registra)
router.post('/autenticar', authController.autentica)

module.exports = router