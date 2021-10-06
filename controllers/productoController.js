
const { Producto } = require('../models/')

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

  const [total, productos] = await Promise.all([totalProm, productProm])

  return res.status(200).json({
    msg: 'Ok',
    total,
    productos,
  })
}

const create = async (req, res) => {
  const { estatus, user, disponible, ...body } = req.body


  const data = {
    ...body,
    nombre : body.nombre.toUpperCase(),
    user: req.user._id
  }
  console.log(data)

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
  const { estatus, user, ...data} = req.body
  console.log(data)
  req.producto.nombre = data.nombre.toUpperCase()
  if(data.hasOwnProperty('precio'))
    req.producto.precio = data.precio
  if(data.hasOwnProperty('descripcion'))
    req.producto.descripcion = data.descripcion
  req.producto.user = req.user._id
  if(data.hasOwnProperty('categoria'))
    req.producto.categoria =  data.categoria

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
