const baseQuery = require('./baseQuery')

module.exports = class Categoria {

    lista(){

        return baseQuery("SELECT * FROM categoria")
    }

    insere(categoria){

        return baseQuery("INSERT INTO categoria SET ?", categoria)
    }

    buscarPorId(id){

        return baseQuery("SELECT * FROM categoria WHERE id = ?", id)
    }

    atualiza(categoria){
        return baseQuery("UPDATE categoria SET ? WHERE id = ?", [categoria, categoria.id])
    }

    delete(id){
        return baseQuery("DELETE FROM categoria WHERE id = ?", id)
    }
}