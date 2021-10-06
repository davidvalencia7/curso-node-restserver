const { Schema, model } = require('mongoose')

const ProductoSchema =  Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requirido'],
    unique: true,
  },
  estatus: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  descripcion: { type: String },
  disponible: { type: Boolean, default: true },
})

ProductoSchema.methods.toJSON = function () {
  const { __v, estatus, ...data } = this.toObject()
  return data
}

module.exports = model('Producto', ProductoSchema)
