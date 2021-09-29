const { Categoria } = require('../models')

const getCategoria = async (req, res, next) => {
  const categoria = await Categoria.findById(req.params.id)
  if (categoria) {
    req.categoria = categoria
    next()
  } else {
    return res.status(401).json({ msg: 'Categoria No Encontrada' })
  }
}

module.exports = { getCategoria }
