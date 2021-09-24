const {Router} = require('express')
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/authController')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.post('/login',[
    check('correo','Correo es Requerido').isEmail(),
    check('password','Password es Requerida').notEmpty(),
    validarCampos
], login)


router.post('/google', [
    check('id_token', 'token es necesario').notEmpty(),
    validarCampos
], googleSignIn)


module.exports = router