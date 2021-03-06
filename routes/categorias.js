const { Router } = require('express')
const { check } = require('express-validator')

const { existCategoriaById } = require('../helpers/db-validators')

const {
  validarJWT,
  isAdminRole,
  getCategoria,
  validarCampos,
} = require('../middlewares')

const {
  index,
  create,
  show,
  update,
  destroy,
} = require('../controllers/categoriasController')

const router = Router()

router.get('/', index)

//crear categoria - privado - cualquier persona con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'Nombre es Requerido').notEmpty(),
    validarCampos,
  ],
  create
)

router.get(
  '/:id',
  [
    check('id', 'Id No Valido').isMongoId(),
    check('id').custom(existCategoriaById),
    validarCampos,
    getCategoria,
  ],
  show
)

//crear categoria - privado - cualquier persona con un token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('id', 'Id No Valido').isMongoId(),
    check('nombre', 'Nombre es Requerido').notEmpty(),
    check('id').custom(existCategoriaById),
    validarCampos,
    getCategoria,
  ],
  update
)

//Borrar una categoria - Solo Admin
router.delete(
  '/:id',
  [
    validarJWT,
    check('id', 'Id No Valido').isMongoId(),
    check('id').custom(existCategoriaById),
    validarCampos,
    isAdminRole,
    getCategoria,
  ],
  destroy
)

module.exports = router
