const User = require('../models/User')
const bcryptjs = require('bcryptjs')


const index = (req, res) => {
const query = req.query

    res.json(
        {msg : 'get API  | Controlador',
        query
    })
}

const create = async (req, res) => {

    const {nombre, correo, password, rol } = req.body
    const user = await new User({nombre, correo, password, rol })

    // verificar si el correo existe
    const existeEmail = await User.findOne({correo})
    if(existeEmail)
        return res.status(400).json({ msg : 'Correo ya Existe'})

    // encriptar el correo
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password,salt)


    //guardar
    user.save()

    res.json({
        user
    })
}

const update = (req, res) => {
    const id = req.params.id
    res.json({
        msg : 'Update API | Controller',
        id
    })
}

const patch = (req, res) => {
    res.json({msg : 'Patch API | Controller'})
}

const destroy = (req, res) => {
    res.json({msg : 'Delete API | Controller'})
   }



module.exports = { index, create, update, patch, destroy }