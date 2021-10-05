const { Producto } = require('../models')

const getProducto = async (req, res, next) => {
  const id = req.params.id
  const product = await Producto.findById(id)

  if (!product) return res.status(404).json({ msg: 'Producto No Encontrado' })

  req.producto = product
  next()
}

module.exports = { getProducto }
