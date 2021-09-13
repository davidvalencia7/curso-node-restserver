const { Router } = require('express')
const { index, create, patch, update, destroy } = require('../controllers/userController')

const router = Router()

router.get('/', index)

router.post('/', create)

router.put('/:id', update)

router.patch('/', patch)

router.delete('/', destroy)



module.exports = router
