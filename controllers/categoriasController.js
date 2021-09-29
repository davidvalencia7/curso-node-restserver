const Categoria = require('../models/Categoria')

//
const index = async (req, res) => {
  /*const total = await Categoria.countDocuments({})
  const categorias = await Categoria.find().populate({
    path: 'user',
    select: 'nombre',
  })*/

  const { limit = 5, desde = 0 } = req.query
  const query = { estatus: true }

  const categoriasProm = Categoria.find(query)
    .populate({
      path: 'user',
      select: 'nombre',
    })
    .skip(Number(desde))
    .limit(Number(limit))

  const totalProm = Categoria.countDocuments(query)

  const [total, categorias] = await Promise.all([totalProm, categoriasProm])

  res.json({
    msg: 'ok',
    total,
    categorias,
  })
}

const create = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase()

  const _categoria = await Categoria.findOne({ nombre })
  if (_categoria)
    return res
      .status(400)
      .json({ msg: `La categoria ${_categoria.nombre}, ya existe` })

  const data = {
    nombre,
    user: req.user._id,
  }

  const categoria = new Categoria(data)
  await categoria.save()

  res.status(201).json({
    msg: 'OK',
    categoria,
  })
}

const show = (req, res) => {
  /*const categoria = await Categoria.findById(req.params.id).populate({
    path: 'user',
    select: 'nombre',
  })*/

  const categoria = req.categoria

  res.json({
    msg: 'ok',
    categoria,
  })
}

const update = async (req, res) => {
  const { nombre } = req.body
  req.categoria.nombre = nombre.toUpperCase()
  req.categoria.user = req.user._id

  const categoria = await req.categoria.save()
  res.json({
    msg: 'ok',
    categoria,
  })
}

const destroy = async (req, res) => {
  req.categoria.estatus = false
  req.categoria.user = req.user._id

  const categoria = await req.categoria.save()

  res.json({
    msg: 'ok',
    categoria,
  })
}

module.exports = { index, create, show, update, destroy }
