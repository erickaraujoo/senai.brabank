const jwt = require('jsonwebtoken')
const auth = require('./../config/auth.json')

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization

    // Verifica se tem authorization no header
    if(!authHeader)
        return res.status(401).send({erro: "Token não informado!"})

    const parts = authHeader.split(' ')

    // Verifica se o authorization tem duas partes
    if(parts.length !== 2)
        return res.status(401).send({erro: "Erro no token"})

    const [ bearer, token ] = parts

    // Verifica se a primeira parte contém o Bearer
    if(!/^Bearer$/i.test(bearer))
        return res.status(401).send({erro: "Token mal formatado"})

    // Verifica se o token é valido
    try{
        
        const decoded = await jwt.verify(token, auth.secret)

        // Colocando o id do usuario, referente ao token na minha requisição
        req.userId = decoded.id
        return next()

    } catch(erro) {
        res.status(401).send({erro: "Token invalido"})
    }
}

