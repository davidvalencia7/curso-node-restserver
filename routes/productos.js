const { Router } = require('express')
const { check } = require('express-validator')

const { existCategoriaById } = require('../helpers/db-validators')

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
    check('id').custom(existCategoriaById),
    validarCampos,
    getProducto,
  ],
  create
)

router.get(
  '/:id',
  [check('id', 'Id No Valido'), validarCampos, getProducto],
  show
)

router.put(
  '/',
  [
    check('id', 'Id No Valido').isMongoId(),
    check('nombre', 'Nombre es Requerido').notEmpty(),
    validarCampos,
    getProducto,
    getCategoria,
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
