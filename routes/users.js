const { Router } = require('express')
const { check } = require('express-validator')
const { index, create, patch, update, destroy } = require('../controllers/userController')

const router = Router()

router.get('/', index)

router.post('/', [
    check('correo', 'Correo no Valido').isEmail(),
] , create)

router.put('/:id', update)

router.patch('/', patch)

router.delete('/', destroy)



module.exports = router
