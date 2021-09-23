const jwt = require('jsonwebtoken')
const User = require('../models/User')

const validarJWT = async ( req, res, next ) => {

    const token = req.header('Authorization')

    if(!token)
        return res.status(401).json({ msg: 'No hay token en la petición'})

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(uid)

        //Verificar que el usuario exista
        if(!user)
            res.status(401).json({ msj : 'Token no valido - usuario no existe'})

        //Verificar que el usuario este activo
        if(!user.estatus)
            res.status(401).json('Token no valido - usuario con estatus : false')

        req.user = user

        next()

    }catch(error){
        console.log(error);
        res.status(401).json({ msg : 'Token no valido'})
    }

    
}

module.exports = validarJWT