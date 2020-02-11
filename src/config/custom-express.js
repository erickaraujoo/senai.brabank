// requisitando a express
const express = require('express')
const app = express()
const consign = require('consign')
const bodyParser = require('body-parser')

customExpress = () => {

    // Aceita dados diretamente do formularios
    // app.use(bodyParser.urlencoded)
    app.use(bodyParser.json())

    // Consign faz as instancias da pasta escolhida
    // no caso ele inclue a pasta controllers e insere app
    // Evita de fazer os requires
    consign()
        .include('controllers/public')
        .then('middlewares')
        .then('controllers')
        .then('models')
        .into(app)

    return app
}

module.exports = customExpress()