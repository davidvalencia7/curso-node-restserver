const bcryptjs = require('bcryptjs')
const generarJWT = require('../helpers/generarJWT')
const { googleVerify } = require('../helpers/google-verify')
 

const User = require("../models/User")


const login = async (req, res ) => {

    const { correo, password } = req.body

    try {

        const user = await User.findOne({ correo })

        //Verificar si el email existe
        if(!user)
            res.status(400).json({ msg : 'Usuario | Password no son correctos - correo'})

        //Verificar si el email existe
        if(user.estatus)
            res.status(400).json({ msg : 'Usuario | Password no son correctos - estatus'})        
        
        //Verificar password
        const validPassword = await bcryptjs.compareSync( password, user.password)
        if(!validPassword)
            res.status(400).json({ msg : 'Usuario | Password no son corrrectos  - Password'})

        const token = await generarJWT(user.id)

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json('Hable con el administrador')
    }

}


const googleSignIn = async ( req, res ) => {
    
    const {id_token} = req.body

    try {
        const  {nombre, correo, img } = await googleVerify(id_token)

        res.json({
            msg : 'OK',
            id_token,
            nombre
        })
        
    } catch (error) {
        res.status(400).json({ ok: false ,msg : 'token no se pudo verificar' })
    }

}

module.exports = { login, googleSignIn }