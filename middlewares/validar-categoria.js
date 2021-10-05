const { Categoria } = require('../models')

const getCategoria = async (req, res, next) => {
  const categoria = await Categoria.findById(req.params.id)
  if (!categoria)
    return res.status(401).json({ msg: 'Categoria No Encontrada' })

  req.categoria = categoria
  next()
}

module.exports = { getCategoria }
