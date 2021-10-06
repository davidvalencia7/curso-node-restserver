//const Role = require('../models/Role')
const { User, Categoria, Role, Producto } = require('../models')

const existRole = async (rol = '') => {
  const existeRol = await Role.findOne({ rol })
  if (!existeRol) throw new Error(`El rol ${rol} No Existe `)
}

const existEmail = async (correo = '') => {
  // verificar si el correo existe
  const existeEmail = await User.findOne({ correo })
  if (existeEmail) throw new Error(`El Correo ${correo} ya Existe`)
}

const existUserById = async (id) => {
  const existUser = await User.findById(id)
  if (!existUser) throw new Error(`Usuario No Encontrado`)
}

const existCategoriaById = async (id) => {
  console.log(id)
  const isCategoria = await Categoria.findById(id)
  if (!isCategoria) throw new Error(`Categoria No Encontrado`)
}

const existProductoByNombre = async (name) => {
  let nombre = ''
  if(name)  
    nombre = name.toUpperCase()
  const isProducto = await Producto.findOne({nombre})
  console.log('validacion:',nombre)
  if (isProducto) throw new Error(`El producto ${nombre}, ya existe`)
}

module.exports = { existRole, existEmail, existUserById, existCategoriaById, existProductoByNombre }
