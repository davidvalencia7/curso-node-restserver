const { Schema, model } = require('mongoose')

const userSchema = Schema({
    nombre : {
        type : String,
        required : [true, 'El nombre es obligatorio']
    },
    correo : {
        type : String,
        required : [ true , 'El correo es obligatorio'],
        unique: true
    },
    password : {
        type : String,
        required: [true, 'La contraseña es obligatorio']
    },
    img : { type : String },
    rol : {
        type : String,
        required : true,
        enum : ['ADMIN_ROLE', 'USER_ROLE']
    },
    estatus : {
        type : Boolean,
        default : false
    },
    google : {
        type : Boolean,
        default : false
    }
})


module.exports = model('User', userSchema)