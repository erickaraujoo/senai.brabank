const baseQuery = require('./baseQuery')

module.exports = class Usuarios {

    lista(){

        return baseQuery("SELECT * FROM usuarios")
    }

    insere(usuario){

        return baseQuery("INSERT INTO usuarios SET ?", usuario)
    }

    buscarPorEmail(email){

        return baseQuery("SELECT * FROM usuarios WHERE email = ?", email)
    }
}