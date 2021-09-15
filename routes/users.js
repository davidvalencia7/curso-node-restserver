const { Router } = require('express')
const { check } = require('express-validator')
const { index, create, patch, update, destroy } = require('../controllers/userController')
const { validarCampos } = require('../middlewares/validar-campos')
const { existRole, existEmail }  = require('../helpers/db-validators')

const router = Router()

router.get('/', index)

router.post('/', [
    check('nombre', 'Nombre es Requerido').notEmpty(),
    check('password','Password debe tener minimo 4 caracteres').isLength({ min: 4}),
    check('correo', 'Correo no Valido').isEmail(),
    check('correo').custom(existEmail),
    //check('rol','Rol no valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( existRole ), //si no se pasa argumento toma el primero (rol) => existRole(rol)
    validarCampos
] , create)

router.put('/:id', update)

router.patch('/', patch)

router.delete('/', destroy)



module.exports = router
