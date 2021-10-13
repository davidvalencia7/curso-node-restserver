const { isValidObjectId } = require("mongoose")
const { User } = require('../models/')

const isValidCollection = (coleccion) => {
    const coleccionesPermitidas = [
        'users',
        'categorias',
        'productos',
        'roles'
    ]

    return coleccionesPermitidas.includes(coleccion)
        
}

const searchUser =  (termino = '') => {

    const isMongoId = isValidObjectId(termino)
    
    if(isMongoId)
        return user =  User.findById(termino)

    const regex = new RegExp(termino, 'i') // i : ignorar mayuscula y minusculas

    return User.find({
        $or : [ {nombre : regex }, { correo : regex } ],
        $and : [{ estatus : true }]
    })
        
    
}

module.exports = { isValidCollection, searchUser }