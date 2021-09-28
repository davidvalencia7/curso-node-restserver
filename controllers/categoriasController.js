const Categoria = require("../models/Categoria")


const index = (req, res) => {
    res.json({
        msg : 'Index'
    })
}

const create = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase()

    const _categoria = await Categoria.findOne({nombre})
    if (_categoria) 
        return res.status(400).json({ msg : `La categoria ${ _categoria.nombre }, ya existe`})


    const data = {
        nombre,
        user : req.user._id
    }

    const categoria = new Categoria(data)
    await categoria.save()

    res.status(201).json({
        msg : 'OK',
        categoria
    })
}

const show = (req, res) => {
    res.json({
        msg : 'Consultar'
    })
}

const update = (req, res) => {
    res.json({
        msg : 'Update'
    })
}


const destroy = (req, res) => {
    res.json({
        msg : 'Delete'
    })
}

module.exports = { index, create, show, update, destroy }