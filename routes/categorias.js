const { Router } = require('express')
const { check } = require('express-validator')

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
router.post('/', [validarJWT], create)

router.get(
  '/:id',
  [check('id', 'Id No Valido').isMongoId(), validarCampos, getCategoria],
  show
)

//crear categoria - privado - cualquier persona con un token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('id', 'Id No Valido').isMongoId(),
    check('nombre', 'Nombre es Requerido').notEmpty(),
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
    validarCampos,
    isAdminRole,
    getCategoria,
  ],
  destroy
)

module.exports = router
