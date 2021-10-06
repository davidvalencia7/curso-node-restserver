const { Router } = require('express')
const { check } = require('express-validator')

const { existCategoriaById, existProductoByNombre } = require('../helpers/db-validators')

const {
  validarCampos,
  validarJWT,
  isAdminRole,
  getCategoria,
  getProducto,
} = require('../middlewares')

const { index, create, show, update, destroy } = require('../controllers')

const router = Router()

router.get('/', index)

router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'Nombre es Requerido').notEmpty(),
    check('nombre').custom(existProductoByNombre),
    check('categoria').custom(existCategoriaById),
    validarCampos,
  ],
  create
)

router.get(
  '/:id',
  [check('id', 'Id No Valido'), validarCampos, getProducto],
  show
)

router.put(
  '/:id',
  [
    validarJWT,
    check('categoria', 'Id No Valido').isMongoId(),
    check('nombre', 'Nombre es Requerido').notEmpty(),
    check('categoria').custom(existCategoriaById),
    validarCampos,
    getProducto,
  ],
  update
)

router.delete(
  '/:id',
  [
    validarJWT,
    check('id', 'Id No Valido').isMongoId(),
    validarCampos,
    isAdminRole,
    getProducto,
  ],
  destroy
)

module.exports = router
