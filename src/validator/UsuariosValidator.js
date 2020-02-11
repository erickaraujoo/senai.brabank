const {check, body} = require('express-validator')
const usuarioDAO = new (require('./../models/Usuarios'))()

class Usuarios{

    static validacoes(){
        return[
            check('nome').isLength({min: 5, max: 100})
            .withMessage("Campo deve ter no mínimo 5 caracteres"),

            check('email').isEmail()
            .withMessage("Carmpo deve ser um e-mail válido"),

            check('cpf').isNumeric()
            .withMessage("Campo deve ser numérico"),

            check('sexo').isLength({min: 1, max: 1})
            .withMessage("Campo deve ter apenas 1 caractere (M ou F)"),

            check('senha').isLength({min: 6, max: 15})
            .withMessage("A senha deve ter no mínimo 6 e 15 caracteres"),

            body('email').custom(email => {

                return usuarioDAO.buscarPorEmail(email)

                .then(retorno => {
                    retorno = retorno[0]

                    if(retorno){
                        return Promise.reject('E-mail já cadastrado')
                    }
                })
            })
        ]
    }
}

module.exports = Usuarios