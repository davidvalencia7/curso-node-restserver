const User = require('../models/User')
const bcryptjs = require('bcryptjs')


const index = async (req, res) => {
    const {limit = 5, desde = 0} = req.query

    const users = await User.find()
                .skip(Number(desde))
                .limit(Number(limit))

    res.json(
        {
        users
    })
}

const create = async (req, res) => {

    const {nombre, correo, password, rol } = req.body
    const user = await new User({nombre, correo, password, rol })

    // encriptar el password
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password,salt)

    //guardar
    user.save()

    res.json({
        user
    })
}

const update = async (req, res) => {
    const {id} = req.params
    const { _id, password, google, correo, ...userData} = req.body

    if(password){
        // encriptar el password
        const salt = bcryptjs.genSaltSync()
        userData.password = bcryptjs.hashSync(password,salt)
    }

    const user = await User.findByIdAndUpdate(id,userData)

    res.json({
        msg : 'Update API | Controller',
        user
    })
}

const patch = (req, res) => {
    res.json({msg : 'Patch API | Controller'})
}

const destroy = (req, res) => {
    res.json({msg : 'Delete API | Controller'})
   }



module.exports = { index, create, update, patch, destroy }