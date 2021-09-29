const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  estatus: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

CategoriaSchema.methods.toJSON = function () {
  const { __v, estatus, ...data } = this.toObject()
  return data
}

module.exports = model('Categoria', CategoriaSchema)
