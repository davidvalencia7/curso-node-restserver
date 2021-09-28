const { Router } = require('express')
const { check } = require('express-validator')

const { index, create, show, update, destroy } = require('../controllers/categoriasController')

const router = Router()


router.get('/', index)

//crear categoria - privado - cualquier persona con un token valido
router.post('/', create)


router.get('/:id', show)

//crear categoria - privado - cualquier persona con un token valido
router.put('/:id', update)

//Borrar una categoria - Solo Admin
router.delete('/:id', destroy)


module.exports = router