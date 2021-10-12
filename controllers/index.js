const productosController = require('./productoController')
const buscarController = require('../controllers/buscarController')

module.exports = {
  ...productosController,
  ...buscarController
}
