const validarCampos = require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validar-roles')
const getCategoria = require('../middlewares/validar-categoria')
const getProducto = require('../middlewares/validar-producto')

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validaRoles,
  ...getCategoria,
  ...getProducto,
}
