const User = require('../models/User')

const index = (req, res) => {
const query = req.query

    res.json(
        {msg : 'get API  | Controlador',
        query
    })
}

const create = async (req, res) => {
    const body = req.body
    const user = await new User(body)
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