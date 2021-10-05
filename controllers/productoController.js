const { Producto } = require('../models/Producto')

const index = async (req, res) => {
  const { limit = 5, desde = 0 } = req.query
  const query = { estatus: true }

  const productProm = Producto.find(query)
    .populate({
      path: 'categoria',
      select: 'nombre',
    })
    .populate({
      path: 'user',
      select: 'nombre',
    })
    .skip(Number(desde))
    .limit(Number(limit))

  const totalProm = Producto.countDocuments(query)

  const [total, productos] = await Promise.all([totalProm, categoriasProm])

  return res.status(200).json({
    msg: 'Ok',
    total,
    productos,
  })
}

const create = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase()

  if (req.producto)
    return res
      .status(400)
      .json({ msg: `El producto ${producto.nombre}, ya existe` })

  const data = {
    nombre,
    precio,
    categoria: req.categoria._id,
    user: req.user._id,
  }

  const producto = new Producto(data)
  await producto.save()

  return res.status(200).json({ msg: 'ok', producto })
}

const show = async (req, res) => {
  const producto = req.producto

  return res.status(200).json({
    msg: 'OK',
    producto,
  })
}

const update = async (req, res) => {
  const { nombre, precio } = req.body
  req.producto.nombre = nombre
  req.producto.precio = precio
  req.producto.user = req.user._id
  req.producto.categoria = req.categoria._id

  const producto = await req.producto.save()

  return res.status(200).json({
    msg: 'OK',
    producto,
  })
}

const destroy = async (req, res) => {
  req.producto.estatus = false
  req.producto.user = req.user._id

  const producto = await req.producto.save()
  return res.status(200).json({ msg: 'OK', producto })
}

module.exports = { index, create, show, update, destroy }
